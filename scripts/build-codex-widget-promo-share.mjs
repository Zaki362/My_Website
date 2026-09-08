import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDirectory, "..");
const sourcePath = resolve(projectRoot, "public/projects/codex-widget-promo.html");
const imagePath = resolve(
  projectRoot,
  "public/projects/codex-widget-promo/codex-quota-promo-v1.png"
);
const outputDirectory = resolve(projectRoot, "exports");
const outputPath = resolve(outputDirectory, "codex-quota-product-intro.html");

const [source, image] = await Promise.all([
  readFile(sourcePath, "utf8"),
  readFile(imagePath)
]);

const imageDataUri = `data:image/png;base64,${image.toString("base64")}`;

const standalone = source
  .replace(
    "<!doctype html>",
    "<!doctype html>\n<!-- Codex Quota 单文件分享版：图片、样式与交互均已内嵌，可直接离线打开。 -->"
  )
  .replace(
    'src="/projects/codex-widget-promo/codex-quota-promo-v1.png"',
    `src="${imageDataUri}"`
  )
  .replace(
    '<a class="button button-secondary" href="/projects/codex-widget">返回作品详情</a>',
    '<a class="button button-secondary" href="#top">返回顶部</a>'
  )
  .replace(
    '<span>由郑国华设计与构建 · <a href="/">返回作品集</a></span>',
    '<span>由郑国华设计与构建 · <a href="https://github.com/Zaki362/codex-widget" target="_blank" rel="noreferrer">GitHub 项目</a></span>'
  );

if (standalone === source || !standalone.includes(imageDataUri)) {
  throw new Error("单文件打包失败：未能内嵌宣传图片。");
}

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputPath, standalone, "utf8");

console.log(outputPath);
