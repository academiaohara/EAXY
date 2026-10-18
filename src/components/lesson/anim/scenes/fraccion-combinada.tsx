import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { Frac } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import { gcd, lcm } from "@/components/lesson/anim/number-theory";
import type { AnimBuild } from "@/components/lesson/anim/types";

const Y = 170;
const SIZE = 44;
const OUT_X = 130;
const PROD_X = OUT_X + 235;

type NumProps = { x: number; y: number; v: number; cut: boolean; to: number; above: boolean };

/** Número que, al simplificar, se tacha y deja su nuevo valor (arriba o abajo del original). */
function Cut({ x, y, v, cut, to, above }: NumProps) {
  return (
    <g>
      <Txt x={x} y={y} size={SIZE} color={cut ? MANIM.red : MANIM.ink}>
        {String(v)}
      </Txt>
      <WriteLine show={cut} x1={x - 16} y1={y + 6} x2={x + 16} y2={y - 30} color={MANIM.red} width={4} />
      <Fade show={cut} dy={above ? 6 : -6}>
        <Txt x={x + 30} y={above ? y - 42 : y + 40} size={30} color={MANIM.yellow}>
          {String(to)}
        </Txt>
      </Fade>
    </g>
  );
}

/** Raya de fracción dimensionada para `n` y `d` (los números van aparte, con `Cut`). */
function Bar({ x, n, d, color }: { x: number; n: number; d: number; color: string }) {
  const half = Math.max(String(n).length, String(d).length) * SIZE * 0.34 + 8;
  return <line x1={x - half} x2={x + half} y1={Y} y2={Y} stroke={color} strokeWidth={4} strokeLinecap="round" />;
}

/** Acepta fracciones como `a/b` y devuelve la forma irreducible. */
const simplify = (n: number, d: number) => {
  const g = gcd(Math.abs(n), d) || 1;
  return [n / g, d / g] as const;
};

/**
 * Operación combinada `a/b · (c/d ∓ e/f)`: primero el paréntesis (común denominador y resta o suma),
 * después el producto, simplificando en cruz antes de multiplicar.
 */
export function buildFraccionCombinada(params: {
  a?: number;
  b?: number;
  c?: number;
  d?: number;
  e?: number;
  f?: number;
  op?: "+" | "-";
}): AnimBuild {
  const a = params.a ?? 5;
  const b = params.b ?? 11;
  const c = params.c ?? 3;
  const d = params.d ?? 2;
  const e = params.e ?? 2;
  const f = params.f ?? 5;
  const op = params.op ?? "-";
  const sign = op === "+" ? "+" : "-";
  const sym = op === "+" ? "+" : "−";
  const m = lcm(d, f);
  const kc = m / d;
  const ke = m / f;
  const c2 = c * kc;
  const e2 = e * ke;
  const n = op === "+" ? c2 + e2 : c2 - e2;
  const [p, q] = simplify(n, m);
  const g1 = gcd(a, q);
  const g2 = gcd(p, b);
  const ra = a / g1;
  const rq = q / g1;
  const rp = p / g2;
  const rb = b / g2;
  const [rn, rd] = [ra * rp, rb * rq];
  const cuts = g1 > 1 || g2 > 1;
  const word = op === "+" ? "suma" : "resta";

  const captions = [
    `Queremos calcular $\\dfrac{${a}}{${b}} \\cdot \\left(\\dfrac{${c}}{${d}} ${sign} \\dfrac{${e}}{${f}}\\right)$. ¿Por dónde se empieza?`,
    `Primero el **paréntesis**: es una ${word} de fracciones con distinto denominador. La fracción de fuera espera.`,
    `Común denominador: m.c.m.$(${d}, ${f}) = ${m}$. Se amplía arriba y abajo: $\\dfrac{${c}}{${d}} = \\dfrac{${c2}}{${m}}$ (por ${kc}) y $\\dfrac{${e}}{${f}} = \\dfrac{${e2}}{${m}}$ (por ${ke}).`,
    `Con el mismo denominador se ${op === "+" ? "suman" : "restan"} los numeradores: $${c2} ${sign} ${e2} = ${n}$. El paréntesis vale $\\dfrac{${n}}{${m}}$${p !== n ? `, que simplificado es $\\dfrac{${p}}{${q}}$` : ""}.`,
    `Ya no queda paréntesis: el resultado ocupa su lugar y lo que queda es un **producto** $\\dfrac{${a}}{${b}} \\cdot \\dfrac{${p}}{${q}}$.`,
    cuts
      ? `Antes de multiplicar, se simplifica en cruz (un numerador con un denominador de otra fracción): ${[
          g1 > 1 ? `$${a}$ y $${q}$ entre $${g1}$` : "",
          g2 > 1 ? `$${p}$ y $${b}$ entre $${g2}$` : "",
        ]
          .filter(Boolean)
          .join(" y ")}.`
      : `Se mira si algún numerador y denominador (de fracciones distintas) se pueden simplificar: aquí no.`,
    `Multiplicamos lo que queda: $\\dfrac{${a}}{${b}} \\cdot \\left(\\dfrac{${c}}{${d}} ${sign} \\dfrac{${e}}{${f}}\\right) = \\dfrac{${rn}}{${rd}}$.`,
  ];

  return {
    label: `Operación combinada ${a}/${b} · (${c}/${d} ${sign} ${e}/${f}): paréntesis primero, resultado ${rn}/${rd}`,
    captions,
    beatMs: 3800,
    render: (beat) => {
      const inParen = beat >= 1 && beat <= 3;
      const open = beat <= 3;
      const simplifying = beat >= 5;
      return (
        <Canvas>
          {/* fracción de fuera: se aparta mientras se resuelve el paréntesis */}
          <g className="anim-t" style={{ opacity: inParen ? 0.3 : 1 }}>
            <Bar x={OUT_X} n={a} d={b} color={MANIM.blue} />
            <Cut x={OUT_X} y={Y - 13} v={a} cut={simplifying && g1 > 1} to={ra} above />
            <Cut x={OUT_X} y={Y + 42} v={b} cut={simplifying && g2 > 1} to={rb} above={false} />
            <Txt x={OUT_X + 80} y={Y + 8} size={40}>
              ·
            </Txt>
          </g>
          {/* paréntesis completo */}
          <Fade show={open}>
            <Txt x={OUT_X + 130} y={Y + 24} size={110} weight={300} color={MANIM.muted}>
              (
            </Txt>
            <Txt x={beat <= 2 ? 620 : 520} y={Y + 24} size={110} weight={300} color={MANIM.muted}>
              )
            </Txt>
          </Fade>
          <Fade show={inParen} dy={-6}>
            <rect
              x={OUT_X + 105}
              y={Y - 74}
              width={beat <= 2 ? 540 : 440}
              height={170}
              rx={16}
              fill="none"
              stroke={MANIM.yellow}
              strokeWidth={2.5}
              strokeDasharray="6 6"
            />
          </Fade>
          {/* contenido del paréntesis */}
          <Fade show={beat <= 1}>
            <Frac x={OUT_X + 210} y={Y} n={c} d={d} size={SIZE} color={MANIM.green} />
            <Txt x={OUT_X + 310} y={Y + 8} size={40}>
              {sym}
            </Txt>
            <Frac x={OUT_X + 400} y={Y} n={e} d={f} size={SIZE} color={MANIM.orange} />
          </Fade>
          <Fade show={beat === 2}>
            <Frac x={OUT_X + 210} y={Y} n={c2} d={m} size={SIZE} color={MANIM.green} />
            <Txt x={OUT_X + 310} y={Y + 8} size={40}>
              {sym}
            </Txt>
            <Frac x={OUT_X + 400} y={Y} n={e2} d={m} size={SIZE} color={MANIM.orange} />
            <Txt x={OUT_X + 210} y={Y + 118} size={24} color={MANIM.green}>
              {`× ${kc}`}
            </Txt>
            <Txt x={OUT_X + 400} y={Y + 118} size={24} color={MANIM.orange}>
              {`× ${ke}`}
            </Txt>
            <Txt x={OUT_X + 305} y={Y + 158} size={22} color={MANIM.yellow}>
              {`m.c.m.(${d}, ${f}) = ${m}`}
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Frac x={OUT_X + 290} y={Y} n={n} d={m} size={SIZE} color={MANIM.yellow} />
            <Txt x={OUT_X + 290} y={Y + 118} size={24} color={MANIM.muted}>
              {`${c2} ${sym} ${e2} = ${n}`}
            </Txt>
          </Fade>
          {/* producto sin paréntesis */}
          <Fade show={!open}>
            <Bar x={PROD_X} n={p} d={q} color={MANIM.yellow} />
            <Cut x={PROD_X} y={Y - 13} v={p} cut={simplifying && g2 > 1} to={rp} above />
            <Cut x={PROD_X} y={Y + 42} v={q} cut={simplifying && g1 > 1} to={rq} above={false} />
          </Fade>
          {/* resultado */}
          <Fade show={beat >= 6} dy={10}>
            <Txt x={OUT_X + 340} y={Y + 8} size={44}>
              =
            </Txt>
            <Frac x={OUT_X + 430} y={Y} n={rn} d={rd} size={SIZE + 6} color={MANIM.yellow} />
          </Fade>
          {/* orden de las operaciones */}
          <Fade show={beat === 0} dy={8}>
            <Txt x={400} y={330} size={26} color={MANIM.muted}>
              paréntesis → multiplicar y dividir → sumar y restar
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
