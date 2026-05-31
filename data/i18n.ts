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

export const dictionary = {
  en: {
    nav: [
      { label: "About", href: "#home" },
      { label: "Education", href: "#education" },
      { label: "Work", href: "#experience" },
      { label: "Projects", href: "/projects" },
      { label: "Research", href: "#research" },
      { label: "Life", href: "/beyond-work" },
      { label: "Contact", href: "#contact" }
    ],
    common: {
      viewCv: "View CV",
      backHome: "Back home",
      contact: "Contact",
      available: "Open to talk",
      problem: "Overview",
      role: "Work",
      impact: "Impact"
    },
    hero: {
      name: "郑国华",
      romanName: "Guohua Zheng",
      title: "Peking University M.A. 2027 / Renmin University B.A.",
      tagline: "AI Product Builder focused on Agent, workflow, Vibe Coding and AIGC applications.",
      intro:
        "I have worked on AI product internships at ByteDance, Baidu and Meituan, focusing on AIGC, Vibe Coding and end-to-end analysis agents. My work centers on agent system design, evaluation strategy and AI product implementation in real business scenarios.",
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
      description: educationSection.description,
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
        {
          school: "Peking University",
          degree: "Master",
          department: "Yenching Academy | Economics",
          period: educationItems[0].period,
          highlights: educationItems[0].highlights
        },
        {
          school: "Renmin University of China",
          degree: "Bachelor",
          department: "School of Ecology and Environment | Economics & Science dual degree",
          period: educationItems[1].period,
          highlights: educationItems[1].highlights
        }
      ],
      badges: educationBadges.slice(0, 2)
    },
    experience: {
      kicker: "Experience",
      title: "Turning AI capabilities into usable product experiences.",
      description:
        "Internship experience across AIGC e-commerce, Vibe Coding and end-to-end analysis agents. The focus is not only what I built, but how I defined problems, designed strategy and made model capabilities work in real scenarios.",
      action: "Contact me",
      cards: experiences.map((item, index) => ({
        number: String(index + 1).padStart(2, "0"),
        company:
          item.company === "字节跳动"
            ? "ByteDance"
            : item.company === "百度"
              ? "Baidu"
              : "Meituan",
        domain: item.role,
        problem: item.overview,
        role: item.responsibilities[0],
        impact: item.impact,
        tags: item.skills.slice(0, 5)
      }))
    },
    featuredWork: {
      kicker: "Featured Project",
      title: "FitLog Minimal",
      description:
        "A personal fitness tracking PWA built with vibe coding: fast workout start, lightweight logging and continuous review.",
      action: "View projects",
      cardTitle: "练一下 / FitLog Minimal",
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
        { label: "AI pair build", icon: "bot" },
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
        credit: researchData.paper.contribution,
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
      action: "Open Beyond Work",
      items: [
        {
          caption: `${worldItems[2].label} · ${worldItems[2].accent}`,
          src: worldItems[2].image?.src ?? "/images/beyond-work-hiking.jpg",
          alt: worldItems[2].image?.alt ?? "Hiking",
          featured: true
        },
        {
          caption: `${worldItems[0].label} · ${worldItems[0].accent}`,
          src: worldItems[0].image?.src ?? "/images/beyond-work-travel.jpg",
          alt: worldItems[0].image?.alt ?? "Travel"
        },
        {
          caption: `${worldItems[1].label} · ${worldItems[1].accent}`,
          src: worldItems[1].image?.src ?? "/images/beyond-work-diving.jpg",
          alt: worldItems[1].image?.alt ?? "Diving"
        },
        {
          caption: `${musicItem.label} · ${musicItem.accent}`,
          src: musicItem.image?.src ?? "/images/beyond-work-music.jpg",
          alt: musicItem.image?.alt ?? "Music"
        }
      ]
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
      featuredKicker: featuredProject.eyebrow,
      featuredDescription: featuredProject.details,
      featured: {
        title: "练一下 / FitLog Minimal",
        label: featuredProject.eyebrow,
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
      otherTitle: projectsPageData.emptyTitle,
      otherDescription: projectsPageData.emptyDescription,
      contactKicker: "Contact",
      contactTitle: "Want to talk about AI products?",
      contactDescription: contactData.description,
      contactAction: "Contact me",
      other: []
    },
    beyondPage: {
      kicker: beyondWorkPage.kicker,
      title: "Beyond Work",
      intro:
        "This page is not a resume archive or a complete collection. It is a set of preserved life slices about being on the road, feeling the world and staying curious beyond professional work.",
      leadImage: beyondWorkPage.leadImage,
      leadNote:
        "Rather than explaining life completely, I prefer to put myself into real scenes and understand them slowly.",
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
      nextStops: {
        kicker: beyondWorkPage.nextStops.kicker,
        title: "Coordinates still waiting on the map",
        description:
          "New Zealand and Southern Europe have not been reached yet, but exploration never only starts after arrival.",
        items: ["New Zealand", "Southern Europe"]
      },
      continue: "Continue the conversation",
      slices: [
        {
          name: "Travel",
          label: worldItems[0].label,
          description:
            "I have been to Japan and Malaysia, and traveled through much of China. Next on the map: New Zealand and Southern Europe.",
          image: worldItems[0].image,
          accent: worldItems[0].accent
        },
        {
          name: "Diving",
          label: worldItems[1].label,
          description:
            "After diving in Semporna, I began to understand how concrete quietness can be. Underwater, attention becomes very clean.",
          image: worldItems[1].image,
          accent: worldItems[1].accent
        },
        {
          name: "Hiking",
          label: worldItems[2].label,
          description:
            "Tiger Leaping Gorge was long and direct. The body moved, thoughts slowed down, and focus returned.",
          image: worldItems[2].image,
          accent: worldItems[2].accent
        },
        {
          name: "Snowboarding",
          label: snowItem.label,
          description:
            "From skiing to snowboarding, two seasons in. I like activities where speed, control and mistakes give immediate feedback.",
          image: snowItem.image,
          accent: snowItem.accent
        },
        {
          name: "Music",
          label: musicItem.label,
          description:
            "I like JJ Lin, Blackpink and R&B. More than genre labels, I care whether a song can hold an emotion.",
          image: musicItem.image,
          accent: musicItem.accent
        }
      ]
    }
  },
  zh: {
    nav: [
      { label: "关于", href: "#home" },
      { label: "教育", href: "#education" },
      { label: "工作", href: "#experience" },
      { label: "项目", href: "/projects" },
      { label: "科研", href: "#research" },
      { label: "生活", href: "/beyond-work" },
      { label: "联系", href: "#contact" }
    ],
    common: {
      viewCv: "查看履历",
      backHome: "返回首页",
      contact: "联系我",
      available: "开放交流",
      problem: "概览",
      role: "工作",
      impact: "成果"
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
      proofChips: [...heroData.eyebrow, ...experiences.map((item) => item.company)],
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
      cards: experiences.map((item, index) => ({
        number: String(index + 1).padStart(2, "0"),
        company: item.company,
        domain: item.role,
        problem: item.overview,
        role: item.responsibilities[0],
        impact: item.impact,
        tags: item.skills.slice(0, 5)
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
      leadNote: beyondWorkPage.leadNote,
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
