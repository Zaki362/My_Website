import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { researchData } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";

export function ResearchSection() {
  return (
    <SectionShell
      id="research"
      kicker="Research & Honors"
      title={researchData.title}
      description={researchData.description}
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="panel rounded-[2rem] p-7 md:p-8">
          <p className="meta-label mb-3">Research</p>
          <h3 className="font-display text-2xl leading-tight text-white md:text-[2rem]">
            {researchData.paper.title}
          </h3>
          <p className="mt-3 text-sm text-slate-200/78">{researchData.paper.journal}</p>
          <p className="mt-1 text-sm text-slate-400">{researchData.paper.role}</p>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-300/76">{researchData.paper.note}</p>

          <div className="mt-8 rounded-[1.5rem] border border-white/8 bg-white/[0.025] p-5">
            <p className="meta-label mb-3">Citation</p>
            <p className="text-sm leading-8 text-slate-200/82">{researchData.paper.citation}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={researchData.paper.link}
              target="_blank"
              rel="noreferrer"
              className="action-chip"
            >
              访问论文
              <ExternalLink className="h-4 w-4" />
            </Link>
            <a
              href={`https://doi.org/${researchData.paper.doi}`}
              target="_blank"
              rel="noreferrer"
              className="action-chip-muted gap-2"
            >
              DOI
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.08} className="panel rounded-[2rem] p-7 md:p-8">
            <p className="meta-label mb-4">Honors</p>
            <div className="space-y-3">
              {researchData.honors.map((item) => (
                <div key={item} className="content-card rounded-2xl px-4 py-3 text-sm text-slate-200/82">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16} className="panel rounded-[2rem] p-7 md:p-8">
            <p className="meta-label mb-4">Campus Leadership</p>
            <div className="space-y-3">
              {researchData.campus.map((item) => (
                <p key={item} className="text-sm leading-8 text-slate-300/76">
                  {item}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
