"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, Compass } from "lucide-react";
import { Badge, Card, Container, IconFrame, Section, SectionHeader } from "@/components/design-system";
import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/components/language-provider";

export function BeyondWorkPageContent() {
  const { t } = useLanguage();
  const slices = t.beyondPage.slices;

  return (
    <>
      <Container className="pt-28 md:pt-36">
        <Reveal>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-[#fffdfa]/75 px-4 py-2 text-sm text-stone-600 transition hover:bg-[#fffdfa] hover:text-stone-950"
          >
            <ChevronLeft className="h-4 w-4" />
            {t.common.backHome}
          </Link>
        </Reveal>

        <Reveal>
          <div className="grid gap-10 pb-16 md:pb-24 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <Badge tone="purple" className="mb-6">
                {t.beyondPage.kicker}
              </Badge>
              <h1 className="max-w-3xl font-display text-[3rem] font-[620] leading-[1.02] text-stone-950 sm:text-[3.8rem] lg:text-[4.8rem]">
                {t.beyondPage.title}
              </h1>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-stone-600">
              {t.beyondPage.intro}
            </p>
          </div>
        </Reveal>
      </Container>

      <Section id="life-story" className="pt-0">
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="interactive-card group relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-stone-900/10 bg-stone-100">
              <Image
                src={t.beyondPage.leadImage.src}
                alt={t.beyondPage.leadImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 720px"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(37,35,31,0)_52%,rgba(37,35,31,0.50)_100%)]" />
              <p className="absolute left-6 bottom-6 right-6 max-w-xl text-xl font-medium leading-8 text-[#fffaf2]">
                {t.beyondPage.leadNote}
              </p>
            </div>

            <div className="grid gap-5">
              {slices.slice(0, 3).map((slice, index) => (
                <Card key={slice.name} className="overflow-hidden p-0">
                  <div className="grid min-h-[12rem] grid-cols-[0.9fr_1.1fr]">
                    <div className="relative overflow-hidden bg-stone-100">
                      {slice.image ? (
                        <Image
                          src={slice.image.src}
                          alt={slice.image.alt}
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col justify-between p-5">
                      <div>
                        <p className="meta-label mb-3">{slice.label}</p>
                        <h2 className="font-display text-xl font-[620] text-stone-950">{slice.name}</h2>
                      </div>
                      <p className="text-sm leading-7 text-stone-600">{t.beyondPage.storyCaptions[index]}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section id="observations" className="pt-0">
        <SectionHeader
          kicker={t.beyondPage.curatedKicker}
          title={t.beyondPage.curatedTitle}
          description={t.beyondPage.curatedDescription}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {slices.map((slice, index) => (
            <Reveal key={slice.name} delay={index * 0.05}>
              <Card className="h-full overflow-hidden p-0">
                <div className="group relative aspect-[4/3] overflow-hidden bg-stone-100">
                  {slice.image ? (
                    <Image
                      src={slice.image.src}
                      alt={slice.image.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 360px"
                      className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-stone-100">
                      <IconFrame icon={Compass} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <Badge tone="neutral">{slice.label}</Badge>
                    <span className="text-xs text-stone-400">{slice.accent}</span>
                  </div>
                  <h3 className="font-display text-2xl font-[620] text-stone-950">{slice.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">{slice.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="next-stops" className="pt-0 pb-24 lg:pb-32">
        <Reveal>
          <div className="grid gap-8 rounded-[2rem] border border-stone-900/10 bg-[#fffdfa] p-6 shadow-panel md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="section-kicker mb-4">{t.beyondPage.nextStops.kicker}</p>
              <h2 className="font-display text-3xl font-[620] leading-tight text-stone-950 md:text-4xl">
                {t.beyondPage.nextStops.title}
              </h2>
            </div>
            <div>
              <p className="text-base leading-8 text-stone-600">{t.beyondPage.nextStops.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {t.beyondPage.nextStops.items.map((item) => (
                  <Badge key={item} tone="blue">
                    {item}
                  </Badge>
                ))}
              </div>
              <Link href="/#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-950">
                {t.beyondPage.continue}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
