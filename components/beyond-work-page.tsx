"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { beyondWorkGroups, beyondWorkPage } from "@/data/profile";
import { Reveal } from "@/components/reveal";

type Slice = (typeof beyondWorkGroups)[number]["items"][number] & {
  groupKey: string;
  groupKicker: string;
  groupTitle: string;
};

const AUTO_PLAY_MS = 3000;
const RESUME_DELAY_MS = 6800;
const SWIPE_THRESHOLD = 36;
const MOBILE_SIDE_OFFSET = 158;
const DESKTOP_SIDE_OFFSET = 330;

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function getCircularOffset(index: number, activeIndex: number, length: number) {
  const forward = (index - activeIndex + length) % length;
  const backward = forward - length;
  return Math.abs(forward) <= Math.abs(backward) ? forward : backward;
}

function SliceVisual({
  slice,
  active
}: {
  slice: Slice;
  active: boolean;
}) {
  if (slice.image) {
    return (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(120,190,255,0.12),transparent_24%),linear-gradient(180deg,rgba(11,16,32,0.68),rgba(8,11,24,0.9))]" />
        <div className="absolute inset-4 flex items-center justify-center md:inset-6">
          <div className="relative h-full w-full">
            <Image
              src={slice.image.src}
              alt={slice.image.alt}
              fill
              className={`object-contain transition duration-700 ${active ? "scale-[1.01]" : "scale-100"}`}
              sizes="(max-width: 768px) 72vw, 56vw"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,22,0.04),rgba(7,10,22,0.16))]" />
      </>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(127,197,255,0.22),transparent_22%),radial-gradient(circle_at_82%_72%,rgba(132,115,255,0.16),transparent_24%),radial-gradient(circle_at_52%_52%,rgba(255,255,255,0.06),transparent_38%),linear-gradient(180deg,rgba(17,23,43,0.92),rgba(10,14,28,0.72))]" />
      <div className="absolute inset-x-7 top-7 flex items-center justify-between gap-4">
        <span className="pill">{slice.label}</span>
        <span className="text-[11px] uppercase tracking-[0.24em] text-slate-300/62">{slice.accent}</span>
      </div>
      <div className="absolute inset-x-7 bottom-7">
        <p className="font-display text-[1.75rem] text-slate-100/92 md:text-[2.3rem]">{slice.name}</p>
        <p className="mt-3 max-w-md text-sm leading-7 text-slate-300/72">
          Photo slot reserved for a more specific moment.
        </p>
      </div>
    </>
  );
}

function CarouselSlide({
  slice,
  offset,
  isActive,
  onSelect,
  sideOffset
}: {
  slice: Slice;
  offset: number;
  isActive: boolean;
  onSelect: () => void;
  sideOffset: number;
}) {
  const hidden = Math.abs(offset) > 1;
  const cardOffset = offset * sideOffset;

  return (
    <div
      className={`absolute left-1/2 top-0 h-full w-[74%] -translate-x-1/2 md:w-[58%] ${
        hidden ? "pointer-events-none" : ""
      } ${isActive ? "z-30" : "z-10"}`}
    >
      <motion.button
        type="button"
        onClick={onSelect}
        initial={false}
        animate={{
          x: cardOffset,
          scale: isActive ? 1 : 0.82,
          opacity: isActive ? 1 : hidden ? 0 : 0.34,
          filter: isActive ? "blur(0px)" : "blur(8px)"
        }}
        transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full text-left"
        style={{ transformOrigin: "center center" }}
        aria-label={`查看 ${slice.name}`}
      >
        <div
          className={`relative h-full overflow-hidden rounded-[2rem] border transition duration-500 md:rounded-[2.4rem] ${
            isActive
              ? "border-white/14 shadow-[0_34px_90px_rgba(3,8,22,0.48)]"
              : "border-white/8 shadow-[0_20px_60px_rgba(3,8,22,0.28)]"
          }`}
        >
          <SliceVisual slice={slice} active={isActive} />
        </div>
      </motion.button>
    </div>
  );
}

export function BeyondWorkPageContent() {
  const slices = useMemo<Slice[]>(
    () =>
      beyondWorkGroups.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          groupKey: group.key,
          groupKicker: group.kicker,
          groupTitle: group.title
        }))
      ),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  function queueResume() {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    setPaused(true);
    resumeTimeoutRef.current = setTimeout(() => setPaused(false), RESUME_DELAY_MS);
  }

  function goTo(index: number) {
    setActiveIndex(wrapIndex(index, slices.length));
    queueResume();
  }

  function goNext() {
    goTo(activeIndex + 1);
  }

  function goPrev() {
    goTo(activeIndex - 1);
  }

  useEffect(() => {
    if (paused) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, slices.length));
    }, AUTO_PLAY_MS);

    return () => clearInterval(timer);
  }, [paused, slices.length]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const activeSlice = slices[activeIndex];
  const sideOffset = isMobile ? MOBILE_SIDE_OFFSET : DESKTOP_SIDE_OFFSET;

  return (
    <div className="container-shell relative pt-28 pb-14 md:pt-36 md:pb-20">
      <Reveal>
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm tracking-[0.04em] text-slate-300/72 transition hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          返回主页
        </Link>
      </Reveal>

      <Reveal className="max-w-4xl">
        <p className="section-kicker mb-4">{beyondWorkPage.kicker}</p>
        <h1 className="mb-5 max-w-4xl font-display text-[2.6rem] leading-[1.08] text-white md:text-[4.2rem]">
          {beyondWorkPage.title}
        </h1>
        <p className="max-w-2xl text-sm leading-8 text-slate-300/72 md:text-base">
          {beyondWorkPage.intro}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-12 md:mt-16">
        <section className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,16,32,0.94),rgba(8,11,24,0.9))] px-4 py-5 shadow-[0_26px_80px_rgba(3,8,22,0.42)] backdrop-blur-xl md:px-8 md:py-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="section-kicker mb-3">Life Gallery / Motion</p>
              <p className="max-w-xl text-sm leading-7 text-slate-300/70">
                从旅行、下潜、徒步，到滑雪与音乐。像翻看一组缓慢移动的生活影像。
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-100 transition hover:border-sky-200/22 hover:bg-white/[0.08]"
                aria-label="查看上一张生活切片"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-100 transition hover:border-sky-200/22 hover:bg-white/[0.08]"
                aria-label="查看下一张生活切片"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => queueResume()}
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.22}
              onDragStart={() => setPaused(true)}
              onDragEnd={(_, info) => {
                if (info.offset.x <= -SWIPE_THRESHOLD) {
                  goTo(activeIndex + 1);
                } else if (info.offset.x >= SWIPE_THRESHOLD) {
                  goTo(activeIndex - 1);
                } else {
                  queueResume();
                }
              }}
              className="relative h-[23rem] cursor-grab active:cursor-grabbing md:h-[34rem]"
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 z-40 w-8 bg-[linear-gradient(90deg,rgba(8,11,24,0.94),transparent)] md:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-40 w-8 bg-[linear-gradient(270deg,rgba(8,11,24,0.94),transparent)] md:w-24" />

              {slices.map((slice, index) => {
                const offset = getCircularOffset(index, activeIndex, slices.length);
                return (
                  <CarouselSlide
                    key={`${slice.groupKey}-${slice.name}`}
                    slice={slice}
                    offset={offset}
                    isActive={index === activeIndex}
                    onSelect={() => goTo(index)}
                    sideOffset={sideOffset}
                  />
                );
              })}
            </motion.div>
          </div>

          <div className="mx-auto mt-7 max-w-2xl text-center md:mt-9">
            <p className="section-kicker mb-3">{activeSlice.groupKicker}</p>
            <h2 className="font-display text-[1.85rem] leading-[1.12] text-white md:text-[2.5rem]">
              {activeSlice.name}
            </h2>
            <p className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-500">
              {activeSlice.accent}
            </p>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-8 text-slate-300/78 md:text-base">
              {activeSlice.description}
            </p>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2 md:mt-8">
            {slices.map((slice, index) => (
              <button
                key={`${slice.groupKey}-${slice.name}-dot`}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`查看 ${slice.name}`}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === activeIndex ? "w-8 bg-sky-100/88" : "w-2 bg-white/20 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.16} className="mt-20 md:mt-24">
        <section className="panel rounded-[2.1rem] px-6 py-8 md:px-10 md:py-12">
          <div className="grid gap-10 border-b border-white/8 pb-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <div>
              <p className="section-kicker mb-4">{beyondWorkPage.nextStops.kicker}</p>
              <h2 className="mb-4 font-display text-[2rem] leading-[1.12] text-white md:text-[2.7rem]">
                {beyondWorkPage.nextStops.title}
              </h2>
            </div>
            <div>
              <p className="text-sm leading-8 text-slate-300/78 md:text-base">
                {beyondWorkPage.nextStops.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {beyondWorkPage.nextStops.items.map((item) => (
                  <span key={item} className="pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-10 text-center">
            <p className="meta-label mb-4">Closing Note</p>
            <p className="mx-auto max-w-2xl font-display text-[1.6rem] leading-9 text-slate-50/90 md:text-[2rem] md:leading-[2.8rem]">
              {beyondWorkPage.closing}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-slate-400">
              世界依然很大，地图也不急着画完。工作之外，我也在继续拓展生活的边界。
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
