import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { ORDER_ABBR, ORDER_PLURAL, parseDec, texDec } from "@/components/lesson/anim/decimal";

const INT_ABBR = ["UM", "C", "D", "U"];
const GAP = 34;
const ROW_Y = [200, 290];

/** Comparar decimales: parte entera, igualar cifras con ceros y primera cifra que se diferencia. */
export function buildCompararDecimales(params: { terms?: string[] }): AnimBuild {
  const [ta = "5,04", tb = "5,4"] = params.terms ?? [];
  const a = parseDec(ta);
  const b = parseDec(tb);
  const intLen = Math.min(4, Math.max(1, a.int.length, b.int.length));
  const fracLen = Math.min(6, Math.max(1, a.frac.length, b.frac.length));
  const cols = intLen + fracLen;
  const colW = Math.min(80, 520 / cols);
  const total = cols * colW + GAP;
  const x0 = (800 - (intLen + fracLen) * colW - GAP - 120) / 2;
  const intX = (j: number) => x0 + j * colW + colW / 2;
  const fracX = (j: number) => x0 + intLen * colW + GAP + j * colW + colW / 2;
  const commaX = x0 + intLen * colW + GAP / 2;

  const intA = Number(a.int);
  const intB = Number(b.int);
  const decidedByInt = intA !== intB;
  const fa = a.frac.padEnd(fracLen, "0");
  const fb = b.frac.padEnd(fracLen, "0");
  const firstDiff = (() => {
    for (let j = 0; j < fracLen; j += 1) if (fa[j] !== fb[j]) return j;
    return -1;
  })();
  const cmp = decidedByInt ? Math.sign(intA - intB) : firstDiff === -1 ? 0 : Math.sign(Number(fa[firstDiff]) - Number(fb[firstDiff]));
  const sym = cmp === 0 ? "=" : cmp > 0 ? ">" : "<";
  const needsZeros = a.frac.length !== b.frac.length;
  const shorter = a.frac.length < b.frac.length ? ta : tb;
  const padded = a.frac.length < b.frac.length ? `${a.int},${fa}` : `${b.int},${fb}`;
  const order = firstDiff >= 0 ? ORDER_PLURAL[firstDiff]! : "";
  const whole = `$${Number(fa)}$ ${ORDER_PLURAL[fracLen - 1]} frente a $${Number(fb)}$`;

  const captions = decidedByInt
    ? [
        `¿Cuál es mayor, $${texDec(ta)}$ o $${texDec(tb)}$? Se colocan **coma bajo coma**.`,
        `Se empieza por la **parte entera**: $${intA}$ y $${intB}$ son distintas, así que **ya decide**: $${intA} ${intA > intB ? ">" : "<"} ${intB}$.`,
        `$${texDec(ta)} ${sym} ${texDec(tb)}$. Ya está decidido: no hace falta mirar los decimales.`,
      ]
    : [
        `¿Cuál es mayor, $${texDec(ta)}$ o $${texDec(tb)}$? Se colocan **coma bajo coma**.`,
        `Se empieza por la **parte entera**: las dos son $${intA}$. **No decide**, hay que mirar los decimales.`,
        needsZeros
          ? `Se **igualan las cifras decimales** añadiendo ceros a la derecha. No cambian el valor: $${texDec(shorter)} = ${texDec(padded)}$.`
          : `Ya tienen el mismo número de cifras decimales: no hace falta añadir ceros.`,
        firstDiff === -1
          ? `Todas las cifras coinciden: son **iguales**.`
          : `Se compara de izquierda a derecha hasta la **primera cifra distinta**: en las ${order}, $${fa[firstDiff]}$ frente a $${fb[firstDiff]}$. Es lo mismo que comparar ${whole}.`,
        `$${texDec(ta)} ${sym} ${texDec(tb)}$.`,
      ];

  const last = captions.length - 1;
  const intBeat = 1;
  const zerosBeat = decidedByInt ? -1 : 2;
  const diffBeat = decidedByInt ? -1 : 3;

  const rows = [
    { d: a, f: a.frac, y: ROW_Y[0]! },
    { d: b, f: b.frac, y: ROW_Y[1]! },
  ];

  return {
    label: `Comparar ${ta} y ${tb}: ${ta} ${sym} ${tb}`,
    captions,
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        {/* cabecera de órdenes */}
        {Array.from({ length: intLen }, (_, j) => (
          <Txt key={`hi${j}`} x={intX(j)} y={110} size={24} color={MANIM.muted}>
            {INT_ABBR[INT_ABBR.length - intLen + j]}
          </Txt>
        ))}
        {Array.from({ length: fracLen }, (_, j) => (
          <Txt key={`hf${j}`} x={fracX(j)} y={110} size={24} color={MANIM.muted}>
            {ORDER_ABBR[j]}
          </Txt>
        ))}
        {/* resaltado de la parte entera */}
        <Fade show={beat === intBeat}>
          <rect x={x0 - 4} y={142} width={intLen * colW + 8} height={ROW_Y[1]! - ROW_Y[0]! + 76} rx={12} fill="rgba(88,196,221,0.12)" stroke={MANIM.blue} strokeWidth={2.5} />
        </Fade>
        {/* primera cifra distinta */}
        {firstDiff >= 0 && !decidedByInt ? (
          <Fade show={beat >= diffBeat}>
            <rect x={fracX(firstDiff) - colW / 2 + 2} y={142} width={colW - 4} height={ROW_Y[1]! - ROW_Y[0]! + 76} rx={12} fill="rgba(255,216,102,0.14)" stroke={MANIM.yellow} strokeWidth={2.5} />
          </Fade>
        ) : null}
        {rows.map(({ d, f, y }, r) => (
          <g key={r}>
            {d.int
              .padStart(intLen, " ")
              .split("")
              .map((c, j) => (
                <Txt key={`i${j}`} x={intX(j)} y={y} size={56} color={MANIM.ink} mono>
                  {c === " " ? "" : c}
                </Txt>
              ))}
            <Txt x={commaX} y={y + 6} size={56} color={MANIM.yellow} mono>
              ,
            </Txt>
            {Array.from({ length: fracLen }, (_, j) => {
              const original = j < f.length;
              return original ? (
                <Txt key={`f${j}`} x={fracX(j)} y={y} size={56} color={MANIM.ink} mono>
                  {f[j]}
                </Txt>
              ) : (
                <Fade key={`f${j}`} show={zerosBeat >= 0 && beat >= zerosBeat} dx={-10} delay={120 * (j - f.length)}>
                  <Txt x={fracX(j)} y={y} size={56} color={MANIM.yellow} mono>
                    0
                  </Txt>
                </Fade>
              );
            })}
          </g>
        ))}
        {/* resultado */}
        <Fade show={beat === last} dx={-14}>
          <Txt x={x0 + total + 70} y={(ROW_Y[0]! + ROW_Y[1]!) / 2 + 18} size={96} color={MANIM.yellow}>
            {sym}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
