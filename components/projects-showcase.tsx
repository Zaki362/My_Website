"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { Badge, ButtonLink, Card, Container, Section, SectionHeader, cn } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";
import { Reveal } from "@/components/reveal";
import { portfolioProjects } from "@/data/projects";

function ProjectCardGrid({ className }: { className?: string }) {
  const { locale } = useLanguage();
  const useTwoColumnLayout = portfolioProjects.length <= 2;

  return (
    <div
      className={cn(
        "grid gap-6 md:grid-cols-2",
        useTwoColumnLayout ? "mx-auto xl:max-w-[920px]" : "xl:grid-cols-3",
        className
      )}
    >
      {portfolioProjects.map((project, index) => {
        const copy = project.locales[locale];

        return (
          <Reveal key={project.slug} delay={index * 0.08}>
            <Link href={`/projects/${project.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#f6f2ea,#eef4df)]">
                  <Image
                    src={project.cover}
                    alt={copy.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 360px"
                    className="object-contain p-4 transition duration-700 ease-out group-hover:scale-[1.035]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="mb-6 flex flex-wrap gap-2">
                    <Badge tone="cyan">{copy.category}</Badge>
                    <Badge tone="neutral">{copy.status}</Badge>
                  </div>

                  <h2 className="font-display text-2xl font-[620] leading-tight text-stone-950 md:text-3xl">
                    {copy.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-stone-600">
                    {copy.cardIntro}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {copy.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-full bg-[#f2ece2] px-3 py-1 text-xs text-stone-500">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-8">
                    <span className="text-sm font-medium text-stone-700">
                      {copy.detailLabel}
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-900/10 bg-[#f7f2e9] text-stone-700 transition group-hover:-translate-y-0.5 group-hover:bg-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Card>
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
    <Section id="projects" className="pt-20 lg:pt-28">
      <SectionHeader
        kicker={t.projects.heroBadge}
        title={t.projects.title}
        description={t.projects.description}
        action={
          <ButtonLink href="/projects" variant="ghost" className="px-0">
            {locale === "zh" ? "查看项目页" : "View projects"}
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        }
      />
      <ProjectCardGrid />
    </Section>
  );
}

export function ProjectsShowcase() {
  const { t } = useLanguage();

  return (
    <>
      <Container className="pt-28 md:pt-36">
        <Reveal>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-[#fffdfa]/75 px-4 py-2 text-sm text-stone-600 transition hover:bg-[#fffdfa] hover:text-stone-950"
          >
            <ChevronLeft className="h-4 w-4" />
            {t.common.backHome}
          </Link>
        </Reveal>

        <Reveal>
          <div className="max-w-3xl pb-14 md:pb-20">
            <Badge tone="blue" className="mb-6">
              {t.projects.heroBadge}
            </Badge>
            <h1 className="font-display text-[3rem] font-[620] leading-[1.02] text-stone-950 sm:text-[3.8rem] lg:text-[4.8rem]">
              {t.projects.title}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-600">
              {t.projects.description}
            </p>
          </div>
        </Reveal>
      </Container>

      <section className="container-shell pb-24 lg:pb-32">
        <ProjectCardGrid />
      </section>
    </>
  );
}
