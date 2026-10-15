"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { CasioFx991 } from "@/components/lesson/stage/modules/potencias/casio-fx991";
import {
  ENTER,
  SceneShell,
  Tex,
  fmt,
  usePotenciasPhases,
} from "@/components/lesson/stage/modules/potencias/potencias-shared";
import { boardSemanticColors } from "@/lib/lesson/stage/board-semantic-colors";
import type { RaicesConfig } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

/**
 * Escenas de «Raíz cuadrada» (Tema 2, 1.º ESO).
 * Controles de animación en el pie (como potencias / tema 1), vía `usePotenciasPhases`.
 */

export type RaicesCuadradasModuleProps = RaicesConfig & {
  stepId: string;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
};

const ROOT = boardSemanticColors.amber;
const RAD = boardSemanticColors.teal;
const CELL_REM = 2.25;

function tex(color: string, content: string | number): string {
  return `\\color{${color}}{${content}}`;
}

const INK = "text-[color:var(--stage-ink,#e8edf5)]";
const MUTED = "text-[color:var(--stage-muted,#94a3b8)]";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);
  return mounted;
}

function motion(reduced: boolean, extra = "duration-700") {
  return reduced ? "" : `transition-all ease-out ${extra}`;
}

function reveal(on: boolean, reduced: boolean) {
  return cn(motion(reduced), on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0");
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
            className="grid h-full w-full overflow-hidden border-2"
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
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold" style={{ color: RAD }}>
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

function InversaCuadrado({
  side = 5,
  onReadyChange,
}: {
  side?: number;
  onReadyChange?: (ready: boolean) => void;
}) {
  const { phase, reduced } = usePotenciasPhases({ stepCount: 4, onReadyChange, intervalMs: 2800 });
  const mounted = useMounted();
  const area = side * side;
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
    <SceneShell caption={captions[phase]!} phase={phase}>
      <div className="flex w-full flex-wrap items-center justify-center gap-16" data-testid="raices-inversa-cuadrado">
        <SquareGrid
          side={side}
          sideLabel={phase === 1 ? "?" : String(side)}
          areaLabel={String(area)}
          mounted={mounted}
          reduced={reduced}
        />
        <div className="flex min-w-[22rem] flex-col items-center gap-5">
          <Formula text={formulas[phase]!} reduced={reduced} />
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
    </SceneShell>
  );
}

const PERFECT_EXAMPLES = [5, 6, 20] as const;
const UNIT_REM = 0.6;

function PerfectSquare({ side, on, reduced }: { side: number; on: boolean; reduced: boolean }) {
  const size = side * UNIT_REM;
  const area = side * side;
  const areaOutside = side <= 2;
  return (
    <div className={cn("flex flex-col items-center gap-3", reveal(on, reduced))}>
      <div className={cn("text-2xl", INK)}>
        <MathRenderer text={`$\\sqrt{${tex(RAD, area)}} = ${tex(ROOT, side)}$`} />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          {areaOutside ? (
            <span className="text-base font-bold leading-none" style={{ color: RAD }}>
              {area}
            </span>
          ) : null}
          <div
            className="border-[3px]"
            style={{
              width: `${size}rem`,
              height: `${size}rem`,
              borderColor: ROOT,
              backgroundColor: `${RAD}30`,
            }}
          >
            {!areaOutside ? (
              <span className="flex h-full w-full items-center justify-center font-bold" style={{ color: RAD }}>
                {area}
              </span>
            ) : null}
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

function CuadradosPerfectos({ onReadyChange }: { onReadyChange?: (ready: boolean) => void }) {
  const { phase, reduced } = usePotenciasPhases({ stepCount: 4, onReadyChange, intervalMs: 3200 });
  const [n, setN] = useState(12);

  const captions = [
    "Un cuadrado de área 25 tiene lado exacto 5.",
    "Y uno de área 36 tiene lado exacto 6. Hay más.",
    "Cuanto más grande el área, más grande el lado: 400 → 20.",
    "Tu turno: mueve el lado y mira qué áreas son cuadrados perfectos.",
  ];

  return (
    <SceneShell caption={captions[phase]!} phase={phase}>
      <div className="flex w-full flex-col items-center justify-center" data-testid="raices-cuadrados-perfectos">
        {phase < 3 ? (
          <div className="flex items-end justify-center gap-20">
            {PERFECT_EXAMPLES.map((side, i) => (
              <PerfectSquare key={side} side={side} on={phase >= i} reduced={reduced} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5" data-testid="raices-explorador">
            <Formula text={`$\\sqrt{${tex(RAD, n * n)}} = ${tex(ROOT, n)}$`} reduced={reduced} />
            <div className="flex flex-col items-center gap-1">
              {n <= 2 ? (
                <span className="text-lg font-bold leading-none" style={{ color: RAD }}>
                  {n * n}
                </span>
              ) : null}
              <div
                className={cn("border-[3px]", n > 2 && "flex items-center justify-center")}
                style={{
                  width: `${n * UNIT_REM}rem`,
                  height: `${n * UNIT_REM}rem`,
                  borderColor: ROOT,
                  backgroundColor: `${RAD}30`,
                  color: RAD,
                  transition: reduced ? undefined : "width .25s ease, height .25s ease",
                }}
              >
                {n > 2 ? <span className="text-xl font-bold">{n * n}</span> : null}
              </div>
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
      </div>
    </SceneShell>
  );
}

function RaizEntera({
  radicand = 40,
  onReadyChange,
}: {
  radicand?: number;
  onReadyChange?: (ready: boolean) => void;
}) {
  const { phase, reduced } = usePotenciasPhases({ stepCount: 4, onReadyChange, intervalMs: 3000 });
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
    <SceneShell caption={captions[phase]!} phase={phase}>
      <div className="flex w-full flex-col items-center gap-6" data-testid="raices-raiz-entera">
        <div className={cn("text-3xl", INK)}>
          <MathRenderer text={`$\\sqrt{${tex(RAD, radicand)}}$`} />
        </div>

        <div className="relative h-56 w-[min(60rem,90%)]">
          <div
            className={cn("absolute top-1/2 h-8 -translate-y-1/2 rounded-md", motion(reduced))}
            style={{ left: pos(lo), width: width(lo, hi), backgroundColor: `${RAD}22`, opacity: phase >= 2 ? 1 : 0 }}
          />
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
          <div
            className={cn("absolute top-1/2 h-[5px] -translate-y-1/2 rounded-full", motion(reduced, "duration-1000"))}
            style={{ left: pos(lo), width: width(lo, r), backgroundColor: ROOT, opacity: phase >= 3 ? 1 : 0 }}
          />

          {dot(pos(lo), phase >= 3 ? ROOT : RAD, true)}
          {dot(pos(hi), RAD, phase >= 1)}
          {dot(phase >= 2 ? pos(r) : pos(lo), phase >= 3 ? ROOT : RAD, phase >= 2, "size-6")}

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

          {[lo, hi].map((x) => (
            <div
              key={x}
              className="absolute top-[58%] -translate-x-1/2 text-2xl font-bold"
              style={{ left: pos(x), color: x === lo && phase >= 3 ? ROOT : "var(--stage-ink,#e8edf5)" }}
            >
              {x}
            </div>
          ))}

          <div
            className={cn("absolute top-[78%] -translate-x-1/2 whitespace-nowrap text-2xl", reveal(phase >= 2, reduced))}
            style={{ left: pos(r) }}
          >
            <MathRenderer text={`$\\sqrt{${tex(RAD, radicand)}} \\approx ${approx}$`} />
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
      </div>
    </SceneShell>
  );
}

function SqrtKeyChip({ id }: { id: string }) {
  if (id === "sqrt") {
    return (
      <span aria-label="tecla de raíz cuadrada">
        √<span className="inline-block h-3 w-3 border border-current align-middle" aria-hidden />
      </span>
    );
  }
  if (id === "eq") {
    return <>=</>;
  }
  return <>{id}</>;
}

function buildSqrtKeySequence(radicand: number): string[] {
  return ["sqrt", ...String(radicand).split(""), "eq"];
}

function SqrtCasioScreen({ phase, radicand, result }: { phase: number; radicand: number; result: number }) {
  const digits = String(radicand);
  const keySequence = buildSqrtKeySequence(radicand);
  const digitsTyped =
    phase >= 2 ? digits.slice(0, Math.min(phase - 1, digits.length)) : "";
  const showResult = phase >= keySequence.length;

  if (phase < 1) {
    return null;
  }

  return (
    <>
      <g style={{ fill: "#1f2937" }} className="font-mono">
        <text x={46} y={124} fontSize={26} fontWeight={700}>
          √
        </text>
        {phase === 1 ? (
          <rect x={68} y={102} width={14} height={14} fill="none" stroke="#1f2937" strokeWidth={1.5} />
        ) : (
          <text x={68} y={124} fontSize={26} fontWeight={700}>
            {digitsTyped}
          </text>
        )}
        {phase >= 2 && digitsTyped.length < digits.length ? (
          <rect x={68 + digitsTyped.length * 15 + 2} y={102} width={11} height={11} fill="none" stroke="#1f2937" strokeWidth={1.5} />
        ) : null}
      </g>
      {showResult ? (
        <text x={274} y={164} textAnchor="end" fontSize={28} fontWeight={700} className={cn(ENTER, "font-mono duration-500")} style={{ fill: "#111827" }}>
          {result}
        </text>
      ) : null}
    </>
  );
}

function RaizCalculadora({ radicand = 144, onReadyChange }: { radicand?: number; onReadyChange?: (ready: boolean) => void }) {
  const keySequence = useMemo(() => buildSqrtKeySequence(radicand), [radicand]);
  const stepCount = keySequence.length + 1;
  const { phase } = usePotenciasPhases({ stepCount, onReadyChange, intervalMs: 1900 });
  const result = Math.round(Math.sqrt(radicand));

  const captions = [
    "En la calculadora científica hay una tecla para la raíz cuadrada.",
    "Primero, la tecla √.",
  ];
  const digitChars = String(radicand).split("");
  digitChars.forEach((digit, i) => {
    if (digitChars.length === 1) {
      captions.push(`Después, el radicando: $${digit}$.`);
    } else if (i === 0) {
      captions.push(`Escribe el radicando $${radicand}$, empezando por $${digit}$.`);
    } else if (i === digitChars.length - 1) {
      captions.push(`Termina con el dígito $${digit}$.`);
    } else {
      captions.push(`Sigue con el dígito $${digit}$.`);
    }
  });
  captions.push(`Y con «=» aparece el resultado: ${fmt(result)}.`);

  const resultPhase = keySequence.length;

  return (
    <SceneShell caption={captions[Math.min(phase, captions.length - 1)]!} phase={phase}>
      <div
        className="grid h-full min-h-0 w-full max-w-5xl grid-cols-[auto_1fr] items-center gap-10"
        data-testid="raices-calculadora"
        aria-label="Calcular una raíz cuadrada con la calculadora"
      >
        <div className="flex h-full min-h-0 items-center justify-center">
          <CasioFx991
            phase={phase}
            keySequence={keySequence}
            accentColor={ROOT}
            emphasisKeyIds={["sqrt"]}
            ariaLabel={`Calculadora Casio fx-991ES Plus calculando raíz cuadrada de ${radicand}`}
            screen={<SqrtCasioScreen phase={phase} radicand={radicand} result={result} />}
          />
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3 text-3xl text-[color:var(--stage-ink,#e8edf5)]">
            <Tex t={`\\sqrt{${tex(RAD, radicand)}}`} />
            <span className="text-[color:var(--stage-muted,#94a3b8)]">→</span>
            {keySequence.map((id, i) => (
              <span
                key={`${id}-${i}`}
                className={cn(
                  "flex h-12 min-w-12 items-center justify-center rounded-xl border-2 px-3 font-mono text-xl font-bold transition-all duration-300",
                  phase > i + 1 && "border-[#ffd866]/60 text-[#ffd866]",
                  phase === i + 1 && "scale-110 border-[#ffd866] bg-[#ffd866]/20 text-[#ffd866]",
                  phase < i + 1 && "border-[color:var(--stage-border,#334155)] text-[color:var(--stage-muted,#94a3b8)]",
                )}
              >
                <SqrtKeyChip id={id} />
              </span>
            ))}
            {phase >= resultPhase ? (
              <>
                <span className="text-[color:var(--stage-muted,#94a3b8)]">→</span>
                <span className={cn(ENTER, "zoom-in-75 rounded-xl border-2 border-[#5eead4] bg-[#5eead4]/15 px-4 py-2 font-mono text-2xl font-bold text-[#5eead4] duration-500")}>
                  {result}
                </span>
              </>
            ) : null}
          </div>
          {phase >= resultPhase ? (
            <p className={cn(ENTER, "text-center text-base duration-700 text-[color:var(--stage-muted,#94a3b8)]")} style={{ animationDelay: "400ms" }}>
              Comprobación:{" "}
              <Tex t={`${result}^2 = ${tex(RAD, radicand)} \\;\\Rightarrow\\; \\sqrt{${tex(RAD, radicand)}} = ${tex(ROOT, result)}`} />
            </p>
          ) : null}
        </div>
      </div>
    </SceneShell>
  );
}

export function RaicesCuadradasModule({ scene, radicand, root, onReadyChange }: RaicesCuadradasModuleProps) {
  return (
    <div className="flex min-h-0 w-full max-w-full flex-1 flex-col" data-testid={`raices-scene-${scene}`}>
      {scene === "inversa-cuadrado" ? (
        <InversaCuadrado side={root ?? 5} onReadyChange={onReadyChange} />
      ) : scene === "cuadrados-perfectos" ? (
        <CuadradosPerfectos onReadyChange={onReadyChange} />
      ) : scene === "raiz-entera" ? (
        <RaizEntera radicand={radicand ?? 40} onReadyChange={onReadyChange} />
      ) : scene === "raiz-calculadora" ? (
        <RaizCalculadora radicand={radicand ?? 144} onReadyChange={onReadyChange} />
      ) : (
        <p className="text-sm text-rose-700">Escena no configurada.</p>
      )}
    </div>
  );
}
