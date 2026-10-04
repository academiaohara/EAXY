"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type DecimalIntroSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function DecimalIntroScene({ onReadyChange }: DecimalIntroSceneProps) {
  useEffect(() => {
    onReadyChange(true);
  }, [onReadyChange]);

  return (
    <div className="space-y-5">
      <p className="text-center text-sm font-semibold uppercase tracking-wider text-cobalt">
        Sistema decimal
      </p>
      <div className="space-y-3 text-sm leading-relaxed text-ink-muted">
        <p>
          Usamos <strong className="text-ink">base 10</strong>: con diez símbolos escribimos cualquier cantidad.
          Es un sistema <strong className="text-ink">posicional</strong>: el valor de una cifra depende del lugar
          que ocupa (unidades, decenas, centenas…).
        </p>
        <p>
          El <strong className="text-ink">0</strong> indica que en ese orden no hay cantidad y nos permite escribir
          números como <strong className="text-ink tabular-nums">305</strong> o{" "}
          <strong className="whitespace-nowrap text-ink tabular-nums">10.040</strong> (diez mil cuarenta).
        </p>
        <p>
          Cada salto hacia la izquierda multiplica por diez; hacia la derecha, divides entre diez. Por eso diez
          unidades forman una decena, diez decenas una centena, y así sucesivamente.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {DIGITS.map((digit) => (
          <span
            key={digit}
            className={cn(
              "flex size-11 items-center justify-center rounded-xl border-2 border-cobalt/25 bg-cobalt-tint/50 text-lg font-bold tabular-nums text-cobalt sm:size-12 sm:text-xl",
            )}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
}
