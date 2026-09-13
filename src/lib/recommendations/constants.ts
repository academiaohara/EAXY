/** Umbrales globales de mastery (ver learning-model.md). */
export const MASTERY_STRUGGLING_MAX = 0.4;
export const MASTERY_DEVELOPING_MAX = 0.7;
export const MASTERY_PROFICIENT_MAX = 0.85;

export const RECOVER_COOLDOWN_HOURS = 24;
export const SPACED_REVIEW_DAYS = 7;
export const REST_ATTEMPTS_PER_HOUR = 5;
export const REST_WINDOW_HOURS = 1;
export const REINFORCE_RECENT_ATTEMPTS = 3;
export const REINFORCE_SCORE_THRESHOLD = 0.5;

export const RULE_IDS = {
  R1: "R1",
  R2: "R2",
  R3: "R3",
  R4: "R4",
  R5: "R5",
  R6: "R6",
  R7: "R7",
} as const;
