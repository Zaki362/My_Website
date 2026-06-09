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
      "围绕 TikTok Shop 电商图文场景，负责 AIGC 生图能力从基模评测、Workflow 优化到行业模版策略的完整链路，推动 AI 工具从「可生成」走向「可控、可用、可增长」。",
    responsibilities: [
      "构建电商图文生图评测集，制定 GSB 标准，评估多模型在商品一致性、文字渲染、人模与美感等维度的表现。",
      "设计分步骤生图 Workflow 与 ComfyUI 裁切拼接方案，优化商品一致性，提升重点类目商品保持率。",
      "负责行业模版从创作、评审、上线到更新的全生命周期，并基于 GMV、稿均 VV、GPM 数据优化分发策略。"
    ],
    impact: [
      "生图准确率从 75% 提升至 90%，3C 数码与卡牌类目商品保持率提升至 90%–95%。",
      "上线 50+ 行业模版，模版创作效率提升 100%，一期策略优化带动日均 GMV 提升 6%。",
      "通过圈商圈品与任务策略推广 AIGC 工具，商家渗透率提升 35%。"
    ],
    skills: ["AIGC", "Prompt", "Evaluation", "Workflow", "Product Strategy", "TikTok Shop"]
  },
  {
    company: "百度",
    role: "AI Coding 产品｜文心快码 Comate",
    period: "2025.09 - 2026.02",
    overview:
      "聚焦 AI Coding 场景下的 Agent 效果评测、策略调优与 Builder 产品建设，覆盖从需求洞察、产品评测、策略优化到功能上线的完整产品链路。",
    responsibilities: [
      "参考 SWE-Bench 构建 30+ 厂内代码库 Agent 测评集，打通自动化 Bench 构建流程。",
      "针对 Agent 工具循环等 bad case，优化消息拼接、System Prompt 与 Rules 策略，并通过 AB Test 和 SWE 评测验证效果。",
      "主导 Builder 模式从需求调研到上线，并基于 3168 名用户、8804 条 Session 分析 Agent 使用场景与用户分层。"
    ],
    impact: [
      "打通自动化 Bench 构建流程，节省约 80% 研发人力。",
      "工具循环率降低 60%，推动 CC_gm 新策略上线，使 SWE-Bench 通过率提升 7.2%。",
      "分析 3168 名用户、8804 条 Session，产出用户分层与 Agent 场景分析报告。"
    ],
    skills: ["Coding Agent", "Vibe Coding", "Benchmark", "Evaluation", "Product Strategy", "Builder"]
  },
  {
    company: "美团",
    role: "Agent 0-1 搭建｜核心本地商业分析",
    period: "2025.04 - 2025.08",
    overview:
      "面向美团本地商业经营分析场景，主导搭建基于知识抽取、RAG 召回与报告生成的分析 Agent，实现从历史报告知识沉淀到端到端自动产出分析报告与图表。",
    responsibilities: [
      "设计经营分析 Agent Workflow，基于历史报告抽取指标树、原子卡片等结构化知识，沉淀业务知识库。",
      "通过 RAG 召回降低 LLM 分析幻觉，端到端自动生成经营分析报告与图表。",
      "构建评测集对比不同输入与模型效果，并将 WBR 工作流拓展至神券、线下住宿等 10+ 业务知识库场景。"
    ],
    impact: [
      "将经营分析产出从 2 人 × 3 天优化至 1 人 × 1 天。",
      "RAG 下 LLM 分析框架得分相比单报告输入 / 无输入提升近 70%。",
      "独立维护 10+ 业务知识库，接入多业务场景，替代约 70% 基础经分工作。"
    ],
    skills: ["Agent", "RAG", "SQL", "MCP", "Knowledge Base", "Business Analysis"]
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
  },
  {
    eyebrow: "Vibe Coding Project",
    title: "随手记 / Suishouji Mobile",
    shortDescription:
      "本地优先的极简灵感记录 App，围绕快速放进去、历史找回来设计。",
    description:
      "随手记是一款我独立开发的本地优先极简灵感记录 App，支持文字、图片/视频、录音、位置、收藏、分类与历史搜索筛选。",
    details:
      "项目从 PRD、移动端交互、视觉还原到 GitHub / Vercel 部署完整落地，并在实现过程中持续优化真实地图选点、本地数据稳定保存和手机端使用体验。",
    highlights: [
      "围绕“快速放进去、历史找回来”设计快速记录与历史筛选体验。",
      "支持文字、图片/视频、录音、位置、收藏、分类等多模态记录。",
      "通过本地优先数据保存，保证轻量使用和稳定找回。",
      "完整走通 PRD、移动端交互、视觉还原、GitHub 与 Vercel 部署。"
    ],
    outcomes: [
      "完成一个可直接访问的移动端优先灵感记录 App。",
      "覆盖快速记录、媒体记录、位置记录、收藏分类与历史搜索筛选。",
      "验证了从 PRD 到上线的 vibe coding 产品构建闭环。"
    ],
    note: "线上版本可直接访问，数据默认保存在本地浏览器。",
    stack: ["Vibe Coding", "Local-first", "Mobile UX", "Media Notes", "Map Picker", "Vercel"],
    metrics: ["7 个记录维度", "Local 本地优先", "Search 历史筛选"],
    projectUrl: "https://suishouji-mobile-mvp.vercel.app/",
    githubUrl: "",
    cover: "/projects/suishouji-mobile-cover.png"
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
