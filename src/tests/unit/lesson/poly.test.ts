import { describe, expect, it } from "vitest";
import { add, commonFactor, degree, evaluate, lcm, mul, monoDegree, monoSimilar, monoTex, monoValue, polyTex, sub, trim } from "@/components/lesson/anim/poly";

describe("polinomios", () => {
  it("suma y resta del libro: A = 3x²+5x−2, B = x³+4x²−5", () => {
    const A = [-2, 5, 3];
    const B = [-5, 0, 4, 1];
    expect(polyTex(add(A, B))).toBe("x^{3} + 7x^{2} + 5x - 7");
    expect(polyTex(sub(A, B))).toBe("-x^{3} - x^{2} + 5x + 3");
  });
  it("producto del libro: (2x³−4x²−1)(3x−2) = 6x⁴−16x³+8x²−3x+2", () => {
    expect(mul([-1, 0, -4, 2], [-2, 3])).toEqual([2, -3, 8, -16, 6]);
    expect(polyTex(mul([-4, 0, 2], [4, 3]))).toBe("6x^{3} + 8x^{2} - 12x - 16".replace("- 12x - 16", "- 12x - 16"));
  });
  it("grado tras reducir: 7x³−5x²+3x³−2x−10x³ = −5x²−2x", () => {
    const p = add(add([0, 0, 0, 7], [0, 0, -5]), add([0, -2, 0, 3], [0, 0, 0, -10]));
    expect(trim(p)).toEqual([0, -2, -5]);
    expect(degree(p)).toBe(2);
  });
  it("evaluar y factor común", () => {
    expect(evaluate([1, 2, 3], 2)).toBe(17);
    expect(commonFactor([0, -3, 12, -9, 6])).toEqual({ k: 3, m: 1, rest: [-1, 4, -3, 2] });
    expect(commonFactor([0, 15, 0, 20])).toMatchObject({ k: 5, m: 1 });
    expect(commonFactor([0, -1, 5, 3])).toMatchObject({ k: 1, m: 1 });
  });
  it("mcm y signo", () => {
    expect(lcm([2, 3, 4])).toBe(12);
    expect(lcm([6, 10, 15, 4])).toBe(60);
    expect(polyTex([0])).toBe("0");
    expect(polyTex([-5, 1])).toBe("x - 5");
  });
});

describe("monomios", () => {
  it("tex, grado, semejanza y valor", () => {
    expect(monoTex({ c: -5, p: 2, q: 1 })).toBe("-5x^{2}y");
    expect(monoTex({ c: 1, p: 1, q: 0 })).toBe("x");
    expect(monoTex({ c: 7, p: 0, q: 0 })).toBe("7");
    expect(monoDegree({ c: 3, p: 3, q: 3 })).toBe(6);
    expect(monoSimilar({ c: 7, p: 2, q: 0 }, { c: 1, p: 2, q: 0 })).toBe(true);
    expect(monoSimilar({ c: 5, p: 2, q: 0 }, { c: 5, p: 2, q: 1 })).toBe(false);
    expect(monoValue({ c: 3, p: 1, q: 1 }, 2, -5)).toBe(-30);
  });
});
