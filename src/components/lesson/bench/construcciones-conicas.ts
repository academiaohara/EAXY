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
  Ln: "L", t1: "T", Rr: "R", Rs: "S", Pl: "P'",
};
// puntos que se marcan pero no se nombran: simétricos, divisiones, marcas de Thales y puntos elegidos a voluntad
for (const pre of ["M", "Mb", "Mi", "Mj", "Mr", "Ml", "Mq", "po", "pi", "r", "rx", "ry", "rq", "oa", "ae", "ev", "t", "tl", "Pb"]) {
  for (let k = 1; k <= 8; k += 1) if (!(pre === "t" && k === 1)) ETIQUETAS_CONICAS[`${pre}${k}`] = "";
}
for (const pre of ["thA", "thB"]) for (let k = 1; k <= 6; k += 1) ETIQUETAS_CONICAS[`${pre}${k}`] = "";

/** Marca del eje `Y` con el que se hace la reflexión de un punto (pares simétricos). */
const espejoX = (p: P, cx: number): P => [2 * cx - p[0], p[1]];
const espejoY = (p: P, cy: number): P => [p[0], 2 * cy - p[1]];

/** Ángulo (grados, antihorario) de la dirección `c`→`p`. */
const angDe = (c: P, p: P) => (Math.atan2(-(p[1] - c[1]), p[0] - c[0]) * 180) / Math.PI;
/** Arco de centro `c` que pasa por `p` y por su simétrico respecto del eje horizontal que pasa por `c`: se traza de una vez por el lado corto. */
function arcoDoble(c: string, hacia: string, pts: Record<string, P>): Op {
  const al = angDe(pts[c], pts[hacia]);
  const m = Math.abs(al);
  return m <= 90 ? { k: "arco", c, hacia, abs: [-(m + 8), m + 8] } : { k: "arco", c, hacia, abs: [m - 8, 360 - m + 8] };
}

/**
 * División de un segmento `X`–`Y` en `n` partes iguales con el teorema de Thales: sobre una recta auxiliar que sale de `X` se
 * llevan `n` veces la unidad con el compás, se une la última marca con `Y` y se trazan paralelas por las demás.
 * `partes[k-1]` es el nombre del punto de división que queda a `k/n` del extremo `X`.
 */
function thales(pts: Record<string, P>, X: string, Y: string, pre: string, ang: number, u: number, n: number, partes: string[], unidad: [string, string]): Op[] {
  const ops: Op[] = [];
  pts[`_${pre}R`] = polar(pts[X], (n + 0.7) * u, ang);
  for (let k = 1; k <= n; k += 1) pts[`${pre}${k}`] = polar(pts[X], k * u, ang);
  ops.push({ k: "recta", a: X, b: `_${pre}R` }, { k: "medir", de: unidad[0], a: unidad[1] });
  for (let k = 1; k <= n; k += 1) ops.push({ k: "arco", c: k === 1 ? X : `${pre}${k - 1}`, hacia: `${pre}${k}` }, { k: "marca", p: `${pre}${k}` });
  const marcas = Array.from({ length: n - 1 }, (_, i) => `${pre}${n - 1 - i}`);
  const cortes = Array.from({ length: n - 1 }, (_, i) => partes[n - 2 - i]);
  ops.push({ k: "recta", a: `${pre}${n}`, b: Y }, { k: "paralelas", recta: [`${pre}${n}`, Y], marcas, cortes });
  return ops;
}

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
    pts[`Mb${k}`] = espejoY(M, O[1]);
    ops.push({ k: "medir", de: "A", a: `n${k}` }, arcoDoble("F", `M${k}`, pts), { k: "medir", de: `n${k}`, a: "B" }, arcoDoble("Fp", `M${k}`, pts), { k: "marca", p: `M${k}` }, { k: "marca", p: `Mb${k}` });
  });
  ops.push({ k: "elipse", c: "O", a, b });
  return {
    titulo: "Elipse por puntos a partir de los ejes",
    intro: "La elipse es el lugar geométrico de los puntos cuya **suma de distancias** a dos puntos fijos, los **focos** $F$ y $F'$, es constante e igual a $2a$. Se conocen los ejes $AB = 2a$ y $CD = 2b$: con centro en $C$ y radio $a$ se corta el eje mayor en los focos. Después se elige, a voluntad, un punto $N$ del eje mayor (aquí cuatro): con radios $AN$ y $NB$ y centros en los focos se trazan dos arcos que se cortan en dos puntos de la elipse, uno **encima** y otro **debajo** del eje.",
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
  const du = dato("u", 26, 70);
  const pts: Record<string, P> = { O, A, B, C, D, E, ...du.pts, _ec1: [O[0] + 30, C[1]], _ec2: [A[0] - 25, C[1]], _ea1: [A[0], O[1] + 30], _ea2: [A[0], E[1] - 25] };
  const ops: Op[] = [
    { k: "perp", recta: ["C", "D"], punto: "C", traza: ["_ec1", "_ec2"] },
    { k: "perp", recta: ["A", "B"], punto: "A", traza: ["_ea1", "_ea2"] },
    { k: "marca", p: "E" },
  ];
  // OA y AE se dividen en cinco partes iguales; las divisiones nacen de las paralelas de Thales
  const oa = [1, 2, 3, 4].map((k) => [O[0] - (a * k) / 5, O[1]] as P);
  const ae = [1, 2, 3, 4].map((k) => [A[0], E[1] + (b * k) / 5] as P);
  oa.forEach((p, i) => (pts[`oa${i + 1}`] = p));
  ae.forEach((p, i) => (pts[`ae${i + 1}`] = p));
  ops.push(...thales(pts, "A", "O", "thA", 215, 26, 5, ["oa4", "oa3", "oa2", "oa1"], ["u1", "u2"]));
  const notas: Record<number, { title: string; text: string }> = {};
  ops.push(...thales(pts, "A", "E", "thB", 145, 26, 5, ["ae4", "ae3", "ae2", "ae1"], ["u1", "u2"]));
  for (let k = 1; k <= 4; k += 1) {
    const M = corteRectas(D, oa[k - 1], C, ae[k - 1]);
    pts[`M${k}`] = M;
    pts[`Mr${k}`] = espejoX(M, O[0]);
    pts[`Ml${k}`] = espejoY(M, O[1]);
    pts[`Mq${k}`] = espejoY(espejoX(M, O[0]), O[1]);
    ops.push({ k: "recta", a: "D", b: `oa${k}` }, { k: "recta", a: "C", b: `ae${k}` }, { k: "marca", p: `M${k}` });
  }
  const ultimo = ops.length - 2;
  for (let k = 1; k <= 4; k += 1) ops.push({ k: "marca", p: `Mr${k}`, sim: true }, { k: "marca", p: `Ml${k}`, sim: true }, { k: "marca", p: `Mq${k}`, sim: true });
  notas[ultimo] = { title: "Rayos desde C y desde D", text: "Se unen $C$ con la última división de $AE$ y $D$ con la última de $OA$: se cortan en $M_4$. Los puntos de los otros tres cuadrantes son los **simétricos** de $M_1, M_2, M_3, M_4$ respecto de los ejes $AB$ y $CD$." };
  ops.push({ k: "elipse", c: "O", a, b });
  return {
    titulo: "Elipse por haces proyectivos a partir de los ejes",
    intro: "Se construye el rectángulo $OAEC$ con perpendiculares por $A$ y por $C$ y se dividen $OA$ y $AE$ en el mismo número de partes iguales (cinco) con el teorema de Thales: la recta auxiliar, las marcas de la unidad con el compás y las paralelas. Los rayos que parten de $D$ hacia las divisiones de $OA$ y los que parten de $C$ hacia las divisiones de $AE$ se cortan, de dos en dos, en puntos de la elipse: cada intersección conserva la proporción entre los ejes $a$ y $b$.",
    pts,
    dados: ["O", "A", "B", "C", "D"],
    datos: [du.d],
    base: [["A", "B"], ["C", "D"]],
    ext: 6,
    ops,
    notas: Object.fromEntries(Object.entries(notas).map(([i, n]) => [i, n])),
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
  const angulos = [25, 65, 115, 155, -25, -65, -115, -155];
  const pts: Record<string, P> = { O, F, Fp, A: [O[0] - a, O[1]], B: [O[0] + a, O[1]] };
  const ops: Op[] = [{ k: "medir", de: "O", a: "A" }, { k: "circulo", c: "O", hacia: "A" }];
  angulos.forEach((ang, i) => {
    const k = i + 1;
    pts[`ev${k}`] = polar(O, a, ang);
    ops.push({ k: "marca", p: `ev${k}` });
  });
  angulos.forEach((ang, i) => {
    const k = i + 1;
    const L = polar(O, a, ang);
    const u = unit(resta(L, F));
    const t: P = [-u[1], u[0]];
    pts[`_a${k}`] = resta(L, por(t, 85));
    pts[`_b${k}`] = suma(L, por(t, 85));
    ops.push({ k: "recta", a: "F", b: `ev${k}` }, { k: "perp", recta: ["F", `ev${k}`], punto: `ev${k}`, traza: [`_a${k}`, `_b${k}`] });
  });
  ops.push({ k: "elipse", c: "O", a, b });
  return {
    titulo: "Elipse por envolventes",
    intro: "Se conocen los focos $F$ y $F'$ y el eje mayor $AB$. La circunferencia principal, de centro $O$ y radio $a$, es el lugar geométrico de los pies de las perpendiculares trazadas por un foco a cada una de las tangentes. Por tanto, si se toma un punto $L$ de ella, se une con $F$ y se traza la **perpendicular por $L$ a $FL$**, esa recta es **tangente** a la elipse; al repetirlo, las tangentes van envolviendo la curva.",
    pts,
    dados: ["O", "F", "Fp", "A", "B"],
    datos: [],
    base: [["A", "B"]],
    ext: 4,
    ops,
    notas: {
      1: { title: "Circunferencia principal", text: "Con centro en $O$ y radio $OA = a$ se traza la **circunferencia principal**. Sobre ella se eligen, a voluntad, los puntos $L$ de los que saldrán las tangentes: aquí cuatro por encima del eje y otros cuatro por debajo, para envolver también la curva de abajo." },
    },
  };
}

/** §8 (Fig. 13): elipse por puntos mediante la circunferencia principal y la de diámetro 2b. */
function elipseCircunferencias(): Construccion {
  const O: P = [310, 200];
  const a = 150;
  const b = 90;
  const angulos = [20, 40, 62, 80];
  const pts: Record<string, P> = { O, A: [O[0] - a, O[1]], B: [O[0] + a, O[1]], C: [O[0], O[1] - b], D: [O[0], O[1] + b], _e1: [100, O[1]], _e2: [520, O[1]], _v1: [O[0], 30], _v2: [O[0], 370] };
  const ops: Op[] = [{ k: "medir", de: "O", a: "A" }, { k: "circulo", c: "O", hacia: "A" }];
  angulos.forEach((ang, i) => {
    const k = i + 1;
    pts[`po${k}`] = polar(O, a, ang);
    ops.push({ k: "marca", p: `po${k}` });
  });
  ops.push({ k: "medir", de: "O", a: "C" }, { k: "circulo", c: "O", hacia: "C" });
  const simetricos: Op[] = [];
  angulos.forEach((ang, i) => {
    const k = i + 1;
    const po = pts[`po${k}`];
    const pi = polar(O, b, ang);
    pts[`pi${k}`] = pi;
    const r: P = [po[0], pi[1]];
    pts[`r${k}`] = r;
    pts[`rx${k}`] = espejoX(r, O[0]);
    pts[`ry${k}`] = espejoY(r, O[1]);
    pts[`rq${k}`] = espejoY(espejoX(r, O[0]), O[1]);
    pts[`_h${k}`] = [po[0] + 25, pi[1]];
    ops.push({ k: "recta", a: "O", b: `po${k}` }, { k: "marca", p: `pi${k}` }, { k: "paralelas", recta: ["_e1", "_e2"], marcas: [`pi${k}`], cortes: [`_h${k}`] }, { k: "paralelas", recta: ["_v1", "_v2"], marcas: [`po${k}`], cortes: [`r${k}`] });
    simetricos.push({ k: "marca", p: `rx${k}`, sim: true }, { k: "marca", p: `ry${k}`, sim: true }, { k: "marca", p: `rq${k}`, sim: true });
  });
  ops.push(...simetricos, { k: "elipse", c: "O", a, b });
  return {
    titulo: "Elipse por puntos con la circunferencia principal y la de diámetro 2b",
    intro: "Se conocen los ejes $AB = 2a$ y $CD = 2b$. Se trazan las dos circunferencias concéntricas, de radios $a$ y $b$, y un radio cualquiera, elegido a voluntad, que corta en $R'$ a la mayor y en $R''$ a la menor. Por $R'$ se traza la paralela a $CD$ y por $R''$ la paralela a $AB$: se cortan en un punto $R$ de la elipse, porque sus coordenadas cumplen $x²/a² + y²/b² = 1$. Los puntos de los otros cuadrantes son los simétricos respecto de los ejes.",
    pts,
    dados: ["O", "A", "B", "C", "D"],
    datos: [],
    base: [["A", "B"], ["C", "D"]],
    ext: 4,
    ops,
    notas: { 1: { title: "Circunferencia principal", text: "Con centro en $O$ y radio $OA = a$ se traza la circunferencia mayor. En ella se eligen, a voluntad, cuatro puntos $R'$: cada uno marca un radio de la construcción." } },
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
  const ns = [125, 170, 215];
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
    pts[`Mb${k}`] = espejoY(M, O[1]);
    pts[`Mi${k}`] = espejoX(M, O[0]);
    pts[`Mj${k}`] = espejoY(espejoX(M, O[0]), O[1]);
    // los puntos de la rama derecha cumplen MF = AN y MF' = BN; los de la izquierda, al revés
    ops.push(
      { k: "medir", de: "A", a: `n${k}` }, arcoDoble("F", `M${k}`, pts), arcoDoble("Fp", `Mi${k}`, pts),
      { k: "medir", de: "B", a: `n${k}` }, arcoDoble("Fp", `M${k}`, pts), arcoDoble("F", `Mi${k}`, pts),
      { k: "marca", p: `M${k}` }, { k: "marca", p: `Mb${k}` }, { k: "marca", p: `Mi${k}` }, { k: "marca", p: `Mj${k}` },
    );
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
    intro: "La hipérbola es el lugar geométrico de los puntos cuya **diferencia de distancias** a dos puntos fijos, los focos $F$ y $F'$, es constante e igual a $2a$. Se toma, a voluntad, un punto $N$ del eje real, fuera de $AB$ (aquí tres). Con radios $AN$ y $BN$ y centros en $F$ y $F'$ se trazan arcos que se cortan en cuatro puntos de la curva: dos en cada rama, uno encima y otro debajo del eje.",
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
  const F: P = [O[0] - c, O[1]];
  const db = dato("b", b, 60, "ambar");
  const pts: Record<string, P> = { O, A, B, Fp, F, ...db.pts, _x1: [40, O[1]], _x2: [560, O[1]], _y1: [B[0], 40], _y2: [B[0], 360] };
  const ops: Op[] = [{ k: "medir", de: "O", a: "A" }, { k: "circulo", c: "O", hacia: "A" }];
  const ts = [-1.1, -0.5, 0.5, 1.1];
  const derechas: { t: number; k: number }[] = ts.map((t, i) => ({ t, k: i + 1 }));
  const tangente = (t: number, k: number, lado: "d" | "i") => {
    const P0: P = [O[0] + (lado === "d" ? 1 : -1) * a * Math.cosh(t), O[1] - b * Math.sinh(t)];
    const dir = unit([(lado === "d" ? 1 : -1) * a * Math.sinh(t), -b * Math.cosh(t)]);
    const foco = lado === "d" ? Fp : F;
    const v = resta(foco, P0);
    const T = suma(P0, por(dir, dot(v, dir)));
    const nombre = lado === "d" ? `t${k}` : `tl${k}`;
    pts[nombre] = T;
    pts[`_${lado === "d" ? "a" : "c"}${k}`] = resta(T, por(dir, 90));
    pts[`_${lado === "d" ? "b" : "d"}${k}`] = suma(T, por(dir, 90));
    return nombre;
  };
  const marcasT: Op[] = [];
  const trazosD: Op[] = [];
  const trazosI: Op[] = [];
  derechas.forEach(({ t, k }) => {
    const n = tangente(t, k, "d");
    marcasT.push({ k: "marca", p: n });
    trazosD.push({ k: "recta", a: "Fp", b: n }, { k: "perp", recta: ["Fp", n], punto: n, traza: [`_a${k}`, `_b${k}`] });
  });
  derechas.forEach(({ t, k }) => {
    const n = tangente(t, k, "i");
    marcasT.push({ k: "marca", p: n });
    trazosI.push({ k: "recta", a: "F", b: n }, { k: "perp", recta: ["F", n], punto: n, traza: [`_c${k}`, `_d${k}`] });
  });
  ops.push(...marcasT, ...trazosD, ...trazosI);
  const rama: string[] = [];
  const ramaI: string[] = [];
  for (let j = -7; j <= 7; j += 1) {
    const t = (j * 1.45) / 7;
    pts[`_p${j + 7}`] = [O[0] + a * Math.cosh(t), O[1] - b * Math.sinh(t)];
    pts[`_q${j + 7}`] = [O[0] - a * Math.cosh(t), O[1] - b * Math.sinh(t)];
    rama.push(`_p${j + 7}`);
    ramaI.push(`_q${j + 7}`);
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
    { k: "curvaPuntos", pts: ramaI },
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
    intro: "Se conocen los vértices $A$ y $B$ y los focos. Como en la elipse, basta tomar puntos $T$ de la circunferencia principal (de radio $a$), unirlos con el foco y trazar las perpendiculares, que son **tangentes** a la rama: el foco $F'$ sirve para la rama derecha y $F$ para la izquierda. Las **asíntotas** pasan por el centro $O$ y por el extremo $R$ de la altura $b$ levantada en el vértice.",
    pts,
    dados: ["O", "A", "B", "Fp", "F"],
    datos: [db.d],
    base: [["_x1", "_x2"]],
    ext: 4,
    radioMin: 40,
    ops,
    notas: { 1: { title: "Circunferencia principal", text: "Con centro en $O$ y radio $OA = a$ se traza la **circunferencia principal**. En ella se eligen, a voluntad, los puntos $T$ de los que saldrán las tangentes: cuatro para la rama derecha y cuatro para la izquierda." } },
  };
}

/** §15 (Fig. 19): parábola por puntos (foco, directriz y eje). */
function parabolaPuntos(): Construccion {
  const A: P = [100, 200];
  const F: P = [160, 200];
  const V: P = [130, 200];
  const par = cortes(A, dist(A, F), F, dist(A, F));
  const xs = [200, 250, 300, 350];
  const pts: Record<string, P> = { A, F, V, m1: par[0], m2: par[1], _d1: [100, 25], _d2: [100, 365], _e1: [60, 200], _e2: [560, 200] };
  const ops: Op[] = [...mediatriz("A", "F", "m1", "m2", "V")];
  xs.forEach((x, i) => {
    const k = i + 1;
    const K: P = [x, 200];
    pts[`k${k}`] = K;
    const r = x - A[0];
    const y = Math.sqrt(r * r - (x - F[0]) ** 2);
    pts[`P${k}`] = [x, 200 - y];
    pts[`Pb${k}`] = [x, 200 + y];
    pts[`_a${k}`] = [x, 30];
    pts[`_b${k}`] = [x, 370];
    ops.push({ k: "perp", recta: ["_e1", "_e2"], punto: `k${k}`, traza: [`_a${k}`, `_b${k}`] }, { k: "medir", de: "A", a: `k${k}` }, arcoDoble("F", `P${k}`, pts), { k: "marca", p: `P${k}` }, { k: "marca", p: `Pb${k}` });
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
    intro: "La parábola es el lugar geométrico de los puntos que **equidistan** de un punto fijo $F$ (el foco) y de una recta fija $d$ (la directriz). El vértice $V$ es el punto medio de $AF$. Se toma, a voluntad, un punto $K$ del eje (aquí cuatro), se traza la perpendicular por él y con centro en $F$ y radio $AK$ se corta en dos puntos, uno encima y otro debajo del eje: $PF = PN$.",
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
  const du = dato("u", 24, 110);
  const pts: Record<string, P> = { V, N, P: Pp, ...du.pts, _e1: [60, 200], _e2: [560, 200], _t2: [100, 340], _pl: [400, 340] };
  for (let k = 1; k <= 4; k += 1) {
    pts[`n${k}`] = [100 + 60 * k, 60];
    pts[`v${k}`] = [100, 200 - 28 * k];
  }
  // PN y VN se dividen en cinco partes iguales con el teorema de Thales
  const ops: Op[] = [
    ...thales(pts, "N", "P", "thA", 340, 24, 5, ["n1", "n2", "n3", "n4"], ["u1", "u2"]),
    ...thales(pts, "V", "N", "thB", 300, 24, 5, ["v1", "v2", "v3", "v4"], ["u1", "u2"]),
  ];
  for (let k = 1; k <= 4; k += 1) {
    const M: P = [100 + 12 * k * k, 200 - 28 * k];
    pts[`M${k}`] = M;
    pts[`Mb${k}`] = espejoY(M, 200);
    pts[`_w${k}`] = [M[0], 400 - M[1]];
    ops.push({ k: "recta", a: "V", b: `n${k}` }, { k: "paralelas", recta: ["_e1", "_e2"], marcas: [`v${k}`], cortes: [`M${k}`] });
  }
  for (let k = 1; k <= 4; k += 1) ops.push({ k: "marca", p: `Mb${k}`, sim: true });
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
    intro: "Se tienen el eje, el vértice $V$ y un punto $P$ de la curva. Se trazan la tangente en el vértice $VN$ y la paralela $PN$ al eje; se dividen $PN$ y $VN$ en el mismo número de partes iguales (cinco) con el teorema de Thales. El rayo desde $V$ a una división de $PN$ y la paralela al eje por la división correspondiente de $VN$ se cortan en un punto $M$ de la parábola; los puntos de debajo del eje son sus simétricos.",
    pts,
    dados: ["V", "N", "P"],
    datos: [du.d],
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
  const par = cortes(A, dist(A, F), F, dist(A, F));
  const ys = [-140, -100, -60, 60, 100, 140];
  const pts: Record<string, P> = { A, F, V, m1: par[0], m2: par[1], _d1: [100, 25], _d2: [100, 365], _t1: [140, 25], _t2: [140, 365], _e1: [60, 200], _e2: [560, 200] };
  const ops: Op[] = [...mediatriz("A", "F", "m1", "m2", "V"), { k: "perp", recta: ["_e1", "_e2"], punto: "V", traza: ["_t1", "_t2"] }];
  ys.forEach((dy, i) => {
    const k = i + 1;
    pts[`t${k}`] = [140, 200 + dy];
    ops.push({ k: "marca", p: `t${k}` });
  });
  ys.forEach((dy, i) => {
    const k = i + 1;
    const N: P = [140, 200 + dy];
    const u = unit(resta(N, F));
    const t: P = [-u[1], u[0]];
    pts[`_a${k}`] = resta(N, por(t, 40));
    pts[`_b${k}`] = suma(N, por(t, 150));
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
    intro: "Se conocen el foco $F$ y la directriz, con el punto $A$ del eje. El vértice $V$ es el punto medio de $AF$ y la tangente en el vértice, $t_v$, es la perpendicular al eje por $V$: hace de circunferencia principal de la parábola. Se toma, a voluntad, un punto $N$ de ella (aquí seis, tres a cada lado del eje), se une con el foco $F$ y se traza por $N$ la **perpendicular a $FN$**: esa recta es tangente a la curva. Al repetirlo, las tangentes envuelven la parábola.",
    pts,
    dados: ["A", "F"],
    datos: [],
    base: [["_d1", "_d2"], ["_e1", "_e2"]],
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
