"use client";

import { Badge, Card, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function EducationSection() {
  const { t } = useLanguage();

  return (
    <Section
      id="education"
      className="pt-20 lg:pt-28"
    >
      <SectionHeader
        kicker={t.education.kicker}
        title={t.education.title}
        description={t.education.description}
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {t.education.items.map((item, index) => (
            <Reveal key={item.school} delay={index * 0.08}>
              <Card className="p-7 md:p-8">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="meta-label mb-3">{t.education.pathLabel}</p>
                    <h3 className="font-display text-2xl font-[620] text-stone-950">{item.school}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-500">
                      {item.degree}｜{item.department}
                    </p>
                  </div>
                  <span className="inline-flex rounded-full border border-stone-900/10 bg-[#f7f2e9] px-4 py-1.5 text-xs uppercase text-stone-500" style={{ letterSpacing: "0.14em" }}>
                    {item.period}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.highlights.map((highlight) => (
                    <Badge key={highlight} tone="neutral">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <Card className="self-start p-5 md:p-6">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="meta-label mb-2">Highlights</p>
                <p className="font-display text-lg font-[620] text-stone-950">{t.education.highlightsTitle}</p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {t.education.badges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-2xl border border-stone-900/10 bg-[#fffdfa]/72 px-3.5 py-2.5 text-sm text-stone-600"
                >
                  {badge}
                </div>
              ))}
            </div>

            <div className="my-4 h-px bg-stone-900/10" />

            <p className="mb-3 font-display text-lg font-[620] text-stone-950">{t.education.honorsTitle}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {t.education.honorsMetrics.map((metric) => (
                <div
                  key={metric}
                  className="rounded-2xl border border-violet-500/10 bg-violet-500/[0.055] px-3.5 py-2.5 text-[13px] font-medium leading-5 text-stone-700"
                >
                  {metric}
                </div>
              ))}
            </div>

            <p className="mt-3 rounded-2xl bg-[#f7f2e9] px-3.5 py-2.5 text-[13px] leading-6 text-stone-600">
              {t.education.honorsNote}
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
