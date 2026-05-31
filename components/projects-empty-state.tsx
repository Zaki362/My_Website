"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projectPlaceholders, projectsPageData } from "@/data/profile";
import { Reveal } from "@/components/reveal";

const PROJECT_COVER_WIDTH = 2780;
const PROJECT_COVER_HEIGHT = 716;

export function ProjectsEmptyState() {
  const [activeProject, setActiveProject] = useState<(typeof projectPlaceholders)[number] | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <Reveal>
      <section className="panel rounded-[2rem] p-5 md:rounded-[2.25rem] md:p-10">
        <div className="mb-10 max-w-2xl">
          <span className="pill mb-5">Building in public, carefully</span>
          <h2 className="mb-4 font-display text-3xl tracking-display text-white md:text-4xl">
            {projectsPageData.emptyTitle}
          </h2>
          <p className="text-sm leading-8 text-slate-300/74 md:text-base">
            {projectsPageData.emptyDescription}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectPlaceholders.map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setActiveProject(project)}
              className="interactive-card content-card rounded-[1.5rem] p-5 text-left md:rounded-[1.75rem] md:p-6"
            >
              <div className="mb-5 overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-2.5 md:rounded-[1.4rem] md:p-3">
                <Image
                  src={project.cover}
                  alt={project.title}
                  width={PROJECT_COVER_WIDTH}
                  height={PROJECT_COVER_HEIGHT}
                  className="h-auto w-full rounded-[1rem]"
                />
              </div>
              <span className="pill mb-4">{project.eyebrow}</span>
              <h3 className="mb-3 font-display text-[1.45rem] text-white md:text-2xl">{project.title}</h3>
              <p className="mb-5 text-sm leading-8 text-slate-300/74">{project.shortDescription}</p>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.metrics.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-sky-200/10 bg-sky-100/[0.03] px-3 py-1 text-xs text-slate-200/78"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300/74">
                查看详情
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeProject ? (
          <>
            <motion.button
              type="button"
              aria-label="关闭项目详情"
              className="fixed inset-0 z-[70] bg-slate-950/58 backdrop-blur-[3px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="fixed inset-x-3 top-16 bottom-3 z-[80] mx-auto w-auto overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,14,31,0.96),rgba(7,10,22,0.94))] shadow-[0_24px_80px_rgba(4,9,22,0.58)] backdrop-blur-2xl md:inset-x-4 md:top-[8vh] md:bottom-auto md:max-h-[84vh] md:w-full md:max-w-5xl md:rounded-[2rem]"
            >
              <div className="flex h-full max-h-full flex-col overflow-hidden md:max-h-[84vh]">
                <div className="flex items-start justify-between gap-4 border-b border-white/8 px-4 py-4 md:gap-6 md:px-8 md:py-5">
                  <div className="max-w-3xl">
                    <span className="pill mb-4">{activeProject.eyebrow}</span>
                    <h3 className="font-display text-[1.9rem] tracking-display text-white md:text-4xl">
                      {activeProject.title}
                    </h3>
                    <p className="mt-4 text-sm leading-8 text-slate-300/74 md:text-base">
                      {activeProject.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-white/20 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="overflow-y-auto px-4 py-4 md:px-8 md:py-8">
                  <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                    <div>
                      <div className="mb-6 overflow-hidden rounded-[1.3rem] border border-white/10 bg-white/[0.02] p-2.5 md:rounded-[1.6rem] md:p-3">
                        <button
                          type="button"
                          onClick={() => setPreviewImage(activeProject.cover)}
                          className="block w-full text-left"
                        >
                          <Image
                            src={activeProject.cover}
                            alt={activeProject.title}
                            width={PROJECT_COVER_WIDTH}
                            height={PROJECT_COVER_HEIGHT}
                            className="h-auto w-full rounded-[1rem] transition duration-300 hover:opacity-95 md:rounded-[1.2rem]"
                          />
                        </button>
                      </div>
                      <div className="content-card rounded-[1.5rem] p-5">
                        <p className="meta-label mb-3">Project Summary</p>
                        <p className="text-sm leading-8 text-slate-300/80">{activeProject.details}</p>
                      </div>
                    </div>

                    <div className="grid gap-6">
                      <div className="content-card rounded-[1.5rem] p-5">
                        <p className="meta-label mb-3">Project Highlights</p>
                        <div className="space-y-3">
                          {activeProject.highlights.map((item) => (
                            <p key={item} className="text-sm leading-8 text-slate-200/80">
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="content-card rounded-[1.5rem] p-5">
                        <p className="meta-label mb-3">Outcomes</p>
                        <div className="space-y-3">
                          {activeProject.outcomes.map((item) => (
                            <p key={item} className="text-sm leading-8 text-slate-200/80">
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeProject.stack.map((item) => (
                      <span key={item} className="pill">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-amber-100/10 bg-amber-50/[0.03] px-4 py-3 text-sm leading-7 text-slate-300/78">
                    {activeProject.note}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {previewImage ? (
          <>
            <motion.button
              type="button"
              aria-label="关闭图片预览"
              className="fixed inset-0 z-[90] bg-slate-950/82 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImage(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed inset-3 z-[100] flex items-center justify-center md:inset-4"
            >
              <div className="relative max-h-full max-w-full">
                <button
                  type="button"
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-2 right-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-slate-950/62 text-slate-100 backdrop-blur-md transition hover:border-white/20 hover:text-white md:top-3 md:right-3"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="max-h-[calc(100vh-1.5rem)] max-w-[calc(100vw-1.5rem)] overflow-auto rounded-[1.2rem] border border-white/10 bg-slate-950/40 p-2 md:max-h-[calc(100vh-2rem)] md:max-w-[calc(100vw-2rem)] md:rounded-[1.5rem] md:p-3 shadow-[0_24px_80px_rgba(4,9,22,0.58)] backdrop-blur-xl">
                  <Image
                    src={previewImage}
                    alt="项目流程图预览"
                    width={PROJECT_COVER_WIDTH}
                    height={PROJECT_COVER_HEIGHT}
                    className="max-w-none rounded-[1rem]"
                  />
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </Reveal>
  );
}
