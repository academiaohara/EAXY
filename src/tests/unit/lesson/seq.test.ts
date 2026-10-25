import { describe, expect, it } from "vitest";
import { SEQS, arithSum, arithTerm, geomInf, geomSum, geomTerm, monoOf, nZero } from "@/components/lesson/anim/seq";

describe("catálogo de sucesiones", () => {
  it("la monotonía declarada coincide con la comprobación numérica", () => {
    for (const s of SEQS) expect(monoOf(s.f), s.label).toBe(s.mono);
  });

  it("los límites declarados se alcanzan para n grande", () => {
    for (const s of SEQS.filter((q) => q.kind === "convergente")) {
      expect(Math.abs(s.f(1e6) - s.limit!), s.label).toBeLessThan(1e-4);
    }
  });

  it("las divergentes superan cualquier cota y las acotadas no", () => {
    for (const s of SEQS) {
      const max = Math.max(...Array.from({ length: 60 }, (_, i) => Math.abs(s.f(i + 1))));
      if (s.bounded) expect(max, s.label).toBeLessThan(10);
      else expect(max, s.label).toBeGreaterThan(100);
    }
  });
});

describe("progresiones", () => {
  it("aritmética: a₅ = 19 y S₅ = 65", () => {
    expect(arithTerm(7, 3, 5)).toBe(19);
    expect(arithSum(7, 3, 5)).toBe(65);
  });

  it("geométrica: 1, 2, 4, 8, 16 suma 31 y 3, 6, 12… suma 189 con seis términos", () => {
    expect(geomTerm(1, 2, 5)).toBe(16);
    expect(geomSum(1, 2, 5)).toBe(31);
    expect(geomSum(3, 2, 6)).toBe(189);
  });

  it("suma infinita solo con |r| < 1", () => {
    expect(geomInf(4, 0.5)).toBe(8);
    expect(geomInf(6, 0.5)).toBe(12);
    expect(geomInf(1, 2)).toBeNull();
    expect(geomInf(2, -1)).toBeNull();
  });
});

describe("nZero", () => {
  it("1/n con ε = 0,1 → 11", () => {
    expect(nZero(SEQS[1]!.f, 0, 0.1)).toBe(11);
  });
  it("(2n+1)/(n+1) con ε = 0,1 → 10", () => {
    expect(nZero(SEQS[3]!.f, 2, 0.1)).toBe(10);
  });
});
