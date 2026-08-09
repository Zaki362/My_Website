"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge, Section, SectionHeader } from "@/components/design-system";
import { CodexWidgetVisual } from "@/components/codex-widget-visual";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { portfolioProjects, type PortfolioProject } from "@/data/projects";

function ProjectImage({ project, priority = false }: { project: PortfolioProject; priority?: boolean }) {
  const { locale } = useLanguage();
  const copy = project.locales[locale];

  if (project.slug === "codex-widget") {
    return <CodexWidgetVisual locale={locale} compact />;
  }

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
    <div className="flex flex-1 flex-col p-5 md:p-6">
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
              <ProjectImage project={project} priority={index < 3} />
            </div>
            <ProjectSummary project={project} />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function ProjectsHomeSection() {
  const { t } = useLanguage();

  return (
    <Section id="projects" className="section-band-soft">
      <SectionHeader
        kicker={t.projects.heroBadge}
        title={t.projects.title}
        description={t.projects.description}
      />
      <HomeProjectLayout />
    </Section>
  );
}
