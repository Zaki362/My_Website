export type KnowledgeChunk = {
  id: string;
  title: string;
  category:
    | "identity"
    | "education"
    | "honor"
    | "experience"
    | "research"
    | "campus"
    | "skills"
    | "project-interest"
    | "project"
    | "contact"
    | "beyond";
  text: string;
  keywords: string[];
  tags: string[];
};

export const knowledgeChunks: KnowledgeChunk[] = [
  {
    id: "identity-1",
    title: "个人身份",
    category: "identity",
    text:
      "郑国华是一名 AI Builder，关注如何通过 AI 拓展产品边界，将模型能力转化为可用产品与增量价值。",
    keywords: ["郑国华", "是谁", "身份", "title", "AI Builder", "AI 产品经理"],
    tags: ["AI 产品", "Agent", "AIGC", "Vibe Coding"]
  },
  {
    id: "education-1",
    title: "北京大学硕士",
    category: "education",
    text: "郑国华于 2025.09 至 2027.06 在北京大学燕京学堂攻读经济学硕士。",
    keywords: ["北京大学", "燕京学堂", "硕士", "研究生", "北大", "教育背景"],
    tags: ["经济学", "硕士"]
  },
  {
    id: "education-2",
    title: "中国人民大学本科",
    category: "education",
    text:
      "郑国华于 2021.09 至 2025.06 就读于中国人民大学生态环境学院，本科阶段修读经济学与理学双学位。",
    keywords: ["中国人民大学", "本科", "双学位", "人大", "生态环境学院"],
    tags: ["经济学", "理学", "本科"]
  },
  {
    id: "education-3",
    title: "成绩与语言",
    category: "education",
    text: "他的 GPA 为 3.9/4，专业排名第 1/57；IELTS 7.5，TOEFL 104。",
    keywords: ["GPA", "排名", "雅思", "托福", "IELTS", "TOEFL", "成绩"],
    tags: ["GPA", "IELTS", "TOEFL"]
  },
  {
    id: "honor-1",
    title: "荣誉奖项",
    category: "honor",
    text:
      "郑国华获得过国家奖学金、学习优秀特等奖学金，并以负责人身份获得“大创”市级优秀结项和“创新杯”一等奖。",
    keywords: ["荣誉", "奖学金", "竞赛", "大创", "创新杯", "国家奖学金"],
    tags: ["国家奖学金", "创新杯", "大创"]
  },
  {
    id: "experience-1",
    title: "字节跳动 TikTok Search Tako 实习",
    category: "experience",
    text:
      "郑国华自 2026.06 起在字节跳动 TikTok Search 从事 AI 策略产品工作，围绕独立 Chatbot Tako 的个性化体验，关注 Memory 策略、评测与长期用户信息在对话中的稳定使用。公开资料不包含内部方法、数据或成果指标。",
    keywords: ["字节跳动", "TikTok Search", "Tako", "个性化", "Personalization", "Memory", "Chatbot", "评测", "实习"],
    tags: ["Personalized AI", "Memory", "Evaluation", "Chatbot", "TikTok Search"]
  },
  {
    id: "experience-2",
    title: "字节跳动 TikTok Shop 实习",
    category: "experience",
    text:
      "郑国华于 2026.03 至 2026.06 在字节跳动 TikTok Shop 担任 AIGC 策略产品，聚焦电商图文场景下的 AIGC 生图能力、Workflow 优化与行业模版策略，关注 AI 工具从可生成到可控可用的产品化落地。",
    keywords: ["字节跳动", "TikTok Shop", "AIGC", "Workflow", "策略产品", "实习"],
    tags: ["AIGC", "Prompt", "Workflow", "Evaluation", "Product Strategy"]
  },
  {
    id: "experience-3",
    title: "百度 Comate 实习",
    category: "experience",
    text:
      "郑国华于 2025.09 至 2026.02 在百度文心快码 Comate 从事 AI Coding 产品工作，聚焦 Coding Agent 评测、策略优化与 Builder 产品建设，覆盖需求洞察、产品评测、策略迭代和功能上线。",
    keywords: ["百度", "Comate", "文心快码", "AI Coding", "Builder", "Benchmark", "实习"],
    tags: ["Coding Agent", "Benchmark", "Evaluation", "Product Strategy", "Builder"]
  },
  {
    id: "experience-4",
    title: "美团核心本地实习",
    category: "experience",
    text:
      "郑国华于 2025.04 至 2025.08 在美团核心本地参与 Agent 0-1 搭建，面向本地商业经营分析场景，探索知识抽取、RAG 召回、报告生成与业务知识库沉淀。",
    keywords: ["美团", "核心本地", "RAG", "经营分析", "SQL", "Agent", "MCP", "Knowledge Base", "实习"],
    tags: ["Agent", "RAG", "SQL", "MCP", "Business Analysis"]
  },
  {
    id: "research-1",
    title: "JEEM 论文",
    category: "research",
    text:
      "郑国华以第二作者身份在经济学国际期刊 JEEM 发表英文论文《Does Freight Structure Transformation Improve Air Quality?》。",
    keywords: ["JEEM", "论文", "科研", "第二作者", "空气质量", "Does Freight Structure Transformation Improve Air Quality"],
    tags: ["研究", "论文", "经济学"]
  },
  {
    id: "campus-1",
    title: "招生团长经历",
    category: "campus",
    text:
      "郑国华曾任人大陕西招生团长，组织 46 名学生开展近 100 场招生宣讲。",
    keywords: ["招生团长", "陕西", "招生", "校园经历"],
    tags: ["组织", "招生"]
  },
  {
    id: "campus-2",
    title: "新媒体部部长",
    category: "campus",
    text:
      "郑国华曾任新媒体部部长，负责学院宣传及活动策划。",
    keywords: ["新媒体部", "部长", "宣传", "活动策划", "校园经历"],
    tags: ["宣传", "活动策划"]
  },
  {
    id: "skills-1",
    title: "AI/Product 技能",
    category: "skills",
    text:
      "他的技能方向覆盖 AI 产品、Agent、AIGC、Prompt Design、Evaluation 与 Workflow 设计。",
    keywords: ["技能", "AI 产品", "Prompt", "Evaluation", "Workflow", "Agent"],
    tags: ["AI/Product", "AIGC", "Agent"]
  },
  {
    id: "skills-2",
    title: "数据分析技能",
    category: "skills",
    text:
      "数据分析相关技能包括 SQL、Python、SPSS、Excel，以及数据分析与实验设计。",
    keywords: ["SQL", "Python", "SPSS", "Excel", "数据分析", "实验设计", "技能"],
    tags: ["Data", "SQL", "Python"]
  },
  {
    id: "skills-3",
    title: "设计与构建工具",
    category: "skills",
    text:
      "设计与构建相关工具包括 Figma、V0、Gemini，以及 Vibe Coding、产品写作与原型表达。",
    keywords: ["Figma", "V0", "Gemini", "Vibe Coding", "原型", "技能"],
    tags: ["Design/Build", "Prototype", "Vibe Coding"]
  },
  {
    id: "project-1",
    title: "随手记 Vibe Coding 项目",
    category: "project",
    text:
      "随手记 / Suishouji Mobile 是郑国华独立开发的本地优先极简灵感记录 App，线上地址为 https://suishouji-mobile-mvp.vercel.app/。它围绕“快速放进去、历史找回来”的核心体验设计，支持文字、图片/视频、录音、位置、收藏、分类与历史搜索筛选。项目从 PRD、移动端交互、视觉还原到 GitHub / Vercel 部署完整落地，并持续优化真实地图选点、本地数据稳定保存和手机端使用体验。",
    keywords: ["随手记", "Suishouji", "Vibe Coding", "本地优先", "灵感记录", "移动端", "项目"],
    tags: ["Vibe Coding", "Local-first", "Mobile UX", "Media Notes", "Map Picker"]
  },
  {
    id: "interest-1",
    title: "关注方向",
    category: "project-interest",
    text:
      "郑国华关注 AI 产品、Agent 工作流、AIGC 应用、评测体系设计、知识库管理，以及产品策略与数据闭环。",
    keywords: ["方向", "研究方向", "关注什么", "感兴趣", "AI 产品", "Agent 工作流"],
    tags: ["AI 产品", "Agent Workflow", "AIGC", "Data-driven Strategy"]
  }
];
