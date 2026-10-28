import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Perspectiva cónica frontal de un cubo ───────────── */

const LTY = 340;
const LHY = 170;
const PF: Pt = [480, LHY];
const A: Pt = [200, LTY];
const B: Pt = [340, LTY];
const C: Pt = [340, 200];
const D: Pt = [200, 200];
const K = 0.6;
const back = (p: Pt): Pt => [PF[0] + K * (p[0] - PF[0]), PF[1] + K * (p[1] - PF[1])];
const A2 = back(A);
const B2 = back(B);
const C2 = back(C);
const D2 = back(D);
const pts = (a: Pt[]) => a.map((p) => p.join(",")).join(" ");

export function buildPerspectivaFrontal(): AnimBuild {
  return {
    label: "Perspectiva cónica frontal de un cubo con un punto de fuga",
    beatMs: 5400,
    captions: [
      "Se dibuja la **línea de tierra (LT)** y la **línea del horizonte (LH)**, a la altura de los ojos. El **punto principal P**, en la LH, es el **punto de fuga** de las rectas perpendiculares al cuadro.",
      "La cara **paralela al cuadro** se dibuja **en verdadera forma**: aquí un cuadrado apoyado en la LT.",
      "Las aristas **perpendiculares al cuadro** se dirigen al **punto de fuga P**: de cada vértice sale una recta hacia P.",
      "La **cara posterior** es otro cuadrado **semejante y menor** (reducido por la distancia): sus lados son paralelos a los de la cara anterior.",
      "Se unen los vértices y se separan las **aristas vistas** de las **ocultas** (a trazos): resulta la perspectiva **frontal** del cubo.",
    ],
    render: (beat) => (
      <Canvas>
        <Seg a={[40, LTY]} b={[760, LTY]} color={MANIM.ink} width={3} />
        <Txt x={730} y={LTY + 26} size={20} color={MANIM.muted}>LT</Txt>
        <Seg a={[40, LHY]} b={[760, LHY]} color={MANIM.yellow} width={2.5} dashed />
        <Txt x={730} y={LHY - 10} size={20} color={MANIM.yellow}>LH</Txt>
        <Dot p={PF} color={MANIM.yellow} r={7} />
        <Txt x={PF[0]} y={PF[1] - 16} size={22} color={MANIM.yellow}>P</Txt>
        <Fade show={beat >= 1}>
          <polygon points={pts([A, B, C, D])} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.ink} strokeWidth={3.5} strokeLinejoin="round" />
        </Fade>
        <Fade show={beat >= 2}>
          {[A, B, C, D].map((p, i) => (
            <Seg key={i} a={p} b={PF} color={MANIM.purple} width={2} dashed />
          ))}
        </Fade>
        <Fade show={beat >= 3}>
          <polygon points={pts([A2, B2, C2, D2])} fill="none" stroke={MANIM.orange} strokeWidth={3} strokeLinejoin="round" />
        </Fade>
        <Fade show={beat >= 4}>
          <polygon points={pts([D, C, C2, D2])} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.ink} strokeWidth={3} strokeLinejoin="round" />
          <polygon points={pts([B, B2, C2, C])} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.ink} strokeWidth={3} strokeLinejoin="round" />
          <Seg a={A} b={A2} color={MANIM.muted} width={2} dashed />
          <Seg a={A2} b={B2} color={MANIM.muted} width={2} dashed />
          <Seg a={A2} b={D2} color={MANIM.muted} width={2} dashed />
        </Fade>
      </Canvas>
    ),
  };
}
