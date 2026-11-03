import type { Construccion, Dato, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 14 (sistema axonométrico isométrico): escala isométrica, proyecciones de un punto sobre los
 * planos coordenados, trazas de un plano y circunferencia en perspectiva isométrica (óvalo de cuatro centros).
 * Eje Z vertical hacia arriba, X hacia abajo a la derecha e Y hacia abajo a la izquierda, a 30° de la horizontal.
 */

export const ETIQUETAS_AXONOMETRICO: Record<string, string> = {
  ax: "X", ay: "Y", az: "Z", ao: "O", axo: "", ayo: "", azo: "",
  // escala isométrica
  eO: "O", eA: "A", eP1: "1", eP2: "2", eP3: "3", eP4: "4", eQ1: "1'", eQ2: "2'", eQ3: "3'", eQ4: "4'", eb: "", ec: "",
  // punto
  pP: "P", pPp: "P'", pL: "L", pM: "M", pPdd: "P''", pPddd: "P'''",
  rI1: "I₁", rI2: "I₂", rR1: "R₁'", rI: "I", rP: "", rQ: "", rPp: "", rQp: "",
  sA: "A", sB: "B", sC: "C", sa1: "", sa2: "",
  lA: "A", lB: "B", lC: "C", lD: "D", l1a: "1", l1b: "1", l2a: "2", l2b: "2", l2c: "2", l2d: "2", lP1: "P", lP2: "Q", lP3: "R", lP4: "S", lv1: "", lv2: "", lv3: "", lv4: "", lP5: "", lP6: "", lP7: "", lP8: "",
  pP1: "P", pPp1: "P'", pt1: "t'", pt2: "t", pa: "", pb: "", pc: "", pxy: "", pAx: "", pAy: "", pAz: "", pTx: "", pTy: "", pTxy: "",
  // trazas de recta, planos paralelos e intersección
  aP: "P", aQ: "Q", aPp: "P'", aQp: "Q'", aT1: "T₁", aT2: "T₂", aT3: "T₃", aT2p: "T₂'", aT3p: "T₃'", ae1: "", ae2: "", ae3: "", pz: "", e1: "α₁", e2: "α₂",
  iA: "A₁", iB: "B₁", iC: "C₁", jA: "A₂", jB: "B₂", jC: "C₂", iS1: "S₁", iS2: "S₂", iS3: "S₃",
  // plano
  tA: "A", tB: "B", tC: "C",
  // óvalo
  oC1: "C₁", oC3: "C₃", oC2: "C₂", oC4: "C₄", om1: "", om2: "", om3: "", om4: "", oVl: "", oVr: "",
};

const rad = (d: number) => (d * Math.PI) / 180;
const en = (c: P, r: number, d: number): P => [c[0] + r * Math.cos(rad(d)), c[1] - r * Math.sin(rad(d))];
const O: P = [310, 200];

function dato(id: string, largo: number, y: number, color?: "azul" | "ambar") {
  const pts: Record<string, P> = { [`${id}1`]: [24, y], [`${id}2`]: [24 + largo, y] };
  const d: Dato = { a: `${id}1`, b: `${id}2`, nombre: id, color };
  return { pts, d };
}
const marcaArco = (c: string, hacia: string): Op[] => [{ k: "arco", c, hacia }, { k: "marca", p: hacia }];

/** Figs. 4 y 5: escala isométrica o de reducción: 0,816:1. */
function escalaIsometrica(): Construccion {
  const o: P = [70, 335];
  const u = 45;
  const pts: Record<string, P> = { eO: o, eA: [560, o[1]], eb: en(o, 470, 30), ec: en(o, 470, 45) };
  const du = dato("u", u, 70, "ambar");
  const ops: Op[] = [{ k: "medir", de: "u1", a: "u2" }];
  const p = [1, 2, 3, 4].map((k) => en(o, u * k, 45));
  p.forEach((q, i) => {
    pts[`eP${i + 1}`] = q;
    pts[`eQ${i + 1}`] = [q[0], o[1] - (q[0] - o[0]) * Math.tan(rad(30))];
  });
  ops.push(...marcaArco("eO", "eP1"), ...marcaArco("eP1", "eP2"), ...marcaArco("eP2", "eP3"), ...marcaArco("eP3", "eP4"));
  [1, 2, 3, 4].forEach((k) => ops.push({ k: "perp", recta: ["eO", "eA"], punto: `eP${k}`, traza: [`eP${k}`, `eQ${k}`] }, { k: "marca", p: `eQ${k}` }));
  return {
    titulo: "Escala isométrica",
    intro: "Para construir la **escala isométrica** se traza una recta $OA$ y, desde $O$, las rectas $OB$ y $OC$ que forman 30° y 45° con $OA$. Sobre $OC$ se dibuja la **escala natural** y se proyecta perpendicularmente a $OA$ sobre $OB$: las medidas reales quedan reducidas a $0{,}816:1$, el coseno de $35°16'$.",
    pts: { ...du.pts, ...pts },
    dados: ["eO", "eA"],
    datos: [du.d],
    base: [["eO", "eA"], ["eO", "eb"], ["eO", "ec"]],
    ops,
  };
}

/** Fig. 2: dadas las proyecciones P y P′, hallar P″ y P‴ con paralelas a los ejes. */
function proyeccionesPunto(): Construccion {
  const ex = (d: number): P => en(O, d, -30);
  const ey = (d: number): P => en(O, d, 210);
  const Pp: P = [O[0] + 70 * Math.cos(rad(30)) - 50 * Math.cos(rad(30)), O[1] + 70 * 0.5 + 50 * 0.5];
  const Pq: P = [Pp[0], Pp[1] - 80];
  const L = ex(70);
  const M = ey(50);
  const pts: Record<string, P> = {
    ao: O, ax: ex(250), ay: ey(250), az: [O[0], 30],
    pPp: Pp, pP: Pq, pL: L, pM: M, pPdd: [L[0], L[1] - 80], pPddd: [M[0], M[1] - 80],
  };
  return {
    titulo: "Proyecciones de un punto",
    intro: "Un punto $P$ del espacio se proyecta sobre los tres planos coordenados en $P'$, $P''$ y $P'''$. Conocidos $P$ y $P'$, para hallar las otras proyecciones: por $P'$ se trazan paralelas a los ejes $X$ e $Y$, que los cortan en $L$ y $M$; por $L$ y $M$, paralelas al eje $Z$; y por $P$, paralelas a $X$ e $Y$, que cortan a las anteriores en $P''$ y $P'''$.",
    pts,
    dados: ["ao", "ax", "ay", "az", "pP", "pPp"],
    datos: [],
    base: [["ao", "ax"], ["ao", "ay"], ["ao", "az"]],
    escala: 0.8,
    ops: [
      { k: "paralelas", recta: ["ao", "ax"], marcas: ["pPp"], cortes: ["pM"] }, { k: "marca", p: "pM" },
      { k: "paralelas", recta: ["ao", "ay"], marcas: ["pPp"], cortes: ["pL"] }, { k: "marca", p: "pL" },
      { k: "paralelas", recta: ["ao", "az"], marcas: ["pL"], cortes: ["pPdd"] },
      { k: "paralelas", recta: ["ao", "az"], marcas: ["pM"], cortes: ["pPddd"] },
      { k: "paralelas", recta: ["ao", "ay"], marcas: ["pP"], cortes: ["pPdd"] }, { k: "marca", p: "pPdd" },
      { k: "paralelas", recta: ["ao", "ax"], marcas: ["pP"], cortes: ["pPddd"] }, { k: "marca", p: "pPddd" },
    ],
  };
}

/** Fig. 15: trazas de un plano oblicuo a partir de los puntos A, B y C en que corta a los ejes. */
function trazasPlano(): Construccion {
  const A = en(O, 150, -30);
  const B = en(O, 120, 210);
  const C: P = [O[0], O[1] - 130];
  return {
    titulo: "Trazas de un plano",
    intro: "Un plano oblicuo corta a los planos coordenados según tres rectas, las **trazas** $\\alpha_1$, $\\alpha_2$ y $\\alpha_3$, que se cortan dos a dos en los ejes. Si el plano corta a los ejes $X$, $Y$ y $Z$ en $A$, $B$ y $C$, sus trazas son las rectas $AB$, $AC$ y $BC$: el **triángulo de trazas**.",
    pts: { ao: O, ax: en(O, 260, -30), ay: en(O, 260, 210), az: [O[0], 30], tA: A, tB: B, tC: C },
    dados: ["ao", "ax", "ay", "az", "tA", "tB", "tC"],
    datos: [],
    base: [["ao", "ax"], ["ao", "ay"], ["ao", "az"]],
    ops: [{ k: "recta", a: "tA", b: "tB" }, { k: "recta", a: "tB", b: "tC" }, { k: "recta", a: "tC", b: "tA" }],
  };
}

/** Figs. 30 y 35: circunferencia en el plano XOY en perspectiva isométrica: óvalo de cuatro centros dentro del rombo. */
function ovaloIsometrico(): Construccion {
  const r = 70;
  const c: P = [330, 200];
  const s = Math.sqrt(3) / 2;
  const Vt: P = [c[0], c[1] - r];
  const Vb: P = [c[0], c[1] + r];
  const Vl: P = [c[0] - 2 * s * r, c[1]];
  const Vr: P = [c[0] + 2 * s * r, c[1]];
  const m1: P = [c[0] + s * r, c[1] - r / 2]; // lado superior derecho
  const m2: P = [c[0] + s * r, c[1] + r / 2];
  const m3: P = [c[0] - s * r, c[1] + r / 2];
  const m4: P = [c[0] - s * r, c[1] - r / 2];
  const C1: P = [c[0] - r / Math.sqrt(3), c[1]];
  const C3: P = [c[0] + r / Math.sqrt(3), c[1]];
  return {
    titulo: "Circunferencia en perspectiva isométrica",
    intro: "Una circunferencia situada en un plano coordenado se proyecta según una **elipse** inscrita en el rombo que es la perspectiva del cuadrado circunscrito. Se sustituye por un **óvalo de cuatro centros**: los vértices de ángulo obtuso, $C_4$ y $C_2$, y los puntos $C_1$ y $C_3$ donde las rectas de esos vértices a los puntos medios de los lados opuestos cortan a la diagonal mayor.",
    pts: { oVl: Vl, oVr: Vr, om1: m1, om2: m2, om3: m3, om4: m4, oC1: C1, oC3: C3, oC4: Vt, oC2: Vb },
    dados: ["oC4", "oC2", "oVl", "oVr", "om1", "om2", "om3", "om4"],
    datos: [],
    base: [["oC4", "oVr"], ["oVr", "oC2"], ["oC2", "oVl"], ["oVl", "oC4"], ["oVl", "oVr"]],
    radioMin: 30,
    escala: 0.8,
    ops: [
      { k: "recta", a: "oC4", b: "om3" }, { k: "marca", p: "oC1" },
      { k: "recta", a: "oC4", b: "om2" }, { k: "marca", p: "oC3" },
      { k: "medir", de: "oC4", a: "om3" }, { k: "solucion", c: "oC4", hacia: "om3", hasta: "om2" },
      { k: "medir", de: "oC2", a: "om4" }, { k: "solucion", c: "oC2", hacia: "om4", hasta: "om1" },
      { k: "medir", de: "oC1", a: "om3" }, { k: "solucion", c: "oC1", hacia: "om3", hasta: "om4" },
      { k: "medir", de: "oC3", a: "om2" }, { k: "solucion", c: "oC3", hacia: "om2", hasta: "om1" },
    ],
  };
}

/** Proyección isométrica de un punto de coordenadas (x, y, z): X hacia abajo a la derecha, Y hacia abajo a la izquierda, Z arriba. */
const iso = (x: number, y: number, z: number): P => [O[0] + (x - y) * Math.cos(rad(30)), O[1] + (x + y) * 0.5 - z];
const AXES = { ao: O, ax: en(O, 260, -30), ay: en(O, 260, 210), az: [O[0], 30] as P };
const AXES_BASE: [string, string][] = [["ao", "ax"], ["ao", "ay"], ["ao", "az"]];

/** Fig. 8: trazas de una recta oblicua con los planos coordenados, a partir de la proyección directa t y la horizontal t'. */
function trazasRecta(): Construccion {
  const Pe = [70, 30, 70];
  const Qe = [30, 70, 20];
  const d = [Qe[0] - Pe[0], Qe[1] - Pe[1], Qe[2] - Pe[2]];
  const en3 = (t: number) => [Pe[0] + d[0] * t, Pe[1] + d[1] * t, Pe[2] + d[2] * t];
  const T1 = en3(-Pe[2] / d[2]);
  const T2 = en3(-Pe[1] / d[1]);
  const T3 = en3(-Pe[0] / d[0]);
  const pts: Record<string, P> = {
    ...AXES,
    aP: iso(Pe[0], Pe[1], Pe[2]), aQ: iso(Qe[0], Qe[1], Qe[2]), aPp: iso(Pe[0], Pe[1], 0), aQp: iso(Qe[0], Qe[1], 0),
    aT1: iso(T1[0], T1[1], T1[2]), aT2: iso(T2[0], T2[1], T2[2]), aT3: iso(T3[0], T3[1], T3[2]),
    aT2p: iso(T2[0], T2[1], 0), aT3p: iso(T3[0], T3[1], 0),
  };
  return {
    titulo: "Trazas de una recta",
    intro: "Una recta oblicua corta a los tres planos coordenados en sus **trazas**. Dadas su proyección directa $t$ y su proyección $t'$ sobre $XOY$: $T_1$ es donde se cortan $t$ y $t'$ (traza con $XOY$); $t'$ corta al eje $X$ en $T_2'$ y al eje $Y$ en $T_3'$, y por ellos, con paralelas al eje $Z$, se refieren esos puntos a $t$ para obtener $T_2$ y $T_3$.",
    pts,
    dados: ["ao", "ax", "ay", "az", "aP", "aQ", "aPp", "aQp"],
    datos: [],
    base: [...AXES_BASE, ["aP", "aQ"], ["aPp", "aQp"]],
    ext: 220,
    escala: 0.8,
    ops: [
      { k: "recta", a: "aP", b: "aQ" }, { k: "recta", a: "aPp", b: "aQp" }, { k: "marca", p: "aT1" },
      { k: "marca", p: "aT2p" }, { k: "paralelas", recta: ["ao", "az"], marcas: ["aT2p"], cortes: ["aT2"] }, { k: "marca", p: "aT2" },
      { k: "marca", p: "aT3p" }, { k: "paralelas", recta: ["ao", "az"], marcas: ["aT3p"], cortes: ["aT3"] }, { k: "marca", p: "aT3" },
    ],
  };
}

/** Figs. 12-14: rectas paralelas a los ejes por un punto. */
function rectasParalelasEjes(): Construccion {
  const Pe = iso(40, 30, 60);
  return {
    titulo: "Rectas paralelas a los ejes",
    intro: "Una recta **paralela a un eje** se proyecta paralela a ese eje. Por un punto $P$, la paralela al eje $X$, la paralela al $Y$ y la paralela al $Z$ son tres rectas distintas: cada una solo corta a **uno** de los planos coordenados, así que tiene **una sola traza**.",
    pts: { ...AXES, aP: Pe, ae1: [Pe[0] + 210 * Math.cos(rad(30)) * 0.7, Pe[1] + 105 * 0.7], ae2: [Pe[0] - 210 * Math.cos(rad(30)) * 0.7, Pe[1] + 105 * 0.7], ae3: [Pe[0], Pe[1] + 150] },
    dados: ["ao", "ax", "ay", "az", "aP"],
    datos: [],
    base: AXES_BASE,
    escala: 0.8,
    ops: [
      { k: "paralelas", recta: ["ao", "ax"], marcas: ["aP"], cortes: ["ae1"] },
      { k: "paralelas", recta: ["ao", "ay"], marcas: ["aP"], cortes: ["ae2"] },
      { k: "paralelas", recta: ["ao", "az"], marcas: ["aP"], cortes: ["ae3"] },
    ],
  };
}

/** Figs. 19-21: plano paralelo a un eje: dos trazas paralelas a ese eje. */
function planoParaleloEje(): Construccion {
  const B = iso(0, 100, 0);
  const C = iso(0, 0, 100);
  return {
    titulo: "Plano paralelo a un eje",
    intro: "Un plano **paralelo al eje $X$** tiene sus trazas $\\alpha_1$ y $\\alpha_2$ **paralelas a $X$**; la traza $\\alpha_3$ une los puntos $B$ y $C$ donde corta a los ejes $Y$ y $Z$. El punto donde cortaría al eje $X$ es impropio.",
    pts: { ...AXES, tB: B, tC: C, e1: [B[0] + 200 * Math.cos(rad(30)), B[1] + 100], e2: [C[0] + 200 * Math.cos(rad(30)), C[1] + 100] },
    dados: ["ao", "ax", "ay", "az", "tB", "tC"],
    datos: [],
    base: AXES_BASE,
    escala: 0.8,
    ops: [
      { k: "paralelas", recta: ["ao", "ax"], marcas: ["tB"], cortes: ["e1"] },
      { k: "paralelas", recta: ["ao", "ax"], marcas: ["tC"], cortes: ["e2"] },
      { k: "recta", a: "tB", b: "tC" },
    ],
  };
}

/** Figs. 22-24: plano paralelo a un plano coordenado: dos trazas paralelas a los ejes del plano. */
function planoParaleloCoordenado(): Construccion {
  const T = iso(0, 0, 70);
  return {
    titulo: "Plano paralelo a un plano coordenado",
    intro: "Un plano **paralelo a $XOY$** es horizontal y corta al eje $Z$ en $T$ (su cota). No tiene traza propia con $XOY$ y sus trazas con $XOZ$ y $YOZ$ son **paralelas a los ejes $X$ e $Y$** por $T$. Dibújalas.",
    pts: { ...AXES, pz: T, e1: [T[0] + 200 * Math.cos(rad(30)), T[1] + 100], e2: [T[0] - 200 * Math.cos(rad(30)), T[1] + 100] },
    dados: ["ao", "ax", "ay", "az", "pz"],
    datos: [],
    base: AXES_BASE,
    escala: 0.8,
    ops: [
      { k: "paralelas", recta: ["ao", "ax"], marcas: ["pz"], cortes: ["e1"] },
      { k: "paralelas", recta: ["ao", "ay"], marcas: ["pz"], cortes: ["e2"] },
    ],
  };
}

/** Fig. 27: intersección de dos planos dados por sus trazas: se unen los puntos donde se cortan las trazas del mismo nombre. */
function interseccionPlanos(): Construccion {
  const al = { A: [100, 0, 0], B: [0, 80, 0], C: [0, 0, 100] };
  const be = { A: [60, 0, 0], B: [0, 120, 0], C: [0, 0, 90] };
  const pts: Record<string, P> = { ...AXES };
  for (const k of ["A", "B", "C"] as const) {
    pts[`i${k}`] = iso(al[k][0], al[k][1], al[k][2]);
    pts[`j${k}`] = iso(be[k][0], be[k][1], be[k][2]);
  }
  // S₁: α₁ ∩ β₁ (z = 0); S₂: α₂ ∩ β₂ (y = 0); S₃: α₃ ∩ β₃ (x = 0)
  pts.iS1 = iso(100 / 3, 160 / 3, 0);
  pts.iS2 = iso(-20, 0, 120);
  pts.iS3 = iso(0, 20, 75);
  return {
    titulo: "Intersección de dos planos",
    intro: "Los planos $\\alpha$ y $\\beta$ se cortan según una recta $s$. Al cortarlos por los planos coordenados se obtienen sus trazas, que se cortan **dos a dos las del mismo nombre** en los puntos $S_1$, $S_2$ y $S_3$ de la intersección. Se unen y la recta $s$ queda definida.",
    pts,
    dados: ["ao", "ax", "ay", "az", "iA", "iB", "iC", "jA", "jB", "jC"],
    datos: [],
    base: [...AXES_BASE, ["iA", "iB"], ["iA", "iC"], ["iB", "iC"], ["jA", "jB"], ["jA", "jC"], ["jB", "jC"]],
    ext: 200,
    escala: 0.7,
    ops: [
      { k: "recta", a: "iA", b: "iB" }, { k: "recta", a: "jA", b: "jB" }, { k: "marca", p: "iS1" },
      { k: "recta", a: "iA", b: "iC" }, { k: "recta", a: "jA", b: "jC" }, { k: "marca", p: "iS2" },
      { k: "recta", a: "iB", b: "iC" }, { k: "recta", a: "jB", b: "jC" }, { k: "marca", p: "iS3" },
      { k: "recta", a: "iS1", b: "iS2" },
    ],
  };
}

/** Fig. 28: intersección de una recta y un plano mediante un plano proyectante horizontal que contiene a la recta. */
function rectaPlano(): Construccion {
  const al = { A: [100, 0, 0], B: [0, 80, 0], C: [0, 0, 160] };
  // r pasa por I = (70, 12, 24) con dirección (−40, 48, 60); su proyección horizontal r' corta a X en R₁ y a α₁ en I₁
  const I = [70, 12, 24];
  const Pe = [74, 7.2, 18];
  const Qe = [50, 36, 54];
  const pts: Record<string, P> = { ...AXES };
  for (const k of ["A", "B", "C"] as const) pts[`i${k}`] = iso(al[k][0], al[k][1], al[k][2]);
  pts.rP = iso(Pe[0], Pe[1], Pe[2]);
  pts.rQ = iso(Qe[0], Qe[1], Qe[2]);
  pts.rPp = iso(Pe[0], Pe[1], 0);
  pts.rQp = iso(Qe[0], Qe[1], 0);
  pts.rI1 = iso(40, 48, 0);
  pts.rR1 = iso(80, 0, 0);
  pts.rI2 = iso(80, 0, 32);
  pts.rI = iso(I[0], I[1], I[2]);
  return {
    titulo: "Intersección de recta y plano",
    intro: "Para hallar dónde una recta $r$ corta a un plano $\\alpha$, se hace pasar por $r$ un plano auxiliar: el mejor es un **proyectante**, aquí el que proyecta $r$ sobre $XOY$. Su traza horizontal es $r'$ y su traza con $XOZ$ es la paralela al eje $Z$ por $R_1'$. Se halla la intersección $I_1I_2$ de este plano con $\\alpha$; la recta $I_1I_2$ corta a $r$ en el punto buscado $I$.",
    pts,
    dados: ["ao", "ax", "ay", "az", "iA", "iB", "iC", "rP", "rQ", "rPp", "rQp"],
    datos: [],
    base: [...AXES_BASE, ["iA", "iB"], ["iA", "iC"], ["iB", "iC"], ["rP", "rQ"], ["rPp", "rQp"]],
    ext: 160,
    escala: 0.8,
    ops: [
      { k: "recta", a: "rPp", b: "rQp" }, { k: "marca", p: "rI1" }, { k: "marca", p: "rR1" },
      { k: "paralelas", recta: ["ao", "az"], marcas: ["rR1"], cortes: ["rI2"] }, { k: "marca", p: "rI2" },
      { k: "recta", a: "rI1", b: "rI2" }, { k: "marca", p: "rI" },
    ],
  };
}

/** Fig. 36: rayado de secciones: los lados del triángulo de las trazas dan las direcciones del rayado en cada plano. */
function rayado(): Construccion {
  const s = 100;
  const A = iso(0, 0, s);
  const B = iso(0, s, 0);
  const C = iso(s, 0, 0);
  const ds = dato("s", s, 70, "ambar");
  return {
    titulo: "Rayado de secciones en isométrica",
    intro: "Las superficies de corte se rayan en cada plano con líneas **paralelas a los lados del triángulo** que forman los puntos $A$, $B$ y $C$ tomados a la **misma distancia** $s$ del origen sobre cada eje. Con el compás se lleva $s$ sobre los ejes y se unen los puntos.",
    pts: { ...ds.pts, ...AXES, sA: A, sB: B, sC: C },
    dados: ["ao", "ax", "ay", "az"],
    datos: [ds.d],
    base: AXES_BASE,
    radioMin: 40,
    ops: [
      { k: "medir", de: "s1", a: "s2" },
      { k: "arco", c: "ao", hacia: "sA" }, { k: "marca", p: "sA" },
      { k: "arco", c: "ao", hacia: "sB" }, { k: "marca", p: "sB" },
      { k: "arco", c: "ao", hacia: "sC" }, { k: "marca", p: "sC" },
      { k: "recta", a: "sA", b: "sB" }, { k: "recta", a: "sB", b: "sC" }, { k: "recta", a: "sC", b: "sA" },
    ],
  };
}

/** Fig. 34: elipse isométrica por puntos: las rectas A–2 y B–1 se cortan en puntos de la elipse. */
function elipsePuntos(): Construccion {
  const r = 72;
  const q = (x: number, y: number): P => iso(x * r, y * r, 0);
  const pts: Record<string, P> = {
    ao: O,
    // puntos de tangencia sobre los ejes del rombo: A (0,1), B (0,−1), C (−1,0), D (1,0)
    lA: q(0, 1), lB: q(0, -1), lC: q(-1, 0), lD: q(1, 0),
    // puntos medios: 1 sobre los semiejes y 2 en los lados del rombo
    l1a: q(0.5, 0), l1b: q(-0.5, 0),
    l2a: q(1, 0.5), l2b: q(1, -0.5), l2c: q(-1, 0.5), l2d: q(-1, -0.5),
    // vértices del rombo
    lv1: q(1, 1), lv2: q(-1, 1), lv3: q(-1, -1), lv4: q(1, -1),
    // puntos de la elipse
    lP1: q(0.8, 0.6), lP2: q(-0.8, 0.6), lP3: q(-0.8, -0.6), lP4: q(0.8, -0.6),
  };
  return {
    titulo: "Elipse isométrica por puntos",
    intro: "Se completa el cuadrado circunscrito (el rombo de la perspectiva) y se toman los puntos medios $1$ y $2$ indicados. Las rectas $A$-$2$ y $B$-$1$, al cortarse, dan un punto de la elipse; repitiendo en los cuatro cuadrantes se obtienen $P$, $Q$, $R$ y $S$ y, con los puntos de tangencia, la elipse se traza a mano o con plantilla: su eje mayor, horizontal, es perpendicular al eje $Z$ y mide $2R$.",
    pts,
    dados: ["ao", "lA", "lB", "lC", "lD", "l1a", "l1b", "l2a", "l2b", "l2c", "l2d"],
    datos: [],
    base: [["lv1", "lv2"], ["lv2", "lv3"], ["lv3", "lv4"], ["lv4", "lv1"]],
    escala: 0.8,
    ops: [
      { k: "recta", a: "lA", b: "l2a" }, { k: "recta", a: "lB", b: "l1a" }, { k: "marca", p: "lP1" },
      { k: "recta", a: "lA", b: "l2c" }, { k: "recta", a: "lB", b: "l1b" }, { k: "marca", p: "lP2" },
      { k: "recta", a: "lB", b: "l2d" }, { k: "recta", a: "lA", b: "l1b" }, { k: "marca", p: "lP3" },
      { k: "recta", a: "lB", b: "l2b" }, { k: "recta", a: "lA", b: "l1a" }, { k: "marca", p: "lP4" },
      { k: "elipse", c: "ao", a: r * Math.sqrt(1.5), b: r * Math.sqrt(0.5) },
    ],
  };
}

/** Fig. 9: recta paralela a un plano coordenado: su proyección sobre él es paralela a ella. */
function rectaParalelaPlano(): Construccion {
  const Pp = iso(60, 20, 0);
  const Pe = iso(60, 20, 55);
  const Q1 = iso(30, 70, 0);
  return {
    titulo: "Recta paralela al plano XOY",
    intro: "Una recta **paralela a un plano coordenado** no tiene traza con él: su proyección directa $t$ y su proyección $t'$ sobre ese plano son **paralelas**. Dada la proyección $t'$ y un punto $P$ de la recta (con su proyección $P'$), traza $t$ por $P$ paralela a $t'$.",
    pts: { ...AXES, pPp1: Pp, pP1: Pe, pt1: Q1, pt2: [Pe[0] + (Q1[0] - Pp[0]), Pe[1] + (Q1[1] - Pp[1])] },
    dados: ["ao", "ax", "ay", "az", "pPp1", "pP1", "pt1"],
    datos: [],
    base: [...AXES_BASE, ["pPp1", "pt1"]],
    ext: 100,
    escala: 0.8,
    ops: [{ k: "paralelas", recta: ["pPp1", "pt1"], marcas: ["pP1"], cortes: ["pt2"] }],
  };
}

/** Perspectiva de una pieza: paralelepípedo en isométrica sin reducir, medido con el compás sobre los ejes. */
function pieza(): Construccion {
  const a = 100;
  const b = 80;
  const h = 60;
  const o: P = [310, 250];
  const isoO = (x: number, y: number, z: number): P => [o[0] + (x - y) * Math.cos(rad(30)), o[1] + (x + y) * 0.5 - z];
  const da = dato("a", a, 70, "azul");
  const db = dato("b", b, 95, "ambar");
  const dc = dato("c", h, 120);
  const pts: Record<string, P> = {
    ...da.pts, ...db.pts, ...dc.pts,
    ao: o, ax: isoO(190, 0, 0), ay: isoO(0, 190, 0), az: isoO(0, 0, 150),
    pAx: isoO(a, 0, 0), pAy: isoO(0, b, 0), pAz: isoO(0, 0, h), pxy: isoO(a, b, 0),
    pTx: isoO(a, 0, h), pTy: isoO(0, b, h), pTxy: isoO(a, b, h),
  };
  return {
    titulo: "Perspectiva isométrica de una pieza",
    intro: "Para dibujar una pieza en isométrica, **sin reducir**, se llevan sus medidas reales con el compás sobre los ejes $X$, $Y$ y $Z$ desde el origen y se completa el paralelepípedo con **paralelas a los ejes**. Aquí: largo 100, ancho 80 y alto 60.",
    pts,
    dados: ["ao", "ax", "ay", "az", "a1", "a2", "b1", "b2", "c1", "c2"],
    datos: [da.d, db.d, dc.d],
    base: AXES_BASE,
    radioMin: 40,
    escala: 0.8,
    ops: [
      { k: "medir", de: "a1", a: "a2" }, { k: "arco", c: "ao", hacia: "pAx" }, { k: "marca", p: "pAx" },
      { k: "medir", de: "b1", a: "b2" }, { k: "arco", c: "ao", hacia: "pAy" }, { k: "marca", p: "pAy" },
      { k: "medir", de: "c1", a: "c2" }, { k: "arco", c: "ao", hacia: "pAz" }, { k: "marca", p: "pAz" },
      { k: "paralelas", recta: ["ao", "ay"], marcas: ["pAx"], cortes: ["pxy"] },
      { k: "paralelas", recta: ["ao", "ax"], marcas: ["pAy"], cortes: ["pxy"] }, { k: "marca", p: "pxy" },
      { k: "paralelas", recta: ["ao", "ax"], marcas: ["pAz"], cortes: ["pTx"] },
      { k: "paralelas", recta: ["ao", "ay"], marcas: ["pAz"], cortes: ["pTy"] },
      { k: "paralelas", recta: ["ao", "az"], marcas: ["pAx"], cortes: ["pTx"] },
      { k: "paralelas", recta: ["ao", "az"], marcas: ["pAy"], cortes: ["pTy"] },
      { k: "paralelas", recta: ["ao", "az"], marcas: ["pxy"], cortes: ["pTxy"] }, { k: "marca", p: "pTxy" },
      { k: "lados", pts: ["pAz", "pTx", "pAx", "pxy", "pAy", "pTy"] },
    ],
  };
}

export const CONSTRUCCIONES_AXONOMETRICO = {
  "axo-escala-isometrica": escalaIsometrica(),
  "axo-proyecciones-punto": proyeccionesPunto(),
  "axo-trazas-plano": trazasPlano(),
  "axo-ovalo-isometrico": ovaloIsometrico(),
  "axo-trazas-recta": trazasRecta(),
  "axo-rectas-paralelas-ejes": rectasParalelasEjes(),
  "axo-plano-paralelo-eje": planoParaleloEje(),
  "axo-plano-paralelo-coordenado": planoParaleloCoordenado(),
  "axo-interseccion-planos": interseccionPlanos(),
  "axo-recta-plano": rectaPlano(),
  "axo-rayado": rayado(),
  "axo-elipse-puntos": elipsePuntos(),
  "axo-recta-paralela-plano": rectaParalelaPlano(),
  "axo-pieza": pieza(),
} satisfies Record<string, Construccion>;
