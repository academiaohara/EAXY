"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import { Button } from "@/components/ui/button";
import { RoundingCutView } from "@/components/lesson/tools/naturales-numeracion/RoundingCutView";
import {
  DEMO_ROUNDING_EXAMPLES,
  formatGrouped,
  orderById,
} from "@/lib/lesson/naturales-redondeo";
import type { LessonStageTheme } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

function createDefaultRedondeoDemoState() {
  return { index: 0 };
}

type RedondeoDemoSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
  theme?: LessonStageTheme;
};

export function RedondeoDemoScene({
  stepId,
  onReadyChange,
  theme = "paper",
}: RedondeoDemoSceneProps) {
  const [{ index }, setState] = usePersistedLessonToolState(stepId, createDefaultRedondeoDemoState);
  const example = DEMO_ROUNDING_EXAMPLES[index];
  const isLast = index >= DEMO_ROUNDING_EXAMPLES.length - 1;
  const onStage = theme === "board";

  useEffect(() => {
    onReadyChange(isLast);
  }, [isLast, onReadyChange]);

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "rounded-xl border px-4 py-3 text-sm leading-relaxed",
          onStage
            ? "border-[color:var(--stage-accent,#58c4dd)]/35 bg-[color:var(--stage-accent)]/12 text-[color:var(--stage-ink,#e8edf5)]"
            : "border-rose-200 bg-rose-50/60 text-ink",
        )}
      >
        <p className={cn("font-semibold", onStage ? "text-[color:var(--stage-accent,#58c4dd)]" : "text-rose-900")}>
          Regla del redondeo
        </p>
        <ol
          className={cn(
            "mt-2 list-decimal space-y-1 pl-5",
            onStage ? "text-[color:var(--stage-muted,#94a3b8)]" : "text-ink-muted",
          )}
        >
          <li>Sustituye por ceros todas las cifras a la derecha del orden elegido.</li>
          <li>
            Si la{" "}
            <strong className={onStage ? "text-[color:var(--stage-ink,#e8edf5)]" : "text-ink"}>
              primera cifra quitada
            </strong>{" "}
            es 5 o mayor, suma 1 a la cifra anterior.
          </li>
        </ol>
      </div>

      <p
        className={cn(
          "text-center text-sm",
          onStage ? "text-[color:var(--stage-muted,#94a3b8)]" : "text-ink-muted",
        )}
      >
        Aproximaciones de{" "}
        <strong className={onStage ? "text-[color:var(--stage-ink,#e8edf5)]" : "text-ink"}>
          {formatGrouped(example.n)}
        </strong>{" "}
        —{" "}
        <span className="text-cobalt">{orderById(example.orderId).label.toLowerCase()}</span>
      </p>

      <RoundingCutView n={example.n} orderId={example.orderId} variant={onStage ? "stage" : "paper"} />

      <p
        className={cn(
          "text-center text-sm",
          onStage ? "text-[color:var(--stage-muted,#94a3b8)]" : "text-ink-muted",
        )}
      >
        {example.caption}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className={cn(
            "text-xs font-semibold tabular-nums",
            onStage ? "text-[color:var(--stage-muted,#94a3b8)]" : "text-ink-muted",
          )}
        >
          Ejemplo {index + 1}/{DEMO_ROUNDING_EXAMPLES.length}
        </span>
        {!isLast ? (
          <Button type="button" onClick={() => setState((prev) => ({ index: prev.index + 1 }))}>
            Siguiente ejemplo
          </Button>
        ) : (
          <p className={cn("text-sm font-medium", onStage ? "text-emerald-300" : "text-emerald-700")}>
            Has visto los tres ejemplos de redondeo.
          </p>
        )}
      </div>
    </div>
  );
}
