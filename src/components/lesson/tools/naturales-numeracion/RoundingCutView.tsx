"use client";

import {
  digitsOf,
  formatGrouped,
  lastKeptDigitIndex,
  orderById,
  roundToOrder,
  type RoundingOrderId,
} from "@/lib/lesson/naturales-redondeo";
import { cn } from "@/lib/utils";

type RoundingCutViewProps = {
  n: number;
  orderId: RoundingOrderId;
  /** Si se indica, resalta el corte elegido por el alumno (índice del último dígito conservado). */
  selectedLastKeptIndex?: number | null;
  showResult?: boolean;
  className?: string;
  variant?: "paper" | "stage";
};

export function RoundingCutView({
  n,
  orderId,
  selectedLastKeptIndex = null,
  showResult = true,
  className,
  variant = "paper",
}: RoundingCutViewProps) {
  const digits = digitsOf(n);
  const order = orderById(orderId);
  const lastKept = lastKeptDigitIndex(digits.length, order.power);
  const activeLastKept = selectedLastKeptIndex ?? lastKept;
  const firstRemoved = activeLastKept + 1;
  const firstRemovedDigit = firstRemoved < digits.length ? Number(digits[firstRemoved]) : 0;
  const roundsUp = firstRemovedDigit >= 5;
  const previewResult = roundToOrder(n, orderId);
  const onStage = variant === "stage";

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-center gap-1 text-2xl font-bold tabular-nums tracking-wide sm:text-3xl">
        {digits.split("").map((digit, index) => (
          <span key={`${digit}-${index}`} className="inline-flex items-center">
            <span
              className={cn(
                "rounded-md px-0.5",
                index <= activeLastKept
                  ? onStage
                    ? "text-[color:var(--stage-ink,#e8edf5)]"
                    : "text-ink"
                  : onStage
                    ? "text-[color:var(--stage-muted,#94a3b8)] underline decoration-rose-400/80 decoration-2"
                    : "text-ink-muted underline decoration-rose-400 decoration-2",
                index === activeLastKept &&
                  (onStage
                    ? "bg-[color:var(--stage-accent,#58c4dd)]/25 text-[color:var(--stage-accent,#58c4dd)] ring-2 ring-[color:var(--stage-accent,#58c4dd)]/40"
                    : "bg-cobalt-tint text-cobalt ring-2 ring-cobalt/40"),
              )}
            >
              {digit}
            </span>
            {index === activeLastKept ? (
              <span
                className="mx-1 inline-block h-8 w-0.5 shrink-0 bg-rose-500 sm:h-10"
                aria-hidden
              />
            ) : null}
          </span>
        ))}
      </div>

      {showResult ? (
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {firstRemoved < digits.length ? (
            <span
              className={cn(
                "rounded-full px-3 py-1",
                onStage
                  ? "bg-rose-500/15 text-rose-200"
                  : "bg-rose-50 text-rose-800",
              )}
            >
              Primera cifra quitada: <strong>{digits[firstRemoved]}</strong>
              {roundsUp ? " → sumamos 1" : " → no subimos"}
            </span>
          ) : null}
          <span
            className={cn(
              "flex items-center gap-2",
              onStage ? "text-[color:var(--stage-accent-muted,#83c167)]" : "text-cobalt",
            )}
          >
            <span aria-hidden>→</span>
            <strong className="text-xl tabular-nums">{formatGrouped(previewResult)}</strong>
          </span>
        </div>
      ) : null}
    </div>
  );
}
