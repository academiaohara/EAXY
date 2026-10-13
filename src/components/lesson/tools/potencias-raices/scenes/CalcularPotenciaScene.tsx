"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  AdvanceButton,
  StageEquation,
  StageLabel,
} from "@/components/lesson/tools/potencias-raices/stage-shared";
import { cn } from "@/lib/utils";

const FRAMES = [
  { caption: "Producto repetido", latex: "8^5 = 8 \\cdot 8 \\cdot 8 \\cdot 8 \\cdot 8" },
  { caption: "Primeros pares", latex: "8 \\cdot 8 = 64 \\quad\\Rightarrow\\quad 64 \\cdot 8 = 512" },
  { caption: "Seguimos agrupando", latex: "512 \\cdot 8 = 4096" },
  { caption: "Resultado", latex: "4096 \\cdot 8 = 32\\,768" },
];

function createDefaultState() {
  return { index: 0 };
}

type CalcularPotenciaSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function CalcularPotenciaScene({ stepId, onReadyChange }: CalcularPotenciaSceneProps) {
  const [{ index }, setState] = usePersistedLessonToolState(stepId, createDefaultState);
  const frame = FRAMES[index]!;
  const isLast = index >= FRAMES.length - 1;

  useEffect(() => {
    onReadyChange(isLast);
  }, [isLast, onReadyChange]);

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <StageLabel>Ejemplo — $8^5$</StageLabel>
      <p className="text-center text-sm text-[color:var(--stage-muted,#94a3b8)]">{frame.caption}</p>
      <StageEquation latex={frame.latex} />

      <div
        className={cn(
          "rounded-xl border border-[color:var(--stage-accent,#58c4dd)]/30 bg-black/25 px-4 py-3 text-center text-xs leading-relaxed text-[color:var(--stage-muted,#94a3b8)] transition-opacity duration-500",
          index >= 1 ? "opacity-100" : "opacity-0",
        )}
      >
        Las potencias, salvo casos sencillos, dan números grandes; por eso muchas veces usamos
        calculadora.
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-md">
        <span className="text-xs font-semibold tabular-nums text-[color:var(--stage-muted,#94a3b8)]">
          Paso {index + 1}/{FRAMES.length}
        </span>
        {!isLast ? (
          <AdvanceButton
            label="Siguiente paso"
            onClick={() => setState((prev) => ({ index: Math.min(FRAMES.length - 1, prev.index + 1) }))}
          />
        ) : (
          <p className="text-sm font-medium text-[color:var(--stage-accent-muted,#83c167)]">
            Resultado: 32 768
          </p>
        )}
      </div>
    </div>
  );
}
