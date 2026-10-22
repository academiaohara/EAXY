import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import { fracTex, fracValue } from "@/components/lesson/anim/eq";
import { vertex } from "@/components/lesson/anim/fam";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 90, bottom: 380, ux: 36, uy: 19, xMin: -6, yMin: -8 };
const XMAX = 12;
const YMAX = 10;

/** Parábola `y = ax² + bx + c`: vértice en x = −b/2a, tabla simétrica y curva. `a`, `b`, `c` en `params`. */
export function buildParabolaVertice(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = params.a || 1;
  const b = params.b ?? -6;
  const c = params.c ?? 6;
  const f = (x: number) => a * x * x + b * x + c;
  const v = vertex(a, b, c);
  const xv = fracValue(v.x);
  const yv = fracValue(v.y);
  const offs = [-3, -2, -1, 0, 1, 2, 3];
  const pts = offs.map((o) => {
    const x = Math.round(xv) + o;
    return [x, f(x)] as const;
  });
  const path: string[][] = [[]];
  for (let x = -6; x <= XMAX + 1e-9; x += 0.1) {
    const y = f(x);
    if (y >= AREA.yMin && y <= YMAX) path[path.length - 1]!.push(`${mapX(AREA, x)},${mapY(AREA, y)}`);
    else if (path[path.length - 1]!.length) path.push([]);
  }
  const bt = b === 0 ? "" : ` ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`;
  const ct = c === 0 ? "" : ` ${c < 0 ? "−" : "+"} ${Math.abs(c)}`;
  const eq = `y = ${a === 1 ? "" : a === -1 ? "−" : a}x²${bt}${ct}`;
  const inView = (x: number, y: number) => x >= -6 && x <= XMAX && y >= AREA.yMin && y <= YMAX;

  return {
    label: `Parábola ${eq}: vértice (${fmtEs(xv, 2)}, ${fmtEs(yv, 2)})`,
    captions: [
      `La abscisa del vértice es $x = \\dfrac{-b}{2a} = \\dfrac{${-b}}{${2 * a}} = ${fracTex(v.x)}$.`,
      `Su ordenada: $y = f(${fracTex(v.x)}) = ${fracTex(v.y)}$. El vértice es $\\left(${fracTex(v.x)}, ${fracTex(v.y)}\\right)$: ${a > 0 ? "un **mínimo**" : "un **máximo**"}.`,
      `Tabla de valores **a izquierda y derecha** del vértice: se repiten por simetría.`,
      `La curva une los puntos: una **parábola** con las ramas hacia ${a > 0 ? "arriba" : "abajo"}.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={XMAX} yMax={YMAX} xStep={2} yStep={2} xLabel="x" yLabel="y" />
        <Fade show={beat >= 3}>
          {path.filter((s) => s.length > 1).map((s, i) => (
            <polyline key={i} points={s.join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          ))}
        </Fade>
        <Fade show={beat >= 1}>
          <line x1={mapX(AREA, xv)} y1={mapY(AREA, AREA.yMin)} x2={mapX(AREA, xv)} y2={mapY(AREA, YMAX)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="8 6" />
        </Fade>
        <Fade show={beat >= 2}>
          {pts.filter(([x, y]) => inView(x, y)).map(([x, y]) => (
            <circle key={x} cx={mapX(AREA, x)} cy={mapY(AREA, y)} r={7} fill={MANIM.orange} />
          ))}
        </Fade>
        <Fade show={beat >= 1}>
          <circle cx={mapX(AREA, xv)} cy={mapY(AREA, yv)} r={10} fill={MANIM.yellow} stroke={MANIM.surface} strokeWidth={3} />
          <Txt x={mapX(AREA, xv) + 16} y={mapY(AREA, yv) + (a > 0 ? 44 : -18)} size={22} color={MANIM.yellow} anchor="start">{`V(${fmtEs(xv, 2)}, ${fmtEs(yv, 2)})`.replace(/-/g, "−")}</Txt>
        </Fade>
        <Txt x={770} y={50} size={26} color={MANIM.ink} anchor="end">{eq}</Txt>
      </Canvas>
    ),
  };
}
