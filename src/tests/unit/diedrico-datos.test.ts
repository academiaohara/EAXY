import { describe, expect, it } from "vitest";
import { CONSTRUCCIONES } from "@/components/lesson/bench/construcciones-datos";
import type { Construccion } from "@/components/lesson/bench/construcciones-datos";

const c = (id: string) => CONSTRUCCIONES[id as keyof typeof CONSTRUCCIONES] as Construccion;
const LT = 190;
const lado = (id: string, n: string) => Math.sign(c(id).pts[n][1] - LT); // +1 bajo la LT, −1 sobre ella

describe("épura del punto (tema 12)", () => {
  it("primer diedro: horizontal bajo la LT y vertical sobre ella", () => {
    expect([lado("punto-primer-diedro", "Ap"), lado("punto-primer-diedro", "Av")]).toEqual([1, -1]);
  });
  it("segundo diedro: las dos proyecciones sobre la LT", () => {
    expect([lado("punto-segundo-diedro", "Bp"), lado("punto-segundo-diedro", "Bv")]).toEqual([-1, -1]);
  });
  it("tercer diedro: proyecciones invertidas", () => {
    expect([lado("punto-tercer-diedro", "Cp"), lado("punto-tercer-diedro", "Cv")]).toEqual([-1, 1]);
  });
  it("cuarto diedro: las dos proyecciones bajo la LT", () => {
    expect([lado("punto-cuarto-diedro", "Dp"), lado("punto-cuarto-diedro", "Dv")]).toEqual([1, 1]);
  });
  it("las dos proyecciones están en la misma línea de referencia, perpendicular a la LT", () => {
    for (const [id, a, b] of [["punto-primer-diedro", "Ap", "Av"], ["punto-tercer-diedro", "Cp", "Cv"], ["punto-primer-bisector", "Ep", "Ev"]]) {
      expect(c(id).pts[a][0]).toBe(c(id).pts[b][0]);
    }
  });
  it("las distancias a la LT coinciden con los segmentos dato de cota y alejamiento", () => {
    const k = c("punto-primer-diedro");
    const largo = (n: string) => k.pts[`${n}2`][0] - k.pts[`${n}1`][0];
    expect(LT - k.pts.Av[1]).toBe(largo("cota"));
    expect(k.pts.Ap[1] - LT).toBe(largo("alej"));
  });
  it("en el primer bisector cota y alejamiento son iguales", () => {
    const k = c("punto-primer-bisector");
    expect(LT - k.pts.Ev[1]).toBe(k.pts.Ep[1] - LT);
  });
});

describe("épura del plano (tema 12)", () => {
  const colineales = (a: [number, number], b: [number, number], p: [number, number]) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
  it("las trazas horizontales de r y s y el punto N están alineados (α₁)", () => {
    const k = c("plano-dos-rectas");
    expect(colineales(k.pts.Hp, k.pts.H1p, k.pts.N)).toBeLessThan(1);
  });
  it("la traza vertical de r está en α₂ (N, V'')", () => {
    const k = c("plano-dos-rectas");
    const e = c("recta-en-plano");
    expect(k.pts.Vv[1]).toBeCloseTo(e.pts.Vv[1], 6);
    expect(colineales(e.pts.N, e.pts._a2, e.pts.Vv)).toBeLessThan(1);
  });
  it("la proyección horizontal de r pasa por H', V' y los puntos dados", () => {
    const k = c("plano-dos-rectas");
    expect(colineales(k.pts.Ap, k.pts.Bp, k.pts.Hp)).toBeLessThan(1);
    expect(colineales(k.pts.Ap, k.pts.Bp, k.pts.Vp)).toBeLessThan(1);
    expect(colineales(k.pts.Av, k.pts.Bv, k.pts.Hv)).toBeLessThan(1);
    expect(colineales(k.pts.Av, k.pts.Bv, k.pts.Vv)).toBeLessThan(1);
  });
  it("la horizontal del plano: h'' a la cota dada, sobre α₂, y h' paralela a α₁", () => {
    const k = c("horizontal-del-plano");
    expect(LT - k.pts.Vv[1]).toBe(k.pts.cota2[0] - k.pts.cota1[0]);
    expect(colineales(k.pts.N, k.pts._a2, k.pts.Vv)).toBeLessThan(1);
  });
});

describe("perfil, bisectores y figura plana (tema 12)", () => {
  const colin = (a: [number, number], b: [number, number], p: [number, number]) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
  it("perfil-punto: A₁ está en la recta r₁ (V₁–H) y A'' a su altura", () => {
    const k = c("perfil-punto");
    expect(colin(k.pts.V1, k.pts.Hl, k.pts.A1)).toBeLessThan(1e-6);
    expect(k.pts.Av[1]).toBeCloseTo(k.pts.A1[1], 6);
    expect(k.pts.Al[0] - k.pts.O[0]).toBeCloseTo(k.pts.Ap[1] - LT, 6);
  });
  it("perfil-trazas: A₁, B₁, H y V están alineados y los arcos conservan las distancias", () => {
    const k = c("perfil-trazas");
    expect(colin(k.pts.A1, k.pts.B1, k.pts.Hl)).toBeLessThan(1e-6);
    expect(colin(k.pts.A1, k.pts.B1, k.pts.V1)).toBeLessThan(1e-6);
    expect(k.pts.Hb[1] - LT).toBeCloseTo(k.pts.Hl[0] - k.pts.O[0], 6);
    expect(LT - k.pts.Vv[1]).toBeCloseTo(LT - k.pts.V1[1], 6);
  });
  it("plano-perp-bisector: las trazas son simétricas respecto de la L.T.", () => {
    const k = c("plano-perp-bisector");
    expect(k.pts.Pm[1] - LT).toBeCloseTo(LT - k.pts.Pq[1], 6);
  });
  it("figura-plana: cada vértice del alzado y su planta están en una perpendicular a la L.T. y en una horizontal del plano", () => {
    const k = c("figura-plana");
    for (const i of [1, 2, 3]) {
      expect(k.pts[`T${i}p`][0]).toBe(k.pts[`T${i}v`][0]);
      expect(colin(k.pts.N, k.pts._a2, k.pts[`Uv${i}`])).toBeLessThan(1e-6);
      // h' paralela a α₁: pasa por Uc y su pendiente es la de α₁
      const pend = (k.pts._a1[1] - k.pts.N[1]) / (k.pts._a1[0] - k.pts.N[0]);
      expect((k.pts[`T${i}p`][1] - LT) / (k.pts[`T${i}p`][0] - k.pts[`Uc${i}`][0])).toBeCloseTo(pend, 6);
    }
  });
});

describe("tema 12: ampliación", () => {
  it("puntos en los planos de proyección: una proyección está en la LT", () => {
    expect(c("punto-plano-horizontal").pts.Av[1]).toBe(LT);
    expect(c("punto-plano-vertical").pts.Ep[1]).toBe(LT);
  });
  it("segundo bisector: las proyecciones coinciden, sobre la LT", () => {
    const k = c("punto-segundo-bisector").pts;
    expect(k.Gp[1]).toBeLessThan(LT);
  });
  it("rectas que se cortan: los dos puntos de corte están en una perpendicular a la LT", () => {
    const k = c("rectas-se-cortan").pts;
    expect(k.Pp[0]).toBe(k.Pv[0]);
  });
  it("planos proyectantes: el punto del plano está en la traza oblicua y en la referencia del punto dado", () => {
    const v = c("plano-proyectante-vertical").pts;
    expect(v.Qv[0]).toBe(v.Qp[0]);
    expect((LT - v.Qv[1]) / (v.Qv[0] - v.N[0])).toBeCloseTo((LT - v._b2[1]) / (v._b2[0] - v.N[0]), 6);
    const h = c("plano-proyectante-horizontal").pts;
    expect((h.Qp[1] - LT) / (h.Qp[0] - h.N[0])).toBeCloseTo((h._b2[1] - LT) / (h._b2[0] - h.N[0]), 6);
  });
  it("frontal del plano: f' a alejamiento dado sobre α₁ y f'' paralela a α₂", () => {
    const k = c("frontal-del-plano").pts;
    expect(k.Hp[1] - LT).toBe(k.alej2[0] - k.alej1[0]);
    const pend = (k.Fq[1] - k.Hv[1]) / (k.Fq[0] - k.Hv[0]);
    expect(pend).toBeCloseTo((k._a2[1] - k.N[1]) / (k._a2[0] - k.N[0]), 3);
  });
});

describe("tema 12: octantes y l.m.p.", () => {
  it("octantes: más alejamiento que cota (1.º y 4.º) o más cota que alejamiento (2.º y 3.º)", () => {
    const d = (id: string, a: string, b: string) => [Math.abs(c(id).pts[a][1] - LT), Math.abs(c(id).pts[b][1] - LT)];
    const [h1, v1] = d("punto-primer-octante", "Bp", "Bv");
    expect(h1).toBeGreaterThan(v1);
    const [h2, v2] = d("punto-segundo-octante", "Dp", "Dv");
    expect(v2).toBeGreaterThan(h2);
    const [h3, v3] = d("punto-tercer-octante", "Fp", "Fv");
    expect(v3).toBeGreaterThan(h3);
    const [h4, v4] = d("punto-cuarto-octante", "Hp", "Hv");
    expect(h4).toBeGreaterThan(v4);
  });
  it("l.m.p.: r' es perpendicular a α₁ (que pasa por N y H')", () => {
    const k = c("plano-lmp").pts;
    const r = [k._r2[0] - k._r1[0], k._r2[1] - k._r1[1]];
    const a1 = [k.Hp[0] - k.N[0], k.Hp[1] - k.N[1]];
    expect(r[0] * a1[0] + r[1] * a1[1]).toBeCloseTo(0, 4);
    expect((k._s2[1] - k.Vv[1]) / (k._s2[0] - k.Vv[0])).toBeCloseTo((k._s1[1] - k.Vv[1]) / (k._s1[0] - k.Vv[0]), 4);
  });
});
