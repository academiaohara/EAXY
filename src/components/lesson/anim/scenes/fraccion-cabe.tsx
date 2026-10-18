import type { ReactNode } from "react";
import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { FractionBar, Subdivision } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import { gcd, lcm } from "@/components/lesson/anim/number-theory";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 100;
const W = 600;
const H = 50;

/**
 * Dividir fracciones como «cuántas veces cabe»: con trozos del mismo tamaño
 * basta contar cuántos trozos del divisor caben en el dividendo.
 */
export function buildFraccionCabe(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const a = params.a ?? 3;
  const b = params.b ?? 4;
  const c = params.c ?? 3;
  const d = params.d ?? 8;
  const m = lcm(b, d);
  const x = (a * m) / b;
  const y = (c * m) / d;
  const whole = Math.floor(x / y);
  const rest = x - whole * y;
  const num = a * d;
  const den = b * c;
  const g = gcd(num, den) || 1;
  const cell = W / m;
  const trozos = (n: number) => `${n} ${n === 1 ? "trozo" : "trozos"}`;

  const pieces: ReactNode[] = [];
  for (let i = 0; i < whole; i += 1) {
    pieces.push(
      <g key={i}>
        <rect x={X0 + i * y * cell} y={290} width={y * cell} height={H} fill={MANIM.green} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={3} rx={3} />
        <Txt x={X0 + i * y * cell + (y * cell) / 2} y={324} size={24}>
          {String(i + 1)}
        </Txt>
      </g>,
    );
  }
  if (rest > 0) {
    pieces.push(
      <rect key="rest" x={X0 + whole * y * cell} y={290} width={rest * cell} height={H} fill="none" stroke={MANIM.red} strokeWidth={3} strokeDasharray="8 6" rx={3} />,
    );
  }
  const exact = rest === 0;
  const tail = den / g === 1 ? `${num / g}` : `${num / g}/${den / g}`;

  return {
    label: `${a}/${b} : ${c}/${d} como cuántas veces cabe ${c}/${d} en ${a}/${b}`,
    captions: [
      `**Dividir** $\\dfrac{${a}}{${b}} : \\dfrac{${c}}{${d}}$ es preguntar: ¿cuántas veces **cabe** $\\dfrac{${c}}{${d}}$ en $\\dfrac{${a}}{${b}}$?`,
      `Para compararlos hace falta medir con el mismo trozo: cortamos las dos barras en **${m}** partes.`,
      `$\\dfrac{${a}}{${b}} = \\dfrac{${x}}{${m}}$ y $\\dfrac{${c}}{${d}} = \\dfrac{${y}}{${m}}$: son ${trozos(x)} y ${trozos(y)} del mismo tamaño.`,
      exact
        ? `Cabe **${whole}** veces: $${x} : ${y} = ${whole}$. Y por el camino corto: $\\dfrac{${a} \\cdot ${d}}{${b} \\cdot ${c}} = \\dfrac{${num}}{${den}}${g > 1 ? ` = ${tail}` : ""}$.`
        : `Caben **${whole}** veces y sobra un trozo: el cociente es $${x} : ${y} = \\dfrac{${num / g}}{${den / g}}$, que es $\\dfrac{${a} \\cdot ${d}}{${b} \\cdot ${c}}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <FractionBar x={X0} y={50} unitW={W} h={H} den={b} shaded={a} color={MANIM.blue} />
        <Subdivision show={beat >= 1} x={X0} y={50} unitW={W} h={H} parts={m} existing={b} />
        <Txt x={X0 - 40} y={86} size={26} color={MANIM.blue}>{`${a}/${b}`}</Txt>
        <FractionBar x={X0} y={150} unitW={W} h={H} den={d} shaded={c} color={MANIM.green} />
        <Subdivision show={beat >= 1} x={X0} y={150} unitW={W} h={H} parts={m} existing={d} />
        <Txt x={X0 - 40} y={186} size={26} color={MANIM.green}>{`${c}/${d}`}</Txt>
        <Fade show={beat >= 2} dy={-6}>
          <Txt x={X0 + (x * cell) / 2} y={42} size={22} color={MANIM.blue}>{trozos(x)}</Txt>
          <Txt x={X0} y={142} size={22} color={MANIM.green} anchor="start">
            {trozos(y)}
          </Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          {pieces}
          <HBrace show x1={X0} x2={X0 + x * cell} y={350} dir="down" color={MANIM.blue} label={exact ? `cabe ${whole} veces` : `${whole} veces y un resto`} labelSize={24} />
        </Fade>
      </Canvas>
    ),
  };
}
