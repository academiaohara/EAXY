import type { Construccion, Dato, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 12 (sistema diédrico), primer bloque (págs. 95-100): representación del punto en la épura.
 * La épura es una sola hoja: la línea de tierra (LT) es horizontal, el plano vertical queda arriba y el horizontal abajo.
 * Las medidas (cota y alejamiento) se toman con el compás desde la LT y la línea de referencia se traza con la escuadra.
 */

export const ETIQUETAS_DIEDRICO: Record<string, string> = {
  lt: "LT", O: "O", Av: "A''", Bv: "B''", Cv: "C''", Dv: "D''", Ev: "E''", Ap: "A'", Bp: "B'", Cp: "C'", Dp: "D'", Ep: "E'",
  Rp: "r'", N: "N", Gp: "G'≡G''", Pv: "P''", Fq: "f''", Qp: "Q'", Qv: "Q''", Ea: "α₁", Eb: "α₂", Pa1: "", Pa2: "", b1: "β₁", b2: "β₂", rp: "r'", rv: "r''", Hl: "H", Hb: "", Aa: "", Ab: "", Ba: "", Bb: "", Al: "", Bl: "", A1: "A₁", B1: "B₁", V1: "V", Hq1: "", Hh: "", Uv1: "", Uv2: "", Uv3: "", Uc1: "", Uc2: "", Uc3: "", T1v: "1''", T2v: "2''", T3v: "3''", T1p: "1'", T2p: "2'", T3p: "3'", Pm: "", Pq: "", Pf: "", C0: "", Hq: "h'", _a1: "α₁", _a2: "α₂", H1p: "H₁'", H1v: "H₁''", Rv: "r''", Nv: "N''", Hp: "H'", Hv: "H''", Vp: "V'", Vv: "V''",
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

// Plano α(α₁-α₂) de trazas que se cortan en N (150, LT): α₁ baja con pendiente 0,35 y α₂ sube con pendiente 0,6.
const NX = 150;
const alfa1 = (x: number): number => LT_Y + 0.35 * (x - NX);
const alfa2 = (x: number): number => LT_Y - 0.6 * (x - NX);
const PLANO_PTS: Record<string, P> = { ...LT_BASE, N: [NX, LT_Y], _a1: [560, alfa1(560)], _a2: [400, alfa2(400)] };

/** Trazas de un plano definido por dos rectas r y s que se cortan en A (Fig. 29). */
function planoDosRectas(): Construccion {
  // r pasa por V(260) y H(420); s pasa por A y por H₁(520).
  const pr1 = (x: number): number => 190 + ((alfa1(420) - 190) / 160) * (x - 260);
  const pr2 = (x: number): number => alfa2(260) + ((190 - alfa2(260)) / 160) * (x - 260);
  const ax = 330;
  const ps1 = (x: number): number => pr1(ax) + ((alfa1(520) - pr1(ax)) / (520 - ax)) * (x - ax);
  const ps2 = (x: number): number => pr2(ax) + ((190 - pr2(ax)) / (520 - ax)) * (x - ax);
  return {
    titulo: "Trazas de un plano definido por dos rectas",
    intro: "Un plano definido por dos rectas que se cortan, $r$ y $s$ (o por tres puntos no alineados), se representa por sus **trazas**. Las trazas del plano son los lugares geométricos de las trazas de todas sus rectas: se hallan las **trazas horizontales** $H'$ y $H_1'$ de $r$ y $s$ y se unen para obtener $\\alpha_1$; $\\alpha_2$ pasa por $N$ y por la traza vertical $V''$.",
    pts: {
      _l1: [40, LT_Y], lt: [580, LT_Y], N: [NX, LT_Y],
      Ap: [ax, pr1(ax)], Av: [ax, pr2(ax)], Bp: [370, pr1(370)], Bv: [370, pr2(370)], Cp: [470, ps1(470)], Cv: [470, ps2(470)],
      Hv: [420, 190], Hp: [420, alfa1(420)], H1v: [520, 190], H1p: [520, alfa1(520)], Vp: [260, 190], Vv: [260, alfa2(260)],
    },
    dados: ["lt", "Ap", "Av", "Bp", "Bv", "Cp", "Cv"],
    datos: [],
    base: [["_l1", "lt"], ["Ap", "Bp"], ["Av", "Bv"], ["Ap", "Cp"], ["Av", "Cv"]],
    ext: 200,
    escala: 0.8,
    ops: [
      { k: "recta", a: "Av", b: "Bv" }, { k: "marca", p: "Hv" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Hv", traza: ["Hv", "Hp"] }, { k: "marca", p: "Hp" },
      { k: "recta", a: "Av", b: "Cv" }, { k: "marca", p: "H1v" },
      { k: "perp", recta: ["_l1", "lt"], punto: "H1v", traza: ["H1v", "H1p"] }, { k: "marca", p: "H1p" },
      { k: "recta", a: "Hp", b: "H1p" }, { k: "marca", p: "N" },
      { k: "recta", a: "Ap", b: "Bp" }, { k: "marca", p: "Vp" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Vp", traza: ["Vv", "Vp"] }, { k: "marca", p: "Vv" },
      { k: "recta", a: "N", b: "Vv" },
    ],
  };
}

/** Recta contenida en un plano (Fig. 30): dada r′, hallar r″ con las trazas. */
function rectaEnPlano(): Construccion {
  const pr1 = (x: number): number => 190 + ((alfa1(420) - 190) / 160) * (x - 260);
  return {
    titulo: "Recta contenida en un plano",
    intro: "Una recta está en un plano cuando **sus trazas están sobre las trazas del mismo nombre del plano**. Dado el plano $\\alpha$ y la proyección horizontal $r'$ de una recta contenida en él, halla $r''$: $H'$ es donde $r'$ corta a $\\alpha_1$ y $V'$ donde corta a la L.T.",
    pts: {
      ...PLANO_PTS,
      Rp1: [330, pr1(330)], Rp2: [380, pr1(380)],
      Hp: [420, alfa1(420)], Hv: [420, 190], Vp: [260, 190], Vv: [260, alfa2(260)],
    },
    dados: ["lt", "N", "Rp1", "Rp2"],
    datos: [],
    base: [["_l1", "lt"], ["N", "_a1"], ["N", "_a2"], ["Rp1", "Rp2"]],
    ext: 200,
    ops: [
      { k: "recta", a: "Rp1", b: "Rp2" }, { k: "marca", p: "Hp" }, { k: "marca", p: "Vp" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Hp", traza: ["Hv", "Hp"] }, { k: "marca", p: "Hv" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Vp", traza: ["Vv", "Vp"] }, { k: "marca", p: "Vv" },
      { k: "recta", a: "Hv", b: "Vv" },
    ],
  };
}

/** Recta horizontal de un plano a una cota dada (Fig. 31): h″ paralela a la L.T. y h′ paralela a α₁. */
function horizontalDelPlano(): Construccion {
  const c = 70;
  const vx = NX + c / 0.6;
  const dc = dato("cota", c, 90, "azul");
  return {
    titulo: "Recta horizontal de un plano",
    intro: "Las **rectas horizontales** de un plano son paralelas al plano $H$: su proyección vertical $h''$ es **paralela a la L.T.** a una distancia igual a la cota, y $h'$ es **paralela a $\\alpha_1$**. Halla la horizontal del plano $\\alpha$ de **cota** dada.",
    pts: {
      ...PLANO_PTS, ...dc.pts,
      O: [200, LT_Y], C0: [200, LT_Y - c], Vv: [vx, LT_Y - c], Vp: [vx, LT_Y], Hq: [vx + 150, LT_Y + 0.35 * 150],
    },
    dados: ["lt", "N", "O", dc.d.a, dc.d.b],
    datos: [dc.d],
    base: [["_l1", "lt"], ["N", "_a1"], ["N", "_a2"]],
    radioMin: 30,
    ops: [
      { k: "perp", recta: ["_l1", "lt"], punto: "O", traza: ["C0", "O"] },
      { k: "medir", de: dc.d.a, a: dc.d.b }, { k: "arco", c: "O", hacia: "C0" }, { k: "marca", p: "C0" },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["C0"], cortes: ["Vv"] },
      { k: "perp", recta: ["_l1", "lt"], punto: "Vv", traza: ["Vv", "Vp"] }, { k: "marca", p: "Vp" },
      { k: "paralelas", recta: ["N", "_a1"], marcas: ["Vp"], cortes: ["Hq"] },
    ],
  };
}

// ---- Tercera proyección de una recta de perfil (págs. 103-105, problemas 12 y 13) ----
// La recta r(r'-r'') está en la perpendicular x = 190; el plano de perfil β tiene su traza en x = 330 y O = β ∩ LT.
const RX = 190;
const OX = 330;
const PERFIL_BASE: Record<string, P> = { ...LT_BASE, O: [OX, LT_Y], b1: [OX, 350], b2: [OX, 30], rp: [RX, 345], rv: [RX, 40] };
const PERFIL_BASES: [string, string][] = [["_l1", "lt"], ["b1", "b2"], ["rp", "rv"]];

/** Problema 12: dadas las trazas de una recta de perfil y A', hallar A''. */
function perfilPunto(): Construccion {
  return {
    titulo: "Punto de una recta de perfil",
    intro: "Una recta de perfil tiene sus dos proyecciones en una misma perpendicular a la L.T., así que **no basta con ellas** para situar un punto. Se pasa a una **tercera proyección** sobre un plano de perfil $\\beta$. Conocidas las trazas $H'$ y $V''$ de la recta y la proyección $A'$ de un punto, halla $A''$.",
    pts: {
      ...PERFIL_BASE,
      Hp: [RX, 300], Vv: [RX, 80], Ap: [RX, 250], Av: [RX, 140],
      Hb: [OX, 300], Hl: [440, LT_Y], V1: [OX, 80], Ab: [OX, 250], Al: [390, LT_Y], A1: [390, 140],
    },
    dados: ["lt", "O", "Hp", "Vv", "Ap"],
    datos: [],
    base: PERFIL_BASES,
    radioMin: 30,
    ops: [
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Hp"], cortes: ["Hb"] },
      { k: "medir", de: "O", a: "Hb" }, { k: "arco", c: "O", hacia: "Hl" }, { k: "marca", p: "Hl" },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Vv"], cortes: ["V1"] },
      { k: "recta", a: "V1", b: "Hl" },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Ap"], cortes: ["Ab"] },
      { k: "medir", de: "O", a: "Ab" }, { k: "arco", c: "O", hacia: "Al" }, { k: "marca", p: "Al" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Al", traza: ["Al", "A1"] }, { k: "marca", p: "A1" },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["A1"], cortes: ["Av"] }, { k: "marca", p: "Av" },
    ],
  };
}

/** Problema 13: dada una recta de perfil por dos puntos A y B, hallar sus trazas. */
function perfilTrazas(): Construccion {
  // A1 = (375, 140), B1 = (425, 170): la recta r1 corta a la L.T. en x = 458,3 y a β₂ en y = 113.
  const xH = 375 + (LT_Y - 140) / 0.6;
  const yV = 140 - 0.6 * 45;
  const dH = xH - OX;
  return {
    titulo: "Trazas de una recta de perfil",
    intro: "Una recta de perfil se da por **dos de sus puntos** $A$ y $B$. Se pasa a la **tercera proyección**: $A_1$ y $B_1$ definen $r_1$, que corta a los planos $H$ y $V$ en las trazas pedidas; después se **refieren** a la recta en $H'$-$H''$ y $V'$-$V''$.",
    pts: {
      ...PERFIL_BASE,
      Ap: [RX, 235], Av: [RX, 140], Bp: [RX, 285], Bv: [RX, 170],
      Aa: [OX, 235], Al: [375, LT_Y], A1: [375, 140],
      Ba: [OX, 285], Bl: [425, LT_Y], B1: [425, 170],
      Hl: [xH, LT_Y], V1: [OX, yV], Hb: [OX, LT_Y + dH], Hp: [RX, LT_Y + dH], Vv: [RX, yV],
    },
    dados: ["lt", "O", "Ap", "Av", "Bp", "Bv"],
    datos: [],
    base: PERFIL_BASES,
    radioMin: 30,
    ops: [
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Ap"], cortes: ["Aa"] },
      { k: "medir", de: "O", a: "Aa" }, { k: "arco", c: "O", hacia: "Al" }, { k: "marca", p: "Al" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Al", traza: ["Al", "A1"] },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Av"], cortes: ["A1"] }, { k: "marca", p: "A1" },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Bp"], cortes: ["Ba"] },
      { k: "medir", de: "O", a: "Ba" }, { k: "arco", c: "O", hacia: "Bl" }, { k: "marca", p: "Bl" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Bl", traza: ["Bl", "B1"] },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Bv"], cortes: ["B1"] }, { k: "marca", p: "B1" },
      { k: "recta", a: "A1", b: "B1" }, { k: "marca", p: "Hl" }, { k: "marca", p: "V1" },
      { k: "medir", de: "O", a: "Hl" }, { k: "arco", c: "O", hacia: "Hb" }, { k: "marca", p: "Hb" },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Hb"], cortes: ["Hp"] },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["V1"], cortes: ["Vv"] },
    ],
  };
}

/** Plano perpendicular al primer bisector (Fig. 40): sus trazas son simétricas respecto de la L.T. */
function planoPerpBisector(): Construccion {
  const px = 330;
  const py = LT_Y + 0.7 * (px - NX);
  return {
    titulo: "Plano perpendicular al primer bisector",
    intro: "Un plano **perpendicular al primer bisector** tiene sus trazas **simétricas respecto de la L.T.**, es decir, forman el mismo ángulo con ella. Dada la traza horizontal $\\alpha_1$, halla $\\alpha_2$ llevando con el compás un punto de $\\alpha_1$ al otro lado de la L.T.",
    pts: {
      ...LT_BASE, N: [NX, LT_Y], _a1: [480, LT_Y + 0.7 * (480 - NX)],
      Pq: [px, py], Pf: [px, LT_Y], Pm: [px, 2 * LT_Y - py],
    },
    dados: ["lt", "N", "Pq"],
    datos: [],
    base: [["_l1", "lt"], ["N", "_a1"]],
    ext: 200,
    radioMin: 30,
    ops: [
      { k: "perp", recta: ["_l1", "lt"], punto: "Pq", traza: ["Pm", "Pq"] }, { k: "marca", p: "Pf" },
      { k: "medir", de: "Pf", a: "Pq" }, { k: "arco", c: "Pf", hacia: "Pm" }, { k: "marca", p: "Pm" },
      { k: "recta", a: "N", b: "Pm" },
    ],
  };
}

/** Proyecciones de una figura plana (Fig. 43): dada la proyección vertical de un triángulo contenido en un plano, hallar la horizontal. */
function figuraPlana(): Construccion {
  const vertices: [number, number][] = [[340, 110], [400, 140], [300, 160]];
  const pts: Record<string, P> = { ...PLANO_PTS };
  const ops: Op[] = [];
  const base: [string, string][] = [["_l1", "lt"], ["N", "_a1"], ["N", "_a2"]];
  vertices.forEach(([x, y], i) => {
    const k = i + 1;
    const cota = LT_Y - y;
    const ux = NX + cota / 0.6; // V'' de la horizontal que pasa por el vértice
    pts[`T${k}v`] = [x, y];
    pts[`Uv${k}`] = [ux, y];
    pts[`Uc${k}`] = [ux, LT_Y];
    pts[`T${k}p`] = [x, alfa1(NX) + 0.35 * (x - ux) + (LT_Y - alfa1(NX))];
    ops.push(
      { k: "paralelas", recta: ["_l1", "lt"], marcas: [`T${k}v`], cortes: [`Uv${k}`] },
      { k: "perp", recta: ["_l1", "lt"], punto: `Uv${k}`, traza: [`Uv${k}`, `Uc${k}`] }, { k: "marca", p: `Uc${k}` },
      { k: "paralelas", recta: ["N", "_a1"], marcas: [`Uc${k}`], cortes: [`T${k}p`] },
      { k: "perp", recta: ["_l1", "lt"], punto: `T${k}v`, traza: [`T${k}v`, `T${k}p`] }, { k: "marca", p: `T${k}p` },
    );
  });
  ops.push({ k: "lados", pts: ["T1p", "T2p", "T3p"] });
  return {
    titulo: "Proyecciones de una figura plana",
    intro: "Dado un plano $\\alpha$ y una figura contenida en él de la que se conoce **una proyección**, hay que hallar la otra. Se traza por cada vértice una **recta horizontal** del plano: $h''$ por el vértice corta a $\\alpha_2$ en $V''$; por $V'$ se traza $h'$ paralela a $\\alpha_1$, y el vértice $1''$ se refiere a $h'$ en $1'$.",
    pts,
    dados: ["lt", "N", "T1v", "T2v", "T3v"],
    datos: [],
    base: [...base, ["T1v", "T2v"], ["T2v", "T3v"], ["T3v", "T1v"]],
    ext: 200,
    escala: 0.8,
    ops,
  };
}

// ---- Puntos en los planos de proyección y en el segundo bisector (pág. 99) ----
function puntoEspecial(o: { id: string; titulo: string; intro: string; letra: "A" | "E"; alej?: number; cota?: number }): Construccion {
  const hp = `${o.letra}p`;
  const vp = `${o.letra}v`;
  const lado = o.alej !== undefined; // punto en el PH: tiene alejamiento y su alzado está en la L.T.
  const d = dato(lado ? "alej" : "cota", lado ? o.alej! : o.cota!, 90, lado ? "ambar" : "azul");
  const pts: Record<string, P> = { _l1: [40, LT_Y], lt: [580, LT_Y], ...d.pts };
  if (lado) { pts[vp] = [O_X, LT_Y]; pts[hp] = [O_X, LT_Y + o.alej!]; } else { pts[hp] = [O_X, LT_Y]; pts[vp] = [O_X, LT_Y - o.cota!]; }
  const fijo = lado ? vp : hp;
  const nuevo = lado ? hp : vp;
  return {
    titulo: o.titulo,
    intro: o.intro,
    pts,
    dados: ["lt", fijo, d.d.a, d.d.b],
    datos: [d.d],
    base: [["_l1", "lt"]],
    radioMin: 30,
    ops: [
      { k: "perp", recta: ["_l1", "lt"], punto: fijo, traza: lado ? [vp, hp] : [vp, hp] },
      { k: "medir", de: d.d.a, a: d.d.b }, { k: "arco", c: fijo, hacia: nuevo }, { k: "marca", p: nuevo },
    ],
  };
}

function puntoSegundoBisector(): Construccion {
  const d = dato("cota", 60, 90, "azul");
  return {
    titulo: "Punto del segundo bisector",
    intro: "Un punto $G$ del **segundo bisector** (segundo diedro) tiene cota y alejamiento **iguales en valor** y de signo contrario: sus dos proyecciones **coinciden** y están sobre la L.T. Con una sola medida basta.",
    pts: { _l1: [40, LT_Y], lt: [580, LT_Y], O: [O_X, LT_Y], Gp: [O_X, LT_Y - 60], ...d.pts },
    dados: ["lt", "O", d.d.a, d.d.b],
    datos: [d.d],
    base: [["_l1", "lt"]],
    radioMin: 30,
    ops: [
      { k: "perp", recta: ["_l1", "lt"], punto: "O", traza: ["Gp", "O"] },
      { k: "medir", de: d.d.a, a: d.d.b }, { k: "arco", c: "O", hacia: "Gp" }, { k: "marca", p: "Gp" },
    ],
  };
}

/** Fig. 11: dos rectas se cortan si los puntos de corte de sus proyecciones están en una misma perpendicular a la L.T. */
function rectasSeCortan(): Construccion {
  const Pp: P = [330, 300];
  const Pq: P = [330, 130];
  return {
    titulo: "Rectas que se cortan",
    intro: "Dos rectas $r$ y $s$ **se cortan** en el espacio si las proyecciones del mismo nombre se cortan en puntos que están en una **misma perpendicular a la L.T.** Halla el punto de corte $P(P'\\text{-}P'')$ y comprueba que las referencias coinciden.",
    pts: {
      _l1: [40, LT_Y], lt: [580, LT_Y], Pp, Pv: Pq,
      _r1: [200, 248], _r2: [460, 352], _s1: [220, 345], _s2: [440, 255],
      _r3: [200, 91], _r4: [460, 169], _s3: [220, 183], _s4: [440, 83],
    },
    dados: ["lt"],
    datos: [],
    base: [["_l1", "lt"], ["_r1", "_r2"], ["_s1", "_s2"], ["_r3", "_r4"], ["_s3", "_s4"]],
    ops: [
      { k: "marca", p: "Pp" },
      { k: "perp", recta: ["_l1", "lt"], punto: "Pp", traza: ["Pv", "Pp"] }, { k: "marca", p: "Pv" },
    ],
  };
}

/** Fig. 32: recta frontal de un plano, a un alejamiento dado. */
function frontalDelPlano(): Construccion {
  const a = 60;
  const fx = NX + a / 0.35;
  const da = dato("alej", a, 90, "ambar");
  return {
    titulo: "Recta frontal de un plano",
    intro: "Las **rectas frontales** de un plano son paralelas al plano $V$: su proyección horizontal $f'$ es **paralela a la L.T.** a una distancia igual al alejamiento, y $f''$ es **paralela a $\\alpha_2$**. Halla la frontal del plano $\\alpha$ de **alejamiento** dado.",
    pts: {
      ...PLANO_PTS, ...da.pts,
      O: [200, LT_Y], C0: [200, LT_Y + a], Hp: [fx, LT_Y + a], Hv: [fx, LT_Y], Fq: [fx + 150, LT_Y - 0.6 * 150],
    },
    dados: ["lt", "N", "O", da.d.a, da.d.b],
    datos: [da.d],
    base: [["_l1", "lt"], ["N", "_a1"], ["N", "_a2"]],
    radioMin: 30,
    ops: [
      { k: "perp", recta: ["_l1", "lt"], punto: "O", traza: ["O", "C0"] },
      { k: "medir", de: da.d.a, a: da.d.b }, { k: "arco", c: "O", hacia: "C0" }, { k: "marca", p: "C0" },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["C0"], cortes: ["Hp"] },
      { k: "perp", recta: ["_l1", "lt"], punto: "Hp", traza: ["Hv", "Hp"] }, { k: "marca", p: "Hv" },
      { k: "paralelas", recta: ["N", "_a2"], marcas: ["Hv"], cortes: ["Fq"] },
    ],
  };
}

/** Figs. 35 y 36: planos proyectantes: todo lo que contienen se proyecta sobre una de sus trazas. */
function planoProyectante(vertical: boolean): Construccion {
  const N0: P = [250, LT_Y];
  const qx = 400;
  const pend = 0.5;
  if (vertical) {
    // perpendicular al V: β₁ ⟂ L.T. y β₂ cualquiera; los puntos del plano se proyectan en β₂
    return {
      titulo: "Plano proyectante vertical",
      intro: "Un plano **perpendicular al plano vertical** tiene su traza horizontal $\\beta_1$ **perpendicular a la L.T.** y $\\beta_2$ cualquiera. Todos sus puntos se proyectan verticalmente **sobre $\\beta_2$**. Dado $Q'$, halla $Q''$ en $\\beta_2$.",
      pts: { _l1: [40, LT_Y], lt: [580, LT_Y], N: N0, _b1: [250, 355], _b2: [540, LT_Y - pend * 290], Qp: [qx, 265], Qv: [qx, LT_Y - pend * (qx - 250)] },
      dados: ["lt", "N", "Qp"],
      datos: [],
      base: [["_l1", "lt"], ["N", "_b1"], ["N", "_b2"]],
      ops: [{ k: "perp", recta: ["_l1", "lt"], punto: "Qp", traza: ["Qv", "Qp"] }, { k: "marca", p: "Qv" }],
    };
  }
  return {
    titulo: "Plano proyectante horizontal",
    intro: "Un plano **perpendicular al plano horizontal** tiene su traza vertical $\\alpha_2$ **perpendicular a la L.T.** y $\\alpha_1$ cualquiera. Todos sus puntos se proyectan horizontalmente **sobre $\\alpha_1$**. Dado $Q''$, halla $Q'$ en $\\alpha_1$.",
    pts: { _l1: [40, LT_Y], lt: [580, LT_Y], N: N0, _b1: [250, 30], _b2: [540, LT_Y + pend * 290], Qv: [qx, 120], Qp: [qx, LT_Y + pend * (qx - 250)] },
    dados: ["lt", "N", "Qv"],
    datos: [],
    base: [["_l1", "lt"], ["N", "_b1"], ["N", "_b2"]],
    ops: [{ k: "perp", recta: ["_l1", "lt"], punto: "Qv", traza: ["Qv", "Qp"] }, { k: "marca", p: "Qp" }],
  };
}

/** Fig. 41: plano paralelo a la L.T.: sus dos trazas son paralelas a la L.T. */
function planoParaleloLT(): Construccion {
  return {
    titulo: "Plano paralelo a la línea de tierra",
    intro: "Un plano **paralelo a la L.T.** tiene sus dos trazas $\\alpha_1$ y $\\alpha_2$ **paralelas a la L.T.** Dados un punto de cada traza, dibuja las dos trazas con escuadra y cartabón.",
    pts: { _l1: [40, LT_Y], lt: [580, LT_Y], Pa1: [230, 270], Pa2: [290, 105], Ea: [530, 270], Eb: [530, 105] },
    dados: ["lt", "Pa1", "Pa2"],
    datos: [],
    base: [["_l1", "lt"]],
    ops: [
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Pa1"], cortes: ["Ea"] },
      { k: "paralelas", recta: ["_l1", "lt"], marcas: ["Pa2"], cortes: ["Eb"] },
    ],
  };
}

export const CONSTRUCCIONES_DIEDRICO = { ...PUNTOS, "recta-proyecciones": proyeccionesRecta(), "recta-trazas": trazasRecta(), "recta-vertical": rectaVertical(), "recta-paralela-lt": rectaParalelaLT(), "recta-horizontal": rectaHorizontal(), "recta-frontal": rectaFrontal(), "plano-dos-rectas": planoDosRectas(), "recta-en-plano": rectaEnPlano(), "horizontal-del-plano": horizontalDelPlano(), "perfil-punto": perfilPunto(), "perfil-trazas": perfilTrazas(), "plano-perp-bisector": planoPerpBisector(), "figura-plana": figuraPlana(), "punto-plano-horizontal": puntoEspecial({ id: "A", letra: "A", alej: 60, titulo: "Punto del plano horizontal anterior", intro: "Un punto $A$ del **plano horizontal anterior** tiene **cota nula**: su proyección vertical $A''$ está en la **L.T.** y la horizontal $A'$ coincide con el punto, por debajo de la L.T. Dado el alejamiento, halla $A'$." }), "punto-plano-vertical": puntoEspecial({ id: "E", letra: "E", cota: 60, titulo: "Punto del plano vertical superior", intro: "Un punto $E$ del **plano vertical superior** tiene **alejamiento nulo**: su proyección horizontal $E'$ está en la **L.T.** y la vertical $E''$ coincide con el punto, por encima de la L.T. Dada la cota, halla $E''$." }), "punto-segundo-bisector": puntoSegundoBisector(), "rectas-se-cortan": rectasSeCortan(), "frontal-del-plano": frontalDelPlano(), "plano-proyectante-vertical": planoProyectante(true), "plano-proyectante-horizontal": planoProyectante(false), "plano-paralelo-lt": planoParaleloLT(), } satisfies Record<string, Construccion>;
