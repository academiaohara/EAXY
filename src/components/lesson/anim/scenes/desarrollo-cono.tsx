import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { arcPath, polar, wedgePath, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

const PI = 3.14;

/** Desarrollo de un cono recto: un sector circular de radio g (la generatriz) y el círculo de la base. */
export function buildDesarrolloCono(params: { a?: number; b?: number }): AnimBuild {
  const r = params.a ?? 6;
  const g = params.b ?? 10;
  const u = Math.min(20, 190 / g, 125 / r);
  const theta = (360 * r) / g;
  const C: Pt = [290, 170];
  const baseC: Pt = [650, 250];
  const a0 = 270 - theta / 2;
  const a1 = 270 + theta / 2;
  const lat = PI * r * g;
  const base = PI * r * r;
  const total = lat + base;

  return {
    label: `Desarrollo de un cono de radio ${numEs(r)} y generatriz ${numEs(g)}`,
    beatMs: 3400,
    captions: [
      "Al abrir un cono recto salen **un sector circular** (radio $g$, la generatriz) y **un círculo** (la base, radio $r$).",
      `El arco del sector tiene la misma longitud que la circunferencia de la base: $2\\pi r = ${numEs(2 * PI * r)}$.`,
      `El área del sector es la mitad del arco por el radio: $A_{lat} = \\dfrac{2\\pi r \\cdot g}{2} = \\pi r g = ${numEs(lat)}$.`,
      `La base: $\\pi r^2 = ${numEs(base)}$. $A_{total} = \\pi r g + \\pi r^2 = ${numEs(lat)} + ${numEs(base)} = ${numEs(total)}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <path d={wedgePath(C, g * u, a0, a1)} fill={MANIM.green} fillOpacity={beat >= 2 ? 0.35 : 0.2} stroke={MANIM.green} strokeWidth={4} />
        <circle cx={baseC[0]} cy={baseC[1]} r={r * u} fill={MANIM.blue} fillOpacity={beat >= 3 ? 0.35 : 0.2} stroke={MANIM.blue} strokeWidth={4} />
        <Fade show={beat === 0}>
          <line x1={C[0]} y1={C[1]} x2={polar(C, g * u, 270)[0]} y2={polar(C, g * u, 270)[1]} stroke={MANIM.ink} strokeWidth={3} strokeDasharray="8 6" />
          <Txt x={C[0] + 18} y={C[1] + (g * u) / 2} size={26} color={MANIM.ink} anchor="start">g</Txt>
          <line x1={baseC[0]} y1={baseC[1]} x2={baseC[0] + r * u} y2={baseC[1]} stroke={MANIM.ink} strokeWidth={3} strokeDasharray="8 6" />
          <Txt x={baseC[0] + (r * u) / 2} y={baseC[1] - 10} size={26} color={MANIM.ink}>r</Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <path d={arcPath(C, g * u + 10, a0, a1)} fill="none" stroke={MANIM.yellow} strokeWidth={5} />
          <circle cx={baseC[0]} cy={baseC[1]} r={r * u + 10} fill="none" stroke={MANIM.yellow} strokeWidth={5} />
          <Txt x={baseC[0]} y={baseC[1] - r * u - 22} size={24} color={MANIM.yellow}>2πr</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={C[0]} y={C[1] + g * u * 0.55} size={28} color={MANIM.green}>{`πrg = ${numEs(lat)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={baseC[0]} y={baseC[1] + 9} size={26} color={MANIM.blue}>{`πr² = ${numEs(base)}`}</Txt>
          <Txt x={650} y={baseC[1] + r * u + 36} size={28} color={MANIM.yellow}>{`A = ${numEs(total)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
