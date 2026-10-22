import { describe, expect, it } from "vitest";
import { FUNCS, analyze, noria, tarifa } from "@/components/lesson/anim/fn";

describe("analyze", () => {
  it("x³ − 3x + 2 en [−2, 3]: máx (−1, 4), mín (1, 0), recorrido [0, 20]", () => {
    const f = FUNCS[0]!;
    const a = analyze(f.f, f.a, f.b);
    expect(a.extremos).toEqual([{ x: -1, y: 4, tipo: "max" }, { x: 1, y: 0, tipo: "min" }]);
    expect([a.ymin, a.ymax]).toEqual([0, 20]);
    expect(a.tramos.map((t) => t.dir)).toEqual(["crece", "decrece", "crece"]);
  });
  it("x² − 4x en [−2, 6]: mínimo (2, −4), recorrido [−4, 12]", () => {
    const f = FUNCS[1]!;
    const a = analyze(f.f, f.a, f.b);
    expect(a.extremos).toEqual([{ x: 2, y: -4, tipo: "min" }]);
    expect([a.ymin, a.ymax]).toEqual([-4, 12]);
  });
  it("x³ − 12x en [−4, 4]: máx (−2, 16), mín (2, −16)", () => {
    const f = FUNCS[2]!;
    expect(analyze(f.f, f.a, f.b).extremos).toEqual([{ x: -2, y: 16, tipo: "max" }, { x: 2, y: -16, tipo: "min" }]);
  });
  it("sueldo y bola son crecientes sin extremos", () => {
    for (const i of [3, 4]) {
      const f = FUNCS[i]!;
      const a = analyze(f.f, f.a, f.b);
      expect(a.extremos).toEqual([]);
      expect(a.tramos).toHaveLength(1);
    }
    expect(FUNCS[3]!.f(15)).toBeCloseTo(2103.75);
  });
});

describe("noria y tarifas", () => {
  it("la noria es periódica de periodo T", () => {
    expect(noria(0, 30)).toBeCloseTo(0);
    expect(noria(15, 30)).toBeCloseTo(40);
    expect(noria(42, 30)).toBeCloseTo(noria(12, 30));
  });
  it("tarifas", () => {
    expect(tarifa(1, 0.5)).toBe(2);
    expect(tarifa(1, 1.25)).toBe(4);
    expect(tarifa(1, 4.1)).toBe(10);
    expect(tarifa(2, 0.5)).toBe(1);
    expect(tarifa(3, 0.5)).toBeCloseTo(2.8);
    expect(tarifa(1, 1)).toBe(2);
  });
});
