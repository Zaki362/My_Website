import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { projectPlaceholders, projectsPageData } from "@/data/profile";
import { Reveal } from "@/components/reveal";

export function ProjectsEmptyState() {
  return (
    <Reveal>
      <section className="panel rounded-[2.25rem] p-7 md:p-10">
        <div className="mb-8 max-w-2xl">
          <span className="pill mb-5">Building in public, carefully</span>
          <h2 className="mb-4 font-display text-3xl tracking-display text-white md:text-4xl">
            {projectsPageData.emptyTitle}
          </h2>
          <p className="text-sm leading-8 text-slate-300/78 md:text-base">
            {projectsPageData.emptyDescription}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectPlaceholders.map((project) => (
            <article key={project.title} className="interactive-card rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-5 aspect-[4/3] rounded-[1.4rem] border border-dashed border-white/12 bg-[radial-gradient(circle_at_top,_rgba(122,215,255,0.12),_transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
              <h3 className="mb-3 font-display text-2xl text-white">{project.title}</h3>
              <p className="mb-5 text-sm leading-7 text-slate-300/78">{project.description}</p>
              <div className="mb-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300/75">
                <Link href={project.projectUrl} className="inline-flex items-center gap-2 hover:text-white">
                  项目链接
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href={project.githubUrl} className="inline-flex items-center gap-2 hover:text-white">
                  GitHub
                  <Github className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
