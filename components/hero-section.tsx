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
    <section id="home" className="relative isolate overflow-hidden pt-24 md:pt-28 lg:pt-20">
      <span className="pointer-events-none absolute -left-32 bottom-4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(215,164,95,0.18),transparent_66%)] blur-2xl" />
      <span className="pointer-events-none absolute right-[7%] top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(139,108,246,0.13),transparent_68%)] blur-2xl" />

      <Container className="relative grid min-h-[calc(100vh-4.25rem)] items-center gap-10 pb-14 md:pb-16 lg:grid-cols-[minmax(0,58%)_minmax(340px,42%)] lg:gap-8 xl:grid-cols-[minmax(0,56%)_minmax(380px,44%)] xl:gap-10 2xl:gap-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.74, ease }}
          className="lg:-mt-2"
        >
          <div className="mb-5 flex w-fit max-w-full items-center gap-2 rounded-full border border-[#8b6cf6]/[0.12] bg-[#8b6cf6]/[0.075] px-3.5 py-2 text-[0.78rem] font-semibold leading-none text-[#4868d8] shadow-[0_10px_34px_rgba(139,108,246,0.08)] xl:mb-6">
            <GraduationCap className="h-4 w-4 shrink-0" />
            <span className="truncate">{t.hero.title}</span>
          </div>

          <div className="relative block w-fit">
            <Sparkles className="absolute -right-8 top-1 hidden h-6 w-6 text-[#d7a45f] opacity-75 md:block" />
            <h1
              className={
                locale === "zh"
                  ? "relative max-w-[690px] font-display text-[3.6rem] font-[900] leading-[0.98] text-[#241f1b] sm:text-[4.4rem] lg:text-[5.7rem] xl:text-[6.75rem]"
                  : "relative max-w-[760px] font-display text-[3.2rem] font-[860] leading-[1] text-[#241f1b] sm:text-[4rem] lg:whitespace-nowrap lg:text-[4.7rem] xl:text-[5.35rem]"
              }
            >
              {locale === "zh" ? t.hero.name : t.hero.romanName}
            </h1>
            <svg
              viewBox="0 0 520 34"
              aria-hidden="true"
              className="pointer-events-none mt-1 h-4 w-[78%] max-w-[28rem] text-[#d7a45f]/50 md:h-5"
            >
              <path
                d="M5 23C82 6 165 11 245 17C334 24 420 24 516 9"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="8"
              />
            </svg>
          </div>

          <p className="mt-6 max-w-[640px] text-[1.24rem] leading-[1.62] text-[#3f3934] md:text-[1.48rem] xl:mt-7 xl:text-[1.62rem]">
            {t.hero.tagline}
          </p>
          <p className="mt-5 max-w-[640px] text-base leading-[1.85] text-[#5f5a55] xl:mt-6 xl:text-[1.03rem]">
            {t.hero.intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-9">
            <a
              href="#experience"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-[1.125rem] bg-[#2b251f] px-6 text-sm font-semibold text-[#fffaf2] shadow-[0_18px_46px_rgba(62,46,31,0.18)] transition hover:-translate-y-0.5 hover:bg-[#211d19] hover:shadow-[0_22px_58px_rgba(62,46,31,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.45]"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              {t.hero.cta[0]}
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#projects"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-[1.125rem] border border-[#8b6cf6]/[0.18] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(246,241,255,0.74))] px-5 text-sm font-semibold text-[#6a35e8] shadow-[0_14px_36px_rgba(111,76,220,0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#8b6cf6]/[0.3] hover:bg-white/[0.9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b6cf6]/[0.28]"
            >
              <Sparkles className="h-4 w-4 text-[#d7a45f]" />
              <span className="whitespace-nowrap">{t.hero.cta[1]}</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex h-14 items-center justify-center gap-3 rounded-[1.125rem] border border-[rgba(80,60,40,0.12)] bg-white/[0.72] px-6 text-sm font-semibold text-[#3f3934] shadow-[0_14px_36px_rgba(80,60,40,0.07)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[rgba(80,60,40,0.2)] hover:bg-white/[0.88] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d7a45f]/[0.35]"
            >
              <Mail className="h-4 w-4" />
              {t.hero.cta[2]}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 xl:mt-9">
            {companyChips.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(80,60,40,0.11)] bg-white/[0.78] px-3.5 py-2 text-sm font-semibold text-[#6a35e8] shadow-[0_10px_28px_rgba(80,60,40,0.055)] backdrop-blur-xl"
              >
                <Building2 className="h-3.5 w-3.5 text-[#d7a45f]" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.08, ease }}
          className="mx-auto flex w-full max-w-[420px] flex-col gap-4 lg:max-w-[392px] lg:justify-self-center xl:max-w-[410px]"
        >
          <aside
            className="interactive-card relative overflow-hidden rounded-[2rem] border border-[rgba(120,90,60,0.12)] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,249,240,0.74))] p-4 shadow-[0_28px_80px_rgba(70,50,30,0.12)] backdrop-blur-2xl md:p-5 xl:p-6"
            aria-label="Profile identity card"
          >
            <svg
              viewBox="0 0 180 180"
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 text-[#d7a45f]/30"
            >
              <path
                d="M22 106C43 42 104 10 165 20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2.5"
              />
              <path
                d="M48 128C70 77 116 50 165 55"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.4"
              />
            </svg>

            <div className="relative flex justify-center">
              <div className="relative aspect-[3/4] w-full max-w-[17rem] shrink-0 overflow-hidden rounded-[1.625rem] border border-white/80 bg-white shadow-[0_20px_44px_rgba(79,62,39,0.16)] sm:max-w-[18rem] lg:max-w-[16.5rem] xl:max-w-[17.5rem]">
                <Image
                  src={contactData.photoPath}
                  alt={t.hero.name}
                  fill
                  priority
                  sizes="(min-width: 1280px) 280px, (min-width: 1024px) 264px, 80vw"
                  className="object-contain object-center saturate-[0.86] contrast-[0.97] brightness-[1.035]"
                />
              </div>
            </div>

            <div className="relative mt-4 flex items-center justify-between gap-4 rounded-[1.25rem] border border-[rgba(120,90,60,0.12)] bg-[#fffaf2]/[0.72] px-4 py-3 backdrop-blur-sm">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone-400">
                Base
              </span>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(120,90,60,0.12)] bg-white/[0.72] text-[#8b8174]">
                  <MapPin className="h-4 w-4" />
                </span>
                <p className="font-display text-lg font-[760] leading-none text-[#241f1b]">
                  {t.hero.location}
                </p>
              </div>
            </div>
          </aside>

          <AgentLauncher />
        </motion.div>
      </Container>
    </section>
  );
}
