/**
 * Re-exportaciones de compatibilidad. Preferir `@/lib/mastery/states`.
 */
import {
  formatMasteryPercent,
  getMasteryState,
  getMasteryStateLabel,
  MASTERY_STATE_DESCRIPTIONS,
  MASTERY_STATE_LABELS,
  MASTERY_STATES,
  MASTERY_THRESHOLDS,
  type MasteryState,
} from "@/lib/mastery/states";

export {
  formatMasteryPercent,
  getMasteryState,
  getMasteryStateLabel,
  MASTERY_STATE_DESCRIPTIONS,
  MASTERY_STATE_LABELS,
  MASTERY_STATES,
  MASTERY_THRESHOLDS,
  type MasteryState,
};

export type MasteryQualitativeState = MasteryState;

/** @deprecated Usar getMasteryState */
export function getMasteryQualitativeState(
  mastery: number,
  attemptCount = 0,
): MasteryQualitativeState {
  return getMasteryState(mastery, attemptCount);
}
