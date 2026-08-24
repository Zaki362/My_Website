import type { Metadata } from "next";
import "./globals.css";
import { siteMeta } from "@/data/profile";
import { LanguageProvider } from "@/components/language-provider";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteMeta.title,
  description: siteMeta.description,
  applicationName: "郑国华｜AI Builder",
  authors: [{ name: "郑国华" }],
  creator: "郑国华",
  keywords: ["郑国华", "Guohua Zheng", "AI Builder", "AI 产品", "AI Agent", "AIGC"],
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteUrl,
    siteName: "郑国华｜AI Builder",
    locale: "zh_CN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-background font-sans text-foreground antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
