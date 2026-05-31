"use client";

import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import { Badge, ButtonLink, Card, IconFrame, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function ResearchSection() {
  const { t } = useLanguage();

  return (
    <Section id="research" className="pt-20 lg:pt-28">
      <SectionHeader
        kicker={t.research.kicker}
        title={t.research.title}
        description={t.research.description}
        action={
          <ButtonLink href={t.research.publication.link} variant="ghost" className="px-0" external>
            {t.research.action}
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        }
      />

      <div className="grid gap-5">
        <Reveal>
          <Card className="h-full overflow-hidden p-0">
            <div className="grid h-full lg:grid-cols-[168px_1fr]">
              <div className="relative overflow-hidden bg-[#075431] p-4">
                <div className="relative mx-auto aspect-[0.72] w-full max-w-[122px] overflow-hidden rounded-[0.85rem] border border-white/18 bg-white/8 shadow-[0_22px_55px_rgba(5,44,25,0.30)]">
                  <Image
                    src={t.research.publication.cover}
                    alt={t.research.publication.coverAlt}
                    fill
                    sizes="168px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-6">
                  <IconFrame icon={FileText} />
                  <Badge tone="cyan">{t.research.publicationBadge}</Badge>
                </div>

                <h3 className="mt-5 max-w-4xl font-display text-2xl font-[620] leading-tight text-stone-950 md:text-[1.8rem]">
                  {t.research.publication.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-sm leading-6 text-stone-500">
                  <span>{t.research.publication.journal}</span>
                  <span aria-hidden="true">/</span>
                  <span>{t.research.publication.role}</span>
                  <span aria-hidden="true">/</span>
                  <span>Article {t.research.publication.articleNumber}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-500">
                  {t.research.publication.authors}
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {t.research.publication.note}
                </p>

                <div className="mt-4 grid gap-2 sm:grid-cols-4">
                  {t.research.publication.journalInfo.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-stone-900/10 bg-[#fffdfa]/70 px-3.5 py-2.5">
                      <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-stone-400">
                        {item.label}
                      </p>
                      <p className="mt-1 font-display text-base font-[620] text-stone-950">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-900/10 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {t.research.publication.tags.map((tag) => (
                      <Badge key={tag} tone="neutral" className="py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`https://doi.org/${t.research.publication.doi}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-950"
                    >
                      DOI {t.research.publication.doi}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      href={t.research.publication.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-950"
                    >
                      ScienceDirect
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

      </div>
    </Section>
  );
}
