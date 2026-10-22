import { describe, expect, it } from "vitest";
import { exactRoot, factorPowers, primeFactors, radicalTex, rationalizeSqrt, realRoot, simplifyRadical, sqrtBounds } from "@/components/lesson/anim/radicals";

describe("factorización", () => {
  it("primeFactors y factorPowers", () => {
    expect(primeFactors(720)).toEqual([2, 2, 2, 2, 3, 3, 5]);
    expect(factorPowers(720)).toEqual([[2, 4], [3, 2], [5, 1]]);
    expect(primeFactors(97)).toEqual([97]);
  });
});

describe("simplifyRadical", () => {
  it("raíces cuadradas", () => {
    expect(simplifyRadical(18, 2)).toEqual({ k: 3, m: 2 });
    expect(simplifyRadical(720, 2)).toEqual({ k: 12, m: 5 });
    expect(simplifyRadical(50, 2)).toEqual({ k: 5, m: 2 });
    expect(simplifyRadical(175, 2)).toEqual({ k: 5, m: 7 });
    expect(simplifyRadical(49, 2)).toEqual({ k: 7, m: 1 });
  });
  it("otros índices", () => {
    expect(simplifyRadical(81, 3)).toEqual({ k: 3, m: 3 });
    expect(simplifyRadical(16, 3)).toEqual({ k: 2, m: 2 });
    expect(simplifyRadical(80, 4)).toEqual({ k: 2, m: 5 });
  });
  it("k²·m reconstruye el radicando", () => {
    for (let n = 2; n <= 300; n += 1) for (const idx of [2, 3, 4]) {
      const { k, m } = simplifyRadical(n, idx);
      expect(k ** idx * m).toBe(n);
    }
  });
});

describe("raíces", () => {
  it("exactRoot", () => {
    expect(exactRoot(243, 5)).toBe(3);
    expect(exactRoot(1024, 5)).toBe(4);
    expect(exactRoot(1000000, 6)).toBe(10);
    expect(exactRoot(7, 2)).toBeNull();
    expect(exactRoot(-8, 3)).toBeNull();
  });
  it("realRoot", () => {
    expect(realRoot(-8, 3)).toBeCloseTo(-2);
    expect(Number.isNaN(realRoot(-4, 2))).toBe(true);
    expect(realRoot(27, 3)).toBeCloseTo(3);
  });
  it("sqrtBounds", () => {
    expect(sqrtBounds(2, 3)).toEqual({ lower: "1,414", upper: "1,415", exact: false });
    expect(sqrtBounds(9, 2)).toEqual({ lower: "3,00", upper: "3,00", exact: true });
    expect(sqrtBounds(2, 0)).toEqual({ lower: "1", upper: "2", exact: false });
  });
});

describe("formato y racionalización", () => {
  it("radicalTex", () => {
    expect(radicalTex(3, 2)).toBe("3\\sqrt{2}");
    expect(radicalTex(1, 5)).toBe("\\sqrt{5}");
    expect(radicalTex(2, 3, 3)).toBe("2\\sqrt[3]{3}");
    expect(radicalTex(7, 1)).toBe("7");
  });
  it("rationalizeSqrt: 1/√2 = √2/2, 3/√2, 2/√8", () => {
    expect(rationalizeSqrt(1, 2)).toEqual({ coef: 1, radicand: 2, den: 2 });
    expect(rationalizeSqrt(3, 2)).toEqual({ coef: 3, radicand: 2, den: 2 });
    expect(rationalizeSqrt(2, 8)).toEqual({ coef: 1, radicand: 2, den: 2 });
  });
});
