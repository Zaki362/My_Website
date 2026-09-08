# 郑国华｜中文个人网站

一个基于 Next.js App Router、TypeScript、Tailwind CSS 和 Framer Motion 构建的中文个人品牌站。整体采用浅色背景、紫色交互强调与清晰的内容层级，适合用于展示 AI 产品、Agent、AIGC 与研究背景。

## 技术栈

- Next.js 15（App Router）
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react

## 本地运行

```bash
npm install
npm run dev
```

默认访问：

```bash
http://localhost:3000
```

## 常用命令

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
```

## 项目结构

```bash
.
├── app
│   ├── globals.css
│   ├── layout.tsx
│   ├── api
│   │   └── agent
│   │       └── route.ts
│   ├── page.tsx
│   └── projects
│       └── page.tsx
├── components
│   ├── agent
│   │   ├── AgentAvatar.tsx
│   │   ├── AgentDialog.tsx
│   │   ├── AgentLauncher.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── SuggestedQuestions.tsx
│   │   └── cn.ts
│   ├── about-section.tsx
│   ├── back-to-top.tsx
│   ├── contact-section.tsx
│   ├── education-section.tsx
│   ├── expandable-experience-card.tsx
│   ├── experience-section.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── navbar.tsx
│   ├── profile-visual.tsx
│   ├── projects-empty-state.tsx
│   ├── research-section.tsx
│   ├── reveal.tsx
│   ├── section-shell.tsx
│   └── skills-section.tsx
├── data
│   ├── knowledge-base
│   │   ├── chunks.ts
│   │   ├── faqs.ts
│   │   ├── profile.ts
│   │   └── raw-docs.ts
│   └── profile.ts
├── lib
│   └── agent
│       ├── retrieve.ts
│       └── systemPrompt.ts
├── public
│   └── images
│       └── profile.jpg
├── .env.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 如何修改内容

网站文案与结构化数据统一放在 [data/profile.ts](/Users/guohuaz/My_Website/data/profile.ts)。

个人资料问答 Agent 的数据与检索逻辑放在：

- [data/knowledge-base/profile.ts](/Users/guohuaz/My_Website/data/knowledge-base/profile.ts)
- [data/knowledge-base/chunks.ts](/Users/guohuaz/My_Website/data/knowledge-base/chunks.ts)
- [data/knowledge-base/faqs.ts](/Users/guohuaz/My_Website/data/knowledge-base/faqs.ts)
- [data/knowledge-base/raw-docs.ts](/Users/guohuaz/My_Website/data/knowledge-base/raw-docs.ts)
- [lib/agent/retrieve.ts](/Users/guohuaz/My_Website/lib/agent/retrieve.ts)
- [lib/agent/systemPrompt.ts](/Users/guohuaz/My_Website/lib/agent/systemPrompt.ts)

你可以在这里修改：

- 姓名、标题、简介
- 教育背景
- 实习经历
- 科研与竞赛信息
- 技能分组
- 联系方式
- Projects 页面预留项目数据

## 如何替换头像

默认头像路径是：

`public/images/profile.jpg`

直接替换该文件即可。如果头像文件不存在，页面会自动降级为抽象占位头像，不会破坏布局。

## 如何新增 Projects 内容

当前 Projects 页使用的是 `data/profile.ts` 中的 `projectPlaceholders` 数据。后续可以：

1. 继续在该数组中新增项目字段。
2. 在 [app/projects/page.tsx](/Users/guohuaz/My_Website/app/projects/page.tsx) 中把占位区替换成正式项目卡片列表。
3. 如果需要封面图，可将图片放到 `public/projects/` 目录中。

建议每个项目至少包含：

- `title`
- `description`
- `stack`
- `projectUrl`
- `githubUrl`
- `cover`

## 配置资料助手

先复制环境变量模板：

```bash
cp .env.example .env.local
```

然后填写：

```bash
DEEPSEEK_API_KEY=你的 DeepSeek API Key
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat
```

Agent 通过 [app/api/agent/route.ts](/Users/guohuaz/My_Website/app/api/agent/route.ts) 在服务端调用 DeepSeek，不会在前端暴露 API Key。

## Agent 故障检查

- 身份、问候、能力介绍直接回复，不依赖模型服务。资料问答在模型故障时返回站内资料摘录，并显示来源；普通问题无法可靠回答时返回可重试错误。
- DeepSeek 优先；若已配置 OpenAI，主服务失败后会尝试备用服务。空值和模板密钥不会被当成有效配置。
- 单服务最多等待 20 秒，模型调用总预算 30 秒；浏览器 35 秒超时。JSON 输出为空、截断或格式不合法时，在同一预算内最多尝试一次兼容请求。
- 查看服务端 `[agent:model]` 日志：`authentication` 为鉴权失败，`quota` 为额度问题，`rate_limit` 为上游限流，`timeout` 为超时，`not_configured` 为没有有效配置。日志仅记录故障分类、服务商、状态码与耗时，不记录密钥或聊天内容。
- `npm test` 使用模拟服务覆盖断网、鉴权、超时、空输出、追问、话题切换、输入边界和表单转发异常，不会调用真实模型或发送简历申请。
- 两个接口的内存限流均设有容量和有效期，仅提供单实例保护；需要跨实例统一配额时，应另接共享存储。
- 本地环境与 Vercel Production 环境分别配置。修改本地代码或 `.env.local` 不会改变线上服务；发布按项目授权流程进行。

## 部署到 Vercel

1. 将代码推送到 GitHub 仓库。
2. 打开 [Vercel](https://vercel.com/) 并导入该仓库。
3. Framework Preset 选择 Next.js。
4. 在环境变量中配置 `DEEPSEEK_API_KEY`、`DEEPSEEK_BASE_URL`、`DEEPSEEK_MODEL`。
5. 直接部署即可。

这个项目默认推荐部署到 Vercel，因为个人资料 Agent 依赖 Next.js 服务端 Route Handler。

## 部署到 GitHub Pages

如果保留当前的个人资料 Agent，GitHub Pages 不是完整可用的部署目标，因为 Pages 不能运行 [app/api/agent/route.ts](/Users/guohuaz/My_Website/app/api/agent/route.ts) 这样的服务端接口。

可以这样理解：

- 完整网站 + 资料问答 Agent：推荐部署到 Vercel
- 只部署纯静态展示页面：可以改造成 GitHub Pages 版本，但需要移除或外接 Agent 后端

## 设计说明

- 整体采用暖白背景、深色正文与紫色交互强调
- 使用轻度玻璃拟态、微光边框、局部模糊光斑与低调网格纹理
- 动效以淡入、上移、滚动 reveal、卡片 hover 和顺滑展开为主
- 文案以“产品思维 + 研究表达 + AI-native 气质”为核心，不做模板化简历铺陈

## 说明

当前仓库中保留了原先旧站点的部分历史文件，这一版已经独立提供完整的 Next.js 项目代码。后续如果你想彻底清理旧文件，可以在确认不再使用后再做精简。
