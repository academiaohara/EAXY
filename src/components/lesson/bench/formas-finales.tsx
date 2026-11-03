"use client";

import { angDe, dist, type Pt } from "./geometry";
import { INK } from "./scenes";
import { ArcoPlano } from "./scenes-trazados";

/** Resultado de una construcción dibujado en trazo grueso: circunferencia, arco de enlace o arco de parábola. */
export type FormaFinal =
  | { tipo: "circulo"; c: Pt; r: number; desde?: Pt; hasta?: Pt; por?: Pt }
  | { tipo: "curva"; a: Pt; c: Pt; b: Pt }
  | { tipo: "suave"; pts: Pt[] }
  | { tipo: "elipse"; c: Pt; a: number; b: number };

/** Ángulo inicial y recorrido (por el camino corto) de un arco de centro `c` entre `desde` y `hasta`. */
export function barrido(c: Pt, desde: Pt, hasta: Pt, por?: Pt): [number, number] {
  const a1 = angDe(c, desde);
  if (por) {
    const ccw = (((angDe(c, hasta) - a1) % 360) + 360) % 360;
    const pasa = (((angDe(c, por) - a1) % 360) + 360) % 360;
    return [a1, pasa <= ccw ? ccw : ccw - 360];
  }
  const delta = ((((angDe(c, hasta) - a1 + 180) % 360) + 360) % 360) - 180;
  return [a1, delta];
}

/** Trazado de una curva suave que pasa por los puntos (Catmull-Rom convertida a curvas de Bézier cúbicas). */
export function trazadoSuave(p: Pt[]): string {
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i += 1) {
    const a = p[Math.max(0, i - 1)];
    const b = p[i];
    const c = p[i + 1];
    const e = p[Math.min(p.length - 1, i + 2)];
    d += ` C${b[0] + (c[0] - a[0]) / 6} ${b[1] + (c[1] - a[1]) / 6} ${c[0] - (e[0] - b[0]) / 6} ${c[1] - (e[1] - b[1]) / 6} ${c[0]} ${c[1]}`;
  }
  return d;
}

/** Forma final dibujada hasta la fracción `t` (de 0 a 1). */
export function FormaTrazo({ forma, t, w = 3 }: { forma: FormaFinal; t: number; w?: number }) {
  if (t <= 0) return null;
  if (forma.tipo === "curva") {
    const d = `M${forma.a[0]} ${forma.a[1]} Q${forma.c[0]} ${forma.c[1]} ${forma.b[0]} ${forma.b[1]}`;
    return <path d={d} pathLength={1} strokeDasharray={`${Math.min(1, t)} 1.01`} fill="none" stroke={INK} strokeWidth={w} strokeLinecap="round" data-testid="bench-forma-final" />;
  }
  if (forma.tipo === "elipse") {
    return <ellipse cx={forma.c[0]} cy={forma.c[1]} rx={forma.a} ry={forma.b} pathLength={1} strokeDasharray={`${Math.min(1, t)} 1.01`} fill="none" stroke={INK} strokeWidth={w} data-testid="bench-forma-final" />;
  }
  if (forma.tipo === "suave") {
    return <path d={trazadoSuave(forma.pts)} pathLength={1} strokeDasharray={`${Math.min(1, t)} 1.01`} fill="none" stroke={INK} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" data-testid="bench-forma-final" />;
  }
  if (!forma.desde || !forma.hasta) {
    return t >= 0.999 ? (
      <circle cx={forma.c[0]} cy={forma.c[1]} r={forma.r} fill="none" stroke={INK} strokeWidth={w} data-testid="bench-forma-final" />
    ) : (
      <g data-testid="bench-forma-final">
        <ArcoPlano c={forma.c} r={forma.r} a1={-90} a2={-90 + 360 * t} color={INK} grosor={w} />
      </g>
    );
  }
  const [a1, delta] = barrido(forma.c, forma.desde, forma.hasta, forma.por);
  return (
    <g data-testid="bench-forma-final">
      <ArcoPlano c={forma.c} r={forma.r} a1={a1} a2={a1 + delta * Math.min(1, t)} color={INK} grosor={w} />
    </g>
  );
}

/** Radio de la forma que pasa por `p` con centro `c`. */
export const radioPor = (c: Pt, p: Pt) => dist(c, p);
