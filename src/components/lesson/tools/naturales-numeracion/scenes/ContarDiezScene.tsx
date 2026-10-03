"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BasketballBall } from "@/components/lesson/tools/naturales-numeracion/BasketballBall";
import { cn } from "@/lib/utils";

const TARGET = 10;

type ContarDiezSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function ContarDiezScene({ onReadyChange }: ContarDiezSceneProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    onReadyChange(count >= TARGET);
  }, [count, onReadyChange]);

  return (
    <div className="flex flex-col items-center gap-4 py-1">
      <p className="max-w-lg text-center text-sm text-ink-muted">
        Contar es ir sumando <strong className="text-ink">unidades</strong>. Cuando juntas diez, das el salto a las{" "}
        <strong className="text-ink">decenas</strong>.
      </p>

      <p className="text-center leading-none">
        <span className="text-5xl font-black tabular-nums text-cobalt">{count}</span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
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
        onClick={() => setCount((c) => Math.min(TARGET, c + 1))}
        disabled={count >= TARGET}
      >
        {count === 0 ? "Empezar a contar" : "Siguiente pelota"}
      </Button>

      {count >= TARGET ? (
        <p className="text-center text-xs font-medium text-emerald-700">
          Diez unidades = una decena. Así empieza la numeración posicional.
        </p>
      ) : null}
    </div>
  );
}
