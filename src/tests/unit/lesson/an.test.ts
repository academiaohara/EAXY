import { describe, expect, it } from "vitest";
import { add, dist2, directionOfGeneral, lineFromPointDir, lineText, lineThrough, midpoint, parallel, perp, perpendicular, scale, simplifySqrt, slopeOfGeneral, sqrtTex, sub, vec } from "@/components/lesson/anim/an";

describe("vectores", () => {
  it("AB(5,2) y la igualdad del libro", () => {
    expect(vec([1, 4], [6, 6])).toEqual([5, 2]);
    expect(vec([1, 3], [4, 8])).toEqual([3, 5]);
    expect(vec([2, -3], [5, 2])).toEqual([3, 5]);
  });
  it("D para que AB = CD con A(3,−1), B(4,6), C(0,0)", () => {
    const ab = vec([3, -1], [4, 6]);
    expect(ab).toEqual([1, 7]);
  });
  it("operaciones", () => {
    expect(add([1, 3], [2, -1])).toEqual([3, 2]);
    expect(sub([1, 3], [2, -1])).toEqual([-1, 4]);
    expect(add(scale(2, [1, 3]), scale(3, [2, -1]))).toEqual([8, 3]);
    expect(sub(scale(2, [1, 3]), scale(3, [2, -1]))).toEqual([-4, 9]);
    expect(perp([5, 2])).toEqual([-2, 5]);
  });
  it("raíces", () => {
    expect(simplifySqrt(45)).toEqual({ a: 3, b: 5 });
    expect(sqrtTex(20)).toBe("2\\sqrt{5}");
    expect(sqrtTex(25)).toBe("5");
    expect(sqrtTex(109)).toBe("\\sqrt{109}");
  });
});

describe("punto medio y distancia", () => {
  it("puntos medios", () => {
    expect(midpoint([-2, 1], [4, 3])).toEqual([{ n: 1, d: 1 }, { n: 2, d: 1 }]);
    expect(midpoint([-3, 5], [4, 0])).toEqual([{ n: 1, d: 2 }, { n: 5, d: 2 }]);
  });
  it("distancias", () => {
    expect(dist2([-2, 2], [1, 6])).toBe(25);
    expect(dist2([3, -5], [1, -1])).toBe(20);
    expect(dist2([-5, 11], [0, -1])).toBe(169);
    expect(dist2([-4, 3], [6, 8])).toBe(125);
    expect(dist2([-4, 3], [4, -3])).toBe(100);
  });
});

describe("rectas", () => {
  it("recta por (−2,3) y (6,7): y = x/2 + 4", () => {
    expect(lineText(lineThrough([-2, 3], [6, 7]))).toBe("y = \\dfrac{1}{2}x + 4");
  });
  it("por A(3,7), B(8,−3): y = −2x + 13", () => {
    expect(lineText(lineThrough([3, 7], [8, -3]))).toBe("y = -2x + 13");
  });
  it("vertical y horizontal", () => {
    expect(lineText(lineFromPointDir([4, 1], [0, 3]))).toBe("x = 4");
    expect(lineText(lineFromPointDir([4, 2], [5, 0]))).toBe("y = 2");
  });
  it("paralela a 2x+5y−4=0 por (4,−3); perpendicular a 5x−3y+15=0 por (−7,2)", () => {
    const d = directionOfGeneral(2, 5);
    expect(slopeOfGeneral(2, 5)).toEqual({ n: -2, d: 5 });
    expect(lineText(lineFromPointDir([4, -3], d))).toBe("y = -\\dfrac{2}{5}x - \\dfrac{7}{5}");
    const d2 = perp(directionOfGeneral(5, -3));
    expect(lineText(lineFromPointDir([-7, 2], d2))).toBe("y = -\\dfrac{3}{5}x - \\dfrac{11}{5}");
  });
  it("mediatriz de A(−3,1), B(1,5): y = −x + 2", () => {
    const m = midpoint([-3, 1], [1, 5]);
    expect(m).toEqual([{ n: -1, d: 1 }, { n: 3, d: 1 }]);
    expect(lineText(lineFromPointDir([-1, 3], perp(vec([-3, 1], [1, 5]))))).toBe("y = -x + 2");
  });
  it("paralelas y perpendiculares", () => {
    expect(parallel([3, 5], [6, 10])).toBe(true);
    expect(perpendicular([5, 2], [-2, 5])).toBe(true);
    // 3x−5y+15=0 y recta por (−2,−3),(8,3): dirección (5,3) y (10,6): paralelas
    expect(parallel(directionOfGeneral(3, -5), vec([-2, -3], [8, 3]))).toBe(true);
  });
});
