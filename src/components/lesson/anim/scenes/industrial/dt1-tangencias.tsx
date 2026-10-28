import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { ArcStroke, Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Tangentes a una circunferencia desde un punto exterior ───────────── */

const O: Pt = [250, 210];
const R = 110;
const P: Pt = [600, 210];
const D = P[0] - O[0];
const M: Pt = [(O[0] + P[0]) / 2, 210];
const BETA = Math.acos(R / D);
const T1: Pt = [O[0] + R * Math.cos(BETA), 210 - R * Math.sin(BETA)];
const T2: Pt = [O[0] + R * Math.cos(BETA), 210 + R * Math.sin(BETA)];

export function buildTangentesPunto(): AnimBuild {
  return {
    label: "Tangentes a una circunferencia desde un punto exterior",
    beatMs: 5400,
    captions: [
      "Dada la **circunferencia** de centro **O** y un punto exterior **P**, se quieren las **tangentes** desde P. Se une O con P.",
      "Se halla el **punto medio M** de OP (mediatriz) y se traza la **circunferencia de diámetro OP**.",
      "Esta circunferencia corta a la dada en **T₁** y **T₂**.",
      "Como el ángulo inscrito en una **semicircunferencia es recto** (Thales), **OT ⟂ TP**: **PT₁** y **PT₂** son las **tangentes**, y miden lo mismo.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <Seg a={O} b={P} color={MANIM.muted} width={2} dashed />
        <Dot p={O} r={5} />
        <Dot p={P} color={MANIM.green} r={6} />
        <Txt x={O[0] - 6} y={O[1] + 30} size={24}>O</Txt>
        <Txt x={P[0] + 18} y={P[1] + 8} size={24} color={MANIM.green}>P</Txt>
        <Fade show={beat >= 1}>
          <Dot p={M} color={MANIM.orange} r={5} />
          <Txt x={M[0]} y={M[1] + 28} size={22} color={MANIM.orange}>M</Txt>
          <circle cx={M[0]} cy={M[1]} r={D / 2} fill="none" stroke={MANIM.orange} strokeWidth={2.5} strokeDasharray="8 6" />
        </Fade>
        <Fade show={beat >= 2}>
          <Dot p={T1} color={MANIM.purple} r={6} />
          <Dot p={T2} color={MANIM.purple} r={6} />
          <Txt x={T1[0] - 6} y={T1[1] - 14} size={22} color={MANIM.purple}>T₁</Txt>
          <Txt x={T2[0] - 6} y={T2[1] + 30} size={22} color={MANIM.purple}>T₂</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Seg a={P} b={T1} color={MANIM.green} width={4} />
          <Seg a={P} b={T2} color={MANIM.green} width={4} />
          <Seg a={O} b={T1} color={MANIM.purple} width={2.5} />
          <Seg a={O} b={T2} color={MANIM.purple} width={2.5} />
          <Txt x={T1[0] + 64} y={T1[1] + 22} size={20} color={MANIM.purple}>90°</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Trazado de un óvalo dados sus ejes ───────────── */

const OA = 200;
const OB = 120;
const OO: Pt = [400, 215];
const sc = (x: number, y: number): Pt => [OO[0] + x, OO[1] - y];
const AA: Pt = [-OA, 0];
const CC: Pt = [0, OB];
const CE = OA - OB;
const dAC = Math.hypot(OA, OB);
const FF: Pt = [CC[0] + (CE * (AA[0] - CC[0])) / dAC, CC[1] + (CE * (AA[1] - CC[1])) / dAC];
const FS = FF[0] ** 2 + FF[1] ** 2 - OA ** 2;
/** Centros: pequeño en el eje mayor (x1) y grande en el eje menor (y2), ambos sobre la mediatriz de AF. */
const X1 = FS / (2 * (OA + FF[0]));
const Y2 = FS / (2 * FF[1]);
const RP = X1 + OA;
const RG = OB - Y2;
const XC = -X1; // centro del arco pequeño derecho
const YC = RG - OB; // el centro del arco grande inferior está en (0, YC) y el del superior en (0, −YC)
const JR = (Math.atan2(YC, XC) * 180) / Math.PI;
const A_CF = (Math.atan2(FF[1] - CC[1], FF[0] - CC[0]) * 180) / Math.PI + 360;

export function buildTrazadoOvalo(): AnimBuild {
  return {
    label: "Trazado de un óvalo dados sus ejes mayor y menor",
    beatMs: 5400,
    captions: [
      "Se dibujan los **ejes**: el mayor **AB** (horizontal) y el menor **CD** (vertical), perpendiculares por su centro O.",
      "Con centro en **O** y radio **OA** se traza un arco hasta cortar la prolongación del eje menor en **E**.",
      "Se une **A con C**. Con centro en **C** y radio **CE** se marca **F** sobre AC.",
      "La **mediatriz de AF** corta al eje mayor en **O₁** y al menor en **O₂**: son los **centros** de los arcos. Se obtienen los simétricos.",
      "Con centro **O₁** (y su simétrico) y radio O₁A se trazan los **arcos pequeños**; con **O₂** y radio O₂C, los **arcos grandes**. Los enlaces están en las rectas que unen los centros.",
    ],
    render: (beat) => {
      const o1 = sc(X1, 0);
      const o2 = sc(0, Y2);
      return (
        <Canvas>
          <Seg a={sc(-OA - 30, 0)} b={sc(OA + 30, 0)} color={MANIM.ink} width={2.5} />
          <Seg a={sc(0, -OB - 40)} b={sc(0, OB + 70)} color={MANIM.ink} width={2.5} />
          <Dot p={sc(0, 0)} r={4} />
          <Dot p={sc(AA[0], AA[1])} r={5} />
          <Dot p={sc(CC[0], CC[1])} r={5} />
          <Txt x={sc(-OA, 0)[0] - 4} y={sc(-OA, 0)[1] + 26} size={22}>A</Txt>
          <Txt x={sc(OA, 0)[0] + 4} y={sc(OA, 0)[1] + 26} size={22}>B</Txt>
          <Txt x={sc(0, OB)[0] + 22} y={sc(0, OB)[1] + 4} size={22}>C</Txt>
          <Txt x={sc(0, -OB)[0] + 22} y={sc(0, -OB)[1] + 4} size={22}>D</Txt>
          <Txt x={sc(0, 0)[0] + 18} y={sc(0, 0)[1] + 24} size={20}>O</Txt>
          <ArcStroke c={sc(0, 0)} r={OA} a0={180} a1={90} show={beat >= 1} color={MANIM.orange} width={3} />
          <Fade show={beat >= 1}>
            <Dot p={sc(0, OA)} color={MANIM.orange} r={5} />
            <Txt x={sc(0, OA)[0] + 20} y={sc(0, OA)[1] + 6} size={22} color={MANIM.orange}>E</Txt>
          </Fade>
          <ArcStroke c={sc(CC[0], CC[1])} r={CE} a0={90} a1={A_CF} show={beat >= 2} color={MANIM.purple} width={3} />
          <Fade show={beat >= 2}>
            <Seg a={sc(AA[0], AA[1])} b={sc(CC[0], CC[1])} color={MANIM.blue} width={2.5} />
            <Dot p={sc(FF[0], FF[1])} color={MANIM.purple} r={5} />
            <Txt x={sc(FF[0], FF[1])[0] - 6} y={sc(FF[0], FF[1])[1] - 14} size={22} color={MANIM.purple}>F</Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Seg a={o1} b={o2} color={MANIM.green} width={2.5} dashed />
            <Dot p={o1} color={MANIM.green} r={6} />
            <Dot p={o2} color={MANIM.green} r={6} />
            <Txt x={o1[0] - 4} y={o1[1] + 28} size={20} color={MANIM.green}>O₁</Txt>
            <Txt x={o2[0] + 24} y={o2[1] + 4} size={20} color={MANIM.green}>O₂</Txt>
          </Fade>
          <ArcStroke c={sc(XC, 0)} r={RP} a0={-JR} a1={JR} show={beat >= 4} color={MANIM.purple} width={4.5} />
          <ArcStroke c={sc(-XC, 0)} r={RP} a0={180 - JR} a1={180 + JR} show={beat >= 4} color={MANIM.purple} width={4.5} />
          <ArcStroke c={sc(0, -YC)} r={RG} a0={JR} a1={180 - JR} show={beat >= 4} color={MANIM.green} width={4.5} />
          <ArcStroke c={sc(0, YC)} r={RG} a0={180 + JR} a1={360 - JR} show={beat >= 4} color={MANIM.green} width={4.5} />
        </Canvas>
      );
    },
  };
}
