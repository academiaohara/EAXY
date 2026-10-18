import { Canvas, Fade, Move, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { Frac, Op, fracWidth, placeRow } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import { gcd, lcm } from "@/components/lesson/anim/number-theory";
import type { AnimBuild } from "@/components/lesson/anim/types";

const Y = 170;
const SIZE = 44;
const OP_W = 28;
const PAREN_W = 22;
const GAP = 18;
const RECT_PAD = 16;

/** Paréntesis curvo que abarca el alto de una fracción apilada, centrado en `x`. */
function Paren({ x, side }: { x: number; side: "l" | "r" }) {
  const top = Y - 58;
  const bottom = Y + 62;
  const dir = side === "l" ? 1 : -1;
  return (
    <path
      d={`M ${x + 5 * dir} ${top} Q ${x - 9 * dir} ${(top + bottom) / 2} ${x + 5 * dir} ${bottom}`}
      fill="none"
      stroke={MANIM.muted}
      strokeWidth={4}
      strokeLinecap="round"
    />
  );
}

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

  const fw = (n: number, d: number, size = SIZE) => fracWidth(n, d, size);
  const fo = fw(a, b);
  const showSimp = p !== n || q !== m;
  // Cada fase se coloca centrada y con los mismos huecos; la fracción de fuera y su punto se desplazan de una a otra.
  const LA = placeRow([fo, OP_W, PAREN_W, fw(c, d), OP_W, fw(e, f), PAREN_W], GAP);
  const LB = placeRow([fo, OP_W, PAREN_W, fw(c2, m), OP_W, fw(e2, m), PAREN_W], GAP);
  const LC = placeRow([fo, OP_W, PAREN_W, fw(n, m), ...(showSimp ? [OP_W, fw(p, q)] : []), PAREN_W], GAP);
  const LD = placeRow([fo, OP_W, fw(p, q)], GAP);
  const LE = placeRow([fo, OP_W, fw(p, q), OP_W, fw(rn, rd, SIZE + 6)], GAP);
  const rectOf = (L: number[]) => ({ x: L[2]! - PAREN_W / 2 - RECT_PAD, w: L[L.length - 1]! - L[2]! + PAREN_W + 2 * RECT_PAD });

  return {
    label: `Operación combinada ${a}/${b} · (${c}/${d} ${sign} ${e}/${f}): paréntesis primero, resultado ${rn}/${rd}`,
    captions,
    beatMs: 3800,
    render: (beat) => {
      const inParen = beat >= 1 && beat <= 3;
      const simplifying = beat >= 5;
      const L = beat <= 1 ? LA : beat === 2 ? LB : beat === 3 ? LC : beat <= 5 ? LD : LE;
      const midB = (LB[3]! + LB[5]!) / 2;
      const group = (Lg: number[], show: boolean, rect: boolean, children: React.ReactNode) => (
        <Fade show={show}>
          <Paren x={Lg[2]!} side="l" />
          <Paren x={Lg[Lg.length - 1]!} side="r" />
          <Fade show={rect} dy={-6}>
            <rect x={rectOf(Lg).x} y={Y - 74} width={rectOf(Lg).w} height={150} rx={16} fill="none" stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="6 6" />
          </Fade>
          {children}
        </Fade>
      );
      return (
        <Canvas>
          {/* fracción de fuera: se aparta mientras se resuelve el paréntesis */}
          <g className="anim-t" style={{ opacity: inParen ? 0.3 : 1 }}>
            <Move x={L[0]!} y={0}>
              <Bar x={0} n={a} d={b} color={MANIM.blue} />
              <Cut x={0} y={Y - 13} v={a} cut={simplifying && g1 > 1} to={ra} above />
              <Cut x={0} y={Y + 42} v={b} cut={simplifying && g2 > 1} to={rb} above={false} />
            </Move>
            <Move x={L[1]!} y={0}>
              <Op x={0} y={Y} kind="·" size={44} />
            </Move>
          </g>
          {/* paréntesis con la resta: se amplía, se resta y se simplifica */}
          {group(
            LA,
            beat <= 1,
            beat === 1,
            <>
              <Frac x={LA[3]!} y={Y} n={c} d={d} size={SIZE} color={MANIM.green} />
              <Op x={LA[4]!} y={Y} kind={sign} size={44} />
              <Frac x={LA[5]!} y={Y} n={e} d={f} size={SIZE} color={MANIM.orange} />
            </>,
          )}
          {group(
            LB,
            beat === 2,
            beat === 2,
            <>
              <Frac x={LB[3]!} y={Y} n={c2} d={m} size={SIZE} color={MANIM.green} />
              <Op x={LB[4]!} y={Y} kind={sign} size={44} />
              <Frac x={LB[5]!} y={Y} n={e2} d={m} size={SIZE} color={MANIM.orange} />
              <Txt x={LB[3]!} y={Y + 112} size={24} color={MANIM.green}>
                {`× ${kc}`}
              </Txt>
              <Txt x={LB[5]!} y={Y + 112} size={24} color={MANIM.orange}>
                {`× ${ke}`}
              </Txt>
              <Txt x={midB} y={Y + 152} size={22} color={MANIM.yellow}>
                {`m.c.m.(${d}, ${f}) = ${m}`}
              </Txt>
            </>,
          )}
          {group(
            LC,
            beat === 3,
            beat === 3,
            <>
              <Frac x={LC[3]!} y={Y} n={n} d={m} size={SIZE} color={MANIM.yellow} />
              {showSimp ? (
                <>
                  <Op x={LC[4]!} y={Y} kind="=" size={44} color={MANIM.muted} />
                  <Frac x={LC[5]!} y={Y} n={p} d={q} size={SIZE} color={MANIM.yellow} />
                </>
              ) : null}
              <Txt x={(LC[3]! + LC[showSimp ? 5 : 3]!) / 2} y={Y + 112} size={24} color={MANIM.muted}>
                {`${c2} ${sym} ${e2} = ${n}`}
              </Txt>
            </>,
          )}
          {/* producto sin paréntesis */}
          <Fade show={beat >= 4}>
            <Move x={beat >= 6 ? LE[2]! : LD[2]!} y={0}>
              <Bar x={0} n={p} d={q} color={MANIM.yellow} />
              <Cut x={0} y={Y - 13} v={p} cut={simplifying && g2 > 1} to={rp} above />
              <Cut x={0} y={Y + 42} v={q} cut={simplifying && g1 > 1} to={rq} above={false} />
            </Move>
          </Fade>
          {/* resultado */}
          <Fade show={beat >= 6} dy={10}>
            <Op x={LE[3]!} y={Y} kind="=" size={44} />
            <Frac x={LE[4]!} y={Y} n={rn} d={rd} size={SIZE + 6} color={MANIM.yellow} />
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
