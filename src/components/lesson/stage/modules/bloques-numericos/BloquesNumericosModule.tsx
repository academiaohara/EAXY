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

const UNIT = 18;

function Block({ value, tone }: { value: number; tone: string }) {
  const width = value * UNIT;
  return (
    <div
      className={cn("flex h-10 items-center justify-center rounded-md border-2 font-mono text-sm font-bold text-white shadow-sm", tone)}
      style={{ width: `${width}px`, minWidth: `${UNIT}px` }}
      aria-label={`Bloque de longitud ${value}`}
    >
      {value}
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
    const left = swapped ? [b, a] : [a, b];
    return (
      <div className="space-y-4" data-testid="bloques-numericos-conmutativa" aria-label="Propiedad conmutativa">
        <div className="flex flex-wrap items-end gap-2 rounded-xl bg-slate-100/80 p-4">
          {left.map((value, index) => (
            <Block key={`${value}-${index}`} value={value} tone={index === 0 ? "bg-cobalt border-cobalt" : "bg-emerald-600 border-emerald-700"} />
          ))}
          <span className="pb-2 font-mono text-lg font-bold text-ink">= {a + b}</span>
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
            Intercambiar bloques
          </button>
        </div>
      </div>
    );
  }

  const leftGroup = groupLeft ? [a + b, c] : [a, b + c];
  const labels = groupLeft ? [`(${a}+${b})`, `${c}`] : [`${a}`, `(${b}+${c})`];

  return (
    <div className="space-y-4" data-testid="bloques-numericos-asociativa" aria-label="Propiedad asociativa">
      <div className="relative flex flex-wrap items-end justify-center gap-3 rounded-xl bg-slate-100/80 p-6">
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1">
            {groupLeft ? (
              <>
                <Block value={a} tone="bg-cobalt border-cobalt" />
                <Block value={b} tone="bg-emerald-600 border-emerald-700" />
              </>
            ) : (
              <Block value={a} tone="bg-cobalt border-cobalt" />
            )}
          </div>
          {!groupLeft ? null : (
            <span className="text-xs font-medium text-ink-muted">{labels[0]}</span>
          )}
        </div>
        <span className="pb-2 text-xl font-bold text-ink">+</span>
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1">
            {groupLeft ? (
              <Block value={c!} tone="bg-amber-500 border-amber-600" />
            ) : (
              <>
                <Block value={b} tone="bg-emerald-600 border-emerald-700" />
                <Block value={c!} tone="bg-amber-500 border-amber-600" />
              </>
            )}
          </div>
          <span className="text-xs font-medium text-ink-muted">{labels[1]}</span>
        </div>
        <span className="pb-2 font-mono text-lg font-bold text-ink">= {total}</span>
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
