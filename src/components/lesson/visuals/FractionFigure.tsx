"use client";

import type { KeyboardEvent } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";
import type { FractionFigureVisual, FractionShape, VisualTone } from "@/lib/lesson/types";

const toneFill: Record<VisualTone, { fill: string; border: string; svg: string }> = {
  cobalt: { fill: "bg-cobalt", border: "border-cobalt", svg: "fill-cobalt" },
  emerald: { fill: "bg-emerald-500", border: "border-emerald-500", svg: "fill-emerald-500" },
  amber: { fill: "bg-amber-400", border: "border-amber-400", svg: "fill-amber-400" },
  violet: { fill: "bg-violet-500", border: "border-violet-500", svg: "fill-violet-500" },
  rose: { fill: "bg-rose-400", border: "border-rose-400", svg: "fill-rose-400" },
};

type FractionFigureProps = {
  shape: FractionShape;
  parts: number;
  wholes: number;
  /** Partes coloreadas, una entrada por parte de todas las unidades. */
  marked: boolean[];
  onToggle?: (index: number) => void;
  disabled?: boolean;
  columns?: number;
  itemLabel?: string;
  /** Texto dentro de cada parte de barras, cuadrículas y conjuntos. */
  labels?: string[];
  tone?: VisualTone;
  status?: "correct" | "incorrect" | null;
  className?: string;
};

function pressKey(event: KeyboardEvent, action: () => void) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    action();
  }
}

function sliceMaxSize(parts: number): string {
  if (parts > 16) {
    return "max-w-[34rem]";
  }
  return parts > 8 ? "max-w-[28rem]" : "max-w-[22rem]";
}

function piePath(index: number, parts: number): string {
  const start = (index / parts) * 2 * Math.PI - Math.PI / 2;
  const end = ((index + 1) / parts) * 2 * Math.PI - Math.PI / 2;
  const r = 48;
  const x1 = 50 + r * Math.cos(start);
  const y1 = 50 + r * Math.sin(start);
  const x2 = 50 + r * Math.cos(end);
  const y2 = 50 + r * Math.sin(end);
  const largeArc = end - start > Math.PI ? 1 : 0;
  return `M50 50 L${x1.toFixed(3)} ${y1.toFixed(3)} A${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(3)} ${y2.toFixed(3)} Z`;
}

/**
 * Una o varias unidades partidas en trozos iguales. Con `onToggle` cada trozo
 * es un botón que el alumno colorea o descolorea al tocarlo.
 */
export function FractionFigure({
  shape,
  parts,
  wholes,
  marked,
  onToggle,
  disabled = false,
  columns,
  itemLabel = "parte",
  labels,
  tone = "cobalt",
  status = null,
  className,
}: FractionFigureProps) {
  const interactive = Boolean(onToggle) && !disabled;
  const colors = toneFill[tone];
  const frame = cn(
    "transition-colors",
    status === "correct" && "ring-4 ring-emerald-300/70",
    status === "incorrect" && "ring-4 ring-amber-300/80 animate-shake",
  );

  const labelFor = (whole: number, part: number) =>
    wholes > 1 ? `${itemLabel} ${part + 1} de la unidad ${whole + 1}` : `${itemLabel} ${part + 1}`;

  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-4 sm:gap-6", className)}
      data-testid="fraction-figure"
    >
      {Array.from({ length: wholes }, (_, whole) => {
        const offset = whole * parts;
        const pieces = Array.from({ length: parts }, (_, part) => ({
          index: offset + part,
          on: Boolean(marked[offset + part]),
          label: labels?.[offset + part] ? `${itemLabel} ${labels[offset + part]}` : labelFor(whole, part),
          text: labels?.[offset + part],
        }));

        if (shape === "circle") {
          return (
            <svg
              key={whole}
              viewBox="0 0 100 100"
              className={cn("size-40 rounded-full sm:size-48", frame)}
              role="group"
              aria-label={wholes > 1 ? `Unidad ${whole + 1}` : "Unidad"}
            >
              {pieces.map((piece, part) => {
                const pieceClass = cn(
                  "stroke-white stroke-[1.5] transition-[fill]",
                  piece.on ? colors.svg : "fill-slate-100",
                  interactive && "cursor-pointer hover:opacity-85 focus:outline-none focus-visible:opacity-70",
                );
                const pieceProps = {
                  className: pieceClass,
                  "data-testid": "fraction-piece",
                  "data-on": piece.on,
                  ...(interactive
                    ? {
                        role: "button",
                        tabIndex: 0,
                        "aria-pressed": piece.on,
                        "aria-label": piece.label,
                        onClick: () => onToggle?.(piece.index),
                        onKeyDown: (event: KeyboardEvent) => pressKey(event, () => onToggle?.(piece.index)),
                      }
                    : {}),
                };
                return parts === 1 ? (
                  <circle key={piece.index} cx="50" cy="50" r="48" {...pieceProps} />
                ) : (
                  <path key={piece.index} d={piePath(part, parts)} {...pieceProps} />
                );
              })}
              <circle cx="50" cy="50" r="48" className="pointer-events-none fill-none stroke-slate-300" />
            </svg>
          );
        }

        const cols =
          shape === "bar" ? parts : columns ?? (shape === "grid" ? Math.ceil(Math.sqrt(parts)) : Math.min(parts, 6));

        return (
          <div
            key={whole}
            role="group"
            aria-label={wholes > 1 ? `Unidad ${whole + 1}` : "Unidad"}
            className={cn(
              "grid w-full",
              shape === "bar" && cn("h-16 overflow-hidden rounded-xl border-2 border-slate-300 sm:h-20", sliceMaxSize(parts)),
              shape === "grid" && "max-w-[16rem] gap-1 rounded-xl border-2 border-slate-300 bg-slate-300 p-1",
              shape === "set" && "max-w-[22rem] gap-2.5 rounded-2xl border-2 border-dashed border-slate-300 p-3 sm:gap-3",
              frame,
            )}
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {pieces.map((piece, part) => {
              const common = cn(
                "flex items-center justify-center font-heading text-lg font-semibold transition-all",
                piece.on ? "text-white" : "text-ink",
                interactive && "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/50",
                shape === "bar" && cn("h-full", part > 0 && "border-l-2", piece.on ? "border-white/70" : "border-slate-300"),
                shape === "grid" && "aspect-square rounded-[3px]",
                shape === "set" && "aspect-square rounded-full border-2",
                piece.on
                  ? cn(colors.fill, shape === "set" && colors.border)
                  : cn(
                      shape === "set" ? "border-slate-300 bg-white" : "bg-slate-50",
                      interactive && "hover:bg-cobalt-tint/60",
                    ),
                piece.on && shape === "set" && "scale-105 shadow-sm",
              );

              if (!onToggle) {
                return (
                  <span key={piece.index} className={common} data-testid="fraction-piece" data-on={piece.on}>
                    {piece.text}
                  </span>
                );
              }

              return (
                <button
                  key={piece.index}
                  type="button"
                  disabled={disabled}
                  onClick={() => onToggle(piece.index)}
                  aria-pressed={piece.on}
                  aria-label={piece.label}
                  className={cn(common, "disabled:cursor-default")}
                  data-testid="fraction-piece"
                  data-on={piece.on}
                >
                  {piece.text}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/** Ayuda visual estática: una figura con la fracción ya coloreada. */
export function FractionFigureVisualBlock({ visual }: { visual: FractionFigureVisual }) {
  const wholes = Math.max(visual.wholes ?? 1, Math.ceil(visual.shaded / visual.parts), 1);
  const marked = Array.from({ length: wholes * visual.parts }, (_, index) => index < visual.shaded);

  return (
    <div className="space-y-3">
      {visual.title ? (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          <MathRenderer text={visual.title} />
        </p>
      ) : null}
      <FractionFigure
        shape={visual.shape}
        parts={visual.parts}
        wholes={wholes}
        marked={marked}
        columns={visual.columns}
        tone={visual.tone}
      />
      {visual.caption ? (
        <p className="text-center text-sm text-ink-muted">
          <MathRenderer text={visual.caption} />
        </p>
      ) : null}
    </div>
  );
}
