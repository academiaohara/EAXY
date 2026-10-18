import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, RightMark, Seg, TickMark, Wedge, WedgeLabel, angleOf, footOn, polar, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const V: Pt = [150, 340];
const ALPHA = 60;
const SIDE_S = polar(V, 560, 0);
const SIDE_R = polar(V, 360, ALPHA);
const BIS_END = polar(V, 560, ALPHA / 2);
const P = polar(V, 190, ALPHA / 2);
const Q = polar(V, 380, ALPHA / 2);

function Feet({ p, color, names, show }: { p: Pt; color: string; names: [string, string, string]; show: boolean }) {
  const fs = footOn(p, V, SIDE_S);
  const fr = footOn(p, V, SIDE_R);
  return (
    <Fade show={show} dy={4}>
      <Seg a={p} b={fs} color={color} dashed />
      <Seg a={p} b={fr} color={color} dashed />
      <RightMark v={fs} a={180} b={90} size={13} color={color} />
      <RightMark v={fr} a={angleOf(fr, V)} b={angleOf(fr, p)} size={13} color={color} />
      <TickMark a={p} b={fs} n={2} color={color} />
      <TickMark a={p} b={fr} n={2} color={color} />
      <Dot p={p} color={color} r={7} />
      <Txt x={p[0] + 6} y={p[1] - 16} size={26} color={color}>{names[0]}</Txt>
      <Txt x={fs[0]} y={fs[1] + 30} size={24} color={color}>{names[1]}</Txt>
      <Txt x={fr[0] - 24} y={fr[1] - 4} size={24} color={color}>{names[2]}</Txt>
    </Fade>
  );
}

/** Bisectriz de un ángulo de 60°: lo parte en dos de 30° y sus puntos equidistan de los lados. */
export function buildBisectrizEquidistan(): AnimBuild {
  return {
    label: "La bisectriz de un ángulo de 60 grados lo divide en dos de 30 grados y sus puntos equidistan de los dos lados",
    captions: [
      "Un ángulo de $60^\\circ$ formado por las semirrectas $r$ y $s$.",
      "La **bisectriz** $b$ es la semirrecta que lo divide en **dos ángulos iguales**: $30^\\circ$ y $30^\\circ$.",
      "La distancia de un punto a una recta es la del segmento **perpendicular**. Para $P$: $\\overline{PR} = \\overline{PS}$.",
      "Pasa con cualquier punto de la bisectriz: $\\overline{QR'} = \\overline{QS'}$. Equidista de los dos lados.",
    ],
    render: (beat) => (
      <Canvas>
        <Wedge c={V} r={80} a0={0} a1={ALPHA} color={MANIM.blue} show={beat <= 0} opacity={0.3} />
        <Wedge c={V} r={80} a0={0} a1={ALPHA / 2} color={MANIM.green} show={beat >= 1} opacity={0.35} />
        <Wedge c={V} r={80} a0={ALPHA / 2} a1={ALPHA} color={MANIM.orange} show={beat >= 1} opacity={0.35} />
        <Fade show={beat === 0}>
          <WedgeLabel c={V} r={52} a0={0} a1={ALPHA} text="60°" size={22} />
        </Fade>
        <Fade show={beat >= 1}>
          <WedgeLabel c={V} r={112} a0={0} a1={ALPHA / 2} text="30°" size={22} color={MANIM.green} />
          <WedgeLabel c={V} r={112} a0={ALPHA / 2} a1={ALPHA} text="30°" size={22} color={MANIM.orange} />
        </Fade>

        <Seg a={V} b={SIDE_S} color={MANIM.ink} width={4} />
        <Seg a={V} b={SIDE_R} color={MANIM.ink} width={4} />
        <Txt x={SIDE_S[0] + 8} y={SIDE_S[1] + 4} size={28}>s</Txt>
        <Txt x={SIDE_R[0] + 16} y={SIDE_R[1] - 6} size={28}>r</Txt>

        <WriteLine show={beat >= 1} x1={V[0]} y1={V[1]} x2={BIS_END[0]} y2={BIS_END[1]} color={MANIM.purple} width={4} />
        <Fade show={beat >= 1}>
          <Txt x={BIS_END[0] + 18} y={BIS_END[1] - 8} size={28} color={MANIM.purple}>b</Txt>
        </Fade>

        <Feet p={P} color={MANIM.blue} names={["P", "S", "R"]} show={beat >= 2} />
        <Feet p={Q} color={MANIM.yellow} names={["Q", "S′", "R′"]} show={beat >= 3} />
      </Canvas>
    ),
  };
}
