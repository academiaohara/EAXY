import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const LEGS: Record<number, [number, number]> = { 2: [1, 1], 5: [2, 1], 8: [2, 2], 10: [3, 1], 13: [3, 2] };
const X0 = 90;
const Y = 340;

/** Un irracional también es un punto de la recta: √a como hipotenusa de un triángulo rectángulo. */
export function buildRaizEnRecta(params: { a?: number }): AnimBuild {
  const a = LEGS[Math.round(params.a ?? 2)] ? Math.round(params.a ?? 2) : 2;
  const [p, q] = LEGS[a]!;
  const root = Math.sqrt(a);
  const U = Math.min(190, 600 / Math.max(root, p) / 1.05);
  const x = (v: number) => X0 + v * U;
  const arc = `M ${x(p)} ${Y - q * U} A ${root * U} ${root * U} 0 0 1 ${x(root)} ${Y}`;

  return {
    label: `√${a} como punto de la recta: hipotenusa de un triángulo de catetos ${p} y ${q}`,
    captions: [
      `La recta con la unidad marcada. Tomamos un segmento de longitud **${p}** desde el $0$.`,
      `Levantamos un cateto de **${q}** en su extremo y unimos con el origen.`,
      `Por Pitágoras la hipotenusa mide $\\sqrt{${p}^2 + ${q}^2} = \\sqrt{${a}}$.`,
      `Con el compás, centro en el $0$, llevamos esa longitud a la recta: $\\sqrt{${a}} \\approx ${root.toFixed(4).replace(".", ",")}$ **es un punto de la recta** aunque no sea racional.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <line x1={X0 - 30} y1={Y} x2={x(Math.max(root, p)) + 60} y2={Y} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
        {Array.from({ length: Math.ceil(Math.max(root, p)) + 1 }, (_, v) => (
          <g key={v}>
            <line x1={x(v)} y1={Y - 8} x2={x(v)} y2={Y + 8} stroke={MANIM.ink} strokeWidth={3} />
            <Txt x={x(v)} y={Y + 34} size={22} color={MANIM.muted}>{v}</Txt>
          </g>
        ))}
        <line x1={x(0)} y1={Y - 3} x2={x(p)} y2={Y - 3} stroke={MANIM.blue} strokeWidth={6} />
        <Fade show={beat >= 1} dy={-8}>
          <line x1={x(p)} y1={Y} x2={x(p)} y2={Y - q * U} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={x(p) - 14} y={Y - (q * U) / 2} size={22} color={MANIM.green} anchor="end">{String(q)}</Txt>
          <line x1={x(0)} y1={Y} x2={x(p)} y2={Y - q * U} stroke={MANIM.orange} strokeWidth={4} />
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={x(p / 2) - 22} y={Y - (q * U) / 2 - 12} size={26} color={MANIM.orange}>{`√${a}`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <path d={arc} fill="none" stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 6" />
          <circle cx={x(root)} cy={Y} r={8} fill={MANIM.yellow} />
          <Txt x={x(root)} y={Y + 70} size={26} color={MANIM.yellow}>{`√${a}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
