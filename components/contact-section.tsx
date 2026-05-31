"use client";

import { Code2, Database, Github, Mail, Sparkles } from "lucide-react";
import { contactData } from "@/data/profile";
import { Badge, Section } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function ContactSection() {
  const { locale, t } = useLanguage();
  const contactItems = [
    {
      label: t.contact.labels.email,
      value: contactData.email,
      href: `mailto:${contactData.email}`,
      icon: Mail,
      key: "email"
    },
    {
      label: t.contact.labels.github,
      value: "Zaki362",
      href: contactData.github,
      icon: Github,
      key: "github"
    }
  ];
  const capabilityItems = t.capability.items;
  const capabilityIcons = [Sparkles, Database, Code2];

  return (
    <Section id="contact" className="pb-24 lg:pb-32">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-[linear-gradient(135deg,#fffdfa_0%,#f6efe5_48%,#eef4ff_100%)] p-6 text-stone-950 shadow-[0_28px_95px_rgba(79,62,39,0.12)] md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <Badge tone="purple" className="mb-6">
                  {t.contact.badge}
                </Badge>
                <h2 className="max-w-2xl font-display text-4xl font-[620] leading-tight text-stone-950 md:text-[3.05rem]">
                  {t.contact.title}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">
                  {t.contact.description}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {contactItems
                  .filter((item) => item.key !== "github" || item.href !== "https://github.com/")
                  .map((item, index) => {
                    const Icon = item.icon;
                    const content = (
                      <>
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-900/10 bg-white/75 text-stone-700">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs uppercase text-stone-400" style={{ letterSpacing: "0.14em" }}>
                            {item.label}
                          </span>
                          <span className="mt-1 block break-all text-sm font-medium text-stone-700">{item.value}</span>
                        </span>
                      </>
                    );
                    const cardClass =
                      index % 2 === 0
                        ? "border-blue-500/10 bg-blue-500/[0.055]"
                        : "border-violet-500/10 bg-violet-500/[0.055]";

                    if (item.href) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          className={`flex min-h-20 items-center gap-4 rounded-[1.35rem] border p-4 transition hover:-translate-y-0.5 hover:bg-white/65 ${cardClass}`}
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <div
                        key={item.label}
                        className={`flex min-h-20 items-center gap-4 rounded-[1.35rem] border p-4 ${cardClass}`}
                      >
                        {content}
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/70 bg-white/[0.48] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
              <div className="mb-3 flex items-center justify-between px-2 pt-1">
                <p className="text-[11px] font-semibold uppercase text-stone-400" style={{ letterSpacing: "0.16em" }}>
                  {locale === "zh" ? "能力组合" : "Skill Stack"}
                </p>
                <span className="h-px flex-1 bg-stone-900/10 ml-4" aria-hidden="true" />
              </div>
              <div className="grid h-full gap-3">
                {capabilityItems.map((item, index) => {
                  const Icon = capabilityIcons[index] ?? Sparkles;

                  return (
                    <div
                      key={item.title}
                      className="grid gap-5 rounded-[1.25rem] border border-stone-900/10 bg-[#fffdfa]/80 p-5 md:grid-cols-[1fr_auto] md:items-center"
                    >
                      <div className="flex min-w-0 gap-4">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-900/10 bg-[#f7f2e9] text-stone-700">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-display text-lg font-[620] text-stone-950">{item.title}</p>
                          <p className="mt-1 max-w-xl text-sm leading-6 text-stone-500">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 md:max-w-[17rem] md:justify-end">
                        {item.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-stone-900/10 bg-[#f7f2e9] px-2.5 py-1 text-[11px] font-medium uppercase text-stone-500"
                            style={{ letterSpacing: "0.08em" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
