import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { mono } from "@/components/lesson/anim/algebra";
import type { AnimBuild } from "@/components/lesson/anim/types";

const COEF_W = 80;
const LETTER_W = 56;
const MID_GAP = 50;
const Y = 190;

type Token = { key: string; kind: "coef" | "x"; text: string; color: string; from: number; to: number };

/** `(a·x^c)·(b·x^d)`: se desarrollan las potencias, se reordenan los factores y se cuentan las letras. */
export function buildMonomioProducto(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const a = params.a ?? 2;
  const b = params.b ?? 3;
  const c = Math.max(1, Math.min(4, params.c ?? 2));
  const d = Math.max(1, Math.min(4, params.d ?? 3));
  const p = a * b;
  const e = c + d;
  const left = mono(a, c);
  const right = mono(b, d);
  const fin = mono(p, e);

  // Posición (centro) de cada ficha antes y después de reordenar.
  const width = 2 * COEF_W + e * LETTER_W + MID_GAP;
  const start = (800 - width) / 2;
  const tokens: Token[] = [];
  let before = start + COEF_W / 2;
  const after = start + COEF_W / 2;
  tokens.push({ key: "a", kind: "coef", text: String(a), color: MANIM.yellow, from: before, to: after });
  before += COEF_W / 2;
  for (let i = 0; i < c; i += 1) {
    tokens.push({ key: `l${i}`, kind: "x", text: "x", color: MANIM.red, from: before + LETTER_W / 2, to: 0 });
    before += LETTER_W;
  }
  before += MID_GAP;
  tokens.push({ key: "b", kind: "coef", text: String(b), color: MANIM.blue, from: before + COEF_W / 2, to: after + COEF_W });
  before += COEF_W;
  const afterLetters = start + 2 * COEF_W;
  for (let i = 0; i < d; i += 1) {
    tokens.push({ key: `r${i}`, kind: "x", text: "x", color: MANIM.red, from: before + LETTER_W / 2, to: 0 });
    before += LETTER_W;
  }
  let li = 0;
  for (const t of tokens) {
    if (t.kind === "x") {
      t.to = afterLetters + LETTER_W / 2 + li * LETTER_W;
      li += 1;
    }
  }

  return {
    label: `Producto de monomios (${left})·(${right}) = ${fin}: se multiplican los coeficientes y se cuentan las letras`,
    captions: [
      `Multiplicamos $(${left})\\cdot(${right})$.`,
      `Una potencia es un producto repetido: $x^{${c}}$ son **${c}** letras $x$ y $x^{${d}}$ son **${d}**.`,
      "Como todo son productos, se pueden reordenar: los números juntos y las letras juntas.",
      `Números: $${a} \\cdot ${b} = ${p}$. Letras: $${c} + ${d} = ${e}$ veces $x$, o sea $x^{${e}}$. Resultado: $${p}x^{${e}}$.`,
    ],
    render: (beat) => {
      const expanded = beat >= 1;
      const grouped = beat >= 2;
      const done = beat >= 3;
      return (
        <Canvas>
          <Fade show={!expanded}>
            <Txt x={400} y={Y + 20} size={64} weight={800}>
              <tspan fill={MANIM.yellow}>({left})</tspan>
              <tspan fill={MANIM.muted}> · </tspan>
              <tspan fill={MANIM.blue}>({right})</tspan>
            </Txt>
          </Fade>
          <Fade show={expanded}>
            {tokens.map((t) => (
              <g key={t.key} className="anim-t" style={{ transform: `translate(${grouped ? t.to - t.from : 0}px, 0px)` }}>
                {t.kind === "x" ? (
                  <>
                    <circle cx={t.from} cy={Y} r={24} fill={t.color} fillOpacity={0.92} />
                    <Txt x={t.from} y={Y + 9} size={28} color={MANIM.surface} weight={800}>
                      x
                    </Txt>
                  </>
                ) : (
                  <Txt x={t.from} y={Y + 14} size={46} color={t.color} weight={800}>
                    {t.text}
                  </Txt>
                )}
              </g>
            ))}
          </Fade>
          <Fade show={grouped} dy={8}>
            <Txt x={start + COEF_W} y={Y - 62} size={22} color={MANIM.yellow}>
              números
            </Txt>
            <Txt x={start + 2 * COEF_W + (e * LETTER_W) / 2} y={Y - 62} size={22} color={MANIM.red}>
              {`${e} letras x`}
            </Txt>
          </Fade>
          <Fade show={done} dy={8}>
            <Txt x={400} y={330} size={64} color={MANIM.green} weight={800}>
              {fin}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
