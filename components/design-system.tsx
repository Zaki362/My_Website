import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

type WithChildren = {
  children: ReactNode;
  className?: string;
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ children, className }: WithChildren) {
  return <div className={cn("container-shell", className)}>{children}</div>;
}

export function Section({
  id,
  children,
  className
}: WithChildren & {
  id: string;
}) {
  return (
    <section className={cn("container-shell relative py-32 lg:py-40", className)}>
      <span id={id} className="block h-px" aria-hidden="true" />
      {children}
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  description,
  action,
  className
}: {
  kicker: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between", className)}>
      <div className="max-w-3xl">
        <p className="section-kicker mb-4">{kicker}</p>
        <h2 className="section-title">{title}</h2>
        {description ? <p className="section-copy mt-5">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
  className
}: WithChildren & {
  tone?: "neutral" | "blue" | "cyan" | "purple" | "dark";
}) {
  const tones = {
    neutral: "border-stone-900/10 bg-[#fffdfa]/75 text-stone-500",
    blue: "border-blue-500/10 bg-blue-500/[0.075] text-blue-700",
    cyan: "border-cyan-500/10 bg-cyan-400/[0.08] text-cyan-700",
    purple: "border-violet-500/10 bg-violet-500/[0.08] text-violet-700",
    dark: "border-white/10 bg-white/10 text-stone-100"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase",
        tones[tone],
        className
      )}
      style={{ letterSpacing: "0.12em" }}
    >
      {children}
    </span>
  );
}

export function Card({ children, className }: WithChildren) {
  return (
    <div className={cn("interactive-card rounded-[1.75rem] border border-border bg-surface shadow-panel", className)}>
      {children}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external
}: WithChildren & {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  external?: boolean;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-300",
    variant === "primary" && "bg-[#2b2933] text-[#fffaf2] shadow-[0_14px_40px_rgba(61,50,38,0.16)] hover:bg-[#24222b]",
    variant === "secondary" && "border border-stone-900/10 bg-[#fffdfa]/75 text-stone-800 hover:border-stone-900/20 hover:bg-[#fffdfa]",
    variant === "ghost" && "text-stone-600 hover:text-stone-950",
    variant === "dark" && "border border-white/10 bg-white/10 text-[#fffaf2] hover:bg-white/20",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Metric({
  value,
  label,
  dark = false,
  className
}: {
  value: string;
  label: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className={cn("font-display text-3xl font-semibold leading-none md:text-4xl", dark ? "text-[#fffaf2]" : "text-stone-950")}>
        {value}
      </div>
      <div className={cn("mt-2 text-sm leading-6", dark ? "text-stone-300/80" : "text-stone-500")}>{label}</div>
    </div>
  );
}

export function IconFrame({
  icon: Icon,
  dark = false,
  className
}: {
  icon: ComponentType<{ className?: string }>;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border",
        dark ? "border-white/10 bg-white/10 text-[#fffaf2]" : "border-stone-900/10 bg-[#f7f2e9] text-stone-700",
        className
      )}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}
