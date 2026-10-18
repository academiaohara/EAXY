import { Canvas, Fade, Move, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { Frac, Op, fracWidth, placeRow } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import { factorize } from "@/components/lesson/anim/number-theory";
import type { AnimBuild } from "@/components/lesson/anim/types";

const STEP = 46;
const NUM_Y = 176;
const BAR_Y = 202;
const DEN_Y = 248;
const GAP = 64;
const PAD = 28;
const AXIS = BAR_Y;
const PAIR_COLORS = [MANIM.red, MANIM.orange, MANIM.purple, MANIM.blue, MANIM.green];

type Side = "n" | "d";
type Tok = {
  v: number;
  /** Número del que sale (índice en `GROUPS`). */
  g: number;
  /** Fracción de la que viene (0: primera, 1: segunda). */
  f: 0 | 1;
  side: Side;
  /** Posición dentro de su lado en su fracción (una vez descompuesto). */
  i: number;
  /** Posición dentro de su lado en la fracción única. */
  merged: number;
  /** Pareja arriba/abajo que se tacha (−1: se queda). */
  pair: number;
};

function expand(n: number): number[] {
  return n === 1 ? [] : factorize(n).flatMap(([p, e]) => Array<number>(e).fill(p));
}

const rowWidth = (count: number) => Math.max(0, count - 1) * STEP;
const rowX = (cx: number, count: number, i: number) => cx - rowWidth(count) / 2 + i * STEP;

/**
 * Simplificar un producto de fracciones con factores primos: cada factor se queda en su fracción,
 * todos pasan a una sola fracción y se tachan las parejas arriba/abajo (cada pareja, de su color).
 * Con `inv` parte de una división (se da la vuelta a la segunda fracción).
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

  const parts: [Record<Side, number[]>, Record<Side, number[]>] = [
    { n: expand(a), d: expand(b) },
    { n: expand(pc), d: expand(pd) },
  ];
  const mergedLen: Record<Side, number> = { n: parts[0].n.length + parts[1].n.length, d: parts[0].d.length + parts[1].d.length };
  // Orden en el que se descomponen los números: numeradores y luego denominadores.
  const GROUPS: { f: 0 | 1; side: Side; num: number }[] = [
    { f: 0, side: "n", num: a },
    { f: 1, side: "n", num: pc },
    { f: 0, side: "d", num: b },
    { f: 1, side: "d", num: pd },
  ];
  const toks: Tok[] = [];
  GROUPS.forEach(({ f, side }, g) => {
    parts[f][side].forEach((v, i) => {
      toks.push({ v, g, f, side, i, merged: (f === 1 ? parts[0][side].length : 0) + i, pair: -1 });
    });
  });
  let pairs = 0;
  for (const nt of toks.filter((t) => t.side === "n")) {
    const mate = toks.find((t) => t.side === "d" && t.pair < 0 && t.v === nt.v);
    if (mate) {
      nt.pair = pairs;
      mate.pair = pairs;
      pairs += 1;
    }
  }
  const rest = (side: Side) => toks.filter((t) => t.side === side && t.pair < 0).reduce((acc, t) => acc * t.v, 1);
  const restN = rest("n");
  const restD = rest("d");
  const op = inv ? ":" : "·";
  const off = inv ? 1 : 0;
  const factorsTex = (side: Side) => {
    const vs = [...parts[0][side], ...parts[1][side]];
    return vs.length ? vs.join(" \\cdot ") : "1";
  };

  const captions = [
    inv
      ? `Dividir $\\dfrac{${a}}{${b}} : \\dfrac{${c}}{${d}}$ es lo mismo que multiplicar por la **inversa** de la segunda.`
      : `Queremos $\\dfrac{${a}}{${b}} \\cdot \\dfrac{${c}}{${d}}$ y que el resultado salga **ya simplificado**.`,
    ...(inv ? [`Se da la vuelta solo a la fracción por la que dividimos: $\\dfrac{${a}}{${b}} \\cdot \\dfrac{${pc}}{${pd}}$.`] : []),
    ...GROUPS.map(({ num }, k) => {
      const fs = expand(num);
      const tex = fs.length === 0 ? "1" : fs.join(" \\cdot ");
      const what = num === 1 ? `$1$ no se descompone.` : fs.length === 1 ? `$${num}$ ya es primo.` : `$${num} = ${tex}$.`;
      return `${k === 0 ? "Descomponemos cada número en **factores primos** y lo sustituimos por ellos. " : ""}${what}`;
    }),
    `Cada número ya está sustituido por sus factores primos: lo de arriba **es igual** a lo de abajo, solo está escrito de otra forma. Cada factor se queda en su sitio.`,
    `Un producto de fracciones es **una sola fracción**: todos los factores de arriba juntos y todos los de abajo juntos, sin multiplicarlos todavía: $\\dfrac{${factorsTex("n")}}{${factorsTex("d")}}$.`,
    pairs
      ? `Cada factor de arriba que tiene **su pareja abajo** se tacha (cada pareja, de un color): dividir arriba y abajo entre lo mismo no cambia la fracción.`
      : `No hay ningún factor repetido arriba y abajo: no se puede tachar nada y el producto ya está simplificado.`,
    restD === 1
      ? `Abajo solo queda un $1$: $\\dfrac{${a}}{${b}} ${op} \\dfrac{${c}}{${d}} = ${restN}$.`
      : `Multiplicamos lo que queda: $\\dfrac{${a}}{${b}} ${op} \\dfrac{${c}}{${d}} = \\dfrac{${restN}}{${restD}}$.`,
  ];

  const mergedHalf = rowWidth(Math.max(mergedLen.n, mergedLen.d, 1)) / 2 + PAD;
  const rowWidthOf = (cnt: number) => rowWidth(Math.max(cnt, 1));

  const bB = 1 + off;
  const bC = bB + 5;
  const bD = bC + 1;
  const bE = bD + 1;

  return {
    label: `Simplificar ${a}/${b} ${op} ${c}/${d} con factores primos: queda ${restD === 1 ? restN : `${restN}/${restD}`}`,
    captions,
    render: (beat) => {
      const inverted = beat >= 1;
      const single = beat >= bC;
      const struck = beat >= bD;
      const apart = beat >= bB && !single;
      // Cuántos números llevan ya sus factores; el siguiente se está marcando.
      const stage = Math.max(0, Math.min(GROUPS.length, beat - bB));
      const decomposed = (g: number) => g < stage;
      const marked = beat >= bB && stage < GROUPS.length ? stage : -1;
      const count = (g: number) => {
        const { f, side } = GROUPS[g]!;
        return decomposed(g) ? parts[f][side].length : 1;
      };
      const groupOf = (f: 0 | 1, side: Side) => GROUPS.findIndex((x) => x.f === f && x.side === side);
      const w = (f: 0 | 1) => rowWidthOf(Math.max(count(groupOf(f, "n")), count(groupOf(f, "d")))) + 2 * PAD;
      const [cx0, signX, cx1] = placeRow([w(0), 0, w(1)], GAP / 2);
      const cx: [number, number] = [cx0!, cx1!];
      // Fracciones sin descomponer: mismo eje que las rayas de abajo y centradas en la pizarra.
      const origW = (n: number, d: number) => fracWidth(n, d, 44);
      const rowOrig = (n2: number, d2: number) => placeRow([origW(a, b), 40, origW(n2, d2)], 30);
      const L0 = rowOrig(c, d);
      const L1 = rowOrig(pc, pd);
      const Lo = inv && inverted ? L1 : L0;
      const topW = [fracWidth(a, b, 30), 20, fracWidth(pc, pd, 30)];
      const T = placeRow(topW, 22);
      const posB = (t: Tok, i = t.i, cnt = count(t.g)) => ({ x: rowX(cx[t.f], cnt, i), y: t.side === "n" ? NUM_Y : DEN_Y });
      const posC = (t: Tok) => ({ x: rowX(400, mergedLen[t.side], t.merged), y: t.side === "n" ? NUM_Y : DEN_Y });
      const noteOf = (g: number) => {
        const { num } = GROUPS[g]!;
        const fs = expand(num);
        return num === 1 ? "1 no se descompone" : fs.length === 1 ? `${num} ya es primo` : `${num} = ${fs.join(" · ")}`;
      };

      return (
        <Canvas>
          {/* fracciones sin descomponer */}
          <Fade show={beat < bB}>
            <Move x={Lo[0]!} y={0}>
              <Frac x={0} y={AXIS} n={a} d={b} size={44} />
            </Move>
            <Move x={Lo[1]!} y={0}>
              <Fade show={!inv || !inverted}>
                <Op x={0} y={AXIS} kind={inv ? ":" : "·"} size={44} />
              </Fade>
              <Fade show={inv && inverted}>
                <Op x={0} y={AXIS} kind="·" size={44} />
              </Fade>
            </Move>
            <Fade show={!inv || !inverted}>
              <Frac x={L0[2]!} y={AXIS} n={c} d={d} size={44} />
            </Fade>
            <Fade show={inv && inverted}>
              <Frac x={L1[2]!} y={AXIS} n={pc} d={pd} size={44} color={MANIM.yellow} />
              <Txt x={L1[2]!} y={AXIS + 92} size={22} color={MANIM.yellow}>
                inversa
              </Txt>
            </Fade>
          </Fade>
          {/* la fracción original, con la que lo de abajo es igual */}
          <Fade show={beat >= bB} dy={-10}>
            <Frac x={T[0]!} y={50} n={a} d={b} size={30} color={MANIM.muted} />
            <Op x={T[1]!} y={50} kind="·" size={30} color={MANIM.muted} />
            <Frac x={T[2]!} y={50} n={pc} d={pd} size={30} color={inv ? MANIM.yellow : MANIM.muted} />
            <Op x={400} y={116} kind="=" size={34} color={MANIM.yellow} />
          </Fade>
          {/* dos fracciones con sus factores */}
          <Fade show={apart}>
            {([0, 1] as const).map((f) => (
              <g key={f}>
                <line x1={cx[f] - w(f) / 2} x2={cx[f] + w(f) / 2} y1={BAR_Y} y2={BAR_Y} stroke={f === 1 && inv ? MANIM.yellow : MANIM.ink} strokeWidth={3.5} strokeLinecap="round" />
                {(["n", "d"] as const).map((side) => {
                  const g = groupOf(f, side);
                  const cnt = count(g);
                  return cnt === 0 ? (
                    <Txt key={side} x={cx[f]} y={side === "n" ? NUM_Y : DEN_Y} size={34}>
                      1
                    </Txt>
                  ) : (
                    Array.from({ length: cnt - 1 }, (_, i) => (
                      <Op key={`${side}${i}`} x={rowX(cx[f], cnt, i) + STEP / 2} y={(side === "n" ? NUM_Y : DEN_Y) - 12} kind="·" size={34} color={MANIM.muted} />
                    ))
                  );
                })}
              </g>
            ))}
            <Op x={signX} y={BAR_Y} kind="·" size={40} />
          </Fade>
          {/* una sola fracción */}
          <Fade show={single}>
            <line x1={400 - mergedHalf} x2={400 + mergedHalf} y1={BAR_Y} y2={BAR_Y} stroke={MANIM.ink} strokeWidth={3.5} strokeLinecap="round" />
            {(["n", "d"] as const).map((side) =>
              mergedLen[side] === 0 ? (
                <Txt key={side} x={400} y={side === "n" ? NUM_Y : DEN_Y} size={34}>
                  1
                </Txt>
              ) : (
                Array.from({ length: mergedLen[side] - 1 }, (_, i) => (
                  <Op key={`${side}${i}`} x={rowX(400, mergedLen[side], i) + STEP / 2} y={(side === "n" ? NUM_Y : DEN_Y) - 12} kind="·" size={34} color={MANIM.muted} />
                ))
              ),
            )}
          </Fade>
          {/* cómo se descompone el número marcado */}
          {GROUPS.map((_, g) => (
            <Fade key={g} show={marked === g} dy={8}>
              <Txt x={400} y={330} size={34} color={MANIM.yellow}>
                {noteOf(g)}
              </Txt>
            </Fade>
          ))}
          {/* factores: viajan de su fracción a la fracción única */}
          <Fade show={beat >= bB}>
            {GROUPS.map(({ f, side, num }, g) =>
              decomposed(g) || single ? null : (
                <Move key={`p${g}`} {...posB({ g, f, side, v: num, i: 0, merged: 0, pair: -1 }, 0, 1)}>
                  <Txt x={0} y={0} size={34} color={marked === g ? MANIM.yellow : MANIM.ink}>
                    {String(num)}
                  </Txt>
                </Move>
              ),
            )}
            {toks.map((t, k) => {
              if (!decomposed(t.g) && !single) return null;
              const p = single ? posC(t) : posB(t);
              const color = struck && t.pair >= 0 ? PAIR_COLORS[t.pair % PAIR_COLORS.length]! : MANIM.ink;
              return (
                <Move key={k} x={p.x} y={p.y}>
                  <Txt x={0} y={0} size={34} color={color}>
                    {String(t.v)}
                  </Txt>
                  <WriteLine show={struck && t.pair >= 0} x1={-14} y1={6} x2={14} y2={-26} color={color} width={4} />
                </Move>
              );
            })}
          </Fade>
          {/* resultado */}
          <Fade show={beat >= bE} dy={10}>
            <Op x={400 - 70} y={354} kind="=" size={40} />
            {restD === 1 ? (
              <Txt x={400 + 10} y={371} size={48} color={MANIM.yellow}>
                {String(restN)}
              </Txt>
            ) : (
              <Frac x={400} y={354} n={restN} d={restD} size={44} color={MANIM.yellow} />
            )}
          </Fade>
        </Canvas>
      );
    },
  };
}
