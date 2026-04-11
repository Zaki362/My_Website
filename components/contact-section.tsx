import Image from "next/image";
import Link from "next/link";
import { Github, Mail, Phone } from "lucide-react";
import { contactData } from "@/data/profile";
import { Reveal } from "@/components/reveal";
import { SectionShell } from "@/components/section-shell";

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      kicker="Contact"
      title={contactData.title}
      description={contactData.description}
    >
      <Reveal className="panel relative overflow-hidden rounded-[2.2rem] p-7 md:p-10">
        <div className="absolute inset-0">
          <Image
            src={contactData.coverImage}
            alt="郑国华在星空下"
            fill
            priority={false}
            className="object-cover object-[32%_40%] scale-[1.14] saturate-[0.82] contrast-[1.06] brightness-[0.45] hue-rotate-[4deg]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,18,0.36),rgba(4,7,18,0.16)_28%,rgba(4,7,18,0.56)_52%,rgba(4,7,18,0.9)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(147,197,253,0.18),transparent_18%),radial-gradient(circle_at_36%_72%,rgba(99,240,255,0.08),transparent_16%),radial-gradient(circle_at_68%_22%,rgba(129,140,248,0.12),transparent_18%)]" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="flex min-h-[460px] flex-col justify-end">
            <div className="max-w-md">
              <p className="mb-3 text-[11px] uppercase tracking-[0.32em] text-sky-100/44">
                Closing Frame
              </p>
              <p className="font-display text-xl leading-8 text-slate-50/90 md:text-[1.95rem] md:leading-[2.7rem]">
                {contactData.closing}
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:pl-10">
            <a
              href={`mailto:${contactData.email}`}
              className="interactive-card rounded-[1.55rem] border border-white/10 bg-slate-950/28 p-5 backdrop-blur-md"
            >
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Mail className="h-4 w-4" />
              </div>
              <p className="meta-label mb-1">Email</p>
              <p className="text-sm text-slate-100/84">{contactData.email}</p>
            </a>

            <a
              href={`tel:${contactData.phone.replace(/[\s-]/g, "")}`}
              className="interactive-card rounded-[1.55rem] border border-white/10 bg-slate-950/28 p-5 backdrop-blur-md"
            >
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Phone className="h-4 w-4" />
              </div>
              <p className="meta-label mb-1">Phone</p>
              <p className="text-sm text-slate-100/84">{contactData.phone}</p>
            </a>

            <Link
              href={contactData.github}
              target="_blank"
              rel="noreferrer"
              className="interactive-card rounded-[1.55rem] border border-white/10 bg-slate-950/28 p-5 backdrop-blur-md"
            >
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Github className="h-4 w-4" />
              </div>
              <p className="meta-label mb-1">GitHub</p>
              <p className="text-sm text-slate-100/84">查看公开项目与后续更新</p>
            </Link>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
