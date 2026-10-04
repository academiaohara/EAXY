"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const CHIP = 52;

export function Chip({
  color,
  className,
  label,
}: {
  color: "cobalt" | "violet" | "amber" | "rose" | "emerald";
  className?: string;
  label?: string;
}) {
  const fills: Record<typeof color, string> = {
    cobalt: "#4353FF",
    violet: "#7C4DFF",
    amber: "#F5A623",
    rose: "#E85D9A",
    emerald: "#22C55E",
  };
  return (
    <svg
      width={CHIP}
      height={CHIP}
      viewBox="0 0 52 52"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={label ?? "Ficha"}
    >
      <circle cx="26" cy="26" r="24" fill={fills[color]} />
      <circle cx="26" cy="26" r="24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" />
    </svg>
  );
}

export function DotGrid({
  rows,
  cols,
  color = "amber",
  className,
}: {
  rows: number;
  cols: number;
  color?: "cobalt" | "violet" | "amber" | "rose" | "emerald";
  className?: string;
}) {
  const dot = 14;
  const gap = 6;
  const w = cols * dot + (cols - 1) * gap + 16;
  const h = rows * dot + (rows - 1) * gap + 16;
  const fills: Record<string, string> = {
    cobalt: "#4353FF",
    violet: "#7C4DFF",
    amber: "#F5A623",
    rose: "#E85D9A",
    emerald: "#22C55E",
  };
  const fill = fills[color] ?? fills.amber;
  const dots: { x: number; y: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({
        x: 8 + c * (dot + gap) + dot / 2,
        y: 8 + r * (dot + gap) + dot / 2,
      });
    }
  }
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      <rect x="0" y="0" width={w} height={h} rx="12" fill="rgba(67,83,255,0.08)" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={dot / 2} fill={fill} />
      ))}
    </svg>
  );
}

export function ParenthesisCrate({
  active,
  children,
  className,
}: {
  active?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border-4 px-3 py-2 transition-all duration-500 ease-out",
        active ? "border-rose bg-rose/10 scale-105 shadow-md" : "border-violet/50 bg-violet/5",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute -left-3 top-1/2 -translate-y-1/2 font-serif text-4xl font-bold text-violet"
        aria-hidden
      >
        (
      </span>
      <span
        className="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2 font-serif text-4xl font-bold text-violet"
        aria-hidden
      >
        )
      </span>
      <div className="flex items-center justify-center gap-2 px-4">{children}</div>
    </div>
  );
}

export function SharePlates({
  total,
  plates,
  highlight,
  className,
}: {
  total: number;
  plates: number;
  highlight?: "share" | "done" | null;
  className?: string;
}) {
  const perPlate = total / plates;
  return (
    <div className={cn("flex flex-wrap items-end justify-center gap-3", className)} aria-hidden>
      {Array.from({ length: plates }, (_, p) => (
        <div key={p} className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "flex min-h-[3.5rem] min-w-[3.5rem] flex-wrap items-center justify-center gap-1 rounded-full border-4 p-2 transition-all duration-500 ease-out",
              highlight === "share" ? "border-cobalt bg-cobalt-tint" : "border-slate-200 bg-white",
              highlight === "done" && "border-emerald bg-emerald/10",
            )}
          >
            {Array.from({ length: perPlate }, (_, i) => (
              <Chip key={i} color="amber" className="!h-8 !w-8" />
            ))}
          </div>
          <span className="text-xs font-semibold text-ink-muted">Plato {p + 1}</span>
        </div>
      ))}
    </div>
  );
}

export function OpBadge({
  op,
  active,
  onClick,
  disabled,
  label,
}: {
  op: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  label: string;
}) {
  const body = (
    <span
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl px-4 text-xl font-bold transition-all duration-300 ease-out",
        active ? "bg-cobalt text-white shadow-md scale-105" : "bg-white text-cobalt border-2 border-cobalt/25",
        onClick && !disabled && "hover:border-cobalt cursor-pointer",
        disabled && "opacity-50",
      )}
    >
      {op}
    </span>
  );
  if (!onClick) {
    return body;
  }
  return (
    <button type="button" className="touch-manipulation" onClick={onClick} disabled={disabled} aria-label={label}>
      {body}
    </button>
  );
}

export function TierStep({
  step,
  title,
  active,
  children,
}: {
  step: number;
  title: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-3 transition-all duration-700 ease-out",
        active ? "border-cobalt bg-cobalt-tint scale-[1.02] shadow-sm" : "border-transparent opacity-40",
      )}
    >
      <span className="text-xs font-bold uppercase tracking-wide text-cobalt">{step}º</span>
      <p className="text-center text-sm font-semibold text-ink">{title}</p>
      {children}
    </div>
  );
}
