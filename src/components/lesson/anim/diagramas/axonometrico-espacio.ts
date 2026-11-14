import { arc, circ, fl, lin, poli, seg, txt, type Color, type Diagrama, type Item, type Pt } from "./engine";

/**
 * Dibujos del sistema axonométrico (tema 14) hechos sobre un modelo: cada punto se define una sola vez por sus
 * coordenadas (x, y, z) en el triedro y de ahí salen la proyección directa y las proyecciones sobre los planos
 * coordenados. Así las trazas, las paralelas a los ejes y las intersecciones salen calculadas, no puestas a ojo.
 * En cada paso se añade poco, y lo auxiliar se retira (`dura`) cuando ya no hace falta.
 */

type P3 = [number, number, number];

const C30 = Math.cos(Math.PI / 6);
const rad = (g: number) => (g * Math.PI) / 180;
/** Perspectiva isométrica: X baja hacia la derecha, Y baja hacia la izquierda, Z sube. `u` es la escala del dibujo. */
const vista = (o: Pt, u = 1) => (p: P3): Pt => [o[0] + u * (p[0] - p[1]) * C30, o[1] + u * ((p[0] + p[1]) * 0.5 - p[2])];
type Vista = (p: P3) => Pt;
const I = vista([0, 0]);
const O3: P3 = [0, 0, 0];

/** Colores: proyección directa (el punto o la recta «de verdad»), y proyecciones sobre XOY, XOZ e YOZ. */
const C_D: Color = "verde";
const C_1: Color = "naranja";
const C_2: Color = "azul";
const C_3: Color = "morado";
const AUX: Color = "gris";
const RES: Color = "rojo";

const pr1 = (p: P3): P3 => [p[0], p[1], 0];
const pr2 = (p: P3): P3 => [p[0], 0, p[2]];
const pr3 = (p: P3): P3 => [0, p[1], p[2]];
const mix = (a: P3, b: P3, t: number): P3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

/** Punto con rótulo algo más pequeño que el de serie, para no tapar el dibujo. */
const p2 = (p: Pt, n?: string, c: Color = "blanco", dx = 12, dy = -8, s = 18): Item => ({ t: "pt", p, n, c, dx, dy, s, r: 4.6 });
const pA = (p: P3, n?: string, c: Color = C_D, dx = 12, dy = -8, f: Vista = I): Item => p2(f(p), n, c, dx, dy);
const sA = (a: P3, b: P3, c: Color = C_D, d = false, w = 3, f: Vista = I): Item => seg(f(a), f(b), c, d, w);
const rot = (p: Pt, s: string, c: Color, dx = 0, dy = 0, size = 18): Item => txt([p[0] + dx, p[1] + dy], s, c, size);
const rA = (p: P3, s: string, c: Color, dx = 0, dy = 0, size = 18): Item => rot(I(p), s, c, dx, dy, size);

/** Los tres ejes del triedro. `neg` dibuja también la parte negativa, a trazos. */
const ejes = (l = 170, neg = 0, f: Vista = I, nombres = true): Item[] => {
  const e: P3[] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const k = (v: P3, t: number): P3 => [v[0] * t, v[1] * t, v[2] * t];
  const o = f(O3);
  const fin = [f([l + 14, 0, 0]), f([0, l + 14, 0]), f([0, 0, l + 8])];
  return [
    ...e.flatMap((v) => [seg(o, f(k(v, l)), "blanco", false, 2.4), ...(neg ? [seg(o, f(k(v, -neg)), "blanco", true, 1.5)] : [])]),
    ...(nombres ? [txt([fin[0]![0], fin[0]![1] + 8], "X", "blanco", 19), txt([fin[1]![0], fin[1]![1] + 8], "Y", "blanco", 19), txt([fin[2]![0], fin[2]![1] - 4], "Z", "blanco", 19), txt([o[0] - 13, o[1] - 5], "O", "blanco", 16)] : []),
  ];
};

/* ───────────── Geometría plana auxiliar ───────────── */

const corte = (a: Pt, b: Pt, c: Pt, d: Pt): Pt => {
  const r: Pt = [b[0] - a[0], b[1] - a[1]];
  const s: Pt = [d[0] - c[0], d[1] - c[1]];
  const t = ((c[0] - a[0]) * s[1] - (c[1] - a[1]) * s[0]) / (r[0] * s[1] - r[1] * s[0]);
  return [a[0] + r[0] * t, a[1] + r[1] * t];
};
/** Pie de la perpendicular desde `p` a la recta `ab`. */
const pie = (p: Pt, a: Pt, b: Pt): Pt => {
  const d: Pt = [b[0] - a[0], b[1] - a[1]];
  const t = ((p[0] - a[0]) * d[0] + (p[1] - a[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]);
  return [a[0] + d[0] * t, a[1] + d[1] * t];
};
const hacia = (a: Pt, b: Pt, d: number): Pt => {
  const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return [a[0] + ((b[0] - a[0]) * d) / l, a[1] + ((b[1] - a[1]) * d) / l];
};
const alarga = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
/** Marca de ángulo recto en `v`, con lados hacia `a` y hacia `b`. */
const recto = (v: Pt, a: Pt, b: Pt, s = 9): Item => {
  const p = hacia(v, a, s);
  const q = hacia(v, b, s);
  return lin([p, [p[0] + q[0] - v[0], p[1] + q[1] - v[1]], q], AUX, false, 1.6);
};
/** Elipse de centro `c` con semidiámetros conjugados `u` y `v` (en pantalla). */
const elipse = (c: Pt, u: Pt, v: Pt): Pt[] => Array.from({ length: 73 }, (_, i) => {
  const t = (i / 72) * 2 * Math.PI;
  return [c[0] + Math.cos(t) * u[0] + Math.sin(t) * v[0], c[1] + Math.cos(t) * u[1] + Math.sin(t) * v[1]] as Pt;
});
/** Arco menor de centro `c` que va de `p` a `q`, como línea. */
const arcoPts = (c: Pt, p: Pt, q: Pt): Pt[] => {
  const r = Math.hypot(p[0] - c[0], p[1] - c[1]);
  const a0 = Math.atan2(p[1] - c[1], p[0] - c[0]);
  let da = Math.atan2(q[1] - c[1], q[0] - c[0]) - a0;
  while (da > Math.PI) da -= 2 * Math.PI;
  while (da < -Math.PI) da += 2 * Math.PI;
  return Array.from({ length: 25 }, (_, i) => [c[0] + r * Math.cos(a0 + (da * i) / 24), c[1] + r * Math.sin(a0 + (da * i) / 24)] as Pt);
};

/* ───────────── 1. Fundamentos (págs. 120-121) ───────────── */

const triedro = (): Diagrama => {
  const P: P3 = [120, 55, 125];
  const a = 150;
  return {
    label: "El triedro trirrectángulo: origen, ejes y planos coordenados",
    pasos: [
      { texto: "Tres rectas perpendiculares entre sí que salen de un mismo punto forman un **triedro trirrectángulo**, como la esquina de una habitación. El vértice $O$ es el **origen** y las tres aristas $X$, $Y$, $Z$ son los **ejes del sistema**.", items: ejes(175) },
      { texto: "Los ejes, tomados de dos en dos, definen los tres **planos coordenados**. El plano $XOY$ es el horizontal: el suelo de esa esquina.", items: [poli([I(O3), I([a, 0, 0]), I([a, a, 0]), I([0, a, 0])], C_1, 0.12), rA([a - 22, a - 22, 0], "XOY", C_1, 0, 4)] },
      { texto: "Los planos $XOZ$ y $YOZ$ son los dos verticales: las dos paredes.", items: [poli([I(O3), I([a, 0, 0]), I([a, 0, a]), I([0, 0, a])], C_2, 0.1), poli([I(O3), I([0, a, 0]), I([0, a, a]), I([0, 0, a])], C_3, 0.1), rA([a - 14, 0, a + 4], "XOZ", C_2, 0, -6), rA([0, a - 14, a + 4], "YOZ", C_3, 0, -6)] },
      { texto: "Un punto $P$ del espacio se proyecta **ortogonalmente** sobre cada plano. Sobre $XOY$ da $P'$: la proyectante es paralela al eje $Z$.", items: [sA(P, pr1(P), AUX, true, 1.6), pA(P, "P", C_D, 12, -8), pA(pr1(P), "P′", C_1, 12, 18)] },
      { texto: "Sobre $XOZ$ da $P''$, con la proyectante paralela al eje $Y$, y sobre $YOZ$ da $P'''$, con la proyectante paralela al eje $X$.", items: [sA(P, pr2(P), AUX, true, 1.6), sA(P, pr3(P), AUX, true, 1.6), pA(pr2(P), "P″", C_2, 14, -6), pA(pr3(P), "P‴", C_3, -16, -6)] },
    ],
  };
};

const cuadro = (): Diagrama => {
  /* Vista auxiliar del espacio: el cuadro π es el plano z = 0 y el triedro cuelga por debajo, con su vértice en (O). */
  const W = (p: P3): Pt => [p[0] + 0.4 * p[1], -p[2] - 0.5 * p[1]];
  const ro = 150;
  const d = ro / Math.SQRT2;
  const enCuadro = (g: number): P3 => [ro * Math.cos(rad(g)), ro * Math.sin(rad(g)), 0];
  const A = enCuadro(330), B = enCuadro(210), C = enCuadro(90);
  const V: P3 = [0, 0, -d];
  const fin = (q: P3) => W(mix(V, q, 1.38));
  const plano = [W([-185, -110, 0]), W([185, -110, 0]), W([185, 190, 0]), W([-185, 190, 0])];
  const D: Pt = [455, -5];
  const eje = (g: number, l = 120): Pt => [D[0] + l * Math.cos(rad(g)), D[1] - l * Math.sin(rad(g))];
  return {
    label: "El plano del cuadro: cómo pasan los ejes del espacio al papel",
    pasos: [
      { texto: "El triedro está en el espacio, con su vértice $(O)$ y sus ejes $(X)$, $(Y)$, $(Z)$. Los paréntesis indican que son los elementos **reales**, no su dibujo.", items: [txt([30, -175], "En el espacio", AUX, 15), seg(W(V), fin(A), "blanco", false, 2.4), seg(W(V), fin(B), "blanco", false, 2.4), seg(W(V), fin(C), "blanco", false, 2.4), p2(W(V), "(O)", "blanco", 20, 14), rot(fin(A), "(X)", "blanco", 18, 0), rot(fin(B), "(Y)", "blanco", -18, 0), rot(fin(C), "(Z)", "blanco", 16, 0)] },
      { texto: "Se proyecta sobre un cuarto plano, que no contiene a ningún eje ni es una cara del triedro: el **plano del cuadro** $\\pi$, que es el papel. Corta a los ejes en $A$, $B$ y $C$.", items: [poli(plano, AUX, 0.12), rot(plano[0]!, "π", AUX, 22, -8, 20), p2(W(A), "A", C_D, 14, 14), p2(W(B), "B", C_D, -6, 20), p2(W(C), "C", C_D, -14, -4)] },
      { texto: "La proyección es **ortogonal**: las proyectantes son perpendiculares al cuadro. El origen $(O)$ se proyecta en $O$, y cada eje, en una recta que pasa por $O$.", items: [fl(W(V), W(O3), RES, 2.4), seg(W(O3), W(A), C_D, false, 3.2), seg(W(O3), W(B), C_D, false, 3.2), seg(W(O3), W(C), C_D, false, 3.2), p2(W(O3), "O", RES, -12, -6)] },
      { texto: "Esto es lo que queda en el papel: tres rectas $X$, $Y$, $Z$ que concurren en $O$. Sobre ellas se dibuja la perspectiva.", items: [txt([D[0], -175], "En el dibujo", AUX, 15), seg(D, eje(330), C_D, false, 3.2), seg(D, eje(210), C_D, false, 3.2), seg(D, eje(90), C_D, false, 3.2), p2(D, "O", RES, -13, -5), rot(eje(330, 135), "X", "blanco", 0, 8), rot(eje(210, 135), "Y", "blanco", 0, 8), rot(eje(90, 130), "Z", "blanco", 0, 0)] },
      { texto: "Los ejes proyectados forman entre sí los ángulos $\\varepsilon = \\widehat{XOY}$, $\\omega = \\widehat{XOZ}$ y $\\rho = \\widehat{ZOY}$, que suman $360°$.", items: [arc(D, 30, -30, 90, C_2), arc(D, 36, 90, 210, C_3), arc(D, 42, 210, 330, C_1), rot(eje(30, 46), "ω", C_2, 0, 6), rot(eje(150, 52), "ρ", C_3, 0, 6), rot(eje(270, 58), "ε", C_1, 0, 6)] },
    ],
  };
};

const cuatroProyecciones = (): Diagrama => {
  const P: P3 = [125, 60, 120];
  const L: P3 = [P[0], 0, 0], M: P3 = [0, P[1], 0], N: P3 = [0, 0, P[2]];
  return {
    label: "Las cuatro proyecciones de un punto: dadas dos, se hallan las demás",
    pasos: [
      { texto: "Un punto suelto en el dibujo no dice dónde está en el espacio: hace falta otra proyección. Aquí se conocen la **directa** $P$ y la proyección $P'$ sobre $XOY$. El segmento $PP'$ es paralelo al eje $Z$.", items: [...ejes(175), sA(P, pr1(P), AUX, true, 1.6), pA(P, "P", C_D, 12, -8), pA(pr1(P), "P′", C_1, 12, 18)] },
      { texto: "Por $P'$ se trazan las paralelas a los ejes $X$ e $Y$: cortan a los ejes en $M$ y en $L$.", items: [sA(pr1(P), L, AUX, false, 1.8), sA(pr1(P), M, AUX, false, 1.8), pA(L, "L", "blanco", 6, -10), pA(M, "M", "blanco", -6, -10)] },
      { texto: "Por $L$ y $M$ se levantan paralelas al eje $Z$, y por $P$, paralelas a los ejes $Y$ y $X$. Donde se cortan están $P''$ y $P'''$.", items: [sA(L, pr2(P), AUX, false, 1.8), sA(M, pr3(P), AUX, false, 1.8), sA(P, pr2(P), AUX, true, 1.6), sA(P, pr3(P), AUX, true, 1.6), pA(pr2(P), "P″", C_2, 14, -6), pA(pr3(P), "P‴", C_3, -16, -6)] },
      { texto: "Cerrando con el punto $N$ del eje $Z$ se forma un **paralelepípedo**. Sus aristas son las coordenadas del punto: $x = OL$, $y = OM$, $z = ON$.", items: [sA(N, pr2(P), AUX, false, 1.8), sA(N, pr3(P), AUX, false, 1.8), pA(N, "N", "blanco", 12, -6), sA(O3, L, C_2, false, 4), sA(O3, M, C_3, false, 4), sA(O3, N, C_1, false, 4), rA(mix(O3, L, 0.5), "x", C_2, -6, 18), rA(mix(O3, M, 0.5), "y", C_3, 6, 18), rA(mix(O3, N, 0.55), "z", C_1, 12, 4)] },
      { texto: "En total hay **cuatro proyecciones**: la directa y las tres sobre los planos del triedro, todas dibujadas en el mismo papel. Con **dos** cualesquiera el punto queda definido, y las otras dos se deducen con paralelas a los ejes.", items: [circ(I(P), 9, C_D), circ(I(pr1(P)), 9, C_1), circ(I(pr2(P)), 9, C_2), circ(I(pr3(P)), 9, C_3)] },
    ],
  };
};

const triangulo = (): Diagrama => {
  const A: Pt = [150, 90], B: Pt = [-130, 90], C: Pt = [30, -150];
  const H = pie(C, A, B), Ip = pie(B, A, C), J = pie(A, B, C);
  const O = corte(C, H, A, J);
  return {
    label: "El triángulo fundamental: los ejes son sus alturas",
    pasos: [
      { texto: "El cuadro corta a los ejes en $A$, $B$ y $C$, y a las caras del triedro, según los lados del triángulo $ABC$. Es el **triángulo fundamental**, o triángulo de trazas del cuadro.", items: [poli([A, B, C], AUX, 0.08), p2(A, "A", C_D, 2, 22), p2(B, "B", C_D, -2, 22), p2(C, "C", C_D, 14, -6), rot([(A[0] + B[0]) / 2, A[1]], "π₁", AUX, 50, 20), rot([(A[0] + C[0]) / 2, (A[1] + C[1]) / 2], "π₂", AUX, 20, -10), rot([(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], "π₃", AUX, -22, -10)] },
      { texto: "Los ejes proyectados pasan por los vértices y son **perpendiculares al lado opuesto**: son las **alturas** del triángulo, y $O$ es el punto donde se cortan.", items: [seg(alarga(O, A, 1.22), J, C_D, false, 3), seg(alarga(O, B, 1.22), Ip, C_D, false, 3), seg(alarga(O, C, 1.16), H, C_D, false, 3), recto(H, A, C), recto(Ip, C, B), recto(J, B, A), p2(O, "O", RES, 14, -6), rot(alarga(O, A, 1.22), "X", "blanco", 14, 8), rot(alarga(O, B, 1.22), "Y", "blanco", -14, 8), rot(alarga(O, C, 1.16), "Z", "blanco", 14, 4)] },
      { texto: "Por eso basta el triángulo fundamental para definir el sistema. Los pies de las alturas, $H$, $I$ y $J$, forman otro triángulo del que los ejes son las **bisectrices**. Si $ABC$ es equilátero, los ejes forman 120°.", items: [poli([H, Ip, J], C_1, 0.1, true), p2(H, "H", C_1, 12, 18), p2(Ip, "I", C_1, 14, -4), p2(J, "J", C_1, -14, -4)] },
    ],
  };
};

const notacion = (): Diagrama => {
  const A: P3 = [120, 55, 125];
  const r1: P3 = [140, 30, 150], r2: P3 = [30, 130, 70];
  const pa: P3 = [140, 0, 0], pb: P3 = [0, 120, 0], pc: P3 = [0, 0, 115];
  return {
    label: "Notación de puntos, rectas y planos",
    pasos: [
      { texto: "**Punto**: $A(A'\\text{-}A''\\text{-}A''')$. $A$ es la proyección directa; $A'$, la proyección sobre $XOY$; $A''$, sobre $XOZ$, y $A'''$, sobre $YOZ$.", dura: 1, base: ejes(175), items: [sA(A, pr1(A), AUX, true, 1.6), sA(A, pr2(A), AUX, true, 1.6), sA(A, pr3(A), AUX, true, 1.6), pA(A, "A", C_D, 12, -8), pA(pr1(A), "A′", C_1, 12, 18), pA(pr2(A), "A″", C_2, 14, -6), pA(pr3(A), "A‴", C_3, -16, -6)] },
      { texto: "**Recta**: una letra minúscula, $r(r'\\text{-}r''\\text{-}r''')$, con el mismo orden. Aquí, la directa $r$ y su proyección $r'$ sobre $XOY$.", dura: 1, items: [sA(r1, r2, C_D, false, 3.4), sA(pr1(r1), pr1(r2), C_1, false, 3), sA(r1, pr1(r1), AUX, true, 1.4), sA(r2, pr1(r2), AUX, true, 1.4), rA(r1, "r", C_D, 12, -4), rA(pr1(r1), "r′", C_1, 14, 6)] },
      { texto: "**Plano**: una letra griega, $\\alpha(\\alpha_1\\text{-}\\alpha_2\\text{-}\\alpha_3)$. $\\alpha_1$, $\\alpha_2$ y $\\alpha_3$ son sus trazas: las rectas donde corta a $XOY$, a $XOZ$ y a $YOZ$.", items: [poli([I(pa), I(pb), I(pc)], AUX, 0.1), sA(pa, pb, C_1, false, 3.4), sA(pa, pc, C_2, false, 3.4), sA(pb, pc, C_3, false, 3.4), rA(mix(pa, pb, 0.5), "α₁", C_1, 0, 22), rA(mix(pa, pc, 0.5), "α₂", C_2, 18, -4), rA(mix(pb, pc, 0.5), "α₃", C_3, -18, -4)] },
    ],
  };
};

/* ───────────── 2. Isométrico y escala (págs. 122-123) ───────────── */

/** Axonometría ortogonal cualquiera: giro `beta` alrededor de Z e inclinación `alfa` de la visual. Da medidas ya reducidas. */
const axo = (o: Pt, beta: number, alfa: number, u = 1) => (p: P3): Pt => {
  const b = rad(beta), a = rad(alfa);
  return [o[0] + u * (p[0] * Math.cos(b) - p[1] * Math.sin(b)), o[1] + u * ((p[0] * Math.sin(b) + p[1] * Math.cos(b)) * Math.sin(a) - p[2] * Math.cos(a))];
};
/** Cubo de arista `a` en una vista: las tres caras vistas y las tres aristas que salen del origen, cada una de un color. */
const cuboEjes = (f: Vista, a: number): Item[] => [
  poli([f([a, 0, 0]), f([a, a, 0]), f([0, a, 0]), f([0, a, a]), f([0, 0, a]), f([a, 0, a])], AUX, 0.06),
  seg(f([a, a, a]), f([a, a, 0]), AUX, false, 1.6), seg(f([a, a, a]), f([a, 0, a]), AUX, false, 1.6), seg(f([a, a, a]), f([0, a, a]), AUX, false, 1.6),
];
/** Las tres aristas que salen del vértice más cercano: una paralela a cada eje, las tres iguales en la realidad. */
const aristas = (f: Vista, a: number): Item[] => [seg(f([a, a, a]), f([0, a, a]), C_2, false, 4), seg(f([a, a, a]), f([a, 0, a]), C_3, false, 4), seg(f([a, a, a]), f([a, a, 0]), C_1, false, 4)];

const isometrico = (): Diagrama => {
  const a = 92;
  const alfaIso = (Math.asin(1 / Math.sqrt(3)) * 180) / Math.PI;
  const f1 = axo([0, 0], 45, alfaIso), f2 = axo([205, -8], 20.7, 19.47), f3 = axo([410, -4], 25, 38);
  const pie2 = (x: number, t: string, s: string, m: string): Item[] => [txt([x, 112], t, C_D, 19), txt([x, 134], s, AUX, 15), txt([x, 154], m, AUX, 14)];
  return {
    label: "Sistemas isométrico, dimétrico y trimétrico",
    pasos: [
      { texto: "Las tres aristas de color miden lo mismo en la realidad. Si los tres ejes forman **el mismo ángulo con el cuadro**, se acortan lo mismo y se proyectan a **120°** entre sí: sistema **isométrico** («igual medida»). Hay un solo coeficiente de reducción.", items: [...cuboEjes(f1, a), ...aristas(f1, a), ...pie2(0, "isométrico", "una sola escala", "0,82 · 0,82 · 0,82")] },
      { texto: "Si solo **dos ejes** forman el mismo ángulo con el cuadro, el sistema es **dimétrico**: dos aristas se acortan igual y la tercera, distinto. Hacen falta dos escalas.", items: [...cuboEjes(f2, a), ...aristas(f2, a), ...pie2(205, "dimétrico", "dos escalas", "0,94 · 0,47 · 0,94")] },
      { texto: "Si los tres ángulos son diferentes, el sistema es **trimétrico**: cada eje tiene su coeficiente. En este tema se trabaja solo con el isométrico, que es el más sencillo y rápido.", items: [...cuboEjes(f3, a), ...aristas(f3, a), ...pie2(410, "trimétrico", "tres escalas", "0,94 · 0,70 · 0,79")] },
    ],
  };
};

const escala = (): Diagrama => {
  const g = (Math.asin(1 / Math.sqrt(3)) * 180) / Math.PI;
  const O: Pt = [0, 60];
  const k = 1.6;
  const enEje = (m: number): Pt => [O[0] - m * k * Math.sin(rad(g)), O[1] - m * k * Math.cos(rad(g))];
  const E = enEje(100);
  const Ep: Pt = [0, E[1]];
  const D: Pt = [330, 20];
  const f = vista(D, k * 0.816);
  return {
    label: "Por qué las medidas se reducen: escala isométrica 0,816 : 1",
    pasos: [
      { texto: "En el isométrico, los tres ejes forman el mismo ángulo con el cuadro: $35°16'$. Aquí se ve uno de ellos de perfil, con el cuadro de canto.", items: [seg([0, -150], [0, 100], "blanco", false, 3), rot([0, -150], "cuadro, de canto", "blanco", 8, -10, 15), seg(O, enEje(125), AUX, false, 2), rot(enEje(125), "eje", AUX, -18, 0, 16), arc(O, 46, 90, 90 + g, C_1), rot(O, "35°16′", C_1, -40, 18, 15)] },
      { texto: "Sobre el eje se toma una medida real: por ejemplo, 100.", items: [seg(O, E, C_D, false, 4.4), p2(E, undefined, C_D), rot(enEje(58), "real: 100", C_D, -56, 4, 16)] },
      { texto: "Al proyectarla perpendicularmente sobre el cuadro se acorta: en el dibujo mide $100 \\cdot \\cos 35°16' = 81{,}6$.", items: [fl(E, Ep, AUX, 1.8), seg(O, Ep, RES, false, 4.4), p2(Ep, undefined, RES), rot([0, (O[1] + Ep[1]) / 2], "en el dibujo: 81,6", RES, 84, 4, 16)] },
      { texto: "Como los tres ejes forman el mismo ángulo, la reducción es la misma en los tres: es la **escala isométrica 0,816 : 1**. Toda medida paralela a un eje se dibuja multiplicada por 0,816.", items: [seg(D, f([125, 0, 0]), "blanco", false, 2.2), seg(D, f([0, 125, 0]), "blanco", false, 2.2), seg(D, f([0, 0, 125]), "blanco", false, 2.2), seg(D, f([100, 0, 0]), RES, false, 4.4), seg(D, f([0, 100, 0]), RES, false, 4.4), seg(D, f([0, 0, 100]), RES, false, 4.4), rot(f([50, 0, 0]), "81,6", RES, 16, -12, 15), rot(f([0, 50, 0]), "81,6", RES, -16, -12, 15), rot(f([0, 0, 50]), "81,6", RES, 26, 4, 15), rot(f([136, 0, 0]), "X", "blanco", 0, 8), rot(f([0, 136, 0]), "Y", "blanco", 0, 8), rot(f([0, 0, 134]), "Z", "blanco")] },
    ],
  };
};

const sinReducir = (): Diagrama => {
  const cubo = (f: Vista, a: number, c: Color): Item[] => [
    poli([f([a, 0, 0]), f([a, a, 0]), f([0, a, 0]), f([0, a, a]), f([0, 0, a]), f([a, 0, a])], c, 0.1),
    seg(f([a, a, a]), f([a, a, 0]), c, false, 2.6), seg(f([a, a, a]), f([a, 0, a]), c, false, 2.6), seg(f([a, a, a]), f([0, a, a]), c, false, 2.6),
  ];
  const a = 100;
  const f1 = vista([0, 0], 1.1 * 0.816), f2 = vista([290, 0], 1.1);
  return {
    label: "Perspectivas sin reducir: iguales de forma, un 22 % mayores",
    pasos: [
      { texto: "Un cubo de arista 100 dibujado **con reducción**: cada arista mide 81,6 en el papel. Es la perspectiva exacta.", items: [...cubo(f1, a, C_2), rot(f1([a, a / 2, 0]), "81,6", C_2, -6, 24, 16), txt([0, 150], "con reducción", C_2, 17)] },
      { texto: "En el dibujo industrial se suele **no reducir**: la cota 100 se lleva tal cual sobre los ejes. Se ahorra el cambio de escala.", items: [...cubo(f2, a, C_1), rot(f2([a, a / 2, 0]), "100", C_1, -6, 24, 16), txt([290, 150], "sin reducir", C_1, 17)] },
      { texto: "El resultado es una perspectiva **semejante**, con la misma forma, pero mayor: $1 : 0{,}816 = 1{,}22$, es decir, un 22 % más grande.", items: [txt([145, -150], "× 1,22", RES, 22), fl([85, -118], [205, -118], RES, 2.4)] },
    ],
  };
};

/* ───────────── 3. La circunferencia (págs. 129-131) ───────────── */

const circunferencia = (): Diagrama => {
  const R = 82;
  const r = R * 0.816;
  const c0: Pt = [-200, 0];
  const c: Pt = [110, 0];
  const f = vista(c);
  const A = f([-r, 0, 0]), B = f([r, 0, 0]), C = f([0, r, 0]), Dd = f([0, -r, 0]);
  return {
    label: "La circunferencia en perspectiva isométrica: elipse inscrita en un rombo",
    pasos: [
      { texto: "Una circunferencia de radio $R$ en verdadera forma, con dos diámetros perpendiculares, $AB$ y $CD$, y el cuadrado circunscrito, que la toca en $A$, $B$, $C$ y $D$.", items: [poli([[c0[0] - R, c0[1] - R], [c0[0] + R, c0[1] - R], [c0[0] + R, c0[1] + R], [c0[0] - R, c0[1] + R]], AUX, 0.05), circ(c0, R, C_2), seg([c0[0], c0[1] - R], [c0[0], c0[1] + R], AUX, true, 1.6), seg([c0[0] - R, c0[1]], [c0[0] + R, c0[1]], AUX, true, 1.6), p2([c0[0], c0[1] - R], "A", C_2, 0, -10), p2([c0[0], c0[1] + R], "B", C_2, 0, 22), p2([c0[0] - R, c0[1]], "C", C_2, -14, 6), p2([c0[0] + R, c0[1]], "D", C_2, 14, 6), txt([c0[0], c0[1] + R + 46], "verdadera forma", AUX, 15)] },
      { texto: "En el plano $XOY$, los dos diámetros se dibujan **paralelos a los ejes** $X$ e $Y$. Los cuatro radios miden $r$: el radio real reducido con la escala isométrica.", items: [seg(A, B, AUX, true, 1.6), seg(C, Dd, AUX, true, 1.6), p2(A, "A", C_2, -12, -8), p2(B, "B", C_2, 12, 18), p2(C, "C", C_2, -12, 18), p2(Dd, "D", C_2, 12, -8), p2(c, undefined, "blanco"), rot(alarga(c, B, 1.75), "∥ X", AUX, 0, 6, 15), rot(alarga(c, C, 1.75), "∥ Y", AUX, 0, 6, 15), txt([c[0], c0[1] + R + 46], "en el plano XOY", AUX, 15)] },
      { texto: "Por $A$, $B$, $C$ y $D$ se trazan las tangentes, cada una paralela al otro diámetro. Forman un **rombo**: es la perspectiva del cuadrado circunscrito.", items: [poli([f([r, r, 0]), f([r, -r, 0]), f([-r, -r, 0]), f([-r, r, 0])], AUX, 0.05)] },
      { texto: "La circunferencia se ve como una **elipse** inscrita en el rombo, tangente a sus lados en $A$, $B$, $C$ y $D$. Se traza a mano alzada o con plantilla.", items: [lin(elipse(c, [r * C30, r * 0.5], [-r * C30, r * 0.5]), C_1, false, 3.6)] },
      { texto: "Una ayuda para trazarla: el **eje mayor** de la elipse es perpendicular a la dirección del eje $Z$ y mide lo mismo que el diámetro real, $2R$. El eje menor es paralelo al eje $Z$.", items: [seg([c[0] - R, c[1]], [c[0] + R, c[1]], RES, false, 2.6), seg([c[0], c[1] - r * Math.SQRT1_2], [c[0], c[1] + r * Math.SQRT1_2], RES, true, 2), txt([c[0], c[1] - R * 0.72 - 26], "eje mayor = 2R", RES, 15)] },
    ],
  };
};

const circunferenciaPlanos = (): Diagrama => {
  const R = 62;
  const r = R * 0.816;
  const g = r + 24;
  /** Elipse en el plano de centro `c` y ejes `e1`, `e2`, con su rombo y su eje mayor (perpendicular al eje `e3`). */
  const una = (c: P3, e1: P3, e2: P3, e3: P3, col: Color): Item[] => {
    const q = (a: number, b: number): Pt => I([c[0] + a * e1[0] + b * e2[0], c[1] + a * e1[1] + b * e2[1], c[2] + a * e1[2] + b * e2[2]]);
    const o = I(c);
    const u = q(r, 0), v = q(0, r);
    const d3 = I(e3);
    const n = Math.hypot(d3[0], d3[1]);
    const m: Pt = [(-d3[1] / n) * R, (d3[0] / n) * R];
    return [
      poli([q(r, r), q(r, -r), q(-r, -r), q(-r, r)], AUX, 0.05), seg(q(-r, 0), q(r, 0), AUX, true, 1.3), seg(q(0, -r), q(0, r), AUX, true, 1.3),
      lin(elipse(o, [u[0] - o[0], u[1] - o[1]], [v[0] - o[0], v[1] - o[1]]), col, false, 3.4),
      seg([o[0] - m[0], o[1] - m[1]], [o[0] + m[0], o[1] + m[1]], RES, false, 2.4),
    ];
  };
  return {
    label: "La circunferencia en los tres planos del triedro",
    pasos: [
      { texto: "En el plano $XOY$: diámetros paralelos a $X$ y a $Y$, rombo y elipse. El **eje mayor** (en rojo) es perpendicular al eje $Z$, el que no está en ese plano.", items: [...ejes(165), ...una([g, g, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], C_1), rA([g, g, 0], "XOY", C_1, 0, 78, 15)] },
      { texto: "En el plano $XOZ$ se hace igual, con los diámetros paralelos a $X$ y a $Z$. Ahora el eje mayor es perpendicular a la dirección del eje $Y$.", items: [...una([g, 0, g], [1, 0, 0], [0, 0, 1], [0, 1, 0], C_2), rA([g, 0, g], "XOZ", C_2, 58, -62, 15)] },
      { texto: "Y en el plano $YOZ$, con los diámetros paralelos a $Y$ y a $Z$, el eje mayor es perpendicular a la dirección del eje $X$. En los tres casos mide el diámetro real, $2R$.", items: [...una([0, g, g], [0, 1, 0], [0, 0, 1], [1, 0, 0], C_3), rA([0, g, g], "YOZ", C_3, -58, -62, 15)] },
    ],
  };
};

const puntosElipse = (): Diagrama => {
  const R = 85;
  const c0: Pt = [-200, 0];
  const c: Pt = [120, 0];
  const r = R * 0.9;
  /** Coordenadas del cuadrado (u a la derecha, v hacia arriba, de −1 a 1) en la figura real y en la perspectiva. */
  const real = (u: number, v: number): Pt => [c0[0] + u * R, c0[1] - v * R];
  const persp = (u: number, v: number): Pt => [c[0] + (u + v) * r * C30, c[1] + (u - v) * r * 0.5];
  const dibujo = (q: (u: number, v: number) => Pt): { marco: Item[]; puntos: Item[]; rectas: Item[]; P: Item } => ({
    marco: [poli([q(1, 1), q(1, -1), q(-1, -1), q(-1, 1)], AUX, 0.05), seg(q(-1, 0), q(1, 0), AUX, true, 1.3), seg(q(0, -1), q(0, 1), AUX, true, 1.3)],
    puntos: [p2(q(0, 1), "A", C_2, -10, -8), p2(q(0, -1), "B", C_2, -10, 20), p2(q(0.5, 0), "1", "blanco", -2, 20), p2(q(1, 0.5), "2", "blanco", 14, 2)],
    rectas: [seg(q(0, 1), q(1, 0.5), C_D, false, 2.2), seg(q(0, -1), q(0.8, 0.6), C_D, false, 2.2)],
    P: p2(q(0.8, 0.6), "P", RES, 8, -10),
  });
  const a = dibujo(real), b = dibujo(persp);
  const otros = (q: (u: number, v: number) => Pt): Item[] => [p2(q(-0.8, 0.6), "Q", RES, -8, -10), p2(q(-0.8, -0.6), "R", RES, -10, 18), p2(q(0.8, -0.6), "S", RES, 10, 18)];
  return {
    label: "Puntos auxiliares de la elipse: rectas A-2 y B-1",
    pasos: [
      { texto: "Si la elipse es grande, conviene tener algún punto más. En el cuadrado circunscrito: $1$ es el punto medio del radio y $2$, el punto medio de medio lado.", items: [...a.marco, circ(c0, R, AUX, 0, true), ...a.puntos, txt([c0[0], R + 40], "verdadera forma", AUX, 15)] },
      { texto: "Las rectas $A\\text{-}2$ y $B\\text{-}1$ se cortan en $P$, que es un punto de la circunferencia.", items: [...a.rectas, a.P] },
      { texto: "En la perspectiva se hace lo mismo sobre el rombo: los puntos medios siguen siendo puntos medios, y las dos rectas dan un punto $P$ de la elipse.", items: [...b.marco, ...b.puntos, ...b.rectas, b.P, txt([c[0], R + 40], "en perspectiva", AUX, 15)] },
      { texto: "Repitiéndolo en los otros tres cuadrantes salen $Q$, $R$ y $S$. Con ellos y los cuatro puntos de tangencia, la elipse se traza a mano con seguridad.", items: [...otros(persp), lin(elipse(c, [r * C30, r * 0.5], [r * C30, -r * 0.5]), C_1, false, 3.4)] },
    ],
  };
};

const ovalo = (): Diagrama => {
  const a = 88;
  const Vt: Pt = [0, -a], Vb: Pt = [0, a], Vr: Pt = [2 * a * C30, 0], Vl: Pt = [-2 * a * C30, 0];
  const m = (sx: number, sy: number): Pt => [sx * a * C30, sy * a * 0.5];
  const C1: Pt = [-a / Math.sqrt(3), 0], C3: Pt = [a / Math.sqrt(3), 0];
  return {
    label: "El óvalo isométrico de cuatro centros",
    pasos: [
      { texto: "En isométrica sin reducir, el cuadrado circunscrito a la circunferencia se ve como un rombo de lado $2R$. Los puntos medios de sus lados son los **puntos de tangencia**.", items: [poli([Vt, Vr, Vb, Vl], AUX, 0.06), ...[m(1, 1), m(1, -1), m(-1, -1), m(-1, 1)].map((q) => p2(q, undefined, C_2))] },
      { texto: "Los vértices de ángulo **obtuso**, $C_2$ y $C_4$, son dos de los centros. Cada uno se une con los puntos medios de los dos lados opuestos.", items: [seg(Vt, m(1, 1), AUX, false, 1.6), seg(Vt, m(-1, 1), AUX, false, 1.6), seg(Vb, m(1, -1), AUX, false, 1.6), seg(Vb, m(-1, -1), AUX, false, 1.6), p2(Vt, "C₄", RES, 16, -6), p2(Vb, "C₂", RES, 16, 16)] },
      { texto: "Esas rectas se cortan en $C_1$ y $C_3$, sobre la diagonal mayor del rombo: son los otros dos centros.", items: [seg(Vl, Vr, AUX, true, 1.3), p2(C1, "C₁", RES, -16, -8), p2(C3, "C₃", RES, 16, -8)] },
      { texto: "Con centro en $C_4$ y en $C_2$ se trazan los dos arcos grandes, cada uno de un punto de tangencia al otro.", items: [lin(arcoPts(Vt, m(-1, 1), m(1, 1)), C_1, false, 3.6), lin(arcoPts(Vb, m(-1, -1), m(1, -1)), C_1, false, 3.6)] },
      { texto: "Con centro en $C_1$ y en $C_3$, los dos arcos pequeños cierran el **óvalo**. Es una aproximación a la elipse, algo achatada en los extremos, pero se traza con el compás.", items: [lin(arcoPts(C1, m(-1, -1), m(-1, 1)), C_D, false, 3.6), lin(arcoPts(C3, m(1, -1), m(1, 1)), C_D, false, 3.6)] },
    ],
  };
};

const rayados = (): Diagrama => {
  const s = 105;
  const A: P3 = [0, 0, s], B: P3 = [0, s, 0], C: P3 = [s, 0, 0];
  const f = vista([330, 40]);
  const a = 100;
  /** Rayado de una cara del cubo: paralelas a la diagonal que une los extremos de sus dos aristas. */
  const raya = (o: P3, e1: P3, e2: P3, c: Color): Item[] => {
    const q = (u: number, v: number): Pt => f([o[0] + a * (u * e1[0] + v * e2[0]), o[1] + a * (u * e1[1] + v * e2[1]), o[2] + a * (u * e1[2] + v * e2[2])]);
    return [
      poli([q(0, 0), q(1, 0), q(1, 1), q(0, 1)], c, 0.06),
      ...[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75].map((k) => (k <= 1 ? seg(q(k, 0), q(0, k), c, false, 1.5) : seg(q(1, k - 1), q(k - 1, 1), c, false, 1.5))),
    ];
  };
  return {
    label: "Rayado de las secciones en perspectiva isométrica",
    pasos: [
      { texto: "Las superficies que deja un corte se rayan, y la dirección del rayado depende del plano en que esté el corte. Para hallarla, sobre cada eje se toma el mismo segmento $s$, de cualquier longitud: $OA = OB = OC$.", items: [...ejes(150), sA(O3, A, AUX, false, 3.6), sA(O3, B, AUX, false, 3.6), sA(O3, C, AUX, false, 3.6), pA(A, "A", "blanco", 14, 0), pA(B, "B", "blanco", -4, -12), pA(C, "C", "blanco", 4, -12)] },
      { texto: "Los lados del triángulo $ABC$ dan las tres direcciones: $d_1$ para los cortes paralelos a $XOY$, $d_2$ para los paralelos a $XOZ$ y $d_3$ para los paralelos a $YOZ$.", items: [sA(B, C, C_1, false, 3.4), sA(A, C, C_2, false, 3.4), sA(A, B, C_3, false, 3.4), rA(mix(B, C, 0.5), "d₁", C_1, 0, 22), rA(mix(A, C, 0.5), "d₂", C_2, 18, -6), rA(mix(A, B, 0.5), "d₃", C_3, -18, -6)] },
      { texto: "Aplicado a un cubo: la cara de arriba, paralela a $XOY$, se raya con $d_1$; las otras dos, con $d_2$ y $d_3$. Así se distingue a simple vista en qué plano está cada corte.", items: [...raya([0, 0, a], [1, 0, 0], [0, 1, 0], C_1), ...raya([0, a, 0], [1, 0, 0], [0, 0, 1], C_2), ...raya([a, 0, 0], [0, 1, 0], [0, 0, 1], C_3)] },
    ],
  };
};

/* ───────────── 4. Punto y recta (págs. 123-125) ───────────── */

const puntoTriedros = (): Diagrama => {
  /** Camino desde el origen hasta el punto: x sobre el eje, y en paralelo a Y, z en vertical. */
  const camino = (p: P3): Item[] => [sA(O3, [p[0], 0, 0], C_2, false, 4), sA([p[0], 0, 0], pr1(p), C_3, false, 4), sA(pr1(p), p, C_1, false, 4)];
  const fijo = (p: P3, n: string, dx: number, dy: number, dx1: number, dy1: number): Item[] => [sA(pr1(p), p, AUX, true, 1.5), pA(p, n, C_D, dx, dy), pA(pr1(p), `${n}′`, C_1, dx1, dy1)];
  const A: P3 = [120, 50, 70], B: P3 = [100, -90, 60], C: P3 = [-70, -110, 90], D: P3 = [-60, 110, 70];
  const fin = (p: P3, s: string): Item => rA(p, s, AUX, 0, 0, 15);
  return {
    label: "El punto en los distintos triedros: sentidos de las coordenadas",
    pasos: [
      { texto: "Los tres planos del sistema dividen el espacio en **ocho triedros**. Cada uno se nombra con el sentido, $+$ o $-$, de cada eje a partir del origen. La parte negativa de los ejes se dibuja a trazos.", items: [...ejes(170, 150), fin([-162, 0, 0], "−X"), fin([0, -162, 0], "−Y"), fin([0, 0, -166], "−Z")] },
      { texto: "Punto $A$, en el triedro $+X$, $+Y$, $+Z$. Se llega a él avanzando $x$ sobre el eje $X$, después $y$ en paralelo al eje $Y$, hasta $A'$, y por último $z$ hacia arriba.", dura: 1, base: fijo(A, "A", 12, -8, 12, 18), items: camino(A) },
      { texto: "Punto $B$, en el triedro $+X$, $-Y$, $+Z$: la coordenada $y$ se lleva hacia el lado negativo del eje $Y$.", dura: 1, base: fijo(B, "B", 12, -8, 14, 16), items: camino(B) },
      { texto: "Punto $C$, en el triedro $-X$, $-Y$, $+Z$: las dos primeras coordenadas son negativas. Su proyección $C'$ queda al fondo, detrás del eje $Z$.", dura: 1, base: fijo(C, "C", 12, -8, 14, 14), items: camino(C) },
      { texto: "Punto $D$, en el triedro $-X$, $+Y$, $+Z$. Los cuatro tienen $z$ positiva; con $z$ negativa quedarían los otros cuatro triedros, por debajo del plano $XOY$.", base: fijo(D, "D", -12, -8, -14, 16), items: camino(D) },
    ],
  };
};

const recta = (): Diagrama => {
  const T3: P3 = [0, 110, 120], T1: P3 = [110, 40, 0];
  const en = (t: number): P3 => mix(T3, T1, t);
  const T2 = en(110 / 70);
  const P = en(0.25), Q = en(0.65);
  return {
    label: "Proyecciones de una recta y sus trazas con los planos del triedro",
    pasos: [
      { texto: "Una recta queda definida por dos de sus puntos. Aquí, $P$ y $Q$, cada uno con su proyección sobre el plano $XOY$.", items: [...ejes(200), sA(P, pr1(P), AUX, true, 1.5), sA(Q, pr1(Q), AUX, true, 1.5), pA(P, "P", C_D, 10, -10), pA(Q, "Q", C_D, 8, -10), pA(pr1(P), "P′", C_1, -6, 20), pA(pr1(Q), "Q′", C_1, 0, 20)] },
      { texto: "Se unen las proyecciones del mismo nombre: la proyección directa $r$ pasa por $P$ y $Q$, y la horizontal $r'$, por $P'$ y $Q'$.", items: [sA(en(-0.12), T1, C_D, false, 3.2), sA(pr1(T3), pr1(T2), C_1, false, 3), rA(en(-0.12), "r", C_D, -8, -8), rA(pr1(en(1.3)), "r′", C_1, 0, -10)] },
      { texto: "Las **trazas** de la recta son los puntos donde corta a los planos del triedro. La traza con $XOY$, $T_1$, está donde $r$ corta a su propia proyección $r'$.", items: [pA(T1, "T₁", RES, -4, 22)] },
      { texto: "Donde $r'$ corta al eje $Y$ se levanta una paralela al eje $Z$ hasta $r$: es $T_3$, la traza con el plano $YOZ$.", items: [sA(pr1(T3), T3, AUX, false, 1.8), pA(pr1(T3), undefined, C_1), pA(T3, "T₃", RES, -16, -4)] },
      { texto: "Lo mismo con el eje $X$ da $T_2$, la traza con $XOZ$. Aquí queda por debajo del plano $XOY$: para llegar a ella, la recta ya ha atravesado el suelo.", items: [sA(T1, en(1.72), C_D, true, 2.4), sA(pr1(T2), T2, AUX, false, 1.8), pA(pr1(T2), undefined, C_1), pA(T2, "T₂", RES, 16, 8)] },
    ],
  };
};

const rectasParticulares = (): Diagrama => ({
  label: "Rectas paralelas a un plano coordenado y a un eje",
  pasos: [
    { texto: "**Paralela al plano $XOY$** (horizontal): $r$ y $r'$ son paralelas y no hay traza con $XOY$. Tiene dos trazas, $T_2$ y $T_3$, a la misma altura.", dura: 1, base: ejes(175), items: [sA([0, 95, 115], [125, 0, 115], C_D, false, 3.4), sA([0, 95, 0], [125, 0, 0], C_1, false, 3), sA([0, 95, 0], [0, 95, 115], AUX, true, 1.5), sA([125, 0, 0], [125, 0, 115], AUX, true, 1.5), pA([125, 0, 115], "T₂", RES, 16, -4), pA([0, 95, 115], "T₃", RES, -16, -4), rA([95, 23, 115], "r", C_D, 0, -10), rA([62, 47, 0], "r′", C_1, 0, 22)] },
    { texto: "**Paralela al plano $XOZ$**: su proyección $r'$ es paralela al eje $X$. Tiene traza con $XOY$, $R_1$, y con $YOZ$, $R_3$, pero no con $XOZ$.", dura: 1, items: [sA([0, 85, 100], [130, 85, 0], C_D, false, 3.4), sA([0, 85, 0], [130, 85, 0], C_1, false, 3), sA([0, 85, 0], [0, 85, 100], AUX, true, 1.5), pA([130, 85, 0], "R₁", RES, 14, 16), pA([0, 85, 100], "R₃", RES, -16, -4), rA([30, 85, 77], "r", C_D, 14, -4), rA([70, 85, 0], "r′", C_1, 0, 22)] },
    { texto: "**Paralela al eje $X$**: $r$ y $r'$ son paralelas a $X$. Solo corta al plano $YOZ$, así que tiene una única traza, $R_3$.", dura: 1, items: [sA([0, 85, 125], [150, 85, 125], C_D, false, 3.4), sA([0, 85, 0], [150, 85, 0], C_1, false, 3), sA([0, 85, 0], [0, 85, 125], AUX, true, 1.5), pA([0, 85, 125], "R₃", RES, -16, -4), rA([120, 85, 125], "r", C_D, 0, -10), rA([90, 85, 0], "r′", C_1, 0, 22)] },
    { texto: "**Paralela al eje $Z$**: es vertical. Su proyección sobre $XOY$ se reduce a un punto, $t'$, que coincide con su única traza, $T_1$. Con los demás ejes y planos ocurre lo mismo, cambiando los nombres.", items: [sA([130, 50, 0], [130, 50, 160], C_D, false, 3.4), pA([130, 50, 0], "t′ ≡ T₁", RES, 0, 22), rA([130, 50, 120], "t", C_D, 14, 0), sA([130, 50, 0], [130, 0, 0], AUX, true, 1.5), sA([130, 50, 0], [0, 50, 0], AUX, true, 1.5)] },
  ],
});

const rectasRelativas = (): Diagrama => {
  const P: P3 = [150, 30, 60];
  const mas = (p: P3, d: P3, k: number): P3 => [p[0] + d[0] * k, p[1] + d[1] * k, p[2] + d[2] * k];
  const dr: P3 = [1, -0.6, 0.5], dt: P3 = [0.3, 1, 0.35];
  const par = (o: P3, d: P3, k0: number, k1: number, n: string, dxn = 10): Item[] => {
    const a = mas(o, d, k0), b = mas(o, d, k1);
    return [sA(a, b, C_D, false, 3.2), sA(pr1(a), pr1(b), C_1, false, 2.8), rA(b, n, C_D, dxn, -6), rA(pr1(b), `${n}′`, C_1, dxn, 14)];
  };
  const o2 = mas(P, [-30, -30, 40], 1);
  const o3 = mas(P, [-40, 30, -30], 1);
  return {
    label: "Posiciones relativas de dos rectas: se cortan, son paralelas o se cruzan",
    pasos: [
      { texto: "**Se cortan**: las proyecciones directas $r$ y $t$ se cortan en $P$, las horizontales $r'$ y $t'$ se cortan en $P'$, y los dos puntos están en la misma paralela al eje $Z$. Es un punto real, común a las dos rectas.", dura: 1, base: [...ejes(175), ...par(P, dr, -70, 70, "r")], items: [...par(P, dt, -60, 60, "t", -10), sA(P, pr1(P), AUX, true, 1.6), pA(P, "P", RES, 0, -12), pA(pr1(P), "P′", RES, 0, 24)] },
      { texto: "**Paralelas**: las proyecciones del mismo nombre son paralelas entre sí: $r$ con $s$ y $r'$ con $s'$.", dura: 1, items: par(o2, dr, -70, 70, "s") },
      { texto: "**Se cruzan**: no cumplen ninguna de las dos condiciones. Las proyecciones directas $r$ y $u$ parecen cortarse, pero el cruce de las horizontales no está en la misma paralela al eje $Z$: no hay ningún punto común.", items: par(o3, dt, -60, 60, "u", -10) },
    ],
  };
};

/* ───────────── 5. El plano (págs. 126-128) ───────────── */

const plano = (): Diagrama => {
  const A: P3 = [140, 0, 0], B: P3 = [0, 120, 0], C: P3 = [0, 0, 115];
  return {
    label: "El plano se representa por sus trazas",
    pasos: [
      { texto: "Un plano oblicuo corta a los tres ejes: en $A$ al eje $X$, en $B$ al eje $Y$ y en $C$ al eje $Z$.", items: [...ejes(175), pA(A, "A", "blanco", 6, 20), pA(B, "B", "blanco", -6, 20), pA(C, "C", "blanco", 14, -2)] },
      { texto: "Su **traza** con el plano $XOY$ es la recta $\\alpha_1$, que pasa por $A$ y por $B$: es donde el plano corta al suelo.", items: [sA(A, B, C_1, false, 3.4), rA(mix(A, B, 0.5), "α₁", C_1, 0, 22)] },
      { texto: "Igual con los otros dos planos: la traza $\\alpha_2$, en $XOZ$, pasa por $A$ y $C$, y la traza $\\alpha_3$, en $YOZ$, por $B$ y $C$.", items: [sA(A, C, C_2, false, 3.4), sA(B, C, C_3, false, 3.4), rA(mix(A, C, 0.5), "α₂", C_2, 18, -4), rA(mix(B, C, 0.5), "α₃", C_3, -18, -4)] },
      { texto: "$ABC$ es el **triángulo de trazas**. Dos trazas cualesquiera definen el plano: la tercera es forzada, porque tiene que cerrar el triángulo.", items: [poli([I(A), I(B), I(C)], AUX, 0.14)] },
    ],
  };
};

const planosParticulares = (): Diagrama => {
  const B: P3 = [0, 110, 0], C: P3 = [0, 0, 100];
  const A2: P3 = [130, 0, 0], B2: P3 = [0, 110, 0];
  const P: P3 = [95, 110 * (1 - 95 / 130), 100];
  const T: P3 = [0, 0, 90];
  return {
    label: "Planos paralelos a un eje y a un plano coordenado",
    pasos: [
      { texto: "**Plano paralelo al eje $X$**: no lo corta, así que sus trazas $\\alpha_1$ y $\\alpha_2$ son paralelas a $X$. La traza $\\alpha_3$ une $B$ con $C$.", dura: 1, base: ejes(175), items: [poli([I(B), I([160, 110, 0]), I([160, 0, 100]), I(C)], AUX, 0.12), sA(B, [160, 110, 0], C_1, false, 3.4), sA(C, [160, 0, 100], C_2, false, 3.4), sA(B, C, C_3, false, 3.4), pA(B, "B", "blanco", -8, 20), pA(C, "C", "blanco", -14, -4), rA([110, 110, 0], "α₁", C_1, 0, 22), rA([110, 0, 100], "α₂", C_2, 0, -10), rA(mix(B, C, 0.5), "α₃", C_3, -18, -4)] },
      { texto: "**Plano paralelo al eje $Z$**: sus trazas $\\alpha_2$ y $\\alpha_3$ son verticales. Es proyectante sobre $XOY$: todos sus puntos, como $P$, se proyectan sobre la traza $\\alpha_1$.", dura: 1, items: [poli([I(A2), I(B2), I([0, 110, 140]), I([130, 0, 140])], AUX, 0.12), sA(A2, B2, C_1, false, 3.4), sA(A2, [130, 0, 140], C_2, false, 3.4), sA(B2, [0, 110, 140], C_3, false, 3.4), pA(A2, "A", "blanco", 8, 20), pA(B2, "B", "blanco", -8, 20), rA(mix(A2, B2, 0.75), "α₁", C_1, 0, 22), rA([130, 0, 100], "α₂", C_2, 18, 0), rA([0, 110, 100], "α₃", C_3, -18, 0), sA(P, pr1(P), AUX, true, 1.6), pA(P, "P", C_D, 12, -6), pA(pr1(P), "P′", C_1, 0, -12)] },
      { texto: "**Plano paralelo a $XOY$**: es horizontal, a la altura $OT$. Sus trazas $\\beta_2$ y $\\beta_3$ son paralelas a los ejes $X$ e $Y$, y con $XOY$ no tiene traza.", items: [poli([I(T), I([150, 0, 90]), I([150, 150, 90]), I([0, 150, 90])], AUX, 0.12), sA(T, [150, 0, 90], C_2, false, 3.4), sA(T, [0, 150, 90], C_3, false, 3.4), pA(T, "T", "blanco", 14, -6), rA([110, 0, 90], "β₂", C_2, 8, -12), rA([0, 110, 90], "β₃", C_3, -8, -12)] },
    ],
  };
};

const tresPuntos = (): Diagrama => {
  const L: P3 = [170, 0, 0], M: P3 = [0, 160, 0], N: P3 = [0, 0, 150];
  const z = (x: number, y: number) => 150 * (1 - x / 170 - y / 160);
  const en = (x: number, y: number): P3 => [x, y, z(x, y)];
  const P = en(15, 95), Q = en(60, 15), T = en(110, 35);
  const mas = (p: P3, d: P3, k: number): P3 => [p[0] + d[0] * k, p[1] + d[1] * k, p[2] + d[2] * k];
  const dR: P3 = [Q[0] - P[0], Q[1] - P[1], Q[2] - P[2]];
  const dS: P3 = [Q[0] - T[0], Q[1] - T[1], Q[2] - T[2]];
  const R3 = mas(P, dR, -P[0] / dR[0]);
  const R2 = mas(Q, dR, -Q[1] / dR[1]);
  const S1 = mas(T, dS, -T[2] / dS[2]);
  const S3 = mas(Q, dS, -Q[0] / dS[0]);
  return {
    label: "Trazas de un plano dado por tres puntos",
    pasos: [
      { texto: "Tres puntos no alineados, $P$, $Q$ y $T$, definen un plano. Para dibujar sus trazas se usan las rectas que pasan por ellos.", dura: 3, base: [...ejes(210), pA(P, "P", C_D, -12, -6), pA(Q, "Q", C_D, 4, -12), pA(T, "T", C_D, 14, -2)], items: [sA(P, pr1(P), AUX, true, 1.4), sA(Q, pr1(Q), AUX, true, 1.4), sA(T, pr1(T), AUX, true, 1.4), pA(pr1(P), "P′", C_1, -14, 14), pA(pr1(Q), "Q′", C_1, 14, -2), pA(pr1(T), "T′", C_1, 14, 12)] },
      { texto: "La recta $r$ une $P$ y $Q$. Su proyección $r'$ corta a los ejes $Y$ y $X$; subiendo desde ahí hasta $r$ salen sus trazas $R_3$, en $YOZ$, y $R_2$, en $XOZ$.", dura: 1, base: [sA(R3, R2, C_D, false, 2.6), pA(R3, "R₃", RES, -16, -2), pA(R2, "R₂", RES, 16, -2)], items: [sA(pr1(R3), pr1(R2), C_1, false, 2.4), sA(pr1(R3), R3, AUX, false, 1.6), sA(pr1(R2), R2, AUX, false, 1.6), rA(mix(R3, R2, 0.5), "r", C_D, 0, -10), rA(pr1(mix(R3, R2, 0.18)), "r′", C_1, -6, 20)] },
      { texto: "La recta $s$ une $T$ y $Q$. Corta a su proyección $s'$ en $S_1$, su traza con $XOY$, y desde el eje $Y$ se obtiene $S_3$, su traza con $YOZ$.", dura: 1, base: [sA(S1, S3, C_D, false, 2.6), pA(S1, "S₁", RES, 12, 18), pA(S3, "S₃", RES, -16, -2)], items: [sA(S1, pr1(S3), C_1, false, 2.4), sA(pr1(S3), S3, AUX, false, 1.6), rA(mix(S1, S3, 0.3), "s", C_D, 12, -4), rA(mix(S1, pr1(S3), 0.6), "s′", C_1, -8, 18)] },
      { texto: "Las trazas del plano unen las trazas del mismo nombre de las rectas. La traza $\\alpha_3$ pasa por $R_3$ y $S_3$, y corta a los ejes en $M$ y en $N$.", items: [sA(M, N, C_3, false, 3.4), pA(M, "M", "blanco", 4, -14), pA(N, "N", "blanco", 14, -2), rA(mix(M, N, 0.45), "α₃", C_3, -24, -2)] },
      { texto: "La traza $\\alpha_2$ pasa por $N$ y $R_2$, y corta al eje $X$ en $L$. La traza $\\alpha_1$ une $L$ con $M$ y, como comprobación, pasa por $S_1$.", items: [sA(N, L, C_2, false, 3.4), sA(L, M, C_1, false, 3.4), pA(L, "L", "blanco", -4, -14), rA(mix(N, L, 0.75), "α₂", C_2, 18, -4), rA(mix(L, M, 0.75), "α₁", C_1, 0, 22)] },
    ],
  };
};

/* ───────────── 6. Intersecciones (págs. 128-129) ───────────── */

const interseccionPlanos = (): Diagrama => {
  const a: [P3, P3, P3] = [[150, 0, 0], [0, 90, 0], [0, 0, 140]];
  const b: [P3, P3, P3] = [[70, 0, 0], [0, 170, 0], [0, 0, 90]];
  const S1p = corte(I(a[0]), I(a[1]), I(b[0]), I(b[1]));
  const S3p = corte(I(a[1]), I(a[2]), I(b[1]), I(b[2]));
  const tri = (t: [P3, P3, P3], c: Color, n: string, pos: [number, number][]): Item[] => [
    poli(t.map((q) => I(q)), c, 0.08),
    rA(mix(t[0], t[1], 0.5), `${n}₁`, c, pos[0]![0], pos[0]![1], 16), rA(mix(t[0], t[2], 0.5), `${n}₂`, c, pos[1]![0], pos[1]![1], 16), rA(mix(t[1], t[2], 0.5), `${n}₃`, c, pos[2]![0], pos[2]![1], 16),
  ];
  return {
    label: "Intersección de dos planos dados por sus trazas",
    pasos: [
      { texto: "El plano $\\alpha$, dado por su triángulo de trazas.", items: [...ejes(185), ...tri(a, C_2, "α", [[34, 20], [20, -8], [-16, -34]])] },
      { texto: "Un segundo plano, $\\beta$, también por sus trazas. Hay que hallar la recta que tienen en común.", items: tri(b, C_1, "β", [[-52, 18], [16, -4], [-26, 22]]) },
      { texto: "Las trazas del mismo nombre están en el mismo plano del triedro, así que se cortan. $\\alpha_1$ y $\\beta_1$, las dos en $XOY$, se cortan en $S_1$: un punto que pertenece a los dos planos.", items: [p2(S1p, "S₁", RES, 18, 16)] },
      { texto: "$\\alpha_3$ y $\\beta_3$, las dos en $YOZ$, se cortan en $S_3$: otro punto común.", items: [p2(S3p, "S₃", RES, -18, -2)] },
      { texto: "La recta $s$ que une $S_1$ y $S_3$ es la **intersección** de los dos planos. Las trazas $\\alpha_2$ y $\\beta_2$, prolongadas, se cortarían en un tercer punto de la misma recta.", items: [seg(alarga(S1p, S3p, -0.25), alarga(S1p, S3p, 1.3), C_D, false, 3.8), rot(alarga(S1p, S3p, 1.3), "s", C_D, 12, 0)] },
    ],
  };
};

const rectaPlano = (): Diagrama => {
  const ca = 150, cb = 130, cc = 150;
  const A: P3 = [ca, 0, 0], B: P3 = [0, cb, 0], C: P3 = [0, 0, cc];
  /* r′ sale del eje Y; r sube sobre ella. */
  const rp = (s: number): P3 => [130 * s, 50 + 50 * s, 0];
  const r = (s: number): P3 => [130 * s, 50 + 50 * s, 10 + 60 * s];
  const s1 = (1 - 50 / cb) / (130 / ca + 50 / cb);
  const U = rp(s1);
  const E: P3 = [0, 50, 0];
  const D2: P3 = [0, 50, cc * (1 - 50 / cb)];
  const sI = (D2[2] - 10) / (60 + D2[2] / s1);
  const Ip = r(sI);
  return {
    label: "Intersección de una recta con un plano",
    pasos: [
      { texto: "Un plano $\\alpha$, por sus trazas, y una recta $r$, con su proyección $r'$ sobre $XOY$. Hay que hallar el punto donde la recta atraviesa al plano.", items: [...ejes(185), poli([I(A), I(B), I(C)], C_2, 0.08), rA(mix(A, B, 0.8), "α₁", C_2, 14, 22, 16), rA(mix(A, C, 0.5), "α₂", C_2, 18, -4, 16), rA(mix(B, C, 0.6), "α₃", C_2, -18, -4, 16), sA(r(-0.1), r(0.8), C_D, false, 3.2), sA(rp(-0.1), rp(0.8), C_1, false, 2.8), rA(r(0.8), "r", C_D, 12, -4), rA(rp(0.8), "r′", C_1, 14, 8)] },
      { texto: "Por $r$ se hace pasar un plano auxiliar vertical, $\\beta$: su traza $\\beta_1$ coincide con $r'$. Corta a $\\alpha_1$ en el punto $1$ y, subiendo desde el eje $Y$, a $\\alpha_3$ en el punto $2$.", items: [sA(E, D2, AUX, false, 1.8), pA(U, "1", RES, 4, -12), pA(D2, "2", RES, -14, -6), pA(E, undefined, C_1)] },
      { texto: "La recta $i$ que une $1$ y $2$ es la intersección de los dos planos, $\\alpha$ y $\\beta$.", items: [sA(U, D2, RES, false, 2.8), rA(mix(U, D2, 0.3), "i", RES, 4, 20)] },
      { texto: "$i$ y $r$ están en el mismo plano $\\beta$, así que se cortan: en $I$, el punto buscado. Su proyección $I'$ está sobre $r'$, en la paralela al eje $Z$.", items: [sA(Ip, pr1(Ip), AUX, true, 1.6), pA(Ip, "I", C_D, 4, -12), pA(pr1(Ip), "I′", C_1, -4, 22)] },
    ],
  };
};

export const DIAGRAMAS_AXONOMETRICO_ESPACIO: Record<string, Diagrama> = {
  "d14-triedro": triedro(), "d14-cuadro": cuadro(), "d14-reversible": cuatroProyecciones(), "d14-triangulo": triangulo(), "d14-notacion": notacion(),
  "d14-isometrico": isometrico(), "d14-escala": escala(), "d14-sin-reducir": sinReducir(),
  "d14-circunferencia": circunferencia(), "d14-circunferencia-planos": circunferenciaPlanos(), "d14-puntos": puntosElipse(), "d14-ovalo": ovalo(), "d14-rayados": rayados(),
  "d14-punto": puntoTriedros(), "d14-recta": recta(), "d14-rectas-particulares": rectasParticulares(), "d14-rectas-relativas": rectasRelativas(),
  "d14-plano": plano(), "d14-planos-particulares": planosParticulares(), "d14-tres-puntos": tresPuntos(),
  "d14-intersecciones": interseccionPlanos(), "d14-recta-plano": rectaPlano(),
};
