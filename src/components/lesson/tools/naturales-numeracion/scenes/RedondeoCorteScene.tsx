"use client";

import { useEffect } from "react";
import { CheckIcon } from "lucide-react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import { RoundingCutView } from "@/components/lesson/tools/naturales-numeracion/RoundingCutView";
import {
  digitsOf,
  formatGrouped,
  lastKeptDigitIndex,
  orderById,
  roundToOrder,
  type RoundingOrderId,
} from "@/lib/lesson/naturales-redondeo";
import type { LessonStageTheme } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

function createDefaultRedondeoCorteState() {
  return { picked: null as number | null };
}

type RedondeoCorteSceneProps = {
  stepId: string;
  n: number;
  orderId: RoundingOrderId;
  onReadyChange: (ready: boolean) => void;
  theme?: LessonStageTheme;
};

export function RedondeoCorteScene({
  stepId,
  n,
  orderId,
  onReadyChange,
  theme = "paper",
}: RedondeoCorteSceneProps) {
  const digits = digitsOf(n);
  const order = orderById(orderId);
  const correctLastKept = lastKeptDigitIndex(digits.length, order.power);
  const [{ picked }, setState] = usePersistedLessonToolState(stepId, createDefaultRedondeoCorteState);
  const success = picked === correctLastKept;
  const onStage = theme === "board";

  useEffect(() => {
    onReadyChange(success);
  }, [onReadyChange, success]);

  return (
    <div className="space-y-5">
      <p
        className={cn(
          "text-center text-sm",
          onStage ? "text-[color:var(--stage-muted,#94a3b8)]" : "text-ink-muted",
        )}
      >
        Redondea{" "}
        <strong className={onStage ? "text-[color:var(--stage-ink,#e8edf5)]" : "text-ink"}>
          {formatGrouped(n)}
        </strong>{" "}
        a las <strong className="text-cobalt">{order.label.toLowerCase()}</strong>. Pulsa el{" "}
        <strong>último dígito que se conserva</strong> (la raya cortará a su derecha).
      </p>

      <div className="flex flex-wrap justify-center gap-1">
        {digits.split("").map((digit, index) => (
          <button
            key={`${digit}-${index}`}
            type="button"
            onClick={() => setState({ picked: index })}
            className={cn(
              "min-w-[2.75rem] rounded-xl border-2 px-2 py-3 text-2xl font-bold tabular-nums transition-all sm:text-3xl",
              picked === index
                ? success
                  ? onStage
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
                    : "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : onStage
                    ? "border-amber-400/80 bg-amber-500/15 text-amber-100"
                    : "border-amber-400 bg-amber-50 text-amber-900"
                : onStage
                  ? "border-[color:var(--stage-border,#475569)] bg-black/25 text-[color:var(--stage-ink,#e8edf5)] hover:border-cobalt/45"
                  : "border-slate-200 bg-white hover:border-cobalt/40",
            )}
            aria-pressed={picked === index}
          >
            {digit}
          </button>
        ))}
      </div>

      {picked !== null && !success ? (
        <p className={cn("text-center text-sm", onStage ? "text-amber-200" : "text-amber-800")}>
          Ese no es el orden pedido. Piensa qué cifra queda como última del orden «{order.label}».
        </p>
      ) : null}

      {success ? (
        <div className="space-y-3 animate-in fade-in duration-300">
          <div
            className={cn(
              "flex items-center justify-center gap-2",
              onStage ? "text-emerald-300" : "text-emerald-700",
            )}
          >
            <CheckIcon className="size-5" aria-hidden />
            <span className="font-semibold">Corte correcto</span>
          </div>
          <RoundingCutView
            n={n}
            orderId={orderId}
            selectedLastKeptIndex={correctLastKept}
            variant={onStage ? "stage" : "paper"}
          />
          <p
            className={cn(
              "text-center text-sm",
              onStage ? "text-[color:var(--stage-muted,#94a3b8)]" : "text-ink-muted",
            )}
          >
            Resultado:{" "}
            <strong className="text-xl tabular-nums text-cobalt">{formatGrouped(roundToOrder(n, orderId))}</strong>
          </p>
        </div>
      ) : null}
    </div>
  );
}
