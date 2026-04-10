export const agentProfile = {
  agentName: "Guohua Agent",
  subtitle: "基于个人资料回答关于郑国华的经历与方向",
  welcomeMessage:
    "你好，我是郑国华的个人资料助手。你可以问我关于他的教育背景、实习经历、科研、竞赛、技能和项目方向，但我只会基于站内资料回答。",
  suggestedQuestions: [
    "他的研究方向是什么？",
    "他做过哪些 AI 产品实习？",
    "他的教育背景如何？",
    "他有哪些技能？",
    "他做过哪些 Agent 相关项目？"
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
