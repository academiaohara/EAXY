import { describe, expect, it } from "vitest";
import { PIECEWISE, evalPiecewise, jumps, lineTex, pointSlopeTex, pointSlopeToSlopeIntercept, slope } from "@/components/lesson/anim/lin";

describe("pendiente y recta", () => {
  it("pendientes del libro", () => {
    expect(slope([-1, 3], [4, 13])).toEqual({ n: 2, d: 1 });
    expect(slope([7, 4], [2, -5])).toEqual({ n: 9, d: 5 });
    expect(slope([-2, 1], [4, 5])).toEqual({ n: 2, d: 3 });
    expect(slope([3, 2], [3, 7])).toBeNull();
    expect(slope([3, 2], [5, 2])).toEqual({ n: 0, d: 1 });
  });
  it("recta por (−5, 7) con m = −3/5 → y = −3/5·x + 4", () => {
    const r = pointSlopeToSlopeIntercept([-5, 7], { n: -3, d: 5 });
    expect(r.n).toEqual({ n: 4, d: 1 });
    expect(lineTex(r.m, r.n)).toBe("y = -\\dfrac{3}{5}x + 4");
  });
  it("recta por (−2, 7) y (4, 5): m = −1/3, n = 19/3", () => {
    const m = slope([-2, 7], [4, 5])!;
    expect(m).toEqual({ n: -1, d: 3 });
    expect(pointSlopeToSlopeIntercept([-2, 7], m).n).toEqual({ n: 19, d: 3 });
  });
  it("texto punto-pendiente", () => {
    expect(pointSlopeTex([-5, 7], { n: -3, d: 5 })).toBe("y = 7 - \\dfrac{3}{5}(x + 5)");
    expect(pointSlopeTex([0, 4], { n: 7, d: 3 })).toBe("y = 4 + \\dfrac{7}{3}x");
  });
});

describe("funciones a trozos", () => {
  it("la del libro", () => {
    const f = PIECEWISE[0]!;
    expect(evalPiecewise(f, 3).y).toBe(7);
    expect(evalPiecewise(f, 4).y).toBe(5);
    expect(evalPiecewise(f, 6)).toEqual({ y: 1, piece: 2 });
    expect(jumps(f).map((j) => j.gap)).toEqual([0, 0]);
  });
  it("empalme continuo y la que salta", () => {
    expect(jumps(PIECEWISE[1]!).map((j) => j.gap)).toEqual([0]);
    expect(jumps(PIECEWISE[3]!).map((j) => j.gap)).toEqual([4]);
    expect(jumps(PIECEWISE[2]!).map((j) => j.gap)).toEqual([0, 0]);
  });
});
