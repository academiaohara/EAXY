import { describe, expect, it } from "vitest";
import { COMP, INV, SYM, compose, composeText, domainOf, inverseHolds, parityOf, val } from "@/components/lesson/anim/fnlib";

describe("catálogo de simetrías", () => {
  it("la paridad declarada coincide con la comprobación numérica", () => {
    for (const s of SYM) expect(parityOf(s.f), s.label).toBe(s.parity);
  });
});

describe("composición", () => {
  const [sum2, dbl, sq, sqrt, inv] = COMP;
  it("expresiones simbólicas", () => {
    expect(composeText(sq!, sum2!)).toBe("(x + 2)²");
    expect(composeText(sum2!, sq!)).toBe("(x)² + 2");
    expect(composeText(sqrt!, sq!)).toBe("√((x)²)");
    expect(composeText(dbl!, sum2!)).toBe("2·(x + 2)");
  });
  it("valores y casos no definidos", () => {
    expect(compose(sq!, sum2!, 1)).toBe(9);
    expect(compose(sum2!, sq!, 3)).toBe(11);
    expect(compose(sqrt!, sum2!, -5)).toBeNull();
    expect(compose(inv!, sum2!, -2)).toBeNull();
    expect(val(Math.log, 0)).toBeNull();
  });
  it("la composición no es conmutativa", () => {
    expect(compose(sq!, sum2!, 1)).not.toBe(compose(sum2!, sq!, 1));
  });
});

describe("inversas", () => {
  it("inv deshace a f en las inyectivas y la x² completa no lo es", () => {
    for (const it of INV.filter((q) => q.injective)) expect(inverseHolds(it), it.label).toBe(true);
    expect(INV[INV.length - 1]!.injective).toBe(false);
  });
});

describe("dominios", () => {
  it("racional: se excluyen los ceros del denominador", () => {
    const d = domainOf("racional", 2, 3);
    expect(d.text).toBe("ℝ − {2, 3}");
    expect(d.ok(2)).toBe(false);
    expect(d.ok(0)).toBe(true);
    expect(domainOf("racional", 1, 1).text).toBe("ℝ − {1}");
  });
  it("radical: radicando no negativo", () => {
    expect(domainOf("radical", 2, 1).text).toBe("[2, +∞)");
    expect(domainOf("radical", 2, -1).text).toBe("(−∞, 2]");
    expect(domainOf("radical", 2, 1).ok(1.9)).toBe(false);
  });
  it("logaritmo: argumento positivo; raíz de x² − q", () => {
    expect(domainOf("logaritmica", 1, 0).text).toBe("(1, +∞)");
    expect(domainOf("raiz-cuadrado", 0, 4).text).toBe("(−∞, −2] ∪ [2, +∞)");
    expect(domainOf("raiz-cuadrado", 0, 0).text).toContain("ℝ");
    expect(domainOf("polinomica", 3, 0).ok(100)).toBe(true);
  });
});
