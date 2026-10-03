"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "lucide-react";
import { RoundingCutView } from "@/components/lesson/tools/naturales-numeracion/RoundingCutView";
import {
  digitsOf,
  formatGrouped,
  lastKeptDigitIndex,
  orderById,
  roundToOrder,
  type RoundingOrderId,
} from "@/lib/lesson/naturales-redondeo";
import { cn } from "@/lib/utils";

type RedondeoCorteSceneProps = {
  n: number;
  orderId: RoundingOrderId;
  onReadyChange: (ready: boolean) => void;
};

export function RedondeoCorteScene({ n, orderId, onReadyChange }: RedondeoCorteSceneProps) {
  const digits = digitsOf(n);
  const order = orderById(orderId);
  const correctLastKept = lastKeptDigitIndex(digits.length, order.power);
  const [picked, setPicked] = useState<number | null>(null);
  const success = picked === correctLastKept;

  useEffect(() => {
    onReadyChange(success);
  }, [onReadyChange, success]);

  return (
    <div className="space-y-5">
      <p className="text-center text-sm text-ink-muted">
        Redondea <strong className="text-ink">{formatGrouped(n)}</strong> a las{" "}
        <strong className="text-cobalt">{order.label.toLowerCase()}</strong>. Pulsa el{" "}
        <strong>último dígito que se conserva</strong> (la raya cortará a su derecha).
      </p>

      <div className="flex flex-wrap justify-center gap-1">
        {digits.split("").map((digit, index) => (
          <button
            key={`${digit}-${index}`}
            type="button"
            onClick={() => setPicked(index)}
            className={cn(
              "min-w-[2.75rem] rounded-xl border-2 px-2 py-3 text-2xl font-bold tabular-nums transition-all sm:text-3xl",
              picked === index
                ? success
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : "border-amber-400 bg-amber-50 text-amber-900"
                : "border-slate-200 bg-white hover:border-cobalt/40",
            )}
            aria-pressed={picked === index}
          >
            {digit}
          </button>
        ))}
      </div>

      {picked !== null && !success ? (
        <p className="text-center text-sm text-amber-800">
          Ese no es el orden pedido. Piensa qué cifra queda como última del orden «{order.label}».
        </p>
      ) : null}

      {success ? (
        <div className="space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center justify-center gap-2 text-emerald-700">
            <CheckIcon className="size-5" aria-hidden />
            <span className="font-semibold">Corte correcto</span>
          </div>
          <RoundingCutView n={n} orderId={orderId} selectedLastKeptIndex={correctLastKept} />
          <p className="text-center text-sm text-ink-muted">
            Resultado:{" "}
            <strong className="text-xl tabular-nums text-cobalt">{formatGrouped(roundToOrder(n, orderId))}</strong>
          </p>
        </div>
      ) : null}
    </div>
  );
}
