import { footerText } from "@/data/profile";

export function Footer() {
  return (
    <footer className="container-shell py-10 md:py-12">
      <div className="border-t border-white/8 pt-6 text-sm tracking-[0.08em] text-slate-400/88">
        {footerText}
      </div>
    </footer>
  );
}
