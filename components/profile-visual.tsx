"use client";

import Image from "next/image";
import { useState } from "react";

type ProfileVisualProps = {
  src: string;
  alt: string;
  fallbackText: string;
};

export function ProfileVisual({ src, alt, fallbackText }: ProfileVisualProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="panel interactive-card relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2rem] p-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,215,255,0.16),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(140,140,255,0.14),_transparent_32%)]" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/5 font-display text-4xl text-white/92">
          {fallbackText}
        </div>
      </div>
    );
  }

  return (
    <div className="panel interactive-card relative aspect-[4/5] overflow-hidden rounded-[2rem]">
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-transparent to-sky-200/8" />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 420px"
        onError={() => setFailed(true)}
        priority
      />
      <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
    </div>
  );
}
