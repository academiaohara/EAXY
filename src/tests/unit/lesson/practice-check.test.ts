import { describe, expect, it } from "vitest";
import {
  classifyIsComplete,
  classifyMistakes,
  describeMarkedFraction,
  formatNumberLineValue,
  fractionWholes,
  initialFractionParts,
  isFractionPickCorrect,
  isNumberLinePickCorrect,
  numberLineTicks,
} from "@/lib/lesson/practice-check";
import type { ClassifyStep, FractionPickStep, NumberLinePickStep } from "@/lib/lesson/types";

const pick = (overrides: Partial<FractionPickStep> = {}): FractionPickStep => ({
  id: "p",
  type: "fraction_pick",
  title: "Colorea",
  question: "Colorea 3/4",
  shape: "bar",
  numerator: 3,
  denominator: 4,
  ...overrides,
});

describe("fraction_pick", () => {
  it("acepta el marcado exacto y los equivalentes", () => {
    const step = pick();
    expect(isFractionPickCorrect(step, 4, 3)).toBe(true);
    expect(isFractionPickCorrect(step, 8, 6)).toBe(true);
    expect(isFractionPickCorrect(step, 4, 2)).toBe(false);
  });

  it("con exactParts sólo vale dividir en el denominador", () => {
    const step = pick({ exactParts: true });
    expect(isFractionPickCorrect(step, 8, 6)).toBe(false);
    expect(isFractionPickCorrect(step, 4, 3)).toBe(true);
  });

  it("en un conjunto pide marcar la parte proporcional", () => {
    const step = pick({ shape: "set", numerator: 2, denominator: 3, parts: 12 });
    expect(initialFractionParts(step)).toBe(12);
    expect(isFractionPickCorrect(step, 12, 8)).toBe(true);
    expect(isFractionPickCorrect(step, 12, 2)).toBe(false);
  });

  it("dibuja las unidades necesarias para fracciones mayores que 1", () => {
    expect(fractionWholes(pick({ numerator: 7, denominator: 5 }))).toBe(2);
    expect(fractionWholes(pick({ numerator: 1, denominator: 5, wholes: 3 }))).toBe(3);
    expect(fractionWholes(pick())).toBe(1);
  });

  it("si el alumno divide la unidad, empieza entera", () => {
    expect(initialFractionParts(pick({ adjustableParts: true }))).toBe(1);
  });

  it("describe el marcado y su forma simplificada", () => {
    expect(describeMarkedFraction(8, 6)).toEqual({
      numerator: 6,
      denominator: 8,
      simplified: { numerator: 3, denominator: 4 },
    });
    expect(describeMarkedFraction(5, 2).simplified).toBeUndefined();
  });
});

describe("classify", () => {
  const step: ClassifyStep = {
    id: "c",
    type: "classify",
    title: "Clasifica",
    question: "Clasifica",
    groups: [
      { id: "primo", label: "Primo" },
      { id: "compuesto", label: "Compuesto" },
    ],
    items: [
      { id: "7", text: "7", group: "primo" },
      { id: "9", text: "9", group: "compuesto" },
    ],
  };

  it("sabe cuándo están todas colocadas y cuáles fallan", () => {
    expect(classifyIsComplete(step, { "7": "primo" })).toBe(false);
    expect(classifyIsComplete(step, { "7": "primo", "9": "primo" })).toBe(true);
    expect(classifyMistakes(step, { "7": "primo", "9": "primo" })).toEqual(["9"]);
    expect(classifyMistakes(step, { "7": "primo", "9": "compuesto" })).toEqual([]);
  });
});

describe("number_line_pick", () => {
  const step: NumberLinePickStep = {
    id: "n",
    type: "number_line_pick",
    title: "Recta",
    question: "Marca 0,3",
    min: 0,
    max: 1,
    subdivisions: 10,
    target: 0.3,
  };

  it("genera una marca por división", () => {
    const ticks = numberLineTicks(step);
    expect(ticks).toHaveLength(11);
    expect(ticks[3]).toBeCloseTo(0.3);
  });

  it("compara sin errores de coma flotante", () => {
    expect(isNumberLinePickCorrect(step, numberLineTicks(step)[3])).toBe(true);
    expect(isNumberLinePickCorrect(step, 0.4)).toBe(false);
  });

  it("lee el valor con coma decimal o como fracción", () => {
    expect(formatNumberLineValue(0.30000000000000004)).toBe("0{,}3");
    expect(formatNumberLineValue(-2)).toBe("-2");
    expect(formatNumberLineValue(0.75, 4, "fraction")).toBe("\\frac{3}{4}");
    expect(formatNumberLineValue(-0.5, 4, "fraction")).toBe("-\\frac{2}{4}");
    expect(formatNumberLineValue(1, 4, "fraction")).toBe("1");
  });
});

describe("fraction_pick con partes concretas", () => {
  it("exige marcar justo las partes indicadas", () => {
    const step = pick({ shape: "set", numerator: 2, denominator: 6, correctPieces: [4, 5] });
    expect(isFractionPickCorrect(step, 6, 2, [4, 5])).toBe(true);
    expect(isFractionPickCorrect(step, 6, 2, [0, 1])).toBe(false);
  });
});
