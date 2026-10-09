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

/** Mismo objeto en todos los sumandos: $8 + 6$ son 8 manzanas y 6 manzanas. */
const UNIT_EMOJI = "🍎";
const UNIT_LABEL = "manzanas";

function EmojiPile({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className="flex max-w-[11rem] flex-wrap justify-center gap-0.5 rounded-xl border border-slate-200 bg-white px-2 py-2 shadow-sm"
        aria-label={`${count} ${UNIT_LABEL}`}
      >
        {Array.from({ length: count }, (_, index) => (
          <span key={index} className="text-xl leading-none" aria-hidden>
            {UNIT_EMOJI}
          </span>
        ))}
      </div>
      <span className="text-xs font-semibold text-ink-muted">{count}</span>
    </div>
  );
}

export function BloquesNumericosModule({ scene, blocks, onReadyChange }: BloquesNumericosModuleProps) {
  const reduced = useReducedMotion();
  const [swapped, setSwapped] = useState(false);
  const [groupLeft, setGroupLeft] = useState(true);
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

  if (scene === "conmutativa") {
    const first = swapped ? b : a;
    const second = swapped ? a : b;

    return (
      <div className="space-y-4" data-testid="bloques-numericos-conmutativa" aria-label="Propiedad conmutativa">
        <div className="flex flex-wrap items-end justify-center gap-4 rounded-xl bg-slate-100/80 p-4">
          <EmojiPile count={first} />
          <span className="pb-6 text-2xl font-bold text-ink">+</span>
          <EmojiPile count={second} />
          <span className="pb-6 font-mono text-lg font-bold text-ink">= {a + b}</span>
        </div>
        <p className="text-center text-sm text-ink-muted">
          <MathRenderer text={swapped ? `$${b} + ${a} = ${a + b}$` : `$${a} + ${b} = ${b} + ${a}$`} />
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            className="rounded-lg bg-cobalt px-4 py-2 text-sm font-semibold text-white hover:bg-cobalt/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            onClick={() => {
              setSwapped((prev) => !prev);
              if (!revealed) {
                complete();
              }
            }}
          >
            Intercambiar grupos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="bloques-numericos-asociativa" aria-label="Propiedad asociativa">
      <div className="flex flex-wrap items-end justify-center gap-3 rounded-xl bg-slate-100/80 p-6">
        {groupLeft ? (
          <>
            <div className="flex items-end gap-2 rounded-xl border-2 border-dashed border-cobalt/30 bg-white/80 px-3 py-2">
              <EmojiPile count={a} />
              <span className="pb-6 text-xl font-bold text-ink">+</span>
              <EmojiPile count={b} />
            </div>
            <span className="pb-6 text-xl font-bold text-ink">+</span>
            <EmojiPile count={c!} />
          </>
        ) : (
          <>
            <EmojiPile count={a} />
            <span className="pb-6 text-xl font-bold text-ink">+</span>
            <div className="flex items-end gap-2 rounded-xl border-2 border-dashed border-cobalt/30 bg-white/80 px-3 py-2">
              <EmojiPile count={b} />
              <span className="pb-6 text-xl font-bold text-ink">+</span>
              <EmojiPile count={c!} />
            </div>
          </>
        )}
        <span className="pb-6 font-mono text-lg font-bold text-ink">= {total}</span>
      </div>
      <p className="text-center text-sm text-ink-muted">
        <MathRenderer
          text={
            groupLeft
              ? `$(${a} + ${b}) + ${c} = ${total}$`
              : `$${a} + (${b} + ${c}) = ${total}$`
          }
        />
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          className="rounded-lg bg-cobalt px-4 py-2 text-sm font-semibold text-white hover:bg-cobalt/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          onClick={() => {
            setGroupLeft((prev) => !prev);
            if (!revealed) {
              complete();
            }
          }}
        >
          Cambiar agrupación
        </button>
      </div>
    </div>
  );
}
