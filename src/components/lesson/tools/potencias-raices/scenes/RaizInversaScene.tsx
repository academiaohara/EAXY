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

type RaizInversaSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function RaizInversaScene({ stepId, onReadyChange }: RaizInversaSceneProps) {
  const [{ phase }, setState] = usePersistedLessonToolState(stepId, createDefaultState);
  const reduced = useReducedMotion();
  const done = phase >= PHASES - 1;

  useEffect(() => {
    onReadyChange(done);
  }, [done, onReadyChange]);

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        <StageEquation latex="5^2 = 25" visible={phase >= 0} />
        <span
          className={cn(
            "text-2xl text-[color:var(--stage-accent,#58c4dd)] transition-opacity duration-500",
            phase >= 1 ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        >
          ↔
        </span>
        <StageEquation latex="\\sqrt{25} = 5" visible={phase >= 1} />
      </div>

      <StageEquation
        latex="a^2 = b \\;\\Longleftrightarrow\\; \\sqrt{b} = a"
        visible={phase >= 2}
      />

      <svg viewBox="0 0 340 90" className="h-16 w-full max-w-md" aria-hidden>
        <DrawnArrow
          coords={[250, 55, 280, 30, 305, 48]}
          visible={phase >= 2}
          reduced={reduced}
          delayMs={0}
          stroke="#ffff00"
        />
        <DrawnArrow
          coords={[250, 78, 275, 62, 295, 72]}
          visible={phase >= 2}
          reduced={reduced}
          delayMs={100}
          stroke="#58c4dd"
        />
        <text
          x="308"
          y="44"
          className={cn(
            "fill-[#ffff00] text-[12px] font-bold transition-opacity duration-500",
            phase >= 2 ? "opacity-100" : "opacity-0",
          )}
        >
          Raíz
        </text>
        <text
          x="300"
          y="88"
          className={cn(
            "fill-[#58c4dd] text-[12px] font-bold transition-opacity duration-500",
            phase >= 2 ? "opacity-100" : "opacity-0",
          )}
        >
          Radicando
        </text>
      </svg>

      {!done ? (
        <AdvanceButton
          label={
            phase === 0 ? "Ver la raíz cuadrada" : phase === 1 ? "Ver la relación general" : "Continuar"
          }
          onClick={() => setState((prev) => ({ phase: Math.min(PHASES - 1, prev.phase + 1) }))}
        />
      ) : (
        <p className="text-center text-xs text-[color:var(--stage-muted,#94a3b8)]">
          <StageLabel className="normal-case tracking-normal">Raíz cuadrada</StageLabel> = operación
          inversa de elevar al cuadrado.
        </p>
      )}
    </div>
  );
}
