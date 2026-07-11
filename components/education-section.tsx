"use client";

import { Badge, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function EducationSection() {
  const { t } = useLanguage();

  return (
    <Section id="education" className="section-band-soft">
      <SectionHeader
        kicker={t.education.kicker}
        title={t.education.title}
        description={t.education.description}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] lg:gap-16">
        <div className="border-t border-stone-900/15">
          {t.education.items.map((item, index) => (
            <Reveal key={item.school} delay={index * 0.07}>
              <article className="grid gap-5 border-b border-stone-900/15 py-7 sm:grid-cols-[9rem_1fr] md:grid-cols-[11rem_1fr] md:py-8">
                <div>
                  <p className="meta-label">{t.education.pathLabel}</p>
                  <p className="mt-2 text-sm font-medium text-stone-500">{item.period}</p>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-stone-950 md:text-[1.75rem]">
                    {item.school}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {item.degree}｜{item.department}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.highlights.map((highlight) => (
                      <Badge key={highlight} tone="neutral" uppercase={false}>
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <aside className="rounded-lg border border-stone-900/10 bg-white p-5 shadow-panel md:p-6">
            <div className="border-b border-stone-900/10 pb-4">
              <div>
                <p className="meta-label mb-2">Highlights</p>
                <p className="font-display text-xl font-semibold text-stone-950">
                  {t.education.highlightsTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-0">
              {t.education.badges.map((badge) => (
                <div key={badge} className="border-b border-stone-900/[0.08] py-3 text-sm leading-6 text-stone-600">
                  {badge}
                </div>
              ))}
            </div>

            <p className="mt-5 meta-label">{t.education.honorsTitle}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.education.honorsMetrics.map((metric) => (
                <Badge key={metric} tone="purple" uppercase={false}>
                  {metric}
                </Badge>
              ))}
            </div>
            <p className="mt-5 border-l-2 border-[#2f8f98] pl-4 text-[13px] leading-6 text-stone-600">
              {t.education.honorsNote}
            </p>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
