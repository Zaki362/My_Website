"use client";
/* eslint-disable @next/next/no-img-element -- Preserve original portfolio screenshots and their aspect ratios. */
import type React from "react";
import { useState, useRef, useEffect } from "react";
import { PortfolioToolbar, usePortfolioCopy } from "./portfolio-toolbar";
import "./quota-portfolio-page.css";
export function QuotaPortfolioPage() {
    const { locale, t } = usePortfolioCopy();
    const progressRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);
    const [copyStatus, setCopyStatus] = useState("安装命令已准备好");
    const copyCommands = async () => {
        try {
            await navigator.clipboard.writeText("git clone https://github.com/Zaki362/codex-widget.git\ncd codex-widget\n./scripts/install-local.command");
            setCopied(true);
            setCopyStatus("已复制到剪贴板");
        }
        catch {
            setCopyStatus("复制未成功，请手动选择上方命令");
        }
    };
    useEffect(() => {
        const update = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            if (progressRef.current)
                progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);
    return <div className="quota-portfolio" lang={locale === "zh" ? "zh-CN" : "en"}><PortfolioToolbar /><div className="scroll-progress" aria-hidden="true" ref={progressRef}>
    </div>
    <header className="site-nav">
    <div className="nav-inner">
    <a className="brand" href="#top" aria-label={t("Codex Quota 回到顶部")}>
    <span className="brand-mark" aria-hidden="true">
    </span>
    <span>
    {"Codex Quota"}
    </span>
    </a>
    <nav className="nav-links" aria-label={t("页面导航")}>
    <a href="#evidence">
    {t("项目成果")}
    </a>
    <a href="#product">
    {t("产品")}
    </a>
    <a href="#usage">
    {t("使用方式")}
    </a>
    </nav>
    <a className="nav-github" href="https://github.com/Zaki362/codex-widget" target="_blank" rel="noreferrer">
    {"\n          GitHub\n          "}
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M7 7h10v10">
    </path>
    </svg>
    </a>
    </div>
    </header>
    <main id="top">
    <section className="hero" aria-labelledby="hero-title">
    <div className="hero-copy">
    <h1 id="hero-title">
    <span className="hero-line">
    {t("别再打开设置")}
    </span>
    <span className="hero-line">
    {t("桌面组件直接看")}
    </span>
    <span className="hero-line accent">
    {t("还剩多少")}
    </span>
    </h1>
    <p>
    {t("Codex Quota 把五小时额度、周额度、重置时间和近五天消耗趋势放到 macOS 桌面。工作正投入时，扫一眼就能决定继续推进，还是安排下一段任务。")}
    </p>
    <div className="hero-actions">
    <a className="button button-primary" href="https://github.com/Zaki362/codex-widget" target="_blank" rel="noreferrer">
    {t("前往 GitHub 安装")}
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M7 7h10v10">
    </path>
    </svg>
    </a>
    <a className="button button-secondary" href="#usage">
    {t("查看使用方式")}
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="m6 9 6 6 6-6">
    </path>
    </svg>
    </a>
    </div>
    <div className="hero-proof" aria-label={t("产品信息")}>
    <span>
    <i aria-hidden="true">
    </i>
    {"macOS 14+"}
    </span>
    <span>
    <i aria-hidden="true">
    </i>
    {t("菜单栏 App + 桌面 Widget")}
    </span>
    <span>
    <i aria-hidden="true">
    </i>
    {t("本地优先")}
    </span>
    <span>
    <i aria-hidden="true">
    </i>
    {t("开源")}
    </span>
    </div>
    </div>
    <div className="desktop-stage" aria-label={t("Codex Quota 中号和小号组件示意")}>
    <div className="stage-menu" aria-hidden="true">
    <div className="stage-menu-left">
    <span className="stage-dot">
    </span>
    <span>
    {"Finder"}
    </span>
    <span>
    {"File"}
    </span>
    <span>
    {"View"}
    </span>
    </div>
    <div className="stage-menu-right">
    <span>
    {"Wed Aug 30"}
    </span>
    <span>
    {"10:09"}
    </span>
    </div>
    </div>
    <div className="quota-widget widget-medium">
    <div className="medium-body">
    <div className="medium-limits">
    <div className="widget-head">
    <div className="widget-name">
    <span className="status-dot">
    </span>
    {"Codex"}
    </div>
    <div className="widget-time">
    {"10:08"}
    </div>
    </div>
    <div className="quota-row">
    <div className="quota-line">
    <span className="quota-label">
    {t("5 小时")}
    </span>
    <span className="quota-value">
    {"72%"}
    </span>
    </div>
    <div className="quota-progress-line">
    <div className="track">
    <span style={{ "width": "72%" } as React.CSSProperties}>
    </span>
    </div>
    <span className="reset-label">
    {"1h 24m"}
    </span>
    </div>
    </div>
    <div className="quota-row">
    <div className="quota-line">
    <span className="quota-label">
    {t("周限额")}
    </span>
    <span className="quota-value">
    {"58%"}
    </span>
    </div>
    <div className="quota-progress-line">
    <div className="track">
    <span style={{ "width": "58%" } as React.CSSProperties}>
    </span>
    </div>
    <span className="reset-label">
    {"3d 18h"}
    </span>
    </div>
    </div>
    </div>
    <div className="medium-trend">
    <div className="trend-head">
    <span className="trend-title">
    {t("近 5 天趋势")}
    </span>
    <span className="trend-average">
    {t("日均 42.6M")}
    </span>
    </div>
    <div className="trend" aria-label={t("近五天 token 消耗趋势")}>
    <svg viewBox="0 0 220 120" role="img" aria-hidden="true">
    <path d="M2 104H218M2 58H218M2 12H218" stroke="#d4ddd5" strokeWidth="1">
    </path>
    <path d="M5 99C34 94 47 105 69 84S106 74 124 54 151 20 171 28s21 55 44 58" stroke="#147a4c" strokeWidth="4" fill="none" strokeLinecap="round">
    </path>
    <circle cx="5" cy="99" r="3" fill="#147a4c">
    </circle>
    <circle cx="69" cy="84" r="3" fill="#147a4c">
    </circle>
    <circle cx="124" cy="54" r="3" fill="#147a4c">
    </circle>
    <circle cx="171" cy="28" r="3" fill="#147a4c">
    </circle>
    <circle cx="215" cy="86" r="3" fill="#147a4c">
    </circle>
    </svg>
    </div>
    </div>
    </div>
    </div>
    <div className="quota-widget widget-small">
    <div className="widget-head">
    <div className="widget-name">
    <span className="status-dot">
    </span>
    {"Codex"}
    </div>
    <div className="widget-time">
    {"10:08"}
    </div>
    </div>
    <div className="quota-row">
    <div className="quota-line">
    <span className="quota-label">
    {t("5 小时")}
    </span>
    <span className="quota-value">
    {"72%"}
    </span>
    </div>
    <div className="quota-progress-line">
    <div className="track">
    <span style={{ "width": "72%" } as React.CSSProperties}>
    </span>
    </div>
    <span className="reset-label">
    {"1h 24m"}
    </span>
    </div>
    </div>
    <div className="quota-row">
    <div className="quota-line">
    <span className="quota-label">
    {t("周限额")}
    </span>
    <span className="quota-value">
    {"58%"}
    </span>
    </div>
    <div className="quota-progress-line">
    <div className="track">
    <span style={{ "width": "58%" } as React.CSSProperties}>
    </span>
    </div>
    <span className="reset-label">
    {"3d 18h"}
    </span>
    </div>
    </div>
    </div>
    <p className="stage-caption">
    {t("像系统状态一样自然地留在桌面，而不是打断工作的另一块仪表盘。")}
    </p>
    </div>
    </section>
    <section className="section" aria-labelledby="why-title">
    <div className="section-inner">
    <h2 className="section-heading" id="why-title">
    {t("额度不是设置项。")}
    <br />
    {t("它是工作节奏的一部分。")}
    </h2>
    <p className="section-lead">
    {t("当 Codex 成为高频协作工具，隐藏在设置页里的额度会直接影响任务怎么拆、什么时候继续、何时切换工作。Codex Quota 把这段判断压缩成一次自然的桌面扫视。")}
    </p>
    <div className="problem-layout">
    <aside className="problem-note">
    <strong>
    {t("为 macOS 上的 Codex 重度用户设计。")}
    </strong>
    <p>
    {t("少一次上下文切换，多保留一点专注。它不替你管理工作，只把真正影响工作的信息放到眼前。")}
    </p>
    </aside>
    <ul className="benefit-list">
    <li>
    <span className="benefit-icon" aria-hidden="true">
    <svg className="icon" viewBox="0 0 24 24">
    <path d="M4 12h16M12 4v16">
    </path>
    </svg>
    </span>
    <div>
    <h3>
    {t("一眼读取，而不是反复查找")}
    </h3>
    <p>
    {t("小号组件保留当下最关键的额度值；中号组件补充周限额、重置时间和近期趋势，信息深度随组件尺寸自然变化。")}
    </p>
    </div>
    </li>
    <li>
    <span className="benefit-icon" aria-hidden="true">
    <svg className="icon" viewBox="0 0 24 24">
    <path d="M4 18V9m5 9V5m5 13v-7m5 7V3">
    </path>
    </svg>
    </span>
    <div>
    <h3>
    {t("把瞬时额度变成可理解的趋势")}
    </h3>
    <p>
    {t("除了剩余百分比，还汇总最近五个已完成自然日的 token 消耗与日均值，帮助你理解真实使用节奏。")}
    </p>
    </div>
    </li>
    <li>
    <span className="benefit-icon" aria-hidden="true">
    <svg className="icon" viewBox="0 0 24 24">
    <path d="M12 3 5 6v5c0 4.4 2.7 7.8 7 10 4.3-2.2 7-5.6 7-10V6l-7-3Z">
    </path>
    <path d="m9 12 2 2 4-4">
    </path>
    </svg>
    </span>
    <div>
    <h3>
    {t("本地读取，缩小数据边界")}
    </h3>
    <p>
    {t("菜单栏 App 负责读取官方额度接口和本机 Codex 日志，桌面 Widget 只消费脱敏后的本地快照，不直接接触认证文件。")}
    </p>
    </div>
    </li>
    </ul>
    </div>
    </div>
    </section>
    <section className="section evidence-section" id="evidence" aria-labelledby="evidence-title">
    <div className="section-inner">
    <h2 className="section-heading" id="evidence-title">
    {t("一个自己的痛点，做成了有人使用的产品。")}
    </h2>
    <div className="evidence-layout">
    <figure className="poster-frame">
    <img src="/projects/quota-portfolio/asset-1.png" alt={t("Codex Quota 深色产品宣传图，中央展示额度组件与消耗趋势")} width="1122" height="1402" decoding="async"/>
    <figcaption>
    {t("基于真实功能的产品宣传图 · 源文件、生成提示词与来源记录随项目保留")}
    </figcaption>
    </figure>
    <div className="evidence-copy">
    <p>
    {t("这个项目先解决我每天使用 Codex 时的额度焦虑，再把源码、安装脚本和更新流程整理成其他人也能使用的版本。公开结果不替代产品价值，但证明了这不是只停留在概念里的界面练习。")}
    </p>
    <p className="portfolio-snapshot">{t("作品集记录 · 2026.08")}</p><div className="evidence-metrics" aria-label={t("项目公开成果")}>
    <div className="evidence-metric">
    <strong>
    {t("200+ 点赞收藏")}
    </strong>
    <span>
    {t("来自小红书公开发布后的真实反馈。")}
    </span>
    </div>
    <div className="evidence-metric">
    <strong>
    {"10 Star"}
    </strong>
    <span>
    {t("可从 GitHub 公开仓库继续核验源码与版本。")}
    </span>
    </div>
    <div className="evidence-metric">
    <strong>
    {t("10+ 用户")}
    </strong>
    <span>
    {t("把桌面额度查看变成日常工作的一部分。")}
    </span>
    </div>
    <div className="evidence-metric">
    <strong>
    {"v1.0.28"}
    </strong>
    <span>
    {t("作品集记录版本；持续维护安装、更新与旧版本清理流程。")}
    </span>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    <section className="section product-section" id="product" aria-labelledby="product-title">
    <div className="section-inner">
    <h2 className="section-heading" id="product-title">
    {t("两种尺寸，服务两种查看深度。")}
    </h2>
    <p className="section-lead">
    {t("把产品放到桌面，意味着信息需要克制。关键状态必须先于装饰，趋势只在它确实帮助判断时出现。")}
    </p>
    <div className="product-layout">
    <div className="product-canvas" aria-hidden="true">
    <div className="quota-widget widget-medium">
    <div className="medium-body">
    <div className="medium-limits">
    <div className="widget-head">
    <div className="widget-name">
    <span className="status-dot">
    </span>
    {"Codex"}
    </div>
    <div className="widget-time">
    {"10:08"}
    </div>
    </div>
    <div className="quota-row">
    <div className="quota-line">
    <span className="quota-label">
    {t("5 小时")}
    </span>
    <span className="quota-value">
    {"72%"}
    </span>
    </div>
    <div className="quota-progress-line">
    <div className="track">
    <span style={{ "width": "72%" } as React.CSSProperties}>
    </span>
    </div>
    <span className="reset-label">
    {"1h 24m"}
    </span>
    </div>
    </div>
    <div className="quota-row">
    <div className="quota-line">
    <span className="quota-label">
    {t("周限额")}
    </span>
    <span className="quota-value">
    {"58%"}
    </span>
    </div>
    <div className="quota-progress-line">
    <div className="track">
    <span style={{ "width": "58%" } as React.CSSProperties}>
    </span>
    </div>
    <span className="reset-label">
    {"3d 18h"}
    </span>
    </div>
    </div>
    </div>
    <div className="medium-trend">
    <div className="trend-head">
    <span className="trend-title">
    {t("近 5 天趋势")}
    </span>
    <span className="trend-average">
    {t("日均 42.6M")}
    </span>
    </div>
    <div className="trend">
    <svg viewBox="0 0 220 120">
    <path d="M2 104H218M2 58H218M2 12H218" stroke="#d4ddd5">
    </path>
    <path d="M5 99C34 94 47 105 69 84S106 74 124 54 151 20 171 28s21 55 44 58" stroke="#147a4c" strokeWidth="4" fill="none" strokeLinecap="round">
    </path>
    </svg>
    </div>
    </div>
    </div>
    </div>
    <div className="quota-widget widget-small">
    <div className="widget-head">
    <div className="widget-name">
    <span className="status-dot">
    </span>
    {"Codex"}
    </div>
    <div className="widget-time">
    {"10:08"}
    </div>
    </div>
    <div className="quota-row">
    <div className="quota-line">
    <span className="quota-label">
    {t("5 小时")}
    </span>
    <span className="quota-value">
    {"72%"}
    </span>
    </div>
    <div className="quota-progress-line">
    <div className="track">
    <span style={{ "width": "72%" } as React.CSSProperties}>
    </span>
    </div>
    <span className="reset-label">
    {"1h 24m"}
    </span>
    </div>
    </div>
    <div className="quota-row">
    <div className="quota-line">
    <span className="quota-label">
    {t("周限额")}
    </span>
    <span className="quota-value">
    {"58%"}
    </span>
    </div>
    <div className="quota-progress-line">
    <div className="track">
    <span style={{ "width": "58%" } as React.CSSProperties}>
    </span>
    </div>
    <span className="reset-label">
    {"3d 18h"}
    </span>
    </div>
    </div>
    </div>
    </div>
    <div className="product-facts">
    <article className="product-fact">
    <h3>
    {t("小号 · 快速扫一眼")}
    </h3>
    <p>
    {t("额度百分比、进度条和状态更新时间保持在第一视觉层，适合放在桌面或小组件抽屉。")}
    </p>
    </article>
    <article className="product-fact">
    <h3>
    {t("中号 · 读懂使用节奏")}
    </h3>
    <p>
    {t("同时展示五小时额度、每周额度、重置时间、近五天消耗趋势与日均 token。")}
    </p>
    </article>
    <article className="product-fact">
    <h3>
    {t("菜单栏 · 更新与诊断")}
    </h3>
    <p>
    {t("菜单栏 App 负责抓取、解析和缓存；遇到空数据、过期快照或解析异常时提供可理解的状态。")}
    </p>
    </article>
    <article className="product-fact">
    <h3>
    {t("浅色与深色外观")}
    </h3>
    <p>
    {t("遵循 macOS WidgetKit 的系统外观，同时保持绿色额度反馈和清晰的数据层级。")}
    </p>
    </article>
    </div>
    </div>
    </div>
    </section>
    <section className="section" id="usage" aria-labelledby="usage-title">
    <div className="section-inner">
    <h2 className="section-heading" id="usage-title">
    {t("从源码安装，三步把额度放到桌面。")}
    </h2>
    <p className="section-lead">
    {t("当前版本通过 GitHub 源码安装。脚本会构建菜单栏 App 和 Widget 扩展，并放到本机应用目录。")}
    </p>
    <div className="usage-layout">
    <ol className="steps">
    <li>
    <div>
    <h3>
    {t("下载项目")}
    </h3>
    <p>
    {t("在 GitHub 克隆 Codex Widget 源码，进入项目目录。发布页与 README 会同步当前版本的要求和变更。")}
    </p>
    </div>
    </li>
    <li>
    <div>
    <h3>
    {t("运行本地安装脚本")}
    </h3>
    <p>
    {t("脚本使用完整 Xcode 构建并安装 App。完成后从应用程序中打开 Codex Quota。")}
    </p>
    </div>
    </li>
    <li>
    <div>
    <h3>
    {t("添加桌面组件")}
    </h3>
    <p>
    {t("打开 macOS 小组件编辑器，搜索 Codex Quota，选择小号或中号尺寸并放到桌面。")}
    </p>
    </div>
    </li>
    </ol>
    <aside>
    <div className="install-panel">
    <div className="install-titlebar">
    <span>
    {"Terminal — install"}
    </span>
    <span className="window-controls" aria-hidden="true">
    <i>
    </i>
    <i>
    </i>
    <i>
    </i>
    </span>
    </div>
    <div className="install-code" id="install-command">
    <span className="prompt">
    {"$"}
    </span>
    {" git clone https://github.com/Zaki362/codex-widget.git\n"}
    <span className="prompt">
    {"$"}
    </span>
    {" cd codex-widget\n"}
    <span className="prompt">
    {"$"}
    </span>
    {" ./scripts/install-local.command"}
    </div>
    <div className="copy-row">
    <span className="copy-status" id="copy-status" aria-live="polite">
    {t(copyStatus)}
    </span>
    <button className="copy-button" id="copy-command" type="button" onClick={copyCommands}>
    {t(copied ? "已复制" : "复制命令")}
    </button>
    </div>
    </div>
    <p className="requirements">
    {t("系统要求：macOS 14 或更高版本、完整 Xcode、本机已运行过 Codex 并产生可读取的本地数据。")}
    </p>
    </aside>
    </div>
    </div>
    </section>
    <section className="final-cta" aria-labelledby="final-title">
    <div className="final-panel">
    <div>
    <h2 id="final-title">
    {t("把 Codex 的“油量”，留在你的桌面。")}
    </h2>
    <p>
    {t("查看源码、安装步骤与最新版本。如果你也在 macOS 上高频使用 Codex，可以从 GitHub 开始。")}
    </p>
    </div>
    <div className="final-actions">
    <a className="button button-primary" href="https://github.com/Zaki362/codex-widget" target="_blank" rel="noreferrer">
    {t("打开 GitHub")}
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M7 7h10v10">
    </path>
    </svg>
    </a>
    <a className="button button-secondary" href="#top">
    {t("返回顶部")}
    </a>
    </div>
    </div>
    </section>
    </main>
    <footer>
    <div className="footer-inner">
    <span>
    {"Codex Quota · macOS quota widget"}
    </span>
    <span>
    {t("由郑国华设计与构建 ·")}
    <a href="https://github.com/Zaki362/codex-widget" target="_blank" rel="noreferrer">
    {t("GitHub 项目")}
    </a>
    </span>
    </div>
    </footer>
    </div>;
}
