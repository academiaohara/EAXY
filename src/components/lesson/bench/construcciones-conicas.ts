import type { Construccion, Dato, Op, P } from "./construcciones-datos";

/**
 * Construcciones del tema 10 (curvas cónicas): elipse, hipérbola y parábola trazadas por puntos, por haces proyectivos y por
 * envolventes. Una sola lista de operaciones da la animación paso a paso y la práctica con instrumentos; la curva final se
 * dibuja en trazo grueso (la elipse exacta, la hipérbola y la parábola con una curva suave por los puntos).
 */

const rad = (d: number) => (d * Math.PI) / 180;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const polar = (o: P, r: number, d: number): P => [o[0] + r * Math.cos(rad(d)), o[1] - r * Math.sin(rad(d))];
const suma = (a: P, b: P): P => [a[0] + b[0], a[1] + b[1]];
const resta = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const por = (a: P, k: number): P => [a[0] * k, a[1] * k];
const unit = (a: P): P => por(a, 1 / Math.hypot(a[0], a[1]));
const dot = (a: P, b: P) => a[0] * b[0] + a[1] * b[1];

function cortes(a: P, ra: number, b: P, rb: number): [P, P] {
  const d = dist(a, b);
  const x = (d * d + ra * ra - rb * rb) / (2 * d);
  const h = Math.sqrt(Math.max(0, ra * ra - x * x));
  const u = unit(resta(b, a));
  const base = suma(a, por(u, x));
  return [[base[0] + u[1] * h, base[1] - u[0] * h], [base[0] - u[1] * h, base[1] + u[0] * h]];
}
const arriba = (par: [P, P]): P => (par[0][1] < par[1][1] ? par[0] : par[1]);

function corteRectas(p1: P, p2: P, p3: P, p4: P): P {
  const d = (p2[0] - p1[0]) * (p4[1] - p3[1]) - (p2[1] - p1[1]) * (p4[0] - p3[0]);
  const t = ((p3[0] - p1[0]) * (p4[1] - p3[1]) - (p3[1] - p1[1]) * (p4[0] - p3[0])) / d;
  return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
}

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

/** Rótulos de los puntos de este tema (los auxiliares no llevan rótulo). */
export const ETIQUETAS_CONICAS: Record<string, string> = {
  Fp: "F'", n1: "1", n2: "2", n3: "3", n4: "4",
  oa1: "1", oa2: "2", oa3: "3", oa4: "4", ae1: "1", ae2: "2", ae3: "3", ae4: "4",
  M1: "", M2: "", M3: "", M4: "", Ln: "L",
  l1: "", l2: "", l3: "", l4: "", l5: "", l6: "",
  po1: "", po2: "", po3: "", po4: "", pi1: "", pi2: "", pi3: "", pi4: "", r1: "", r2: "", r3: "", r4: "",
  t1: "T", t2: "", t3: "", t4: "", t5: "", t6: "",
  Rr: "R", Rs: "S", Pl: "P'",
};

/** §4 (Fig. 9): elipse por puntos a partir de los ejes (suma de distancias a los focos igual a 2a). */
function elipsePuntos(): Construccion {
  const O: P = [310, 200];
  const a = 150;
  const b = 90;
  const c = 120;
  const A: P = [O[0] - a, O[1]];
  const B: P = [O[0] + a, O[1]];
  const C: P = [O[0], O[1] - b];
  const D: P = [O[0], O[1] + b];
  const F: P = [O[0] - c, O[1]];
  const Fp: P = [O[0] + c, O[1]];
  const ns = [-90, -45, 45, 90];
  const pts: Record<string, P> = { O, A, B, C, D, F, Fp };
  const ops: Op[] = [{ k: "medir", de: "O", a: "A" }, { k: "arco", c: "C", hacia: "F" }, { k: "arco", c: "C", hacia: "Fp" }, { k: "marca", p: "F" }, { k: "marca", p: "Fp" }];
  ns.forEach((n, i) => {
    const k = i + 1;
    const N: P = [O[0] + n, O[1]];
    pts[`n${k}`] = N;
    const M = arriba(cortes(F, dist(A, N), Fp, dist(N, B)));
    pts[`M${k}`] = M;
    pts[`_l${k}`] = [M[0], 2 * O[1] - M[1]];
    pts[`_r${k}`] = [2 * O[0] - M[0], M[1]];
    pts[`_q${k}`] = [2 * O[0] - M[0], 2 * O[1] - M[1]];
    ops.push({ k: "medir", de: "A", a: `n${k}` }, { k: "arco", c: "F", hacia: `M${k}` }, { k: "medir", de: `n${k}`, a: "B" }, { k: "arco", c: "Fp", hacia: `M${k}` }, { k: "marca", p: `M${k}` });
  });
  ops.push({ k: "elipse", c: "O", a, b });
  return {
    titulo: "Elipse por puntos a partir de los ejes",
    intro: "La elipse es el lugar geométrico de los puntos cuya **suma de distancias** a dos puntos fijos, los **focos** $F$ y $F'$, es constante e igual a $2a$. Se conocen los ejes $AB = 2a$ y $CD = 2b$: con centro en $C$ y radio $a$ se corta el eje mayor en los focos.",
    pts,
    dados: ["O", "A", "B", "C", "D", "n1", "n2", "n3", "n4"],
    datos: [],
    base: [["A", "B"], ["C", "D"]],
    radioMax: 270,
    ops,
  };
}

/** §5 (Fig. 10): elipse por haces proyectivos a partir de los ejes (un cuadrante dividido en cinco partes). */
function elipseHaces(): Construccion {
  const O: P = [310, 200];
  const a = 150;
  const b = 90;
  const A: P = [O[0] - a, O[1]];
  const B: P = [O[0] + a, O[1]];
  const C: P = [O[0], O[1] - b];
  const D: P = [O[0], O[1] + b];
  const E: P = [O[0] - a, O[1] - b];
  const pts: Record<string, P> = { O, A, B, C, D, E };
  const ops: Op[] = [];
  for (let k = 1; k <= 4; k += 1) {
    const oa: P = [O[0] - (a * k) / 5, O[1]];
    const ae: P = [O[0] - a, E[1] + (b * k) / 5];
    pts[`oa${k}`] = oa;
    pts[`ae${k}`] = ae;
    const P1 = corteRectas(D, oa, C, ae);
    pts[`M${k}`] = P1;
    pts[`_r${k}`] = [2 * O[0] - P1[0], P1[1]];
    pts[`_l${k}`] = [P1[0], 2 * O[1] - P1[1]];
    pts[`_q${k}`] = [2 * O[0] - P1[0], 2 * O[1] - P1[1]];
    ops.push({ k: "recta", a: "D", b: `oa${k}` }, { k: "recta", a: "C", b: `ae${k}` }, { k: "marca", p: `M${k}` });
  }
  ops.push({ k: "elipse", c: "O", a, b });
  return {
    titulo: "Elipse por haces proyectivos a partir de los ejes",
    intro: "Se construye el rectángulo $OAEC$ y se dividen $OA$ y $AE$ en el mismo número de partes iguales (cinco). Los rayos que parten de $D$ hacia las divisiones de $OA$ y los que parten de $C$ hacia las divisiones de $AE$ se cortan, de dos en dos, en puntos de la elipse: cada intersección conserva la proporción entre los ejes $a$ y $b$.",
    pts,
    dados: ["O", "A", "B", "C", "D", "E", "oa1", "oa2", "oa3", "oa4", "ae1", "ae2", "ae3", "ae4"],
    datos: [],
    base: [["A", "B"], ["C", "D"], ["A", "E"], ["E", "C"]],
    ext: 6,
    ops,
  };
}

/** §7 (Fig. 12): elipse por envolventes (tangentes: perpendiculares a FL por los puntos L de la circunferencia principal). */
function elipseEnvolventes(): Construccion {
  const O: P = [310, 210];
  const a = 150;
  const b = 90;
  const c = 120;
  const F: P = [O[0] - c, O[1]];
  const Fp: P = [O[0] + c, O[1]];
  const angulos = [20, 45, 70, 110, 135, 160];
  const pts: Record<string, P> = { O, F, Fp, A: [O[0] - a, O[1]], B: [O[0] + a, O[1]] };
  const ops: Op[] = [];
  angulos.forEach((ang, i) => {
    const k = i + 1;
    const L = polar(O, a, ang);
    pts[`l${k}`] = L;
    const u = unit(resta(L, F));
    const t: P = [-u[1], u[0]];
    pts[`_a${k}`] = resta(L, por(t, 110));
    pts[`_b${k}`] = suma(L, por(t, 110));
    ops.push({ k: "recta", a: "F", b: `l${k}` }, { k: "perp", recta: ["F", `l${k}`], punto: `l${k}`, traza: [`_a${k}`, `_b${k}`] });
  });
  ops.push({ k: "elipse", c: "O", a, b });
  return {
    titulo: "Elipse por envolventes",
    intro: "La circunferencia principal, de centro $O$ y radio $a$, es el lugar geométrico de los pies de las perpendiculares trazadas por un foco a cada una de las tangentes. Por tanto, si se toma un punto $L$ de ella, se une con $F$ y se traza la **perpendicular por $L$ a $FL$**, esa recta es **tangente** a la elipse; al repetirlo, las tangentes van envolviendo la curva.",
    pts,
    dados: ["O", "F", "Fp", "A", "B", "l1", "l2", "l3", "l4", "l5", "l6"],
    datos: [],
    circulos: [{ c: "O", r: a }],
    base: [["A", "B"]],
    ext: 4,
    ops,
  };
}

/** §8 (Fig. 13): elipse por puntos mediante la circunferencia principal y la de diámetro 2b. */
function elipseCircunferencias(): Construccion {
  const O: P = [310, 200];
  const a = 150;
  const b = 90;
  const angulos = [20, 40, 62, 80];
  const pts: Record<string, P> = { O, A: [O[0] - a, O[1]], B: [O[0] + a, O[1]], C: [O[0], O[1] - b], D: [O[0], O[1] + b], _e1: [100, O[1]], _e2: [520, O[1]], _v1: [O[0], 30], _v2: [O[0], 370] };
  const ops: Op[] = [];
  angulos.forEach((ang, i) => {
    const k = i + 1;
    const po = polar(O, a, ang);
    const pi = polar(O, b, ang);
    pts[`po${k}`] = po;
    pts[`pi${k}`] = pi;
    pts[`r${k}`] = [po[0], pi[1]];
    pts[`_h${k}`] = [po[0] + 25, pi[1]];
    ops.push({ k: "recta", a: "O", b: `po${k}` }, { k: "marca", p: `pi${k}` }, { k: "paralelas", recta: ["_e1", "_e2"], marcas: [`pi${k}`], cortes: [`_h${k}`] }, { k: "paralelas", recta: ["_v1", "_v2"], marcas: [`po${k}`], cortes: [`r${k}`] });
  });
  ops.push({ k: "elipse", c: "O", a, b });
  return {
    titulo: "Elipse por puntos con la circunferencia principal y la de diámetro 2b",
    intro: "Se trazan las dos circunferencias concéntricas, de radios $a$ y $b$, y un radio cualquiera que corta en $R'$ a la mayor y en $R''$ a la menor. Por $R'$ se traza la paralela a $CD$ y por $R''$ la paralela a $AB$: se cortan en un punto $R$ de la elipse, porque sus coordenadas cumplen $x²/a² + y²/b² = 1$.",
    pts,
    dados: ["O", "A", "B", "C", "D", "po1", "po2", "po3", "po4"],
    datos: [],
    circulos: [{ c: "O", r: a }, { c: "O", r: b }],
    base: [["A", "B"], ["C", "D"]],
    ext: 4,
    ops,
  };
}

/** §11 (Fig. 16): hipérbola por puntos a partir de los ejes (diferencia de distancias a los focos igual a 2a). */
function hiperbolaPuntos(): Construccion {
  const O: P = [310, 200];
  const a = 60;
  const c = 100;
  const A: P = [O[0] - a, O[1]];
  const B: P = [O[0] + a, O[1]];
  const F: P = [O[0] - c, O[1]];
  const Fp: P = [O[0] + c, O[1]];
  const ns = [130, 185, 240];
  const pts: Record<string, P> = { O, A, B, F, Fp };
  const ops: Op[] = [];
  const derecha: string[] = [];
  const izquierda: string[] = [];
  ns.forEach((n, i) => {
    const k = i + 1;
    const N: P = [O[0] + n, O[1]];
    pts[`n${k}`] = N;
    const M = arriba(cortes(F, dist(A, N), Fp, dist(B, N)));
    pts[`M${k}`] = M;
    pts[`_d${k}`] = [M[0], 2 * O[1] - M[1]];
    pts[`_i${k}`] = [2 * O[0] - M[0], M[1]];
    pts[`_j${k}`] = [2 * O[0] - M[0], 2 * O[1] - M[1]];
    ops.push({ k: "medir", de: "A", a: `n${k}` }, { k: "arco", c: "F", hacia: `M${k}` }, { k: "medir", de: "B", a: `n${k}` }, { k: "arco", c: "Fp", hacia: `M${k}` }, { k: "marca", p: `M${k}` });
  });
  const b2 = 80;
  for (let j = -7; j <= 7; j += 1) {
    const t = (j * 1.5) / 7;
    pts[`_hr${j + 7}`] = [O[0] + a * Math.cosh(t), O[1] - b2 * Math.sinh(t)];
    pts[`_hl${j + 7}`] = [O[0] - a * Math.cosh(t), O[1] - b2 * Math.sinh(t)];
    derecha.push(`_hr${j + 7}`);
    izquierda.push(`_hl${j + 7}`);
  }
  ops.push({ k: "curvaPuntos", pts: derecha }, { k: "curvaPuntos", pts: izquierda });
  return {
    titulo: "Hipérbola por puntos a partir de los ejes",
    intro: "La hipérbola es el lugar geométrico de los puntos cuya **diferencia de distancias** a dos puntos fijos, los focos $F$ y $F'$, es constante e igual a $2a$. Se toma un punto $N$ del eje real, fuera de $AB$; con radios $AN$ y $BN$ y centros en $F$ y $F'$ se trazan dos arcos que se cortan en un punto $M$ de la curva.",
    pts,
    dados: ["O", "A", "B", "F", "Fp", "n1", "n2", "n3"],
    datos: [],
    base: [["F", "n3"]],
    radioMax: 330,
    ops,
  };
}

/** §13 (Fig. 18): hipérbola por envolventes y asíntotas. */
function hiperbolaEnvolventes(): Construccion {
  const O: P = [250, 200];
  const a = 60;
  const b = 80;
  const c = 100;
  const A: P = [O[0] - a, O[1]];
  const B: P = [O[0] + a, O[1]];
  const Fp: P = [O[0] + c, O[1]];
  const db = dato("b", b, 60, "ambar");
  const pts: Record<string, P> = { O, A, B, Fp, F: [O[0] - c, O[1]], ...db.pts, _x1: [40, O[1]], _x2: [560, O[1]], _y1: [B[0], 40], _y2: [B[0], 360] };
  const ops: Op[] = [];
  const ts = [-1.2, -0.75, -0.3, 0.3, 0.75, 1.2];
  ts.forEach((t, i) => {
    const k = i + 1;
    const P0: P = [O[0] + a * Math.cosh(t), O[1] - b * Math.sinh(t)];
    // tangente en P0: dirección (a·sinh t, −b·cosh t) en pantalla
    const dir = unit([a * Math.sinh(t), -b * Math.cosh(t)]);
    const v = resta(Fp, P0);
    const T = suma(P0, por(dir, dot(v, dir)));
    pts[`t${k}`] = T;
    pts[`_a${k}`] = resta(T, por(dir, 90));
    pts[`_b${k}`] = suma(T, por(dir, 90));
    ops.push({ k: "recta", a: "Fp", b: `t${k}` }, { k: "perp", recta: ["Fp", `t${k}`], punto: `t${k}`, traza: [`_a${k}`, `_b${k}`] });
  });
  const rama: string[] = [];
  for (let j = -7; j <= 7; j += 1) {
    const t = (j * 1.45) / 7;
    pts[`_p${j + 7}`] = [O[0] + a * Math.cosh(t), O[1] - b * Math.sinh(t)];
    rama.push(`_p${j + 7}`);
  }
  const Rr: P = [B[0], B[1] - b];
  const Rs: P = [B[0], B[1] + b];
  pts.Rr = Rr;
  pts.Rs = Rs;
  pts._as1 = suma(O, por(unit(resta(Rr, O)), 230));
  pts._as2 = suma(O, por(unit(resta(Rs, O)), 230));
  pts._as3 = suma(O, por(unit(resta(Rr, O)), -230));
  pts._as4 = suma(O, por(unit(resta(Rs, O)), -230));
  ops.push(
    { k: "curvaPuntos", pts: rama },
    { k: "perp", recta: ["_x1", "_x2"], punto: "B", traza: ["_y1", "_y2"] },
    { k: "medir", de: "b1", a: "b2" },
    { k: "arco", c: "B", hacia: "Rr" },
    { k: "arco", c: "B", hacia: "Rs" },
    { k: "marca", p: "Rr" },
    { k: "marca", p: "Rs" },
    { k: "recta", a: "O", b: "Rr" },
    { k: "recta", a: "O", b: "Rs" },
    { k: "lados", pts: ["_as3", "_as1"] },
    { k: "lados", pts: ["_as4", "_as2"] },
  );
  return {
    titulo: "Hipérbola por envolventes y asíntotas",
    intro: "Se conocen los vértices $A$ y $B$ y los focos. Como en la elipse, basta tomar puntos $T$ de la circunferencia principal (de radio $a$), unirlos con el foco $F'$ y trazar las perpendiculares, que son **tangentes** a la rama. Las **asíntotas** pasan por el centro $O$ y por el extremo $R$ de la altura $b$ levantada en el vértice.",
    pts,
    dados: ["O", "A", "B", "Fp", "t1", "t2", "t3", "t4", "t5", "t6"],
    datos: [db.d],
    circulos: [{ c: "O", r: a }],
    base: [["_x1", "_x2"]],
    ext: 4,
    radioMin: 40,
    ops,
  };
}

/** §15 (Fig. 19): parábola por puntos (foco, directriz y eje). */
function parabolaPuntos(): Construccion {
  const A: P = [100, 200];
  const F: P = [160, 200];
  const V: P = [130, 200];
  const par = cortes(A, dist(A, F), F, dist(A, F));
  const xs = [200, 260, 320, 380];
  const pts: Record<string, P> = { A, F, V, m1: par[0], m2: par[1], _d1: [100, 25], _d2: [100, 365], _e1: [60, 200], _e2: [560, 200] };
  const ops: Op[] = [...mediatriz("A", "F", "m1", "m2", "V")];
  xs.forEach((x, i) => {
    const k = i + 1;
    const K: P = [x, 200];
    pts[`k${k}`] = K;
    const r = x - A[0];
    const y = Math.sqrt(r * r - (x - F[0]) ** 2);
    pts[`P${k}`] = [x, 200 - y];
    pts[`_u${k}`] = [x, 200 + y];
    pts[`_a${k}`] = [x, 30];
    pts[`_b${k}`] = [x, 370];
    ops.push({ k: "perp", recta: ["_e1", "_e2"], punto: `k${k}`, traza: [`_a${k}`, `_b${k}`] }, { k: "medir", de: "A", a: `k${k}` }, { k: "arco", c: "F", hacia: `P${k}` }, { k: "marca", p: `P${k}` });
  });
  const densa: string[] = [];
  for (let j = -8; j <= 8; j += 1) {
    const y = (j * 175) / 8;
    pts[`_c${j + 8}`] = [130 + (y * y) / 120, 200 + y];
    densa.push(`_c${j + 8}`);
  }
  ops.push({ k: "curvaPuntos", pts: densa });
  return {
    titulo: "Parábola por puntos",
    intro: "La parábola es el lugar geométrico de los puntos que **equidistan** de un punto fijo $F$ (el foco) y de una recta fija $d$ (la directriz). El vértice $V$ es el punto medio de $AF$. Se toma un punto $K$ del eje, se traza la perpendicular por él y con centro en $F$ y radio $AK$ se corta en $P$: $PF = PN$.",
    pts,
    dados: ["A", "F", "k1", "k2", "k3", "k4"],
    datos: [],
    base: [["_d1", "_d2"], ["_e1", "_e2"]],
    radioMax: 300,
    radioMin: 40,
    ops,
  };
}

/** §16 (Fig. 20): parábola conocidos el eje, el vértice y un punto de la curva (haces proyectivos). */
function parabolaVerticePunto(): Construccion {
  const V: P = [100, 200];
  const N: P = [100, 60];
  const Pp: P = [400, 60];
  const pts: Record<string, P> = { V, N, P: Pp, _e1: [60, 200], _e2: [560, 200], _t2: [100, 340], _pl: [400, 340] };
  const ops: Op[] = [];
  for (let k = 1; k <= 4; k += 1) {
    const nk: P = [100 + 60 * k, 60];
    const vk: P = [100, 200 - 28 * k];
    const M: P = [100 + 12 * k * k, 200 - 28 * k];
    pts[`n${k}`] = nk;
    pts[`v${k}`] = vk;
    pts[`M${k}`] = M;
    pts[`_w${k}`] = [M[0], 400 - M[1]];
    ops.push({ k: "recta", a: "V", b: `n${k}` }, { k: "paralelas", recta: ["_e1", "_e2"], marcas: [`v${k}`], cortes: [`M${k}`] });
  }
  const kk = (60 - 200) ** 2 / (400 - 100);
  const densa: string[] = [];
  for (let j = -8; j <= 8; j += 1) {
    const dy = (j * 140) / 8;
    pts[`_c${j + 8}`] = [100 + (dy * dy) / kk, 200 + dy];
    densa.push(`_c${j + 8}`);
  }
  ops.push({ k: "curvaPuntos", pts: densa });
  return {
    titulo: "Parábola dados el eje, el vértice y un punto",
    intro: "Se trazan la tangente en el vértice $VN$ y la paralela $PN$ al eje; se dividen $PN$ y $VN$ en el mismo número de partes iguales. El rayo desde $V$ a una división de $PN$ y la paralela al eje por la división correspondiente de $VN$ se cortan en un punto $M$ de la parábola.",
    pts,
    dados: ["V", "N", "P", "n1", "n2", "n3", "n4", "v1", "v2", "v3", "v4"],
    datos: [],
    base: [["N", "_t2"], ["N", "P"], ["_e1", "_e2"]],
    ext: 6,
    ops,
  };
}

/** §17 (Fig. 21): parábola por envolventes (la tangente en el vértice es la circunferencia principal). */
function parabolaEnvolventes(): Construccion {
  const A: P = [100, 200];
  const F: P = [180, 200];
  const V: P = [140, 200];
  const ys = [-140, -100, -60, 60, 100, 140];
  const pts: Record<string, P> = { A, F, V, _d1: [100, 25], _d2: [100, 365], _t1: [140, 25], _t2: [140, 365], _e1: [60, 200], _e2: [560, 200] };
  const ops: Op[] = [];
  ys.forEach((dy, i) => {
    const k = i + 1;
    const N: P = [140, 200 + dy];
    pts[`t${k}`] = N;
    const u = unit(resta(N, F));
    const t: P = [-u[1], u[0]];
    pts[`_a${k}`] = resta(N, por(t, 40));
    pts[`_b${k}`] = suma(N, por(t, 230));
    ops.push({ k: "recta", a: "F", b: `t${k}` }, { k: "perp", recta: ["F", `t${k}`], punto: `t${k}`, traza: [`_a${k}`, `_b${k}`] });
  });
  const curva: string[] = [];
  for (let j = -6; j <= 6; j += 1) {
    const dy = (j * 170) / 6;
    pts[`_p${j + 6}`] = [140 + (dy * dy) / 160, 200 + dy];
    curva.push(`_p${j + 6}`);
  }
  ops.push({ k: "curvaPuntos", pts: curva });
  return {
    titulo: "Parábola por envolventes",
    intro: "La tangente en el vértice, $t_v$, hace de circunferencia principal de la parábola. Se toma un punto $N$ de ella, se une con el foco $F$ y se traza por $N$ la **perpendicular a $FN$**: esa recta es tangente a la curva. Al repetirlo, las tangentes envuelven la parábola.",
    pts,
    dados: ["A", "F", "V", "t1", "t2", "t3", "t4", "t5", "t6"],
    datos: [],
    base: [["_d1", "_d2"], ["_t1", "_t2"], ["_e1", "_e2"]],
    ext: 4,
    ops,
  };
}

export const CONSTRUCCIONES_CONICAS = {
  "elipse-puntos": elipsePuntos(),
  "elipse-haces": elipseHaces(),
  "elipse-envolventes": elipseEnvolventes(),
  "elipse-circunferencias": elipseCircunferencias(),
  "hiperbola-puntos": hiperbolaPuntos(),
  "hiperbola-envolventes": hiperbolaEnvolventes(),
  "parabola-puntos": parabolaPuntos(),
  "parabola-vertice-punto": parabolaVerticePunto(),
  "parabola-envolventes": parabolaEnvolventes(),
} satisfies Record<string, Construccion>;

