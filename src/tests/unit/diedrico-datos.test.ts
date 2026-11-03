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
