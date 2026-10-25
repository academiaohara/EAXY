import { describe, expect, it } from "vitest";
import {
  CASES, CAT, ELEMS, INNERS, INV_PAIRS, MOTIONS, OPT, OUTERS, byId, chain, classifyCritical, growth, numDeriv, optimum, productQuotient, quotient, secantSlope, sideDerivatives, tangent,
} from "@/components/lesson/anim/deriv";

describe("catálogo de derivadas", () => {
  it("la derivada analítica coincide con la numérica", () => {
    for (const c of CAT) {
      for (const x of [-2.3, -0.7, 0.4, 1.3, 2.9, 5.1]) {
        if (c.ok && !c.ok(x)) continue;
        if (!Number.isFinite(c.f(x))) continue;
        expect(c.df(x), `${c.id} en ${x}`).toBeCloseTo(numDeriv(c.f, x), 4);
      }
    }
  });
  it("la derivada segunda coincide con la numérica de f′", () => {
    for (const c of CAT) {
      if (!c.ddf) continue;
      for (const x of [-1.7, 0.6, 2.2, 3.4]) {
        if (c.ok && !c.ok(x)) continue;
        expect(c.ddf(x), `${c.id} en ${x}`).toBeCloseTo(numDeriv(c.df, x), 3);
      }
    }
  });
  it("los puntos críticos anulan f′", () => {
    for (const c of CAT) for (const x of c.crit ?? []) expect(Math.abs(c.df(x))).toBeLessThan(1e-9);
  });
  it("clasificación de puntos críticos", () => {
    expect(classifyCritical(byId("x3c"), 2)).toBe("maximo");
    expect(classifyCritical(byId("x3c"), 4)).toBe("minimo");
    expect(classifyCritical(byId("x3"), 0)).toBe("inflexion");
    expect(classifyCritical(byId("x4"), 0)).toBe("maximo");
    expect(classifyCritical(byId("x4"), 1)).toBe("minimo");
    expect(classifyCritical(byId("x2"), 0)).toBe("minimo");
  });
  it("valores del libro", () => {
    const c = byId("x3c");
    expect([0, 2, 3, 4, 7].map((x) => c.f(x))).toEqual([0, 20, 18, 16, 70]);
    expect(secantSlope((x) => x * x + 3 * x, 1, 3)).toBe(7);
    expect(secantSlope((x) => x * x + 3 * x, -2, 0)).toBe(1);
    expect(secantSlope((x) => x, 2, 2)).toBeNull();
  });
  it("tangente y crecimiento", () => {
    const t = tangent(byId("x3m3x"), 1);
    expect(t.m).toBe(0);
    expect(t.n).toBe(-2);
    const book = { ...byId("x2"), f: (x: number) => x ** 3 + 3 * x, df: (x: number) => 3 * x * x + 3 };
    expect(tangent(book, 1)).toEqual({ m: 6, n: -2, fa: 4 });
    expect(growth(0.3)).toBe("creciente");
    expect(growth(-2)).toBe("decreciente");
    expect(growth(0)).toBe("horizontal");
  });
  it("cociente incremental tiende a la derivada", () => {
    const f = (x: number) => 0.1 * x * x + 118 * x - 146.3;
    expect(quotient(f, 4, 1)).toBeCloseTo(118.9, 6);
    expect(quotient(f, 4, 1e-6)).toBeCloseTo(118.8, 4);
  });
});

describe("producto, cociente y cadena", () => {
  it("regla del producto y del cociente = derivada numérica", () => {
    for (const F of ELEMS) for (const G of ELEMS) for (const op of ["*", "/"] as const) {
      const x = 1.7;
      if ((F.ok && !F.ok(x)) || (G.ok && !G.ok(x))) continue;
      if (op === "/" && Math.abs(G.f(x)) < 0.05) continue;
      const r = productQuotient(op, F, G, x);
      expect(r.rule, `${F.label} ${op} ${G.label}`).toBeCloseTo(r.numeric, 3);
    }
  });
  it("regla de la cadena = derivada numérica", () => {
    for (const o of OUTERS) for (const i of INNERS) {
      const r = chain(o, i, 0.8);
      if (r.rule === null || r.numeric === null) continue;
      expect(r.rule, `${o.label}∘${i.label}`).toBeCloseTo(r.numeric, 3);
    }
  });
  it("ejemplo del libro: (x³ + 3)² → 6x⁵ + 18x²", () => {
    const o = OUTERS[0]!;
    const i = { ...INNERS[2]!, g: (x: number) => x ** 3 + 3 };
    expect(chain(o, i, 1).rule).toBe(2 * 4 * 3);
  });
});

describe("inversa, movimiento y optimización", () => {
  it("(f⁻¹)′(b) = 1/f′(f⁻¹(b))", () => {
    for (const p of INV_PAIRS) {
      const b = p.b0;
      expect(p.f(p.inv(b))).toBeCloseTo(b, 9);
      expect(1 / p.df(p.inv(b))).toBeCloseTo(p.dinv(b), 9);
      expect(p.dinv(b)).toBeCloseTo(numDeriv(p.inv, b), 4);
    }
  });
  it("v = e′ y a = v′", () => {
    for (const m of MOTIONS) for (const t of [0.5, 1, 3]) {
      expect(m.v(t)).toBeCloseTo(numDeriv(m.e, t), 4);
      expect(m.a(t)).toBeCloseTo(numDeriv(m.v, t), 4);
    }
  });
  it("optimización: soluciones del libro", () => {
    const o = OPT.map(optimum);
    expect(o[0]!.x).toBeCloseTo(1, 9);
    expect(o[0]!.y).toBeCloseTo(4, 9);
    expect(o[1]!.y).toBeCloseTo(12.25, 9);
    expect(o[2]).toEqual({ x: 4.5, y: 11.25 });
    expect(o[3]!.x).toBeCloseTo(0.8603, 3);
    expect(o[3]!.y).toBeCloseTo(13.949, 2);
  });
  it("derivadas de los problemas coinciden con las numéricas", () => {
    for (const p of OPT) for (const x of [p.dom[0] + 0.1, (p.dom[0] + p.dom[1]) / 2]) expect(p.dfn(x)).toBeCloseTo(numDeriv(p.fn, x), 3);
  });
});

describe("derivabilidad", () => {
  it("clasifica los seis casos", () => {
    expect(CASES.map((c) => sideDerivatives(c).status)).toEqual([
      "esquina", "derivable", "esquina", "no-continua", "tangente-vertical", "derivable",
    ]);
  });
  it("derivadas laterales de |x| en 0 son −1 y 1", () => {
    const r = sideDerivatives(CASES[0]!);
    expect(r.left).toEqual({ kind: "finite", value: -1 });
    expect(r.right).toEqual({ kind: "finite", value: 1 });
    expect(r.continuous).toBe(true);
  });
  it("esquina en 1: derivadas laterales 2 y 3; empalme suave: 2 y 2", () => {
    expect(sideDerivatives(CASES[2]!).left).toEqual({ kind: "finite", value: 2 });
    expect(sideDerivatives(CASES[2]!).right).toEqual({ kind: "finite", value: 3 });
    expect(sideDerivatives(CASES[1]!).right).toEqual({ kind: "finite", value: 2 });
  });
});
