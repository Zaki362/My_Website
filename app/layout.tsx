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
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    url: siteUrl,
    siteName: "郑国华个人网站",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: siteMeta.ogImage,
        width: 1200,
        height: 630,
        alt: siteMeta.title
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [siteMeta.ogImage]
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
