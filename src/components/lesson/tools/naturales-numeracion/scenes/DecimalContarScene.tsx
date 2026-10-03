"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BasketballBall } from "@/components/lesson/tools/naturales-numeracion/BasketballBall";
import { cn } from "@/lib/utils";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const TARGET_BALLS = 10;

type DecimalContarSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function DecimalContarScene({ onReadyChange }: DecimalContarSceneProps) {
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const [count, setCount] = useState(0);

  const digitsDone = seen.size === DIGITS.length;
  const ballsDone = count >= TARGET_BALLS;

  useEffect(() => {
    onReadyChange(digitsDone && ballsDone);
  }, [ballsDone, digitsDone, onReadyChange]);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-cobalt">
          Nosotros: sistema decimal
        </p>
        <p className="text-center text-sm text-ink-muted">
          Diez cifras distintas. Pulsa cada una; con ellas escribimos cualquier cantidad según la{" "}
          <strong>posición</strong> de cada dígito.
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {DIGITS.map((digit) => {
            const active = seen.has(digit);
            return (
              <button
                key={digit}
                type="button"
                onClick={() => setSeen((prev) => new Set(prev).add(digit))}
                className={cn(
                  "flex size-12 items-center justify-center rounded-xl border-2 text-xl font-bold tabular-nums transition-all sm:size-14 sm:text-2xl",
                  active
                    ? "scale-105 border-cobalt bg-cobalt text-white shadow-md"
                    : "border-slate-200 bg-white text-ink hover:border-cobalt/50",
                )}
                aria-pressed={active}
              >
                {digit}
              </button>
            );
          })}
        </div>
        <p className="text-center text-xs tabular-nums text-ink-muted">
          {seen.size}/{DIGITS.length} cifras
        </p>
      </section>

      <section
        className={cn(
          "space-y-5 rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6",
          !digitsDone && "pointer-events-none opacity-40",
        )}
        aria-hidden={!digitsDone}
      >
        <p className="text-center text-sm text-ink-muted">
          Contar es ir sumando <strong>unidades</strong>. Cuando llegas a diez, pasas al siguiente orden
          (decenas).
        </p>

        <p className="text-center">
          <span className="text-5xl font-black tabular-nums text-cobalt">{count}</span>
          <span className="mt-1 block text-xs font-semibold uppercase tracking-wide text-ink-muted">
            pelotas
          </span>
        </p>

        <div className="mx-auto grid max-w-lg grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: TARGET_BALLS }, (_, index) => {
            const n = index + 1;
            const visible = n <= count;
            return (
              <div key={n} className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    "text-sm font-bold tabular-nums text-cobalt",
                    visible ? "opacity-100" : "opacity-0",
                  )}
                >
                  {n}
                </span>
                <BasketballBall
                  faded={!visible}
                  className={cn(visible && "animate-in zoom-in-50 duration-300")}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center pt-2">
          <Button
            type="button"
            size="lg"
            className="rounded-full px-8"
            onClick={() => setCount((c) => Math.min(TARGET_BALLS, c + 1))}
            disabled={!digitsDone || count >= TARGET_BALLS}
          >
            {count === 0 ? "Empezar a contar" : "Siguiente pelota"}
          </Button>
        </div>

        {ballsDone ? (
          <p className="text-center text-sm font-medium text-emerald-700">
            Diez unidades: el primer salto importante del sistema decimal.
          </p>
        ) : null}
      </section>

      {!digitsDone ? (
        <p className="text-center text-xs text-ink-muted">Explora las diez cifras para activar el contador.</p>
      ) : null}
    </div>
  );
}
