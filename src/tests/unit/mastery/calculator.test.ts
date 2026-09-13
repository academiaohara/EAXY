import { describe, expect, it } from "vitest";
import {
  calculateMastery,
  decayWeight,
} from "@/lib/mastery/calculator";
import { MASTERY_HALF_LIFE_DAYS } from "@/lib/mastery/constants";
import type { MasteryAttemptInput } from "@/lib/mastery/types";

function daysAgo(days: number, reference = new Date("2026-09-13T12:00:00Z")): Date {
  return new Date(reference.getTime() - days * 24 * 60 * 60 * 1000);
}

describe("decayWeight", () => {
  it("devuelve 1 para intentos de hoy", () => {
    expect(decayWeight(0)).toBe(1);
  });

  it("reduce el peso a la mitad tras el half-life", () => {
    expect(decayWeight(MASTERY_HALF_LIFE_DAYS)).toBeCloseTo(0.5, 5);
  });
});

describe("calculateMastery", () => {
  const referenceDate = new Date("2026-09-13T12:00:00Z");

  it("devuelve 0 sin intentos", () => {
    expect(calculateMastery([], referenceDate)).toBe(0);
  });

  it("devuelve 1 con un único intento correcto reciente", () => {
    const attempts: MasteryAttemptInput[] = [
      { correct: true, createdAt: daysAgo(0, referenceDate) },
    ];

    expect(calculateMastery(attempts, referenceDate)).toBe(1);
  });

  it("devuelve 0 con un único intento incorrecto reciente", () => {
    const attempts: MasteryAttemptInput[] = [
      { correct: false, createdAt: daysAgo(0, referenceDate) },
    ];

    expect(calculateMastery(attempts, referenceDate)).toBe(0);
  });

  it("da más peso a intentos recientes que a antiguos", () => {
    const recentWrongOldCorrect: MasteryAttemptInput[] = [
      { correct: true, createdAt: daysAgo(14, referenceDate) },
      { correct: false, createdAt: daysAgo(0, referenceDate) },
    ];

    const recentCorrectOldWrong: MasteryAttemptInput[] = [
      { correct: false, createdAt: daysAgo(14, referenceDate) },
      { correct: true, createdAt: daysAgo(0, referenceDate) },
    ];

    const dominatedByRecentWrong = calculateMastery(recentWrongOldCorrect, referenceDate);
    const dominatedByRecentCorrect = calculateMastery(recentCorrectOldWrong, referenceDate);

    expect(dominatedByRecentCorrect).toBeGreaterThan(dominatedByRecentWrong);
    expect(dominatedByRecentWrong).toBeLessThan(0.5);
    expect(dominatedByRecentCorrect).toBeGreaterThan(0.5);
  });

  it("combina varios intentos correctos e incorrectos con decaimiento", () => {
    const attempts: MasteryAttemptInput[] = [
      { correct: false, createdAt: daysAgo(20, referenceDate) },
      { correct: true, createdAt: daysAgo(10, referenceDate) },
      { correct: true, createdAt: daysAgo(2, referenceDate) },
      { correct: false, createdAt: daysAgo(0, referenceDate) },
    ];

    const mastery = calculateMastery(attempts, referenceDate);

    expect(mastery).toBeGreaterThan(0);
    expect(mastery).toBeLessThan(1);
  });

  it("ignora intentos fuera de la ventana de 30 días", () => {
    const attempts: MasteryAttemptInput[] = [
      { correct: false, createdAt: daysAgo(60, referenceDate) },
      { correct: true, createdAt: daysAgo(1, referenceDate) },
    ];

    expect(calculateMastery(attempts, referenceDate)).toBe(1);
  });
});
