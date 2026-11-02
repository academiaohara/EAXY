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
  /** Tamaño de la escuadra y el cartabón en esta construcción (1 = normal): se reducen si no caben en la hoja. */
  escala?: number;
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

/** Ángulos que se trazan con la escuadra (45°) o con el cartabón (30° y 60°); el resto, con el transportador. */
export const instrumentoAngulo = (obj: number): "cartabon30" | "cartabon60" | "escuadra45" | null => (obj === 30 ? "cartabon30" : obj === 60 ? "cartabon60" : obj === 45 ? "escuadra45" : null);

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

function nombrar(pts: P[], nombres: string[]): Record<string, P> {
  const v: Record<string, P> = {};
  pts.forEach((p, i) => (v[nombres[i]] = p));
  return v;
}
const LETRAS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function div6y3(): Construccion {
  const A: P = [O0[0], O0[1] - R0];
  const v = nombrar(vertices(O0, R0, 90, R0, 6, 1), LETRAS);
  return {
    titulo: "Circunferencia en tres y en seis partes iguales",
    intro: "Se tiene una circunferencia de centro $O$ y radio $R$. El lado del hexágono regular inscrito es igual al radio: se lleva seis veces sobre la circunferencia empezando en $A$.",
    pts: { O: O0, ...v, A },
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
  // vértices del octógono desde A, en sentido antihorario: A, B, C, D, E, F, G, H (C a la izquierda y G a la derecha)
  const A: P = [O0[0], O0[1] - R0];
  const E: P = [O0[0], O0[1] + R0];
  const C: P = [O0[0] - R0, O0[1]];
  const G: P = [O0[0] + R0, O0[1]];
  const H = en(O0, R0, 45);
  const X: P = [O0[0] + R0, O0[1] - R0];
  const V = vertices(O0, R0, 90, dist(A, H), 8, 1);
  return {
    titulo: "Circunferencia en cuatro y en ocho partes iguales",
    intro: "Se tiene una circunferencia de centro $O$ con un diámetro $AE$ dibujado. Dos diámetros perpendiculares la dividen en cuatro partes iguales; la bisectriz del ángulo central $AOG$ da el punto $H$, y $AH$ es el lado del octógono.",
    pts: { O: O0, A, E, C, G, H, X, B: V[1], D: V[3], F: V[5], _l: [C[0] - 25, O0[1]], _r: [G[0] + 25, O0[1]] },
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
      { k: "arco", c: "G", hacia: "O", abs: [85, 185] },
      { k: "marca", p: "X" },
      { k: "recta", a: "O", b: "X", limpia: true },
      { k: "marca", p: "H" },
      { k: "medir", de: "A", a: "H" },
      ...marcaArco("A", "B"),
      ...marcaArco("C", "D"),
      ...marcaArco("E", "F"),
      { k: "lados", pts: ["A", "B", "C", "D", "E", "F", "G", "H"] },
    ],
  };
}

/** Primer tramo común del pentágono y del decágono (libro, figs. 20 y 21). */
function pentagonoBase() {
  const A: P = [O0[0], O0[1] - R0];
  const M: P = [O0[0] + R0, O0[1]];
  const N = en(O0, R0, 60);
  const L: P = [N[0], O0[1]];
  const Pp: P = [L[0] - dist(L, A), O0[1]];
  return { A, M, N, L, Pp, ocultos: { _b: [O0[0], O0[1] + R0] as P, _l: [O0[0] - R0, O0[1]] as P, _nl: [N[0], O0[1] + 22] as P } };
}

function div5(): Construccion {
  const { A, M, N, L, Pp, ocultos } = pentagonoBase();
  const v = nombrar(vertices(O0, R0, 90, dist(A, Pp), 5, 1), LETRAS);
  return {
    titulo: "Circunferencia en cinco partes iguales",
    intro: "Se tiene una circunferencia con dos diámetros perpendiculares dibujados. Se halla el lado $l_5 = AP$ del pentágono con el método de Euclides y se lleva cinco veces sobre la circunferencia, empezando en $A$.",
    pts: { O: O0, M, N, L, P: Pp, ...v, A, ...ocultos },
    dados: ["O", "A", "M"],
    datos: [],
    base: [["A", "_b"], ["_l", "M"]],
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
      ...marcaArco("D", "E"),
      { k: "lados", pts: ["A", "B", "C", "D", "E"] },
    ],
  };
}

function div10(): Construccion {
  const { A, M, N, L, Pp, ocultos } = pentagonoBase();
  const nombres = LETRAS;
  const v = nombrar(vertices(O0, R0, 90, dist(O0, Pp), 10, 1), nombres);
  return {
    titulo: "Circunferencia en diez partes iguales",
    intro: "Con la misma construcción del pentágono, el segmento $OP$ es el lado $l_{10}$ del decágono regular inscrito: se lleva diez veces sobre la circunferencia, empezando en $A$.",
    pts: { O: O0, M, N, L, P: Pp, ...v, A, ...ocultos },
    dados: ["O", "A", "M"],
    datos: [],
    base: [["A", "_b"], ["_l", "M"]],
    circulos: [{ c: "O", r: R0 }],
    ops: [
      { k: "medir", de: "M", a: "O" },
      ...marcaArco("M", "N"),
      perp(["O", "M"], "N", ["N", "_nl"]),
      { k: "marca", p: "L" },
      { k: "medir", de: "L", a: "A" },
      ...marcaArco("L", "P"),
      { k: "medir", de: "O", a: "P" },
      ...nombres.slice(0, 9).flatMap((n, i) => marcaArco(n, nombres[i + 1])),
      { k: "lados", pts: nombres },
    ],
  };
}

function div7(): Construccion {
  const A: P = [O0[0], O0[1] - R0];
  const Lb: P = [O0[0], O0[1] + R0];
  const M: P = [O0[0] - R0, O0[1]];
  const N: P = [O0[0] + R0, O0[1]];
  const Q = en(O0, R0, 60);
  const Pm: P = [Q[0], O0[1]];
  const v = nombrar(vertices(O0, R0, 90, dist(Pm, Q), 7, 1), LETRAS);
  return {
    titulo: "Circunferencia en siete partes iguales",
    intro: "Se tiene una circunferencia de centro $O$ con los diámetros $AL$ y $MN$ dibujados. El segmento $PQ$, con $P$ el punto medio del radio $ON$, es el lado $l_7$ del heptágono inscrito: se lleva siete veces sobre la circunferencia, empezando en $A$.",
    pts: { O: O0, A, L: Lb, M, N, Q, P: Pm, ...v, _q: [Q[0], O0[1] + 22] },
    dados: ["O", "A", "L", "M", "N"],
    datos: [],
    base: [["A", "L"], ["M", "N"]],
    circulos: [{ c: "O", r: R0 }],
    ops: [
      { k: "medir", de: "N", a: "O" },
      { k: "arco", c: "N", hacia: "Q", abs: [112, 182] },
      { k: "marca", p: "Q" },
      perp(["O", "N"], "Q", ["Q", "_q"]),
      { k: "marca", p: "P" },
      { k: "medir", de: "P", a: "Q" },
      ...marcaArco("A", "B"),
      ...marcaArco("B", "C"),
      ...marcaArco("C", "D"),
      ...marcaArco("D", "E"),
      ...marcaArco("E", "F"),
      ...marcaArco("F", "G"),
      { k: "lados", pts: ["A", "B", "C", "D", "E", "F", "G"] },
    ],
  };
}

function div9(): Construccion {
  const A: P = [O0[0], O0[1] - R0];
  const N: P = [O0[0], O0[1] + R0];
  const Pl: P = [O0[0] - R0, O0[1]];
  const Rr: P = [O0[0] + R0, O0[1]];
  const K2 = en(O0, R0, 30);
  const K1 = en(O0, R0, -30);
  const K3: P = [O0[0] + R0 * Math.SQRT2, O0[1]];
  const rad3 = dist(K3, A);
  const Q: P = [K3[0] - rad3, O0[1]];
  const v = nombrar(vertices(O0, R0, 90, dist(Pl, Q), 9, 1), LETRAS);
  return {
    titulo: "Circunferencia en nueve partes iguales",
    intro: "Se tiene una circunferencia con los diámetros perpendiculares $AN$ y $PR$ dibujados. El segmento $PQ$ es el lado $l_9$ del eneágono inscrito: se lleva nueve veces sobre la circunferencia, empezando en $A$.",
    pts: { O: O0, A, N, P: Pl, R: Rr, "1": K1, "2": K2, "3": K3, Q, ...v },
    dados: ["O", "A", "N", "P", "R"],
    datos: [],
    base: [["A", "N"], ["P", "R"]],
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
      ...LETRAS.slice(0, 8).flatMap((n, i) => marcaArco(n, LETRAS[i + 1])),
      { k: "lados", pts: LETRAS.slice(0, 9) },
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
  const X: P = en(O0, R0, 215);
  const ang = angDe(C, X);
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
    pts: { ...du.pts, O: O0, A: a, B: b, C, D, E, F, G: V[2], H: V[3], I: V[4], X, "1": Q[1], "2": Q[2], "3": Q[3], "4": Q[4], T1: T[1], T2: T[2], T3: T[3], T4: T[4], T5: T[5] },
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
      { k: "recta", a: "A", b: "B" },
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
    ext: 90,
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

/* ───────────── Tema 6: relaciones geométricas ───────────── */

/** Simétrico de `q` respecto del eje que pasa por `e0` y `e1`, y pie de la perpendicular. */
function reflejo(e0: P, e1: P, q: P) {
  const l = dist(e0, e1);
  const u: P = [(e1[0] - e0[0]) / l, (e1[1] - e0[1]) / l];
  const t = (q[0] - e0[0]) * u[0] + (q[1] - e0[1]) * u[1];
  const pie: P = [e0[0] + u[0] * t, e0[1] + u[1] * t];
  return { pie, sim: [2 * pie[0] - q[0], 2 * pie[1] - q[1]] as P };
}

/** Simetría axial de uno o varios puntos: perpendicular al eje (escuadra y cartabón), pie y compás con la misma distancia. */
function simetriaAxial(nombres: string[], originales: P[], titulo: string, intro: string, lados: boolean, baseOrig: [string, string][]): Construccion {
  const e0: P = [40, 190];
  const e1: P = [580, 170];
  const pts: Record<string, P> = { _e0: e0, e: e1 };
  const ops: Op[] = [];
  const base: [string, string][] = [["_e0", "e"], ...baseOrig];
  nombres.forEach((n, i) => {
    const { pie, sim } = reflejo(e0, e1, originales[i]);
    const largo = dist(originales[i], sim);
    const ext: P = [sim[0] + ((sim[0] - originales[i][0]) / largo) * 14, sim[1] + ((sim[1] - originales[i][1]) / largo) * 14];
    pts[n] = originales[i];
    pts[`f${i}`] = pie;
    pts[`${n}s`] = sim;
    pts[`_x${i}`] = ext;
    ops.push(perp(["_e0", "e"], n, [n, `_x${i}`]), { k: "marca", p: `f${i}` }, { k: "medir", de: `f${i}`, a: n }, ...marcaArco(`f${i}`, `${n}s`));
  });
  if (lados) ops.push({ k: "lados", pts: nombres.map((n) => `${n}s`) });
  return { titulo, intro, pts, dados: ["e", ...nombres], datos: [], base, ops, ext: 10 };
}



const prima = (clave: string) => `${clave}p`;

/** Rayos de partida y datos comunes de las construcciones de cuarto y tercer proporcional. */
function proporcional(tercero: boolean): Construccion {
  const a = 110;
  const b = 70;
  const c = tercero ? b : 90;
  const A: P = [170, 300];
  const dir = 35;
  const N: P = [A[0] + a, A[1]];
  const Pp: P = [N[0] + b, A[1]];
  const M = en(A, c, dir);
  const Q = en(A, (c * (a + b)) / a, dir);
  const da = dato("a", a, 70);
  const db = dato("b", b, 96, { color: "ambar" });
  const dc = tercero ? null : dato("c", c, 122);
  return {
    titulo: tercero ? "Tercero proporcional" : "Cuarto proporcional",
    intro: tercero
      ? "Se conocen dos segmentos $a$ y $b$. El **tercero proporcional** $x$ es el que cumple $\\dfrac{a}{b} = \\dfrac{b}{x}$: el término $b$ se repite en los medios. Se resuelve con el teorema de Thales."
      : "Se conocen tres segmentos $a$, $b$ y $c$. El **cuarto proporcional** $x$ es el que cumple $\\dfrac{a}{b} = \\dfrac{c}{x}$. Su valor sale del teorema de Thales.",
    pts: { ...da.pts, ...db.pts, ...(dc?.pts ?? {}), A, N, P: Pp, M, Q, _r: [A[0] + 340, A[1]], _s: en(A, 330, dir) },
    dados: ["A"],
    datos: [da.d, db.d, ...(dc ? [dc.d] : [])],
    base: [["A", "_r"], ["A", "_s"]],
    ops: [
      { k: "medir", de: "a1", a: "a2" },
      ...marcaArco("A", "N"),
      { k: "medir", de: "b1", a: "b2" },
      ...marcaArco("N", "P"),
      ...(tercero ? [] : ([{ k: "medir", de: "c1", a: "c2" }] as Op[])),
      ...marcaArco("A", "M"),
      { k: "recta", a: "N", b: "M" },
      { k: "paralelas", recta: ["N", "M"], marcas: ["P"], cortes: ["Q"] },
      { k: "lados", pts: ["M", "Q"] },
    ],
  };
}

/** Medio proporcional (teorema de la altura): semicircunferencia sobre `a` o sobre `a + b`. */
function medioProporcional(suma: boolean): Construccion {
  const a = suma ? 100 : 170;
  const b = suma ? 60 : 60;
  const y = 210;
  const A: P = [suma ? 180 : 190, y];
  const Pp: P = [A[0] + (suma ? a : b), y];
  const B: P = [A[0] + (suma ? a + b : a), y];
  const O = medio(A, B);
  const R = dist(O, A);
  const par = cortes(A, dist(A, B), B, dist(A, B));
  const M: P = [Pp[0], y - Math.sqrt(R * R - (Pp[0] - O[0]) ** 2)];
  const da = dato("a", a, 70);
  const db = dato("b", b, 96, { color: "ambar" });
  const datos = suma ? [da, db] : [db];
  return {
    titulo: suma ? "Medio proporcional entre a y b (sobre a + b)" : "Medio proporcional entre a y b (sobre a)",
    intro: suma
      ? "Se conocen los segmentos $a$ y $b$. El **medio proporcional** $x$ cumple $\\dfrac{a}{x} = \\dfrac{x}{b}$, es decir, $x^2 = a\\cdot b$. Con $a$ y $b$ seguidos se forma un diámetro $AB = a + b$ y $x$ es la altura sobre la semicircunferencia."
      : "Se conocen los segmentos $a = AB$ y $b$. El **medio proporcional** $x$ cumple $x^2 = a\\cdot b$: es el cateto de un triángulo rectángulo cuya hipotenusa es $a$ y cuya proyección es $b$.",
    pts: { ...Object.assign({}, ...datos.map((d) => d.pts)), A, B, P: Pp, O, M, P1: arriba(par), P2: abajo(par), _p1: [Pp[0], y + 40], _p2: [Pp[0], M[1] - 40], _r: [B[0] + 40, y] },
    dados: suma ? ["A"] : ["A", "B"],
    datos: datos.map((d) => d.d),
    base: suma ? [["A", "_r"]] : [["A", "B"]],
    ops: [
      ...(suma
        ? [{ k: "medir", de: "a1", a: "a2" } as Op, ...marcaArco("A", "P"), { k: "medir", de: "b1", a: "b2" } as Op, ...marcaArco("P", "B")]
        : [{ k: "medir", de: "b1", a: "b2" } as Op, ...marcaArco("A", "P")]),
      ...mediatriz("A", "B", "P1", "P2", "O", 66),
      { k: "medir", de: "O", a: "A" },
      { k: "arco", c: "O", hacia: "M", abs: [2, 178] },
      perp(["A", "B"], "P", ["_p1", "_p2"]),
      { k: "marca", p: "M" },
      { k: "lados", pts: suma ? ["P", "M"] : ["A", "M"] },
    ],
  };
}

function semejanteRadial(): Construccion {
  const Pp: P = [110, 205];
  const A: P = [250, 125];
  const B: P = [400, 180];
  const Cc: P = [370, 290];
  const D: P = [250, 300];
  const E: P = [200, 200];
  const mid = (q: P): P => medio(Pp, q);
  const par = cortes(Pp, dist(Pp, A), A, dist(Pp, A));
  return {
    titulo: "Figura semejante: método radial",
    intro: "Se tiene el polígono $F = ABCDE$ y se quiere otro semejante con razón $\\tfrac12$. Se toma un punto $P$ cualquiera y se une con los vértices: la figura semejante tiene sus vértices sobre esas rectas.",
    pts: { P: Pp, A, B, C: Cc, D, E, m1: arriba(par), m2: abajo(par), Ap: mid(A), Bp: mid(B), Cp: mid(Cc), Dp: mid(D), Ep: mid(E) },
    dados: ["P", "A", "B", "C", "D", "E"],
    datos: [],
    base: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "E"], ["E", "A"]],
    ops: [
      { k: "recta", a: "P", b: "A" },
      { k: "recta", a: "P", b: "B" },
      { k: "recta", a: "P", b: "C" },
      { k: "recta", a: "P", b: "D" },
      { k: "recta", a: "P", b: "E" },
      ...mediatriz("P", "A", "m1", "m2", "Ap", 66),
      { k: "paralelas", recta: ["A", "B"], marcas: ["Ap"], cortes: ["Bp"] },
      { k: "paralelas", recta: ["B", "C"], marcas: ["Bp"], cortes: ["Cp"] },
      { k: "paralelas", recta: ["C", "D"], marcas: ["Cp"], cortes: ["Dp"] },
      { k: "paralelas", recta: ["D", "E"], marcas: ["Dp"], cortes: ["Ep"] },
      { k: "lados", pts: ["Ap", "Bp", "Cp", "Dp", "Ep"] },
    ],
  };
}

/** Copia de un cuadrilátero por coordenadas: igual (`esc` = 1) o semejante de razón 2. */
function coordenadas(esc: 1 | 2): Construccion {
  const Y = 255;
  const O: P = [105, Y];
  const Ot: P = [esc === 1 ? 300 : 285, Y];
  // vértices (x, altura) en el orden A, B, C, D; los pies sobre el eje se numeran en el orden de x
  const loc: Record<string, [number, number]> = { A: [15, 50], B: [75, 70], C: [100, 35], D: [45, 34] };
  const orden = ["A", "D", "B", "C"];
  const pts: Record<string, P> = { _r1: [O[0] - 10, Y], _r2: [O[0] + 150, Y], _s1: [Ot[0] - 10, Y], _s2: [Ot[0] + esc * 150 + 10, Y] };
  orden.forEach((v, i) => {
    const [x, h] = loc[v];
    pts[v] = [O[0] + x, Y - h];
    pts[String(i + 1)] = [O[0] + x, Y];
    pts[`t${i + 1}`] = [Ot[0] + esc * x, Y];
    pts[`${v}p`] = [Ot[0] + esc * x, Y - esc * h];
    pts[`_a${i + 1}`] = [O[0] + x, Y + 14];
    pts[`_u${i + 1}`] = [Ot[0] + esc * x, Y - esc * h - 25];
    if (esc === 2) {
      pts[`hy${i + 1}`] = [Ot[0] + esc * x, Y - h];
      if (i < 3) pts[`hx${i + 1}`] = [Ot[0] + esc * (x + (loc[orden[i + 1]][0] - x) / 2), Y];
    }
  });
  const ops: Op[] = [];
  orden.forEach((v, i) => {
    ops.push(perp(["_r1", "_r2"], v, [v, `_a${i + 1}`]), { k: "marca", p: String(i + 1) });
  });
  for (let i = 1; i <= 3; i += 1) {
    ops.push({ k: "medir", de: String(i), a: String(i + 1) });
    if (esc === 2) ops.push(...marcaArco(`t${i}`, `hx${i}`), { k: "medir", de: String(i), a: String(i + 1) }, ...marcaArco(`hx${i}`, `t${i + 1}`));
    else ops.push(...marcaArco(`t${i}`, `t${i + 1}`));
  }
  orden.forEach((v, i) => ops.push(perp(["_s1", "_s2"], `t${i + 1}`, [`t${i + 1}`, `_u${i + 1}`])));
  orden.forEach((v, i) => {
    ops.push({ k: "medir", de: String(i + 1), a: v });
    if (esc === 2) ops.push(...marcaArco(`t${i + 1}`, `hy${i + 1}`), { k: "medir", de: String(i + 1), a: v }, ...marcaArco(`hy${i + 1}`, `${v}p`));
    else ops.push(...marcaArco(`t${i + 1}`, `${v}p`));
  });
  ops.push({ k: "lados", pts: ["Ap", "Bp", "Cp", "Dp"] });
  return {
    titulo: esc === 1 ? "Figura igual por coordenadas" : "Figura semejante por coordenadas",
    intro:
      esc === 1
        ? "Se quiere construir una figura igual al cuadrilátero $ABCD$. Se proyectan sus vértices sobre una recta $r$ (el eje) y se copian sobre otra recta $r'$ las distancias entre las proyecciones y las alturas: son sus **coordenadas**."
        : "Se quiere construir una figura semejante al cuadrilátero $ABCD$ con razón 2. Se proyectan sus vértices sobre una recta $r$ y se copian sobre otra recta $r'$ las distancias y las alturas **dos veces**, es decir, multiplicadas por la razón.",
    pts,
    dados: ["t1", "A", "B", "C", "D"],
    datos: [],
    base: [["_r1", "_r2"], ["_s1", "_s2"], ["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]],
    ops,
    ext: 20,
  };
}

function igualTriangulacion(): Construccion {
  const dx = 280;
  const A: P = [100, 120];
  const B: P = [210, 85];
  const C: P = [260, 175];
  const D: P = [190, 265];
  const E: P = [90, 225];
  const sh = (q: P): P => [q[0] + dx, q[1]];
  return {
    titulo: "Figura igual por triangulación",
    intro: "Se quiere copiar el pentágono $ABCDE$. Se descompone en triángulos con las diagonales que parten de un vértice ($B$) y se construyen uno a uno, en el mismo orden, a partir del lado $A'B' = AB$.",
    pts: { A, B, C, D, E, Ap: sh(A), Bp: sh(B), Cp: sh(C), Dp: sh(D), Ep: sh(E) },
    dados: ["A", "B", "C", "D", "E", "Ap", "Bp"],
    datos: [],
    base: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "E"], ["E", "A"], ["B", "D"], ["B", "E"], ["Ap", "Bp"]],
    ops: [
      { k: "medir", de: "A", a: "E" },
      { k: "arco", c: "Ap", hacia: "Ep" },
      { k: "medir", de: "B", a: "E" },
      { k: "arco", c: "Bp", hacia: "Ep" },
      { k: "marca", p: "Ep" },
      { k: "medir", de: "B", a: "D" },
      { k: "arco", c: "Bp", hacia: "Dp" },
      { k: "medir", de: "E", a: "D" },
      { k: "arco", c: "Ep", hacia: "Dp" },
      { k: "marca", p: "Dp" },
      { k: "medir", de: "B", a: "C" },
      { k: "arco", c: "Bp", hacia: "Cp" },
      { k: "medir", de: "D", a: "C" },
      { k: "arco", c: "Dp", hacia: "Cp" },
      { k: "marca", p: "Cp" },
      { k: "lados", pts: ["Ap", "Bp", "Cp", "Dp", "Ep"] },
    ],
  };
}

function igualRodeo(): Construccion {
  const dx = 290;
  const r = 45;
  const A: P = [60, 100];
  const B: P = [90, 240];
  const C: P = [220, 270];
  const D: P = [240, 130];
  const sh = (q: P): P => [q[0] + dx, q[1]];
  const dirA = angDe(B, A);
  const dirC = angDe(B, C);
  const p = en(B, r, dirA);
  const q = en(B, r, dirC);
  const dirB = angDe(C, B);
  const dirD = angDe(C, D);
  const u = en(C, r, dirB);
  const v = en(C, r, dirD);
  const dr = dato("r", r, 70);
  const abB: [number, number] = [dirA, dirC];
  const abC: [number, number] = [dirB, dirD];
  const ordenar = ([x, y]: [number, number]): [number, number] => {
    const lo = Math.min(x, y);
    const hi = Math.max(x, y);
    return hi - lo > 180 ? [hi - 360 - 8, lo + 8] : [lo - 8, hi + 8];
  };
  return {
    titulo: "Figura igual por copia de ángulos (rodeo)",
    intro: "Se quiere copiar el cuadrilátero $ABCD$ a partir de $A'B' = AB$. En cada vértice se copia el ángulo con el compás (se toma su cuerda sobre un arco de radio fijo) y se lleva el lado: así se va «rodeando» la figura.",
    pts: { ...dr.pts, A, B, C, D, Ap: sh(A), Bp: sh(B), p, q, pp: sh(p), qq: sh(q), Cp: sh(C), u, v, uu: sh(u), vv: sh(v), Dp: sh(D) },
    dados: ["A", "B", "C", "D", "Ap", "Bp"],
    datos: [dr.d],
    base: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"], ["Ap", "Bp"]],
    ops: [
      { k: "medir", de: "r1", a: "r2" },
      { k: "arco", c: "B", hacia: "p", abs: ordenar(abB) },
      { k: "marca", p: "p" },
      { k: "marca", p: "q" },
      ...marcaArco("Bp", "pp"),
      { k: "medir", de: "p", a: "q" },
      ...marcaArco("pp", "qq"),
      { k: "recta", a: "Bp", b: "qq" },
      { k: "medir", de: "B", a: "C" },
      ...marcaArco("Bp", "Cp"),
      { k: "medir", de: "r1", a: "r2" },
      { k: "arco", c: "C", hacia: "u", abs: ordenar(abC) },
      { k: "marca", p: "u" },
      { k: "marca", p: "v" },
      ...marcaArco("Cp", "uu"),
      { k: "medir", de: "u", a: "v" },
      ...marcaArco("uu", "vv"),
      { k: "recta", a: "Cp", b: "vv" },
      { k: "medir", de: "C", a: "D" },
      ...marcaArco("Cp", "Dp"),
      { k: "lados", pts: ["Ap", "Bp", "Cp", "Dp"] },
    ],
  };
}

function igualTraslacion(): Construccion {
  const dx = 215;
  const V: Record<string, P> = { A: [100, 140], B: [170, 190], C: [150, 245], D: [110, 320], E: [60, 230] };
  const pts: Record<string, P> = {};
  const etiquetas = ["a", "b", "c", "d", "e"];
  Object.entries(V).forEach(([k, q], i) => {
    pts[k] = q;
    pts[`${k}p`] = [q[0] + dx, q[1]];
    pts[`_l${etiquetas[i]}`] = [575, q[1]];
  });
  return {
    titulo: "Figura igual por traslación",
    intro: "Se quiere copiar el pentágono $ABCDE$. Se traza por $A$ y por un punto cualquiera $A'$ una recta y, con escuadra y cartabón, por los demás vértices sus paralelas. Después, desde $A'$, se van trazando paralelas a los lados hasta cortar a las rectas siguientes: es una simple traslación.",
    pts,
    dados: ["A", "B", "C", "D", "E", "Ap"],
    datos: [],
    base: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "E"], ["E", "A"]],
    ext: 8,
    ops: [
      { k: "recta", a: "A", b: "Ap" },
      { k: "paralelas", recta: ["A", "Ap"], marcas: ["B", "C", "D", "E"], cortes: ["_lb", "_lc", "_ld", "_le"] },
      { k: "paralelas", recta: ["A", "B"], marcas: ["Ap"], cortes: ["Bp"] },
      { k: "paralelas", recta: ["B", "C"], marcas: ["Bp"], cortes: ["Cp"] },
      { k: "paralelas", recta: ["C", "D"], marcas: ["Cp"], cortes: ["Dp"] },
      { k: "paralelas", recta: ["D", "E"], marcas: ["Dp"], cortes: ["Ep"] },
      { k: "lados", pts: ["Ap", "Bp", "Cp", "Dp", "Ep"] },
    ],
  };
}

function equivalenteLadoMenos(): Construccion {
  const A: P = [250, 90];
  const B: P = [350, 150];
  const C: P = [330, 260];
  const D: P = [200, 280];
  const E: P = [140, 180];
  // G: corte de la prolongación de CB con la paralela a EB por A
  const u: P = [B[0] - E[0], B[1] - E[1]];
  const w: P = [B[0] - C[0], B[1] - C[1]];
  const det = u[0] * -w[1] + w[0] * u[1];
  const s = ((B[0] - A[0]) * -w[1] + w[0] * (B[1] - A[1])) / det;
  const G: P = [A[0] + u[0] * s, A[1] + u[1] * s];
  return {
    titulo: "Polígono equivalente con un lado menos",
    intro: "Se tiene el pentágono $ABCDE$ y se quiere otro **equivalente** (misma área) con un lado menos. Se toma una diagonal que deje aislado un solo vértice ($A$): los triángulos que tienen esa diagonal por base y la misma altura son equivalentes.",
    pts: { A, B, C, D, E, G },
    dados: ["A", "B", "C", "D", "E"],
    datos: [],
    base: [["A", "B"], ["B", "C"], ["C", "D"], ["D", "E"], ["E", "A"]],
    ext: 100,
    ops: [
      { k: "recta", a: "E", b: "B" },
      { k: "recta", a: "C", b: "B" },
      { k: "paralelas", recta: ["E", "B"], marcas: ["A"], cortes: ["G"] },
      { k: "lados", pts: ["G", "C", "D", "E"] },
    ],
  };
}

function simetriaPunto(): Construccion {
  const A: P = [150, 120];
  const Cc: P = [300, 210];
  const Ap: P = [2 * Cc[0] - A[0], 2 * Cc[1] - A[1]];
  return {
    titulo: "Simetría central de un punto",
    intro: "Dos puntos $A$ y $A'$ son **simétricos** respecto de un centro $C$ cuando están alineados con él y a la misma distancia: $CA = CA'$.",
    pts: { A, C: Cc, Ap },
    dados: ["A", "C"],
    datos: [],
    ops: [
      { k: "recta", a: "A", b: "C" },
      { k: "medir", de: "C", a: "A" },
      ...marcaArco("C", "Ap"),
      { k: "lados", pts: ["A", "Ap"] },
    ],
  };
}

function simetriaSegmento(): Construccion {
  const Cc: P = [300, 200];
  const M: P = [160, 120];
  const N: P = [210, 290];
  const sim = (q: P): P => [2 * Cc[0] - q[0], 2 * Cc[1] - q[1]];
  return {
    titulo: "Simetría central de un segmento",
    intro: "Se tiene un segmento $r = MN$ y un centro de simetría $C$. Basta hallar los simétricos de sus extremos: el segmento $M'N'$ es **paralelo** a $MN$ y de la misma longitud.",
    pts: { M, N, C: Cc, Mp: sim(M), Np: sim(N) },
    dados: ["M", "N", "C"],
    datos: [],
    base: [["M", "N"]],
    ops: [
      { k: "recta", a: "M", b: "C" },
      { k: "medir", de: "C", a: "M" },
      ...marcaArco("C", "Mp"),
      { k: "recta", a: "N", b: "C" },
      { k: "medir", de: "C", a: "N" },
      ...marcaArco("C", "Np"),
      { k: "lados", pts: ["Mp", "Np"] },
    ],
  };
}

function simetriaFigura(): Construccion {
  const Cc: P = [300, 200];
  const V: Record<string, P> = { "1": [190, 95], "2": [120, 150], "3": [145, 265], "4": [235, 300] };
  const sim = (q: P): P => [2 * Cc[0] - q[0], 2 * Cc[1] - q[1]];
  const pts: Record<string, P> = { C: Cc };
  Object.entries(V).forEach(([k, q]) => {
    pts[k] = q;
    pts[`p${k}`] = sim(q);
  });
  const ops: Op[] = [];
  ["1", "2", "3", "4"].forEach((k) => ops.push({ k: "recta", a: k, b: "C" }, { k: "medir", de: "C", a: k }, ...marcaArco("C", `p${k}`)));
  ops.push({ k: "lados", pts: ["p1", "p2", "p3", "p4"] });
  return {
    titulo: "Simetría central de una figura",
    intro: "Para hallar la figura $F'$ simétrica de $F$ respecto del punto $C$ se repite la operación punto a punto: cada vértice y su simétrico están alineados con $C$ y a la misma distancia. Los lados simétricos son paralelos.",
    pts,
    dados: ["1", "2", "3", "4", "C"],
    datos: [],
    base: [["1", "2"], ["2", "3"], ["3", "4"], ["4", "1"]],
    ops,
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
  "cuarto-proporcional": proporcional(false),
  "tercero-proporcional": proporcional(true),
  "medio-proporcional": medioProporcional(false),
  "medio-proporcional-suma": medioProporcional(true),
  "semejante-radial": semejanteRadial(),
  "semejante-coordenadas": coordenadas(2),
  "igual-triangulacion": igualTriangulacion(),
  "igual-coordenadas": coordenadas(1),
  "igual-rodeo": igualRodeo(),
  "igual-traslacion": igualTraslacion(),
  "equivalente-lado-menos": equivalenteLadoMenos(),
  "simetria-punto": simetriaPunto(),
  "simetria-segmento": simetriaSegmento(),
  "simetria-figura": simetriaFigura(),
  "simetria-axial-punto": simetriaAxial(["A"], [[180, 110]], "Simetría axial de un punto", "Dos puntos $A$ y $A'$ son **simétricos** respecto de un eje $e$ cuando están en la misma **perpendicular** al eje y a la misma distancia de él, uno a cada lado.", false, []),
  "simetria-axial-segmento": simetriaAxial(["A", "B"], [[120, 90], [250, 120]], "Simetría axial de un segmento", "Para hallar el simétrico del segmento $s = AB$ se halla el simétrico de cada extremo. Las rectas simétricas se cortan en un punto del eje.", true, [["A", "B"]]),
  "simetria-axial-figura": simetriaAxial(["1", "2", "3", "4"], [[120, 85], [215, 60], [270, 130], [150, 150]], "Simetría axial de una figura", "Para hallar la figura $F'$ simétrica de $F$ respecto de un eje se repite la operación punto a punto: por cada vértice se traza la perpendicular al eje y se lleva la misma distancia al otro lado.", true, [["1", "2"], ["2", "3"], ["3", "4"], ["4", "1"]]),
} satisfies Record<string, Construccion>;

/**
 * Tamaño de la escuadra y el cartabón en las construcciones donde, a tamaño normal, se saldrían de la hoja al trazar
 * (se comprobó dibujando cada pasada de escuadra y cartabón y midiendo cuánto sobresalía). El filo queda en el mismo sitio.
 */
const ESCALA_INSTRUMENTOS: Record<string, number> = {
  "cuadrado-lado": 0.45, "rectangulo-lados": 0.45, "trapecio-isosceles": 0.5, "trapecio-rectangulo": 0.5, "division-n": 0.6,
  "pentagono-lado": 0.8, "heptagono-lado": 0.5, "octogono-lado": 0.45, "eneagono-lado": 0.4, "tercero-proporcional": 0.8,
  "semejante-radial": 0.5, "semejante-coordenadas": 0.5, "igual-coordenadas": 0.5, "igual-traslacion": 0.5,
  "simetria-axial-segmento": 0.7, "simetria-axial-figura": 0.7,
};
for (const [id, k] of Object.entries(ESCALA_INSTRUMENTOS)) (CONSTRUCCIONES as Record<string, Construccion>)[id].escala = k;

export type ConstruccionId = keyof typeof CONSTRUCCIONES;

/** Nombre con el que se rotula un punto (los puntos auxiliares de la división de `CD` llevan una prima). */
const ETIQUETAS: Record<string, string> = {
  Pl: "P'", T1: "", T2: "", T3: "", T4: "", T5: "", X: "",
  Ap: "A'", Bp: "B'", Cp: "C'", Dp: "D'", Ep: "E'", Mp: "M'", Np: "N'", pp: "p'", qq: "q'", uu: "u'", vv: "v'",
  p1: "1'", p2: "2'", p3: "3'", p4: "4'", "1s": "1'", "2s": "2'", "3s": "3'", "4s": "4'", As: "A'", Bs: "B'", f0: "", f1: "", f2: "", f3: "", e: "e", t1: "1'", t2: "2'", t3: "3'", t4: "4'",
  la: "a", lb: "b", lc: "c", ld: "d", le: "e", m1: "", m2: "",
};
export const etiqueta = (clave: string) => (/^h[xy]\d$/.test(clave) ? "" : ETIQUETAS[clave] ?? clave);
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
    else if (o.k === "angulo") f.push(instrumentoAngulo(o.obj) ? "perpendicular" : "angulo");
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
