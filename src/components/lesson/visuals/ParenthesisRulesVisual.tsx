"use client";

import { useEffect, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import type { ParenthesisRulesVisual as ParenConfig } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

const CASES = [
  {
    id: "plus-add" as const,
    label: "Sumar (+)",
    before: "+(+5)",
    after: "+5",
    story: "Ingresar una ganancia: aumenta.",
  },
  {
    id: "plus-sub" as const,
    label: "Sumar (−)",
    before: "+(-2)",
    after: "-2",
    story: "Ingresar una deuda: disminuye.",
  },
  {
    id: "minus-add" as const,
    label: "Restar (+)",
    before: "-(+5)",
    after: "-5",
    story: "Quitar una ganancia: disminuye.",
  },
  {
    id: "minus-sub" as const,
    label: "Restar (−)",
    before: "-(-2)",
    after: "+2",
    story: "Quitar una deuda: aumenta.",
  },
];

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

type Props = { visual: ParenConfig };

export function ParenthesisRulesVisualBlock({ visual }: Props) {
  const [index, setIndex] = useState(0);
  const current = CASES[index];

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % CASES.length), 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="space-y-3">
      {visual.title ? (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          <MathRenderer text={visual.title} />
        </p>
      ) : null}
      <div className="flex flex-wrap gap-1.5">
        {CASES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors",
              i === index
                ? "border-cobalt bg-cobalt text-white"
                : "border-slate-200 bg-white text-ink-muted hover:border-cobalt/30",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div key={current.id} className="lesson-visual-rise rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xl">
          <MathRenderer text={`$${current.before}$`} />
          <span className="text-cobalt" aria-hidden>
            →
          </span>
          <MathRenderer text={`$${current.after}$`} />
        </div>
        <p className="mt-3 text-center text-sm text-ink-muted">{current.story}</p>
      </div>
    </div>
  );
}
