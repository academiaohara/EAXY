import { Canvas, Fade, Move, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fromScaled, parseDec, texDec } from "@/components/lesson/anim/decimal";

const W = 46;
const GAP = 30;
const ROW = 58;

/** Suma o resta en columna: coma bajo coma, ceros para igualar y cifra a cifra de derecha a izquierda. */
export function buildDecimalColumna(params: { terms?: string[]; op?: "+" | "-" }): AnimBuild {
  const op = params.op ?? "+";
  const terms = params.terms ?? (op === "+" ? ["4,35", "3,1", "6,22", "5,3"] : ["18,6", "7,45"]);
  const parsed = terms.map(parseDec);
  const F = Math.max(...parsed.map((p) => p.frac.length));
  const scaledTerms = parsed.map((p) => Number(`${p.int}${p.frac.padEnd(F, "0")}`));
  const total = op === "+" ? scaledTerms.reduce((x, y) => x + y, 0) : scaledTerms[0]! - scaledTerms.slice(1).reduce((x, y) => x + y, 0);
  const resultText = fromScaled(total, F);
  const resInt = parseDec(resultText).int.length;
  const I = Math.max(resInt, ...parsed.map((p) => p.int.length));
  const cols = I + F;
  const width = cols * W + GAP;
  const x0 = (800 - width) / 2 + 24;
  const colX = (c: number) => (c < I ? x0 + c * W + W / 2 : x0 + I * W + GAP + (c - I) * W + W / 2);
  const commaX = x0 + I * W + GAP / 2;
  const n = terms.length;
  const y0 = 112 + (4 - Math.min(n, 4)) * (ROW / 2);
  const rowY = (i: number) => y0 + i * ROW;
  const lineY = rowY(n - 1) + 22;
  const resY = lineY + 54;
  const carryY = y0 - 56;

  /** Cifra del término `t` en la columna `c` (0 si no hay cifra). */
  const digitAt = (t: number, c: number): { ch: string; pad: boolean } => {
    const p = parsed[t]!;
    if (c < I) {
      const pos = I - 1 - c;
      return pos < p.int.length ? { ch: p.int[p.int.length - 1 - pos]!, pad: false } : { ch: "", pad: false };
    }
    const j = c - I;
    return j < p.frac.length ? { ch: p.frac[j]!, pad: false } : { ch: "0", pad: true };
  };

  const resultDigits = Array.from({ length: cols }, (_, c) => {
    const text = fromScaled(total, F).replace(",", "").padStart(I + F, " ");
    return text[c]!;
  });

  // llevadas (solo en suma): salen por la izquierda de cada columna
  const carries: number[] = Array.from({ length: cols }, () => 0);
  if (op === "+") {
    let carry = 0;
    for (let c = cols - 1; c >= 0; c -= 1) {
      const sum = parsed.reduce((acc, _p, t) => acc + Number(digitAt(t, c).ch || 0), 0) + carry;
      carry = Math.floor(sum / 10);
      if (c > 0) carries[c - 1] = carry;
    }
  }
  const needAlign = parsed.some((p) => p.frac.length !== F);
  const needZeros = needAlign;
  const sign = op === "+" ? "+" : "−";
  const termsTex = terms.map(texDec).join(op === "+" ? " + " : " - ");

  const captions = [
    needAlign
      ? `Las cantidades tal como se dicen. Si se alinean por la **derecha**, cifras de distinto orden quedan en la misma columna: **así no se puede ${op === "+" ? "sumar" : "restar"}**.`
      : `Las cantidades que hay que ${op === "+" ? "sumar" : "restar"}.`,
    `Se alinean por la **coma**: unidades con unidades, décimas con décimas, centésimas con centésimas…`,
    needZeros
      ? `Se **rellenan con ceros** los huecos a la derecha de la coma. No cambian el valor${op === "-" ? ", y aquí son imprescindibles: sin ellos no hay cifra de la que restar" : ", pero así todas las columnas quedan completas"}.`
      : `Todas las columnas tienen ya sus cifras: no hace falta añadir ceros.`,
    op === "+"
      ? `Se suma **de derecha a izquierda**, columna a columna. Cuando una columna pasa de 9, se **lleva** una unidad a la siguiente.`
      : `Se resta **de derecha a izquierda**, columna a columna. Si la cifra de arriba es menor, se **pide prestada** una unidad a la columna de la izquierda.`,
    `La coma del resultado queda **justo debajo** de las otras: $${termsTex} = ${texDec(resultText)}$.`,
  ];

  return {
    label: `${terms.join(` ${sign} `)} = ${resultText} en columna`,
    captions,
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        {/* guía de la coma */}
        <Fade show={beat >= 1}>
          <line x1={commaX} y1={y0 - 44} x2={commaX} y2={resY + 20} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 7" opacity={0.55} />
        </Fade>
        {/* llevadas */}
        {op === "+"
          ? carries.map((cv, c) =>
              cv > 0 ? (
                <Fade key={`cy${c}`} show={beat >= 3} dy={8} delay={(cols - 1 - c) * 280 + 140}>
                  <Txt x={colX(c)} y={carryY + 14} size={24} color={MANIM.orange}>
                    {cv}
                  </Txt>
                </Fade>
              ) : null,
            )
          : null}
        {/* términos */}
        {parsed.map((p, t) => {
          const dx = beat === 0 ? (F - p.frac.length) * W : 0;
          return (
            <g key={t}>
              <Move x={dx} y={0}>
                {Array.from({ length: cols }, (_, c) => {
                  const { ch, pad } = digitAt(t, c);
                  if (!ch) return null;
                  return pad ? (
                    <Fade key={c} show={beat >= 2} dx={-10} delay={(c - I - p.frac.length) * 120}>
                      <Txt x={colX(c)} y={rowY(t)} size={44} color={MANIM.yellow} mono>
                        {ch}
                      </Txt>
                    </Fade>
                  ) : (
                    <Txt key={c} x={colX(c)} y={rowY(t)} size={44} color={MANIM.ink} mono>
                      {ch}
                    </Txt>
                  );
                })}
                {p.frac.length > 0 ? (
                  <Txt x={commaX} y={rowY(t) + 6} size={44} color={MANIM.yellow} mono>
                    ,
                  </Txt>
                ) : null}
              </Move>
            </g>
          );
        })}
        {/* signo y raya */}
        <Txt x={x0 - 22} y={rowY(n - 1)} size={44} color={MANIM.blue} mono>
          {sign}
        </Txt>
        <WriteLine show x1={x0 - 34} y1={lineY} x2={x0 + width + 8} y2={lineY} color={MANIM.muted} width={3} />
        {/* resultado: de derecha a izquierda */}
        {resultDigits.map((ch, c) =>
          ch === " " ? null : (
            <Fade key={c} show={beat >= 3} dy={-8} delay={(cols - 1 - c) * 280}>
              <Txt x={colX(c)} y={resY} size={44} color={MANIM.green} mono>
                {ch}
              </Txt>
            </Fade>
          ),
        )}
        <Fade show={beat >= 3} delay={(F) * 280}>
          <Txt x={commaX} y={resY + 6} size={44} color={MANIM.yellow} mono>
            ,
          </Txt>
        </Fade>
        <Fade show={beat >= 4} dy={8}>
          <rect x={x0 - 8} y={resY - 44} width={width + 16} height={62} rx={12} fill="rgba(131,193,103,0.10)" stroke={MANIM.green} strokeWidth={2.5} />
        </Fade>
      </Canvas>
    ),
  };
}
