"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { usePracticeSnapshotRestore } from "@/lib/lesson/use-practice-snapshot-restore";
import type { BenchTaskSnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";

/** Lo que una escena necesita para ser un ejercicio que la lección da por superado. */
export type BenchPractice = {
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  saved?: BenchTaskSnapshot | null;
};

export const BenchPracticeContext = createContext<BenchPractice | null>(null);

/**
 * Ejercicio guiado: la escena solo admite acciones válidas, así que no hay botón «Comprobar». Cuando el alumno
 * completa la construcción llama a `finalizar()`: el pie de la lección se pone en verde y ofrece continuar.
 * `resultado` es `null` mientras el ejercicio está en curso y `true` una vez superado.
 */
export function useBenchCheck() {
  const practice = useContext(BenchPracticeContext);
  const [resultado, setResultado] = useState<boolean | null>(practice?.saved?.isCorrect ?? null);

  usePracticeSnapshotRestore(practice?.saved ?? null, (snap) => setResultado(snap.isCorrect));

  const finalizar = useCallback(() => {
    if (!practice || resultado !== null) return;
    setResultado(true);
    practice.onCheck({ correct: true, snapshot: { kind: "bench_task", isCorrect: true } });
  }, [practice, resultado]);

  return { esEjercicio: Boolean(practice), resultado, finalizar };
}
