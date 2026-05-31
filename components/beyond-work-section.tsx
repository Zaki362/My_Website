"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink, Section, SectionHeader, cn } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

function ImageStoryCard({
  src,
  alt,
  caption,
  featured = false
}: {
  src: string;
  alt: string;
  caption: string;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "interactive-card group relative overflow-hidden rounded-[1.75rem] border border-stone-900/10 bg-stone-100",
        featured ? "min-h-[28rem] lg:row-span-2" : "min-h-[13.5rem]"
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 700px" : "(max-width: 1024px) 100vw, 360px"}
        className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,35,31,0)_48%,rgba(37,35,31,0.48)_100%)]" />
      <p className="absolute left-5 bottom-5 right-5 text-base font-medium leading-7 text-[#fffaf2]">
        {caption}
      </p>
    </div>
  );
}

export function BeyondWorkSection() {
  const { t } = useLanguage();

  return (
    <Section id="beyond" className="pt-20 lg:pt-28">
      <SectionHeader
        kicker={t.beyondHome.kicker}
        title={t.beyondHome.title}
        description={t.beyondHome.description}
        action={
          <ButtonLink href="/beyond-work" variant="ghost" className="px-0">
            {t.beyondHome.action}
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        }
      />

      <Reveal>
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <ImageStoryCard {...t.beyondHome.items[0]} />
          <div className="grid gap-5">
            {t.beyondHome.items.slice(1).map((item) => (
              <ImageStoryCard key={item.caption} {...item} />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
