import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { ArcStroke, Dot, Seg, Wedge, WedgeLabel, arrowHead, polar, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const O: Pt = [180, 290];
const AMP = 38;
const LEN = 390;
const END_B = polar(O, LEN, 0);
const END_A = polar(O, LEN, AMP);

/** Ángulo: región entre dos semirrectas con el mismo origen (vértice, lados y amplitud). */
export function buildAnguloElementos(): AnimBuild {
  return {
    label: "Un ángulo es la región que forman dos semirrectas con el mismo origen: vértice, lados y amplitud",
    captions: [
      "Dos semirrectas con **el mismo origen** forman un ángulo: la región entre ellas.",
      "El origen común, $O$, es el **vértice**.",
      "Las dos semirrectas, $OA$ y $OB$, son los **lados**.",
      "La **amplitud** es lo que se abren los lados. Se mide en grados: aquí, $38^\\circ$.",
    ],
    render: (beat) => (
      <Canvas>
        <Wedge c={O} r={LEN - 40} a0={0} a1={AMP} color={MANIM.blue} opacity={0.18} />
        <Seg a={O} b={END_B} color={beat === 2 ? MANIM.orange : MANIM.ink} width={4} />
        <Seg a={O} b={END_A} color={beat === 2 ? MANIM.green : MANIM.ink} width={4} />
        <polygon points={arrowHead(O, [END_B[0] + 14, END_B[1]], 18)} fill={beat === 2 ? MANIM.orange : MANIM.ink} className="anim-t" />
        <polygon points={arrowHead(O, polar(O, LEN + 14, AMP), 18)} fill={beat === 2 ? MANIM.green : MANIM.ink} className="anim-t" />
        <Txt x={END_B[0] + 6} y={END_B[1] + 36} size={30} color={MANIM.orange}>B</Txt>
        <Txt x={END_A[0] + 6} y={END_A[1] - 14} size={30} color={MANIM.green}>A</Txt>

        <Fade show={beat >= 1}>
          <Dot p={O} color={MANIM.yellow} r={9} />
          <Txt x={O[0] - 20} y={O[1] + 36} size={32} color={MANIM.yellow}>O</Txt>
        </Fade>
        <Fade show={beat === 1} dy={8}>
          <rect x={O[0] - 150} y={O[1] + 52} width={130} height={44} rx={12} fill={MANIM.panel} stroke={MANIM.yellow} strokeWidth={2.5} />
          <Txt x={O[0] - 85} y={O[1] + 82} size={24} color={MANIM.yellow}>vértice</Txt>
        </Fade>
        <Fade show={beat === 2} dy={8}>
          <rect x={360} y={118} width={120} height={44} rx={12} fill={MANIM.panel} stroke={MANIM.green} strokeWidth={2.5} />
          <Txt x={420} y={148} size={24} color={MANIM.green}>lado OA</Txt>
          <rect x={360} y={O[1] + 40} width={120} height={44} rx={12} fill={MANIM.panel} stroke={MANIM.orange} strokeWidth={2.5} />
          <Txt x={420} y={O[1] + 70} size={24} color={MANIM.orange}>lado OB</Txt>
        </Fade>
        <ArcStroke c={O} r={110} a0={0} a1={AMP} show={beat >= 3} color={MANIM.yellow} width={4} />
        <Fade show={beat >= 3}>
          <WedgeLabel c={O} r={152} a0={0} a1={AMP} text="38°" size={28} color={MANIM.yellow} />
          <Wedge c={O} r={110} a0={0} a1={AMP} color={MANIM.yellow} opacity={0.3} />
        </Fade>
        <Fade show={beat === 3} dy={8}>
          <Txt x={470} y={O[1] + 100} size={26} color={MANIM.yellow}>amplitud = abertura entre los lados</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
