"use client";

import { useCallback, useMemo, useState } from "react";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { ConceptCard } from "@/components/lesson/steps/ConceptCard";
import { ContarDiezScene } from "@/components/lesson/tools/naturales-numeracion/scenes/ContarDiezScene";
import { DecimalCifrasScene } from "@/components/lesson/tools/naturales-numeracion/scenes/DecimalCifrasScene";
import { OrigenContarScene } from "@/components/lesson/tools/naturales-numeracion/scenes/OrigenContarScene";
import { SistemasHistoriaScene } from "@/components/lesson/tools/naturales-numeracion/scenes/SistemasHistoriaScene";
import { TablaPosicionalScene } from "@/components/lesson/tools/naturales-numeracion/scenes/TablaPosicionalScene";
import type { NaturalesNumeracionToolStep } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

type NaturalesNumeracionToolProps = {
  step: NaturalesNumeracionToolStep;
  onContinue: () => void;
  compact?: boolean;
};

export function NaturalesNumeracionTool({ step, onContinue, compact = false }: NaturalesNumeracionToolProps) {
  const [ready, setReady] = useState(step.scene === "origen-contar");

  const handleReadyChange = useCallback((value: boolean) => {
    setReady(value);
  }, []);

  const control = useMemo(
    () => ({
      label: "Continuar",
      onClick: onContinue,
      disabled: !ready,
      testId: "lesson-continue-button",
    }),
    [onContinue, ready],
  );

  useRegisterLessonStepControl(control);

  const hasContext = Boolean(
    step.content?.length || step.math?.length || step.warning || step.visuals?.length,
  );
  const split = hasContext && (step.layout ?? "split") === "split";

  const scene = (() => {
    switch (step.scene) {
      case "origen-contar":
        return <OrigenContarScene />;
      case "sistemas-historia":
        return <SistemasHistoriaScene onReadyChange={handleReadyChange} />;
      case "decimal-cifras":
        return <DecimalCifrasScene onReadyChange={handleReadyChange} />;
      case "contar-diez":
        return <ContarDiezScene onReadyChange={handleReadyChange} />;
      case "tabla-posicional":
        return <TablaPosicionalScene onReadyChange={handleReadyChange} />;
      default:
        return null;
    }
  })();

  return (
    <div
      className={cn(
        "gap-6",
        split ? "grid lg:grid-cols-2 lg:items-start lg:gap-12" : "flex flex-col",
      )}
      data-testid={`naturales-numeracion-${step.scene}`}
    >
      {hasContext ? (
        <ConceptCard
          title={step.title}
          content={step.content}
          math={step.math}
          warning={step.warning}
          visuals={step.visuals}
          layout={split ? "stack" : step.layout}
          compact={compact}
          showTitle={false}
        />
      ) : null}

      <div
        className={cn(
          "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6",
          !hasContext && "mx-auto w-full max-w-3xl",
        )}
      >
        {scene}
      </div>
    </div>
  );
}
