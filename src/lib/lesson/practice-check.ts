import type { ClassifyStep, FractionPickStep, NumberLinePickStep } from "@/lib/lesson/types";

export const FRACTION_PARTS_MIN = 1;
export const FRACTION_PARTS_MAX = 24;

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    [x, y] = [y, x % y];
  }
  return x || 1;
}

/** Partes con las que empieza cada unidad. */
export function initialFractionParts(step: FractionPickStep): number {
  if (step.adjustableParts) {
    return FRACTION_PARTS_MIN;
  }
  return step.parts ?? step.denominator;
}

/** Unidades que se dibujan: las pedidas o las justas para que quepa la fracción. */
export function fractionWholes(step: Pick<FractionPickStep, "numerator" | "denominator" | "wholes">): number {
  return Math.max(step.wholes ?? 1, Math.ceil(step.numerator / step.denominator), 1);
}

/**
 * `marked` partes de `parts` en cada unidad equivalen a la fracción pedida.
 * Con `correctPieces`, además, han de ser justo esas partes (`markedIndices`).
 */
export function isFractionPickCorrect(
  step: FractionPickStep,
  parts: number,
  marked: number,
  markedIndices?: number[],
): boolean {
  if (parts < 1) {
    return false;
  }
  if (step.correctPieces && markedIndices) {
    const expected = new Set(step.correctPieces);
    return markedIndices.length === expected.size && markedIndices.every((index) => expected.has(index));
  }
  if (step.exactParts && parts !== step.denominator) {
    return false;
  }
  return marked * step.denominator === step.numerator * parts;
}

/** Fracción que forma el marcado actual, simplificada si se puede. */
export function describeMarkedFraction(parts: number, marked: number): {
  numerator: number;
  denominator: number;
  simplified?: { numerator: number; denominator: number };
} {
  const divisor = gcd(marked, parts);
  const simplified =
    marked > 0 && divisor > 1 ? { numerator: marked / divisor, denominator: parts / divisor } : undefined;
  return { numerator: marked, denominator: parts, simplified };
}

export type ClassifyAssignments = Record<string, string | undefined>;

export function classifyIsComplete(step: ClassifyStep, assignments: ClassifyAssignments): boolean {
  return step.items.every((item) => Boolean(assignments[item.id]));
}

/** Tarjetas mal colocadas; vacío si todas están en su grupo. */
export function classifyMistakes(step: ClassifyStep, assignments: ClassifyAssignments): string[] {
  return step.items.filter((item) => assignments[item.id] !== item.group).map((item) => item.id);
}

/** Valores de todas las marcas de la recta, de `min` a `max`. */
export function numberLineTicks(step: Pick<NumberLinePickStep, "min" | "max" | "subdivisions">): number[] {
  const subdivisions = Math.max(1, step.subdivisions ?? 1);
  const count = Math.round((step.max - step.min) * subdivisions);
  return Array.from({ length: count + 1 }, (_, index) => step.min + index / subdivisions);
}

export function isNumberLinePickCorrect(step: NumberLinePickStep, value: number): boolean {
  const subdivisions = Math.max(1, step.subdivisions ?? 1);
  return Math.abs(value - step.target) < 1 / (subdivisions * 4);
}

/** Lectura del valor como se escribe en clase: decimal con coma o fracción. */
export function formatNumberLineValue(
  value: number,
  subdivisions = 1,
  readout: NumberLinePickStep["readout"] = "decimal",
): string {
  if (readout === "fraction" && subdivisions > 1) {
    const numerator = Math.round(value * subdivisions);
    if (numerator % subdivisions === 0) {
      return String(numerator / subdivisions);
    }
    const sign = numerator < 0 ? "-" : "";
    return `${sign}\\frac{${Math.abs(numerator)}}{${subdivisions}}`;
  }
  const rounded = Math.round(value * 1000) / 1000;
  return String(rounded).replace(".", "{,}");
}
