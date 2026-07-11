"use client";

import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <Section id="experience" className="bg-[#fbfaf7]">
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

      <div className="border-t border-stone-900/15">
        {t.experience.cards.map((item, index) => (
          <Reveal key={item.company} delay={index * 0.07}>
            <article className="group grid gap-5 border-b border-stone-900/15 py-7 transition-colors duration-300 hover:bg-white/70 sm:grid-cols-[8.5rem_1fr] sm:px-3 md:grid-cols-[10rem_1fr] lg:grid-cols-[10rem_15rem_1fr] lg:gap-8 lg:py-9">
              <div className="flex items-start justify-between gap-4 sm:block">
                <span className="text-sm font-medium text-stone-500">{item.period}</span>
                <span className="mt-3 hidden h-2 w-2 rounded-full bg-[#6d5bd0] sm:block" aria-hidden="true" />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#6d5bd0]">{item.focus}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-stone-950 md:text-[1.75rem]">
                  {item.company}
                </h3>
                <p className="mt-2 text-sm leading-6 text-stone-500">{item.domain}</p>
              </div>

              <div className="sm:col-start-2 lg:col-start-auto">
                <p className="max-w-2xl text-sm leading-7 text-stone-600 md:text-[0.95rem] md:leading-8">
                  {item.problem}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-xs font-medium text-stone-500 before:mr-2 before:text-[#2f8f98] before:content-['/']">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
