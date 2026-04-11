import { educationBadges, educationItems, educationSection } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";

export function EducationSection() {
  return (
    <SectionShell
      id="education"
      kicker="Education"
      title={educationSection.title}
      description={educationSection.description}
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {educationItems.map((item, index) => (
            <Reveal key={item.school} delay={index * 0.08}>
              <article className="panel interactive-card rounded-[2rem] p-7 md:p-8">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="meta-label mb-3">Academic Path</p>
                    <h3 className="font-display text-2xl text-white">{item.school}</h3>
                    <p className="mt-2 text-sm text-slate-100/82">
                      {item.degree}｜{item.department}
                    </p>
                  </div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs tracking-[0.22em] text-slate-300/80 uppercase">
                    {item.period}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {item.highlights.map((highlight) => (
                    <span key={highlight} className="pill">
                      {highlight}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16} className="panel rounded-[2rem] p-7 md:p-8">
          <p className="meta-label mb-4">Highlights</p>
          <p className="mb-5 font-display text-xl text-white">学术与成绩亮点</p>
          <div className="grid gap-3">
            {educationBadges.map((badge) => (
              <div
                key={badge}
                className="content-card rounded-2xl px-4 py-3 text-sm text-slate-200/82"
              >
                {badge}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
