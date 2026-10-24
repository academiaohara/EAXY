import { describe, expect, it } from "vitest";
import {
  OP_FNS, PIECES, TABLE_FNS, INF_FNS, applyOp, asymFn, asymptotes, classify, degreeLimit, formOf, limText, limitAt, limitOneSided, pieceLimits, ratFn, restaFn,
} from "@/components/lesson/anim/lim";

describe("limitOneSided / limitAt", () => {
  it("polinomio: x² − 3 en 2 → 1", () => {
    expect(limitAt((x) => x * x - 3, 2)).toEqual({ kind: "finite", value: 1 });
  });
  it("0/0: (x² − 1)/(x − 1) en 1 → 2", () => {
    expect(limitAt((x) => (x * x - 1) / (x - 1), 1)).toEqual({ kind: "finite", value: 2 });
  });
  it("sen x / x en 0 → 1 y la conjugada → 1/2", () => {
    expect(limitAt(TABLE_FNS[2]!.f, 0)).toEqual({ kind: "finite", value: 1 });
    expect(limitAt(TABLE_FNS[3]!.f, 0)).toEqual({ kind: "finite", value: 0.5 });
  });
  it("1/x: laterales ±∞ y sin límite en 0", () => {
    const f = (x: number) => 1 / x;
    expect(limitOneSided(f, 0, "+")).toEqual({ kind: "inf", sign: 1 });
    expect(limitOneSided(f, 0, "-")).toEqual({ kind: "inf", sign: -1 });
    expect(limitAt(f, 0).kind).toBe("none");
    expect(limitAt(f, "+inf")).toEqual({ kind: "finite", value: 0 });
  });
  it("catálogo de infinitos", () => {
    const f = (i: number) => INF_FNS[i]!.f;
    expect(limitAt(f(1), 0)).toEqual({ kind: "inf", sign: 1 });
    expect(limitAt(f(2), "+inf")).toEqual({ kind: "inf", sign: 1 });
    expect(limitAt(f(3), "-inf")).toEqual({ kind: "inf", sign: -1 });
    expect(limitAt(f(4), "-inf")).toEqual({ kind: "inf", sign: -1 });
    expect(limitAt(f(5), "+inf")).toEqual({ kind: "inf", sign: 1 });
    expect(limitAt(f(5), "-inf")).toEqual({ kind: "finite", value: 0 });
    expect(limitOneSided(f(6), 0, "+")).toEqual({ kind: "inf", sign: -1 });
    expect(limitOneSided(f(6), 0, "-").kind).toBe("undef");
    expect(limitAt(f(6), "+inf")).toEqual({ kind: "inf", sign: 1 });
  });
  it("número e: (1 + 1/x)ˣ → 2,7183", () => {
    expect(limitAt((x) => (1 + 1 / x) ** x, "+inf")).toEqual({ kind: "finite", value: 2.7183 });
  });
  it("sen(1/x) no tiene límite lateral", () => {
    expect(limitOneSided((x) => Math.sin(1 / x), 0, "+").kind).toBe("none");
  });
  it("limText", () => {
    expect(limText({ kind: "finite", value: -0.5 })).toBe("−0,5");
    expect(limText({ kind: "inf", sign: -1 })).toBe("−∞");
  });
});

describe("clasificación de discontinuidades", () => {
  it("las seis funciones del catálogo", () => {
    expect(PIECES.map((p) => pieceLimits(p).kind)).toEqual([
      "continua", "salto-finito", "evitable", "evitable", "salto-infinito", "segunda-especie",
    ]);
  });
  it("salto de la función 2 es 2", () => {
    const { left, right } = pieceLimits(PIECES[1]!);
    expect(left).toEqual({ kind: "finite", value: 1 });
    expect(right).toEqual({ kind: "finite", value: 3 });
  });
  it("classify directo", () => {
    expect(classify({ kind: "finite", value: 2 }, { kind: "finite", value: 2 }, 2)).toBe("continua");
    expect(classify({ kind: "inf", sign: 1 }, { kind: "inf", sign: -1 }, null)).toBe("salto-infinito");
  });
});

describe("grados y asíntotas", () => {
  it("degreeLimit coincide con la estimación numérica", () => {
    for (const p of [1, 2, 3]) for (const q of [1, 2, 3]) for (const [a, c] of [[2, 1], [-3, 2], [1, -1]] as const) for (const s of ["+inf", "-inf"] as const) {
      const est = limitAt(ratFn(p, a, q, c), s);
      const th = degreeLimit(p, a, q, c, s === "+inf" ? 1 : -1);
      expect(est.kind, `${p},${a},${q},${c},${s}`).toBe(th.kind);
      if (th.kind === "inf" && est.kind === "inf") expect(est.sign).toBe(th.sign);
      if (th.kind === "finite" && est.kind === "finite") expect(est.value).toBeCloseTo(Math.round((th.value) * 1e4) / 1e4, 3);
    }
  });
  it("(x² + x + 1)/(x − 1) tiene la asíntota oblicua y = x + 2 y la vertical x = 1", () => {
    const s = asymptotes(1, 1, 1, 1);
    expect(s.vertical).toBe(1);
    expect(s.oblique).toEqual({ m: 1, n: 2 });
    const f = asymFn(1, 1, 1, 1);
    expect(f(1e6) - (1e6 + 2)).toBeCloseTo(0, 3);
  });
  it("(x² + 2x − 8)/(x − 1): y = x + 3", () => {
    expect(asymptotes(1, 2, -8, 1).oblique).toEqual({ m: 1, n: 3 });
  });
  it("numerador que se anula en r: hueco, sin vertical", () => {
    const s = asymptotes(1, 0, -4, 2);
    expect(s.hole).toBe(true);
    expect(s.vertical).toBeNull();
  });
  it("horizontal cuando a = 0", () => {
    expect(asymptotes(0, 3, 1, 2).horizontal).toBe(3);
  });
});

describe("operaciones entre límites", () => {
  const inf = (sign: 1 | -1) => ({ kind: "inf", sign }) as const;
  const fin = (value: number) => ({ kind: "finite", value }) as const;
  it("formas indeterminadas", () => {
    expect(formOf("-", inf(1), inf(1))).toEqual({ text: "∞ − ∞", indeterminate: true });
    expect(formOf("+", inf(1), inf(-1))?.indeterminate).toBe(true);
    expect(formOf("+", inf(1), inf(1))?.indeterminate).toBe(false);
    expect(formOf("*", fin(0), inf(1))).toEqual({ text: "0 · ∞", indeterminate: true });
    expect(formOf("/", fin(0), fin(0))?.indeterminate).toBe(true);
    expect(formOf("/", fin(3), fin(0))).toEqual({ text: "K / 0", indeterminate: false });
    expect(formOf("/", inf(1), inf(1))?.indeterminate).toBe(true);
  });
  it("mismo tipo de indeterminación, resultados distintos", () => {
    const [x, x2] = [OP_FNS[0]!.f, OP_FNS[1]!.f];
    expect(limitAt(applyOp("-", x, x), "+inf")).toEqual({ kind: "finite", value: 0 });
    expect(limitAt(applyOp("-", x2, x), "+inf")).toEqual({ kind: "inf", sign: 1 });
    expect(limitAt(applyOp("/", x, x2), "+inf")).toEqual({ kind: "finite", value: 0 });
    expect(limitAt(applyOp("/", OP_FNS[2]!.f, x), "+inf")).toEqual({ kind: "finite", value: 2 });
  });
  it("∞ − ∞ en fracciones: k = 2r da 1/(2r); si no, no existe", () => {
    expect(limitAt(restaFn(2, 1), 1)).toEqual({ kind: "finite", value: 0.5 });
    expect(limitAt(restaFn(4, 2), 2)).toEqual({ kind: "finite", value: 0.25 });
    expect(limitAt(restaFn(1, 2), 2).kind).toBe("none");
    expect(limitOneSided(restaFn(1, 2), 2, "+")).toEqual({ kind: "inf", sign: 1 });
    expect(limitOneSided(restaFn(1, 2), 2, "-")).toEqual({ kind: "inf", sign: -1 });
  });
});
