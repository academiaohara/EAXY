import type { Construccion, Dato, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 12 (sistema diédrico), primer bloque (págs. 95-100): representación del punto en la épura.
 * La épura es una sola hoja: la línea de tierra (LT) es horizontal, el plano vertical queda arriba y el horizontal abajo.
 * Las medidas (cota y alejamiento) se toman con el compás desde la LT y la línea de referencia se traza con la escuadra.
 */

export const ETIQUETAS_DIEDRICO: Record<string, string> = {
  lt: "LT", O: "O", Av: "A''", Bv: "B''", Cv: "C''", Dv: "D''", Ev: "E''", Ap: "A'", Bp: "B'", Cp: "C'", Dp: "D'", Ep: "E'",
};

const LT_Y = 190;
const O_X = 330;

function dato(id: string, largo: number, y: number, color: "azul" | "ambar") {
  const pts: Record<string, P> = { [`${id}1`]: [24, y], [`${id}2`]: [24 + largo, y] };
  const d: Dato = { a: `${id}1`, b: `${id}2`, nombre: id, color };
  return { pts, d };
}

type Config = {
  letra: "A" | "B" | "C" | "D" | "E";
  titulo: string;
  intro: string;
  /** Cota y alejamiento con signo: cota > 0 por encima del PH, alejamiento > 0 por delante del PV. */
  cota: number;
  alej: number;
  /** En el primer bisector la cota y el alejamiento son iguales y se toman con una sola abertura. */
  unaMedida?: boolean;
};

function punto(c: Config): Construccion {
  const { letra } = c;
  const hp = `${letra}p`; // proyección horizontal (planta): A'
  const vp = `${letra}v`; // proyección vertical (alzado): A''
  const yH = LT_Y + c.alej; // alejamiento positivo: la planta queda bajo la LT
  const yV = LT_Y - c.cota; // cota positiva: el alzado queda sobre la LT
  const dc = dato("cota", Math.abs(c.cota), 90, "azul");
  const da = c.unaMedida ? null : dato("alej", Math.abs(c.alej), 125, "ambar");
  const pts: Record<string, P> = { _l1: [40, LT_Y], lt: [580, LT_Y], O: [O_X, LT_Y], [hp]: [O_X, yH], [vp]: [O_X, yV], ...dc.pts, ...(da?.pts ?? {}) };
  const ys = [LT_Y, yH, yV];
  const arriba = ys.indexOf(Math.min(...ys));
  const abajo = ys.indexOf(Math.max(...ys));
  const nombres = ["O", hp, vp];
  const medidaCota: Op = { k: "medir", de: dc.d.a, a: dc.d.b };
  const medidaAlej: Op = c.unaMedida ? medidaCota : { k: "medir", de: da!.d.a, a: da!.d.b };
  const ops: Op[] = [{ k: "perp", recta: ["_l1", "lt"], punto: "O", traza: [nombres[arriba], nombres[abajo]] }];
  if (c.unaMedida) {
    ops.push(medidaCota, { k: "arco", c: "O", hacia: hp }, { k: "arco", c: "O", hacia: vp }, { k: "marca", p: hp }, { k: "marca", p: vp });
  } else {
    ops.push(medidaAlej, { k: "arco", c: "O", hacia: hp }, { k: "marca", p: hp }, medidaCota, { k: "arco", c: "O", hacia: vp }, { k: "marca", p: vp });
  }
  return {
    titulo: c.titulo,
    intro: c.intro,
    pts,
    dados: ["lt", "O", dc.d.a, dc.d.b, ...(da ? [da.d.a, da.d.b] : [])],
    datos: da ? [dc.d, da.d] : [dc.d],
    base: [["_l1", "lt"]],
    radioMin: 30,
    ops,
  };
}

export const CONSTRUCCIONES_DIEDRICO = {
  "punto-primer-diedro": punto({
    letra: "A", cota: 70, alej: 55,
    titulo: "Punto del primer diedro",
    intro: "Representa el punto $A$ del **primer diedro**: tiene **cota** positiva (sobre el plano horizontal) y **alejamiento** positivo (delante del vertical). Las dos medidas están dadas como segmentos y $O$ es el pie de la línea de referencia en la **LT**.",
  }),
  "punto-segundo-diedro": punto({
    letra: "B", cota: 60, alej: -45,
    titulo: "Punto del segundo diedro",
    intro: "Representa el punto $B$ del **segundo diedro**: cota **positiva** y alejamiento **negativo** (detrás del plano vertical). Sus dos proyecciones quedan **sobre** la LT.",
  }),
  "punto-tercer-diedro": punto({
    letra: "C", cota: -55, alej: -50,
    titulo: "Punto del tercer diedro",
    intro: "Representa el punto $C$ del **tercer diedro**: cota y alejamiento **negativos**. Tiene una proyección a cada lado de la LT, pero **invertidas**: la horizontal $C'$ por encima y la vertical $C''$ por debajo.",
  }),
  "punto-cuarto-diedro": punto({
    letra: "D", cota: -50, alej: 60,
    titulo: "Punto del cuarto diedro",
    intro: "Representa el punto $D$ del **cuarto diedro**: cota **negativa** y alejamiento **positivo**. Sus dos proyecciones quedan **bajo** la LT.",
  }),
  "punto-primer-bisector": punto({
    letra: "E", cota: 65, alej: 65, unaMedida: true,
    titulo: "Punto del primer bisector",
    intro: "Representa el punto $E$ del **primer bisector**: cota y alejamiento son **iguales**, así que sus proyecciones están a la misma distancia de la LT, una a cada lado. Una sola abertura del compás sirve para las dos.",
  }),
} satisfies Record<string, Construccion>;
