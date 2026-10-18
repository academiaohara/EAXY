import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const R = 24;
const GAP = 62;

/**
 * Sumar monomios semejantes es contar «lo mismo»: `a` fresas y `b` fresas (x) se juntan en `a + b`;
 * las `c` manzanas (y) no se mezclan, así que la suma queda indicada.
 */
export function buildSemejantesAgrupar(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = Math.max(1, params.a ?? 3);
  const b = Math.max(1, params.b ?? 2);
  const c = Math.max(1, params.c ?? 2);
  const x0 = 70;
  const second = x0 + a * GAP + 30;
  const apples = second + b * GAP + 40;
  const group = x0 + (a + b) * GAP + 40;
  const dxApples = group - apples;
  const dxSecond = (x0 + a * GAP) - second;

  return {
    label: `${a}x + ${b}x + ${c}y: las x se agrupan en ${a + b}x y las y no se mezclan con ellas`,
    captions: [
      `Tres tipos de cosas: $${a}x$, $${b}x$ y $${c}y$. Cada $x$ es una fresa y cada $y$, una manzana.`,
      `Las fresas se pueden juntar con las fresas: $${a}x + ${b}x$ son **${a + b}** fresas.`,
      `Las manzanas son otra cosa: **no** se suman a las fresas. $${c}y$ se queda aparte.`,
      `Resultado: $${a}x + ${b}x + ${c}y = ${a + b}x + ${c}y$. Solo se reducen los **semejantes**; la otra suma queda **indicada**.`,
    ],
    render: (beat) => {
      const joined = beat >= 1;
      const parted = beat >= 2;
      const row = (n: number, xs: number, fill: string, letter: string) =>
        Array.from({ length: n }, (_, i) => (
          <g key={`${letter}-${i}-${xs}`}>
            <circle cx={xs + i * GAP + R} cy={190} r={R} fill={fill} fillOpacity={0.92} />
            <Txt x={xs + i * GAP + R} y={200} size={26} color={MANIM.surface} weight={800}>
              {letter}
            </Txt>
          </g>
        ));
      return (
        <Canvas>
          <Txt x={400} y={52} size={34} color={MANIM.yellow}>
            {beat >= 3 ? `${a + b}x + ${c}y` : `${a}x + ${b}x + ${c}y`}
          </Txt>
          <g>{row(a, x0, MANIM.red, "x")}</g>
          <g className="anim-t" style={{ transform: `translate(${joined ? dxSecond : 0}px, 0px)` }}>
            {row(b, second, MANIM.red, "x")}
          </g>
          <g className="anim-t" style={{ transform: `translate(${parted ? dxApples : 0}px, ${parted ? 30 : 0}px)` }}>
            {row(c, apples, MANIM.green, "y")}
          </g>
          <HBrace show={joined} x1={x0} x2={x0 + (a + b) * GAP - (GAP - 2 * R)} y={235} color={MANIM.red} label={`${a + b}x`} labelSize={30} />
          <Fade show={parted} dy={8}>
            <Txt x={group + (c * GAP) / 2 - 12} y={338} size={22} color={MANIM.green}>
              queda indicada
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
