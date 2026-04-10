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
      <Reveal className="panel relative overflow-hidden rounded-[2rem] p-7 md:p-10">
        <div className="absolute inset-0">
          <Image
            src={contactData.coverImage}
            alt="郑国华在星空下"
            fill
            priority={false}
            className="object-cover object-[32%_40%] scale-[1.14] saturate-[0.84] contrast-[1.08] brightness-[0.48] hue-rotate-[4deg]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,7,18,0.42),rgba(4,7,18,0.22)_34%,rgba(4,7,18,0.68)_58%,rgba(4,7,18,0.92)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(147,197,253,0.18),transparent_18%),radial-gradient(circle_at_36%_72%,rgba(99,240,255,0.08),transparent_16%),radial-gradient(circle_at_68%_22%,rgba(129,140,248,0.12),transparent_18%)]" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="flex min-h-[440px] flex-col justify-end">
            <div className="max-w-sm">
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-sky-100/48">
                Closing Frame
              </p>
              <p className="font-display text-xl leading-8 text-slate-50/90 md:text-2xl md:leading-9">
                {contactData.closing}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <a
              href={`mailto:${contactData.email}`}
              className="interactive-card rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5 backdrop-blur-md"
            >
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Mail className="h-4 w-4" />
              </div>
              <p className="mb-1 text-xs uppercase tracking-[0.26em] text-slate-500">Email</p>
              <p className="text-sm text-slate-100/86">{contactData.email}</p>
            </a>

            <a
              href={`tel:${contactData.phone.replace(/[\s-]/g, "")}`}
              className="interactive-card rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5 backdrop-blur-md"
            >
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Phone className="h-4 w-4" />
              </div>
              <p className="mb-1 text-xs uppercase tracking-[0.26em] text-slate-500">Phone</p>
              <p className="text-sm text-slate-100/86">{contactData.phone}</p>
            </a>

            <Link
              href={contactData.github}
              target="_blank"
              rel="noreferrer"
              className="interactive-card rounded-[1.5rem] border border-white/10 bg-slate-950/30 p-5 backdrop-blur-md"
            >
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Github className="h-4 w-4" />
              </div>
              <p className="mb-1 text-xs uppercase tracking-[0.26em] text-slate-500">GitHub</p>
              <p className="text-sm text-slate-100/86">预留仓库链接</p>
            </Link>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
