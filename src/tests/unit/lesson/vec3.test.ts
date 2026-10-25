import { describe, expect, it } from "vitest";
import { anguloGrados, cosAngulo, cross, dot, mixto, normaTxt, raizTxt, restaV } from "@/components/lesson/anim/vec3";

describe("vectores del espacio", () => {
  it("calcula productos y módulos", () => {
    expect(dot([2, -1, 3], [1, 4, 2])).toBe(4);
    expect(cross([1, 2, 3], [1, 1, 1])).toEqual([-1, 2, -1]);
    expect(cross([2, 0, 0], [0, 3, 0])).toEqual([0, 0, 6]);
    expect(mixto([1, 2, 3], [0, 1, 4], [5, 6, 0])).toBe(1);
    expect(mixto([1, 0, 1], [0, 1, 1], [1, 1, 2])).toBe(0);
    expect(normaTxt([2, 3, 6])).toBe("7");
    expect(normaTxt([1, 0, 1])).toBe("√2");
    expect(raizTxt(24)).toBe("2√6");
    expect(restaV([3, 2, 4], [1, 0, 1])).toEqual([2, 2, 3]);
  });
  it("calcula ángulos", () => {
    expect(Math.round(anguloGrados([1, 1, 0], [0, 1, 1])!)).toBe(60);
    expect(anguloGrados([0, 0, 0], [1, 0, 0])).toBeNull();
    expect(cosAngulo([1, -1, 0], [1, 1, 0])).toBeCloseTo(0);
  });
  it("comprueba los datos de las lecciones", () => {
    expect(cross([-1, 2, 0], [-1, 0, 3])).toEqual([6, 3, 2]);
    expect(cross([2, 1, 0], [0, 1, 2])).toEqual([2, -4, 2]);
    expect(cross([2, 0, 1], [0, 3, 2])).toEqual([-3, -4, 6]);
    expect(mixto([3, 0, 0], [1, 3, 0], [1, 1, 3])).toBe(27);
    expect(dot([1, 2, 2], [3, 0, 3])).toBe(9);
  });
});
