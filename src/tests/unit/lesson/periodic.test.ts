import { describe, expect, it } from "vitest";
import { expandFraction, expansionTex, generatrix, shiftedPeriodic } from "@/components/lesson/anim/periodic";

describe("expandFraction", () => {
  it("decimal exacto", () => {
    const e = expandFraction(13, 40);
    expect(e).toMatchObject({ int: 0, pre: "325", per: "", kind: "exacto" });
  });
  it("periódico puro", () => {
    const e = expandFraction(41, 33);
    expect(e).toMatchObject({ int: 1, pre: "", per: "24", kind: "puro" });
    expect(expandFraction(3, 7).per).toBe("428571");
  });
  it("periódico mixto", () => {
    const e = expandFraction(32, 15);
    expect(e).toMatchObject({ int: 2, pre: "1", per: "3", kind: "mixto" });
    expect(expandFraction(59, 30)).toMatchObject({ int: 1, pre: "9", per: "6", kind: "mixto" });
  });
  it("entero", () => {
    expect(expandFraction(12, 4)).toMatchObject({ int: 3, pre: "", per: "", kind: "exacto" });
  });
  it("el periodo nunca supera d − 1 cifras", () => {
    for (let d = 2; d <= 60; d += 1) {
      for (const n of [1, 5, d + 3]) {
        const e = expandFraction(n, d);
        expect(e.per.length).toBeLessThanOrEqual(d - 1);
      }
    }
  });
  it("escribe el arco sobre el periodo", () => {
    expect(expansionTex(expandFraction(41, 33))).toBe("1{,}\\overline{24}");
    expect(expansionTex(expandFraction(1, 4), true)).toBe("-0{,}25");
  });
});

describe("generatrix", () => {
  it("exactos", () => {
    expect(generatrix("7", "395", "")).toEqual({ n: 1479, d: 200 });
    expect(generatrix("0", "008", "")).toEqual({ n: 1, d: 125 });
  });
  it("puros", () => {
    expect(generatrix("3", "", "84")).toEqual({ n: 127, d: 33 });
    expect(generatrix("5", "", "8")).toEqual({ n: 53, d: 9 });
  });
  it("mixtos", () => {
    expect(generatrix("1", "2", "34")).toEqual({ n: 611, d: 495 });
    expect(generatrix("0", "13", "5")).toEqual({ n: 61, d: 450 });
  });
  it("es la inversa de expandFraction", () => {
    for (const [n, d] of [[41, 33], [32, 15], [3, 7], [59, 30], [86, 11]] as const) {
      const e = expandFraction(n, d);
      const g = generatrix(String(e.int), e.pre, e.per);
      expect(g.n * d).toBe(n * g.d);
    }
  });
});

describe("shiftedPeriodic", () => {
  it("desplaza la coma", () => {
    expect(shiftedPeriodic("3", "", "84", 0, 2)).toBe("3,8484…");
    expect(shiftedPeriodic("3", "", "84", 2, 2)).toBe("384,84…");
    expect(shiftedPeriodic("1", "2", "34", 1, 2)).toBe("12,3434…");
    expect(shiftedPeriodic("1", "2", "34", 3, 2)).toBe("1234,34…");
    expect(shiftedPeriodic("0", "13", "5", 3, 3)).toBe("135,55…");
  });
});
