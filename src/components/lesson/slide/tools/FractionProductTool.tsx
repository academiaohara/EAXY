"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";

export const FRACTION_TOOL_MAX_DEN = 8;
const DEFAULT_VALUES = [3, 4, 2, 5] as const;

type Values = { a: number; b: number; c: number; d: number };

function gcd(x: number, y: number): number {
  return y === 0 ? x : gcd(y, x % y);
}

/** Mantiene las fracciones propias y dentro de los límites: 1 ≤ den ≤ 8 y 0 ≤ num ≤ den. */
export function clampFractionValues(v: Values): Values {
  const b = Math.min(FRACTION_TOOL_MAX_DEN, Math.max(1, Math.round(v.b)));
  const d = Math.min(FRACTION_TOOL_MAX_DEN, Math.max(1, Math.round(v.d)));
  return {
    a: Math.min(b, Math.max(0, Math.round(v.a))),
    b,
    c: Math.min(d, Math.max(0, Math.round(v.c))),
    d,
  };
}

function fromInitial(initial?: number[]): Values {
  const [a, b, c, d] = initial && initial.length >= 4 ? initial : DEFAULT_VALUES;
  return clampFractionValues({ a: a!, b: b!, c: c!, d: d! });
}

type StepperProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  color: string;
  onChange: (next: number) => void;
};

function Stepper({ label, value, min, max, color, onChange }: StepperProps) {
  const btn =
    "flex size-8 items-center justify-center rounded-md border border-[color:var(--stage-border,#3d4f66)] text-[color:var(--stage-ink,#fff)] transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35";
  return (
    <div className="flex items-center gap-1.5">
      <button type="button" className={btn} aria-label={`Menos ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}>
        <MinusIcon className="size-4" aria-hidden />
      </button>
      <span className="w-7 text-center text-xl font-bold tabular-nums" style={{ color }} data-testid={`fraction-tool-${label}`}>
        {value}
      </span>
      <button type="button" className={btn} aria-label={`Más ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>
        <PlusIcon className="size-4" aria-hidden />
      </button>
    </div>
  );
}

const SIZE = 240;

/**
 * Manipulable del producto de fracciones: el cuadrado unidad se parte en columnas (primera
 * fracción) y filas (segunda); la zona donde se solapan es el producto.
 */
export function FractionProductTool({ initial }: { initial?: number[] }) {
  const [values, setValues] = useState<Values>(() => fromInitial(initial));
  const { a, b, c, d } = values;
  const set = (patch: Partial<Values>) => setValues((v) => clampFractionValues({ ...v, ...patch }));

  const num = a * c;
  const den = b * d;
  const g = num === 0 ? den : gcd(num, den);
  const simple = num === 0 ? "0" : `\\dfrac{${num / g}}{${den / g}}`;
  const cw = SIZE / b;
  const ch = SIZE / d;

  return (
    <div
      className="rounded-xl border border-[color:var(--stage-border,#3d4f66)] bg-black/25 px-5 py-4"
      data-slide-block="tool"
      data-testid="fraction-product-tool"
    >
      <p className="mb-3 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
        Cambia los numeradores y los denominadores y observa qué zona queda en amarillo.
      </p>
      <div className="flex flex-wrap items-start gap-6">
        <svg viewBox={`-4 -4 ${SIZE + 8} ${SIZE + 8}`} className="w-60 shrink-0" role="img" aria-label={`Cuadrado unidad con ${num} de ${den} partes en la zona solapada`}>
          <rect x={0} y={0} width={SIZE} height={SIZE} fill="#222f43" stroke="#fff" strokeWidth={3} rx={3} />
          <rect x={0} y={0} width={a * cw} height={SIZE} fill="#58c4dd" fillOpacity={0.4} />
          <rect x={0} y={0} width={SIZE} height={c * ch} fill="#83c167" fillOpacity={0.4} />
          <rect x={0} y={0} width={a * cw} height={c * ch} fill="#ffd866" fillOpacity={0.7} />
          {Array.from({ length: b - 1 }, (_, i) => (
            <line key={`c${i}`} x1={(i + 1) * cw} x2={(i + 1) * cw} y1={0} y2={SIZE} stroke="#58c4dd" strokeWidth={2} />
          ))}
          {Array.from({ length: d - 1 }, (_, j) => (
            <line key={`r${j}`} x1={0} x2={SIZE} y1={(j + 1) * ch} y2={(j + 1) * ch} stroke="#83c167" strokeWidth={2} />
          ))}
          <rect x={0} y={0} width={SIZE} height={SIZE} fill="none" stroke="#fff" strokeWidth={3} rx={3} />
        </svg>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-5">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <Stepper label="numerador 1" value={a} min={0} max={b} color="#58c4dd" onChange={(n) => set({ a: n })} />
              <div className="h-0.5 w-full rounded bg-[color:var(--stage-ink,#fff)]" />
              <Stepper label="denominador 1" value={b} min={1} max={FRACTION_TOOL_MAX_DEN} color="#58c4dd" onChange={(n) => set({ b: n })} />
            </div>
            <span className="text-2xl text-[color:var(--stage-ink,#fff)]">·</span>
            <div className="flex flex-col items-center gap-2">
              <Stepper label="numerador 2" value={c} min={0} max={d} color="#83c167" onChange={(n) => set({ c: n })} />
              <div className="h-0.5 w-full rounded bg-[color:var(--stage-ink,#fff)]" />
              <Stepper label="denominador 2" value={d} min={1} max={FRACTION_TOOL_MAX_DEN} color="#83c167" onChange={(n) => set({ d: n })} />
            </div>
          </div>
          <div className="text-xl text-[color:var(--stage-ink,#fff)]" data-testid="fraction-tool-result">
            <MathRenderer text={`$\\dfrac{${a}}{${b}} \\cdot \\dfrac{${c}}{${d}} = \\dfrac{${num}}{${den}}${g > 1 || num === 0 ? ` = ${simple}` : ""}$`} />
          </div>
        </div>
      </div>
    </div>
  );
}
