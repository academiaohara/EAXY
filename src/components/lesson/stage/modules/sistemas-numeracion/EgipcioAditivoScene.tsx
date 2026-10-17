"use client";

import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import { egyptianBreakdown } from "@/lib/lesson/stage/numeracion";
import {
  EgyptianHundred,
  EgyptianStick,
  EgyptianTen,
  EgyptianThousand,
} from "./numeracion-glyphs";
import {
  AMBER,
  CalloutLayer,
  ENTER,
  INK,
  MUTED,
  SceneShell,
  StageSvg,
  fadeOpacity,
  fmt,
  useNumeracionPhases,
} from "./numeracion-shared";

const CAPTIONS = [
  "Cuatro símbolos egipcios: 1, 10, 100 y 1 000.",
  "Cada símbolo vale un «salto» distinto.",
  "Para escribir un número, repetimos símbolos.",
  "El 1435 se construye símbolo a símbolo.",
  "La suma va creciendo: 1000 → 1400 → 1430 → 1435.",
  "Como pagar con billetes: 1×1000, 4×100, 3×10 y 5×1.",
];

export function EgipcioAditivoScene({
  config,
  onReadyChange,
}: {
  config: SistemasNumeracionConfig;
  onReadyChange?: (ready: boolean) => void;
}) {
  const n = config.value ?? 1435;
  const breakdown = egyptianBreakdown(n);
  const stepCount = config.phases ?? CAPTIONS.length;
  const { phase, reduced } = useNumeracionPhases({ stepCount, onReadyChange });

  const symbols: { kind: "1" | "10" | "100" | "1000"; x: number }[] = [];
  let x = 40;
  for (let i = 0; i < breakdown.thousands; i += 1) {
    symbols.push({ kind: "1000", x });
    x += 36;
  }
  for (let i = 0; i < breakdown.hundreds; i += 1) {
    symbols.push({ kind: "100", x });
    x += 32;
  }
  for (let i = 0; i < breakdown.tens; i += 1) {
    symbols.push({ kind: "10", x });
    x += 28;
  }
  for (let i = 0; i < breakdown.ones; i += 1) {
    symbols.push({ kind: "1", x });
    x += 16;
  }

  const buildPhase = Math.min(phase, 3 + symbols.length);
  const visibleCount = phase < 3 ? 0 : Math.min(symbols.length, buildPhase - 2);

  const sumDisplay = (() => {
    let t = 0;
    for (let i = 0; i < visibleCount; i += 1) {
      const k = symbols[i]?.kind;
      t += k === "1000" ? 1000 : k === "100" ? 100 : k === "10" ? 10 : 1;
    }
    return t;
  })();

  return (
    <SceneShell caption={CAPTIONS[Math.min(phase, CAPTIONS.length - 1)] ?? ""} phase={phase}>
      <StageSvg viewBox="0 0 420 210" testId="numeracion-egipcio-aditivo">
        <g style={{ opacity: fadeOpacity(phase >= 0, phase > 0) }}>
          <EgyptianStick x={60} y={50} />
          <text x={60} y={72} textAnchor="middle" fill={MUTED} fontSize={10}>
            1
          </text>
          <EgyptianTen x={120} y={50} />
          <text x={120} y={72} textAnchor="middle" fill={MUTED} fontSize={10}>
            10
          </text>
          <EgyptianHundred x={180} y={50} />
          <text x={180} y={72} textAnchor="middle" fill={MUTED} fontSize={10}>
            100
          </text>
          <EgyptianThousand x={240} y={50} />
          <text x={240} y={72} textAnchor="middle" fill={MUTED} fontSize={10}>
            1000
          </text>
        </g>
        <g style={{ opacity: fadeOpacity(phase >= 3, phase > 4) }}>
          {symbols.slice(0, visibleCount).map((sym, i) => (
            <g key={i} className={ENTER}>
              {sym.kind === "1000" ? (
                <EgyptianThousand x={sym.x} y={110} />
              ) : sym.kind === "100" ? (
                <EgyptianHundred x={sym.x} y={110} />
              ) : sym.kind === "10" ? (
                <EgyptianTen x={sym.x} y={110} />
              ) : (
                <EgyptianStick x={sym.x} y={110} />
              )}
            </g>
          ))}
          <text x={210} y={150} textAnchor="middle" fill={AMBER} fontSize={15}>
            {sumDisplay > 0 ? fmt(sumDisplay) : "…"}
          </text>
        </g>
        {phase >= 5 ? (
          <g className={ENTER}>
            <rect x={280} y={168} width={48} height={24} rx={3} fill="none" stroke={INK} strokeWidth={1} />
            <text x={304} y={184} textAnchor="middle" fill={MUTED} fontSize={9}>
              1000
            </text>
            {Array.from({ length: 4 }, (_, i) => (
              <rect key={i} x={250 + i * 22} y={168} width={18} height={24} rx={2} fill="none" stroke={INK} strokeWidth={0.8} />
            ))}
          </g>
        ) : null}
        <CalloutLayer callouts={config.callouts} phase={phase} anchor={{ x: 340, y: 110 }} />
      </StageSvg>
    </SceneShell>
  );
}
