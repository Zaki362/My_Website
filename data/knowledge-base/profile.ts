export const agentProfiles = {
  zh: {
    agentName: "国华的 AI 助手",
    subtitle: "在线 · 可以问我关于国华的事",
    welcomeMessage:
      "👋 Hi，我是国华的 AI 助手。你可以把我当成这个网站的快捷导航，我能帮你快速了解国华的经历、AI 产品项目、研究方向，也可以帮你找到简历、联系方式和代表作品。简单打招呼也可以。",
    suggestedQuestions: [
      "他适合 AI 产品经理岗位吗？",
      "他的 Agent 经验是什么？",
      "有哪些可量化成果？",
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
      "Vibe Coding"
    ]
  },
  en: {
    agentName: "Guohua's AI Assistant",
    subtitle: "Online · Ask me about Guohua",
    welcomeMessage:
      "👋 Hi, I'm Guohua's AI assistant. I can help you quickly understand his education, work experience, AI product projects, research, resume, contact information and selected work. Simple greetings are welcome too.",
    suggestedQuestions: [
      "Why is he a good AI product candidate?",
      "What is his Agent experience?",
      "What measurable impact did he deliver?",
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
      "Vibe Coding"
    ]
  }
} as const;

export const agentProfile = agentProfiles.zh;

export type AgentProfile = typeof agentProfile;
