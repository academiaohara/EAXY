"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  EmbeddedPredictionInScene,
  checkEmbeddedPrediction,
} from "@/components/lesson/stage/EmbeddedPredictionInScene";
import { FichaColor, MarcoDiez } from "@/components/lesson/stage/objects";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import type { EmbeddedPrediction } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

export type FichasPropiedadesScene = "conmutativa" | "asociativa";

type PropPersist = {
  swapped: boolean;
  predictNumeric: string;
  predictSolved: boolean;
  predictWrongAttempts: number;
  joinedFirst: boolean;
  joinedLast: boolean;
  focusGap: number;
};

export type FichasPropiedadesModuleProps = {
  stepId: string;
  scene: FichasPropiedadesScene;
  blocks: number[];
  embeddedPrediction?: EmbeddedPrediction;
  onReadyChange?: (ready: boolean) => void;
  onPredictPhaseChange?: (active: boolean, canSubmit: boolean) => void;
  onRegisterPredict?: (submit: () => boolean) => void;
};

export function FichasPropiedadesModule({
  stepId,
  scene,
  blocks,
  embeddedPrediction,
  onReadyChange,
  onPredictPhaseChange,
  onRegisterPredict,
}: FichasPropiedadesModuleProps) {
  const reduced = useReducedMotion();
  const [persist, setPersist] = usePersistedLessonToolState<PropPersist>(stepId, () => ({
    swapped: false,
    predictNumeric: "",
    predictSolved: false,
    predictWrongAttempts: 0,
    joinedFirst: false,
    joinedLast: false,
    focusGap: 0,
  }));

  const submitPredict = useCallback(() => {
    if (!embeddedPrediction || persist.predictSolved) {
      return false;
    }
    const ok = checkEmbeddedPrediction(embeddedPrediction, persist.predictNumeric, "");
    if (ok) {
      setPersist((prev) => ({ ...prev, predictSolved: true, swapped: true }));
      return true;
    }
    setPersist((prev) => ({ ...prev, predictWrongAttempts: prev.predictWrongAttempts + 1 }));
    return false;
  }, [embeddedPrediction, persist.predictNumeric, persist.predictSolved, setPersist]);

  useEffect(() => {
    onRegisterPredict?.(submitPredict);
  }, [onRegisterPredict, submitPredict]);

  const total = blocks.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (scene === "conmutativa") {
      const inPredict = !persist.predictSolved && Boolean(embeddedPrediction);
      onPredictPhaseChange?.(
        inPredict,
        inPredict && persist.predictNumeric.trim().length > 0,
      );
      onReadyChange?.(persist.swapped && persist.predictSolved);
      return;
    }
    onReadyChange?.(persist.joinedFirst && persist.joinedLast);
  }, [
    embeddedPrediction,
    onPredictPhaseChange,
    onReadyChange,
    persist.joinedFirst,
    persist.joinedLast,
    persist.predictNumeric,
    persist.predictSolved,
    persist.swapped,
    scene,
  ]);

  if (scene === "conmutativa") {
    const [a, b] = blocks;
    const left = persist.swapped ? b : a;
    const right = persist.swapped ? a : b;
    return (
      <div className="flex min-h-[min(400px,55vh)] flex-col gap-4" data-testid="fichas-conmutativa">
        <p className="text-center text-lg font-semibold">
          <MathRenderer
            text={`$${left} + ${right} = ${total}$`}
          />
        </p>
        <div
          className={cn(
            "flex flex-wrap items-end justify-center gap-4 transition-transform duration-500",
            persist.swapped && !reduced && "translate-x-2",
          )}
        >
          <MarcoDiez label={`${left} azules`} slots={10}>
            {Array.from({ length: Math.min(left, 10) }).map((_, i) => (
              <FichaColor key={`l-${i}`} tone="cobalt" />
            ))}
          </MarcoDiez>
          {left > 10 ? (
            <MarcoDiez label="Resto" slots={4}>
              {Array.from({ length: left - 10 }).map((_, i) => (
                <FichaColor key={`lr-${i}`} tone="cobalt" />
              ))}
            </MarcoDiez>
          ) : null}
          <MarcoDiez label={`${right} verdes`} slots={10}>
            {Array.from({ length: Math.min(right, 10) }).map((_, i) => (
              <FichaColor key={`r-${i}`} tone="emerald" />
            ))}
          </MarcoDiez>
        </div>
        {!persist.predictSolved && embeddedPrediction ? (
          <EmbeddedPredictionInScene
            prediction={embeddedPrediction}
            numericValue={persist.predictNumeric}
            choiceId=""
            onNumericChange={(value) => setPersist((prev) => ({ ...prev, predictNumeric: value }))}
            onChoiceChange={() => {}}
            wrongAttempts={persist.predictWrongAttempts}
            solved={persist.predictSolved}
          />
        ) : null}
        {persist.predictSolved ? (
          <p className="text-center text-sm text-ink-muted">
            <MathRenderer text={`$${a} + ${b} = ${b} + ${a}$`} />
          </p>
        ) : null}
      </div>
    );
  }

  const [x, y, z] = blocks;
  const joinFirst = () => setPersist((prev) => ({ ...prev, joinedFirst: true }));
  const joinLast = () => setPersist((prev) => ({ ...prev, joinedLast: true }));

  return (
    <div className="flex min-h-[min(400px,55vh)] flex-col gap-4" data-testid="fichas-asociativa">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <Pile n={x} tone="cobalt" />
        <GapButton index={0} onJoin={joinFirst} done={persist.joinedFirst} label="Unir 8 y 6" />
        <Pile n={y} tone="emerald" />
        <GapButton index={1} onJoin={joinLast} done={persist.joinedLast} label="Unir 6 y 3" />
        <Pile n={z} tone="amber" />
      </div>
      {persist.joinedFirst ? (
        <p className="text-center text-sm">
          <MathRenderer text={`$(${x} + ${y}) + ${z} = ${x + y} + ${z} = ${total}$`} />
        </p>
      ) : null}
      {persist.joinedLast ? (
        <p className="text-center text-sm">
          <MathRenderer text={`$${x} + (${y} + ${z}) = ${x} + ${y + z} = ${total}$`} />
        </p>
      ) : null}
      <p className="text-center text-xs text-ink-muted">
        <MathRenderer text={`$(${x} + ${y}) + ${z} = ${x} + (${y} + ${z})$`} />
      </p>
    </div>
  );
}

function Pile({ n, tone }: { n: number; tone: "cobalt" | "emerald" | "amber" }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex flex-wrap max-w-[5.5rem] justify-center gap-1">
        {Array.from({ length: n }).map((_, i) => (
          <FichaColor key={i} tone={tone} />
        ))}
      </div>
      <span className="text-xs font-bold tabular-nums">{n}</span>
    </div>
  );
}

function GapButton({
  onJoin,
  done,
  label,
}: {
  index: number;
  onJoin: () => void;
  done: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      disabled={done}
      onClick={onJoin}
      className={cn(
        "min-h-11 min-w-11 rounded-lg border-2 border-dashed text-xs font-semibold",
        done ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-cobalt/40 text-cobalt",
      )}
      aria-label={label}
    >
      {done ? "✓" : "∪"}
    </button>
  );
}
