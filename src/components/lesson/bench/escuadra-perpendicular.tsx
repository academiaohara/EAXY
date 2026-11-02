"use client";

import { CARTABON_LARGO, dist, type Pose, type Pt } from "./geometry";
import { Cartabon, Escuadra } from "./instruments";
import { Seg } from "./scenes-proporcion";

/**
 * Perpendicular con escuadra y cartabón: el cartabón se apoya con su cateto largo en la recta `L` y la escuadra
 * desliza sobre él con un cateto pegado a la recta hasta que su otro cateto (el que traza) pasa por el punto `P`.
 * Funciona igual si `P` está en la recta (ángulo recto en un extremo) o fuera de ella (alturas).
 */
export const ANTES = 140;

export type GeoPerp = {
  /** Pie de la perpendicular desde `P` sobre `L`. */
  pie: Pt;
  /** Normal unitaria hacia el lado de `P` (hacia arriba si `P` está en la recta). */
  n: Pt;
  /** Dirección unitaria de deslizamiento (cateto de la escuadra pegado al cartabón). */
  u: Pt;
  /** Posición inicial del vértice de la escuadra sobre la recta. */
  q0: Pt;
  /** Deslizamiento (en la dirección `u`) con el que el filo de la escuadra pasa por `P`. */
  objetivo: number;
  /** Máximo deslizamiento permitido. */
  max: number;
};

export function geoPerp(L: [Pt, Pt], P: Pt): GeoPerp {
  const d = dist(L[0], L[1]);
  const u0: Pt = [(L[1][0] - L[0][0]) / d, (L[1][1] - L[0][1]) / d];
  const t = (P[0] - L[0][0]) * u0[0] + (P[1] - L[0][1]) * u0[1];
  const pie: Pt = [L[0][0] + u0[0] * t, L[0][1] + u0[1] * t];
  let n: Pt = [P[0] - pie[0], P[1] - pie[1]];
  const l = Math.hypot(n[0], n[1]);
  if (l < 1) {
    n = [-u0[1], u0[0]];
    if (n[1] > 0) n = [-n[0], -n[1]];
  } else n = [n[0] / l, n[1] / l];
  const u: Pt = [-n[1], n[0]];
  const q0: Pt = [pie[0] - u[0] * ANTES, pie[1] - u[1] * ANTES];
  return { pie, n, u, q0, objetivo: ANTES, max: ANTES + 90 };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const tramo = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const aGrados = (x: number, y: number) => (Math.atan2(y, x) * 180) / Math.PI;

/** Poses de la escuadra (desplazada `s` sobre la recta) y del cartabón (fijo, con su cateto largo sobre la recta). */
export function posesPerp(g: GeoPerp, s: number): { escuadra: Pose; cartabon: Pose } {
  const x = g.q0[0] + g.u[0] * s;
  const y = g.q0[1] + g.u[1] * s;
  return {
    escuadra: { x, y, rot: aGrados(g.n[0], g.n[1]) },
    cartabon: { x: g.q0[0] - g.u[0] * 20, y: g.q0[1] - g.u[1] * 20, rot: aGrados(g.u[0], g.u[1]) },
  };
}

/** Instrumentos de la perpendicular con la escuadra a `s` del origen. */
export function InstrumentosPerp({ g, s, opacidad = 1 }: { g: GeoPerp; s: number; opacidad?: number }) {
  const poses = posesPerp(g, s);
  return (
    <g data-testid="bench-instrumentos" pointerEvents="none" opacity={opacidad}>
      <Cartabon pose={poses.cartabon} />
      <Escuadra pose={poses.escuadra} />
    </g>
  );
}

/** Filo de la escuadra (el cateto que traza), como segmento. */
export function filoPerp(g: GeoPerp, s: number): [Pt, Pt] {
  const v: Pt = [g.q0[0] + g.u[0] * s, g.q0[1] + g.u[1] * s];
  return [v, [v[0] + g.n[0] * 170, v[1] + g.n[1] * 170]];
}

/** Longitud mínima del cartabón: la escuadra no debe salirse de él al deslizar. */
export const LARGO_CARTABON = CARTABON_LARGO;

/**
 * Animación: la escuadra entra, desliza sobre el cartabón hasta que su filo pasa por `P` y el lápiz traza `linea`.
 * `p` va de 0 a 1.
 */
export function AnimPerpendicular({ recta, punto, linea, p, color = "#6b7480", w = 1.1 }: { recta: [Pt, Pt]; punto: Pt; linea: [Pt, Pt]; p: number; color?: string; w?: number }) {
  const g = geoPerp(recta, punto);
  const entra = tramo(p, 0, 0.12);
  const mov = tramo(p, 0.12, 0.62);
  const traza = tramo(p, 0.66, 0.92);
  const sale = tramo(p, 0.94, 1);
  const s = g.objetivo * (mov * mov * (3 - 2 * mov));
  const fin: Pt = [lerp(linea[0][0], linea[1][0], traza), lerp(linea[0][1], linea[1][1], traza)];
  return (
    <g data-testid="bench-perpendicular-anim">
      {traza > 0 ? <Seg a={linea[0]} b={fin} color={color} w={w} /> : null}
      {p < 1 ? <InstrumentosPerp g={g} s={s} opacidad={entra * (1 - sale)} /> : null}
    </g>
  );
}
