import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, mapX, mapY, polyPoints, type PlotArea } from "@/components/lesson/anim/graph";

const dec = (x: number, d = 3) => x.toFixed(d).replace(".", "{,}");
const decT = (x: number, d = 3) => x.toFixed(d).replace(".", ",");

const curve = (area: PlotArea, f: (x: number) => number, a: number, b: number, n = 80) =>
  polyPoints(area, Array.from({ length: n + 1 }, (_, i) => [a + ((b - a) * i) / n, f(a + ((b - a) * i) / n)] as [number, number]));

/** Primitivas de f(x) = x: la familia F(x) = x²/2 + C son traslaciones verticales con la misma pendiente. */
export function buildPrimitivaFamilia(): AnimBuild {
  const area: PlotArea = { left: 90, bottom: 360, ux: 90, uy: 40, xMin: -2.5, yMin: -2 };
  const F = (C: number) => (x: number) => (x * x) / 2 + C;
  const colores: Record<number, string> = { [-1]: MANIM.purple, 0: MANIM.blue, 1: MANIM.green, 2: MANIM.orange };
  const tang = (C: number) => {
    const x0 = 1;
    const y0 = F(C)(x0);
    return <line key={C} x1={mapX(area, x0 - 0.8)} y1={mapY(area, y0 - 0.8)} x2={mapX(area, x0 + 0.8)} y2={mapY(area, y0 + 0.8)} stroke={MANIM.red} strokeWidth={3} strokeLinecap="round" />;
  };
  return {
    label: "Familia de primitivas",
    captions: [
      "$F(x) = \\dfrac{x^2}{2}$ es una primitiva de $f(x) = x$, porque $F'(x) = x$. Pero no es la única.",
      "Si sumamos cualquier constante, $F(x) + C$ también cumple $(F + C)' = f$: son las curvas **trasladadas en vertical**.",
      "En $x = 1$ todas tienen la misma pendiente, $f(1) = 1$: sus tangentes son paralelas. La integral indefinida es **toda la familia**: $\\int x\\,dx = \\dfrac{x^2}{2} + C$.",
    ],
    beatMs: 5400,
    render: (beat) => (
      <Canvas>
        <Axes area={area} xMax={2.6} yMax={6} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <polyline points={curve(area, F(0), -2.5, 2.5)} fill="none" stroke={colores[0]} strokeWidth={4} />
        <Fade show={beat >= 1}>
          {[-1, 1, 2].map((C) => (
            <g key={C}>
              <polyline points={curve(area, F(C), -2.5, 2.5)} fill="none" stroke={colores[C]} strokeWidth={4} />
              <Txt x={mapX(area, 2.55)} y={mapY(area, F(C)(2.5))} size={20} color={colores[C]} anchor="start">{`C = ${C}`.replace("-", "−")}</Txt>
            </g>
          ))}
          <Txt x={mapX(area, 2.55)} y={mapY(area, F(0)(2.5))} size={20} color={colores[0]} anchor="start">C = 0</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={mapX(area, 1)} y1={mapY(area, -1.5)} x2={mapX(area, 1)} y2={mapY(area, 5)} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="6 6" />
          {[-1, 0, 1, 2].map(tang)}
          <Txt x={mapX(area, 1) + 12} y={mapY(area, -1.2)} size={20} color={MANIM.red} anchor="start">pendiente 1</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Sumas de Riemann inferior y superior de f(x) = x² en [0, 3]: convergen a 9. */
export function buildRiemannSumas(): AnimBuild {
  const area: PlotArea = { left: 90, bottom: 350, ux: 100, uy: 30, xMin: 0, yMin: 0 };
  const f = (x: number) => x * x;
  const ns = [3, 6, 12, 48];
  const suma = (n: number) => {
    const d = 3 / n;
    let lo = 0;
    let up = 0;
    for (let i = 0; i < n; i++) {
      lo += f(i * d) * d;
      up += f((i + 1) * d) * d;
    }
    return { lo, up };
  };
  return {
    label: "Sumas de Riemann",
    captions: ns.map((n) => {
      const s = suma(n);
      return n === 48
        ? `Con $n = 48$: $s = ${dec(s.lo)}$ y $S = ${dec(s.up)}$. Al aumentar $n$ ambas se acercan al mismo valor, $9$: es la **integral** $\\int_0^3 x^2\\,dx$.`
        : `Con $n = ${n}$ rectángulos de base $${{ 3: "1", 6: "0{,}5", 12: "0{,}25" }[n]}$: suma inferior $s = ${dec(s.lo)}$ y suma superior $S = ${dec(s.up)}$. El área real queda entre las dos.`;
    }),
    beatMs: 5400,
    render: (beat) => {
      const n = ns[beat]!;
      const d = 3 / n;
      const rects = Array.from({ length: n }, (_, i) => i);
      return (
        <Canvas>
          <Axes area={area} xMax={3.5} yMax={10} xStep={0.5} yStep={2} xLabel="x" yLabel="y" />
          {rects.map((i) => (
            <rect key={`u${i}`} x={mapX(area, i * d)} y={mapY(area, f((i + 1) * d))} width={d * area.ux} height={f((i + 1) * d) * area.uy} fill={MANIM.red} fillOpacity={0.28} stroke={MANIM.red} strokeWidth={n > 12 ? 0.6 : 1.5} />
          ))}
          {rects.map((i) => (
            <rect key={`l${i}`} x={mapX(area, i * d)} y={mapY(area, f(i * d))} width={d * area.ux} height={f(i * d) * area.uy} fill={MANIM.green} fillOpacity={0.5} stroke={MANIM.green} strokeWidth={n > 12 ? 0.6 : 1.5} />
          ))}
          <polyline points={curve(area, f, 0, 3.2)} fill="none" stroke={MANIM.blue} strokeWidth={4} />
          <Txt x={470} y={110} size={22} color={MANIM.green} anchor="start">{`inferior = ${decT(suma(n).lo)}`}</Txt>
          <Txt x={470} y={146} size={22} color={MANIM.red} anchor="start">{`superior = ${decT(suma(n).up)}`}</Txt>
          <Fade show={beat === 3}>
            <Txt x={470} y={190} size={24} color={MANIM.yellow} anchor="start">área = 9</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/** Teorema fundamental: la derivada de la función área A(x) es la altura f(x). f(t) = t, A(x) = x²/2. */
export function buildTeoremaFundamental(): AnimBuild {
  const area: PlotArea = { left: 90, bottom: 350, ux: 120, uy: 70, xMin: 0, yMin: 0 };
  const f = (t: number) => t;
  const A = (x: number) => (x * x) / 2;
  const x0 = 2;
  const hs = [0, 0.4, 0.1];
  const sliver = (hh: number) => (
    <polygon points={`${mapX(area, x0)},${mapY(area, 0)} ${mapX(area, x0 + hh)},${mapY(area, 0)} ${mapX(area, x0 + hh)},${mapY(area, f(x0 + hh))} ${mapX(area, x0)},${mapY(area, f(x0))}`} fill={MANIM.yellow} fillOpacity={0.55} stroke={MANIM.yellow} strokeWidth={1.5} />
  );
  return {
    label: "Teorema fundamental del cálculo",
    captions: [
      "La **función área** $A(x) = \\int_0^x f(t)\\,dt$ acumula el área bajo $f(t) = t$ desde $0$ hasta $x$. En $x = 2$: $A(2) = 2$.",
      `Avanzamos $h = 0{,}4$: el área crece $A(2{,}4) - A(2) = ${dec(A(2.4) - A(2), 2)}$, un valor entre $f(2)\\cdot h = ${dec(f(2) * 0.4, 2)}$ y $f(2{,}4)\\cdot h = ${dec(f(2.4) * 0.4, 2)}$.`,
      `Con $h = 0{,}1$: $\\dfrac{A(2{,}1) - A(2)}{0{,}1} = ${dec((A(2.1) - A(2)) / 0.1, 2)}$. Cuando $h \\to 0$ el cociente tiende a $f(2) = 2$: **$A'(x) = f(x)$**.`,
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        <Axes area={area} xMax={3.2} yMax={3.5} xStep={0.5} yStep={1} xLabel="t" yLabel="y" />
        <polygon points={`${mapX(area, 0)},${mapY(area, 0)} ${mapX(area, x0)},${mapY(area, 0)} ${mapX(area, x0)},${mapY(area, f(x0))}`} fill={MANIM.blue} fillOpacity={0.35} />
        <line x1={mapX(area, 0)} y1={mapY(area, 0)} x2={mapX(area, 3.2)} y2={mapY(area, 3.2)} stroke={MANIM.blue} strokeWidth={4} />
        <Txt x={mapX(area, 1.2)} y={mapY(area, 0.4)} size={22} color={MANIM.ink}>A(2) = 2</Txt>
        <Fade show={beat >= 1}>{sliver(hs[beat]!)}</Fade>
        <Fade show={beat >= 1}>
          <Txt x={mapX(area, 2.9)} y={mapY(area, 1.2)} size={22} color={MANIM.yellow} anchor="start">{`h = ${decT(hs[beat]!, 1)}`}</Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={mapX(area, 2.9)} y={mapY(area, 0.7)} size={24} color={MANIM.green} anchor="start">A′(x) = f(x)</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Área entre y = 2x e y = x² en [0, 2]: 4/3. */
export function buildAreaEntreCurvas(): AnimBuild {
  const area: PlotArea = { left: 90, bottom: 350, ux: 140, uy: 70, xMin: 0, yMin: 0 };
  const top = (x: number) => 2 * x;
  const bot = (x: number) => x * x;
  const xs = Array.from({ length: 41 }, (_, i) => (i * 2) / 40);
  const region = [...xs.map((x) => [x, top(x)] as [number, number]), ...[...xs].reverse().map((x) => [x, bot(x)] as [number, number])];
  const xm = 1;
  return {
    label: "Área entre dos curvas",
    captions: [
      "Las curvas $y = 2x$ e $y = x^2$ se cortan donde $2x = x^2$: en $x = 0$ y $x = 2$. Entre esos puntos la recta queda por encima de la parábola.",
      "El área encerrada es la de la región entre ambas: se calcula como la integral de la **función de arriba menos la de abajo**.",
      "Una franja vertical de ancho $dx$ en $x = 1$ tiene altura $2x - x^2 = 1$. Sumando todas: $\\int_0^2 (2x - x^2)\\,dx = \\left[x^2 - \\dfrac{x^3}{3}\\right]_0^2 = 4 - \\dfrac83 = \\dfrac43$.",
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        <Axes area={area} xMax={2.6} yMax={4.5} xStep={0.5} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat >= 1}>
          <polygon points={polyPoints(area, region)} fill={MANIM.yellow} fillOpacity={0.3} />
        </Fade>
        <polyline points={curve(area, top, 0, 2.2)} fill="none" stroke={MANIM.green} strokeWidth={4} />
        <polyline points={curve(area, bot, 0, 2.1)} fill="none" stroke={MANIM.blue} strokeWidth={4} />
        <circle cx={mapX(area, 0)} cy={mapY(area, 0)} r={6} fill={MANIM.red} />
        <circle cx={mapX(area, 2)} cy={mapY(area, 4)} r={6} fill={MANIM.red} />
        <Txt x={mapX(area, 2.25)} y={mapY(area, 4.4)} size={22} color={MANIM.green} anchor="start">y = 2x</Txt>
        <Txt x={mapX(area, 2.15)} y={mapY(area, 4.5) + 40} size={22} color={MANIM.blue} anchor="start">y = x²</Txt>
        <Fade show={beat === 2}>
          <rect x={mapX(area, xm) - 4} y={mapY(area, top(xm))} width={8} height={(top(xm) - bot(xm)) * area.uy} fill={MANIM.red} />
          <Txt x={mapX(area, xm) + 16} y={mapY(area, 1.5)} size={22} color={MANIM.red} anchor="start">2x − x²</Txt>
          <Txt x={mapX(area, 1.25)} y={mapY(area, 0.55)} size={24} color={MANIM.yellow}>área = 4/3</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Sólido de revolución: y = √x en [0, 4] gira alrededor del eje X, V = π ∫ x dx = 8π. */
export function buildSolidoRevolucion(): AnimBuild {
  const area: PlotArea = { left: 80, bottom: 210, ux: 110, uy: 70, xMin: 0, yMin: 0 };
  const f = (x: number) => Math.sqrt(x);
  const mirror = (x: number) => -Math.sqrt(x);
  const discos = [1, 2, 3, 4];
  return {
    label: "Volumen de un sólido de revolución",
    captions: [
      "La región bajo $y = \\sqrt{x}$ entre $x = 0$ y $x = 4$ se hace **girar** alrededor del eje $X$.",
      "Se genera un sólido formado por infinitos **discos** apilados: el de la posición $x$ tiene radio $\\sqrt{x}$.",
      "Un disco de grosor $dx$ tiene volumen $\\pi\\,(\\sqrt{x})^2\\,dx = \\pi x\\,dx$ (área del círculo por grosor).",
      "Sumando todos: $V = \\pi\\int_0^4 x\\,dx = \\pi\\left[\\dfrac{x^2}{2}\\right]_0^4 = 8\\pi \\approx 25{,}13$ unidades cúbicas.",
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        <Axes area={area} xMax={4.6} yMax={2.4} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat === 0}>
          <polygon points={`${mapX(area, 0)},${mapY(area, 0)} ${curve(area, f, 0, 4)} ${mapX(area, 4)},${mapY(area, 0)}`} fill={MANIM.blue} fillOpacity={0.35} />
        </Fade>
        <polyline points={curve(area, f, 0, 4)} fill="none" stroke={MANIM.blue} strokeWidth={4} />
        <Fade show={beat >= 1}>
          <polyline points={curve(area, mirror, 0, 4)} fill="none" stroke={MANIM.blue} strokeWidth={4} />
          {discos.map((x) => (
            <ellipse key={x} cx={mapX(area, x)} cy={mapY(area, 0)} rx={9} ry={f(x) * area.uy} fill={MANIM.yellow} fillOpacity={0.22} stroke={MANIM.yellow} strokeWidth={2} />
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          <ellipse cx={mapX(area, 2.25)} cy={mapY(area, 0)} rx={7} ry={1.5 * area.uy} fill={MANIM.red} fillOpacity={0.45} stroke={MANIM.red} strokeWidth={2.5} />
          <Txt x={mapX(area, 2.25)} y={mapY(area, 0) + 150} size={22} color={MANIM.red}>V = π·x·dx</Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={640} y={90} size={26} color={MANIM.green}>V = 8π</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
