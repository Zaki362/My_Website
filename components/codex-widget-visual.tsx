import { Gauge } from "lucide-react";
import { cn } from "@/components/design-system";
import type { ProjectLocale } from "@/data/projects";

function ProgressRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold text-stone-600 sm:text-xs">{label}</span>
        <span className="font-display text-base font-semibold text-stone-950 sm:text-lg">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-900/[0.075]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#52ba71] to-[#2f9f61]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function TrendChart({ locale }: { locale: ProjectLocale }) {
  return (
    <div className="min-w-0 border-l border-stone-900/10 pl-4 sm:pl-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold uppercase text-stone-500" style={{ letterSpacing: "0.08em" }}>
            {locale === "zh" ? "近 5 天趋势" : "5-day trend"}
          </p>
          <p className="mt-1 text-[9px] text-stone-400 sm:text-[10px]">{locale === "zh" ? "示意数据" : "Demo data"}</p>
        </div>
        <span className="text-[10px] font-medium text-stone-500">42.6M</span>
      </div>
      <svg viewBox="0 0 180 64" className="mt-3 h-14 w-full overflow-visible" aria-hidden="true">
        <path d="M0 54H180M0 31H180M0 8H180" stroke="rgba(23,23,23,0.08)" strokeWidth="1" />
        <path
          d="M5 50 C28 48 37 54 55 45 C73 35 82 37 97 27 C113 17 121 8 138 12 C151 15 150 45 175 47"
          fill="none"
          stroke="#35a861"
          strokeLinecap="round"
          strokeWidth="4"
        />
        {[5, 55, 97, 138, 175].map((cx, index) => (
          <circle key={cx} cx={cx} cy={[50, 45, 27, 12, 47][index]} r="3.5" fill="#35a861" />
        ))}
      </svg>
    </div>
  );
}

function WidgetHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-stone-950">
        <span className={cn("inline-flex items-center justify-center rounded-full bg-[#e6f6ea] text-[#31a85e]", compact ? "h-7 w-7" : "h-8 w-8")}>
          <Gauge className={compact ? "h-4 w-4" : "h-[1.125rem] w-[1.125rem]"} />
        </span>
        <span className={cn("font-display font-semibold", compact ? "text-sm" : "text-base")}>Codex</span>
      </div>
      <span className="rounded-md border border-stone-900/[0.07] bg-white/70 px-2 py-1 text-[9px] font-medium uppercase text-stone-400" style={{ letterSpacing: "0.08em" }}>
        Demo
      </span>
    </div>
  );
}

function MediumWidget({ locale, compact = false }: { locale: ProjectLocale; compact?: boolean }) {
  return (
    <div
      className={cn(
        "border border-white/80 bg-white/[0.9] shadow-[0_24px_65px_rgba(49,57,51,0.14)] backdrop-blur-md",
        compact ? "rounded-[1.35rem] p-4" : "rounded-[1.65rem] p-5 sm:p-6"
      )}
    >
      <WidgetHeader compact={compact} />
      <div className={cn("mt-4 grid items-end", compact ? "grid-cols-[0.88fr_1.12fr] gap-4" : "grid-cols-[0.82fr_1.18fr] gap-5")}>
        <div className="space-y-3">
          <ProgressRow label={locale === "zh" ? "5 小时" : "5 hours"} value={72} />
          <ProgressRow label={locale === "zh" ? "周限额" : "Weekly"} value={64} />
        </div>
        <TrendChart locale={locale} />
      </div>
    </div>
  );
}

function SmallWidget({ locale }: { locale: ProjectLocale }) {
  return (
    <div className="rounded-[1.5rem] border border-white/80 bg-white/[0.92] p-5 shadow-[0_22px_55px_rgba(49,57,51,0.16)] backdrop-blur-md">
      <WidgetHeader compact />
      <div className="mt-4 space-y-3">
        <ProgressRow label={locale === "zh" ? "5 小时" : "5 hours"} value={72} />
        <ProgressRow label={locale === "zh" ? "周限额" : "Weekly"} value={64} />
      </div>
    </div>
  );
}

export function CodexWidgetVisual({ locale, compact = false }: { locale: ProjectLocale; compact?: boolean }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden bg-[#e6ebe5]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 12%, rgba(109,91,208,0.14), transparent 30%), radial-gradient(circle at 84% 82%, rgba(47,143,152,0.18), transparent 34%), linear-gradient(135deg, #edf0ea 0%, #e4eae3 100%)"
      }}
    >
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(70,80,72,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(70,80,72,0.08) 1px, transparent 1px)",
          backgroundSize: compact ? "32px 32px" : "44px 44px"
        }}
        aria-hidden="true"
      />

      {compact ? (
        <div className="absolute inset-x-[5%] top-1/2 -translate-y-1/2 transition duration-700 ease-out group-hover:scale-[1.025]">
          <MediumWidget locale={locale} compact />
        </div>
      ) : (
        <>
          <div className="absolute inset-x-[5%] top-[8%] sm:inset-x-[6%]">
            <MediumWidget locale={locale} />
          </div>
          <div className="absolute bottom-[7%] left-[9%] hidden w-[42%] sm:block">
            <SmallWidget locale={locale} />
          </div>
          <div className="absolute bottom-[9%] right-[8%] max-w-[42%] rounded-xl border border-white/70 bg-white/60 px-3 py-2 text-right backdrop-blur sm:px-4 sm:py-3">
            <p className="text-[9px] font-semibold uppercase text-stone-500" style={{ letterSpacing: "0.09em" }}>
              {locale === "zh" ? "本地解析 · 脱敏缓存" : "Local parse · sanitized cache"}
            </p>
            <p className="mt-1 hidden text-[10px] leading-4 text-stone-500 sm:block">
              {locale === "zh" ? "认证信息不进入 Widget 展示层" : "Credentials stay outside the widget layer"}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
