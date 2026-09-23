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
  externalDemoLabel?: string;
  detailLabel: string;
};

export type PortfolioProject = {
  slug: string;
  year: string;
  cover: string;
  liveUrl?: string;
  githubUrl?: string;
  video?: string;
  videoDurationSeconds?: number;
  previewMode: "interactive" | "image" | "video";
  locales: Record<ProjectLocale, ProjectCopy>;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "xiaohongshu-creator-workbench",
    year: "2026",
    cover: "/projects/redflow-creative-cover-20260923.png",
    video: "/projects/redflow-dual-workflow-demo-20260923.mp4",
    videoDurationSeconds: 116,
    previewMode: "video",
    locales: {
      zh: {
        category: "Vibe Coding / AI Creation",
        status: "双路径创作 · 视频 Demo",
        title: "RedFlow｜AI 图文创作助手",
        summary: "面向个人创作者的 AI 图文创作助手：通过语音或文字追问梳理灵感，也可从灵感广场选题直接制作，形成可预览、编辑和导出的图文作品。",
        cardIntro: "从一句想法、几张照片开始，通过引导追问整理成稿；也可从灵感广场选择主题，直接生成文案与配图。",
        detailIntro: "RedFlow 是面向个人创作者的 AI 图文创作助手。它通过语音或文字中的引导追问，帮助用户明确表达角度、补充细节，将零散想法与照片整理成图文；也支持从灵感广场选择主题，直接生成文案与配图。两条路径都支持预览、修改和发布准备，最终由用户自行发布。",
        audienceTitle: "为谁设计",
        audience: "已有经历、观点或照片，却难以整理成作品的个人创作者，覆盖生活记录、知识科普与经验分享。",
        problemTitle: "核心痛点",
        problem: "AI 降低了制作门槛，但灵感仍缺少清晰的表达角度、具体细节与内容结构；选题、选图和写作之间的切换又让创作容易中断。",
        principlesTitle: "两条创作路径",
        principles: [
          "灵感共创：从语音、文字或照片开始，通过最多五轮追问梳理角度与细节；信息充分时可提前成稿，生成标题、正文与话题，并结合用户照片形成初稿。",
          "直接生成：从灵感广场的近期与历史精选中选题，确认文案和组图方案，再生成配图、审核与修订。当前广场以 AI 资讯为主，个人灵感共创不限定内容主题。",
          "共同完成：在小红书式预览中检查图文，修改内容、保存草稿并继续编辑，确认后导出发布材料，由用户在自己的账号发布。"
        ],
        buildTitle: "产品判断与 AI 协作",
        buildHighlights: [
          "我负责产品定位、双创作路径与移动优先体验，把核心问题从“生成内容”推进到“帮助用户形成表达”，并确定先做图文、追问最多五轮。",
          "通过手机试用与实际反馈打磨语音体验：进入即对话、只显示本轮字幕、上传照片不打断回应、静音不暂停会话。AI 协助拆解实现、修订并验证。",
          "按任务分工接入模型：千问 Omni 负责语音理解与回应，DeepSeek 负责文字追问、成稿与视觉规划，千问 Image 负责直接制作链路中的 AI 配图。",
          "串联预览编辑、草稿恢复和导出，并通过会话隔离、版本校验与调用限额保护创作进度；我主导关键取舍和体验验收，AI 协助完成工程落地。"
        ],
        previewTitle: "1 分 56 秒 · 双路径 Demo",
        previewDescription: "2026.09.23 最新录屏：游乐园经历的语音共创，以及灵感广场选题后的直接生成。录屏无声；固定案例演示中部分制作与发布准备状态为模拟，不实际发布。",
        contextTitle: "背景",
        context: "制作门槛降低后，从灵感到成品仍有缺口。个人创作者不仅需要文案与配图工具，也需要通过追问明确想表达什么、补充必要细节，并顺畅完成预览与修改。",
        contributionTitle: "设计与构建",
        contribution: "我主导产品方向、双路径设计、移动优先体验、模型分工和验收；AI 协助实现语音与文字共创、照片上传、选题直接制作、草稿恢复和图文编辑。服务端通过 Node.js 与 Python 编排流程，PostgreSQL 保存对话与草稿，R2 存储媒体。",
        impactTitle: "当前能力",
        impact: [
          "形成“个人灵感共创”与“精选选题直接制作”两条路径，分别承接表达组织与选题供给。",
          "把对话、照片、图文成稿、预览编辑与草稿恢复连接起来，让零散想法可以持续完善为作品。",
          "当前聚焦可编辑的图文与发布准备；账号定位、长期表达偏好、原生 App 和视频创作仍属于后续规划。"
        ],
        metrics: [
          {
            value: "2",
            label: "创作路径"
          },
          {
            value: "≤5",
            label: "共创追问轮次"
          },
          {
            value: "116s",
            label: "最新演示"
          }
        ],
        workflow: [
          {
            label: "表达想法或选择主题",
            icon: "book"
          },
          {
            label: "共创追问或确认方案",
            icon: "bot"
          },
          {
            label: "生成图文并预览编辑",
            icon: "file"
          },
          {
            label: "保存草稿与导出",
            icon: "database"
          }
        ],
        tags: [
          "RedFlow",
          "语音共创",
          "双路径创作",
          "Qwen Omni",
          "DeepSeek",
          "Qwen Image",
          "Vibe Coding"
        ],
        liveLabel: "观看视频 Demo",
        detailLabel: "查看详情"
      },
      en: {
        category: "Vibe Coding / AI Creation",
        status: "Two creation paths · Video demo",
        title: "RedFlow | AI Content Creation Assistant",
        summary: "An AI creation assistant that turns ideas into editable posts through guided voice or text conversations, or creates copy and images directly from curated topics.",
        cardIntro: "Start with an idea or a few photos and shape them into a post through guided questions, or choose a curated topic to generate copy and images.",
        detailIntro: "RedFlow helps individual creators turn scattered ideas and photos into editable posts. Guided voice or text conversations clarify the angle and fill in missing details. A second path starts with a curated topic and generates copy and images directly. Both support preview, revision and publishing preparation, with final publishing handled by the creator.",
        audienceTitle: "Designed for",
        audience: "Individual creators with experiences, opinions or photos to share, across everyday life, educational content and practical advice.",
        problemTitle: "Core problem",
        problem: "AI makes production easier, but an idea still needs an angle, specific details and a clear structure. Switching between topic selection, photos and writing can interrupt the process.",
        principlesTitle: "Two creation paths",
        principles: [
          "Guided co-creation: start with voice, text or photos. Up to five rounds of questions clarify the angle and details, with earlier drafting when ready. The result combines a title, copy and hashtags with the creator’s photos.",
          "Direct generation: select recent or archived material from the inspiration feed, confirm copy and an image plan, then generate, review and revise images. The feed currently focuses on AI news; personal co-creation is not limited to that topic.",
          "A shared finish: review the post in a Xiaohongshu-style preview, edit, save a draft and return to it later. Export the publishing materials and publish from the creator’s own account."
        ],
        buildTitle: "Product judgment & AI collaboration",
        buildHighlights: [
          "I owned the positioning, two creation paths and mobile-first experience, focusing on helping people form an expression. I set the initial scope to image-and-text posts and capped guided questioning at five rounds.",
          "Mobile testing shaped the voice flow: start talking on entry, show only the current turn, let photo uploads coexist with responses, and keep the session going while muted. AI assisted with implementation, revision and verification.",
          "Assigned models by task: Qwen Omni for voice understanding and responses, DeepSeek for text questions, drafting and visual planning, and Qwen Image for images in the direct-generation path.",
          "Connected preview editing, draft recovery and export, with session isolation, revision checks and usage limits. I led product tradeoffs and experience acceptance while AI helped implement the system."
        ],
        previewTitle: "1 min 56 sec · Two-path demo",
        previewDescription: "Latest recording, Sep 23, 2026: voice co-creation from an amusement-park visit, followed by direct generation from the inspiration feed. No audio. The fixed-case demo simulates some production and publishing-preparation states; it does not publish.",
        contextTitle: "Context",
        context: "Lower production costs do not close the gap between an idea and a finished post. Creators also need help clarifying what they want to say, adding useful details and moving smoothly through preview and revision.",
        contributionTitle: "Design & Build",
        contribution: "I led positioning, the two workflows, mobile experience, model roles and acceptance. AI helped implement voice and text co-creation, photo uploads, direct generation, draft recovery and editing. Node.js and Python orchestrate the workflows, PostgreSQL stores conversations and drafts, and R2 stores media.",
        impactTitle: "Current capabilities",
        impact: [
          "Two paths address different needs: organizing personal ideas through co-creation, and turning curated topics into posts through direct generation.",
          "Connects conversations, photos, drafting, preview editing and draft recovery so ideas can develop into finished work.",
          "Currently focused on editable image-and-text posts and publishing materials. Account positioning, long-term style preferences, a native app and video creation remain future plans."
        ],
        metrics: [
          {
            value: "2",
            label: "Creation paths"
          },
          {
            value: "≤5",
            label: "Question rounds"
          },
          {
            value: "116s",
            label: "Latest demo"
          }
        ],
        workflow: [
          {
            label: "Share an idea or pick a topic",
            icon: "book"
          },
          {
            label: "Discuss or confirm a plan",
            icon: "bot"
          },
          {
            label: "Generate, preview and edit",
            icon: "file"
          },
          {
            label: "Save a draft and export",
            icon: "database"
          }
        ],
        tags: [
          "RedFlow",
          "Voice co-creation",
          "Two creation paths",
          "Qwen Omni",
          "DeepSeek",
          "Qwen Image",
          "Vibe Coding"
        ],
        liveLabel: "Watch video demo",
        detailLabel: "View details"
      }
    }
  },
  {
    slug: "scenecart-ai",
    year: "2026",
    cover: "/projects/scenecart-ai-cover.png",
    liveUrl: "https://scenecart-public-demo.vercel.app/",
    video: "/projects/scenecart-full-demo-hq-v3-bgm.mp4",
    videoDurationSeconds: 101,
    previewMode: "video",
    locales: {
      zh: {
        category: "Vibe Coding / Shopping Agent",
        status: "视频 + 在线 Demo",
        title: "场景购｜场景化购物 Agent",
        summary: "把模糊生活目标转成购物模块、优先级、预算、候选和清单；正式产品通过本地执行器连接淘宝，公开 Demo 用冻结样本安全复现完整流程。",
        cardIntro:
          "先帮用户想清楚买什么、先买什么和如何分配预算，再把确认后的规划推进到搜索、推荐与购物清单。",
        detailIntro:
          "场景购是我用 vibe coding 持续构建的场景化购物 Agent。用户只要描述生活场景、预算与偏好，系统就会澄清需求、拆分购物模块、安排优先级与预算、分模块搜索并解释推荐，最后整理成可调整的购物清单。当前开放新车选购、露营准备、房间装饰、宿舍入学和搬家置办五类场景。正式产品通过用户电脑上的本地执行器连接淘宝；公开 Demo 使用冻结样本，不连接账号、模型或真实购物车。",
        audienceTitle: "为谁设计",
        audience: "有明确生活或消费场景，却还没有形成具体购买清单、优先级和预算方案的人。",
        problemTitle: "核心痛点",
        problem: "电商平台擅长承接明确单品搜索，但场景型购物仍要求用户自己拆模块、排优先级、分预算并跨品类比较。商品供给很多，不等于购物任务已经被组织好。",
        principlesTitle: "核心产品设计",
        principles: [
          "把复杂购物任务拆成澄清场景、生成规划、分配优先级与预算、分模块搜索、推荐解释、动态调整和购物清单。",
          "让 DeepSeek 负责理解与受约束决策，业务规则继续校验模块覆盖、预算守恒、商品证据和可执行动作。",
          "云端负责任务与状态，本地执行器连接淘宝桌面版工具；真实加购逐件确认，系统不会自动下单或支付。"
        ],
        buildTitle: "我在 Vibe Coding 中做了什么",
        buildHighlights: [
          "从新车首购扩展出五个配置驱动场景，让不同生活任务复用同一套需求、规划、搜索、推荐和清单工作流。",
          "搭建 DeepSeek 决策与业务 Guardrail 协作的编排层，让预算、模块、候选和停止原因可解释、可校验。",
          "实现持久 Session、任务队列、SSE 续传、断线恢复和幂等回填，让长流程在页面关闭后仍可继续。",
          "设计正式产品与公开 Demo 的隔离边界：共享 UI 与稳定逻辑，但冻结数据绝不连接正式数据库、模型、淘宝账号或真实购物车。"
        ],
        previewTitle: "101 秒完整视频 Demo",
        previewDescription: "视频展示从需求澄清、规划确认、分模块推荐到演示清单的完整流程；也可打开公开 Demo 手动体验同一套流程。Demo 使用冻结数据，不连接正式账号或淘宝。",
        contextTitle: "背景",
        context:
          "新车置办、露营、装修、宿舍入学和搬家都不是一次简单搜索。用户往往知道要完成什么，却不清楚完整清单、购买顺序和预算取舍。场景购先组织决策，再把确认后的方案推进到商品候选与购物清单。",
        contributionTitle: "设计与构建",
        contribution:
          "我负责产品定位、五类场景配置、阶段式用户路径、Agent 与确定性规则边界、预算和候选质量门、云端与本地执行分层，以及正式产品和公开 Demo 的数据隔离。实现覆盖 Next.js、DeepSeek、PostgreSQL、持久任务队列、SSE 与本地执行器。",
        impactTitle: "成果",
        impact: [
          "把模糊生活目标转化为有优先级、有预算约束的模块化购物方案。",
          "形成从需求理解到搜索比选、证据解释、动态调整和购物清单的可恢复 Agent 工作流。",
          "提供与正式产品隔离的公开 Demo，让外部访客无需登录即可安全体验流程和决策方法。"
        ],
        metrics: [
          { value: "5", label: "已开放场景" },
          { value: "7", label: "核心能力" },
          { value: "0", label: "自动下单 / 支付" }
        ],
        workflow: [
          { label: "描述购物场景", icon: "book" },
          { label: "Agent 规划预算", icon: "bot" },
          { label: "分模块搜索推荐", icon: "database" },
          { label: "调整并确认清单", icon: "file" }
        ],
        tags: ["场景购", "AI Agent", "Vibe Coding", "Scene Commerce", "DeepSeek", "Local Executor", "Safety Guardrails"],
        liveLabel: "观看视频 Demo",
        externalDemoLabel: "在线体验 Demo",
        detailLabel: "查看详情与 Demo"
      },
      en: {
        category: "Vibe Coding / Shopping Agent",
        status: "Video + Live Demo",
        title: "SceneCart | Scenario Shopping Agent",
        summary: "Turns fuzzy life goals into shopping modules, priorities, budgets, candidates and a checklist. The formal product connects to Taobao through a local executor, while the public demo safely replays the full flow with frozen samples.",
        cardIntro:
          "It helps users decide what to buy, what comes first and how to allocate a budget before moving the confirmed plan into search, recommendations and a checklist.",
        detailIntro:
          "SceneCart is a scenario-shopping agent I have continuously built through vibe coding. After a user describes a life scenario, budget and preferences, it clarifies the need, splits the task into shopping modules, assigns priorities and budgets, searches by module, explains recommendations and produces an adjustable checklist. It currently supports new-car setup, camping, room decor, dorm move-in and moving. The formal product connects to Taobao through a local executor on the user's computer; the public demo uses frozen samples and never connects to accounts, models or a real cart.",
        audienceTitle: "Designed for",
        audience: "People with a clear life or spending scenario who have not yet formed a concrete shopping list, priority order or budget plan.",
        problemTitle: "Core problem",
        problem: "Commerce platforms handle known-item search well, but scenario shopping still leaves users to define modules, rank priorities, allocate budgets and compare across categories. Abundant supply does not mean the shopping task is organized.",
        principlesTitle: "Core product decisions",
        principles: [
          "Break complex shopping into scenario clarification, planning, priority and budget allocation, module search, recommendation reasoning, dynamic adjustment and a checklist.",
          "Let DeepSeek handle understanding and constrained decisions while business rules validate coverage, budget conservation, product evidence and allowed actions.",
          "Keep tasks and state in the cloud while a local executor connects to Taobao desktop tools; real cart actions require item-by-item confirmation, and the system never orders or pays automatically."
        ],
        buildTitle: "What I owned in Vibe Coding",
        buildHighlights: [
          "Expanded the original new-car case into five configuration-driven scenarios that share one needs, planning, search, recommendation and checklist workflow.",
          "Built an orchestration layer across DeepSeek decisions and business guardrails so budgets, modules, candidates and stopping reasons stay explainable and validatable.",
          "Implemented persistent sessions, a job queue, SSE continuation, recovery and idempotent callbacks so long-running workflows survive page closure.",
          "Designed the formal-product/public-demo boundary: shared UI and stable logic, but frozen demo data can never reach the production database, model, Taobao account or real cart."
        ],
        previewTitle: "101-second product demo",
        previewDescription: "The video covers scenario clarification, plan confirmation, module recommendations and the demo checklist. You can also open the public demo to explore the same flow. It uses frozen data and never connects to a production account or Taobao.",
        contextTitle: "Context",
        context:
          "New-car setup, camping, room decoration, dorm move-in and moving are not single searches. Users know the outcome they want but not the full list, sequence or budget trade-offs. SceneCart organizes that decision first, then moves the confirmed plan into product candidates and a checklist.",
        contributionTitle: "Design & Build",
        contribution:
          "I owned the positioning, five scenario configurations, staged journey, boundary between agent reasoning and deterministic rules, budget and candidate quality gates, cloud/local split and isolation between the formal product and public demo. The implementation spans Next.js, DeepSeek, PostgreSQL, persistent queues, SSE and a local executor.",
        impactTitle: "Impact",
        impact: [
          "Turns fuzzy life goals into prioritized modular shopping plans with explicit budget constraints.",
          "Creates a recoverable workflow from needs understanding through search, evidence-backed recommendations, adjustment and a shopping checklist.",
          "Provides an isolated public demo so visitors can safely experience the workflow and decision method without logging in."
        ],
        metrics: [
          { value: "5", label: "Live scenarios" },
          { value: "7", label: "Core capabilities" },
          { value: "0", label: "Automatic orders / payment" }
        ],
        workflow: [
          { label: "Describe the scenario", icon: "book" },
          { label: "Agent plans the budget", icon: "bot" },
          { label: "Search & recommend by module", icon: "database" },
          { label: "Adjust and confirm the list", icon: "file" }
        ],
        tags: ["SceneCart", "AI Agent", "Vibe Coding", "Scene Commerce", "DeepSeek", "Local Executor", "Safety Guardrails"],
        liveLabel: "Watch video demo",
        externalDemoLabel: "Try live demo",
        detailLabel: "View details & demo"
      }
    }
  },
  {
    slug: "fitlog-minimal",
    year: "2026",
    cover: "/projects/fitlog-product-20260916.png",
    liveUrl: "https://fitlog-minimal.vercel.app/",
    previewMode: "interactive",
    locales: {
      zh: {
        category: "Vibe Coding / PWA",
        status: "Live PWA",
        title: "练一下 / FitLog Minimal",
        summary: "无需账号、本地优先的个人健身记录 PWA，支持快速开练、轻量记录与可选跨设备同步。",
        cardIntro:
          "从自己的训练习惯出发，用 AI 编程助手协作完成；无需账号、本地优先，可通过同步码跨设备同步。",
        detailIntro:
          "练一下 / FitLog Minimal 是我用 vibe coding 方式完成的个人健身记录 PWA，围绕“快速开练、轻量记录、持续复盘”设计。无需账号，训练数据默认保存在本地，也可通过同步码在不同设备间上传和恢复。",
        audienceTitle: "为谁设计",
        audience: "有固定力量训练习惯、希望自己掌控训练节奏，又不想被复杂健身 App 打断的人。",
        problemTitle: "核心痛点",
        problem: "训练记录散落在备忘录和表格里；重型 App 操作层级深，真正开练时反而增加记录负担。",
        principlesTitle: "核心产品设计",
        principles: [
          "首页把“开始训练”放在最强视觉位置，并结合历史记录给出今日训练建议。",
          "用动作库、训练中记录、历史复盘串成一条连续路径，减少页面间反复跳转。",
          "坚持无需账号、本地优先，保留导入导出，并用可选同步码支持跨设备上传与恢复。"
        ],
        buildTitle: "我在 Vibe Coding 中做了什么",
        buildHighlights: [
          "从个人训练流程出发定义信息架构、核心任务和 MVP 边界。",
          "设计移动端训练流程、动作库、记录反馈与历史复盘交互。",
          "建立本地数据结构、导入导出与可选云同步，补齐训练日期选择和未完成训练的草稿恢复。",
          "用 AI 编程助手完成快速实现，但由我负责需求判断、体验取舍和验收迭代。"
        ],
        previewTitle: "直接体验产品",
        previewDescription: "下方是正在运行的 FitLog，可以直接点击和滚动；也可以在新窗口打开完整版本。",
        contextTitle: "背景",
        context:
          "日常训练记录往往会被复杂健身 App、表格和临时备忘录切碎。我希望有一个打开就能开练、训练中能快速记录、之后能复盘频率和部位状态的小工具。",
        contributionTitle: "设计与构建",
        contribution:
          "动作库、训练中记录、历史统计和数据导入导出以本地浏览器存储为基础，无需账号。需要换设备时，可通过同步码将数据上传到云端，再在另一台设备恢复；也可开启保存修改后自动上传。训练日期选择与草稿恢复进一步支持补记和中断后继续训练。",
        impactTitle: "成果",
        impact: [
          "完成一个可直接使用的个人健身记录 PWA。",
          "覆盖动作库、训练中记录、历史统计和数据导入导出，并支持可选同步码跨设备同步。",
          "验证了 vibe coding 从个人需求到可用工具的快速闭环。"
        ],
        metrics: [
          { value: "同步码", label: "可选跨设备同步" },
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
        summary: "An account-free, local-first fitness PWA for quick workouts, lightweight logging and optional cross-device sync.",
        cardIntro:
          "Built from my own training habits with an AI coding assistant: no account required, local-first storage and optional sync codes for other devices.",
        detailIntro:
          "FitLog Minimal is a personal fitness tracking PWA built with vibe coding for quick workout starts, lightweight logging and continuous review. No account is required: data stays on the device by default, with an optional sync code to upload and restore it across devices.",
        audienceTitle: "Designed for",
        audience: "Regular strength-training users who want control over their routine without the overhead of a complex fitness app.",
        problemTitle: "Core problem",
        problem: "Workout data gets scattered across notes and spreadsheets, while heavyweight apps add friction at the exact moment users want to start training.",
        principlesTitle: "Core product decisions",
        principles: [
          "Make Start Workout the strongest action and use history to suggest today's training focus.",
          "Connect exercise library, in-session logging and history review into one continuous flow.",
          "Require no account, keep data local by default and support import/export, with optional sync codes for cross-device upload and restore."
        ],
        buildTitle: "What I owned in Vibe Coding",
        buildHighlights: [
          "Defined the information architecture, core jobs and MVP boundary from my own training workflow.",
          "Designed the mobile workout flow, exercise library, logging feedback and history review.",
          "Built local storage, import/export and optional cloud sync, then added workout date selection and recovery of unfinished workout drafts.",
          "Used an AI coding assistant for implementation while owning product judgment, trade-offs and acceptance."
        ],
        previewTitle: "Try the product",
        previewDescription: "This is the running FitLog product. You can interact with it here or open the full version in a new window.",
        contextTitle: "Context",
        context:
          "Daily training records can easily get scattered across heavy fitness apps, spreadsheets and quick notes. I wanted a small tool that opens quickly, helps me log during training and supports later review of frequency and muscle group status.",
        contributionTitle: "Design & Build",
        contribution:
          "The exercise library, in-workout logging, history statistics and import/export use local browser storage with no account required. A sync code can optionally upload data to the cloud and restore it on another device, with automatic upload after local changes available. Workout date selection and draft recovery support backdated entries and resuming interrupted sessions.",
        impactTitle: "Impact",
        impact: [
          "Built a usable fitness tracking PWA for real personal training.",
          "Covered exercise library, in-workout logging, history statistics and import/export, with optional sync codes for cross-device use.",
          "Validated a vibe coding workflow from personal demand to shippable product."
        ],
        metrics: [
          { value: "Sync code", label: "Optional device sync" },
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
    liveUrl: "/projects/codex-widget-promo.html",
    githubUrl: "https://github.com/Zaki362/codex-widget",
    previewMode: "image",
    locales: {
      zh: {
        category: "Vibe Coding / macOS Widget",
        status: "GitHub",
        title: "Codex Quota",
        summary: "一个 macOS 桌面小组件，用来快速查看 Codex 额度与消耗趋势；发布后获得小红书 200+ 点赞收藏、GitHub 10 Stars，已有数十位用户使用。",
        cardIntro:
          "给 Codex 做的桌面“赛博油表”：发布到小红书后获得 200+ 点赞收藏，GitHub 10 Stars，目前已有数十位用户使用。",
        detailIntro:
          "Codex Quota（Codex Widget）是我开发的 macOS 菜单栏应用与桌面小组件，让 Codex 额度状态随时可见。小号组件展示额度剩余与重置时间，中号组件增加最近 5 个完整自然日的 token 趋势，优先采用 Codex 官方每日用量汇总。",
        audienceTitle: "为谁设计",
        audience: "在 macOS 上高频使用 Codex，希望随时知道额度状态、又不想反复打开设置的开发者和 AI 重度用户。",
        problemTitle: "核心痛点",
        problem: "额度信息藏在设置深处，缺少桌面级的即时反馈；高频工作时很难快速判断剩余额度和刷新时间。",
        principlesTitle: "核心产品设计",
        principles: [
          "用小号与中号两种 Widget 尺寸适配“快速扫一眼”和“查看趋势”两种场景。",
          "把 5 小时额度、周限额和重置时间放在首层；趋势只展示最近 5 个完整自然日，不计入当天尚未稳定的数据。",
          "菜单栏 App 获取官方每日用量并从本地日志读取额度窗口，Widget 只读取脱敏缓存，隔离认证信息与展示数据。"
        ],
        buildTitle: "我在 Vibe Coding 中做了什么",
        buildHighlights: [
          "定义桌面油表的核心任务、信息优先级和小号 / 中号组件布局。",
          "将趋势数据切换为 Codex 官方每日汇总，按最近 5 个完整自然日对齐，避免不同模型通道重复累加。",
          "官方查询失败时保留上次成功趋势，仅在首次尚无官方数据时回退本地日志；处理 WidgetKit 延迟与空数据、过期和异常状态。",
          "完善源码安装、更新脚本与旧版本清理流程，让 Codex 也能协助用户完成安装。"
        ],
        previewTitle: "真实产品截图",
        previewDescription: "详情页展示 Codex Quota 在 macOS 桌面上的真实小号与中号组件；项目列表封面使用同一信息结构的 Demo 模型。",
        contextTitle: "背景",
        context:
          "高频使用 Codex 时，额度状态其实很像生产力工具里的“油表”。但原本每次都需要打开设置查看，路径偏深，也不适合随手瞄一眼。我希望把这个信息变成桌面上的轻量状态组件。",
        contributionTitle: "设计与构建",
        contribution:
          "围绕桌面上随手查看的场景，将额度、重置时间和趋势组织成紧凑面板。趋势优先读取 Codex 官方每日汇总，以昨天为终点展示 5 个完整自然日，并据此计算日均；查询失败保留上次成功数据，首次尚无官方趋势才回退日志。菜单栏 App 负责刷新和写入脱敏快照，Widget 只读缓存，不直接扫描日志。",
        impactTitle: "成果",
        impact: [
          "完成一个可添加到 macOS 桌面或小组件抽屉的 Codex 额度小组件。",
          "支持额度百分比、刷新与重置时间，以及最近 5 个完整自然日的官方 token 趋势和日均消耗。",
          "发布到小红书后获得 200+ 点赞收藏，GitHub 获得 10 Stars，目前已有数十位用户使用。"
        ],
        metrics: [
          { value: "200+", label: "小红书点赞收藏" },
          { value: "10", label: "GitHub Stars" },
          { value: "数十", label: "当前用户" }
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
        liveLabel: "产品介绍与安装指南",
        detailLabel: "查看详情"
      },
      en: {
        category: "Vibe Coding / macOS Widget",
        status: "GitHub",
        title: "Codex Quota",
        summary:
          "A macOS widget for checking Codex quota and usage trends, with 200+ Xiaohongshu likes and saves, 10 GitHub Stars and dozens of current users.",
        cardIntro:
          "A desktop fuel gauge for Codex quota that earned 200+ Xiaohongshu likes and saves, 10 GitHub Stars and is now used by dozens of people.",
        detailIntro:
          "Codex Quota (Codex Widget) is a macOS menu bar app and desktop widget I built to keep quota status visible. The small widget shows remaining quota and reset times; the medium widget adds token trends for the latest five complete calendar days, prioritizing Codex's official daily usage totals.",
        audienceTitle: "Designed for",
        audience: "Developers and heavy AI users who use Codex frequently on macOS and need quota status without repeatedly opening settings.",
        problemTitle: "Core problem",
        problem: "Quota status is buried in settings and lacks desktop-level feedback, making it hard to judge remaining capacity and reset timing during active work.",
        principlesTitle: "Core product decisions",
        principles: [
          "Offer small and medium WidgetKit layouts for quick status checks and deeper trend reading.",
          "Prioritize five-hour quota, weekly limits and reset times; show only the latest five complete calendar days, excluding today's unsettled usage.",
          "Let the menu bar app fetch official daily usage and read quota windows from local logs; the widget reads only a sanitized cache, keeping credentials separate."
        ],
        buildTitle: "What I owned in Vibe Coding",
        buildHighlights: [
          "Defined the desktop fuel-gauge job, information priority and small / medium widget layouts.",
          "Switched trends to Codex's official daily totals across five complete calendar days, avoiding duplicate counts across model channels.",
          "Preserved the last successful official trend when queries fail, falling back to local logs only before official data is first available; handled WidgetKit latency and empty, stale and error states.",
          "Built source installation, update and legacy-cleanup scripts so Codex can also help users install it."
        ],
        previewTitle: "Real product screenshot",
        previewDescription: "The detail page shows the real small and medium Codex Quota widgets on macOS; project-list covers use a demo model with the same information structure.",
        contextTitle: "Context",
        context:
          "When Codex becomes a high-frequency work tool, quota status starts to feel like a productivity fuel gauge. The original path through settings was too deep for quick checks, so I wanted a lightweight widget that keeps this state visible at a glance.",
        contributionTitle: "Design & Build",
        contribution:
          "The compact panel keeps quota, reset times and trends visible at a glance. Trends prioritize Codex's official daily totals for five complete calendar days ending yesterday, which also determine the daily average. Failed queries retain the last successful data; local logs are a fallback only before the first official trend is available. The menu bar app refreshes and writes sanitized snapshots, while the widget reads the cache without scanning logs.",
        impactTitle: "Impact",
        impact: [
          "Built a Codex quota widget that can be added to the macOS desktop or widget drawer.",
          "Shows quota percentages, refresh and reset times, plus official token trends and daily averages for the latest five complete calendar days.",
          "Earned 200+ likes and saves on Xiaohongshu, reached 10 GitHub Stars and is now used by dozens of people."
        ],
        metrics: [
          { value: "200+", label: "Xiaohongshu likes & saves" },
          { value: "10", label: "GitHub Stars" },
          { value: "Dozens", label: "Current users" }
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
        liveLabel: "Product & installation guide",
        detailLabel: "View details"
      }
    }
  },
  {
    slug: "laiwan-weekend",
    year: "2026",
    cover: "/projects/laiwan-weekend-cover.png",
    liveUrl: "https://laiwan-weekend.vercel.app/",
    githubUrl: "https://github.com/Zaki362/laiwan-weekend",
    previewMode: "image",
    locales: {
      zh: {
        category: "Vibe Coding / 城市探索",
        status: "在线交互原型",
        title: "来玩｜周末城市探索指南",
        summary: "面向大学生的周末探索产品，把附近发现、想去、同行沟通、行程安排和到访记录串成完整流程；提供上海真实场所路线与可交互社交演示。",
        cardIntro: "好玩的地方，一起去。按预算、距离和天气找到好去处，再把想去的地方安排成一个周末。",
        detailIntro: "来玩是我用 vibe coding 构建的城市探索产品原型，面向时间和预算有限、希望找到好去处与同伴的大学生。它从六条上海真实场所路线出发，把筛选推荐、想去、消息、行程安排、邀请分享和到访记录串在一起。天气接入 Open-Meteo；社交人物与回复为示例，消息和个人记录保存在当前浏览器。",
        audienceTitle: "为谁设计",
        audience: "周末时间和预算有限，希望发现本地活动、找到同好并与朋友安排出行的大学生。",
        problemTitle: "核心痛点",
        problem: "好去处收藏了很多，真正出门却还要分别查预算、看天气、找同伴和排行程。信息发现、同行沟通与个人安排缺少衔接，让“想去”停留在收藏里。",
        principlesTitle: "核心产品设计",
        principles: [
          "先帮助用户找到符合预算、距离和天气条件的活动，再展开社交与行程规划；推荐理由直接显示在卡片上。",
          "把“想去”、加入行程和发消息设计成独立动作，让兴趣表达不会被误解为报名或出行承诺。",
          "真实地点、规划估算与示例互动清楚区分；演示使用独立数据，退出后恢复用户原有现场。"
        ],
        buildTitle: "我在 Vibe Coding 中做了什么",
        buildHighlights: [
          "定义发现、想去、消息、行程和足迹之间的用户路径，围绕一次周末出行组织功能。",
          "整理六条有地址、地图和官方来源的上海路线，接入逐日天气并实现可解释的规则推荐。",
          "实现多份行程、时间与预算编辑、重叠和超支提醒，以及活动和行程快照分享。",
          "构建八步连续操作演示，支持暂停、倍速和章节回看，并在退出时恢复数据、草稿与页面状态。"
        ],
        previewTitle: "真实产品界面",
        previewDescription: "点击“在线体验”打开完整产品，可手动探索或播放八步自动演示。社交互动为本地演示，不向真实用户发送消息；邀请导入独立行程副本。",
        contextTitle: "背景",
        context: "周末探索不只是寻找一个地点，还包括判断是否合适、找到同行的人和组织具体安排。来玩把这些连续决定放在同一产品里，让一次出行从灵感走到计划与记录。",
        contributionTitle: "设计与构建",
        contribution: "我负责目标用户、完整探索流程、信息层级、推荐与筛选规则，以及兴趣、社交和行程之间的交互边界；借助 AI 编程助手完成原生 HTML/CSS/JavaScript 实现、天气接入、行程快照、演示播放器与响应式验收。",
        impactTitle: "成果",
        impact: [
          "完成从活动发现、兴趣表达和同行沟通，到行程规划、分享与到访记录的可交互流程。",
          "提供六条上海真实场所路线，结合预算、距离和逐日天气解释推荐。",
          "上线无需登录的公开原型，支持手动体验与八步连续操作演示。"
        ],
        metrics: [
          { value: "6", label: "上海探索路线" },
          { value: "8", label: "连续演示步骤" },
          { value: "0", label: "登录门槛" }
        ],
        workflow: [
          { label: "发现合适的活动", icon: "book" },
          { label: "想去与同行沟通", icon: "database" },
          { label: "安排和分享行程", icon: "file" },
          { label: "记录到访与感受", icon: "book" }
        ],
        tags: ["来玩", "产品设计", "Vibe Coding", "城市探索", "Open-Meteo", "交互原型"],
        liveLabel: "在线体验",
        detailLabel: "查看详情"
      },
      en: {
        category: "Vibe Coding / City Exploration",
        status: "Interactive Prototype",
        title: "Laiwan | Weekend City Explorer",
        summary: "A weekend exploration product for college students, connecting discovery, saved places, conversations, trip planning and visit records through real Shanghai routes and interactive social demos.",
        cardIntro: "Find somewhere worth going, together. Discover places that fit your budget, distance and weather, then turn saved ideas into a weekend plan.",
        detailIntro: "Laiwan is a city exploration prototype I built through vibe coding for college students with limited time and budgets. Starting with six routes through real Shanghai places, it connects discovery, saved activities, conversations, trip planning, invitations and visit records. Weather comes from Open-Meteo; people and replies are examples, while messages and personal records stay in the current browser.",
        audienceTitle: "Designed for",
        audience: "College students who want to discover local activities, find people with shared interests and plan outings with friends within limited weekend time and budgets.",
        problemTitle: "Core problem",
        problem: "Saving a place is easy; going there still requires checking costs and weather, finding company and building an itinerary across separate tools. The gap between discovery, conversation and planning keeps good ideas in a saved list.",
        principlesTitle: "Core product decisions",
        principles: [
          "Help people find activities that fit their constraints before introducing social features and planning; show recommendation reasons directly on each card.",
          "Keep saving an activity, adding it to a trip and sending a message independent, so expressing interest never implies booking or commitment.",
          "Clearly distinguish real places, planning estimates and sample interactions; isolate demo data and restore the user's previous state on exit."
        ],
        buildTitle: "What I owned in Vibe Coding",
        buildHighlights: [
          "Defined the journey across discovery, saved places, messages, trips and visit records around one weekend outing.",
          "Curated six Shanghai routes with addresses, maps and official sources, then connected daily forecasts to explainable rule-based recommendations.",
          "Built multiple itineraries, editable times and budgets, conflict and overspending notices, and activity and trip snapshot sharing.",
          "Created an eight-step continuous walkthrough with pause, speed controls and chapter replay that restores data, drafts and page state on exit."
        ],
        previewTitle: "Real product interface",
        previewDescription: "Choose “Try it live” to explore the full product or play the eight-step walkthrough. Social interactions are local demos and send no messages to real people; invitations import independent trip copies.",
        contextTitle: "Context",
        context: "Exploring a city involves more than finding a place: people must decide whether it fits, find company and organize the outing. Laiwan brings these connected decisions into one product, taking a weekend idea through planning and reflection.",
        contributionTitle: "Design & Build",
        contribution: "I owned the audience, exploration journey, information hierarchy, recommendation and filtering rules, and interaction boundaries between interest, conversation and planning. With an AI coding assistant, I implemented the product in vanilla HTML/CSS/JavaScript, including weather integration, trip snapshots, the walkthrough player and responsive verification.",
        impactTitle: "Impact",
        impact: [
          "Delivered an interactive journey from discovery and shared interests to conversations, trip planning, sharing and visit records.",
          "Connected six routes through real Shanghai places with recommendations explained through budget, distance and daily weather.",
          "Published a prototype that requires no login and supports both hands-on exploration and an eight-step continuous walkthrough."
        ],
        metrics: [
          { value: "6", label: "Shanghai routes" },
          { value: "8", label: "Walkthrough steps" },
          { value: "0", label: "Login required" }
        ],
        workflow: [
          { label: "Discover suitable activities", icon: "book" },
          { label: "Save places & connect", icon: "database" },
          { label: "Plan & share a trip", icon: "file" },
          { label: "Record visits & reflections", icon: "book" }
        ],
        tags: ["Laiwan", "Product Design", "Vibe Coding", "City Exploration", "Open-Meteo", "Interactive Prototype"],
        liveLabel: "Try it live",
        detailLabel: "View details"
      }
    }
  }
];

export function getProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
