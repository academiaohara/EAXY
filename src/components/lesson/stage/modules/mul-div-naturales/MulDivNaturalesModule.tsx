"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import type { MulDivConfig, MulDivNaturalesScene } from "@/lib/lesson/types";
import { CocienteRestoFeedback } from "@/components/lesson/stage/modules/mul-div-naturales/CocienteRestoFeedback";
import { ExactaEnteraInteractive } from "@/components/lesson/stage/modules/mul-div-naturales/ExactaEnteraInteractive";
import {
  DivisionManoScene,
  MultiplicacionManoScene,
} from "@/components/lesson/stage/modules/mul-div-naturales/EscolarAlgorithmViews";
import {
  AsociativaHuevosDiscover,
  AsociativaTrucoMental,
} from "@/components/lesson/stage/modules/mul-div-naturales/AsociativaScenes";
import {
  useRegisterLessonFooterCenter,
  useRegisterLessonPresenterNavigation,
} from "@/components/lesson/LessonStepControlContext";
import { MulDivLessonClosing } from "@/components/lesson/stage/modules/mul-div-naturales/MulDivLessonClosing";
import { StageStepControls } from "@/components/lesson/stage/modules/mul-div-naturales/StageStepControls";
import { boardSemanticColors } from "@/lib/lesson/stage/board-semantic-colors";
import { cn } from "@/lib/utils";

const ASSETS = {
  ticket: "/lesson/mul-div-naturales/ticket.png",
  bombones: "/lesson/mul-div-naturales/bombones.png",
  cajabombones: "/lesson/mul-div-naturales/cajabombones.png",
} as const;

export type MulDivNaturalesModuleProps = MulDivConfig & {
  stepId: string;
  autoPlay?: boolean;
  /** Sub-pasos internos de multiplicación a mano (1–4). */
  subStep?: number;
  onBoardClick?: () => void;
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
const STAGE_MATH =
  "lesson-stage-mul-equation text-center text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)]";

function latexTealExpression(expression: string): string {
  return `\\color{${boardSemanticColors.teal}}{${expression}}`;
}

function latexColoredRepeatedProduct(
  sumExpression: string,
  a: number,
  b: number,
  total?: number,
): string {
  const sum = latexTealExpression(sumExpression);
  const product = `\\color{${boardSemanticColors.amber}}{${a} \\cdot ${b}}`;
  if (total !== undefined) {
    return `$${sum} = ${product} = ${total}$`;
  }
  return `$${sum} = ${product}$`;
}

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
  size = "md",
}: {
  count: number | string;
  caption?: string;
  highlight?: boolean;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? { w: 72, h: 62, cls: "h-14 w-[4.5rem]" } : { w: 110, h: 95, cls: "h-[5.5rem] w-auto" };
  return (
    <div className="flex flex-col items-center gap-1">
      <Image
        src={ASSETS.cajabombones}
        alt=""
        width={dim.w}
        height={dim.h}
        className={cn(
          "object-contain transition",
          dim.cls,
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

function MultiplicarSextaEntrada({
  a,
  baseCount,
  totalCount,
  onReadyChange,
  onAnimationComplete,
}: {
  a: number;
  baseCount: number;
  totalCount: number;
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  useEffect(() => {
    onReadyChange?.(true);
    onAnimationComplete?.();
  }, [onAnimationComplete, onReadyChange]);

  const sumParts = Array.from({ length: totalCount }, () => String(a)).join(" + ");
  const mathText = `${sumParts} = ?`;

  return (
    <div
      className="space-y-4"
      aria-label={`Comparar 1, ${baseCount} y ${totalCount} entradas de ${a} euros`}
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8">
        <div className="flex min-w-[7.5rem] flex-col items-center gap-2">
          <div className="flex h-[6.5rem] items-end">
            <TicketImage style={{ transform: `rotate(${TICKET_TILT_DEG}deg)` }} />
          </div>
          <SlideBadge>{a}€</SlideBadge>
          <span className={STAGE_CAPTION}>1 entrada</span>
        </div>
        <TicketFan
          count={baseCount}
          priceLabel={`${a * baseCount}€`}
          caption={`${baseCount} entradas`}
        />
        <TicketFan count={totalCount} priceLabel="?" caption={`${totalCount} entradas`} />
      </div>
      <p className={STAGE_MATH} aria-live="polite">
        <MathRenderer text={`$${mathText}$`} />
      </p>
    </div>
  );
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
        ? latexColoredRepeatedProduct(fullSum, a, b, total)
        : mathPhase >= 1
          ? latexColoredRepeatedProduct(fullSum, a, b)
          : `$${latexTealExpression(fullSum)}$`
      : ticketCount > 1
        ? `$${latexTealExpression(sumParts)}$`
        : null;

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
            "lesson-stage-mul-equation transition-[color,opacity] duration-500 ease-out",
          )}
          aria-live="polite"
        >
          <MathRenderer text={mathText} />
        </p>
      ) : null}
    </div>
  );
}

const COMMUTATIVE_CELL_REM = 2.75;
const COMMUTATIVE_GAP_REM = 0.25;
const COMMUTATIVE_PAD_REM = 0.5;
/** border-2 en el bloque (2px por lado → 4px por eje). */
const COMMUTATIVE_BORDER_REM = 0.25;
const COMMUTATIVE_ARENA_SAFETY_REM = 0.25;
const COMMUTATIVE_ROTATE_MS = 800;

function commutativeGridSizeRem(rowCount: number, colCount: number) {
  const gridWidthRem =
    colCount * COMMUTATIVE_CELL_REM + Math.max(0, colCount - 1) * COMMUTATIVE_GAP_REM;
  const gridHeightRem =
    rowCount * COMMUTATIVE_CELL_REM + Math.max(0, rowCount - 1) * COMMUTATIVE_GAP_REM;
  return { gridWidthRem, gridHeightRem };
}

/** Tamaño exterior del bloque (rejilla + p-2 + border-2). */
function commutativeBlockOuterRem(rowCount: number, colCount: number) {
  const { gridWidthRem, gridHeightRem } = commutativeGridSizeRem(rowCount, colCount);
  const chromeRem = COMMUTATIVE_PAD_REM * 2 + COMMUTATIVE_BORDER_REM;
  return {
    widthRem: gridWidthRem + chromeRem,
    heightRem: gridHeightRem + chromeRem,
  };
}

/** Cuadrado fijo que cabe el bloque en 0° y en 90° (filas × columnas = a × b). */
function commutativeBlockArenaRem(rowCount: number, colCount: number) {
  const { widthRem, heightRem } = commutativeBlockOuterRem(rowCount, colCount);
  return Math.max(widthRem, heightRem) + COMMUTATIVE_ARENA_SAFETY_REM;
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
  const rows = a;
  const cols = b;
  const arenaRem = commutativeBlockArenaRem(rows, cols);
  const rotateTransition = reduced ? "duration-0" : "duration-[800ms]";

  const [swapped, setSwapped] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [hasSwappedOnce, setHasSwappedOnce] = useState(false);
  const [formulaPulse, setFormulaPulse] = useState(false);
  const rotateTimerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (rotateTimerRef.current !== null) {
        window.clearTimeout(rotateTimerRef.current);
      }
    },
    [],
  );

  const handleRotate = useCallback(() => {
    if (rotating) {
      return;
    }
    setRotating(true);
    setSwapped((current) => !current);
    setHasSwappedOnce(true);
    onReadyChange?.(true);
    setFormulaPulse(true);
    if (rotateTimerRef.current !== null) {
      window.clearTimeout(rotateTimerRef.current);
    }
    rotateTimerRef.current = window.setTimeout(() => {
      setRotating(false);
      rotateTimerRef.current = null;
    }, reduced ? 0 : COMMUTATIVE_ROTATE_MS);
    window.setTimeout(() => setFormulaPulse(false), reduced ? 0 : 600);
  }, [onReadyChange, reduced, rotating]);

  const leftFactor = swapped ? b : a;
  const rightFactor = swapped ? a : b;

  const factorColorClass = (factor: number, pulse: boolean) => {
    const isRowFactor = factor === a;
    if (pulse) {
      return isRowFactor ? "text-[#7dd3fc]" : "text-[#e9d5ff]";
    }
    return isRowFactor ? "text-[#4353ff]" : "text-[#a78bfa]";
  };

  return (
    <div className="space-y-4" aria-label="Propiedad conmutativa de la multiplicación">
      <div
        className="mx-auto flex max-w-full items-center justify-center overflow-visible"
        style={{ width: `${arenaRem}rem`, height: `${arenaRem}rem`, minHeight: `${arenaRem}rem` }}
      >
        <div
          className={cn(
            "grid shrink-0 gap-1 rounded-lg border-2 border-[color:var(--stage-border,#334155)] bg-[color:var(--stage-surface,#1a2332)] p-2 transition-transform ease-in-out",
            rotateTransition,
            swapped ? "rotate-90" : "rotate-0",
          )}
          style={{
            gridTemplateColumns: `repeat(${cols}, ${COMMUTATIVE_CELL_REM}rem)`,
            gridTemplateRows: `repeat(${rows}, ${COMMUTATIVE_CELL_REM}rem)`,
          }}
        >
          {Array.from({ length: total }, (_, i) => {
            const rowIndex = Math.floor(i / cols);
            const colIndex = i % cols;
            return (
              <div
                key={i}
                className={cn(
                  "flex items-center justify-center rounded-md border font-mono text-sm font-bold tabular-nums text-[color:var(--stage-chalk,#f8fafc)] transition-transform ease-in-out",
                  rotateTransition,
                  swapped ? "-rotate-90" : "rotate-0",
                )}
                style={{
                  borderColor: "color-mix(in srgb, var(--stage-border, #334155) 70%, transparent)",
                  backgroundColor: "color-mix(in srgb, #4353ff 12%, #1a2332)",
                  boxShadow: `inset 0 3px 0 0 color-mix(in srgb, #7c3aed 55%, transparent), inset 3px 0 0 0 color-mix(in srgb, #4353ff 55%, transparent)`,
                }}
                title={`Fila ${rowIndex + 1}, columna ${colIndex + 1}`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
      </div>

      <p
        className={cn(
          STAGE_MATH,
          "transition-transform duration-300",
          formulaPulse && !reduced && "scale-[1.03]",
        )}
        aria-live="polite"
      >
        <span className={cn("font-bold transition-colors duration-300", factorColorClass(leftFactor, formulaPulse))}>
          {leftFactor}
        </span>
        <span className="mx-1 text-[color:var(--stage-muted,#94a3b8)]">·</span>
        <span className={cn("font-bold transition-colors duration-300", factorColorClass(rightFactor, formulaPulse))}>
          {rightFactor}
        </span>
        <span className="mx-1 text-[color:var(--stage-muted,#94a3b8)]">=</span>
        <span>{total}</span>
      </p>

      {hasSwappedOnce ? (
        <p
          className={cn(
            "text-center text-sm font-medium text-[color:var(--stage-ink,#e8edf5)]",
            !reduced && "animate-in fade-in duration-700",
          )}
          aria-live="polite"
        >
          <span className="font-bold text-[#4353ff]">{a}</span>
          <span className="mx-1 text-[color:var(--stage-muted,#94a3b8)]">·</span>
          <span className="font-bold text-[#a78bfa]">{b}</span>
          <span className="mx-1 text-[color:var(--stage-muted,#94a3b8)]">=</span>
          <span className="font-bold text-[#a78bfa]">{b}</span>
          <span className="mx-1 text-[color:var(--stage-muted,#94a3b8)]">·</span>
          <span className="font-bold text-[#4353ff]">{a}</span>
        </p>
      ) : null}

      <div className="flex justify-center">
        <button
          type="button"
          disabled={rotating}
          className="min-h-[44px] rounded-xl border-2 border-[color:var(--stage-border,#334155)] bg-black/20 px-5 py-2.5 text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)] transition hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt disabled:cursor-not-allowed disabled:opacity-45"
          onClick={handleRotate}
        >
          Girar el bloque
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
        <p className="min-h-[2.5rem] text-center text-sm font-medium text-[color:var(--stage-ink,#e8edf5)]">
          <MathRenderer text={`$${a} \\cdot (${b} + ${c}) = ${a} \\cdot ${b} + ${a} \\cdot ${c} = ${left} + ${right} = ${total}$`} />
        </p>
      ) : (
        <div className="min-h-[2.5rem]" aria-hidden />
      )}
    </div>
  );
}

function RepartoIgual({
  dividend,
  divisor,
  reduced,
  onReadyChange,
}: {
  dividend: number;
  divisor: number;
  autoPlay?: boolean;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
}) {
  const quotient = Math.floor(dividend / divisor);
  const stepCount = 3;
  const finalPhase = stepCount - 1;
  const [phase, setPhase] = useState(reduced ? finalPhase : 0);

  useEffect(() => {
    onReadyChange?.(phase >= finalPhase);
  }, [finalPhase, onReadyChange, phase]);

  const handleRestart = useCallback(() => {
    setPhase(0);
    onReadyChange?.(false);
  }, [onReadyChange]);

  const advancePhase = useCallback(() => {
    setPhase((current) => Math.min(finalPhase, current + 1));
  }, [finalPhase]);

  const retreatPhase = useCallback(() => {
    setPhase((current) => Math.max(0, current - 1));
  }, []);

  const presenterNav = useMemo(
    () => ({
      onAdvance: advancePhase,
      onRetreat: retreatPhase,
      canAdvance: phase < finalPhase,
      canRetreat: phase > 0,
    }),
    [advancePhase, finalPhase, phase, retreatPhase],
  );
  useRegisterLessonPresenterNavigation(presenterNav);

  const caption =
    phase === 0
      ? `${dividend} bombones repartidos en ${divisor} cajas iguales. ¿Cuántos caben en cada caja?`
      : phase === 1
        ? `En cada caja caben ${quotient} bombones. ¿Cuántas cajas llenas formamos?`
        : "Dividir es el camino de vuelta de multiplicar.";

  const footerControls = useMemo(
    () => (
      <StageStepControls
        variant="presenter"
        phase={phase}
        stepCount={stepCount}
        playing={false}
        onPhaseChange={setPhase}
        onPlayingChange={() => {}}
        onRestart={handleRestart}
      />
    ),
    [handleRestart, phase, stepCount],
  );
  useRegisterLessonFooterCenter(footerControls);

  return (
    <div className="space-y-3" aria-label={`Repartir ${dividend} en ${divisor} cajas iguales`}>
      <div className="min-h-[11rem] space-y-3">
        {phase === 0 ? (
          <div className="flex flex-col items-center gap-3">
            <BombonesPile label={String(dividend)} />
            <div className="grid w-full max-w-2xl grid-cols-6 gap-2 px-1">
              {Array.from({ length: divisor }, (_, i) => (
                <CajaBombones key={i} size="sm" count="?" caption={`C${i + 1}`} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="grid w-full max-w-2xl grid-cols-6 gap-2 px-1">
              {Array.from({ length: divisor }, (_, i) => (
                <CajaBombones key={i} size="sm" count={quotient} caption={`C${i + 1}`} highlight />
              ))}
            </div>
            {phase >= 2 ? (
              <div className="space-y-1 text-center text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)]">
                <p>
                  <span className="text-[#a78bfa]">{divisor}</span>
                  <span className="text-[color:var(--stage-muted)]"> · </span>
                  <span className="text-[#7dd3fc]">{quotient}</span>
                  <span className="text-[color:var(--stage-muted)]"> = </span>
                  <span>{dividend}</span>
                </p>
                <p>
                  <span>{dividend}</span>
                  <span className="text-[color:var(--stage-muted)]"> : </span>
                  <span className="text-[#a78bfa]">{divisor}</span>
                  <span className="text-[color:var(--stage-muted)]"> = </span>
                  <span className="text-[#7dd3fc]">{quotient}</span>
                </p>
                <p>
                  <span>{dividend}</span>
                  <span className="text-[color:var(--stage-muted)]"> : </span>
                  <span className="text-[#7dd3fc]">{quotient}</span>
                  <span className="text-[color:var(--stage-muted)]"> = </span>
                  <span className="text-[#a78bfa]">{divisor}</span>
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <p className="min-h-[3.5rem] text-center text-sm leading-relaxed text-[color:var(--stage-ink,#e8edf5)]">
        {phase < 2 ? caption : (
          <>
            {caption}{" "}
            <span className="text-[color:var(--stage-muted,#94a3b8)]">
              ({dividend} : {divisor} = {quotient})
            </span>
          </>
        )}
      </p>
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

  const adjustBox = (boxIndex: number, delta: number) => {
    const next = [...boxCounts];
    if (delta > 0) {
      const add = Math.min(delta, pool);
      if (add <= 0) {
        return;
      }
      next[boxIndex] = next[boxIndex]! + add;
    } else {
      const remove = Math.min(-delta, next[boxIndex]!);
      if (remove <= 0) {
        return;
      }
      next[boxIndex] = next[boxIndex]! - remove;
    }
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
        <div className="grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: boxes }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 rounded-xl border-2 border-cobalt/20 bg-white p-2">
              <CajaBombones count={boxCounts[i] ?? 0} caption={`Caja ${i + 1}`} size="sm" />
              <div className="flex flex-wrap justify-center gap-1">
                {([10, 5, 1] as const).map((amount) => (
                  <button
                    key={`add-${amount}`}
                    type="button"
                    className="min-h-[36px] rounded-md bg-cobalt px-2 text-xs font-bold text-white"
                    aria-label={`Añadir ${amount} bombones a la caja ${i + 1}`}
                    onClick={() => adjustBox(i, amount)}
                  >
                    +{amount}
                  </button>
                ))}
                <button
                  type="button"
                  className="min-h-[36px] rounded-md border border-slate-200 px-2 text-xs font-bold text-ink"
                  aria-label={`Quitar un bombón de la caja ${i + 1}`}
                  onClick={() => adjustBox(i, -1)}
                >
                  −1
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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
  subStep = 1,
  onBoardClick,
  boxCounts = [],
  onBoxCountsChange,
  onReadyChange,
  onAnimationComplete,
  quotient,
  remainder,
  feedbackCorrect,
  practiceVariant,
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
      case "multiplicar-sexta-entrada":
        return (
          <MultiplicarSextaEntrada
            a={a}
            baseCount={b}
            totalCount={c ?? b + 1}
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
            subStep={subStep}
            onBoardClick={onBoardClick}
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
      case "asociativa-huevos":
        return <AsociativaHuevosDiscover a={a} b={b} c={c ?? 2} onReadyChange={onReadyChange} />;
      case "asociativa-truco":
        return (
          <AsociativaTrucoMental
            a={a}
            b={b}
            c={c ?? 4}
            autoPlay={autoPlay}
            reduced={reduced}
            onReadyChange={onReadyChange}
            onAnimationComplete={onAnimationComplete}
          />
        );
      case "asociativa-producto":
        return <AsociativaHuevosDiscover a={a} b={b} c={c ?? 2} onReadyChange={onReadyChange} />;
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
        return <ExactaEnteraInteractive onReadyChange={onReadyChange} />;
      case "cociente-resto-feedback":
        return (
          <CocienteRestoFeedback
            total={dividend}
            perBox={divisor}
            quotient={quotient ?? 0}
            remainder={remainder ?? 0}
            isCorrect={Boolean(feedbackCorrect)}
            variant={practiceVariant ?? "divide"}
            onReadyChange={onReadyChange}
          />
        );
      case "mul-div-cierre":
        return <MulDivLessonClosing onReadyChange={onReadyChange} />;
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
    <div data-testid={`mul-div-${scene}`} className="w-full max-w-full">
      {renderScene(scene)}
    </div>
  );
}
