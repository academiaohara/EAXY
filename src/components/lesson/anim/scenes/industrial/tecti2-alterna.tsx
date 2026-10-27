import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Tensión y corriente según la carga ───────────── */

const X0 = 80;
const W = 640;
const Y0 = 215;

function onda(fase: number, amp: number) {
  const pts: string[] = [];
  for (let k = 0; k <= 200; k++) {
    const t = (k / 200) * 2 * 2 * Math.PI;
    pts.push(`${X0 + (k / 200) * W},${Y0 - amp * Math.sin(t - fase)}`);
  }
  return pts.join(" ");
}

export function buildFaseCarga(): AnimBuild {
  const caso = [
    { fase: 0, texto: "resistencia: corriente y tensión en fase (φ = 0°)", color: MANIM.green },
    { fase: Math.PI / 2, texto: "bobina: la corriente se retrasa 90° (φ = +90°)", color: MANIM.orange },
    { fase: -Math.PI / 2, texto: "condensador: la corriente se adelanta 90° (φ = −90°)", color: MANIM.purple },
    { fase: Math.PI / 4, texto: "carga real inductiva (motor): se retrasa entre 0° y 90°", color: MANIM.red },
  ];
  return {
    label: "Desfase entre tensión y corriente en una resistencia, una bobina y un condensador",
    beatMs: 5400,
    captions: [
      "En una **resistencia**, la corriente sigue a la tensión sin retraso: están **en fase** y toda la potencia es activa.",
      "En una **bobina**, la corriente **se retrasa** un cuarto de periodo (90°) respecto a la tensión: la bobina almacena energía en su campo magnético.",
      "En un **condensador**, la corriente **se adelanta** 90°: la corriente fluye primero para cargar las placas.",
      "Una carga real (un **motor**) es resistiva e inductiva: el desfase está entre 0° y 90°. El coseno de ese ángulo es el **factor de potencia**.",
    ],
    render: (beat) => {
      const c = caso[beat]!;
      return (
        <Canvas>
          <line x1={X0} y1={Y0} x2={X0 + W} y2={Y0} stroke={MANIM.muted} strokeWidth={2} />
          <polyline points={onda(0, 130)} fill="none" stroke={MANIM.blue} strokeWidth={5} />
          <polyline points={onda(c.fase, 95)} fill="none" stroke={c.color} strokeWidth={5} className="anim-t" />
          <Txt x={150} y={60} size={20} color={MANIM.blue}>
            tensión
          </Txt>
          <Txt x={290} y={60} size={20} color={c.color}>
            corriente
          </Txt>
          <Fade show>
            <Txt x={400} y={385} size={22} color={c.color}>
              {c.texto}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
