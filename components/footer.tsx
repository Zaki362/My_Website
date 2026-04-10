import { footerText } from "@/data/profile";

export function Footer() {
  return (
    <footer className="container-shell py-10">
      <div className="border-t border-white/8 pt-6 text-sm text-slate-400">{footerText}</div>
    </footer>
  );
}
