import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, mapX, mapY, polyPoints, type PlotArea } from "@/components/lesson/anim/graph";

const dec = (x: number, d = 3) => x.toFixed(d).replace(".", "{,}");
const decT = (x: number, d = 3) => x.toFixed(d).replace(".", ",");

/** Teorema de Bolzano: f(x) = x³ − x − 1 cambia de signo en [1, 2]; la bisección acorrala la raíz. */
export function buildBolzanoBiseccion(): AnimBuild {
  const f = (x: number) => x ** 3 - x - 1;
  const area: PlotArea = { left: 80, bottom: 330, ux: 120, uy: 40, xMin: 0, yMin: -2 };
  const pts: [number, number][] = Array.from({ length: 111 }, (_, i) => [i * 0.02, f(i * 0.02)] as [number, number]).filter(([, y]) => y < 6);
  const steps: [number, number][] = [[1, 2], [1, 1.5], [1.25, 1.5], [1.25, 1.375]];
  return {
    label: "Teorema de Bolzano y bisección",
    captions: [
      `$f(x) = x^3 - x - 1$ es continua en $[1, 2]$ y $f(1) = -1 < 0$, $f(2) = 5 > 0$: cambia de signo. **Bolzano** asegura una raíz $c \\in (1, 2)$.`,
      `Para localizarla se parte el intervalo: $f(1{,}5) = ${dec(f(1.5))} > 0$, así que el cambio de signo está en $[1,\\ 1{,}5]$.`,
      `$f(1{,}25) = ${dec(f(1.25))} < 0$: la raíz está en $[1{,}25,\\ 1{,}5]$.`,
      `$f(1{,}375) = ${dec(f(1.375))} > 0$: la raíz está en $[1{,}25,\\ 1{,}375]$. Repitiendo, se obtiene $c \\approx 1{,}3247$.`,
    ],
    beatMs: 5400,
    render: (beat) => {
      const [a, b] = steps[beat]!;
      return (
        <Canvas>
          <Axes area={area} xMax={3.2} yMax={5} xStep={0.5} yStep={1} xLabel="x" yLabel="y" />
          <polyline points={polyPoints(area, pts)} fill="none" stroke={MANIM.blue} strokeWidth={4} strokeLinejoin="round" />
          <rect x={mapX(area, a)} y={mapY(area, 5)} width={mapX(area, b) - mapX(area, a)} height={mapY(area, -2) - mapY(area, 5)} fill={MANIM.yellow} fillOpacity={0.14} />
          <circle cx={mapX(area, a)} cy={mapY(area, f(a))} r={7} fill={f(a) < 0 ? MANIM.red : MANIM.green} />
          <circle cx={mapX(area, b)} cy={mapY(area, f(b))} r={7} fill={f(b) < 0 ? MANIM.red : MANIM.green} />
          <Txt x={mapX(area, a) - 12} y={mapY(area, f(a)) + 26} size={20} color={f(a) < 0 ? MANIM.red : MANIM.green} anchor="end">{`f(${decT(a, a === 1 ? 0 : 3).replace(/,?0+$/, "")}) ${f(a) < 0 ? "< 0" : "> 0"}`}</Txt>
          <Txt x={mapX(area, b) + 12} y={mapY(area, f(b)) - 12} size={20} color={f(b) < 0 ? MANIM.red : MANIM.green} anchor="start">{`f(${decT(b, b === 2 ? 0 : 3).replace(/,?0+$/, "")}) ${f(b) < 0 ? "< 0" : "> 0"}`}</Txt>
          <Fade show={beat === 3}>
            <circle cx={mapX(area, 1.3247)} cy={mapY(area, 0)} r={6} fill={MANIM.yellow} />
          </Fade>
        </Canvas>
      );
    },
  };
}
