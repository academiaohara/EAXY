"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  AdvanceButton,
  StageEquation,
  StageLabel,
} from "@/components/lesson/tools/potencias-raices/stage-shared";
import { cn } from "@/lib/utils";

const SIDE = 6;
const PHASES = 3;

function createDefaultState() {
  return { phase: 0 };
}

function SquareGrid({ side, visible }: { side: number; visible: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-0.5 transition-all duration-700",
        visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
      )}
      style={{
        gridTemplateColumns: `repeat(${side}, minmax(0, 1fr))`,
        width: `${side * 14 + (side - 1) * 2}px`,
      }}
    >
      {Array.from({ length: side * side }, (_, i) => (
        <span
          key={i}
          className="size-3.5 rounded-[2px] border border-[color:var(--stage-accent,#58c4dd)]/60 bg-[color:var(--stage-accent)]/25 sm:size-4"
          style={{
            transitionDelay: visible ? `${(i % side) * 30 + Math.floor(i / side) * 40}ms` : "0ms",
          }}
        />
      ))}
    </div>
  );
}

function CubeStack({ visible }: { visible: boolean }) {
  const layers = 3;
  const cells = 4;
  return (
    <div
      className={cn(
        "flex flex-col-reverse items-center gap-0.5 transition-all duration-700",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      {Array.from({ length: layers }, (_, layer) => (
        <div
          key={layer}
          className="grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${cells}, minmax(0, 1fr))`,
            transform: `translate(${layer * 4}px, ${-layer * 4}px)`,
          }}
        >
          {Array.from({ length: cells * cells }, (_, i) => (
            <span
              key={i}
              className="size-2.5 rounded-[2px] border border-[color:var(--stage-highlight,#ffff00)]/50 bg-[color:var(--stage-highlight)]/15 sm:size-3"
            />
          ))}
        </div>
      ))}
      <p className="mt-2 text-[10px] text-[color:var(--stage-muted,#94a3b8)]">
        Arista $6$ → $6^3 = 216$ cubitos
      </p>
    </div>
  );
}

type CuadradoCuboSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function CuadradoCuboScene({ stepId, onReadyChange }: CuadradoCuboSceneProps) {
  const [{ phase }, setState] = usePersistedLessonToolState(stepId, createDefaultState);
  const done = phase >= PHASES - 1;

  useEffect(() => {
    onReadyChange(done);
  }, [done, onReadyChange]);

  return (
    <div className="flex flex-col gap-8 py-1">
      <section className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10">
        <SquareGrid side={SIDE} visible={phase >= 0} />
        <div
          className={cn(
            "space-y-1 text-center transition-opacity duration-500 sm:text-left",
            phase >= 0 ? "opacity-100" : "opacity-0",
          )}
        >
          <StageLabel tone="highlight">Cuadrado</StageLabel>
          <StageEquation latex="6^2 = 6 \\cdot 6 = 36" />
          <p className="text-xs text-[color:var(--stage-muted,#94a3b8)]">(36 cuadraditos)</p>
        </div>
      </section>

      <section
        className={cn(
          "flex flex-col items-center gap-3 border-t border-[color:var(--stage-border,#3d4f66)]/60 pt-6 sm:flex-row sm:justify-center sm:gap-10",
          phase >= 1 ? "opacity-100" : "opacity-30",
        )}
      >
        <CubeStack visible={phase >= 1} />
        <div className="space-y-1 text-center sm:text-left">
          <StageLabel tone="highlight">Cubo</StageLabel>
          <StageEquation latex="6^3 = 6 \\cdot 6 \\cdot 6 = 216" visible={phase >= 1} />
        </div>
      </section>

      {!done ? (
        <div className="flex justify-center">
          <AdvanceButton
            label={phase === 0 ? "Ver el cubo" : "Resumen"}
            onClick={() => setState((prev) => ({ phase: Math.min(PHASES - 1, prev.phase + 1) }))}
          />
        </div>
      ) : (
        <p className="text-center text-xs font-medium text-[color:var(--stage-accent-muted,#83c167)]">
          Exponente $2$ → cuadrado (área). Exponente $3$ → cubo (volumen).
        </p>
      )}
    </div>
  );
}
