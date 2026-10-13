"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  AdvanceButton,
  StageEquation,
  StageLabel,
} from "@/components/lesson/tools/potencias-raices/stage-shared";
import { DrawnArrow } from "@/components/lesson/stage/modules/mul-div-naturales/chalkboard-shared";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

const PHASES = 3;

function createDefaultState() {
  return { phase: 0 };
}

type PotenciaDefinicionSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function PotenciaDefinicionScene({ stepId, onReadyChange }: PotenciaDefinicionSceneProps) {
  const [{ phase }, setState] = usePersistedLessonToolState(stepId, createDefaultState);
  const reduced = useReducedMotion();
  const done = phase >= PHASES - 1;

  useEffect(() => {
    onReadyChange(done);
  }, [done, onReadyChange]);

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <StageEquation latex="6^4" visible={phase >= 0} />

      <div className="relative flex items-end justify-center gap-1 sm:gap-2">
        <span
          className={cn(
            "text-4xl font-black tabular-nums transition-all duration-500 sm:text-5xl",
            phase >= 1
              ? "text-[color:var(--stage-highlight,#ffff00)]"
              : "text-[color:var(--stage-ink,#fff)]",
          )}
        >
          6
        </span>
        <span
          className={cn(
            "mb-2 text-2xl font-bold tabular-nums transition-all duration-500 sm:text-3xl",
            phase >= 1
              ? "text-[color:var(--stage-accent,#58c4dd)]"
              : "text-[color:var(--stage-muted,#94a3b8)]",
          )}
        >
          4
        </span>
      </div>

      <svg viewBox="0 0 320 100" className="h-20 w-full max-w-sm" aria-hidden>
        <DrawnArrow
          coords={[40, 72, 70, 40, 95, 58]}
          visible={phase >= 1}
          reduced={reduced}
          delayMs={0}
          stroke="#ffff00"
        />
        <DrawnArrow
          coords={[200, 28, 230, 55, 255, 38]}
          visible={phase >= 1}
          reduced={reduced}
          delayMs={120}
          stroke="#58c4dd"
        />
        <text
          x="28"
          y="92"
          className={cn(
            "fill-[#ffff00] text-[13px] font-bold uppercase transition-opacity duration-500",
            phase >= 1 ? "opacity-100" : "opacity-0",
          )}
        >
          Base
        </text>
        <text
          x="248"
          y="24"
          className={cn(
            "fill-[#58c4dd] text-[13px] font-bold uppercase transition-opacity duration-500",
            phase >= 1 ? "opacity-100" : "opacity-0",
          )}
        >
          Exponente
        </text>
      </svg>

      <div
        className={cn(
          "space-y-2 text-center transition-opacity duration-500",
          phase >= 2 ? "opacity-100" : "opacity-0",
        )}
      >
        <StageLabel>Ejemplo</StageLabel>
        <StageEquation latex="6^4 = 6 \\cdot 6 \\cdot 6 \\cdot 6 = 1296" />
      </div>

      {!done ? (
        <AdvanceButton
          label={phase === 0 ? "Ver base y exponente" : "Ver el producto"}
          onClick={() => setState((prev) => ({ phase: Math.min(PHASES - 1, prev.phase + 1) }))}
        />
      ) : (
        <p className="text-center text-xs font-medium text-[color:var(--stage-accent-muted,#83c167)]">
          La base se repite tantas veces como indica el exponente.
        </p>
      )}
    </div>
  );
}
