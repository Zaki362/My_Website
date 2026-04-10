"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type ExperienceCardProps = {
  company: string;
  role: string;
  period: string;
  overview: string;
  responsibilities: readonly string[];
  impact: readonly string[];
  skills: readonly string[];
};

export function ExpandableExperienceCard({
  company,
  role,
  period,
  overview,
  responsibilities,
  impact,
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
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300/78 md:text-base">
              {overview}
            </p>
          </div>

          <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end">
            <div className="flex flex-wrap justify-end gap-2">
              {skills.slice(0, 3).map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300/82">
                  {skill}
                </span>
              ))}
            </div>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
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
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8 grid gap-6 border-t border-white/8 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-500">关键项目 / 职责</p>
                  <div className="space-y-3">
                    {responsibilities.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3 text-sm leading-7 text-slate-200/78"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-500">结果 / 影响</p>
                  <div className="space-y-3">
                    {impact.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-sky-200/10 bg-sky-100/[0.03] px-4 py-3 text-sm leading-7 text-slate-100/82"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.28em] text-slate-500">技能标签</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
