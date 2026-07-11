"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  Code2,
  ExternalLink,
  MonitorSmartphone,
  Target,
  Users,
  WandSparkles
} from "lucide-react";
import { Badge, ButtonLink, Container } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import type { PortfolioProject } from "@/data/projects";

function ProductPreview({ project }: { project: PortfolioProject }) {
  const { locale } = useLanguage();
  const copy = project.locales[locale];

  return (
    <div className="relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-lg border border-stone-900/10 bg-[#edf1ed] shadow-[0_24px_64px_rgba(42,48,43,0.11)] lg:min-h-[39rem]">
      <div className="flex items-center justify-between border-b border-stone-900/10 bg-white/75 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#d9a06a]" />
          <span className="h-2 w-2 rounded-full bg-[#d8cc75]" />
          <span className="h-2 w-2 rounded-full bg-[#75b98a]" />
        </div>
        <p className="text-[10px] font-semibold uppercase text-stone-500" style={{ letterSpacing: "0.08em" }}>
          {project.previewMode === "interactive" ? (locale === "zh" ? "可交互产品" : "Interactive product") : (locale === "zh" ? "产品实景" : "Product view")}
        </p>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 md:p-6">
        {project.previewMode === "interactive" && project.liveUrl ? (
          <div className="relative h-[34rem] w-full max-w-[20.5rem] overflow-hidden rounded-[1.65rem] border-[7px] border-[#202124] bg-white shadow-[0_24px_52px_rgba(27,31,29,0.2)] lg:h-[35.5rem]">
            <iframe
              src={project.liveUrl}
              title={`${copy.title} ${locale === "zh" ? "在线产品预览" : "live product preview"}`}
              className="h-full w-full bg-white"
              loading="eager"
              sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
            />
          </div>
        ) : (
          <div className="relative h-[27rem] w-full overflow-hidden rounded-lg bg-[#e5ebe6] md:h-[31rem]">
            <Image
              src={project.cover}
              alt={`${copy.title} ${copy.previewTitle}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-contain p-4 md:p-7"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <div className="border-t border-stone-900/15">
      {items.map((item, index) => (
        <div key={item} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-stone-900/10 py-4">
          <span className="pt-0.5 text-xs font-semibold text-[#6d5bd0]">{String(index + 1).padStart(2, "0")}</span>
          <p className="text-sm leading-7 text-stone-600">{item}</p>
        </div>
      ))}
    </div>
  );
}

export function ProjectDetailPage({ project }: { project: PortfolioProject }) {
  const { locale } = useLanguage();
  const copy = project.locales[locale];

  return (
    <>
      <section className="border-b border-stone-900/10 bg-[#fbfaf7] pt-24 md:pt-28">
        <Container className="pb-12 lg:pb-14">
          <Reveal>
            <Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-950">
              <ChevronLeft className="h-4 w-4" />
              {locale === "zh" ? "返回项目" : "Back to projects"}
            </Link>
          </Reveal>

          <div className="grid gap-9 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-14">
            <Reveal>
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="blue">{copy.category}</Badge>
                  <Badge tone="neutral">{project.year}</Badge>
                  <Badge tone="cyan">{copy.status}</Badge>
                </div>
                <h1 className="mt-6 max-w-[680px] font-display text-[2.7rem] font-semibold leading-[1.02] text-stone-950 sm:text-[3.5rem] lg:text-[3.8rem]">
                  {copy.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-stone-600">{copy.detailIntro}</p>

                <div className="mt-7 grid gap-5 border-y border-stone-900/10 py-6 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-[#6d5bd0]">
                      <Users className="h-4 w-4" />
                      <p className="meta-label text-[#6d5bd0]">{copy.audienceTitle}</p>
                    </div>
                    <p className="text-sm leading-7 text-stone-600">{copy.audience}</p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-[#2f8f98]">
                      <Target className="h-4 w-4" />
                      <p className="meta-label text-[#2f8f98]">{copy.problemTitle}</p>
                    </div>
                    <p className="text-sm leading-7 text-stone-600">{copy.problem}</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {project.liveUrl ? (
                    <ButtonLink href={project.liveUrl} variant="primary" external>
                      {copy.liveLabel}
                      <ArrowUpRight className="h-4 w-4" />
                    </ButtonLink>
                  ) : null}
                  {project.githubUrl && project.githubUrl !== project.liveUrl ? (
                    <ButtonLink href={project.githubUrl} variant="secondary" external>
                      GitHub
                      <ExternalLink className="h-4 w-4" />
                    </ButtonLink>
                  ) : null}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <div className="mb-4 flex items-end justify-between gap-5">
                  <div>
                    <p className="section-kicker">{copy.previewTitle}</p>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">{copy.previewDescription}</p>
                  </div>
                  {project.previewMode === "interactive" ? <MonitorSmartphone className="hidden h-5 w-5 text-stone-400 sm:block" /> : null}
                </div>
                <ProductPreview project={project} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="container-shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-[#6d5bd0]">
                  <WandSparkles className="h-5 w-5" />
                </span>
                <div>
                  <p className="section-kicker">PRODUCT</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-stone-950 md:text-3xl">{copy.principlesTitle}</h2>
                </div>
              </div>
              <NumberedList items={copy.principles} />
            </div>
          </Reveal>

          <Reveal delay={0.07}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600/10 text-[#2f8f98]">
                  <Code2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="section-kicker">BUILD</p>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-stone-950 md:text-3xl">{copy.buildTitle}</h2>
                </div>
              </div>
              <NumberedList items={copy.buildHighlights} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-band-soft py-16 md:py-20">
        <div className="container-shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
              <div>
                <p className="section-kicker">{copy.impactTitle}</p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-stone-950 md:text-4xl">
                  {locale === "zh" ? "从真实问题到可用产品" : "From a real problem to a usable product"}
                </h2>
                <div className="mt-7 grid grid-cols-3 border-y border-stone-900/10">
                  {copy.metrics.map((metric) => (
                    <div key={metric.label} className="border-r border-stone-900/10 px-2 py-4 last:border-r-0">
                      <p className="font-display text-xl font-semibold leading-none text-[#5a45c4] md:text-2xl">{metric.value}</p>
                      <p className="mt-2 text-[11px] font-medium leading-4 text-stone-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <NumberedList items={copy.impact} />
                <p className="mt-6 text-xs leading-6 text-stone-500">{copy.tags.join(" / ")}</p>
                {project.liveUrl ? (
                  <ButtonLink href={project.liveUrl} variant="primary" external className="mt-7">
                    {copy.liveLabel}
                    <ArrowUpRight className="h-4 w-4" />
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
