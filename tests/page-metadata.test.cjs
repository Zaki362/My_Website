/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function harness(pathname = "/") {
  const observers = [];
  const writes = [];
  const location = { pathname };
  let title = "Server title";
  let description = "Server description";
  let hasDescription = true;
  const descriptionElement = {
    get content() { return description; },
    set content(value) { description = value; writes.push(["description", value]); }
  };
  const document = {
    get title() { return title; },
    set title(value) { title = value; writes.push(["title", value]); },
    head: {
      querySelector: () => hasDescription ? descriptionElement : null
    }
  };
  const cache = new Map();
  function load(relativePath) {
    if (cache.has(relativePath)) return cache.get(relativePath);
    const loadedModule = { exports: {} };
    const source = ts.transpileModule(
      fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8"),
      { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }
    ).outputText;
    vm.runInNewContext(source, {
      module: loadedModule,
      exports: loadedModule.exports,
      require: (name) => load(`${name.replace("@/", "")}.ts`),
      window: { location },
      document,
      MutationObserver: class {
        constructor(callback) { this.callback = callback; observers.push(this); }
        observe() { this.active = true; }
        disconnect() { this.active = false; }
      }
    });
    cache.set(relativePath, loadedModule.exports);
    return loadedModule.exports;
  }
  return {
    metadata: load("lib/page-metadata.ts"),
    projects: load("data/projects.ts").portfolioProjects,
    document, location, writes, observers,
    stream(nextTitle, nextDescription) {
      title = nextTitle;
      description = nextDescription;
      hasDescription = nextDescription !== null;
      this.flush();
    },
    flush() { observers.filter((observer) => observer.active).forEach((observer) => observer.callback()); }
  };
}

test("every project resolves its own title and summary in both languages", () => {
  const { metadata, projects } = harness();
  for (const project of projects) {
    for (const locale of ["zh", "en"]) {
      const result = metadata.getLocalizedPageMetadata(`/projects/${project.slug}`, locale);
      assert.ok(result.title.startsWith(project.locales[locale].title));
      assert.equal(result.description, project.locales[locale].summary);
      assert.deepEqual(result, metadata.getProjectPageMetadata(project, locale));
      assert.deepEqual(metadata.getLocalizedPageMetadata(`/projects/${project.slug}/`, locale), result);
    }
  }
});

test("the homepage keeps its localized identity and unknown routes are excluded", () => {
  const { metadata } = harness();
  assert.equal(metadata.getLocalizedPageMetadata("/", "zh").title, "郑国华｜AI Builder");
  assert.equal(metadata.getLocalizedPageMetadata("/", "en").title, "Guohua Zheng | AI Builder");
  for (const pathname of ["/projects/missing", "/projects/fitlog/other", "/unknown"]) {
    assert.equal(metadata.getLocalizedPageMetadata(pathname, "zh"), null);
    assert.equal(metadata.getLocalizedPageMetadata(pathname, "en"), null);
  }
});

test("direct project entry and language changes never use homepage metadata", () => {
  const h = harness();
  const project = h.projects[0];
  h.location.pathname = `/projects/${project.slug}`;
  const stopChinese = h.metadata.syncLocalizedPageMetadata(h.location.pathname, "zh");
  assert.ok(h.document.title.startsWith(project.locales.zh.title));
  assert.equal(h.document.head.querySelector().content, project.locales.zh.summary);
  stopChinese();
  const stopEnglish = h.metadata.syncLocalizedPageMetadata(h.location.pathname, "en");
  assert.ok(h.document.title.startsWith(project.locales.en.title));
  assert.equal(h.document.head.querySelector().content, project.locales.en.summary);
  stopEnglish();
  assert.ok(h.observers.every((observer) => !observer.active));
});

test("late Next metadata commits retain the selected language without repeated writes", () => {
  const h = harness();
  const project = h.projects[1];
  h.location.pathname = `/projects/${project.slug}`;
  const stop = h.metadata.syncLocalizedPageMetadata(h.location.pathname, "en");
  h.stream(project.locales.zh.title, project.locales.zh.summary);
  assert.ok(h.document.title.startsWith(project.locales.en.title));
  assert.equal(h.document.head.querySelector().content, project.locales.en.summary);
  const writeCount = h.writes.length;
  h.flush();
  assert.equal(h.writes.length, writeCount, "observer must not loop on its own mutations");
  stop();
});

test("SPA navigation updates projects and homepage while stale observers leave unknown routes alone", () => {
  const h = harness();
  let stop = h.metadata.syncLocalizedPageMetadata("/", "en");
  for (const project of h.projects.slice(0, 2)) {
    h.location.pathname = `/projects/${project.slug}`;
    h.stream("Next route title", "Next route description");
    assert.equal(h.document.title, "Next route title", "old route must not rewrite the next route");
    stop();
    stop = h.metadata.syncLocalizedPageMetadata(h.location.pathname, "en");
    assert.ok(h.document.title.startsWith(project.locales.en.title));
    assert.equal(h.document.head.querySelector().content, project.locales.en.summary);
  }
  h.location.pathname = "/";
  stop();
  stop = h.metadata.syncLocalizedPageMetadata("/", "en");
  assert.equal(h.document.title, "Guohua Zheng | AI Builder");
  h.location.pathname = "/unknown";
  h.stream("Independent route title", "Independent route description");
  stop();
  assert.equal(h.metadata.syncLocalizedPageMetadata("/unknown", "en"), undefined);
  assert.equal(h.document.title, "Independent route title");
  assert.equal(h.document.head.querySelector().content, "Independent route description");
});

test("AI-native restores its own metadata when its head commits before the URL changes", () => {
  const h = harness();
  const expectedTitle = "国华的 AI 工作室 · AI-native";
  const expectedDescription = "走进郑国华的交互式 3D 工作室，通过电脑、书架与窗景探索 AI 项目、教育、工作、科研与生活。";
  const stopHome = h.metadata.syncLocalizedPageMetadata("/", "zh");
  h.stream(expectedTitle, expectedDescription);
  // The old route may still be current when Next inserts the new head tags.
  assert.equal(h.document.head.querySelector().content, h.metadata.getLocalizedPageMetadata("/", "zh").description);
  h.location.pathname = "/ai-native";
  stopHome();
  for (const locale of ["zh", "en"]) {
    const stopStudio = h.metadata.syncLocalizedPageMetadata("/ai-native", locale);
    assert.equal(h.document.title, expectedTitle);
    assert.equal(h.document.head.querySelector().content, expectedDescription);
    assert.equal(h.metadata.getLocalizedPageMetadata("/ai-native/", locale).description, expectedDescription);
    stopStudio();
  }
});

test("a description arriving after a streamed head replacement is localized", () => {
  const h = harness();
  const stop = h.metadata.syncLocalizedPageMetadata("/", "en");
  h.stream("Server title", null);
  assert.equal(h.document.title, "Guohua Zheng | AI Builder");
  h.stream("Server title", "Server description");
  assert.equal(h.document.head.querySelector().content, h.metadata.getLocalizedPageMetadata("/", "en").description);
  stop();
});
