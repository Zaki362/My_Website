export const siteMeta = {
  title: "郑国华｜北京大学经济学硕士 / AI 产品经理",
  description:
    "郑国华的个人网站，聚焦教育背景、工作经历、科研竞赛、Vibe Coding 项目展示。",
  url: "https://example.com",
  ogImage: "/images/profile.jpg"
};

export const navigation = [
  { label: "关于我", href: "#home" },
  { label: "教育背景", href: "#education" },
  { label: "实习经历", href: "#experience" },
  { label: "科研竞赛", href: "#research" },
  { label: "技能", href: "#skills" },
  { label: "联系我", href: "#contact" },
  { label: "Projects", href: "/projects" }
] as const;

export const heroData = {
  name: "郑国华",
  title: "北京大学 27 届经济学硕士 / 中国人民大学本科",
  tagline: "AI 产品经理｜聚焦 Agent、工作流、Vibe Coding 与 AIGC 应用",
  intro:
    "曾在字节跳动、百度、美团进行 AI 产品方向实习，分别聚焦 AIGC、Vibe Coding 与端到端分析 Agent 方向，熟悉 Agent 系统设计、评测策略与 AI 业务场景落地。",
  eyebrow: ["Peking University", "AI / Product Manager", "Agent / Workflow Strategy"],
  cta: [
    { label: "实习经历", href: "#experience", variant: "primary" as const },
    { label: "Vibe Coding 项目", href: "/projects", variant: "secondary" as const },
    { label: "联系我", href: "#contact", variant: "ghost" as const }
  ]
};

export const educationSection = {
  title: "教育经历",
  description: ""
};

export const educationItems = [
  {
    school: "北京大学",
    degree: "硕士",
    department: "燕京学堂｜经济学",
    period: "2025.09 - 2027.06",
    highlights: ["GPA A Top 5%", "国际化全英项目", "保研 - 全额奖学金"]
  },
  {
    school: "中国人民大学",
    degree: "本科",
    department: "生态环境学院｜经济学 & 理学（双学位）",
    period: "2021.09 - 2025.06",
    highlights: ["GPA 3.9/4", "专业第 1/57", "国家奖学金", "学习优秀特等奖学金"]
  }
];

export const educationBadges = [
  "IELTS 7.5",
  "TOEFL 104",
  "“大创”市级优秀结项（负责人）",
  "“创新杯”一等奖（负责人）"
];

export const experienceSection = {
  title: "把 AI 能力，转化为真实可用的产品体验",
  description:
    "实习经历集中在 AIGC 电商、Vibe Coding 与端到端分析 Agent 等方向。相比“做过什么”，我更在意如何定义问题、设计策略，并在真实场景中落地、优化模型能力。"
};

export const experiences = [
  {
    company: "字节跳动",
    role: "AIGC 策略产品｜TikTok Shop",
    period: "2026.03 - 至今",
    overview:
      "围绕电商场景下的 AIGC 视频 + 图文生成效果，参与从基模评测、workflow 搭建到模版管理平台的完整策略设计，推动 AI 工具从能力可用走向业务可用。",
    responsibilities: [
      "搭建面向电商带货图文场景的基模评测集并制定分维度评测标准与指标，评测 Nano Banana 与 Seedance 5.0 模型的生图效果、可控性与电商适配度。",
      "优化 FS / POP 自动及手动发文链路中的模版匹配、音乐、CTA 等策略，并设计 A/B test 验证策略效果。",
      "主导图文模版全生命周期管理与平台建设，持续优化 AIGC 电商带货图文生成 workflow 与模版 Prompt 结构，搭建模版迭代与类目匹配 workflow，规范并提效创作流程。",
      "基于商家动线设计不同商家分层触达策略，推动 AI 工具渗透率与实际使用转化。"
    ],
    impact: [
      "评测 216 组图文基模生图效果，并基于行业类目优化模型选择。",
      "单模版生产时间缩短 70%，商家渗透率整体提高 60%。"
    ],
    skills: ["AIGC", "Prompt", "Evaluation", "Workflow", "Strategy", "Template System"]
  },
  {
    company: "百度",
    role: "AI Coding 产品｜文心快码 Comate",
    period: "2025.09 - 2026.02",
    overview:
      "聚焦 AI Coding 场景下的 Agent 效果评测、策略调优与 Builder 产品建设，覆盖从需求洞察、产品评测、策略优化到功能上线的完整产品链路。",
    responsibilities: [
      "构建 30+ 厂内代码库 benchmark，补齐真实研发环境下的 Agent 评测样本与任务结构，并搭建自动化 bench 构建流程。",
      "优化 Agent 策略，设计本地测试与 A/B test，解决 Agent 循环调用工具 bad case，推动 Rules 前移策略上线，工具循环率降低 60%。",
      "从 0 到 1 主导 Builder 产品搭建，推进调研、需求设计与 demo 验证，明确产品业务价值、目标用户与 MVP 规划。",
      "分析 Agent 任务粒度下的用户使用情况，拉取厂内 3168 位用户、8804 条问答 session 数据并进行清洗压缩，批量分析用户使用场景、task 类别与执行状态。"
    ],
    impact: [
      "形成数据驱动的评测与策略调优机制，推动 benchmark 构建自动化。",
      "推动 CC_gm 新策略上线，提升用户满意度，并使 SWE-bench 通过率提升 7.2%。"
    ],
    skills: ["Coding Agent", "Vibe Coding", "Benchmark", "Evaluation", "Product Strategy", "0-1 builder"]
  },
  {
    company: "美团",
    role: "Agent 0-1 搭建｜核心本地",
    period: "2025.04 - 2025.08",
    overview:
      "面向美团商分业务，搭建基于知识抽取、召回分析与报告生成的端到端分析 Agent，节省 80% 人力，替代 70% 基础经分工作。",
    responsibilities: [
      "设计知识抽取与召回分析 Agent，端到端自动产出分析报告及图表。",
      "设计 RAG 策略优化模型分析能力，降低幻觉并提升 70% 分析报告评测得分。",
      "基于历史分析 query 构建评测集及脱敏数据集，搭建 Agent 测评体系。",
      "MCP 封装 workflow，实现 Agent 自动调用，拓展神券、线下住宿等 10+ 业务场景。",
      "使用 SQL 分析 10 亿级流量与交易数据，为策略制定提供数据结论。"
    ],
    impact: [
      "让 workflow 从单业务场景工具，发展为通用经营分析 Agent。",
      "模型能力与业务场景深度融合，显著提升分析效率。"
    ],
    skills: ["Agent", "RAG", "SQL", "MCP", "Knowledge Base", "Workflow"]
  }
] as const;

export const researchData = {
  title: "研究能力、组织经验的体现",
  description: "如何处理复杂问题、组织资源并形成稳定输出的另一种证明。",
  paper: {
    title: "Does Freight Structure Transformation Improve Air Quality?",
    journal: "Journal of Environmental Economics and Management（JEEM）经济学国际顶刊",
    role: "第二作者",
    note: "以经济学研究方法切入环境治理议题，体现定量研究、英文写作与学术协同能力。",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0095069625000634",
    doi: "10.1016/j.jeem.2025.103179",
    citation:
      "Liang Y, Zheng G, Wang J, et al. Does freight structure transformation improve air quality?–Evidence from China's “shifting freight from truck to rail” policy[J]. Journal of Environmental Economics and Management, 2025, 132: 103179.",
    journalInfo: [
      { label: "Volume", value: "132" },
      { label: "Published", value: "June 2025" },
      { label: "CiteScore", value: "9.3" },
      { label: "Impact Factor", value: "5.9" }
    ]
  },
  honors: [
    "国家奖学金",
    "学习优秀特等奖学金",
    "“大创”市级优秀结项（负责人）",
    "“创新杯”一等奖（负责人）"
  ],
  campus: [
    "曾任人大陕西招生团长，组织 46 名学生招生宣讲近 100 场。",
    "曾任新媒体部部长，分管学院宣传与活动策划。"
  ]
};

export const skillsSection = {
  title: "方法、工具与表达方式的组合能力",
  description:
    "技能对我来说不是清单，而是一套用来解决问题的组合模块。产品判断、评测方法、数据分析与原型表达，往往需要一起工作。"
};

export const skillGroups = [
  {
    title: "AI / Product",
    items: ["AI 产品", "Agent", "AIGC", "Prompt Engineering", "Evaluation", "Workflow"]
  },
  {
    title: "Data",
    items: ["SQL", "Python", "SPSS", "Excel", "Stata", "Experiment Design"]
  },
  {
    title: "Design / Build",
    items: ["Figma", "V0", "Gemini", "Vibe Coding", "PRD", "A/B test"]
  }
];

export const contactData = {
  title: "欢迎交流 AI 产品、工作机会与合作可能",
  description: "AGI 将至，如果你也在思考 AI 产品的发展，或希望展开合作，欢迎联系。",
  email: "guohuaz666@163.com",
  phone: "131-4112-2166",
  github: "https://github.com/",
  photoPath: "/images/profile.jpg",
  coverImage: "/images/contact-sky.jpg",
  closing:
    "Reading signals in the unknown."
};

export const footerText =
  "Designed & Built with clarity, aesthetics, and AI-native thinking.";

export const projectsPageData = {
  title: "正在整理中的项目实验场",
  description:
    "这里将逐步收录我的 Vibe Coding 项目、AI 应用原型与实验性作品。相比数量，我更在意项目如何体现问题定义、工具选择与产品表达之间的完整逻辑。",
  emptyTitle: "Vibe Coding 项目正在整理中",
  emptyDescription:
    "即将上线更多实验性作品、工具原型与 AI 应用实践。它们会被整理成更完整的表达，而不是仓促堆叠的 demo 列表。"
};

export const projectPlaceholders = [
  {
    title: "Vibe Coding 项目正在整理中",
    description:
      "即将上线更多实验性作品、工具原型与 AI 应用实践，覆盖产品探索、Agent workflow 与交互表达。",
    stack: ["Next.js", "TypeScript", "AI Prototype"],
    projectUrl: "#",
    githubUrl: "#",
    cover: "/projects/placeholder-cover.jpg"
  }
];
