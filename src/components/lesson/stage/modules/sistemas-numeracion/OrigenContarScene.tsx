"use client";

import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import { GoatGlyph, ShepherdGlyph } from "./numeracion-glyphs";
import {
  AMBER,
  CalloutLayer,
  DrawnStroke,
  ENTER,
  INK,
  MUTED,
  SceneShell,
  StageSvg,
  fadeOpacity,
  useNumeracionPhases,
} from "./numeracion-shared";

const CAPTIONS = [
  "Un pastor lleva sus cabras al prado.",
  "Por cada cabra, hace una muesca en un palo.",
  "Cada muesca es una marca: una cabra, una rayita.",
  "Por la tarde, las cabras vuelven una a una.",
  "Sobra una muesca: falta una cabra.",
];

export function OrigenContarScene({
  config,
  onReadyChange,
}: {
  config: SistemasNumeracionConfig;
  onReadyChange?: (ready: boolean) => void;
}) {
  const goatCount = config.value ?? 7;
  const stepCount = config.phases ?? CAPTIONS.length;
  const { phase, reduced } = useNumeracionPhases({ stepCount, onReadyChange });

  const notches = Array.from({ length: goatCount }, (_, i) => i);
  const morningGoats = phase >= 3 ? goatCount - (phase >= 4 ? 1 : 0) : 0;

  return (
    <SceneShell caption={CAPTIONS[Math.min(phase, CAPTIONS.length - 1)] ?? ""} phase={phase}>
      <StageSvg viewBox="0 0 420 200" testId="numeracion-origen-contar">
        <ShepherdGlyph x={48} y={100} />
        <rect x={300} y={40} width={14} height={120} rx={4} fill="none" stroke={MUTED} strokeWidth={1.5} />
        {notches.map((i) => {
          const showNotch = phase >= 1 || reduced;
          const y = 52 + i * 14;
          return (
            <DrawnStroke
              key={i}
              d={`M294 ${y} L320 ${y}`}
              visible={showNotch && (phase < 3 || i < goatCount)}
              reduced={reduced}
              delayMs={i * 80}
              stroke={phase >= 4 && i === goatCount - 1 ? "#f87171" : INK}
            />
          );
        })}
        {notches.map((i) => {
          const showGoat = phase >= 0 && (phase < 3 ? i <= phase : i < morningGoats);
          const gx = 120 + (i % 4) * 36;
          const gy = 80 + Math.floor(i / 4) * 36;
          const missing = phase >= 4 && i === goatCount - 1;
          return (
            <g
              key={`g-${i}`}
              className={ENTER}
              style={{ opacity: fadeOpacity(showGoat), transition: "opacity 0.45s ease" }}
            >
              <GoatGlyph x={gx} y={gy} missing={missing} />
            </g>
          );
        })}
        {phase >= 3 &&
          notches.slice(0, morningGoats).map((i) => {
            const gx = 120 + (i % 4) * 36;
            const gy = 80 + Math.floor(i / 4) * 36;
            const ny = 52 + i * 14;
            return (
              <line
                key={`link-${i}`}
                x1={gx}
                y1={gy - 8}
                x2={307}
                y2={ny}
                stroke={AMBER}
                strokeWidth={0.8}
                strokeOpacity={0.65}
              />
            );
          })}
        <CalloutLayer callouts={config.callouts} phase={phase} anchor={{ x: 210, y: 100 }} />
      </StageSvg>
    </SceneShell>
  );
}
