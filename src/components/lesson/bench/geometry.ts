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

/**
 * Pose de un instrumento. Por defecto su origen local va a `(x, y)` girado `rot` grados.
 * Con `anchor`, es ese punto local (un vértice, por ejemplo) el que va a `(x, y)`;
 * con `mirror`, el instrumento se vuelve del revés (volteado sobre su eje x local).
 */
export type Pose = { x: number; y: number; rot: number; anchor?: Pt; mirror?: boolean };

export const poseTransform = (p: Pose) =>
  `translate(${p.x} ${p.y}) rotate(${p.rot})${p.mirror ? " scale(1 -1)" : ""}${p.anchor ? ` translate(${-p.anchor[0]} ${-p.anchor[1]})` : ""}`;

/** Lleva un punto local de un instrumento a coordenadas de la hoja. */
export function applyPose(pose: Pose, local: Pt): Pt {
  let q: Pt = [local[0] - (pose.anchor?.[0] ?? 0), local[1] - (pose.anchor?.[1] ?? 0)];
  if (pose.mirror) q = [q[0], -q[1]];
  const r = rot(q, pose.rot);
  return [pose.x + r[0], pose.y + r[1]];
}

/**
 * Apoya un triángulo sobre una arista horizontal: el vértice `vi` va a `o`, el vértice `wi`
 * queda a su derecha sobre la misma horizontal y el tercer vértice, por encima (`arriba`) o por debajo.
 */
export function apoyarTriangulo(pts: [Pt, Pt, Pt], vi: 0 | 1 | 2, wi: 0 | 1 | 2, o: Pt, arriba = true): Pose {
  const v = pts[vi];
  const e = sub(pts[wi], v);
  const alpha = (Math.atan2(e[1], e[0]) * 180) / Math.PI;
  const k = ([0, 1, 2] as const).find((i) => i !== vi && i !== wi)!;
  const candidatos: Pose[] = [
    { x: o[0], y: o[1], rot: -alpha, anchor: v },
    { x: o[0], y: o[1], rot: alpha, anchor: v, mirror: true },
  ];
  return candidatos.find((c) => (applyPose(c, pts[k])[1] < o[1]) === arriba) ?? candidatos[0];
}

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

/* ───────────── Ángulos y circunferencias (ángulos en grados, antihorarios en pantalla, 0° = derecha) ───────────── */

/** Ángulo de la semirrecta que va de `v` a `p`, en (−180, 180]. */
export const angDe = (v: Pt, p: Pt) => (Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180) / Math.PI;

/** Punto de la circunferencia de centro `c` y radio `r` en la dirección `ang`. */
export const enCirculo = (c: Pt, r: number, ang: number): Pt => [c[0] + r * Math.cos(ang * RAD), c[1] - r * Math.sin(ang * RAD)];

/** Puntos de corte de dos circunferencias (primero el de la izquierda del sentido a→b), o `null` si no se cortan. */
export function interseccionCirculos(a: Pt, ra: number, b: Pt, rb: number): [Pt, Pt] | null {
  const d = dist(a, b);
  if (d === 0 || d > ra + rb || d < Math.abs(ra - rb)) return null;
  const x = (d * d + ra * ra - rb * rb) / (2 * d);
  const h = Math.sqrt(Math.max(0, ra * ra - x * x));
  const ux: Pt = [(b[0] - a[0]) / d, (b[1] - a[1]) / d];
  const base: Pt = [a[0] + ux[0] * x, a[1] + ux[1] * x];
  return [
    [base[0] + ux[1] * h, base[1] - ux[0] * h],
    [base[0] - ux[1] * h, base[1] + ux[0] * h],
  ];
}

export const puntoMedio = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

/** Ángulo en grados entre dos direcciones (0…180). */
export function entreDirecciones(a1: number, a2: number) {
  let d = Math.abs(a1 - a2) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

/* ───────────── Perpendicular con escuadra y cartabón ─────────────
 * Se trabaja en el sistema de la recta r: eje x a lo largo de r, y hacia abajo (como en SVG),
 * origen en el pie de la guía. El cartabón queda bajo r con su cateto largo sobre r y la escuadra, encima,
 * con un cateto apoyado en el cartabón: al deslizarla por r, su otro cateto es siempre perpendicular a r.
 */
export const PERP_PX = 200;
export const PERP_EX0 = 40;
export const PERP_S_MAX = 260;

export type PerpSetup = { p: Pt; dP: number; sStar: number };

export function perpSetup(dP: number): PerpSetup {
  return { p: [PERP_PX, -dP], dP, sStar: PERP_PX - PERP_EX0 };
}

/** Posición x (en el sistema de r) del vértice recto de la escuadra tras deslizar `s` mm. */
export const perpEx = (s: number) => PERP_EX0 + s;

export const perpPasaPorP = (setup: PerpSetup, s: number, tol = 1.2) => Math.abs(perpEx(s) - setup.p[0]) <= tol;
