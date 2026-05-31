"use client";

import { motion } from "framer-motion";

type AgentSpriteProps = {
  active?: boolean;
  hovered?: boolean;
  size?: "sm" | "md" | "card" | "hero";
};

export function AgentSprite({
  active = false,
  hovered = false,
  size = "md"
}: AgentSpriteProps) {
  const attentive = active || hovered;
  const wrapperClass =
    size === "hero"
      ? "h-32 w-32 md:h-36 md:w-36"
    : size === "card"
        ? "h-[4.75rem] w-[4.75rem]"
      : size === "sm"
        ? "h-11 w-11"
        : "h-12 w-12";
  const svgClass =
    size === "hero"
      ? "h-32 w-32 md:h-36 md:w-36"
    : size === "card"
        ? "h-[4.75rem] w-[4.75rem]"
      : size === "sm"
        ? "h-10 w-10"
        : "h-11 w-11";

  return (
    <motion.div
      className={`relative flex items-center justify-center ${wrapperClass}`}
      animate={{
        x: attentive ? [0, -2.4, 2.2, -1.2, 0] : [0, -4.8, 4.4, -2.2, 0],
        y: attentive ? [0, -2.6, -0.6, -1.6, 0] : [0, -4.2, -1.2, -2.8, 0],
        rotate: attentive ? [0, -2, 2, 0] : [0, -3.2, 3.2, 0],
        scale: attentive ? [1, 1.045, 0.995, 1.02, 1] : [1, 1.03, 0.985, 1.015, 1]
      }}
      transition={{
        duration: attentive ? 2.2 : 3.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(143,224,255,0.34),_rgba(122,215,255,0.08)_54%,_transparent_76%)] blur-xl"
        animate={{
          opacity: attentive ? [0.68, 0.96, 0.72] : [0.44, 0.78, 0.52],
          scale: attentive ? [1, 1.2, 1.04] : [0.94, 1.14, 0.98]
        }}
        transition={{
          duration: attentive ? 1.9 : 3.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />

      <motion.span
        className="absolute h-10 w-10 rounded-full bg-[radial-gradient(circle_at_center,_rgba(160,146,255,0.16),_transparent_70%)] blur-lg"
        animate={{
          rotate: [0, 12, -10, 0],
          scale: attentive ? [0.94, 1.08, 0.98] : [0.9, 1.04, 0.92]
        }}
        transition={{
          duration: 5.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />

      <svg
        viewBox="0 0 64 64"
        className={`relative overflow-visible drop-shadow-[0_18px_32px_rgba(74,59,40,0.18)] ${svgClass}`}
        aria-hidden="true"
      >
        <motion.ellipse
          cx="13"
          cy="34"
          rx="5.2"
          ry="8.4"
          fill="url(#earLeft)"
          animate={{
            x: attentive ? [-0.6, 0.2, -0.3] : [-1.2, 0.8, -0.6],
            rotate: attentive ? -8 : -12,
            scaleY: attentive ? 1.05 : 0.98,
            opacity: attentive ? 0.92 : 0.76
          }}
          transition={{
            duration: attentive ? 1.5 : 2.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "17px 34px" }}
        />
        <motion.ellipse
          cx="51"
          cy="34"
          rx="5.2"
          ry="8.4"
          fill="url(#earRight)"
          animate={{
            x: attentive ? [0.6, -0.2, 0.3] : [1.2, -0.8, 0.6],
            rotate: attentive ? 8 : 12,
            scaleY: attentive ? 1.05 : 0.98,
            opacity: attentive ? 0.92 : 0.76
          }}
          transition={{
            duration: attentive ? 1.5 : 2.8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "47px 34px" }}
        />

        <motion.path
          d="M32 13C20.2 13 12 21.2 12 32C12 42.6 20 51 32 51C44 51 52 42.6 52 32C52 21.2 43.8 13 32 13Z"
          fill="url(#shell)"
          animate={{
            d: attentive
              ? [
                  "M32 13C20.2 13 12 21.2 12 32C12 42.6 20 51 32 51C44 51 52 42.6 52 32C52 21.2 43.8 13 32 13Z",
                  "M32 12.4C19.7 12.4 11.4 20.9 11.4 32.1C11.4 43.2 19.8 51.6 32 51.6C44.2 51.6 52.6 43.2 52.6 32.1C52.6 20.9 44.3 12.4 32 12.4Z",
                  "M32 13C20.2 13 12 21.2 12 32C12 42.6 20 51 32 51C44 51 52 42.6 52 32C52 21.2 43.8 13 32 13Z"
                ]
              : [
                  "M32 13C20.2 13 12 21.2 12 32C12 42.6 20 51 32 51C44 51 52 42.6 52 32C52 21.2 43.8 13 32 13Z",
                  "M32 13.6C20.7 13.6 12.5 21.5 12.5 31.9C12.5 42.2 20.4 50.5 32 50.5C43.6 50.5 51.5 42.2 51.5 31.9C51.5 21.5 43.3 13.6 32 13.6Z",
                  "M32 13C20.2 13 12 21.2 12 32C12 42.6 20 51 32 51C44 51 52 42.6 52 32C52 21.2 43.8 13 32 13Z"
                ]
          }}
          transition={{
            duration: attentive ? 1.8 : 3.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />

        <motion.rect
          x="18"
          y="23"
          width="28"
          height="18"
          rx="9"
          fill="url(#facePanel)"
          animate={{
            width: attentive ? [28, 29.4, 28] : [28, 28.8, 28],
            x: attentive ? [18, 17.3, 18] : [18, 17.6, 18],
            opacity: attentive ? [0.92, 1, 0.95] : [0.84, 0.96, 0.88]
          }}
          transition={{
            duration: attentive ? 1.7 : 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />

        <motion.rect
          x="24"
          y="28"
          width="5.5"
          height="9"
          rx="2.75"
          fill="url(#eyeGlow)"
          animate={{
            y: attentive ? [28, 28.2, 27.9] : [28, 28.4, 28],
            height: attentive ? [9, 8.6, 9.2] : [9, 8.2, 9]
          }}
          transition={{
            duration: attentive ? 1.6 : 2.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
        <motion.rect
          x="34.5"
          y="28"
          width="5.5"
          height="9"
          rx="2.75"
          fill="url(#eyeGlow)"
          animate={{
            y: attentive ? [28, 27.9, 28.2] : [28, 28.4, 28],
            height: attentive ? [9, 9.2, 8.6] : [9, 8.2, 9]
          }}
          transition={{
            duration: attentive ? 1.6 : 2.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />

        <motion.circle
          cx="24"
          cy="49"
          r="1.25"
          fill="rgba(142,244,255,0.82)"
          animate={{
            x: [0, -2.6, 0],
            y: [0, 2.4, 0],
            opacity: attentive ? [0.22, 0.82, 0.28] : [0.12, 0.56, 0.18]
          }}
          transition={{
            duration: 2.3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="42"
          cy="49"
          r="1.1"
          fill="rgba(189,214,255,0.72)"
          animate={{
            x: [0, 2.2, 0],
            y: [0, 3, 0],
            opacity: attentive ? [0.18, 0.68, 0.24] : [0.1, 0.36, 0.14]
          }}
          transition={{
            duration: 2.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.3
          }}
        />

        <motion.circle
          cx="32"
          cy="14"
          r="1"
          fill="rgba(255,255,255,0.88)"
          animate={{
            opacity: attentive ? [0.12, 0.72, 0.16] : [0.08, 0.44, 0.1],
            cy: attentive ? [14, 12.6, 14] : [14, 13.2, 14]
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />

        <defs>
          <linearGradient id="earLeft" x1="8" y1="26" x2="18" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(210,237,255,0.72)" />
            <stop offset="0.52" stopColor="rgba(170,161,255,0.36)" />
            <stop offset="1" stopColor="rgba(170,161,255,0.08)" />
          </linearGradient>
          <linearGradient id="earRight" x1="56" y1="26" x2="46" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(210,237,255,0.72)" />
            <stop offset="0.52" stopColor="rgba(170,161,255,0.36)" />
            <stop offset="1" stopColor="rgba(170,161,255,0.08)" />
          </linearGradient>
          <radialGradient id="shell" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(22 18) rotate(45) scale(40)">
            <stop stopColor="rgba(245,250,255,0.98)" />
            <stop offset="0.44" stopColor="rgba(219,232,255,0.9)" />
            <stop offset="0.72" stopColor="rgba(200,225,255,0.76)" />
            <stop offset="1" stopColor="rgba(170,210,255,0.34)" />
          </radialGradient>
          <linearGradient id="facePanel" x1="18" y1="23" x2="46" y2="41" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(17,19,34,0.96)" />
            <stop offset="0.5" stopColor="rgba(27,30,53,0.98)" />
            <stop offset="1" stopColor="rgba(10,12,24,0.95)" />
          </linearGradient>
          <linearGradient id="eyeGlow" x1="24" y1="28" x2="29.5" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(255,255,255,0.98)" />
            <stop offset="1" stopColor="rgba(224,243,255,0.92)" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
