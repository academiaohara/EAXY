"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import { Button } from "@/components/ui/button";
import { BasketballBall } from "@/components/lesson/tools/naturales-numeracion/BasketballBall";
import { cn } from "@/lib/utils";

const TARGET = 10;

function createDefaultContarDiezState() {
  return { count: 0 };
}

type ContarDiezSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function ContarDiezScene({ stepId, onReadyChange }: ContarDiezSceneProps) {
  const [{ count }, setState] = usePersistedLessonToolState(stepId, createDefaultContarDiezState);

  useEffect(() => {
    onReadyChange(count >= TARGET);
  }, [count, onReadyChange]);

  return (
    <div className="flex flex-col items-center gap-4 py-1">
      <p className="w-full text-center text-sm text-[color:var(--stage-muted,#94a3b8)] sm:max-w-none sm:whitespace-nowrap">
        Contar es ir sumando <strong className="text-[color:var(--stage-ink,#e8edf5)]">unidades</strong>. Cuando juntas diez, das el salto a las{" "}
        <strong className="text-[color:var(--stage-ink,#e8edf5)]">decenas</strong>.
      </p>

      <p className="text-center leading-none">
        <span className="text-5xl font-black tabular-nums text-cobalt">{count}</span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-widest text-[color:var(--stage-muted,#94a3b8)]">
          pelotas
        </span>
      </p>

      <div className="grid w-full max-w-md grid-cols-5 gap-2 sm:gap-2.5">
        {Array.from({ length: TARGET }, (_, index) => {
          const visible = index < count;
          return (
            <BasketballBall
              key={index}
              faded={!visible}
              className={cn(
                "mx-auto w-full max-w-[3.25rem]",
                visible && "animate-in zoom-in-50 duration-200",
              )}
            />
          );
        })}
      </div>

      <Button
        type="button"
        size="lg"
        className="mt-1 rounded-full px-8"
        onClick={() => setState((prev) => ({ count: Math.min(TARGET, prev.count + 1) }))}
        disabled={count >= TARGET}
      >
        {count === 0 ? "Empezar a contar" : "Siguiente pelota"}
      </Button>

      {count >= TARGET ? (
        <p className="text-center text-xs font-medium text-[color:var(--stage-accent,#6ee7b7)]">
          Diez unidades = una decena. Así empieza la numeración posicional.
        </p>
      ) : null}
    </div>
  );
}
