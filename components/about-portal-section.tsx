import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { aboutPortalData } from "@/data/profile";
import { Reveal } from "@/components/reveal";

export function AboutPortalSection() {
  return (
    <section className="container-shell relative pb-16 md:pb-24">
      <Reveal>
        <Link
          href={aboutPortalData.href}
          className="panel interactive-card group block overflow-hidden rounded-[2rem] p-6 md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <p className="section-kicker mb-4">{aboutPortalData.kicker}</p>
              <h2 className="mb-4 font-display text-[1.7rem] leading-[1.14] text-white md:text-[2.2rem]">
                {aboutPortalData.title}
              </h2>
              <p className="max-w-2xl text-sm leading-8 text-slate-300/76 md:text-base">
                {aboutPortalData.description}
              </p>
            </div>

            <div className="flex items-end justify-between gap-4 rounded-[1.7rem] border border-white/8 bg-white/[0.025] px-5 py-5 md:px-6">
              <div>
                <p className="meta-label mb-2">Parallel Dimension</p>
                <p className="text-sm leading-7 text-slate-200/78">
                  {aboutPortalData.linkLabel}，去看地图、声音、山海、速度和一些更松弛的时刻。
                </p>
              </div>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition duration-300 group-hover:border-sky-200/24 group-hover:bg-white/[0.08]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
