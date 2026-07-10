"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type ExperienceCardProps = {
  company: string;
  role: string;
  period: string;
  overview: string;
  skills: readonly string[];
};

export function ExpandableExperienceCard({
  company,
  role,
  period,
  overview,
  skills
}: ExperienceCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="panel interactive-card rounded-[2rem] p-6 md:p-8">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="pill">{company}</span>
              <span className="text-xs uppercase tracking-[0.24em] text-slate-400">{period}</span>
            </div>
            <h3 className="font-display text-2xl text-white md:text-[2rem]">{role}</h3>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300/76 md:text-base">
              {overview}
            </p>
          </div>

          <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end">
            <div className="flex flex-wrap justify-end gap-2">
              {skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300/78"
                >
                  {skill}
                </span>
              ))}
            </div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white">
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.28 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.span>
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-8 border-t border-white/8 pt-8">
              <p className="meta-label mb-3">公开关键词</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
