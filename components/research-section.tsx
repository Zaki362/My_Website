"use client";

import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import { Badge, ButtonLink, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function ResearchSection() {
  const { t } = useLanguage();
  const publication = t.research.publication;

  return (
    <Section id="research" className="bg-white">
      <SectionHeader
        kicker={t.research.kicker}
        title={t.research.title}
        description={t.research.description}
        action={
          <ButtonLink href={publication.link} variant="ghost" className="px-0" external>
            {t.research.action}
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        }
      />

      <Reveal>
        <article className="grid overflow-hidden border-y border-stone-900/15 lg:grid-cols-[12rem_minmax(0,1fr)]">
          <div className="relative flex min-h-[15rem] items-center justify-center bg-[#075431] p-5 lg:min-h-[27rem]">
            <div className="relative aspect-[0.72] h-[12rem] overflow-hidden rounded-md border border-white/20 shadow-[0_20px_48px_rgba(5,44,25,0.26)] lg:h-[18rem]">
              <Image
                src={publication.cover}
                alt={publication.coverAlt}
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex items-center justify-between gap-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-900/10 bg-[#efede7] text-stone-700">
                <FileText className="h-4 w-4" />
              </span>
              <Badge tone="cyan">{t.research.publicationBadge}</Badge>
            </div>

            <h3 className="mt-6 max-w-4xl font-display text-[1.65rem] font-semibold leading-[1.2] text-stone-950 md:text-[2rem]">
              {publication.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-500">
              {publication.journal} / {publication.role} / Article {publication.articleNumber}
            </p>
            <p className="mt-1 text-sm leading-7 text-stone-500">{publication.authors}</p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600">{publication.note}</p>

            <div className="mt-7 grid grid-cols-2 border-y border-stone-900/10 sm:grid-cols-4">
              {publication.journalInfo.map((item) => (
                <div key={item.label} className="border-stone-900/10 py-4 pr-3 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
                  <p className="meta-label">{item.label}</p>
                  <p className="mt-1.5 font-display text-lg font-semibold text-stone-950">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {publication.tags.map((tag) => (
                  <Badge key={tag} tone="neutral" uppercase={false}>{tag}</Badge>
                ))}
              </div>
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-950"
              >
                DOI {publication.doi}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
