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
  const [answers, setAnswers] = useState<Record<string, boolean>>(restored?.answers ?? {});
  const [checked, setChecked] = useState(Boolean(restored));
  const [focus, setFocus] = useState<Cell | null>(null);

  const total = step.numbers.length * step.divisors.length;
  const answered = Object.keys(answers).length;
  const complete = answered === total;

  const answer = useCallback(
    (cell: Cell, value: boolean) => {
      if (disabled || checked) {
        return;
      }
      const key = cellKey(cell.n, cell.d);
      setAnswers((prev) => (key in prev ? prev : { ...prev, [key]: value }));
      setFocus(cell);
    },
    [checked, disabled],
  );

  const handleCheck = useCallback(() => {
    if (checked || !complete) {
      return;
    }
    const correct = step.numbers.every((n) =>
      step.divisors.every((d) => answers[cellKey(n, d)] === isDivisibleBy(n, d)),
    );
    setChecked(true);
    onCheck({ correct, snapshot: { kind: "divisibility_grid", answers, isCorrect: correct } });
  }, [answers, checked, complete, onCheck, step]);

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
  const focusAnswered = focus !== null && focusKey !== null && focusKey in answers;
  const focusRight = focus !== null && focusKey !== null && answers[focusKey] === isDivisibleBy(focus.n, focus.d);

  return (
    <PracticeShell step={step} compact={compact} testId="lesson-divisibility-grid">
      <div className="overflow-x-auto">
        <table className="mx-auto border-separate border-spacing-2 text-center">
          <thead>
            <tr>
              <th className="px-2 text-xs font-medium text-[color:var(--stage-ink-muted,#94a3b8)]">¿Divisible entre…?</th>
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
                  const value = answers[key];
                  const isAnswered = value !== undefined;
                  const right = isAnswered && value === isDivisibleBy(n, d);
                  const isFocus = focusKey === key;
                  return (
                    <td
                      key={d}
                      className={cn(
                        "min-w-28 rounded-xl border-2 p-2 transition-colors",
                        !isAnswered && "border-slate-600/60 bg-black/20",
                        right && "border-emerald-400 bg-emerald-500/15",
                        isAnswered && !right && "border-rose-400 bg-rose-500/15",
                        isFocus && "ring-2 ring-white/40",
                      )}
                      data-testid="grid-cell"
                      data-cell={key}
                    >
                      {isAnswered ? (
                        <button
                          type="button"
                          onClick={() => setFocus({ n, d })}
                          aria-label={`${n} entre ${d}: ${right ? "bien" : "mal"}. Ver explicación`}
                          className="flex min-h-10 w-full items-center justify-center gap-1.5 text-sm font-semibold"
                        >
                          {right ? (
                            <CheckIcon className="size-6 text-emerald-400" strokeWidth={3} aria-hidden />
                          ) : (
                            <XIcon className="size-6 text-rose-400" strokeWidth={3} aria-hidden />
                          )}
                          <span className="text-[color:var(--stage-ink,#e8edf5)]">{value ? "Sí" : "No"}</span>
                        </button>
                      ) : (
                        <div className="flex gap-1.5">
                          {([true, false] as const).map((option) => (
                            <button
                              key={String(option)}
                              type="button"
                              disabled={disabled}
                              onClick={() => answer({ n, d }, option)}
                              aria-label={`${n} entre ${d}: ${option ? "Sí" : "No"}`}
                              className="min-h-10 flex-1 rounded-lg border border-slate-500/60 bg-white/5 px-2 text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)] transition-colors hover:bg-white/15"
                            >
                              {option ? "Sí" : "No"}
                            </button>
                          ))}
                        </div>
                      )}
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
            <p className="mb-1 font-semibold">{focusRight ? "¡Bien!" : "Esta no es correcta."}</p>
            <MathRenderer text={explainDivisibility(focus.n, focus.d)} />
          </>
        ) : (
          <p>
            {answered === 0
              ? "Elige «Sí» o «No» en una casilla: verás ✓ o ✗ y por qué."
              : "Toca una casilla ya respondida para volver a ver su explicación."}
          </p>
        )}
      </div>
    </PracticeShell>
  );
}
