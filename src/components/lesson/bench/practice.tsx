"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRegisterLessonFooterCenter, useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { usePracticeSnapshotRestore } from "@/lib/lesson/use-practice-snapshot-restore";
import type { BenchTaskSnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";

/** Lo que una escena necesita para ser un ejercicio comprobable desde el pie de la lección. */
export type BenchPractice = {
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  saved?: BenchTaskSnapshot | null;
};

export const BenchPracticeContext = createContext<BenchPractice | null>(null);

/**
 * Registra «Comprobar» en el pie mientras la escena es un ejercicio. El botón existe siempre y se activa
 * cuando `ready`; `evaluate` decide si el resultado es correcto. `resultado` es `null` hasta comprobar.
 */
export function useBenchCheck({ ready, evaluate }: { ready: boolean; evaluate: () => boolean }) {
  const practice = useContext(BenchPracticeContext);
  const [resultado, setResultado] = useState<boolean | null>(practice?.saved?.isCorrect ?? null);

  usePracticeSnapshotRestore(practice?.saved ?? null, (snap) => setResultado(snap.isCorrect));

  // `evaluate` cambia en cada render; se guarda aparte para que `run` (y el botón del pie) sean estables.
  const evaluateRef = useRef(evaluate);
  useEffect(() => {
    evaluateRef.current = evaluate;
  });

  const run = useCallback(() => {
    if (!practice || resultado !== null) return;
    const ok = evaluateRef.current();
    setResultado(ok);
    practice.onCheck({ correct: ok, snapshot: { kind: "bench_task", isCorrect: ok } });
  }, [practice, resultado]);

  const control = useMemo(
    () =>
      practice && resultado === null
        ? { label: "Comprobar", onClick: run, disabled: !ready || Boolean(practice.disabled), testId: "lesson-check-button" }
        : null,
    [practice, ready, resultado, run],
  );
  useRegisterLessonStepControl(control);

  // Botón fijo en el centro del pie: siempre presente en el ejercicio. Al comprobar, el pie de la lección
  // lo sustituye por la barra verde (acierto) o naranja (fallo).
  const footer = useMemo(
    () =>
      practice && resultado === null ? (
        <button
          type="button"
          onClick={run}
          disabled={!ready || Boolean(practice.disabled)}
          data-testid="bench-comprobar"
          className="min-w-[10.5rem] rounded-full bg-cobalt px-8 py-3 text-base font-semibold text-white transition hover:bg-cobalt/90 disabled:cursor-not-allowed disabled:bg-slate-600/60 disabled:text-slate-300"
        >
          Comprobar
        </button>
      ) : null,
    [practice, ready, resultado, run],
  );
  useRegisterLessonFooterCenter(footer);

  return { esEjercicio: Boolean(practice), resultado };
}
