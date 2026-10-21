import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const AREA: PlotArea = { left: 470, bottom: 392, ux: 40, uy: 30, xMin: -2, yMin: -6 };
const XS = [0, 1, 2];

/** Representar y = mx + n: tabla de valores → puntos → recta. */
export function buildRectaTablaPuntos(params: { a?: number; b?: number }): AnimBuild {
  const m = params.a ?? 2;
  const n = params.b ?? -3;
  const ys = XS.map((x) => m * x + n);
  const xMax = 5;
  const yMax = 6;
  const eq = n === 0 ? `y = ${numEs(m)}x` : `y = ${numEs(m)}x ${n < 0 ? "−" : "+"} ${numEs(Math.abs(n))}`;
  const eqTex = n === 0 ? `y = ${numTex(m)}x` : `y = ${numTex(m)}x ${n < 0 ? "-" : "+"} ${numTex(Math.abs(n))}`;
  const inside = (y: number) => y >= AREA.yMin && y <= yMax;
  const xa = AREA.xMin;
  const xb = xMax;
  // Recorta la recta a la ventana (m puede ser 0).
  const pts = [xa, xb]
    .map((x) => [x, m * x + n] as const)
    .filter(([, y]) => inside(y));
  const edge = (y: number) => (m === 0 ? null : (y - n) / m);
  const clipped = [...pts];
  for (const y of [AREA.yMin, yMax]) {
    const x = edge(y);
    if (x !== null && x >= xa && x <= xb) clipped.push([x, y] as const);
  }
  clipped.sort((p, q) => p[0] - q[0]);
  const [p1, p2] = [clipped[0], clipped[clipped.length - 1]];
  const rowY = (i: number) => 150 + i * 56;

  return {
    label: `Representar ${eq} con una tabla de valores`,
    captions: [
      `Para ${eqTex.replace("y = ", "$y = ")}$ damos valores a $x$: con **dos o tres** basta.`,
      `Calculamos $y$ en cada caso: $(${XS.map((x, i) => `${x},\\ ${numTex(ys[i])}`).join("),\\ (")})$.`,
      `Cada pareja es un punto del plano.`,
      `Están alineados: los unimos con una **recta** (es una función lineal) que sigue más allá de los puntos.`,
    ],
    render: (beat) => (
      <Canvas>
        <g>
          <rect x={40} y={80} width={360} height={56} rx={8} fill={MANIM.panel} stroke={MANIM.grid} strokeWidth={2} />
          <Txt x={110} y={116} size={28} color={MANIM.blue}>x</Txt>
          <Txt x={290} y={116} size={28} color={MANIM.orange}>y</Txt>
          {XS.map((x, i) => (
            <Txt key={`x${i}`} x={110} y={rowY(i) + 36} size={28} color={MANIM.blue}>{String(x)}</Txt>
          ))}
          {XS.map((x, i) => (
            <Fade key={`y${i}`} show={beat >= 1} dy={8} delay={i * 120}>
              <Txt x={290} y={rowY(i) + 36} size={28} color={MANIM.orange}>{numEs(ys[i])}</Txt>
            </Fade>
          ))}
        </g>
        <Axes area={AREA} xMax={xMax} yMax={yMax} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat >= 3}>
          <line x1={mapX(AREA, p1[0])} y1={mapY(AREA, p1[1])} x2={mapX(AREA, p2[0])} y2={mapY(AREA, p2[1])} stroke={MANIM.yellow} strokeWidth={5} strokeLinecap="round" />
        </Fade>
        <Fade show={beat >= 2} scale={0.4}>
          {XS.map((x, i) => (
            <circle key={i} cx={mapX(AREA, x)} cy={mapY(AREA, ys[i])} r={8} fill={MANIM.orange} stroke={MANIM.surface} strokeWidth={3} />
          ))}
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={220} y={385} size={34} color={MANIM.yellow}>{eq}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
