"use client";
import Image from "next/image";
import { useLanguage } from "@/components/language-provider";
import type { PortfolioProject } from "@/data/projects";
import "./redflow-project-page.css";
// Adapted from the author's September 23 portfolio. Keep the seven sections
// and original visuals; the public site exposes only the article and recording.
export function RedflowProjectPage({ project }: {
    project: PortfolioProject;
}) {
    const { locale } = useLanguage();
    const t = (zh: string, en: string) => locale === "zh" ? zh : en;
    return (<main className="redflow-portfolio" lang={locale === "zh" ? "zh-CN" : "en"}>
    <a className="skip" href="#redflow-content">
    {t("跳到正文", "Skip to content")}
    </a>
    <header className="wrap masthead">
    <a href="#overview" className="brand" aria-label={t("RedFlow 产品基本信息", "RedFlow product overview")}>
    <span className="brand-icon" aria-hidden="true">
    {"R"}
    </span>
    <span>
    <span className="brand-name">
    {"RedFlow"}
    </span>
    <span className="brand-caption" style={{ display: "block" }}>
    {t("让零散灵感，成为你的作品", "Turn scattered ideas into your work")}
    </span>
    </span>
    </a>
    <div className="mast-author">
    {t("郑国华 · 北京大学 ｜ AI 产品作品集", "Guohua Zheng · Peking University | AI Product Portfolio")}
    </div>
    </header>
    <div id="redflow-content">
    <section className="wrap portfolio-page" id="overview" aria-labelledby="overview-title">
    <div className="section-heading">
    <span className="section-number" aria-hidden="true">
    {"01"}
    </span>
    <div>
    <h1 id="overview-title">
    {t("产品概述", "Product overview")}
    </h1>
    </div>
    </div>
    <div className="hero overview-hero">
    <div>
    <p className="display hero-statement">
    {t("让零散灵感，", "Scattered ideas.")}
    <br />
    {t("成为", "Your next ")}
    <span className="red">
    {t("你的作品。", "creation.")}
    </span>
    </p>
    <p className="hero-lead">
    {t("RedFlow 是面向个人创作者的 ", "RedFlow is an ")}
    <strong>
    {t("AI 图文创作助手", "AI content creation assistant")}
    </strong>
    {t("，通过语音或文字交流中的", " for individual creators. Through voice or text conversations, ")}
    <strong>
    {t("引导追问", "guided questions")}
    </strong>
    {t("，帮助用户梳理零散灵感、补充内容细节，逐步形成可编辑、可发布的图文作品。", " help organize ideas and fill in details, gradually turning them into editable, publish-ready posts.")}
    </p>
    <p className="hero-lead">
    {t("产品提供", "Two paths — ")}
    <strong>
    {t("灵感共创", "Guided co-creation")}
    </strong>
    {t("与", " and ")}
    <strong>
    {t("直接生成", "Direct generation")}
    </strong>
    {t("两条路径，覆盖从表达探索到内容制作的不同创作需求。", " — support different needs, from exploring an idea to producing content.")}
    </p>
    <dl className="fact-grid">
    <div>
    <dt>
    {t("产品形态", "Product format")}
    </dt>
    <dd>
    {t("移动优先，兼容桌面浏览器", "Mobile first, desktop compatible")}
    </dd>
    </div>
    <div>
    <dt>
    {t("当前产物", "Current output")}
    </dt>
    <dd>
    {t("可预览、编辑的小红书图文", "Editable Xiaohongshu-style posts")}
    </dd>
    </div>
    <div>
    <dt>
    {t("核心能力", "Core capability")}
    </dt>
    <dd>
    {t("引导表达 → 成稿 → 预览编辑", "Guided expression → Draft → Preview & edit")}
    </dd>
    </div>
    <div>
    <dt>
    {t("内容控制", "Content control")}
    </dt>
    <dd>
    {t("内容可修改，最终由用户发布", "Editable content; you decide when to publish")}
    </dd>
    </div>
    </dl>
    <div className="actions">
    <a className="btn" href="#demo">
    {t("观看 Demo ↓", "Watch the demo ↓")}
    </a>
    </div>
    </div>
    <figure className="hero-scene">
    <div className="phone voice">
    <Image src="/projects/redflow-portfolio/voice-screen.png" width={390} height={844} alt={t("RedFlow当前语音共创界面：语音球、本轮追问和补充输入栏", "RedFlow voice co-creation: voice animation, the current question and an input field")} sizes="(max-width: 680px) 100vw, 600px"/>
    </div>
    <div className="phone result">
    <Image src="/projects/redflow-portfolio/post-preview.png" width={390} height={844} alt={t("RedFlow手机端小红书式图文预览", "RedFlow mobile post preview in the Xiaohongshu style")} sizes="(max-width: 680px) 100vw, 600px"/>
    </div>
    <figcaption className="scene-label">
    {t("产品界面 · 示例内容", "Product interface · Example content")}
    </figcaption>
    </figure>
    </div>
    </section>
    <section className="wrap portfolio-page" id="users" aria-labelledby="users-title">
    <div className="section-heading">
    <span className="section-number" aria-hidden="true">
    {"02"}
    </span>
    <div>
    <h2 id="users-title">
    {t("目标用户与痛点", "Target users & pain points")}
    </h2>
    <p className="section-summary">
    {t("面向有表达意愿与零散想法，却难以持续产出的个人创作者。", "For individual creators who have ideas to share but struggle to turn them into regular output.")}
    </p>
    </div>
    </div>
    <p className="page-lead">
    {t("覆盖生活记录、知识科普与经验分享等场景。用户通常已有经历、观点或照片，但尚未形成清晰的选题与完整内容。", "Across everyday life, educational content and practical advice, creators often have experiences, opinions or photos without a clear topic or a complete narrative.")}
    </p>
    <div className="pain-grid">
    <article className="pain-item">
    <span className="small-label">
    {t("表达阶段", "Expression")}
    </span>
    <h3>
    {t("表达方向不明确", "An unclear angle")}
    </h3>
    <p>
    {t("有分享意愿，但难以提炼个人经历中的表达重点，需要引导以形成清晰角度。", "The desire to share is there, but identifying the central point of an experience requires guidance.")}
    </p>
    </article>
    <article className="pain-item">
    <span className="small-label">
    {t("组织阶段", "Organization")}
    </span>
    <h3>
    {t("素材缺乏组织", "Scattered material")}
    </h3>
    <p>
    {t("照片、细节与观点相对零散，缺乏筛选标准，也难以判断需要补充哪些信息。", "Photos, details and opinions lack a clear structure. It is hard to decide what to keep and what to add.")}
    </p>
    </article>
    <article className="pain-item">
    <span className="small-label">
    {t("制作阶段", "Production")}
    </span>
    <h3>
    {t("制作流程易中断", "An interrupted workflow")}
    </h3>
    <p>
    {t("文案、选图与排版分散在不同环节，反复切换增加完成负担，影响持续产出。", "Writing, image selection and layout happen in separate tools. Repeated switching makes it harder to finish consistently.")}
    </p>
    </article>
    </div>
    <div className="reader-belief">
    <h3>
    {t("产品判断：制作门槛降低，但从灵感到成品仍有缺口。", "Product insight: production is easier, but the gap from idea to finished work remains.")}
    </h3>
    <p>
    {t("AI 降低了写文案、做配图的门槛，但一个零散的灵感往往还缺少清晰的表达角度、具体细节与内容结构。RedFlow 通过引导追问，帮助用户明确想表达什么、补充必要信息，再完成文案与配图，将灵感逐步转化为可发布的图文内容。", "AI lowers the effort of writing and image creation, but a scattered idea still needs an angle, concrete details and structure. RedFlow uses guided questions to clarify what the creator wants to express, gather the missing information, and then shape the copy and images into a publish-ready post.")}
    </p>
    </div>
    <div className="scenario-intro">
    <h3>
    {t("两种常见的创作困境", "Two common creative challenges")}
    </h3>
    <span>
    {t("场景示意 · AI 生成插画", "Illustrative scenarios · AI-generated artwork")}
    </span>
    </div>
    <div className="creator-scenarios">
    <article className="creator-scenario">
    <div className="scenario-heading">
    <span>
    {t("场景 01 · 生活记录", "Scenario 01 · Everyday life")}
    </span>
    <h4>
    {t("有经历想分享，却迟迟没动笔", "An experience worth sharing, still unwritten")}
    </h4>
    </div>
    <Image className="scenario-art" src="/projects/redflow-portfolio/everyday-creator.png" width={1536} height={1024} alt={t("漫画：游玩归来的创作者面对一桌照片和空白文稿，想分享却不知从何整理。", "Illustration: after a day out, a creator faces a table of photos and a blank draft, unsure where to begin.")} loading="lazy" sizes="(max-width: 680px) 100vw, 600px"/>
    <div className="scenario-story">
    <blockquote>
    {t("“今天玩得好开心，照片也拍了一堆……但选图、写文案好麻烦，还是算了吧。”", "“I had such a great day and took so many photos… but choosing pictures and writing a post feels like too much. Maybe later.”")}
    </blockquote>
    <div className="scenario-problem">
    <span>
    {t("卡在哪里", "The obstacle")}
    </span>
    <p>
    {t("素材很多，却没有表达重点；从选图到成稿的负担，让分享停在想法阶段。", "Plenty of material, no clear focus. The effort of selecting photos and drafting keeps the post at the idea stage.")}
    </p>
    </div>
    <div className="scenario-help">
    <span>
    {t("产品帮助", "How RedFlow helps")}
    </span>
    <p>
    {t("从“最想分享哪一刻”开始追问，结合照片梳理细节，把一次经历整理成有个人表达的图文。", "Questions start with the moment you most want to share. Photos and details then help turn the experience into a post with a personal point of view.")}
    </p>
    </div>
    </div>
    </article>
    <article className="creator-scenario">
    <div className="scenario-heading">
    <span>
    {t("场景 02 · 垂类创作", "Scenario 02 · Topic-focused content")}
    </span>
    <h4>
    {t("有创作方向，却难以持续产出", "A clear niche, inconsistent output")}
    </h4>
    </div>
    <Image className="scenario-art" src="/projects/redflow-portfolio/knowledge-creator.png" width={1536} height={1024} alt={t("漫画：知识创作者面对 AI 工具、教程和产品体验等多个想法，笔停在空白页面上。", "Illustration: a creator has ideas about AI tools, tutorials and products, but the page remains blank.")} loading="lazy" sizes="(max-width: 680px) 100vw, 600px"/>
    <div className="scenario-story">
    <blockquote>
    {t("“想在小红书持续分享 AI 工具，想法和收藏攒了不少……今天讲哪个？又该从哪里开始？”", "“I want to keep sharing AI tools on Xiaohongshu. I have so many ideas and saved links… which one should I cover, and where do I start?”")}
    </blockquote>
    <div className="scenario-problem">
    <span>
    {t("卡在哪里", "The obstacle")}
    </span>
    <p>
    {t("赛道已经明确，但素材零散、选题切口不清楚，每篇内容都要从头组织。", "The obstacle is no longer choosing a niche: the material is scattered and the angle is unclear, so every post starts from scratch.")}
    </p>
    </div>
    <div className="scenario-help">
    <span>
    {t("产品帮助", "How RedFlow helps")}
    </span>
    <p>
    {t("通过灵感广场发现精选选题，确认方向后直接生成文案与配图方案，将搜集素材接到内容制作。", "The inspiration feed surfaces curated topics. Once the angle is confirmed, copy and image planning connect discovery directly to production.")}
    </p>
    </div>
    </div>
    </article>
    </div>
    </section>
    <section className="wrap portfolio-page" id="journey" aria-labelledby="journey-title">
    <div className="section-heading">
    <span className="section-number" aria-hidden="true">
    {"03"}
    </span>
    <div>
    <h2 id="journey-title">
    {t("产品价值与使用链路", "Product value & user journeys")}
    </h2>
    <p className="section-summary">
    {t("从个人灵感到图文成稿，或从垂类选题进入制作，分别解决表达组织与选题供给的问题。", "Start with a personal idea to clarify your expression, or a curated topic to begin production. The two paths address different needs.")}
    </p>
    </div>
    </div>
    <div className="creation-paths">
    <article className="creation-path path-conversation" aria-labelledby="conversation-path-title">
    <header className="path-heading">
    <div className="path-label">
    <span className="path-letter">
    {"A"}
    </span>
    <span>
    {t("灵感共创", "Guided co-creation")}
    </span>
    </div>
    <h3 id="conversation-path-title">
    {t("把个人灵感变成图文", "Turn personal ideas into posts")}
    </h3>
    <p>
    {t("解决“有想法，却不知道怎么表达”：从一句想法、一段经历或几张照片开始。", "For “I have an idea, but I don’t know how to express it.” Start with a thought, an experience or a few photos.")}
    </p>
    <div className="path-entry">
    {t("入口：说出想法 / 补充灵感", "Entry: Share an idea / Add inspiration")}
    </div>
    </header>
    <ol className="path-stages">
    <li>
    <span className="stage-number">
    {"01"}
    </span>
    <div>
    <h4>
    {t("接住零散的想法", "Capture scattered ideas")}
    </h4>
    <p>
    {t("用语音或文字表达，随时补充照片，无需先准备完整选题。", "Speak or type, and add photos at any point. A fully formed topic is not required.")}
    </p>
    </div>
    </li>
    <li>
    <span className="stage-number">
    {"02"}
    </span>
    <div>
    <h4>
    {t("引导表达，补齐细节", "Find the angle and details")}
    </h4>
    <p>
    {t("通过最多五轮追问明确角度与重点，信息充分时可提前成稿。", "Up to five rounds of questions clarify the focus. Draft earlier when there is enough information.")}
    </p>
    </div>
    </li>
    <li>
    <span className="stage-number">
    {"03"}
    </span>
    <div>
    <h4>
    {t("整理并生成图文", "Organize and draft")}
    </h4>
    <p>
    {t("汇总对话生成标题、正文与话题，结合上传照片形成初稿。", "Turn the conversation into a title, copy and hashtags, using uploaded photos to form the first draft.")}
    </p>
    </div>
    </li>
    </ol>
    <div className="path-outcome">
    <span>
    {t("最终得到", "The result")}
    </span>
    <p>
    {t("一篇基于个人经历与观点、可继续编辑的图文初稿。", "An editable first draft grounded in the creator’s own experiences and opinions.")}
    </p>
    </div>
    </article>
    <article className="creation-path path-production" aria-labelledby="production-path-title">
    <header className="path-heading">
    <div className="path-label">
    <span className="path-letter">
    {"B"}
    </span>
    <span>
    {t("直接生成", "Direct generation")}
    </span>
    </div>
    <h3 id="production-path-title">
    {t("从赛道选题开始制作", "Create from a curated topic")}
    </h3>
    <p>
    {t("解决“方向明确，但缺少选题切口”：从灵感广场的精选素材中确定创作主题。", "For “I know my niche, but need a fresh angle.” Choose a theme from the inspiration feed’s curated material.")}
    </p>
    <div className="path-entry">
    {t("入口：灵感广场 → 直接生成", "Entry: Inspiration feed → Direct generation")}
    </div>
    </header>
    <ol className="path-stages">
    <li>
    <span className="stage-number">
    {"01"}
    </span>
    <div>
    <h4>
    {t("从精选素材发现选题", "Discover a topic")}
    </h4>
    <p>
    {t("浏览近期与历史精选，选择与创作方向相关的素材，确认选题切口。", "Browse recent and archived selections, choose relevant material and confirm the angle.")}
    </p>
    </div>
    </li>
    <li>
    <span className="stage-number">
    {"02"}
    </span>
    <div>
    <h4>
    {t("将选题组织成制作方案", "Turn the topic into a plan")}
    </h4>
    <p>
    {t("生成文案与组图方案，用户确认内容重点和呈现方式。", "Generate copy and an image-set plan, then confirm the key message and presentation.")}
    </p>
    </div>
    </li>
    <li>
    <span className="stage-number">
    {"03"}
    </span>
    <div>
    <h4>
    {t("图片生成与内容审核", "Generate images and review")}
    </h4>
    <p>
    {t("生成 AI 配图，审核文案与图片，按需修改结果。", "Create AI images, review the copy and visuals, and revise where needed.")}
    </p>
    </div>
    </li>
    </ol>
    <div className="path-outcome">
    <span>
    {t("最终得到", "The result")}
    </span>
    <p>
    {t("一套围绕已选主题、可审核修改的文案与配图。", "A set of copy and images built around the chosen topic, ready for review and revision.")}
    </p>
    </div>
    </article>
    </div>
    <p className="scope-brief">
    {t("当前灵感广场以 AI 资讯精选为主；个人灵感共创不限定内容主题。", "The inspiration feed currently focuses on AI news; personal co-creation is not limited to that topic.")}
    </p>
    <div className="shared-finish">
    <p className="shared-label">
    {t("统一完成环节：预览、编辑与发布准备", "A shared finish: preview, edit and prepare to publish")}
    </p>
    <div className="finish-stages">
    <div>
    <strong>
    {t("预览与编辑", "Preview & edit")}
    </strong>
    <span>
    {t("查看图文效果，修改文字与图片", "Review the post; revise text and images")}
    </span>
    </div>
    <span className="finish-arrow" aria-hidden="true">
    {"→"}
    </span>
    <div>
    <strong>
    {t("保存草稿", "Save a draft")}
    </strong>
    <span>
    {t("保留创作进度，支持恢复与继续编辑", "Keep your progress and return to editing")}
    </span>
    </div>
    <span className="finish-arrow" aria-hidden="true">
    {"→"}
    </span>
    <div>
    <strong>
    {t("导出并分享", "Export & share")}
    </strong>
    <span>
    {t("确认内容后，在小红书自行发布", "Review the content, then publish on Xiaohongshu yourself")}
    </span>
    </div>
    </div>
    </div>
    </section>
    <section className="wrap portfolio-page video-page" id="demo" aria-labelledby="demo-title">
    <div className="section-heading">
    <span className="section-number" aria-hidden="true">
    {"04"}
    </span>
    <div>
    <h2 id="demo-title">
    {t("Demo 演示", "Demo walkthrough")}
    </h2>
    <p className="section-summary">
    {t("当前自动演示依次呈现语音共创与广场直接生成两条链路。", "The walkthrough shows voice co-creation followed by direct generation from the inspiration feed.")}
    </p>
    </div>
    </div>
    <div className="demo-layout">
    <figure className="video-wrap">
    <video controls playsInline preload="metadata" aria-label={t("RedFlow最新产品 Demo 录屏，未录制声音", "Latest RedFlow product demo recording, without audio")} src={project.video} poster={project.cover}>
    {t("当前浏览器不支持视频播放，请通过下方链接打开录屏。", "Your browser does not support video playback. Open the recording using the link below.")}
    </video>
    <figcaption className="video-caption">
    {t("最新产品录屏 · 1 分 56 秒 · 本录屏未录制声音", "Latest recording · 1 min 56 sec · No audio in this recording")}
    </figcaption>
    </figure>
    <div className="demo-copy current-demo-copy">
    <p className="demo-context">
    {t("当前 Demo · 两条生成链路", "Current demo · Two creation paths")}
    </p>
    <article className="demo-route">
    <div className="demo-route-heading">
    <span className="demo-route-letter">
    {"A"}
    </span>
    <h3>
    {t("语音共创 · 游乐园记录", "Voice co-creation · A day at the amusement park")}
    </h3>
    </div>
    <p>
    {t("从一次游乐园经历开始，通过 AI 追问与细节澄清，将“等餐时遇见的夕阳”提炼为表达重点。", "Guided questions clarify the details of an amusement-park visit, bringing “the sunset while waiting for food” into focus as the story’s central moment.")}
    </p>
    <div className="demo-route-flow">
    {t("表达想法 → 引导追问 → 补充三张照片", "Share an idea → Guided questions → Add three photos")}
    <br />
    {t("→ 生成图文 → 小红书式预览 → 编辑并保存", "→ Draft the post → Xiaohongshu-style preview → Edit and save")}
    </div>
    </article>
    <article className="demo-route">
    <div className="demo-route-heading">
    <span className="demo-route-letter alternate">
    {"B"}
    </span>
    <h3>
    {t("直接生成 · Kimi K3 选题", "Direct generation · A Kimi K3 topic")}
    </h3>
    </div>
    <p>
    {t("从灵感广场选中素材，确认文案与三张组图方案，再查看成品、审核内容并准备发布素材。", "Choose material from the inspiration feed, confirm the copy and three-image plan, then review the output, refine the content and prepare publishing materials.")}
    </p>
    <div className="demo-route-flow">
    {t("选择素材 → 确认选题与方案", "Choose material → Confirm the topic and plan")}
    <br />
    {t("→ 组图制作 → 审核修订 → 发布准备", "→ Create images → Review and revise → Prepare to publish")}
    </div>
    </article>
    <div className="actions demo-actions">
    <a className="demo-video-link" href={project.video}>
    {t("单独打开录屏 ↗", "Open the recording ↗")}
    </a>
    </div>
    </div>
    </div>
    <p className="page-endnote">
    {t("当前自动演示使用固定案例与预录音频，部分制作及发布准备状态为模拟；播放时不调用模型，也不实际发布。", "The walkthrough uses fixed examples and prerecorded audio. Some production and publishing-preparation states are simulated; playback does not call models or publish content.")}
    </p>
    </section>
    <section className="wrap portfolio-page" id="technology" aria-labelledby="technology-title">
    <div className="section-heading">
    <span className="section-number" aria-hidden="true">
    {"05"}
    </span>
    <div>
    <h2 id="technology-title">
    {t("技术方案", "Technical approach")}
    </h2>
    <p className="section-summary">
    {t("通过模型分工与流程编排，连接语音交互、文案生成和图片制作。", "Model roles and workflow orchestration connect voice interaction, writing and image production.")}
    </p>
    </div>
    </div>
    <div className="model-grid">
    <article className="model-card">
    <span className="model-role">
    {t("语音理解与对话", "Voice understanding & dialogue")}
    </span>
    <h3>
    {t("千问 Omni", "Qwen Omni")}
    </h3>
    <p>
    {t("结合语音输入与会话上下文生成追问，同时返回语音回应与本轮字幕。", "Uses voice input and conversation context to ask questions, returning spoken responses and captions for the current turn.")}
    </p>
    <div className="model-name">
    <span className="model-version-label">
    {t("模型型号", "Model")}
    </span>
    <code>
    {"qwen3.5-omni-flash-realtime"}
    </code>
    </div>
    </article>
    <article className="model-card">
    <span className="model-role">
    {t("文字追问与内容生成", "Guided questions & writing")}
    </span>
    <h3>
    {"DeepSeek"}
    </h3>
    <p>
    {t("支持文字追问，整理标题、正文与话题，并协助修改文案、规划配图。", "Supports text-based follow-up questions, titles, copy and hashtags, as well as copy revisions and visual planning.")}
    </p>
    <div className="model-name">
    <span className="model-version-label">
    {t("模型型号", "Model")}
    </span>
    <div className="model-variant">
    <span>
    {t("灵感共创", "Guided co-creation")}
    </span>
    <code>
    {"deepseek-flash / deepseek-v4-pro"}
    </code>
    </div>
    <div className="model-variant">
    <span>
    {t("直接制作", "Direct production")}
    </span>
    <code>
    {"deepseek-v4-flash"}
    </code>
    </div>
    </div>
    </article>
    <article className="model-card">
    <span className="model-role">
    {t("图像生成", "Image generation")}
    </span>
    <h3>
    {t("千问 Image", "Qwen Image")}
    </h3>
    <p>
    {t("在直接制作链路中，根据视觉方案生成配图；灵感共创支持使用用户上传的照片。", "Creates images from the visual plan in direct production; guided co-creation supports the creator’s own photos.")}
    </p>
    <div className="model-name">
    <span className="model-version-label">
    {t("模型型号", "Model")}
    </span>
    <code>
    {"qwen-image-3.0"}
    </code>
    </div>
    </article>
    </div>
    <div className="implementation-summary">
    <div>
    <h3>
    {t("前端交互", "Frontend interaction")}
    </h3>
    <p>
    {t("响应式网页配合语音动效，支持对话、照片上传、小红书式预览与编辑。", "A responsive interface with voice animation supports conversations, photo uploads, a Xiaohongshu-style preview and editing.")}
    </p>
    </div>
    <div>
    <h3>
    {t("服务端与数据存储", "Backend & storage")}
    </h3>
    <p>
    {t("Node.js 与 Python 处理创作流程，PostgreSQL 保存对话和草稿，R2 存储图片与音频，部署于 Vercel。", "Node.js and Python orchestrate creation. PostgreSQL stores conversations and drafts; R2 stores images and audio. Deployed on Vercel.")}
    </p>
    </div>
    </div>
    </section>
    <section className="wrap portfolio-page" id="collaboration" aria-labelledby="collaboration-title">
    <div className="section-heading">
    <span className="section-number" aria-hidden="true">
    {"06"}
    </span>
    <div>
    <h2 id="collaboration-title">
    {t("AI 协作分工", "Working with AI")}
    </h2>
    <p className="section-summary">
    {t("我负责关键方向与产品判断，AI 负责执行落地，通过体验验收持续迭代。", "I lead product direction and judgment; AI helps execute. Experience reviews guide each iteration.")}
    </p>
    </div>
    </div>
    <div className="collaboration-roles">
    <article className="collaboration-role">
    <span className="role-label">
    {t("我 · 产品主导", "Me · Product lead")}
    </span>
    <h3>
    {t("确定方向，判断效果", "Set direction, judge the result")}
    </h3>
    <ul>
    <li>
    <strong>
    {t("提出产品洞察：", "Product insight: ")}
    </strong>
    {t("识别从零散灵感到成品的缺口，将产品从选题供给升级为引导式共创。", "Identify the gap between scattered ideas and finished work, evolving the product from topic discovery toward guided co-creation.")}
    </li>
    <li>
    <strong>
    {t("把控关键取舍：", "Key decisions: ")}
    </strong>
    {t("明确目标用户、双创作路径和移动优先体验；确定先做图文、追问最多五轮。", "Define the audience, two creation paths and mobile-first experience. Prioritize image-and-text posts and cap questions at five rounds.")}
    </li>
    <li>
    <strong>
    {t("体验与验收：", "Experience & acceptance: ")}
    </strong>
    {t("检查语音、页面跳转与成稿效果，提出具体反馈，决定下一轮优化重点。", "Check voice interaction, navigation and draft quality; give specific feedback and decide what to improve next.")}
    </li>
    </ul>
    </article>
    <article className="collaboration-role">
    <span className="role-label">
    {t("AI · 执行协作", "AI · Implementation partner")}
    </span>
    <h3>
    {t("拆解方案，实现验证", "Break down, build and verify")}
    </h3>
    <ul>
    <li>
    <strong>
    {t("补充实现方案：", "Implementation options: ")}
    </strong>
    {t("围绕目标研究模型能力、梳理交互流程与技术方案，提供选项供我判断。", "Research model capabilities and organize interaction flows and technical approaches for me to evaluate.")}
    </li>
    <li>
    <strong>
    {t("完成工程落地：", "Engineering: ")}
    </strong>
    {t("实现界面、模型接入、语音交互、草稿与预览编辑，制作固定案例演示。", "Implement the interface, model integrations, voice flow, drafts and preview editing, along with a fixed-case walkthrough.")}
    </li>
    <li>
    <strong>
    {t("落实反馈：", "Act on feedback: ")}
    </strong>
    {t("调整文案和布局、修复交互问题，验证手机与桌面效果，并整理文档与演示材料。", "Refine copy and layout, fix interactions, check phone and desktop experiences, and prepare documentation and demo materials.")}
    </li>
    </ul>
    </article>
    </div>
    <div className="collaboration-cycle" aria-label={t("人和AI的迭代协作流程", "The iterative collaboration between the creator and AI")}>
    <div>
    <span>
    {t("01 · 我", "01 · Me")}
    </span>
    <strong>
    {t("提出目标与约束", "Set goals and constraints")}
    </strong>
    </div>
    <b aria-hidden="true">
    {"→"}
    </b>
    <div>
    <span>
    {"02 · AI"}
    </span>
    <strong>
    {t("拆解并实现版本", "Break down and implement")}
    </strong>
    </div>
    <b aria-hidden="true">
    {"→"}
    </b>
    <div>
    <span>
    {t("03 · 我", "03 · Me")}
    </span>
    <strong>
    {t("体验验收与反馈", "Review and give feedback")}
    </strong>
    </div>
    <b aria-hidden="true">
    {"→"}
    </b>
    <div>
    <span>
    {"04 · AI"}
    </span>
    <strong>
    {t("修改并验证结果", "Revise and verify")}
    </strong>
    </div>
    </div>
    <div className="collaboration-example">
    <h3>
    {t("实际迭代：优化语音共创体验", "An actual iteration: refining voice co-creation")}
    </h3>
    <p>
    {t("我提出“进入即对话、只显示本轮字幕、上传照片不打断、静音不暂停会话”的体验要求；AI 调整语音状态与页面交互。我继续通过手机试用和截图反馈，推动返回存稿、预览编辑等环节逐步完善。", "I asked for conversations to begin on entry, captions to show only the current turn, photo uploads not to interrupt responses, and mute not to pause the session. AI revised the voice state and page interactions. Further phone testing and screenshot feedback improved saving on exit and preview editing.")}
    </p>
    </div>
    </section>
    <section className="wrap portfolio-page" id="roadmap" aria-labelledby="roadmap-title">
    <div className="section-heading">
    <span className="section-number" aria-hidden="true">
    {"07"}
    </span>
    <div>
    <h2 id="roadmap-title">
    {t("未来规划", "Future plans")}
    </h2>
    <p className="section-summary">
    {t("以引导质量为基础，逐步扩展账号定位、个性化与更多创作形态。", "Build on better guidance, then expand account positioning, personalization and creative formats.")}
    </p>
    </div>
    </div>
    <div className="roadmap-grid">
    <article className="roadmap-card">
    <span className="roadmap-label">
    {t("近期：体验优化", "Near term · Experience")}
    </span>
    <h3>
    {t("提升引导质量", "Improve the guidance")}
    </h3>
    <p>
    {t("优化信息充分性判断，减少重复追问，提升对用户补充与纠正的理解，改善成稿效率。", "Judge information sufficiency more accurately, reduce repeated questions, and better understand additions and corrections to improve drafting efficiency.")}
    </p>
    </article>
    <article className="roadmap-card focus">
    <span className="roadmap-label">
    {t("核心升级：个性化", "Core upgrade · Personalization")}
    </span>
    <h3>
    {t("账号定位与差异化引导", "Account positioning & tailored guidance")}
    </h3>
    <p>
    {t("结合账号方向、目标读者和表达风格，提供不同的追问方式。", "Adapt the questions to the account’s direction, intended readers and style of expression.")}
    </p>
    <div className="personalize-types">
    <div>
    <strong>
    {t("生活分享", "Everyday stories")}
    </strong>
    <span>
    {t("关注场景、细节与感受，保留鲜活的个人体验。", "Focus on scenes, details and feelings that preserve the personal experience.")}
    </span>
    </div>
    <div>
    <strong>
    {t("知识分享", "Educational content")}
    </strong>
    <span>
    {t("展开观点、解释、例子与依据，让内容清楚、有用。", "Develop arguments, explanations, examples and evidence so the content is clear and useful.")}
    </span>
    </div>
    <div>
    <strong>
    {t("长期表达偏好", "Long-term style preferences")}
    </strong>
    <span>
    {t("逐步积累用户确认的语气与风格，以单篇内容的表达意图为优先。", "Gradually learn the creator’s confirmed voice and style, while prioritizing the intent of each individual post.")}
    </span>
    </div>
    </div>
    </article>
    <article className="roadmap-card">
    <span className="roadmap-label">
    {t("后续：场景扩展", "Later · Expansion")}
    </span>
    <h3>
    {t("拓展终端与内容形态", "More devices and content formats")}
    </h3>
    <p>
    {t("探索原生手机 App，提升即时记录的便利性；在图文体验成熟后，进一步拓展视频创作。", "Explore a native mobile app for easier capture, then expand into video creation once the image-and-text experience is mature.")}
    </p>
    </article>
    </div>
    <div className="success-check">
    <div>
    <strong>
    {t("观看 RedFlow 演示", "See RedFlow in action")}
    </strong>
    <p>
    {t("从灵感表达，到可编辑的图文作品。", "From a first idea to an editable post.")}
    </p>
    </div>
    <a className="btn" href="#demo">
    {t("观看 Demo ↓", "Watch the demo ↓")}
    </a>
    </div>
    </section>
    </div>
    <footer className="wrap footer-compact">
    <p>
    {t("郑国华 · 北京大学 ｜ RedFlow 产品介绍 · 2026.09", "Guohua Zheng · Peking University | RedFlow Portfolio · Sep 2026")}
    </p>
    <p>
    {t("让零散灵感，成为你的作品", "Turn scattered ideas into your work")}
    </p>
    </footer>
    </main>);
}
