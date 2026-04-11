import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectsEmptyState } from "@/components/projects-empty-state";
import { projectsPageData } from "@/data/profile";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <div className="container-shell relative pt-32 pb-12 md:pt-40">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm tracking-[0.04em] text-slate-300/70 transition hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            返回主页
          </Link>
        </div>

        <div className="section-frame mb-14 max-w-3xl">
          <p className="section-kicker mb-4 pt-5">Vibe Coding / Experiments</p>
          <h1 className="section-title mb-6">{projectsPageData.title}</h1>
          <p className="section-copy">
            {projectsPageData.description}
          </p>
        </div>

        <ProjectsEmptyState />
      </div>
      <Footer />
    </main>
  );
}
