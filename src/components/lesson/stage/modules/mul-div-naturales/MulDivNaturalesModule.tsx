"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import type { MulDivConfig, MulDivNaturalesScene } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

export type MulDivNaturalesModuleProps = MulDivConfig & {
  stepId: string;
  autoPlay?: boolean;
  /** Para escena de reparto manual: fichas en cada caja (índice = caja). */
  boxCounts?: number[];
  onBoxCountsChange?: (counts: number[]) => void;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
};

const COBALT = "#4353ff";
const COBALT_TINT = "#eceeff";
const VIOLET = "#7c3aed";
const AMBER = "#d97706";
function TicketIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 40" className={cn("h-12 w-[4.5rem] min-h-[48px] min-w-[48px]", className)} aria-hidden>
      <rect x="2" y="4" width="52" height="32" rx="6" fill="#f97316" />
      <rect x="2" y="4" width="52" height="32" rx="6" fill="none" stroke="#ea580c" strokeWidth="2" />
      <circle cx="8" cy="20" r="4" fill="#fff7ed" />
      <circle cx="48" cy="20" r="4" fill="#fff7ed" />
      <text x="28" y="24" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">
        8€
      </text>
    </svg>
  );
}

function FichaIcon({ tone = "cobalt" }: { tone?: "cobalt" | "violet" | "amber" }) {
  const fill = tone === "violet" ? VIOLET : tone === "amber" ? AMBER : COBALT;
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 min-h-[48px] min-w-[48px]" aria-hidden>
      <circle cx="24" cy="24" r="20" fill={fill} />
      <circle cx="24" cy="24" r="20" fill="none" stroke="#fff" strokeWidth="2" opacity="0.35" />
    </svg>
  );
}

function ChocolateIcon() {
  return (
    <svg viewBox="0 0 44 44" className="h-11 w-11 min-h-[44px] min-w-[44px]" aria-hidden>
      <rect x="4" y="8" width="36" height="28" rx="5" fill="#92400e" />
      <rect x="4" y="8" width="36" height="28" rx="5" fill="none" stroke="#78350f" strokeWidth="2" />
      <path d="M15 8v28M29 8v28M4 22h36" stroke="#fcd34d" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

function CajaIcon({ count, label }: { count: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 80 64" className="h-16 w-20" aria-hidden>
        <path d="M8 20 L40 8 L72 20 L72 56 L8 56 Z" fill={COBALT_TINT} stroke={COBALT} strokeWidth="2.5" />
        <path d="M8 20 L40 32 L72 20" fill="none" stroke={COBALT} strokeWidth="2" />
      </svg>
      <span className="rounded-lg bg-cobalt-tint px-2 py-0.5 font-mono text-sm font-bold text-ink">{count}</span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">{label}</span>
    </div>
  );
}

function useTimers() {
  const timers = useRef<number[]>([]);
  const clear = useCallback(() => {
    for (const id of timers.current) {
      window.clearTimeout(id);
    }
    timers.current = [];
  }, []);
  const push = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  useEffect(() => clear, [clear]);
  return { push, clear };
}

function MultiplicarRepetido({
  a,
  b,
  autoPlay,
  reduced,
  onReadyChange,
  onAnimationComplete,
}: {
  a: number;
  b: number;
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  const [rows, setRows] = useState(reduced ? b : 0);
  const { push, clear } = useTimers();

  useEffect(() => {
    if (!autoPlay) {
      onReadyChange?.(true);
      setRows(b);
      return;
    }
    if (reduced) {
      setRows(b);
      onReadyChange?.(true);
      onAnimationComplete?.();
      return;
    }
    onReadyChange?.(false);
    setRows(0);
    let r = 0;
    const tick = () => {
      r += 1;
      setRows(r);
      if (r >= b) {
        onReadyChange?.(true);
        onAnimationComplete?.();
        return;
      }
      push(tick, 650);
    };
    push(tick, 500);
    return clear;
  }, [a, autoPlay, b, clear, onAnimationComplete, onReadyChange, push, reduced]);

  const total = a * b;

  return (
    <div className="space-y-4" aria-label={`Multiplicar ${a} por ${b} como suma repetida`}>
      <div className="flex flex-col gap-3">
        {Array.from({ length: rows }, (_, row) => (
          <div
            key={row}
            className="flex flex-wrap items-center justify-center gap-1 rounded-xl bg-cobalt-tint/60 px-2 py-2 transition-opacity duration-500"
            style={{ opacity: reduced ? 1 : 1 }}
          >
            {Array.from({ length: a }, (_, col) => (
              <TicketIcon key={col} />
            ))}
            {row < rows - 1 ? (
              <span className="w-full text-center text-lg font-bold text-cobalt" aria-hidden>
                +
              </span>
            ) : null}
          </div>
        ))}
      </div>
      {rows >= b ? (
        <p className="text-center text-sm font-medium text-ink-muted">
          <MathRenderer text={`$${a} + ${a} + \\cdots (${b}\\ \\text{veces}) = ${a} \\cdot ${b} = ${total}$`} />
        </p>
      ) : null}
    </div>
  );
}

function ConmutativaProducto({
  a,
  b,
  onReadyChange,
}: {
  a: number;
  b: number;
  onReadyChange?: (ready: boolean) => void;
}) {
  const [swapped, setSwapped] = useState(false);
  const rows = swapped ? a : b;
  const cols = swapped ? b : a;
  const total = a * b;

  return (
    <div className="space-y-4" aria-label="Propiedad conmutativa de la multiplicación">
      <div
        className="mx-auto grid max-w-full gap-1 justify-items-center p-3"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(2.75rem, 1fr))` }}
      >
        {Array.from({ length: rows * cols }, (_, i) => (
          <FichaIcon key={i} tone={swapped ? "violet" : "cobalt"} />
        ))}
      </div>
      <p className="text-center text-sm text-ink-muted">
        <MathRenderer text={swapped ? `$${b} \\cdot ${a} = ${total}$` : `$${a} \\cdot ${b} = ${total}$`} />
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          className="min-h-[44px] rounded-xl bg-cobalt px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cobalt/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          onClick={() => {
            setSwapped((s) => !s);
            onReadyChange?.(true);
          }}
        >
          Girar la retícula
        </button>
      </div>
    </div>
  );
}

function AsociativaProducto({
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
  const [leftGroup, setLeftGroup] = useState(true);
  const total = a * b * c;

  const piles = useMemo(() => {
    if (leftGroup) {
      return [
        { label: `${a}×${b}`, count: a * b, tone: "cobalt" as const },
        { label: `${c}`, count: c, tone: "amber" as const },
      ];
    }
    return [
      { label: `${a}`, count: a, tone: "cobalt" as const },
      { label: `${b}×${c}`, count: b * c, tone: "violet" as const },
    ];
  }, [a, b, c, leftGroup]);

  return (
    <div className="space-y-4" aria-label="Propiedad asociativa de la multiplicación">
      <div className="flex flex-wrap items-end justify-center gap-3">
        {piles.map((pile, index) => (
          <div key={pile.label} className="flex items-end gap-2">
            {index === 1 ? <span className="pb-4 text-2xl font-bold text-ink">×</span> : null}
            <div
              className={cn(
                "flex flex-wrap justify-center gap-0.5 rounded-xl border-2 border-dashed px-2 py-2",
                index === 0 && leftGroup ? "border-cobalt/40 bg-cobalt-tint/50" : "",
                index === 1 && !leftGroup ? "border-violet/40 bg-violet-50" : "border-transparent",
              )}
            >
              {Array.from({ length: Math.min(pile.count, 12) }, (_, i) => (
                <FichaIcon key={i} tone={pile.tone} />
              ))}
              {pile.count > 12 ? (
                <span className="self-center px-1 text-xs font-bold text-ink-muted">+{pile.count - 12}</span>
              ) : null}
            </div>
          </div>
        ))}
        <span className="pb-4 font-mono text-lg font-bold text-ink">= {total}</span>
      </div>
      <p className="text-center text-sm text-ink-muted">
        <MathRenderer
          text={
            leftGroup
              ? `$(${a} \\cdot ${b}) \\cdot ${c} = ${a * b} \\cdot ${c} = ${total}$`
              : `$${a} \\cdot (${b} \\cdot ${c}) = ${a} \\cdot ${b * c} = ${total}$`
          }
        />
      </p>
      <div className="flex justify-center">
        <button
          type="button"
          className="min-h-[44px] rounded-xl border-2 border-cobalt/30 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-cobalt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
          onClick={() => {
            setLeftGroup((g) => !g);
            onReadyChange?.(true);
          }}
        >
          Cambiar agrupación
        </button>
      </div>
    </div>
  );
}

function DistributivaBloques({
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
  const [phase, setPhase] = useState(reduced ? 2 : 0);
  const { push, clear } = useTimers();
  const sum = b + c;
  const left = a * b;
  const right = a * c;
  const total = a * sum;

  useEffect(() => {
    if (!autoPlay) {
      setPhase(2);
      onReadyChange?.(true);
      return;
    }
    if (reduced) {
      setPhase(2);
      onReadyChange?.(true);
      onAnimationComplete?.();
      return;
    }
    onReadyChange?.(false);
    setPhase(0);
    push(() => setPhase(1), 900);
    push(() => {
      setPhase(2);
      onReadyChange?.(true);
      onAnimationComplete?.();
    }, 2000);
    return clear;
  }, [autoPlay, clear, onAnimationComplete, onReadyChange, push, reduced]);

  return (
    <div className="space-y-4" aria-label="Propiedad distributiva">
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: a }, (_, col) => (
          <div key={col} className="flex flex-col items-center gap-1">
            <div className="flex flex-col overflow-hidden rounded-xl border-2 border-cobalt/25">
              <div
                className={cn(
                  "flex justify-center gap-0.5 bg-cobalt-tint px-1 py-1 transition-all duration-700",
                  phase >= 1 ? "opacity-100" : "opacity-90",
                )}
              >
                {Array.from({ length: b }, (_, i) => (
                  <FichaIcon key={`b-${i}`} tone="cobalt" />
                ))}
              </div>
              <div
                className={cn(
                  "flex justify-center gap-0.5 bg-amber-100 px-1 py-1 transition-all duration-700",
                  phase >= 1 ? "opacity-100" : "opacity-0 max-h-0",
                )}
              >
                {phase >= 1
                  ? Array.from({ length: c }, (_, i) => <FichaIcon key={`c-${i}`} tone="amber" />)
                  : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      {phase >= 2 ? (
        <p className="text-center text-sm text-ink-muted">
          <MathRenderer text={`$${a} \\cdot (${b} + ${c}) = ${a} \\cdot ${b} + ${a} \\cdot ${c} = ${left} + ${right} = ${total}$`} />
        </p>
      ) : null}
    </div>
  );
}

function RepartoIgual({
  dividend,
  divisor,
  autoPlay,
  reduced,
  onReadyChange,
  onAnimationComplete,
}: {
  dividend: number;
  divisor: number;
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  const quotient = Math.floor(dividend / divisor);
  const [filled, setFilled] = useState(reduced ? divisor : 0);
  const { push, clear } = useTimers();

  useEffect(() => {
    if (!autoPlay) {
      setFilled(divisor);
      onReadyChange?.(true);
      return;
    }
    if (reduced) {
      setFilled(divisor);
      onReadyChange?.(true);
      onAnimationComplete?.();
      return;
    }
    onReadyChange?.(false);
    setFilled(0);
    let box = 0;
    const tick = () => {
      box += 1;
      setFilled(box);
      if (box >= divisor) {
        onReadyChange?.(true);
        onAnimationComplete?.();
        return;
      }
      push(tick, 550);
    };
    push(tick, 400);
    return clear;
  }, [autoPlay, clear, divisor, onAnimationComplete, onReadyChange, push, reduced]);

  return (
    <div className="space-y-4" aria-label={`Repartir ${dividend} en ${divisor} cajas iguales`}>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <div className="flex max-w-[10rem] flex-wrap justify-center gap-0.5 rounded-xl border-2 border-amber-200 bg-amber-50 p-2">
            {Array.from({ length: 8 }, (_, i) => (
              <ChocolateIcon key={i} />
            ))}
          </div>
          <span className="font-mono text-lg font-bold text-ink">{dividend}</span>
          <span className="text-xs text-ink-muted">bombones</span>
        </div>
        <span className="text-2xl font-bold text-cobalt" aria-hidden>
          →
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: divisor }, (_, i) => (
            <CajaIcon key={i} count={i < filled ? quotient : 0} label={`Caja ${i + 1}`} />
          ))}
        </div>
      </div>
      {filled >= divisor ? (
        <p className="text-center text-sm font-medium text-ink">
          <MathRenderer text={`$${dividend} : ${divisor} = ${quotient}$`} />
        </p>
      ) : null}
    </div>
  );
}

function RepartoManual({
  total,
  boxes,
  perBox,
  boxCounts,
  onBoxCountsChange,
  onReadyChange,
}: {
  total: number;
  boxes: number;
  perBox: number;
  boxCounts: number[];
  onBoxCountsChange?: (counts: number[]) => void;
  onReadyChange?: (ready: boolean) => void;
}) {
  const pool = total - boxCounts.reduce((s, n) => s + n, 0);

  const sendOne = (boxIndex: number) => {
    if (pool <= 0 || boxCounts[boxIndex]! >= perBox) {
      return;
    }
    const next = [...boxCounts];
    next[boxIndex] = next[boxIndex]! + 1;
    onBoxCountsChange?.(next);
  };

  const takeOne = (boxIndex: number) => {
    if (boxCounts[boxIndex]! <= 0) {
      return;
    }
    const next = [...boxCounts];
    next[boxIndex] = next[boxIndex]! - 1;
    onBoxCountsChange?.(next);
  };

  useEffect(() => {
    const ok = boxCounts.every((n) => n === perBox) && pool === 0;
    onReadyChange?.(ok);
  }, [boxCounts, onReadyChange, perBox, pool]);

  return (
    <div className="space-y-4" aria-label="Reparto manual en cajas iguales">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          disabled={pool <= 0}
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center rounded-xl border-2 border-amber-300 bg-amber-50 px-3 py-2 disabled:opacity-40"
          aria-label={`Montón con ${pool} bombones por repartir`}
        >
          <ChocolateIcon />
          <span className="font-mono text-sm font-bold">{pool}</span>
        </button>
        <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: boxes }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-xl border-2 border-cobalt/20 bg-white p-2">
              <CajaIcon count={boxCounts[i] ?? 0} label={`Caja ${i + 1}`} />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="min-h-[44px] min-w-[44px] rounded-lg bg-cobalt text-lg font-bold text-white"
                  aria-label={`Añadir un bombón a la caja ${i + 1}`}
                  onClick={() => sendOne(i)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="min-h-[44px] min-w-[44px] rounded-lg border-2 border-slate-200 text-lg font-bold text-ink"
                  aria-label={`Quitar un bombón de la caja ${i + 1}`}
                  onClick={() => takeOne(i)}
                >
                  −
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-ink-muted">Objetivo: {perBox} en cada caja</p>
    </div>
  );
}

function ExactaEntera({
  autoPlay,
  reduced,
  onReadyChange,
}: {
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  const [step, setStep] = useState(reduced ? 2 : 0);
  const { push, clear } = useTimers();

  useEffect(() => {
    if (!autoPlay) {
      setStep(2);
      onReadyChange?.(true);
      return;
    }
    if (reduced) {
      setStep(2);
      onReadyChange?.(true);
      return;
    }
    onReadyChange?.(false);
    setStep(0);
    push(() => setStep(1), 800);
    push(() => {
      setStep(2);
      onReadyChange?.(true);
    }, 1600);
    return clear;
  }, [autoPlay, clear, onReadyChange, push, reduced]);

  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-label="División exacta y división entera">
      <div
        className={cn(
          "rounded-xl border-2 p-4 transition",
          step >= 1 ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white",
        )}
      >
        <p className="mb-2 text-sm font-semibold text-emerald-800">Exacta · resto $0$</p>
        <MathRenderer text={`$150 = 6 \\cdot 25$`} />
        <p className="mt-2 text-xs text-ink-muted">Verificación: $D = d \\cdot c$</p>
      </div>
      <div
        className={cn(
          "rounded-xl border-2 p-4 transition",
          step >= 2 ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white opacity-60",
        )}
      >
        <p className="mb-2 text-sm font-semibold text-amber-900">Entera · resto $\\neq 0$</p>
        <MathRenderer text={`$43 = 8 \\cdot 5 + 3$`} />
        <p className="mt-2 text-xs text-ink-muted">Verificación: $D = d \\cdot c + r$ con $r &lt; d$</p>
      </div>
    </div>
  );
}

function MultiplicarConteo({ a, b }: { a: number; b: number }) {
  return (
    <div aria-label={`${a} por ${b} fichas`}>
      <div
        className="mx-auto grid max-w-full gap-1 justify-items-center p-2"
        style={{ gridTemplateColumns: `repeat(${a}, minmax(2.75rem, 1fr))` }}
      >
        {Array.from({ length: a * b }, (_, i) => (
          <FichaIcon key={i} />
        ))}
      </div>
    </div>
  );
}

export function MulDivNaturalesModule({
  scene,
  a = 8,
  b = 5,
  c = 2,
  dividend = 150,
  divisor = 6,
  perBox = 25,
  total = 150,
  boxes = 6,
  autoPlay = false,
  boxCounts = [],
  onBoxCountsChange,
  onReadyChange,
  onAnimationComplete,
}: MulDivNaturalesModuleProps) {
  const reduced = useReducedMotion();

  const renderScene = (s: MulDivNaturalesScene) => {
    switch (s) {
      case "multiplicar-repetido":
        return (
          <MultiplicarRepetido
            a={a}
            b={b}
            autoPlay={autoPlay}
            reduced={reduced}
            onReadyChange={onReadyChange}
            onAnimationComplete={onAnimationComplete}
          />
        );
      case "multiplicar-conteo":
        return <MultiplicarConteo a={a} b={b} />;
      case "conmutativa-producto":
        return <ConmutativaProducto a={a} b={b} onReadyChange={onReadyChange} />;
      case "asociativa-producto":
        return <AsociativaProducto a={a} b={b} c={c} onReadyChange={onReadyChange} />;
      case "distributiva-bloques":
        return (
          <DistributivaBloques
            a={a}
            b={b}
            c={c}
            autoPlay={autoPlay}
            reduced={reduced}
            onReadyChange={onReadyChange}
            onAnimationComplete={onAnimationComplete}
          />
        );
      case "reparto-igual":
        return (
          <RepartoIgual
            dividend={dividend}
            divisor={divisor}
            autoPlay={autoPlay}
            reduced={reduced}
            onReadyChange={onReadyChange}
            onAnimationComplete={onAnimationComplete}
          />
        );
      case "reparto-manual":
        return (
          <RepartoManual
            total={total}
            boxes={boxes}
            perBox={perBox}
            boxCounts={boxCounts}
            onBoxCountsChange={onBoxCountsChange}
            onReadyChange={onReadyChange}
          />
        );
      case "exacta-entera":
        return (
          <ExactaEntera autoPlay={autoPlay} reduced={reduced} onReadyChange={onReadyChange} />
        );
      default:
        return <p className="text-sm text-rose-700">Escena no configurada.</p>;
    }
  };

  useEffect(() => {
    if (scene === "multiplicar-conteo") {
      onReadyChange?.(true);
    }
  }, [onReadyChange, scene]);

  return (
    <div data-testid={`mul-div-${scene}`} className="w-full max-w-full overflow-x-hidden">
      {renderScene(scene)}
    </div>
  );
}
