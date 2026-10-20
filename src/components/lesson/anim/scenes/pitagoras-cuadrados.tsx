import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { RightMark, Seg, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const R: Pt = [300, 250];

function poly(points: Pt[]): string {
  return points.map((p) => `${p[0]},${p[1]}`).join(" ");
}

/** Cuadrado sobre cada lado de un triángulo rectángulo: el de la hipotenusa «pesa» lo mismo que los otros dos juntos. */
export function buildPitagorasCuadrados(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? 3;
  const b = params.b ?? 4;
  const c2 = a * a + b * b;
  const c = Math.sqrt(c2);
  const u = Math.min(34, 150 / b, 230 / (a + b));
  const P: Pt = [R[0] + b * u, R[1]];
  const Q: Pt = [R[0], R[1] - a * u];
  const n: Pt = [a * u, -b * u];
  const sqB: Pt[] = [R, P, [P[0], R[1] + b * u], [R[0], R[1] + b * u]];
  const sqA: Pt[] = [R, Q, [R[0] - a * u, Q[1]], [R[0] - a * u, R[1]]];
  const sqC: Pt[] = [P, Q, [Q[0] + n[0], Q[1] + n[1]], [P[0] + n[0], P[1] + n[1]]];
  const cx = (pts: Pt[]) => pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const cy = (pts: Pt[]) => pts.reduce((s, p) => s + p[1], 0) / pts.length;
  const cTxt = Number.isInteger(c) ? `${c}` : numEs(c);

  return {
    label: `Teorema de Pitágoras con cuadrados sobre los lados de un triángulo de catetos ${a} y ${b}`,
    beatMs: 3200,
    captions: [
      "Un triángulo rectángulo: los **catetos** $a$ y $b$ forman el ángulo recto y la **hipotenusa** $c$ es el lado mayor.",
      `Sobre cada cateto dibujamos un cuadrado. Sus áreas son $a^2 = ${a * a}$ y $b^2 = ${b * b}$.`,
      `Sobre la hipotenusa dibujamos otro cuadrado: su área es $c^2 = ${numTex(c2)}$.`,
      `$${a * a} + ${b * b} = ${numTex(c2)}$: el cuadrado de la hipotenusa tiene la misma área que los otros dos juntos. $a^2 + b^2 = c^2$.`,
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat >= 1}>
          <polygon points={poly(sqA)} fill={MANIM.green} fillOpacity={0.3} stroke={MANIM.green} strokeWidth={3} />
          <polygon points={poly(sqB)} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={3} />
          {Array.from({ length: a - 1 }, (_, i) => (
            <g key={`ga${i}`} stroke={MANIM.green} strokeOpacity={0.5} strokeWidth={1.5}>
              <line x1={R[0] - (i + 1) * u} y1={Q[1]} x2={R[0] - (i + 1) * u} y2={R[1]} />
            </g>
          ))}
          {Array.from({ length: a - 1 }, (_, i) => (
            <line key={`gah${i}`} x1={R[0] - a * u} y1={R[1] - (i + 1) * u} x2={R[0]} y2={R[1] - (i + 1) * u} stroke={MANIM.green} strokeOpacity={0.5} strokeWidth={1.5} />
          ))}
          {Array.from({ length: b - 1 }, (_, i) => (
            <line key={`gbv${i}`} x1={R[0] + (i + 1) * u} y1={R[1]} x2={R[0] + (i + 1) * u} y2={R[1] + b * u} stroke={MANIM.blue} strokeOpacity={0.5} strokeWidth={1.5} />
          ))}
          {Array.from({ length: b - 1 }, (_, i) => (
            <line key={`gbh${i}`} x1={R[0]} y1={R[1] + (i + 1) * u} x2={P[0]} y2={R[1] + (i + 1) * u} stroke={MANIM.blue} strokeOpacity={0.5} strokeWidth={1.5} />
          ))}
          <Txt x={cx(sqA)} y={cy(sqA) + 10} size={30} color={MANIM.green}>{`a² = ${a * a}`}</Txt>
          <Txt x={cx(sqB)} y={cy(sqB) + 10} size={30} color={MANIM.blue}>{`b² = ${b * b}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <polygon points={poly(sqC)} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={cx(sqC)} y={cy(sqC) + 10} size={30} color={MANIM.orange}>{`c² = ${numEs(c2)}`}</Txt>
        </Fade>

        <polygon points={poly([R, P, Q])} fill={MANIM.panel} fillOpacity={0.9} stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        <RightMark v={R} a={0} b={90} size={18} />
        <Txt x={R[0] + (b * u) / 2} y={R[1] - 12} size={26} color={MANIM.blue}>b</Txt>
        <Txt x={R[0] + 20} y={R[1] - (a * u) / 2} size={26} color={MANIM.green}>a</Txt>
        <Txt x={(P[0] + Q[0]) / 2 + 22} y={(P[1] + Q[1]) / 2 - 4} size={26} color={MANIM.orange}>c</Txt>
        <Seg a={P} b={Q} color={MANIM.orange} width={5} />
        <Fade show={beat === 0}>
          <Txt x={R[0] - 120} y={R[1] + 40} size={22} color={MANIM.muted}>catetos: a y b</Txt>
          <Txt x={P[0] + 150} y={P[1] - 70} size={22} color={MANIM.muted}>{`hipotenusa: c`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={650} y={340} size={32} color={MANIM.yellow}>{`${a * a} + ${b * b} = ${numEs(c2)}`}</Txt>
          <Txt x={650} y={380} size={26} color={MANIM.muted}>{`a² + b² = c²${Number.isInteger(c) ? `  (c = ${cTxt})` : ""}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
