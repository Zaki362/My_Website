import type { Metadata } from "next";
import { Studio } from "@/components/ai-native/studio";

export const metadata: Metadata = {
  title: "国华的 AI 工作室 · AI-native",
  description: "走进郑国华的交互式 3D 工作室，通过电脑、书架与窗景探索 AI 项目、教育、工作、科研与生活。"
};

export default function AINativePage() {
  return <Studio />;
}
