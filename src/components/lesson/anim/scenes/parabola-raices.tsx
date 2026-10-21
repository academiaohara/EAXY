import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const AREA: PlotArea = { left: 150, bottom: 385, ux: 50, uy: 30, xMin: -5, yMin: -5 };
const X_MAX = 5;
const Y_MAX = 6;

/** Parábola y = ax² + bx + c: las soluciones de ax² + bx + c = 0 son los cortes con el eje X; el signo de D decide cuántos hay. */
export function buildParabolaRaices(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = params.a ?? 1;
  const b = params.b ?? -2;
  const c = params.c ?? -3;
  const d = b * b - 4 * a * c;
  const f = (x: number) => a * x * x + b * x + c;
  const segments: string[][] = [[]];
  for (let x = -X_MAX; x <= X_MAX + 1e-9; x += 0.1) {
    const y = f(x);
    if (y >= AREA.yMin && y <= Y_MAX) segments[segments.length - 1]!.push(`${mapX(AREA, x)},${mapY(AREA, y)}`);
    else if (segments[segments.length - 1]!.length) segments.push([]);
  }
  const roots = d > 0 ? [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)] : d === 0 ? [-b / (2 * a)] : [];
  const eq = `${numTex(a)}x^2 ${b < 0 ? "-" : "+"} ${numTex(Math.abs(b))}x ${c < 0 ? "-" : "+"} ${numTex(Math.abs(c))}`;
  const verdict = d > 0 ? "dos soluciones" : d === 0 ? "una solución doble" : "ninguna solución";

  return {
    label: `Parábola de ${eq}: ${verdict}`,
    captions: [
      `La gráfica de $y = ${eq}$ es una **parábola**. Resolver $${eq} = 0$ es buscar dónde $y = 0$.`,
      roots.length
        ? `Las soluciones son los puntos donde la parábola **corta al eje $X$**: ${roots.map((r) => `$x = ${numTex(Math.round(r * 100) / 100)}$`).join(" y ")}.`
        : `La parábola **no corta** al eje $X$: no hay ningún $x$ que haga $y = 0$.`,
      `El discriminante es $\\Delta = b^2 - 4ac = ${numTex(d)}$: ${d > 0 ? "positivo, **dos soluciones**" : d === 0 ? "cero, **una solución** (doble)" : "negativo, **sin solución**"}.`,
    ],
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={X_MAX} yMax={Y_MAX} xStep={1} yStep={2} xLabel="x" yLabel="y" />
        {segments.filter((s) => s.length > 1).map((s, i) => (
          <polyline key={i} points={s.join(" ")} fill="none" stroke={MANIM.yellow} strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        <Fade show={beat >= 1}>
          {roots.map((r, i) => (
            <g key={i}>
              <circle cx={mapX(AREA, r)} cy={mapY(AREA, 0)} r={9} fill={MANIM.green} stroke={MANIM.surface} strokeWidth={3} />
              <Txt x={mapX(AREA, r)} y={mapY(AREA, 0) - 20} size={22} color={MANIM.green}>{numEs(Math.round(r * 100) / 100)}</Txt>
            </g>
          ))}
          {roots.length === 0 ? <Txt x={620} y={150} size={24} color={MANIM.red} anchor="end">sin cortes con el eje X</Txt> : null}
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={30} y={60} size={26} color={MANIM.orange} anchor="start">{`Δ = ${numEs(d)}`}</Txt>
          <Txt x={30} y={92} size={22} color={MANIM.muted} anchor="start">{verdict}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
