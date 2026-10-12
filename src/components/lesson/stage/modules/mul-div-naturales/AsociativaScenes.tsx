"use client";

import { useCallback, useEffect, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

const STAGE_CAPTION = "text-xs font-semibold text-[color:var(--stage-muted,#94a3b8)]";
const STAGE_MATH =
  "lesson-stage-mul-equation text-center text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)]";

function EggDot() {
  return (
    <span
      className="inline-block h-2 w-2.5 rounded-full bg-gradient-to-b from-amber-100 to-amber-400 shadow-sm ring-1 ring-amber-600/30"
      aria-hidden
    />
  );
}

function EggBox() {
  return (
    <div className="flex h-8 w-9 flex-col items-center justify-center gap-0.5 rounded-md border border-sky-400/35 bg-sky-500/15 shadow-none">
      <EggDot />
      <EggDot />
    </div>
  );
}

type GroupMode = "left" | "right";

export function AsociativaHuevosDiscover({
  a,
  b,
  c,
  onReadyChange,
}: {
  a: number;
  b: number;
  c: number;
  onReadyChange?: (ready: boolean) => void;
}) {
  const total = a * b * c;
  const [group, setGroup] = useState<GroupMode>("left");
  const [seenLeft, setSeenLeft] = useState(true);
  const [seenRight, setSeenRight] = useState(false);
  const reduced = useReducedMotion();

  const pickGroup = useCallback((next: GroupMode) => {
    setGroup(next);
    if (next === "left") {
      setSeenLeft(true);
    } else {
      setSeenRight(true);
    }
  }, []);

  useEffect(() => {
    onReadyChange?.(seenLeft && seenRight);
  }, [onReadyChange, seenLeft, seenRight]);

  const showSameResult = seenLeft && seenRight;

  const blockGrid =
    group === "left" ? (
      <div
        className="grid gap-1 rounded-xl border-2 border-sky-400/60 bg-sky-500/10 p-2 transition-all duration-700"
        style={{
          gridTemplateColumns: `repeat(${b}, minmax(0, 2rem))`,
          gridTemplateRows: `repeat(${a}, minmax(0, 1.85rem))`,
        }}
      >
        {Array.from({ length: a * b }, (_, i) => (
          <EggBox key={i} />
        ))}
      </div>
    ) : (
      <div className="flex flex-col gap-1 transition-all duration-700">
        {Array.from({ length: a }, (_, row) => (
          <div
            key={row}
            className="grid gap-1 rounded-lg border-2 border-violet-300/70 bg-violet-400/10 p-1.5"
            style={{ gridTemplateColumns: `repeat(${b}, minmax(0, 2rem))` }}
          >
            {Array.from({ length: b }, (_, col) => (
              <EggBox key={col} />
            ))}
          </div>
        ))}
      </div>
    );

  return (
    <div className="space-y-4" aria-label="Descubrir la propiedad asociativa con huevos">
      <p className={cn(STAGE_CAPTION, "text-center uppercase tracking-wide")}>
        {a} estantes × {b} cajas × {c} huevos
      </p>

      <div className="mx-auto flex max-w-full justify-center">
        <div className={cn("transition-all duration-700 ease-out", !reduced && "scale-100")}>
          {blockGrid}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => pickGroup("left")}
          className={cn(
            "min-h-[44px] rounded-xl border-2 px-4 py-2 font-mono text-sm font-bold transition",
            group === "left"
              ? "border-sky-400 bg-sky-400/20 text-[color:var(--stage-chalk,#f8fafc)]"
              : "border-[color:var(--stage-border,#334155)] bg-black/20 text-[color:var(--stage-muted,#94a3b8)] hover:bg-black/30",
          )}
          aria-pressed={group === "left"}
        >
          ({a} · {b}) · {c}
        </button>
        <button
          type="button"
          onClick={() => pickGroup("right")}
          className={cn(
            "min-h-[44px] rounded-xl border-2 px-4 py-2 font-mono text-sm font-bold transition",
            group === "right"
              ? "border-violet-300 bg-violet-400/20 text-[color:var(--stage-chalk,#f8fafc)]"
              : "border-[color:var(--stage-border,#334155)] bg-black/20 text-[color:var(--stage-muted,#94a3b8)] hover:bg-black/30",
          )}
          aria-pressed={group === "right"}
        >
          {a} · ({b} · {c})
        </button>
      </div>

      <p className={STAGE_MATH} aria-live="polite">
        <MathRenderer
          text={
            group === "left"
              ? `$(${a} \\cdot ${b}) \\cdot ${c} = ${a * b} \\cdot ${c} = ${total}$`
              : `$${a} \\cdot (${b} \\cdot ${c}) = ${a} \\cdot ${b * c} = ${total}$`
          }
        />
      </p>

      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-4xl font-black tabular-nums text-[color:var(--stage-chalk,#f8fafc)]">
          {total}
        </span>
        {showSameResult ? (
          <p
            className={cn(
              "text-center text-sm font-semibold text-emerald-300",
              !reduced && "animate-in fade-in duration-500",
            )}
          >
            ¡Mismo resultado!
          </p>
        ) : (
          <p className={cn(STAGE_CAPTION, "text-center")}>Prueba la otra agrupación</p>
        )}
      </div>
    </div>
  );
}

export function AsociativaTrucoMental({
  a,
  b,
  c,
  autoPlay,
  reduced,
  onReadyChange,
  onAnimationComplete,
}: {
  a: number;
  b: number;
  c: number;
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  const awkward = a * b * c;
  const smartLeft = a * c;
  const smartTotal = smartLeft * b;
  const [smart, setSmart] = useState(reduced || !autoPlay);

  useEffect(() => {
    if (!autoPlay) {
      setSmart(true);
      onReadyChange?.(true);
      return;
    }
    if (reduced) {
      setSmart(true);
      onReadyChange?.(true);
      onAnimationComplete?.();
      return;
    }
    onReadyChange?.(false);
    setSmart(false);
    const t = window.setTimeout(() => {
      setSmart(true);
      onReadyChange?.(true);
      onAnimationComplete?.();
    }, 2200);
    return () => window.clearTimeout(t);
  }, [autoPlay, onAnimationComplete, onReadyChange, reduced]);

  return (
    <div className="space-y-5" aria-label="Truco de cálculo mental con la propiedad asociativa">
      <p className={cn(STAGE_MATH, "text-base")}>
        <MathRenderer text={`$${a} \\cdot ${b} \\cdot ${c}$`} />
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div
          className={cn(
            "rounded-xl border-2 p-4 transition-all duration-700",
            smart
              ? "border-[color:var(--stage-border,#334155)] bg-black/10 opacity-55"
              : "border-amber-400/60 bg-amber-500/10",
          )}
        >
          <p className={cn(STAGE_CAPTION, "mb-2")}>En orden</p>
          <MathRenderer text={`$(${a} \\cdot ${b}) \\cdot ${c} = ${a * b} \\cdot ${c} = ${awkward}$`} />
          {!smart ? <p className="mt-2 text-xs text-amber-200/90">Cuesta más de cabeza…</p> : null}
        </div>
        <div
          className={cn(
            "rounded-xl border-2 p-4 transition-all duration-700",
            smart
              ? "border-emerald-400/70 bg-emerald-500/15 shadow-[0_0_0_1px_rgba(52,211,153,0.25)]"
              : "border-[color:var(--stage-border,#334155)] bg-black/10 opacity-40",
          )}
        >
          <p className={cn(STAGE_CAPTION, "mb-2")}>Agrupa lo cómodo</p>
          <MathRenderer
            text={`$(${a} \\cdot ${c}) \\cdot ${b} = ${smartLeft} \\cdot ${b} = ${smartTotal}$`}
          />
          {smart ? <p className="mt-2 text-xs font-semibold text-emerald-200">¡Mucho más rápido!</p> : null}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          className="min-h-[44px] rounded-xl border-2 border-[color:var(--stage-border,#334155)] bg-black/20 px-5 py-2.5 text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)] transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt disabled:opacity-45"
          disabled={smart}
          onClick={() => {
            setSmart(true);
            onReadyChange?.(true);
          }}
        >
          Agrupar {a} · {c} primero
        </button>
      </div>
    </div>
  );
}
