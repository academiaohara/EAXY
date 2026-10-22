import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const U = 230;
const X0 = 90;
const YB = 340;

/** Construcción del número áureo Φ = (√5 + 1)/2 con regla y compás a partir de un cuadrado unidad. */
export function buildNumeroOroConstruccion(): AnimBuild {
  const mx = X0 + U / 2;
  const r = Math.hypot(U, U / 2);
  const endX = mx + r;
  const topY = YB - U;
  const arcPath = `M ${X0 + U} ${topY} A ${r} ${r} 0 0 1 ${endX} ${YB}`;

  return {
    label: "Construcción del número áureo Φ = (1 + √5)/2 desde un cuadrado de lado 1",
    captions: [
      "Un cuadrado de **lado 1**. Marcamos el punto medio $M$ de su base.",
      "Unimos $M$ con el vértice opuesto: es la hipotenusa de un triángulo con catetos $1$ y $\\frac{1}{2}$. Por Pitágoras mide $\\sqrt{1 + \\frac{1}{4}} = \\dfrac{\\sqrt{5}}{2}$.",
      "Con el compás, centro en $M$ y esa abertura, llevamos la hipotenusa sobre la base prolongada.",
      "Desde el vértice izquierdo hasta ese punto hay $\\dfrac{1}{2} + \\dfrac{\\sqrt{5}}{2} = \\Phi = 1{,}6180339\\ldots$ El **número áureo**, irracional.",
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <line x1={X0 - 20} y1={YB} x2={X0 + U + 330} y2={YB} stroke={MANIM.grid} strokeWidth={3} />
        <rect x={X0} y={topY} width={U} height={U} fill={MANIM.blue} fillOpacity={0.14} stroke={MANIM.blue} strokeWidth={3} />
        <Txt x={X0 + U / 2} y={topY + U / 2 + 8} size={32} color={MANIM.blue}>1</Txt>
        <circle cx={mx} cy={YB} r={6} fill={MANIM.yellow} />
        <Txt x={mx} y={YB + 30} size={22} color={MANIM.yellow}>M</Txt>
        <Fade show={beat >= 1} dy={-6}>
          <line x1={mx} y1={YB} x2={X0 + U} y2={topY} stroke={MANIM.orange} strokeWidth={4} />
          <Txt x={mx + 40} y={YB - 120} size={26} color={MANIM.orange} anchor="end">√5/2</Txt>
          <Txt x={X0 + U * 0.75} y={YB + 30} size={20} color={MANIM.muted}>1/2</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <path d={arcPath} fill="none" stroke={MANIM.green} strokeWidth={3} strokeDasharray="8 6" />
          <circle cx={endX} cy={YB} r={7} fill={MANIM.green} />
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <path d={`M ${X0} ${YB + 44} L ${X0} ${YB + 54} L ${endX} ${YB + 54} L ${endX} ${YB + 44}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={(X0 + endX) / 2} y={YB + 82 > 410 ? 408 : YB + 80} size={30} color={MANIM.yellow}>Φ = (1 + √5)/2 ≈ 1,618</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
