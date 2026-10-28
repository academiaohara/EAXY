import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { ArcStroke, Dot, Seg, polar, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Pentágono regular inscrito (construcción de Euclides) ───────────── */

const O: Pt = [400, 215];
const R = 150;
const C: Pt = [O[0], O[1] - R];
const D: Pt = [O[0], O[1] + R];
const L: Pt = [O[0] - R, O[1]];
const Rr: Pt = [O[0] + R, O[1]];
const M: Pt = [O[0] + R / 2, O[1]];
const MC = Math.hypot(C[0] - M[0], C[1] - M[1]);
const N: Pt = [M[0] - MC, O[1]];
const CN = Math.hypot(C[0] - N[0], C[1] - N[1]);
/** Ángulos (y hacia arriba) de MC y de MN vistos desde M; de CV₁ y CV₂ vistos desde C. */
const A_MC = (Math.atan2(M[1] - C[1], C[0] - M[0]) * 180) / Math.PI; // MC apunta arriba a la izquierda
const V: Pt[] = [0, 1, 2, 3, 4].map((k) => polar(O, R, 90 + 72 * k));
const A_CV2 = (Math.atan2(-(V[1]![1] - C[1]), V[1]![0] - C[0]) * 180) / Math.PI; // hacia el vértice de la izquierda
const A_CV5 = (Math.atan2(-(V[4]![1] - C[1]), V[4]![0] - C[0]) * 180) / Math.PI; // hacia el de la derecha

export function buildPentagonoEuclides(): AnimBuild {
  return {
    label: "Construcción del pentágono regular inscrito en una circunferencia",
    beatMs: 5400,
    captions: [
      "Se traza la **circunferencia** y dos **diámetros perpendiculares**. Los extremos son **C** (arriba), **D**, **L** y **R**.",
      "Se halla el **punto medio M** del radio **OR** (con una mediatriz).",
      "Con centro en **M** y radio **MC** se traza un arco que corta al diámetro horizontal en **N**.",
      "**CN** es el **lado** del pentágono. Con el compás, centrado en **C** y con radio CN, se marcan los vértices **contiguos** de C en la circunferencia.",
      "Se repite el trazado desde cada vértice y se une todo: **pentágono regular**. Su lado es $2R\\,\\operatorname{sen}36^\\circ \\approx 1{,}176\\,R$.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={MANIM.muted} strokeWidth={2.5} />
        <Seg a={L} b={Rr} color={MANIM.ink} width={2.5} />
        <Seg a={C} b={D} color={MANIM.ink} width={2.5} />
        <Dot p={O} r={4} />
        <Txt x={O[0] - 16} y={O[1] + 22} size={20}>O</Txt>
        <Txt x={C[0]} y={C[1] - 12} size={22}>C</Txt>
        <Txt x={Rr[0] + 20} y={Rr[1] + 8} size={22}>R</Txt>
        <Txt x={L[0] - 20} y={L[1] + 8} size={22}>L</Txt>
        <Fade show={beat >= 1}>
          <Dot p={M} color={MANIM.orange} r={6} />
          <Txt x={M[0]} y={M[1] + 28} size={22} color={MANIM.orange}>M</Txt>
        </Fade>
        <ArcStroke c={M} r={MC} a0={A_MC} a1={180} show={beat >= 2} color={MANIM.orange} width={3.5} />
        <Fade show={beat >= 2}>
          <Seg a={C} b={M} color={MANIM.orange} width={2} dashed />
          <Dot p={N} color={MANIM.green} r={6} />
          <Txt x={N[0]} y={N[1] + 28} size={22} color={MANIM.green}>N</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Seg a={C} b={N} color={MANIM.green} width={4} />
          <Txt x={(C[0] + N[0]) / 2 - 26} y={(C[1] + N[1]) / 2 - 6} size={22} color={MANIM.green}>l</Txt>
        </Fade>
        <ArcStroke c={C} r={CN} a0={A_CV2} a1={A_CV5} show={beat === 3} color={MANIM.purple} width={3} />
        <Fade show={beat >= 4}>
          <polygon points={V.map((p) => p.join(",")).join(" ")} fill={MANIM.green} fillOpacity={0.18} stroke={MANIM.green} strokeWidth={4} />
          {V.map((p, i) => (
            <Dot key={i} p={p} color={MANIM.green} r={6} />
          ))}
        </Fade>
      </Canvas>
    ),
  };
}
