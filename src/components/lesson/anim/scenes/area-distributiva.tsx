import { Canvas, Fade, HBrace, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 190;
const Y0 = 120;
const H = 220;
const W_TOTAL = 420;

/** Propiedad distributiva con el modelo de áreas: a·(b+c) = a·b + a·c. */
export function buildAreaDistributiva(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = params.a ?? 15;
  const b = params.b ?? 4;
  const c = params.c ?? 3;
  const wb = (b / (b + c)) * W_TOTAL;
  const wc = W_TOTAL - wb;
  const ab = a * b;
  const ac = a * c;

  return {
    label: `${a} · (${b} + ${c}) = ${a} · ${b} + ${a} · ${c} = ${ab + ac}, con áreas de rectángulos`,
    captions: [
      `Un rectángulo de **${a}** de alto y **${b} + ${c}** de ancho. Su área es $${a} \\cdot (${b} + ${c})$.`,
      `Lo cortamos en dos: un trozo de ancho **${b}** y otro de ancho **${c}**.`,
      `Cada trozo tiene su área: $${a} \\cdot ${b} = ${ab}$ y $${a} \\cdot ${c} = ${ac}$.`,
      `Es el mismo rectángulo, así que **da igual** calcularlo entero o por trozos: $${a} \\cdot (${b} + ${c}) = ${a} \\cdot ${b} + ${a} \\cdot ${c} = ${ab + ac}$.`,
    ],
    render: (beat) => (
      <Canvas>
        {/* rectángulo completo */}
        <rect x={X0} y={Y0} width={W_TOTAL} height={H} rx={6} fill={MANIM.blue} fillOpacity={beat === 0 ? 0.35 : 0} stroke={MANIM.ink} strokeWidth={3} className="anim-t" />
        {/* trozos */}
        <rect x={X0} y={Y0} width={wb} height={H} rx={6} fill={MANIM.blue} fillOpacity={beat >= 1 ? 0.45 : 0} className="anim-t" />
        <rect x={X0 + wb} y={Y0} width={wc} height={H} rx={6} fill={MANIM.green} fillOpacity={beat >= 1 ? 0.45 : 0} className="anim-t" />
        <WriteLine show={beat >= 1} x1={X0 + wb} y1={Y0 - 6} x2={X0 + wb} y2={Y0 + H + 6} color={MANIM.yellow} width={4} />
        {/* altura */}
        <Fade show dx={-6}>
          <path d={`M ${X0 - 22} ${Y0} Q ${X0 - 34} ${Y0} ${X0 - 34} ${Y0 + 14} L ${X0 - 34} ${Y0 + H / 2 - 12} Q ${X0 - 34} ${Y0 + H / 2} ${X0 - 46} ${Y0 + H / 2} Q ${X0 - 34} ${Y0 + H / 2} ${X0 - 34} ${Y0 + H / 2 + 12} L ${X0 - 34} ${Y0 + H - 14} Q ${X0 - 34} ${Y0 + H} ${X0 - 22} ${Y0 + H}`} fill="none" stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={X0 - 70} y={Y0 + H / 2 + 10} size={30} color={MANIM.orange}>
            {String(a)}
          </Txt>
        </Fade>
        {/* anchuras */}
        <HBrace show={beat === 0} x1={X0} x2={X0 + W_TOTAL} y={Y0 - 20} dir="up" color={MANIM.yellow} label={`${b} + ${c}`} />
        <HBrace show={beat >= 1} x1={X0} x2={X0 + wb - 4} y={Y0 - 20} dir="up" color={MANIM.blue} label={String(b)} />
        <HBrace show={beat >= 1} x1={X0 + wb + 4} x2={X0 + W_TOTAL} y={Y0 - 20} dir="up" color={MANIM.green} label={String(c)} delay={150} />
        {/* áreas */}
        <Fade show={beat >= 2} scale={0.8}>
          <Txt x={X0 + wb / 2} y={Y0 + H / 2 - 4} size={26} color={MANIM.ink}>
            {`${a} · ${b}`}
          </Txt>
          <Txt x={X0 + wb / 2} y={Y0 + H / 2 + 32} size={32} color={MANIM.blue}>
            {String(ab)}
          </Txt>
        </Fade>
        <Fade show={beat >= 2} scale={0.8} delay={200}>
          <Txt x={X0 + wb + wc / 2} y={Y0 + H / 2 - 4} size={26} color={MANIM.ink}>
            {`${a} · ${c}`}
          </Txt>
          <Txt x={X0 + wb + wc / 2} y={Y0 + H / 2 + 32} size={32} color={MANIM.green}>
            {String(ac)}
          </Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={398} size={30} color={MANIM.yellow}>
            {`${a} · (${b} + ${c}) = ${ab} + ${ac} = ${ab + ac}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
