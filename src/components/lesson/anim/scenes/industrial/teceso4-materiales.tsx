import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Ensayo de tracción ───────────── */

const CURVA: [number, number][] = [
  [0, 0], [30, 90], [60, 180], [90, 200], [100, 190], [130, 195], [180, 215], [240, 240], [300, 248], [330, 225], [350, 170],
];
const OX = 440;
const OY = 380;
const pt = ([x, y]: [number, number]) => `${OX + x},${OY - y}`;

export function buildEnsayoTraccion(): AnimBuild {
  const tramo = (hasta: number) => CURVA.slice(0, hasta + 1).map(pt).join(" ");
  const partes = [2, 3, 7, 9, 10];
  return {
    label: "Ensayo de tracción: zona elástica, límite elástico, zona plástica, estricción y rotura",
    beatMs: 5600,
    captions: [
      "Una **probeta** normalizada se estira en una máquina universal mientras se mide la **fuerza** y el **alargamiento**; se dibuja la **curva tensión-deformación**.",
      "**Zona elástica**: la tensión es proporcional a la deformación (ley de Hooke, σ = E·ε) y, al soltar, la probeta **recupera su forma**.",
      "**Límite elástico**: a partir de aquí empieza la **deformación permanente**: aunque se suelte, la probeta queda más larga.",
      "**Zona plástica y resistencia máxima**: el material se deforma mucho y la tensión sube hasta su máximo (**resistencia a tracción**).",
      "**Estricción y rotura**: la probeta se estrecha en un punto y se rompe. Cuanto más alargamiento, más **dúctil** es el material.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={OX} y1={OY} x2={OX + 370} y2={OY} stroke={MANIM.muted} strokeWidth={3} />
        <line x1={OX} y1={OY} x2={OX} y2={OY - 280} stroke={MANIM.muted} strokeWidth={3} />
        <Txt x={OX + 340} y={OY + 25} size={18} color={MANIM.muted}>
          deformación ε
        </Txt>
        <Txt x={OX - 20} y={OY - 295} size={18} color={MANIM.muted}>
          tensión σ
        </Txt>
        <polyline points={tramo(partes[beat]!)} fill="none" stroke={beat === 1 ? MANIM.green : beat === 2 ? MANIM.yellow : beat === 4 ? MANIM.red : MANIM.orange} strokeWidth={6} />
        <Fade show={beat === 2}>
          <circle cx={OX + 90} cy={OY - 200} r={9} fill={MANIM.yellow} />
          <Txt x={OX + 190} y={OY - 215} size={20} color={MANIM.yellow}>
            límite elástico
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <circle cx={OX + 300} cy={OY - 248} r={9} fill={MANIM.orange} />
          <Txt x={OX + 330} y={OY - 275} size={20} color={MANIM.orange}>
            resistencia máxima
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={OX + 330} y={OY - 150} size={22} color={MANIM.red}>
            rotura
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={OX + 40} y={OY - 150} size={20} color={MANIM.green}>
            recta: σ = E·ε
          </Txt>
        </Fade>
        <rect x={50} y={150} width={36} height={20} fill={MANIM.muted} />
        <rect x={50} y={370} width={36} height={20} fill={MANIM.muted} />
        <rect x={beat === 4 ? 56 : 58} y={170} width={beat >= 3 ? 20 : 24} height={beat === 4 ? 70 : 200 + (beat >= 1 ? 6 : 0) + (beat >= 3 ? 10 : 0)} fill={MANIM.blue} fillOpacity={0.55} stroke={MANIM.blue} strokeWidth={3} />
        <Fade show={beat === 4}>
          <rect x={56} y={310} width={20} height={60} fill={MANIM.blue} fillOpacity={0.55} stroke={MANIM.blue} strokeWidth={3} />
        </Fade>
        <Arrow x1={68} y1={145} x2={68} y2={100} color={MANIM.red} width={5} />
        <Txt x={100} y={100} size={18} color={MANIM.red}>
          F
        </Txt>
      </Canvas>
    ),
  };
}
