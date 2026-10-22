import { describe, expect, it } from "vitest";
import { complement, diceCount, diceDistribution, leafP, product, urnTree } from "@/components/lesson/anim/prob";

describe("urna 3 verdes y 2 rojas, sin reemplazamiento", () => {
  const t = urnTree(3, 2, false);
  it("VV = 3/10, VR = 3/10, RV = 3/10, RR = 1/10", () => {
    expect(leafP(t, "V", "V")).toEqual({ n: 3, d: 10 });
    expect(leafP(t, "V", "R")).toEqual({ n: 3, d: 10 });
    expect(leafP(t, "R", "V")).toEqual({ n: 3, d: 10 });
    expect(leafP(t, "R", "R")).toEqual({ n: 1, d: 10 });
  });
  it("las cuatro ramas suman 1", () => {
    const s = t.reduce((a, l) => a + l.p.n / l.p.d, 0);
    expect(s).toBeCloseTo(1);
  });
});

describe("con reemplazamiento", () => {
  it("VV = 9/25, RR = 4/25", () => {
    const t = urnTree(3, 2, true);
    expect(leafP(t, "V", "V")).toEqual({ n: 9, d: 25 });
    expect(leafP(t, "R", "R")).toEqual({ n: 4, d: 25 });
  });
});

describe("casos con bolas de un solo color", () => {
  it("una verde y una roja sin reemplazar: VV = 0", () => {
    expect(leafP(urnTree(1, 1, false), "V", "V")).toEqual({ n: 0, d: 1 });
  });
});

describe("dos dados", () => {
  it("diferencias: 6, 10, 8, 6, 4, 2 sobre 36", () => {
    expect([...diceDistribution("diferencia").values()]).toEqual([6, 10, 8, 6, 4, 2]);
    expect(diceCount("diferencia", ">", 3)).toBe(6);
  });
  it("mayor y menor", () => {
    expect([...diceDistribution("mayor").values()]).toEqual([1, 3, 5, 7, 9, 11]);
    expect([...diceDistribution("menor").values()]).toEqual([11, 9, 7, 5, 3, 1]);
    expect(diceCount("menor", "<", 4)).toBe(27);
  });
  it("suma 7: 6 casos", () => {
    expect(diceCount("suma", "=", 7)).toBe(6);
  });
});

describe("independientes", () => {
  it("tres controles: 0,89·0,93·0,85", () => {
    expect(product([0.89, 0.93, 0.85])).toBeCloseTo(0.703545, 6);
  });
  it("complemento", () => {
    expect(complement({ n: 3, d: 10 })).toEqual({ n: 7, d: 10 });
  });
});
