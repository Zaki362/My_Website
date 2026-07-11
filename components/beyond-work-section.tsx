"use client";

import Image from "next/image";
import { Section } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

const tileLayout = [
  "col-span-2 row-span-2 min-h-[24rem] md:col-span-4 md:min-h-[32rem]",
  "col-span-1 min-h-[14rem] md:col-span-2 md:min-h-[15.5rem]",
  "col-span-1 min-h-[14rem] md:col-span-2 md:min-h-[15.5rem]",
  "col-span-1 min-h-[14rem] md:col-span-2 md:min-h-[15.5rem]",
  "col-span-1 min-h-[14rem] md:col-span-2 md:min-h-[15.5rem]"
] as const;

const captionTone = ["dark", "light", "dark", "dark", "light"] as const;

export function BeyondWorkSection() {
  const { t } = useLanguage();

  return (
    <Section id="beyond" className="border-y border-stone-900/8 bg-[#f1f5f3]">
      <div className="mb-10 grid gap-6 md:mb-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase text-violet-600/70" style={{ letterSpacing: "0.1em" }}>
            {t.beyondHome.kicker}
          </p>
          <h2 className="mt-4 max-w-xl font-display text-[2.3rem] font-semibold leading-[1.08] text-stone-950 md:text-[2.5rem] xl:text-[2.75rem]">
            {t.beyondHome.title}
          </h2>
        </div>
        <p className="max-w-2xl text-[0.95rem] leading-7 text-stone-600 lg:justify-self-end md:text-base md:leading-8">
          {t.beyondHome.description}
        </p>
      </div>

      <Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-8 md:gap-4">
          {t.beyondPage.slices.map((item, index) => (
            <figure
              key={item.name}
              className={`group relative overflow-hidden rounded-lg border border-stone-900/8 bg-white shadow-[0_14px_36px_rgba(62,79,70,0.09)] ${tileLayout[index] ?? tileLayout[1]}`}
            >
              {item.image ? (
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes={index === 0 ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 50vw, 28vw"}
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                />
              ) : null}
              <figcaption
                className={`absolute left-4 top-4 max-w-[75%] md:left-5 md:top-5 ${
                  captionTone[index] === "light" ? "text-white" : "text-stone-950"
                }`}
                style={{ textShadow: captionTone[index] === "light" ? "0 1px 14px rgba(18,22,30,0.58)" : "0 1px 12px rgba(255,255,255,0.82)" }}
              >
                <p
                  className={`text-[10px] font-semibold uppercase ${
                    captionTone[index] === "light" ? "text-white/75" : "text-violet-700/75"
                  }`}
                  style={{ letterSpacing: "0.08em" }}
                >
                  {item.label}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold md:text-2xl">{item.name}</h3>
                <span
                  className={`mt-1.5 block text-[11px] ${
                    captionTone[index] === "light" ? "text-white/75" : "text-stone-700"
                  }`}
                >
                  {item.accent}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
