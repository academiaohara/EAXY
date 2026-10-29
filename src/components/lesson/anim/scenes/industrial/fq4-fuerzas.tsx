import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const BX = 300;
const BY = 215;

function Flecha({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = (d: number) => x2 - 16 * Math.cos(a) + d * 8 * Math.cos(a + Math.PI / 2);
  const hy = (d: number) => y2 - 16 * Math.sin(a) + d * 8 * Math.sin(a + Math.PI / 2);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={5} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${hx(1)},${hy(1)} ${hx(-1)},${hy(-1)}`} fill={color} />
    </g>
  );
}

/** Diagrama de fuerzas de un bloque en un suelo con rozamiento: peso, normal, fuerza aplicada, rozamiento y resultante. */
export function buildDiagramaFuerzas(): AnimBuild {
  return {
    label: "Diagrama de fuerzas de un bloque que se empuja sobre el suelo",
    beatMs: 5400,
    captions: [
      "Un bloque sobre el suelo. Para estudiarlo se aísla y se dibujan **todas las fuerzas que actúan sobre él**.",
      "El **peso P = m·g** tira hacia abajo, hacia el centro de la Tierra.",
      "El suelo empuja hacia arriba con la **normal N**. En vertical se equilibran: **N = P**.",
      "Se aplica una **fuerza F** hacia la derecha; el suelo responde con **rozamiento Fr**, hacia la izquierda.",
      "La **resultante** es **ΣF = F − Fr**. Y por la **2.ª ley**, **a = ΣF/m**.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={120} y1={BY + 50} x2={680} y2={BY + 50} stroke={MANIM.muted} strokeWidth={3} />
        <rect x={BX - 50} y={BY - 50} width={100} height={100} rx={6} fill={MANIM.blue} fillOpacity={0.75} stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={BX} y={BY + 8} size={22} color={MANIM.ink}>m</Txt>
        <Fade show={beat >= 1}>
          <Flecha x1={BX} y1={BY + 50} x2={BX} y2={BY + 140} color={MANIM.red} />
          <Txt x={BX + 26} y={BY + 130} size={22} color={MANIM.red}>P</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Flecha x1={BX} y1={BY - 50} x2={BX} y2={BY - 140} color={MANIM.green} />
          <Txt x={BX + 26} y={BY - 125} size={22} color={MANIM.green}>N</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Flecha x1={BX + 50} y1={BY - 10} x2={BX + 190} y2={BY - 10} color={MANIM.orange} />
          <Txt x={BX + 190} y={BY - 26} size={22} color={MANIM.orange}>F</Txt>
          <Flecha x1={BX - 50} y1={BY + 28} x2={BX - 130} y2={BY + 28} color={MANIM.purple} />
          <Txt x={BX - 90} y={BY + 12} size={22} color={MANIM.purple}>Fr</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={BX + 160} y={BY - 150} size={24} color={MANIM.yellow}>ΣF = F − Fr = m·a</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
