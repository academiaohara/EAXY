import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fromScaled, parseDec, scaled, texDec } from "@/components/lesson/anim/decimal";

const W = 50;
const XR = 430;
const Y_A = 78;
const Y_B = 128;
const STEP = 48;

/** Multiplicar decimales: como naturales y la coma se coloca contando las cifras decimales de los dos factores. */
export function buildDecimalProducto(params: { terms?: string[]; places?: number }): AnimBuild {
  const [ta = "12,85", tb = "3,5"] = params.terms ?? [];
  const a = parseDec(ta);
  const b = parseDec(tb);
  const A = scaled(ta);
  const B = scaled(tb);
  const decA = a.frac.length;
  const decB = b.frac.length;
  const dec = decA + decB;
  const product = A * B;
  const productText = fromScaled(product, dec);
  const naturalDigits = String(product);
  const padded = String(product).padStart(dec + 1, "0");
  const bDigits = String(B).split("").reverse();
  const partials = bDigits.map((d, k) => ({ k, digit: Number(d), value: String(A * Number(d)) }));
  const rows = partials.length;
  const lineY = 138 + rows * STEP + 14;
  const resY = lineY + 46;
  const places = params.places;
  const rounds = places !== undefined && dec > places;
  const roundedText = rounds ? fromScaled(Math.round(product / 10 ** (dec - places!)), places!) : "";

  const cx = (c: number) => XR - c * W;
  const commaAt = (f: number) => XR - (f - 0.5) * W;
  const aDigits = String(A).split("");
  const bAll = String(B).split("");
  // ceros delante del factor tal como se escribe (0,4): se ven con las comas y se olvidan después
  const leadA = `${a.int}${a.frac}`.length - String(A).length;
  const leadB = `${b.int}${b.frac}`.length - String(B).length;
  const rowTop = (i: number) => 150 + (i + 1) * STEP - 12;

  const captions = [
    `Hay que multiplicar $${texDec(ta)} \\cdot ${texDec(tb)}$. Se anota cuántas cifras decimales tiene **cada factor**: ${decA} y ${decB}.`,
    `Se **olvidan las comas** y se multiplica como si fueran números naturales: $${A} \\cdot ${B}$.`,
    `Se multiplican las cifras de uno en uno, desplazando cada fila un lugar a la izquierda (productos parciales).`,
    `Se suman los productos parciales: $${A} \\cdot ${B} = ${product}$.`,
    `El producto lleva **${decA} + ${decB} = ${dec}** cifras decimales: se cuentan ${dec} desde la derecha y se pone la coma. Resultado: $${texDec(productText)}$.`,
    ...(rounds
      ? [`Como es dinero, se redondea a **céntimos** (${places} cifras decimales): $${texDec(productText)} \\approx ${texDec(roundedText)}$.`]
      : []),
  ];

  return {
    label: `${ta} por ${tb} = ${productText}`,
    captions,
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        {/* factores */}
        {[...Array(leadA).keys()].map((i) => (
          <Fade key={`la${i}`} show={beat === 0}>
            <Txt x={cx(aDigits.length + leadA - 1 - i)} y={Y_A} size={42} color={MANIM.ink} mono>
              0
            </Txt>
          </Fade>
        ))}
        {[...Array(leadB).keys()].map((i) => (
          <Fade key={`lb${i}`} show={beat === 0}>
            <Txt x={cx(bAll.length + leadB - 1 - i)} y={Y_B} size={42} color={MANIM.ink} mono>
              0
            </Txt>
          </Fade>
        ))}
        {aDigits.map((ch, i) => (
          <Txt key={`a${i}`} x={cx(aDigits.length - 1 - i)} y={Y_A} size={42} color={MANIM.ink} mono>
            {ch}
          </Txt>
        ))}
        {bAll.map((ch, i) => (
          <Txt key={`b${i}`} x={cx(bAll.length - 1 - i)} y={Y_B} size={42} color={MANIM.ink} mono>
            {ch}
          </Txt>
        ))}
        <Txt x={cx(Math.max(aDigits.length + leadA, bAll.length + leadB)) - 4} y={Y_B} size={42} color={MANIM.blue} mono>
          ×
        </Txt>
        {/* comas de los factores */}
        <Fade show={beat === 0} dy={-6}>
          {decA > 0 ? (
            <Txt x={commaAt(decA)} y={Y_A + 6} size={42} color={MANIM.yellow} mono>
              ,
            </Txt>
          ) : null}
          {decB > 0 ? (
            <Txt x={commaAt(decB)} y={Y_B + 6} size={42} color={MANIM.yellow} mono>
              ,
            </Txt>
          ) : null}
        </Fade>
        {/* cifras decimales de cada factor */}
        <Fade show={beat >= 0 && beat <= 4} dx={-8}>
          <Txt x={XR + 40} y={Y_A - 4} size={22} color={MANIM.yellow} anchor="start">
            {`${decA} cifra${decA === 1 ? "" : "s"} decimal${decA === 1 ? "" : "es"}`}
          </Txt>
          <Txt x={XR + 40} y={Y_B - 4} size={22} color={MANIM.yellow} anchor="start">
            {`${decB} cifra${decB === 1 ? "" : "s"} decimal${decB === 1 ? "" : "es"}`}
          </Txt>
        </Fade>
        <WriteLine show x1={XR - Math.max(aDigits.length + leadA, bAll.length + leadB, 1) * W - 10} y1={Y_B + 22} x2={XR + 30} y2={Y_B + 22} color={MANIM.muted} width={3} />

        {/* productos parciales */}
        {partials.map((p, i) => (
          <g key={i}>
            {p.value.split("").map((ch, j) => (
              <Fade key={j} show={beat >= 2} dy={10} delay={i * 350 + (p.value.length - 1 - j) * 60}>
                <Txt x={cx(p.k + p.value.length - 1 - j)} y={rowTop(i)} size={42} color={i % 2 === 0 ? MANIM.blue : MANIM.purple} mono>
                  {ch}
                </Txt>
              </Fade>
            ))}
          </g>
        ))}
        <WriteLine show={beat >= 3} x1={XR - Math.max(naturalDigits.length, 1) * W - 10} y1={lineY} x2={XR + 30} y2={lineY} color={MANIM.muted} width={3} />

        {/* resultado */}
        {naturalDigits.split("").map((ch, j) => (
          <Fade key={j} show={beat >= 3} dy={-8} delay={(naturalDigits.length - 1 - j) * 200}>
            <Txt x={cx(naturalDigits.length - 1 - j)} y={resY} size={42} color={MANIM.green} mono>
              {ch}
            </Txt>
          </Fade>
        ))}
        {/* ceros a la izquierda si el producto es menor que 1 */}
        {padded.length > naturalDigits.length
          ? padded
              .slice(0, padded.length - naturalDigits.length)
              .split("")
              .map((ch, j, all) => (
                <Fade key={`z${j}`} show={beat >= 4} dx={10}>
                  <Txt x={cx(naturalDigits.length + (all.length - 1 - j))} y={resY} size={42} color={MANIM.yellow} mono>
                    {ch}
                  </Txt>
                </Fade>
              ))
          : null}
        <Fade show={beat >= 4} dy={-8}>
          {dec > 0 ? (
            <Txt x={commaAt(dec)} y={resY + 6} size={42} color={MANIM.yellow} mono>
              ,
            </Txt>
          ) : null}
          <Txt x={XR + 40} y={resY - 4} size={24} color={MANIM.yellow} anchor="start">
            {`${decA} + ${decB} = ${dec} decimales`}
          </Txt>
        </Fade>
        {rounds ? (
          <Fade show={beat >= 5} dy={10}>
            <Txt x={400} y={resY + 54} size={34} color={MANIM.yellow}>
              {`${productText} ≈ ${roundedText}`}
            </Txt>
          </Fade>
        ) : null}
      </Canvas>
    ),
  };
}
