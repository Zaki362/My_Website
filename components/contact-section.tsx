"use client";

import { ArrowUpRight, Code2, Database, Github, Mail, Sparkles } from "lucide-react";
import { contactData } from "@/data/profile";
import { Section } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function ContactSection() {
  const { locale, t } = useLanguage();
  const capabilityIcons = [Sparkles, Database, Code2];

  return (
    <Section id="contact" className="bg-[#fbfaf7] pb-16 md:pb-20 lg:pb-24">
      <Reveal>
        <div className="grid gap-10 border-b border-t border-stone-900/15 py-10 md:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-16">
          <div>
            <p className="section-kicker">{t.contact.badge}</p>
            <h2 className="mt-4 max-w-2xl font-display text-[2.35rem] font-semibold leading-[1.08] text-stone-950 sm:text-[2.7rem] xl:text-[2.9rem]">
              {t.contact.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">{t.contact.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${contactData.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-[#1d1d1f] px-5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35"
              >
                <Mail className="h-4 w-4" />
                {contactData.email}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              {contactData.github !== "https://github.com/" ? (
                <a
                  href={contactData.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-stone-900/12 bg-white px-5 text-sm font-semibold text-stone-800 transition duration-300 hover:-translate-y-0.5 hover:border-stone-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35"
                >
                  <Github className="h-4 w-4" />
                  Zaki362
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <p className="meta-label">{locale === "zh" ? "能力组合" : "Skill Stack"}</p>
              <span className="h-px flex-1 bg-stone-900/10" aria-hidden="true" />
            </div>
            <div className="mt-4 border-t border-stone-900/10">
              {t.capability.items.map((item, index) => {
                const Icon = capabilityIcons[index] ?? Sparkles;
                return (
                  <div key={item.title} className="grid gap-3 border-b border-stone-900/10 py-5 sm:grid-cols-[2.2rem_9rem_1fr] sm:items-start">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#efede7] text-stone-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="font-display text-base font-semibold text-stone-950">{item.title}</p>
                    <div>
                      <p className="text-sm leading-6 text-stone-600">{item.description}</p>
                      <p className="mt-2 text-xs leading-5 text-[#6d5bd0]">{item.tags.slice(0, 4).join(" / ")}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
