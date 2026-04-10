"use client";

import { AnimatePresence, motion } from "framer-motion";

type AgentPromptBubbleProps = {
  text: string;
  visible: boolean;
  highlighted?: boolean;
  subdued?: boolean;
};

export function AgentPromptBubble({
  text,
  visible,
  highlighted = false,
  subdued = false
}: AgentPromptBubbleProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{
            opacity: highlighted ? 0.94 : subdued ? 0.42 : 0.72,
            y: [0, -1.4, 0],
            scale: highlighted ? 1 : 0.995
          }}
          exit={{ opacity: 0, y: 4, scale: 0.96 }}
          transition={{
            opacity: { duration: 0.45, ease: "easeOut" },
            y: {
              duration: 3.1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            },
            scale: {
              duration: 3.1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }
          }}
          className="pointer-events-none absolute -top-3 left-1/2 hidden -translate-x-[28%] md:block"
        >
          <div className="relative whitespace-nowrap rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(14,20,36,0.74),rgba(10,15,28,0.5))] px-3.5 py-1.5 text-[11px] tracking-[0.14em] text-slate-200/88 shadow-[0_10px_30px_rgba(4,9,22,0.26)] backdrop-blur-xl">
            <span className="relative z-10">{text}</span>
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_25%_15%,rgba(122,215,255,0.12),transparent_42%),radial-gradient(circle_at_80%_90%,rgba(139,144,255,0.09),transparent_36%)]" />
            <span className="absolute -bottom-1.5 left-[28%] h-3 w-3 -translate-x-1/2 rotate-45 rounded-[3px] border-r border-b border-white/8 bg-[rgba(11,16,30,0.62)]" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
