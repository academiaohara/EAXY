import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 80;
const W = 640;
const Y0 = 150;
const A = 60;
const LAMBDA = 200;
const wave = (phase: number): string =>
  Array.from({ length: 129 }, (_, k) => {
    const x = (k / 128) * W;
    return `${X0 + x},${Y0 - A * Math.sin((2 * Math.PI * x) / LAMBDA - phase)}`;
  }).join(" ");

/** Onda transversal y longitudinal: amplitud, longitud de onda y movimiento de las partículas. */
export function buildOndas(): AnimBuild {
  return {
    label: "Ondas transversales y longitudinales: amplitud y longitud de onda",
    beatMs: 5600,
    captions: [
      "Una **onda** es una perturbación que se **propaga** y transporta **energía**, no materia. En una cuerda, la sacudida viaja y la cuerda no avanza.",
      "La **amplitud A** es la elongación máxima respecto a la posición de equilibrio.",
      "La **longitud de onda λ** es la distancia entre dos puntos consecutivos en la misma fase (dos crestas seguidas).",
      "En una onda **transversal**, cada punto vibra **perpendicularmente** a la dirección en que avanza la onda (cuerda, luz).",
      "En una **longitudinal** (sonido, muelle) vibra **en la misma dirección**: se forman **compresiones** y **enrarecimientos**.",
    ],
    render: (beat) => {
      const dots = Array.from({ length: 33 }, (_, k) => {
        const x = 80 + k * 20;
        const dens = Math.sin((2 * Math.PI * (k * 20)) / LAMBDA);
        return x + 6 * dens;
      });
      return (
        <Canvas>
          {beat < 4 ? (
            <g>
              <line x1={X0} y1={Y0} x2={X0 + W} y2={Y0} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="6 6" />
              <polyline points={wave(beat >= 3 ? 0.9 : 0.3)} fill="none" stroke={MANIM.blue} strokeWidth={5} />
              <Fade show={beat >= 1}>
                <line x1={X0 + LAMBDA / 4} y1={Y0} x2={X0 + LAMBDA / 4} y2={Y0 - A} stroke={MANIM.orange} strokeWidth={4} />
                <Txt x={X0 + LAMBDA / 4 + 28} y={Y0 - A / 2} size={22} color={MANIM.orange}>A</Txt>
              </Fade>
              <Fade show={beat >= 2}>
                <line x1={X0 + LAMBDA / 4} y1={Y0 + 110} x2={X0 + LAMBDA / 4 + LAMBDA} y2={Y0 + 110} stroke={MANIM.green} strokeWidth={4} />
                <Txt x={X0 + LAMBDA / 4 + LAMBDA / 2} y={Y0 + 142} size={22} color={MANIM.green}>λ</Txt>
              </Fade>
              <Fade show={beat >= 3}>
                <circle cx={X0 + 300} cy={Y0 - A * Math.sin((2 * Math.PI * 300) / LAMBDA - 0.9)} r={11} fill={MANIM.yellow} />
                <line x1={X0 + 300} y1={Y0 - 40} x2={X0 + 300} y2={Y0 + 40} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="4 5" />
                <line x1={X0 + 420} y1={Y0 + 90} x2={X0 + 560} y2={Y0 + 90} stroke={MANIM.ink} strokeWidth={3} />
                <Txt x={X0 + 560} y={Y0 + 78} size={18} color={MANIM.ink}>propagación →</Txt>
              </Fade>
            </g>
          ) : (
            <g>
              {dots.map((x, k) => <circle key={k} cx={x} cy={Y0} r={9} fill={MANIM.blue} />)}
              <Txt x={X0 + 100} y={Y0 + 60} size={18} color={MANIM.orange}>compresión</Txt>
              <Txt x={X0 + 200} y={Y0 - 50} size={18} color={MANIM.muted}>enrarecimiento</Txt>
              <line x1={X0 + 420} y1={Y0 + 90} x2={X0 + 560} y2={Y0 + 90} stroke={MANIM.ink} strokeWidth={3} />
              <Txt x={X0 + 560} y={Y0 + 78} size={18} color={MANIM.ink}>propagación →</Txt>
            </g>
          )}
        </Canvas>
      );
    },
  };
}
