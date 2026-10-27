import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── De la economía lineal a la circular ───────────── */

const ETAPAS = ["extraer", "fabricar", "usar", "residuo"];

export function buildEconomiaCircular(): AnimBuild {
  return {
    label: "Economía lineal frente a economía circular",
    beatMs: 5600,
    captions: [
      "En la **economía lineal** se extrae, se fabrica, se usa y se **tira**: se agotan recursos y se acumulan residuos.",
      "En la **economía circular** el primer paso es **reducir**: diseñar para usar menos materia y energía.",
      "Se **reutiliza** y se **repara** para alargar la vida útil: el producto vuelve al uso en vez de ir a la basura.",
      "Lo que ya no se puede reparar se **recicla**: los materiales vuelven a la fabricación y se reduce la extracción.",
    ],
    render: (beat) => (
      <Canvas>
        {ETAPAS.map((e, i) => (
          <g key={e}>
            <rect x={30 + i * 190} y={150} width={150} height={70} rx={10} fill={i === 3 ? MANIM.red : MANIM.blue} fillOpacity={0.3} stroke={i === 3 ? MANIM.red : MANIM.blue} strokeWidth={3} />
            <Txt x={105 + i * 190} y={185} size={22} color={MANIM.ink}>
              {e}
            </Txt>
            {i < 3 ? <path d={`M ${184 + i * 190} 185 L ${222 + i * 190} 185`} stroke={MANIM.muted} strokeWidth={4} /> : null}
          </g>
        ))}
        <Fade show={beat === 0}>
          <Txt x={400} y={90} size={26} color={MANIM.red}>
            tomar → fabricar → usar → tirar
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <rect x={220} y={145} width={160} height={80} rx={12} fill="none" stroke={MANIM.green} strokeWidth={5} />
          <Txt x={300} y={110} size={22} color={MANIM.green}>
            reducir
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <path d="M 495 150 C 495 90 355 90 355 150" fill="none" stroke={MANIM.green} strokeWidth={5} />
          <Txt x={425} y={75} size={22} color={MANIM.green}>
            reutilizar y reparar
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <path d="M 645 225 C 645 330 105 330 105 225" fill="none" stroke={MANIM.green} strokeWidth={5} strokeDasharray="8 6" />
          <Txt x={375} y={360} size={22} color={MANIM.green}>
            reciclar: los materiales vuelven a la fabricación
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
