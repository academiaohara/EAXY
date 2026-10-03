"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ContarDiezSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function ContarDiezScene({ onReadyChange }: ContarDiezSceneProps) {
  const [count, setCount] = useState(0);
  const target = 10;

  useEffect(() => {
    onReadyChange(count >= target);
  }, [count, onReadyChange]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-center gap-6">
        <div className="text-center">
          <p className="text-4xl font-black leading-none text-cobalt sm:text-5xl">{count}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">pelotas</p>
        </div>
        <Button
          type="button"
          size="lg"
          className="rounded-full px-6"
          onClick={() => setCount((c) => Math.min(target, c + 1))}
          disabled={count >= target}
        >
          {count === 0 ? "Empezar a contar" : "Siguiente pelota"}
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-3 sm:gap-4">
        {Array.from({ length: target }, (_, index) => {
          const n = index + 1;
          const visible = n <= count;
          return (
            <div key={n} className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "text-sm font-bold tabular-nums text-cobalt transition-opacity",
                  visible ? "opacity-100" : "opacity-0",
                )}
              >
                {n}
              </span>
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-full border-2 border-orange-300 bg-gradient-to-br from-orange-200 to-orange-400 text-lg shadow-sm transition-all sm:size-14",
                  visible
                    ? "scale-100 opacity-100 animate-in zoom-in-50 duration-300"
                    : "scale-75 opacity-20",
                )}
                aria-hidden={!visible}
              >
                🏀
              </div>
            </div>
          );
        })}
      </div>

      {count >= target ? (
        <p className="text-center text-sm font-medium text-emerald-700">
          Diez unidades: el primer salto importante del sistema decimal.
        </p>
      ) : (
        <p className="text-center text-xs text-ink-muted">
          Cada pelota es una unidad. Llega a 10 para continuar.
        </p>
      )}
    </div>
  );
}
