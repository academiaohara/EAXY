import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { RightMark, Seg, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

/** Dos triángulos rectángulos semejantes: cada lado del grande es k veces el correspondiente del pequeño. */
export function buildSemejanzaFiguras(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = params.a ?? 3;
  const b = params.b ?? 4;
  const k = params.c ?? 2;
  const u = Math.min(40, 520 / ((1 + k) * b), 290 / (k * a));
  const base = 370;
  const R1: Pt = [70, base];
  const R2: Pt = [R1[0] + b * u + 90, base];
  const tri = (R: Pt, s: number) => ({
    R,
    P: [R[0] + b * u * s, R[1]] as Pt,
    Q: [R[0], R[1] - a * u * s] as Pt,
  });
  const T1 = tri(R1, 1);
  const T2 = tri(R2, k);
  const pts = (t: ReturnType<typeof tri>) => `${t.R[0]},${t.R[1]} ${t.P[0]},${t.P[1]} ${t.Q[0]},${t.Q[1]}`;

  return {
    label: "Dos triángulos semejantes con razón de semejanza " + numEs(k),
    beatMs: 3200,
    captions: [
      "Dos figuras son **semejantes** cuando tienen la misma forma y solo difieren en el tamaño.",
      `Los lados horizontales: $${numEs(b)}$ y $${numEs(k * b)}$. Cada longitud del grande se obtiene multiplicando la del pequeño por un número fijo.`,
      `Los lados verticales: $${numEs(a)}$ y $${numEs(k * a)}$. Se cumple lo mismo.`,
      `$\\dfrac{${numEs(k * b)}}{${numEs(b)}} = \\dfrac{${numEs(k * a)}}{${numEs(a)}} = ${numEs(k)}$: los lados correspondientes son **proporcionales** y ${numEs(k)} es la **razón de semejanza**.`,
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={pts(T1)} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        <polygon points={pts(T2)} fill={MANIM.orange} fillOpacity={0.2} stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        <RightMark v={T1.R} a={0} b={90} size={14} />
        <RightMark v={T2.R} a={0} b={90} size={16} />
        <Seg a={T1.R} b={T1.P} color={MANIM.blue} width={6} show={beat === 1 || beat === 3} />
        <Seg a={T2.R} b={T2.P} color={MANIM.blue} width={6} show={beat === 1 || beat === 3} />
        <Seg a={T1.R} b={T1.Q} color={MANIM.green} width={6} show={beat === 2 || beat === 3} />
        <Seg a={T2.R} b={T2.Q} color={MANIM.green} width={6} show={beat === 2 || beat === 3} />
        <Fade show={beat >= 1}>
          <Txt x={T1.R[0] + (b * u) / 2} y={base + 32} size={26} color={MANIM.blue}>{numEs(b)}</Txt>
          <Txt x={T2.R[0] + (k * b * u) / 2} y={base + 32} size={26} color={MANIM.blue}>{numEs(k * b)}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={T1.R[0] - 26} y={T1.R[1] - (a * u) / 2} size={26} color={MANIM.green}>{numEs(a)}</Txt>
          <Txt x={T2.R[0] - 26} y={T2.R[1] - (k * a * u) / 2} size={26} color={MANIM.green}>{numEs(k * a)}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={560} y={100} size={28} color={MANIM.yellow}>{`razón de semejanza = ${numEs(k)}`}</Txt>
          <Txt x={560} y={140} size={24} color={MANIM.muted}>{`${numEs(k * b)} : ${numEs(b)} = ${numEs(k * a)} : ${numEs(a)}`}</Txt>
        </Fade>
        <Fade show={beat === 0}>
          <Txt x={T1.R[0] + (b * u) / 2} y={T1.Q[1] - 18} size={22} color={MANIM.muted}>pequeño</Txt>
          <Txt x={T2.R[0] + (k * b * u) / 2} y={T2.Q[1] - 18} size={22} color={MANIM.muted}>grande</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
