import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { Frac } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import { divisors, gcd, smallestPrimeFactor } from "@/components/lesson/anim/number-theory";
import type { AnimBuild } from "@/components/lesson/anim/types";

const BAR_W = 210;
const BAR_H = 42;
const FRAC_Y = 150;
const BAR_Y = 245;
const COLORS = [MANIM.blue, MANIM.green, MANIM.purple, MANIM.orange];

type Link = { n: number; d: number; by: number };

/** Cadena de fracciones: en cada paso se divide entre el menor primo común. */
function chain(a: number, b: number): Link[] {
  const out: Link[] = [{ n: a, d: b, by: 1 }];
  let n = a;
  let d = b;
  for (let g = gcd(n, d); g > 1; g = gcd(n, d)) {
    const p = smallestPrimeFactor(g);
    n /= p;
    d /= p;
    out.push({ n, d, by: p });
  }
  return out;
}

const list = (n: number) => divisors(n).join(", ");

/**
 * Simplificar hasta la irreducible: se divide arriba y abajo entre un divisor común, la barra
 * (misma porción coloreada) se reagrupa en menos trozos, y se repite hasta que solo comparten el 1.
 * Al final, el atajo: dividir de una vez entre el m.c.d. (`a`/`b` con m.c.d. > 1).
 */
export function buildSimplificarIrreducible(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? 12;
  const b = params.b ?? 30;
  const links = chain(a, b);
  const steps = links.length - 1;
  const last = links[steps]!;
  const g = gcd(a, b);
  const shortcut = steps > 1;
  const xs = links.map((_, i) => (links.length === 1 ? 400 : 130 + (i * 540) / (links.length - 1)));
  const irredBeat = steps + 1;
  const mcdBeat = irredBeat + 1;

  const captions = [
    `Queremos simplificar $\\dfrac{${a}}{${b}}$. La barra muestra su valor: **${a}** de **${b}** trozos.`,
    ...links.slice(1).map(
      (l, i) =>
        `${i === 0 ? "Buscamos un divisor común" : "Seguimos: otro divisor común"}: **${l.by}**. Se divide **numerador y denominador** entre ${l.by}. Hay ${l.by} veces menos trozos, pero la parte coloreada es la misma: $\\dfrac{${links[i]!.n}}{${links[i]!.d}} = \\dfrac{${l.n}}{${l.d}}$.`,
    ),
    last.n === 1
      ? `Con numerador $1$ no hay más divisores comunes que el $1$: $\\dfrac{${last.n}}{${last.d}}$ es **irreducible**.`
      : `¿Se puede seguir? Divisores de $${last.n}$: ${list(last.n)}. Divisores de $${last.d}$: ${list(last.d)}. Solo comparten el $1$: la fracción es **irreducible**.`,
    ...(shortcut
      ? [`Atajo: el m.c.d.$(${a}, ${b}) = ${g}$ reúne todos los divisores usados. Dividir entre **${g}** de una vez da la misma irreducible: $\\dfrac{${a} : ${g}}{${b} : ${g}} = \\dfrac{${last.n}}{${last.d}}$.`]
      : []),
  ];

  return {
    label: `Simplificar ${a}/${b} dividiendo entre divisores comunes hasta llegar a ${last.n}/${last.d}, irreducible`,
    captions,
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        {links.map((l, i) => {
          const shown = beat >= i;
          const isLast = i === steps;
          const final = isLast && beat >= irredBeat;
          const color = final ? MANIM.yellow : MANIM.ink;
          const x = xs[i]!;
          const x0 = x - BAR_W / 2;
          const cell = BAR_W / l.d;
          return (
            <g key={i}>
              <Fade show={shown} dy={12}>
                <Frac x={x} y={FRAC_Y} n={l.n} d={l.d} size={46} color={color} />
                <rect x={x0} y={BAR_Y} width={BAR_W} height={BAR_H} rx={5} fill={MANIM.panel} />
                <rect x={x0} y={BAR_Y} width={(BAR_W * l.n) / l.d} height={BAR_H} rx={5} fill={final ? MANIM.yellow : COLORS[i % COLORS.length]} fillOpacity={0.85} />
                {l.d <= 40
                  ? Array.from({ length: l.d + 1 }, (_, k) => (
                      <line key={k} x1={x0 + k * cell} y1={BAR_Y} x2={x0 + k * cell} y2={BAR_Y + BAR_H} stroke={MANIM.surface} strokeWidth={k === 0 || k === l.d ? 2.5 : 1.2} />
                    ))
                  : null}
              </Fade>
              {i > 0 ? (
                <g>
                  <WriteLine show={beat >= i} x1={xs[i - 1]! + 62} y1={FRAC_Y - 4} x2={x - 62} y2={FRAC_Y - 4} color={MANIM.yellow} width={3.5} />
                  <Fade show={beat >= i} dy={6}>
                    <path d={`M ${x - 72} ${FRAC_Y - 14} L ${x - 62} ${FRAC_Y - 4} L ${x - 72} ${FRAC_Y + 6}`} fill="none" stroke={MANIM.yellow} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
                    <Txt x={(xs[i - 1]! + x) / 2} y={FRAC_Y - 22} size={28} color={MANIM.yellow}>
                      {`÷ ${l.by}`}
                    </Txt>
                    <Txt x={(xs[i - 1]! + x) / 2} y={FRAC_Y + 42} size={28} color={MANIM.yellow}>
                      {`÷ ${l.by}`}
                    </Txt>
                  </Fade>
                </g>
              ) : null}
            </g>
          );
        })}

        <Fade show={beat >= irredBeat && beat < mcdBeat} dy={10}>
          <Txt x={400} y={338} size={26} color={MANIM.muted}>
            {last.n === 1 ? `numerador 1: solo comparten el 1` : `mcd(${last.n}, ${last.d}) = 1`}
          </Txt>
          <Txt x={400} y={382} size={30} color={MANIM.yellow}>
            irreducible
          </Txt>
        </Fade>

        {shortcut ? (
          <Fade show={beat >= mcdBeat} dy={-10}>
            <path d={`M ${xs[0]} 92 C ${xs[0]} 14, ${xs[steps]} 14, ${xs[steps]} 92`} fill="none" stroke={MANIM.red} strokeWidth={3.5} strokeLinecap="round" />
            <path d={`M ${xs[steps]! - 9} 78 L ${xs[steps]} 94 L ${xs[steps]! + 9} 78`} fill="none" stroke={MANIM.red} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            <Txt x={400} y={76} size={26} color={MANIM.red}>
              {`÷ ${g} arriba y abajo (m.c.d.)`}
            </Txt>
            <Txt x={400} y={340} size={32} color={MANIM.ink}>
              {`${a}/${b} = ${last.n}/${last.d}`}
            </Txt>
          </Fade>
        ) : null}
      </Canvas>
    ),
  };
}
