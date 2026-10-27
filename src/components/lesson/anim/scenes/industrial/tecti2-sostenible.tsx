import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Fases de una evaluación de impacto ───────────── */

const FASES = ["identificar", "valorar", "corregir", "vigilar"];
const COL = [MANIM.blue, MANIM.orange, MANIM.green, MANIM.purple];

export function buildFasesEia(): AnimBuild {
  return {
    label: "Evaluación de impacto ambiental: identificar, valorar, corregir y vigilar",
    beatMs: 5400,
    captions: [
      "Se **identifican** las acciones del proyecto (obra, funcionamiento, desmantelamiento) y los factores ambientales a los que afectan: aire, agua, suelo, fauna, paisaje, población.",
      "Se **valora** cada efecto: signo (+ o −), **magnitud**, **importancia**, duración y si es reversible. Se comparan **alternativas**, incluida la de no hacer nada.",
      "Se proponen **medidas**: **preventivas** (evitar), **correctoras** (reducir) y **compensatorias** (restaurar o compensar lo inevitable).",
      "Se aprueba con condiciones y un **plan de vigilancia**: se mide durante la vida del proyecto para comprobar que los impactos son los previstos.",
    ],
    render: (beat) => (
      <Canvas>
        {FASES.map((f, i) => {
          const x = 40 + i * 190;
          const on = i === beat;
          return (
            <g key={f}>
              <rect x={x} y={140} width={150} height={80} rx={10} fill={COL[i]} fillOpacity={on ? 0.6 : i < beat ? 0.25 : 0.08} stroke={COL[i]} strokeWidth={on ? 5 : 2} className="anim-t" />
              <Txt x={x + 75} y={180} size={24} color={MANIM.ink}>
                {f}
              </Txt>
              {i < 3 ? <path d={`M ${x + 154} 180 L ${x + 186} 180`} stroke={i < beat ? MANIM.green : MANIM.muted} strokeWidth={4} /> : null}
            </g>
          );
        })}
        <Fade show={beat === 1}>
          <Txt x={400} y={105} size={21} color={MANIM.orange}>
            valor del impacto = magnitud × importancia
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={400} y={105} size={21} color={MANIM.green}>
            prevenir → corregir → compensar
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <path d="M 705 225 C 705 320 115 320 115 225" fill="none" stroke={MANIM.purple} strokeWidth={5} strokeDasharray="8 6" />
          <Txt x={410} y={350} size={21} color={MANIM.purple}>
            si los impactos superan lo previsto, se corrige de nuevo
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
