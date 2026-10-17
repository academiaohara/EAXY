import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmt } from "@/components/lesson/anim/format";

const BOX_W = 74;
const BOX_GAP = 14;

/** Criterio del 11: suma de cifras en posiciones impares menos suma en posiciones pares. */
export function buildCriterioAlternada(params: { n?: number }): AnimBuild {
  const n = params.n ?? 2915;
  const digits = String(n).split("").map(Number);
  const len = digits.length;
  const pos = (i: number) => len - i; // posición contando desde la derecha
  const isOdd = (i: number) => pos(i) % 2 === 1;
  const odd = digits.filter((_, i) => isOdd(i));
  const even = digits.filter((_, i) => !isOdd(i));
  const sOdd = odd.reduce((x, y) => x + y, 0);
  const sEven = even.reduce((x, y) => x + y, 0);
  const diff = sOdd - sEven;
  const ok = diff % 11 === 0;
  const rowW = len * BOX_W + (len - 1) * BOX_GAP;
  const boxX = (i: number) => 400 - rowW / 2 + i * (BOX_W + BOX_GAP);
  const sumTxt = (xs: number[]) => xs.join(" + ");

  return {
    label: `Criterio del 11 aplicado a ${fmt(n)}: suma de posiciones impares menos pares`,
    captions: [
      `¿Es **${fmt(n)}** divisible entre $11$? Numeramos las cifras **de derecha a izquierda**: posición $1, 2, 3\\dots$`,
      `Separamos las cifras en **posición impar** (azul) y en **posición par** (naranja).`,
      `Sumamos cada grupo: $${sumTxt(odd)} = ${sOdd}$ y $${sumTxt(even)} = ${sEven}$.`,
      ok
        ? `Restamos: $${sOdd} - ${sEven} = ${diff}$, ${diff === 0 ? "que es $0$" : "múltiplo de $11$"}. Por tanto ${fmt(n)} **es divisible** entre $11$.`
        : `Restamos: $${sOdd} - ${sEven} = ${diff}$, que no es $0$ ni múltiplo de $11$. Por tanto ${fmt(n)} **no es divisible** entre $11$.`,
    ],
    render: (beat) => (
      <Canvas>
        {digits.map((d, i) => {
          const color = beat >= 1 ? (isOdd(i) ? MANIM.blue : MANIM.orange) : MANIM.ink;
          return (
            <g key={i}>
              <rect
                x={boxX(i)}
                y={70}
                width={BOX_W}
                height={90}
                rx={12}
                fill="rgba(255,255,255,0.04)"
                stroke={color}
                strokeWidth={3}
                className="anim-t"
              />
              <Txt x={boxX(i) + BOX_W / 2} y={132} size={52} color={color}>{d}</Txt>
              <Txt x={boxX(i) + BOX_W / 2} y={190} size={22} color={MANIM.muted}>{`pos. ${pos(i)}`}</Txt>
            </g>
          );
        })}
        <Fade show={beat >= 2} dy={12}>
          <Txt x={230} y={270} size={22} color={MANIM.blue}>impares</Txt>
          <Txt x={230} y={314} size={34} color={MANIM.blue}>{`${sumTxt(odd)} = ${sOdd}`}</Txt>
          <Txt x={570} y={270} size={22} color={MANIM.orange}>pares</Txt>
          <Txt x={570} y={314} size={34} color={MANIM.orange}>{`${sumTxt(even)} = ${sEven}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={12}>
          <Txt x={400} y={380} size={34} color={ok ? MANIM.green : MANIM.red}>
            {`${sOdd} − ${sEven} = ${diff}${ok ? (diff === 0 ? "  →  divisible" : "  →  múltiplo de 11") : "  →  no es múltiplo de 11"}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
