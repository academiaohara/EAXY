import { describe, expect, it } from "vitest";
import {
  DATASETS, DOUBLES, HIJOS, HOTELES, NOTAS_A, NOTAS_B, PESOS, conditionalCol, conditionalRow, correlation, correlationText, covariance, cv, freqTable, groupedTable,
  jointStats, mean, meanFromTable, median, modes, numClasses, percentile, quartiles, regression, sd, sectorAngle, syntheticCloud, variance,
} from "@/components/lesson/anim/estad1b";

describe("tablas de frecuencias", () => {
  it("número de hijos: 50 familias", () => {
    const t = freqTable(HIJOS);
    expect(t.map((r) => r.n)).toEqual([2, 4, 21, 15, 6, 1, 1]);
    expect(t.map((r) => r.N)).toEqual([2, 6, 27, 42, 48, 49, 50]);
    expect(t[3]).toMatchObject({ x: 3, f: 0.3, F: 0.84 });
    expect(t.at(-1)!.F).toBe(1);
    expect(mean(HIJOS)).toBeCloseTo(2.52, 9);
    expect(modes(HIJOS)).toEqual([2]);
  });
  it("hoteles agrupados en 6 clases de amplitud 5", () => {
    const t = groupedTable(HOTELES, [32.5, 37.5, 42.5, 47.5, 52.5, 57.5, 62.5]);
    expect(t.map((r) => r.n)).toEqual([3, 8, 14, 6, 4, 5]);
    expect(t.map((r) => r.c)).toEqual([35, 40, 45, 50, 55, 60]);
    expect(t[2]!.F).toBe(0.625);
    expect(meanFromTable(t.map((r) => r.c), t.map((r) => r.n))).toBeCloseTo(46.875, 9);
    expect(Math.max(...HOTELES) - Math.min(...HOTELES)).toBe(28);
    expect(numClasses(40)).toBe(6);
    expect(numClasses(200)).toBe(9);
  });
  it("sectores: 25, 15 y 10 votos de 50", () => {
    expect([25, 15, 10].map((n) => sectorAngle(n, 50))).toEqual([180, 108, 72]);
  });
});

describe("posición y dispersión", () => {
  it("mediana y percentiles de los 30 pesos", () => {
    expect(median(PESOS)).toBeCloseTo(68.3, 9);
    expect(percentile(PESOS, 30)).toBe(57.29);
    expect(percentile(PESOS, 15)).toBe(52.35);
    expect(quartiles(PESOS).q1).toBe(percentile(PESOS, 25));
  });
  it("ejercicio 12: mediana 12,5; Q1 = 10; Q3 = 15; P90 = 20; moda 10", () => {
    const d = [...Array(3).fill(5), ...Array(7).fill(10), ...Array(5).fill(15), ...Array(3).fill(20), ...Array(2).fill(25)] as number[];
    expect(median(d)).toBe(12.5);
    expect(quartiles(d)).toMatchObject({ q1: 10, q3: 15 });
    expect(percentile(d, 90)).toBe(20);
    expect(modes(d)).toEqual([10]);
  });
  it("notas de las clases A y B (varianza dividiendo entre n)", () => {
    expect(mean(NOTAS_A)).toBe(5);
    expect(variance(NOTAS_A)).toBeCloseTo(1.2, 9);
    expect(variance(NOTAS_B)).toBeCloseTo(6, 9);
    expect(sd(NOTAS_B)).toBeCloseTo(2.4495, 4);
    expect(cv(NOTAS_A)).toBeCloseTo(21.909, 3);
    expect(cv(NOTAS_B)).toBeCloseTo(48.99, 2);
    expect(Math.max(...NOTAS_B) - Math.min(...NOTAS_B)).toBe(8);
  });
});

describe("doble entrada", () => {
  it("impresoras: marginales y condicionada X | Y = 1", () => {
    const d = DOUBLES[0]!;
    const j = jointStats(d.counts)!;
    expect(j.n).toBe(25);
    expect(j.rowTotals).toEqual([1, 1, 8, 12, 3]);
    expect(j.colTotals).toEqual([1, 13, 10, 1]);
    const c = conditionalCol(d.counts, 1)!;
    expect(c.map((v) => Math.round(v * 100) / 100)).toEqual([0, 0, 0.23, 0.62, 0.15]);
    expect(conditionalRow(d.counts, 2)!.map((v) => Math.round(v * 1000) / 1000)).toEqual([0, 0.375, 0.625, 0]);
    expect(j.independent).toBe(false);
  });
  it("independencia exacta", () => {
    expect(jointStats([[1, 2], [2, 4]])!.independent).toBe(true);
    expect(jointStats([[1, 2], [3, 4]])!.independent).toBe(false);
    expect(jointStats([[0, 0], [0, 0]])).toBeNull();
    expect(conditionalRow([[0, 0], [1, 1]], 0)).toBeNull();
  });
  it("tabla de tres fármacos: n = 122", () => {
    expect(jointStats(DOUBLES[1]!.counts)).toMatchObject({ n: 122, rowTotals: [91, 31], colTotals: [35, 40, 47] });
    expect(jointStats(DOUBLES[2]!.counts)).toMatchObject({ n: 222, colTotals: [131, 66, 25] });
    expect(jointStats(DOUBLES[3]!.counts)!.n).toBe(100);
  });
});

describe("correlación y regresión", () => {
  it("teoría y práctica: covarianza ≈ 4,04 y r ≈ 0,763", () => {
    const d = DATASETS[2]!;
    expect(covariance(d.x, d.y)).toBeCloseTo(4.037, 3);
    expect(correlation(d.x, d.y)).toBeCloseTo(0.7629, 3);
  });
  it("ahorro y renta: recta y predicción de 2015", () => {
    const d = DATASETS[0]!;
    const g = regression(d.x, d.y)!;
    expect(g.b).toBeCloseTo(0.3389, 4);
    expect(g.a).toBeCloseTo(-5.2658, 4);
    expect(g.a + g.b * 24.1).toBeCloseTo(2.9017, 4);
    expect(g.bPrime).toBeCloseTo(2.1369, 4);
    expect(correlation(d.x, d.y)).toBeCloseTo(0.851, 3);
  });
  it("muelle: 100 g → 5,13 cm y 500 g → 25,69 cm", () => {
    const d = DATASETS[1]!;
    const g = regression(d.x, d.y)!;
    expect(g.a + g.b * 100).toBeCloseTo(5.1318, 3);
    expect(g.a + g.b * 500).toBeCloseTo(25.6887, 3);
    expect(correlation(d.x, d.y)).toBeGreaterThan(0.99);
  });
  it("depósito: r ≈ −0,9965; 40 h → 8,84 m; 2 m a las 66 h", () => {
    const d = DATASETS[4]!;
    const g = regression(d.x, d.y)!;
    expect(correlation(d.x, d.y)).toBeCloseTo(-0.9965, 4);
    expect(g.a + g.b * 40).toBeCloseTo(8.8414, 3);
    expect((2 - g.a) / g.b).toBeCloseTo(65.99, 1);
  });
  it("IPC e inflación: correlación débil", () => {
    const d = DATASETS[5]!;
    expect(correlation(d.x, d.y)).toBeCloseTo(-0.24, 2);
    expect(correlationText(correlation(d.x, d.y))).toContain("débil");
  });
  it("nube sintética con r exacto", () => {
    for (const r of [-1, -0.8, -0.3, 0, 0.5, 0.95, 1]) {
      const c = syntheticCloud(r);
      expect(correlation(c.x, c.y)).toBeCloseTo(r, 6);
      expect(mean(c.x)).toBeCloseTo(5, 9);
      expect(sd(c.x)).toBeCloseTo(2, 9);
    }
  });
  it("sin variación no hay correlación ni recta", () => {
    expect(correlation([1, 1, 1], [1, 2, 3])).toBeNull();
    expect(regression([1, 1, 1], [1, 2, 3])).toBeNull();
    expect(correlationText(null)).toContain("No se puede");
  });
});
