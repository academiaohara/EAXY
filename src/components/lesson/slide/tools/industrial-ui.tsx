"use client";

import type { ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { TOOL_BTN, clamp } from "@/components/lesson/slide/tool-ui";

/** Valor numérico acotado; un parámetro ausente o absurdo cae al valor por defecto. */
export const num = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Number.isFinite(v) ? (v as number) : fallback, lo, hi);

/** Número con coma decimal y miles separados con espacio fino (como en los libros). */
export function fmtEs(value: number, max = 2): string {
  if (!Number.isFinite(value)) {
    return "—";
  }
  const fixed = value.toFixed(max);
  const trimmed = fixed.includes(".") ? fixed.replace(/0+$/, "").replace(/\.$/, "") : fixed;
  const [int, dec] = trimmed.split(".");
  const grouped = int!.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return dec ? `${grouped},${dec}` : grouped;
}

/** Cifra destacada con color. */
export function Stat({ color, children, label }: { color: string; children: ReactNode; label?: string }) {
  return (
    <span className="inline-flex flex-col">
      {label ? <span className="text-xs uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">{label}</span> : null}
      <span className="text-xl font-bold tabular-nums" style={{ color }}>
        {children}
      </span>
    </span>
  );
}

/** Fila de botones de elección (uno activo). */
export function Choice<T extends string | number>({
  items,
  value,
  onChange,
  label,
}: {
  items: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 sm:col-span-2">
      {label ? <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">{label}</span> : null}
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {items.map((it) => {
          const active = it.value === value;
          return (
            <button
              key={String(it.value)}
              type="button"
              aria-pressed={active}
              className={`${TOOL_BTN} ${active ? "border-[color:var(--stage-ink,#fff)] bg-white/15" : ""}`}
              onClick={() => onChange(it.value)}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Barra horizontal partida en tramos proporcionales (fracciones de fase, reparto de energía…). */
export function SplitBar({
  parts,
  height = 34,
}: {
  parts: { value: number; color: string; label: string }[];
  height?: number;
}) {
  const total = parts.reduce((a, p) => a + Math.max(0, p.value), 0) || 1;
  return (
    <div className="flex w-full overflow-hidden rounded-md border border-[color:var(--stage-border,#3d4f66)]" style={{ height }} data-testid="tool-splitbar">
      {parts.map((p) => {
        const w = (Math.max(0, p.value) / total) * 100;
        return (
          <div
            key={p.label}
            className="anim-t flex items-center justify-center overflow-hidden whitespace-nowrap text-sm font-bold"
            style={{ width: `${w}%`, background: p.color, color: MANIM.surface }}
            title={p.label}
          >
            {w > 12 ? p.label : ""}
          </div>
        );
      })}
    </div>
  );
}

/** Texto explicativo bajo el resultado. */
export function Note({ children }: { children: ReactNode }) {
  return <p className="text-base leading-snug text-[color:var(--stage-ink,#fff)]">{children}</p>;
}
