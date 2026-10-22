import { describe, expect, it } from "vitest";
import { frac, fracTex, shareEquation, solveLinear, solveLinearInequality, solveQuadratic, TANTEOS } from "@/components/lesson/anim/eq";

describe("lineales", () => {
  it("3(x+5) = x+1 → 3x+15 = x+1 → x = −7", () => {
    expect(solveLinear(3, 15, 1, 1)).toEqual({ kind: "unica", x: { n: -7, d: 1 } });
  });
  it("sin solución e identidad", () => {
    expect(solveLinear(2, 1, 2, 5)).toEqual({ kind: "sin" });
    expect(solveLinear(2, 1, 2, 1)).toEqual({ kind: "identidad" });
  });
  it("fracción reducida", () => {
    expect(solveLinear(3, 0, 1, 1)).toEqual({ kind: "unica", x: { n: 1, d: 2 } });
    expect(fracTex(frac(-3, 6))).toBe("-\\dfrac{1}{2}");
    expect(frac(3, -6)).toEqual({ n: -1, d: 2 });
  });
});

describe("cuadráticas", () => {
  it("x² + x − 2 = 0 → −2 y 1", () => {
    const s = solveQuadratic(1, 1, -2);
    expect(s.kind).toBe("dos");
    expect(s.roots.map((r) => r.value)).toEqual([-2, 1]);
  });
  it("9x² + 6x + 1 = 0 → solución única −1/3", () => {
    const s = solveQuadratic(9, 6, 1);
    expect(s.kind).toBe("una");
    expect(s.roots[0]!.tex).toBe("-\\dfrac{1}{3}");
  });
  it("5x² − 7x + 3 = 0 sin solución real; 10x² − 3x − 1 = 0 → −1/5 y 1/2", () => {
    expect(solveQuadratic(5, -7, 3).kind).toBe("ninguna");
    const s = solveQuadratic(10, -3, -1);
    expect(s.roots.map((r) => r.tex)).toEqual(["-\\dfrac{1}{5}", "\\dfrac{1}{2}"]);
  });
  it("raíces no exactas llevan radical", () => {
    const s = solveQuadratic(1, 1, -1);
    expect(s.roots[0]!.tex).toContain("\\sqrt{5}");
  });
  it("problemas del libro: x² + x − 210, x² − 11x + 28, r² + 15r − 250", () => {
    expect(solveQuadratic(1, 1, -210).roots.map((r) => r.value)).toEqual([-15, 14]);
    expect(solveQuadratic(1, -11, 28).roots.map((r) => r.value)).toEqual([4, 7]);
    expect(solveQuadratic(1, 15, -250).roots.map((r) => r.value)).toEqual([-25, 10]);
  });
});

describe("inecuaciones y reparto", () => {
  it("−2x > 6 → x < −3 (se invierte)", () => {
    expect(solveLinearInequality(-2, 0, ">", 6)).toEqual({ bound: { n: -3, d: 1 }, rel: "<", flipped: true });
  });
  it("3x − 1 ≤ 8 → x ≤ 3", () => {
    expect(solveLinearInequality(3, -1, "<=", 8)).toEqual({ bound: { n: 3, d: 1 }, rel: "<=", flipped: false });
  });
  it("autocar, relojes y cena", () => {
    expect(shareEquation(2000, 4, 25).n).toBe(20);
    expect(shareEquation(200, 2, 5).n).toBe(10);
    expect(shareEquation(144, 2, 6).n).toBe(8);
  });
  it("tanteos: respuestas", () => {
    for (const t of TANTEOS) expect(t.f(t.answer)).toBeCloseTo(t.target, 6);
  });
});
