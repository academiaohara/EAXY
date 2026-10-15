"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { boardSemanticColors } from "@/lib/lesson/stage/board-semantic-colors";
import type { RaicesConfig } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

/**
 * Escenas de «Raíz cuadrada» (Tema 2, 1.º ESO).
 *
 * Código de color constante en toda la lección (como en Manim):
 *  - ámbar  = la raíz (el lado del cuadrado)
 *  - turquesa = el radicando (el área del cuadrado)
 *
 * IMPORTANTE: todo LaTeX va en strings con doble barra (`\\sqrt`). Con una sola barra
 * JavaScript se la come y KaTeX pinta «sqrt25» en cursiva (bug de la versión anterior).
 */

export type RaicesCuadradasModuleProps = RaicesConfig & {
  stepId: string;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
};

const ROOT = boardSemanticColors.amber;
const RAD = boardSemanticColors.teal;
const CELL_REM = 2.25;

/** `\color{…}{…}` para LaTeX. */
function tex(color: string, content: string | number): string {
  return `\\color{${color}}{${content}}`;
}

const INK = "text-[color:var(--stage-ink,#e8edf5)]";
const MUTED = "text-[color:var(--stage-muted,#94a3b8)]";
const BORDER = "border-[color:var(--stage-border,#334155)]";

/* ---------------------------------------------------------------- hooks */

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);
  return mounted;
}

/** Fases de la escena: ← / → del teclado, botones y puntos. `ready` al llegar a la última. */
function usePhases(count: number, onReadyChange?: (ready: boolean) => void) {
  const last = count - 1;
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    onReadyChange?.(phase >= last);
  }, [last, onReadyChange, phase]);

  const next = useCallback(() => setPhase((p) => Math.min(last, p + 1)), [last]);
  const prev = useCallback(() => setPhase((p) => Math.max(0, p - 1)), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }
      if (event.key === "ArrowRight") {
        next();
      } else if (event.key === "ArrowLeft") {
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return { phase, setPhase, next, prev, last };
}

/* ------------------------------------------------------------- chrome */

function motion(reduced: boolean, extra = "duration-700") {
  return reduced ? "" : `transition-all ease-out ${extra}`;
}

function reveal(on: boolean, reduced: boolean) {
  return cn(motion(reduced), on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0");
}

function SceneFrame({
  caption,
  phase,
  count,
  onPrev,
  onNext,
  setPhase,
  children,
  testId,
}: {
  caption: string;
  phase: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
  setPhase: (phase: number) => void;
  children: ReactNode;
  testId: string;
}) {
  return (
    <div
      className="flex min-h-0 w-full flex-1 flex-col items-center justify-between gap-4 py-2"
      data-testid={testId}
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-6">{children}</div>

      <p
        className={cn("min-h-[3.5rem] max-w-3xl text-center text-lg leading-relaxed", INK)}
        aria-live="polite"
      >
        <MathRenderer text={caption} />
      </p>

      <div className="flex items-center gap-3" role="group" aria-label="Pasos de la escena">
        <button
          type="button"
          onClick={onPrev}
          disabled={phase === 0}
          aria-label="Paso anterior"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border bg-black/20 transition hover:border-cobalt/50 disabled:opacity-30",
            BORDER,
            INK,
          )}
        >
          <ChevronLeftIcon className="size-5" aria-hidden />
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPhase(i)}
              aria-label={`Ir al paso ${i + 1} de ${count}`}
              aria-current={i === phase}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === phase ? "w-7 bg-[color:var(--stage-accent,#6ee7b7)]" : "w-2.5 bg-slate-600 hover:bg-slate-400",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={phase === count - 1}
          aria-label="Paso siguiente"
          className="inline-flex h-10 items-center gap-1 rounded-full bg-[color:var(--stage-accent,#6ee7b7)] px-4 text-sm font-semibold text-slate-900 transition hover:opacity-90 disabled:opacity-30"
        >
          Siguiente
          <ChevronRightIcon className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function Formula({ text, reduced, className }: { text: string; reduced: boolean; className?: string }) {
  return (
    <div
      key={text}
      className={cn("text-3xl lg:text-4xl", INK, !reduced && "animate-in fade-in duration-500", className)}
    >
      <MathRenderer text={text} />
    </div>
  );
}

function Tag({ color, children, on, reduced }: { color: string; children: ReactNode; on: boolean; reduced: boolean }) {
  return (
    <span
      className={cn("rounded-full border-2 px-4 py-1 text-base font-bold", reveal(on, reduced))}
      style={{ borderColor: color, color, backgroundColor: `${color}1f` }}
    >
      {children}
    </span>
  );
}

/** Cuadrado hecho de celdas: el área es el radicando; el lado, la raíz. */
function SquareGrid({
  side,
  cell = CELL_REM,
  sideLabel,
  areaLabel,
  mounted,
  reduced,
}: {
  side: number;
  cell?: number;
  sideLabel: string;
  areaLabel: string;
  mounted: boolean;
  reduced: boolean;
}) {
  const size = side * cell;
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center gap-2">
        <div className="relative" style={{ width: `${size}rem`, height: `${size}rem` }}>
          <div
            className="grid h-full w-full overflow-hidden rounded-md border-2"
            style={{
              gridTemplateColumns: `repeat(${side}, 1fr)`,
              gridTemplateRows: `repeat(${side}, 1fr)`,
              borderColor: ROOT,
            }}
          >
            {Array.from({ length: side * side }, (_, i) => (
              <div
                key={i}
                className={cn("border border-black/30", motion(reduced, "duration-500"))}
                style={{
                  backgroundColor: mounted ? `${RAD}38` : "transparent",
                  transitionDelay: reduced ? undefined : `${i * 22}ms`,
                }}
              />
            ))}
          </div>
          <span
            className="absolute inset-0 flex items-center justify-center text-3xl font-bold"
            style={{ color: RAD }}
          >
            {areaLabel}
          </span>
        </div>
        <span className="text-xl font-bold" style={{ color: ROOT }}>
          {sideLabel}
        </span>
      </div>
      <span className="self-center text-xl font-bold" style={{ color: ROOT }}>
        {sideLabel}
      </span>
    </div>
  );
}

/* ------------------------------------------------- 1 · inversa del cuadrado */

function InversaCuadrado({
  side = 5,
  reduced,
  onReadyChange,
}: {
  side?: number;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  const area = side * side;
  const { phase, next, prev, setPhase } = usePhases(4, onReadyChange);
  const mounted = useMounted();

  const root = tex(ROOT, side);
  const rad = tex(RAD, area);
  const formulas = [
    `$${root}^2 = ${rad}$`,
    `$\\sqrt{${rad}} = ${tex(ROOT, "?")}$`,
    `$${root}^2 = ${rad} \\;\\longleftrightarrow\\; \\sqrt{${rad}} = ${root}$`,
    `$${tex(ROOT, "a")}^2 = ${tex(RAD, "b")} \\;\\longleftrightarrow\\; \\sqrt{${tex(RAD, "b")}} = ${tex(ROOT, "a")}$`,
  ];
  const captions = [
    `Elevar al cuadrado: un cuadrado de lado $${side}$ tiene área $${area}$.`,
    `Deshacerlo: ¿qué lado tiene un cuadrado de área $${area}$?`,
    `Lo encontramos: el lado es $${side}$. Elevar al cuadrado y hacer la raíz son operaciones inversas.`,
    "En general: la raíz es el lado y el radicando es el área.",
  ];

  return (
    <SceneFrame
      testId="raices-inversa-cuadrado"
      caption={captions[phase]}
      phase={phase}
      count={4}
      onPrev={prev}
      onNext={next}
      setPhase={setPhase}
    >
      <div className="flex flex-wrap items-center justify-center gap-16">
        <SquareGrid
          side={side}
          sideLabel={phase === 1 ? "?" : String(side)}
          areaLabel={String(area)}
          mounted={mounted}
          reduced={reduced}
        />
        <div className="flex min-w-[22rem] flex-col items-center gap-5">
          <Formula text={formulas[phase]} reduced={reduced} />
          <div className="flex min-h-[2.5rem] gap-3">
            <Tag color={ROOT} on={phase >= 3} reduced={reduced}>
              Raíz = lado
            </Tag>
            <Tag color={RAD} on={phase >= 3} reduced={reduced}>
              Radicando = área
            </Tag>
          </div>
        </div>
      </div>
    </SceneFrame>
  );
}

/* ----------------------------------------------- 2 · cuadrados perfectos */

const PERFECT_EXAMPLES = [5, 6, 20] as const;
const UNIT_REM = 0.6;

function PerfectSquare({ side, on, reduced }: { side: number; on: boolean; reduced: boolean }) {
  const size = side * UNIT_REM;
  const area = side * side;
  return (
    <div className={cn("flex flex-col items-center gap-3", reveal(on, reduced))}>
      <div className={cn("text-2xl", INK)}>
        <MathRenderer text={`$\\sqrt{${tex(RAD, area)}} = ${tex(ROOT, side)}$`} />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <div
            className="flex items-center justify-center rounded-md border-[3px]"
            style={{
              width: `${size}rem`,
              height: `${size}rem`,
              borderColor: ROOT,
              backgroundColor: `${RAD}30`,
              color: RAD,
            }}
          >
            <span className="font-bold">{area}</span>
          </div>
          <span className="text-lg font-bold" style={{ color: ROOT }}>
            {side}
          </span>
        </div>
        <span className="self-center text-lg font-bold" style={{ color: ROOT }}>
          {side}
        </span>
      </div>
    </div>
  );
}

function CuadradosPerfectos({
  reduced,
  onReadyChange,
}: {
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  const { phase, next, prev, setPhase } = usePhases(4, onReadyChange);
  const [n, setN] = useState(12);

  const captions = [
    "Un cuadrado de área 25 tiene lado exacto 5.",
    "Y uno de área 36 tiene lado exacto 6. Hay más.",
    "Cuanto más grande el área, más grande el lado: 400 → 20.",
    "Tu turno: mueve el lado y mira qué áreas son cuadrados perfectos.",
  ];

  return (
    <SceneFrame
      testId="raices-cuadrados-perfectos"
      caption={captions[phase]}
      phase={phase}
      count={4}
      onPrev={prev}
      onNext={next}
      setPhase={setPhase}
    >
      {phase < 3 ? (
        <div className="flex items-end justify-center gap-20">
          {PERFECT_EXAMPLES.map((side, i) => (
            <PerfectSquare key={side} side={side} on={phase >= i} reduced={reduced} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5" data-testid="raices-explorador">
          <Formula text={`$\\sqrt{${tex(RAD, n * n)}} = ${tex(ROOT, n)}$`} reduced />
          <div
            className="flex items-center justify-center rounded-md border-[3px]"
            style={{
              width: `${n * UNIT_REM}rem`,
              height: `${n * UNIT_REM}rem`,
              borderColor: ROOT,
              backgroundColor: `${RAD}30`,
              color: RAD,
              transition: reduced ? undefined : "width .25s ease, height .25s ease",
            }}
          >
            <span className="text-xl font-bold">{n * n}</span>
          </div>
          <label className={cn("flex items-center gap-3 text-sm font-semibold", MUTED)}>
            Lado
            <input
              type="range"
              min={1}
              max={20}
              value={n}
              onChange={(event) => setN(Number(event.target.value))}
              className="w-72 accent-[#ffd866]"
              aria-label="Lado del cuadrado"
            />
            <span className="w-6 text-lg font-bold" style={{ color: ROOT }}>
              {n}
            </span>
          </label>
          <p className={cn("text-base", INK)}>
            <MathRenderer text={`$${n * n}$ es un **cuadrado perfecto** porque su raíz es exacta.`} />
          </p>
        </div>
      )}
    </SceneFrame>
  );
}

/* ------------------------------------------------------- 3 · raíz entera */

function RaizEntera({
  radicand = 40,
  reduced,
  onReadyChange,
}: {
  radicand?: number;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  const { phase, next, prev, setPhase } = usePhases(4, onReadyChange);
  const r = Math.sqrt(radicand);
  const lo = Math.floor(r);
  const hi = lo + 1;
  const xMin = lo - 0.5;
  const xMax = hi + 0.5;
  const pos = (x: number) => `${((x - xMin) / (xMax - xMin)) * 100}%`;
  const width = (a: number, b: number) => `${((b - a) / (xMax - xMin)) * 100}%`;
  const approx = r.toFixed(2).replace(".", ",");

  const captions = [
    `$${lo}^2 = ${lo * lo}$ se queda corto: es menor que $${radicand}$.`,
    `$${hi}^2 = ${hi * hi}$ se pasa: es mayor que $${radicand}$.`,
    `Así que $\\sqrt{${radicand}}$ está entre $${lo}$ y $${hi}$.`,
    `Al entero que más se acerca **por debajo** lo llamamos **raíz entera**: la de $${radicand}$ es $${lo}$.`,
  ];

  const dot = (left: string, color: string, on: boolean, size = "size-5") => (
    <span
      className={cn("absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full", size, motion(reduced, "duration-1000"))}
      style={{ left, backgroundColor: color, opacity: on ? 1 : 0, boxShadow: `0 0 18px ${color}88` }}
    />
  );

  return (
    <SceneFrame
      testId="raices-raiz-entera"
      caption={captions[phase]}
      phase={phase}
      count={4}
      onPrev={prev}
      onNext={next}
      setPhase={setPhase}
    >
      <div className={cn("text-3xl", INK)}>
        <MathRenderer text={`$\\sqrt{${tex(RAD, radicand)}}$`} />
      </div>

      <div className="relative h-56 w-[min(60rem,90%)]">
        {/* banda lo..hi */}
        <div
          className={cn("absolute top-1/2 h-8 -translate-y-1/2 rounded-md", motion(reduced))}
          style={{ left: pos(lo), width: width(lo, hi), backgroundColor: `${RAD}22`, opacity: phase >= 2 ? 1 : 0 }}
        />
        {/* eje */}
        <div className={cn("absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-slate-500")} />
        {Array.from({ length: 11 }, (_, k) => {
          const x = lo + k / 10;
          const major = k === 0 || k === 10;
          return (
            <span
              key={k}
              className={cn("absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500", major ? "h-6 w-[3px]" : "h-3 w-px")}
              style={{ left: pos(x) }}
            />
          );
        })}
        {/* segmento «por debajo» */}
        <div
          className={cn("absolute top-1/2 h-[5px] -translate-y-1/2 rounded-full", motion(reduced, "duration-1000"))}
          style={{ left: pos(lo), width: width(lo, r), backgroundColor: ROOT, opacity: phase >= 3 ? 1 : 0 }}
        />

        {dot(pos(lo), phase >= 3 ? ROOT : RAD, true)}
        {dot(pos(hi), RAD, phase >= 1)}
        {dot(phase >= 2 ? pos(r) : pos(lo), phase >= 3 ? ROOT : RAD, phase >= 2, "size-6")}

        {/* ecuaciones sobre los puntos */}
        <div
          className={cn("absolute bottom-[62%] -translate-x-1/2 whitespace-nowrap text-2xl", INK, reveal(true, reduced))}
          style={{ left: pos(lo) }}
        >
          <MathRenderer text={`$${lo}^2 = ${lo * lo} < ${radicand}$`} />
        </div>
        <div
          className={cn("absolute bottom-[62%] -translate-x-1/2 whitespace-nowrap text-2xl", INK, reveal(phase >= 1, reduced))}
          style={{ left: pos(hi) }}
        >
          <MathRenderer text={`$${hi}^2 = ${hi * hi} > ${radicand}$`} />
        </div>

        {/* números del eje */}
        {[lo, hi].map((x) => (
          <div
            key={x}
            className="absolute top-[58%] -translate-x-1/2 text-2xl font-bold"
            style={{ left: pos(x), color: x === lo && phase >= 3 ? ROOT : "var(--stage-ink,#e8edf5)" }}
          >
            {x}
          </div>
        ))}

        {/* raíz */}
        <div
          className={cn("absolute top-[78%] -translate-x-1/2 whitespace-nowrap text-2xl", reveal(phase >= 2, reduced))}
          style={{ left: pos(r) }}
        >
          <MathRenderer text={`$\\sqrt{${tex(RAD, radicand)}} \\approx ${approx}$`} />
        </div>
        <div
          className={cn("absolute top-[38%] -translate-x-1/2 whitespace-nowrap text-sm font-bold", reveal(phase >= 3, reduced))}
          style={{ left: pos((lo + r) / 2), color: ROOT, transform: "translate(-50%, -140%)" }}
        >
          por debajo
        </div>
      </div>

      <div className="min-h-[3rem]">
        {phase >= 2 ? (
          <Formula
            text={
              phase >= 3
                ? `$${tex(ROOT, lo)} < \\sqrt{${tex(RAD, radicand)}} < ${hi} \\;\\Rightarrow\\; \\text{raíz entera} = ${tex(ROOT, lo)}$`
                : `$${lo} < \\sqrt{${tex(RAD, radicand)}} < ${hi}$`
            }
            reduced={reduced}
          />
        ) : null}
      </div>
    </SceneFrame>
  );
}

/* --------------------------------------------------- 4 · calculadora */

function Key({ lit, children, reduced }: { lit: boolean; children: ReactNode; reduced: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[3.5rem] min-w-[4rem] items-center justify-center rounded-xl border-2 px-4 text-2xl font-semibold",
        motion(reduced, "duration-300"),
        lit ? "scale-110 text-[color:var(--stage-ink,#e8edf5)]" : "scale-100 text-slate-500",
      )}
      style={{
        borderColor: lit ? ROOT : "#334155",
        backgroundColor: lit ? `${ROOT}22` : "rgba(0,0,0,.2)",
        boxShadow: lit ? `0 0 22px ${ROOT}55` : undefined,
      }}
    >
      {children}
    </span>
  );
}

function RaizCalculadora({
  radicand = 144,
  reduced,
  onReadyChange,
}: {
  radicand?: number;
  reduced: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  const { phase, next, prev, setPhase } = usePhases(4, onReadyChange);
  const root = Math.round(Math.sqrt(radicand));

  const captions = [
    `Para calcular $\\sqrt{${radicand}}$ solo necesitas tres pulsaciones.`,
    "Primero, la tecla de la raíz cuadrada.",
    `Después, el radicando: $${radicand}$.`,
    `Y para terminar, la tecla igual. Comprobamos: $${root}^2 = ${radicand}$.`,
  ];

  const expression = phase === 0 ? "" : phase === 1 ? "√ ▯" : `√${radicand}`;

  return (
    <SceneFrame
      testId="raices-calculadora"
      caption={captions[phase]}
      phase={phase}
      count={4}
      onPrev={prev}
      onNext={next}
      setPhase={setPhase}
    >
      <div className={cn("text-3xl", INK)}>
        <MathRenderer text={`$\\sqrt{${tex(RAD, radicand)}}$`} />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Key lit={phase === 1} reduced={reduced}>
          <MathRenderer text="$\\sqrt{\\square}$" />
        </Key>
        <Key lit={phase === 2} reduced={reduced}>
          {radicand}
        </Key>
        <Key lit={phase === 3} reduced={reduced}>
          =
        </Key>
      </div>

      <div
        className={cn("flex w-[22rem] flex-col rounded-2xl border-2 bg-black/30 px-5 py-3", BORDER)}
        aria-label="Pantalla de la calculadora"
      >
        <span className={cn("min-h-[1.75rem] font-mono text-xl", MUTED)}>{expression}</span>
        <span
          className={cn("min-h-[3.25rem] text-right font-mono text-5xl font-bold", motion(reduced, "duration-500"))}
          style={{ color: ROOT, opacity: phase >= 3 ? 1 : 0 }}
        >
          {root}
        </span>
      </div>

      <div className="min-h-[3rem]">
        {phase >= 3 ? (
          <Formula
            text={`$${root}^2 = ${tex(RAD, radicand)} \\;\\Rightarrow\\; \\sqrt{${tex(RAD, radicand)}} = ${tex(ROOT, root)}$`}
            reduced={reduced}
          />
        ) : null}
      </div>
    </SceneFrame>
  );
}

/* ----------------------------------------------------------- módulo */

export function RaicesCuadradasModule({ scene, radicand, root, onReadyChange }: RaicesCuadradasModuleProps) {
  const reduced = useReducedMotion();

  return (
    <div className="flex min-h-0 w-full max-w-full flex-1 flex-col" data-testid={`raices-scene-${scene}`}>
      {scene === "inversa-cuadrado" ? (
        <InversaCuadrado side={root ?? 5} reduced={reduced} onReadyChange={onReadyChange} />
      ) : scene === "cuadrados-perfectos" ? (
        <CuadradosPerfectos reduced={reduced} onReadyChange={onReadyChange} />
      ) : scene === "raiz-entera" ? (
        <RaizEntera radicand={radicand ?? 40} reduced={reduced} onReadyChange={onReadyChange} />
      ) : scene === "raiz-calculadora" ? (
        <RaizCalculadora radicand={radicand ?? 144} reduced={reduced} onReadyChange={onReadyChange} />
      ) : (
        <p className="text-sm text-rose-700">Escena no configurada.</p>
      )}
    </div>
  );
}
