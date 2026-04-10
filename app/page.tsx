import { BackToTop } from "@/components/back-to-top";
import { ContactSection } from "@/components/contact-section";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ResearchSection } from "@/components/research-section";
import { SkillsSection } from "@/components/skills-section";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <EducationSection />
      <ExperienceSection />
      <ResearchSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
