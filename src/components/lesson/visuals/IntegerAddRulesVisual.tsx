"use client";

import { useEffect, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import type { IntegerAddRulesVisual as IntegerAddConfig } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

type Props = { visual: IntegerAddConfig };

export function IntegerAddRulesVisualBlock({ visual }: Props) {
  const [panel, setPanel] = useState<"same" | "diff">("same");

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }
    const timer = window.setInterval(() => setPanel((p) => (p === "same" ? "diff" : "same")), 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="space-y-3">
      {visual.title ? (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          <MathRenderer text={visual.title} />
        </p>
      ) : null}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setPanel("same")}
          className={cn(
            "flex-1 rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors",
            panel === "same"
              ? "border-cobalt bg-cobalt-tint text-cobalt"
              : "border-slate-200 bg-white text-ink-muted",
          )}
        >
          Mismo signo
        </button>
        <button
          type="button"
          onClick={() => setPanel("diff")}
          className={cn(
            "flex-1 rounded-lg border px-2 py-1.5 text-xs font-semibold transition-colors",
            panel === "diff"
              ? "border-violet-500 bg-violet-50 text-violet-800"
              : "border-slate-200 bg-white text-ink-muted",
          )}
        >
          Distinto signo
        </button>
      </div>
      {panel === "same" ? (
        <div className="lesson-visual-rise space-y-2 rounded-xl border border-cobalt/20 bg-cobalt-tint/40 p-4">
          <p className="text-sm text-ink">Sumas los valores absolutos y conservas el signo.</p>
          <div className="space-y-1 text-center text-lg">
            <MathRenderer text="$-3 - 8 = -11$" />
            <MathRenderer text="$+4 + 7 = +11$" />
          </div>
          <p className="text-xs text-ink-muted">«Me quitan 3 y me quitan 8 → pierdo 11.»</p>
        </div>
      ) : (
        <div className="lesson-visual-rise space-y-2 rounded-xl border border-violet-200 bg-violet-50/80 p-4">
          <p className="text-sm text-ink">Restas valores absolutos; gana el signo del mayor.</p>
          <div className="space-y-1 text-center text-lg">
            <MathRenderer text="$-2 + 8 = +6$" />
            <MathRenderer text="$+4 - 9 = -5$" />
          </div>
          <p className="text-xs text-ink-muted">«Me quitan 2 y me dan 8 → gano 6.»</p>
        </div>
      )}
    </div>
  );
}
