"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Bot, ChevronLeft, Database, FileText } from "lucide-react";
import { Badge, ButtonLink, Card, Container, IconFrame } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import type { PortfolioProject } from "@/data/projects";

const iconMap = {
  book: BookOpen,
  bot: Bot,
  database: Database,
  file: FileText
};

function ProjectWorkflow({ project }: { project: PortfolioProject }) {
  const { locale } = useLanguage();
  const copy = project.locales[locale];

  if (copy.workflow.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {copy.workflow.map((node, index) => {
        const Icon = iconMap[node.icon];

        return (
          <div key={node.label} className="relative">
            <div className="flex h-full items-center gap-3 rounded-[1.1rem] border border-white/10 bg-white/[0.065] p-3.5">
              <IconFrame icon={Icon} dark className="h-9 w-9" />
              <p className="text-sm font-medium leading-5 text-[#fffaf2]">{node.label}</p>
            </div>
            {index < copy.workflow.length - 1 ? (
              <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 text-white/25 xl:block">
                <ArrowRight className="h-4 w-4" />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function ProjectDetailPage({ project }: { project: PortfolioProject }) {
  const { locale, t } = useLanguage();
  const copy = project.locales[locale];
  const hasMetrics = copy.metrics.length > 0;
  const hasWorkflow = copy.workflow.length > 0;
  const hasImpact = copy.impact.length > 0;
  const hasTags = copy.tags.length > 0;

  return (
    <>
      <Container className="pt-28 md:pt-32">
        <Reveal>
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-[#fffdfa]/75 px-4 py-2 text-sm text-stone-600 transition hover:bg-[#fffdfa] hover:text-stone-950"
          >
            <ChevronLeft className="h-4 w-4" />
            {locale === "zh" ? "返回项目" : "Back to projects"}
          </Link>
        </Reveal>

        <Reveal>
          <Card className="overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
                <div>
                  <div className="mb-6 flex flex-wrap gap-2">
                    <Badge tone="blue">{copy.category}</Badge>
                    <Badge tone="neutral">{project.year}</Badge>
                    <Badge tone="cyan">{copy.status}</Badge>
                  </div>
                  <h1 className="max-w-[720px] font-display text-[2.35rem] font-[620] leading-[1.04] tracking-normal text-stone-950 sm:text-[3.1rem] lg:text-[3.85rem]">
                    {copy.title}
                  </h1>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600 md:text-lg">
                    {copy.detailIntro}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {project.liveUrl ? (
                    <ButtonLink href={project.liveUrl} variant="primary" external>
                      {copy.liveLabel}
                      <ArrowUpRight className="h-4 w-4" />
                    </ButtonLink>
                  ) : null}
                  {hasTags ? (
                    <div className="flex flex-wrap gap-2">
                      {copy.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-full bg-[#f2ece2] px-3 py-1 text-xs text-stone-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="relative min-h-[20rem] border-t border-stone-900/10 bg-[linear-gradient(135deg,#f6f2ea,#eef4df)] lg:min-h-0 lg:border-l lg:border-t-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(139,108,246,0.11),transparent_20rem)]" />
                <div className="relative flex h-full items-center justify-center p-5 md:p-8">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.6rem] border border-white/70 bg-white/65 shadow-[0_24px_70px_rgba(79,62,39,0.12)]">
                    <Image
                      src={project.cover}
                      alt={copy.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 640px"
                      className="object-contain p-4 md:p-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>

      <section className="container-shell py-12 md:py-16 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          {(copy.context || copy.contribution) ? (
            <Reveal>
              <Card className="h-full p-6 md:p-8">
                <div className="grid gap-7">
                  {copy.context ? (
                    <div>
                      <p className="meta-label mb-3">{copy.contextTitle}</p>
                      <p className="text-sm leading-7 text-stone-600 md:text-base md:leading-8">
                        {copy.context}
                      </p>
                    </div>
                  ) : null}
                  {copy.contribution ? (
                    <div className="border-t border-stone-900/10 pt-6">
                      <p className="meta-label mb-3">{copy.contributionTitle}</p>
                      <p className="text-sm leading-7 text-stone-600 md:text-base md:leading-8">
                        {copy.contribution}
                      </p>
                    </div>
                  ) : null}
                </div>
              </Card>
            </Reveal>
          ) : null}

          <Reveal delay={0.08}>
            <div className="grid h-full gap-5">
              {hasMetrics ? (
                <Card className="p-5 md:p-6">
                  <p className="meta-label mb-4">{locale === "zh" ? "关键指标" : "Key Metrics"}</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {copy.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-[1.2rem] border border-blue-500/10 bg-blue-500/[0.065] p-4">
                        <p className="font-display text-2xl font-[760] leading-none text-[#4868d8]">
                          {metric.value}
                        </p>
                        <p className="mt-2 text-xs font-medium leading-5 text-stone-500">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ) : null}

              {hasWorkflow ? (
                <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,#28252d,#242838)] p-5 shadow-[0_24px_70px_rgba(36,34,43,0.18)] md:p-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <p className="text-[11px] font-semibold uppercase text-white/45" style={{ letterSpacing: "0.16em" }}>
                      Workflow
                    </p>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <ProjectWorkflow project={project} />
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>

        {(hasImpact || hasTags) ? (
          <Reveal delay={0.12}>
            <Card className="mt-5 p-6 md:p-8">
              <div className="grid gap-7 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
                <div>
                  <p className="section-kicker mb-3">{copy.impactTitle}</p>
                  <h2 className="font-display text-3xl font-[620] leading-tight text-stone-950 md:text-4xl">
                    {locale === "zh" ? "从需求到可用结果" : "From need to shipped outcome"}
                  </h2>
                </div>

                <div>
                  {hasImpact ? (
                    <div className="grid gap-3 md:grid-cols-3">
                      {copy.impact.map((item, index) => (
                        <div
                          key={item}
                          className="rounded-[1.25rem] border border-stone-900/10 bg-[#fffdfa]/72 p-4"
                        >
                          <span className="text-xs font-semibold text-[#4868d8]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="mt-3 text-sm leading-7 text-stone-600">{item}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {hasTags ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {copy.tags.map((tag) => (
                        <Badge key={tag} tone="neutral">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  {project.liveUrl ? (
                    <ButtonLink href={project.liveUrl} variant="primary" external className="mt-7">
                      {copy.liveLabel}
                      <ArrowUpRight className="h-4 w-4" />
                    </ButtonLink>
                  ) : (
                    <ButtonLink href="/#contact" variant="primary" className="mt-7">
                      {t.common.contact}
                      <ArrowUpRight className="h-4 w-4" />
                    </ButtonLink>
                  )}
                </div>
              </div>
            </Card>
          </Reveal>
        ) : null}
      </section>
    </>
  );
}
