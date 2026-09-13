/**
 * Re-exportaciones de compatibilidad. Preferir `@/lib/mastery/states`.
 */
export {
  formatMasteryPercent,
  getMasteryState,
  getMasteryStateLabel,
  MASTERY_STATE_LABELS,
  type MasteryState,
} from "@/lib/mastery/states";

export type MasteryStatus = import("@/lib/mastery/states").MasteryState;

import { getMasteryState, getMasteryStateLabel } from "@/lib/mastery/states";

/** @deprecated Usar getMasteryState(mastery, hasAttempts ? 1 : 0) */
export function getMasteryStatus(mastery: number, hasAttempts: boolean): MasteryStatus {
  return getMasteryState(mastery, hasAttempts ? 1 : 0);
}

/** @deprecated Usar getMasteryStateLabel */
export function getMasteryStatusLabel(status: MasteryStatus): string {
  return getMasteryStateLabel(status);
}
