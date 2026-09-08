"use client";

import { useEffect, useState } from "react";
import styles from "./npc-dialogue.module.css";

const dialogue = {
  zh: [
    "你好呀，欢迎来做客。\n关于国华，直接问我就好。",
    "在找有意思的 AI 项目？\n点点电脑，或来找我聊聊。",
    "书架上是学习和科研，\n窗外还有工作之外的故事。",
    "我就在这里。\n想了解什么，点我聊聊吧。"
  ],
  en: [
    "Hey, welcome to the studio.\nAsk me about Guohua!",
    "Curious about the projects?\nTry the computer, or ask me.",
    "The shelves hold his studies.\nThe window opens onto life.",
    "I'll be right here.\nCome over and say hello."
  ]
};

type NpcDialogueProps = {
  locale: "zh" | "en";
  night: boolean;
  paused: boolean;
  hidden?: boolean;
  onSpeak: () => void;
};

export default function NpcDialogue({ locale, night, paused, hidden, onSpeak }: NpcDialogueProps) {
  const [line, setLine] = useState(0);
  const [letters, setLetters] = useState(0);
  const [pageHidden, setPageHidden] = useState(false);
  const [reading, setReading] = useState(false);
  const message = dialogue[locale][line];
  const stopped = paused || hidden || pageHidden;

  useEffect(() => {
    const onVisibility = () => setPageHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (stopped) return;
    setLetters(0);
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setLetters(count);
      if (count >= message.length) window.clearInterval(timer);
    }, locale === "zh" ? 65 : 33);
    return () => window.clearInterval(timer);
  }, [locale, message, stopped]);

  useEffect(() => {
    if (stopped || reading) return;
    const timer = window.setTimeout(() => setLine(value => (value + 1) % dialogue[locale].length), 12000);
    return () => window.clearTimeout(timer);
  }, [line, locale, stopped, reading]);

  return (
    <button
      type="button"
      className={styles.dialogue}
      data-npc-dialogue
      data-night={night}
      data-paused={stopped}
      hidden={hidden}
      aria-label={locale === "zh" ? "和国华的 AI 分身对话" : "Chat with Guohua's AI companion"}
      onClick={onSpeak}
      onMouseEnter={() => setReading(true)}
      onMouseLeave={() => setReading(false)}
      onFocus={() => setReading(true)}
      onBlur={() => setReading(false)}
    >
      <span className={styles.name} aria-hidden="true"><span className={styles.face}><i /><i /></span>{locale === "zh" ? "国华的 AI 分身" : "Guohua's AI companion"}</span>
      <span className={styles.words} aria-hidden="true">{stopped ? message : message.slice(0, letters)}<span className={styles.caret} /></span>
      <span className={styles.prompt} aria-hidden="true">{locale === "zh" ? "点击对话" : "Click to talk"}<span className={styles.arrow} /></span>
    </button>
  );
}
