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
      <p className="text-center text-sm font-semibold uppercase tracking-wider text-[color:var(--stage-accent,#58c4dd)]">
        Los diez dígitos
      </p>
      <p className="text-center text-sm leading-relaxed text-[color:var(--stage-muted,#94a3b8)]">
        Con ellos escribimos cualquier cantidad, como{" "}
        <strong className="text-[color:var(--stage-ink,#e8edf5)] tabular-nums">305</strong> o{" "}
        <strong className="whitespace-nowrap text-[color:var(--stage-ink,#e8edf5)] tabular-nums">
          10.040
        </strong>{" "}
        (diez mil cuarenta).
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {DIGITS.map((digit) => (
          <span
            key={digit}
            className={cn(
              "flex size-11 items-center justify-center rounded-xl border-2 border-[color:var(--stage-accent)]/35 bg-[color:var(--stage-accent)]/12 text-lg font-bold tabular-nums text-[color:var(--stage-ink,#e8edf5)] sm:size-12 sm:text-xl",
            )}
          >
            {digit}
          </span>
        ))}
      </div>
    </div>
  );
}
