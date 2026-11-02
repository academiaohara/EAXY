/**
 * Construcciones geométricas del tema 5 (cuadriláteros y polígonos regulares) descritas como datos: una lista de
 * operaciones con instrumentos (tomar una medida con el compás, trazar un arco, pasar la regla, escuadra, transportador…).
 * De cada descripción salen la animación paso a paso y la práctica interactiva (`construcciones.tsx`), de modo que
 * explicación y ejercicio son siempre la misma construcción.
 *
 * Convenios: ángulos en grados, antihorarios, con el eje Y hacia arriba (como `geometry.ts`). Los puntos cuyo nombre empieza
 * por «_» son auxiliares (no se dibujan ni se rotulan). El radio de un arco es la última medida tomada con `medir`.
 */
export type P = [number, number];
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const en = (c: P, r: number, d: number): P => [c[0] + r * Math.cos(rad(d)), c[1] - r * Math.sin(rad(d))];
const angDe = (v: P, p: P) => deg(Math.atan2(-(p[1] - v[1]), p[0] - v[0]));
const medio = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

/** Los dos cortes de dos circunferencias (`[izquierda, derecha]` mirando de `a` a `b`). */
function cortes(a: P, ra: number, b: P, rb: number): [P, P] {
  const d = dist(a, b);
  const x = (d * d + ra * ra - rb * rb) / (2 * d);
  const h = Math.sqrt(Math.max(0, ra * ra - x * x));
  const u: P = [(b[0] - a[0]) / d, (b[1] - a[1]) / d];
  const base: P = [a[0] + u[0] * x, a[1] + u[1] * x];
  return [[base[0] + u[1] * h, base[1] - u[0] * h], [base[0] - u[1] * h, base[1] + u[0] * h]];
}
const arriba = (par: [P, P]): P => (par[0][1] < par[1][1] ? par[0] : par[1]);
const abajo = (par: [P, P]): P => (par[0][1] > par[1][1] ? par[0] : par[1]);

/** Vértices de un polígono regular inscrito: cada uno a `delta` grados del anterior. */
function vertices(O: P, R: number, desde: number, lado: number, n: number, giro: 1 | -1): P[] {
  const delta = deg(2 * Math.asin(lado / (2 * R)));
  return Array.from({ length: n }, (_, i) => en(O, R, desde + giro * delta * i));
}

export type Op =
  | { k: "medir"; de: string; a: string }
  | { k: "arco"; c: string; hacia: string; /** Extensión relativa a la dirección de `hacia`. */ ang?: [number, number]; /** Ángulos absolutos del arco. */ abs?: [number, number] }
  | { k: "circulo"; c: string; hacia: string }
  | { k: "marca"; p: string }
  | { k: "recta"; a: string; b: string; limpia?: boolean }
  | { k: "perp"; recta: [string, string]; punto: string; traza: [string, string] }
  | { k: "angulo"; v: string; base: number; obj: number; signo?: 1 | -1; largo?: number }
  | { k: "paralelas"; recta: [string, string]; marcas: string[]; cortes: string[] }
  | { k: "lados"; pts: string[] };

export type Nota = { title: string; text: string; fact?: string };

export type Dato = { a: string; b: string; nombre: string; mitad?: string; color?: "azul" | "ambar" };

export type Construccion = {
  titulo: string;
  /** Texto del primer paso (los datos del problema). */
  intro: string;
  pts: Record<string, P>;
  /** Puntos visibles desde el principio. */
  dados: string[];
  datos: Dato[];
  /** Segmentos finos ya dibujados en la hoja (la base de la construcción). */
  base?: [string, string][];
  /** Circunferencias ya dibujadas (centro y radio). */
  circulos?: { c: string; r: number }[];
  angDatos?: { v: P; ang: number; nombre: string }[];
  ops: Op[];
  /** Cuánto se prolongan las rectas de la regla más allá de los puntos tocados. */
  ext?: number;
  /** Textos propios de un paso (por índice de operación) en vez de los generados. */
  notas?: Record<number, Nota>;
};

/** Segmento dato: sus extremos (y su punto medio, si hace falta) son puntos nombrados. */
function dato(id: string, largo: number, y: number, opciones: { mitad?: boolean; color?: "azul" | "ambar"; x?: number } = {}) {
  const x = opciones.x ?? 24;
  const pts: Record<string, P> = { [`${id}1`]: [x, y], [`${id}2`]: [x + largo, y] };
  if (opciones.mitad) pts[`${id}m`] = [x + largo / 2, y];
  const d: Dato = { a: `${id}1`, b: `${id}2`, nombre: id, mitad: opciones.mitad ? `${id}m` : undefined, color: opciones.color };
  return { pts, d };
}

/** Mediatriz de `a`–`b` con arcos del mismo radio que el segmento: medir, dos arcos, regla (que borra los arcos) y punto medio. */
function mediatriz(a: string, b: string, p1: string, p2: string, m: string, abs: number): Op[] {
  return [
    { k: "medir", de: a, a: b },
    { k: "arco", c: a, hacia: b, ang: [-abs, abs] },
    { k: "arco", c: b, hacia: a, ang: [-abs, abs] },
    { k: "marca", p: p1 },
    { k: "marca", p: p2 },
    { k: "recta", a: p1, b: p2, limpia: true },
    { k: "marca", p: m },
  ];
}

const marcaArco = (c: string, hacia: string, ang?: [number, number]): Op[] => [{ k: "arco", c, hacia, ang }, { k: "marca", p: hacia }];

/** Perpendicular por `punto` a `recta`, con un trazo de `traza`. */
const perp = (recta: [string, string], punto: string, traza: [string, string]): Op => ({ k: "perp", recta, punto, traza });

/* ───────────── Cuadriláteros ───────────── */

function cuadradoLado(): Construccion {
  const l = 170;
  const A: P = [230, 310];
  const B: P = [A[0] + l, 310];
  const d = dato("l", l, 70);
  return {
    titulo: "Cuadrado dado el lado",
    intro: "Se conoce el lado $l = AB$. Un cuadrado tiene los cuatro lados iguales y los ángulos de $90^\\circ$.",
    pts: { ...d.pts, A, B, D: [A[0], A[1] - l], C: [B[0], B[1] - l], _pA: [A[0], A[1] - l - 40], _pB: [B[0], B[1] - l - 40] },
    dados: ["A", "B"],
    datos: [d.d],
    base: [["A", "B"]],
    ops: [
      perp(["A", "B"], "A", ["A", "_pA"]),
      perp(["A", "B"], "B", ["B", "_pB"]),
      { k: "medir", de: "A", a: "B" },
      ...marcaArco("A", "D"),
      ...marcaArco("B", "C"),
      { k: "lados", pts: ["A", "B", "C", "D"] },
    ],
  };
}

function cuadradoDiagonal(): Construccion {
  const dd = 140;
  const A: P = [240, 215];
  const C: P = [A[0] + dd, 215];
  const O = medio(A, C);
  const par = cortes(A, dd, C, dd);
  const d = dato("d", dd, 70);
  return {
    titulo: "Cuadrado dada la diagonal",
    intro: "Se conoce la diagonal $d = AC$. Las diagonales del cuadrado son iguales, perpendiculares y se cortan en su punto medio.",
    pts: { ...d.pts, A, C, O, P1: arriba(par), P2: abajo(par), B: [O[0], O[1] - dd / 2], D: [O[0], O[1] + dd / 2] },
    dados: ["A", "C"],
    datos: [d.d],
    base: [["A", "C"]],
    ops: [
      ...mediatriz("A", "C", "P1", "P2", "O", 66),
      { k: "medir", de: "O", a: "A" },
      ...marcaArco("O", "B"),
      ...marcaArco("O", "D"),
      { k: "lados", pts: ["A", "B", "C", "D"] },
    ],
  };
}

function rectanguloLados(): Construccion {
  const a = 200;
  const b = 120;
  const A: P = [190, 310];
  const B: P = [A[0] + a, 310];
  const da = dato("a", a, 70);
  const db = dato("b", b, 96, { color: "ambar" });
  return {
    titulo: "Rectángulo conocidos sus lados",
    intro: "Se conocen los lados $a = AB$ y $b$. El rectángulo tiene los cuatro ángulos rectos y los lados iguales dos a dos.",
    pts: { ...da.pts, ...db.pts, A, B, D: [A[0], A[1] - b], C: [B[0], B[1] - b], _pA: [A[0], A[1] - b - 40], _pB: [B[0], B[1] - b - 40] },
    dados: ["A", "B"],
    datos: [da.d, db.d],
    base: [["A", "B"]],
    ops: [
      perp(["A", "B"], "A", ["A", "_pA"]),
      perp(["A", "B"], "B", ["B", "_pB"]),
      { k: "medir", de: "b1", a: "b2" },
      ...marcaArco("A", "D"),
      ...marcaArco("B", "C"),
      { k: "lados", pts: ["A", "B", "C", "D"] },
    ],
  };
}

function rectanguloDiagonal(): Construccion {
  const dd = 160;
  const a = 100;
  const A: P = [220, 200];
  const C: P = [A[0] + dd, 200];
  const O = medio(A, C);
  const par = cortes(A, dd, C, dd);
  const B = arriba(cortes(O, dd / 2, C, a));
  const D: P = [2 * O[0] - B[0], 2 * O[1] - B[1]];
  const dd1 = dato("d", dd, 70);
  const da = dato("a", a, 96, { color: "ambar" });
  return {
    titulo: "Rectángulo conocidas una diagonal y un lado",
    intro: "Se conocen la diagonal $d = AC$ y un lado $a$. Las diagonales del rectángulo son iguales y se cortan en su punto medio, así que los cuatro vértices están en una circunferencia de diámetro $AC$.",
    pts: { ...dd1.pts, ...da.pts, A, C, O, P1: arriba(par), P2: abajo(par), B, D },
    dados: ["A", "C"],
    datos: [dd1.d, da.d],
    base: [["A", "C"]],
    ops: [
      ...mediatriz("A", "C", "P1", "P2", "O", 66),
      { k: "medir", de: "O", a: "A" },
      { k: "circulo", c: "O", hacia: "A" },
      { k: "medir", de: "a1", a: "a2" },
      ...marcaArco("C", "B"),
      ...marcaArco("A", "D"),
      { k: "lados", pts: ["A", "B", "C", "D"] },
    ],
  };
}

function romboDiagonales(): Construccion {
  const dd = 180;
  const dp = 110;
  const A: P = [210, 200];
  const C: P = [A[0] + dd, 200];
  const O = medio(A, C);
  const par = cortes(A, dd, C, dd);
  const d1 = dato("d", dd, 70);
  const d2 = dato("e", dp, 96, { mitad: true, color: "ambar" });
  return {
    titulo: "Rombo dadas las dos diagonales",
    intro: "Se conocen las diagonales $d = AC$ y $d' = BD$. Las diagonales del rombo son perpendiculares y se cortan en su punto medio.",
    pts: { ...d1.pts, ...d2.pts, A, C, O, P1: arriba(par), P2: abajo(par), B: [O[0], O[1] - dp / 2], D: [O[0], O[1] + dp / 2] },
    dados: ["A", "C"],
    datos: [d1.d, d2.d],
    base: [["A", "C"]],
    ops: [
      ...mediatriz("A", "C", "P1", "P2", "O", 66),
      { k: "medir", de: "em", a: "e2" },
      ...marcaArco("O", "B"),
      ...marcaArco("O", "D"),
      { k: "lados", pts: ["A", "B", "C", "D"] },
    ],
  };
}

function romboAngulo(): Construccion {
  const a = 150;
  const al = 60;
  const A: P = [190, 300];
  const B: P = [A[0] + a, 300];
  const D = en(A, a, al);
  const C: P = [D[0] + a, D[1]];
  const da = dato("a", a, 70);
  return {
    titulo: "Rombo dados un lado y un ángulo",
    intro: "Se conocen el lado $a = AB$ y el ángulo $\\hat A = 60^\\circ$. El rombo tiene los cuatro lados iguales y los lados opuestos paralelos.",
    pts: { ...da.pts, A, B, D, C },
    dados: ["A", "B"],
    datos: [da.d],
    base: [["A", "B"]],
    angDatos: [{ v: [400, 150], ang: al, nombre: "A" }],
    ops: [
      { k: "angulo", v: "A", base: 0, obj: al, largo: a + 40 },
      { k: "medir", de: "A", a: "B" },
      ...marcaArco("A", "D"),
      { k: "arco", c: "D", hacia: "C" },
      { k: "arco", c: "B", hacia: "C" },
      { k: "marca", p: "C" },
      { k: "lados", pts: ["A", "B", "C", "D"] },
    ],
  };
}

function romboide(): Construccion {
  const a = 170;
  const b = 110;
  const al = 55;
  const A: P = [180, 300];
  const B: P = [A[0] + a, 300];
  const D = en(A, b, al);
  const C: P = [D[0] + a, D[1]];
  const da = dato("a", a, 70);
  const db = dato("b", b, 96, { color: "ambar" });
  return {
    titulo: "Romboide dados sus lados y el ángulo que forman",
    intro: "Se conocen los lados $a = AB$ y $b = AD$ y el ángulo $\\hat A = 55^\\circ$. El romboide tiene los lados opuestos iguales y paralelos.",
    pts: { ...da.pts, ...db.pts, A, B, D, C },
    dados: ["A", "B"],
    datos: [da.d, db.d],
    base: [["A", "B"]],
    angDatos: [{ v: [420, 150], ang: al, nombre: "A" }],
    ops: [
      { k: "angulo", v: "A", base: 0, obj: al, largo: b + 50 },
      { k: "medir", de: "b1", a: "b2" },
      ...marcaArco("A", "D"),
      { k: "medir", de: "a1", a: "a2" },
      { k: "arco", c: "D", hacia: "C" },
      { k: "medir", de: "b1", a: "b2" },
      { k: "arco", c: "B", hacia: "C" },
      { k: "marca", p: "C" },
      { k: "lados", pts: ["A", "B", "C", "D"] },
    ],
  };
}

function trapecioIsosceles(): Construccion {
  const b = 170;
  const bp = 90;
  const h = 110;
  const A: P = [215, 205];
  const B: P = [A[0] + b, 205];
  const par = cortes(A, b, B, b);
  const N = medio(A, B);
  const M: P = [N[0], N[1] - h];
  const db = dato("b", bp, 70, { mitad: true });
  const dh = dato("h", h, 96, { color: "ambar" });
  return {
    titulo: "Trapecio isósceles dadas las bases y la altura",
    intro: "Se conocen las bases $b = AB$ y $b' = CD$ y la altura $h$. El trapecio isósceles tiene los lados no paralelos iguales: es simétrico respecto de la mediatriz de las bases.",
    pts: { ...db.pts, ...dh.pts, A, B, P1: arriba(par), P2: abajo(par), N, M, C: [M[0] - bp / 2, M[1]], D: [M[0] + bp / 2, M[1]], _x1: [M[0] - 105, M[1]], _x2: [M[0] + 105, M[1]] },
    dados: ["A", "B"],
    datos: [db.d, dh.d],
    base: [["A", "B"]],
    ops: [
      ...mediatriz("A", "B", "P1", "P2", "N", 66),
      { k: "medir", de: "h1", a: "h2" },
      ...marcaArco("N", "M"),
      perp(["P1", "P2"], "M", ["_x1", "_x2"]),
      { k: "medir", de: "bm", a: "b2" },
      ...marcaArco("M", "C"),
      ...marcaArco("M", "D"),
      { k: "lados", pts: ["A", "B", "D", "C"] },
    ],
  };
}

function trapecioRectangulo(): Construccion {
  const b = 190;
  const bp = 110;
  const h = 130;
  const A: P = [200, 300];
  const B: P = [A[0] + b, 300];
  const C: P = [A[0], A[1] - h];
  const D: P = [C[0] + bp, C[1]];
  const db = dato("b", bp, 70);
  const dh = dato("h", h, 96, { color: "ambar" });
  return {
    titulo: "Trapecio rectángulo dadas las bases y la altura",
    intro: "Se conocen las bases $b = AB$ y $b' = CD$ y la altura $h = AC$. El trapecio rectángulo tiene dos ángulos rectos.",
    pts: { ...db.pts, ...dh.pts, A, B, C, D, _pU: [A[0], C[1] - 40], _l: [A[0] - 30, C[1]], _r: [A[0] + 230, C[1]] },
    dados: ["A", "B"],
    datos: [db.d, dh.d],
    base: [["A", "B"]],
    ops: [
      perp(["A", "B"], "A", ["A", "_pU"]),
      { k: "medir", de: "h1", a: "h2" },
      ...marcaArco("A", "C"),
      perp(["A", "_pU"], "C", ["_l", "_r"]),
      { k: "medir", de: "b1", a: "b2" },
      ...marcaArco("C", "D"),
      { k: "lados", pts: ["A", "B", "D", "C"] },
    ],
  };
}

/* ───────────── División de la circunferencia ───────────── */

const O0: P = [300, 205];
const R0 = 135;

function circunferenciaBase(extra: Record<string, P> = {}) {
  const A: P = [O0[0], O0[1] - R0];
  return { A, pts: { O: O0, A, ...extra } };
}

function div6y3(): Construccion {
  const { A, pts } = circunferenciaBase();
  const V = vertices(O0, R0, 90, R0, 6, -1);
  const nombres = ["A", "B", "C", "D", "E", "F"];
  const v: Record<string, P> = {};
  nombres.forEach((n, i) => (v[n] = V[i]));
  return {
    titulo: "Circunferencia en tres y en seis partes iguales",
    intro: "Se tiene una circunferencia de centro $O$ y radio $R$. El lado del hexágono regular inscrito es igual al radio.",
    pts: { ...pts, ...v, A },
    dados: ["O", "A"],
    datos: [],
    circulos: [{ c: "O", r: R0 }],
    ops: [
      { k: "medir", de: "O", a: "A" },
      ...marcaArco("A", "B"),
      ...marcaArco("B", "C"),
      ...marcaArco("C", "D"),
      ...marcaArco("D", "E"),
      ...marcaArco("E", "F"),
      { k: "lados", pts: ["A", "B", "C", "D", "E", "F"] },
      { k: "lados", pts: ["A", "C", "E"] },
    ],
  };
}

function div4y8(): Construccion {
  const A: P = [O0[0], O0[1] - R0];
  const E: P = [O0[0], O0[1] + R0];
  const C: P = [O0[0] + R0, O0[1]];
  const G: P = [O0[0] - R0, O0[1]];
  const H = en(O0, R0, 45);
  const X: P = [O0[0] + R0, O0[1] - R0];
  const V = vertices(O0, R0, 90, dist(A, H), 8, -1);
  return {
    titulo: "Circunferencia en cuatro y en ocho partes iguales",
    intro: "Se tiene una circunferencia de centro $O$ con un diámetro $AE$ dibujado. Dos diámetros perpendiculares la dividen en cuatro partes iguales; la bisectriz del ángulo central entre dos de ellos da las ocho.",
    pts: { O: O0, A, E, C, G, H, X, I: V[3], J: V[5], K: V[7], _l: [G[0] - 25, O0[1]], _r: [C[0] + 25, O0[1]] },
    dados: ["O", "A", "E"],
    datos: [],
    base: [["A", "E"]],
    circulos: [{ c: "O", r: R0 }],
    ops: [
      perp(["A", "E"], "O", ["_l", "_r"]),
      { k: "marca", p: "C" },
      { k: "marca", p: "G" },
      { k: "lados", pts: ["A", "C", "E", "G"] },
      { k: "medir", de: "O", a: "A" },
      { k: "arco", c: "A", hacia: "O", abs: [-100, 5] },
      { k: "arco", c: "C", hacia: "O", abs: [85, 185] },
      { k: "marca", p: "X" },
      { k: "recta", a: "O", b: "X", limpia: true },
      { k: "marca", p: "H" },
      { k: "medir", de: "A", a: "H" },
      ...marcaArco("C", "I"),
      ...marcaArco("E", "J"),
      ...marcaArco("G", "K"),
      { k: "lados", pts: ["A", "H", "C", "I", "E", "J", "G", "K"] },
    ],
  };
}

/** Primer tramo común del pentágono y del decágono. */
function pentagonoBase() {
  const A: P = [O0[0], O0[1] - R0];
  const M: P = [O0[0] + R0, O0[1]];
  const Pl: P = [O0[0] - R0, O0[1]];
  const E: P = [O0[0], O0[1] + R0];
  const N = en(O0, R0, 60);
  const L: P = [N[0], O0[1]];
  const Pp: P = [L[0] - dist(L, A), O0[1]];
  return { A, M, Pl, E, N, L, Pp };
}

function div5(): Construccion {
  const { A, M, Pl, E, N, L, Pp } = pentagonoBase();
  const lado = dist(A, Pp);
  const V = vertices(O0, R0, 90, lado, 5, 1);
  return {
    titulo: "Circunferencia en cinco partes iguales",
    intro: "Se tiene una circunferencia con dos diámetros perpendiculares dibujados. Se halla el lado $l_5$ del pentágono con el método de Euclides y se lleva cinco veces sobre la circunferencia.",
    pts: { O: O0, A, M, E, Pl, N, L, P: Pp, B: V[1], C: V[2], D: V[3], F: V[4], _nl: [N[0], O0[1] + 22] },
    dados: ["O", "A", "M", "E", "Pl"],
    datos: [],
    base: [["A", "E"], ["Pl", "M"]],
    circulos: [{ c: "O", r: R0 }],
    ops: [
      { k: "medir", de: "M", a: "O" },
      ...marcaArco("M", "N"),
      perp(["O", "M"], "N", ["N", "_nl"]),
      { k: "marca", p: "L" },
      { k: "medir", de: "L", a: "A" },
      ...marcaArco("L", "P"),
      { k: "medir", de: "A", a: "P" },
      ...marcaArco("A", "B"),
      ...marcaArco("B", "C"),
      ...marcaArco("C", "D"),
      ...marcaArco("D", "F"),
      { k: "lados", pts: ["A", "B", "C", "D", "F"] },
    ],
  };
}

function div10(): Construccion {
  const { A, M, Pl, E, N, L, Pp } = pentagonoBase();
  const lado = dist(O0, Pp);
  const V = vertices(O0, R0, 90, lado, 10, 1);
  const nombres = ["A", "B", "C", "D", "F", "G", "H", "I", "J", "K"];
  const v: Record<string, P> = {};
  nombres.forEach((n, i) => (v[n] = V[i]));
  return {
    titulo: "Circunferencia en diez partes iguales",
    intro: "Con la misma construcción del pentágono, el segmento $OP$ es el lado $l_{10}$ del decágono regular inscrito.",
    pts: { O: O0, M, E, Pl, N, L, P: Pp, ...v, A, _nl: [N[0], O0[1] + 22] },
    dados: ["O", "A", "M", "E", "Pl"],
    datos: [],
    base: [["A", "E"], ["Pl", "M"]],
    circulos: [{ c: "O", r: R0 }],
    ops: [
      { k: "medir", de: "M", a: "O" },
      ...marcaArco("M", "N"),
      perp(["O", "M"], "N", ["N", "_nl"]),
      { k: "marca", p: "L" },
      { k: "medir", de: "L", a: "A" },
      ...marcaArco("L", "P"),
      { k: "medir", de: "O", a: "P" },
      ...marcaArco("A", "B"),
      ...marcaArco("B", "C"),
      ...marcaArco("C", "D"),
      ...marcaArco("D", "F"),
      ...marcaArco("F", "G"),
      ...marcaArco("G", "H"),
      ...marcaArco("H", "I"),
      ...marcaArco("I", "J"),
      ...marcaArco("J", "K"),
      { k: "lados", pts: nombres },
    ],
  };
}

function div7(): Construccion {
  const A: P = [O0[0], O0[1] - R0];
  const N: P = [O0[0] + R0, O0[1]];
  const S = en(O0, R0, 60);
  const Pm: P = [S[0], O0[1]];
  const lado = dist(Pm, S);
  const V = vertices(O0, R0, 90, lado, 7, 1);
  const nombres = ["A", "B", "C", "D", "E", "F", "G"];
  const v: Record<string, P> = {};
  nombres.forEach((n, i) => (v[n] = V[i]));
  return {
    titulo: "Circunferencia en siete partes iguales",
    intro: "Se tiene una circunferencia de centro $O$ con un diámetro horizontal dibujado. La mitad de la cuerda del triángulo equilátero inscrito, $PQ$, es una muy buena aproximación del lado del heptágono.",
    pts: { O: O0, A, N, S, P: Pm, ...v, Pl: [O0[0] - R0, O0[1]], _s: [S[0], O0[1] + 22] },
    dados: ["O", "A", "N", "Pl"],
    datos: [],
    base: [["A", "O"], ["Pl", "N"]],
    circulos: [{ c: "O", r: R0 }],
    ops: [
      { k: "medir", de: "N", a: "O" },
      ...marcaArco("N", "S"),
      perp(["O", "N"], "S", ["S", "_s"]),
      { k: "marca", p: "P" },
      { k: "medir", de: "P", a: "S" },
      ...marcaArco("A", "B"),
      ...marcaArco("B", "C"),
      ...marcaArco("C", "D"),
      ...marcaArco("D", "E"),
      ...marcaArco("E", "F"),
      ...marcaArco("F", "G"),
      { k: "lados", pts: nombres },
    ],
  };
}

function div9(): Construccion {
  const A: P = [O0[0], O0[1] - R0];
  const N: P = [O0[0], O0[1] + R0];
  const Pl: P = [O0[0] - R0, O0[1]];
  const K2 = en(O0, R0, 30);
  const K1 = en(O0, R0, -30);
  const K3: P = [O0[0] + R0 * Math.SQRT2, O0[1]];
  const rad3 = dist(K3, A);
  const Q: P = [K3[0] - rad3, O0[1]];
  const lado = dist(Pl, Q);
  const V = vertices(O0, R0, 180, lado, 9, -1);
  const nombres = ["P", "B", "C", "D", "E", "F", "G", "H", "I"];
  const v: Record<string, P> = {};
  nombres.forEach((n, i) => (v[n] = V[i]));
  return {
    titulo: "Circunferencia en nueve partes iguales",
    intro: "Se tiene una circunferencia con dos diámetros perpendiculares dibujados. El lado $l_9$ del eneágono se obtiene con unos arcos auxiliares y se lleva nueve veces sobre la circunferencia.",
    pts: { O: O0, A, N, Q, "1": K1, "2": K2, "3": K3, ...v, P: Pl, _r: [O0[0] + R0 + 30, O0[1]] },
    dados: ["O", "A", "N", "P"],
    datos: [],
    base: [["A", "N"], ["P", "_r"]],
    circulos: [{ c: "O", r: R0 }],
    ops: [
      { k: "medir", de: "O", a: "A" },
      { k: "arco", c: "A", hacia: "2", abs: [-96, -24] },
      { k: "marca", p: "2" },
      { k: "arco", c: "N", hacia: "1", abs: [24, 96] },
      { k: "marca", p: "1" },
      { k: "medir", de: "N", a: "2" },
      { k: "arco", c: "N", hacia: "3", abs: [30, 66] },
      { k: "arco", c: "A", hacia: "3", abs: [-66, -30] },
      { k: "marca", p: "3" },
      { k: "medir", de: "3", a: "A" },
      { k: "arco", c: "3", hacia: "Q", abs: [140, 220] },
      { k: "marca", p: "Q" },
      { k: "medir", de: "P", a: "Q" },
      ...marcaArco("P", "B"),
      ...marcaArco("B", "C"),
      ...marcaArco("C", "D"),
      ...marcaArco("D", "E"),
      ...marcaArco("E", "F"),
      ...marcaArco("F", "G"),
      ...marcaArco("G", "H"),
      ...marcaArco("H", "I"),
      { k: "lados", pts: nombres },
    ],
  };
}

function divN(): Construccion {
  const n = 5;
  const C: P = [O0[0], O0[1] - R0];
  const D: P = [O0[0], O0[1] + R0];
  const a: P = [O0[0] - R0, O0[1]];
  const b: P = [O0[0] + R0, O0[1]];
  const u = 40;
  const ang = 250;
  const T = Array.from({ length: n + 1 }, (_, i) => en(C, u * i, ang));
  const Q = Array.from({ length: n + 1 }, (_, i) => [C[0], C[1] + ((D[1] - C[1]) * i) / n] as P);
  const E: P = [O0[0] + Math.sqrt((2 * R0) ** 2 - R0 ** 2), O0[1]];
  // recta E–2 y su corte F con la circunferencia
  const dx = Q[2][0] - E[0];
  const dy = Q[2][1] - E[1];
  const L2 = Math.hypot(dx, dy);
  const ux = dx / L2;
  const uy = dy / L2;
  const bq = (E[0] - O0[0]) * ux + (E[1] - O0[1]) * uy;
  const cq = (E[0] - O0[0]) ** 2 + (E[1] - O0[1]) ** 2 - R0 ** 2;
  const t = -bq + Math.sqrt(bq * bq - cq);
  const F: P = [E[0] + ux * t, E[1] + uy * t];
  const lado = dist(C, F);
  const giro = F[0] < C[0] ? 1 : -1;
  const V = vertices(O0, R0, 90, lado, n, giro);
  const du = dato("u", u, 70);
  return {
    titulo: "Circunferencia en un número cualquiera de partes iguales",
    intro: "Se tiene una circunferencia con dos diámetros perpendiculares, $AB$ y $CD$. Para dividirla en $n$ partes se divide $CD$ en $n$ partes iguales (aquí, $n = 5$) y con el punto 2 se halla el lado.",
    pts: { ...du.pts, O: O0, A: a, B: b, C, D, E, F, G: V[2], H: V[3], I: V[4], X: en(C, 230, ang), "1": Q[1], "2": Q[2], "3": Q[3], "4": Q[4], T1: T[1], T2: T[2], T3: T[3], T4: T[4], T5: T[5] },
    dados: ["O", "C", "D", "A", "B", "X"],
    datos: [du.d],
    base: [["A", "B"], ["C", "D"]],
    circulos: [{ c: "O", r: R0 }],
    ext: 40,
    ops: [
      { k: "recta", a: "C", b: "X" },
      { k: "medir", de: "u1", a: "u2" },
      ...marcaArco("C", "T1"),
      ...marcaArco("T1", "T2"),
      ...marcaArco("T2", "T3"),
      ...marcaArco("T3", "T4"),
      ...marcaArco("T4", "T5"),
      { k: "recta", a: "T5", b: "D" },
      { k: "paralelas", recta: ["T5", "D"], marcas: ["T4", "T3", "T2", "T1"], cortes: ["4", "3", "2", "1"] },
      { k: "medir", de: "C", a: "D" },
      { k: "arco", c: "C", hacia: "E", ang: [-14, 14] },
      { k: "arco", c: "D", hacia: "E", ang: [-14, 14] },
      { k: "marca", p: "E" },
      { k: "recta", a: "E", b: "2" },
      { k: "marca", p: "F" },
      { k: "medir", de: "C", a: "F" },
      ...marcaArco("F", "G"),
      ...marcaArco("G", "H"),
      ...marcaArco("H", "I"),
      { k: "lados", pts: ["C", "F", "G", "H", "I"] },
    ],
  };
}

/* ───────────── Polígonos regulares dado el lado ───────────── */

function pentagonoLado(): Construccion {
  const l = 110;
  const A: P = [245, 268];
  const B: P = [A[0] + l, 268];
  const par = cortes(A, l, B, l);
  const N = medio(A, B);
  const M: P = [B[0], B[1] - l];
  const rN = dist(N, M);
  const F: P = [N[0] + rN, 268];
  const d = dist(A, F);
  const C = en(B, l, 72);
  const E = en(A, l, 108);
  const Dd: P = [N[0], 268 - Math.sqrt(d * d - (l / 2) ** 2)];
  const dl = dato("l", l, 70);
  return {
    titulo: "Pentágono regular dado el lado",
    intro: "Se conoce el lado $l = AB$. Se halla la diagonal $d = AF$ con una construcción auxiliar y con ella se obtienen los vértices.",
    pts: { ...dl.pts, A, B, P1: arriba(par), P2: abajo(par), N, M, F, D: Dd, C, E, _pb: [B[0], B[1] - l - 40] },
    dados: ["A", "B"],
    datos: [dl.d],
    base: [["A", "B"]],
    ops: [
      perp(["A", "B"], "B", ["B", "_pb"]),
      { k: "medir", de: "A", a: "B" },
      ...marcaArco("B", "M"),
      { k: "arco", c: "A", hacia: "B", ang: [-66, 66] },
      { k: "arco", c: "B", hacia: "A", ang: [-66, 66] },
      { k: "marca", p: "P1" },
      { k: "marca", p: "P2" },
      { k: "recta", a: "P1", b: "P2", limpia: true },
      { k: "marca", p: "N" },
      { k: "medir", de: "N", a: "M" },
      ...marcaArco("N", "F"),
      { k: "medir", de: "A", a: "F" },
      { k: "arco", c: "A", hacia: "C", abs: [30, 78] },
      { k: "arco", c: "B", hacia: "E", abs: [102, 150] },
      { k: "marca", p: "D" },
      { k: "medir", de: "A", a: "B" },
      ...marcaArco("A", "E"),
      ...marcaArco("B", "C"),
      { k: "lados", pts: ["A", "B", "C", "D", "E"] },
    ],
    notas: {},
  };
}

function hexagonoLado(): Construccion {
  const l = 110;
  const A: P = [245, 262];
  const B: P = [A[0] + l, 262];
  const O = arriba(cortes(A, l, B, l));
  const V = vertices(O, l, angDe(O, B), l, 6, 1);
  const nombres = ["B", "C", "D", "E", "F", "A"];
  const v: Record<string, P> = {};
  nombres.forEach((n, i) => (v[n] = V[i]));
  const dl = dato("l", l, 70);
  return {
    titulo: "Hexágono regular dado el lado",
    intro: "Se conoce el lado $l = AB$. En el hexágono regular el lado es igual al radio de la circunferencia circunscrita.",
    pts: { ...dl.pts, ...v, A, B, O },
    dados: ["A", "B"],
    datos: [dl.d],
    base: [["A", "B"]],
    ops: [
      { k: "medir", de: "A", a: "B" },
      { k: "arco", c: "A", hacia: "O" },
      { k: "arco", c: "B", hacia: "O" },
      { k: "marca", p: "O" },
      { k: "circulo", c: "O", hacia: "A" },
      ...marcaArco("B", "C"),
      ...marcaArco("C", "D"),
      ...marcaArco("D", "E"),
      ...marcaArco("E", "F"),
      { k: "lados", pts: ["A", "B", "C", "D", "E", "F"] },
    ],
  };
}

function heptagonoLado(): Construccion {
  const l = 100;
  const A: P = [250, 300];
  const B: P = [A[0] + l, 300];
  const N = arriba(cortes(A, l, B, l));
  const M: P = [B[0], 300 - l * Math.tan(rad(30))];
  const radio = dist(A, M);
  const O: P = [N[0], 300 - Math.sqrt(radio * radio - (l / 2) ** 2)];
  const V = vertices(O, radio, angDe(O, B), l, 7, 1);
  const nombres = ["B", "C", "D", "E", "F", "G", "A"];
  const v: Record<string, P> = {};
  nombres.forEach((n, i) => (v[n] = V[i]));
  const dl = dato("l", l, 70);
  return {
    titulo: "Heptágono regular dado el lado",
    intro: "Se conoce el lado $l = AB$. Se halla el centro $O$ de la circunferencia circunscrita sobre la mediatriz de $AB$.",
    pts: { ...dl.pts, ...v, A, B, N, M, O, _m1: [N[0], 330], _m2: [N[0], 40], _pM: [B[0], M[1] - 40] },
    dados: ["A", "B"],
    datos: [dl.d],
    base: [["A", "B"]],
    ops: [
      { k: "medir", de: "A", a: "B" },
      { k: "arco", c: "A", hacia: "N" },
      { k: "arco", c: "B", hacia: "N" },
      { k: "marca", p: "N" },
      perp(["A", "B"], "N", ["_m1", "_m2"]),
      { k: "angulo", v: "A", base: 0, obj: 30, largo: 150 },
      perp(["A", "B"], "B", ["B", "_pM"]),
      { k: "marca", p: "M" },
      { k: "medir", de: "A", a: "M" },
      ...marcaArco("A", "O"),
      { k: "circulo", c: "O", hacia: "A" },
      { k: "medir", de: "A", a: "B" },
      ...marcaArco("B", "C"),
      ...marcaArco("C", "D"),
      ...marcaArco("D", "E"),
      ...marcaArco("E", "F"),
      ...marcaArco("F", "G"),
      { k: "lados", pts: ["A", "B", "C", "D", "E", "F", "G"] },
    ],
  };
}

function octogonoLado(): Construccion {
  const l = 100;
  const A: P = [250, 310];
  const B: P = [A[0] + l, 310];
  const D: P = [A[0], A[1] - l];
  const C: P = [B[0], B[1] - l];
  const Nn = medio(A, C);
  const rc = dist(Nn, A);
  const O: P = [Nn[0], Nn[1] - rc];
  const radio = dist(O, A);
  const V = vertices(O, radio, angDe(O, B), l, 8, 1);
  const nombres = ["B", "E", "F", "G", "H", "I", "J", "A"];
  const v: Record<string, P> = {};
  nombres.forEach((n, i) => (v[n] = V[i]));
  const dl = dato("l", l, 70);
  return {
    titulo: "Octógono regular dado el lado",
    intro: "Se conoce el lado $l = AB$. Se construye un cuadrado sobre $AB$ y su circunferencia circunscrita corta a la mediatriz de $AB$ en el centro $O$ del octógono.",
    pts: { ...dl.pts, ...v, A, B, C, D, N: Nn, O, _pA: [A[0], D[1] - 40], _pB: [B[0], C[1] - 40], _m1: [Nn[0], 345], _m2: [Nn[0], O[1] - 50] },
    dados: ["A", "B"],
    datos: [dl.d],
    base: [["A", "B"]],
    ops: [
      perp(["A", "B"], "A", ["A", "_pA"]),
      perp(["A", "B"], "B", ["B", "_pB"]),
      { k: "medir", de: "A", a: "B" },
      ...marcaArco("A", "D"),
      ...marcaArco("B", "C"),
      { k: "recta", a: "A", b: "C" },
      { k: "recta", a: "B", b: "D" },
      { k: "marca", p: "N" },
      { k: "medir", de: "N", a: "A" },
      { k: "circulo", c: "N", hacia: "A" },
      perp(["A", "B"], "N", ["_m1", "_m2"]),
      { k: "marca", p: "O" },
      { k: "medir", de: "O", a: "A" },
      { k: "circulo", c: "O", hacia: "A" },
      { k: "medir", de: "A", a: "B" },
      ...marcaArco("B", "E"),
      ...marcaArco("E", "F"),
      ...marcaArco("F", "G"),
      ...marcaArco("G", "H"),
      ...marcaArco("H", "I"),
      ...marcaArco("I", "J"),
      { k: "lados", pts: ["A", "B", "E", "F", "G", "H", "I", "J"] },
    ],
  };
}

function eneagonoLado(): Construccion {
  const l = 90;
  const A: P = [255, 320];
  const B: P = [A[0] + l, 320];
  const M = arriba(cortes(A, l, B, l));
  const N: P = [M[0], 320 - (l / 2) * Math.tan(rad(30))];
  const rn = dist(M, N);
  const dirAM = angDe(M, A);
  const dirBM = angDe(M, B);
  const Q = en(M, rn, dirAM + 180);
  const Pq = en(M, rn, dirBM + 180);
  const O: P = [M[0], Q[1]];
  const radio = dist(O, A);
  const V = vertices(O, radio, angDe(O, B), l, 9, 1);
  const nombres = ["B", "C", "D", "E", "F", "G", "H", "I", "A"];
  const v: Record<string, P> = {};
  nombres.forEach((n, i) => (v[n] = V[i]));
  const dl = dato("l", l, 70);
  return {
    titulo: "Eneágono regular dado el lado",
    intro: "Se conoce el lado $l = AB$. Con el triángulo equilátero $ABM$ y unos trazos auxiliares se halla el centro $O$ de la circunferencia circunscrita sobre la mediatriz de $AB$.",
    pts: { ...dl.pts, ...v, A, B, M, N, P: Pq, Q, O, _m1: [M[0], 345], _m2: [M[0], 40] },
    dados: ["A", "B"],
    datos: [dl.d],
    base: [["A", "B"]],
    ext: 90,
    ops: [
      { k: "medir", de: "A", a: "B" },
      { k: "arco", c: "A", hacia: "M" },
      { k: "arco", c: "B", hacia: "M" },
      { k: "marca", p: "M" },
      perp(["A", "B"], "M", ["_m1", "_m2"]),
      { k: "angulo", v: "A", base: 0, obj: 30, largo: 150 },
      { k: "marca", p: "N" },
      { k: "medir", de: "M", a: "N" },
      { k: "circulo", c: "M", hacia: "N" },
      { k: "recta", a: "A", b: "M" },
      { k: "recta", a: "B", b: "M" },
      { k: "marca", p: "P" },
      { k: "marca", p: "Q" },
      { k: "recta", a: "P", b: "Q" },
      { k: "marca", p: "O" },
      { k: "medir", de: "O", a: "A" },
      { k: "circulo", c: "O", hacia: "A" },
      { k: "medir", de: "A", a: "B" },
      ...marcaArco("B", "C"),
      ...marcaArco("C", "D"),
      ...marcaArco("D", "E"),
      ...marcaArco("E", "F"),
      ...marcaArco("F", "G"),
      ...marcaArco("G", "H"),
      ...marcaArco("H", "I"),
      { k: "lados", pts: ["A", "B", "C", "D", "E", "F", "G", "H", "I"] },
    ],
  };
}

export const CONSTRUCCIONES = {
  "cuadrado-lado": cuadradoLado(),
  "cuadrado-diagonal": cuadradoDiagonal(),
  "rectangulo-lados": rectanguloLados(),
  "rectangulo-diagonal": rectanguloDiagonal(),
  "rombo-diagonales": romboDiagonales(),
  "rombo-angulo": romboAngulo(),
  "romboide-lados": romboide(),
  "trapecio-isosceles": trapecioIsosceles(),
  "trapecio-rectangulo": trapecioRectangulo(),
  "division-6-3": div6y3(),
  "division-4-8": div4y8(),
  "division-5": div5(),
  "division-10": div10(),
  "division-7": div7(),
  "division-9": div9(),
  "division-n": divN(),
  "pentagono-lado": pentagonoLado(),
  "hexagono-lado": hexagonoLado(),
  "heptagono-lado": heptagonoLado(),
  "octogono-lado": octogonoLado(),
  "eneagono-lado": eneagonoLado(),
} satisfies Record<string, Construccion>;

export type ConstruccionId = keyof typeof CONSTRUCCIONES;

/** Nombre con el que se rotula un punto (los puntos auxiliares de la división de `CD` llevan una prima). */
const ETIQUETAS: Record<string, string> = { Pl: "P'", T1: "1'", T2: "2'", T3: "3'", T4: "4'", T5: "5'", X: "X" };
export const etiqueta = (clave: string) => ETIQUETAS[clave] ?? clave;
export const ID_ANIM = (id: ConstruccionId) => `c-${id}` as const;
export const ID_PRACTICA = (id: ConstruccionId) => `c-${id}-practica` as const;
/** Identificadores de escena de las construcciones: `c-<id>` (animación) y `c-<id>-practica`. */
export type ConstruccionEscena = `c-${ConstruccionId}` | `c-${ConstruccionId}-practica`;

/** Pasos de cada escena: la animación tiene uno por operación (menos las marcas, que se muestran al terminar la anterior) más el de los datos. */
export function pasosAnimacion(c: Construccion): number {
  return 1 + c.ops.filter((o) => o.k !== "marca").length;
}

/** Fases de la práctica: lo que el alumno hace con los instrumentos, en orden. */
export type FaseP = "medida" | "centro" | "arco" | "punto" | "trazo" | "perpendicular" | "angulo" | "escuadra" | "auto";
export function fasesPractica(c: Construccion): FaseP[] {
  const f: FaseP[] = [];
  for (const o of c.ops) {
    if (o.k === "medir") f.push("medida");
    else if (o.k === "arco" || o.k === "circulo") f.push("centro", "arco");
    else if (o.k === "marca") f.push("punto");
    else if (o.k === "recta") f.push("trazo");
    else if (o.k === "perp") f.push("perpendicular");
    else if (o.k === "angulo") f.push("angulo");
    else if (o.k === "paralelas") o.marcas.forEach(() => f.push("escuadra"));
  }
  f.push("auto");
  return f;
}

export const PASOS_CONSTRUCCION = Object.fromEntries(
  (Object.keys(CONSTRUCCIONES) as ConstruccionId[]).flatMap((id) => [
    [ID_ANIM(id), pasosAnimacion(CONSTRUCCIONES[id])],
    [ID_PRACTICA(id), fasesPractica(CONSTRUCCIONES[id]).length],
  ]),
) as Record<ConstruccionEscena, number>;

export { angDe, dist, en, medio };
