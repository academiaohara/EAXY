"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  AdvanceButton,
  StageEquation,
  StageLabel,
} from "@/components/lesson/tools/potencias-raices/stage-shared";
import { cn } from "@/lib/utils";

const EXAMPLES = [
  { n: 5, area: 25, size: 52 },
  { n: 6, area: 36, size: 62 },
  { n: 20, area: 400, size: 88 },
] as const;

function createDefaultState() {
  return { index: 0 };
}

function PerfectSquare({
  side,
  area,
  sizePx,
  visible,
}: {
  side: number;
  area: number;
  sizePx: number;
  visible: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 transition-all duration-500",
        visible ? "scale-100 opacity-100" : "scale-90 opacity-0",
      )}
    >
      <StageEquation latex={`\\sqrt{${area}} = ${side}`} />
      <div className="relative" style={{ width: sizePx, height: sizePx }}>
        <div
          className="flex h-full w-full items-center justify-center rounded-sm border-2 border-[color:var(--stage-highlight,#ffff00)]/70 bg-[color:var(--stage-highlight)]/12 text-sm font-bold tabular-nums text-[color:var(--stage-ink,#fff)]"
        >
          {area}
        </div>
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs tabular-nums text-[color:var(--stage-muted,#94a3b8)]">
          {side}
        </span>
        <span className="absolute -right-4 top-1/2 -translate-y-1/2 text-xs tabular-nums text-[color:var(--stage-muted,#94a3b8)]">
          {side}
        </span>
      </div>
    </div>
  );
}

type CuadradosPerfectosSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function CuadradosPerfectosScene({ stepId, onReadyChange }: CuadradosPerfectosSceneProps) {
  const [{ index }, setState] = usePersistedLessonToolState(stepId, createDefaultState);
  const ex = EXAMPLES[index]!;
  const isLast = index >= EXAMPLES.length - 1;

  useEffect(() => {
    onReadyChange(isLast);
  }, [isLast, onReadyChange]);

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <StageLabel>Cuadrados perfectos</StageLabel>
      <p className="max-w-md text-center text-sm text-[color:var(--stage-muted,#94a3b8)]">
        Si la raíz es exacta, el radicando es un cuadrado perfecto.
      </p>

      <PerfectSquare side={ex.n} area={ex.area} sizePx={ex.size} visible />

      <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-sm">
        <span className="text-xs font-semibold tabular-nums text-[color:var(--stage-muted,#94a3b8)]">
          Ejemplo {index + 1}/{EXAMPLES.length}
        </span>
        {!isLast ? (
          <AdvanceButton
            label="Siguiente cuadrado"
            onClick={() => setState((prev) => ({ index: Math.min(EXAMPLES.length - 1, prev.index + 1) }))}
          />
        ) : (
          <p className="text-xs font-medium text-[color:var(--stage-accent-muted,#83c167)]">
            El lado del cuadrado es la raíz exacta.
          </p>
        )}
      </div>
    </div>
  );
}
