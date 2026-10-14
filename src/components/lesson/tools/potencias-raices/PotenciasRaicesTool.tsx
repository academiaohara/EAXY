"use client";

import { useCallback, useMemo, useState } from "react";
import {
  useRegisterLessonStepControl,
  type LessonContinueMeta,
} from "@/components/lesson/LessonStepControlContext";
import { DefinitionBox } from "@/components/lesson/stage/DefinitionBox";
import { StageViewport } from "@/components/lesson/stage/StageViewport";
import { CalculadoraPotenciaScene } from "@/components/lesson/tools/potencias-raices/scenes/CalculadoraPotenciaScene";
import { CalculadoraRaizScene } from "@/components/lesson/tools/potencias-raices/scenes/CalculadoraRaizScene";
import { CalcularPotenciaScene } from "@/components/lesson/tools/potencias-raices/scenes/CalcularPotenciaScene";
import { CuadradoCuboScene } from "@/components/lesson/tools/potencias-raices/scenes/CuadradoCuboScene";
import { CuadradosPerfectosScene } from "@/components/lesson/tools/potencias-raices/scenes/CuadradosPerfectosScene";
import { PotenciaDefinicionScene } from "@/components/lesson/tools/potencias-raices/scenes/PotenciaDefinicionScene";
import { RaizEnteraScene } from "@/components/lesson/tools/potencias-raices/scenes/RaizEnteraScene";
import { RaizInversaScene } from "@/components/lesson/tools/potencias-raices/scenes/RaizInversaScene";
import type { LessonStageTheme, PotenciasRaicesToolStep } from "@/lib/lesson/types";

type PotenciasRaicesToolProps = {
  step: PotenciasRaicesToolStep;
  onContinue: (meta?: LessonContinueMeta) => void;
  compact?: boolean;
  theme?: LessonStageTheme;
};

export function PotenciasRaicesTool({
  step,
  onContinue,
  theme = "board",
}: PotenciasRaicesToolProps) {
  const [ready, setReady] = useState(false);

  const handleReadyChange = useCallback((value: boolean) => {
    setReady(value);
  }, []);

  const control = useMemo(
    () => ({
      label: "Continuar",
      onClick: () => onContinue({ completed: ready }),
      disabled: !ready,
      testId: "lesson-continue-button",
    }),
    [onContinue, ready],
  );

  useRegisterLessonStepControl(control);

  const scene = (() => {
    switch (step.scene) {
      case "potencia-definicion":
        return <PotenciaDefinicionScene stepId={step.id} onReadyChange={handleReadyChange} />;
      case "cuadrado-cubo":
        return <CuadradoCuboScene stepId={step.id} onReadyChange={handleReadyChange} />;
      case "calcular-potencia":
        return <CalcularPotenciaScene stepId={step.id} onReadyChange={handleReadyChange} />;
      case "calculadora-potencia":
        return <CalculadoraPotenciaScene stepId={step.id} onReadyChange={handleReadyChange} />;
      case "raiz-inversa":
        return <RaizInversaScene stepId={step.id} onReadyChange={handleReadyChange} />;
      case "cuadrados-perfectos":
        return <CuadradosPerfectosScene stepId={step.id} onReadyChange={handleReadyChange} />;
      case "raiz-entera":
        return <RaizEnteraScene stepId={step.id} onReadyChange={handleReadyChange} />;
      case "calculadora-raiz":
        return <CalculadoraRaizScene stepId={step.id} onReadyChange={handleReadyChange} />;
      default:
        return null;
    }
  })();

  return (
    <div
      className="flex min-h-0 w-full flex-1 flex-col gap-4"
      data-testid={`potencias-raices-${step.scene}`}
    >
      <StageViewport
        theme={theme}
        className="min-h-0 flex-1"
        stageClassName="min-h-[12rem]"
        header={step.definitionBox ? <DefinitionBox text={step.definitionBox} /> : null}
        stage={scene}
      />
    </div>
  );
}
