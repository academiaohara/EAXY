import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── De la red a la fuente de continua ───────────── */

const X0 = 80;
const W = 640;
const Y0 = 220;

function onda(amp: number, kind: "seno" | "rect" | "filtro") {
  const pts: string[] = [];
  for (let k = 0; k <= 200; k++) {
    const t = (k / 200) * 3 * 2 * Math.PI; // tres periodos
    let v = Math.sin(t);
    if (kind === "rect") v = Math.abs(v);
    if (kind === "filtro") {
      const rect = Math.abs(Math.sin(t));
      const ph = (t % Math.PI) / Math.PI; // 0..1 dentro de cada semionda
      v = ph < 0.25 ? rect : Math.max(0.78, 1 - (ph - 0.25) * 0.35);
      v = Math.max(v, 0.78);
    }
    pts.push(`${X0 + (k / 200) * W},${Y0 - v * amp}`);
  }
  return pts.join(" ");
}

export function buildFuenteAlimentacion(): AnimBuild {
  return {
    label: "Fuente de alimentación: red alterna, transformador, rectificador y filtro",
    beatMs: 5200,
    captions: [
      "La red da una tensión **alterna** senoidal: 230 V eficaces (≈ 325 V de pico) y 50 Hz.",
      "El **transformador** reduce la tensión; la frecuencia no cambia, solo la amplitud.",
      "El **rectificador de puente** (cuatro diodos) deja pasar solo un sentido: la señal es **pulsante** pero ya no cambia de signo.",
      "El **condensador de filtro** se carga en las crestas y suministra corriente entre ellas: queda una tensión casi continua con un pequeño **rizado**.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={X0} y1={Y0} x2={X0 + W} y2={Y0} stroke={MANIM.muted} strokeWidth={2} />
        <Fade show={beat === 0}>
          <polyline points={onda(140, "seno")} fill="none" stroke={MANIM.blue} strokeWidth={5} />
          <Txt x={400} y={60} size={24} color={MANIM.blue}>
            230 V · 50 Hz
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <polyline points={onda(140, "seno")} fill="none" stroke={MANIM.muted} strokeWidth={3} strokeDasharray="8 6" />
          <polyline points={onda(60, "seno")} fill="none" stroke={MANIM.orange} strokeWidth={5} />
          <Txt x={400} y={60} size={24} color={MANIM.orange}>
            tensión reducida
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <polyline points={onda(60, "rect")} fill="none" stroke={MANIM.purple} strokeWidth={5} />
          <Txt x={400} y={60} size={24} color={MANIM.purple}>
            onda rectificada
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <polyline points={onda(60, "rect")} fill="none" stroke={MANIM.muted} strokeWidth={3} strokeDasharray="8 6" />
          <polyline points={onda(60, "filtro")} fill="none" stroke={MANIM.green} strokeWidth={5} />
          <Txt x={400} y={60} size={24} color={MANIM.green}>
            casi continua, con rizado
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
