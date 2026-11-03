"use client";

import { CARTABON_CORTO, CARTABON_LARGO, ESCUADRA_L, applyPose, type Pose, type Pt } from "./geometry";
import { Cartabon, Escuadra } from "./instruments";

/**
 * Trazado de una paralela con escuadra y cartabón, planificado como lo haría una persona: se elige qué borde de la
 * escuadra dibuja, cuál le sirve de apoyo, qué borde del cartabón es la guía fija y por qué lado se apoya, y se calcula
 * primero la posición final (el punto P en la zona central del borde de dibujo) y, hacia atrás, la inicial sobre la recta.
 *
 * Durante el movimiento el cartabón no se mueve y la escuadra desliza rígidamente (sin girar) por la guía, con los dos
 * bordes de apoyo en contacto. Los tamaños no cambian durante la animación: si hace falta más superficie de contacto o más
 * longitud de borde, se agrandan los instrumentos antes de empezar (siempre con sus proporciones reales).
 */

export const ESC_V: Pt[] = [[0, 0], [ESCUADRA_L, 0], [0, ESCUADRA_L]];
export const CAR_V: Pt[] = [[0, 0], [CARTABON_LARGO, 0], [0, CARTABON_CORTO]];
/** Bordes de un triángulo con vértice recto en el índice 0: cateto x, cateto y e hipotenusa. */
export const BORDES: [number, number][] = [[0, 1], [0, 2], [1, 2]];
export const ESCALAS = [1, 1.2, 1.45, 1.75, 2.1];

export const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
export const dot = (a: Pt, b: Pt) => a[0] * b[0] + a[1] * b[1];
export const cross = (a: Pt, b: Pt) => a[0] * b[1] - a[1] * b[0];
export const largo = (a: Pt) => Math.hypot(a[0], a[1]);
export const unit = (a: Pt): Pt => [a[0] / largo(a), a[1] / largo(a)];
export const grados = (v: Pt) => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

/** Vértices de un triángulo con la orientación (giro y volteo) y el tamaño dados, con el origen local en (0, 0). */
export function vertices(V: Pt[], rot: number, mirror: boolean, k: number): Pt[] {
  return V.map((v) => {
    const w = applyPose({ x: 0, y: 0, rot, mirror }, v);
    return [w[0] * k, w[1] * k] as Pt;
  });
}

/** Giro que lleva la dirección local `d` (tras el volteo) a la dirección del mundo `objetivo`. */
export function giroPara(d: Pt, mirror: boolean, objetivo: Pt): number {
  const m: Pt = [d[0], mirror ? -d[1] : d[1]];
  return grados(objetivo) - grados(m);
}

/** Longitud de solape de dos intervalos. */
export const solape = (a0: number, a1: number, b0: number, b1: number) => Math.max(0, Math.min(Math.max(a0, a1), Math.max(b0, b1)) - Math.max(Math.min(a0, a1), Math.min(b0, b1)));

/** ¿Está `p` dentro del triángulo (a distancia mayor que `margen` de sus bordes)? */
export function dentro(p: Pt, t: Pt[], margen: number) {
  let signo = 0;
  for (let i = 0; i < 3; i += 1) {
    const a = t[i];
    const b = t[(i + 1) % 3];
    const e = sub(b, a);
    const d = cross(e, sub(p, a)) / largo(e);
    if (Math.abs(d) <= margen) return false;
    const s = Math.sign(d);
    if (signo === 0) signo = s;
    else if (s !== signo) return false;
  }
  return true;
}

export type PlanParalela = {
  /** Tamaño de cada instrumento respecto del normal (1 = normal). */
  escala: { escuadra: number; cartabon: number };
  /** Dirección unitaria en la que desliza la escuadra (hacia los puntos). */
  desliza: Pt;
  /** Deslizamiento con el que el borde de dibujo pasa por cada punto. */
  sps: number[];
  /** Pose de la escuadra tras deslizar `s` (origen = vértice del ángulo recto; el tamaño va aparte en `escala`). */
  poseEscuadra: (s: number) => Pose;
  /** Pose del cartabón, fijo durante todo el movimiento. */
  poseCartabon: Pose;
  /** Extremos del borde de dibujo de la escuadra tras deslizar `s`. */
  filo: (s: number) => [Pt, Pt];
  /** Configuración elegida (para pruebas y depuración). */
  config: { dibujo: number; apoyo: number; guia: number; contacto: number; puntoEnBorde: number[] };
};

const cache = new Map<string, PlanParalela>();

export type OpcionesParalela = {
  /** Puntos que no conviene tapar con los instrumentos. */
  importantes?: Pt[];
  /** Trazo que se dibuja por cada punto (de `marcas[i]` a su extremo): conviene que quepa en el borde de dibujo. */
  trazos?: [Pt, Pt][];
};

/**
 * Plan de colocación para trazar, con escuadra y cartabón, las paralelas a la recta `a`–`b` por los puntos `marcas`.
 * Genera muchas colocaciones candidatas (bordes de dibujo, de apoyo y de guía, lado, volteo y tamaños) y escoge la mejor.
 */
export function planParalela(a: Pt, b: Pt, marcas: Pt[], opciones: OpcionesParalela = {}): PlanParalela {
  const redondea = (p: Pt) => `${Math.round(p[0])},${Math.round(p[1])}`;
  const clave = [redondea(a), redondea(b), marcas.map(redondea).join(";"), (opciones.importantes ?? []).map(redondea).join(";"), (opciones.trazos ?? []).map((t) => `${redondea(t[0])}-${redondea(t[1])}`).join(";")].join("|");
  const hecho = cache.get(clave);
  if (hecho) return hecho;
  const plan = calcular(a, b, marcas, opciones);
  cache.set(clave, plan);
  return plan;
}

function calcular(a: Pt, b: Pt, marcas: Pt[], opciones: OpcionesParalela): PlanParalela {
  const u = unit(sub(b, a));
  let n: Pt = [-u[1], u[0]];
  if (dot(sub(marcas[0], a), n) < 0) n = [-n[0], -n[1]];
  const ds = marcas.map((m) => dot(sub(m, a), n));
  const Xu = (q: Pt) => dot(sub(q, a), u);
  const importantes = opciones.importantes ?? [];
  const trazos = marcas.map((m, i) => opciones.trazos?.[i] ?? ([m, m] as [Pt, Pt]));
  let mejor: { coste: number; plan: PlanParalela } | null = null;

  for (let iD = 0; iD < 3; iD += 1) {
    for (let iS = 0; iS < 3; iS += 1) {
      if (iS === iD) continue;
      for (const espejo of [false, true]) {
        for (const e of [1, -1]) {
          const [Da, Db] = BORDES[iD];
          const [Sa, Sb] = BORDES[iS];
          const dLocal = unit(sub(ESC_V[Db], ESC_V[Da]));
          const rotE = giroPara(dLocal, espejo, [e * u[0], e * u[1]]);
          for (const se of ESCALAS) {
            const W = vertices(ESC_V, rotE, espejo, se);
            const lD = largo(sub(W[Db], W[Da]));
            const lS = largo(sub(W[Sb], W[Sa]));
            const phi = unit(sub(W[Sb], W[Sa]));
            const v: Pt = dot(phi, n) > 0 ? phi : [-phi[0], -phi[1]];
            const vn = dot(v, n);
            if (Math.abs(vn) < 0.5) continue;
            const ss = ds.map((d) => d / vn);
            const smin = Math.min(0, ...ss);
            const smax = Math.max(0, ...ss);
            // Posición lateral: se elige, entre las que dejan cada punto dentro del borde real de dibujo, la que cubre mejor el
            // trazo, deja los puntos hacia el centro y coloca la posición inicial sobre el propio segmento de la recta.
            const frac0 = (q: Pt, s: number) => (e * (Xu(q) - (dot(W[Da], u) + s * dot(v, u)))) / lD;
            const fP0 = marcas.map((m, i) => frac0(m, ss[i]));
            const fT0 = [...fP0, ...trazos.map((t, i) => frac0(t[1], ss[i]))];
            const centra = (fs: number[]) => (Math.min(...fs) + Math.max(...fs)) / 2;
            const fracs = (f0: number[], x: number) => f0.map((f) => f - (e * x) / lD);
            const largoRecta = largo(sub(b, a));
            const costeLateral = (x: number) => {
              const fT = fracs(fT0, x);
              const fP = fracs(fP0, x);
              const sinCub = lD * (Math.max(0, -Math.min(...fT)) + Math.max(0, Math.max(...fT) - 1));
              const ini0 = x + dot(W[Da], u);
              const ov = solape(ini0, ini0 + e * lD, 0, largoRecta) / Math.min(lD, largoRecta);
              const centrado = fP.reduce((m, f) => m + Math.abs(f - 0.5), 0) / fP.length;
              // La posición inicial debe estar sobre la recta de referencia dibujada: si no solapa con ella, se penaliza mucho.
              return { sinCub, coste: sinCub * 0.6 + (1 - ov) * 250 + (ov < 0.5 ? (0.5 - ov) * 8000 : 0) + centrado * 300, fP };
            };
            const xs: number[] = [e * lD * (centra(fT0) - 0.5), e * lD * (centra(fP0) - 0.5)];
            const xa = e * lD * (Math.max(...fP0) - 0.85);
            const xb = e * lD * (Math.min(...fP0) - 0.15);
            for (let x = Math.min(xa, xb); x <= Math.max(xa, xb); x += 8) xs.push(x);
            let x0 = xs[0];
            let lateral = costeLateral(x0);
            for (const x of xs) {
              const c = costeLateral(x);
              const fuera = c.fP.some((f) => f < 0.15 || f > 0.85);
              const fueraActual = lateral.fP.some((f) => f < 0.15 || f > 0.85);
              if ((fueraActual && !fuera) || (fueraActual === fuera && c.coste < lateral.coste)) {
                x0 = x;
                lateral = c;
              }
            }
            const fP = lateral.fP;
            const puntoFuera = fP.some((f) => f < 0.1 || f > 0.9);
                        const O0: Pt = [a[0] + u[0] * x0 - n[0] * dot(W[Da], n), a[1] + u[1] * x0 - n[1] * dot(W[Da], n)];
            const originEn = (s: number): Pt => [O0[0] + v[0] * s, O0[1] + v[1] * s];
            const W0: Pt = [O0[0] + W[Sa][0], O0[1] + W[Sa][1]];
            const dS = dot(sub(W[Sb], W[Sa]), v);
            const sLo = Math.min(0, dS);
            const sHi = Math.max(0, dS);
            const tercero = [0, 1, 2].find((i) => i !== Sa && i !== Sb)!;
            const ladoE = Math.sign(cross(v, sub(W[tercero], W[Sa])));
            const posiciones = [0, ...ss];
            const triE = (s: number) => {
              const o = originEn(s);
              return W.map((w) => [o[0] + w[0], o[1] + w[1]] as Pt);
            };

            for (let iG = 0; iG < 3; iG += 1) {
              const [Ga, Gb] = BORDES[iG];
              const gLocal = unit(sub(CAR_V[Gb], CAR_V[Ga]));
              const terceroC = [0, 1, 2].find((i) => i !== Ga && i !== Gb)!;
              for (const sc of ESCALAS) {
                const g = largo(sub(CAR_V[Gb], CAR_V[Ga])) * sc;
                for (const espejoC of [false, true]) {
                  for (const f of [1, -1]) {
                    const rotC = giroPara(gLocal, espejoC, [f * v[0], f * v[1]]);
                    const Wc = vertices(CAR_V, rotC, espejoC, sc);
                    if (Math.sign(cross(v, sub(Wc[terceroC], Wc[Ga]))) !== -ladoE) continue;
                    // Posición del cartabón a lo largo de la guía que mejor conserva el contacto en todo el recorrido.
                    let mejorG0 = 0;
                    let mejorContacto = -1;
                    const desde = smin + sLo - g + 10;
                    const hasta = smax + sHi - 10;
                    for (let g0 = desde; g0 <= hasta; g0 += 5) {
                      const c = Math.min(solape(smin, smin + dS, g0, g0 + g), solape(smax, smax + dS, g0, g0 + g));
                      if (c > mejorContacto) {
                        mejorContacto = c;
                        mejorG0 = g0;
                      }
                    }
                    const minimo = Math.min(60, 0.5 * Math.min(lS, g));
                    const lamGa = f === 1 ? mejorG0 : mejorG0 + g;
                    const Cx: Pt = [W0[0] + v[0] * lamGa - Wc[Ga][0], W0[1] + v[1] * lamGa - Wc[Ga][1]];
                    const triC = Wc.map((w) => [Cx[0] + w[0], Cx[1] + w[1]] as Pt);
                    let coste = 0;
                    if (mejorContacto < minimo) coste += 1e6 + (minimo - mejorContacto) * 1000;
                    if (puntoFuera) coste += 5e5;
                    coste += lateral.coste + (se - 1 + (sc - 1)) * 400;
                    if (mejor && coste >= mejor.coste) continue;
                    // Puntos importantes tapados y trozo que se sale de la hoja.
                    const tapados = new Set<number>();
                    let fuera = 0;
                    for (const s of posiciones) {
                      const te = triE(s);
                      importantes.forEach((p, k) => {
                        if (marcas.some((m) => Math.hypot(m[0] - p[0], m[1] - p[1]) < 3)) return;
                        if (dentro(p, te, 5) || dentro(p, triC, 5)) tapados.add(k);
                      });
                      for (const t of [te, triC]) for (const p of t) fuera += Math.max(0, 8 - p[0]) + Math.max(0, p[0] - 612) + Math.max(0, 8 - p[1]) + Math.max(0, p[1] - 372);
                    }
                    coste += tapados.size * 8000;
                    coste += Math.abs(smax) * 0.4 + fuera * 0.6;
                    coste += (iD === 2 ? 30 : 0) + (iS === 2 ? 10 : 0) + (espejo ? 8 : 0) + (iG === 0 ? 0 : 15) + (espejoC ? 4 : 0);
                    if (mejor && coste >= mejor.coste) continue;
                    const cart: Pose = { x: Cx[0], y: Cx[1], rot: rotC, mirror: espejoC };
                    const pose: Pose = { x: 0, y: 0, rot: rotE, mirror: espejo };
                    mejor = {
                      coste,
                      plan: {
                        escala: { escuadra: se, cartabon: sc },
                        desliza: v,
                        sps: ss,
                        poseEscuadra: (s) => {
                          const o = originEn(s);
                          return { ...pose, x: o[0], y: o[1] };
                        },
                        poseCartabon: cart,
                        filo: (s) => {
                          const o = originEn(s);
                          return [[o[0] + W[Da][0], o[1] + W[Da][1]], [o[0] + W[Db][0], o[1] + W[Db][1]]];
                        },
                        config: { dibujo: iD, apoyo: iS, guia: iG, contacto: mejorContacto, puntoEnBorde: fP },
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
  return mejor!.plan;
}

/** Instrumentos de un plan con la escuadra deslizada `s`, cada uno a su tamaño. */
export function InstrumentosParalela({ plan, s, opacidad = 1 }: { plan: PlanParalela; s: number; opacidad?: number }) {
  const c = plan.poseCartabon;
  const e = plan.poseEscuadra(s);
  const aEscala = (p: Pose, k: number) => `translate(${p.x} ${p.y}) scale(${k}) translate(${-p.x} ${-p.y})`;
  return (
    <g opacity={opacidad} pointerEvents="none">
      <g transform={aEscala(c, plan.escala.cartabon)}>
        <Cartabon pose={c} />
      </g>
      <g transform={aEscala(e, plan.escala.escuadra)}>
        <Escuadra pose={e} />
      </g>
    </g>
  );
}
