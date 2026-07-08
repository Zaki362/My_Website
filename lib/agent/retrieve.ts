import type { KnowledgeChunk } from "@/data/knowledge-base/chunks";
import { siteKnowledgeChunks } from "@/lib/agent/siteKnowledge";

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
    { hints: ["工作", "实习", "经历", "字节", "百度", "美团", "agent", "aigc", "coding", "comate", "tiktok", "成果", "指标", "impact", "metric"], categories: ["experience", "skills"] },
    { hints: ["适合", "匹配", "候选人", "招聘", "面试", "优势", "亮点", "candidate", "interview", "hire", "fit"], categories: ["identity", "experience", "skills", "project", "research"] },
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
