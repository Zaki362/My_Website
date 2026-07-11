"use client";

import { motion, useReducedMotion } from "framer-motion";

type AgentSpriteProps = {
  active?: boolean;
  hovered?: boolean;
  size?: "sm" | "md" | "card" | "hero";
  state?: "idle" | "curious" | "thinking" | "speaking";
};

const sizeClass = {
  sm: "h-11 w-11",
  md: "h-14 w-14",
  card: "h-[5.25rem] w-[5.25rem]",
  hero: "h-32 w-32 md:h-36 md:w-36"
} as const;

export function AgentSprite({
  active = false,
  hovered = false,
  size = "md",
  state = "idle"
}: AgentSpriteProps) {
  const reduceMotion = useReducedMotion();
  const attentive = active || hovered || state !== "idle";
  const thinking = state === "thinking";
  const speaking = state === "speaking";

  return (
    <motion.div
      className={`relative isolate flex shrink-0 items-center justify-center ${sizeClass[size]}`}
      animate={
        reduceMotion
          ? undefined
          : {
              y: thinking ? [0, -2, 0] : attentive ? [0, -3, 0] : [0, -4, -1, 0],
              rotate: thinking ? [0, -3, 3, 0] : attentive ? [0, -1.5, 1.5, 0] : [0, -2, 2, 0],
              scale: speaking ? [1, 1.05, 0.99, 1] : [1, 1.02, 1]
            }
      }
      transition={{
        duration: thinking ? 1.15 : speaking ? 1.45 : attentive ? 2.1 : 3.6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      }}
      whileTap={{ scale: 0.94 }}
      aria-hidden="true"
    >
      <motion.span
        className="absolute inset-[5%] -z-10 rounded-full bg-[radial-gradient(circle,_rgba(156,140,255,0.25),_rgba(110,202,214,0.13)_48%,_transparent_72%)] blur-md"
        animate={reduceMotion ? undefined : { opacity: attentive ? [0.55, 0.95, 0.6] : [0.38, 0.7, 0.42], scale: [0.92, 1.13, 0.96] }}
        transition={{ duration: attentive ? 1.8 : 3.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <span className="absolute bottom-[5%] left-1/2 -z-10 h-[12%] w-[54%] -translate-x-1/2 rounded-full bg-violet-950/20 blur-[3px]" />

      <motion.span
        className="absolute left-[5%] top-[35%] h-[27%] w-[22%] rounded-[50%_35%_35%_50%] border border-white/70 bg-[linear-gradient(145deg,#f7fbff_8%,#c9c6f5_48%,#8177c5_100%)] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),0_4px_8px_rgba(63,55,112,0.18)]"
        animate={reduceMotion ? undefined : { rotate: attentive ? [-7, -12, -7] : [-5, -10, -5], x: attentive ? [0, -1, 0] : [0, -0.5, 0] }}
        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute right-[5%] top-[35%] h-[27%] w-[22%] rounded-[35%_50%_50%_35%] border border-white/70 bg-[linear-gradient(215deg,#f7fbff_8%,#c9c6f5_48%,#8177c5_100%)] shadow-[inset_-2px_2px_4px_rgba(255,255,255,0.9),0_4px_8px_rgba(63,55,112,0.18)]"
        animate={reduceMotion ? undefined : { rotate: attentive ? [7, 12, 7] : [5, 10, 5], x: attentive ? [0, 1, 0] : [0, 0.5, 0] }}
        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <span className="absolute inset-[14%] rounded-[46%_46%_48%_48%] border border-white/80 bg-[radial-gradient(circle_at_32%_22%,#ffffff_0%,#edf7fb_24%,#d7e6f2_52%,#aaa6da_78%,#6f67aa_100%)] shadow-[inset_7px_7px_12px_rgba(255,255,255,0.95),inset_-8px_-10px_16px_rgba(87,75,147,0.32),0_10px_18px_rgba(74,65,126,0.2)]">
        <span className="absolute left-[19%] top-[12%] h-[25%] w-[34%] rotate-[-16deg] rounded-full bg-white/75 blur-[1px]" />
      </span>

      <motion.span
        className="absolute left-[23%] right-[23%] top-[34%] h-[30%] overflow-hidden rounded-[42%] border border-indigo-200/35 bg-[linear-gradient(160deg,#29304f_0%,#171a31_52%,#38356b_100%)] shadow-[inset_0_4px_7px_rgba(255,255,255,0.12),inset_0_-5px_9px_rgba(4,5,18,0.55),0_4px_9px_rgba(31,28,75,0.32)]"
        animate={reduceMotion ? undefined : { scaleX: attentive ? [1, 1.04, 1] : [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <span className="absolute left-[9%] top-[10%] h-[25%] w-[46%] rotate-[-8deg] rounded-full bg-white/12 blur-[1px]" />
        <motion.span
          className="absolute left-[24%] top-[31%] h-[34%] w-[11%] rounded-full bg-cyan-100 shadow-[0_0_8px_rgba(176,247,255,0.95)]"
          animate={reduceMotion ? undefined : { scaleY: thinking ? [1, 0.35, 1] : [1, 1, 0.15, 1, 1] }}
          transition={{ duration: thinking ? 0.8 : 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute right-[24%] top-[31%] h-[34%] w-[11%] rounded-full bg-cyan-100 shadow-[0_0_8px_rgba(176,247,255,0.95)]"
          animate={reduceMotion ? undefined : { scaleY: thinking ? [1, 0.35, 1] : [1, 1, 0.15, 1, 1] }}
          transition={{ duration: thinking ? 0.8 : 4.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.span>

      <span className="absolute bottom-[7%] left-[29%] h-[13%] w-[15%] rounded-full border border-white/80 bg-[linear-gradient(180deg,#eefbff,#aaa6d9)] shadow-[inset_2px_2px_3px_rgba(255,255,255,0.9),0_3px_5px_rgba(58,50,105,0.18)]" />
      <span className="absolute bottom-[7%] right-[29%] h-[13%] w-[15%] rounded-full border border-white/80 bg-[linear-gradient(180deg,#eefbff,#aaa6d9)] shadow-[inset_2px_2px_3px_rgba(255,255,255,0.9),0_3px_5px_rgba(58,50,105,0.18)]" />

      <motion.span
        className="absolute right-[13%] top-[13%] h-[8%] w-[8%] rounded-full border border-white/80 bg-[radial-gradient(circle_at_32%_28%,#ffffff,#81e3ed_50%,#7765cf_100%)] shadow-[0_0_10px_rgba(119,101,207,0.55)]"
        animate={reduceMotion ? undefined : { y: [0, -3, 0], x: [0, 1.5, 0], scale: attentive ? [1, 1.22, 1] : [0.9, 1.1, 0.9] }}
        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
