import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const pill = (x: number, y: number, w: number, label: string, color: string, key: string) => (
  <g key={key}>
    <rect x={x - w / 2} y={y - 26} width={w} height={52} rx={26} fill={color} fillOpacity={0.15} stroke={color} strokeWidth={3} />
    <Txt x={x} y={y + 9} size={26} color={color}>{label}</Txt>
  </g>
);

/** Suma de radicales: solo se juntan los idénticos; a veces hay que extraer factores antes. */
export function buildRadicalesSemejantes(): AnimBuild {
  return {
    label: "Suma de radicales: 7√5 + 11√5 − √5 = 17√5; √2 + √3 no se junta; √32 + √18 − √50 = 2√2",
    captions: [
      "Como sumar «cosas iguales»: $7\\sqrt{5}$ son 7 veces $\\sqrt{5}$, $11\\sqrt{5}$ son 11 veces, y $-\\sqrt{5}$ quita una.",
      "Los radicales **idénticos** se suman como términos semejantes: $7 + 11 - 1 = 17$, es decir, $17\\sqrt{5}$.",
      "Radicales **distintos** no se pueden juntar: $\\sqrt{2} + \\sqrt{3}$ se deja indicado (o se aproxima).",
      "A veces la semejanza está **oculta**: $\\sqrt{32} + \\sqrt{18} - \\sqrt{50}$ parecen distintos…",
      "…pero al extraer factores: $\\sqrt{32} = 4\\sqrt{2}$, $\\sqrt{18} = 3\\sqrt{2}$, $\\sqrt{50} = 5\\sqrt{2}$.",
      "Ahora son idénticos: $4\\sqrt{2} + 3\\sqrt{2} - 5\\sqrt{2} = 2\\sqrt{2}$.",
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 1}>
          {pill(170, 90, 150, "7√5", MANIM.blue, "a")}
          <Txt x={272} y={100} size={30} color={MANIM.ink}>+</Txt>
          {pill(380, 90, 160, "11√5", MANIM.blue, "b")}
          <Txt x={490} y={100} size={30} color={MANIM.ink}>−</Txt>
          {pill(590, 90, 130, "√5", MANIM.red, "c")}
        </Fade>
        <Fade show={beat === 1} dy={12}>
          <Txt x={400} y={170} size={28} color={MANIM.muted}>7 + 11 − 1 = 17</Txt>
          {pill(400, 240, 220, "17√5", MANIM.green, "d")}
        </Fade>
        <Fade show={beat === 2} dy={12}>
          {pill(250, 190, 150, "√2", MANIM.orange, "e")}
          <Txt x={400} y={200} size={34} color={MANIM.ink}>+</Txt>
          {pill(550, 190, 150, "√3", MANIM.purple, "f")}
          <Txt x={400} y={290} size={26} color={MANIM.red}>no se pueden unir</Txt>
        </Fade>
        <Fade show={beat === 3} dy={12}>
          {pill(200, 190, 170, "√32", MANIM.orange, "g")}
          <Txt x={310} y={200} size={30} color={MANIM.ink}>+</Txt>
          {pill(410, 190, 170, "√18", MANIM.orange, "h")}
          <Txt x={520} y={200} size={30} color={MANIM.ink}>−</Txt>
          {pill(620, 190, 170, "√50", MANIM.orange, "i")}
        </Fade>
        <Fade show={beat >= 4} dy={12}>
          {pill(200, 120, 170, "4√2", MANIM.orange, "j")}
          <Txt x={310} y={130} size={30} color={MANIM.ink}>+</Txt>
          {pill(410, 120, 170, "3√2", MANIM.orange, "k")}
          <Txt x={520} y={130} size={30} color={MANIM.ink}>−</Txt>
          {pill(620, 120, 170, "5√2", MANIM.orange, "l")}
        </Fade>
        <Fade show={beat >= 5} dy={12}>
          <Txt x={400} y={230} size={28} color={MANIM.muted}>4 + 3 − 5 = 2</Txt>
          {pill(400, 310, 230, "2√2", MANIM.green, "m")}
        </Fade>
      </Canvas>
    ),
  };
}
