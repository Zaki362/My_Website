import { BackToTop } from "@/components/back-to-top";
import { BeyondWorkSection } from "@/components/beyond-work-section";
import { ContactSection } from "@/components/contact-section";
import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";
import { ProjectsHomeSection } from "@/components/projects-showcase";
import { ResearchSection } from "@/components/research-section";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <HeroSection />
      <EducationSection />
      <ExperienceSection />
      <ProjectsHomeSection />
      <ResearchSection />
      <BeyondWorkSection />
      <ContactSection />
      <Footer />
      <BackToTop />
    </main>
  );
}
