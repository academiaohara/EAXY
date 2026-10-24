import { describe, expect, it } from "vitest";
import { BCD, canonicalTerm, cellsOf, covers, divisionSteps, fractionSteps, karnaughLayout, maxtermIndexes, minterms, simplify } from "@/lib/lesson/logic-minimize";

const outFromMinterms = (n: number, ones: number[], dc: number[] = []) => Array.from({ length: 2 ** n }, (_, i) => (ones.includes(i) ? 1 : dc.includes(i) ? 2 : 0));

/** Comprueba que el cubrimiento reproduce la función (los indiferentes son libres). */
function realiza(out: number[], n: number, mode: "sop" | "pos") {
  const { imps } = simplify(out, n, mode);
  for (let m = 0; m < 2 ** n; m += 1) {
    const hit = imps.some((i) => covers(i, m));
    if (out[m] === 2) {
      continue;
    }
    // en SOP los cubos cubren los unos; en POS, los ceros
    expect(hit, `m=${m} ${mode}`).toBe(out[m] === (mode === "sop" ? 1 : 0));
  }
}

describe("simplificación de funciones lógicas", () => {
  it("ejemplo 11 del libro: Σ(2,6) = b·ā", () => {
    expect(simplify(outFromMinterms(3, [2, 6]), 3, "sop").tex).toBe("b\\cdot \\bar{a}");
  });

  it("ejemplo 16: Σ(1,2,4,5,6,7) = c + b̄·a + b·ā", () => {
    const { imps, tex } = simplify(outFromMinterms(3, [1, 2, 4, 5, 6, 7]), 3, "sop");
    expect(imps).toHaveLength(3);
    expect(tex).toContain("c");
    expect(tex).toContain("\\bar{b}\\cdot a");
    expect(tex).toContain("b\\cdot \\bar{a}");
  });

  it("ejemplo 13: Σ(1,2,4,5,6) = c·ā + b·ā + b̄·a (tres grupos de dos)", () => {
    const { imps, tex } = simplify(outFromMinterms(3, [1, 2, 4, 5, 6]), 3, "sop");
    expect(tex).toBe("\\bar{b}\\cdot a + b\\cdot \\bar{a} + c\\cdot \\bar{a}");
    expect(imps).toHaveLength(3);
    for (const i of imps) {
      expect(cellsOf(i, 3)).toHaveLength(2);
    }
    realiza(outFromMinterms(3, [1, 2, 4, 5, 6]), 3, "sop");
  });

  it("casos extremos: todo ceros, todo unos", () => {
    expect(simplify([0, 0, 0, 0], 2, "sop").tex).toBe("0");
    expect(simplify([1, 1, 1, 1], 2, "sop").tex).toBe("1");
    expect(simplify([1, 1, 1, 1], 2, "pos").tex).toBe("1");
    expect(simplify([0, 0, 0, 0], 2, "pos").tex).toBe("0");
  });

  it("con indiferentes agranda los grupos (ejemplo 17)", () => {
    const out = outFromMinterms(4, [4, 6, 7, 8, 10, 12, 14].filter((m) => ![2, 3, 5, 9, 11, 13, 15].includes(m)), [0, 1, 14, 15]);
    realiza(out, 4, "sop");
    realiza(out, 4, "pos");
  });

  it("reproduce cualquier función de 3 variables, en SOP y en POS", () => {
    for (let f = 0; f < 256; f += 1) {
      const out = Array.from({ length: 8 }, (_, i) => (f >> i) & 1);
      realiza(out, 3, "sop");
      realiza(out, 3, "pos");
    }
  });

  it("reproduce funciones de 4 variables (muestra) con indiferentes", () => {
    let seed = 7;
    const rnd = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    for (let k = 0; k < 200; k += 1) {
      const out = Array.from({ length: 16 }, () => {
        const r = rnd();
        return r < 0.4 ? 1 : r < 0.5 ? 2 : 0;
      });
      realiza(out, 4, "sop");
      realiza(out, 4, "pos");
    }
  });
});

describe("ejemplos de las lecciones", () => {
  it("cuatro esquinas (0, 1, 4, 5) = b̄·d̄", () => {
    const out = outFromMinterms(4, [0, 1, 4, 5]);
    expect(simplify(out, 4, "sop").tex).toBe("\\bar{d}\\cdot \\bar{b}");
  });

  it("ejemplo 17 (producto de sumas con indiferentes) = (d+a)(b̄+a)(d̄+c̄)", () => {
    const out = [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 2, 2];
    const { tex, imps } = simplify(out, 4, "pos");
    expect(imps).toHaveLength(3);
    for (const f of ["(d + a)", "(\\bar{b} + a)", "(\\bar{d} + \\bar{c})"]) {
      expect(tex).toContain(f);
    }
  });

  it("ascensor Σ(4,6,7,8,12): tres grupos de dos", () => {
    const { imps } = simplify(outFromMinterms(4, [4, 6, 7, 8, 12]), 4, "sop");
    expect(imps).toHaveLength(3);
    expect(imps.every((i) => cellsOf(i, 4).length === 2)).toBe(true);
  });

  it("Σ(3,7) = b·a y Σ(1,2,4,5,6,7) tiene un grupo de cuatro", () => {
    expect(simplify(outFromMinterms(3, [3, 7]), 3, "sop").tex).toBe("b\\cdot a");
    const { imps } = simplify(outFromMinterms(3, [1, 2, 4, 5, 6, 7]), 3, "sop");
    expect(imps.some((i) => cellsOf(i, 3).length === 4)).toBe(true);
  });
});

describe("mapa de Karnaugh y formas canónicas", () => {
  it("numeración del libro (figura 12.19)", () => {
    const l3 = karnaughLayout(3);
    expect(l3.cols.map((c) => l3.index(c, 0))).toEqual([0, 2, 3, 1]);
    expect(l3.cols.map((c) => l3.index(c, 1))).toEqual([4, 6, 7, 5]);
    const l4 = karnaughLayout(4);
    expect(l4.rows.map((r) => l4.cols.map((c) => l4.index(c, r)))).toEqual([
      [0, 2, 3, 1],
      [8, 10, 11, 9],
      [12, 14, 15, 13],
      [4, 6, 7, 5],
    ]);
  });

  it("tabla 12.15: Σ(1,3,4,6,7) y Π(0,2,5)", () => {
    const out = [0, 1, 0, 1, 1, 0, 1, 1];
    expect(minterms(out)).toEqual([1, 3, 4, 6, 7]);
    expect(maxtermIndexes(out)).toEqual([0, 2, 5]);
    expect(canonicalTerm(1, 3, "min")).toBe("\\bar{c}\\cdot \\bar{b}\\cdot a");
    expect(canonicalTerm(5, 3, "max")).toBe("(\\bar{c} + b + \\bar{a})");
  });
});

describe("conversiones numéricas", () => {
  it("45 en binario por divisiones sucesivas", () => {
    const steps = divisionSteps(45);
    expect(steps.map((s) => s.r).reverse().join("")).toBe("101101");
    expect(divisionSteps(0)).toHaveLength(1);
  });

  it("fracciones: 0,36 → 0101 y 0,63 → 101", () => {
    expect(fractionSteps(0.36, 4).map((s) => s.bit).join("")).toBe("0101");
    expect(fractionSteps(0.63, 3).map((s) => s.bit).join("")).toBe("101");
    expect(fractionSteps(0.5, 8).map((s) => s.bit).join("")).toBe("1");
  });

  it("códigos BCD del ejemplo 9 (342,75)", () => {
    expect([3, 4, 2, 7, 5].map(BCD.natural)).toEqual(["0011", "0100", "0010", "0111", "0101"]);
    expect([3, 4, 2, 7, 5].map(BCD.aiken)).toEqual(["0011", "0100", "0010", "1101", "1011"]);
    expect([3, 4, 2, 7, 5].map(BCD.exceso3)).toEqual(["0110", "0111", "0101", "1010", "1000"]);
  });
});
