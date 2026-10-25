import { describe, expect, it } from "vitest";
import {
  aproximable, binomCdf, binomCuantia, binomDesv, binomMedia, binomPmf, binomialANormal, crearAzar, desviacion, distribucion, esperanza,
  intervaloExitos, intervaloProporcion, normalCdf, normalEntre, phi, phiInversa, tablaZ, tipificar, valorCritico, varianza,
} from "@/components/lesson/anim/distrib1b";

describe("variables aleatorias discretas", () => {
  it("dos monedas: caras", () => {
    const d = [{ x: 0, p: 0.25 }, { x: 1, p: 0.5 }, { x: 2, p: 0.25 }];
    expect(esperanza(d)).toBe(1);
    expect(varianza(d)).toBeCloseTo(0.5, 12);
    expect(desviacion(d)).toBeCloseTo(Math.sqrt(0.5), 12);
    expect(distribucion(d, 1)).toBe(0.75);
    expect(distribucion(d, 5)).toBe(1);
    expect(distribucion(d, -1)).toBe(0);
  });
  it("juego de los dos dados: E = −10/36", () => {
    const g = [{ x: -10, p: 25 / 36 }, { x: 20, p: 10 / 36 }, { x: 40, p: 1 / 36 }];
    expect(esperanza(g)).toBeCloseTo(-10 / 36, 12);
  });
});

describe("binomial", () => {
  it("tres monedas y parámetros", () => {
    expect(binomPmf(3, 0.5, 1)).toBeCloseTo(0.375, 12);
    expect(binomCdf(3, 0.5, 1)).toBeCloseTo(0.5, 12);
    expect(binomMedia(500, 0.9)).toBe(450);
    expect(binomDesv(500, 0.9)).toBeCloseTo(6.7082, 4);
    expect(binomPmf(10, 0.3, 0)).toBeCloseTo(0.7 ** 10, 12);
    expect(binomPmf(10, 0.3, 7)).toBeCloseTo(0.009, 4);
    expect(binomPmf(5, 0.5, 9)).toBe(0);
    expect(binomPmf(4, 0, 0)).toBe(1);
    expect(binomPmf(4, 1, 4)).toBe(1);
    expect(binomCuantia(8, 0.3).reduce((s, t) => s + t.p, 0)).toBeCloseTo(1, 12);
    expect(binomCdf(5, 0.5, -1)).toBe(0);
    expect(binomCdf(5, 0.5, 50)).toBeCloseTo(1, 12);
  });
});

describe("normal", () => {
  it("valores de la tabla", () => {
    expect(tablaZ(1)).toBe(0.8413);
    expect(tablaZ(2.46)).toBe(0.9931);
    expect(tablaZ(0)).toBe(0.5);
    expect(tablaZ(-1)).toBe(0.1587);
    expect(tablaZ(2.02)).toBe(0.9783);
    expect(tablaZ(3.9)).toBe(1);
    expect(phi(Number.POSITIVE_INFINITY)).toBe(1);
    expect(phi(Number.NEGATIVE_INFINITY)).toBe(0);
    expect(phi(-10)).toBe(0);
    expect(phi(10)).toBe(1);
  });
  it("probabilidades en N(μ, σ)", () => {
    expect(phi(1.5) - phi(0.5)).toBeCloseTo(0.2417, 4);
    expect(normalEntre(5, 6, 5.7, 1.1)).toBeCloseTo(0.3452, 4);
    expect(1 - normalCdf(300, 290, 30)).toBeCloseTo(0.3694, 4);
    expect(normalEntre(-1, 1, 0, 1)).toBeCloseTo(0.6827, 4);
    expect(normalEntre(-2, 2, 0, 1)).toBeCloseTo(0.9545, 4);
    expect(normalEntre(-3, 3, 0, 1)).toBeCloseTo(0.9973, 4);
    expect(tipificar(6, 5.7, 1.1)).toBeCloseTo(0.2727, 4);
  });
  it("valores críticos", () => {
    expect(phiInversa(0.975)).toBeCloseTo(1.96, 2);
    expect(valorCritico(0.99)).toBeCloseTo(2.5758, 3);
    expect(valorCritico(0.95)).toBeCloseTo(1.96, 2);
    expect(phiInversa(0)).toBe(-Infinity);
    expect(phiInversa(1)).toBe(Infinity);
    expect(phiInversa(0.8)).toBeCloseTo(0.8416, 3);
  });
});

describe("aproximación e intervalos", () => {
  it("B(200; 0,44) entre 80 y 100 ≈ 0,85", () => {
    expect(aproximable(200, 0.44)).toBe(true);
    expect(aproximable(3, 0.5)).toBe(false);
    expect(binomialANormal(200, 0.44, 80, 100)).toBeCloseTo(0.8495, 3);
    expect(binomialANormal(3, 0.5, 1, 1)).toBeCloseTo(0.3759, 3);
    expect(binomialANormal(10, 0, 0, 0)).toBe(1);
    expect(binomialANormal(10, 0, 3, 5)).toBe(0);
  });
  it("intervalo de éxitos 99 % de B(200; 0,44): 88 ± 18", () => {
    const i = intervaloExitos(200, 0.44, 0.99);
    expect(i.k).toBe(18);
    expect(i.inf).toBe(70);
    expect(i.sup).toBe(106);
  });
  it("intervalo para una proporción: 700 de 2 000", () => {
    const i = intervaloProporcion(0.35, 2000, 0.95);
    expect(i.inf).toBeCloseTo(0.3291, 3);
    expect(i.sup).toBeCloseTo(0.3709, 3);
    expect(intervaloProporcion(0.35, 2000, 0.99).sup).toBeCloseTo(0.3775, 3);
  });
  it("azar reproducible", () => {
    const a = crearAzar(7);
    const b = crearAzar(7);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
    expect(crearAzar(0)()).toBeGreaterThanOrEqual(0);
  });
});
