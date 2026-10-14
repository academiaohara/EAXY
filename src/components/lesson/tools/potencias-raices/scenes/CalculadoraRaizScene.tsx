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

const STEPS = 3;

function createDefaultState() {
  return { step: 0 };
}

type CalculadoraRaizSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function CalculadoraRaizScene({ stepId, onReadyChange }: CalculadoraRaizSceneProps) {
  const [{ step }, setState] = usePersistedLessonToolState(stepId, createDefaultState);
  const done = step >= STEPS - 1;

  useEffect(() => {
    onReadyChange(done);
  }, [done, onReadyChange]);

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <StageLabel>En la calculadora</StageLabel>
      <StageEquation latex="\\sqrt{144}" />

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <StageArrow />
        <CalcKey
          label={<MathRenderer text="$\\sqrt{\\square}$" />}
          active={step >= 0}
        />
        <CalcKey label="144" active={step >= 1} />
        <CalcKey label="=" active={step >= 2} />
        <StageArrow />
        <CalcDisplay value="12" visible={step >= 2} />
      </div>

      {!done ? (
        <AdvanceButton
          label={step === 0 ? "Pulsar teclas" : "Siguiente tecla"}
          onClick={() => setState((prev) => ({ step: Math.min(STEPS - 1, prev.step + 1) }))}
        />
      ) : (
        <p className="text-center text-xs text-[color:var(--stage-accent-muted,#83c167)]">
          <MathRenderer text="$12^2 = 144$, así que $\\sqrt{144} = 12$ (raíz exacta)." />
        </p>
      )}
    </div>
  );
}
