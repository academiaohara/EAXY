"use client";

import { useEffect, useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import type { NumberLineVisual as NumberLineConfig, VisualTone } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

const toneDot: Record<VisualTone, string> = {
  cobalt: "bg-cobalt ring-cobalt/30",
  emerald: "bg-emerald-500 ring-emerald-300",
  amber: "bg-amber-500 ring-amber-300",
  violet: "bg-violet-500 ring-violet-300",
  rose: "bg-rose-500 ring-rose-300",
};

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

type Props = { visual: NumberLineConfig };

export function NumberLineVisualBlock({ visual }: Props) {
  const step = visual.step ?? 1;
  const ticks = useMemo(() => {
    const values: number[] = [];
    for (let n = visual.min; n <= visual.max; n += step) {
      values.push(n);
    }
    return values;
  }, [visual.max, visual.min, step]);

  const span = visual.max - visual.min || 1;
  const toPercent = (value: number) => ((value - visual.min) / span) * 100;

  const pointValues = visual.points?.map((p) => p.value) ?? [];
  const absN = visual.absValue;
  const cycleItems = absN !== undefined ? [...pointValues, absN] : pointValues;
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual || cycleItems.length <= 1 || prefersReducedMotion()) {
      return;
    }
    const timer = window.setInterval(() => setActive((c) => (c + 1) % cycleItems.length), 2200);
    return () => window.clearInterval(timer);
  }, [cycleItems.length, manual]);

  const highlightValue = cycleItems[active];

  return (
    <div className="space-y-3" data-testid="lesson-visual-number-line-inner">
      {visual.title ? (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          <MathRenderer text={visual.title} />
        </p>
      ) : null}
      <div className="relative mx-2 mt-6 pb-8 pt-2">
        {absN !== undefined && highlightValue === absN ? (
          <div
            className="lesson-visual-rise absolute top-[2.15rem] h-1.5 rounded-full bg-violet-300/80 transition-all duration-500"
            style={{
              left: `${toPercent(Math.min(0, absN))}%`,
              width: `${Math.abs(toPercent(absN) - toPercent(0))}%`,
            }}
            aria-hidden
          />
        ) : null}
        <div className="relative h-1 rounded-full bg-slate-300" aria-hidden />
        {ticks.map((n) => (
          <div
            key={n}
            className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${toPercent(n)}%` }}
          >
            <div className={cn("h-3 w-0.5", n === 0 ? "bg-ink" : "bg-slate-400")} />
            <span
              className={cn(
                "mt-1 text-[10px] font-medium tabular-nums sm:text-xs",
                n === 0 ? "font-bold text-ink" : "text-ink-muted",
              )}
            >
              {n > 0 && visual.showPositiveSign !== false
                ? `+${n.toLocaleString("es-ES")}`
                : n.toLocaleString("es-ES")}
            </span>
          </div>
        ))}
        {visual.points?.map((point) => {
          const tone = point.tone ?? (point.value < 0 ? "rose" : "emerald");
          const isHighlighted = highlightValue === point.value;
          return (
            <button
              key={`${point.value}-${point.label ?? ""}`}
              type="button"
              className="absolute top-[-0.35rem] -translate-x-1/2 transition-transform duration-300"
              style={{ left: `${toPercent(point.value)}%` }}
              onClick={() => {
                setManual(true);
                setActive(pointValues.indexOf(point.value));
              }}
              aria-label={point.label ?? String(point.value)}
            >
              <span
                className={cn(
                  "block size-3.5 rounded-full ring-2 ring-white transition-transform",
                  toneDot[tone],
                  isHighlighted && "scale-125 shadow-md",
                )}
              />
              {point.label ? (
                <span
                  className={cn(
                    "lesson-point-pop absolute -top-6 left-1/2 max-w-[5rem] -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold",
                    isHighlighted ? "text-ink" : "text-ink-muted",
                  )}
                >
                  <MathRenderer text={point.label} />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {absN !== undefined ? (
        <p className="text-center text-sm text-ink-muted">
          <MathRenderer
            text={`$|${absN}| = ${Math.abs(absN)}$ — distancia desde el $0$ en la recta.`}
          />
        </p>
      ) : null}
      {visual.caption ? (
        <p className="text-center text-sm text-ink-muted">
          <MathRenderer text={visual.caption} />
        </p>
      ) : null}
    </div>
  );
}
