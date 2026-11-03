import type { Construccion, Dato, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 12 (sistema diédrico), primer bloque (págs. 95-100): representación del punto en la épura.
 * La épura es una sola hoja: la línea de tierra (LT) es horizontal, el plano vertical queda arriba y el horizontal abajo.
 * Las medidas (cota y alejamiento) se toman con el compás desde la LT y la línea de referencia se traza con la escuadra.
 */

export const ETIQUETAS_DIEDRICO: Record<string, string> = {
  lt: "LT", O: "O", Av: "A''", Bv: "B''", Cv: "C''", Dv: "D''", Ev: "E''", Ap: "A'", Bp: "B'", Cp: "C'", Dp: "D'", Ep: "E'",
  Rp: "r'", Rv: "r''", Nv: "N''", Hp: "H'", Hv: "H''", Vp: "V'", Vv: "V''",
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

const PUNTOS = {
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

/** Recta r por los puntos A y B: sus proyecciones son las rectas que unen las proyecciones de los dos puntos. */
function proyeccionesRecta(): Construccion {
  return {
    titulo: "Proyecciones de una recta",
    intro: "Una recta queda definida por dos puntos. Dados $A(A'-A'')$ y $B(B'-B'')$, dibuja las proyecciones de la recta $r$: $r'$ une $A'$ con $B'$ y $r''$ une $A''$ con $B''$.",
    pts: { _l1: [40, LT_Y], lt: [580, LT_Y], Ap: [200, 220], Av: [200, 120], Bp: [320, 292], Bv: [320, 170] },
    dados: ["lt", "Ap", "Av", "Bp", "Bv"],
    datos: [],
    base: [["_l1", "lt"]],
    ops: [{ k: "recta", a: "Ap", b: "Bp" }, { k: "recta", a: "Av", b: "Bv" }],
  };
}

/** Trazas de una recta: la horizontal tiene cota 0 (su alzado está en la LT) y la vertical alejamiento 0 (su planta está en la LT). */
function trazasRecta(): Construccion {
  // r'': de A''(200,120) a B''(300,170), pendiente 0,5; corta la LT en x = 340.
  // r': de A'(200,220) a B'(300,280), pendiente 0,6; corta la LT en x = 150.
  return {
    titulo: "Trazas de una recta",
    intro: "Se llaman **trazas** los puntos donde la recta corta a los planos de proyección. La **traza horizontal** $H(H'-H'')$ está en el $PH$: su proyección vertical $H''$ está en la **LT**. La **traza vertical** $V(V'-V'')$ está en el $PV$: su proyección horizontal $V'$ está en la **LT**.",
    pts: {
      _l1: [40, LT_Y], lt: [580, LT_Y],
      Ap: [200, 220], Av: [200, 120], Bp: [300, 280], Bv: [300, 170],
      Hv: [340, LT_Y], Hp: [340, 304], Vp: [150, LT_Y], Vv: [150, 95],
    },
    dados: ["lt", "Ap", "Av", "Bp", "Bv"],
    datos: [],
    base: [["_l1", "lt"], ["Ap", "Bp"], ["Av", "Bv"]],
    ext: 200,
    ops: [
      { k: "recta", a: "Av", b: "Bv" }, { k: "marca", p: "Hv" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Hv", traza: ["Hv", "Hp"] }, { k: "marca", p: "Hp" },
      { k: "recta", a: "Ap", b: "Bp" }, { k: "marca", p: "Vp" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Vp", traza: ["Vv", "Vp"] }, { k: "marca", p: "Vv" },
    ],
  };
}

const LT_BASE = { _l1: [40, LT_Y] as P, lt: [580, LT_Y] as P };

/** Recta perpendicular al plano horizontal (recta de punta respecto al H): su proyección horizontal es un punto. */
function rectaVertical(): Construccion {
  return {
    titulo: "Recta perpendicular al plano horizontal",
    intro: "Una recta $a$ **perpendicular al plano $H$**, situada delante del $V$, tiene por proyección horizontal un **punto** $a'$. Dibuja su proyección vertical $a''$: es **perpendicular a la L.T.** por $a'$ (un punto $N$ de ella es $N'$-$N''$, con $N'$ en $a'$).",
    pts: { ...LT_BASE, Ap: [330, 270], Nv: [330, 80] },
    dados: ["lt", "Ap"],
    datos: [],
    base: [["_l1", "lt"]],
    ops: [{ k: "perp", recta: ["_l1", "lt"], punto: "Ap", traza: ["Nv", "Ap"] }, { k: "marca", p: "Nv" }],
  };
}

/** Recta paralela a la L.T.: sus dos proyecciones son paralelas a la L.T. */
function rectaParalelaLT(): Construccion {
  return {
    titulo: "Recta paralela a la línea de tierra",
    intro: "Una recta **paralela a la L.T.** tiene sus dos proyecciones paralelas a la L.T. Dado el punto $A(A'-A'')$ de la recta, dibuja $r'$ y $r''$ por $A'$ y $A''$.",
    pts: { ...LT_BASE, Ap: [220, 255], Av: [220, 115], Rp: [520, 255], Rv: [520, 115] },
    dados: ["lt", "Ap", "Av"],
    datos: [],
    base: [["_l1", "lt"]],
    ops: [
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Ap"], cortes: ["Rp"] },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Av"], cortes: ["Rv"] },
    ],
  };
}

/** Recta horizontal (paralela al plano H): su proyección vertical es paralela a la L.T. y su traza vertical está en el PV. */
function rectaHorizontal(): Construccion {
  return {
    titulo: "Recta paralela al plano horizontal",
    intro: "Una recta **paralela al plano $H$** está por encima de él y no tiene traza horizontal. Su proyección vertical $r''$ es **paralela a la L.T.** y $r'$ es cualquiera. Dados $r'$ y el punto $A''$, traza $r''$ y halla la **traza vertical** $V(V'-V'')$.",
    pts: { ...LT_BASE, Ap: [200, 260], Bp: [300, 220], Av: [200, 115], Rv: [520, 115], Vp: [375, LT_Y], Vv: [375, 115] },
    dados: ["lt", "Ap", "Bp", "Av"],
    datos: [],
    base: [["_l1", "lt"], ["Ap", "Bp"]],
    ext: 200,
    ops: [
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Av"], cortes: ["Rv"] },
      { k: "recta", a: "Ap", b: "Bp" }, { k: "marca", p: "Vp" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Vp", traza: ["Vv", "Vp"] }, { k: "marca", p: "Vv" },
    ],
  };
}

/** Recta frontal (paralela al plano V): su proyección horizontal es paralela a la L.T. y su traza horizontal está en el PH. */
function rectaFrontal(): Construccion {
  return {
    titulo: "Recta paralela al plano vertical",
    intro: "Una recta **paralela al plano $V$**, llamada **frontal**, no tiene traza vertical. Su proyección horizontal $r'$ es **paralela a la L.T.** y $r''$ es cualquiera. Dados $r''$ y el punto $A'$, traza $r'$ y halla la **traza horizontal** $H(H'-H'')$.",
    pts: { ...LT_BASE, Av: [200, 115], Bv: [300, 155], Ap: [200, 255], Rp: [520, 255], Hv: [375, LT_Y], Hp: [375, 255] },
    dados: ["lt", "Av", "Bv", "Ap"],
    datos: [],
    base: [["_l1", "lt"], ["Av", "Bv"]],
    ext: 200,
    ops: [
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Ap"], cortes: ["Rp"] },
      { k: "recta", a: "Av", b: "Bv" }, { k: "marca", p: "Hv" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Hv", traza: ["Hv", "Hp"] }, { k: "marca", p: "Hp" },
    ],
  };
}

export const CONSTRUCCIONES_DIEDRICO = { ...PUNTOS, "recta-proyecciones": proyeccionesRecta(), "recta-trazas": trazasRecta(), "recta-vertical": rectaVertical(), "recta-paralela-lt": rectaParalelaLT(), "recta-horizontal": rectaHorizontal(), "recta-frontal": rectaFrontal() } satisfies Record<string, Construccion>;
