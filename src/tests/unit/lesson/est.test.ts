import { describe, expect, it } from "vitest";
import { ESTATURAS_40, ESTATURAS_CAJA, boxStats, groupData, intervalLength, quantile, tableStats } from "@/components/lesson/anim/est";

describe("parámetros con tabla", () => {
  it("test de puntuaciones: N = 288, Σfx = 766, x̄ = 2,66, var = 1,42, σ = 1,19, C.V. = 44,7 %", () => {
    const s = tableStats([0, 1, 2, 3, 4, 5].map((x, i) => ({ x, f: [12, 31, 86, 92, 48, 19][i]! })));
    expect(s.n).toBe(288);
    expect(s.sumFx).toBe(766);
    expect(s.sumFx2).toBe(2446);
    expect(s.mean).toBeCloseTo(2.66, 2);
    expect(s.variance).toBeCloseTo(1.42, 2);
    expect(s.sd).toBeCloseTo(1.19, 2);
    expect(s.cv).toBeCloseTo(0.447, 2);
  });
  it("pesos agrupados: x̄ = 77,1, σ = 11,2, C.V. = 14,5 %", () => {
    const s = tableStats([[48, 4], [59, 19], [70, 86], [81, 72], [92, 41], [103, 7]].map(([x, f]) => ({ x: x!, f: f! })));
    expect(s.n).toBe(229);
    expect(s.sumFx).toBe(17658);
    expect(s.sumFx2).toBe(1390434);
    expect(s.mean).toBeCloseTo(77.1, 1);
    expect(s.sd).toBeCloseTo(11.2, 1);
    expect(s.cv).toBeCloseTo(0.145, 2);
  });
});

describe("agrupar datos", () => {
  it("40 estaturas: recorrido 29, 6 intervalos de longitud 5 con frecuencias 2, 4, 11, 14, 5, 4", () => {
    expect(ESTATURAS_40).toHaveLength(40);
    expect(intervalLength(149, 178, 6)).toEqual({ range: 29, rPrime: 30, len: 5 });
    const g = groupData(ESTATURAS_40, 148.5, 5, 6);
    expect(g.map((i) => i.count)).toEqual([2, 4, 11, 14, 5, 4]);
    expect(g.map((i) => i.mark)).toEqual([151, 156, 161, 166, 171, 176]);
  });
  it("8 intervalos con r' = 32 y 10 con r' = 30", () => {
    expect(groupData(ESTATURAS_40, 148.5, 4, 8).reduce((a, i) => a + i.count, 0)).toBe(40);
    expect(groupData(ESTATURAS_40, 148.5, 3, 10).reduce((a, i) => a + i.count, 0)).toBe(40);
  });
});

describe("cuartiles", () => {
  it("17 datos: Q1 = 4, Me = 5, Q3 = 7", () => {
    const d = [1, 1, 2, 3, 4, 4, 5, 5, 5, 5, 6, 7, 7, 7, 8, 9, 10];
    expect([quantile(d, 0.25), quantile(d, 0.5), quantile(d, 0.75)]).toEqual([4, 5, 7]);
  });
  it("12 datos: Q1 = 2,5, Me = 5, Q3 = 7", () => {
    const d = [1, 2, 2, 3, 4, 5, 5, 5, 6, 8, 9, 10];
    expect([quantile(d, 0.25), quantile(d, 0.5), quantile(d, 0.75)]).toEqual([2.5, 5, 7]);
  });
  it("mediana de 9 y 10 datos", () => {
    expect(quantile([6, 7, 7, 7, 8, 9, 10, 12, 15], 0.5)).toBe(8);
    expect(quantile([6, 7, 7, 7, 8, 9, 10, 12, 15, 16], 0.5)).toBe(8.5);
  });
  it("percentil 60 de la distribución A del ejercicio 11", () => {
    const a = [25, 22, 27, 30, 23, 22, 31, 18, 24, 25, 32, 35, 20, 28, 30].sort((x, y) => x - y);
    expect(quantile(a, 0.6)).toBe(27.5);
    expect([quantile(a, 0.25), quantile(a, 0.5), quantile(a, 0.75)]).toEqual([22, 25, 30]);
  });
});

describe("diagrama de caja", () => {
  it("estaturas: Q1 = 160,5, Me = 166, Q3 = 169,5; 189 es atípico", () => {
    const b = boxStats(ESTATURAS_CAJA);
    expect([b.q1, b.me, b.q3, b.iqr]).toEqual([160.5, 166, 169.5, 9]);
    expect(b.high).toBe(183);
    expect(b.highOut).toEqual([189]);
    expect(b.whiskerHigh).toBe(175);
    expect(b.lowOut).toEqual([]);
  });
});
