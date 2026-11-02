"use client";

import type { ReactNode } from "react";
import { instrumentoAngulo } from "./construcciones-datos";
import { dist, type Pt } from "./geometry";
import { planAngulo, planPerp } from "./desliza-plan";
import { Seg } from "./scenes-proporcion";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const tramo = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

/** Datos de una pasada de la escuadra o del cartabón: perpendicular por un punto o ángulo de 30°, 45° o 60° en un vértice. */
export type DatosDesliza = {
  recta: [Pt, Pt];
  punto: Pt;
  traza: [Pt, Pt];
  /** Si está, el instrumento hace un ángulo (con cartabón o escuadra) en `punto` en vez de una perpendicular. */
  angulo?: { base: number; obj: number; signo?: 1 | -1 };
  /** Factor de tamaño de los instrumentos (1 = tamaño normal): se dibujan a escala, con el filo en el mismo sitio. */
  escala?: number;
  /** Puntos que los instrumentos no deben tapar. */
  importantes?: Pt[];
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

/** Geometría de un instrumento que desliza: perpendicular con escuadra y cartabón, o ángulo con uno de ellos (colocación planificada en `desliza-plan`). */
export function geoDesliza(d: DatosDesliza): Desliza {
  const imp = d.importantes ?? [];
  if (d.angulo && instrumentoAngulo(d.angulo.obj)) {
    const largoTrazo = dist(d.traza[0], d.traza[1]);
    const plan = planAngulo(d.punto, d.angulo.base, d.angulo.obj, d.angulo.signo ?? 1, largoTrazo, imp);
    const nombre = instrumentoAngulo(d.angulo.obj) === "escuadra45" ? "la escuadra" : "el cartabón";
    return { ...plan, marca: d.punto, texto: `arrastra ${nombre} a lo largo de la recta hasta que su vértice de ${d.angulo.obj}° llegue al punto resaltado.` };
  }
  const plan = planPerp(d.recta, d.punto, d.traza, imp);
  return { ...plan, marca: d.punto, texto: "arrastra la escuadra sobre el cartabón hasta que su filo pase por el punto resaltado." };
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
      {entra > 0 && p < 0.94 ? (() => {
        const { p: q, dir } = g.filo(s);
        return <line data-testid="bench-guia-filo" x1={q[0] - dir[0] * 420} y1={q[1] - dir[1] * 420} x2={q[0] + dir[0] * 420} y2={q[1] + dir[1] * 420} stroke="#e0a100" strokeWidth="1.3" strokeDasharray="8 6" opacity={0.9 * entra} pointerEvents="none" />;
      })() : null}
      {traza > 0 ? <Seg a={linea[0]} b={fin} color={color} w={w} /> : null}
      {p < 1 ? g.nodo(s, entra * (1 - sale)) : null}
    </g>
  );
}

/** Perpendicular con escuadra y cartabón (animación). */
export function AnimPerpendicular({ recta, punto, linea, p, color, w }: { recta: [Pt, Pt]; punto: Pt; linea: [Pt, Pt]; p: number; color?: string; w?: number }) {
  return <AnimDesliza datos={{ recta, punto, traza: linea }} p={p} color={color} w={w} />;
}
