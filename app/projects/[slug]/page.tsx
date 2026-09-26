import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { PortfolioToolbar } from "@/components/portfolio-toolbar";
import "@/components/project-shell.css";
import { RedflowProjectPage } from "@/components/redflow-project-page";
import { ScenecartPortfolioPage } from "@/components/scenecart-portfolio-page";
import { FitlogPortfolioPage } from "@/components/fitlog-portfolio-page";
import { QuotaPortfolioPage } from "@/components/quota-portfolio-page";
import { ProjectDetailPage } from "@/components/project-detail-page";
import { getProjectBySlug, portfolioProjects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";
import { getProjectPageMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const copy = project.locales.zh;
  const { title, description } = getProjectPageMetadata(project, "zh");
  const siteUrl = getSiteUrl();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/projects/${project.slug}`,
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: copy.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.cover]
    }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  let content;
  switch (project.slug) {
    case "xiaohongshu-creator-workbench": content = <RedflowProjectPage project={project} />; break;
    case "scenecart-ai": content = <ScenecartPortfolioPage />; break;
    case "fitlog-minimal": content = <FitlogPortfolioPage />; break;
    case "codex-widget": content = <QuotaPortfolioPage />; break;
    default: content = <><main className="relative min-h-screen overflow-hidden"><ProjectDetailPage project={project} /></main><Footer /></>;
  }

  return <div className="project-shell"><PortfolioToolbar />{content}</div>;
}
