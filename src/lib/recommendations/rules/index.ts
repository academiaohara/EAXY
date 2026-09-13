import { evaluateR1PendingAssignment } from "@/lib/recommendations/rules/r1-pending-assignment";
import { evaluateR2Recovery } from "@/lib/recommendations/rules/r2-recovery";
import { evaluateR3Reinforcement } from "@/lib/recommendations/rules/r3-reinforcement";
import { evaluateR4Advance } from "@/lib/recommendations/rules/r4-advance";
import { evaluateR5SpacedReview } from "@/lib/recommendations/rules/r5-spaced-review";
import { evaluateR6Rest } from "@/lib/recommendations/rules/r6-rest";
import { evaluateR7Default } from "@/lib/recommendations/rules/r7-default";
import type { RuleEvaluator } from "@/lib/recommendations/types";

export const recommendationRules: RuleEvaluator[] = [
  evaluateR1PendingAssignment,
  evaluateR2Recovery,
  evaluateR3Reinforcement,
  evaluateR4Advance,
  evaluateR5SpacedReview,
  evaluateR6Rest,
  evaluateR7Default,
];
