"use client";

import { useCallback, useMemo, useState } from "react";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { ContarDiezScene } from "@/components/lesson/tools/naturales-numeracion/scenes/ContarDiezScene";
import { DecimalIntroScene } from "@/components/lesson/tools/naturales-numeracion/scenes/DecimalIntroScene";
import { OrigenContarScene } from "@/components/lesson/tools/naturales-numeracion/scenes/OrigenContarScene";
import { RedondeoCorteScene } from "@/components/lesson/tools/naturales-numeracion/scenes/RedondeoCorteScene";
import { RedondeoDemoScene } from "@/components/lesson/tools/naturales-numeracion/scenes/RedondeoDemoScene";
import { SistemasHistoriaScene } from "@/components/lesson/tools/naturales-numeracion/scenes/SistemasHistoriaScene";
import type { LessonContinueMeta } from "@/components/lesson/LessonStepControlContext";
import type { NaturalesNumeracionToolStep } from "@/lib/lesson/types";

type NaturalesNumeracionToolProps = {
  step: NaturalesNumeracionToolStep;
  onContinue: (meta?: LessonContinueMeta) => void;
  compact?: boolean;
};

export function NaturalesNumeracionTool({ step, onContinue, compact = false }: NaturalesNumeracionToolProps) {
  const [ready, setReady] = useState(step.scene === "origen-contar");

  const handleReadyChange = useCallback((value: boolean) => {
    setReady(value);
  }, []);

  const control = useMemo(
    () => ({
      label: ready ? "Continuar" : "Continuar",
      onClick: () => onContinue({ completed: ready }),
      testId: "lesson-continue-button",
    }),
    [onContinue, ready],
  );

  useRegisterLessonStepControl(control);

  const hasContext = Boolean(
    step.content?.length || step.math?.length || step.warning || step.visuals?.length,
  );

  const scene = (() => {
    switch (step.scene) {
      case "origen-contar":
        return <OrigenContarScene />;
      case "sistemas-historia":
        return <SistemasHistoriaScene onReadyChange={handleReadyChange} />;
      case "decimal-intro":
        return <DecimalIntroScene onReadyChange={handleReadyChange} />;
      case "contar-diez":
        return <ContarDiezScene onReadyChange={handleReadyChange} />;
      case "redondeo-demo":
        return <RedondeoDemoScene onReadyChange={handleReadyChange} />;
      case "redondeo-corte":
        if (!step.roundingExercise) {
          return (
            <p className="text-sm text-rose-700">Falta configuración del ejercicio de redondeo.</p>
          );
        }
        return (
          <RedondeoCorteScene
            n={step.roundingExercise.n}
            orderId={step.roundingExercise.orderId}
            onReadyChange={handleReadyChange}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <div className="flex w-full flex-col gap-5" data-testid={`naturales-numeracion-${step.scene}`}>
      {hasContext ? (
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

      <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">{scene}</div>
    </div>
  );
}
