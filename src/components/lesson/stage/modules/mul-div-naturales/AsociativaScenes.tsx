"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

const ASSETS = {
  caja: "/lesson/mul-div-naturales/cajabombones.png",
} as const;

const STAGE_CAPTION = "text-xs font-semibold text-[color:var(--stage-muted,#94a3b8)]";
const STAGE_MATH =
  "lesson-stage-mul-equation text-center text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)] sm:text-base";

function StageChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("lesson-stage-chip", className)}>{children}</span>;
}

function EggPair({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-hidden>
      <span className="h-3 w-2.5 rounded-full bg-gradient-to-b from-amber-50 to-amber-400 shadow-sm ring-1 ring-amber-800/20" />
      <span className="h-3 w-2.5 rounded-full bg-gradient-to-b from-amber-50 to-amber-400 shadow-sm ring-1 ring-amber-800/20" />
    </span>
  );
}

function CajaStack({ count, compact }: { count: number; compact?: boolean }) {
  const shown = Math.min(count, 4);
  const offset = compact ? 10 : 14;
  const width = shown > 0 ? (shown - 1) * offset + (compact ? 56 : 72) : 72;
  return (
    <div
      className="relative mx-auto flex items-end justify-center"
      style={{ width: `${width}px`, height: compact ? "3.25rem" : "4.25rem" }}
    >
      {Array.from({ length: shown }, (_, i) => (
        <Image
          key={i}
          src={ASSETS.caja}
          alt=""
          width={compact ? 56 : 72}
          height={compact ? 48 : 62}
          className={cn("absolute bottom-0 object-contain drop-shadow-md", compact ? "h-12 w-14" : "h-14 w-[4.5rem]")}
          style={{ left: i * offset, zIndex: i }}
          aria-hidden
        />
      ))}
    </div>
  );
}

function VisualLeftGroup({ a, b, c }: { a: number; b: number; c: number }) {
  const boxes = a * b;
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-full rounded-xl border border-dashed border-[#4353ff]/45 bg-[#4353ff]/[0.07] px-5 py-5">
        <p className={cn(STAGE_CAPTION, "mb-4 text-center uppercase tracking-wider text-[#7dd3fc]")}>
          Agrupa estantes y cajas
        </p>
        <CajaStack count={b} />
        <p className="mt-3 text-center font-mono text-sm font-bold tabular-nums text-[color:var(--stage-ink,#e8edf5)]">
          {a} filas × {b} cajas
        </p>
        <div className="mt-3 flex justify-center">
          <StageChip>{boxes} cajas</StageChip>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-2xl font-light text-[color:var(--stage-muted,#94a3b8)]" aria-hidden>
          ×
        </span>
        <div className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/25 px-4 py-3">
          <EggPair />
          <StageChip>{c} huevos por caja</StageChip>
        </div>
      </div>
    </div>
  );
}

function ShelfCard({ b, c, perShelf, label }: { b: number; c: number; perShelf: number; label: string }) {
  return (
    <div className="flex w-[7.5rem] flex-col items-center gap-2 rounded-xl border border-white/10 bg-black/25 px-3 py-3">
      <span className="text-[10px] font-bold uppercase tracking-wide text-[color:var(--stage-muted,#94a3b8)]">
        {label}
      </span>
      <CajaStack count={Math.min(b, 3)} compact />
      <div className="flex items-center gap-2 font-mono text-xs font-bold tabular-nums text-[#e9d5ff]">
        <span>{b}</span>
        <span className="text-[color:var(--stage-muted,#94a3b8)]">·</span>
        <EggPair />
        <span className="text-[color:var(--stage-muted,#94a3b8)]">=</span>
        <StageChip className="!px-2 !py-0.5 text-[11px]">{perShelf}</StageChip>
      </div>
    </div>
  );
}

function VisualRightGroup({ a, b, c }: { a: number; b: number; c: number }) {
  const perShelf = b * c;
  return (
    <div className="flex w-full flex-col items-center gap-5">
      <p className={cn(STAGE_CAPTION, "text-center uppercase tracking-wider text-[#c4b5fd]")}>
        En cada estante: {b} cajas × {c} huevos
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <ShelfCard b={b} c={c} perShelf={perShelf} label="Estante" />
        <span className="text-2xl font-light text-[color:var(--stage-muted,#94a3b8)]" aria-hidden>
          ×
        </span>
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-[#a78bfa]/50 bg-[#a78bfa]/[0.08] px-5 py-4">
          <span className="font-mono text-3xl font-black tabular-nums text-[#e9d5ff]">{a}</span>
          <StageChip>estantes iguales</StageChip>
        </div>
      </div>
      <p className="text-center font-mono text-sm font-semibold tabular-nums text-[color:var(--stage-ink,#e8edf5)]">
        {a} × {perShelf} = {a * perShelf} huevos
      </p>
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

  return (
    <div className="mx-auto w-full max-w-lg space-y-5" aria-label="Descubrir la propiedad asociativa con huevos">
      <p className={cn(STAGE_CAPTION, "text-center")}>
        {a} estantes · {b} cajas · {c} huevos en cada caja
      </p>

      <div
        role="tablist"
        aria-label="Forma de agrupar los factores"
        className="flex gap-1 rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/30 p-1"
      >
        <button
          type="button"
          role="tab"
          id="asociativa-tab-left"
          aria-controls="asociativa-visual-panel"
          aria-selected={group === "left"}
          onClick={() => pickGroup("left")}
          className={cn(
            "min-h-[44px] flex-1 rounded-lg px-3 py-2 font-mono text-sm font-bold transition",
            group === "left"
              ? "bg-[#4353ff]/25 text-[color:var(--stage-chalk,#f8fafc)] shadow-[inset_0_0_0_1px_rgba(67,83,255,0.45)]"
              : "text-[color:var(--stage-muted,#94a3b8)] hover:bg-black/20",
          )}
        >
          ({a} · {b}) · {c}
        </button>
        <button
          type="button"
          role="tab"
          id="asociativa-tab-right"
          aria-controls="asociativa-visual-panel"
          aria-selected={group === "right"}
          onClick={() => pickGroup("right")}
          className={cn(
            "min-h-[44px] flex-1 rounded-lg px-3 py-2 font-mono text-sm font-bold transition",
            group === "right"
              ? "bg-[#a78bfa]/20 text-[color:var(--stage-chalk,#f8fafc)] shadow-[inset_0_0_0_1px_rgba(167,139,250,0.45)]"
              : "text-[color:var(--stage-muted,#94a3b8)] hover:bg-black/20",
          )}
        >
          {a} · ({b} · {c})
        </button>
      </div>

      <div
        id="asociativa-visual-panel"
        role="tabpanel"
        aria-labelledby={group === "left" ? "asociativa-tab-left" : "asociativa-tab-right"}
        className={cn(
          "min-h-[15.5rem] rounded-2xl border border-[color:var(--stage-border,#334155)] bg-black/35 px-5 py-6 transition-opacity duration-500",
          !reduced && "animate-in fade-in duration-300",
        )}
      >
        {group === "left" ? (
          <VisualLeftGroup a={a} b={b} c={c} />
        ) : (
          <VisualRightGroup a={a} b={b} c={c} />
        )}
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

      <div className="flex flex-col items-center gap-1.5 border-t border-white/5 pt-4">
        <span className="font-mono text-3xl font-black tabular-nums tracking-tight text-[#5eead4]">{total}</span>
        <span className={cn(STAGE_CAPTION, "normal-case")}>huevos en total</span>
        {showSameResult ? (
          <p
            className={cn(
              "pt-1 text-center text-sm font-semibold text-emerald-300",
              !reduced && "animate-in fade-in duration-500",
            )}
          >
            ¡Mismo resultado con cualquier agrupación!
          </p>
        ) : (
          <p className={cn(STAGE_CAPTION, "text-center normal-case")}>Prueba la otra agrupación arriba</p>
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
