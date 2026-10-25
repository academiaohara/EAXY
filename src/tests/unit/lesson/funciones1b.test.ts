import { describe, expect, it } from "vitest";
import { DOSIS, diferencias, gradoPorDiferencias, parabolaPor, parteEntera, rectaPor, techo } from "@/components/lesson/anim/funciones1b";

describe("interpolación y parte entera (CCSS I)", () => {
  it("recta por (6, 63) y (7, 66,5): y = 3,5x + 42", () => {
    const r = rectaPor([6, 63], [7, 66.5]);
    expect(r.m).toBeCloseTo(3.5, 10);
    expect(r.n).toBeCloseTo(42, 10);
    expect(r.m * 6.4 + r.n).toBeCloseTo(64.4, 10);
    expect(r.m * 7.3 + r.n).toBeCloseTo(67.55, 10);
  });
  it("parábola por (6, 63), (7, 66,5) y (8, 69,1)", () => {
    const p = parabolaPor([6, 63], [7, 66.5], [8, 69.1]);
    expect(p.a).toBeCloseTo(-0.45, 10);
    expect(p.b).toBeCloseTo(9.35, 10);
    expect(p.c).toBeCloseTo(23.1, 9);
    expect(p.a * 6.4 ** 2 + p.b * 6.4 + p.c).toBeCloseTo(64.508, 9);
    expect(p.a * 5.5 ** 2 + p.b * 5.5 + p.c).toBeCloseTo(60.9125, 9);
    expect(p.a * 400 + p.b * 20 + p.c).toBeCloseTo(30.1, 9);
  });
  it("las diferencias segundas de las dosis son constantes", () => {
    const ys = DOSIS.map((p) => p[1]);
    expect(diferencias(ys, 1)[0]).toBeCloseTo(8, 10);
    expect(gradoPorDiferencias(ys, 3, 1e-6)).toBe(2);
    expect(gradoPorDiferencias([5, 8, 11, 14])).toBe(1);
    expect(gradoPorDiferencias([2, 4, 8, 16, 32, 64, 128])).toBeNull();
    expect(gradoPorDiferencias([1])).toBeNull();
  });
  it("parte entera y techo", () => {
    expect(parteEntera(2.3)).toBe(2);
    expect(parteEntera(-0.3)).toBe(-1);
    expect(parteEntera(-2.7)).toBe(-3);
    expect(parteEntera(3)).toBe(3);
    expect(techo(3.17)).toBe(4);
    expect(techo(3)).toBe(3);
    expect(techo(-0.5)).toBeCloseTo(0, 10);
  });
});
