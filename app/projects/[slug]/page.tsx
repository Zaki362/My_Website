import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectDetailPage } from "@/components/project-detail-page";
import { getProjectBySlug, portfolioProjects } from "@/data/projects";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug
  }));
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
