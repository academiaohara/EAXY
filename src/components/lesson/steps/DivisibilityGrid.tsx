"use client";

import { useCallback, useMemo, useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { PracticeShell } from "@/components/lesson/steps/PracticeShell";
import { explainDivisibility, isDivisibleBy, texNumber } from "@/lib/lesson/divisibility-criteria";
import { cn } from "@/lib/utils";
import type { DivisibilityGridSnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";
import type { DivisibilityGridStep } from "@/lib/lesson/types";

type DivisibilityGridProps = {
  step: DivisibilityGridStep;
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  compact?: boolean;
  saved?: DivisibilityGridSnapshot | null;
};

type Cell = { n: number; d: number };

const cellKey = (n: number, d: number) => `${n}-${d}`;

export function DivisibilityGrid({
  step,
  onCheck,
  disabled = false,
  compact = false,
  saved = null,
}: DivisibilityGridProps) {
  const restored = saved?.kind === "divisibility_grid" ? saved : null;
  const [marked, setMarked] = useState<string[]>(restored?.marked ?? []);
  const [checked, setChecked] = useState(Boolean(restored));
  const [focus, setFocus] = useState<Cell | null>(null);

  const ticksNeeded = step.numbers.flatMap((n) =>
    step.divisors.filter((d) => isDivisibleBy(n, d)).map((d) => cellKey(n, d)),
  );
  const complete = ticksNeeded.every((key) => marked.includes(key));
  const mistakes = marked.filter((key) => !ticksNeeded.includes(key)).length;

  const mark = useCallback(
    (cell: Cell) => {
      setFocus(cell);
      if (disabled || checked) {
        return;
      }
      const key = cellKey(cell.n, cell.d);
      setMarked((prev) => (prev.includes(key) ? prev : [...prev, key]));
    },
    [checked, disabled],
  );

  const handleCheck = useCallback(() => {
    if (checked || !complete) {
      return;
    }
    const correct = mistakes === 0;
    setChecked(true);
    onCheck({ correct, snapshot: { kind: "divisibility_grid", marked, isCorrect: correct } });
  }, [checked, complete, marked, mistakes, onCheck]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: handleCheck,
      disabled: !complete || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, complete, disabled, handleCheck]);

  useRegisterLessonStepControl(control);

  const focusKey = focus ? cellKey(focus.n, focus.d) : null;
  const focusAnswered = focus !== null && focusKey !== null && marked.includes(focusKey);
  const focusRight = focus !== null && isDivisibleBy(focus.n, focus.d);

  return (
    <PracticeShell step={step} compact={compact} testId="lesson-divisibility-grid">
      <div className="overflow-x-auto">
        <table className="mx-auto border-separate border-spacing-1.5 text-center">
          <thead>
            <tr>
              <th aria-hidden />
              {step.divisors.map((d) => (
                <th
                  key={d}
                  scope="col"
                  className="px-2 font-heading text-xl font-semibold text-[color:var(--stage-ink,#e8edf5)]"
                >
                  <MathRenderer text={`$${d}$`} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {step.numbers.map((n) => (
              <tr key={n}>
                <th
                  scope="row"
                  className="px-3 text-right font-heading text-xl font-semibold text-[color:var(--stage-ink,#e8edf5)]"
                >
                  <MathRenderer text={`$${texNumber(n)}$`} />
                </th>
                {step.divisors.map((d) => {
                  const key = cellKey(n, d);
                  const isMarked = marked.includes(key);
                  const right = isMarked && isDivisibleBy(n, d);
                  const wrong = isMarked && !right;
                  const isFocus = focusKey === key;
                  return (
                    <td key={d} className="p-0" data-testid="grid-cell" data-cell={key}>
                      <button
                        type="button"
                        onClick={() => mark({ n, d })}
                        aria-label={`${n} entre ${d}${isMarked ? (right ? ": ✓ divisible" : ": ✗ no divisible") : ""}`}
                        className={cn(
                          "flex h-14 w-full min-w-16 items-center justify-center rounded-lg border-2 transition-colors",
                          !isMarked && "border-slate-600/60 bg-black/20 hover:bg-white/10",
                          right && "border-emerald-400 bg-emerald-500/15",
                          wrong && "border-rose-400 bg-rose-500/15",
                          isFocus && "ring-2 ring-white/40",
                        )}
                      >
                        {right ? <CheckIcon className="size-8 text-emerald-400" strokeWidth={3} aria-hidden /> : null}
                        {wrong ? <XIcon className="size-8 text-rose-400" strokeWidth={3} aria-hidden /> : null}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className={cn(
          "min-h-20 rounded-xl border px-4 py-3 text-left text-sm leading-relaxed sm:text-base",
          !focusAnswered && "border-dashed border-slate-600/60 text-[color:var(--stage-ink-muted,#94a3b8)]",
          focusAnswered && focusRight && "border-emerald-400/60 bg-emerald-500/10 text-[color:var(--stage-ink,#e8edf5)]",
          focusAnswered && !focusRight && "border-rose-400/60 bg-rose-500/10 text-[color:var(--stage-ink,#e8edf5)]",
        )}
        aria-live="polite"
        data-testid="grid-explanation"
      >
        {focus && focusAnswered ? (
          <>
            <p className="mb-1 font-semibold">{focusRight ? "¡Bien, lleva ✓!" : "Aquí no va ✓."}</p>
            <MathRenderer text={explainDivisibility(focus.n, focus.d)} />
          </>
        ) : (
          <p>
            {marked.length === 0
              ? "Toca las casillas en las que el número de la fila es divisible entre el de la columna. Si aciertas verás ✓ y, si no, ✗, con su porqué."
              : "Toca una casilla marcada para volver a ver su explicación."}
          </p>
        )}
      </div>
    </PracticeShell>
  );
}
