import {
  aboutPortalData,
  beyondWorkGroups,
  beyondWorkPage,
  contactData,
  educationBadges,
  educationItems,
  educationSection,
  experienceSection,
  experiences,
  footerText,
  heroData,
  projectPlaceholders,
  projectsPageData,
  researchData,
  skillGroups,
  skillsSection
} from "@/data/profile";

export type Locale = "en" | "zh";

export const defaultLocale: Locale = "zh";

const featuredProject = projectPlaceholders[0];
const worldItems = beyondWorkGroups[0].items;
const snowItem = beyondWorkGroups[1].items[0];
const musicItem = beyondWorkGroups[2].items[0];

const englishEducationItems = [
  {
    school: "Peking University",
    degree: "Master",
    department: "Yenching Academy | Economics",
    period: educationItems[0].period,
    highlights: [
      "GPA A",
      "Top 5%",
      "English-taught international program",
      "Recommended admission with full scholarship"
    ]
  },
  {
    school: "Renmin University of China",
    degree: "Bachelor",
    department: "School of Ecology and Environment | Economics & Science dual degree",
    period: educationItems[1].period,
    highlights: [
      "GPA 3.9/4",
      "Ranked 1/57",
      "National Scholarship",
      "Special-class Academic Excellence Scholarship"
    ]
  }
] as const;

const englishExperienceCards = [
  {
    company: "ByteDance",
    domain: "AI Strategy Product | TikTok Search · Tako",
    focus: "Personalized AI",
    period: "2026.06 - Present",
    problem:
      "Contributes to personalized Memory strategy and evaluation for Tako, TikTok Search's standalone chatbot, helping long-term user context translate into more relevant and consistent conversations.",
    tags: ["Personalization", "Memory", "Evaluation", "Chatbot", "LLM", "TikTok Search"]
  },
  {
    company: "ByteDance",
    domain: "AIGC Strategy Product | TikTok Shop",
    focus: "AIGC Strategy",
    period: "2026.03 - 2026.06",
    problem:
      "Owned the end-to-end AIGC image-generation workflow for TikTok Shop e-commerce graphics, from foundation model evaluation and Workflow optimization to industry template strategy, moving the tool from basic generation toward controllable, usable and growth-driving output.",
    tags: ["AIGC", "Prompt", "Evaluation", "Workflow", "Product Strategy", "TikTok Shop"]
  },
  {
    company: "Baidu",
    domain: "AI Coding Product | Wenxin KuaiMa Comate",
    focus: "Agent Evaluation",
    period: "2025.09 - 2026.02",
    problem:
      "Focused on Agent evaluation, strategy optimization and Builder product development in AI Coding scenarios, covering the full product chain from user research and product evaluation to strategy iteration and feature launch.",
    tags: ["Coding Agent", "Vibe Coding", "Benchmark", "Evaluation", "Product Strategy", "Builder"]
  },
  {
    company: "Meituan",
    domain: "Agent 0-1 Build | Core Local Business Analysis",
    focus: "Business Agent",
    period: "2025.04 - 2025.08",
    problem:
      "Built an analysis Agent for Meituan local commerce business analysis, connecting knowledge extraction, RAG retrieval and report generation to turn historical report knowledge into end-to-end automated reports and charts.",
    tags: ["Agent", "RAG", "SQL", "MCP", "Knowledge Base", "Business Analysis"]
  }
] as const;

const englishSkillGroups = [
  {
    title: "AI / Product",
    items: ["AI Product", "Agent", "AIGC", "Prompt Engineering", "Evaluation", "Workflow"],
    icon: "sparkles",
    size: "large"
  },
  {
    title: "Data",
    items: ["SQL", "Python", "SPSS", "Excel", "Stata", "Experiment Design"],
    icon: "database",
    size: "medium"
  },
  {
    title: "Design / Build",
    items: ["Figma", "V0", "Gemini", "Vibe Coding", "PRD", "A/B test"],
    icon: "code",
    size: "medium"
  }
] as const;

const englishBeyondHomeItems = [
  {
    caption: "Hiking · Tiger Leaping Gorge",
    src: worldItems[2].image?.src ?? "/images/beyond-work-hiking.jpg",
    alt: "Guohua Zheng hiking at Tiger Leaping Gorge",
    featured: true
  },
  {
    caption: "Travel · Routes / Places",
    src: worldItems[0].image?.src ?? "/images/beyond-work-travel.jpg",
    alt: "Guohua Zheng traveling in Japan"
  },
  {
    caption: "Diving · Semporna",
    src: worldItems[1].image?.src ?? "/images/beyond-work-diving.jpg",
    alt: "Guohua Zheng diving in Semporna"
  },
  {
    caption: "Music · JJ / Blackpink / R&B",
    src: musicItem.image?.src ?? "/images/beyond-work-music.jpg",
    alt: "Guohua Zheng at a live music show"
  }
] as const;

const englishBeyondPageSlices = [
  {
    name: "Travel",
    label: "Travel",
    description:
      "I have been to Japan and Malaysia, and traveled through much of China. Next on the map: New Zealand and Southern Europe.",
    image: {
      src: worldItems[0].image?.src ?? "/images/beyond-work-travel.jpg",
      alt: "Guohua Zheng traveling in Japan"
    },
    accent: "Routes / Places"
  },
  {
    name: "Diving",
    label: "Diving",
    description:
      "After diving in Semporna, I began to understand how concrete quietness can be. Underwater, attention becomes very clean.",
    image: {
      src: worldItems[1].image?.src ?? "/images/beyond-work-diving.jpg",
      alt: "Guohua Zheng diving in Semporna"
    },
    accent: "Semporna"
  },
  {
    name: "Hiking",
    label: "Hiking",
    description:
      "Tiger Leaping Gorge was long and direct. The body moved, thoughts slowed down, and focus returned.",
    image: {
      src: worldItems[2].image?.src ?? "/images/beyond-work-hiking.jpg",
      alt: "Guohua Zheng hiking at Tiger Leaping Gorge"
    },
    accent: "Tiger Leaping Gorge"
  },
  {
    name: "Snowboarding",
    label: "Snowboarding",
    description:
      "From skiing to snowboarding, two seasons in. I like activities where speed, control and mistakes give immediate feedback.",
    image: {
      src: snowItem.image?.src ?? "/images/beyond-work-ski.jpg",
      alt: "Guohua Zheng snowboarding"
    },
    accent: "2 Seasons"
  },
  {
    name: "Music",
    label: "Music",
    description:
      "I like JJ Lin, Blackpink and R&B. More than genre labels, I care whether a song can hold an emotion.",
    image: {
      src: musicItem.image?.src ?? "/images/beyond-work-music.jpg",
      alt: "Guohua Zheng at a live music show"
    },
    accent: "JJ / Blackpink / R&B"
  }
] as const;

export const dictionary = {
  en: {
    nav: [
      { label: "About", href: "#home" },
      { label: "Education", href: "#education" },
      { label: "Work", href: "#experience" },
      { label: "Projects", href: "#projects" },
      { label: "Research", href: "#research" },
      { label: "Life", href: "#beyond" },
      { label: "Contact", href: "#contact" }
    ],
    common: {
      viewCv: "View Resume",
      backHome: "Back home",
      contact: "Contact",
      available: "Open to talk",
      problem: "Overview",
      role: "Work",
      impact: "Impact",
      keywords: "Keywords"
    },
    resumeRequest: {
      title: "Request Resume Access",
      description:
        "Leave your email and a brief reason. Guohua will receive a notification and can follow up with the resume.",
      emailLabel: "Your email",
      emailPlaceholder: "name@example.com",
      reasonLabel: "Reason for viewing",
      reasonPlaceholder: "Briefly describe the opportunity, collaboration context, or what you want to learn.",
      submit: "Submit request",
      submitting: "Submitting...",
      cancel: "Cancel",
      successTitle: "Request sent",
      success:
        "Thanks. Your request has been submitted, and Guohua can follow up by email.",
      errors: {
        email: "Please enter a valid email.",
        reason: "Please enter a brief reason.",
        service: "Email notification is not configured yet.",
        generic: "Submission failed. Please try again later."
      }
    },
    hero: {
      name: "Guohua Zheng",
      romanName: "Guohua Zheng",
      title: "Peking University M.A. 2027 / Renmin University B.A.",
      tagline: "AI Product Builder focused on Agent, Workflow, Vibe Coding and AIGC applications.",
      intro:
        "I currently work on personalized AI strategy for Tako at ByteDance TikTok Search. Earlier roles across TikTok Shop, Baidu and Meituan covered AIGC, AI Coding and analysis Agents, with a focus on personalization, evaluation and real-world AI product delivery.",
      location: "Beijing",
      identity: "Agent system design · Evaluation strategy · AI business implementation",
      availability: "Open to AI product, opportunity and collaboration conversations.",
      cardNote:
        "A product person trained by economics, research and real AI product practice.",
      proofChips: ["ByteDance", "Baidu", "Meituan"],
      cta: ["Experience", "Vibe Coding Project", "Contact"]
    },
    education: {
      kicker: "Education",
      title: "Education",
      description:
        "An academic path shaped by economics, English-language study, quantitative research and campus leadership.",
      pathLabel: "Academic Path",
      highlightsTitle: "Academic Highlights",
      honorsTitle: "Honors & Campus Leadership",
      honorsMetrics: [
        "National Scholarship",
        "Special-class Academic Excellence Scholarship",
        "Municipal Outstanding Undergraduate Innovation Project (Lead)",
        "Innovation Cup First Prize (Lead)"
      ],
      honorsNote:
        "Led Renmin University's Shaanxi admissions team and organized nearly 100 admissions presentations with 46 students. Former head of the new media department, responsible for school communications and event planning.",
      items: [
        ...englishEducationItems
      ],
      badges: educationBadges.slice(0, 2)
    },
    experience: {
      kicker: "Experience",
      title: "Turning AI capabilities into usable product experiences.",
      description:
        "Experience across personalized chatbots, AIGC e-commerce, AI Coding and analysis Agents. The focus is not only what I built, but how I defined problems, designed strategy and made model capabilities work reliably in real scenarios.",
      action: "Contact me",
      cards: englishExperienceCards
    },
    featuredWork: {
      kicker: "Featured Project",
      title: "FitLog Minimal",
      description:
        "A personal fitness tracking PWA built with vibe coding: fast workout start, lightweight logging and continuous review.",
      action: "View projects",
      cardTitle: "FitLog Minimal",
      cardDescription:
        "A local-first personal fitness tracker that keeps exercise library, workout logging, history statistics and import/export inside the browser, with no login or backend.",
      cardBadge: "Vibe Coding / PWA / Local-first",
      cover: featuredProject.cover,
      explore: "Explore project",
      metrics: [
        { value: "0", label: "Login / backend" },
        { value: "4", label: "Core modules" },
        { value: "PWA", label: "Local-first tool" }
      ],
      workflow: [
        { label: "Training habit", icon: "book" },
        { label: "AI-assisted build", icon: "bot" },
        { label: "Local data", icon: "database" },
        { label: "Review / export", icon: "file" }
      ]
    },
    capability: {
      kicker: "Skills",
      title: "A combination of methods, tools and expression.",
      description:
        "Skills are not a checklist, but a set of modules for solving problems. Product judgment, evaluation methods, data analysis and prototype expression often need to work together.",
      action: "View project application",
      howIWork: "",
      howIWorkTitle: "",
      workflow: [],
      items: englishSkillGroups.map((group) => ({
        title: group.title,
        description: group.items.join(" / "),
        tags: group.items,
        icon: group.icon,
        size: group.size
      }))
    },
    research: {
      kicker: "Research",
      title: "Research-trained thinking.",
      description:
        "Another proof of how I handle complex problems, organize resources and produce stable output.",
      action: "View paper",
      publicationBadge: "Publication",
      publication: {
        title: researchData.paper.title,
        journal: "Journal of Environmental Economics and Management (JEEM)",
        role: "Second author",
        authors: researchData.paper.authors,
        note: "Research-trained product thinking: causal identification, data work and rigorous written output on a complex environmental policy question.",
        articleNumber: researchData.paper.articleNumber,
        cover: researchData.paper.coverImage,
        coverAlt: "Journal of Environmental Economics and Management cover",
        coverCaption: "JEEM journal cover",
        creditLabel: "Guohua Zheng · CRediT contribution",
        credit:
          "Original draft writing, visualization, validation, software, formal analysis and data curation.",
        journalInfo: researchData.paper.journalInfo,
        tags: ["Environmental economics", "Quantitative research", "Academic collaboration"],
        link: researchData.paper.link,
        doi: researchData.paper.doi
      },
      proofBadge: "Proof",
      honors: {
        title: "Honors & Campus Leadership",
        metrics: [
          "National Scholarship",
          "Special-class Academic Excellence Scholarship",
          "Municipal Outstanding Undergraduate Innovation Project (Lead)",
          "Innovation Cup First Prize (Lead)"
        ],
        note:
          "Led Renmin University's Shaanxi admissions team and organized nearly 100 admissions presentations with 46 students. Former head of the new media department, responsible for school communications and event planning."
      }
    },
    beyondHome: {
      kicker: aboutPortalData.kicker,
      title: "Beyond Work",
      description:
        "Outside professional work, I keep expanding how I understand the world through travel, mountains, water, speed, sound and small moments.",
      action: "View Life Slices",
      items: englishBeyondHomeItems
    },
    contact: {
      title: "Open to AI product, work opportunities and collaboration.",
      description:
        "AGI is approaching. If you are also thinking about the future of AI products, or want to explore collaboration, feel free to reach out.",
      badge: "Contact",
      labels: {
        email: "Email",
        phone: "Phone",
        github: "GitHub",
        wechat: "WeChat"
      },
      availableOnRequest: "Available on request"
    },
    footer: footerText,
    projects: {
      heroBadge: "Selected Work / Vibe Coding / AI Prototypes",
      title: "Projects",
      description:
        "Small, public project cards. Each one focuses on UI, product thinking and a concise build story.",
      featuredKicker: "Featured Project",
      featuredDescription:
        "Exercise library, in-workout logging, history statistics and data import/export all run locally in the browser, without login or backend.",
      featured: {
        title: "FitLog Minimal",
        label: "Vibe Coding / PWA",
        status: "Live PWA",
        context:
          "FitLog Minimal is a personal fitness tracking PWA built from my own training habits, designed around fast workout start, lightweight logging and continuous review.",
        contribution:
          "I collaborated with an AI coding assistant to iterate the product structure, interaction details, exercise visuals and mobile experience, turning a personal need into a usable local-first tool.",
        impact: [
          "Built a usable fitness tracking PWA for real personal training.",
          "Covered exercise library, in-workout logging, history statistics and data import/export.",
          "Validated a vibe coding workflow from personal demand to shippable product."
        ],
        tags: featuredProject.stack,
        cover: featuredProject.cover,
        projectUrl: featuredProject.projectUrl
      },
      otherKicker: "Other Projects",
      otherTitle: "More projects are being curated",
      otherDescription:
        "This area will gradually collect public project slices that show problem definition, method and outcome.",
      contactKicker: "Contact",
      contactTitle: "Want to talk about AI products?",
      contactDescription:
        "If you are thinking about AI products, work opportunities or collaboration, feel free to reach out.",
      contactAction: "Contact me",
      other: []
    },
    beyondPage: {
      kicker: "Beyond Work",
      title: "Beyond Work",
      intro:
        "This page is not a resume archive or a complete collection. It is a set of preserved life slices about being on the road, feeling the world and staying curious beyond professional work.",
      leadImage: {
        src: beyondWorkPage.leadImage.src,
        alt: "Guohua Zheng under the night sky"
      },
      leadMeta: "Open sky / Slow attention",
      leadNote:
        "Rather than explaining life completely, I prefer to put myself into real scenes and understand them slowly.",
      frameLabel: "Frame",
      storyCaptions: [
        "Travel keeps curiosity open.",
        "Underwater quiet makes attention clean.",
        "Mountains recalibrate perspective.",
        "Speed gives immediate feedback.",
        "Sound holds emotion."
      ],
      curatedKicker: "Curated Slices",
      curatedTitle: "Movement, skill and mood.",
      curatedDescription:
        "These slices are signals of how I observe contexts, adapt to feedback and keep curiosity alive.",
      galleryKicker: "Life Gallery",
      galleryTitle: "A quiet archive of places and signals.",
      galleryDescription:
        "Kept in a looser rhythm: not a checklist of hobbies, but a visual memory of water, routes, mountains, speed and sound.",
      nextStops: {
        kicker: beyondWorkPage.nextStops.kicker,
        title: "Coordinates still waiting on the map",
        description:
          "New Zealand and Southern Europe have not been reached yet, but exploration never only starts after arrival.",
        items: ["New Zealand", "Southern Europe"]
      },
      continue: "Continue the conversation",
      slices: englishBeyondPageSlices
    }
  },
  zh: {
    nav: [
      { label: "关于", href: "#home" },
      { label: "教育", href: "#education" },
      { label: "工作", href: "#experience" },
      { label: "项目", href: "#projects" },
      { label: "科研", href: "#research" },
      { label: "生活", href: "#beyond" },
      { label: "联系", href: "#contact" }
    ],
    common: {
      viewCv: "查看简历",
      backHome: "返回首页",
      contact: "联系我",
      available: "开放交流",
      problem: "概览",
      role: "工作",
      impact: "成果",
      keywords: "关键词"
    },
    resumeRequest: {
      title: "查看简历申请",
      description:
        "请留下你的邮箱和查看原因，提交后我会收到邮件提醒，并可通过邮箱与你跟进。",
      emailLabel: "你的邮箱",
      emailPlaceholder: "name@example.com",
      reasonLabel: "查看原因",
      reasonPlaceholder: "简单说明机会类型、合作背景，或你希望了解的内容。",
      submit: "提交申请",
      submitting: "提交中...",
      cancel: "取消",
      successTitle: "申请已提交",
      success: "谢谢，你的申请已提交。我会收到提醒，并可通过邮箱与你跟进。",
      errors: {
        email: "请输入有效邮箱。",
        reason: "请填写简短的查看原因。",
        service: "邮件通知服务暂未配置。",
        generic: "提交失败，请稍后再试。"
      }
    },
    hero: {
      name: heroData.name,
      romanName: "Guohua Zheng",
      title: heroData.title,
      tagline: heroData.tagline,
      intro: heroData.intro,
      location: "北京",
      identity: "Agent 系统设计 · 评测策略 · AI 业务场景落地",
      availability: contactData.description,
      cardNote: "以经济学、研究训练和真实 AI 产品实践为底色的产品经理。",
      proofChips: [...heroData.eyebrow, ...Array.from(new Set(experiences.map((item) => item.company)))],
      cta: ["实习经历", "Vibe Coding 项目", "联系我"]
    },
    education: {
      kicker: "Education",
      title: educationSection.title,
      description: educationSection.description,
      pathLabel: "Academic Path",
      highlightsTitle: "学术与成绩亮点",
      honorsTitle: "荣誉与组织经验",
      honorsMetrics: researchData.honors,
      honorsNote: researchData.campus.join(" "),
      items: educationItems,
      badges: educationBadges.slice(0, 2)
    },
    experience: {
      kicker: "Experience",
      title: experienceSection.title,
      description: experienceSection.description,
      action: "联系我",
      cards: experiences.map((item) => ({
        company: item.company,
        domain: item.role,
        focus: item.focus,
        period: item.period,
        problem: item.overview,
        tags: item.skills
      }))
    },
    featuredWork: {
      kicker: "Featured Project",
      title: featuredProject.title,
      description: featuredProject.shortDescription,
      action: "查看 Projects",
      cardTitle: featuredProject.title,
      cardDescription: featuredProject.description,
      cardBadge: featuredProject.eyebrow,
      cover: featuredProject.cover,
      explore: "查看项目",
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
      ]
    },
    capability: {
      kicker: "Capabilities",
      title: skillsSection.title,
      description: skillsSection.description,
      action: "查看项目应用",
      howIWork: "",
      howIWorkTitle: "",
      workflow: [],
      items: [
        {
          title: skillGroups[0].title,
          description: skillGroups[0].items.join(" / "),
          tags: skillGroups[0].items,
          icon: "sparkles",
          size: "large"
        },
        {
          title: skillGroups[1].title,
          description: skillGroups[1].items.join(" / "),
          tags: skillGroups[1].items,
          icon: "database",
          size: "medium"
        },
        {
          title: skillGroups[2].title,
          description: skillGroups[2].items.join(" / "),
          tags: skillGroups[2].items,
          icon: "code",
          size: "medium"
        }
      ]
    },
    research: {
      kicker: "Research",
      title: researchData.title,
      description: researchData.description,
      action: "查看论文",
      publicationBadge: "论文",
      publication: {
        title: researchData.paper.title,
        journal: researchData.paper.journal,
        role: researchData.paper.role,
        authors: researchData.paper.authors,
        note: researchData.paper.note,
        articleNumber: researchData.paper.articleNumber,
        cover: researchData.paper.coverImage,
        coverAlt: "Journal of Environmental Economics and Management 期刊封面",
        coverCaption: "JEEM 期刊封面",
        creditLabel: "郑国华 · 作者贡献",
        credit: "初稿写作、可视化、验证、软件、形式分析、数据整理。",
        journalInfo: researchData.paper.journalInfo,
        tags: ["经济学研究方法", "环境治理议题", "学术协同"],
        link: researchData.paper.link,
        doi: researchData.paper.doi
      },
      proofBadge: "证明",
      honors: {
        title: "荣誉与组织经验",
        metrics: researchData.honors,
        note: researchData.campus.join(" ")
      }
    },
    beyondHome: {
      kicker: aboutPortalData.kicker,
      title: aboutPortalData.title,
      description: aboutPortalData.description,
      action: aboutPortalData.linkLabel,
      items: [
        {
          caption: `${worldItems[2].name} · ${worldItems[2].accent}`,
          src: worldItems[2].image?.src ?? "/images/beyond-work-hiking.jpg",
          alt: worldItems[2].image?.alt ?? "徒步",
          featured: true
        },
        {
          caption: `${worldItems[0].name} · ${worldItems[0].accent}`,
          src: worldItems[0].image?.src ?? "/images/beyond-work-travel.jpg",
          alt: worldItems[0].image?.alt ?? "旅游"
        },
        {
          caption: `${worldItems[1].name} · ${worldItems[1].accent}`,
          src: worldItems[1].image?.src ?? "/images/beyond-work-diving.jpg",
          alt: worldItems[1].image?.alt ?? "潜水"
        },
        {
          caption: `${musicItem.name} · ${musicItem.accent}`,
          src: musicItem.image?.src ?? "/images/beyond-work-music.jpg",
          alt: musicItem.image?.alt ?? "音乐"
        }
      ]
    },
    contact: {
      title: contactData.title,
      description: contactData.description,
      badge: "Contact",
      labels: {
        email: "邮箱",
        phone: "电话",
        github: "GitHub",
        wechat: "微信"
      },
      availableOnRequest: "可私下提供"
    },
    footer: footerText,
    projects: {
      heroBadge: "Selected Work / Vibe Coding / AI 应用原型",
      title: "精选项目",
      description: "这里展示一个个可扩展的小项目卡片，点击后可以查看完整项目详情。",
      featuredKicker: featuredProject.eyebrow,
      featuredDescription: featuredProject.details,
      featured: {
        title: featuredProject.title,
        label: featuredProject.eyebrow,
        status: "Live PWA",
        context: featuredProject.description,
        contribution: featuredProject.details,
        impact: featuredProject.outcomes,
        tags: featuredProject.stack,
        cover: featuredProject.cover,
        projectUrl: featuredProject.projectUrl
      },
      otherKicker: "其他项目",
      otherTitle: projectsPageData.emptyTitle,
      otherDescription: projectsPageData.emptyDescription,
      contactKicker: "联系",
      contactTitle: "欢迎交流 AI 产品、工作机会与合作可能",
      contactDescription: contactData.description,
      contactAction: "联系我",
      other: []
    },
    beyondPage: {
      kicker: beyondWorkPage.kicker,
      title: beyondWorkPage.title,
      intro: beyondWorkPage.intro,
      leadImage: beyondWorkPage.leadImage,
      leadMeta: "Open sky / Slow attention",
      leadNote: beyondWorkPage.leadNote,
      frameLabel: "Frame",
      storyCaptions: [
        "旅行让好奇心保持开放。",
        "水下会让注意力变干净。",
        "山会重新校准视角。",
        "速度会给出即时反馈。",
        "声音保存情绪。"
      ],
      curatedKicker: "Curated Slices",
      curatedTitle: "在专业之外继续保持好奇",
      curatedDescription:
        "这些不是完整归档，而是一些信号：我如何观察语境、适应反馈，并让好奇心持续生长。",
      galleryKicker: "Life Gallery",
      galleryTitle: "把地点、速度与声音放进同一个安静档案",
      galleryDescription:
        "不是按兴趣清单陈列，而是用更松弛的节奏保存水下、路线、山、雪面和现场声音。",
      nextStops: beyondWorkPage.nextStops,
      continue: "继续交流",
      slices: [
        ...worldItems,
        snowItem,
        musicItem
      ]
    }
  }
} as const;
