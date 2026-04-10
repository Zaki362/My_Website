"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { contactData, heroData } from "@/data/profile";
import { ProfileVisual } from "@/components/profile-visual";

const buttonStyles = {
  primary:
    "bg-white text-slate-950 hover:bg-slate-100",
  secondary:
    "border border-white/14 bg-white/6 text-white hover:border-sky-200/24 hover:bg-white/10",
  ghost:
    "text-slate-300 hover:text-white"
};

export function HeroSection() {
  return (
    <section id="home" className="container-shell relative flex min-h-screen items-center pt-28 pb-14 md:pt-32">
      <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex flex-wrap gap-3">
            {heroData.eyebrow.map((item) => (
              <span key={item} className="pill">
                {item}
              </span>
            ))}
          </div>

          <h1 className="mb-5 max-w-4xl font-display text-5xl font-medium tracking-display text-white md:text-7xl">
            {heroData.name}
          </h1>
          <p className="mb-4 text-lg text-slate-100/86 md:text-2xl">{heroData.title}</p>
          <p className="mb-6 max-w-3xl text-xl text-sky-100/78 md:text-2xl">{heroData.tagline}</p>
          <p className="max-w-3xl text-sm leading-8 text-slate-300/78 md:text-base">
            {heroData.intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {heroData.cta.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm transition ${buttonStyles[action.variant]}`}
              >
                {action.label}
              </Link>
            ))}
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-slate-400">
            <span>{contactData.email}</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 md:block" />
            <span className="hidden md:block">{contactData.phone}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[420px]"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(circle,_rgba(122,215,255,0.16),_transparent_64%)] blur-2xl" />
          <ProfileVisual src={contactData.photoPath} alt={heroData.name} fallbackText="ZG" />
        </motion.div>
      </div>

      <motion.a
        href="#education"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.72 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400 md:inline-flex"
      >
        Scroll
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
