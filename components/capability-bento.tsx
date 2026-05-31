"use client";

import Link from "next/link";
import { ArrowRight, Code2, Database, Gauge, Sparkles } from "lucide-react";
import { Badge, Card, IconFrame, Section, SectionHeader, cn } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

const iconMap = {
  sparkles: Sparkles,
  gauge: Gauge,
  database: Database,
  code: Code2
};

export function CapabilityBento() {
  const { t } = useLanguage();

  return (
    <Section id="skills" className="pt-20 lg:pt-28">
      <SectionHeader
        kicker={t.capability.kicker}
        title={t.capability.title}
        description={t.capability.description}
        action={
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-950">
            {t.capability.action}
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <div className="grid gap-5 lg:grid-cols-4">
        {t.capability.items.map((item, index) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <Reveal
              key={item.title}
              delay={index * 0.06}
              className={cn(item.size === "large" && "lg:col-span-2 lg:row-span-2", item.size === "medium" && "lg:col-span-1")}
            >
              <Card
                className={cn(
                  "flex h-full min-h-[15rem] flex-col p-6 md:p-7",
                  item.size === "large" && "min-h-[24rem] bg-[linear-gradient(180deg,#fffdfa_0%,#f4f0ff_56%,#eef8f8_100%)]"
                )}
              >
                <IconFrame icon={Icon} />
                <div className="mt-auto pt-12">
                  <h3 className="font-display text-2xl font-[620] text-stone-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{item.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} tone={item.size === "large" ? "blue" : "neutral"}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}

        {t.capability.workflow.length > 0 ? (
          <Reveal className="lg:col-span-4">
            <Card className="p-6 md:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="meta-label mb-3">{t.capability.howIWork}</p>
                  <h3 className="font-display text-2xl font-[620] text-stone-950">{t.capability.howIWorkTitle}</h3>
                </div>
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  {t.capability.workflow.map((step, index) => (
                    <div key={step} className="flex items-center gap-3">
                      <span className="rounded-full border border-stone-900/10 bg-[#f7f2e9] px-4 py-2 text-sm text-stone-700">
                        {step}
                      </span>
                      {index < t.capability.workflow.length - 1 ? (
                        <ArrowRight className="hidden h-4 w-4 text-stone-300 md:block" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}
