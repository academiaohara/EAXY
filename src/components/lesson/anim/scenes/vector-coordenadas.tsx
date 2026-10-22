import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import { Arrow } from "@/components/lesson/anim/scenes/vec-ui";
import { sqrtTex, vec } from "@/components/lesson/anim/an";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 80, bottom: 385, ux: 52, uy: 40, xMin: -1, yMin: -1 };
const tx = (n: number) => String(n).replace("-", "−");

/** Vector AB: coordenadas = extremo − origen. `nums = [ax, ay, bx, by]` (0 a 10). */
export function buildVectorCoordenadas(params: { nums?: number[] }): AnimBuild {
  const [ax, ay, bx, by] = [params.nums?.[0] ?? 1, params.nums?.[1] ?? 4, params.nums?.[2] ?? 6, params.nums?.[3] ?? 6];
  const v = vec([ax, ay], [bx, by]);
  const X = (x: number) => mapX(AREA, x);
  const Y = (y: number) => mapY(AREA, y);
  const m2 = v[0] * v[0] + v[1] * v[1];

  return {
    label: `Vector AB con A(${ax}, ${ay}) y B(${bx}, ${by}): coordenadas (${v[0]}, ${v[1]})`,
    captions: [
      `Los puntos $A(${ax}, ${ay})$ y $B(${bx}, ${by})$.`,
      `La flecha de $A$ a $B$ es el **vector** $\\overrightarrow{AB}$: origen $A$, extremo $B$.`,
      `Desde $A$ avanzamos $${v[0]}$ en $X$ y ${v[1] >= 0 ? "subimos" : "bajamos"} $${Math.abs(v[1])}$ en $Y$.`,
      `Coordenadas = extremo $-$ origen: $\\overrightarrow{AB} = (${bx} - ${ax},\\ ${by} - ${ay}) = (${v[0]},\\ ${v[1]})$. Su módulo: $|\\overrightarrow{AB}| = \\sqrt{${v[0]}^2 + ${v[1]}^2} = ${sqrtTex(m2)} \\approx ${fmtEs(Math.sqrt(m2), 2)}$.`,
    ],
    beatMs: 4800,
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={10} yMax={8} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat >= 2}>
          <line x1={X(ax)} y1={Y(ay)} x2={X(bx)} y2={Y(ay)} stroke={MANIM.green} strokeWidth={4} strokeDasharray="8 6" />
          <line x1={X(bx)} y1={Y(ay)} x2={X(bx)} y2={Y(by)} stroke={MANIM.orange} strokeWidth={4} strokeDasharray="8 6" />
          <Txt x={(X(ax) + X(bx)) / 2} y={Y(ay) + 28} size={22} color={MANIM.green}>{tx(v[0]) ? `${v[0] >= 0 ? "+" : ""}${tx(v[0])}` : ""}</Txt>
          <Txt x={X(bx) + 18} y={(Y(ay) + Y(by)) / 2 + 6} size={22} color={MANIM.orange} anchor="start">{`${v[1] >= 0 ? "+" : ""}${tx(v[1])}`}</Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <Arrow x1={X(ax)} y1={Y(ay)} x2={X(bx)} y2={Y(by)} color={MANIM.blue} width={6} />
        </Fade>
        <circle cx={X(ax)} cy={Y(ay)} r={8} fill={MANIM.yellow} />
        <circle cx={X(bx)} cy={Y(by)} r={8} fill={MANIM.yellow} />
        <Txt x={X(ax) - 12} y={Y(ay) + 6} size={22} color={MANIM.yellow} anchor="end">{`A(${ax}, ${ay})`}</Txt>
        <Txt x={X(bx) + 12} y={Y(by) - 10} size={22} color={MANIM.yellow} anchor="start">{`B(${bx}, ${by})`}</Txt>
        <Fade show={beat >= 3}>
          <Txt x={700} y={70} size={28} color={MANIM.blue}>{`AB = (${tx(v[0])}, ${tx(v[1])})`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
