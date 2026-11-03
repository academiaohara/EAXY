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

export const CONSTRUCCIONES_AXONOMETRICO = {
  "axo-escala-isometrica": escalaIsometrica(),
  "axo-proyecciones-punto": proyeccionesPunto(),
  "axo-trazas-plano": trazasPlano(),
  "axo-ovalo-isometrico": ovaloIsometrico(),
} satisfies Record<string, Construccion>;
