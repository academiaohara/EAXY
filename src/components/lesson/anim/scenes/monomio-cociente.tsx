import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { mono } from "@/components/lesson/anim/algebra";
import type { AnimBuild } from "@/components/lesson/anim/types";

const LETTER_W = 56;
const COEF_W = 90;
const TOP = 140;
const BOT = 250;

/** `(a·x^c) : (b·x^d)`: se escribe como fracción, se tachan letras en parejas y se divide el coeficiente. */
export function buildMonomioCociente(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const b = Math.max(1, params.b ?? 2);
  const q = Math.max(1, Math.round((params.a ?? 6) / b));
  const a = q * b;
  const d = Math.max(1, Math.min(4, params.d ?? 1));
  const c = Math.max(d, Math.min(5, params.c ?? 3));
  const left = mono(a, c);
  const right = mono(b, d);
  const fin = mono(q, c - d);
  const rest = c - d;

  const wTop = COEF_W + c * LETTER_W;
  const xTop = 400 - wTop / 2;
  const wBot = COEF_W + d * LETTER_W;
  const xBot = xTop;
  const topX = (i: number) => xTop + COEF_W + LETTER_W * (i + 0.5);
  const botX = (i: number) => xBot + COEF_W + LETTER_W * (i + 0.5);

  const letter = (cx: number, cy: number, color: string, faded: boolean, key: string) => (
    <g key={key} className="anim-t" style={{ opacity: faded ? 0.25 : 1 }}>
      <circle cx={cx} cy={cy} r={22} fill={color} fillOpacity={0.92} />
      <Txt x={cx} y={cy + 9} size={26} color={MANIM.surface} weight={800}>
        x
      </Txt>
    </g>
  );

  return {
    label: `Cociente de monomios (${left}) : (${right}) = ${fin}: se dividen los coeficientes y se tachan letras por parejas`,
    captions: [
      `Dividimos $(${left}) : (${right})$. Una división se escribe como **fracción**.`,
      `Desarrollamos: arriba hay **${c}** letras $x$ y abajo **${d}**.`,
      `Cada $x$ de abajo se va con una $x$ de arriba: $x : x = 1$. Se tachan **${d}** parejas.`,
      `Coeficientes: $${a} : ${b} = ${q}$. Quedan $${c} - ${d} = ${rest}$ letras $x$: resultado $${rest === 0 ? q : `${q === 1 ? "" : q}x${rest > 1 ? `^{${rest}}` : ""}`}$.`,
    ],
    render: (beat) => {
      const expanded = beat >= 1;
      const cancelled = beat >= 2;
      const done = beat >= 3;
      return (
        <Canvas>
          <Fade show={!expanded}>
            <Txt x={400} y={150} size={64}>
              <tspan fill={MANIM.yellow}>{`(${left})`}</tspan>
              <tspan fill={MANIM.muted}> : </tspan>
              <tspan fill={MANIM.blue}>{`(${right})`}</tspan>
            </Txt>
          </Fade>
          <Fade show={expanded}>
            <Txt x={xTop + COEF_W / 2} y={TOP + 14} size={44} color={MANIM.yellow} weight={800}>
              {String(a)}
            </Txt>
            {Array.from({ length: c }, (_, i) => letter(topX(i), TOP, MANIM.red, cancelled && i < d, `t${i}`))}
            <line x1={Math.min(xTop, xBot) - 20} y1={195} x2={Math.max(xTop + wTop, xBot + wBot) + 20} y2={195} stroke={MANIM.ink} strokeWidth={4} strokeLinecap="round" />
            <Txt x={xBot + COEF_W / 2} y={BOT + 14} size={44} color={MANIM.blue} weight={800}>
              {String(b)}
            </Txt>
            {Array.from({ length: d }, (_, i) => letter(botX(i), BOT, MANIM.red, cancelled, `b${i}`))}
          </Fade>
          {Array.from({ length: d }, (_, i) => (
            <WriteLine key={`k${i}`} show={cancelled} x1={botX(i)} y1={BOT + 28} x2={topX(i)} y2={TOP - 28} color={MANIM.green} width={4} delay={i * 150} />
          ))}
          <Fade show={done} dy={8}>
            <Txt x={400} y={360} size={56} color={MANIM.green} weight={800}>
              {`${a} : ${b} = ${q}   →   ${fin}`}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
