import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { ArcStroke, Compass, Dot, Ruler, Seg, Wedge, WedgeLabel, angleOf, polar, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const V: Pt = [150, 350];
const ALPHA = 60;
const RHO1 = 150;
const RHO2 = 190;
const SIDE_S = polar(V, 560, 0);
const SIDE_R = polar(V, 380, ALPHA);
const R1 = polar(V, RHO1, 0);
const S1 = polar(V, RHO1, ALPHA);
// Punto T: a RHO2 de R1 y de S1, sobre la bisectriz.
const T: Pt = (() => {
  const half = (ALPHA / 2) * (Math.PI / 180);
  const t = RHO1 * Math.cos(half) + Math.sqrt(RHO2 * RHO2 - RHO1 * RHO1 * Math.sin(half) ** 2);
  return polar(V, t, ALPHA / 2);
})();
const FROM_R = angleOf(R1, T);
const FROM_S = angleOf(S1, T);
const BIS_END = polar(V, 520, ALPHA / 2);

/** Bisectriz con regla y compás: arco que corta los lados y dos arcos iguales que se cortan sobre la bisectriz. */
export function buildBisectrizCompas(): AnimBuild {
  return {
    label: "Construcción de la bisectriz de un ángulo con compás y regla: un arco en el vértice y dos arcos que se cortan",
    captions: [
      "Tenemos un ángulo y queremos su bisectriz.",
      "Pincha el compás en el **vértice** y ábrelo una distancia cualquiera.",
      "Traza un arco que corte a **los dos lados**: quedan marcados $R$ y $S$.",
      "Pincha en $R$ y ábrelo **más de la mitad** de $RS$.",
      "Traza un arco dentro del ángulo.",
      "Pincha en $S$, con **la misma abertura**.",
      "Traza otro arco: corta al anterior en un punto $T$ que equidista de $R$ y de $S$.",
      "Con la regla, une el vértice con $T$: esa semirrecta es la bisectriz $b$.",
      "$b$ divide el ángulo en **dos ángulos iguales**.",
    ],
    render: (beat) => {
      const c1 = beat === 1 || beat === 2;
      const c2 = beat === 3 || beat === 4;
      const c3 = beat === 5 || beat === 6;
      return (
        <Canvas>
          <Wedge c={V} r={70} a0={0} a1={ALPHA / 2} color={MANIM.green} show={beat >= 8} opacity={0.3} />
          <Wedge c={V} r={70} a0={ALPHA / 2} a1={ALPHA} color={MANIM.orange} show={beat >= 8} opacity={0.3} />
          <Fade show={beat >= 8}>
            <WedgeLabel c={V} r={104} a0={0} a1={ALPHA / 2} text="α" size={26} color={MANIM.green} />
            <WedgeLabel c={V} r={104} a0={ALPHA / 2} a1={ALPHA} text="α" size={26} color={MANIM.orange} />
          </Fade>

          <Seg a={V} b={SIDE_S} width={4} />
          <Seg a={V} b={SIDE_R} width={4} />

          <ArcStroke c={V} r={RHO1} a0={0} a1={ALPHA} show={beat >= 2} color={MANIM.blue} sweep />
          <ArcStroke c={R1} r={RHO2} a0={FROM_R - 38} a1={FROM_R + 30} show={beat >= 4} color={MANIM.green} sweep />
          <ArcStroke c={S1} r={RHO2} a0={FROM_S - 30} a1={FROM_S + 38} show={beat >= 6} color={MANIM.orange} sweep />

          <Compass c={V} r={RHO1} angle={beat >= 2 ? ALPHA : 0} show={c1} sweep />
          <Compass c={R1} r={RHO2} angle={beat >= 4 ? FROM_R + 30 : FROM_R - 38} show={c2} sweep />
          <Compass c={S1} r={RHO2} angle={beat >= 6 ? FROM_S + 38 : FROM_S - 30} show={c3} sweep />

          <Fade show={beat >= 2} dy={-4}>
            <Dot p={R1} color={MANIM.yellow} r={6} />
            <Dot p={S1} color={MANIM.yellow} r={6} />
            <Txt x={R1[0] + 4} y={R1[1] + 34} size={26} color={MANIM.yellow}>R</Txt>
            <Txt x={S1[0] - 26} y={S1[1] - 8} size={26} color={MANIM.yellow}>S</Txt>
          </Fade>
          <Fade show={beat >= 6} dy={-4}>
            <Dot p={T} color={MANIM.purple} r={7} />
            <Txt x={T[0] + 6} y={T[1] - 18} size={26} color={MANIM.purple}>T</Txt>
          </Fade>

          <Ruler a={V} b={T} show={beat === 7} side={-1} over={46} thickness={44} />
          <WriteLine show={beat >= 7} x1={V[0]} y1={V[1]} x2={BIS_END[0]} y2={BIS_END[1]} color={MANIM.purple} width={4} delay={beat === 7 ? 500 : 0} />
          <Fade show={beat >= 7}>
            <Txt x={BIS_END[0] + 18} y={BIS_END[1] - 6} size={28} color={MANIM.purple}>b</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

