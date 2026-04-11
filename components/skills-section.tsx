import { skillGroups, skillsSection } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";

export function SkillsSection() {
  return (
    <SectionShell
      id="skills"
      kicker="Capabilities"
      title={skillsSection.title}
      description={skillsSection.description}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.title} delay={index * 0.08}>
            <div className="panel interactive-card rounded-[2rem] p-7 md:p-8">
              <p className="meta-label mb-4">Capability Cluster</p>
              <h3 className="mb-5 font-display text-2xl text-white">{group.title}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
