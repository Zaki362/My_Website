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
    <section id={id} className="container-shell relative py-14 md:py-24">
      <div className="mb-10 md:mb-14">
        <p className="section-kicker mb-4">{kicker}</p>
        <h2 className="section-title mb-5">{title}</h2>
        {description ? <p className="section-copy">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
