import type { TutorMood } from "@/lib/tutor/moods";

/** Tiempo con el puntero encima antes de que el tutor reaccione. */
export const TUTOR_HOVER_DWELL_MS = 2_200;

/** Reacciones posibles al quedarse encima; en cada activación se elige una sola. */
export const TUTOR_HOVER_REACTION_MOODS = [
  "happy",
  "annoyed",
  "surprised",
  "thinking",
] as const satisfies readonly TutorMood[];

export type TutorHoverReactionMood = (typeof TUTOR_HOVER_REACTION_MOODS)[number];

export function pickTutorHoverMood(random: () => number = Math.random): TutorHoverReactionMood {
  const index = Math.floor(random() * TUTOR_HOVER_REACTION_MOODS.length);
  return TUTOR_HOVER_REACTION_MOODS[index] ?? "happy";
}
