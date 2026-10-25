import { describe, expect, it } from "vitest";
import { comb, desarrolloBinomio, factorial, filaPascal, hipergeometrica } from "@/components/lesson/anim/combinatoria1b";

describe("combinatoria de CCSS I", () => {
  it("números combinatorios", () => {
    expect(comb(7, 3)).toBe(35);
    expect(comb(10, 8)).toBe(45);
    expect(comb(49, 6)).toBe(13983816);
    expect(comb(5, 0)).toBe(1);
    expect(comb(5, 5)).toBe(1);
    expect(comb(4, 7)).toBe(0);
    expect(comb(-1, 0)).toBe(0);
    expect(comb(2.5, 1)).toBe(0);
    expect(factorial(5)).toBe(120);
    expect(factorial(0)).toBe(1);
  });
  it("triángulo de Pascal y regla de Pascal", () => {
    expect(filaPascal(4)).toEqual([1, 4, 6, 4, 1]);
    for (let n = 2; n <= 10; n += 1) for (let k = 1; k < n; k += 1) expect(comb(n, k)).toBe(comb(n - 1, k - 1) + comb(n - 1, k));
    expect(filaPascal(7).reduce((s, t) => s + t, 0)).toBe(128);
  });
  it("binomio de Newton", () => {
    expect(desarrolloBinomio(4, 1, 2).map((t) => t.coef)).toEqual([1, 8, 24, 32, 16]);
    expect(desarrolloBinomio(5, 2, -1).find((t) => t.grado === 3)!.coef).toBe(80);
    expect(desarrolloBinomio(6, 1, 1).reduce((s, t) => s + t.coef, 0)).toBe(64);
  });
  it("probabilidades con combinaciones", () => {
    expect(hipergeometrica(10, 4, 3, 3)).toBeCloseTo(1 / 30, 12);
    expect(hipergeometrica(20, 12, 4, 2)).toBeCloseTo(1848 / 4845, 12);
    expect(hipergeometrica(0, 0, 0, 0)).toBe(1);
  });
});
