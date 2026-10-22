import { describe, expect, it } from "vitest";
import { compound, directRule, fmtEs, hm, inverseRule, mixture, movers, share, simpleInterest, variationIndex } from "@/components/lesson/anim/arith";

describe("proporcionalidad", () => {
  it("reglas de tres", () => {
    expect(directRule(5.5, 4.51, 8.35)).toBeCloseTo(6.85, 2);
    expect(inverseRule(35, 60, 20)).toBe(105);
  });
  it("compuesta: vacas y días (D,D) y albañiles (D,I)", () => {
    expect(compound([15, 7], 294, [10, 30], ["d", "d"])).toBe(840);
    expect(compound([400, 8], 15, [600, 10], ["d", "i"])).toBe(18);
    expect(compound([10, 18], 600, [8, 15], ["d", "d"])).toBe(400);
  });
  it("excavadora y bocas de riego", () => {
    expect(compound([10, 1000], 8, [12, 600], ["i", "d"])).toBe(4);
    expect(compound([3, 1.5], 8, [4, 0.9], ["i", "i"])).toBe(10);
  });
});

describe("reparto, mezclas, móviles", () => {
  it("share: 1, 2 y 5 millones de 600 000", () => {
    const s = share([1, 2, 5], 600000);
    expect(s.amounts).toEqual([75000, 150000, 375000]);
    expect(s.fractions).toEqual([[1, 8], [1, 4], [5, 8]]);
  });
  it("alquiler por días 2, 3, 7 de 264 €", () => {
    expect(share([2, 3, 7], 264).amounts).toEqual([44, 66, 154]);
  });
  it("mezcla de cafés y de oro", () => {
    expect(mixture([{ qty: 50, price: 8.8 }, { qty: 30, price: 6.4 }]).price).toBe(7.9);
    expect(mixture([{ qty: 50, price: 0.89 }, { qty: 90, price: 0.75 }]).price).toBeCloseTo(0.8, 1);
  });
  it("encuentro y alcance", () => {
    expect(movers("opuesto", 80, 120, 350)).toMatchObject({ t: 1.75, x: 140 });
    expect(movers("alcance", 14, 38, 22).t).toBeCloseTo(22 / 24, 5);
    const c = movers("alcance", 18, 22, 0, 0.5);
    expect(c.t).toBe(2.25);
    expect(movers("alcance", 30, 20, 10).ok).toBe(false);
  });
  it("hm", () => {
    expect(hm(1.75)).toBe("1 h 45 min");
    expect(hm(22 / 24)).toBe("55 min");
  });
});

describe("porcentajes e interés", () => {
  it("índice de variación encadenado", () => {
    expect(variationIndex([-20, -40])).toBe(0.48);
    expect(variationIndex([15])).toBe(1.15);
    expect(variationIndex([-20, 18])).toBe(0.944);
  });
  it("interés simple", () => {
    expect(simpleInterest(750, 4, 3)).toBe(90);
    expect(simpleInterest(40000, 3.25, 1)).toBe(1300);
    expect(simpleInterest(16500, 6, 5)).toBe(4950);
  });
  it("fmtEs", () => {
    expect(fmtEs(6.85)).toBe("6,85");
    expect(fmtEs(8048.25)).toBe("8048,25");
    expect(fmtEs(171500)).toBe("171 500");
    expect(fmtEs(-3)).toBe("−3");
  });
});
