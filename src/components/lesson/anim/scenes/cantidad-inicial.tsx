import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 120;
const U = 4.4; // px por 1 %

/** Hallar la cantidad inicial: la final es el índice de variación por la inicial, luego se divide. */
export function buildCantidadInicial(params: { a?: number; b?: number }): AnimBuild {
  const fin = params.a ?? 783;
  const pct = params.b ?? 35;
  const idx = 1 + pct / 100;
  const ini = Math.round((fin / idx) * 100) / 100;
  const fmt = (v: number) => v.toLocaleString("es-ES");
  const idxTxt = idx.toString().replace(".", ",");
  const w100 = 100 * U;
  const wTotal = (100 + pct) * U;
  return {
    label: `Precio final ${fmt(fin)} € tras subir un ${pct} %: el inicial es ${fmt(ini)} €`,
    captions: [
      `El precio inicial es el **100 %**. Tras subir un ${pct} %, el final es el $${100 + pct}\\,\\%$ de aquel: $${fmt(fin)}$ €.`,
      `Ese $${100 + pct}\\,\\%$ es el **índice de variación** $1 + ${pct / 100} = ${idxTxt}$: precio final $= \\text{inicial} \\cdot ${idxTxt}$.`,
      `Para volver al inicial se **divide**: $${fmt(fin)} : ${idxTxt} = ${fmt(ini)}$ €.`,
      `Ojo: quitar un ${pct} % al final **no** devuelve el inicial, porque el ${pct} % se calcula sobre otra cantidad.`,
    ],
    render: (beat) => (
      <Canvas>
        <rect x={X0} y={110} width={wTotal} height={54} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={2} />
        <rect x={X0} y={110} width={w100} height={54} fill={MANIM.blue} fillOpacity={0.5} />
        <rect x={X0 + w100} y={110} width={pct * U} height={54} fill={MANIM.green} fillOpacity={0.55} />
        <Txt x={X0 + w100 / 2} y={146} size={26} color={MANIM.ink}>100 %</Txt>
        <Txt x={X0 + w100 + (pct * U) / 2} y={146} size={22} color={MANIM.ink}>{`+${pct} %`}</Txt>
        <Txt x={X0 + wTotal / 2} y={92} size={26} color={MANIM.green}>{`${fmt(fin)} € = ${100 + pct} %`}</Txt>
        <Fade show={beat >= 1} dy={8}>
          <Txt x={400} y={225} size={30} color={MANIM.yellow}>{`inicial · ${idxTxt} = ${fmt(fin)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={400} y={285} size={34} color={MANIM.orange}>{`${fmt(fin)} : ${idxTxt} = ${fmt(ini)} €`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={400} y={345} size={24} color={MANIM.red}>{`${fmt(fin)} · ${(1 - pct / 100).toString().replace(".", ",")} = ${fmt(Math.round(fin * (1 - pct / 100) * 100) / 100)} € ≠ ${fmt(ini)} €`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
