import type { Construccion, Dato, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 9 (curvas técnicas): óvalos, ovoides, voluta, espiral de Arquímedes y hélice. Como las demás,
 * una sola lista de operaciones da la animación paso a paso y la práctica con instrumentos. Los arcos que se trazan con
 * el compás salen finos; al terminar, la curva se vuelve a dibujar en trazo grueso.
 */

const rad = (d: number) => (d * Math.PI) / 180;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const polar = (o: P, r: number, d: number): P => [o[0] + r * Math.cos(rad(d)), o[1] - r * Math.sin(rad(d))];
const suma = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const resta = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const por = (a: P, k: number): P => [a[0] * k, a[1] * k];
const unit = (a: P): P => por(a, 1 / Math.hypot(a[0], a[1]));
const medio = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

function cortes(a: P, ra: number, b: P, rb: number): [P, P] {
  const d = dist(a, b);
  const x = (d * d + ra * ra - rb * rb) / (2 * d);
  const h = Math.sqrt(Math.max(0, ra * ra - x * x));
  const u = unit(resta(b, a));
  const base = suma(a, por(u, x));
  return [[base[0] + u[1] * h, base[1] - u[0] * h], [base[0] - u[1] * h, base[1] + u[0] * h]];
}
const arriba = (par: [P, P]): P => (par[0][1] < par[1][1] ? par[0] : par[1]);
const abajo = (par: [P, P]): P => (par[0][1] > par[1][1] ? par[0] : par[1]);

function dato(id: string, largo: number, y: number, color?: "azul" | "ambar") {
  const pts: Record<string, P> = { [`${id}1`]: [24, y], [`${id}2`]: [24 + largo, y] };
  const d: Dato = { a: `${id}1`, b: `${id}2`, nombre: id, color };
  return { pts, d };
}

function mediatriz(a: string, b: string, p1: string, p2: string, m: string): Op[] {
  return [
    { k: "medir", de: a, a: b },
    { k: "arco", c: a, hacia: b, ang: [-66, 66] },
    { k: "arco", c: b, hacia: a, ang: [-66, 66] },
    { k: "marca", p: p1 },
    { k: "marca", p: p2 },
    { k: "recta", a: p1, b: p2, limpia: true },
    { k: "marca", p: m },
  ];
}

export const ETIQUETAS_CURVAS: Record<string, string> = {
  Td: "T₄", O3: "O₃", O4: "O₄", d5: "5",
  v1: "1", v2: "2", v3: "3", v4: "4",
  q1: "1", q2: "2", q3: "3", q4: "4", q5: "5", q6: "6", q7: "7",
  s1: "", s2: "", s3: "", s4: "", s5: "", s6: "", s7: "",
  h1: "1'", h2: "2'", h3: "3'", h4: "4'", h5: "5'", h6: "6'", h7: "7'", h8: "8'",
  g1: "1''", g2: "2''", g3: "3''", g4: "4''", g5: "5''", g6: "6''", g7: "7''", g8: "8''", g9: "1''",
  m2: "", m3: "", m4: "", m5: "", m6: "", m7: "", m8: "",
};

/** §2 (Fig. 2): óvalo dado el eje mayor AB (dividido en tres partes iguales). */
function ovaloEjeMayor(): Construccion {
  const A: P = [120, 210];
  const B: P = [480, 210];
  const O1: P = [240, 210];
  const O2: P = [360, 210];
  const r = 120;
  const par = cortes(O1, r, O2, r);
  const O3 = arriba(par);
  const O4 = abajo(par);
  const lejos = (c: P, o: P): P => suma(o, por(unit(resta(o, c)), r));
  const Ta = lejos(O3, O1);
  const Tb = lejos(O3, O2);
  const Tc = lejos(O4, O1);
  const Td = lejos(O4, O2);
  const R = dist(O3, Ta);
  return {
    titulo: "Óvalo dado el eje mayor",
    intro: "Se tiene el eje mayor $AB$, dividido en tres partes iguales por $O_1$ y $O_2$. Con centros en $O_1$ y $O_2$ se trazan las circunferencias de radios $O_1A$ y $O_2B$; sus puntos de corte $O_3$ y $O_4$ son los otros dos centros de los arcos del óvalo.",
    pts: { A, B, O1, O2, O3, O4, Ta, Tb, Tc, Td, _pb: [O3[0], O3[1] + R], _pt: [O4[0], O4[1] - R] },
    dados: ["A", "B", "O1", "O2"],
    datos: [],
    base: [["A", "B"]],
    ext: 130,
    radioMax: 270,
    ops: [
      { k: "medir", de: "O1", a: "A" },
      { k: "circulo", c: "O1", hacia: "A" },
      { k: "medir", de: "O2", a: "B" },
      { k: "circulo", c: "O2", hacia: "B" },
      { k: "marca", p: "O3" },
      { k: "marca", p: "O4" },
      { k: "recta", a: "O3", b: "O1" },
      { k: "marca", p: "Ta" },
      { k: "recta", a: "O3", b: "O2" },
      { k: "marca", p: "Tb" },
      { k: "recta", a: "O4", b: "O1" },
      { k: "marca", p: "Tc" },
      { k: "recta", a: "O4", b: "O2" },
      { k: "marca", p: "Td" },
      { k: "medir", de: "O3", a: "Ta" },
      { k: "arco", c: "O3", hacia: "Ta", abs: [-124, -56] },
      { k: "medir", de: "O4", a: "Tc" },
      { k: "arco", c: "O4", hacia: "Tc", abs: [56, 124] },
      { k: "medir", de: "O1", a: "A" },
      { k: "arco", c: "O1", hacia: "A", abs: [116, 244] },
      { k: "medir", de: "O2", a: "B" },
      { k: "arco", c: "O2", hacia: "B", abs: [-64, 64] },
      { k: "solucion", c: "O3", hacia: "Ta", hasta: "Tb", por: "_pb" },
      { k: "solucion", c: "O4", hacia: "Tc", hasta: "Td", por: "_pt" },
      { k: "solucion", c: "O1", hacia: "Tc", hasta: "Ta", por: "A" },
      { k: "solucion", c: "O2", hacia: "Td", hasta: "Tb", por: "B" },
    ],
  };
}

/** §3 (Fig. 3) y §7 (Fig. 7): óvalo (u ovoide) dado el eje menor CD, con la circunferencia de diámetro CD. */
function ovaloEjeMenor(ovoide: boolean): Construccion {
  const O: P = ovoide ? [240, 200] : [300, 200];
  const r = 90;
  const C: P = [O[0], O[1] - r];
  const D: P = [O[0], O[1] + r];
  const E: P = [O[0] - r, O[1]];
  const F: P = [O[0] + r, O[1]];
  const dir = (a: P, b: P) => unit(resta(b, a));
  const R = 2 * r;
  const rho = R - dist(D, F);
  const Ta = suma(D, por(dir(D, E), R));
  const Tb = suma(D, por(dir(D, F), R));
  const Tc = suma(C, por(dir(C, E), R));
  const Td = suma(C, por(dir(C, F), R));
  const pts: Record<string, P> = { O, C, D, F, Tb, Td, _a: [O[0] - 170, O[1]], _b: [O[0] + 170, O[1]], _pl: [E[0] - rho, E[1]], _pr: [F[0] + rho, F[1]] };
  if (!ovoide) Object.assign(pts, { E, Ta, Tc });
  else pts.Al = [O[0] - r, O[1]];
  const ops: Op[] = [perp(["C", "D"], "O", ["_a", "_b"])];
  function perp(recta: [string, string], punto: string, traza: [string, string]): Op {
    return { k: "perp", recta, punto, traza };
  }
  if (!ovoide) ops.push({ k: "marca", p: "E" });
  ops.push({ k: "marca", p: "F" });
  if (!ovoide) ops.push({ k: "recta", a: "D", b: "E" });
  ops.push({ k: "recta", a: "D", b: "F" });
  if (!ovoide) ops.push({ k: "recta", a: "C", b: "E" });
  ops.push({ k: "recta", a: "C", b: "F" });
  // arcos grandes: centros D y C, radio CD
  ops.push({ k: "medir", de: "D", a: "C" });
  if (!ovoide) ops.push({ k: "arco", c: "D", hacia: "C", abs: [40, 140] }, { k: "marca", p: "Ta" }, { k: "marca", p: "Tb" });
  else ops.push({ k: "arco", c: "D", hacia: "C", abs: [40, 95] }, { k: "marca", p: "Tb" });
  ops.push({ k: "medir", de: "C", a: "D" });
  if (!ovoide) ops.push({ k: "arco", c: "C", hacia: "D", abs: [-140, -40] }, { k: "marca", p: "Tc" }, { k: "marca", p: "Td" });
  else ops.push({ k: "arco", c: "C", hacia: "D", abs: [-95, -40] }, { k: "marca", p: "Td" });
  // arcos pequeños de los extremos
  if (!ovoide) ops.push({ k: "medir", de: "E", a: "Ta" }, { k: "arco", c: "E", hacia: "Ta", abs: [130, 230] });
  ops.push({ k: "medir", de: "F", a: "Tb" }, { k: "arco", c: "F", hacia: "Tb", abs: [-50, 50] });
  // resultado en trazo grueso
  if (!ovoide) {
    ops.push({ k: "solucion", c: "D", hacia: "Ta", hasta: "Tb", por: "C" }, { k: "solucion", c: "C", hacia: "Tc", hasta: "Td", por: "D" }, { k: "solucion", c: "E", hacia: "Ta", hasta: "Tc", por: "_pl" }, { k: "solucion", c: "F", hacia: "Tb", hasta: "Td", por: "_pr" });
  } else {
    ops.push({ k: "solucion", c: "D", hacia: "C", hasta: "Tb" }, { k: "solucion", c: "C", hacia: "D", hasta: "Td" }, { k: "solucion", c: "F", hacia: "Tb", hasta: "Td", por: "_pr" }, { k: "solucion", c: "O", hacia: "C", hasta: "D", por: "Al" });
  }
  return {
    titulo: ovoide ? "Ovoide dado el eje menor" : "Óvalo dado el eje menor",
    intro: ovoide
      ? "Con el eje menor $CD$ como diámetro se traza la circunferencia y el diámetro perpendicular. Los centros de los arcos del ovoide son $C$, $D$, el centro $O$ de la circunferencia y el punto $F$ donde el diámetro perpendicular la corta."
      : "Con el eje menor $CD$ como diámetro se traza la circunferencia y dos diámetros perpendiculares. Los extremos $C$, $D$, $E$ y $F$ de los diámetros son los centros de los cuatro arcos del óvalo.",
    pts,
    dados: ovoide ? ["O", "C", "D"] : ["O", "C", "D"],
    datos: [],
    circulos: [{ c: "O", r }],
    ext: 60,
    ops,
  };
}

/** §4 (Fig. 4): óvalo de cuatro centros conocidos los ejes AB y CD (primer procedimiento). */
function ovaloCuatroCentros(): Construccion {
  const O: P = [300, 208];
  const a = 190;
  const b = 120;
  const dd = 85;
  const A: P = [O[0] - a, O[1]];
  const B: P = [O[0] + a, O[1]];
  const C: P = [O[0], O[1] - b];
  const D: P = [O[0], O[1] + b];
  const E: P = [O[0], O[1] - (b - dd)];
  const F: P = [O[0] + (a - dd), O[1]];
  const h = ((a - dd) ** 2 - (b - dd) ** 2) / (2 * (b - dd));
  const H: P = [O[0], O[1] + h];
  const G: P = [O[0] - (a - dd), O[1]];
  const I: P = [O[0], O[1] - h];
  const ds = dato("d", dd, 60, "ambar");
  const lejos = (c: P, o: P): P => suma(o, por(unit(resta(o, c)), dd));
  const Ta = lejos(H, G);
  const Tb = lejos(H, F);
  const Tc = lejos(I, G);
  const Td = lejos(I, F);
  return {
    titulo: "Óvalo de cuatro centros dados los ejes",
    intro: "Se tienen los ejes $AB$ y $CD$, perpendiculares y que se cortan en su punto medio $O$. Se toman en $OB$ y en $OC$ dos segmentos iguales $BF = CE$; la mediatriz de $EF$ corta en $H$ a la prolongación del eje menor, y los simétricos $G$ e $I$ de $F$ y $H$ respecto de $O$ completan los centros.",
    pts: { O, A, B, C, D, ...ds.pts, E, F, G, H, I, Ta, Tb, Tc, Td, m1: cortes(E, dist(E, F), F, dist(E, F))[0], m2: cortes(E, dist(E, F), F, dist(E, F))[1], Mm: medio(E, F) },
    dados: ["O", "A", "B", "C", "D"],
    datos: [ds.d],
    base: [["A", "B"], ["C", "D"]],
    ext: 90,
    radioMax: 280,
    ops: [
      { k: "medir", de: "d1", a: "d2" },
      { k: "arco", c: "B", hacia: "F" },
      { k: "marca", p: "F" },
      { k: "medir", de: "d1", a: "d2" },
      { k: "arco", c: "C", hacia: "E" },
      { k: "marca", p: "E" },
      { k: "recta", a: "E", b: "F" },
      ...mediatriz("E", "F", "m1", "m2", "Mm"),
      { k: "marca", p: "H" },
      { k: "medir", de: "O", a: "F" },
      { k: "arco", c: "O", hacia: "G" },
      { k: "marca", p: "G" },
      { k: "medir", de: "O", a: "H" },
      { k: "arco", c: "O", hacia: "I" },
      { k: "marca", p: "I" },
      { k: "recta", a: "H", b: "F" },
      { k: "recta", a: "H", b: "G" },
      { k: "recta", a: "I", b: "F" },
      { k: "recta", a: "I", b: "G" },
      { k: "medir", de: "H", a: "C" },
      { k: "arco", c: "H", hacia: "C", abs: [48, 132] },
      { k: "marca", p: "Ta" },
      { k: "marca", p: "Tb" },
      { k: "medir", de: "I", a: "D" },
      { k: "arco", c: "I", hacia: "D", abs: [-132, -48] },
      { k: "marca", p: "Tc" },
      { k: "marca", p: "Td" },
      { k: "medir", de: "G", a: "A" },
      { k: "arco", c: "G", hacia: "A", abs: [123, 237] },
      { k: "medir", de: "F", a: "B" },
      { k: "arco", c: "F", hacia: "B", abs: [-57, 57] },
      { k: "solucion", c: "H", hacia: "Ta", hasta: "Tb", por: "C" },
      { k: "solucion", c: "I", hacia: "Tc", hasta: "Td", por: "D" },
      { k: "solucion", c: "G", hacia: "Ta", hasta: "Tc", por: "A" },
      { k: "solucion", c: "F", hacia: "Tb", hasta: "Td", por: "B" },
    ],
  };
}

/** §6 (Fig. 6): ovoide dado el eje mayor AB (dividido en seis partes iguales). */
function ovoideEjeMayor(): Construccion {
  const u = 45;
  const B: P = [300, 50];
  const A: P = [300, 50 + 6 * u];
  const d = (k: number): P => [300, 50 + k * u];
  const O2: P = [300 - 4 * u, d(2)[1]];
  const O3: P = [300 + 4 * u, d(2)[1]];
  const Ta: P = [300 - 2 * u, d(2)[1]];
  const Tb: P = [300 + 2 * u, d(2)[1]];
  const Tc = suma(d(5), por(unit(resta(d(5), O2)), u));
  const Td = suma(d(5), por(unit(resta(d(5), O3)), u));
  return {
    titulo: "Ovoide dado el eje mayor",
    intro: "Se divide el eje mayor $AB$ en seis partes iguales y sobre la perpendicular a $AB$ por la división $2$ se toman cuatro partes en los dos sentidos. Los centros de los arcos son la división $2$, la división $5$ y esos dos puntos $O_2$ y $O_3$.",
    pts: { A, B, d1: d(1), d2: d(2), d3: d(3), d4: d(4), d5: d(5), O2, O3, Ta, Tb, Tc, Td, _a: [60, d(2)[1]], _b: [540, d(2)[1]] },
    dados: ["A", "B", "d1", "d2", "d3", "d4", "d5"],
    datos: [],
    base: [["A", "B"]],
    ext: 50,
    radioMax: 290,
    ops: [
      { k: "perp", recta: ["A", "B"], punto: "d2", traza: ["_a", "_b"] },
      { k: "medir", de: "d2", a: "A" },
      { k: "arco", c: "d2", hacia: "O2" },
      { k: "arco", c: "d2", hacia: "O3" },
      { k: "marca", p: "O2" },
      { k: "marca", p: "O3" },
      { k: "recta", a: "O2", b: "d5" },
      { k: "recta", a: "O3", b: "d5" },
      { k: "medir", de: "d2", a: "B" },
      { k: "arco", c: "d2", hacia: "B", abs: [-5, 185] },
      { k: "marca", p: "Ta" },
      { k: "marca", p: "Tb" },
      { k: "medir", de: "O2", a: "Tb" },
      { k: "arco", c: "O2", hacia: "Tb", abs: [-40, 4] },
      { k: "marca", p: "Tc" },
      { k: "medir", de: "O3", a: "Ta" },
      { k: "arco", c: "O3", hacia: "Ta", abs: [176, 220] },
      { k: "marca", p: "Td" },
      { k: "medir", de: "d5", a: "A" },
      { k: "arco", c: "d5", hacia: "A", abs: [-150, -30] },
      { k: "solucion", c: "d2", hacia: "Ta", hasta: "Tb", por: "B" },
      { k: "solucion", c: "O2", hacia: "Tb", hasta: "Tc" },
      { k: "solucion", c: "O3", hacia: "Ta", hasta: "Td" },
      { k: "solucion", c: "d5", hacia: "Tc", hasta: "Td", por: "A" },
    ],
  };
}

/** §8 y §9 (Fig. 8): voluta de seis arcos cuyos centros son los vértices de un cuadrado. */
function voluta(): Construccion {
  const s = 28;
  const r1 = 14;
  const c1: P = [330, 200];
  const v: Record<string, P> = { v1: c1, v2: [c1[0], c1[1] + s], v3: [c1[0] - s, c1[1] + s], v4: [c1[0] - s, c1[1]] };
  const A: P = [c1[0] - r1, c1[1]];
  const B: P = [c1[0], c1[1] - r1];
  const C: P = [v.v2[0] + (s + r1), v.v2[1]];
  const D: P = [v.v3[0], v.v3[1] + (2 * s + r1)];
  const E: P = [v.v4[0] - (3 * s + r1), v.v4[1]];
  const F: P = [c1[0], c1[1] - (4 * s + r1)];
  const G: P = [v.v2[0] + (5 * s + r1), v.v2[1]];
  return {
    titulo: "Voluta",
    intro: "La voluta es una curva formada por arcos de circunferencia tangentes cuyos centros sucesivos son los vértices de un polígono, aquí el cuadrado $1\\text{-}2\\text{-}3\\text{-}4$. Con centro en $1$ y radio $1A$ se traza el arco $AB$, con $B$ en la prolongación de $2\\text{-}1$; con centro en $2$ y radio $2B$, el arco $BC$, y así sucesivamente.",
    pts: { ...v, A, B, C, D, E, F, G },
    dados: ["v1", "v2", "v3", "v4", "A"],
    datos: [],
    base: [["v1", "v2"], ["v2", "v3"], ["v3", "v4"], ["v4", "v1"]],
    ext: 125,
    radioMin: 10,
    ops: [
      { k: "recta", a: "v2", b: "v1" },
      { k: "medir", de: "v1", a: "A" },
      { k: "arco", c: "v1", hacia: "B", abs: [85, 185] },
      { k: "marca", p: "B" },
      { k: "recta", a: "v3", b: "v2" },
      { k: "medir", de: "v2", a: "B" },
      { k: "arco", c: "v2", hacia: "C", abs: [-5, 95] },
      { k: "marca", p: "C" },
      { k: "recta", a: "v4", b: "v3" },
      { k: "medir", de: "v3", a: "C" },
      { k: "arco", c: "v3", hacia: "D", abs: [-95, 5] },
      { k: "marca", p: "D" },
      { k: "recta", a: "v1", b: "v4" },
      { k: "medir", de: "v4", a: "D" },
      { k: "arco", c: "v4", hacia: "E", abs: [-185, -85] },
      { k: "marca", p: "E" },
      { k: "medir", de: "v1", a: "E" },
      { k: "arco", c: "v1", hacia: "F", abs: [85, 185] },
      { k: "marca", p: "F" },
      { k: "medir", de: "v2", a: "F" },
      { k: "arco", c: "v2", hacia: "G", abs: [-5, 95] },
      { k: "marca", p: "G" },
      { k: "solucion", c: "v1", hacia: "A", hasta: "B" },
      { k: "solucion", c: "v2", hacia: "B", hasta: "C" },
      { k: "solucion", c: "v3", hacia: "C", hasta: "D" },
      { k: "solucion", c: "v4", hacia: "D", hasta: "E" },
      { k: "solucion", c: "v1", hacia: "E", hasta: "F" },
      { k: "solucion", c: "v2", hacia: "F", hasta: "G" },
    ],
  };
}

/** §10 (Fig. 9): espiral de Arquímedes con ocho divisiones. */
function espiralArquimedes(): Construccion {
  const O: P = [250, 200];
  const p = 160;
  const n = 8;
  const pts: Record<string, P> = { O, P: [O[0] + p, O[1]] };
  const base: [string, string][] = [];
  const ops: Op[] = [];
  const lista = ["O"];
  for (let k = 1; k < n; k += 1) {
    pts[`q${k}`] = [O[0] + (p * k) / n, O[1]];
    pts[`s${k}`] = polar(O, (p * k) / n, (360 * k) / n);
    pts[`_g${k}`] = polar(O, p, (360 * k) / n);
    base.push(["O", `_g${k}`]);
    ops.push({ k: "medir", de: "O", a: `q${k}` }, { k: "arco", c: "O", hacia: `s${k}` }, { k: "marca", p: `s${k}` });
    lista.push(`s${k}`);
  }
  lista.push("P");
  ops.push({ k: "curvaPuntos", pts: lista });
  return {
    titulo: "Espiral de Arquímedes",
    intro: "Se tiene el paso de la espiral $OP$. Con centro en $O$ y radio $OP$ se traza la circunferencia, dividida en ocho partes iguales; el paso se divide en el mismo número de partes. Los puntos de la espiral están donde se cortan las circunferencias concéntricas con los radios que pasan por las mismas divisiones.",
    pts,
    dados: ["O", "P", "q1", "q2", "q3", "q4", "q5", "q6", "q7"],
    datos: [],
    circulos: [{ c: "O", r: p }],
    base: [["O", "P"], ...base],
    radioMin: 10,
    ops,
  };
}

/** §11 (Fig. 12): hélice cilíndrica en proyecciones (ocho divisiones de la base y del paso). */
function helice(): Construccion {
  const R = 60;
  const d = 20;
  const cx = 300;
  const base = 210;
  const Op: P = [cx, 300];
  const pts: Record<string, P> = { _b1: [150, base], _b2: [450, base], _m0: [200, base], _m9: [200, base - 8 * d], O: Op };
  const ops: Op[] = [];
  const lista: string[] = ["g1"];
  const ang = (j: number) => 180 - 45 * (j - 1);
  for (let j = 1; j <= 8; j += 1) pts[`h${j}`] = polar(Op, R, ang(j));
  pts.g1 = [cx + R * Math.cos(rad(ang(1))), base];
  pts.g9 = [cx + R * Math.cos(rad(ang(1))), base - 8 * d];
  for (let j = 2; j <= 8; j += 1) {
    const x = cx + R * Math.cos(rad(ang(j)));
    const y = base - (j - 1) * d;
    pts[`m${j}`] = [200, y];
    pts[`g${j}`] = [x, y];
    pts[`_u${j}`] = [x, y - 14];
    pts[`_c${j}`] = [430, y];
    ops.push({ k: "perp", recta: ["_b1", "_b2"], punto: `h${j}`, traza: [`h${j}`, `_u${j}`] }, { k: "paralelas", recta: ["_b1", "_b2"], marcas: [`m${j}`], cortes: [`_c${j}`] }, { k: "marca", p: `g${j}` });
    lista.push(`g${j}`);
  }
  lista.push("g9");
  ops.push({ k: "curvaPuntos", pts: lista });
  return {
    titulo: "Hélice cilíndrica en proyecciones",
    intro: "La hélice es la curva que describe un punto que gira alrededor del eje de un cilindro mientras asciende con movimiento uniforme. Se dividen la base y el **paso** $p = 8d$ en el mismo número de partes iguales (ocho); la proyección vertical de cada punto está donde se cortan la vertical por la división de la base y la horizontal por la división del paso.",
    pts,
    dados: ["g1", "g9", "h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "m2", "m3", "m4", "m5", "m6", "m7", "m8"],
    datos: [],
    circulos: [{ c: "O", r: R }],
    base: [["_b1", "_b2"], ["_m0", "_m9"]],
    ext: 4,
    ops,
  };
}

export const CONSTRUCCIONES_CURVAS = {
  "ovalo-eje-mayor": ovaloEjeMayor(),
  "ovalo-eje-menor": ovaloEjeMenor(false),
  "ovalo-cuatro-centros": ovaloCuatroCentros(),
  "ovoide-eje-mayor": ovoideEjeMayor(),
  "ovoide-eje-menor": ovaloEjeMenor(true),
  voluta: voluta(),
  "espiral-arquimedes": espiralArquimedes(),
  helice: helice(),
} satisfies Record<string, Construccion>;
