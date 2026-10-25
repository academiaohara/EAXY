"use client";

import type { ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { clamp } from "@/components/lesson/slide/tool-ui";

/** Matriz de texto con corchetes; `tint` y `mark` resaltan celdas. */
export function MatrixView({
  cells,
  label,
  tint,
  mark,
  testId,
  split,
}: {
  cells: string[][];
  label?: ReactNode;
  tint?: (i: number, j: number) => string | undefined;
  mark?: (i: number, j: number) => string | undefined;
  testId?: string;
  /** Línea vertical tras esta columna (matriz ampliada). */
  split?: number;
}) {
  return (
    <div className="inline-flex items-center gap-2" data-testid={testId}>
      {label ? <span className="text-lg font-semibold text-[color:var(--stage-muted,#b8c2d0)]">{label}</span> : null}
      <table
        className="border-collapse text-lg tabular-nums"
        style={{ borderLeft: `3px solid ${MANIM.muted}`, borderRight: `3px solid ${MANIM.muted}`, borderRadius: 6 }}
      >
        <tbody>
          {cells.map((r, i) => (
            <tr key={i}>
              {r.map((t, j) => (
                <td
                  key={j}
                  className="min-w-10 px-2 py-0.5 text-center"
                  style={{
                    color: tint?.(i, j) ?? MANIM.ink,
                    background: mark?.(i, j) ? `${mark(i, j)}33` : undefined,
                    borderLeft: split !== undefined && j === split ? `2px dashed ${MANIM.muted}` : undefined,
                    fontWeight: mark?.(i, j) ? 700 : 500,
                  }}
                >
                  {t}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Editor de matriz con campos numéricos enteros acotados. */
export function MatrixEditor({
  name,
  m,
  rows,
  cols,
  onChange,
  min = -9,
  max = 9,
  color = MANIM.blue,
}: {
  name: string;
  m: number[][];
  rows: number;
  cols: number;
  onChange: (m: number[][]) => void;
  min?: number;
  max?: number;
  color?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5" role="group" aria-label={`Matriz ${name}`}>
      <span className="text-sm font-semibold" style={{ color }}>
        {name} ({rows}×{cols})
      </span>
      <div className="inline-grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 3.6rem))` }}>
        {Array.from({ length: rows }, (_, i) =>
          Array.from({ length: cols }, (_, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              inputMode="numeric"
              aria-label={`${name}${i + 1}${j + 1}`}
              min={min}
              max={max}
              value={m[i]?.[j] ?? 0}
              onChange={(e) => {
                const v = clamp(Math.round(Number(e.target.value) || 0), min, max);
                onChange(m.map((r, a) => r.map((x, b) => (a === i && b === j ? v : x))));
              }}
              className="w-full rounded-md border border-[color:var(--stage-border,#3d4f66)] bg-black/25 px-1.5 py-1 text-center text-base tabular-nums text-[color:var(--stage-ink,#fff)]"
              style={{ borderColor: color }}
            />
          )),
        )}
      </div>
    </div>
  );
}

/** Rellena una matriz de `rows × cols` a partir de una lista plana (con valores por defecto). */
export function gridFrom(flat: number[] | undefined, start: number, rows: number, cols: number, fallback: number[][], lo = -9, hi = 9): number[][] {
  return Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => {
      const v = flat?.[start + i * cols + j];
      return Number.isFinite(v) ? clamp(Math.round(v as number), lo, hi) : (fallback[i]?.[j] ?? 0);
    }),
  );
}
