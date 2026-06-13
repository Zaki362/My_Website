import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectDetailPage } from "@/components/project-detail-page";
import { getProjectBySlug, portfolioProjects } from "@/data/projects";
import { siteMeta } from "@/data/profile";

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
  const title = `${copy.title}｜郑国华项目`;

  return {
    title,
    description: copy.summary,
    openGraph: {
      title,
      description: copy.summary,
      url: `${siteMeta.url}/projects/${project.slug}`,
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
      description: copy.summary,
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

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <ProjectDetailPage project={project} />
      <Footer />
    </main>
  );
}
