import { knowledgeChunks, type KnowledgeChunk } from "@/data/knowledge-base/chunks";
import { agentFaqs } from "@/data/knowledge-base/faqs";
import { portfolioProjects } from "@/data/projects";
import {
  beyondWorkGroups,
  beyondWorkPage,
  contactData,
  educationItems,
  experiences,
  heroData,
  projectPlaceholders,
  researchData,
  skillGroups,
  siteMeta
} from "@/data/profile";

function compactText(parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

function keywordsFromText(text: string, extras: string[] = []) {
  const english = text.match(/[A-Za-z][A-Za-z0-9+-]*/g) ?? [];
  const chinese = text.match(/[\u4e00-\u9fa5]{2,8}/g) ?? [];
  return Array.from(new Set([...extras, ...english, ...chinese])).slice(0, 28);
}

function chunk(input: Omit<KnowledgeChunk, "keywords"> & { keywords?: string[] }): KnowledgeChunk {
  return {
    ...input,
    keywords: keywordsFromText(input.text, input.keywords)
  };
}

const educationChunks: KnowledgeChunk[] = educationItems.map((item, index) =>
  chunk({
    id: `site-education-${index + 1}`,
    title: `${item.school} ${item.degree}`,
    category: "education",
    text: compactText([
      `${item.school}，${item.degree}，${item.department}，时间为 ${item.period}。`,
      item.highlights.length ? `亮点：${item.highlights.join("、")}。` : null
    ]),
    keywords: [item.school, item.degree, item.department, ...item.highlights],
    tags: ["Education", item.school, item.degree]
  })
);

const experienceChunks: KnowledgeChunk[] = experiences.map((item, index) =>
  chunk({
    id: `site-experience-${index + 1}-overview`,
    title: `${item.company} ${item.role}`,
    category: "experience",
    text: compactText([
      `${item.company}，${item.role}，${item.period}。`,
      item.overview,
      `相关能力：${item.skills.join("、")}。`
    ]),
    keywords: [item.company, item.role, item.period, ...item.skills],
    tags: ["Experience", item.company, ...item.skills.slice(0, 4)]
  })
);

const projectChunks: KnowledgeChunk[] = [
  ...projectPlaceholders.map((project, index) =>
    chunk({
      id: `site-project-placeholder-${index + 1}`,
      title: project.title,
      category: "project",
      text: compactText([
        `${project.title}：${project.shortDescription}`,
        project.description,
        project.details,
        project.highlights.length ? `设计要点：${project.highlights.join(" ")}` : null,
        project.outcomes.length ? `成果：${project.outcomes.join(" ")}` : null,
        project.metrics.length ? `指标：${project.metrics.join("、")}。` : null,
        project.projectUrl ? `线上地址：${project.projectUrl}` : null
      ]),
      keywords: [project.title, ...project.stack, "项目", "作品", "练一下", "FitLog"],
      tags: ["Project", ...project.stack.slice(0, 5)]
    })
  ),
  ...portfolioProjects.flatMap((project) =>
    (["zh", "en"] as const).map((locale) => {
      const copy = project.locales[locale];
      return chunk({
        id: `site-project-${project.slug}-${locale}`,
        title: copy.title,
        category: "project",
        text: compactText([
          `${copy.title}，${copy.category}，状态：${copy.status}，年份：${project.year}。`,
          copy.summary,
          copy.detailIntro,
          `${copy.contextTitle}：${copy.context}`,
          `${copy.contributionTitle}：${copy.contribution}`,
          `${copy.impactTitle}：${copy.impact.join(" ")}`,
          copy.metrics.length
            ? `指标：${copy.metrics.map((metric) => `${metric.value} ${metric.label}`).join("、")}。`
            : null,
          project.liveUrl ? `线上地址：${project.liveUrl}` : null
        ]),
        keywords: [copy.title, project.slug, ...copy.tags, "项目", "作品"],
        tags: ["Project", ...copy.tags.slice(0, 5)]
      });
    })
  )
];

const researchChunks: KnowledgeChunk[] = [
  chunk({
    id: "site-research-paper",
    title: researchData.paper.title,
    category: "research",
    text: compactText([
      `论文：${researchData.paper.title}。`,
      `期刊：${researchData.paper.journal}，身份：${researchData.paper.role}，作者：${researchData.paper.authors}。`,
      researchData.paper.note,
      `Article ${researchData.paper.articleNumber}，DOI：${researchData.paper.doi}。`,
      researchData.paper.journalInfo.map((item) => `${item.label}: ${item.value}`).join("；")
    ]),
    keywords: [
      "JEEM",
      "论文",
      "科研",
      researchData.paper.title,
      researchData.paper.doi,
      researchData.paper.role
    ],
    tags: ["Research", "JEEM", "Publication"]
  }),
  chunk({
    id: "site-honors-campus",
    title: "荣誉与组织经验",
    category: "honor",
    text: compactText([
      `荣誉：${researchData.honors.join("、")}。`,
      `组织经历：${researchData.campus.join(" ")}`
    ]),
    keywords: [...researchData.honors, "组织经验", "招生团长", "新媒体部"],
    tags: ["Honor", "Campus"]
  })
];

const skillChunks: KnowledgeChunk[] = skillGroups.map((group, index) =>
  chunk({
    id: `site-skill-${index + 1}`,
    title: group.title,
    category: "skills",
    text: `${group.title} 能力组合：${group.items.join("、")}。`,
    keywords: [group.title, ...group.items, "技能", "能力"],
    tags: ["Skill", group.title]
  })
);

const faqChunks: KnowledgeChunk[] = agentFaqs.map((faq, index) =>
  chunk({
    id: `site-faq-${index + 1}`,
    title: faq.question,
    category: "identity",
    text: `常见问题：${faq.question} 回答：${faq.answer}`,
    keywords: [faq.question, "常见问题", "招聘", "面试", "候选人", "优势", "成果"],
    tags: ["FAQ", "Candidate", "Profile"]
  })
);

const beyondChunks: KnowledgeChunk[] = [
  chunk({
    id: "site-beyond-summary",
    title: beyondWorkPage.title,
    category: "beyond",
    text: compactText([
      beyondWorkPage.intro,
      beyondWorkPage.leadNote,
      beyondWorkPage.nextStops.description,
      `计划中的地点：${beyondWorkPage.nextStops.items.join("、")}。`
    ]),
    keywords: ["生活", "兴趣", "旅行", "Beyond Work", ...beyondWorkPage.nextStops.items],
    tags: ["Beyond Work", "Life"]
  }),
  ...beyondWorkGroups.flatMap((group) =>
    group.items.map((item) =>
      chunk({
        id: `site-beyond-${group.key}-${item.label.toLowerCase()}`,
        title: `${item.name} / ${item.label}`,
        category: "beyond",
        text: compactText([group.title, group.description, `${item.name}：${item.description}`, item.accent]),
        keywords: [item.name, item.label, item.accent, group.title],
        tags: ["Beyond Work", item.label]
      })
    )
  )
];

const identityChunks: KnowledgeChunk[] = [
  chunk({
    id: "site-identity-current",
    title: "首页身份与定位",
    category: "identity",
    text: compactText([
      siteMeta.description,
      `${heroData.name}，${heroData.title}。`,
      heroData.tagline,
      heroData.intro
    ]),
    keywords: [heroData.name, heroData.title, heroData.tagline, "AI 产品经理", "AI Product Builder"],
    tags: ["Identity", "AI Product", "Agent", "AIGC"]
  }),
  chunk({
    id: "site-contact",
    title: "联系方式",
    category: "contact",
    text: compactText([
      contactData.title,
      contactData.description,
      `邮箱：${contactData.email}。`,
      contactData.github ? `GitHub：${contactData.github}。` : null
    ]),
    keywords: ["联系", "邮箱", "Email", "GitHub", contactData.email, "合作", "机会"],
    tags: ["Contact", "Email", "GitHub"]
  })
];

export const siteKnowledgeChunks: KnowledgeChunk[] = [
  ...identityChunks,
  ...educationChunks,
  ...experienceChunks,
  ...projectChunks,
  ...researchChunks,
  ...skillChunks,
  ...faqChunks,
  ...beyondChunks,
  ...knowledgeChunks
];
