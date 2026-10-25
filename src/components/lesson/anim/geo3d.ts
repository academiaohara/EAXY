/** Rectas y planos del espacio con enteros: ecuaciones y posiciones relativas por rangos. */
import { analizarSistema, mat, q, qAdd, qDiv, qMul, qShow, qSub, rango, type AnalisisSistema, type Q } from "@/components/lesson/anim/matrices";
import { cross, dot, norma2, raizTxt, restaV, type V3 } from "@/components/lesson/anim/vec3";

export type Plano = [number, number, number, number];

export const puntoRecta = (P: V3, v: V3, t: number): V3 => [P[0] + t * v[0], P[1] + t * v[1], P[2] + t * v[2]];

const mcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mcd(b, a % b));

/** Plano con normal `n` por `P`, con coeficientes enteros sin factor común. */
export const planoPuntoNormal = (P: V3, n: V3): Plano => {
  const d = -dot(n, P);
  const g = [n[0], n[1], n[2], d].reduce((a, b) => mcd(a, b), 0) || 1;
  return [n[0] / g, n[1] / g, n[2] / g, d / g];
};

export function planoTresPuntos(A: V3, B: V3, C: V3): Plano {
  const n = cross(restaV(B, A), restaV(C, A));
  return planoPuntoNormal(A, n);
}

export const normalPlano = (p: Plano): V3 => [p[0], p[1], p[2]];
export const evaluaPlano = (p: Plano, X: V3) => p[0] * X[0] + p[1] * X[1] + p[2] * X[2] + p[3];

/** Ecuación general en texto: `2x − y + 3z − 5 = 0`. */
export function planoTxt(p: Plano): string {
  const nombres = ["x", "y", "z"];
  let out = "";
  for (let i = 0; i < 3; i++) {
    const c = p[i]!;
    if (c === 0) continue;
    const abs = Math.abs(c) === 1 ? "" : String(Math.abs(c));
    out += out === "" ? `${c < 0 ? "−" : ""}${abs}${nombres[i]}` : ` ${c < 0 ? "−" : "+"} ${abs}${nombres[i]}`;
  }
  if (p[3] !== 0) out += ` ${p[3] < 0 ? "−" : "+"} ${Math.abs(p[3])}`;
  return `${out || "0"} = 0`;
}

/** Dirección y un punto de la recta intersección de dos planos no paralelos. */
export function rectaDeDosPlanos(a: Plano, b: Plano): { v: V3; P: Q[] } | null {
  const v = cross(normalPlano(a), normalPlano(b));
  if (v[0] === 0 && v[1] === 0 && v[2] === 0) return null;
  const libre = v.findIndex((x) => x !== 0);
  const otras = [0, 1, 2].filter((i) => i !== libre);
  const A = mat([otras.map((i) => a[i]!), otras.map((i) => b[i]!)]);
  const an = analizarSistema(A, mat([[-a[3]], [-b[3]]]));
  const sol = an.solucion!;
  const P: Q[] = [sol[0]!, sol[0]!, sol[0]!];
  P[libre] = { n: 0, d: 1 };
  otras.forEach((i, k) => (P[i] = sol[k]!));
  return { v, P };
}

export type PosRectas = { tipo: "coincidentes" | "paralelas" | "secantes" | "cruzan"; r1: number; r2: number; punto?: Q[] };

/** Posición de dos rectas `P + t·u` y `Q + s·v` con los rangos de {u, v} y de {u, v, PQ}. */
export function posRectas(P: V3, u: V3, Q0: V3, v: V3): PosRectas {
  const PQ = restaV(Q0, P);
  const r1 = rango(mat([u, v]));
  const r2 = rango(mat([u, v, PQ]));
  if (r1 === 1) return { tipo: r2 === 1 ? "coincidentes" : "paralelas", r1, r2 };
  if (r2 === 2) {
    const an = analizarSistema(mat([[u[0], -v[0]], [u[1], -v[1]], [u[2], -v[2]]]), mat([[PQ[0]], [PQ[1]], [PQ[2]]]));
    const t = an.solucion![0]!;
    return { tipo: "secantes", r1, r2, punto: P.map((p, i) => ({ n: p * t.d + u[i]! * t.n, d: t.d })) };
  }
  return { tipo: "cruzan", r1, r2 };
}

export type PosRectaPlano = { tipo: "contenida" | "paralela" | "secante"; t?: Q; punto?: Q[] };

export function posRectaPlano(P: V3, v: V3, p: Plano): PosRectaPlano {
  const nv = dot(normalPlano(p), v);
  const np = evaluaPlano(p, P);
  if (nv === 0) return { tipo: np === 0 ? "contenida" : "paralela" };
  const t: Q = { n: -np, d: nv };
  const g = (a: number, b: number): number => (b === 0 ? Math.abs(a) : g(b, a % b));
  const k = g(t.n, t.d) || 1;
  const s = nv < 0 ? -1 : 1;
  const tr: Q = { n: (s * t.n) / k, d: (s * t.d) / k };
  return { tipo: "secante", t: tr, punto: P.map((x, i) => ({ n: x * tr.d + v[i]! * tr.n, d: tr.d })) };
}

export type PosPlanos = { tipo: "coincidentes" | "paralelos" | "secantes"; r1: number; r2: number };

export function posPlanos(a: Plano, b: Plano): PosPlanos {
  const r1 = rango(mat([[a[0], a[1], a[2]], [b[0], b[1], b[2]]]));
  const r2 = rango(mat([a, b]));
  return { tipo: r1 === 2 ? "secantes" : r2 === 1 ? "coincidentes" : "paralelos", r1, r2 };
}

export type PosTres = { an: AnalisisSistema; texto: string; caso: string };

/** Posición relativa de tres planos con Rouché–Frobenius sobre el sistema de sus ecuaciones. */
export function posTresPlanos(p1: Plano, p2: Plano, p3: Plano): PosTres {
  const ps = [p1, p2, p3];
  const an = analizarSistema(mat(ps.map((p) => [p[0], p[1], p[2]])), mat(ps.map((p) => [-p[3]])));
  const pares = [posPlanos(p1, p2), posPlanos(p1, p3), posPlanos(p2, p3)];
  const algunoCoinc = pares.some((q) => q.tipo === "coincidentes");
  const algunoPar = pares.some((q) => q.tipo === "paralelos");
  let texto: string;
  let caso: string;
  if (an.rA === 3) {
    texto = "Se cortan en un punto";
    caso = "punto";
  } else if (an.rA === 2 && an.rAmp === 2) {
    texto = algunoCoinc ? "Dos coinciden y el tercero los corta en una recta" : "Se cortan en una recta (haz de planos)";
    caso = algunoCoinc ? "dos-coinciden" : "recta";
  } else if (an.rA === 2) {
    texto = algunoPar ? "Dos son paralelos y el tercero los corta" : "Se cortan dos a dos formando un prisma";
    caso = algunoPar ? "dos-paralelos" : "prisma";
  } else if (an.rAmp === 1) {
    texto = "Los tres coinciden";
    caso = "coinciden";
  } else {
    texto = algunoCoinc ? "Dos coinciden y el tercero es paralelo" : "Los tres son paralelos";
    caso = algunoCoinc ? "dos-coinciden-par" : "paralelos";
  }
  return { an, texto, caso };
}

export const puntoTxt = (p: Q[]) => `(${p.map(qShow).join(", ")})`;

/* ───────────── Geometría métrica: proyecciones, simétricos, distancias y ángulos ───────────── */


/** Proyección ortogonal de un punto sobre un plano (coordenadas racionales). */
export function proyeccionPuntoPlano(P: V3, p: Plano): Q[] {
  const n = normalPlano(p);
  const t = qDiv(q(-evaluaPlano(p, P)), q(norma2(n)));
  return P.map((x, i) => qAdd(q(x), qMul(t, q(n[i]!))));
}

/** Proyección ortogonal de un punto sobre la recta `A + λ·v`. */
export function proyeccionPuntoRecta(P: V3, A: V3, v: V3): Q[] {
  const l = qDiv(q(dot(restaV(P, A), v)), q(norma2(v)));
  return A.map((x, i) => qAdd(q(x), qMul(l, q(v[i]!))));
}

/** Simétrico de `P` respecto de un punto `M` (o de una proyección): `2M − P`. */
export const simetrico = (P: V3, M: Q[]): Q[] => M.map((m, i) => qSub(qMul(q(2), m), q(P[i]!)));

/** Raíz de un racional no negativo escrita como `a√b/c`. */
export function raizRacional(x: Q): string {
  if (x.n === 0) return "0";
  const nd = x.n * x.d;
  const base = raizTxt(nd);
  if (x.d === 1) return base;
  return `${base}/${x.d}`;
}

/** Valor decimal con coma, para acompañar a una distancia exacta. */
export const decEs = (x: number, d = 3) => x.toFixed(d).replace(".", ",").replace(/,?0+$/, "");

const abs2 = (x: Q): Q => qMul(x, x);

/** Distancia (cuadrado exacto) de un punto a un plano. */
export function dist2PuntoPlano(P: V3, p: Plano): Q {
  return qDiv(abs2(q(evaluaPlano(p, P))), q(norma2(normalPlano(p))));
}

/** Distancia (cuadrado exacto) de un punto a la recta `A + t·v`. */
export function dist2PuntoRecta(P: V3, A: V3, v: V3): Q {
  return qDiv(q(norma2(cross(restaV(P, A), v))), q(norma2(v)));
}

/** Distancia (cuadrado exacto) entre dos rectas que se cruzan o son paralelas. */
export function dist2Rectas(P: V3, u: V3, Q0: V3, v: V3): Q {
  const w = cross(u, v);
  if (norma2(w) === 0) return dist2PuntoRecta(Q0, P, u);
  const m = dot(restaV(Q0, P), w);
  return qDiv(q(m * m), q(norma2(w)));
}

/** Ángulo agudo (grados) entre dos rectas por sus vectores directores. */
export function anguloRectas(u: V3, v: V3): number {
  const c = Math.abs(dot(u, v)) / Math.sqrt(norma2(u) * norma2(v));
  return (Math.acos(Math.min(1, c)) * 180) / Math.PI;
}

/** Ángulo (grados) entre recta (dirección `v`) y plano (normal `n`). */
export function anguloRectaPlano(v: V3, n: V3): number {
  const s = Math.abs(dot(v, n)) / Math.sqrt(norma2(v) * norma2(n));
  return (Math.asin(Math.min(1, s)) * 180) / Math.PI;
}

/** Ángulo agudo entre dos planos por sus normales. */
export const anguloPlanos = anguloRectas;
