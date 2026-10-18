import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, arrowHead, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const Y = 200;
const X0 = 50;
const X1 = 750;
const A: Pt = [400, Y];
const M: Pt = [270, Y];
const N: Pt = [540, Y];

/** Recta (infinita), semirrecta (un punto la parte en dos) y segmento (dos puntos la acotan). */
export function buildRectaSemirrecta(): AnimBuild {
  return {
    label: "Una recta sin principio ni fin, dividida por un punto en dos semirrectas, y un segmento limitado por dos puntos",
    captions: [
      "Una **recta** no tiene principio ni fin: se prolonga sin límite en los dos sentidos. Se nombra con una letra minúscula, $r$.",
      "Un punto $A$ cualquiera de la recta la parte en **dos semirrectas**.",
      "Cada **semirrecta** tiene un principio, el punto $A$, pero no tiene fin.",
      "Dos puntos $M$ y $N$ acotan un **segmento**: tiene principio y fin, así que se puede medir.",
    ],
    render: (beat) => {
      const left = beat <= 1;
      const right = beat <= 2;
      const seg = beat >= 3;
      const colorL = beat === 0 ? MANIM.ink : MANIM.blue;
      const colorR = beat === 0 ? MANIM.ink : MANIM.orange;
      return (
        <Canvas>
          {/* recta completa: dos mitades para poder colorearlas por separado */}
          <Fade show={left}>
            <line x1={X0} y1={Y} x2={A[0]} y2={Y} stroke={colorL} strokeWidth={4} strokeLinecap="round" className="anim-t" />
            <polygon points={arrowHead([A[0], Y], [X0 - 10, Y], 20)} fill={colorL} className="anim-t" />
          </Fade>
          <Fade show={right && !seg}>
            <line x1={A[0]} y1={Y} x2={X1} y2={Y} stroke={colorR} strokeWidth={4} strokeLinecap="round" className="anim-t" />
            <polygon points={arrowHead([A[0], Y], [X1 + 10, Y], 20)} fill={colorR} className="anim-t" />
          </Fade>
          <Fade show={seg} dy={0}>
            <line x1={X0} y1={Y} x2={X1} y2={Y} stroke={MANIM.muted} strokeOpacity={0.55} strokeWidth={3} strokeLinecap="round" />
            <line x1={M[0]} y1={Y} x2={N[0]} y2={Y} stroke={MANIM.yellow} strokeWidth={6} strokeLinecap="round" />
            <Dot p={M} color={MANIM.yellow} r={8} />
            <Dot p={N} color={MANIM.yellow} r={8} />
            <Txt x={M[0]} y={Y - 26} size={30} color={MANIM.yellow}>M</Txt>
            <Txt x={N[0]} y={Y - 26} size={30} color={MANIM.yellow}>N</Txt>
          </Fade>
          <HBrace show={seg} x1={M[0]} x2={N[0]} y={Y + 22} label="segmento MN" labelSize={26} />

          <Fade show={beat <= 2}>
            <Txt x={X1 - 20} y={Y - 26} size={30} color={MANIM.ink}>r</Txt>
          </Fade>
          <Fade show={beat >= 1 && beat <= 2} dy={-6}>
            <Dot p={A} color={MANIM.yellow} r={8} />
            <Txt x={A[0]} y={Y - 26} size={30} color={MANIM.yellow}>A</Txt>
          </Fade>
          <Fade show={beat === 1} dy={8}>
            <Txt x={X0 + 190} y={Y + 70} size={26} color={MANIM.blue}>semirrecta</Txt>
            <Txt x={X1 - 190} y={Y + 70} size={26} color={MANIM.orange}>semirrecta</Txt>
          </Fade>
          <Fade show={beat === 2} dy={8}>
            <Txt x={X1 - 190} y={Y + 70} size={26} color={MANIM.orange}>principio en A · sin fin</Txt>
          </Fade>
          <Fade show={beat === 0} dy={8}>
            <Txt x={400} y={Y + 80} size={26} color={MANIM.muted}>infinitos puntos · sin principio ni fin</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
