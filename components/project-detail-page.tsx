"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Bot, ChevronLeft, Database, FileText } from "lucide-react";
import { Badge, ButtonLink, Card, Container, IconFrame, Metric, Section, SectionHeader } from "@/components/design-system";
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

  return (
    <div className="grid gap-3 md:grid-cols-4 md:items-stretch">
      {copy.workflow.map((node, index) => {
        const Icon = iconMap[node.icon];

        return (
          <div key={node.label} className="relative">
            <div className="h-full rounded-[1.25rem] border border-white/10 bg-white/[0.055] p-4">
              <IconFrame icon={Icon} dark className="mb-5" />
              <p className="text-sm font-medium leading-6 text-[#fffaf2]">{node.label}</p>
            </div>
            {index < copy.workflow.length - 1 ? (
              <div className="absolute top-1/2 -right-5 z-10 hidden -translate-y-1/2 text-white/30 md:block">
                <ArrowRight className="h-5 w-5" />
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

  return (
    <>
      <Container className="pt-28 md:pt-36">
        <Reveal>
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-[#fffdfa]/75 px-4 py-2 text-sm text-stone-600 transition hover:bg-[#fffdfa] hover:text-stone-950"
          >
            <ChevronLeft className="h-4 w-4" />
            {locale === "zh" ? "返回项目" : "Back to projects"}
          </Link>
        </Reveal>

        <Reveal>
          <div className="grid gap-10 pb-16 md:pb-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge tone="blue">{copy.category}</Badge>
                <Badge tone="neutral">{project.year}</Badge>
                <Badge tone="cyan">{copy.status}</Badge>
              </div>
              <h1 className="max-w-[680px] font-display text-[2.65rem] font-[600] leading-[1.05] tracking-normal text-stone-950 sm:text-[3.25rem] lg:text-[4rem]">
                {copy.title}
              </h1>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-stone-600">
                {copy.detailIntro}
              </p>
              {project.liveUrl ? (
                <ButtonLink href={project.liveUrl} variant="primary" external className="mt-7">
                  {copy.liveLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>

      <Section id="project-cover" className="!pt-0 !pb-24 lg:!pb-32">
        <Reveal>
          <Card className="overflow-hidden p-0">
            <div className="relative min-h-[22rem] bg-[linear-gradient(135deg,#f6f2ea,#eef4df)] md:min-h-[36rem]">
              <Image
                src={project.cover}
                alt={copy.title}
                fill
                priority
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="object-contain p-4 md:p-8"
              />
            </div>
          </Card>
        </Reveal>
      </Section>

      <Section id="project-detail" className="!pt-0">
        <SectionHeader
          kicker={locale === "zh" ? "Case Study" : "Case Study"}
          title={locale === "zh" ? "项目详情" : "Project Detail"}
          description={copy.summary}
        />

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Card className="h-full p-6 md:p-8">
              <p className="meta-label mb-4">{copy.contextTitle}</p>
              <p className="text-base leading-8 text-stone-600">{copy.context}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
                {copy.metrics.map((metric) => (
                  <Metric key={metric.label} value={metric.value} label={metric.label} />
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="h-full p-6 md:p-8">
              <p className="meta-label mb-4">{copy.contributionTitle}</p>
              <p className="text-base leading-8 text-stone-600">{copy.contribution}</p>
              <div className="mt-8 rounded-[1.5rem] bg-[linear-gradient(135deg,#28252d,#242838)] p-5">
                <ProjectWorkflow project={project} />
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section id="project-outcomes" className="!pt-0 !pb-24 lg:!pb-32">
        <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <Reveal>
            <div>
              <p className="section-kicker mb-4">{copy.impactTitle}</p>
              <h2 className="section-title">
                {locale === "zh" ? "从个人需求到可用工具" : "From personal need to usable tool"}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="p-6 md:p-8">
              <div className="grid gap-4">
                {copy.impact.map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-[1.25rem] border border-stone-900/10 bg-[#fffdfa]/72 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500/[0.09] text-sm font-semibold text-blue-700">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-stone-600">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {copy.tags.map((tag) => (
                  <Badge key={tag} tone="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
              {project.liveUrl ? (
                <ButtonLink href={project.liveUrl} variant="primary" external className="mt-8">
                  {copy.liveLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              ) : (
                <ButtonLink href="/#contact" variant="primary" className="mt-8">
                  {t.common.contact}
                  <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              )}
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
