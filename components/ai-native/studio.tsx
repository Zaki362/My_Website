"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Component, useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { CircleHelp, House, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { AgentDialog } from "@/components/agent/AgentDialog";
import { ResumeRequestDialog } from "@/components/resume-request-dialog";
import RoomContent from "./room-content";
import { useStudioLighting } from "./use-studio-lighting";
import styles from "./studio.module.css";

const RoomScene = dynamic(() => import("./room-scene"), { ssr: false });
const zones = [
  { id: "about", zh: "关于我", en: "About me", object: ["工作中的我", "Me at work"] },
  { id: "education", zh: "教育", en: "Education", object: ["书架 · 教育", "The bookshelf · education"] },
  { id: "experience", zh: "工作", en: "Work", object: ["工作墙", "The work board"] },
  { id: "projects", zh: "项目", en: "Projects", object: ["电脑 · Coding 项目", "The computer · coding projects"] },
  { id: "research", zh: "科研", en: "Research", object: ["书架 · 科研", "The bookshelf · research"] },
  { id: "life", zh: "生活", en: "Life", object: ["窗外的世界", "The world outside"] },
  { id: "contact", zh: "联系", en: "Contact", object: ["桌上的电话", "The desk phone"] }
] as const;
const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const readMotionPreference = () => window.matchMedia(motionQuery).matches;
const serverMotionPreference = () => true;

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function Studio() {
  const router = useRouter();
  const { locale, toggleLocale } = useLanguage();
  const zh = locale === "zh";
  const reduceMotion = useSyncExternalStore(subscribeToMotionPreference, readMotionPreference, serverMotionPreference);
  const { night, toggleNight: onToggleNight } = useStudioLighting();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [help, setHelp] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const panelReturnFocus = useRef<HTMLElement | null>(null);
  const agentReturnFocus = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLElement | null>(null);
  const onReady = useCallback(() => setReady(true), []);
  const onError = useCallback(() => setFailed(true), []);
  const onHome = useCallback(() => router.push("/"), [router]);

  const selectZone = useCallback((id: string) => {
    if (!zones.some(zone => zone.id === id)) return;
    if (document.activeElement instanceof HTMLElement && !document.activeElement.closest("[data-studio-content]")) {
      panelReturnFocus.current = document.activeElement;
    }
    setSelected(id);
    setHelp(false);
  }, []);

  const closePanel = useCallback(() => {
    setSelected(null);
    requestAnimationFrame(() => {
      const target = panelReturnFocus.current;
      if (target?.isConnected && target !== document.body) target.focus();
      else document.querySelector<HTMLElement>('[data-room-hotspot="projects"]')?.focus();
    });
  }, []);

  const openAgent = useCallback(() => {
    agentReturnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setAgentOpen(true);
    setHelp(false);
  }, []);

  const closeAgent = useCallback(() => {
    setAgentOpen(false);
    requestAnimationFrame(() => {
      if (agentReturnFocus.current?.isConnected && agentReturnFocus.current !== document.body) agentReturnFocus.current.focus();
      else document.querySelector<HTMLElement>('[data-room-hotspot="assistant"]')?.focus();
    });
  }, []);

  useEffect(() => {
    if (panelRef.current) panelRef.current.scrollTop = 0;
  }, [selected]);

  useEffect(() => {
    if (ready || failed) return;
    const timer = window.setTimeout(() => setFailed(true), 20000);
    return () => clearTimeout(timer);
  }, [ready, failed, sceneKey]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (resumeOpen) setResumeOpen(false);
      else if (agentOpen) closeAgent();
      else if (help) setHelp(false);
      else if (selected) closePanel();
    };
    const onResume = () => { setAgentOpen(false); setResumeOpen(true); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resume-request:open", onResume);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resume-request:open", onResume);
    };
  }, [agentOpen, closeAgent, closePanel, help, resumeOpen, selected]);

  const activeZone = zones.find(zone => zone.id === hovered);
  const hoverHint = hovered === "assistant" ? (zh ? "我的 AI 分身 · 点击聊聊" : "My AI companion · click to chat")
    : hovered === "light" ? (zh ? "本地时间 08:00–20:00 为白天 · 点击灯具临时切换" : "Daylight 08:00–20:00 local time · click to switch temporarily")
    : hovered === "home" ? (zh ? "返回经典首页" : "Return to classic home")
    : activeZone ? activeZone.object[zh ? 0 : 1] : "";

  return (
    <main className={styles.studio} data-night={night} data-ready={ready} data-reduced-motion={reduceMotion} lang={zh ? "zh-CN" : "en"}>
      <h1 className={styles.srOnly}>{zh ? "欢迎走进我的数字世界" : "Welcome to my digital world"}</h1>
      <div className={styles.scene} aria-label={zh ? "可交互的三维工作室" : "Interactive 3D studio"}>
        {!failed && <SceneBoundary key={sceneKey} onError={onError}><RoomScene night={night} paused={reduceMotion || agentOpen} selected={selected} focusTarget={selected} onSelect={selectZone} onHover={setHovered} onReady={onReady} onError={onError} onAsk={openAgent} assistantOpen={agentOpen} onHome={onHome} onToggleNight={onToggleNight} locale={locale} /></SceneBoundary>}
      </div>
      {!ready && !failed && <div className={styles.loading} role="status"><House size={26} /><strong>{zh ? "推门，进入工作室。" : "Step inside the studio."}</strong><span>{zh ? "正在打开房间" : "Opening the room"}</span></div>}
      {failed && <div className={styles.fallback} role="status"><House size={30} /><h2>{zh ? "换一种方式，继续探索。" : "Another way to explore."}</h2><p>{zh ? "暂时无法显示 3D 房间。你仍然可以打开所有内容，或重新进入房间。" : "The 3D room is unavailable. Every section is still here, or you can try the room again."}</p><div className={styles.fallbackNav}>{zones.map(zone => <button type="button" key={zone.id} onClick={() => selectZone(zone.id)}>{zh ? zone.zh : zone.en}</button>)}</div><button type="button" className={styles.retry} onClick={() => { setFailed(false); setReady(false); setSceneKey(key => key + 1); }}>{zh ? "重新进入房间" : "Re-enter the room"}</button><Link href="/">{zh ? "返回经典首页" : "Classic home"}</Link></div>}
      {selected && <aside ref={panelRef} className={styles.content} data-studio-content><RoomContent section={selected} onClose={closePanel} onAsk={openAgent} /></aside>}
      {!selected && !agentOpen && <div className={styles.cornerTools}>
        <button type="button" onClick={toggleLocale} aria-label={zh ? "Switch to English" : "切换为中文"}>{zh ? "EN" : "中文"}</button>
        <button type="button" onClick={() => setHelp(value => !value)} aria-label={zh ? "查看操作说明" : "How to explore"} aria-expanded={help}><CircleHelp size={16} /></button>
      </div>}
      {!selected && !agentOpen && <p className={styles.hint} aria-live="polite">{hoverHint || (zh ? "轻拖看看房间 · 点击物品探索" : "Look around. Every object has a story.")}</p>}
      {help && <div className={styles.help}><button type="button" onClick={() => setHelp(false)} aria-label={zh ? "关闭操作说明" : "Close instructions"}><X size={16} /></button><strong>{zh ? "就像在朋友的房间。" : "Make yourself at home."}</strong><p>{zh ? "点人物认识我，点电脑看项目，点书架看教育与科研，点窗户看生活。每天本地时间 08:00–20:00 是白天，点灯可临时切换，下一次早晚交替恢复自动。时钟显示当地实时时间，墙上标牌返回经典首页。" : "Meet me by clicking the person. Explore projects on the computer, studies on the shelves, and life through the window. Daylight follows local time, 08:00–20:00. Tap the lamp for a temporary change. The clock shows your local time; the wall sign returns to the classic home."}</p><p>{zh ? "Tab 选择物品 · Enter 打开 · Esc 返回" : "Tab to choose · Enter to open · Esc to return"}</p></div>}
      <AgentDialog appearance="studio" night={night} open={agentOpen} onClose={closeAgent} onMinimize={closeAgent} />
      <ResumeRequestDialog open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}
