"use client";

import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import { romanSteps } from "@/lib/lesson/stage/numeracion";
import { RomanLetter } from "./numeracion-glyphs";
import {
  AMBER,
  CalloutLayer,
  ENTER,
  INK,
  MUTED,
  SceneShell,
  StageSvg,
  TEAL,
  fadeOpacity,
  useNumeracionPhases,
} from "./numeracion-shared";

const TABLE = [
  ["I", "1"],
  ["V", "5"],
  ["X", "10"],
  ["L", "50"],
  ["C", "100"],
  ["D", "500"],
  ["M", "1000"],
] as const;

const CAPTIONS = [
  "Letras romanas y su valor.",
  "XVI: de izquierda a derecha, sumamos 10 + 5 + 1.",
  "Truco: si una letra es menor que la siguiente, resta.",
  "IV, IX, XL y XC son restas compactas.",
  "Recorremos XIV paso a paso.",
  "Ahora MCCLXXX: 1000 + 200 + 50 + 30.",
  "Practica con otro numeral si hace falta.",
];

export function RomanoSumaRestaScene({
  config,
  onReadyChange,
}: {
  config: SistemasNumeracionConfig;
  onReadyChange?: (ready: boolean) => void;
}) {
  const single = config.roman;
  const stepCount = config.phases ?? (single ? 3 : CAPTIONS.length);
  const { phase, reduced } = useNumeracionPhases({ stepCount, onReadyChange, intervalMs: 2800 });

  const activeRoman =
    single ??
    (phase <= 1
      ? "XVI"
      : phase <= 3
        ? ["IV", "IX", "XL", "XC"][Math.min(phase - 2, 3)]
        : phase === 4
          ? "XIV"
          : "MCCLXXX");

  const steps = romanSteps(activeRoman);
  const stepIndex = single ? steps.length - 1 : Math.min(steps.length - 1, Math.max(0, phase - 4));

  return (
    <SceneShell
      caption={
        single
          ? `Recorre **${single}** de izquierda a derecha.`
          : CAPTIONS[Math.min(phase, CAPTIONS.length - 1)] ?? ""
      }
      phase={phase}
    >
      <StageSvg viewBox="0 0 420 200" testId="numeracion-romano-suma-resta">
        <g style={{ opacity: fadeOpacity(phase >= 0 && !single, phase > 0) }}>
          {TABLE.map(([letter, val], i) => (
            <g key={letter} transform={`translate(${48 + (i % 4) * 90},${40 + Math.floor(i / 4) * 36})`}>
              <RomanLetter letter={letter} x={0} y={0} />
              <text x={0} y={18} textAnchor="middle" fill={MUTED} fontSize={10}>
                {val}
              </text>
            </g>
          ))}
        </g>
        {(phase >= 1 || single) && (
          <g className={ENTER}>
            {activeRoman.split("").map((ch, i) => (
              <RomanLetter
                key={`${ch}-${i}`}
                letter={ch}
                x={120 + i * 28}
                y={single ? 100 : 120}
                highlight={
                  i === stepIndex ? "cursor" : steps[i]?.action === "resta" ? "resta" : steps[i] ? "suma" : undefined
                }
              />
            ))}
            {steps[stepIndex] ? (
              <text x={120 + activeRoman.length * 28 + 20} y={single ? 100 : 120} fill={AMBER} fontSize={14}>
                = {steps[stepIndex].runningTotal}
              </text>
            ) : null}
          </g>
        )}
        {phase >= 2 && phase <= 3 && !single ? (
          <path
            d="M148 140 Q160 110 172 140"
            fill="none"
            stroke={TEAL}
            strokeWidth={1.2}
            className={ENTER}
          />
        ) : null}
        {!single ? (
          <text x={210} y={188} textAnchor="middle" fill={INK} fontSize={12}>
            {activeRoman}
          </text>
        ) : null}
        <CalloutLayer callouts={config.callouts} phase={phase} anchor={{ x: 320, y: 80 }} />
      </StageSvg>
    </SceneShell>
  );
}
