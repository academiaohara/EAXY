import { describe, expect, it } from "vitest";
import { bestElimination, capitales, eqText, lineCurve, reductionPlan, solveSystem } from "@/components/lesson/anim/sys";

describe("solveSystem", () => {
  it("3x−5y=1, x+2y=15 → (7,4)", () => {
    const s = solveSystem([3, -5, 1], [1, 2, 15]);
    expect(s).toMatchObject({ kind: "unica", x: { n: 7, d: 1 }, y: { n: 4, d: 1 } });
  });
  it("8x+11y=−18, 12x+7y=−8 → (1/2, −2)", () => {
    const s = solveSystem([8, 11, -18], [12, 7, -8]);
    expect(s).toMatchObject({ kind: "unica", x: { n: 1, d: 2 }, y: { n: -2, d: 1 } });
  });
  it("paralelas e idénticas", () => {
    expect(solveSystem([1, 2, 4], [2, 4, 2]).kind).toBe("incompatible");
    expect(solveSystem([1, 2, 4], [2, 4, 8]).kind).toBe("indeterminado");
    expect(solveSystem([2, 1, 5], [4, 2, 10]).kind).toBe("indeterminado");
    expect(solveSystem([2, 1, 5], [4, 2, 8]).kind).toBe("incompatible");
  });
});

describe("reducción", () => {
  it("multiplica la 2.ª por −3 para eliminar x", () => {
    const p = reductionPlan([3, -5, 1], [1, 2, 15], "x")!;
    expect([p.m1, p.m2]).toEqual([1, -3]);
    expect(p.sum).toEqual([0, -11, -44]);
  });
  it("8x+11y, 12x+7y: elimina x con ×3 y ×−2 (m.c.m. 24)", () => {
    const p = reductionPlan([8, 11, -18], [12, 7, -8], "x")!;
    expect([p.m1, p.m2]).toEqual([3, -2]);
    expect(p.sum).toEqual([0, 19, -38]);
  });
  it("elige la incógnita más barata", () => {
    expect(bestElimination([1, 1, 4], [1, -1, 2])!.eliminate).toBe("x");
    expect(bestElimination([5, 1, 3], [3, -1, 1])!.eliminate).toBe("y");
  });
  it("texto de ecuaciones", () => {
    expect(eqText([3, -5, 1])).toBe("3x − 5y = 1");
    expect(eqText([-1, 1, 2])).toBe("−x + y = 2");
    expect(eqText([0, 1, 5])).toBe("y = 5");
  });
});

describe("lineCurve", () => {
  it("y=x+1 con x²+y²=5 no es el círculo de radio 5: usa 25", () => {
    // x² + (x+1)² = 25 → x² + x − 12 = 0 → 3, −4
    expect(lineCurve("circulo", 1, 1).points.map((p) => p.x).sort((a, b) => a - b)).toEqual([-4, 3]);
  });
  it("tangente y secante a la parábola", () => {
    expect(lineCurve("parabola", 2, -1).points).toHaveLength(1);
    expect(lineCurve("parabola", 0, -1).points).toHaveLength(0);
    expect(lineCurve("parabola", 1, 2).points).toHaveLength(2);
  });
  it("hipérbola xy=6 con y=x+1 → x=2, −3", () => {
    expect(lineCurve("hiperbola", 1, 1).points.map((p) => p.x).sort((a, b) => a - b)).toEqual([-3, 2]);
  });
});

describe("capitales", () => {
  it("100 000 € al 4 % y 5 %, gana 4 700 → 30 000 y 70 000", () => {
    expect(capitales(100000, 4, 5, 4700)).toMatchObject({ x: 30000, y: 70000, ok: true });
  });
  it("200 000 € al 4 % y −11 %, gana 4 250 → 175 000 y 25 000", () => {
    const r = capitales(200000, 4, -11, 4250)!;
    expect([r.x, r.y, r.ok]).toEqual([175000, 25000, true]);
  });
});
