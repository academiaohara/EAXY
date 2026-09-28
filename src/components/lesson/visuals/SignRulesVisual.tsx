"use client";

import { useEffect, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import type { SignRulesVisual as SignRulesConfig } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

const RULES = [
  { left: "(+) · (+)", right: "+", tone: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  { left: "(−) · (−)", right: "+", tone: "border-emerald-200 bg-emerald-50 text-emerald-800" },
  { left: "(+) · (−)", right: "−", tone: "border-rose-200 bg-rose-50 text-rose-800" },
  { left: "(−) · (+)", right: "−", tone: "border-rose-200 bg-rose-50 text-rose-800" },
] as const;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

type Props = { visual: SignRulesConfig };

export function SignRulesVisualBlock({ visual }: Props) {
  const op = visual.operation ?? "multiply";
  const symbol = op === "divide" ? ":" : "·";
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }
    const timer = window.setInterval(() => setActive((c) => (c + 1) % RULES.length), 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="space-y-3">
      {visual.title ? (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          <MathRenderer text={visual.title} />
        </p>
      ) : null}
      <div className="grid gap-2 sm:grid-cols-2">
        {RULES.map((rule, index) => {
          const left = rule.left.replace("·", symbol);
          const isActive = index === active;
          return (
            <div
              key={rule.left}
              className={cn(
                "lesson-visual-rise flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                rule.tone,
                isActive && "scale-[1.02] ring-2 ring-cobalt/40 shadow-sm",
              )}
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <MathRenderer text={`$${left}$`} />
              <span className="text-lg tabular-nums">{rule.right}</span>
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-ink-muted">
        {op === "divide"
          ? "En la división de enteros la regla de signos es la misma que en la multiplicación."
          : "Mismo signo → resultado positivo. Signos distintos → resultado negativo."}
      </p>
      {visual.caption ? (
        <p className="text-center text-sm text-ink-muted">
          <MathRenderer text={visual.caption} />
        </p>
      ) : null}
    </div>
  );
}
