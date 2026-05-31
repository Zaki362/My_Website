"use client";

import { ArrowRight, BookOpen, Bot, Database, FileText } from "lucide-react";
import { cn, IconFrame } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";

const iconMap = {
  book: BookOpen,
  database: Database,
  bot: Bot,
  file: FileText
};

export function WorkflowDiagram({ className }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <div className={cn("grid gap-3 md:grid-cols-4 md:items-stretch", className)}>
      {t.featuredWork.workflow.map((node, index) => {
        const Icon = iconMap[node.icon];
        return (
          <div key={node.label} className="relative">
            <div className="h-full rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-4">
              <IconFrame icon={Icon} dark className="mb-5" />
              <p className="text-sm font-medium leading-6 text-[#fffaf2]">{node.label}</p>
            </div>
            {index < t.featuredWork.workflow.length - 1 ? (
              <div className="absolute top-1/2 -right-5 z-10 hidden -translate-y-1/2 text-white/30 md:block">
                <ArrowRight className="h-5 w-5" />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
