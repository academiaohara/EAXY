"use client";

import type { ReactNode } from "react";
import type { Pose, Pt } from "./geometry";
import { Cartabon, Escuadra } from "./instruments";
import { BORDES, CAR_V, ESCALAS, ESC_V, InstrumentosParalela, cross, dentro, dot, giroPara, largo, solape, sub, unit, vertices, type PlanParalela } from "./paralela-plan";

/**
 * Planificación (como en `planParalela`) de las pasadas de escuadra y cartabón que trazan una perpendicular por un punto
 * o un ángulo de 30°, 45° o 60°: se prueban distintos bordes, lados y tamaños y se elige la colocación físicamente posible,
 * con el menor aumento de tamaño, sin tapar los puntos importantes y con un movimiento sencillo. El instrumento desliza
 * rígidamente (sin girar) hasta que su borde de dibujo pasa por el punto o por el vértice.
 */

/** Recorrido (mm) del instrumento desde que entra hasta que llega a su sitio. */
export const RECORRIDO = 140;

export type PlanDesliza = {
  u: Pt;
  objetivo: number;
  max: number;
  nodo: (s: number, opacidad?: number) => ReactNode;
  /** Un punto del borde de dibujo y su dirección tras deslizar `s`. */
  filo: (s: number) => { p: Pt; dir: Pt };
  /** Extremos reales del borde de dibujo tras deslizar `s`. */
  borde: (s: number) => [Pt, Pt];
  config: Record<string, number | boolean>;
};

/** Que un instrumento tape un punto importante pesa poco: se retira al terminar el trazo; importa más no usar instrumentos de más. */
const PESO_TAPADO = 1500;

const cache = new Map<string, PlanDesliza>();
const r = (p: Pt) => `${Math.round(p[0])},${Math.round(p[1])}`;
const fueraHoja = (p: Pt) => Math.max(0, 8 - p[0]) + Math.max(0, p[0] - 612) + Math.max(0, 8 - p[1]) + Math.max(0, p[1] - 372);
const aEscala = (p: Pose, k: number) => `translate(${p.x} ${p.y}) scale(${k}) translate(${-p.x} ${-p.y})`;

/* ───────────── Perpendicular ───────────── */

export function planPerp(recta: [Pt, Pt], P: Pt, traza: [Pt, Pt], importantes: Pt[] = []): PlanDesliza {
  const clave = ["perp", r(recta[0]), r(recta[1]), r(P), r(traza[0]), r(traza[1]), importantes.map(r).join(";")].join("|");
  const hecho = cache.get(clave);
  if (hecho) return hecho;
  const plan = calcularPerp(recta, P, traza, importantes);
  cache.set(clave, plan);
  return plan;
}

function calcularPerp(recta: [Pt, Pt], P: Pt, traza: [Pt, Pt], importantes: Pt[]): PlanDesliza {
  const u = unit(sub(recta[1], recta[0]));
  const nrm: Pt = [-u[1], u[0]];
  const tau = RECORRIDO;
  let mejor: { coste: number; plan: PlanDesliza } | null = null;

  // Solo la escuadra: un cateto apoyado en la propia recta y el otro, perpendicular, que pasa por P. Desliza por la recta.
  const foot: Pt = (() => {
    const t = dot(sub(P, recta[0]), u);
    return [recta[0][0] + u[0] * t, recta[0][1] + u[1] * t];
  })();
  const distP = Math.hypot(P[0] - foot[0], P[1] - foot[1]);
  const lado = traza.reduce((a, q) => a + dot(sub(q, foot), nrm), 0);
  const ladoTraza = Math.abs(lado) > 2 ? Math.sign(lado) : 0;
  for (const [iD, iS] of [[0, 1], [1, 0]]) {
    const [Da, Db] = BORDES[iD];
    const [Sa, Sb] = BORDES[iS];
    const dLocal = unit(sub(ESC_V[Db], ESC_V[Da]));
    for (const espejo of [false, true]) {
      for (const e of [1, -1]) {
        const rotE = giroPara(dLocal, espejo, [e * nrm[0], e * nrm[1]]);
        // el borde de dibujo sale del pie de la perpendicular hacia P (o hacia el trazo si P está en la recta)
        // (si P está en la propia recta, sirve cualquiera de los dos sentidos y se elige el que mejor quepa)
        if (distP > 1 && dot([e * nrm[0], e * nrm[1]], unit(sub(P, foot))) < 0.5) continue;
        // Si P está en la recta, el instrumento va del lado hacia el que se dibuja la perpendicular (donde está el trazo).
        if (distP <= 1 && ladoTraza !== 0 && e * ladoTraza < 0) continue;
        for (const se of ESCALAS) {
          const W = vertices(ESC_V, rotE, espejo, se);
          const lD = largo(sub(W[Db], W[Da]));
          if (distP > 0.9 * lD) continue;
          const phi = unit(sub(W[Sb], W[Sa]));
          for (const sigma of [1, -1]) {
            const v: Pt = [sigma * phi[0], sigma * phi[1]];
            const dirD = unit(sub(W[Db], W[Da]));
            const originEn = (s: number): Pt => [foot[0] - W[Da][0] + v[0] * (s - tau), foot[1] - W[Da][1] + v[1] * (s - tau)];
            const inicioD = (s: number): Pt => {
              const o = originEn(s);
              return [o[0] + W[Da][0], o[1] + W[Da][1]];
            };
            const fT = [traza[0], traza[1]].map((q) => dot(sub(q, foot), dirD) / lD);
            const sinCubrir = lD * (Math.max(0, -Math.min(...fT)) + Math.max(0, Math.max(...fT) - 1));
            let coste = sinCubrir * 0.6 + (se - 1) * 400 + (espejo ? 8 : 0);
            const tapados = new Set<number>();
            let fuera = 0;
            for (const s of [0, tau]) {
              const o = originEn(s);
              const te = W.map((w) => [o[0] + w[0], o[1] + w[1]] as Pt);
              importantes.forEach((p, k) => {
                if (Math.hypot(P[0] - p[0], P[1] - p[1]) < 3) return;
                if (dentro(p, te, 5)) tapados.add(k);
              });
              for (const p of te) fuera += fueraHoja(p);
            }
            coste += tapados.size * PESO_TAPADO + fuera * 0.6;
            if (mejor && coste >= mejor.coste) continue;
            const pose: Pose = { x: 0, y: 0, rot: rotE, mirror: espejo };
            mejor = {
              coste,
              plan: {
                u: v,
                objetivo: tau,
                max: tau + 90,
                nodo: (s, opacidad = 1) => {
                  const o = originEn(s);
                  const p: Pose = { ...pose, x: o[0], y: o[1] };
                  return (
                    <g data-testid="bench-instrumentos" pointerEvents="none" opacity={opacidad}>
                      <g transform={aEscala(p, se)}>
                        <Escuadra pose={p} />
                      </g>
                    </g>
                  );
                },
                filo: (s) => ({ p: inicioD(s), dir: dirD }),
                borde: (s) => {
                  const a0 = inicioD(s);
                  return [a0, [a0[0] + dirD[0] * lD, a0[1] + dirD[1] * lD]];
                },
                config: { solo: true, dibujo: iD, apoyo: iS, escuadra: se, contacto: 1e9 },
              },
            };
          }
        }
      }
    }
  }
  const dosInstrumentos = 6000;

  for (let iD = 0; iD < 3; iD += 1) {
    for (let iS = 0; iS < 3; iS += 1) {
      if (iS === iD) continue;
      const [Da, Db] = BORDES[iD];
      const [Sa, Sb] = BORDES[iS];
      const dLocal = unit(sub(ESC_V[Db], ESC_V[Da]));
      for (const espejo of [false, true]) {
        for (const e of [1, -1]) {
          const rotE = giroPara(dLocal, espejo, [e * nrm[0], e * nrm[1]]);
          for (const se of ESCALAS) {
            const W = vertices(ESC_V, rotE, espejo, se);
            const dirD = unit(sub(W[Db], W[Da]));
            const lD = largo(sub(W[Db], W[Da]));
            const lS = largo(sub(W[Sb], W[Sa]));
            const phi = unit(sub(W[Sb], W[Sa]));
            const tercero = [0, 1, 2].find((i) => i !== Sa && i !== Sb)!;
            for (const sigma of [1, -1]) {
              const v: Pt = [sigma * phi[0], sigma * phi[1]];
              for (const f of [0.25, 0.4, 0.5, 0.6, 0.75]) {
                // posición final: P a la fracción `f` del borde de dibujo; la inicial, `tau` atrás por la guía
                const inicioD: Pt = [P[0] - dirD[0] * f * lD, P[1] - dirD[1] * f * lD];
                const Of: Pt = [inicioD[0] - W[Da][0], inicioD[1] - W[Da][1]];
                const originEn = (s: number): Pt => [Of[0] + v[0] * (s - tau), Of[1] + v[1] * (s - tau)];
                const fT = [traza[0], traza[1]].map((q) => dot(sub(q, inicioD), dirD) / lD);
                const sinCubrir = lD * (Math.max(0, -Math.min(...fT)) + Math.max(0, Math.max(...fT) - 1));
                const W0: Pt = [originEn(0)[0] + W[Sa][0], originEn(0)[1] + W[Sa][1]];
                const dS = dot(sub(W[Sb], W[Sa]), v);
                const sLo = Math.min(0, dS);
                const sHi = Math.max(0, dS);
                const ladoE = Math.sign(cross(v, sub(W[tercero], W[Sa])));
                const triE = (s: number) => {
                  const o = originEn(s);
                  return W.map((w) => [o[0] + w[0], o[1] + w[1]] as Pt);
                };
                const base = sinCubrir * 0.6 + (se - 1) * 400 + Math.abs(f - 0.5) * 100 + (iD === 2 ? 30 : 0) + (iS === 2 ? 10 : 0) + (espejo ? 8 : 0) + 25 * (1 - Math.abs(dot(v, u)));
                if (mejor && base >= mejor.coste) continue;
                for (let iG = 0; iG < 3; iG += 1) {
                  const [Ga, Gb] = BORDES[iG];
                  const gLocal = unit(sub(CAR_V[Gb], CAR_V[Ga]));
                  const terceroC = [0, 1, 2].find((i) => i !== Ga && i !== Gb)!;
                  for (const sc of ESCALAS) {
                    const g = largo(sub(CAR_V[Gb], CAR_V[Ga])) * sc;
                    for (const espejoC of [false, true]) {
                      for (const fl of [1, -1]) {
                        const rotC = giroPara(gLocal, espejoC, [fl * v[0], fl * v[1]]);
                        const Wc = vertices(CAR_V, rotC, espejoC, sc);
                        if (Math.sign(cross(v, sub(Wc[terceroC], Wc[Ga]))) !== -ladoE) continue;
                        let mejorG0 = 0;
                        let contacto = -1;
                        for (let g0 = sLo - g + 10; g0 <= tau + sHi - 10; g0 += 5) {
                          const c = Math.min(solape(0, dS, g0, g0 + g), solape(tau, tau + dS, g0, g0 + g));
                          if (c > contacto) {
                            contacto = c;
                            mejorG0 = g0;
                          }
                        }
                        const minimo = Math.min(60, 0.5 * Math.min(lS, g));
                        let coste = base + dosInstrumentos + (sc - 1) * 400 + (iG === 0 ? 0 : 15) + (espejoC ? 4 : 0);
                        if (contacto < minimo) coste += 1e6 + (minimo - contacto) * 1000;
                        if (mejor && coste >= mejor.coste) continue;
                        const lamGa = fl === 1 ? mejorG0 : mejorG0 + g;
                        const Cx: Pt = [W0[0] + v[0] * lamGa - Wc[Ga][0], W0[1] + v[1] * lamGa - Wc[Ga][1]];
                        const triC = Wc.map((w) => [Cx[0] + w[0], Cx[1] + w[1]] as Pt);
                        const tapados = new Set<number>();
                        let fuera = 0;
                        for (const s of [0, tau]) {
                          const te = triE(s);
                          importantes.forEach((p, k) => {
                            if (Math.hypot(P[0] - p[0], P[1] - p[1]) < 3) return;
                            if (dentro(p, te, 5) || dentro(p, triC, 5)) tapados.add(k);
                          });
                          for (const t of [te, triC]) for (const p of t) fuera += fueraHoja(p);
                        }
                        coste += tapados.size * PESO_TAPADO + fuera * 0.6;
                        if (mejor && coste >= mejor.coste) continue;
                        const pose: Pose = { x: 0, y: 0, rot: rotE, mirror: espejo };
                        const cart: Pose = { x: Cx[0], y: Cx[1], rot: rotC, mirror: espejoC };
                        const paraPlan: PlanParalela = {
                          escala: { escuadra: se, cartabon: sc },
                          desliza: v,
                          sps: [tau],
                          poseEscuadra: (s) => {
                            const o = originEn(s);
                            return { ...pose, x: o[0], y: o[1] };
                          },
                          poseCartabon: cart,
                          filo: (s) => {
                            const o = originEn(s);
                            return [[o[0] + W[Da][0], o[1] + W[Da][1]], [o[0] + W[Db][0], o[1] + W[Db][1]]];
                          },
                          config: { dibujo: iD, apoyo: iS, guia: iG, contacto, puntoEnBorde: [f] },
                        };
                        mejor = {
                          coste,
                          plan: {
                            u: v,
                            objetivo: tau,
                            max: tau + 90,
                            nodo: (s, opacidad = 1) => <InstrumentosParalela plan={paraPlan} s={s} opacidad={opacidad} />,
                            filo: (s) => ({ p: paraPlan.filo(s)[0], dir: dirD }),
                            borde: paraPlan.filo,
                            config: { dibujo: iD, apoyo: iS, guia: iG, contacto, escuadra: se, cartabon: sc },
                          },
                        };
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return mejor!.plan;
}

/* ───────────── Ángulo de 30°, 45° o 60° con un solo instrumento ───────────── */

export function planAngulo(v: Pt, base: number, obj: number, signo: 1 | -1, largoTrazo: number, importantes: Pt[] = []): PlanDesliza {
  const clave = ["ang", r(v), base, obj, signo, Math.round(largoTrazo), importantes.map(r).join(";")].join("|");
  const hecho = cache.get(clave);
  if (hecho) return hecho;
  const plan = calcularAngulo(v, base, obj, signo, largoTrazo, importantes);
  cache.set(clave, plan);
  return plan;
}

function calcularAngulo(v: Pt, base: number, obj: number, signo: 1 | -1, largoTrazo: number, importantes: Pt[]): PlanDesliza {
  const rad = (d: number) => (d * Math.PI) / 180;
  const bdir: Pt = [Math.cos(rad(base)), -Math.sin(rad(base))];
  const rdir: Pt = [Math.cos(rad(base + signo * obj)), -Math.sin(rad(base + signo * obj))];
  const esEscuadra = obj === 45;
  const T = esEscuadra ? ESC_V : CAR_V;
  const tau = RECORRIDO;
  let mejor: { coste: number; plan: PlanDesliza } | null = null;

  for (let w = 0; w < 3; w += 1) {
    const otros = [0, 1, 2].filter((i) => i !== w);
    const angulo = (Math.abs(Math.atan2(cross(sub(T[otros[0]], T[w]), sub(T[otros[1]], T[w])), dot(sub(T[otros[0]], T[w]), sub(T[otros[1]], T[w])))) * 180) / Math.PI;
    if (Math.abs(angulo - obj) > 0.6) continue;
    for (const [iB, iD] of [[otros[0], otros[1]], [otros[1], otros[0]]]) {
      const eB = sub(T[iB], T[w]);
      const eD = sub(T[iD], T[w]);
      const espejo = Math.sign(cross(eB, eD)) !== -signo;
      const rot = giroPara(unit(eB), espejo, bdir);
      for (const sigma of [1, -1]) {
        for (const se of ESCALAS) {
          const W = vertices(T, rot, espejo, se);
          const lD = largo(sub(T[iD], T[w])) * se;
          // el vértice del ángulo W va al punto `v`; antes de llegar, `tau` atrás sobre la recta base
          const origenEn = (s: number): Pt => {
            const q: Pt = [v[0] + sigma * (s - tau) * bdir[0], v[1] + sigma * (s - tau) * bdir[1]];
            return [q[0] - W[w][0], q[1] - W[w][1]];
          };
          const tri = (s: number) => {
            const o = origenEn(s);
            return W.map((p) => [o[0] + p[0], o[1] + p[1]] as Pt);
          };
          let coste = Math.max(0, largoTrazo - lD) * 0.6 + (se - 1) * 400 + (iB === 2 ? 10 : 0) + (iD === 2 ? 0 : 5) + (espejo ? 6 : 0);
          const tapados = new Set<number>();
          let fuera = 0;
          for (const s of [0, tau]) {
            const t = tri(s);
            importantes.forEach((p, k) => {
              if (Math.hypot(v[0] - p[0], v[1] - p[1]) < 3) return;
              if (dentro(p, t, 5)) tapados.add(k);
            });
            for (const p of t) fuera += fueraHoja(p);
          }
          coste += tapados.size * PESO_TAPADO + fuera * 0.6;
          if (mejor && coste >= mejor.coste) continue;
          const pose = (s: number): Pose => {
            const o = origenEn(s);
            return { x: o[0], y: o[1], rot, mirror: espejo };
          };
          mejor = {
            coste,
            plan: {
              u: [sigma * bdir[0], sigma * bdir[1]],
              objetivo: tau,
              max: tau + 90,
              nodo: (s, opacidad = 1) => {
                const p = pose(s);
                return (
                  <g data-testid="bench-instrumentos" pointerEvents="none" opacity={opacidad}>
                    <g transform={aEscala(p, se)}>{esEscuadra ? <Escuadra pose={p} /> : <Cartabon pose={p} />}</g>
                  </g>
                );
              },
              filo: (s) => ({ p: [v[0] + sigma * (s - tau) * bdir[0], v[1] + sigma * (s - tau) * bdir[1]], dir: rdir }),
              borde: (s) => {
                const q: Pt = [v[0] + sigma * (s - tau) * bdir[0], v[1] + sigma * (s - tau) * bdir[1]];
                return [q, [q[0] + rdir[0] * lD, q[1] + rdir[1] * lD]];
              },
              config: { vertice: w, base: iB, dibujo: iD, escala: se, sentido: sigma },
            },
          };
        }
      }
    }
  }
  return mejor!.plan;
}
