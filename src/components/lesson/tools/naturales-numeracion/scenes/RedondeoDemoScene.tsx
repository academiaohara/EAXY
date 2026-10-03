"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RoundingCutView } from "@/components/lesson/tools/naturales-numeracion/RoundingCutView";
import {
  DEMO_ROUNDING_EXAMPLES,
  formatGrouped,
  orderById,
} from "@/lib/lesson/naturales-redondeo";

type RedondeoDemoSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function RedondeoDemoScene({ onReadyChange }: RedondeoDemoSceneProps) {
  const [index, setIndex] = useState(0);
  const example = DEMO_ROUNDING_EXAMPLES[index];
  const isLast = index >= DEMO_ROUNDING_EXAMPLES.length - 1;

  useEffect(() => {
    onReadyChange(isLast);
  }, [isLast, onReadyChange]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-rose-200 bg-rose-50/60 px-4 py-3 text-sm leading-relaxed text-ink">
        <p className="font-semibold text-rose-900">Regla del redondeo</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-ink-muted">
          <li>Sustituye por ceros todas las cifras a la derecha del orden elegido.</li>
          <li>
            Si la <strong className="text-ink">primera cifra quitada</strong> es 5 o mayor, suma 1 a la
            cifra anterior.
          </li>
        </ol>
      </div>

      <p className="text-center text-sm text-ink-muted">
        Aproximaciones de <strong className="text-ink">{formatGrouped(example.n)}</strong> —{" "}
        <span className="text-cobalt">{orderById(example.orderId).label.toLowerCase()}</span>
      </p>

      <RoundingCutView n={example.n} orderId={example.orderId} />

      <p className="text-center text-sm text-ink-muted">{example.caption}</p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold tabular-nums text-ink-muted">
          Ejemplo {index + 1}/{DEMO_ROUNDING_EXAMPLES.length}
        </span>
        {!isLast ? (
          <Button type="button" onClick={() => setIndex((i) => i + 1)}>
            Siguiente ejemplo
          </Button>
        ) : (
          <p className="text-sm font-medium text-emerald-700">Has visto los tres casos del temario.</p>
        )}
      </div>
    </div>
  );
}
