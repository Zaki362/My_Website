"use client";
/* eslint-disable @next/next/no-img-element -- Preserve original portfolio screenshots and their aspect ratios. */
import type React from "react";
import { useState } from "react";
import { PortfolioToolbar, usePortfolioCopy } from "./portfolio-toolbar";
import "./fitlog-portfolio-page.css";
const views = { "dashboard": { "index": "VIEW 01 / HOME", "title": "打开就知道今天怎么开始", "description": "首页把训练统计、今日建议、最近记录与部位状态放在一起，但最醒目的动作始终只有一个：开始训练。", "image": "/projects/fitlog-portfolio/asset-2.png", "alt": "练一下首页真实界面" }, "start": { "index": "VIEW 02 / START", "title": "按建议开始，也保留自己的计划", "description": "选择训练部位后直接预览动作数量与清单。用户可以接受建议，也可以自由组合，不被预设计划绑住。", "image": "/projects/fitlog-portfolio/asset-3.png", "alt": "练一下开练选择页真实界面" }, "active": { "index": "VIEW 03 / ACTIVE", "title": "组间记录，手指不用多走一步", "description": "重量、组次、难度与备注都在同一条训练上下文里。每个变化只服务于正在进行的动作。", "image": "/projects/fitlog-portfolio/asset-4.png", "alt": "练一下训练中记录页真实界面" }, "history": { "index": "VIEW 04 / HISTORY", "title": "结束后，记录自动成为复盘材料", "description": "按月份与部位查看训练历史，再进入单次训练或动作详情，不需要重新整理一份训练日志。", "image": "/projects/fitlog-portfolio/asset-5.png", "alt": "练一下训练历史页真实界面" } };
export function FitlogPortfolioPage() {
    const { locale, t } = usePortfolioCopy();
    const [viewKey, setViewKey] = useState<keyof typeof views>("dashboard");
    const view = views[viewKey];
    const viewKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const keys = Object.keys(views) as Array<keyof typeof views>;
        const index = keys.indexOf(viewKey);
        const next = event.key === "ArrowRight" ? (index + 1) % keys.length : event.key === "ArrowLeft" ? (index + keys.length - 1) % keys.length : event.key === "Home" ? 0 : event.key === "End" ? keys.length - 1 : -1;
        if (next < 0)
            return;
        event.preventDefault();
        setViewKey(keys[next]);
        event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(".view-tab")[next]?.focus();
    };
    return <div className="fitlog-portfolio" lang={locale === "zh" ? "zh-CN" : "en"}><PortfolioToolbar /><a className="skip-link" href="#main">
    {t("跳到主要内容")}
    </a>
    <div className="page-shell">
    <header className="topbar">
    <a className="brand" href="#top" aria-label={t("练一下产品案例首页")}>
    <img src="/projects/fitlog-portfolio/asset-1.svg" alt="" decoding="async"/>
    <span className="brand-copy">
    {t("练一下")}
    <small>
    {"FITLOG MINIMAL"}
    </small>
    </span>
    </a>
    <nav aria-label={t("页面导航")}>
    <a href="#why">
    {t("项目介绍")}
    </a>
    <a href="#flow">
    {t("使用方式")}
    </a>
    <a href="#inside">
    {t("产品界面")}
    </a>
    <a className="live-link" href="https://fitlog-minimal.vercel.app/" target="_blank" rel="noreferrer">
    {t("打开产品 ↗")}
    </a>
    </nav>
    </header>
    <main id="main">
    <section className="hero" id="top">
    <div className="hero-copy">
    <div className="project-type">
    {"PERSONAL FITNESS TOOL · PWA"}
    </div>
    <h1>
    {t("少一点记录负担，")}
    <span className="action-mark">
    {t("多一次真正开练")}
    </span>
    </h1>
    <p className="hero-lede">
    {t("「练一下」是一款移动端优先的个人健身记录工具。打开、选部位、开始训练——组间快速记下真实完成情况，训练后再复盘。")}
    </p>
    <div className="hero-actions">
    <a className="button primary" href="https://fitlog-minimal.vercel.app/" target="_blank" rel="noreferrer">
    {t("立即体验")}
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6">
    </path>
    </svg>
    </a>
    <a className="button" href="#flow">
    {t("查看使用流程")}
    </a>
    </div>
    </div>
    <div className="hero-stage" aria-label={t("练一下首页真实界面")}>
    <span className="hero-vertical">
    {"FITLOG · LOCAL FIRST · 2026"}
    </span>
    <div className="phone">
    <img src="/projects/fitlog-portfolio/asset-2.png" alt={t("练一下首页，展示训练统计、今日任务和开始训练按钮")} width={390} height={844} decoding="async"/>
    </div>
    <div className="hero-sticker">
    <strong>
    {"01"}
    </strong>
    {t("打开就能开始，不先做一轮配置。")}
    </div>
    </div>
    </section>
    <section className="principles" aria-label={t("产品原则")}>
    <div className="principle">
    <strong>
    {t("默认本地")}
    </strong>
    <span>
    {t("不注册账号也能记录，数据先保存在自己的浏览器里。")}
    </span>
    </div>
    <div className="principle">
    <strong>
    {t("组间够快")}
    </strong>
    <span>
    {t("重量、组数、次数和难度都围绕训练现场设计。")}
    </span>
    </div>
    <div className="principle">
    <strong>
    {t("离线可用")}
    </strong>
    <span>
    {t("可安装为 PWA，网络不稳定时仍能打开核心界面。")}
    </span>
    </div>
    <div className="principle">
    <strong>
    {t("同步可选")}
    </strong>
    <span>
    {t("需要跨设备时，再主动使用同步码开启云端同步。")}
    </span>
    </div>
    </section>
    <section className="section" id="why">
    <div className="section-heading reveal">
    <h2>
    {t("训练已经够累，记录不该更累")}
    </h2>
    <p>
    {t("这个项目来自一个很具体的个人问题：现有健身应用经常把内容、社交和复杂配置放在训练之前，而真正需要被照顾的是组间那几十秒。")}
    </p>
    </div>
    <div className="problem-layout reveal">
    <div className="problem-statement">
    <blockquote>
    {t("它不是教你练什么，而是帮你把正在练的事记清楚。")}
    </blockquote>
    <p>
    {t("面向已有训练习惯、习惯按自己计划开练的人。产品不争夺注意力，不创造社交压力，也不替用户做医学或训练判断。")}
    </p>
    </div>
    <div className="problem-ledger">
    <div className="problem-row">
    <span className="mark">
    {"×"}
    </span>
    <div>
    <strong>
    {t("记录散落")}
    </strong>
    <span>
    {t("备忘录、表格和聊天窗口很难连续复盘。")}
    </span>
    </div>
    </div>
    <div className="problem-row">
    <span className="mark">
    {"×"}
    </span>
    <div>
    <strong>
    {t("操作太重")}
    </strong>
    <span>
    {t("多层表单会打断动作之间的节奏。")}
    </span>
    </div>
    </div>
    <div className="problem-row">
    <span className="mark">
    {"×"}
    </span>
    <div>
    <strong>
    {t("数据不属于自己")}
    </strong>
    <span>
    {t("账号门槛与封闭格式让迁移变得困难。")}
    </span>
    </div>
    </div>
    </div>
    </div>
    </section>
    <section className="section" id="flow">
    <div className="section-heading reveal">
    <h2>
    {t("从想练，到练完，只走三步")}
    </h2>
    <p>
    {t("路径围绕一次真实训练展开。没有信息流，没有连续弹窗，也不要求先建立完整计划。")}
    </p>
    </div>
    <div className="workflow">
    <article className="workflow-step reveal">
    <div className="workflow-copy">
    <h3>
    {t("选部位，一键开练")}
    </h3>
    <p>
    {t("按今日建议开始，或自己组合胸、背、肩、腹、胳膊、腿和有氧。动作清单在进入训练前就能预览。")}
    </p>
    <ul>
    <li>
    {t("今日训练建议")}
    </li>
    <li>
    {t("自由组合部位")}
    </li>
    <li>
    {t("动作清单预览")}
    </li>
    </ul>
    </div>
    <div className="workflow-visual">
    <img src="/projects/fitlog-portfolio/asset-3.png" alt={t("练一下开练页，可选择训练部位并预览动作")} width={390} height={844} decoding="async"/>
    </div>
    </article>
    <article className="workflow-step reveal">
    <div className="workflow-copy">
    <h3>
    {t("组间快速记下真实完成")}
    </h3>
    <p>
    {t("训练中直接调整重量、组数、次数和难度。临时改变计划没有负担，退出前的草稿也可以恢复。")}
    </p>
    <ul>
    <li>
    {t("重量快速增减与精确输入")}
    </li>
    <li>
    {t("完成状态、难度和备注")}
    </li>
    <li>
    {t("草稿恢复，避免误丢记录")}
    </li>
    </ul>
    </div>
    <div className="workflow-visual">
    <img src="/projects/fitlog-portfolio/asset-4.png" alt={t("练一下训练中界面，可调整每个动作的重量、组次与难度")} width={390} height={844} decoding="async"/>
    </div>
    </article>
    <article className="workflow-step reveal">
    <div className="workflow-copy">
    <h3>
    {t("训练后看见自己的节奏")}
    </h3>
    <p>
    {t("按日期、部位和动作回看记录。历史、日历与部位状态共同回答：最近练了什么，多久没练，下一次从哪里继续。")}
    </p>
    <ul>
    <li>
    {t("训练历史与日历")}
    </li>
    <li>
    {t("按部位筛选")}
    </li>
    <li>
    {t("动作详情与训练进步")}
    </li>
    </ul>
    </div>
    <div className="workflow-visual">
    <img src="/projects/fitlog-portfolio/asset-5.png" alt={t("练一下历史记录页，可按月份和训练部位查看训练")} width={390} height={844} decoding="async"/>
    </div>
    </article>
    </div>
    </section>
    <section className="section" id="inside">
    <div className="section-heading reveal">
    <h2>
    {t("四个界面，一条完整闭环")}
    </h2>
    <p>
    {t("点击切换真实产品状态。每个界面都只保留当前阶段真正需要的信息与动作。")}
    </p>
    </div>
    <div className="product-view reveal">
    <div className="view-tabs" role="tablist" aria-label={t("产品界面切换")}>
    <h3>
    {t("产品示意图")}
    </h3>
    <button className="view-tab" id="view-tab-dashboard" type="button" role="tab" aria-label={t("首页与训练状态")} aria-controls="product-view-panel" data-view="dashboard" aria-selected={viewKey === "dashboard"} tabIndex={viewKey === "dashboard" ? 0 : -1} onClick={() => setViewKey("dashboard")} onKeyDown={viewKeyDown}>
    <strong>
    {"01"}
    </strong>
    <span>
    {t("首页 / 训练状态")}
    </span>
    </button>
    <button className="view-tab" id="view-tab-start" type="button" role="tab" aria-label={t("选部位与动作预览")} aria-controls="product-view-panel" data-view="start" aria-selected={viewKey === "start"} tabIndex={viewKey === "start" ? 0 : -1} onClick={() => setViewKey("start")} onKeyDown={viewKeyDown}>
    <strong>
    {"02"}
    </strong>
    <span>
    {t("选部位 / 动作预览")}
    </span>
    </button>
    <button className="view-tab" id="view-tab-active" type="button" role="tab" aria-label={t("训练中组间记录")} aria-controls="product-view-panel" data-view="active" aria-selected={viewKey === "active"} tabIndex={viewKey === "active" ? 0 : -1} onClick={() => setViewKey("active")} onKeyDown={viewKeyDown}>
    <strong>
    {"03"}
    </strong>
    <span>
    {t("训练中 / 组间记录")}
    </span>
    </button>
    <button className="view-tab" id="view-tab-history" type="button" role="tab" aria-label={t("历史记录与复盘")} aria-controls="product-view-panel" data-view="history" aria-selected={viewKey === "history"} tabIndex={viewKey === "history" ? 0 : -1} onClick={() => setViewKey("history")} onKeyDown={viewKeyDown}>
    <strong>
    {"04"}
    </strong>
    <span>
    {t("记录 / 复盘")}
    </span>
    </button>
    </div>
    <div className="view-stage" id="product-view-panel" role="tabpanel" aria-live="polite" aria-labelledby={`view-tab-${viewKey}`}>
    <div className="view-stage-copy">
    <span className="view-index" id="view-index">
    {view.index}
    </span>
    <h3 id="view-title">
    {t(view.title)}
    </h3>
    <p id="view-description">
    {t(view.description)}
    </p>
    </div>
    <div className="view-stage-phone">
    <img id="view-image" width={390} height={844} decoding="async" src={view.image} alt={t(view.alt)}/>
    </div>
    </div>
    </div>
    </section>
    <section className="final-cta" aria-labelledby="final-title">
    <h2 id="final-title">
    {t("今天，先练一下")}
    </h2>
    <p>
    {t("无需注册即可开始体验。数据默认保存在当前浏览器，请在正式使用前了解导出与可选同步方式。")}
    </p>
    <a className="button" href="https://fitlog-minimal.vercel.app/" target="_blank" rel="noreferrer">
    {t("打开练一下 ↗")}
    </a>
    </section>
    </main>
    <footer>
    <span>
    {t("练一下 / FitLog Minimal · 独立产品案例页")}
    </span>
    <span>
    {"Mobile-first · Local-first · Installable PWA"}
    </span>
    </footer>
    </div>
    </div>;
}
