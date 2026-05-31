export const agentProfile = {
  agentName: "国华的 AI 助手",
  subtitle: "在线 · 可以问我关于国华的事",
  welcomeMessage:
    "👋 Hi，我是国华的 AI 助手。你可以把我当成这个网站的快捷导航，我能帮你快速了解国华的经历、AI 产品项目、研究方向，也可以帮你找到简历、联系方式和代表作品。简单打招呼也可以。",
  suggestedQuestions: [
    "他做过哪些 AI 产品？",
    "他的 Agent 经验是什么？",
    "项目与研究有哪些？",
    "如何联系国华？"
  ],
  supportedTopics: [
    "教育背景",
    "实习经历",
    "科研成果",
    "竞赛与荣誉",
    "技能",
    "项目方向",
    "AI 产品",
    "Agent",
    "AIGC",
    "Vibe Coding"
  ]
} as const;

export type AgentProfile = typeof agentProfile;
