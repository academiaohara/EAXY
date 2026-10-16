/**
 * REFERENCIA — escena calculadora de raíz cuadrada + LCD √ (extracto).
 * Canon: src/components/lesson/stage/modules/raices-cuadradas/RaicesCuadradasModule.tsx
 *
 * Depende de: casio-fx991.tsx, potencias-shared.tsx, boardSemanticColors, MathRenderer
 */
"use client";

import { useMemo } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { CasioFx991 } from "@/components/lesson/stage/modules/potencias/casio-fx991";
import { ENTER, SceneShell, Tex, fmt, usePotenciasPhases } from "@/components/lesson/stage/modules/potencias/potencias-shared";
import { boardSemanticColors } from "@/lib/lesson/stage/board-semantic-colors";
import { cn } from "@/lib/utils";

const ROOT = boardSemanticColors.amber;
const RAD = boardSemanticColors.teal;

function tex(color: string, content: string | number): string {
  return `\\color{${color}}{${content}}`;
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

const CASIO_LCD = {
  ink: "#1f2937",
  baselineY: 126,
  vinculumY: 108,
  radicandX: 58,
  digitAdvance: 15,
  fontSize: 24,
  tailLeft: 40,
  tailRight: 48,
  kneeX: 54,
} as const;

function casioSqrtVinculumEnd(radicandChars: number, includePlaceholder: boolean) {
  const slots = Math.max(radicandChars + (includePlaceholder ? 1 : 0), 1);
  return CASIO_LCD.radicandX + slots * CASIO_LCD.digitAdvance + 3;
}

function CasioSqrtRadicalStroke({ vinculumEnd }: { vinculumEnd: number }) {
  const { tailLeft, tailRight, kneeX, baselineY, vinculumY, ink } = CASIO_LCD;
  return (
    <path
      d={`M ${tailLeft} ${baselineY} L ${tailRight} ${baselineY} L ${kneeX} ${vinculumY} L ${vinculumEnd} ${vinculumY}`}
      fill="none"
      stroke={ink}
      strokeWidth={2.4}
      strokeLinejoin="round"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
      shapeRendering="geometricPrecision"
    />
  );
}

function CasioSqrtRadicandRow({
  typed,
  totalLength,
  showPlaceholder,
}: {
  typed: string;
  totalLength: number;
  showPlaceholder: boolean;
}) {
  const { radicandX, baselineY, vinculumY, digitAdvance, fontSize, ink } = CASIO_LCD;
  const vinculumEnd = casioSqrtVinculumEnd(typed.length, showPlaceholder && typed.length < totalLength);
  const placeholderX = radicandX + typed.length * digitAdvance;

  return (
    <g className="font-mono" style={{ fill: ink }}>
      <CasioSqrtRadicalStroke vinculumEnd={vinculumEnd} />
      {typed.length > 0 ? (
        <text x={radicandX} y={baselineY} fontSize={fontSize} fontWeight={700} style={{ fontFamily: "ui-monospace, monospace" }}>
          {typed}
        </text>
      ) : null}
      {showPlaceholder && typed.length < totalLength ? (
        <rect x={placeholderX} y={vinculumY + 5} width={12} height={12} fill="none" stroke={ink} strokeWidth={1.4} />
      ) : null}
    </g>
  );
}

function SqrtCasioScreen({ phase, radicand, result }: { phase: number; radicand: number; result: number }) {
  const digits = String(radicand);
  const keySequence = buildSqrtKeySequence(radicand);
  const digitsTyped = phase >= 2 ? digits.slice(0, Math.min(phase - 1, digits.length)) : "";
  const showResult = phase >= keySequence.length;
  const showInput = phase >= 1 && !showResult;

  if (phase < 1) {
    return null;
  }

  return (
    <>
      {showInput ? <CasioSqrtRadicandRow typed={digitsTyped} totalLength={digits.length} showPlaceholder /> : null}
      {showResult ? (
        <>
          <CasioSqrtRadicandRow typed={digits} totalLength={digits.length} showPlaceholder={false} />
          <text x={274} y={164} textAnchor="end" fontSize={28} fontWeight={700} className={cn(ENTER, "font-mono duration-500")} style={{ fill: "#111827" }}>
            {result}
          </text>
        </>
      ) : null}
    </>
  );
}

export function RaizCalculadoraScene({ radicand = 144, onReadyChange }: { radicand?: number; onReadyChange?: (ready: boolean) => void }) {
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
