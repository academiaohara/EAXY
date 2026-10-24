import { describe, expect, it } from "vitest";
import { cosD, exactTrig, norm360, piFrac, quadrant, reference, sinD, solveAAS, solveSAS, solveSSA, solveSSS, solveTrigEq, tanD } from "@/components/lesson/anim/trig";

describe("trig básico", () => {
  it("valores en ángulos notables", () => {
    expect(sinD(90)).toBe(1);
    expect(cosD(90)).toBe(0);
    expect(sinD(30)).toBe(0.5);
    expect(tanD(45)).toBe(1);
    expect(tanD(90)).toBeNull();
    expect(tanD(270)).toBeNull();
  });

  it("radianes como fracción de π", () => {
    expect(piFrac(60)).toBe("π/3");
    expect(piFrac(150)).toBe("5π/6");
    expect(piFrac(180)).toBe("π");
    expect(piFrac(360)).toBe("2π");
    expect(piFrac(-90)).toBe("−π/2");
    expect(piFrac(0)).toBe("0");
  });

  it("cuadrante y ángulo de referencia", () => {
    expect(quadrant(135)).toBe(2);
    expect(quadrant(250)).toBe(3);
    expect(quadrant(-30)).toBe(4);
    expect(quadrant(90)).toBe(0);
    expect(reference(135)).toBe(45);
    expect(reference(210)).toBe(30);
    expect(reference(330)).toBe(30);
    expect(norm360(-30)).toBe(330);
  });

  it("valores exactos con signo", () => {
    expect(exactTrig("sen", 150)).toBe("1/2");
    expect(exactTrig("cos", 150)).toBe("−√3/2");
    expect(exactTrig("tg", 135)).toBe("−1");
    expect(exactTrig("tg", 90)).toBeNull();
    expect(exactTrig("sen", 37)).toBeNull();
  });
});

describe("ecuaciones trigonométricas", () => {
  it("sen x = 1/2 → 30° y 150°", () => {
    expect(solveTrigEq("sen", 0.5)).toEqual([30, 150]);
  });
  it("cos x = −1/2 → 120° y 240°", () => {
    expect(solveTrigEq("cos", -0.5)).toEqual([120, 240]);
  });
  it("tg x = 1 → 45° y 225°", () => {
    expect(solveTrigEq("tg", 1)).toEqual([45, 225]);
  });
  it("valores extremos: una solución, y sin solución fuera de [−1, 1]", () => {
    expect(solveTrigEq("sen", 1)).toEqual([90]);
    expect(solveTrigEq("cos", 1)).toEqual([0]);
    expect(solveTrigEq("sen", 1.5)).toEqual([]);
  });
});

describe("resolución de triángulos", () => {
  it("SAS: b = 5, c = 7, A = 60° → a = √39", () => {
    const t = solveSAS(5, 7, 60);
    expect(t.a).toBeCloseTo(Math.sqrt(39), 9);
    expect(t.A + t.B + t.C).toBeCloseTo(180, 9);
  });

  it("SSS: 3-4-5 es rectángulo", () => {
    const t = solveSSS(5, 3, 4)!;
    expect(t.A).toBeCloseTo(90, 9);
    expect(t.area).toBeCloseTo(6, 9);
    expect(solveSSS(1, 2, 5)).toBeNull();
  });

  it("AAS: A = 30°, B = 45°, a = 10 → b = 10√2", () => {
    const t = solveAAS(30, 45, 10)!;
    expect(t.b).toBeCloseTo(10 * Math.SQRT2, 6);
    expect(t.C).toBeCloseTo(105, 9);
    expect(solveAAS(100, 80, 5)).toBeNull();
  });

  it("caso ambiguo: 0, 1 o 2 soluciones", () => {
    expect(solveSSA(5, 10, 30)).toHaveLength(1);
    expect(solveSSA(7, 10, 30)).toHaveLength(2);
    expect(solveSSA(3, 10, 30)).toHaveLength(0);
    expect(solveSSA(12, 10, 30)).toHaveLength(1);
  });
});
