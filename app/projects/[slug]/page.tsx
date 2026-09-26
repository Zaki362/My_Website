import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
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

  if (project.slug === "xiaohongshu-creator-workbench") {
    return <RedflowProjectPage project={project} />;
  }
  if (project.slug === "scenecart-ai") return <ScenecartPortfolioPage />;
  if (project.slug === "fitlog-minimal") return <FitlogPortfolioPage />;
  if (project.slug === "codex-widget") return <QuotaPortfolioPage />;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <ProjectDetailPage project={project} />
      <Footer />
    </main>
  );
}
