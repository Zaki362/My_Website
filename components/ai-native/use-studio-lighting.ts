"use client";

import { useCallback, useEffect, useState } from "react";
import { studioLightingAt } from "@/lib/studio-lighting";

type LightingOverride = { night: boolean; until: number } | null;

export function useStudioLighting() {
  const [scheduledNight, setScheduledNight] = useState(false);
  const [override, setOverride] = useState<LightingOverride>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const syncClock = () => {
      clearTimeout(timer);
      const now = Date.now();
      const next = studioLightingAt(new Date(now));
      setScheduledNight(next.night);
      setOverride(current => current && current.until > now ? current : null);
      // Recheck clock adjustments, while also scheduling the exact 08:00 / 20:00 boundary.
      if (!document.hidden) timer = setTimeout(syncClock, Math.max(20, Math.min(next.nextChangeAt - now, 60000)));
    };
    syncClock();
    document.addEventListener("visibilitychange", syncClock);
    window.addEventListener("focus", syncClock);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", syncClock);
      window.removeEventListener("focus", syncClock);
    };
  }, []);

  const toggleNight = useCallback(() => {
    const now = Date.now();
    const scheduled = studioLightingAt(new Date(now));
    setScheduledNight(scheduled.night);
    setOverride(current => ({
      night: !(current && current.until > now ? current.night : scheduled.night),
      until: scheduled.nextChangeAt
    }));
  }, []);

  return { night: override?.night ?? scheduledNight, toggleNight };
}
