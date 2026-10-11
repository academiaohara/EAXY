"use client";

import { useCallback, useMemo, useState } from "react";
import {
  useRegisterLessonStepControl,
  type LessonContinueMeta,
} from "@/components/lesson/LessonStepControlContext";
import { DefinitionBox } from "@/components/lesson/stage/DefinitionBox";
import { StageViewport } from "@/components/lesson/stage/StageViewport";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { ContarDiezScene } from "@/components/lesson/tools/naturales-numeracion/scenes/ContarDiezScene";
import { DecimalIntroScene } from "@/components/lesson/tools/naturales-numeracion/scenes/DecimalIntroScene";
import { RedondeoCorteScene } from "@/components/lesson/tools/naturales-numeracion/scenes/RedondeoCorteScene";
import { RedondeoDemoScene } from "@/components/lesson/tools/naturales-numeracion/scenes/RedondeoDemoScene";
import { SistemasHistoriaScene } from "@/components/lesson/tools/naturales-numeracion/scenes/SistemasHistoriaScene";
import type { LessonStageTheme, NaturalesNumeracionToolStep } from "@/lib/lesson/types";

type NaturalesNumeracionToolProps = {
  step: NaturalesNumeracionToolStep;
  onContinue: (meta?: LessonContinueMeta) => void;
  compact?: boolean;
  theme?: LessonStageTheme;
};

export function NaturalesNumeracionTool({
  step,
  onContinue,
  compact = false,
  theme = "board",
}: NaturalesNumeracionToolProps) {
  const [ready, setReady] = useState(false);

  const handleReadyChange = useCallback((value: boolean) => {
    setReady(value);
  }, []);

  const control = useMemo(
    () => ({
      label: "Continuar",
      onClick: () => onContinue({ completed: ready }),
      testId: "lesson-continue-button",
    }),
    [onContinue, ready],
  );

  useRegisterLessonStepControl(control);

  const hasExtraContext = Boolean(
    step.content?.length || step.math?.length || step.warning || step.visuals?.length,
  );

  const scene = (() => {
    switch (step.scene) {
      case "sistemas-historia":
        return <SistemasHistoriaScene stepId={step.id} onReadyChange={handleReadyChange} />;
      case "decimal-intro":
        return <DecimalIntroScene onReadyChange={handleReadyChange} />;
      case "contar-diez":
        return <ContarDiezScene stepId={step.id} onReadyChange={handleReadyChange} />;
      case "redondeo-demo":
        return (
          <RedondeoDemoScene
            stepId={step.id}
            onReadyChange={handleReadyChange}
            theme={theme}
          />
        );
      case "redondeo-corte":
        if (!step.roundingExercise) {
          return (
            <p className="text-sm text-rose-700">Falta configuración del ejercicio de redondeo.</p>
          );
        }
        return (
          <RedondeoCorteScene
            stepId={step.id}
            n={step.roundingExercise.n}
            orderId={step.roundingExercise.orderId}
            onReadyChange={handleReadyChange}
            theme={theme}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <div
      className="flex min-h-0 w-full flex-1 flex-col gap-4"
      data-testid={`naturales-numeracion-${step.scene}`}
    >
      {hasExtraContext ? (
        <ConceptCard
          title={step.title}
          content={step.content}
          math={step.math}
          warning={step.warning}
          visuals={step.visuals}
          layout="stack"
          compact={compact}
          showTitle={false}
        />
      ) : null}

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
