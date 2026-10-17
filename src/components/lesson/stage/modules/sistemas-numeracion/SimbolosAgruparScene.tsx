"use client";

import type { SistemasNumeracionConfig } from "@/lib/lesson/types";
import { prehistoricBreakdown } from "@/lib/lesson/stage/numeracion";
import { HandGlyph, PersonGlyph, StickGlyph } from "./numeracion-glyphs";
import {
  AMBER,
  CalloutLayer,
  ENTER,
  MUTED,
  SceneShell,
  StageSvg,
  fadeOpacity,
  useNumeracionPhases,
} from "./numeracion-shared";

const CAPTIONS = [
  "Veinte muescas seguidas cansan la vista.",
  "Agrupamos de cinco en cinco: cada grupo es una mano (= 5).",
  "Cuatro manos forman una persona (= 20).",
  "Así leemos cantidades grandes sin contar una a una.",
  "El 47 son 2 personas, 1 mano y 2 palitos: $40 + 5 + 2 = 47$.",
];

export function SimbolosAgruparScene({
  config,
  onReadyChange,
}: {
  config: SistemasNumeracionConfig;
  onReadyChange?: (ready: boolean) => void;
}) {
  const value = config.value ?? 47;
  const { people, hands, sticks } = prehistoricBreakdown(value);
  const stepCount = config.phases ?? CAPTIONS.length;
  const { phase, reduced } = useNumeracionPhases({ stepCount, onReadyChange });

  return (
    <SceneShell caption={CAPTIONS[Math.min(phase, CAPTIONS.length - 1)] ?? ""} phase={phase}>
      <StageSvg viewBox="0 0 420 200" testId="numeracion-simbolos-agrupar">
        <g style={{ opacity: fadeOpacity(phase >= 0, phase > 0) }}>
          {Array.from({ length: 20 }, (_, i) => (
            <StickGlyph key={i} x={40 + (i % 10) * 16} y={40 + Math.floor(i / 10) * 20} scale={0.7} />
          ))}
        </g>
        <g style={{ opacity: fadeOpacity(phase >= 1, phase > 1) }}>
          {Array.from({ length: 4 }, (_, i) => (
            <HandGlyph key={i} x={80 + i * 48} y={90} />
          ))}
        </g>
        <g style={{ opacity: fadeOpacity(phase >= 2, phase > 2) }}>
          <PersonGlyph x={200} y={95} />
        </g>
        <g style={{ opacity: fadeOpacity(phase >= 4, false) }}>
          {Array.from({ length: people }, (_, i) => (
            <PersonGlyph key={`p-${i}`} x={60 + i * 50} y={150} scale={0.85} />
          ))}
          {Array.from({ length: hands }, (_, i) => (
            <HandGlyph key={`h-${i}`} x={60 + people * 50 + i * 36} y={150} scale={0.85} />
          ))}
          {Array.from({ length: sticks }, (_, i) => (
            <StickGlyph key={`s-${i}`} x={60 + people * 50 + hands * 36 + i * 14} y={150} scale={0.7} />
          ))}
          <text x={210} y={188} textAnchor="middle" fill={AMBER} fontSize={14} className={ENTER}>
            {`${people * 20} + ${hands * 5} + ${sticks} = ${value}`}
          </text>
        </g>
        {!reduced && phase === 3 ? (
          <text x={210} y={120} textAnchor="middle" fill={MUTED} fontSize={13} className={ENTER}>
            Agrupar ahorra espacio y errores.
          </text>
        ) : null}
        <CalloutLayer callouts={config.callouts} phase={phase} anchor={{ x: 320, y: 90 }} />
      </StageSvg>
    </SceneShell>
  );
}
