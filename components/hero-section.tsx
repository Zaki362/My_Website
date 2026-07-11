"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { contactData } from "@/data/profile";
import { AgentLauncher } from "@/components/agent/AgentLauncher";
import { Container } from "@/components/design-system";
import { useLanguage } from "@/components/language-provider";

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const { locale, t } = useLanguage();
  const companyChips = t.hero.proofChips.slice(-3);

  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-stone-900/[0.08] bg-[#fbfaf7] pt-20 md:pt-24">
      <Container className="relative pb-14 md:pb-16 lg:flex lg:min-h-[calc(100svh-6rem)] lg:items-center lg:py-8">
        <div className="pointer-events-none absolute inset-y-0 right-[31%] hidden w-px bg-stone-900/[0.07] lg:block" />
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_26rem]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="relative z-10"
          >
            <div className="mb-5 flex max-w-full items-center gap-2 text-xs font-semibold text-[#5471d2]">
              <GraduationCap className="h-4 w-4 shrink-0" />
              <span className="truncate">{t.hero.title}</span>
            </div>

            <div className="flex items-end gap-4">
              <h1
                className={
                  locale === "zh"
                    ? "font-display text-[4rem] font-[850] leading-[0.92] text-[#171717] sm:text-[5.2rem] lg:text-[6rem]"
                    : "font-display text-[3.35rem] font-[820] leading-[0.94] text-[#171717] sm:text-[4.3rem] lg:text-[4.8rem] xl:text-[5.25rem]"
                }
              >
                {locale === "zh" ? t.hero.name : t.hero.romanName}
              </h1>
              <Sparkles className="mb-2 hidden h-6 w-6 text-[#bd8237] sm:block" aria-hidden="true" />
            </div>

            <div className="mt-6 max-w-[44rem] border-l-2 border-[#6d5bd0] pl-5 md:mt-7 md:pl-6">
              <p className="text-[1.2rem] leading-[1.55] text-[#302f2c] sm:text-[1.35rem] md:text-[1.5rem]">
                {t.hero.tagline}
              </p>
              <p className="mt-4 max-w-[41rem] text-[0.95rem] leading-7 text-stone-600 md:text-base md:leading-8">
                {t.hero.intro}
              </p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#experience"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg bg-[#1d1d1f] px-5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(23,23,23,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35"
              >
                <BriefcaseBusiness className="h-4 w-4" />
                {t.hero.cta[0]}
                <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-violet-500/20 bg-violet-500/[0.06] px-5 text-sm font-semibold text-[#5a45c4] transition duration-300 hover:-translate-y-0.5 hover:bg-violet-500/[0.1] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35"
              >
                <Sparkles className="h-4 w-4" />
                {t.hero.cta[1]}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg border border-stone-900/10 bg-white px-5 text-sm font-semibold text-stone-800 transition duration-300 hover:-translate-y-0.5 hover:border-stone-900/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/35"
              >
                <Mail className="h-4 w-4" />
                {t.hero.cta[2]}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-stone-900/10 pt-4">
              {companyChips.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-sm font-medium text-stone-600">
                  <Building2 className="h-3.5 w-3.5 text-[#bd8237]" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.74, delay: 0.08, ease }}
            className="relative mx-auto w-full max-w-[27rem] lg:mx-0"
          >
            <div className="relative border-y border-stone-900/10 py-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#efede7] lg:h-[min(52svh,460px)] lg:aspect-auto xl:h-[min(54svh,490px)]">
                <Image
                  src={contactData.photoPath}
                  alt={t.hero.name}
                  fill
                  priority
                  sizes="(min-width: 1024px) 400px, 88vw"
                  className="object-contain object-bottom saturate-[0.9] contrast-[0.98]"
                />
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-stone-900/10 pt-4 text-sm font-medium text-stone-600">
                <MapPin className="h-4 w-4 text-[#6d5bd0]" aria-hidden="true" />
                <span>{t.hero.location}</span>
              </div>
            </div>
            <div className="mt-4">
              <AgentLauncher />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
