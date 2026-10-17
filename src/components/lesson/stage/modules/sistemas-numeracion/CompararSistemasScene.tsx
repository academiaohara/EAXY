"use client";

import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import {
  AMBER,
  ENTER,
  INK,
  MUTED,
  SceneShell,
  StageSvg,
  TEAL,
  useNumeracionPhases,
} from "./numeracion-shared";

const DEFAULT_TABLE = {
  headers: ["Egipcio", "Romano", "Decimal"],
  rows: [
    { label: "Tipo", cells: ["Aditivo", "Aditivo (con restas)", "Posicional"] },
    { label: "¿Importa la posición?", cells: ["No", "Un poco", "Sí, mucho"] },
    { label: "¿Usa el 0?", cells: ["No", "No", "Sí"] },
    { label: "Números grandes", cells: ["Muy largo", "Largo", "Corto"] },
  ],
};

const CAPTIONS = [
  "Tres formas de escribir cantidades.",
  "Comparamos cómo funcionan.",
  "Fila a fila: tipo de sistema.",
  "¿Importa dónde pones cada símbolo?",
  "Al final, el decimal destaca para calcular.",
];

export function CompararSistemasScene({
  config,
  onReadyChange,
}: {
  config: SistemasNumeracionConfig;
  onReadyChange?: (ready: boolean) => void;
}) {
  const table = config.table ?? DEFAULT_TABLE;
  const stepCount = config.phases ?? CAPTIONS.length;
  const { phase } = useNumeracionPhases({ stepCount, onReadyChange });

  const visibleRows = Math.min(table.rows.length, Math.max(0, phase - 1));

  return (
    <SceneShell caption={CAPTIONS[Math.min(phase, CAPTIONS.length - 1)] ?? ""} phase={phase}>
      <StageSvg viewBox="0 0 420 200" testId="numeracion-comparar-sistemas">
        <text x={70} y={40} fill={MUTED} fontSize={11} />
        {table.headers.map((h, i) => (
          <text
            key={h}
            x={120 + i * 100}
            y={48}
            textAnchor="middle"
            fill={i === 2 && phase >= stepCount - 1 ? AMBER : TEAL}
            fontSize={12}
            fontWeight={600}
          >
            {h}
          </text>
        ))}
        {table.rows.slice(0, visibleRows).map((row, ri) => (
          <g key={row.label} className={ENTER}>
            <text x={24} y={78 + ri * 32} fill={INK} fontSize={11}>
              {row.label}
            </text>
            {row.cells.map((cell, ci) => (
              <text
                key={cell}
                x={120 + ci * 100}
                y={78 + ri * 32}
                textAnchor="middle"
                fill={ci === 2 && phase >= stepCount - 1 ? AMBER : MUTED}
                fontSize={11}
              >
                {cell}
              </text>
            ))}
          </g>
        ))}
      </StageSvg>
    </SceneShell>
  );
}
