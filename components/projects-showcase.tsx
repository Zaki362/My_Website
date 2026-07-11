"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { Badge, ButtonLink, Container, Section, SectionHeader, cn } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { portfolioProjects, type PortfolioProject } from "@/data/projects";

function ProjectImage({ project, priority = false }: { project: PortfolioProject; priority?: boolean }) {
  const { locale } = useLanguage();
  const copy = project.locales[locale];

  return (
    <Image
      src={project.cover}
      alt={copy.title}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 720px"
      className="object-contain p-3 transition duration-700 ease-out group-hover:scale-[1.025] md:p-5"
    />
  );
}

function ProjectSummary({ project }: { project: PortfolioProject }) {
  const { locale } = useLanguage();
  const copy = project.locales[locale];

  return (
    <div className="flex h-full flex-col p-5 md:p-6">
      <div className="flex flex-wrap gap-2">
        <Badge tone="cyan">{copy.category}</Badge>
        <Badge tone="neutral">{project.year}</Badge>
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-stone-950">
        {copy.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-stone-600">
        {copy.cardIntro}
      </p>
      <div className="mt-auto flex items-center justify-between border-t border-stone-900/10 pt-5">
        <span className="text-sm font-medium text-stone-700">{copy.detailLabel}</span>
        <ArrowUpRight className="h-4 w-4 text-[#6d5bd0] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}

function HomeProjectLayout() {
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-3">
      {portfolioProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.07} className="h-full">
            <Link href={`/projects/${project.slug}`} className="group flex h-full min-h-[29rem] flex-col overflow-hidden rounded-lg border border-stone-900/10 bg-white shadow-panel">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-stone-900/10 bg-[#efede7]">
                <ProjectImage project={project} />
              </div>
              <ProjectSummary project={project} />
            </Link>
          </Reveal>
      ))}
    </div>
  );
}

function ProjectCardGrid({ className }: { className?: string }) {
  const { locale } = useLanguage();

  return (
    <div className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-3", className)}>
      {portfolioProjects.map((project, index) => {
        const copy = project.locales[locale];

        return (
          <Reveal key={project.slug} delay={index * 0.07} className="h-full">
            <Link href={`/projects/${project.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-900/10 bg-white shadow-panel">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-stone-900/10 bg-[#efede7]">
                <ProjectImage project={project} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge tone="cyan">{copy.category}</Badge>
                  <Badge tone="neutral">{copy.status}</Badge>
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold leading-tight text-stone-950">
                  {copy.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">{copy.cardIntro}</p>
                <div className="mt-auto flex items-center justify-between border-t border-stone-900/10 pt-5">
                  <span className="text-sm font-medium text-stone-700">{copy.detailLabel}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#6d5bd0]" />
                </div>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}

export function ProjectsHomeSection() {
  const { locale, t } = useLanguage();

  return (
    <Section id="projects" className="section-band-soft">
      <SectionHeader
        kicker={t.projects.heroBadge}
        title={t.projects.title}
        description={t.projects.description}
        action={
          <ButtonLink href="/projects" variant="ghost" className="px-0">
            {locale === "zh" ? "查看全部项目" : "View all projects"}
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        }
      />
      <HomeProjectLayout />
    </Section>
  );
}

export function ProjectsShowcase() {
  const { t } = useLanguage();

  return (
    <>
      <div className="border-b border-stone-900/10 bg-[#fbfaf7]">
        <Container className="pt-28 md:pt-36">
          <Reveal>
            <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-950">
              <ChevronLeft className="h-4 w-4" />
              {t.common.backHome}
            </Link>
          </Reveal>
          <Reveal>
            <div className="grid gap-8 pb-14 md:grid-cols-[0.8fr_1.2fr] md:items-end md:pb-18">
              <div>
                <Badge tone="blue" className="mb-5">{t.projects.heroBadge}</Badge>
                <h1 className="font-display text-[3rem] font-semibold leading-none text-stone-950 sm:text-[4rem]">
                  {t.projects.title}
                </h1>
              </div>
              <p className="max-w-2xl text-base leading-8 text-stone-600 md:justify-self-end md:text-lg">
                {t.projects.description}
              </p>
            </div>
          </Reveal>
        </Container>
      </div>
      <section className="container-shell py-16 md:py-20 lg:py-24">
        <ProjectCardGrid />
      </section>
    </>
  );
}
