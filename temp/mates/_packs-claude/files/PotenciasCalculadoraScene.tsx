/**
 * REFERENCIA — escena calculadora de potencias (extracto).
 * Canon: src/components/lesson/stage/modules/potencias/PotenciasModule.tsx
 *
 * Depende de: casio-fx991.tsx, potencias-shared.tsx (BASE_COLOR, ENTER, SceneShell, Tex, fmt, fmtTex, texPow, usePotenciasPhases)
 */
"use client";

import { CasioFx991 } from "@/components/lesson/stage/modules/potencias/casio-fx991";
import {
  BASE_COLOR,
  ENTER,
  SceneShell,
  Tex,
  fmt,
  fmtTex,
  texPow,
  usePotenciasPhases,
} from "@/components/lesson/stage/modules/potencias/potencias-shared";
import { cn } from "@/lib/utils";

type SceneProps = {
  base: number;
  exponent: number;
  onReadyChange?: (ready: boolean) => void;
};

function CasioCalculator({ base, exponent, phase, result }: { base: number; exponent: number; phase: number; result: number }) {
  const keySequence = [String(base), "pow", String(exponent), "eq"];
  const baseDigits = String(base);

  return (
    <CasioFx991
      phase={phase}
      keySequence={keySequence}
      accentColor={BASE_COLOR}
      emphasisKeyIds={["pow"]}
      ariaLabel={`Calculadora Casio fx-991ES Plus calculando ${base} elevado a ${exponent}`}
      screen={
        <>
          {phase >= 1 ? (
            <g style={{ fill: "#1f2937" }} className="font-mono">
              <text x={46} y={124} fontSize={26} fontWeight={700}>{baseDigits}</text>
              {phase === 2 ? (
                <rect x={46 + baseDigits.length * 15 + 2} y={102} width={11} height={11} fill="none" stroke="#1f2937" strokeWidth={1.5} />
              ) : null}
              {phase >= 3 ? (
                <text x={46 + baseDigits.length * 15 + 2} y={110} fontSize={16} fontWeight={700}>{exponent}</text>
              ) : null}
            </g>
          ) : null}
          {phase >= 4 ? (
            <text x={274} y={164} textAnchor="end" fontSize={28} fontWeight={700} className={cn(ENTER, "font-mono duration-500")} style={{ fill: "#111827" }}>
              {result}
            </text>
          ) : null}
        </>
      }
    />
  );
}

function KeyChip({ id, base, exponent }: { id: string; base: number; exponent: number }) {
  if (id === "pow") {
    return (
      <span aria-label="tecla de potencia">
        x<sup className="text-[0.6em]">□</sup>
      </span>
    );
  }
  if (id === "eq") {
    return <>=</>;
  }
  return <>{id === String(base) ? base : exponent}</>;
}

export function CalculadoraPotenciasScene({ base: a, exponent: n, onReadyChange }: SceneProps) {
  const { phase } = usePotenciasPhases({ stepCount: 5, onReadyChange, intervalMs: 1900 });
  const result = a ** n;
  const sequence = [String(a), "pow", String(n), "eq"];

  const captions = [
    "En la calculadora científica hay una tecla especial para las potencias.",
    "Primero, la base.",
    "Después, la tecla de potencia.",
    "Ahora, el exponente.",
    `Y con «=» aparece el resultado: ${fmt(result)}.`,
  ];

  return (
    <SceneShell caption={captions[phase]!} phase={phase}>
      <div
        className="grid h-full min-h-0 w-full max-w-5xl grid-cols-[auto_1fr] items-center gap-10"
        aria-label="Calcular una potencia con la calculadora"
      >
        <div className="flex h-full min-h-0 items-center justify-center">
          <CasioCalculator base={a} exponent={n} phase={phase} result={result} />
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3 text-3xl text-[color:var(--stage-ink,#e8edf5)]">
            <Tex t={texPow(a, n)} />
            <span className="text-[color:var(--stage-muted,#94a3b8)]">→</span>
            {sequence.map((id, i) => (
              <span
                key={i}
                className={cn(
                  "flex h-12 min-w-12 items-center justify-center rounded-xl border-2 px-3 font-mono text-xl font-bold transition-all duration-300",
                  phase > i + 1 && "border-[#ffd866]/60 text-[#ffd866]",
                  phase === i + 1 && "scale-110 border-[#ffd866] bg-[#ffd866]/20 text-[#ffd866]",
                  phase < i + 1 && "border-[color:var(--stage-border,#334155)] text-[color:var(--stage-muted,#94a3b8)]",
                )}
              >
                <KeyChip id={id} base={a} exponent={n} />
              </span>
            ))}
            {phase >= 4 ? (
              <>
                <span className="text-[color:var(--stage-muted,#94a3b8)]">→</span>
                <span className={cn(ENTER, "zoom-in-75 rounded-xl border-2 border-[#5eead4] bg-[#5eead4]/15 px-4 py-2 font-mono text-2xl font-bold text-[#5eead4] duration-500")}>
                  {result}
                </span>
              </>
            ) : null}
          </div>
          {phase >= 4 ? (
            <p className={cn(ENTER, "text-center text-base duration-700 text-[color:var(--stage-muted,#94a3b8)]")} style={{ animationDelay: "400ms" }}>
              El mismo resultado que multiplicar {n} veces el {a}:{" "}
              <Tex t={`${Array.from({ length: n }, () => a).join(" \\cdot ")} = ${fmtTex(result)}`} />
            </p>
          ) : null}
        </div>
      </div>
    </SceneShell>
  );
}
