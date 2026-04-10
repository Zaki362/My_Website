"use client";

import { useEffect, useState } from "react";
import { AgentDialog } from "@/components/agent/AgentDialog";
import { AgentPromptBubble } from "@/components/agent/AgentPromptBubble";
import { AgentSprite } from "@/components/agent/AgentSprite";

const AGENT_SEEN_KEY = "guohua-agent-opened";

export const agentPromptCandidates = [
  "Ask about my work",
  "Trace what I build",
  "Explore the path",
  "Ask about my journey",
  "Read the signal",
  "See what I build",
  "Ask inside the profile",
  "Follow the work"
] as const;

const DEFAULT_PROMPT = "Explore my journey";

export function AgentLauncher() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const seen = window.localStorage.getItem(AGENT_SEEN_KEY) === "true";
    setHasOpenedBefore(seen);

    const delay = window.setTimeout(() => {
      setShowPrompt(true);
    }, seen ? 1800 : 1400);

    return () => window.clearTimeout(delay);
  }, []);

  function handleOpen() {
    setOpen(true);
    setHasOpenedBefore(true);
    setShowPrompt(true);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(AGENT_SEEN_KEY, "true");
    }
  }

  return (
    <>
      <div
        className="relative flex h-14 items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AgentPromptBubble
          text={DEFAULT_PROMPT}
          visible={showPrompt}
          subdued={hasOpenedBefore && !hovered && !open}
          highlighted={hovered || open}
        />
        <button
          type="button"
          onClick={handleOpen}
          className="group relative inline-flex h-12 w-12 items-center justify-center rounded-full"
          aria-label="打开郑国华个人资料助手"
        >
          <AgentSprite active={open} hovered={hovered} />
        </button>
      </div>

      <AgentDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
