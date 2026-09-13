"use server";

import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import type { Recommendation } from "@/lib/recommendations/types";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function logRecommendation(
  studentId: string,
  recommendation: Recommendation,
): Promise<void> {
  if (isE2EMockClassroomEnabled()) {
    return;
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("recommendation_logs").insert({
    student_id: studentId,
    rule_id: recommendation.explanation.ruleId,
    concept_id: recommendation.conceptId,
    action: recommendation.action,
    explanation: recommendation.explanation,
    exercise_id: recommendation.exerciseId,
  });

  if (error) {
    console.error("No se pudo registrar la recomendación:", error.message);
  }
}
