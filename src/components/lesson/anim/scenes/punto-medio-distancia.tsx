import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import { dist2, sqrtTex } from "@/components/lesson/anim/an";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 80, bottom: 385, ux: 50, uy: 40, xMin: -1, yMin: -1 };

/** Punto medio (semisuma) y distancia (Pitágoras con el vector AB). `nums = [x1, y1, x2, y2]` (0 a 11, pares para que M sea entero). */
export function buildPuntoMedioDistancia(params: { nums?: number[] }): AnimBuild {
  const [x1, y1, x2, y2] = [params.nums?.[0] ?? 2, params.nums?.[1] ?? 2, params.nums?.[2] ?? 10, params.nums?.[3] ?? 6];
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const d2 = dist2([x1, y1], [x2, y2]);
  const X = (x: number) => mapX(AREA, x);
  const Y = (y: number) => mapY(AREA, y);
  const f = (n: number) => fmtEs(n, 2);

  return {
    label: `Punto medio M(${f(mx)}, ${f(my)}) y distancia √${d2} entre A(${x1}, ${y1}) y B(${x2}, ${y2})`,
    captions: [
      `Los extremos $A(${x1}, ${y1})$ y $B(${x2}, ${y2})$.`,
      `El **punto medio** tiene por coordenadas la **semisuma**: $M = \\left(\\dfrac{${x1} + ${x2}}{2},\\ \\dfrac{${y1} + ${y2}}{2}\\right) = (${f(mx)},\\ ${f(my)})$.`,
      `Para la **distancia**, formamos un triángulo rectángulo con catetos $|${x2} - ${x1}| = ${Math.abs(x2 - x1)}$ y $|${y2} - ${y1}| = ${Math.abs(y2 - y1)}$.`,
      `Por Pitágoras: $d = \\sqrt{${Math.abs(x2 - x1)}^2 + ${Math.abs(y2 - y1)}^2} = \\sqrt{${d2}} = ${sqrtTex(d2)} \\approx ${f(Math.sqrt(d2))}$.`,
    ],
    beatMs: 4800,
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={11} yMax={8} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat >= 2}>
          <line x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y1)} stroke={MANIM.green} strokeWidth={4} strokeDasharray="8 6" />
          <line x1={X(x2)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke={MANIM.orange} strokeWidth={4} strokeDasharray="8 6" />
          <Txt x={(X(x1) + X(x2)) / 2} y={Y(y1) + 30} size={22} color={MANIM.green}>{String(Math.abs(x2 - x1))}</Txt>
          <Txt x={X(x2) + 16} y={(Y(y1) + Y(y2)) / 2 + 6} size={22} color={MANIM.orange} anchor="start">{String(Math.abs(y2 - y1))}</Txt>
        </Fade>
        <line x1={X(x1)} y1={Y(y1)} x2={X(x2)} y2={Y(y2)} stroke={MANIM.blue} strokeWidth={6} strokeLinecap="round" />
        <circle cx={X(x1)} cy={Y(y1)} r={8} fill={MANIM.yellow} />
        <circle cx={X(x2)} cy={Y(y2)} r={8} fill={MANIM.yellow} />
        <Txt x={X(x1) - 12} y={Y(y1) + 6} size={22} color={MANIM.yellow} anchor="end">{`A(${x1}, ${y1})`}</Txt>
        <Txt x={X(x2) + 12} y={Y(y2) - 12} size={22} color={MANIM.yellow} anchor="start">{`B(${x2}, ${y2})`}</Txt>
        <Fade show={beat >= 1}>
          <circle cx={X(mx)} cy={Y(my)} r={10} fill={MANIM.red} stroke={MANIM.surface} strokeWidth={3} />
          <Txt x={X(mx) - 14} y={Y(my) - 16} size={24} color={MANIM.red} anchor="end">{`M(${f(mx)}, ${f(my)})`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={620} y={378} size={28} color={MANIM.blue}>{`d = ${fmtEs(Math.sqrt(d2), 2)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
