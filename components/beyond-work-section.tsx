"use client";

import Image from "next/image";
import { Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

function ImageStoryCard({
  name,
  label,
  image,
  accent
}: {
  name: string;
  label: string;
  image: {
    src: string;
    alt: string;
  } | null;
  accent: string;
}) {
  return (
    <div
      className="interactive-card group flex h-[15.5rem] flex-col overflow-hidden rounded-[1.5rem] border border-stone-900/10 bg-[#fffdfa] shadow-panel sm:h-[17rem] lg:h-[18.5rem]"
    >
      <div className="relative h-[68%] overflow-hidden bg-stone-100">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
          />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,35,31,0)_42%,rgba(37,35,31,0.42)_100%)]" />
        <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-white/15 px-2.5 py-1 text-[0.68rem] font-medium text-[#fffaf2] backdrop-blur">
          {accent}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center p-4">
        <p className="meta-label mb-2">{label}</p>
        <h3 className="font-display text-xl font-[620] leading-tight text-stone-950">{name}</h3>
      </div>
    </div>
  );
}

export function BeyondWorkSection() {
  const { t } = useLanguage();

  return (
    <Section id="beyond" className="pt-20 lg:pt-24">
      <SectionHeader
        kicker={t.beyondHome.kicker}
        title={t.beyondHome.title}
        description={t.beyondHome.description}
        className="mb-8 md:mb-10"
      />

      <Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {t.beyondPage.slices.map((item) => (
            <ImageStoryCard
              key={item.name}
              name={item.name}
              label={item.label}
              image={item.image}
              accent={item.accent}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
