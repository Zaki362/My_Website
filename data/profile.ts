export const siteMeta = {
  title: "郑国华｜北京大学经济学硕士 / AI 产品经理",
  description:
    "郑国华的个人网站，聚焦教育背景、工作经历、科研竞赛、Vibe Coding 项目展示。",
  url: "https://example.com",
  ogImage: "/images/profile.jpg"
};

export const navigation = [
  { label: "关于", href: "#home" },
  { label: "教育", href: "#education" },
  { label: "工作", href: "#experience" },
  { label: "项目", href: "/projects" },
  { label: "科研", href: "#research" },
  { label: "生活", href: "/beyond-work" },
  { label: "联系", href: "#contact" }
] as const;

export const heroData = {
  name: "郑国华",
  title: "北京大学 27 届经济学硕士 / 中国人民大学本科",
  tagline: "AI 产品经理｜聚焦 Agent、Workflow、Vibe Coding 与 AIGC 应用",
  intro:
    "曾在字节跳动、百度、美团进行 AI 产品方向实习，分别聚焦 AIGC、Vibe Coding 与端到端分析 Agent 方向，熟悉 Agent 系统设计、评测策略与 AI 业务场景落地。",
  eyebrow: [],
  cta: [
    { label: "实习经历", href: "#experience", variant: "primary" as const },
    { label: "Vibe Coding 项目", href: "/projects", variant: "secondary" as const },
    { label: "生活切片", href: "/beyond-work", variant: "secondary" as const },
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
  title: "研究能力的体现",
  description: "如何处理复杂问题、组织资源并形成稳定输出的另一种证明。",
  paper: {
    title:
      "Does Freight Structure Transformation Improve Air Quality? Evidence from China's “Shifting Freight from Truck to Rail” Policy",
    journal: "Journal of Environmental Economics and Management（JEEM）经济学国际顶刊",
    role: "第二作者",
    authors: "Yuchao Liang, Guohua Zheng, Jinuo Wang, Jun Pang",
    note: "以经济学研究方法切入环境治理议题，体现定量研究、英文写作与学术协同能力。",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0095069625000634",
    doi: "10.1016/j.jeem.2025.103179",
    articleNumber: "103179",
    coverImage: "/images/jeem-cover.jpg",
    contribution:
      "Writing – original draft, Visualization, Validation, Software, Formal analysis, Data curation.",
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
  github: "https://github.com/Zaki362",
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
  emptyTitle: "部分项目已整理上线",
  emptyDescription:
    "这里收录的是适合公开展示的项目切片。我更希望它们呈现问题、方法与结果，而不是只停留在功能罗列。"
};

export const projectPlaceholders = [
  {
    eyebrow: "Featured Project",
    title: "练一下 / FitLog Minimal",
    shortDescription:
      "用 vibe coding 方式完成的个人健身记录 PWA，围绕快速开练、轻量记录与持续复盘设计。",
    description:
      "练一下 / FitLog Minimal 是我用 vibe coding 方式完成的个人健身记录 PWA。项目从自己的训练习惯出发，围绕“快速开练、轻量记录、持续复盘”设计。",
    details:
      "动作库、训练中记录、历史统计、数据导入导出都运行在本地浏览器中，无需登录和后端。整个过程通过与 AI 编程助手协作完成，从产品结构、交互细节到动作配图和移动端体验持续迭代，是一次把个人需求快速变成可用工具的实践。",
    highlights: [
      "围绕真实训练习惯设计首页状态、开始训练、历史记录与动作库模块。",
      "训练数据保存在本地浏览器，支持数据导入导出，无需登录和后端。",
      "通过 AI 编程助手持续迭代产品结构、交互细节、动作配图和移动端体验。",
      "把个人需求快速转化为可使用、可复盘、可持续维护的轻量工具。"
    ],
    outcomes: [
      "完成一个可直接使用的个人健身记录 PWA。",
      "覆盖动作库、训练中记录、历史统计、数据导入导出等核心功能。",
      "验证了 vibe coding 从个人需求到可用工具的快速闭环。"
    ],
    note: "线上版本可直接访问，数据默认保存在本地浏览器。",
    stack: ["PWA", "Vibe Coding", "Local-first", "Fitness Tracker", "Mobile UX", "Data Export"],
    metrics: ["0 登录 / 后端", "4 个核心模块", "PWA 本地优先"],
    projectUrl: "https://fitlog-minimal.vercel.app/",
    githubUrl: "",
    cover: "/projects/fitlog-minimal-cover.png"
  }
];

export const aboutPortalData = {
  kicker: "About Me / Off the Clock",
  title: "工作与学习之外的我",
  description:
    "专业表达之外，我也在通过旅行、山海、速度、声音与微醺时刻，慢慢扩展自己理解世界的方式。",
  href: "/beyond-work",
  linkLabel: "进入生活侧写"
};

type BeyondWorkImage = {
  src: string;
  alt: string;
} | null;

type BeyondWorkItem = {
  name: string;
  label: string;
  description: string;
  image: BeyondWorkImage;
  accent: string;
};

type BeyondWorkGroup = {
  key: string;
  kicker: string;
  title: string;
  description: string;
  items: BeyondWorkItem[];
};

export const beyondWorkPage = {
  kicker: "Beyond Work",
  title: "工作与学习之外的我",
  intro:
    "这一页不展示履历，也不追求完整归档。它更像一些被保留下来的生活切片，关于在路上、关于感受世界，也关于我如何在专业之外继续保持好奇。",
  leadImage: {
    src: "/images/contact-sky.jpg",
    alt: "郑国华在星空下"
  },
  leadNote:
    "比起把生活解释清楚，我更喜欢把自己放进真实的场景里，再慢慢理解它。",
  nextStops: {
    kicker: "Next Stops",
    title: "仍在计划中的地图坐标",
    description: "新西兰与南欧还没有被真正走到，但探索从来不只发生在已经抵达之后。",
    items: ["新西兰", "南欧"]
  },
  closing: "The map stays open."
};

export const beyondWorkGroups: BeyondWorkGroup[] = [
  {
    key: "world",
    kicker: "World / Movement",
    title: "在移动中感受世界",
    description:
      "比起打卡，我更在意人与环境真正发生关系的瞬间。旅途、下潜和徒步，都是我重新校准感官与节奏的方式。",
    items: [
      {
        name: "旅游",
        label: "Travel",
        description:
          "已经去过日本、马来西亚，也走了国内大部分地区。下一张航线图上，想去的是新西兰和南欧。",
        image: {
          src: "/images/beyond-work-travel.jpg",
          alt: "郑国华在日本旅行"
        },
        accent: "Routes / Places"
      },
      {
        name: "潜水",
        label: "Diving",
        description:
          "在仙本那下潜过一次之后，我开始真正理解“安静”可以有多具体。水下的世界会把注意力收得很干净。",
        image: {
          src: "/images/beyond-work-diving.jpg",
          alt: "郑国华在仙本那潜水"
        },
        accent: "Semporna"
      },
      {
        name: "徒步",
        label: "Hiking",
        description:
          "虎跳峡的路很长，但也很直接。身体在移动，念头反而慢下来，那种专注感很像一次现实世界里的 reset。",
        image: {
          src: "/images/beyond-work-hiking.jpg",
          alt: "郑国华在虎跳峡徒步"
        },
        accent: "Tiger Leaping Gorge"
      }
    ]
  },
  {
    key: "adrenaline",
    kicker: "Adrenaline / Skill",
    title: "带一点速度，也带一点学习曲线",
    description:
      "有些兴趣会把人放回初学者的位置。它们不只是刺激，更像一种非常具体的自我训练。",
    items: [
      {
        name: "滑雪",
        label: "Snowboarding",
        description:
          "从双板转到单板，雪龄两年。喜欢那种速度、控制和失误都被立刻反馈出来的感觉。",
        image: {
          src: "/images/beyond-work-ski.jpg",
          alt: "郑国华滑雪照片"
        },
        accent: "2 Seasons"
      }
    ]
  },
  {
    key: "mood",
    kicker: "Mood / Taste",
    title: "也靠声音和味觉保存情绪",
    description:
      "不是所有兴趣都和远方有关，有些只是让日常更有层次。音乐和喝酒，都更像一种氛围选择。",
    items: [
      {
        name: "音乐",
        label: "Music",
        description:
          "喜欢林俊杰、Blackpink，也常听 R&B。比起类型标签，我更在意一首歌能不能把情绪接住。",
        image: {
          src: "/images/beyond-work-music.jpg",
          alt: "郑国华观看音乐现场"
        },
        accent: "JJ / Blackpink / R&B"
      }
    ]
  }
] as const;
