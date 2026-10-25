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

/** Teorema de Rolle (`a = 0`) y del valor medio de Lagrange (`a = 1`). */
export function buildRolleLagrange(params: { a?: number }): AnimBuild {
  const lag = params.a === 1;
  const f = lag ? (x: number) => x * x : (x: number) => x * x - 4 * x + 3;
  const [A, B] = lag ? [0, 3] : [1, 3];
  const c = lag ? 1.5 : 2;
  const area: PlotArea = lag ? { left: 90, bottom: 340, ux: 110, uy: 30, xMin: 0, yMin: 0 } : { left: 90, bottom: 300, ux: 110, uy: 70, xMin: 0, yMin: -2 };
  const xs = Array.from({ length: 101 }, (_, i) => (i / 100) * 3.4);
  const pts = xs.map((x) => [x, f(x)] as [number, number]).filter(([, y]) => (lag ? y < 11 : y < 4.5));
  const m = (f(B) - f(A)) / (B - A);
  const fp = (x: number) => (lag ? 2 * x : 2 * x - 4);
  const tangente = (x: number) => f(c) + fp(c) * (x - c);
  const xMax = 3.6;
  return {
    label: lag ? "Teorema del valor medio de Lagrange" : "Teorema de Rolle",
    captions: lag
      ? [
          "$f(x) = x^2$ es continua en $[0, 3]$ y derivable en $(0, 3)$. Los extremos son $A(0, 0)$ y $B(3, 9)$.",
          "La **secante** que los une tiene pendiente $\\dfrac{f(3) - f(0)}{3 - 0} = 3$ (tasa de variación media).",
          "**Lagrange:** existe un punto $c \\in (0, 3)$ donde la tangente es **paralela** a la secante: $f'(c) = 3$, es decir $2c = 3$ y $c = 1{,}5$.",
        ]
      : [
          "$f(x) = x^2 - 4x + 3$ es continua en $[1, 3]$ y derivable en $(1, 3)$, con $f(1) = f(3) = 0$.",
          "**Rolle:** si una función continua y derivable toma el mismo valor en los extremos, hay un punto intermedio con **tangente horizontal**.",
          "Aquí $f'(x) = 2x - 4 = 0$ en $c = 2$, que está en $(1, 3)$ ($f(2) = -1$, el mínimo).",
        ],
    beatMs: 5400,
    render: (beat) => {
      const seg = (x1: number, y1: number, x2: number, y2: number, color: string, w = 3) => (
        <line x1={mapX(area, x1)} y1={mapY(area, y1)} x2={mapX(area, x2)} y2={mapY(area, y2)} stroke={color} strokeWidth={w} strokeLinecap="round" />
      );
      return (
        <Canvas>
          <Axes area={area} xMax={xMax} yMax={lag ? 10 : 4} xStep={0.5} yStep={lag ? 2 : 1} xLabel="x" yLabel="y" />
          <polyline points={polyPoints(area, pts)} fill="none" stroke={MANIM.blue} strokeWidth={4} strokeLinejoin="round" />
          <circle cx={mapX(area, A)} cy={mapY(area, f(A))} r={7} fill={MANIM.yellow} />
          <circle cx={mapX(area, B)} cy={mapY(area, f(B))} r={7} fill={MANIM.yellow} />
          <Fade show={beat >= 1 && lag}>{seg(A, f(A), B, f(B), MANIM.green)}</Fade>
          <Fade show={beat >= 2}>
            {seg(c - 0.9, tangente(c - 0.9), c + 0.9, tangente(c + 0.9), MANIM.red, 3.5)}
            <circle cx={mapX(area, c)} cy={mapY(area, f(c))} r={7} fill={MANIM.red} />
            <Txt x={mapX(area, c)} y={mapY(area, f(c)) + (lag ? -22 : 34)} size={22} color={MANIM.red}>{`c = ${decT(c, 1)}`}</Txt>
          </Fade>
          {lag ? <Fade show={beat >= 1}><Txt x={620} y={90} size={22} color={MANIM.green} anchor="start">{`pendiente = ${decT(m, 0)}`}</Txt></Fade> : null}
        </Canvas>
      );
    },
  };
}
