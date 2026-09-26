"use client";
/* eslint-disable @next/next/no-img-element -- Preserve original portfolio screenshots and their aspect ratios. */
import type React from "react";
import { useState, useRef } from "react";
import { usePortfolioCopy } from "./portfolio-toolbar";
import "./scenecart-portfolio-page.css";
export function ScenecartPortfolioPage() {
    const { locale, t } = usePortfolioCopy();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [chapter, setChapter] = useState(0);
    const seek = (time: number) => {
        const video = videoRef.current;
        if (!video)
            return;
        video.currentTime = time;
        setChapter(time);
        void video.play().catch(() => { });
    };
    const chapterKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const times = [0, 16, 46];
        const index = times.indexOf(Number(event.currentTarget.dataset.time));
        const next = event.key === "ArrowRight" ? (index + 1) % 3 : event.key === "ArrowLeft" ? (index + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : -1;
        if (next < 0)
            return;
        event.preventDefault();
        seek(times[next]);
        event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
    };
    return <div className="scenecart-portfolio" lang={locale === "zh" ? "zh-CN" : "en"}><a className="skip-link" href="#main">
    {t("跳到主要内容")}
    </a>
    <nav className="site-nav" aria-label={t("页面导航")}>
    <div className="nav-inner">
    <a className="brand" href="#top" aria-label={t("场景购首页")}>
    <span className="brand-mark" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
    <path d="M6.5 8.5h11l-1 11h-9z">
    </path>
    <path d="M9 8.5V6.7a3 3 0 0 1 6 0v1.8">
    </path>
    <path d="M9.6 13.2h4.8">
    </path>
    </svg>
    </span>
    <span>
    {t("场景购")}
    <small>
    {t("SceneCart AI · 场景化购物 Agent")}
    </small>
    </span>
    </a>
    <div className="nav-links">
    <a href="#advantage">
    {t("产品优势")}
    </a>
    <a href="#workflow">
    {t("工作流程")}
    </a>
    <a className="button button-primary" href="https://scenecart-public-demo.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label={t("体验场景购 Demo（新窗口）")}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="m9 18 6-6-6-6">
    </path>
    </svg>
    <span>
    {t("体验 Demo")}
    </span>
    </a>
    </div>
    </div>
    </nav>
    <main id="main">
    <section className="hero" id="top">
    <div className="hero-copy">
    <h1>
    {t("把一句需求，变成")}
    <span>
    {t("买得明白")}
    </span>
    {t("的方案")}
    </h1>
    <p>
    {t("场景购不是另一个商品搜索框。它先理解你正在完成什么生活任务，再拆分清单、安排优先级、分配预算，并把候选商品组织成一套可以继续调整的购物方案。")}
    </p>
    <div className="hero-actions">
    <a className="button button-primary" href="https://scenecart-public-demo.vercel.app/" target="_blank" rel="noopener noreferrer">
    {t("现在体验公开 Demo")}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6">
    </path>
    </svg>
    </a>
    <a className="button button-secondary" href="#workflow">
    {t("看它如何工作")}
    </a>
    </div>
    <div className="hero-notes" aria-label={t("体验说明")}>
    <span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m5 12 4 4L19 6">
    </path>
    </svg>
    {t("公开 Demo 无需登录")}
    </span>
    <span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m5 12 4 4L19 6">
    </path>
    </svg>
    {t("新车、露营、房间、宿舍、搬家")}
    </span>
    <span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m5 12 4 4L19 6">
    </path>
    </svg>
    {t("用户始终保留最终判断")}
    </span>
    </div>
    </div>
    <div className="hero-visual" aria-label={t("场景购产品首页示意图")}>
    <div className="browser-frame">
    <div className="browser-bar" aria-hidden="true">
    <i>
    </i>
    <i>
    </i>
    <i>
    </i>
    <span className="browser-address">
    {"scenecart-public-demo.vercel.app"}
    </span>
    </div>
    <img src="/projects/scenecart-portfolio/asset-2.png" width="1280" height="633" alt={t("场景购公开 Demo 首页，用户可以输入购物场景、预算和偏好")} decoding="async"/>
    </div>
    </div>
    </section>
    <section className="problem" id="advantage">
    <div className="problem-inner">
    <div>
    <h2>
    {t("商品不难找，难的是先想清楚")}
    <span>
    {t("该买什么")}
    </span>
    </h2>
    <p className="problem-intro">
    {t("传统电商适合承接明确单品。面对新车首购、露营准备或搬家置办，用户真正需要的是一套围绕同一个任务组织起来的判断。")}
    </p>
    </div>
    <div className="advantage-list" aria-label={t("场景购核心优势")}>
    <div className="advantage">
    <strong>
    {t("理解完整场景")}
    </strong>
    <p>
    {t("把预算、偏好、已有物品与排除项放在一起理解，不让单个关键词割裂真实需求。")}
    </p>
    </div>
    <div className="advantage">
    <strong>
    {t("组织优先级")}
    </strong>
    <p>
    {t("先拆模块、再分预算；必要项优先，体验升级项可以延后，避免买漏与冲动购买。")}
    </p>
    </div>
    <div className="advantage">
    <strong>
    {t("解释每个选择")}
    </strong>
    <p>
    {t("推荐不只给商品，还保留适配理由、候选比较与调整入口，让用户知道为什么买。")}
    </p>
    </div>
    </div>
    </div>
    </section>
    <section className="workflow" id="workflow">
    <div className="section-heading">
    <h2>
    {t("AI 跑完复杂度，用户只在关键节点确认")}
    </h2>
    <p>
    {t("从需求到购物清单，所有阶段围绕同一个 Session 连续推进；页面关闭或短暂断线后，也能继续原来的任务。")}
    </p>
    </div>
    <div className="route" aria-label={t("场景购四步工作流程")}>
    <article className="route-step">
    <span>
    {"01"}
    </span>
    <h3>
    {t("说清场景")}
    </h3>
    <p>
    {t("描述任务、预算、偏好和不想买的内容。")}
    </p>
    <small>
    {t("用户输入")}
    </small>
    </article>
    <article className="route-step">
    <span>
    {"02"}
    </span>
    <h3>
    {t("确认规划")}
    </h3>
    <p>
    {t("Agent 拆解模块、优先级与预算，用户可以直接修改。")}
    </p>
    <small>
    {t("人机协作")}
    </small>
    </article>
    <article className="route-step">
    <span>
    {"03"}
    </span>
    <h3>
    {t("比较推荐")}
    </h3>
    <p>
    {t("按模块查看主推荐、证据与备选，并继续补搜。")}
    </p>
    <small>
    {t("Agent 组织")}
    </small>
    </article>
    <article className="route-step">
    <span>
    {"04"}
    </span>
    <h3>
    {t("审核清单")}
    </h3>
    <p>
    {t("用户逐件确认是否加入购物车；系统不会自动下单或支付。")}
    </p>
    <small>
    {t("用户决定")}
    </small>
    </article>
    </div>
    <div className="demo-board" aria-label={t("场景购真实 Demo 视频")}>
    <div className="demo-board-top">
    <nav className="video-chapters" aria-label={t("演示视频章节")}>
    <button className="video-chapter" type="button" data-time="0" aria-pressed={chapter === 0} tabIndex={chapter === 0 ? 0 : -1} onClick={() => seek(0)} onKeyDown={chapterKeyDown}>
    <span>
    {t("输入需求")}
    </span>
    <small>
    {"00:00"}
    </small>
    </button>
    <button className="video-chapter" type="button" data-time="16" aria-pressed={chapter === 16} tabIndex={chapter === 16 ? 0 : -1} onClick={() => seek(16)} onKeyDown={chapterKeyDown}>
    <span>
    {t("确认规划")}
    </span>
    <small>
    {"00:16"}
    </small>
    </button>
    <button className="video-chapter" type="button" data-time="46" aria-pressed={chapter === 46} tabIndex={chapter === 46 ? 0 : -1} onClick={() => seek(46)} onKeyDown={chapterKeyDown}>
    <span>
    {t("比较商品")}
    </span>
    <small>
    {"00:46"}
    </small>
    </button>
    </nav>
    <p className="screen-caption">
    {t("真实公开 Demo 录屏 · 点击章节跳转 · 可拖动进度条")}
    </p>
    </div>
    <div className="video-stage">
    <video className="demo-video" id="scenecart-demo-video" controls preload="metadata" playsInline poster="/projects/scenecart-portfolio/asset-2.png" aria-label={t("场景购公开 Demo 完整流程录屏")} ref={videoRef} onTimeUpdate={() => setChapter(videoRef.current && videoRef.current.currentTime >= 46 ? 46 : videoRef.current && videoRef.current.currentTime >= 16 ? 16 : 0)}>
    <source src="/projects/scenecart-portfolio/asset-3.mp4" type="video/mp4"/>
    {t("你的浏览器暂不支持 HTML5 视频。请点击页面中的“体验 Demo”直接访问产品。")}
    </video>
    </div>
    </div>
    <div className="tech-note">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M9.5 3.5h5v3h-5zM5 9h14v10H5z">
    </path>
    <path d="M8 13h.01M12 13h.01M16 13h.01M9 16h6M3 12H1M23 12h-2">
    </path>
    </svg>
    <p>
    <strong>
    {t("技术背书：")}
    </strong>
    {t("DeepSeek Agent 负责场景结构化、规划与复盘；云端任务队列保存执行状态；正式产品由用户电脑上的本地执行器连接淘宝工具。真实加购需要明确确认，交易边界止于购物车。")}
    </p>
    </div>
    </section>
    <section className="cta" id="demo">
    <div className="cta-copy">
    <h2>
    {t("给它一句真实需求，看它如何整理成方案")}
    </h2>
    <p>
    {t("公开 Demo 使用冻结样本还原完整流程，无需登录，也不会连接你的淘宝账号。商品和价格仅用于流程体验，不代表实时信息。")}
    </p>
    </div>
    <div className="cta-action">
    <a className="button button-primary" href="https://scenecart-public-demo.vercel.app/" target="_blank" rel="noopener noreferrer">
    {t("打开场景购 Demo")}
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6">
    </path>
    </svg>
    </a>
    <small>
    {t("公开冻结体验 · 不连接真实账户")}
    </small>
    </div>
    </section>
    </main>
    <footer>
    <p>
    {t("SceneCart AI · 场景化购物 Agent · Portfolio Case")}
    </p>
    <a href="https://scenecart-public-demo.vercel.app/" target="_blank" rel="noopener noreferrer">
    {"scenecart-public-demo.vercel.app"}
    </a>
    </footer>
    </div>;
}
