import { experienceSection, experiences } from "@/data/profile";
import { ExpandableExperienceCard } from "@/components/expandable-experience-card";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      kicker="Experience"
      title={experienceSection.title}
      description={experienceSection.description}
    >
      <div className="space-y-5">
        {experiences.map((experience, index) => (
          <Reveal key={`${experience.company}-${experience.period}`} delay={index * 0.08}>
            <ExpandableExperienceCard {...experience} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
