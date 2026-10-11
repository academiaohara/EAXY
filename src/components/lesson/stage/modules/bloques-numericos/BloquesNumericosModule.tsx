"use client";

import { useCallback, useEffect, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

export type BloquesNumericosModuleProps = {
  scene: "conmutativa" | "asociativa";
  blocks: number[];
  onReadyChange?: (ready: boolean) => void;
};

const SUMAND_STYLES = [
  "bg-sky-500/90 ring-sky-300/50",
  "bg-amber-500/90 ring-amber-300/50",
  "bg-emerald-500/90 ring-emerald-300/50",
] as const;

function ChipPile({
  count,
  colorIndex,
  className,
}: {
  count: number;
  colorIndex: number;
  className?: string;
}) {
  const style = SUMAND_STYLES[colorIndex % SUMAND_STYLES.length]!;
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="flex max-w-[12rem] flex-wrap justify-center gap-1 rounded-xl border border-white/10 bg-black/30 px-3 py-3"
        aria-label={`${count} fichas`}
      >
        {Array.from({ length: count }, (_, index) => (
          <span
            key={index}
            className={cn("h-3.5 w-3.5 rounded-full ring-2", style)}
            aria-hidden
          />
        ))}
      </div>
      <span className="font-mono text-sm font-bold text-ink-muted">{count}</span>
    </div>
  );
}

export function BloquesNumericosModule({ scene, blocks, onReadyChange }: BloquesNumericosModuleProps) {
  const reduced = useReducedMotion();
  const [swapped, setSwapped] = useState(false);
  const [groupLeft, setGroupLeft] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [revealed, setRevealed] = useState(reduced);

  const [a, b, c] = blocks.length >= 3 ? blocks : [8, 6, 3];
  const total = a + b + (c ?? 0);

  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      onReadyChange?.(true);
    }
  }, [onReadyChange, reduced]);

  const complete = useCallback(() => {
    setRevealed(true);
    onReadyChange?.(true);
  }, [onReadyChange]);

  const runSwapAnimation = (action: () => void) => {
    if (reduced) {
      action();
      if (!revealed) {
        complete();
      }
      return;
    }
    setAnimating(true);
    action();
    window.setTimeout(() => setAnimating(false), 480);
    if (!revealed) {
      complete();
    }
  };

  if (scene === "conmutativa") {
    const leftCount = swapped ? b : a;
    const rightCount = swapped ? a : b;
    const equation = swapped ? `$${b} + ${a} = ${a + b}$` : `$${a} + ${b} = ${b} + ${a}$`;

    return (
      <div
        className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6"
        data-testid="bloques-numericos-conmutativa"
        aria-label="Propiedad conmutativa"
      >
        <div
          className={cn(
            "flex w-full flex-wrap items-end justify-center gap-4 rounded-2xl border border-[color:var(--stage-border,#334155)] bg-black/30 px-6 py-6 transition-transform duration-500",
            animating && "scale-[0.98]",
          )}
        >
          <ChipPile
            count={leftCount}
            colorIndex={swapped ? 1 : 0}
            className={cn("transition-transform duration-500", animating && swapped && "-translate-x-4")}
          />
          <span className="pb-8 text-3xl font-bold text-ink">+</span>
          <ChipPile
            count={rightCount}
            colorIndex={swapped ? 0 : 1}
            className={cn("transition-transform duration-500", animating && swapped && "translate-x-4")}
          />
        </div>
        <p className="font-mono text-2xl font-bold text-ink sm:text-3xl">
          <MathRenderer text={equation} />
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-lg bg-cobalt px-5 py-2.5 text-sm font-semibold text-white hover:bg-cobalt/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            onClick={() => runSwapAnimation(() => setSwapped((prev) => !prev))}
          >
            Intercambiar grupos
          </button>
        </div>
      </div>
    );
  }

  const equation = groupLeft
    ? `$(${a} + ${b}) + ${c} = ${a} + (${b} + ${c}) = ${total}$`
    : `$${a} + (${b} + ${c}) = (${a} + ${b}) + ${c} = ${total}$`;

  return (
    <div
      className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6"
      data-testid="bloques-numericos-asociativa"
      aria-label="Propiedad asociativa"
    >
      <div
        className={cn(
          "flex w-full flex-wrap items-end justify-center gap-3 rounded-2xl border border-[color:var(--stage-border,#334155)] bg-black/30 px-6 py-6 transition-transform duration-500",
          animating && "scale-[0.98]",
        )}
      >
        {groupLeft ? (
          <>
            <div
              className={cn(
                "flex items-end gap-2 rounded-xl border-2 border-dashed border-cobalt/40 bg-black/25 px-3 py-2 transition-transform duration-500",
                animating && "-translate-x-2",
              )}
            >
              <ChipPile count={a} colorIndex={0} />
              <span className="pb-8 text-2xl font-bold text-ink">+</span>
              <ChipPile count={b} colorIndex={1} />
            </div>
            <span className="pb-8 text-2xl font-bold text-ink">+</span>
            <ChipPile count={c!} colorIndex={2} />
          </>
        ) : (
          <>
            <ChipPile count={a} colorIndex={0} />
            <span className="pb-8 text-2xl font-bold text-ink">+</span>
            <div
              className={cn(
                "flex items-end gap-2 rounded-xl border-2 border-dashed border-cobalt/40 bg-black/25 px-3 py-2 transition-transform duration-500",
                animating && "translate-x-2",
              )}
            >
              <ChipPile count={b} colorIndex={1} />
              <span className="pb-8 text-2xl font-bold text-ink">+</span>
              <ChipPile count={c!} colorIndex={2} />
            </div>
          </>
        )}
      </div>
      <p className="text-center font-mono text-xl font-bold text-ink sm:text-2xl">
        <MathRenderer text={equation} />
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          className="rounded-lg bg-cobalt px-5 py-2.5 text-sm font-semibold text-white hover:bg-cobalt/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          onClick={() => runSwapAnimation(() => setGroupLeft((prev) => !prev))}
        >
          Cambiar agrupación
        </button>
      </div>
    </div>
  );
}
