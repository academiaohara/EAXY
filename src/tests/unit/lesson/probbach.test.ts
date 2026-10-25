import { describe, expect, it } from "vitest";
import {
  DIE_EVENTS, SCENARIOS, birthday, contingency, fracText, meré, pairProbs, regionOf, setOp, threeDice, totalBayes, treeToTable,
} from "@/components/lesson/anim/probbach";

describe("sucesos con un dado", () => {
  const par = DIE_EVENTS[0]!.set;
  const m3 = DIE_EVENTS[2]!.set;
  it("ejemplo del libro: par = {2,4,6}, múltiplo de 3 = {3,6}", () => {
    expect(setOp("union", par, m3)).toEqual([2, 3, 4, 6]);
    expect(setOp("inter", par, m3)).toEqual([6]);
    expect(setOp("diff", par, m3)).toEqual([2, 4]);
    expect(setOp("comp", par, m3)).toEqual([1, 3, 5]);
  });
  it("leyes de De Morgan", () => {
    const a = DIE_EVENTS[3]!.set;
    const b = DIE_EVENTS[5]!.set;
    const notUnion = setOp("comp", setOp("union", a, b), b);
    const interNots = setOp("inter", setOp("comp", a, b), setOp("comp", b, b));
    expect(notUnion).toEqual(interNots);
  });
  it("regiones de Venn", () => {
    expect(regionOf(6, par, m3)).toBe("AB");
    expect(regionOf(2, par, m3)).toBe("A");
    expect(regionOf(3, par, m3)).toBe("B");
    expect(regionOf(1, par, m3)).toBe("none");
  });
});

describe("probabilidades de dos sucesos", () => {
  it("ejercicio 24: P(A) = 2/3, P(B) = 3/4, P(A∩B) = 5/8", () => {
    const r = pairProbs(2 / 3, 3 / 4, 5 / 8);
    expect(r.union).toBeCloseTo(19 / 24, 9);
    expect(r.notB).toBeCloseTo(1 / 4, 9);
    expect(r.neither).toBeCloseTo(5 / 24, 9);
    expect(r.aGivenB).toBeCloseTo(5 / 6, 9);
    expect(r.valid).toBe(true);
  });
  it("baraja: rey o figura = 16/40; basto o figura = 22/40; as u oro = 13/40", () => {
    expect(pairProbs(4 / 40, 16 / 40, 4 / 40).union).toBeCloseTo(0.4, 9);
    expect(pairProbs(10 / 40, 16 / 40, 4 / 40).union).toBeCloseTo(22 / 40, 9);
    expect(pairProbs(4 / 40, 10 / 40, 1 / 40).union).toBeCloseTo(13 / 40, 9);
  });
  it("independientes e incompatibles", () => {
    expect(pairProbs(0.5, 0.5, 0.25).independent).toBe(true);
    expect(pairProbs(0.5, 0.25, 0).incompatible).toBe(true);
    expect(pairProbs(0.5, 0.25, 0.3).valid).toBe(false);
    expect(pairProbs(0.8, 0.8, 0.5).valid).toBe(false);
  });
});

describe("tabla de contingencia y árbol", () => {
  it("estudio del hígado: A = diagnóstico correcto, B = lesión maligna", () => {
    const t = contingency([206, 12, 268, 14])!;
    expect(t.n).toBe(500);
    expect(t.joint.ab).toBeCloseTo(0.412, 9);
    expect(t.pa).toBeCloseTo(0.948, 9);
    expect(t.pb).toBeCloseTo(0.436, 9);
    expect(t.aGivenB).toBeCloseTo(206 / 218, 9);
    expect(t.independent).toBe(false);
    expect(t.nearIndependent).toBe(true);
  });
  it("tabla de 2/9, 5/9, 1/9, 1/9", () => {
    const t = contingency([2, 5, 1, 1])!;
    expect(t.pa).toBeCloseTo(3 / 9, 9);
    expect(t.bGivenA).toBeCloseTo(2 / 3, 9);
    expect(t.bGivenNa).toBeCloseTo(5 / 6, 9);
    expect(t.aGivenB).toBeCloseTo(2 / 7, 9);
    expect(t.aGivenNb).toBeCloseTo(1 / 2, 9);
  });
  it("independencia exacta", () => {
    expect(contingency([1, 1, 1, 1])!.independent).toBe(true);
    expect(contingency([4, 2, 2, 1])!.independent).toBe(true);
    expect(contingency([2, 5, 1, 1])!.independent).toBe(false);
    expect(contingency([0, 0, 0, 0])).toBeNull();
  });
  it("árbol → tabla del libro: P(A) = 0,3, P(B|A) = 1/3, P(B|Ā) = 6/7", () => {
    const t = treeToTable(0.3, 1 / 3, 6 / 7);
    expect(t.joint).toEqual({ ab: 0.1, nab: 0.6, anb: 0.2, nanb: 0.1 });
    expect(t.pb).toBeCloseTo(0.7, 9);
    expect(t.aGivenB).toBeCloseTo(1 / 7, 9);
    expect(t.aGivenNb).toBeCloseTo(0.2 / 0.3, 9);
  });
  it("fracText", () => {
    expect(fracText(2, 4)).toBe("1/2");
    expect(fracText(6, 3)).toBe("2");
    expect(fracText(1, 0)).toBe("—");
  });
});

describe("probabilidad total y Bayes", () => {
  it("dos urnas: P(negra) = 2/5 y P(urna B | negra) = 3/4", () => {
    const r = totalBayes(SCENARIOS[0]!);
    expect(r.total).toBeCloseTo(0.4, 9);
    expect(r.posterior[1]).toBeCloseTo(0.75, 9);
  });
  it("tres cajas: P(negra) = 113/360", () => {
    expect(totalBayes(SCENARIOS[1]!).total).toBeCloseTo(113 / 360, 9);
  });
  it("móviles: P(correcto | marcado defectuoso) ≈ 0,3525 y P(defectuoso | marcado correcto) ≈ 0,00206", () => {
    const pos = totalBayes(SCENARIOS[2]!);
    expect(pos.total).toBeCloseTo(0.0278, 9);
    expect(pos.posterior[1]).toBeCloseTo(0.0098 / 0.0278, 8);
    const neg = totalBayes(SCENARIOS[2]!, true);
    expect(neg.posterior[0]).toBeCloseTo(0.002 / 0.9722, 8);
  });
  it("sastres y tornillos", () => {
    const s = totalBayes(SCENARIOS[3]!);
    expect(s.total).toBeCloseTo(0.0665, 9);
    expect(s.posterior[0]).toBeCloseTo(0.0275 / 0.0665, 8);
    const t = totalBayes(SCENARIOS[4]!);
    expect(t.total).toBeCloseTo(0.025, 9);
    expect(t.posterior[1]).toBeCloseTo(0.2, 9);
  });
  it("las posteriores suman 1", () => {
    for (const s of SCENARIOS) for (const neg of [false, true]) expect(totalBayes(s, neg).posterior.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 6);
  });
});

describe("problemas famosos", () => {
  it("cumpleaños: 23 personas ≈ 0,5073", () => {
    expect(birthday(23)).toBeCloseTo(0.5073, 4);
    expect(birthday(1)).toBe(0);
    expect(birthday(60)).toBeGreaterThan(0.99);
  });
  it("Caballero de la Meré", () => {
    expect(meré("uno", 4)).toBeCloseTo(0.5177, 4);
    expect(meré("doble", 24)).toBeCloseTo(0.4914, 4);
  });
  it("Galileo: la suma 10 sale 27 veces de 216 y la 9, 25", () => {
    expect(threeDice(10)).toBe(27);
    expect(threeDice(9)).toBe(25);
    expect([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].reduce((a, s) => a + threeDice(s), 0)).toBe(216);
  });
});
