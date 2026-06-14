export type ProjectLocale = "en" | "zh";

export type ProjectCopy = {
  category: string;
  status: string;
  title: string;
  summary: string;
  cardIntro: string;
  detailIntro: string;
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
  locales: Record<ProjectLocale, ProjectCopy>;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "fitlog-minimal",
    year: "2026",
    cover: "/projects/fitlog-minimal-cover.png",
    liveUrl: "https://fitlog-minimal.vercel.app/",
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
