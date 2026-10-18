import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { ArcStroke, Compass, Dot, RightMark, Ruler, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const A: Pt = [240, 215];
const B: Pt = [560, 215];
const R = 210;
const SPAN = 58;
const T1: Pt = [400, 215 - Math.sqrt(R * R - 160 * 160)];
const T2: Pt = [400, 215 + Math.sqrt(R * R - 160 * 160)];

/** Mediatriz con regla y compás: dos arcos con la misma abertura (mayor que la mitad de AB) y la recta por sus cortes. */
export function buildMediatrizCompas(): AnimBuild {
  return {
    label: "Construcción de la mediatriz de AB con compás y regla: dos arcos que se cortan en dos puntos y la recta que los une",
    captions: [
      "Tenemos el segmento $AB$ y queremos su mediatriz.",
      "Pincha el compás en $A$ y ábrelo **más de la mitad** de $AB$.",
      "Sin tocar la abertura, traza un arco a cada lado de $AB$.",
      "Pincha ahora en $B$, con **la misma abertura**.",
      "Traza otro arco: corta al primero por arriba y por abajo.",
      "Los arcos se cortan en dos puntos, que están a igual distancia de $A$ y de $B$.",
      "Con la regla, une esos dos puntos: esa recta es la mediatriz $m$.",
      "$m$ pasa por el punto medio $M$ y es perpendicular a $AB$.",
    ],
    render: (beat) => {
      const compA = beat === 1 || beat === 2;
      const compB = beat === 3 || beat === 4;
      return (
        <Canvas>
          <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={MANIM.ink} strokeWidth={4} strokeLinecap="round" />
          <line x1={A[0]} y1={A[1] - 12} x2={A[0]} y2={A[1] + 12} stroke={MANIM.ink} strokeWidth={4} />
          <line x1={B[0]} y1={B[1] - 12} x2={B[0]} y2={B[1] + 12} stroke={MANIM.ink} strokeWidth={4} />
          <Txt x={A[0] - 30} y={A[1] + 10} size={30}>A</Txt>
          <Txt x={B[0] + 30} y={B[1] + 10} size={30}>B</Txt>

          <ArcStroke c={A} r={R} a0={SPAN} a1={-SPAN} show={beat >= 2} color={MANIM.blue} sweep />
          <ArcStroke c={B} r={R} a0={180 - SPAN} a1={180 + SPAN} show={beat >= 4} color={MANIM.orange} sweep />

          <Compass c={A} r={R} angle={beat >= 2 ? -SPAN : SPAN} show={compA} sweep />
          <Compass c={B} r={R} angle={beat >= 4 ? 180 + SPAN : 180 - SPAN} flip show={compB} sweep />

          <Fade show={beat >= 5} dy={-6}>
            <Dot p={T1} color={MANIM.yellow} r={7} />
            <Dot p={T2} color={MANIM.yellow} r={7} />
          </Fade>

          <Ruler a={T2} b={T1} show={beat === 6} side={1} over={30} />
          <WriteLine show={beat >= 6} x1={T2[0]} y1={T2[1] + 52} x2={T1[0]} y2={T1[1] - 52} color={MANIM.purple} width={4} delay={beat === 6 ? 500 : 0} />
          <Fade show={beat >= 6}>
            <Txt x={T1[0] - 24} y={T1[1] - 34} size={30} color={MANIM.purple}>m</Txt>
          </Fade>
          <Fade show={beat >= 7} dy={-4}>
            <RightMark v={[400, 215]} a={90} b={0} size={18} color={MANIM.purple} />
            <Dot p={[400, 215]} color={MANIM.green} r={7} />
            <Txt x={400 + 30} y={215 + 36} size={26} color={MANIM.green}>M</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

