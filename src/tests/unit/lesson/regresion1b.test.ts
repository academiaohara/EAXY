import { describe, expect, it } from "vitest";
import { REG_DATOS, ajustePolinomico, evalPoli } from "@/components/lesson/anim/regresion1b";

describe("regresión lineal y cuadrática (CCSS I)", () => {
  it("Matemáticas → Física: recta y parábola del libro", () => {
    const D = REG_DATOS[1];
    const l = ajustePolinomico(D.xs, D.ys, 1)!;
    expect(l.coef[1]).toBeCloseTo(0.819, 3);
    expect(l.coef[0]).toBeCloseTo(-0.1429, 4);
    expect(l.r2).toBeCloseTo(0.6072, 4);
    const q = ajustePolinomico(D.xs, D.ys, 2)!;
    expect(q.coef[2]).toBeCloseTo(0.2936, 4);
    expect(q.coef[1]).toBeCloseTo(-3.1654, 4);
    expect(q.coef[0]).toBeCloseTo(11.685, 3);
    expect(q.r2).toBeCloseTo(0.9384, 4);
    expect(evalPoli(q.coef, 12)).toBeCloseTo(15.977, 2);
  });
  it("Matemáticas → estatura: parábola del libro", () => {
    const D = REG_DATOS[0];
    const q = ajustePolinomico(D.xs, D.ys, 2)!;
    expect(q.coef[2]).toBeCloseTo(0.7654, 4);
    expect(q.coef[1]).toBeCloseTo(-8.4731, 4);
    expect(q.coef[0]).toBeCloseTo(185.78, 2);
    expect(q.r2).toBeCloseTo(0.4762, 4);
  });
  it("datos insuficientes o degenerados", () => {
    expect(ajustePolinomico([1, 2], [1, 2], 2)).toBeNull();
    expect(ajustePolinomico([1, 2, 3], [1, 2], 1)).toBeNull();
    expect(ajustePolinomico([2, 2, 2], [1, 2, 3], 1)).toBeNull();
    expect(ajustePolinomico([1, 2, 3], [4, 4, 4], 1)!.r2).toBe(1);
  });
});
