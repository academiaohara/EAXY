import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Ciclo de ingeniería iterativo ───────────── */

const FASES = ["necesidad", "diseño", "prototipo", "ensayo", "mejora"];
const COL = [MANIM.blue, MANIM.purple, MANIM.orange, MANIM.yellow, MANIM.green];

export function buildCicloIngenieria(): AnimBuild {
  return {
    label: "Ciclo de ingeniería iterativo: necesidad, diseño, prototipo, ensayo y mejora",
    beatMs: 5400,
    captions: [
      "Todo proyecto nace de una **necesidad** o problema real, que se analiza y se convierte en **especificaciones** medibles.",
      "Se **diseña**: se buscan soluciones, se comparan con criterios y se elige una; se hacen croquis, planos y modelos.",
      "Se construye un **prototipo** con los recursos planificados (tiempo, materiales, presupuesto).",
      "Se **ensaya** frente a las especificaciones: se miden resultados y se detectan fallos.",
      "Si algo no cumple, se **mejora** el diseño y se repite el ciclo: la ingeniería es **iterativa** hasta que el producto es válido.",
    ],
    render: (beat) => (
      <Canvas>
        {FASES.map((f, i) => {
          const x = 20 + i * 150;
          const on = i === beat;
          return (
            <g key={f}>
              <rect x={x} y={140} width={130} height={70} rx={10} fill={COL[i]} fillOpacity={on ? 0.6 : i < beat ? 0.25 : 0.08} stroke={COL[i]} strokeWidth={on ? 5 : 2} className="anim-t" />
              <Txt x={x + 65} y={175} size={21} color={MANIM.ink}>
                {f}
              </Txt>
            </g>
          );
        })}
        <Fade show={beat === 4}>
          <path d="M 665 215 C 665 300 85 300 85 215" fill="none" stroke={MANIM.green} strokeWidth={5} strokeDasharray="8 6" />
          <Txt x={375} y={335} size={22} color={MANIM.green}>
            se repite hasta cumplir las especificaciones
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={375} y={260} size={22} color={MANIM.yellow}>
            ¿cumple las especificaciones?
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
