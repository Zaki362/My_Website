/* eslint-disable @typescript-eslint/no-require-imports */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
function harness(result = null) {
  const calls = [], cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports;
    const mod = { exports: {} }; cache.set(file, mod);
    const js = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    new Function("require", "module", "exports", js)((name) => {
      if (name === "@/lib/agent/model") return { generateAgentReply: async (messages) => { calls.push(messages); return result; } };
      if (name === "next/server") return { NextResponse: { json: Response.json } };
      return name.startsWith("@/") ? load(path.join(root, name.slice(2) + ".ts")) : require(name);
    }, mod, mod.exports);
    return mod.exports;
  }
  const { POST } = load(path.join(root, "app/api/agent/route.ts"));
  let seq = 0;
  const send = (content, locale = "zh", history = []) => POST(new Request("http://localhost/api/agent", {
    method: "POST", headers: { "x-real-ip": String(++seq) }, body: JSON.stringify({ locale, messages: [...history, { role: "user", content }] })
  }));
  return { POST, send, calls, load };
}
test("identity and greetings are deterministic without touching a failed model", async () => {
  const h = harness();
  for (const [q, locale, expected] of [["你是谁", "zh", /AI 助手/], ["Who are you?", "en", /AI assistant/], ["你好", "zh", /你好/], ["谢谢", "zh", /不客气/]]) {
    const response = await h.send(q, locale); assert.equal(response.status, 200);
    const data = await response.json(); assert.match(data.reply, expected); assert.equal(data.casual, true); assert.ok(!data.fallback);
  }
  assert.equal(h.calls.length, 0);
});
test("failure gives relevant public evidence or an honest retryable error", async () => {
  const h = harness();
  const profile = await h.send("怎么联系国华？"); const data = await profile.json();
  assert.equal(profile.status, 200); assert.equal(data.fallback, true); assert.ok(data.sources.length);
  assert.match(data.reply, /邮箱|163.com/); assert.doesNotMatch(data.reply, /散步/);
  for (const q of ["什么是RAG", "什么是个性化推荐？", "怎么找工作", "今天天气怎么样"]) {
    const response = await h.send(q); assert.equal(response.status, 503);
    const failure = await response.json(); assert.equal(failure.mode, "general"); assert.equal(failure.sources.length, 0); assert.doesNotMatch(failure.reply, /散步/);
  }
});
test("follow-ups retain their project and context stays bounded and single-language", async () => {
  const h = harness({ text: '{"summary":"A short answer","bullets":[]}', provider: "test", model: "test" });
  const response = await h.send("再详细点", "zh", [{ role: "assistant", content: "welcome" }, { role: "user", content: "介绍国华的场景购项目" }, { role: "assistant", content: "a previous answer" }]);
  assert.equal(response.status, 200); assert.equal((await response.json()).mode, "profile");
  assert.match(h.calls[0][0].content, /场景购/); assert.equal(h.calls[0][1].role, "user");
  const retrieval = h.load(path.join(root, "lib/agent/retrieve.ts"));
  for (const locale of ["zh", "en"]) {
    const chunks = retrieval.retrieveRelevantChunks("What projects has Guohua built?", 8, locale);
    assert.ok(!chunks.some(({ chunk }) => chunk.id.endsWith(locale === "zh" ? "-en" : "-zh")));
    assert.ok(retrieval.formatChunksForPrompt(chunks).length <= 5000);
  }
});
test("malformed and overlong input is rejected before generation; 429 includes cooldown", async () => {
  const h = harness();
  const raw = (body) => new Request("http://localhost/api/agent", { method: "POST", body });
  for (const value of ["{", "null", "[]", '{"messages":[]}']) assert.equal((await h.POST(raw(value))).status, 400);
  assert.equal((await h.send("字".repeat(501))).status, 400); assert.equal(h.calls.length, 0);
  const body = JSON.stringify({ messages: [{ role: "user", content: "你好" }] });
  for (let i = 0; i < 10; i++) assert.equal((await h.POST(raw(body))).status, 200);
  const limit = await h.POST(raw(body)); assert.equal(limit.status, 429); assert.ok(Number(limit.headers.get("Retry-After")) > 0);
});
