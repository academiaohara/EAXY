import {
  MASTERY_DECAY_LAMBDA,
  MASTERY_WINDOW_DAYS,
} from "@/lib/mastery/constants";
import type { MasteryAttemptInput } from "@/lib/mastery/types";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Peso exponencial por antigüedad del intento.
 * weight = exp(-λ × age_days), con λ = ln(2) / half_life_days.
 */
export function decayWeight(ageDays: number): number {
  if (ageDays < 0) {
    return 1;
  }

  return Math.exp(-MASTERY_DECAY_LAMBDA * ageDays);
}

function scoreFromCorrect(correct: boolean): number {
  return correct ? 1 : 0;
}

/**
 * Calcula mastery (0–1) como media ponderada con decaimiento exponencial.
 * Intentos más recientes dominan sobre los antiguos.
 */
export function calculateMastery(
  attempts: MasteryAttemptInput[],
  referenceDate: Date = new Date(),
): number {
  const windowStart = referenceDate.getTime() - MASTERY_WINDOW_DAYS * MS_PER_DAY;

  const relevantAttempts = attempts.filter(
    (attempt) => attempt.createdAt.getTime() >= windowStart,
  );

  if (relevantAttempts.length === 0) {
    return 0;
  }

  let weightedSum = 0;
  let weightTotal = 0;

  for (const attempt of relevantAttempts) {
    const ageDays =
      (referenceDate.getTime() - attempt.createdAt.getTime()) / MS_PER_DAY;
    const weight = decayWeight(ageDays);
    const score = scoreFromCorrect(attempt.correct);

    weightedSum += score * weight;
    weightTotal += weight;
  }

  if (weightTotal === 0) {
    return 0;
  }

  const mastery = weightedSum / weightTotal;
  return Math.min(1, Math.max(0, mastery));
}

/**
 * Redondea mastery al formato numeric(4,3) de la BD.
 */
export function roundMastery(mastery: number): number {
  return Math.round(mastery * 1000) / 1000;
}
