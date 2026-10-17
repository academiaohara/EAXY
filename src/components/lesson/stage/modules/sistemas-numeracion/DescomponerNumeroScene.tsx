"use client";

import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import { positionalBreakdown } from "@/lib/lesson/stage/numeracion";
import {
  AMBER,
  CalloutLayer,
  ENTER,
  MUTED,
  SceneShell,
  StageSvg,
  VIOLET,
  fmt,
  useNumeracionPhases,
} from "./numeracion-shared";

const CAPTIONS = [
  "Colocamos cada cifra en su columna de órdenes.",
  "Cada cifra «cae» a su fila de descomposición.",
  "Añadimos los ceros que faltan según el orden.",
  "Sumamos: el total recupera el número original.",
];

const LABELS = ["DM", "UM", "C", "D", "U"];

export function DescomponerNumeroScene({
  config,
  onReadyChange,
}: {
  config: SistemasNumeracionConfig;
  onReadyChange?: (ready: boolean) => void;
}) {
  const n = config.value ?? 35318;
  const digits = String(n).split("");
  const parts = positionalBreakdown(n);
  const stepCount = config.phases ?? CAPTIONS.length;
  const { phase, reduced } = useNumeracionPhases({ stepCount, onReadyChange });

  const colStart = 120;
  const colW = 52;

  return (
    <SceneShell caption={CAPTIONS[Math.min(phase, CAPTIONS.length - 1)] ?? ""} phase={phase}>
      <StageSvg viewBox="0 0 420 220" testId="numeracion-descomponer">
        <text x={210} y={36} textAnchor="middle" fill={MUTED} fontSize={14}>
          {fmt(n)}
        </text>
        {digits.map((d, i) => (
          <g key={i}>
            <text
              x={colStart + i * colW}
              y={70}
              textAnchor="middle"
              fill={VIOLET}
              fontSize={22}
              style={{
                transform: phase >= 1 ? `translateY(${(phase >= 1 ? 40 : 0) + i * 4}px)` : undefined,
                transition: reduced ? undefined : "transform 0.6s ease",
              }}
            >
              {d}
            </text>
            <text x={colStart + i * colW - 20} y={58} fill={MUTED} fontSize={9}>
              {LABELS[LABELS.length - digits.length + i]}
            </text>
          </g>
        ))}
        {(phase >= 2 || reduced) &&
          parts.map((p, i) => (
            <text
              key={p}
              x={colStart + i * colW}
              y={130}
              textAnchor="middle"
              fill={AMBER}
              fontSize={13}
              className={ENTER}
            >
              {fmt(p)}
            </text>
          ))}
        {(phase >= 3 || reduced) && (
          <text x={210} y={190} textAnchor="middle" fill={AMBER} fontSize={13} className={ENTER}>
            {parts.map((p) => fmt(p)).join(" + ")} = {fmt(n)}
          </text>
        )}
        <CalloutLayer callouts={config.callouts} phase={phase} anchor={{ x: 340, y: 100 }} />
      </StageSvg>
    </SceneShell>
  );
}
