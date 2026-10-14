"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

const ASSETS = {
  huevo: "/lesson/mul-div-naturales/huevo.png",
} as const;

const BOX_FRAME =
  "rounded-md border-2 border-amber-400 bg-amber-500/30 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.4)]";
const SHELF_FRAME =
  "rounded-lg border-2 border-sky-400 bg-sky-500/20 shadow-[0_0_0_1px_rgba(56,189,248,0.45)]";

const STAGE_CAPTION = "text-xs font-semibold text-[color:var(--stage-muted,#94a3b8)]";
const STAGE_MATH =
  "lesson-stage-mul-equation text-center text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)] sm:text-base";

function StageChip({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("lesson-stage-chip", className)}>{children}</span>;
}

type HuevosDensity = "default" | "grid";

function EggRow({ count, density }: { count: number; density?: HuevosDensity }) {
  const grid = density === "grid";
  return (
    <span
      className={cn("inline-flex items-center justify-center", grid ? "gap-px" : "gap-0.5")}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <Image
          key={i}
          src={ASSETS.huevo}
          alt=""
          width={grid ? 10 : 20}
          height={grid ? 8 : 16}
          className={cn("object-contain", grid ? "h-[7px] w-[9px]" : "h-4 w-5")}
        />
      ))}
    </span>
  );
}

function CajaRect({
  eggsPerBox,
  density,
  className,
}: {
  eggsPerBox: number;
  density?: HuevosDensity;
  className?: string;
}) {
  const grid = density === "grid";
  return (
    <div
      className={cn(
        BOX_FRAME,
        grid ? "rounded-sm border-[1.5px] px-[3px] py-[2px]" : "px-2 py-1.5",
        className,
      )}
      aria-hidden
    >
      <EggRow count={eggsPerBox} density={density} />
    </div>
  );
}

function AlmacenHuevosGrid({
  filas,
  cajasPorFila,
  huevosPorCaja,
  className,
}: {
  filas: number;
  cajasPorFila: number;
  huevosPorCaja: number;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto flex w-full max-w-[18rem] flex-col gap-[3px]", className)}
      aria-label={`${filas} filas, ${cajasPorFila} cajas por fila, ${huevosPorCaja} huevos en cada caja`}
    >
      {Array.from({ length: filas }, (_, fila) => (
        <div
          key={fila}
          className={cn(SHELF_FRAME, "rounded-sm px-1 py-[2px] shadow-none")}
          aria-hidden
        >
          <div className="flex flex-nowrap items-center justify-center gap-[3px]">
            {Array.from({ length: cajasPorFila }, (_, caja) => (
              <CajaRect key={caja} eggsPerBox={huevosPorCaja} density="grid" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function VisualLeftGroup({ a, b, c }: { a: number; b: number; c: number }) {
  const boxes = a * b;
  const total = boxes * c;
  return (
    <div className="flex flex-col items-center gap-3">
      <p className={cn(STAGE_CAPTION, "max-w-[20rem] text-center normal-case leading-snug text-[#7dd3fc]")}>
        Primero cuentas todas las cajas: {a} estantes × {b} cajas/estante ={" "}
        <strong className="text-[color:var(--stage-ink,#e8edf5)]">{boxes} cajas</strong> en la
        estantería.
      </p>
      <div className="w-full rounded-xl border border-dashed border-[#4353ff]/55 bg-black/30 px-2 py-2.5">
        <AlmacenHuevosGrid filas={a} cajasPorFila={b} huevosPorCaja={c} />
      </div>
      <div className="space-y-1.5 text-center">
        <p className="font-mono text-xs font-bold tabular-nums text-[color:var(--stage-ink,#e8edf5)]">
          {a} × {b} = {boxes} cajas
        </p>
        <p className={cn(STAGE_CAPTION, "normal-case leading-snug")}>
          Luego {boxes} cajas × {c} huevos/caja ={" "}
          <strong className="text-[#5eead4]">{total} huevos</strong> en total.
        </p>
      </div>
    </div>
  );
}

function VisualRightGroup({ a, b, c }: { a: number; b: number; c: number }) {
  const perRow = b * c;
  const total = a * perRow;
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <p className={cn(STAGE_CAPTION, "max-w-[20rem] text-center normal-case leading-snug text-[#c4b5fd]")}>
        En cada fila: {b} cajas/fila × {c} huevos/caja ={" "}
        <strong className="text-[color:var(--stage-ink,#e8edf5)]">{perRow} huevos/fila</strong>.
      </p>
      <div className="w-full rounded-xl border border-dashed border-[#a78bfa]/50 bg-[#a78bfa]/[0.06] px-2 py-2.5">
        <AlmacenHuevosGrid filas={a} cajasPorFila={b} huevosPorCaja={c} />
      </div>
      <div className="space-y-1.5 text-center">
        <p className="font-mono text-xs font-bold tabular-nums text-[color:var(--stage-ink,#e8edf5)]">
          {b} × {c} = {perRow} huevos por fila
        </p>
        <p className={cn(STAGE_CAPTION, "normal-case leading-snug")}>
          {a} filas × {perRow} huevos/fila ={" "}
          <strong className="text-[#5eead4]">{total} huevos</strong> en total.
        </p>
      </div>
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
          "rounded-2xl border border-[color:var(--stage-border,#334155)] bg-black/35 px-3 py-4 transition-opacity duration-500",
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
