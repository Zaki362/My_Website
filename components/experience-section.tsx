"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge, ButtonLink, Card, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function ExperienceSection() {
  const { locale, t } = useLanguage();

  return (
    <Section id="experience" className="pt-24 lg:pt-32">
      <SectionHeader
        kicker={t.experience.kicker}
        title={t.experience.title}
        description={t.experience.description}
        action={
          <ButtonLink href="#contact" variant="ghost" className="px-0">
            {t.experience.action}
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        }
      />

      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        {t.experience.cards.map((item, index) => (
          <Reveal key={item.company} delay={index * 0.08} className="h-full">
            <Card className="flex h-full flex-col p-6 md:p-7">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-stone-400">{item.number}</p>
                  <h3 className="mt-4 font-display text-2xl font-[620] leading-tight text-stone-950">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500">{item.domain}</p>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-900/10 bg-[#f7f2e9] text-stone-700 transition group-hover:bg-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="meta-label mb-2">{t.common.problem}</p>
                  <p className="text-sm leading-7 text-stone-600">{item.problem}</p>
                </div>
                <div>
                  <p className="meta-label mb-2">{t.common.role}</p>
                  <div className="space-y-2">
                    {item.role.map((work) => (
                      <div key={work} className="flex gap-2.5 text-sm leading-7 text-stone-600">
                        <span className="mt-[0.85rem] h-px w-3 shrink-0 rounded-full bg-[#d7a45f]/70" />
                        <p>{work}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-7 border-t border-stone-900/10 pt-5">
                <p className="meta-label mb-3">{t.common.impact}</p>
                <div className="flex flex-wrap gap-2">
                  {item.impact.map((metric) => (
                    <Badge key={metric} tone="blue" uppercase={locale === "zh"} className="leading-5">
                      {metric}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[#f2ece2] px-3 py-1 text-xs text-stone-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
