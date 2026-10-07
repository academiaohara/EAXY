"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import type { MulDivConfig, MulDivNaturalesScene } from "@/lib/lesson/types";
import {
  DivisionIdentidadScene,
  DivisionManoScene,
  MultiplicacionManoScene,
} from "@/components/lesson/stage/modules/mul-div-naturales/EscolarAlgorithmViews";
import { cn } from "@/lib/utils";

const ASSETS = {
  ticket: "/lesson/mul-div-naturales/ticket.png",
  bombones: "/lesson/mul-div-naturales/bombones.png",
  cajabombones: "/lesson/mul-div-naturales/cajabombones.png",
} as const;

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

/** Misma inclinación y apilado para todas las entradas del abanico. */
const TICKET_TILT_DEG = -14;
const TICKET_FAN_OFFSET_PX = 16;

const STAGE_CAPTION = "text-xs font-semibold text-[color:var(--stage-muted,#94a3b8)]";
const STAGE_MATH = "text-center text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)]";

function SlideBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-md border-2 border-sky-400/90 bg-white px-3 py-1 font-mono text-base font-bold text-ink shadow-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

function TicketImage({
  size = "md",
  style,
  className,
}: {
  size?: "sm" | "md";
  style?: CSSProperties;
  className?: string;
}) {
  const dim =
    size === "sm"
      ? { w: 56, h: 48, cls: "h-12 w-14 min-h-[48px] min-w-[48px]" }
      : { w: 96, h: 80, cls: "h-[5rem] w-[6rem] min-h-[48px] min-w-[48px]" };
  return (
    <Image
      src={ASSETS.ticket}
      alt=""
      width={dim.w}
      height={dim.h}
      className={cn("object-contain drop-shadow-md", dim.cls, className)}
      style={style}
      aria-hidden
    />
  );
}

function TicketFan({
  count,
  priceLabel,
  caption,
}: {
  count: number;
  priceLabel?: string;
  caption?: string;
}) {
  const stackWidth = count > 0 ? (count - 1) * TICKET_FAN_OFFSET_PX + 96 : 96;
  return (
    <div className="flex min-w-[7.5rem] flex-col items-center gap-2">
      <div
        className="relative flex h-[6.5rem] items-end justify-start"
        style={{ width: `${stackWidth}px`, maxWidth: "100%" }}
      >
        {Array.from({ length: count }, (_, i) => (
          <TicketImage
            key={i}
            className="absolute bottom-0 left-0 transition-all duration-500 ease-out"
            style={{
              transform: `rotate(${TICKET_TILT_DEG}deg)`,
              left: i * TICKET_FAN_OFFSET_PX,
              zIndex: i,
            }}
          />
        ))}
      </div>
      {priceLabel ? <SlideBadge>{priceLabel}</SlideBadge> : null}
      <span className={cn(STAGE_CAPTION, "min-h-[1rem]")}>{caption ?? "\u00a0"}</span>
    </div>
  );
}

function BombonesPile({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={ASSETS.bombones}
        alt=""
        width={160}
        height={130}
        className="h-[7.5rem] w-auto max-w-[10rem] object-contain"
        aria-hidden
      />
      <SlideBadge>{label}</SlideBadge>
    </div>
  );
}

function CajaBombones({
  count,
  caption,
  highlight,
}: {
  count: number | string;
  caption?: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Image
        src={ASSETS.cajabombones}
        alt=""
        width={110}
        height={95}
        className={cn(
          "h-[5.5rem] w-auto object-contain transition",
          highlight && "ring-2 ring-cobalt/40 ring-offset-2",
        )}
        aria-hidden
      />
      <SlideBadge>{count}</SlideBadge>
      {caption ? <span className="text-[10px] font-medium uppercase tracking-wide text-ink-muted">{caption}</span> : null}
    </div>
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
  const [ticketCount, setTicketCount] = useState(reduced ? b : 1);
  /** 0 = solo suma; 1 = suma = a·b; 2 = ecuación completa */
  const [mathPhase, setMathPhase] = useState(reduced ? 2 : 0);
  const { push, clear } = useTimers();

  useEffect(() => {
    if (!autoPlay) {
      onReadyChange?.(true);
      setTicketCount(b);
      setMathPhase(2);
      return;
    }
    if (reduced) {
      setTicketCount(b);
      setMathPhase(2);
      onReadyChange?.(true);
      onAnimationComplete?.();
      return;
    }
    onReadyChange?.(false);
    setTicketCount(1);
    setMathPhase(0);
    let n = 1;
    const tick = () => {
      n += 1;
      setTicketCount(n);
      if (n >= b) {
        push(() => {
          setMathPhase(1);
          push(() => {
            setMathPhase(2);
            onReadyChange?.(true);
            onAnimationComplete?.();
          }, 650);
        }, 500);
        return;
      }
      push(tick, 650);
    };
    push(tick, 500);
    return clear;
  }, [autoPlay, b, clear, onAnimationComplete, onReadyChange, push, reduced]);

  const total = a * b;
  const sumParts = Array.from({ length: ticketCount }, () => String(a)).join(" + ");
  const fullSum = Array.from({ length: b }, () => String(a)).join(" + ");
  const mathText =
    ticketCount >= b
      ? mathPhase >= 2
        ? `$${fullSum} = ${a} \\cdot ${b} = ${total}$`
        : mathPhase >= 1
          ? `$${fullSum} = ${a} \\cdot ${b}$`
          : `$${fullSum}$`
      : ticketCount > 1
        ? `$${sumParts}$`
        : null;
  const mathAccent = ticketCount >= b && mathPhase >= 1;

  return (
    <div className="space-y-4" aria-label={`Multiplicar ${a} por ${b} como suma repetida`}>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
        <div className="flex min-w-[7.5rem] flex-col items-center gap-2">
          <div className="flex h-[6.5rem] items-end">
            <TicketImage style={{ transform: `rotate(${TICKET_TILT_DEG}deg)` }} />
          </div>
          <SlideBadge>{a}€</SlideBadge>
          <span className={STAGE_CAPTION}>Una entrada</span>
        </div>
        <TicketFan
          count={ticketCount}
          priceLabel={ticketCount >= b ? `${total}€` : "?"}
          caption={
            ticketCount >= b ? `${b} entradas` : ticketCount > 1 ? `${ticketCount} entradas` : "\u00a0"
          }
        />
      </div>
      {mathText ? (
        <p
          className={cn(
            STAGE_MATH,
            "transition-[color,opacity] duration-500 ease-out",
            !mathAccent && "text-[color:var(--stage-accent,#6ee7b7)]",
          )}
          aria-live="polite"
        >
          <MathRenderer text={mathText} />
        </p>
      ) : null}
    </div>
  );
}

function ConmutativaProducto({
  a,
  b,
  onReadyChange,
  reduced,
}: {
  a: number;
  b: number;
  onReadyChange?: (ready: boolean) => void;
  reduced: boolean;
}) {
  const total = a * b;
  const [swapped, setSwapped] = useState(false);
  const [filled, setFilled] = useState(reduced ? total : 0);
  const [animating, setAnimating] = useState(!reduced);
  const rows = swapped ? b : a;
  const cols = swapped ? a : b;
  const { push, clear } = useTimers();

  useEffect(() => {
    if (reduced) {
      setSwapped(true);
      setFilled(total);
      setAnimating(false);
      onReadyChange?.(true);
      return;
    }

    onReadyChange?.(false);
    setSwapped(false);
    setFilled(0);
    setAnimating(true);

    const fillSequence = (onDone: () => void) => {
      let n = 0;
      const tick = () => {
        n += 1;
        setFilled(n);
        if (n >= total) {
          push(onDone, 700);
          return;
        }
        push(tick, 420);
      };
      push(tick, 500);
    };

    fillSequence(() => {
      setSwapped(true);
      setFilled(0);
      fillSequence(() => {
        setAnimating(false);
        onReadyChange?.(true);
      });
    });

    return clear;
  }, [a, b, clear, onReadyChange, push, reduced, total]);

  return (
    <div className="space-y-4" aria-label="Propiedad conmutativa de la multiplicación">
      <div className="mx-auto flex max-w-full justify-center p-2" style={{ perspective: "900px" }}>
        <div
          className={cn(
            "relative transition-transform duration-1000 ease-in-out",
            swapped ? "[transform:rotateY(-72deg)_rotateX(12deg)]" : "[transform:rotateY(-28deg)_rotateX(14deg)]",
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="grid gap-1 rounded-lg border-2 border-[color:var(--stage-border,#334155)] bg-[color:var(--stage-surface,#1a2332)] p-2 shadow-lg"
            style={{
              gridTemplateColumns: `repeat(${cols}, minmax(2.25rem, 2.75rem))`,
              gridTemplateRows: `repeat(${rows}, minmax(2.25rem, 2.75rem))`,
            }}
          >
            {Array.from({ length: rows * cols }, (_, i) => {
              const showNumber = i < filled;
              return (
                <div
                  key={`${swapped ? "s" : "n"}-${i}`}
                  className={cn(
                    "flex items-center justify-center rounded-md border font-mono text-sm font-bold tabular-nums transition-all duration-300",
                    showNumber
                      ? swapped
                        ? "border-violet-400/60 bg-violet-500/25 text-[color:var(--stage-chalk,#f8fafc)]"
                        : "border-cobalt/50 bg-cobalt/20 text-[color:var(--stage-chalk,#f8fafc)]"
                      : "border-[color:var(--stage-border,#334155)] bg-black/20 text-transparent",
                  )}
                >
                  {showNumber ? i + 1 : ""}
                </div>
              );
            })}
          </div>
          <div
            className="pointer-events-none absolute inset-y-2 -right-3 w-3 rounded-r-md bg-cobalt/30"
            style={{ transform: "translateZ(-12px)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-3 inset-x-2 h-3 rounded-b-md bg-cobalt/20"
            style={{ transform: "translateZ(-12px)" }}
            aria-hidden
          />
        </div>
      </div>
      <p className={STAGE_MATH}>
        <MathRenderer text={swapped ? `$${b} \\cdot ${a} = ${total}$` : `$${a} \\cdot ${b} = ${total}$`} />
      </p>
      {animating ? (
        <p className="text-center text-xs font-medium text-[color:var(--stage-muted,#94a3b8)]">
          {swapped ? "Girando el bloque y contando otra vez…" : "Contando unidades del bloque…"}
        </p>
      ) : (
        <div className="flex justify-center">
          <button
            type="button"
            className="min-h-[44px] rounded-xl border-2 border-[color:var(--stage-border,#334155)] bg-black/20 px-5 py-2.5 text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)] transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
            onClick={() => {
              setSwapped((s) => !s);
              setFilled(total);
            }}
          >
            Girar el bloque
          </button>
        </div>
      )}
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
      <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-10">
        <BombonesPile label={String(dividend)} />
        <CajaBombones count={divisor} caption="cajas iguales" highlight />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: divisor }, (_, i) => (
          <CajaBombones
            key={i}
            count={i < filled ? quotient : "…"}
            caption={`Caja ${i + 1}`}
            highlight={i < filled}
          />
        ))}
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
        <div
          className="flex min-h-[44px] flex-col items-center justify-center rounded-xl border-2 border-amber-200 bg-amber-50/80 px-2 py-2"
          aria-label={`Montón con ${pool} bombones por repartir`}
        >
          <Image
            src={ASSETS.bombones}
            alt=""
            width={100}
            height={80}
            className="h-16 w-auto object-contain opacity-90"
            aria-hidden
          />
          <SlideBadge>{pool}</SlideBadge>
        </div>
        <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: boxes }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-xl border-2 border-cobalt/20 bg-white p-2">
              <CajaBombones count={boxCounts[i] ?? 0} caption={`Caja ${i + 1}`} />
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

function PuenteMultDiv({
  a,
  b,
  dividend,
  divisor,
  onReadyChange,
}: {
  a: number;
  b: number;
  dividend: number;
  divisor: number;
  onReadyChange?: (ready: boolean) => void;
}) {
  useEffect(() => {
    onReadyChange?.(true);
  }, [onReadyChange]);

  const product = a * b;
  const quotient = Math.floor(dividend / divisor);

  return (
    <div
      className="grid gap-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
      aria-label="Multiplicar y dividir como operaciones inversas"
    >
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-cobalt-tint/50 px-3 py-4">
        <p className="text-xs font-bold uppercase tracking-wide text-cobalt">Multiplicar</p>
        <TicketFan count={b} priceLabel={`${product}€`} />
        <p className="text-center text-xs text-ink-muted">
          <MathRenderer text={`$${a} \\cdot ${b} = ${product}$`} />
        </p>
      </div>
      <span className="hidden text-2xl text-ink-muted sm:block" aria-hidden>
        ↔
      </span>
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-amber-50/90 px-3 py-4">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Dividir</p>
        <div className="flex flex-wrap items-end justify-center gap-3">
          <BombonesPile label={String(dividend)} />
          <CajaBombones count={divisor} caption="cajas" />
        </div>
        <p className="text-center text-xs text-ink-muted">
          <MathRenderer text={`$${dividend} : ${divisor} = ${quotient}$`} />
        </p>
      </div>
    </div>
  );
}

function MultiplicarConteo({ a, b }: { a: number; b: number }) {
  const total = a * b;
  return (
    <div className="flex flex-col items-center gap-4" aria-label={`${a} euros por ${b} entradas`}>
      <TicketFan count={b} priceLabel={`${total}€`} />
      <p className="text-center text-sm text-ink-muted">
        <MathRenderer text={`$${a} \\cdot ${b} = ${total}$`} />
      </p>
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
      case "multiplicacion-mano":
        return (
          <MultiplicacionManoScene
            multiplicand={a}
            multiplier={b}
            autoPlay={autoPlay}
            reduced={reduced}
            onReadyChange={onReadyChange}
            onAnimationComplete={onAnimationComplete}
          />
        );
      case "division-mano":
        return (
          <DivisionManoScene
            dividend={dividend}
            divisor={divisor}
            autoPlay={autoPlay}
            reduced={reduced}
            onReadyChange={onReadyChange}
            onAnimationComplete={onAnimationComplete}
          />
        );
      case "puente-mult-div":
        return (
          <PuenteMultDiv
            a={a}
            b={b}
            dividend={dividend}
            divisor={divisor}
            onReadyChange={onReadyChange}
          />
        );
      case "conmutativa-producto":
        return <ConmutativaProducto a={a} b={b} reduced={reduced} onReadyChange={onReadyChange} />;
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
          <DivisionIdentidadScene
            autoPlay={autoPlay}
            reduced={reduced}
            onReadyChange={onReadyChange}
          />
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
