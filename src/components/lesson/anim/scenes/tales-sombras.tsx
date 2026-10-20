import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { RightMark, Seg, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const GROUND = 360;

/** Altura de un objeto con su sombra: un poste conocido y el objeto forman triángulos semejantes. */
export function buildTalesSombras(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = params.a ?? 2;
  const b = params.b ?? 1.5;
  const c = params.c ?? 6;
  const h = (a * c) / b;
  const ps = Math.min(240 / c, 320 / h);
  const X1 = 330;
  const top1: Pt = [X1, GROUND - h * ps];
  const tip1: Pt = [X1 + c * ps, GROUND];
  const X2 = tip1[0] + 70;
  const top2: Pt = [X2, GROUND - a * ps];
  const tip2: Pt = [X2 + b * ps, GROUND];
  const alpha1: Pt = [tip1[0] - 34, GROUND - 10];
  const alpha2: Pt = [tip2[0] + 20, GROUND - 6];

  return {
    label: `Teorema de Tales: altura de un árbol de sombra ${numEs(c)} m con un poste de ${numEs(a)} m y sombra ${numEs(b)} m`,
    beatMs: 3200,
    captions: [
      `A la misma hora, un poste de $${numTex(a)}$ m da una sombra de $${numTex(b)}$ m y un árbol da una sombra de $${numTex(c)}$ m. ¿Qué altura $h$ tiene el árbol?`,
      "Los rayos del sol son paralelos: forman el **mismo ángulo** $\\alpha$ con el suelo. Cada objeto y su sombra forman un triángulo rectángulo.",
      "Dos triángulos rectángulos con el mismo ángulo agudo son **semejantes** (**Teorema de Tales**): sus lados son proporcionales.",
      `$\\dfrac{h}{${numTex(c)}} = \\dfrac{${numTex(a)}}{${numTex(b)}}$: la altura entre la sombra es la misma razón en los dos triángulos.`,
      `$h = \\dfrac{${numTex(a)} \\cdot ${numTex(c)}}{${numTex(b)}} = ${numTex(h)}$ m. El árbol mide $${numTex(h)}$ m.`,
    ],
    render: (beat) => (
      <Canvas>
        <line x1={20} y1={GROUND} x2={780} y2={GROUND} stroke={MANIM.muted} strokeWidth={3} />
        <Seg a={[X1, GROUND]} b={top1} color={MANIM.blue} width={8} />
        <Seg a={[X2, GROUND]} b={top2} color={MANIM.green} width={8} />
        <Seg a={[X1, GROUND]} b={tip1} color={MANIM.blue} width={5} dashed />
        <Seg a={[X2, GROUND]} b={tip2} color={MANIM.green} width={5} dashed />
        <Txt x={X1 - 20} y={(top1[1] + GROUND) / 2} size={28} color={MANIM.blue} anchor="end">h = ?</Txt>
        <Txt x={X1 + (c * ps) / 2} y={GROUND + 34} size={24} color={MANIM.blue}>{`${numEs(c)} m`}</Txt>
        <Txt x={tip2[0] + 46} y={top2[1] + 6} size={24} color={MANIM.green}>{`${numEs(a)} m`}</Txt>
        <Txt x={X2 + (b * ps) / 2} y={GROUND + 34} size={24} color={MANIM.green}>{`${numEs(b)} m`}</Txt>

        <Seg a={top1} b={tip1} color={MANIM.yellow} width={4} dashed show={beat >= 1} />
        <Seg a={top2} b={tip2} color={MANIM.yellow} width={4} dashed show={beat >= 1} />
        <Fade show={beat >= 1}>
          <RightMark v={[X1, GROUND]} a={0} b={90} size={16} />
          <RightMark v={[X2, GROUND]} a={0} b={90} size={12} />
          <Txt x={alpha1[0]} y={alpha1[1]} size={26} color={MANIM.yellow}>α</Txt>
          <Txt x={alpha2[0]} y={alpha2[1] - 4} size={22} color={MANIM.yellow}>α</Txt>
        </Fade>
        <Fade show={beat === 2} dy={8}>
          <Txt x={20} y={70} size={26} color={MANIM.purple} anchor="start">mismos ángulos</Txt>
          <Txt x={20} y={104} size={26} color={MANIM.purple} anchor="start">→ triángulos semejantes</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={20} y={70} size={30} color={MANIM.yellow} anchor="start">{`h / ${numEs(c)} = ${numEs(a)} / ${numEs(b)}`}</Txt>
        </Fade>
        <Fade show={beat >= 4} dy={8}>
          <Txt x={20} y={116} size={32} color={MANIM.green} anchor="start">{`h = ${numEs(h)} m`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
