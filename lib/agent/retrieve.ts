import type { KnowledgeChunk } from "@/data/knowledge-base/chunks";
import { siteKnowledgeChunks } from "@/lib/agent/siteKnowledge";

const POSITIVE_HINTS = [
  "郑国华",
  "他",
  "他的",
  "教育",
  "背景",
  "实习",
  "科研",
  "论文",
  "荣誉",
  "竞赛",
  "技能",
  "项目",
  "作品",
  "agent",
  "aigc",
  "vibe",
  "workflow",
  "产品",
  "ai coding",
  "fitlog",
  "练一下",
  "字节",
  "百度",
  "美团",
  "北大",
  "人大",
  "生活",
  "联系方式",
  "邮箱",
  "github",
  "cv",
  "简历"
];

const NEGATIVE_HINTS = [
  "天气",
  "股票",
  "新闻",
  "总统",
  "汇率",
  "写代码教程",
  "算法题",
  "医学",
  "法律",
  "历史事件",
  "电影推荐",
  "菜谱",
  "旅游攻略",
  "数学题",
  "编程教程"
];

const STOP_WORDS = [
  "的",
  "了",
  "吗",
  "呢",
  "啊",
  "呀",
  "是",
  "请问",
  "一下",
  "关于",
  "什么",
  "哪些",
  "如何",
  "他的",
  "这个",
  "可以",
  "一下"
];

export function normalizeText(input: string) {
  return input.toLowerCase().replace(/\s+/g, " ").trim();
}

function extractTokens(input: string) {
  const normalized = normalizeText(input);
  const englishTokens = normalized.match(/[a-z0-9-]+/g) ?? [];
  const chineseText = Array.from(normalized.matchAll(/[\u4e00-\u9fa5]+/g))
    .map((match) => match[0])
    .join("");
  const chineseSlices: string[] = [];

  for (let size = 2; size <= 4; size += 1) {
    for (let index = 0; index <= chineseText.length - size; index += 1) {
      chineseSlices.push(chineseText.slice(index, index + size));
    }
  }

  return Array.from(new Set([...englishTokens, ...chineseSlices])).filter(
    (token) => token.length > 1 && !STOP_WORDS.includes(token)
  );
}

function inferIntentCategories(question: string): KnowledgeChunk["category"][] {
  const normalized = normalizeText(question).replace(/\s+/g, "");

  const rules: Array<{
    hints: string[];
    categories: KnowledgeChunk["category"][];
  }> = [
    { hints: ["教育", "学校", "北大", "人大", "本科", "硕士", "gpa", "成绩", "雅思", "托福"], categories: ["education"] },
    { hints: ["工作", "实习", "经历", "字节", "百度", "美团", "agent", "aigc", "coding", "comate", "tiktok"], categories: ["experience", "skills"] },
    { hints: ["项目", "作品", "fitlog", "练一下", "pwa", "vibe"], categories: ["project"] },
    { hints: ["科研", "论文", "jeem", "研究", "doi", "期刊"], categories: ["research"] },
    { hints: ["技能", "能力", "工具", "擅长", "方向"], categories: ["skills", "experience"] },
    { hints: ["生活", "兴趣", "旅行", "旅游", "滑雪", "潜水", "音乐", "徒步", "爱好"], categories: ["beyond"] },
    { hints: ["联系", "邮箱", "email", "github", "合作", "机会"], categories: ["contact"] },
    { hints: ["荣誉", "奖学金", "竞赛", "组织", "招生", "新媒体"], categories: ["honor", "campus"] }
  ];

  return Array.from(
    new Set(
      rules
        .filter((rule) => rule.hints.some((hint) => normalized.includes(normalizeText(hint).replace(/\s+/g, ""))))
        .flatMap((rule) => rule.categories)
    )
  );
}

export function isLikelyRelevantQuestion(question: string) {
  const normalized = normalizeText(question);
  const positive = POSITIVE_HINTS.some((hint) => normalized.includes(normalizeText(hint)));
  const negative = NEGATIVE_HINTS.some((hint) => normalized.includes(normalizeText(hint)));

  if (negative && !positive) {
    return false;
  }

  return positive || normalized.includes("经历") || normalized.includes("方向");
}

function scoreChunk(question: string, chunk: KnowledgeChunk) {
  const normalizedQuestion = normalizeText(question).replace(/\s+/g, "");
  const searchableText = normalizeText(`${chunk.title} ${chunk.category} ${chunk.text} ${chunk.tags.join(" ")}`)
    .replace(/\s+/g, "");
  const tokens = extractTokens(question);
  const intentCategories = inferIntentCategories(question);
  let score = 0;

  for (const keyword of chunk.keywords) {
    const normalizedKeyword = normalizeText(keyword).replace(/\s+/g, "");
    if (normalizedQuestion.includes(normalizedKeyword)) {
      score += normalizedKeyword.length >= 4 ? 8 : 4;
    }
  }

  for (const tag of chunk.tags) {
    const normalizedTag = normalizeText(tag).replace(/\s+/g, "");
    if (normalizedQuestion.includes(normalizedTag)) {
      score += 5;
    }
  }

  for (const token of tokens) {
    if (searchableText.includes(token)) {
      score += token.length >= 4 ? 2 : 1;
    }
  }

  if (intentCategories.includes(chunk.category)) {
    score += 12;
  } else if (intentCategories.length > 0 && score < 8) {
    score = Math.max(0, score - 3);
  }

  return score;
}

export function retrieveRelevantChunks(question: string, limit = 8) {
  const ranked = siteKnowledgeChunks
    .map((chunk) => ({
      chunk,
      score: scoreChunk(question, chunk)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return ranked.slice(0, limit);
}

export function formatChunksForPrompt(items: { chunk: KnowledgeChunk; score: number }[]) {
  return items
    .map(
      ({ chunk }, index) =>
        `[${index + 1}] ${chunk.title}\n分类：${chunk.category}\n内容：${chunk.text}\n标签：${chunk.tags.join(" / ")}`
    )
    .join("\n\n");
}

export function shouldRefuseBeforeModel(question: string) {
  const ranked = retrieveRelevantChunks(question);

  if (!isLikelyRelevantQuestion(question)) {
    if (ranked.length > 0 && ranked[0].score >= 4) {
      return { refuse: false, ranked };
    }

    return {
      refuse: true,
      reason:
        "这个助手只回答与郑国华本人相关的资料问题。你可以改问他的教育背景、实习经历、科研、竞赛、技能或项目方向。"
    };
  }

  const totalScore = ranked.reduce((sum, item) => sum + item.score, 0);
  const topScore = ranked[0]?.score ?? 0;

  if (topScore < 2 || totalScore < 3) {
    return {
      refuse: true,
      reason:
        "我目前的资料里没有足够信息回答这个问题。你可以改问他的教育、实习、科研或技能相关内容。"
    };
  }

  return { refuse: false, ranked };
}
