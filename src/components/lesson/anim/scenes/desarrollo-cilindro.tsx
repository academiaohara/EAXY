import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

const PI = 3.14;

/** Desarrollo de un cilindro recto: un rectángulo de base 2πr y altura h, y dos círculos. */
export function buildDesarrolloCilindro(params: { a?: number; b?: number }): AnimBuild {
  const r = params.a ?? 3;
  const h = params.b ?? 5;
  const per = 2 * PI * r;
  const u = Math.min(26, 590 / per, 380 / (h + 4 * r));
  const cx = 400;
  const top = (420 - (h + 4 * r) * u) / 2;
  const rectX = cx - (per * u) / 2;
  const rectY = top + 2 * r * u;
  const lat = per * h;
  const base = PI * r * r;
  const total = lat + 2 * base;

  return {
    label: `Desarrollo de un cilindro de radio ${numEs(r)} y altura ${numEs(h)}`,
    beatMs: 3400,
    captions: [
      "Al abrir un cilindro recto salen **dos círculos** (las bases) y **un rectángulo** (la pared lateral).",
      `El lado horizontal del rectángulo es la **longitud de la circunferencia** de la base: $2\\pi r = 2 \\cdot 3{,}14 \\cdot ${numEs(r)} = ${numEs(per)}$.`,
      `El rectángulo mide $2\\pi r$ por $h$: $A_{lat} = 2\\pi r h = ${numEs(per)} \\cdot ${numEs(h)} = ${numEs(lat)}$.`,
      `Cada base es un círculo: $\\pi r^2 = ${numEs(base)}$. $A_{total} = 2\\pi r h + 2\\pi r^2 = ${numEs(lat)} + ${numEs(2 * base)} = ${numEs(total)}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <rect x={rectX} y={rectY} width={per * u} height={h * u} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={4} />
        <circle cx={cx} cy={rectY - r * u} r={r * u} fill={MANIM.blue} fillOpacity={beat >= 3 ? 0.35 : 0.15} stroke={MANIM.blue} strokeWidth={4} />
        <circle cx={cx} cy={rectY + h * u + r * u} r={r * u} fill={MANIM.blue} fillOpacity={beat >= 3 ? 0.35 : 0.15} stroke={MANIM.blue} strokeWidth={4} />
        <Fade show={beat >= 1}>
          <line x1={rectX} y1={rectY - 12} x2={rectX + per * u} y2={rectY - 12} stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={rectX + per * u + 8} y={rectY - 6} size={24} color={MANIM.yellow} anchor="start">2πr</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={cx} y={rectY + (h * u) / 2 + 9} size={28} color={MANIM.green}>{`2πr · h = ${numEs(lat)}`}</Txt>
          <Txt x={rectX - 12} y={rectY + (h * u) / 2 + 9} size={24} color={MANIM.green} anchor="end">h</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={cx} y={rectY - r * u + 7} size={18} color={MANIM.blue}>{`πr² = ${numEs(base)}`}</Txt>
          <Txt x={cx} y={rectY + h * u + r * u + 7} size={18} color={MANIM.blue}>{`πr² = ${numEs(base)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={680} y={rectY + h * u + r * u + 7} size={28} color={MANIM.yellow}>{`A = ${numEs(total)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
