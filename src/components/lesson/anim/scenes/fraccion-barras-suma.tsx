import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { Frac, FractionBar, Subdivision } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import { gcd, lcm } from "@/components/lesson/anim/number-theory";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 190;
const H = 54;

/**
 * Suma o resta de dos fracciones con barras: se reducen a común denominador
 * (se cortan las dos barras en trozos iguales) y se cuentan trozos.
 */
export function buildFraccionBarrasSuma(params: {
  a?: number;
  b?: number;
  c?: number;
  d?: number;
  op?: "+" | "-";
}): AnimBuild {
  const a = params.a ?? 1;
  const b = params.b ?? 2;
  const c = params.c ?? 1;
  const d = params.d ?? 3;
  const op = params.op ?? "+";
  const sign = op === "+" ? "+" : "-";
  const m = lcm(b, d);
  const x = (a * m) / b;
  const y = (c * m) / d;
  const res = op === "+" ? x + y : x - y;
  const units = Math.max(1, Math.ceil(Math.max(x, y, res) / m));
  const unitW = 540 / units;
  const g = gcd(Math.abs(res), m) || 1;
  const simple = res === 0 ? "0" : g > 1 ? `$\\dfrac{${res / g}}{${m / g}}$` : "";
  const sameDen = b === d;

  const captions = sameDen
    ? [
        `Las dos fracciones son de **${b}** partes: los trozos tienen el mismo tamaño.`,
        `Como los trozos son iguales, ${op === "+" ? "se juntan" : "se quitan"} sin cambiar nada: solo se cuentan.`,
        `$${x} ${sign} ${y} = ${res}$ trozos de $\\dfrac{1}{${m}}$: $\\dfrac{${x}}{${m}} ${sign} \\dfrac{${y}}{${m}} = \\dfrac{${res}}{${m}}$.`,
      ]
    : [
        `$\\dfrac{${a}}{${b}}$ y $\\dfrac{${c}}{${d}}$ tienen trozos de **distinto tamaño**: así no se pueden contar juntos.`,
        `Buscamos trozos que valgan para las dos barras: cortamos hasta tener **${m}** partes (m.c.m.$(${b}, ${d}) = ${m}$).`,
        `Cada fracción se reescribe con esos trozos: $\\dfrac{${a}}{${b}} = \\dfrac{${x}}{${m}}$ y $\\dfrac{${c}}{${d}} = \\dfrac{${y}}{${m}}$.`,
        `Ahora sí: ${op === "+" ? "se juntan" : "se quitan"} trozos del mismo tamaño. $${x} ${sign} ${y} = ${res}$ trozos: $\\dfrac{${res}}{${m}}$${simple ? ` $=$ ${simple}` : ""}.`,
      ];
  const finalCaption = `Nos quedamos solo con el resultado: $\\dfrac{${res}}{${m}}$${simple ? ` $=$ ${simple}` : ""}.`;
  captions.push(finalCaption);
  const showSub = (beat: number) => (sameDen ? false : beat >= 1);
  const rewritten = (beat: number) => (sameDen ? true : beat >= 2);
  const resultBeat = (beat: number) => (sameDen ? beat >= 2 : beat >= 3);
  const focusBeat = (beat: number) => beat >= captions.length - 1;

  return {
    label: `${a}/${b} ${sign} ${c}/${d} con barras: común denominador ${m} y resultado ${res}/${m}`,
    captions,
    render: (beat) => (
      <Canvas>
        <Fade show={!focusBeat(beat)} dy={-14}>
        {/* fila 1 */}
        <FractionBar x={X0} y={70} unitW={unitW} h={H} units={units} den={b} shaded={a} color={MANIM.blue} />
        <Subdivision show={showSub(beat)} x={X0} y={70} unitW={unitW} h={H} units={units} parts={m} existing={b} />
        <Fade show={!rewritten(beat)}>
          <Frac x={110} y={98} n={a} d={b} size={30} color={MANIM.blue} />
        </Fade>
        <Fade show={rewritten(beat)}>
          <Frac x={110} y={98} n={x} d={m} size={30} color={MANIM.blue} />
        </Fade>
        <Txt x={110} y={166} size={34} color={MANIM.ink}>
          {sign === "+" ? "+" : "−"}
        </Txt>
        {/* fila 2 */}
        <FractionBar x={X0} y={180} unitW={unitW} h={H} units={units} den={d} shaded={c} color={MANIM.green} />
        <Subdivision show={showSub(beat)} x={X0} y={180} unitW={unitW} h={H} units={units} parts={m} existing={d} />
        <Fade show={!rewritten(beat)}>
          <Frac x={110} y={218} n={c} d={d} size={30} color={MANIM.green} />
        </Fade>
        <Fade show={rewritten(beat)}>
          <Frac x={110} y={218} n={y} d={m} size={30} color={MANIM.green} />
        </Fade>
        </Fade>
        {/* resultado */}
        <Move x={0} y={focusBeat(beat) ? -190 : 0}>
        <Fade show={resultBeat(beat)} dy={10}>
          <FractionBar
            x={X0}
            y={300}
            unitW={unitW}
            h={H}
            units={units}
            den={m}
            shaded={op === "+" ? res : x}
            color={MANIM.yellow}
            skip={op === "+" ? 0 : y}
          />
          <Fade show={!focusBeat(beat)}>
            <Txt x={110} y={338} size={30} color={MANIM.muted}>
              =
            </Txt>
            <Frac x={160 - 6} y={338} n={res} d={m} size={26} color={MANIM.yellow} />
          </Fade>
        </Fade>
        <Fade show={resultBeat(beat) && op === "-" && !focusBeat(beat)} dy={6}>
          <Txt x={X0 + (x - y / 2) * (unitW / m)} y={392} size={20} color={MANIM.red}>
            se quitan
          </Txt>
        </Fade>
        </Move>
        <Fade show={focusBeat(beat)} dy={14} delay={250}>
          <Frac x={g > 1 ? 330 : 400} y={310} n={res} d={m} size={72} color={MANIM.yellow} />
          {g > 1 ? (
            <>
              <Txt x={430} y={318} size={60} color={MANIM.muted}>
                =
              </Txt>
              <Frac x={520} y={310} n={res / g} d={m / g} size={72} color={MANIM.yellow} />
            </>
          ) : null}
        </Fade>
      </Canvas>
    ),
  };
}
