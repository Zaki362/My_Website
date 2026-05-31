import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectsShowcase } from "@/components/projects-showcase";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <ProjectsShowcase />
      <Footer />
    </main>
  );
}
