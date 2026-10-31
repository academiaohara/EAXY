/**
 * Geometría de la «mesa de dibujo»: funciones puras (sin React) que mueven los
 * instrumentos con las mismas restricciones que en papel. Unidad: 1 = 1 mm.
 */

export type Pt = [number, number];

export const RAD = Math.PI / 180;

/** Lados de los instrumentos (mm). El cateto largo del cartabón mide como la hipotenusa de la escuadra. */
export const ESCUADRA_L = 170;
export const CARTABON_LARGO = 240;
export const CARTABON_CORTO = CARTABON_LARGO / Math.sqrt(3);

export const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
export const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
export const mul = (a: Pt, k: number): Pt => [a[0] * k, a[1] * k];
export const dot = (a: Pt, b: Pt) => a[0] * b[0] + a[1] * b[1];
export const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

/** Vector unitario de dirección `deg` (grados, eje Y hacia abajo como en SVG). */
export const dir = (deg: number): Pt => [Math.cos(deg * RAD), Math.sin(deg * RAD)];

/** Gira el vector `p` `deg` grados alrededor del origen. */
export function rot(p: Pt, deg: number): Pt {
  const c = Math.cos(deg * RAD);
  const s = Math.sin(deg * RAD);
  return [p[0] * c - p[1] * s, p[0] * s + p[1] * c];
}

/** Pose de un instrumento: dónde está su origen local y cuánto está girado. */
export type Pose = { x: number; y: number; rot: number };

export const poseTransform = (p: Pose) => `translate(${p.x} ${p.y}) rotate(${p.rot})`;

/** Triángulo achicado hacia su incentro: sirve para el vaciado interior de escuadra y cartabón. */
export function insetTriangle(v: [Pt, Pt, Pt], width: number): [Pt, Pt, Pt] {
  const [a, b, c] = v;
  const la = dist(b, c);
  const lb = dist(a, c);
  const lc = dist(a, b);
  const per = la + lb + lc;
  const inc: Pt = [(la * a[0] + lb * b[0] + lc * c[0]) / per, (la * a[1] + lb * b[1] + lc * c[1]) / per];
  const area = Math.abs((b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1])) / 2;
  const rho = (2 * area) / per;
  const k = Math.max(0, (rho - width) / rho);
  const f = (p: Pt): Pt => [inc[0] + (p[0] - inc[0]) * k, inc[1] + (p[1] - inc[1]) * k];
  return [f(a), f(b), f(c)];
}

/* ───────────── Paralela con escuadra y cartabón ───────────── */

/** Posición del punto P respecto de la recta r: 40 mm a lo largo y `dP` mm por debajo. */
export const PARALELA_A = 40;
/** Recorrido máximo de la escuadra sobre el cartabón (mm medidos sobre la hipotenusa). */
export const PARALELA_S_MAX = 125;

export type ParalelaSetup = {
  /** Punto de r donde empieza la escuadra (vértice del ángulo recto con s = 0). */
  c0: Pt;
  /** Ángulo de r (grados). */
  theta: number;
  /** Dirección de r y normal hacia el lado de P (donde queda el cuerpo de la escuadra). */
  u: Pt;
  n: Pt;
  /** Dirección en que desliza la escuadra: a lo largo de su hipotenusa. */
  h: Pt;
  p: Pt;
  /** Distancia de P a r. */
  dP: number;
  /** Desplazamiento (sobre la hipotenusa) con el que el cateto pasa por P. */
  sStar: number;
};

export function paralelaSetup(c0: Pt, thetaDeg: number, dP: number): ParalelaSetup {
  const u = dir(thetaDeg);
  const n = dir(thetaDeg + 90);
  const h = rot([-Math.SQRT1_2, Math.SQRT1_2], thetaDeg);
  const p = add(add(c0, mul(u, PARALELA_A)), mul(n, dP));
  return { c0, theta: thetaDeg, u, n, h, p, dP, sStar: dP * Math.SQRT2 };
}

/** Pose de la escuadra tras desplazarla `s` mm sobre la hipotenusa. */
export function escuadraPose(setup: ParalelaSetup, s: number): Pose {
  return { x: setup.c0[0] + setup.h[0] * s, y: setup.c0[1] + setup.h[1] * s, rot: setup.theta };
}

/**
 * Pose del cartabón: su cateto largo queda pegado a la hipotenusa de la escuadra
 * (en su posición inicial) y el cuerpo, por fuera. No se mueve mientras se desliza.
 */
export function cartabonPose(setup: ParalelaSetup): Pose {
  // Punto de la hipotenusa (coordenadas de la escuadra en s = 0) donde cae el origen del cartabón.
  const hLocal: Pt = [-Math.SQRT1_2, Math.SQRT1_2];
  const o = add([ESCUADRA_L, 0], mul(hLocal, CARTABON_LARGO - 40));
  const w = add(setup.c0, rot(o, setup.theta));
  return { x: w[0], y: w[1], rot: setup.theta - 45 };
}

/** Extremos del filo de la escuadra (el cateto que se apoya en r) con desplazamiento `s`. */
export function filoEscuadra(setup: ParalelaSetup, s: number): [Pt, Pt] {
  const o = escuadraPose(setup, s);
  const a: Pt = [o.x, o.y];
  return [a, add(a, mul(setup.u, ESCUADRA_L))];
}

/** Distancia (mm) entre el filo de la escuadra y la recta paralela a r que pasa por P. */
export function distanciaFiloAP(setup: ParalelaSetup, s: number) {
  const [a] = filoEscuadra(setup, s);
  return dot(sub(setup.p, a), setup.n);
}

export function filoPasaPorP(setup: ParalelaSetup, s: number, tol = 1.2) {
  return Math.abs(distanciaFiloAP(setup, s)) <= tol;
}

/** Extremos de la hipotenusa de la escuadra con desplazamiento `s`. */
export function hipotenusaEscuadra(setup: ParalelaSetup, s: number): [Pt, Pt] {
  const o = escuadraPose(setup, s);
  const a = add([o.x, o.y], rot([ESCUADRA_L, 0], setup.theta));
  const b = add([o.x, o.y], rot([0, ESCUADRA_L], setup.theta));
  return [a, b];
}

/** Distancia de un punto a la recta que pasa por a y b. */
export function distRecta(p: Pt, a: Pt, b: Pt) {
  const d = sub(b, a);
  const l = Math.hypot(d[0], d[1]);
  return Math.abs(d[0] * (p[1] - a[1]) - d[1] * (p[0] - a[0])) / l;
}
