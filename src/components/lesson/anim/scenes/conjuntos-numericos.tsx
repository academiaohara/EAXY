import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Los conjuntos numéricos anidados: ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ, con los irracionales completando ℝ. */
export function buildConjuntosNumericos(): AnimBuild {
  return {
    label: "Conjuntos numéricos: naturales dentro de enteros, dentro de racionales; racionales e irracionales forman los reales",
    captions: [
      "Los **naturales** $\\mathbb{N}$: $0, 4, 24, \\sqrt{121} = 11$…",
      "Con los negativos, los **enteros** $\\mathbb{Z}$. Todo natural es entero: $\\mathbb{N} \\subset \\mathbb{Z}$.",
      "Con las fracciones, los **racionales** $\\mathbb{Q}$ (decimales exactos o periódicos). $\\mathbb{Z} \\subset \\mathbb{Q}$.",
      "Fuera de $\\mathbb{Q}$ quedan los **irracionales**: $\\sqrt{2}$, $\\pi$, $\\Phi$… decimales infinitos sin periodo.",
      "Racionales e irracionales juntos forman los **números reales** $\\mathbb{R}$: llenan toda la recta.",
    ],
    beatMs: 4000,
    render: (beat) => (
      <Canvas>
        <Fade show={beat >= 4}>
          <rect x={24} y={20} width={752} height={380} rx={28} fill={MANIM.purple} fillOpacity={0.08} stroke={MANIM.purple} strokeWidth={3} />
          <Txt x={60} y={62} size={30} color={MANIM.purple} anchor="start">ℝ  reales</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <ellipse cx={290} cy={215} rx={250} ry={165} fill={MANIM.green} fillOpacity={0.1} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={290} y={82} size={26} color={MANIM.green}>ℚ  racionales</Txt>
          <Txt x={290} y={330} size={22} color={MANIM.green}>0,3  ·  1/3  ·  −1/2</Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <ellipse cx={290} cy={225} rx={170} ry={105} fill={MANIM.orange} fillOpacity={0.1} stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={290} y={152} size={24} color={MANIM.orange}>ℤ  enteros</Txt>
          <Txt x={290} y={262} size={22} color={MANIM.orange}>−5  ·  −11  ·  −3</Txt>
        </Fade>
        <ellipse cx={290} cy={205} rx={88} ry={46} fill={MANIM.blue} fillOpacity={0.16} stroke={MANIM.blue} strokeWidth={3} />
        <Txt x={290} y={198} size={24} color={MANIM.blue}>ℕ  naturales</Txt>
        <Txt x={290} y={226} size={20} color={MANIM.blue}>0 · 4 · 24 · 11</Txt>
        <Fade show={beat >= 3} dx={20}>
          <rect x={560} y={110} width={190} height={210} rx={20} fill={MANIM.red} fillOpacity={0.12} stroke={MANIM.red} strokeWidth={3} />
          <Txt x={655} y={152} size={24} color={MANIM.red}>irracionales</Txt>
          <Txt x={655} y={206} size={28} color={MANIM.ink}>√2</Txt>
          <Txt x={655} y={246} size={28} color={MANIM.ink}>π</Txt>
          <Txt x={655} y={286} size={28} color={MANIM.ink}>Φ</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
