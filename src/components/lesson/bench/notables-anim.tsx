"use client";

import type { ReactNode } from "react";
import { AnimPerpendicular } from "./escuadra-perpendicular";
import { angDe, clamp, dist, enCirculo, interseccionCirculos, puntoMedio, type Pt } from "./geometry";
import { Compas, poseCompas } from "./instruments";
import { ArcoAnim, ReglaTrazando, lerp, tramo } from "./scenes-compas";
import { ArcoPlano } from "./scenes-trazados";

/**
 * Cómo se trazan las rectas notables con los instrumentos (explicación de «puntos notables»): bisectrices y
 * mediatrices con el compás y la regla, alturas con escuadra y cartabón. Las rectas se quedan (finas, de su color);
 * los arcos auxiliares desaparecen. Al final, la circunferencia inscrita o circunscrita sale clavando el compás en el centro.
 */
const grados = (rad: number) => (rad * 180) / Math.PI;

type Resultado = { nodos: ReactNode; pose: ReturnType<typeof poseCompas> | null; punto: boolean };

/** Circunferencia con centro `c` y radio `r`: la mina recorre una vuelta completa. `t` va de 0 a 1. */
function circuloAnim(c: Pt, r: number, t: number, color: string): { nodo: ReactNode; pose: ReturnType<typeof poseCompas> | null } {
  if (t <= 0) return { nodo: null, pose: null };
  const completo = t >= 0.999;
  return {
    nodo: completo ? <circle cx={c[0]} cy={c[1]} r={r} fill="none" stroke={color} strokeWidth="1.8" /> : <ArcoPlano c={c} r={r} a1={-90} a2={-90 + 360 * t} color={color} grosor={1.8} />,
    pose: t < 1 ? poseCompas(c, enCirculo(c, r, lerp(-90, 270, t))) : null,
  };
}

const CompasPose = ({ pose }: { pose: NonNullable<Resultado["pose"]> }) => (
  <g data-testid="bench-compas" pointerEvents="none">
    <Compas pose={pose.pose} open={pose.open} />
  </g>
);

function juntar(partes: { nodo: ReactNode; pose: Resultado["pose"] }[], punto: boolean, extra: ReactNode = null): Resultado {
  const pose = partes.map((x) => x.pose).find((x) => x !== null) ?? null;
  return { nodos: <g>{partes.map((x, i) => <g key={i}>{x.nodo}</g>)}{extra}{pose ? <CompasPose pose={pose} /> : null}</g>, pose, punto };
}

/* ───────────── Bisectrices ───────────── */

function unaBisectriz(V: Pt, S0: Pt, S1: Pt, p: number, color: string, largoRecta: number) {
  const a0 = angDe(V, S0);
  const a1 = angDe(V, S1);
  const alfa = ((((a1 - a0 + 180) % 360) + 360) % 360) - 180;
  const sg = alfa >= 0 ? 1 : -1;
  const r1 = Math.min(dist(V, S0), dist(V, S1)) * 0.36;
  const P = enCirculo(V, r1, a0);
  const Q = enCirculo(V, r1, a1);
  /** Ángulo final del arco, siguiendo el camino corto desde `a0` (evita dar la vuelta larga si `atan2` devuelve ±180°). */
  const fin0 = a0 + alfa;
  const d = dist(P, Q);
  const r2 = Math.max(d * 0.66, 30);
  const T = (interseccionCirculos(P, r2, Q, r2) as [Pt, Pt]).reduce((m, x) => (dist(x, V) > dist(m, V) ? x : m));
  const th = grados(Math.acos(clamp(d / (2 * r2), 0, 1))) + 14;
  const t1 = tramo(p, 0, 0.26);
  const t2 = tramo(p, 0.26, 0.5);
  const t3 = tramo(p, 0.5, 0.72);
  const t4 = tramo(p, 0.74, 0.96);
  const fin = enCirculo(V, largoRecta, angDe(V, T));
  const arcos = (
    <g opacity={1 - tramo(p, 0.96, 1)}>
      <ArcoAnim c={V} r={r1} a1={a0 - 8 * sg} a2={fin0 + 8 * sg} t={t1} />
      <ArcoAnim c={P} r={r2} a1={angDe(P, Q) - th} a2={angDe(P, Q) + th} t={t2} />
      <ArcoAnim c={Q} r={r2} a1={angDe(Q, P) + th} a2={angDe(Q, P) - th} t={t3} />
    </g>
  );
  const pose =
    p < 0.26 ? poseCompas(V, enCirculo(V, r1, lerp(a0 - 8 * sg, fin0 + 8 * sg, t1)))
    : p < 0.5 ? poseCompas(P, enCirculo(P, r2, lerp(angDe(P, Q) - th, angDe(P, Q) + th, t2)))
    : p < 0.72 ? poseCompas(Q, enCirculo(Q, r2, lerp(angDe(Q, P) + th, angDe(Q, P) - th, t3)))
    : null;
  const recta = p >= 0.74 ? <ReglaTrazando a={V} b={fin} p={t4} ext={0} color={color} w={2} /> : null;
  return { nodo: <g>{arcos}{recta}</g>, pose: p > 0 && p < 1 ? pose : null };
}

export function animBisectrices(A: Pt, B: Pt, C: Pt, I: Pt, rI: number, p: number, color: string): Resultado {
  const vs: [Pt, Pt, Pt][] = [[A, B, C], [B, A, C], [C, A, B]];
  const largo = [dist(A, puntoMedio(B, C)) * 1.05, dist(B, puntoMedio(A, C)) * 1.05, dist(C, puntoMedio(A, B)) * 1.05];
  const partes = vs.map(([V, S0, S1], i) => unaBisectriz(V, S0, S1, tramo(p, i * 0.26, i * 0.26 + 0.26), color, largo[i]));
  const circ = circuloAnim(I, rI, tramo(p, 0.84, 1), color);
  return juntar([...partes, circ], p >= 0.8);
}

/* ───────────── Mediatrices ───────────── */

function unaMediatriz(a: Pt, b: Pt, p: number, color: string) {
  const d = dist(a, b);
  const r = 0.58 * d;
  const [c1, c2] = interseccionCirculos(a, r, b, r) as [Pt, Pt];
  const th = grados(Math.acos(clamp(d / (2 * r), 0, 1))) + 14;
  const t1 = tramo(p, 0, 0.3);
  const t2 = tramo(p, 0.3, 0.6);
  const t3 = tramo(p, 0.66, 0.96);
  const arcos = (
    <g opacity={1 - tramo(p, 0.96, 1)}>
      <ArcoAnim c={a} r={r} a1={angDe(a, b) - th} a2={angDe(a, b) + th} t={t1} />
      <ArcoAnim c={b} r={r} a1={angDe(b, a) + th} a2={angDe(b, a) - th} t={t2} />
    </g>
  );
  const pose =
    p < 0.3 ? poseCompas(a, enCirculo(a, r, lerp(angDe(a, b) - th, angDe(a, b) + th, t1)))
    : p < 0.6 ? poseCompas(b, enCirculo(b, r, lerp(angDe(b, a) + th, angDe(b, a) - th, t2)))
    : null;
  const recta = p >= 0.66 ? <ReglaTrazando a={c1} b={c2} p={t3} ext={22} color={color} w={2} /> : null;
  return { nodo: <g>{arcos}{recta}</g>, pose: p > 0 && p < 1 ? pose : null };
}

export function animMediatrices(A: Pt, B: Pt, C: Pt, O: Pt, p: number, color: string): Resultado {
  const lados: [Pt, Pt][] = [[A, B], [B, C], [A, C]];
  const partes = lados.map(([a, b], i) => unaMediatriz(a, b, tramo(p, i * 0.25, i * 0.25 + 0.25), color));
  const circ = circuloAnim(O, dist(O, A), tramo(p, 0.82, 1), color);
  return juntar([...partes, circ], p >= 0.77);
}

/* ───────────── Alturas (escuadra y cartabón) ───────────── */

export function animAlturas(A: Pt, B: Pt, C: Pt, pies: [Pt, Pt, Pt], p: number, color: string): Resultado {
  const casos: { V: Pt; L: [Pt, Pt]; F: Pt }[] = [
    { V: C, L: [A, B], F: pies[2] },
    { V: B, L: [A, C], F: pies[1] },
    { V: A, L: [B, C], F: pies[0] },
  ];
  const nodos = casos.map(({ V, L, F }, i) => (
    <AnimPerpendicular key={i} recta={L} punto={V} linea={[V, [F[0] + (F[0] - V[0]) * 0.1, F[1] + (F[1] - V[1]) * 0.1]]} p={tramo(p, i * 0.31, i * 0.31 + 0.31)} color={color} w={2} />
  ));
  return { nodos: <g>{nodos}</g>, pose: null, punto: p >= 0.95 };
}

