"use client";

import type { ReactNode } from "react";
import { instrumentoAngulo } from "./construcciones-datos";
import { CARTABON_CORTO, CARTABON_LARGO, ESCUADRA_L, dist, type Pose, type Pt } from "./geometry";
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

/** Datos de una pasada de la escuadra o del cartabón: perpendicular por un punto o ángulo de 30°, 45° o 60° en un vértice. */
export type DatosDesliza = {
  recta: [Pt, Pt];
  punto: Pt;
  traza: [Pt, Pt];
  /** Si está, el instrumento hace un ángulo (con cartabón o escuadra) en `punto` en vez de una perpendicular. */
  angulo?: { base: number; obj: number; signo?: 1 | -1 };
};

export type Desliza = {
  /** Dirección en que desliza el instrumento. */
  u: Pt;
  objetivo: number;
  max: number;
  nodo: (s: number, opacidad?: number) => ReactNode;
  /** Filo que traza (recta de guía) con el instrumento a `s`: un punto y su dirección unitaria. */
  filo: (s: number) => { p: Pt; dir: Pt };
  marca: Pt;
  texto: string;
};

const unit = (a: Pt): Pt => [a[0] / Math.hypot(a[0], a[1]), a[1] / Math.hypot(a[0], a[1])];

/** Cartabón o escuadra con el vértice agudo de `obj` grados en `v`, un cateto sobre la recta y la hipotenusa en el lado del ángulo. */
function geoAngulo(v: Pt, base: number, obj: number, signo: 1 | -1): Desliza {
  const inst = instrumentoAngulo(obj)!;
  const a = inst === "escuadra45" ? ESCUADRA_L : CARTABON_LARGO;
  const b = inst === "escuadra45" ? ESCUADRA_L : CARTABON_CORTO;
  // vértice agudo W, dirección l de W al ángulo recto (cateto sobre la recta) y h de W al otro vértice agudo (hipotenusa)
  const W: Pt = inst === "cartabon60" ? [0, b] : [a, 0];
  const l: Pt = inst === "cartabon60" ? [0, -1] : [-1, 0];
  const h: Pt = inst === "cartabon60" ? unit([a, -b]) : unit([-a, b]);
  const rad = (d: number) => (d * Math.PI) / 180;
  const bdir: Pt = [Math.cos(rad(base)), -Math.sin(rad(base))];
  const rdir: Pt = [Math.cos(rad(base + signo * obj)), -Math.sin(rad(base + signo * obj))];
  // M lleva l → bdir y h → rdir: M = [bdir rdir] · [l h]⁻¹
  const det = l[0] * h[1] - h[0] * l[1];
  const inv = [[h[1] / det, -h[0] / det], [-l[1] / det, l[0] / det]];
  const M = [
    [bdir[0] * inv[0][0] + rdir[0] * inv[1][0], bdir[0] * inv[0][1] + rdir[0] * inv[1][1]],
    [bdir[1] * inv[0][0] + rdir[1] * inv[1][0], bdir[1] * inv[0][1] + rdir[1] * inv[1][1]],
  ];
  const q0: Pt = [v[0] - bdir[0] * ANTES, v[1] - bdir[1] * ANTES];
  const vertice = (s: number): Pt => [q0[0] + bdir[0] * s, q0[1] + bdir[1] * s];
  const nombre = inst === "escuadra45" ? "la escuadra" : "el cartabón";
  return {
    u: bdir,
    objetivo: ANTES,
    max: ANTES + 90,
    nodo: (s, opacidad = 1) => {
      const w = vertice(s);
      const e = w[0] - (M[0][0] * W[0] + M[0][1] * W[1]);
      const f = w[1] - (M[1][0] * W[0] + M[1][1] * W[1]);
      return (
        <g data-testid="bench-instrumentos" pointerEvents="none" opacity={opacidad}>
          <g transform={`matrix(${M[0][0]} ${M[1][0]} ${M[0][1]} ${M[1][1]} ${e} ${f})`}>{inst === "escuadra45" ? <Escuadra pose={{ x: 0, y: 0, rot: 0 }} /> : <Cartabon pose={{ x: 0, y: 0, rot: 0 }} />}</g>
        </g>
      );
    },
    filo: (s) => ({ p: vertice(s), dir: rdir }),
    marca: v,
    texto: `arrastra ${nombre} a lo largo de la recta hasta que su vértice de ${obj}° llegue al punto resaltado.`,
  };
}

/** Geometría de un instrumento que desliza: perpendicular con escuadra y cartabón, o ángulo con uno de ellos. */
export function geoDesliza(d: DatosDesliza): Desliza {
  if (d.angulo && instrumentoAngulo(d.angulo.obj)) return geoAngulo(d.punto, d.angulo.base, d.angulo.obj, d.angulo.signo ?? 1);
  const g = geoPerp(d.recta, d.punto);
  return {
    u: g.u,
    objetivo: g.objetivo,
    max: g.max,
    nodo: (s, opacidad = 1) => <InstrumentosPerp g={g} s={s} opacidad={opacidad} />,
    filo: (s) => ({ p: filoPerp(g, s)[0], dir: g.n }),
    marca: d.punto,
    texto: "arrastra la escuadra sobre el cartabón hasta que su filo pase por el punto resaltado.",
  };
}

/**
 * Animación: el instrumento entra, desliza hasta su sitio y el lápiz traza `traza` guiado por su filo. `p` va de 0 a 1.
 */
export function AnimDesliza({ datos, p, color = "#6b7480", w = 1.1 }: { datos: DatosDesliza; p: number; color?: string; w?: number }) {
  const g = geoDesliza(datos);
  const linea = datos.traza;
  const entra = tramo(p, 0, 0.12);
  const mov = tramo(p, 0.12, 0.62);
  const traza = tramo(p, 0.66, 0.92);
  const sale = tramo(p, 0.94, 1);
  const s = g.objetivo * (mov * mov * (3 - 2 * mov));
  const fin: Pt = [lerp(linea[0][0], linea[1][0], traza), lerp(linea[0][1], linea[1][1], traza)];
  return (
    <g data-testid="bench-perpendicular-anim">
      {traza > 0 ? <Seg a={linea[0]} b={fin} color={color} w={w} /> : null}
      {p < 1 ? g.nodo(s, entra * (1 - sale)) : null}
    </g>
  );
}

/** Perpendicular con escuadra y cartabón (animación). */
export function AnimPerpendicular({ recta, punto, linea, p, color, w }: { recta: [Pt, Pt]; punto: Pt; linea: [Pt, Pt]; p: number; color?: string; w?: number }) {
  return <AnimDesliza datos={{ recta, punto, traza: linea }} p={p} color={color} w={w} />;
}
