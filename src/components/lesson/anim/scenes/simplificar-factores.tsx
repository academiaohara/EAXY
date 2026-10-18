import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { Frac } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import { factorize } from "@/components/lesson/anim/number-theory";
import type { AnimBuild } from "@/components/lesson/anim/types";

const STEP = 46;

type Tok = { v: number; cancelled: boolean };

function expand(n: number): number[] {
  return n === 1 ? [] : factorize(n).flatMap(([p, e]) => Array<number>(e).fill(p));
}

/** Fila de factores (con puntos entre ellos) centrada en `cx`. */
function FactorRow({ toks, cx, y, strike, color }: { toks: Tok[]; cx: number; y: number; strike: boolean; color: string }) {
  const start = cx - ((toks.length - 1) * STEP) / 2;
  if (toks.length === 0) {
    return (
      <Txt x={cx} y={y} size={34} color={color}>
        1
      </Txt>
    );
  }
  return (
    <g>
      {toks.map((t, i) => {
        const x = start + i * STEP;
        const dead = strike && t.cancelled;
        return (
          <g key={i}>
            <Txt x={x} y={y} size={34} color={dead ? MANIM.red : color}>
              {String(t.v)}
            </Txt>
            {i < toks.length - 1 ? (
              <Txt x={x + STEP / 2} y={y} size={28} color={MANIM.muted}>
                ·
              </Txt>
            ) : null}
            <WriteLine show={dead} x1={x - 14} y1={y + 6} x2={x + 14} y2={y - 26} color={MANIM.red} width={4} />
          </g>
        );
      })}
    </g>
  );
}

/**
 * Simplificar un producto de fracciones descomponiendo en factores y tachando los que
 * se repiten arriba y abajo. Con `inv` parte de una división (se da la vuelta a la segunda).
 */
export function buildSimplificarFactores(params: {
  a?: number;
  b?: number;
  c?: number;
  d?: number;
  inv?: boolean;
}): AnimBuild {
  const a = params.a ?? 4;
  const b = params.b ?? 8;
  const c = params.c ?? 3;
  const d = params.d ?? 4;
  const inv = params.inv ?? false;
  const pc = inv ? d : c;
  const pd = inv ? c : d;

  const numToks: Tok[] = [...expand(a), ...expand(pc)].map((v) => ({ v, cancelled: false }));
  const denToks: Tok[] = [...expand(b), ...expand(pd)].map((v) => ({ v, cancelled: false }));
  for (const nt of numToks) {
    const mate = denToks.find((t) => !t.cancelled && t.v === nt.v);
    if (mate) {
      nt.cancelled = true;
      mate.cancelled = true;
    }
  }
  const restN = numToks.filter((t) => !t.cancelled).reduce((acc, t) => acc * t.v, 1);
  const restD = denToks.filter((t) => !t.cancelled).reduce((acc, t) => acc * t.v, 1);
  const cancelledCount = numToks.filter((t) => t.cancelled).length;
  const op = inv ? ":" : "·";
  const off = inv ? 1 : 0;

  const captions = [
    inv
      ? `Dividir $\\dfrac{${a}}{${b}} : \\dfrac{${c}}{${d}}$ es lo mismo que multiplicar por la **inversa** de la segunda.`
      : `Queremos $\\dfrac{${a}}{${b}} \\cdot \\dfrac{${c}}{${d}}$ y que el resultado salga **ya simplificado**.`,
    ...(inv ? [`Se da la vuelta solo a la fracción por la que dividimos: $\\dfrac{${a}}{${b}} \\cdot \\dfrac{${pc}}{${pd}}$.`] : []),
    `Descomponemos en **factores primos** todos los números, antes de multiplicar nada.`,
    cancelledCount
      ? `Cada factor que está **arriba y abajo** se tacha: dividir arriba y abajo entre lo mismo no cambia la fracción.`
      : `No hay factores iguales arriba y abajo: el producto ya está simplificado.`,
    restD === 1
      ? `Abajo no queda nada más que un $1$: el resultado es el número entero **${restN}**.`
      : `Multiplicamos lo que queda: $\\dfrac{${restN}}{${restD}}$.`,
  ];

  const totalW = (n: number) => Math.max(0, n - 1) * STEP;
  const cxNum = 400;

  return {
    label: `Simplificar ${a}/${b} ${op} ${c}/${d} con factores primos: queda ${restD === 1 ? restN : `${restN}/${restD}`}`,
    captions,
    render: (beat) => {
      const factored = beat >= 1 + off;
      const struck = beat >= 2 + off;
      const done = beat >= 3 + off;
      const inverted = beat >= 1;
      return (
        <Canvas>
          {/* fracciones */}
          <Fade show={!factored}>
            <Frac x={270} y={190} n={a} d={b} size={44} />
            <Fade show={!inv || !inverted}>
              <Txt x={340} y={196} size={40}>
                {op}
              </Txt>
              <Frac x={410} y={190} n={c} d={d} size={44} />
            </Fade>
            <Fade show={inv && inverted}>
              <Txt x={340} y={196} size={40}>
                ·
              </Txt>
              <Frac x={410} y={190} n={pc} d={pd} size={44} color={MANIM.yellow} />
            </Fade>
          </Fade>
          {/* factores */}
          <Fade show={factored}>
            <FactorRow toks={numToks} cx={cxNum} y={150} strike={struck} color={MANIM.ink} />
            <line
              x1={cxNum - Math.max(totalW(numToks.length), totalW(denToks.length)) / 2 - 30}
              x2={cxNum + Math.max(totalW(numToks.length), totalW(denToks.length)) / 2 + 30}
              y1={176}
              y2={176}
              stroke={MANIM.ink}
              strokeWidth={3.5}
              strokeLinecap="round"
            />
            <FactorRow toks={denToks} cx={cxNum} y={222} strike={struck} color={MANIM.ink} />
          </Fade>
          {/* resultado */}
          <Fade show={done} dy={10}>
            <Txt x={cxNum - 70} y={344} size={36}>
              =
            </Txt>
            {restD === 1 ? (
              <Txt x={cxNum + 10} y={344} size={48} color={MANIM.yellow}>
                {String(restN)}
              </Txt>
            ) : (
              <Frac x={cxNum} y={332} n={restN} d={restD} size={44} color={MANIM.yellow} />
            )}
          </Fade>
        </Canvas>
      );
    },
  };
}
