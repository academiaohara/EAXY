"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  AdvanceButton,
  StageEquation,
  StageLabel,
} from "@/components/lesson/tools/potencias-raices/stage-shared";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";

const PHASES = 3;

function createDefaultState() {
  return { phase: 0 };
}

type RaizEnteraSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function RaizEnteraScene({ stepId, onReadyChange }: RaizEnteraSceneProps) {
  const [{ phase }, setState] = usePersistedLessonToolState(stepId, createDefaultState);
  const done = phase >= PHASES - 1;

  useEffect(() => {
    onReadyChange(done);
  }, [done, onReadyChange]);

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <StageLabel>Ejemplo</StageLabel>
      <StageEquation latex="\\sqrt{40}" />

      <div className="flex flex-wrap justify-center gap-6">
        <StageEquation latex="6^2 = 36 < 40" visible={phase >= 0} />
        <StageEquation latex="7^2 = 49 > 40" visible={phase >= 0} />
      </div>

      <div
        className={cn(
          "transition-opacity duration-500",
          phase >= 1 ? "opacity-100" : "opacity-0",
        )}
      >
        <MathRenderer
          text="$6 < \\sqrt{40} < 7$"
          className="text-xl [&_.katex]:text-[color:var(--stage-ink,#fff)] [&_.mord:nth-child(1)]:text-[color:var(--stage-accent,#58c4dd)]"
        />
      </div>

      <p
        className={cn(
          "max-w-md text-center text-sm leading-relaxed text-[color:var(--stage-muted,#94a3b8)] transition-opacity duration-500",
          phase >= 2 ? "opacity-100" : "opacity-0",
        )}
      >
        Al entero que más se aproxima <strong className="text-[color:var(--stage-highlight,#ffff00)]">por debajo</strong>{" "}
        lo llamamos <mark className="bg-[color:var(--stage-highlight)]/20 text-[color:var(--stage-highlight)]">raíz entera</mark>.
      </p>

      <StageEquation latex="\\text{Raíz entera de } 40 \\text{ es } 6" visible={phase >= 2} />

      {!done ? (
        <AdvanceButton
          label={phase === 0 ? "Comparar con 40" : phase === 1 ? "Definir raíz entera" : "Listo"}
          onClick={() => setState((prev) => ({ phase: Math.min(PHASES - 1, prev.phase + 1) }))}
        />
      ) : null}
    </div>
  );
}
