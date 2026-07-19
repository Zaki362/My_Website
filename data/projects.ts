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
    slug: "xiaohongshu-creator-workbench",
    year: "2026",
    cover: "/projects/xiaohongshu-creator-workbench-cover.png",
    previewMode: "image",
    locales: {
      zh: {
        category: "Vibe Coding / AI Agent",
        status: "Private Demo",
        title: "小红书 AI 运营 Agent",
        summary: "为“阿华学长”构建的小红书自主运营 Agent，自动完成素材采集、选题决策和图文内容生产，最后由我审核并发布。",
        cardIntro:
          "自动收集素材、确定选题并生成图文内容，把日常运营推进到最后的人工审核与发布。",
        detailIntro:
          "小红书 AI 运营 Agent 不是一个单独的工作台，而是一套用 vibe coding 持续搭建的自主内容运营系统。它服务“阿华学长”账号，自动收集和筛选公开素材、判断值得生产的选题、生成原创文案与视觉内容，并把完成结果送到我面前审核；最终发布仍由我亲自确认和执行。工作台只是这套自动化闭环的控制界面。",
        audienceTitle: "为谁设计",
        audience: "希望减少日常选题和内容制作重复劳动，同时保留最终质量判断与账号发布权的个人创作者。",
        problemTitle: "核心痛点",
        problem: "运营一个知识账号需要每天反复找素材、判断选题、写文案、做图片和整理发布内容，链路长且高度依赖人工。单点生成工具只能解决其中一步，无法持续完成从素材发现到发布前成品的完整运营流程。",
        principlesTitle: "核心产品设计",
        principles: [
          "让 Agent 持续完成素材采集、选题判断和图文生产，把人工参与压缩到最后的成品审核与发布。",
          "素材信号必须回链到可信一手证据；证据不足时进入待补队列，自动化不以牺牲内容质量换取产量。",
          "所有自动步骤都可观察、可恢复、可人工接管；账号权限和最终发布始终保留在创作者手中。"
        ],
        buildTitle: "我在 Vibe Coding 中做了什么",
        buildHighlights: [
          "从长期自主运营目标出发，定义素材、选题、内容、视觉、审核和发布交接的完整状态机。",
          "搭建自动素材雷达与证据核验链路，让 Agent 能持续发现候选并自主判断值得生产的选题。",
          "串联原创文案、三套视觉方向、图片生成、资产验真和版本保留，自动产出可审核的发布内容。",
          "设计失败恢复、人工接管和发布门禁，让系统能连续运行，同时把最终账号操作留给我。"
        ],
        previewTitle: "脱敏控制界面",
        previewDescription: "这是自主运营 Agent 的可视化控制界面，用于查看自动选题、内容生产和审核状态。封面仅展示产品结构、公开选题与账号名称；真实业务数据、内部地址和账号凭据均未进入网站。",
        contextTitle: "背景",
        context:
          "知识类账号真正消耗时间的是日复一日的运营链路，而不是偶尔生成一篇文案。我希望让系统主动完成素材发现、选题判断和内容生产，把自己的精力集中在最后的质量判断与发布决策上。因此，这个项目从一次性脚本逐步演化为可连续运行、可审计、可恢复的自主运营 Agent。",
        contributionTitle: "设计与构建",
        contribution:
          "我负责定义自主运营目标、拆解人机分工、设计全链路状态与端到端验收，并借助 AI 编程助手实现素材雷达、选题决策、内容生产、视觉生成、审核和发布交接模块。工作台用于观察和接管这套系统，而不是产品本身的全部。",
        impactTitle: "成果",
        impact: [
          "跑通从公开素材自动采集、选题决策到原创图文生成的连续运营链路。",
          "自动产出包含文案和三套视觉候选的发布前内容包，支持修改、重生成与版本保留。",
          "将人工参与收敛到最终审核与发布，并把事实核验、失败恢复和账号权限落实为可验证的门禁。"
        ],
        metrics: [
          { value: "Auto", label: "运营链路" },
          { value: "3", label: "视觉方向" },
          { value: "Human", label: "最终审发" }
        ],
        workflow: [
          { label: "自动收集素材", icon: "book" },
          { label: "自动确定选题", icon: "database" },
          { label: "自动生成内容", icon: "bot" },
          { label: "人工审核发布", icon: "file" }
        ],
        tags: ["AI Agent", "Vibe Coding", "Autonomous Operations", "Content Pipeline", "Evidence Workflow", "Human-in-the-loop"],
        liveLabel: "查看演示",
        detailLabel: "查看详情"
      },
      en: {
        category: "Vibe Coding / AI Agent",
        status: "Private Demo",
        title: "Xiaohongshu AI Ops Agent",
        summary: "An autonomous operations agent for the Ahua Xuezhang account that collects material, selects topics and produces posts before my final review and publishing.",
        cardIntro:
          "It collects material, chooses topics and creates complete posts automatically, leaving only final review and publishing to me.",
        detailIntro:
          "Xiaohongshu AI Ops Agent is not simply a workbench. It is an autonomous content-operations system I have continuously built through vibe coding for the Ahua Xuezhang account. It automatically collects and filters public material, decides which topics are worth producing, generates original copy and visual content, and sends the finished package to me for review. I retain the final publishing decision and action; the workbench is only the control surface for this operating loop.",
        audienceTitle: "Designed for",
        audience: "Independent creators who want to remove repetitive topic and production work while retaining final quality judgment and publishing control.",
        problemTitle: "Core problem",
        problem: "Running a knowledge account requires repetitive daily work across sourcing, topic selection, copywriting, visuals and publish preparation. Point generation tools solve only one step and cannot sustain the complete operating loop from discovery to a publish-ready package.",
        principlesTitle: "Core product decisions",
        principles: [
          "Let the agent continuously handle material collection, topic decisions and post production, reducing human involvement to final review and publishing.",
          "Require content signals to link back to trusted primary evidence; weakly supported opportunities stay pending rather than trading quality for volume.",
          "Keep every automated step observable, recoverable and interruptible while preserving account permissions and final publishing for the creator."
        ],
        buildTitle: "What I owned in Vibe Coding",
        buildHighlights: [
          "Defined the complete operating state machine across material, topic, content, visuals, review and publishing handoff.",
          "Built an automated material radar and evidence pipeline so the agent can continuously discover candidates and decide what deserves production.",
          "Connected original copy, three visual directions, image generation, asset validation and version history into a publish-ready output flow.",
          "Designed recovery, human takeover and publishing gates so the system can keep running while leaving final account actions to me."
        ],
        previewTitle: "Redacted control surface",
        previewDescription: "This is the visual control surface for monitoring automated topic decisions, content production and review state. It shows only product structure, public topic material and the account name; no private business data, internal URLs or account credentials are included.",
        contextTitle: "Context",
        context:
          "The real cost of a knowledge account is the operating loop repeated every day, not generating an occasional post. I wanted the system to proactively discover material, choose topics and produce content so I could focus on final quality judgment and publishing decisions. The project therefore evolved from a one-off script into a continuously running, auditable and recoverable operations agent.",
        contributionTitle: "Design & Build",
        contribution:
          "I defined the autonomous operating goal, human-agent division of labor, end-to-end state model and acceptance criteria, then used an AI coding assistant to implement the radar, topic decision, content production, visual generation, review and handoff modules. The workbench helps observe and take over the system; it is not the whole product.",
        impactTitle: "Impact",
        impact: [
          "Completed a continuous operating loop from automated public-material collection and topic decisions to original post generation.",
          "Automatically produces publish-ready packages with copy and three visual candidates, including revision, regeneration and version history.",
          "Reduced human involvement to final review and publishing while turning evidence quality, recovery and account permissions into verifiable gates."
        ],
        metrics: [
          { value: "Auto", label: "Operating loop" },
          { value: "3", label: "Visual directions" },
          { value: "Human", label: "Final review" }
        ],
        workflow: [
          { label: "Collect material", icon: "book" },
          { label: "Choose topics", icon: "database" },
          { label: "Generate content", icon: "bot" },
          { label: "Human review & post", icon: "file" }
        ],
        tags: ["AI Agent", "Vibe Coding", "Autonomous Operations", "Content Pipeline", "Evidence Workflow", "Human-in-the-loop"],
        liveLabel: "View demo",
        detailLabel: "View details"
      }
    }
  },
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
        previewTitle: "真实产品截图",
        previewDescription: "详情页展示 Codex Quota 在 macOS 桌面上的真实小号与中号组件；项目列表封面使用同一信息结构的 Demo 模型。",
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
        previewTitle: "Real product screenshot",
        previewDescription: "The detail page shows the real small and medium Codex Quota widgets on macOS; project-list covers use a demo model with the same information structure.",
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
