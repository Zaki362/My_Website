"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Check, Copy, Github, Mail, MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { contactData } from "@/data/profile";
import { portfolioProjects } from "@/data/projects";
import styles from "./room-content.module.css";

type RoomContentProps = {
  section: string;
  onClose: () => void;
  onAsk: () => void;
};

const sectionDetails = {
  about: { index: "01", label: "ABOUT", zh: "关于我", en: "About Me", href: "/#home" },
  projects: { index: "02", label: "PROJECTS", zh: "我的项目", en: "Projects", href: "/projects" },
  education: { index: "03", label: "EDUCATION", zh: "教育经历", en: "Education", href: "/#education" },
  research: { index: "04", label: "RESEARCH", zh: "科研经历", en: "Research", href: "/#research" },
  experience: { index: "05", label: "EXPERIENCE", zh: "工作经历", en: "Work Experience", href: "/#experience" },
  life: { index: "06", label: "BEYOND WORK", zh: "生活", en: "Beyond Work", href: "/beyond-work" },
  contact: { index: "07", label: "CONTACT", zh: "联系我", en: "Contact", href: "/#contact" }
} as const;

export default function RoomContent({ section, onClose, onAsk }: RoomContentProps) {
  const { locale, t } = useLanguage();
  const heading = useRef<HTMLHeadingElement>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const activeSection = Object.prototype.hasOwnProperty.call(sectionDetails, section) ? section as keyof typeof sectionDetails : "about";
  const details = sectionDetails[activeSection];
  const isChinese = locale === "zh";
  const title = details[locale];
  const publication = t.research.publication;

  // The parent mounts this panel only in response to opening an object or its navigation link.
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [section]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactData.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <section className={styles.panel} aria-label={title}>
      <header className={styles.header}>
        <div className={styles.eyebrow}>{details.label}</div>
        <button type="button" className={styles.close} onClick={onClose} aria-label={isChinese ? "关闭内容，回到房间" : "Close content and return to the room"}>
          <X size={18} aria-hidden="true" />
        </button>
        <h2 ref={heading} tabIndex={-1} className={styles.title}>{title}</h2>
      </header>

      <div className={styles.body}>
        {activeSection === "about" && (
          <>
            <div className={styles.identity}>
              <Image src={contactData.photoPath} width={80} height={80} alt={t.hero.name} className={styles.portrait} />
              <div><p className={styles.name}>{t.hero.name}</p><p className={styles.smallCaps}>AI BUILDER · {t.hero.location}</p></div>
            </div>
            <p className={styles.manifesto}>{isChinese ? "通过 AI 拓展产品边界，带来增量价值。" : "Expanding product boundaries with AI to create incremental value."}</p>
            <p className={styles.description}>{t.hero.intro}</p>
            <div className={styles.note}><ArrowDownRight size={17} aria-hidden="true" /><p>{t.hero.title}</p></div>
            <div className={styles.tags}>{t.hero.identity.split(" · ").map((item) => <span key={item}>{item}</span>)}</div>
          </>
        )}

        {activeSection === "projects" && (
          <>
            <p className={styles.description}>{isChinese ? "一些从真实需求出发，与 AI 一起构建的产品和实验。" : "Products and experiments built with AI, starting from real needs."}</p>
            <div className={styles.projectList}>
              {portfolioProjects.map((project) => {
                const copy = project.locales[locale];
                return (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.project}>
                    <div className={styles.projectImage}>
                      <Image src={project.cover} alt={copy.title} fill sizes="100px" className={styles.coverImage} />
                    </div>
                    <div className={styles.projectCopy}>
                      <div className={styles.projectHeading}><h3>{copy.title}</h3><ArrowUpRight size={15} aria-hidden="true" /></div>
                      <p>{copy.cardIntro}</p>
                      <span className={styles.projectMeta}>{project.year} <span aria-hidden="true">/</span> {copy.status}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {activeSection === "education" && (
          <>
            <p className={styles.description}>{isChinese ? "经济学的训练，让我习惯从问题、证据和真实世界出发。" : "An economics background, grounded in questions, evidence and the real world."}</p>
            <div className={styles.timeline}>
              {t.education.items.map((item, index) => (
                <article className={styles.timelineItem} key={item.school}>
                  <span className={styles.timelineNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p className={styles.period}>{item.period}</p>
                  <h3>{item.school}</h3>
                  <p className={styles.degree}>{item.degree}</p>
                  <p className={styles.description}>{item.department}</p>
                  <div className={styles.tags}>{item.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div>
                </article>
              ))}
            </div>
          </>
        )}

        {activeSection === "research" && (
          <>
            <div className={styles.publicationArt}>
              <Image src={publication.cover} alt={publication.coverAlt} width={112} height={156} className={styles.journalCover} />
              <div><span className={styles.publicationLabel}>PUBLICATION</span><p>JEEM</p><span>2025 · {publication.role}</span></div>
            </div>
            <h3 className={styles.paperTitle}>{publication.title}</h3>
            <p className={styles.description}>{publication.journal}</p>
            <p className={styles.authors}>{publication.authors}</p>
            <div className={styles.paperCredit}><span>{publication.creditLabel}</span><p>{publication.credit}</p></div>
            <a className={styles.textLink} href={publication.link} target="_blank" rel="noreferrer">{t.research.action}<ArrowUpRight size={15} aria-hidden="true" /></a>
          </>
        )}

        {activeSection === "experience" && (
          <>
            <p className={styles.description}>{isChinese ? "把模型能力带进真实业务，也在真实反馈中打磨产品判断。" : "Bringing model capabilities into real businesses, and learning from real feedback."}</p>
            <div className={styles.experienceList}>
              {t.experience.cards.map((item) => (
                <article key={`${item.company}-${item.period}`} className={styles.experience}>
                  <div className={styles.experienceTop}><h3>{item.company}</h3><span>{item.period}</span></div>
                  <p className={styles.role}>{item.domain}</p>
                  <p className={styles.description}>{item.problem}</p>
                </article>
              ))}
            </div>
          </>
        )}

        {activeSection === "life" && (
          <>
            <p className={styles.description}>{t.beyondHome.description}</p>
            <div className={styles.lifeGrid}>
              {t.beyondPage.slices.map((item) => (
                <figure key={item.name} className={styles.lifeTile}>
                  {item.image && <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 600px) 50vw, 180px" className={styles.coverImage} />}
                  <figcaption><span>{item.name}</span><small>{item.accent}</small></figcaption>
                </figure>
              ))}
            </div>
            <p className={styles.lifeNote}>{t.beyondPage.leadNote}</p>
          </>
        )}

        {activeSection === "contact" && (
          <>
            <div className={styles.contactMark}><Mail size={29} strokeWidth={1.3} aria-hidden="true" /></div>
            <p className={styles.manifesto}>{t.contact.title}</p>
            <p className={styles.description}>{t.contact.description}</p>
            <div className={styles.contactLinks}>
              <a href={`mailto:${contactData.email}`} className={styles.contactLink}><span><small>{t.contact.labels.email}</small><strong>{contactData.email}</strong></span><ArrowUpRight size={18} aria-hidden="true" /></a>
              <button type="button" className={styles.copyButton} onClick={copyEmail}>{copyStatus === "copied" ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{isChinese ? "复制邮箱地址" : "Copy email address"}</button>
              <p className={styles.copyStatus} role="status">{copyStatus === "copied" ? (isChinese ? "邮箱地址已复制。" : "Email address copied.") : copyStatus === "error" ? (isChinese ? "未能复制，请选择上方邮箱手动复制。" : "Could not copy. Please select the email address above to copy it.") : ""}</p>
              <a href={contactData.github} className={styles.githubLink} target="_blank" rel="noreferrer"><Github size={18} aria-hidden="true" /><span>GitHub <small>/ Zaki362</small></span><ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </>
        )}
      </div>

      <footer className={styles.footer}>
        <Link href={details.href} className={styles.fullPage}>{isChinese ? "查看完整页面" : "Explore the full page"}<ArrowUpRight size={16} aria-hidden="true" /></Link>
        <button type="button" className={styles.ask} onClick={onAsk}><MessageCircle size={15} aria-hidden="true" />{isChinese ? "也可以问问我的 AI 分身" : "Or ask my AI assistant"}</button>
      </footer>
    </section>
  );
}
