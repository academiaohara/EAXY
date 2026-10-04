"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EmbeddedPredictionInScene,
  checkEmbeddedPrediction,
} from "@/components/lesson/stage/EmbeddedPredictionInScene";
import { Bolsa, Manzana } from "@/components/lesson/stage/objects";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  evalWithParenthesisPlacement,
  tokensToExpression,
} from "@/lib/lesson/stage/eval-natural-expression";
import { gapToPlacement, placementToGap, type ParenthesisGap } from "@/lib/lesson/stage/expression-gaps";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import type { EmbeddedPrediction } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

export type ManzanasScene =
  | "dual-narrate"
  | "explorar-bolsa"
  | "limite-resta";

type ManzanasPersist = {
  tab: "a" | "b";
  stepA: number;
  stepB: number;
  completedDual: boolean;
  activeGap: ParenthesisGap | null;
  openAfter: number | null;
  closeBefore: number | null;
  triedRemoveNine: boolean;
  predictNumeric: string;
  predictChoice: string;
  predictSolved: boolean;
  predictWrongAttempts: number;
};

export type ManzanasParentesisModuleProps = {
  stepId: string;
  scene: ManzanasScene;
  embeddedPrediction?: EmbeddedPrediction;
  onReadyChange?: (ready: boolean) => void;
  onPredictPhaseChange?: (active: boolean, canSubmit: boolean) => void;
  onGoalChange?: (met: boolean, liveValue: number | null) => void;
  onRegisterPredict?: (submit: () => boolean) => void;
};

const TOKENS = ["9", "-", "1", "+", "3"];

function AppleBasket({ count, max = 9 }: { count: number; max?: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
      {Array.from({ length: max }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "transition-opacity duration-300",
            index < count ? "opacity-100" : "opacity-15",
          )}
        >
          <Manzana />
        </div>
      ))}
    </div>
  );
}

export function ManzanasParentesisModule({
  stepId,
  scene,
  embeddedPrediction,
  onReadyChange,
  onPredictPhaseChange,
  onGoalChange,
  onRegisterPredict,
}: ManzanasParentesisModuleProps) {
  const reduced = useReducedMotion();
  const [shake, setShake] = useState(false);
  const timers = useRef<number[]>([]);

  const [persist, setPersist] = usePersistedLessonToolState<ManzanasPersist>(stepId, () => ({
    tab: "a",
    stepA: 0,
    stepB: 0,
    completedDual: false,
    activeGap: null,
    openAfter: null,
    closeBefore: null,
    triedRemoveNine: false,
    predictNumeric: "",
    predictChoice: "",
    predictSolved: false,
    predictWrongAttempts: 0,
  }));

  const submitPredict = useCallback(() => {
    if (!embeddedPrediction || persist.predictSolved) {
      return false;
    }
    const ok = checkEmbeddedPrediction(
      embeddedPrediction,
      persist.predictNumeric,
      persist.predictChoice,
    );
    if (ok) {
      setPersist((prev) => ({ ...prev, predictSolved: true }));
      return true;
    }
    setPersist((prev) => ({ ...prev, predictWrongAttempts: prev.predictWrongAttempts + 1 }));
    return false;
  }, [embeddedPrediction, persist.predictChoice, persist.predictNumeric, persist.predictSolved, setPersist]);

  useEffect(() => {
    onRegisterPredict?.(submitPredict);
  }, [onRegisterPredict, submitPredict]);

  const exprDisplay = useMemo(() => {
    if (scene !== "explorar-bolsa") {
      return null;
    }
    const text = tokensToExpression(TOKENS, persist.openAfter, persist.closeBefore);
    return text;
  }, [persist.closeBefore, persist.openAfter, scene]);

  const liveValue = useMemo(() => {
    if (scene !== "explorar-bolsa") {
      return null;
    }
    return evalWithParenthesisPlacement(TOKENS, persist.openAfter, persist.closeBefore);
  }, [persist.closeBefore, persist.openAfter, scene]);

  useEffect(() => {
    if (scene === "explorar-bolsa") {
      onGoalChange?.(liveValue === 5, liveValue);
    }
  }, [liveValue, onGoalChange, scene]);

  useEffect(() => {
    if (scene === "dual-narrate") {
      onReadyChange?.(persist.completedDual);
      return;
    }
    if (scene === "limite-resta") {
      const inPredict = persist.triedRemoveNine && !persist.predictSolved;
      const canSubmit = Boolean(persist.predictChoice);
      onPredictPhaseChange?.(Boolean(inPredict && embeddedPrediction), inPredict && canSubmit);
      onReadyChange?.(persist.predictSolved);
      return;
    }
    if (scene === "explorar-bolsa") {
      onReadyChange?.(false);
    }
  }, [
    embeddedPrediction,
    onPredictPhaseChange,
    onReadyChange,
    persist.completedDual,
    persist.predictSolved,
    persist.predictChoice,
    persist.triedRemoveNine,
    scene,
  ]);

  const advanceDual = () => {
    if (persist.tab === "a") {
      const next = Math.min(2, persist.stepA + 1);
      setPersist((prev) => ({
        ...prev,
        stepA: next,
        completedDual: next === 2 && prev.stepB === 2,
      }));
      return;
    }
    const next = Math.min(2, persist.stepB + 1);
    setPersist((prev) => ({
      ...prev,
      stepB: next,
      completedDual: next === 2 && prev.stepA === 2,
    }));
  };

  const appleCountA = persist.stepA === 0 ? 9 : persist.stepA === 1 ? 8 : 11;
  const appleCountB = persist.stepB === 0 ? 9 : persist.stepB === 1 ? 9 : 5;
  const showBagB = persist.stepB >= 1;

  const toggleGap = (gap: ParenthesisGap) => {
    const current = placementToGap(persist.openAfter, persist.closeBefore);
    if (current === gap) {
      setPersist((prev) => ({ ...prev, activeGap: null, openAfter: null, closeBefore: null }));
      return;
    }
    const placement = gapToPlacement(gap);
    setPersist((prev) => ({
      ...prev,
      activeGap: gap,
      openAfter: placement.openAfter,
      closeBefore: placement.closeBefore,
    }));
  };

  const tryRemoveNine = () => {
    setShake(true);
    timers.current.push(window.setTimeout(() => setShake(false), 400));
    setPersist((prev) => ({ ...prev, triedRemoveNine: true }));
  };

  if (scene === "dual-narrate") {
    const exprA =
      persist.stepA === 0 ? "$9 - 1 + 3$" : persist.stepA === 1 ? "$8 + 3$" : "$11$";
    const exprB =
      persist.stepB === 0
        ? "$9 - (1 + 3)$"
        : persist.stepB === 1
          ? "$9 - 4$"
          : "$5$";

    return (
      <div className="flex min-h-[min(400px,55vh)] flex-col gap-4" data-testid="manzanas-dual">
        <div className="flex justify-center gap-2">
          {(["a", "b"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "min-h-11 rounded-full px-4 py-2 text-sm font-semibold",
                persist.tab === tab
                  ? "bg-cobalt text-white"
                  : "bg-slate-100 text-ink-muted hover:bg-slate-200",
              )}
              onClick={() => setPersist((prev) => ({ ...prev, tab }))}
            >
              Escena {tab === "a" ? "A" : "B"}
            </button>
          ))}
        </div>
        <p className="text-center text-lg font-semibold text-ink">
          <MathRenderer text={persist.tab === "a" ? exprA : exprB} />
        </p>
        <AppleBasket count={persist.tab === "a" ? Math.min(appleCountA, 9) : Math.min(appleCountB, 9)} />
        {persist.tab === "b" && showBagB ? (
          <div className="flex justify-center">
            <Bolsa count={persist.stepB === 1 ? 4 : undefined} />
          </div>
        ) : null}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            className="min-h-11 rounded-full bg-cobalt px-5 py-2 text-sm font-semibold text-white"
            onClick={advanceDual}
          >
            Siguiente paso
          </button>
          {persist.completedDual ? (
            <button
              type="button"
              className="min-h-11 rounded-full border-2 border-slate-200 px-5 py-2 text-sm font-semibold"
              onClick={() =>
                setPersist((prev) => ({
                  ...prev,
                  stepA: 0,
                  stepB: 0,
                  completedDual: false,
                }))
              }
            >
              Repetir
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  if (scene === "explorar-bolsa") {
    return (
      <div className="flex min-h-[min(380px,52vh)] flex-col gap-4" data-testid="manzanas-bolsa">
        <p className="text-center text-2xl font-bold text-ink sm:text-3xl">
          <MathRenderer text={`$${exprDisplay ?? "9 - 1 + 3"}$`} />
        </p>
        <p className="text-center text-sm font-semibold text-ink-muted" aria-live="polite">
          {liveValue === null ? "—" : `Resultado: ${liveValue}`}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 text-2xl font-bold sm:text-3xl">
          <span>9</span>
          <button
            type="button"
            className={cn(
              "min-h-11 min-w-11 rounded-lg border-2 border-dashed px-2",
              persist.activeGap === 0 ? "border-cobalt bg-cobalt-tint" : "border-slate-300",
            )}
            aria-label="Agrupar nueve y uno"
            onClick={() => toggleGap(0)}
          >
            ◻
          </button>
          <span>− 1</span>
          <button
            type="button"
            className={cn(
              "min-h-11 min-w-11 rounded-lg border-2 border-dashed px-2",
              persist.activeGap === 1 ? "border-cobalt bg-cobalt-tint" : "border-slate-300",
            )}
            aria-label="Agrupar uno y tres"
            onClick={() => toggleGap(1)}
          >
            ◻
          </button>
          <span>+ 3</span>
        </div>
        {liveValue === 11 ? (
          <p className="text-center text-sm text-amber-800">Esa agrupación no cambia el resultado.</p>
        ) : null}
        {liveValue === 5 ? (
          <p className="text-center text-sm font-medium text-emerald-800">
            Primero $1 + 3 = 4$ y luego $9 - 4 = 5$.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-[min(360px,50vh)] flex-col items-center gap-4",
        shake && "animate-shake",
      )}
      data-testid="manzanas-limite"
    >
      <AppleBasket count={1} max={1} />
      <button
        type="button"
        className="min-h-11 rounded-full bg-rose-500 px-5 py-2 text-sm font-semibold text-white"
        onClick={tryRemoveNine}
      >
        Quitar 9 manzanas
      </button>
      {persist.triedRemoveNine ? (
        <p className="text-center text-sm font-semibold text-rose-700" role="alert">
          No se puede: solo hay 1 manzana.
        </p>
      ) : null}
      {persist.triedRemoveNine && embeddedPrediction && !persist.predictSolved ? (
        <EmbeddedPredictionInScene
          prediction={embeddedPrediction}
          numericValue={persist.predictNumeric}
          choiceId={persist.predictChoice}
          onNumericChange={(value) => setPersist((prev) => ({ ...prev, predictNumeric: value }))}
          onChoiceChange={(id) => setPersist((prev) => ({ ...prev, predictChoice: id }))}
          wrongAttempts={persist.predictWrongAttempts}
          solved={persist.predictSolved}
          showExplanation={persist.predictSolved}
        />
      ) : null}
    </div>
  );
}
