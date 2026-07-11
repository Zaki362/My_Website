export type ProjectLocale = "en" | "zh";

export type ProjectCopy = {
  category: string;
  status: string;
  title: string;
  summary: string;
  cardIntro: string;
  detailIntro: string;
  audienceTitle: string;
  audience: string;
  problemTitle: string;
  problem: string;
  principlesTitle: string;
  principles: string[];
  buildTitle: string;
  buildHighlights: string[];
  previewTitle: string;
  previewDescription: string;
  contextTitle: string;
  context: string;
  contributionTitle: string;
  contribution: string;
  impactTitle: string;
  impact: string[];
  metrics: Array<{
    value: string;
    label: string;
  }>;
  workflow: Array<{
    label: string;
    icon: "book" | "bot" | "database" | "file";
  }>;
  tags: string[];
  liveLabel: string;
  detailLabel: string;
};

export type PortfolioProject = {
  slug: string;
  year: string;
  cover: string;
  liveUrl?: string;
  githubUrl?: string;
  previewMode: "interactive" | "image";
  locales: Record<ProjectLocale, ProjectCopy>;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "fitlog-minimal",
    year: "2026",
    cover: "/projects/fitlog-minimal-cover.png",
    liveUrl: "https://fitlog-minimal.vercel.app/",
    previewMode: "interactive",
    locales: {
      zh: {
        category: "Vibe Coding / PWA",
        status: "Live PWA",
        title: "练一下 / FitLog Minimal",
        summary: "个人健身记录 PWA，围绕快速开练、轻量记录与持续复盘设计。",
        cardIntro:
          "从自己的训练习惯出发，用 AI 编程助手协作完成的轻量健身记录工具。",
        detailIntro:
          "练一下 / FitLog Minimal 是我用 vibe coding 方式完成的个人健身记录 PWA。项目从自己的训练习惯出发，围绕“快速开练、轻量记录、持续复盘”设计。",
        audienceTitle: "为谁设计",
        audience: "有固定力量训练习惯、希望自己掌控训练节奏，又不想被复杂健身 App 打断的人。",
        problemTitle: "核心痛点",
        problem: "训练记录散落在备忘录和表格里；重型 App 操作层级深，真正开练时反而增加记录负担。",
        principlesTitle: "核心产品设计",
        principles: [
          "首页把“开始训练”放在最强视觉位置，并结合历史记录给出今日训练建议。",
          "用动作库、训练中记录、历史复盘串成一条连续路径，减少页面间反复跳转。",
          "坚持本地优先、无需登录，让训练数据掌握在用户自己手里。"
        ],
        buildTitle: "我在 Vibe Coding 中做了什么",
        buildHighlights: [
          "从个人训练流程出发定义信息架构、核心任务和 MVP 边界。",
          "设计移动端训练流程、动作库、记录反馈与历史复盘交互。",
          "建立本地数据结构与导入导出能力，并持续做真机触控和离线体验优化。",
          "用 AI 编程助手完成快速实现，但由我负责需求判断、体验取舍和验收迭代。"
        ],
        previewTitle: "直接体验产品",
        previewDescription: "下方是正在运行的 FitLog，可以直接点击和滚动；也可以在新窗口打开完整版本。",
        contextTitle: "背景",
        context:
          "日常训练记录往往会被复杂健身 App、表格和临时备忘录切碎。我希望有一个打开就能开练、训练中能快速记录、之后能复盘频率和部位状态的小工具。",
        contributionTitle: "设计与构建",
        contribution:
          "动作库、训练中记录、历史统计、数据导入导出都运行在本地浏览器中，无需登录和后端。整个过程通过与 AI 编程助手协作完成，从产品结构、交互细节到动作配图和移动端体验持续迭代。",
        impactTitle: "成果",
        impact: [
          "完成一个可直接使用的个人健身记录 PWA。",
          "覆盖动作库、训练中记录、历史统计、数据导入导出等核心功能。",
          "验证了 vibe coding 从个人需求到可用工具的快速闭环。"
        ],
        metrics: [
          { value: "0", label: "登录 / 后端" },
          { value: "4", label: "核心模块" },
          { value: "PWA", label: "本地优先" }
        ],
        workflow: [
          { label: "训练习惯", icon: "book" },
          { label: "AI 协作构建", icon: "bot" },
          { label: "本地数据", icon: "database" },
          { label: "复盘 / 导出", icon: "file" }
        ],
        tags: ["PWA", "Vibe Coding", "Local-first", "Fitness Tracker", "Mobile UX", "Data Export"],
        liveLabel: "打开网站",
        detailLabel: "查看详情"
      },
      en: {
        category: "Vibe Coding / PWA",
        status: "Live PWA",
        title: "FitLog Minimal",
        summary: "A personal fitness tracking PWA for fast workout start, lightweight logging and review.",
        cardIntro:
          "A lightweight fitness tracker built from my own training habits with an AI coding assistant.",
        detailIntro:
          "FitLog Minimal is a personal fitness tracking PWA built with vibe coding. It starts from my own training habits and centers on fast workout start, lightweight logging and continuous review.",
        audienceTitle: "Designed for",
        audience: "Regular strength-training users who want control over their routine without the overhead of a complex fitness app.",
        problemTitle: "Core problem",
        problem: "Workout data gets scattered across notes and spreadsheets, while heavyweight apps add friction at the exact moment users want to start training.",
        principlesTitle: "Core product decisions",
        principles: [
          "Make Start Workout the strongest action and use history to suggest today's training focus.",
          "Connect exercise library, in-session logging and history review into one continuous flow.",
          "Stay local-first and login-free so users retain control of their training data."
        ],
        buildTitle: "What I owned in Vibe Coding",
        buildHighlights: [
          "Defined the information architecture, core jobs and MVP boundary from my own training workflow.",
          "Designed the mobile workout flow, exercise library, logging feedback and history review.",
          "Built the local data model and import/export path, then refined touch and offline behavior on real devices.",
          "Used an AI coding assistant for implementation while owning product judgment, trade-offs and acceptance."
        ],
        previewTitle: "Try the product",
        previewDescription: "This is the running FitLog product. You can interact with it here or open the full version in a new window.",
        contextTitle: "Context",
        context:
          "Daily training records can easily get scattered across heavy fitness apps, spreadsheets and quick notes. I wanted a small tool that opens quickly, helps me log during training and supports later review of frequency and muscle group status.",
        contributionTitle: "Design & Build",
        contribution:
          "The exercise library, in-workout logging, history statistics and data import/export all run in the local browser without login or backend. I collaborated with an AI coding assistant to iterate product structure, interaction details, exercise visuals and the mobile experience.",
        impactTitle: "Impact",
        impact: [
          "Built a usable fitness tracking PWA for real personal training.",
          "Covered exercise library, in-workout logging, history statistics and data import/export.",
          "Validated a vibe coding workflow from personal demand to shippable product."
        ],
        metrics: [
          { value: "0", label: "Login / backend" },
          { value: "4", label: "Core modules" },
          { value: "PWA", label: "Local-first" }
        ],
        workflow: [
          { label: "Training habit", icon: "book" },
          { label: "AI pair build", icon: "bot" },
          { label: "Local data", icon: "database" },
          { label: "Review / export", icon: "file" }
        ],
        tags: ["PWA", "Vibe Coding", "Local-first", "Fitness Tracker", "Mobile UX", "Data Export"],
        liveLabel: "Open live site",
        detailLabel: "View details"
      }
    }
  },
  {
    slug: "suishouji-mobile-mvp",
    year: "2026",
    cover: "/projects/suishouji-mobile-cover.png",
    liveUrl: "https://suishouji-mobile-mvp.vercel.app/",
    previewMode: "interactive",
    locales: {
      zh: {
        category: "Vibe Coding / Mobile App",
        status: "Live App",
        title: "随手记 / Suishouji Mobile",
        summary: "本地优先的极简灵感记录 App，围绕快速放进去、历史找回来设计。",
        cardIntro:
          "围绕“快速放进去、历史找回来”的本地优先灵感记录 App。",
        detailIntro:
          "随手记是一款我独立开发的本地优先极简灵感记录 App，围绕“快速放进去、历史找回来”的核心体验设计，支持文字、图片/视频、录音、位置、收藏、分类与历史搜索筛选。",
        audienceTitle: "为谁设计",
        audience: "经常在手机上捕捉灵感、生活片段和临时信息，希望记录足够快、之后又能找回来的人。",
        problemTitle: "核心痛点",
        problem: "灵感出现得很快，传统笔记工具容易打断记录；图片、录音和位置又分散在不同入口，历史内容难以检索。",
        principlesTitle: "核心产品设计",
        principles: [
          "把分类、情绪、正文和媒体入口集中在一个快速记录页，降低开始记录的成本。",
          "支持文字、图片/视频、录音、位置与收藏，让一次记录保留完整上下文。",
          "通过历史、分类、收藏和关键词筛选，让“找回来”与“放进去”同等重要。"
        ],
        buildTitle: "我在 Vibe Coding 中做了什么",
        buildHighlights: [
          "完成从 PRD、用户路径、信息架构到移动端视觉规范的产品定义。",
          "设计快速记录与历史找回双主路径，并处理多媒体入口的优先级。",
          "落地真实地图选点、录音、媒体上传和本地稳定存储等浏览器能力。",
          "完成 GitHub / Vercel 部署，并围绕手机端键盘、触控和数据恢复持续验收。"
        ],
        previewTitle: "直接体验产品",
        previewDescription: "下方是正在运行的随手记，可以直接创建记录、切换分类并查看历史入口。",
        contextTitle: "背景",
        context:
          "灵感和碎片信息常常发生在手机上，但传统备忘录容易混杂、难找，重型笔记工具又会打断记录动作。我希望做一个打开就能快速放入、之后能按历史、分类、收藏和关键词找回的小工具。",
        contributionTitle: "设计与构建",
        contribution:
          "项目从 PRD、移动端交互、视觉还原到 GitHub / Vercel 部署完整落地，重点打磨快速记录、媒体与录音入口、真实地图选点、本地数据稳定保存和手机端触控体验。",
        impactTitle: "成果",
        impact: [
          "完成一个可直接访问的移动端优先灵感记录 App。",
          "覆盖文字、图片/视频、录音、位置、收藏、分类与历史搜索筛选等核心能力。",
          "验证了从 PRD、交互、视觉到部署的完整 vibe coding 产品闭环。"
        ],
        metrics: [
          { value: "7", label: "记录维度" },
          { value: "Local", label: "本地优先" },
          { value: "Search", label: "历史筛选" }
        ],
        workflow: [
          { label: "PRD / 场景定义", icon: "book" },
          { label: "AI 协作开发", icon: "bot" },
          { label: "本地数据保存", icon: "database" },
          { label: "部署 / 体验优化", icon: "file" }
        ],
        tags: [
          "Vibe Coding",
          "Local-first",
          "Mobile UX",
          "Inspiration Capture",
          "Media Notes",
          "Map Picker",
          "Vercel"
        ],
        liveLabel: "打开 App",
        detailLabel: "查看详情"
      },
      en: {
        category: "Vibe Coding / Mobile App",
        status: "Live App",
        title: "Suishouji Mobile",
        summary:
          "A local-first minimalist inspiration capture app built around quick capture and reliable retrieval.",
        cardIntro:
          "A local-first inspiration capture app designed around fast input and searchable history.",
        detailIntro:
          "Suishouji Mobile is a local-first minimalist inspiration capture app I built independently. It centers on putting thoughts in quickly and finding them later, with text, image/video, audio, location, favorites, categories and searchable history filters.",
        audienceTitle: "Designed for",
        audience: "People who capture ideas, life fragments and temporary information on mobile and need both fast input and reliable retrieval.",
        problemTitle: "Core problem",
        problem: "Ideas disappear quickly, generic note tools interrupt capture, and media, audio and location context often end up fragmented across separate apps.",
        principlesTitle: "Core product decisions",
        principles: [
          "Keep category, mood, content and media actions on one capture screen to reduce start-up friction.",
          "Support text, image/video, audio, location and favorites so each note preserves its context.",
          "Treat retrieval as a first-class job through history, categories, favorites and keyword filters."
        ],
        buildTitle: "What I owned in Vibe Coding",
        buildHighlights: [
          "Defined the product from PRD, user journeys and information architecture through mobile visual rules.",
          "Designed the dual core flows of fast capture and historical retrieval, including media-action priority.",
          "Implemented map picking, audio, media and stable local persistence using browser capabilities.",
          "Shipped through GitHub and Vercel, then tested mobile keyboard, touch and data recovery behavior."
        ],
        previewTitle: "Try the product",
        previewDescription: "This is the running Suishouji product. You can create a note, switch categories and explore the history flow here.",
        contextTitle: "Context",
        context:
          "Ideas and fragments often appear on mobile, but generic notes can become messy while heavy note tools interrupt the capture moment. I wanted a tool that opens quickly, records multiple forms of context and helps retrieve them later through history, category, favorites and search.",
        contributionTitle: "Design & Build",
        contribution:
          "I drove the project from PRD and mobile interaction design to visual implementation, GitHub / Vercel deployment and iteration. The build focused on quick capture, media and audio entry points, real map selection, stable local data storage and mobile usability.",
        impactTitle: "Impact",
        impact: [
          "Built a mobile-first inspiration capture app that can be used directly online.",
          "Covered text, image/video, audio, location, favorites, categories and searchable history filters.",
          "Validated a complete vibe coding product loop from PRD and interaction to visual polish and deployment."
        ],
        metrics: [
          { value: "7", label: "Capture modes" },
          { value: "Local", label: "Local-first" },
          { value: "Search", label: "History filters" }
        ],
        workflow: [
          { label: "PRD / scenario", icon: "book" },
          { label: "AI pair build", icon: "bot" },
          { label: "Local storage", icon: "database" },
          { label: "Deploy / refine", icon: "file" }
        ],
        tags: [
          "Vibe Coding",
          "Local-first",
          "Mobile UX",
          "Inspiration Capture",
          "Media Notes",
          "Map Picker",
          "Vercel"
        ],
        liveLabel: "Open app",
        detailLabel: "View details"
      }
    }
  },
  {
    slug: "codex-widget",
    year: "2026",
    cover: "/projects/codex-widget-cover.png",
    liveUrl: "https://github.com/Zaki362/codex-widget",
    githubUrl: "https://github.com/Zaki362/codex-widget",
    previewMode: "image",
    locales: {
      zh: {
        category: "Vibe Coding / macOS Widget",
        status: "GitHub",
        title: "Codex Widget",
        summary: "一个 macOS 桌面小组件，用来快速查看 Codex 额度剩余、刷新时间与近 5 天 token 消耗趋势。",
        cardIntro:
          "给 Codex 做的“赛博油表”：桌面或小组件抽屉里一眼查看额度状态。",
        detailIntro:
          "Codex Widget 是我自己开发的 macOS 桌面小组件，用来解决每次查看 Codex 额度都要点进设置的麻烦。它可以直接添加到桌面，也可以放进左滑的小组件抽屉，快速展示额度剩余、刷新时间、进度条和近 5 天 token 消耗趋势。",
        audienceTitle: "为谁设计",
        audience: "在 macOS 上高频使用 Codex，希望随时知道额度状态、又不想反复打开设置的开发者和 AI 重度用户。",
        problemTitle: "核心痛点",
        problem: "额度信息藏在设置深处，缺少桌面级的即时反馈；高频工作时很难快速判断剩余额度和刷新时间。",
        principlesTitle: "核心产品设计",
        principles: [
          "用小号与中号两种 Widget 尺寸适配“快速扫一眼”和“查看趋势”两种场景。",
          "把 5 小时额度、周限额、刷新时间和近 5 天趋势压缩成可快速扫描的信息层级。",
          "菜单栏 App 解析本地日志，Widget 只读取脱敏缓存，明确隔离认证信息和展示数据。"
        ],
        buildTitle: "我在 Vibe Coding 中做了什么",
        buildHighlights: [
          "定义桌面油表的核心任务、信息优先级和小号 / 中号组件布局。",
          "设计本地日志解析、额度换算、趋势聚合与缓存快照的数据链路。",
          "处理 WidgetKit 刷新延迟、空数据、数据过期、解析异常和浅深色模式。",
          "完善源码安装、更新脚本与旧版本清理流程，让 Codex 也能协助用户完成安装。"
        ],
        previewTitle: "产品实景",
        previewDescription: "这是 Codex Quota 在 macOS 桌面上的小号与中号组件：小号负责额度速览，中号增加近 5 天趋势。",
        contextTitle: "背景",
        context:
          "高频使用 Codex 时，额度状态其实很像生产力工具里的“油表”。但原本每次都需要打开设置查看，路径偏深，也不适合随手瞄一眼。我希望把这个信息变成桌面上的轻量状态组件。",
        contributionTitle: "设计与构建",
        contribution:
          "项目围绕 macOS 小组件的日常可见性设计，将 5 小时额度、周限额、刷新时间和近 5 天 token 趋势组织成紧凑面板。视觉上保留类似系统小组件的圆角、浅色毛玻璃和绿色进度反馈，让信息可以被快速扫描。",
        impactTitle: "成果",
        impact: [
          "完成一个可添加到 macOS 桌面或小组件抽屉的 Codex 额度小组件。",
          "支持额度百分比、刷新时间、进度条与近 5 天 token 消耗趋势展示。",
          "把原本藏在设置里的额度信息变成随手可见的桌面状态。"
        ],
        metrics: [
          { value: "5h", label: "短周期额度" },
          { value: "7d", label: "周限额" },
          { value: "5", label: "趋势天数" }
        ],
        workflow: [
          { label: "额度场景识别", icon: "book" },
          { label: "Widget UI 设计", icon: "bot" },
          { label: "消耗数据展示", icon: "database" },
          { label: "GitHub 发布", icon: "file" }
        ],
        tags: [
          "macOS Widget",
          "Codex",
          "Vibe Coding",
          "Desktop Utility",
          "Token Usage",
          "GitHub"
        ],
        liveLabel: "查看 GitHub",
        detailLabel: "查看详情"
      },
      en: {
        category: "Vibe Coding / macOS Widget",
        status: "GitHub",
        title: "Codex Widget",
        summary:
          "A macOS desktop widget for checking Codex quota, refresh time, progress bars and recent token usage trends.",
        cardIntro:
          "A small desktop fuel gauge for Codex quota, built as a macOS widget.",
        detailIntro:
          "Codex Widget is a macOS desktop widget I built for checking Codex quota without opening settings every time. It can sit on the desktop or in the widget drawer, showing remaining quota, refresh time, progress bars and a five-day token usage trend.",
        audienceTitle: "Designed for",
        audience: "Developers and heavy AI users who use Codex frequently on macOS and need quota status without repeatedly opening settings.",
        problemTitle: "Core problem",
        problem: "Quota status is buried in settings and lacks desktop-level feedback, making it hard to judge remaining capacity and reset timing during active work.",
        principlesTitle: "Core product decisions",
        principles: [
          "Offer small and medium WidgetKit layouts for quick status checks and deeper trend reading.",
          "Compress five-hour quota, weekly limit, reset timing and five-day trends into a scan-friendly hierarchy.",
          "Let the menu bar app parse local logs while the widget reads only a sanitized cache, separating credentials from display data."
        ],
        buildTitle: "What I owned in Vibe Coding",
        buildHighlights: [
          "Defined the desktop fuel-gauge job, information priority and small / medium widget layouts.",
          "Designed the local log parsing, quota conversion, trend aggregation and snapshot cache pipeline.",
          "Handled WidgetKit refresh latency, empty, stale and error states, plus light and dark appearance.",
          "Built source installation, update and legacy-cleanup scripts so Codex can also help users install it."
        ],
        previewTitle: "Product in context",
        previewDescription: "Codex Quota shown as small and medium macOS widgets: the small view gives quota status, while the medium view adds a five-day trend.",
        contextTitle: "Context",
        context:
          "When Codex becomes a high-frequency work tool, quota status starts to feel like a productivity fuel gauge. The original path through settings was too deep for quick checks, so I wanted a lightweight widget that keeps this state visible at a glance.",
        contributionTitle: "Design & Build",
        contribution:
          "The widget organizes five-hour quota, weekly quota, refresh timing and recent token usage into a compact panel. The visual style follows macOS widget conventions with soft corners, a light glassy surface and green progress feedback for fast scanning.",
        impactTitle: "Impact",
        impact: [
          "Built a Codex quota widget that can be added to the macOS desktop or widget drawer.",
          "Shows quota percentages, refresh time, progress bars and five-day token usage trends.",
          "Turns quota information hidden in settings into an always-visible desktop status surface."
        ],
        metrics: [
          { value: "5h", label: "Short quota" },
          { value: "7d", label: "Weekly limit" },
          { value: "5", label: "Trend days" }
        ],
        workflow: [
          { label: "Quota use case", icon: "book" },
          { label: "Widget UI design", icon: "bot" },
          { label: "Usage data view", icon: "database" },
          { label: "GitHub release", icon: "file" }
        ],
        tags: [
          "macOS Widget",
          "Codex",
          "Vibe Coding",
          "Desktop Utility",
          "Token Usage",
          "GitHub"
        ],
        liveLabel: "Open GitHub",
        detailLabel: "View details"
      }
    }
  }
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
