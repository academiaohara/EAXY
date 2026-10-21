import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

const CX = 250;
const CY = 215;

/** Sector circular: una fracción a/360 del área del círculo. */
export function buildSectorCircular(params: { a?: number; b?: number }): AnimBuild {
  const ang = Math.min(Math.max(params.a ?? 120, 10), 350);
  const r = params.b ?? 6;
  const R = 150;
  const rad = (ang * Math.PI) / 180;
  const x2 = CX + R * Math.cos(-rad);
  const y2 = CY + R * Math.sin(-rad);
  const large = ang > 180 ? 1 : 0;
  const full = Math.PI * r * r;
  const part = (full * ang) / 360;
  const mid = (-rad / 2);
  return {
    label: `Sector circular de ${ang}° y radio ${r}`,
    captions: [
      `El círculo de radio $${r}$ tiene área $\\pi r^2 = \\pi \\cdot ${r}^2 \\approx ${numEs(Math.round(full * 100) / 100)}$.`,
      `Un **sector circular** de $${ang}^\\circ$ es la fracción $\\dfrac{${ang}}{360}$ del círculo.`,
      `$A = \\pi r^2 \\cdot \\dfrac{a}{360} = ${numEs(Math.round(full * 100) / 100)} \\cdot \\dfrac{${ang}}{360} \\approx ${numEs(Math.round(part * 100) / 100)}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={CX} cy={CY} r={R} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={4} />
        <Fade show={beat >= 1}>
          <path d={`M ${CX} ${CY} L ${CX + R} ${CY} A ${R} ${R} 0 ${large} 0 ${x2} ${y2} Z`} fill={MANIM.yellow} fillOpacity={0.55} stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={CX + 60 * Math.cos(mid) * 1.2} y={CY + 60 * Math.sin(mid) * 1.2 + 8} size={24} color={MANIM.ink}>{`${ang}°`}</Txt>
        </Fade>
        <line x1={CX} y1={CY} x2={CX + R} y2={CY} stroke={MANIM.ink} strokeWidth={2} />
        <Txt x={CX + R / 2} y={CY + 26} size={22} color={MANIM.ink}>{`r = ${r}`}</Txt>
        <Txt x={560} y={150} size={26} color={MANIM.blue} anchor="middle">{`círculo: ${numEs(Math.round(full * 100) / 100)}`}</Txt>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={560} y={210} size={26} color={MANIM.yellow} anchor="middle">{`sector: ${numEs(Math.round(part * 100) / 100)}`}</Txt>
          <Txt x={560} y={250} size={22} color={MANIM.muted} anchor="middle">{`${ang} / 360 del círculo`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
