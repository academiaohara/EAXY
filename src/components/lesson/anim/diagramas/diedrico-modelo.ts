import { poli, pt, seg, txt, type Color, type Item, type Pt } from "./engine";

/**
 * Modelo geométrico de los dibujos del sistema diédrico: cada elemento se define una sola vez en el espacio, con
 * (x sobre la L.T., alejamiento, cota), y de ahí salen las dos mitades del dibujo:
 *  - a la izquierda, la vista en el espacio (los dos planos de proyección en perspectiva);
 *  - a la derecha, el dibujo plano (épura) que resulta al abatir el plano vertical.
 * Así las dos vistas siempre se corresponden y las proyecciones salen calculadas, no puestas a ojo.
 */

/** Punto del espacio: [x sobre la L.T., alejamiento (hacia delante del PV), cota (sobre el PH)]. */
export type P3 = [number, number, number];

/* ───────────── Vista en el espacio ───────────── */

/** Fuga del alejamiento en la perspectiva: hacia delante y a la izquierda, como en las figuras del libro. */
const FX = -0.45;
const FY = 0.5;
/** La vista en el espacio se dibuja algo mayor que el dibujo plano, para que se lea bien. */
const ES = 1.3;
const EX = 92;
const EY = 234;
/** Punto del espacio en la perspectiva de la izquierda. */
export const S = (p: P3): Pt => [EX + ES * (p[0] + FX * p[1]), EY + ES * (FY * p[1] - p[2])];

/* ───────────── Dibujo plano (épura) ───────────── */

const DX = 500;
const DY = 207;
const DS = 1.15;
/** Proyección horizontal (planta) de un punto en el dibujo: el alejamiento baja desde la L.T. */
export const h = (p: P3): Pt => [DX + DS * p[0], DY + DS * p[1]];
/** Proyección vertical (alzado) de un punto en el dibujo: la cota sube desde la L.T. */
export const v = (p: P3): Pt => [DX + DS * p[0], DY - DS * p[2]];
/** Pie de la línea de referencia en la L.T. del dibujo. */
export const o = (p: P3): Pt => [DX + DS * p[0], DY];

/* ───────────── Operaciones en el espacio ───────────── */

export const enH = (p: P3): P3 => [p[0], p[1], 0];
export const enV = (p: P3): P3 => [p[0], 0, p[2]];
export const enLT = (p: P3): P3 => [p[0], 0, 0];
export const mix = (a: P3, b: P3, t: number): P3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
/** Traza horizontal de la recta AB: el punto de cota nula. */
export const trazaH = (a: P3, b: P3): P3 => mix(a, b, a[2] / (a[2] - b[2]));
/** Traza vertical de la recta AB: el punto de alejamiento nulo. */
export const trazaV = (a: P3, b: P3): P3 => mix(a, b, a[1] / (a[1] - b[1]));

/**
 * Plano oblicuo dado por sus trazas: corta a la L.T. en `n`; la traza horizontal avanza `a` en x por cada unidad de
 * alejamiento y la vertical avanza `b` en x por cada unidad de cota. Sus puntos cumplen x = n + a·alejamiento + b·cota.
 */
export type Plano = { n: number; a: number; b: number };
export const N = (pl: Plano): P3 => [pl.n, 0, 0];
/** Punto de la traza horizontal con alejamiento `al`. */
export const t1 = (pl: Plano, al: number): P3 => [pl.n + pl.a * al, al, 0];
/** Punto de la traza vertical con cota `co`. */
export const t2 = (pl: Plano, co: number): P3 => [pl.n + pl.b * co, 0, co];
/** Punto del plano con alejamiento `al` y cota `co`. */
export const enPlano = (pl: Plano, al: number, co: number): P3 => [pl.n + pl.a * al + pl.b * co, al, co];

/* ───────────── Piezas de dibujo ───────────── */

const C_H: Color = "naranja";
const C_V: Color = "azul";
const C_E: Color = "verde";

export type Marco = { ancho?: number; alto?: number; fondo?: number; bajo?: number; detras?: number; rotulos?: boolean };

/** Los dos planos de proyección en el espacio y la L.T. (izquierda). `bajo` y `detras` prolongan el PV por debajo y el PH por detrás. */
export const planosEspacio = (m: Marco = {}): Item[] => {
  const { ancho = 260, alto = 180, fondo = 150, bajo = 0, detras = 0, rotulos = true } = m;
  return [
    ...(detras ? [poli([S([0, -detras, 0]), S([ancho, -detras, 0]), S([ancho, 0, 0]), S([0, 0, 0])], C_H, 0.06)] : []),
    poli([S([0, 0, alto]), S([ancho, 0, alto]), S([ancho, 0, -bajo]), S([0, 0, -bajo])], C_V, 0.1),
    poli([S([0, 0, 0]), S([ancho, 0, 0]), S([ancho, fondo, 0]), S([0, fondo, 0])], C_H, 0.1),
    seg(S([0, 0, 0]), S([ancho, 0, 0]), "blanco", false, 3.6),
    ...(rotulos ? [txt(S([20, 0, alto - 20]), "PV", C_V, 18), txt(S([26, fondo - 12, 0]), "PH", C_H, 18)] : []),
  ];
};

/** La línea de tierra del dibujo plano (derecha), con sus dos trazos en los extremos. */
export const ltDibujo = (x0 = -15, x1 = 275): Item[] => [
  seg([DX + DS * x0, DY], [DX + DS * x1, DY], "blanco", false, 2.6),
  seg([DX + DS * x0, DY + 8], [DX + DS * x0 + 20, DY + 8], "blanco", false, 3.4),
  seg([DX + DS * x1 - 20, DY + 8], [DX + DS * x1, DY + 8], "blanco", false, 3.4),
];

/** Rótulos pequeños que dicen qué es cada mitad del dibujo. */
export const rotulos = (y = -16): Item[] => [txt([EX + ES * 130, y], "En el espacio", "gris", 15), txt([DX + DS * 130, y], "En el dibujo", "gris", 15)];

/** Marco habitual: planos en el espacio, L.T. del dibujo y rótulos. */
export const escena = (m: Marco = {}): Item[] => [...planosEspacio(m), ...ltDibujo(), ...rotulos()];

/** Punto del espacio (verde). */
export const pE = (p: P3, n?: string, dx = 12, dy = -8, c: Color = C_E): Item => pt(S(p), n, c, dx, dy);
/** Segmento del espacio. */
export const sE = (a: P3, b: P3, c: Color = C_E, d = false, w = 3.2): Item => seg(S(a), S(b), c, d, w);
/** Proyectante de un punto sobre el PH y su proyección horizontal, en el espacio. */
export const proyH = (p: P3, n?: string, dx = 12, dy = 20): Item[] => [sE(p, enH(p), "gris", true, 1.6), pt(S(enH(p)), n, C_H, dx, dy)];
/** Proyectante de un punto sobre el PV y su proyección vertical, en el espacio. */
export const proyV = (p: P3, n?: string, dx = -16, dy = -6): Item[] => [sE(p, enV(p), "gris", true, 1.6), pt(S(enV(p)), n, C_V, dx, dy)];

/** Línea de referencia de un punto en el dibujo. */
export const refD = (p: P3): Item => seg(h(p), v(p), "gris", true, 1.4);
/** Proyección horizontal de un punto en el dibujo. */
export const pH = (p: P3, n?: string, dx = 12, dy = 20, c: Color = C_H): Item => pt(h(p), n, c, dx, dy);
/** Proyección vertical de un punto en el dibujo. */
export const pV = (p: P3, n?: string, dx = 12, dy = -8, c: Color = C_V): Item => pt(v(p), n, c, dx, dy);
/** Las dos proyecciones de un punto en el dibujo, con su línea de referencia. */
export const pD = (p: P3, n: string): Item[] => [refD(p), pH(p, `${n}′`), pV(p, `${n}″`)];
/** Proyección horizontal de un segmento en el dibujo. */
export const sH = (a: P3, b: P3, d = false, w = 3.2, c: Color = C_H): Item => seg(h(a), h(b), c, d, w);
/** Proyección vertical de un segmento en el dibujo. */
export const sV = (a: P3, b: P3, d = false, w = 3.2, c: Color = C_V): Item => seg(v(a), v(b), c, d, w);
/** Rótulo junto a un punto del dibujo o del espacio. */
export const rot = (p: Pt, s: string, c: Color, dx = 0, dy = 0, size = 19): Item => txt([p[0] + dx, p[1] + dy], s, c, size);

/** Trozo de un plano oblicuo en el primer diedro, en el espacio: el triángulo entre sus dos trazas. */
export const planoEspacio = (pl: Plano, al: number, co: number, c: Color = C_E, f = 0.14): Item => poli([S(N(pl)), S(t1(pl, al)), S(t2(pl, co))], c, f);
/** Trazas de un plano en el espacio (sobre el PH y el PV). */
export const trazasEspacio = (pl: Plano, al: number, co: number, n = "α"): Item[] => [
  sE(N(pl), t1(pl, al), C_H, false, 3.4), sE(N(pl), t2(pl, co), C_V, false, 3.4),
  rot(S(t1(pl, al)), `${n}₁`, C_H, 16, 8), rot(S(t2(pl, co)), `${n}₂`, C_V, 16, 0),
];
/** Trazas de un plano en el dibujo. */
export const trazasDibujo = (pl: Plano, al: number, co: number, n = "α", conN = true): Item[] => [
  sH(N(pl), t1(pl, al), false, 3.4), sV(N(pl), t2(pl, co), false, 3.4),
  rot(h(t1(pl, al)), `${n}₁`, C_H, 16, 10), rot(v(t2(pl, co)), `${n}₂`, C_V, 16, 0),
  ...(conN ? [pt(o(N(pl)), "N", "blanco", -12, 22)] : []),
];

export { DX, DY, DS, C_H, C_V, C_E };
