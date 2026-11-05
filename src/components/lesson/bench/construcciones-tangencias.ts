import type { Construccion, Dato, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 8 (tangencias, enlaces, curva parabólica y rectificaciones), descritas como datos igual que las
 * demás: una animación paso a paso y una práctica con instrumentos salen de la misma lista de operaciones.
 * Las medidas de los radios dados se toman de segmentos dato (`R`, `R + r`…); la abertura del compás va de 40 a 215.
 */

const rad = (d: number) => (d * Math.PI) / 180;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const medio = (a: P, b: P): P => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
/** Punto a distancia `r` de `o` en la dirección `d` (grados, eje Y hacia arriba). */
const polar = (o: P, r: number, d: number): P => [o[0] + r * Math.cos(rad(d)), o[1] - r * Math.sin(rad(d))];
const suma = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const resta = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const por = (a: P, k: number): P => [a[0] * k, a[1] * k];
const unit = (a: P): P => por(a, 1 / Math.hypot(a[0], a[1]));
const dot = (a: P, b: P) => a[0] * b[0] + a[1] * b[1];

/** Los dos cortes de dos circunferencias. */
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
const izquierda = (par: [P, P]): P => (par[0][0] < par[1][0] ? par[0] : par[1]);
const derecha = (par: [P, P]): P => (par[0][0] > par[1][0] ? par[0] : par[1]);

/** Corte de las rectas `p1p2` y `p3p4`. */
function corteRectas(p1: P, p2: P, p3: P, p4: P): P {
  const d = (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p2[1] - p1[1]) * (p4[0] - p3[0]);
  const t = ((p3[0] - p1[0]) * (p4[1] - p3[1]) - (p3[1] - p1[1]) * (p4[0] - p3[0])) / d;
  return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
}
/** Simétrico de `q` respecto de la recta `a`–`b`. */
function reflejo(q: P, a: P, b: P): P {
  const u = unit(resta(b, a));
  const v = resta(q, a);
  const p = por(u, dot(v, u));
  return resta(por(suma(a, p), 2), q);
}
/** Pie de la perpendicular desde `q` a la recta `a`–`b`. */
function pie(q: P, a: P, b: P): P {
  const u = unit(resta(b, a));
  return suma(a, por(u, dot(resta(q, a), u)));
}

const marcaArco = (c: string, hacia: string): Op[] => [{ k: "arco", c, hacia }, { k: "marca", p: hacia }];
const perp = (recta: [string, string], punto: string, traza: [string, string]): Op => ({ k: "perp", recta, punto, traza });

/** Segmento dato horizontal en la esquina de la hoja: sus extremos son `${id}1` y `${id}2`. */
function dato(id: string, largo: number, y: number, color?: "azul" | "ambar") {
  const pts: Record<string, P> = { [`${id}1`]: [24, y], [`${id}2`]: [24 + largo, y] };
  const d: Dato = { a: `${id}1`, b: `${id}2`, nombre: id, color };
  return { pts, d };
}

/** Mediatriz de `a`–`b` con arcos del mismo radio que el segmento (la distancia debe ser menor de unos 190). */
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
/** Puntos `m1` y `m2` (cortes de los arcos) y punto medio de una mediatriz. */
function puntosMediatriz(a: P, b: P): Record<string, P> {
  const d = dist(a, b);
  const par = cortes(a, d, b, d);
  return { m1: par[0], m2: par[1], M: medio(a, b) };
}

/** Rótulos de los puntos de este tema (los auxiliares no llevan rótulo). */
export const ETIQUETAS_TANGENCIAS: Record<string, string> = {
  Dt: "D", Bt: "B", Ta: "T₁", Tb: "T₂", Tc: "T₃", Tp: "T'", Tq: "T", Ax: "A", Ay: "", Xr: "", Xa: "", Xb: "", Xf: "", Xk: "", Ya: "", Yb: "", Y: "", Z: "",
  O1: "O₁", O2: "O₂", Mm: "M", Oc: "O", Ob: "O",
  c0: "A", c1: "", c2: "", c3: "", c4: "B", x0: "A'", x1: "", x2: "", x3: "", x4: "B'", xo: "A'",
  d1: "1", d2: "2", d3: "3", d4: "4", e1: "1'", e2: "2'", e3: "3'", e4: "4'", k1: "1", k2: "2", k3: "3", k4: "4", k5: "5", k6: "6",
};

/* ───────────── 1. Rectas tangentes a una circunferencia ───────────── */

/** §4 (Fig. 14): tangente en un punto T de la circunferencia. */
function tangentePunto(): Construccion {
  const O: P = [220, 200];
  const T = polar(O, 100, 35);
  const t = unit([Math.sin(rad(35)), Math.cos(rad(35))]);
  return {
    titulo: "Tangente a una circunferencia en un punto",
    intro: "Se tiene una circunferencia de centro $O$ y un punto $T$ de ella. La recta **tangente** en $T$ es **perpendicular al radio** $OT$.",
    pts: { O, T, _a: resta(T, por(t, 140)), _b: suma(T, por(t, 140)) },
    dados: ["O", "T"],
    datos: [],
    circulos: [{ c: "O", r: 100 }],
    ops: [
      { k: "recta", a: "O", b: "T" },
      perp(["O", "T"], "T", ["_a", "_b"]),
      { k: "lados", pts: ["_a", "_b"] },
    ],
  };
}

/** §5 (Fig. 15): tangentes paralelas a una dirección dada. */
function tangentesParalelas(): Construccion {
  const O: P = [230, 200];
  const d = unit([Math.cos(rad(30)), -Math.sin(rad(30))]);
  const n: P = [Math.sin(rad(30)), Math.cos(rad(30))];
  const Q: P = [330, 350];
  const Ta = suma(O, por(n, 90));
  const Tb = resta(O, por(n, 90));
  return {
    titulo: "Tangentes a una circunferencia paralelas a una dirección",
    intro: "Se quieren las rectas tangentes a la circunferencia de centro $O$ que sean paralelas a la dirección $r$. Los puntos de tangencia están en la **perpendicular a $r$ por $O$**.",
    pts: {
      O, _r1: Q, r: suma(Q, por(d, 220)), _n1: resta(O, por(n, 140)), _n2: suma(O, por(n, 140)), Ta, Tb,
      _s1: resta(Ta, por(d, 150)), _c1: suma(Ta, por(d, 150)), _s2: resta(Tb, por(d, 150)), _c2: suma(Tb, por(d, 150)),
    },
    dados: ["O", "r"],
    datos: [],
    circulos: [{ c: "O", r: 90 }],
    base: [["_r1", "r"]],
    ops: [
      perp(["_r1", "r"], "O", ["_n1", "_n2"]),
      { k: "marca", p: "Ta" },
      { k: "marca", p: "Tb" },
      { k: "paralelas", recta: ["_r1", "r"], marcas: ["Ta", "Tb"], cortes: ["_c1", "_c2"] },
      { k: "lados", pts: ["_s1", "_c1"] },
      { k: "lados", pts: ["_s2", "_c2"] },
    ],
  };
}

/** §6 (Fig. 16): tangente en un punto T de un arco cuyo centro no se conoce. */
function tangenteSinCentro(): Construccion {
  const Oc: P = [350, 170];
  const R = 130;
  const T = polar(Oc, R, -120);
  const B = polar(Oc, R, -90);
  const C = polar(Oc, R, -60);
  const A = reflejo(C, T, B);
  return {
    titulo: "Tangente a un arco en un punto sin conocer su centro",
    intro: "Se tiene un arco y un punto $T$ de él, pero no su centro. Se toman dos arcos iguales $TB$ y $BC$; con centro en $T$ y radio $TC$ y con centro en $B$ y radio $BC$ se trazan dos arcos que se cortan en $A$: $AT$ es la **tangente**.",
    pts: { _O: Oc, T, B, C, A: A },
    dados: ["T", "B", "C"],
    datos: [],
    circulos: [{ c: "_O", r: R }],
    ops: [
      { k: "medir", de: "T", a: "C" },
      { k: "arco", c: "T", hacia: "A" },
      { k: "medir", de: "B", a: "C" },
      { k: "arco", c: "B", hacia: "A" },
      { k: "marca", p: "A" },
      { k: "lados", pts: ["T", "A"] },
    ],
  };
}

/** §7 (Fig. 17): tangentes desde un punto exterior. */
function tangentesPuntoExterior(): Construccion {
  const O: P = [170, 200];
  const P1: P = [350, 200];
  const r = 60;
  const M = medio(O, P1);
  const par = cortes(O, r, M, dist(M, O));
  return {
    titulo: "Tangentes a una circunferencia desde un punto exterior",
    intro: "Desde el punto exterior $P$ se quieren las tangentes a la circunferencia de centro $O$. Los puntos de tangencia están sobre la circunferencia de **diámetro $OP$**.",
    pts: { O, P: P1, ...puntosMediatriz(O, P1), Ta: par[0], Tb: par[1] },
    dados: ["O", "P"],
    datos: [],
    circulos: [{ c: "O", r }],
    ops: [
      ...mediatriz("O", "P", "m1", "m2", "M"),
      { k: "medir", de: "M", a: "O" },
      { k: "circulo", c: "M", hacia: "O" },
      { k: "marca", p: "Ta" },
      { k: "marca", p: "Tb" },
      { k: "recta", a: "P", b: "Ta" },
      { k: "recta", a: "P", b: "Tb" },
      { k: "lados", pts: ["P", "Ta"] },
      { k: "lados", pts: ["P", "Tb"] },
    ],
  };
}

/** §8 (Fig. 18): una de las tangentes comunes exteriores a dos circunferencias. */
function comunExterior(): Construccion {
  const O: P = [150, 200];
  const O1: P = [310, 185];
  const r = 40;
  const R = 80;
  const s = R - r;
  const ds = dato("s", s, 60, "ambar");
  const pm = puntosMediatriz(O, O1);
  const Ax = arriba(cortes(O1, s, pm.M, dist(pm.M, O)));
  const Tp = suma(O1, por(resta(Ax, O1), R / s));
  const Tq = suma(O, por(resta(Tp, O1), r / R));
  return {
    titulo: "Tangente común exterior a dos circunferencias",
    intro: "Las circunferencias tienen radios $r$ y $R$. Con centro en $O_1$ se traza la auxiliar de radio $R - r$ y desde $O$ se traza la tangente a ella; la tangente común es **paralela** a esa recta y pasa por el punto donde el radio $O_1A$ corta a la circunferencia grande.",
    pts: { O, O1, ...ds.pts, ...pm, Ax, Tp, Tq },
    dados: ["O", "O1"],
    datos: [ds.d],
    circulos: [{ c: "O", r }, { c: "O1", r: R }],
    ext: 40,
    ops: [
      { k: "recta", a: "O", b: "O1" },
      ...mediatriz("O", "O1", "m1", "m2", "M"),
      { k: "medir", de: "s1", a: "s2" },
      { k: "circulo", c: "O1", hacia: "Ax" },
      { k: "medir", de: "M", a: "O" },
      { k: "circulo", c: "M", hacia: "O" },
      { k: "marca", p: "Ax" },
      { k: "recta", a: "O", b: "Ax" },
      { k: "recta", a: "O1", b: "Ax" },
      { k: "marca", p: "Tp" },
      { k: "paralelas", recta: ["O", "Ax"], marcas: ["Tp"], cortes: ["Tq"] },
      { k: "lados", pts: ["Tq", "Tp"] },
    ],
  };
}

/** §9 (Fig. 19): una de las tangentes comunes interiores a dos circunferencias. */
function comunInterior(): Construccion {
  const O: P = [150, 210];
  const O1: P = [330, 200];
  const R = 60;
  const r = 40;
  const s = R + r;
  const ds = dato("s", s, 60, "ambar");
  const pm = puntosMediatriz(O, O1);
  const Ax = arriba(cortes(O, s, pm.M, dist(pm.M, O1)));
  const u = resta(Ax, O);
  return {
    titulo: "Tangente común interior a dos circunferencias",
    intro: "Con centro en $O$ se traza la circunferencia auxiliar de radio $R + r$ y desde $O_1$ se traza la tangente a ella. Los radios $OA$ dan los puntos de tangencia y las soluciones son **paralelas** a $O_1A$.",
    pts: { O, O1, ...ds.pts, ...pm, Ax, Ta: suma(O, por(u, R / s)), Tb: resta(O1, por(u, r / s)) },
    dados: ["O", "O1"],
    datos: [ds.d],
    circulos: [{ c: "O", r: R }, { c: "O1", r }],
    ops: [
      { k: "recta", a: "O", b: "O1" },
      ...mediatriz("O", "O1", "m1", "m2", "M"),
      { k: "medir", de: "s1", a: "s2" },
      { k: "circulo", c: "O", hacia: "Ax" },
      { k: "medir", de: "M", a: "O1" },
      { k: "circulo", c: "M", hacia: "O1" },
      { k: "marca", p: "Ax" },
      { k: "recta", a: "O", b: "Ax" },
      { k: "marca", p: "Ta" },
      { k: "paralelas", recta: ["O1", "Ax"], marcas: ["Ta"], cortes: ["Tb"] },
      { k: "lados", pts: ["Ta", "Tb"] },
    ],
  };
}

/* ───────────── 2. Circunferencias tangentes ───────────── */

/** §10 (Fig. 20): tangentes a una recta en un punto T, de radio R. */
function circRectaPuntoRadio(): Construccion {
  const T: P = [300, 250];
  const R = 50;
  const dr = dato("R", R, 70, "ambar");
  return {
    titulo: "Circunferencias tangentes a una recta en un punto, dado el radio",
    intro: "Se tiene la recta $r$, el punto $T$ de ella y el radio $R$. Los centros de las soluciones están en la **perpendicular a $r$ por $T$**, a distancia $R$ de $T$ en los dos sentidos.",
    pts: { _r1: [40, 250], r: [580, 250], T, ...dr.pts, _a: [300, 110], _b: [300, 360], O1: [300, 250 - R], O2: [300, 250 + R] },
    dados: ["r", "T"],
    datos: [dr.d],
    base: [["_r1", "r"]],
    ops: [
      perp(["_r1", "r"], "T", ["_a", "_b"]),
      { k: "medir", de: "R1", a: "R2" },
      { k: "arco", c: "T", hacia: "O1" },
      { k: "arco", c: "T", hacia: "O2" },
      { k: "marca", p: "O1" },
      { k: "marca", p: "O2" },
      { k: "solucion", c: "O1", hacia: "T" },
      { k: "solucion", c: "O2", hacia: "T" },
    ],
  };
}

/** §11 (Fig. 21): tangente a una recta en T que pasa por un punto P. */
function circRectaPuntoPasa(): Construccion {
  const T: P = [250, 300];
  const P1: P = [380, 170];
  const pm = puntosMediatriz(T, P1);
  const mdir = unit([P1[1] - T[1], -(P1[0] - T[0])]);
  const O = corteRectas(pm.M, suma(pm.M, mdir), T, [T[0], T[1] - 100]);
  return {
    titulo: "Circunferencia tangente a una recta en un punto y que pasa por otro punto",
    intro: "La circunferencia es tangente a $r$ en $T$ y pasa por $P$. Su centro $O$ está en la **perpendicular a $r$ por $T$** y en la **mediatriz** del segmento $TP$.",
    pts: { _r1: [40, 300], r: [580, 300], T, P: P1, _a: [250, 80], _b: [250, 330], ...pm, O },
    dados: ["r", "T", "P"],
    datos: [],
    base: [["_r1", "r"]],
    ops: [
      perp(["_r1", "r"], "T", ["_a", "_b"]),
      ...mediatriz("T", "P", "m1", "m2", "M"),
      { k: "marca", p: "O" },
      { k: "solucion", c: "O", hacia: "T" },
    ],
  };
}

/** §12 (Fig. 22): tangentes a una recta, que pasan por un punto y tienen radio dado. */
function circRectaPorPuntoRadio(): Construccion {
  const A: P = [120, 310];
  const P1: P = [320, 190];
  const R = 70;
  const dr = dato("R", R, 70, "ambar");
  const dx = Math.sqrt(R * R - 50 * 50);
  return {
    titulo: "Circunferencias tangentes a una recta que pasan por un punto, dado el radio",
    intro: "Los centros de las soluciones están a distancia $R$ de la recta $r$ y a distancia $R$ de $P$: se traza la **paralela a $r$ a distancia $R$** y la circunferencia de centro $P$ y radio $R$.",
    pts: { _r1: [40, 310], r: [580, 310], A, P: P1, ...dr.pts, _a: [120, 150], _b: [120, 335], Y: [120, 310 - R], _y: [520, 310 - R], O1: [320 - dx, 310 - R], O2: [320 + dx, 310 - R] },
    dados: ["r", "A", "P"],
    datos: [dr.d],
    base: [["_r1", "r"]],
    ops: [
      perp(["_r1", "r"], "A", ["_a", "_b"]),
      { k: "medir", de: "R1", a: "R2" },
      { k: "arco", c: "A", hacia: "Y" },
      { k: "marca", p: "Y" },
      { k: "paralelas", recta: ["_r1", "r"], marcas: ["Y"], cortes: ["_y"] },
      { k: "medir", de: "R1", a: "R2" },
      { k: "circulo", c: "P", hacia: "O1" },
      { k: "marca", p: "O1" },
      { k: "marca", p: "O2" },
      { k: "solucion", c: "O1", hacia: "P" },
      { k: "solucion", c: "O2", hacia: "P" },
    ],
  };
}

/** Circunferencia (o arco de enlace) tangente a dos rectas que se cortan, dado el radio R (§13, Fig. 23 / Fig. 33). */
function dosRectasRadio(arco: boolean): Construccion {
  const V: P = [240, 300];
  const R = 50;
  const dr = dato("R", R, 70, "ambar");
  const dirR = unit([Math.cos(rad(55)), -Math.sin(rad(55))]);
  const n: P = [0.8192, 0.5736];
  const A: P = [480, 300];
  const B = suma(V, por(dirR, 170));
  const Y: P = [480, 300 - R];
  const Z = suma(B, por(n, R));
  const O1 = corteRectas(Y, [Y[0] + 100, Y[1]], Z, suma(Z, dirR));
  const T = [O1[0], 300] as P;
  const T1 = resta(O1, por(n, R));
  const ops: Op[] = [
    perp(["_s1", "s"], "A", ["_p1", "_p2"]),
    { k: "medir", de: "R1", a: "R2" },
    { k: "arco", c: "A", hacia: "Y" },
    { k: "marca", p: "Y" },
    { k: "paralelas", recta: ["_s1", "s"], marcas: ["Y"], cortes: ["_ys"] },
    perp(["_r1", "r"], "B", ["_q1", "_q2"]),
    { k: "medir", de: "R1", a: "R2" },
    { k: "arco", c: "B", hacia: "Z" },
    { k: "marca", p: "Z" },
    { k: "paralelas", recta: ["_r1", "r"], marcas: ["Z"], cortes: ["_zr"] },
    { k: "marca", p: "O1" },
  ];
  if (arco) ops.push(perp(["_s1", "s"], "O1", ["O1", "_f"]), { k: "marca", p: "Ta" }, perp(["_r1", "r"], "O1", ["O1", "_g"]), { k: "marca", p: "Tb" }, { k: "solucion", c: "O1", hacia: "Ta", hasta: "Tb" });
  else ops.push({ k: "solucion", c: "O1", hacia: "_f" });
  return {
    titulo: arco ? "Enlace de dos rectas con un arco de radio dado" : "Circunferencia tangente a dos rectas que se cortan, dado el radio",
    intro: arco
      ? "Se quiere enlazar las rectas $r$ y $s$ con un arco de radio $R$. El centro $O_1$ está donde se cortan las **paralelas a $r$ y a $s$ trazadas a distancia $R$**, y los puntos de tangencia son los pies de las perpendiculares desde $O_1$. Los puntos $A$ de $s$ y $B$ de $r$ son **arbitrarios**: solo sirven para llevar la distancia $R$ sobre una perpendicular; vale cualquier otro punto de cada recta, porque la paralela a distancia $R$ sale igual."
      : "Los centros de las circunferencias de radio $R$ tangentes a $r$ y a $s$ están donde se cortan las **paralelas a ambas a distancia $R$**. Aquí se halla la que queda en el ángulo señalado. Los puntos $A$ de $s$ y $B$ de $r$ son **arbitrarios**: solo sirven para llevar la distancia $R$ sobre una perpendicular; vale cualquier otro punto de cada recta, porque la paralela a distancia $R$ sale igual.",
    pts: {
      _s1: [40, 300], s: [580, 300], _r1: suma(V, por(dirR, -60)), r: suma(V, por(dirR, 260)), A, B, ...dr.pts,
      _p1: [480, 220], _p2: [480, 320], Y, _ys: [300, 300 - R], _q1: resta(B, por(n, 10)), _q2: suma(B, por(n, 70)), Z, _zr: resta(Z, por(dirR, 100)),
      O1, _f: T, _g: T1, Ta: T, Tb: T1,
    },
    dados: ["s", "r", "A", "B"],
    datos: [dr.d],
    base: [["_s1", "s"], ["_r1", "r"]],
    ops,
  };
}

/** Circunferencia (o arco de enlace) tangente a dos rectas, dado el punto de tangencia T en una de ellas (§14, Fig. 24 / Fig. 34). */
function dosRectasPunto(arco: boolean): Construccion {
  const V: P = [520, 260];
  const T: P = [300, 260];
  const rho = dist(V, T);
  const dirR = unit([Math.cos(rad(130)), -Math.sin(rad(130))]);
  const Xr = suma(V, por(dirR, rho));
  const dXY = dist(T, Xr);
  const par = cortes(T, dXY, Xr, dXY);
  const Y = dist(par[0], V) > dist(par[1], V) ? par[0] : par[1];
  const bis = unit(resta(Y, V));
  const O = corteRectas(V, suma(V, bis), T, [T[0], T[1] - 100]);
  const T1 = pie(O, V, Xr);
  const ops: Op[] = [
    { k: "medir", de: "V", a: "T" },
    { k: "arco", c: "V", hacia: "Xr", abs: [122, 188] },
    { k: "marca", p: "Xr" },
    { k: "medir", de: "T", a: "Xr" },
    { k: "arco", c: "T", hacia: "Y" },
    { k: "arco", c: "Xr", hacia: "Y" },
    { k: "marca", p: "Y" },
    { k: "recta", a: "V", b: "Y", limpia: true },
    perp(["_s1", "s"], "T", ["_a", "_b"]),
    { k: "marca", p: "O" },
  ];
  if (arco) ops.push(perp(["V", "r"], "O", ["O", "_g"]), { k: "marca", p: "Tb" }, { k: "solucion", c: "O", hacia: "T", hasta: "Tb" });
  else ops.push({ k: "solucion", c: "O", hacia: "T" });
  return {
    titulo: arco ? "Enlace de dos rectas con un arco, dado el punto de tangencia" : "Circunferencia tangente a dos rectas, dado el punto de tangencia en una de ellas",
    intro: arco
      ? "Las rectas $r$ y $s$ se cortan en $V$ y se conoce el punto de tangencia $T$ en $s$. El centro $O$ del arco está en la **bisectriz** del ángulo y en la **perpendicular a $s$ por $T$**."
      : "El centro $O$ está en la **bisectriz** del ángulo que forman $r$ y $s$ y en la **perpendicular a $s$ por $T$**.",
    pts: { _s1: [40, 260], s: [580, 260], V, r: suma(V, por(dirR, 250)), _r1: suma(V, por(dirR, -60)), T, Xr, Y, _a: [300, 60], _b: [300, 290], O, Tb: T1, _g: resta(T1, por(unit(resta(O, T1)), 0)) },
    dados: ["s", "V", "r", "T"],
    datos: [],
    base: [["_s1", "s"], ["_r1", "r"]],
    ops,
  };
}

/** §15 (Fig. 25): circunferencia inscrita en el triángulo que forman tres rectas. */
function tresRectas(): Construccion {
  const A: P = [170, 310];
  const B: P = [430, 310];
  const C: P = [300, 170];
  const dAC = dist(A, C);
  const dBC = dist(B, C);
  const Xa: P = [A[0] + dAC, 310];
  const Xb: P = [B[0] - dBC, 310];
  const lejos = (v: P, x: P) => {
    const d = dist(x, C);
    const par = cortes(x, d, C, d);
    return dist(par[0], v) > dist(par[1], v) ? par[0] : par[1];
  };
  const Ya = lejos(A, Xa);
  const Yb = lejos(B, Xb);
  const I = corteRectas(A, Ya, B, Yb);
  const F: P = [I[0], 310];
  return {
    titulo: "Circunferencia tangente a tres rectas que se cortan",
    intro: "Las tres rectas forman un triángulo. La circunferencia **inscrita** tiene su centro $I$ en la intersección de las **bisectrices** de los ángulos, y su radio llega hasta la perpendicular a un lado.",
    pts: { A, B, C, Xa, Xb, Ya, Yb, I, F, T: F },
    dados: ["A", "B", "C"],
    datos: [],
    base: [["A", "B"], ["B", "C"], ["C", "A"]],
    ops: [
      { k: "medir", de: "A", a: "C" },
      { k: "arco", c: "A", hacia: "Xa", abs: [-8, 64] },
      { k: "marca", p: "Xa" },
      { k: "medir", de: "Xa", a: "C" },
      { k: "arco", c: "Xa", hacia: "Ya" },
      { k: "arco", c: "C", hacia: "Ya" },
      { k: "marca", p: "Ya" },
      { k: "recta", a: "A", b: "Ya", limpia: true },
      { k: "medir", de: "B", a: "C" },
      { k: "arco", c: "B", hacia: "Xb", abs: [118, 188] },
      { k: "marca", p: "Xb" },
      { k: "medir", de: "Xb", a: "C" },
      { k: "arco", c: "Xb", hacia: "Yb" },
      { k: "arco", c: "C", hacia: "Yb" },
      { k: "marca", p: "Yb" },
      { k: "recta", a: "B", b: "Yb", limpia: true },
      { k: "marca", p: "I" },
      perp(["A", "B"], "I", ["I", "F"]),
      { k: "marca", p: "T" },
      { k: "solucion", c: "I", hacia: "T" },
    ],
  };
}

/** §17 (Fig. 27): tangentes a otra circunferencia en un punto T, de radio R. */
function circOtraTR(): Construccion {
  const O: P = [240, 210];
  const T = polar(O, 70, 20);
  const R = 60;
  const dr = dato("R", R, 70, "ambar");
  const u = unit(resta(T, O));
  return {
    titulo: "Circunferencias tangentes a otra en un punto, dado el radio",
    intro: "Se tiene la circunferencia de centro $O$, el punto de tangencia $T$ y el radio $R$ de las soluciones. Los centros están en la **recta $OT$**, a distancia $R$ de $T$ a un lado y a otro.",
    pts: { O, T, ...dr.pts, O1: suma(T, por(u, R)), O2: resta(T, por(u, R)) },
    dados: ["O", "T"],
    datos: [dr.d],
    circulos: [{ c: "O", r: 70 }],
    ext: 80,
    ops: [
      { k: "recta", a: "O", b: "T" },
      { k: "medir", de: "R1", a: "R2" },
      { k: "arco", c: "T", hacia: "O1" },
      { k: "arco", c: "T", hacia: "O2" },
      { k: "marca", p: "O1" },
      { k: "marca", p: "O2" },
      { k: "solucion", c: "O1", hacia: "T" },
      { k: "solucion", c: "O2", hacia: "T" },
    ],
  };
}

/** Circunferencia (o arco de enlace) tangente a otra en T que pasa por un punto P (§18, Fig. 28 / Fig. 37). */
function circOtraTP(arco: boolean): Construccion {
  const O: P = [150, 220];
  const T: P = [210, 220];
  const P1: P = [300, 120];
  const pm = puntosMediatriz(T, P1);
  const mdir = unit([P1[1] - T[1], -(P1[0] - T[0])]);
  const O1 = corteRectas(pm.M, suma(pm.M, mdir), O, T);
  return {
    titulo: arco ? "Enlace de un arco con otro en un punto, pasando por un punto" : "Circunferencia tangente a otra en un punto y que pasa por un punto exterior",
    intro: "Se tiene la circunferencia de centro $O$, el punto de tangencia $T$ y el punto $P$ por el que debe pasar la solución. Su centro $O_1$ está en la **recta $OT$** y en la **mediatriz** de $TP$.",
    pts: { O, T, P: P1, ...pm, O1 },
    dados: ["O", "T", "P"],
    datos: [],
    circulos: [{ c: "O", r: 60 }],
    ext: 120,
    ops: [
      { k: "recta", a: "O", b: "T" },
      ...mediatriz("T", "P", "m1", "m2", "M"),
      { k: "marca", p: "O1" },
      arco ? { k: "solucion", c: "O1", hacia: "T", hasta: "P" } : { k: "solucion", c: "O1", hacia: "T" },
    ],
  };
}

/** §19 (Fig. 29): tangentes a otra circunferencia que pasan por un punto P, dado el radio. */
function circOtraPorPuntoR(): Construccion {
  const O: P = [200, 210];
  const r = 50;
  const P1: P = [300, 200];
  const R = 70;
  const sr = dato("R", R, 70, "ambar");
  const srr = dato("R+r", R + r, 96);
  const par = cortes(O, R + r, P1, R);
  return {
    titulo: "Circunferencias tangentes a otra que pasan por un punto, dado el radio",
    intro: "Los centros de las soluciones están a distancia $R + r$ de $O$ (tangentes por fuera) y a distancia $R$ de $P$: se cortan las circunferencias de centro $O$ y radio $R + r$ y de centro $P$ y radio $R$.",
    pts: { O, P: P1, ...sr.pts, ...srr.pts, O1: par[0], O2: par[1] },
    dados: ["O", "P"],
    datos: [sr.d, srr.d],
    circulos: [{ c: "O", r }],
    ops: [
      { k: "medir", de: "R+r1", a: "R+r2" },
      { k: "circulo", c: "O", hacia: "O1" },
      { k: "medir", de: "R1", a: "R2" },
      { k: "circulo", c: "P", hacia: "O1" },
      { k: "marca", p: "O1" },
      { k: "marca", p: "O2" },
      { k: "solucion", c: "O1", hacia: "P" },
      { k: "solucion", c: "O2", hacia: "P" },
    ],
  };
}

/** §20 (Fig. 30): tangentes a otra circunferencia y a una recta, dado el radio. */
function circOtraRectaR(): Construccion {
  const O: P = [300, 230];
  const r = 50;
  const R = 40;
  const A: P = [120, 330];
  const sr = dato("R", R, 70, "ambar");
  const srr = dato("R+r", R + r, 96);
  const dx = Math.sqrt((R + r) ** 2 - 60 ** 2);
  const O1: P = [O[0] - dx, 290];
  const O2: P = [O[0] + dx, 290];
  return {
    titulo: "Circunferencias tangentes a otra y a una recta, dado el radio",
    intro: "Los centros están a distancia $R$ de la recta $s$ (en la **paralela** a ella) y a distancia $R + r$ de $O$: se cortan la paralela y la circunferencia de centro $O$ y radio $R + r$.",
    pts: { _s1: [40, 330], s: [580, 330], A, O, ...sr.pts, ...srr.pts, _p1: [120, 250], _p2: [120, 345], Y: [120, 290], _y: [560, 290], O1, O2, _f1: [O1[0], 330], _f2: [O2[0], 330] },
    dados: ["s", "A", "O"],
    datos: [sr.d, srr.d],
    circulos: [{ c: "O", r }],
    base: [["_s1", "s"]],
    ops: [
      perp(["_s1", "s"], "A", ["_p1", "_p2"]),
      { k: "medir", de: "R1", a: "R2" },
      { k: "arco", c: "A", hacia: "Y" },
      { k: "marca", p: "Y" },
      { k: "paralelas", recta: ["_s1", "s"], marcas: ["Y"], cortes: ["_y"] },
      { k: "medir", de: "R+r1", a: "R+r2" },
      { k: "circulo", c: "O", hacia: "O1" },
      { k: "marca", p: "O1" },
      { k: "marca", p: "O2" },
      { k: "solucion", c: "O1", hacia: "_f1" },
      { k: "solucion", c: "O2", hacia: "_f2" },
    ],
  };
}

/** §21 (Fig. 31): tangentes a otra circunferencia y a una recta, dado el punto de tangencia T en la circunferencia. */
function circOtraRectaT(): Construccion {
  const O: P = [250, 200];
  const T = polar(O, 70, -30);
  const tdir = unit([-0.5, 0.866]);
  const k = (330 - T[1]) / tdir[1];
  const A = suma(T, por(tdir, k));
  const dAT = dist(A, T);
  const Xr: P = [A[0] + dAT, 330];
  const dXT = dist(Xr, T);
  const parY = cortes(Xr, dXT, T, dXT);
  const Y = dist(parY[0], A) > dist(parY[1], A) ? parY[0] : parY[1];
  const O1 = corteRectas(A, Y, O, T);
  return {
    titulo: "Circunferencias tangentes a otra y a una recta, dado el punto de tangencia",
    intro: "Se tiene la circunferencia de centro $O$, la recta $r$ y el punto $T$ de la circunferencia. La tangente en $T$ corta a $r$ en $A$ y el centro de la solución está en la **bisectriz** de las rectas $r$ y $t$ y en la recta $OT$.",
    pts: { O, T, _r1: [40, 330], r: [580, 330], _t1: resta(T, por(tdir, 40)), _t2: suma(T, por(tdir, k + 40)), Ax: A, Xr, Y, O1 },
    dados: ["O", "T", "r"],
    datos: [],
    circulos: [{ c: "O", r: 70 }],
    base: [["_r1", "r"]],
    ext: 120,
    ops: [
      { k: "recta", a: "O", b: "T" },
      perp(["O", "T"], "T", ["_t1", "_t2"]),
      { k: "marca", p: "Ax" },
      { k: "medir", de: "Ax", a: "T" },
      { k: "arco", c: "Ax", hacia: "Xr", abs: [-8, 130] },
      { k: "marca", p: "Xr" },
      { k: "medir", de: "Xr", a: "T" },
      { k: "arco", c: "Xr", hacia: "Y" },
      { k: "arco", c: "T", hacia: "Y" },
      { k: "marca", p: "Y" },
      { k: "recta", a: "Ax", b: "Y", limpia: true },
      { k: "marca", p: "O1" },
      { k: "solucion", c: "O1", hacia: "T" },
    ],
  };
}

/* ───────────── 3. Enlace de líneas ───────────── */

/** §22 (Fig. 32): enlace de dos rectas perpendiculares conocido el punto de tangencia T. */
function enlaceRectaRecta90(): Construccion {
  const V: P = [130, 100];
  const T: P = [300, 100];
  const O: P = [300, 270];
  const T1: P = [130, 270];
  return {
    titulo: "Enlace de dos rectas perpendiculares con un arco",
    intro: "Se quiere enlazar las rectas $r$ y $s$, perpendiculares, con un arco que sea tangente a $r$ en el punto $T$. El centro $O$ está en la **bisectriz** del ángulo y en la **perpendicular a $r$ por $T$**.",
    pts: { V, T, r: [560, 100], s: [130, 330], _a: [300, 100], _b: [300, 320], O, Tb: T1 },
    dados: ["V", "T", "r", "s"],
    datos: [],
    base: [["V", "r"], ["V", "s"]],
    ops: [
      { k: "angulo", v: "V", base: 0, obj: 45, signo: -1, largo: 260 },
      perp(["V", "r"], "T", ["_a", "_b"]),
      { k: "marca", p: "O" },
      perp(["V", "s"], "O", ["O", "Tb"]),
      { k: "marca", p: "Tb" },
      { k: "solucion", c: "O", hacia: "T", hasta: "Tb" },
    ],
  };
}

/** §22 (Fig. 35): enlace de una recta y un arco por medio de otro arco de radio R (tangente por fuera). */
function enlaceRectaArco(): Construccion {
  const O1: P = [330, 200];
  const R1 = 70;
  const R = 45;
  const dr = dato("R", R, 70, "ambar");
  const drr = dato("R1+R", R1 + R, 96);
  const dx = Math.sqrt((R1 + R) ** 2 - 85 ** 2);
  const O: P = [O1[0] - dx, 285];
  const A: P = [120, 330];
  const T: P = [O[0], 330];
  const Tp = suma(O1, por(unit(resta(O, O1)), R1));
  return {
    titulo: "Enlace de una recta y un arco con otro arco de radio dado",
    intro: "Se quiere enlazar la recta $r$ con el arco de radio $R_1$ por medio de un arco de radio $R$. El centro $O$ está en la **paralela a $r$ a distancia $R$** y a distancia $R_1 + R$ de $O_1$.",
    pts: { _r1: [40, 330], r: [580, 330], A, O1, ...dr.pts, ...drr.pts, _p1: [120, 250], _p2: [120, 345], Y: [120, 285], _y: [560, 285], O, _f: T, Tb: T, Tc: Tp },
    dados: ["r", "A", "O1"],
    datos: [dr.d, drr.d],
    circulos: [{ c: "O1", r: R1 }],
    base: [["_r1", "r"]],
    ext: 40,
    ops: [
      perp(["_r1", "r"], "A", ["_p1", "_p2"]),
      { k: "medir", de: "R1", a: "R2" },
      { k: "arco", c: "A", hacia: "Y" },
      { k: "marca", p: "Y" },
      { k: "paralelas", recta: ["_r1", "r"], marcas: ["Y"], cortes: ["_y"] },
      { k: "medir", de: "R1+R1", a: "R1+R2" },
      { k: "circulo", c: "O1", hacia: "O" },
      { k: "marca", p: "O" },
      { k: "recta", a: "O1", b: "O" },
      { k: "marca", p: "Tc" },
      perp(["_r1", "r"], "O", ["O", "_f"]),
      { k: "marca", p: "Tb" },
      { k: "solucion", c: "O", hacia: "Tb", hasta: "Tc" },
    ],
  };
}

/** §22 (Fig. 38): enlace de un arco con una recta, conocido el punto de tangencia T en la recta. */
function enlaceArcoRectaT(): Construccion {
  const O1: P = [300, 170];
  const R1 = 55;
  const T: P = [380, 280];
  const N: P = [380, 280 + R1];
  const F = polar(O1, R1, 200);
  const pm = puntosMediatriz(O1, N);
  const mdir = unit([N[1] - O1[1], -(N[0] - O1[0])]);
  const O = corteRectas(pm.M, suma(pm.M, mdir), T, [T[0], T[1] - 100]);
  const Tc = suma(O1, por(unit(resta(O, O1)), R1));
  return {
    titulo: "Enlace de un arco con una recta, dado el punto de tangencia",
    intro: "Se enlaza el arco de radio $R_1$ con la recta $r$ sabiendo que $T$ es el punto de tangencia. Se traza por $T$ la perpendicular a $r$ y se toma $TN = R_1$ al otro lado; la **mediatriz de $O_1N$** corta a la perpendicular en el centro $O$.",
    pts: { O1, Xf: F, _r1: [40, 280], r: [580, 280], T, _a: [380, 150], _b: [380, 345], N, ...pm, O, Tc },
    dados: ["O1", "Xf", "r", "T"],
    datos: [],
    circulos: [{ c: "O1", r: R1 }],
    base: [["_r1", "r"]],
    ops: [
      perp(["_r1", "r"], "T", ["_a", "_b"]),
      { k: "medir", de: "O1", a: "Xf" },
      { k: "arco", c: "T", hacia: "N" },
      { k: "marca", p: "N" },
      { k: "recta", a: "O1", b: "N" },
      ...mediatriz("O1", "N", "m1", "m2", "M"),
      { k: "marca", p: "O" },
      { k: "recta", a: "O1", b: "O" },
      { k: "marca", p: "Tc" },
      { k: "solucion", c: "O", hacia: "T", hasta: "Tc" },
    ],
  };
}

/** §22 (Fig. 39): unión de dos arcos con otro arco de radio R. */
function enlaceDosArcos(): Construccion {
  const O1: P = [200, 210];
  const O2: P = [340, 190];
  const R1 = 130;
  const R2 = 120;
  const R = 40;
  const d1 = dato("R1−R", R1 - R, 60, "ambar");
  const d2 = dato("R2−R", R2 - R, 86);
  const O = abajo(cortes(O1, R1 - R, O2, R2 - R));
  const Ta = suma(O1, por(unit(resta(O, O1)), R1));
  const Tb = suma(O2, por(unit(resta(O, O2)), R2));
  return {
    titulo: "Unión de dos arcos con otro arco de radio dado",
    intro: "Se unen dos arcos de centros $O_1$ y $O_2$ por medio de un arco de radio $R$. Con centros en $O_1$ y $O_2$ se trazan arcos de radios $R_1 - R$ y $R_2 - R$, que se cortan en el centro $O$; los puntos de tangencia están en las rectas $O_1O$ y $O_2O$.",
    pts: { O1, O2, ...d1.pts, ...d2.pts, O, Ta, Tb },
    dados: ["O1", "O2"],
    datos: [d1.d, d2.d],
    circulos: [{ c: "O1", r: R1 }, { c: "O2", r: R2 }],
    ext: 50,
    ops: [
      { k: "medir", de: "R1−R1", a: "R1−R2" },
      { k: "circulo", c: "O1", hacia: "O" },
      { k: "medir", de: "R2−R1", a: "R2−R2" },
      { k: "circulo", c: "O2", hacia: "O" },
      { k: "marca", p: "O" },
      { k: "recta", a: "O1", b: "O" },
      { k: "marca", p: "Ta" },
      { k: "recta", a: "O2", b: "O" },
      { k: "marca", p: "Tb" },
      { k: "solucion", c: "O", hacia: "Ta", hasta: "Tb" },
    ],
  };
}

/* ───────────── 4. Curva parabólica y rectificaciones ───────────── */

/** §23 (Fig. 41): arco de parábola tangente a dos rectas en A y B. */
function parabola(): Construccion {
  const A: P = [110, 70];
  const C: P = [110, 320];
  const B: P = [500, 320];
  const pts: Record<string, P> = { c0: A, C, c4: B };
  const ops: Op[] = [];
  for (let k = 1; k <= 4; k += 1) {
    pts[`d${k}`] = [A[0] + ((C[0] - A[0]) * k) / 5, A[1] + ((C[1] - A[1]) * k) / 5];
    pts[`e${k}`] = [C[0] + ((B[0] - C[0]) * k) / 5, C[1] + ((B[1] - C[1]) * k) / 5];
    ops.push({ k: "recta", a: `d${k}`, b: `e${k}` });
  }
  ops.push({ k: "curva", a: "c0", c: "C", b: "c4" });
  return {
    titulo: "Unión de dos rectas por una curva parabólica",
    intro: "Se unen las rectas $AC$ y $CB$ con un arco de parábola tangente a ellas en $A$ y en $B$. Los segmentos $AC$ y $CB$ se dividen en el **mismo número de partes iguales**; se unen la división $1$ de $AC$ con la $1'$ de $CB$, la $2$ con la $2'$, y así sucesivamente. Las rectas **envuelven** la parábola.",
    pts,
    dados: ["c0", "C", "c4", "d1", "d2", "d3", "d4", "e1", "e2", "e3", "e4"],
    datos: [],
    base: [["c0", "C"], ["C", "c4"]],
    ext: 4,
    ops,
  };
}

/** §25 (Fig. 42): rectificación de una curva cualquiera con cuerdas pequeñas. */
function rectificarCurva(): Construccion {
  const f = (x: number): P => [x, 130 + 38 * Math.sin((x - 60) / 52)];
  const xs = [60, 140, 215, 290, 360];
  const curva: P[] = [];
  for (let x = 60; x <= 360; x += 6) curva.push(f(x));
  const pts: Record<string, P> = {};
  const ops: Op[] = [];
  let x = 60;
  pts.xo = [60, 300];
  pts._l2 = [580, 300];
  xs.forEach((xk, k) => {
    pts[`c${k}`] = f(xk);
    if (k === 0) return;
    x += dist(pts[`c${k - 1}`], pts[`c${k}`]);
    pts[`x${k}`] = [x, 300];
    ops.push({ k: "medir", de: `c${k - 1}`, a: `c${k}` }, { k: "arco", c: k === 1 ? "xo" : `x${k - 1}`, hacia: `x${k}` }, { k: "marca", p: `x${k}` });
  });
  ops.push({ k: "lados", pts: ["xo", "x4"] });
  return {
    titulo: "Rectificación de una curva cualquiera",
    intro: "Se quiere hallar la longitud de la curva $AB$. Se toman **cuerdas lo más pequeñas posible** y se llevan, una a continuación de otra, sobre una recta: la longitud que resulta es muy próxima a la de la curva.",
    pts,
    dados: ["c0", "c1", "c2", "c3", "c4", "xo"],
    datos: [],
    curvaBase: curva,
    base: [["xo", "_l2"]],
    ops,
  };
}

/** §26 (Fig. 43): rectificación de la circunferencia (3 diámetros y una séptima parte). */
function rectificarCircunferencia(): Construccion {
  const O: P = [170, 190];
  const r = 80;
  const d = 2 * r;
  const pts: Record<string, P> = { O, c0: [170, 110], c4: [170, 270], xo: [60, 330], x1: [60 + d, 330], x2: [60 + 2 * d, 330], x3: [60 + 3 * d, 330], x4: [60 + 3 * d + d / 7, 330] };
  for (let k = 1; k <= 6; k += 1) pts[`k${k}`] = [170, 110 + (d * k) / 7];
  // los números de las divisiones van todos a la izquierda de su punto, a su altura, para no confundirlos con A ni con B
  const rotulos: Record<string, [number, number]> = Object.fromEntries([1, 2, 3, 4, 5, 6].map((k) => [`k${k}`, [-18, 5] as [number, number]]));
  return {
    titulo: "Rectificación de la circunferencia",
    rotulos,
    intro: "La longitud de la circunferencia es $2\\pi r = \\pi d \\approx \\dfrac{22}{7}\\,d$, es decir, **tres diámetros y una séptima parte**. El diámetro $d$ ya está dividido en siete partes iguales.",
    pts,
    dados: ["c0", "c4", "k1", "k2", "k3", "k4", "k5", "k6", "xo"],
    datos: [],
    circulos: [{ c: "O", r }],
    base: [["c0", "c4"]],
    radioMin: 15,
    ops: [
      { k: "medir", de: "c0", a: "c4" },
      { k: "arco", c: "xo", hacia: "x1" },
      { k: "marca", p: "x1" },
      { k: "medir", de: "c0", a: "c4" },
      { k: "arco", c: "x1", hacia: "x2" },
      { k: "marca", p: "x2" },
      { k: "medir", de: "c0", a: "c4" },
      { k: "arco", c: "x2", hacia: "x3" },
      { k: "marca", p: "x3" },
      { k: "medir", de: "c0", a: "k1" },
      { k: "arco", c: "x3", hacia: "x4" },
      { k: "marca", p: "x4" },
      { k: "lados", pts: ["xo", "x4"] },
    ],
  };
}

/** §27 (Fig. 45): rectificación de la semicircunferencia (segundo procedimiento, con el cartabón de 30°). */
function rectificarSemicircunferencia(): Construccion {
  const O: P = [170, 190];
  const r = 80;
  const D: P = [170, 110];
  const B: P = [170, 270];
  const A: P = [170 - r * Math.tan(rad(30)), 270];
  return {
    titulo: "Rectificación de la semicircunferencia",
    intro: "Por el centro $O$ se traza la recta que forma $30^\\circ$ con el diámetro $BD$; corta en $A$ a la tangente en $B$. Se toma $AC = 3r$ y se une $C$ con $D$: el segmento $CD$ es la longitud de la semicircunferencia, $\\pi r$.",
    pts: { O, Dt: D, Bt: B, _t1: [60, 270], t: [580, 270], A, x1: [A[0] + r, 270], x2: [A[0] + 2 * r, 270], x3: [A[0] + 3 * r, 270] },
    dados: ["O", "Dt", "Bt", "t"],
    datos: [],
    circulos: [{ c: "O", r }],
    base: [["Dt", "Bt"], ["_t1", "t"]],
    ops: [
      { k: "angulo", v: "O", base: -90, obj: 30, signo: -1, largo: 110 },
      { k: "marca", p: "A" },
      { k: "medir", de: "O", a: "Bt" },
      { k: "arco", c: "A", hacia: "x1" },
      { k: "marca", p: "x1" },
      { k: "medir", de: "O", a: "Bt" },
      { k: "arco", c: "x1", hacia: "x2" },
      { k: "marca", p: "x2" },
      { k: "medir", de: "O", a: "Bt" },
      { k: "arco", c: "x2", hacia: "x3" },
      { k: "marca", p: "x3" },
      { k: "lados", pts: ["Dt", "x3"] },
    ],
  };
}

export const CONSTRUCCIONES_TANGENCIAS = {
  "tangente-punto": tangentePunto(),
  "tangentes-paralelas": tangentesParalelas(),
  "tangente-sin-centro": tangenteSinCentro(),
  "tangentes-punto-exterior": tangentesPuntoExterior(),
  "tangente-comun-exterior": comunExterior(),
  "tangente-comun-interior": comunInterior(),
  "circ-recta-punto-radio": circRectaPuntoRadio(),
  "circ-recta-punto-pasa": circRectaPuntoPasa(),
  "circ-recta-por-punto-radio": circRectaPorPuntoRadio(),
  "circ-dos-rectas-radio": dosRectasRadio(false),
  "circ-dos-rectas-punto": dosRectasPunto(false),
  "circ-tres-rectas": tresRectas(),
  "circ-otra-t-radio": circOtraTR(),
  "circ-otra-t-punto": circOtraTP(false),
  "circ-otra-por-punto-radio": circOtraPorPuntoR(),
  "circ-otra-recta-radio": circOtraRectaR(),
  "circ-otra-recta-t": circOtraRectaT(),
  "enlace-rectas-90": enlaceRectaRecta90(),
  "enlace-dos-rectas-radio": dosRectasRadio(true),
  "enlace-dos-rectas-punto": dosRectasPunto(true),
  "enlace-recta-arco": enlaceRectaArco(),
  "enlace-arco-t-punto": circOtraTP(true),
  "enlace-arco-recta-t": enlaceArcoRectaT(),
  "enlace-dos-arcos": enlaceDosArcos(),
  parabola: parabola(),
  "rectificar-curva": rectificarCurva(),
  "rectificar-circunferencia": rectificarCircunferencia(),
  "rectificar-semicircunferencia": rectificarSemicircunferencia(),
} satisfies Record<string, Construccion>;

