import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  kicker: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  kicker,
  title,
  description,
  children
}: SectionShellProps) {
  return (
    <section id={id} className="container-shell relative py-18 md:py-28">
      <div className="section-frame mb-12 pl-0 md:mb-16">
        <p className="section-kicker mb-4 pt-5">{kicker}</p>
        <h2 className="section-title mb-5 max-w-5xl leading-[1.12]">{title}</h2>
        {description ? <p className="section-copy">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
