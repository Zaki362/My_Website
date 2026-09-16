import type { Metadata } from "next";
import { Studio } from "@/components/ai-native/studio";
import { aiNativeMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = aiNativeMetadata;

export default function AINativePage() {
  return <Studio />;
}
