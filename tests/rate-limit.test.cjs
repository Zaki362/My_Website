/* eslint-disable @typescript-eslint/no-require-imports -- Node test harness loads TS without extra runtime dependencies. */
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");

function load(file, stubs = {}) {
  const source = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const loadedModule = { exports: {} };
  new Function("require", "module", "exports", compiled.outputText)((name) => stubs[name] ?? require(name), loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
const limiter = load("lib/rate-limit.ts");

test("sliding quota expires precisely and returns remaining seconds", () => {
  const consume = limiter.createRateLimiter({ windowMs: 5000, maxRequests: 2 });
  assert.equal(consume("a", 0).limited, false);
  assert.equal(consume("a", 2000).limited, false);
  assert.deepEqual(consume("a", 3000), { limited: true, retryAfter: 2 });
  assert.equal(consume("a", 5000).limited, false);
  assert.equal(consume("a", 5001).limited, true);
});

test("capacity is bounded without evicting live quotas; TTL frees capacity", () => {
  const consume = limiter.createRateLimiter({ windowMs: 1000, maxRequests: 1, maxClients: 2 });
  consume("a", 0); consume("b", 100);
  for (let i = 0; i < 20; i++) assert.equal(consume(`new-${i}`, 200).limited, true);
  assert.equal(consume("a", 500).limited, true);
  assert.equal(consume("new", 1000).limited, false);
  assert.equal(consume("b", 1000).limited, true);
  assert.equal(consume("later", 1100).limited, false);
});

test("resume route handles validation, quotas, network failure and timeout without PII logs", async () => {
  const { POST } = load("app/api/resume-request/route.ts", {
    "@/lib/rate-limit": limiter,
    "next/server": { NextResponse: { json: Response.json } }
  });
  const originalFetch = global.fetch;
  const originalError = console.error;
  const originalEndpoint = process.env.FORMSPREE_ENDPOINT;
  const logs = [];
  let sequence = 0;
  const valid = { email: "visitor@example.com", reason: "Interview request", locale: "en" };
  const request = (body, ip = String(++sequence)) => new Request("https://local.test/api/resume-request", {
    method: "POST", headers: { "x-real-ip": ip }, body: typeof body === "string" ? body : JSON.stringify(body)
  });
  try {
    console.error = (...args) => logs.push(JSON.stringify(args));
    delete process.env.FORMSPREE_ENDPOINT;
    for (const [body, code] of [["{", "INVALID_REQUEST"], [[], "INVALID_REQUEST"],
      [{ ...valid, email: "a".repeat(121) + "@example.com" }, "INVALID_EMAIL"],
      [{ ...valid, reason: " ".repeat(601) + "valid" }, "INVALID_REASON"]]) {
      const response = await POST(request(body));
      assert.equal(response.status, 400);
      assert.equal((await response.json()).code, code);
    }
    assert.equal((await POST(request(valid))).status, 503);
    process.env.FORMSPREE_ENDPOINT = "https://formspree.example.test/f/test";
    global.fetch = async (_url, options) => { assert.ok(options.signal); return new Response("ok"); };
    assert.deepEqual(await (await POST(request(valid))).json(), { ok: true });
    global.fetch = async () => { throw new Error("visitor@example.com private details"); };
    assert.equal((await POST(request(valid))).status, 502);
    global.fetch = async () => { throw new DOMException("private", "TimeoutError"); };
    assert.equal((await POST(request(valid))).status, 504);
    global.fetch = async () => new Response("visitor@example.com private", { status: 422 });
    assert.equal((await POST(request(valid))).status, 502);
    assert.ok(logs.every((entry) => !entry.includes("visitor@example.com") && !entry.includes("private")));
    for (let i = 0; i < 5; i++) await POST(request({}, "quota"));
    const limited = await POST(request({}, "quota"));
    assert.equal(limited.status, 429);
    assert.ok(Number(limited.headers.get("Retry-After")) > 0);
  } finally {
    global.fetch = originalFetch; console.error = originalError;
    if (originalEndpoint === undefined) delete process.env.FORMSPREE_ENDPOINT;
    else process.env.FORMSPREE_ENDPOINT = originalEndpoint;
  }
});
