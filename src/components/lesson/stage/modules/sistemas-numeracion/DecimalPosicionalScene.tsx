"use client";

import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import {
  AMBER,
  AnimArrow,
  BLUE,
  CalloutLayer,
  ENTER,
  MUTED,
  SceneShell,
  StageSvg,
  TEAL,
  VIOLET,
  fadeOpacity,
  useNumeracionPhases,
} from "./numeracion-shared";

const ORDERS = ["UMill", "CM", "DM", "UM", "C", "D", "U"] as const;

const CAPTIONS = [
  "Diez cifras: del 0 al 9.",
  "Con ellas escribimos cualquier número natural.",
  "En 33, el primer 3 vale 30 y el segundo vale 3.",
  "Cada columna es un **orden** de unidades.",
  "Diez unidades de un orden = una del orden siguiente (×10).",
];

export function DecimalPosicionalScene({
  config,
  onReadyChange,
}: {
  config: SistemasNumeracionConfig;
  onReadyChange?: (ready: boolean) => void;
}) {
  const stepCount = config.phases ?? CAPTIONS.length;
  const { phase, reduced } = useNumeracionPhases({ stepCount, onReadyChange });
  const n = config.value ?? 33;
  const digits = String(n).split("");

  return (
    <SceneShell caption={CAPTIONS[Math.min(phase, CAPTIONS.length - 1)] ?? ""} phase={phase}>
      <StageSvg viewBox="0 0 420 210" testId="numeracion-decimal-posicional">
        <g style={{ opacity: fadeOpacity(phase >= 0, phase > 1) }}>
          {Array.from({ length: 10 }, (_, d) => (
            <text
              key={d}
              x={60 + d * 32}
              y={50}
              textAnchor="middle"
              fill={phase >= 0 && (reduced || d <= phase) ? MUTED : "transparent"}
              fontSize={18}
              className={ENTER}
            >
              {d}
            </text>
          ))}
        </g>
        {(phase >= 2 || reduced) && (
          <g className={ENTER}>
            {digits.map((d, i) => (
              <text
                key={i}
                x={180 + i * 36}
                y={100}
                textAnchor="middle"
                fill={i === 0 ? VIOLET : TEAL}
                fontSize={32}
                fontWeight={600}
              >
                {d}
              </text>
            ))}
            <text x={180} y={130} fill={VIOLET} fontSize={12}>
              {digits[0]}0
            </text>
            <text x={216} y={130} fill={TEAL} fontSize={12}>
              {digits[1]}
            </text>
          </g>
        )}
        {(phase >= 4 || reduced) && (
          <g>
            {ORDERS.slice(3).map((label, i) => (
              <g key={label} transform={`translate(${120 + i * 44},150)`}>
                <text textAnchor="middle" fill={BLUE} fontSize={11}>
                  {label}
                </text>
                {i < 3 ? (
                  <AnimArrow
                    reduced={reduced}
                    coords={[22, 0, 33, -14, 44, 0]}
                    stroke={AMBER}
                    delayMs={i * 120}
                  />
                ) : null}
              </g>
            ))}
            <text x={300} y={142} fill={AMBER} fontSize={10}>
              ×10
            </text>
          </g>
        )}
        <CalloutLayer callouts={config.callouts} phase={phase} anchor={{ x: 330, y: 90 }} />
      </StageSvg>
    </SceneShell>
  );
}
