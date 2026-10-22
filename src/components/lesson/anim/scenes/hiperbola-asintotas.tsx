import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 100, bottom: 390, ux: 50, uy: 30, xMin: -6, yMin: -6 };
const LIM = 6;

/** Hipérbola `y = k/x`: tabla de valores, las dos ramas y las asíntotas (los ejes). `a` = k. */
export function buildHiperbolaAsintotas(params: { a?: number }): AnimBuild {
  const k = params.a || 1;
  const xsPos = [0.25, 0.5, 1, 2, 4, 6].map((x) => x);
  const branch = (sign: 1 | -1) => {
    const segs: string[] = [];
    for (let x = 0.02; x <= LIM; x += 0.02) {
      const X = sign * x;
      const Y = k / X;
      if (Math.abs(Y) <= LIM) segs.push(`${mapX(AREA, X)},${mapY(AREA, Y)}`);
    }
    return segs.join(" ");
  };
  return {
    label: `Hipérbola y = ${k}/x con asíntotas los ejes`,
    captions: [
      `Tabla de $y = \\dfrac{${k}}{x}$ para $x > 0$: cuanto **mayor** es $x$, **menor** es $y$; cuanto **menor** es $x$, **mayor** es $y$.`,
      `Para $x < 0$ pasa lo mismo con signo contrario: otra rama, simétrica respecto al origen.`,
      `No está definida en $x = 0$. Al acercarse $x$ a $0$, $y$ crece sin límite: el **eje $Y$** es una **asíntota**.`,
      `Cuando $x$ es muy grande, $y$ se acerca a $0$: el **eje $X$** es asíntota. La curva es una **hipérbola**.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={LIM} yMax={LIM} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat >= 0}>
          <polyline points={branch(1)} fill="none" stroke={MANIM.blue} strokeWidth={5} strokeLinecap="round" />
          {xsPos.filter((x) => Math.abs(k / x) <= LIM).map((x) => (
            <circle key={x} cx={mapX(AREA, x)} cy={mapY(AREA, k / x)} r={6} fill={MANIM.orange} />
          ))}
        </Fade>
        <Fade show={beat >= 1}>
          <polyline points={branch(-1)} fill="none" stroke={MANIM.green} strokeWidth={5} strokeLinecap="round" />
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={mapX(AREA, 0)} y1={mapY(AREA, -LIM)} x2={mapX(AREA, 0)} y2={mapY(AREA, LIM)} stroke={MANIM.red} strokeWidth={4} strokeDasharray="10 7" />
          <Txt x={mapX(AREA, 0) + 14} y={mapY(AREA, LIM) + 24} size={22} color={MANIM.red} anchor="start">x = 0</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <line x1={mapX(AREA, -LIM)} y1={mapY(AREA, 0)} x2={mapX(AREA, LIM)} y2={mapY(AREA, 0)} stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="10 7" />
          <Txt x={mapX(AREA, LIM) - 10} y={mapY(AREA, 0) - 14} size={22} color={MANIM.yellow} anchor="end">y = 0</Txt>
        </Fade>
        <Txt x={680} y={60} size={28} color={MANIM.ink}>{`y = ${fmtEs(k, 1)}/x`}</Txt>
      </Canvas>
    ),
  };
}
