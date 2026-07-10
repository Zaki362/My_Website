"use client";

import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Card, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function ExperienceSection() {
  const { t } = useLanguage();

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
            <Card className="group flex h-full min-h-[390px] flex-col overflow-hidden p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="inline-flex rounded-full border border-[#8b6cf6]/15 bg-[#8b6cf6]/[0.075] px-3 py-1 text-[11px] font-semibold text-[#6a35e8]"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {item.focus}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-[620] leading-tight text-stone-950">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500">{item.domain}</p>
                </div>
                <span className="hidden rounded-full border border-stone-900/10 bg-white/60 px-3 py-1 text-[11px] font-semibold text-stone-400 sm:inline-flex">
                  {item.period}
                </span>
              </div>

              <div className="mt-7 rounded-[1.45rem] border border-stone-900/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,253,250,0.58))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
                <p className="meta-label mb-2">{t.common.problem}</p>
                <p className="text-sm leading-7 text-stone-600">{item.problem}</p>
              </div>

              <div className="mt-auto pt-7">
                <p className="meta-label mb-3">{t.common.keywords}</p>
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
