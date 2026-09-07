/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../lib/agent/model.ts"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }
).outputText;
const messages = [{ role: "user", content: "SECRET_PROMPT" }];
const answer = JSON.stringify({ summary: "我是国华的网站助手。", bullets: [], metrics: [] });
const completion = (content = answer, finish_reason = "stop") => ({
  status: 200, body: { choices: [{ message: { content }, finish_reason }] }
});

function harness(steps, env = { DEEPSEEK_API_KEY: "secret-test-key" }) {
  const calls = [], logs = [], budgets = [];
  let now = 0, timer;
  const loadedModule = { exports: {} };
  const clock = {
    advance: (ms) => { now += ms; },
    expire: () => { now += timer.ms; timer.callback(); }
  };
  vm.runInNewContext(source, {
    module: loadedModule, exports: loadedModule.exports, process: { env }, AbortController,
    Date: class extends Date { static now() { return now; } },
    setTimeout: (callback, ms) => { budgets.push(ms); timer = { callback, ms }; return timer; },
    clearTimeout: () => {},
    console: { warn: (...args) => logs.push(args.at(-1)) },
    fetch: async (url, options) => {
      calls.push({ url, headers: options.headers, body: JSON.parse(options.body) });
      const step = steps.shift();
      if (!step) throw new Error("Unexpected extra request");
      const result = typeof step === "function" ? await step(clock) : step;
      return result instanceof Response ? result : new Response(JSON.stringify(result.body), { status: result.status });
    }
  });
  return { model: loadedModule.exports, calls, logs, budgets };
}

test("a valid structured completion succeeds on the first request", async () => {
  const h = harness([completion()]);
  assert.equal((await h.model.generateAgentReply(messages)).text, answer);
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0].body.response_format.type, "json_object");
  assert.equal(h.logs.length, 0);
});

test("empty JSON output gets exactly one plain-format compatibility retry", async () => {
  const h = harness([completion(""), completion("我是国华的网站助手。")]);
  assert.equal((await h.model.generateAgentReply(messages)).text, "我是国华的网站助手。");
  assert.equal(h.calls.length, 2);
  assert.equal(h.calls[1].body.response_format, undefined);
  assert.equal(h.logs[0].category, "empty_output");
});

for (const [status, category] of [[401, "authentication"], [402, "quota"], [429, "rate_limit"], [503, "provider_error"]]) {
  test(`HTTP ${status} is diagnosed without retrying or exposing private data`, async () => {
    const h = harness([{ status, body: { error: "SECRET_PROVIDER_ERROR" } }]);
    assert.equal(await h.model.generateAgentReply(messages), null);
    assert.equal(h.calls.length, 1);
    assert.equal(h.logs[0].category, category);
    assert.equal(h.logs[0].status, status);
    assert.doesNotMatch(JSON.stringify(h.logs), /SECRET|secret-test-key/);
  });
}

test("only an explicit unsupported response format triggers a 400 retry", async () => {
  const h = harness([
    { status: 400, body: { error: { param: "response_format", code: "unsupported_parameter" } } },
    completion()
  ]);
  assert.equal((await h.model.generateAgentReply(messages)).text, answer);
  assert.equal(h.calls[1].body.response_format, undefined);
  const invalid = harness([{ status: 400, body: { error: "Invalid model or JSON request" } }]);
  assert.equal(await invalid.model.generateAgentReply(messages), null);
  assert.equal(invalid.calls.length, 1);
});

for (const [content, finish, category] of [
  ['{"summary":"unfinished', "stop", "invalid_output"],
  ['```json\n{"summary":"unfinished', "stop", "invalid_output"],
  [answer, "length", "truncated_output"],
  ['{"error":"unexpected schema"}', "stop", "invalid_output"]
]) {
  test(`${category} is never exposed as a successful answer`, async () => {
    const h = harness([completion(content, finish), completion(content, finish)]);
    assert.equal(await h.model.generateAgentReply(messages), null);
    assert.equal(h.calls.length, 2);
    assert.equal(h.logs[0].category, category);
  });
}

test("invalid transport JSON can recover without exposing the body", async () => {
  const h = harness([() => new Response("SECRET_NON_JSON"), completion()]);
  assert.equal((await h.model.generateAgentReply(messages)).text, answer);
  assert.equal(h.logs[0].category, "invalid_response");
  assert.doesNotMatch(JSON.stringify(h.logs), /SECRET/);
});

test("provider fallback succeeds after a failed primary request", async () => {
  const h = harness([{ status: 503, body: {} }, completion()], {
    DEEPSEEK_API_KEY: "test-primary", OPENAI_API_KEY: "test-secondary"
  });
  assert.equal((await h.model.generateAgentReply(messages)).provider, "openai");
  assert.equal(h.calls.length, 2);
});

test("network errors stop that provider without repeating requests or logging error contents", async () => {
  const h = harness([() => { throw new Error("SECRET_NETWORK_ERROR"); }]);
  assert.equal(await h.model.generateAgentReply(messages), null);
  assert.equal(h.calls.length, 1);
  assert.equal(h.logs[0].category, "network_error");
  assert.doesNotMatch(JSON.stringify(h.logs), /SECRET/);
});

test("a filtered completion is not retried or replaced by reasoning content", async () => {
  const h = harness([{ status: 200, body: { choices: [{
    finish_reason: "content_filter", message: { content: null, reasoning_content: "PRIVATE_REASONING" }
  }] } }]);
  assert.equal(await h.model.generateAgentReply(messages), null);
  assert.equal(h.calls.length, 1);
  assert.equal(h.logs[0].category, "incomplete_output");
  assert.doesNotMatch(JSON.stringify(h.logs), /PRIVATE/);
});

test("timeouts respect both the provider cap and the shared 30-second budget", async () => {
  const timeout = ({ expire }) => { expire(); throw new Error("SECRET_NETWORK_ERROR"); };
  const h = harness([timeout, timeout], { DEEPSEEK_API_KEY: "primary", OPENAI_API_KEY: "secondary" });
  assert.equal(await h.model.generateAgentReply(messages), null);
  assert.deepEqual(h.budgets, [20_000, 10_000]);
  assert.equal(h.calls.length, 2);
  assert.deepEqual(h.logs.map((log) => log.category), ["timeout", "timeout"]);
  assert.doesNotMatch(JSON.stringify(h.logs), /SECRET/);
});

test("compatibility retry does not restart the provider deadline", async () => {
  const h = harness([({ advance }) => { advance(20_000); return completion(""); }]);
  assert.equal(await h.model.generateAgentReply(messages), null);
  assert.equal(h.calls.length, 1);
  assert.deepEqual(h.budgets, [20_000]);
});

test("configuration is trimmed and template keys are treated as unconfigured", async () => {
  const empty = harness([], { DEEPSEEK_API_KEY: " your_deepseek_api_key ", OPENAI_API_KEY: "  " });
  assert.equal(empty.model.hasConfiguredAgentModel(), false);
  assert.equal(await empty.model.generateAgentReply(messages), null);
  assert.equal(empty.calls.length, 0);
  const configured = harness([completion()], {
    DEEPSEEK_API_KEY: " test-key ", DEEPSEEK_BASE_URL: " https://api.deepseek.com/// ",
    DEEPSEEK_MODEL: " ", AGENT_MODEL: " deepseek-chat "
  });
  await configured.model.generateAgentReply(messages);
  assert.equal(configured.calls[0].headers.Authorization, "Bearer test-key");
  assert.equal(configured.calls[0].url, "https://api.deepseek.com/chat/completions");
  assert.equal(configured.calls[0].body.model, "deepseek-chat");
});
