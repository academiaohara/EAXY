"use client";

import { RotateCcwIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { SlideBlock } from "@/lib/lesson/types";

export type ToolBlock = Extract<SlideBlock, { kind: "tool" }>;

/** Estilo común de los botones de las herramientas. */
export const TOOL_BTN =
  "rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-2 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35";

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function Slider({
  label,
  value,
  min,
  max,
  color,
  onChange,
  unit = "",
  step = 1,
  disabled = false,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  color: string;
  onChange: (v: number) => void;
  /** Sufijo del valor (« °», « mm»…). */
  unit?: string;
  step?: number;
  disabled?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
      <span className="flex items-baseline justify-between">
        <span>{label}</span>
        <span className="text-xl font-bold tabular-nums" style={{ color }}>
          {value}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: color }}
        className="w-full disabled:opacity-40"
      />
    </label>
  );
}

export function Frame({
  hint,
  onReset,
  controls,
  children,
  stacked = false,
}: {
  hint: string;
  onReset: () => void;
  controls: ReactNode;
  children: ReactNode;
  /** Controles arriba y resultado debajo, en una sola columna. */
  stacked?: boolean;
}) {
  return (
    <section
      className="flex flex-col overflow-hidden rounded-xl border border-[color:var(--stage-border,#3d4f66)] bg-[color:var(--stage-surface,#1a2332)]"
      data-testid="lesson-tool"
    >
      {stacked ? (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-5">
          <div className="flex min-w-0 flex-col gap-3">{children}</div>
          <div className="mx-auto grid w-full max-w-xl gap-x-8 gap-y-3 border-t border-[color:var(--stage-border,#3d4f66)] pt-4 sm:grid-cols-2">
            {controls}
          </div>
        </div>
      ) : (
        <div className="grid gap-5 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-8">
          <div className="flex flex-col gap-4">{controls}</div>
          <div className="flex min-w-0 flex-col gap-3">{children}</div>
        </div>
      )}
      <div className="flex items-center gap-3 border-t border-[color:var(--stage-border,#3d4f66)] bg-black/20 px-4 py-2.5">
        <p className="flex-1 text-[0.95rem] leading-snug text-[color:var(--stage-ink,#fff)]">{hint}</p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm text-[color:var(--stage-ink,#fff)] hover:bg-white/10"
        >
          <RotateCcwIcon className="size-4" aria-hidden />
          Reiniciar
        </button>
      </div>
    </section>
  );
}
