export const agentProfiles = {
  zh: {
    agentName: "国华的 AI 助手",
    subtitle: "在线 · 可以轻松聊，也能查国华资料",
    welcomeMessage:
      "👋 Hi，我是国华的 AI 助手。你可以问我他的经历、项目、科研和联系方式，也可以随便打个招呼。我会尽量回答得短一点、轻松一点。",
    suggestedQuestions: [
      "他适合 AI 产品经理岗位吗？",
      "他的 Agent 经验是什么？",
      "他的个性化 AI 经验是什么？",
      "有哪些 Vibe Coding 项目？"
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
      "个性化 AI",
      "Memory",
      "Vibe Coding"
    ]
  },
  en: {
    agentName: "Guohua's AI Assistant",
    subtitle: "Online · Ask casually or explore Guohua",
    welcomeMessage:
      "👋 Hi, I'm Guohua's AI assistant. Ask me about his work, projects, research or contact details, or just say hi. I'll keep replies short and easy to read.",
    suggestedQuestions: [
      "Why is he a good AI product candidate?",
      "What is his Agent experience?",
      "What is his personalized AI experience?",
      "What Vibe Coding projects has he built?"
    ],
    supportedTopics: [
      "Education",
      "Work experience",
      "Research",
      "Honors",
      "Skills",
      "Projects",
      "AI Product",
      "Agent",
      "AIGC",
      "Personalized AI",
      "Memory",
      "Vibe Coding"
    ]
  }
} as const;

export const agentProfile = agentProfiles.zh;

export type AgentProfile = typeof agentProfile;
