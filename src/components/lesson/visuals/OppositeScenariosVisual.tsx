"use client";

import { MathRenderer } from "@/components/lesson/MathRenderer";
import type { OppositeScenariosVisual as OppositeConfig } from "@/lib/lesson/types";

type Props = { visual: OppositeConfig };

export function OppositeScenariosVisualBlock({ visual }: Props) {
  return (
    <div className="space-y-3">
      {visual.title ? (
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
          <MathRenderer text={visual.title} />
        </p>
      ) : null}
      <ul className="space-y-3">
        {visual.pairs.map((pair, index) => (
          <li
            key={pair.context}
            className="lesson-visual-rise rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
            style={{ animationDelay: `${index * 180}ms` }}
          >
            <p className="mb-2 text-sm font-medium text-ink">
              <MathRenderer text={pair.context} />
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-center text-emerald-800">
                <MathRenderer text={`$${pair.positive}$`} />
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-2 py-1.5 text-center text-rose-800">
                <MathRenderer text={`$${pair.negative}$`} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
