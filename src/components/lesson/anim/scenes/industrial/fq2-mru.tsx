import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Seg } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 120;
const DX = 150;
const Y = 250;
const coche = (x: number, color: string, op = 1) => (
  <g opacity={op}>
    <rect x={x - 34} y={Y - 44} width={68} height={26} rx={6} fill={color} />
    <rect x={x - 18} y={Y - 62} width={36} height={22} rx={5} fill={color} />
    <circle cx={x - 18} cy={Y - 18} r={9} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={2.5} />
    <circle cx={x + 18} cy={Y - 18} r={9} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={2.5} />
  </g>
);

export function buildMruEstroboscopica(): AnimBuild {
  return {
    label: "Movimiento rectilíneo uniforme: espacios iguales en tiempos iguales",
    beatMs: 5400,
    captions: [
      "Un coche va por una **carretera recta** a **velocidad constante**. En **t = 0 s** está en el origen.",
      "Al cabo de **1 s** ha recorrido **10 m**.",
      "Al cabo de **2 s** está a **20 m**: ha avanzado otros 10 m.",
      "Al cabo de **3 s** está a **30 m**: otros 10 m.",
      "Cada segundo recorre **la misma distancia**: 10 m. Eso es un **movimiento rectilíneo uniforme**.",
      "La **velocidad** es **constante**: **v = d / t = 10 m / 1 s = 10 m/s**, igual para cualquier intervalo. Y la posición es **x = 10 · t**.",
    ],
    render: (beat) => (
      <Canvas>
        <Seg a={[40, Y]} b={[760, Y]} color={MANIM.ink} width={4} />
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <Seg a={[X0 + k * DX, Y]} b={[X0 + k * DX, Y + 14]} color={MANIM.ink} width={3} />
            <Txt x={X0 + k * DX} y={Y + 42} size={20} color={MANIM.muted}>{`${k * 10} m`}</Txt>
          </g>
        ))}
        {coche(X0 + Math.min(beat, 3) * DX, MANIM.orange)}
        {[0, 1, 2].map((k) => (
          <Fade key={k} show={beat > k}>
            {coche(X0 + k * DX, MANIM.orange, 0.22)}
          </Fade>
        ))}
        {[0, 1, 2, 3].map((k) => (
          <Fade key={k} show={beat >= k}>
            <Txt x={X0 + k * DX} y={Y - 100} size={20} color={MANIM.yellow}>{`t = ${k} s`}</Txt>
          </Fade>
        ))}
        <Fade show={beat >= 4}>
          {[0, 1, 2].map((k) => (
            <g key={k}>
              <path d={`M ${X0 + k * DX + 6} ${Y + 80} L ${X0 + (k + 1) * DX - 6} ${Y + 80}`} stroke={MANIM.green} strokeWidth={4} />
              <Txt x={X0 + (k + 0.5) * DX} y={Y + 108} size={20} color={MANIM.green}>10 m</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 5}>
          <rect x={150} y={26} width={500} height={44} rx={10} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.blue} strokeWidth={2} />
          <Txt x={400} y={57} size={22} color={MANIM.blue}>v = 10 m/s constante · x = 10·t</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
