"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Badge, ButtonLink, Metric, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { WorkflowDiagram } from "@/components/workflow-diagram";
import { useLanguage } from "@/components/language-provider";

export function FeaturedWorkSection() {
  const { t } = useLanguage();

  return (
    <Section id="work">
      <SectionHeader
        kicker={t.featuredWork.kicker}
        title={t.featuredWork.title}
        description={t.featuredWork.description}
        action={
          <ButtonLink href="/#projects" variant="ghost" className="px-0">
            {t.featuredWork.action}
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        }
      />

      <Reveal>
        <article className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#28252d_0%,#242838_56%,#302936_100%)] p-6 shadow-[0_32px_110px_rgba(62,49,36,0.22)] md:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,250,242,0.10)_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(102,135,242,0.45),rgba(140,106,223,0.34),transparent)]" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge tone="dark" className="mb-6">
                {t.featuredWork.cardBadge}
              </Badge>
              <h3 className="font-display text-3xl font-[620] leading-tight text-[#fffaf2] md:text-[2.9rem]">
                {t.featuredWork.cardTitle}
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300/80">
                {t.featuredWork.cardDescription}
              </p>

              <WorkflowDiagram className="mt-10" />

              <ButtonLink href="/projects/fitlog-minimal" variant="dark" className="mt-8">
                {t.featuredWork.explore}
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="relative min-h-[18rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#f6f2ea] md:min-h-[22rem]">
                <Image
                  src={t.featuredWork.cover}
                  alt={t.featuredWork.cardTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-contain p-3"
                />
              </div>
              <div className="mt-7 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {t.featuredWork.metrics.map((metric) => (
                  <Metric key={metric.label} value={metric.value} label={metric.label} dark />
                ))}
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
