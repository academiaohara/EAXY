import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 400;
const CY = 190;
const arrow = (x1: number, x2: number, y: number, color: string) => {
  const d = x2 > x1 ? 1 : -1;
  return (
    <g>
      <path d={`M ${x1} ${y} L ${x2} ${y}`} stroke={color} strokeWidth={8} />
      <path d={`M ${x2 - d * 22} ${y - 16} L ${x2} ${y} L ${x2 - d * 22} ${y + 16}`} fill="none" stroke={color} strokeWidth={8} />
    </g>
  );
};

type Caso = { dcha: number[]; izq: number[]; titulo: string };
const CASOS: Caso[] = [
  { dcha: [], izq: [], titulo: "Sin fuerzas" },
  { dcha: [30], izq: [], titulo: "Una fuerza de 30 N" },
  { dcha: [30, 30], izq: [], titulo: "Dos fuerzas en el mismo sentido: 30 N + 30 N" },
  { dcha: [50], izq: [20], titulo: "Sentidos opuestos: 50 N y 20 N" },
  { dcha: [40], izq: [40], titulo: "Sentidos opuestos e iguales: 40 N y 40 N" },
];

export function buildFuerzasResultante(): AnimBuild {
  return {
    label: "Resultante de fuerzas en la misma recta y equilibrio",
    beatMs: 5400,
    captions: [
      "Un bloque **sin fuerzas** sobre una superficie sin rozamiento: si está parado, **sigue parado**.",
      "Se aplica **una fuerza** de 30 N hacia la derecha: la **resultante** es 30 N y el bloque **se mueve** hacia la derecha.",
      "Dos fuerzas de **igual sentido** se **suman**: 30 N + 30 N = **60 N** hacia la derecha.",
      "Dos fuerzas de **sentidos opuestos** se **restan**: 50 N − 20 N = **30 N** en el sentido de la mayor.",
      "Dos fuerzas **iguales y opuestas** (40 N y 40 N): la resultante es **0**. Hay **equilibrio**: el bloque no cambia su movimiento.",
    ],
    render: (beat) => {
      const c = CASOS[Math.min(beat, CASOS.length - 1)]!;
      const sumD = c.dcha.reduce((a, b) => a + b, 0);
      const sumI = c.izq.reduce((a, b) => a + b, 0);
      const R = sumD - sumI;
      return (
        <Canvas>
          <Txt x={400} y={50} size={26} color={MANIM.yellow}>{c.titulo}</Txt>
          <path d="M 80 255 L 720 255" stroke={MANIM.ink} strokeWidth={4} />
          <rect x={CX - 55} y={CY - 10} width={110} height={65} rx={8} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.ink} strokeWidth={4} />
          {c.dcha.map((f, i) => <g key={`d${i}`}>{arrow(CX + 58, CX + 58 + f * 4, CY + 22 - i * 34 + (c.dcha.length > 1 ? 0 : 0), MANIM.orange)}</g>)}
          {c.izq.map((f, i) => <g key={`i${i}`}>{arrow(CX - 58, CX - 58 - f * 4, CY + 22 - i * 34, MANIM.purple)}</g>)}
          <Fade show={beat >= 1}>
            <Txt x={400} y={320} size={22} color={MANIM.muted}>Resultante</Txt>
            {R === 0 ? (
              <Txt x={400} y={360} size={30} color={MANIM.green}>R = 0 → equilibrio</Txt>
            ) : (
              <g>
                {arrow(400, 400 + R * 4, 350, MANIM.green)}
                <Txt x={400 + R * 2} y={392} size={24} color={MANIM.green}>{`R = ${R} N`}</Txt>
              </g>
            )}
          </Fade>
        </Canvas>
      );
    },
  };
}
