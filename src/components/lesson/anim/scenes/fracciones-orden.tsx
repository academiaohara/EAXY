import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 130;
const W = 600;
const COLORS = [MANIM.blue, MANIM.orange, MANIM.green];

/** Ordenar 7/12, 5/8 y 9/16: con el mismo denominador (48) basta comparar numeradores. */
export function buildFraccionesOrden(): AnimBuild {
  const fr = [
    { n: 7, d: 12, n48: 28 },
    { n: 5, d: 8, n48: 30 },
    { n: 9, d: 16, n48: 27 },
  ];
  const rowY = (i: number) => 80 + i * 90;
  return {
    label: "Ordenar 7/12, 5/8 y 9/16 reduciendo a común denominador (48)",
    captions: [
      "Tres fracciones con denominadores distintos: las barras están partidas en trozos de **distinto tamaño** y cuesta compararlas.",
      "Buscamos un denominador común: $\\text{m.c.m.}(12, 8, 16) = 48$. Todas pasan a **cuarentaiochavos**.",
      "Ahora los trozos son iguales y basta mirar el numerador: $27 < 28 < 30$.",
      "Ordenadas de menor a mayor: $\\dfrac{9}{16} < \\dfrac{7}{12} < \\dfrac{5}{8}$.",
    ],
    render: (beat) => (
      <Canvas>
        {fr.map((f, i) => {
          const parts = beat >= 1 ? 48 : f.d;
          const filled = beat >= 1 ? f.n48 : f.n;
          return (
            <g key={i}>
              <rect x={X0} y={rowY(i)} width={W} height={46} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={2} />
              <rect x={X0} y={rowY(i)} width={(filled / parts) * W} height={46} fill={COLORS[i]} fillOpacity={0.6} className="anim-t" />
              {beat < 1 &&
                Array.from({ length: f.d - 1 }, (_, k) => (
                  <line key={k} x1={X0 + ((k + 1) * W) / f.d} y1={rowY(i)} x2={X0 + ((k + 1) * W) / f.d} y2={rowY(i) + 46} stroke={MANIM.ink} strokeOpacity={0.6} />
                ))}
              <Txt x={X0 - 14} y={rowY(i) + 32} size={26} color={COLORS[i]} anchor="end">{beat >= 1 ? `${f.n48}/48` : `${f.n}/${f.d}`}</Txt>
            </g>
          );
        })}
        <Fade show={beat >= 2} dy={8}>
          {fr.map((f, i) => (
            <line key={i} x1={X0 + (f.n48 / 48) * W} y1={rowY(i) - 8} x2={X0 + (f.n48 / 48) * W} y2={rowY(i) + 54} stroke={MANIM.yellow} strokeWidth={3} />
          ))}
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={385} size={32} color={MANIM.yellow}>9/16 &lt; 7/12 &lt; 5/8</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
