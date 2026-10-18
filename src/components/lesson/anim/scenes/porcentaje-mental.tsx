import { Canvas, Fade, HBrace, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const X0 = 60;
const W = 680;
const Y = 90;
const H = 64;

/**
 * Cálculo mental: la barra del total `a` se parte en 10 (cada trozo es el 10 % = a : 10),
 * la mitad de un trozo es el 5 % y juntando trozos se llega al 15 %.
 */
export function buildPorcentajeMental(params: { a?: number }): AnimBuild {
  const total = params.a ?? 260;
  const tenth = total / 10;
  const half = tenth / 2;
  const fifteen = tenth + half;
  const piece = W / 10;

  const captions = [
    `Se parte de **${numEs(total)}**, que es el **100 %**.`,
    `Se parte la barra en **10 trozos iguales**: cada uno es el 10 %.`,
    `El **10 %** es un trozo: $${numTex(total)} : 10 = ${numTex(tenth)}$. Basta con dividir entre 10.`,
    `El **5 %** es la mitad del 10 %: $${numTex(tenth)} : 2 = ${numTex(half)}$.`,
    `Con trozos se llega a más porcentajes: $10\\% + 5\\% = 15\\%$, es decir, $${numTex(tenth)} + ${numTex(half)} = ${numTex(fifteen)}$.`,
  ];

  const text = (show: boolean, str: string, color: string) => (
    <Fade show={show} dy={8}>
      <Txt x={400} y={330} size={32} color={color}>{str}</Txt>
    </Fade>
  );

  return {
    label: `Porcentajes de cabeza con ${numEs(total)}: el 10 % es ${numEs(tenth)}, el 5 % es ${numEs(half)} y el 15 % es ${numEs(fifteen)}`,
    captions,
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <Fade show dy={-10}>
          <rect x={X0} y={Y} width={W} height={H} rx={8} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={2.5} />
          <Txt x={X0 + W / 2} y={Y - 14} size={24} color={MANIM.blue}>{`${numEs(total)}  ·  100 %`}</Txt>
        </Fade>

        {Array.from({ length: 9 }, (_, i) => (
          <WriteLine key={i} show={beat >= 1} x1={X0 + (i + 1) * piece} y1={Y} x2={X0 + (i + 1) * piece} y2={Y + H} color={MANIM.ink} width={2} delay={i * 60} />
        ))}

        <Fade show={beat >= 2}>
          <rect x={X0} y={Y} width={piece} height={H} rx={8} fill={MANIM.yellow} fillOpacity={beat >= 4 ? 0.85 : beat === 3 ? 0.35 : 0.85} stroke={MANIM.yellow} strokeWidth={2.5} className="anim-t" />
        </Fade>
        <Fade show={beat === 3}>
          <rect x={X0} y={Y} width={piece / 2} height={H} rx={8} fill={MANIM.orange} fillOpacity={0.9} />
        </Fade>
        <Fade show={beat >= 4}>
          <rect x={X0 + piece} y={Y} width={piece / 2} height={H} rx={8} fill={MANIM.orange} fillOpacity={0.9} />
        </Fade>

        <HBrace show={beat === 2} x1={X0} x2={X0 + piece} y={Y + H + 12} color={MANIM.yellow} label="10 %" />
        <HBrace show={beat === 3} x1={X0} x2={X0 + piece / 2} y={Y + H + 12} color={MANIM.orange} label="5 %" />
        <HBrace show={beat >= 4} x1={X0} x2={X0 + piece * 1.5} y={Y + H + 12} color={MANIM.green} label="15 %" />

        {text(beat === 1, "÷ 10", MANIM.muted)}
        {text(beat === 2, `10 % de ${numEs(total)} = ${numEs(total)} : 10 = ${numEs(tenth)}`, MANIM.yellow)}
        {text(beat === 3, `5 % = ${numEs(tenth)} : 2 = ${numEs(half)}`, MANIM.orange)}
        {text(beat >= 4, `15 % = ${numEs(tenth)} + ${numEs(half)} = ${numEs(fifteen)}`, MANIM.green)}
      </Canvas>
    ),
  };
}
