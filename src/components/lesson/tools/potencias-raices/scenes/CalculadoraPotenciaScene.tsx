"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  AdvanceButton,
  CalcDisplay,
  CalcKey,
  StageArrow,
  StageEquation,
  StageLabel,
} from "@/components/lesson/tools/potencias-raices/stage-shared";
import { MathRenderer } from "@/components/lesson/MathRenderer";

const STEPS = 4;

function createDefaultState() {
  return { step: 0 };
}

type CalculadoraPotenciaSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function CalculadoraPotenciaScene({ stepId, onReadyChange }: CalculadoraPotenciaSceneProps) {
  const [{ step }, setState] = usePersistedLessonToolState(stepId, createDefaultState);
  const done = step >= STEPS - 1;

  useEffect(() => {
    onReadyChange(done);
  }, [done, onReadyChange]);

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <StageLabel>En la calculadora</StageLabel>
      <StageEquation latex="8^5" />

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <StageArrow />
        <CalcKey label="8" active={step >= 0} />
        <CalcKey label={<MathRenderer text="$x^y$" />} active={step >= 1} />
        <CalcKey label="5" active={step >= 2} />
        <CalcKey label="=" active={step >= 3} />
        <StageArrow />
        <CalcDisplay value="32768" visible={step >= 3} />
      </div>

      {!done ? (
        <AdvanceButton
          label={step === 0 ? "Pulsar teclas" : "Siguiente tecla"}
          onClick={() => setState((prev) => ({ step: Math.min(STEPS - 1, prev.step + 1) }))}
        />
      ) : (
        <p className="text-center text-xs text-[color:var(--stage-accent-muted,#83c167)]">
          Mismo resultado que al multiplicar cinco veces el 8.
        </p>
      )}
    </div>
  );
}
