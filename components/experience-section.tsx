"use client";

import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Card, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function ExperienceSection() {
  const { t } = useLanguage();
  const metricBarWidths = ["92%", "78%", "66%"];

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
            <Card className="flex h-full flex-col overflow-hidden p-6 md:p-7">
              <div className="mb-6">
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

              <div className="space-y-4">
                <div>
                  <p className="meta-label mb-2">{t.common.problem}</p>
                  <p className="text-sm leading-7 text-stone-600">{item.problem}</p>
                </div>
                <div>
                  <p className="meta-label mb-2">{t.common.role}</p>
                  <div className="space-y-1.5">
                    {item.role.map((work) => (
                      <div key={work} className="flex gap-2.5 text-sm leading-6 text-stone-600">
                        <span className="mt-[0.72rem] h-px w-3 shrink-0 rounded-full bg-[#d7a45f]/70" />
                        <p>{work}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-stone-900/10 pt-5">
                <p className="meta-label mb-3">{t.common.impact}</p>
                <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {item.impactMetrics.map((metric, metricIndex) => (
                    <div
                      key={`${metric.value}-${metric.label}`}
                      className="rounded-[1.1rem] border border-blue-500/10 bg-[linear-gradient(180deg,rgba(102,135,242,0.10),rgba(255,253,250,0.78))] px-3 py-3"
                    >
                      <p className="font-display text-[1.06rem] font-[760] leading-tight text-[#4868d8]">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-[11px] font-medium leading-4 text-stone-500">
                        {metric.label}
                      </p>
                      <span className="mt-3 block h-1 overflow-hidden rounded-full bg-blue-500/10">
                        <span
                          className="block h-full rounded-full bg-[linear-gradient(90deg,#6687f2,#d7a45f)]"
                          style={{ width: metricBarWidths[metricIndex] ?? "72%" }}
                        />
                      </span>
                    </div>
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
