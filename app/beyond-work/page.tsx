import type { Metadata } from "next";
import { BackToTop } from "@/components/back-to-top";
import { BeyondWorkPageContent } from "@/components/beyond-work-page";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { beyondWorkPage, siteMeta } from "@/data/profile";

export const metadata: Metadata = {
  title: `${beyondWorkPage.title}｜郑国华`,
  description: beyondWorkPage.intro,
  openGraph: {
    title: `${beyondWorkPage.title}｜郑国华`,
    description: beyondWorkPage.intro,
    url: `${siteMeta.url}/beyond-work`,
    images: [
      {
        url: beyondWorkPage.leadImage.src,
        alt: beyondWorkPage.title
      }
    ]
  }
};

export default function BeyondWorkPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <BeyondWorkPageContent />
      <Footer />
      <BackToTop />
    </main>
  );
}
