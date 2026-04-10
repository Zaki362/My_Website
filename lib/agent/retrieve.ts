import { knowledgeChunks, type KnowledgeChunk } from "@/data/knowledge-base/chunks";

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
  "agent",
  "aigc",
  "vibe",
  "产品",
  "ai coding",
  "字节",
  "百度",
  "美团",
  "北大",
  "人大"
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
  "如何"
];

export function normalizeText(input: string) {
  return input.toLowerCase().replace(/\s+/g, "").trim();
}

function extractTokens(input: string) {
  const normalized = normalizeText(input);
  const englishTokens = normalized.match(/[a-z0-9-]+/g) ?? [];
  const chineseSlices = Array.from(new Set(normalized.match(/[\u4e00-\u9fa5]{2,6}/g) ?? []));
  return Array.from(new Set([...englishTokens, ...chineseSlices])).filter(
    (token) => token.length > 1 && !STOP_WORDS.includes(token)
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
  const normalizedQuestion = normalizeText(question);
  const tokens = extractTokens(question);
  let score = 0;

  for (const keyword of chunk.keywords) {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedQuestion.includes(normalizedKeyword)) {
      score += normalizedKeyword.length >= 4 ? 5 : 3;
    }
  }

  for (const tag of chunk.tags) {
    const normalizedTag = normalizeText(tag);
    if (normalizedQuestion.includes(normalizedTag)) {
      score += 3;
    }
  }

  for (const token of tokens) {
    if (chunk.text.toLowerCase().includes(token)) {
      score += 1;
    }
  }

  return score;
}

export function retrieveRelevantChunks(question: string, limit = 4) {
  const ranked = knowledgeChunks
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
  if (!isLikelyRelevantQuestion(question)) {
    return {
      refuse: true,
      reason:
        "这个助手只回答与郑国华本人相关的资料问题。你可以改问他的教育背景、实习经历、科研、竞赛、技能或项目方向。"
    };
  }

  const ranked = retrieveRelevantChunks(question);
  const totalScore = ranked.reduce((sum, item) => sum + item.score, 0);
  const topScore = ranked[0]?.score ?? 0;

  if (topScore < 3 || totalScore < 4) {
    return {
      refuse: true,
      reason:
        "我目前的资料里没有足够信息回答这个问题。你可以改问他的教育、实习、科研或技能相关内容。"
    };
  }

  return { refuse: false, ranked };
}
