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
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-500">Research</p>
          <h3 className="font-display text-2xl leading-tight text-white md:text-[2rem]">
            {researchData.paper.title}
          </h3>
          <p className="mt-3 text-sm text-slate-200/82">{researchData.paper.journal}</p>
          <p className="mt-1 text-sm text-slate-400">{researchData.paper.role}</p>
          <p className="mt-6 text-sm leading-7 text-slate-300/78">{researchData.paper.note}</p>

          <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-slate-500">Citation</p>
            <p className="text-sm leading-7 text-slate-200/82">{researchData.paper.citation}</p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={researchData.paper.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-100 transition hover:border-sky-200/24 hover:bg-white/[0.08]"
            >
              访问论文
              <ExternalLink className="h-4 w-4" />
            </Link>
            <a
              href={`https://doi.org/${researchData.paper.doi}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300/82 transition hover:border-white/20 hover:text-white"
            >
              DOI
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.08} className="panel rounded-[2rem] p-7 md:p-8">
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-500">Honors</p>
            <div className="space-y-3">
              {researchData.honors.map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200/82">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16} className="panel rounded-[2rem] p-7 md:p-8">
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-500">Campus Leadership</p>
            <div className="space-y-3">
              {researchData.campus.map((item) => (
                <p key={item} className="text-sm leading-7 text-slate-300/78">
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
