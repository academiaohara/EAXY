import {
  isE2EMockClassroomEnabled,
  mockLogRecommendation,
} from "@/lib/classrooms/e2e-mock";
import type { Recommendation } from "@/lib/recommendations/types";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function logRecommendation(
  studentId: string,
  recommendation: Recommendation,
): Promise<void> {
  if (isE2EMockClassroomEnabled()) {
    mockLogRecommendation(studentId, recommendation);
    return;
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("recommendation_logs").insert({
    student_id: studentId,
    rule_id: recommendation.explanation.ruleId,
    concept_id: recommendation.conceptId,
    action: recommendation.action,
    explanation: recommendation.explanation,
  });

  if (error) {
    console.error("No se pudo registrar la recomendación:", error.message);
  }
}
