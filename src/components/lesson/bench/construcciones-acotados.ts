import type { Construccion, Dato, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 13 (sistema de planos acotados): graduación de una recta, plano por su línea de máxima
 * pendiente, intersección de dos planos y perfil de un terreno. La cota se escribe entre paréntesis junto a cada punto.
 */

export const ETIQUETAS_ACOTADOS: Record<string, string> = {
  t1: "", t2: "", t3: "", t4: "", nA: "A'(1)", nB: "B'(2)", nC: "C'(3)", nD: "D'(4)", nE: "E'(5)", nT: "T'(0)", _x: "",
  // plano por su l.m.p.
  Cz: "C₀", lO: "0", l1: "1", l2: "2", l3: "3", a0: "α₀", h1: "h(1)", h2: "h(2)", h3: "h(3)", hi1: "", hi2: "", hi3: "", hi0: "",
  // intersección de planos
  a13: "13", a14: "14", a15: "15", b13: "13", b14: "14", b15: "15", P13: "13", P14: "14", P15: "15",
  // perfil
  qA: "A", qB: "B", s2: "2", s3: "3", s4: "4", s5: "5", Q1: "", Q2: "", Q3: "", Q4: "", Q5: "", F1: "", F2: "", F3: "", F4: "", F5: "",
};

const rad = (d: number) => (d * Math.PI) / 180;
const en = (c: P, r: number, d: number): P => [c[0] + r * Math.cos(rad(d)), c[1] - r * Math.sin(rad(d))];

function dato(id: string, largo: number, y: number, color?: "azul" | "ambar") {
  const pts: Record<string, P> = { [`${id}1`]: [24, y], [`${id}2`]: [24 + largo, y] };
  const d: Dato = { a: `${id}1`, b: `${id}2`, nombre: id, color };
  return { pts, d };
}

const marcaArco = (c: string, hacia: string): Op[] => [{ k: "arco", c, hacia }, { k: "marca", p: hacia }];

/** Recorta la recta que pasa por `p` con dirección `d` al rectángulo de la hoja y devuelve sus dos extremos. */
function extremos(p: P, d: number): [P, P] {
  const ux = Math.cos(rad(d));
  const uy = -Math.sin(rad(d));
  const lim = { x0: 30, x1: 590, y0: 30, y1: 350 };
  const ts: number[] = [];
  for (const [o, u, a, b] of [[p[0], ux, lim.x0, lim.x1], [p[1], uy, lim.y0, lim.y1]] as const) {
    if (Math.abs(u) > 1e-9) ts.push((a - o) / u, (b - o) / u);
  }
  const pos = Math.min(...ts.filter((t) => t > 0));
  const neg = Math.max(...ts.filter((t) => t < 0));
  const dentro = (t: number): P => [p[0] + ux * t, p[1] + uy * t];
  return [dentro(neg), dentro(pos)];
}

/** Fig. 4: graduar la recta r' dada por A'(1) y E'(5) y hallar su traza T'(0). */
function graduar(): Construccion {
  const A: P = [130, 300];
  const E: P = [440, 235];
  const u = 60;
  const T = Array.from({ length: 5 }, (_, k) => en(A, u * k, 40));
  const B: P[] = [1, 2, 3].map((k) => [A[0] + ((E[0] - A[0]) * k) / 4, A[1] + ((E[1] - A[1]) * k) / 4] as P);
  const T0: P = [A[0] - (B[0][0] - A[0]), A[1] - (B[0][1] - A[1])];
  const du = dato("u", u, 70, "ambar");
  return {
    titulo: "Graduar una recta",
    intro: "**Graduar una recta** $r(r')$ dada por dos puntos $A'(1)$ y $E'(5)$ es dividir el segmento en tantas partes iguales como unidades valga la diferencia de cotas: aquí 4. Las divisiones tienen cota entera y su longitud es el **intervalo** $i$. Después se lleva el intervalo hacia atrás para hallar la **traza** $T'(0)$, de cota cero.",
    pts: { ...du.pts, nA: A, nE: E, _x: T[4], t1: T[1], t2: T[2], t3: T[3], t4: T[4], nB: B[0], nC: B[1], nD: B[2], nT: T0 },
    dados: ["nA", "nE"],
    datos: [du.d],
    base: [["nA", "nE"]],
    ext: 80,
    radioMin: 40,
    ops: [
      { k: "recta", a: "nA", b: "_x" },
      { k: "medir", de: "u1", a: "u2" },
      ...marcaArco("nA", "t1"), ...marcaArco("t1", "t2"), ...marcaArco("t2", "t3"), ...marcaArco("t3", "t4"),
      { k: "recta", a: "t4", b: "nE" },
      { k: "paralelas", recta: ["t4", "nE"], marcas: ["t3", "t2", "t1"], cortes: ["nD", "nC", "nB"] },
      { k: "medir", de: "nA", a: "nB" },
      { k: "arco", c: "nA", hacia: "nT" }, { k: "marca", p: "nT" },
    ],
  };
}

/** Figs. 5 y 6: plano definido por su línea de máxima pendiente graduada: horizontales y ángulo con el plano del cuadro. */
function planoLmp(): Construccion {
  const i = 60;
  const unidad = 25;
  const X = 330;
  const L: P[] = [0, 1, 2, 3].map((k) => [X, 320 - i * k] as P);
  const lr = (k: number): [P, P] => [[X - 190, L[k][1]], [X + 190, L[k][1]]];
  const C0: P = [X - 3 * unidad, L[3][1]];
  const dc = dato("c3", 3 * unidad, 60, "azul");
  dc.d.nombre = "3 unidades";
  const pts: Record<string, P> = { ...dc.pts, lO: L[0], l1: L[1], l2: L[2], l3: L[3], _top: [X, 40], Cz: C0 };
  const ops: Op[] = [];
  for (let k = 0; k <= 3; k += 1) {
    pts[`hi${k}`] = lr(k)[0];
    pts[`hj${k}`] = lr(k)[1];
    ops.push({ k: "perp", recta: ["lO", "_top"], punto: k === 0 ? "lO" : `l${k}`, traza: [`hi${k}`, `hj${k}`] });
  }
  pts.a0 = pts.hj0;
  pts.h1 = pts.hj1;
  pts.h2 = pts.hj2;
  pts.h3 = pts.hj3;
  ops.push({ k: "medir", de: "c31", a: "c32" }, { k: "arco", c: "l3", hacia: "Cz" }, { k: "marca", p: "Cz" }, { k: "recta", a: "Cz", b: "lO" });
  return {
    titulo: "Plano por su línea de máxima pendiente",
    intro: "En planos acotados el plano se da por su **línea de máxima pendiente** (l.m.p.) **graduada**, perpendicular a las horizontales del plano. Las **horizontales** son las rectas del plano de cota entera: se trazan perpendiculares a la l.m.p. por cada división. Para hallar el **ángulo** $\\alpha$ con el plano del cuadro se abate la l.m.p.: sobre $h(3)$ se toman 3 unidades hasta $C_0$ y se une con el origen.",
    pts: { ...pts },
    dados: ["lO", "l1", "l2", "l3", "c31", "c32"],
    datos: [dc.d],
    base: [["lO", "_top"]],
    radioMin: 40,
    ops,
  };
}

/** Fig. 7: intersección de dos planos dados por su l.m.p. graduada: se unen los puntos de igual cota de las horizontales. */
function interseccion(): Construccion {
  const pasoA = 52;
  const pasoB = 70;
  const dirA = 120; // l.m.p. de α
  const dirB = 62; // l.m.p. de β
  const a12: P = [250, 335];
  const b12: P = [390, 335];
  const cotas = [13, 14, 15];
  const aP = (k: number): P => en(a12, pasoA * (k - 12), dirA);
  const bP = (k: number): P => en(b12, pasoB * (k - 12), dirB);
  // horizontal de cota k de cada plano: por el punto, perpendicular a la l.m.p.
  const corte = (p1: P, d1: number, p2: P, d2: number): P => {
    const u1 = [Math.cos(rad(d1)), -Math.sin(rad(d1))];
    const u2 = [Math.cos(rad(d2)), -Math.sin(rad(d2))];
    const det = u1[0] * -u2[1] - u1[1] * -u2[0];
    const t = ((p2[0] - p1[0]) * -u2[1] - (p2[1] - p1[1]) * -u2[0]) / det;
    return [p1[0] + u1[0] * t, p1[1] + u1[1] * t];
  };
  const pts: Record<string, P> = {};
  const ops: Op[] = [];
  const base: [string, string][] = [];
  const fin = (p: P, d: number) => extremos(p, d + 90);
  pts.a12 = a12;
  pts.b12 = b12;
  pts._ta = en(a12, pasoA * 4.3, dirA);
  pts._tb = en(b12, pasoB * 3.3, dirB);
  base.push(["a12", "_ta"], ["b12", "_tb"]);
  for (const k of cotas) {
    pts[`a${k}`] = aP(k);
    pts[`b${k}`] = bP(k);
    pts[`P${k}`] = corte(aP(k), dirA + 90, bP(k), dirB + 90);
    const [ea, eb] = fin(aP(k), dirA);
    pts[`ea${k}`] = ea;
    pts[`eb${k}`] = eb;
    const [fa, fb] = fin(bP(k), dirB);
    pts[`fa${k}`] = fa;
    pts[`fb${k}`] = fb;
  }
  for (const k of cotas) ops.push({ k: "perp", recta: ["a12", "_ta"], punto: `a${k}`, traza: [`ea${k}`, `eb${k}`] });
  for (const k of cotas) ops.push({ k: "perp", recta: ["b12", "_tb"], punto: `b${k}`, traza: [`fa${k}`, `fb${k}`] }, { k: "marca", p: `P${k}` });
  ops.push({ k: "recta", a: "P13", b: "P15" });
  return {
    titulo: "Intersección de dos planos",
    intro: "Dos planos se dan por su l.m.p. graduada. La **recta intersección** está formada por los puntos donde se cortan las **horizontales de igual cota** de ambos planos: así, las horizontales de cota 13 dan el punto de cota 13 de la recta intersección $i'$, y lo mismo con 14 y 15.",
    pts,
    dados: ["a12", "a13", "a14", "a15", "b12", "b13", "b14", "b15"],
    datos: [],
    base,
    ext: 100,
    escala: 0.8,
    ops,
  };
}

/** Fig. 13: perfil de un terreno por el plano vertical que pasa por AB, con las cotas llevadas con el compás desde una escala. */
function perfil(): Construccion {
  const y0 = 260;
  const paso = 30;
  const xs = [110, 200, 295, 395, 490];
  const cotas = [3, 4, 5, 4, 3];
  const pts: Record<string, P> = { qA: [50, y0 + 20], qB: [560, y0 + 20] };
  const ops: Op[] = [];
  // escala vertical: la cota 2 está en y0 y cada unidad sube `paso`; la línea AB representa la cota 2
  [2, 3, 4, 5].forEach((c) => { pts[`s${c}`] = [40, y0 - paso * (c - 2)]; });
  xs.forEach((x, i) => {
    const k = i + 1;
    pts[`F${k}`] = [x, y0 + 20];
    pts[`Q${k}`] = [x, y0 + 20 - paso * (cotas[i] - 2)];
    ops.push(
      { k: "perp", recta: ["qA", "qB"], punto: `F${k}`, traza: [`F${k}`, `Q${k}`] },
      { k: "medir", de: "s2", a: `s${cotas[i]}` },
      { k: "arco", c: `F${k}`, hacia: `Q${k}` }, { k: "marca", p: `Q${k}` },
    );
  });
  ops.push({ k: "curvaPuntos", pts: ["Q1", "Q2", "Q3", "Q4", "Q5"] });
  return {
    titulo: "Perfil de un terreno",
    intro: "El **perfil** o sección que produce en el terreno un plano vertical se obtiene trazando **perpendiculares** a la traza $AB$ del plano por los puntos donde corta a las curvas de nivel y llevando sobre ellas, con el compás, la **cota** de cada curva tomada de una escala. Uniendo los puntos se tiene el perfil abatido.",
    pts,
    dados: ["qA", "qB", "s2", "s3", "s4", "s5", "F1", "F2", "F3", "F4", "F5"],
    datos: [],
    base: [["qA", "qB"], ["s2", "s5"]],
    radioMin: 25,
    ops,
  };
}

export const CONSTRUCCIONES_ACOTADOS = {
  "acotados-graduar": graduar(),
  "acotados-plano-lmp": planoLmp(),
  "acotados-interseccion": interseccion(),
  "acotados-perfil": perfil(),
} satisfies Record<string, Construccion>;
