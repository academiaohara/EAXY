import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import { isContentPreviewModeEnabled } from "@/lib/content-preview/mode";
import { getPreviewRecommendationContext } from "@/lib/content-preview/recommendations";
import { getE2EMockRecommendationContext } from "@/lib/recommendations/e2e-mock";
import type {
  AssignmentContext,
  AttemptContext,
  ConceptContext,
  ExerciseContext,
  LessonContext,
  PrerequisiteContext,
  RecommendationContext,
} from "@/lib/recommendations/types";
import { createServerSupabaseClient } from "@/lib/supabase";

const DEFAULT_COURSE_ID = "a1000000-0000-4000-8000-000000000001";
const MS_PER_HOUR = 60 * 60 * 1000;

async function resolveCourseId(studentId: string): Promise<string> {
  const supabase = await createServerSupabaseClient();

  const { data: membership } = await supabase
    .from("classroom_members")
    .select("classroom_id, classrooms(reference_course_id)")
    .eq("profile_id", studentId)
    .eq("role", "student")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  const classroom = membership?.classrooms as { reference_course_id?: string | null } | null;

  if (classroom?.reference_course_id) {
    return classroom.reference_course_id;
  }

  const { data: course } = await supabase
    .from("courses")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return (course?.id as string | undefined) ?? DEFAULT_COURSE_ID;
}

export async function fetchRecommendationContext(
  studentId: string,
  options?: { classroomId?: string; referenceDate?: Date },
): Promise<RecommendationContext> {
  if (isE2EMockClassroomEnabled()) {
    return getE2EMockRecommendationContext(studentId, options?.referenceDate);
  }

  if (isContentPreviewModeEnabled()) {
    return getPreviewRecommendationContext(studentId, options?.referenceDate);
  }

  const supabase = await createServerSupabaseClient();
  const referenceDate = options?.referenceDate ?? new Date();
  const courseId = await resolveCourseId(studentId);

  const { data: concepts } = await supabase
    .from("concepts")
    .select("id, slug, title");

  const { data: prerequisites } = await supabase
    .from("concept_prerequisites")
    .select("concept_id, prerequisite_id, min_mastery");

  const { data: modules } = await supabase
    .from("modules")
    .select("id, order_index")
    .eq("course_id", courseId);

  const moduleIds = (modules ?? []).map((module) => module.id as string);
  const moduleOrderById = new Map(
    (modules ?? []).map((module) => [module.id as string, module.order_index as number]),
  );

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, title, order_index, module_id")
    .in("module_id", moduleIds.length > 0 ? moduleIds : ["00000000-0000-0000-0000-000000000000"]);

  const lessonIds = (lessons ?? []).map((lesson) => lesson.id as string);

  const { data: lessonConcepts } = await supabase
    .from("lesson_concepts")
    .select("lesson_id, concept_id")
    .in("lesson_id", lessonIds.length > 0 ? lessonIds : ["00000000-0000-0000-0000-000000000000"]);

  const conceptIdsByLesson = new Map<string, string[]>();
  for (const row of lessonConcepts ?? []) {
    const lessonId = row.lesson_id as string;
    const conceptId = row.concept_id as string;
    const existing = conceptIdsByLesson.get(lessonId) ?? [];
    existing.push(conceptId);
    conceptIdsByLesson.set(lessonId, existing);
  }

  const { data: learningPaths } = await supabase
    .from("learning_paths")
    .select("lesson_id, status")
    .eq("student_id", studentId)
    .in("lesson_id", lessonIds.length > 0 ? lessonIds : ["00000000-0000-0000-0000-000000000000"]);

  const pathStatusByLesson = new Map<string, "started" | "completed">();
  for (const path of learningPaths ?? []) {
    pathStatusByLesson.set(path.lesson_id as string, path.status as "started" | "completed");
  }

  const { data: exercises } = await supabase
    .from("exercises")
    .select("id, concept_id, difficulty");

  const { data: attempts } = await supabase
    .from("exercise_attempts")
    .select("exercise_id, correct, created_at")
    .eq("student_id", studentId)
    .order("created_at", { ascending: true });

  const exerciseConceptMap = new Map(
    (exercises ?? []).map((exercise) => [exercise.id as string, exercise.concept_id as string]),
  );

  const attemptContexts: AttemptContext[] = (attempts ?? []).map((attempt) => ({
    exerciseId: attempt.exercise_id as string,
    conceptId: exerciseConceptMap.get(attempt.exercise_id as string) ?? "",
    correct: attempt.correct as boolean,
    score: attempt.correct ? 1 : 0,
    createdAt: new Date(attempt.created_at as string),
  }));

  const hourCutoff = referenceDate.getTime() - MS_PER_HOUR;
  const attemptsLastHour = attemptContexts.filter(
    (attempt) => attempt.createdAt.getTime() >= hourCutoff,
  ).length;

  const { data: masteryRows } = await supabase
    .from("student_concept_mastery")
    .select("concept_id, mastery")
    .eq("student_id", studentId);

  const masteryByConcept = new Map<string, number>();
  for (const row of masteryRows ?? []) {
    masteryByConcept.set(row.concept_id as string, Number(row.mastery));
  }

  const attemptsByConcept = new Map<string, AttemptContext[]>();
  for (const attempt of attemptContexts) {
    if (!attempt.conceptId) {
      continue;
    }
    const existing = attemptsByConcept.get(attempt.conceptId) ?? [];
    existing.push(attempt);
    attemptsByConcept.set(attempt.conceptId, existing);
  }

  const exercisesByConcept = new Map<string, string[]>();
  for (const exercise of exercises ?? []) {
    const conceptId = exercise.concept_id as string;
    const existing = exercisesByConcept.get(conceptId) ?? [];
    existing.push(exercise.id as string);
    exercisesByConcept.set(conceptId, existing);
  }

  const lessonIdsByConcept = new Map<string, string[]>();
  for (const [lessonId, conceptIds] of conceptIdsByLesson) {
    for (const conceptId of conceptIds) {
      const existing = lessonIdsByConcept.get(conceptId) ?? [];
      existing.push(lessonId);
      lessonIdsByConcept.set(conceptId, existing);
    }
  }

  const conceptContexts: ConceptContext[] = (concepts ?? []).map((concept) => {
    const conceptId = concept.id as string;
    const conceptAttempts = attemptsByConcept.get(conceptId) ?? [];
    const lastAttempt = conceptAttempts.at(-1);

    return {
      id: conceptId,
      slug: concept.slug as string,
      title: concept.title as string,
      mastery: masteryByConcept.get(conceptId) ?? 0,
      attemptCount: conceptAttempts.length,
      lastAttemptAt: lastAttempt?.createdAt ?? null,
      exerciseIds: exercisesByConcept.get(conceptId) ?? [],
    };
  });

  const lessonContexts: LessonContext[] = (lessons ?? []).map((lesson) => {
    const lessonId = lesson.id as string;
    const pathStatus = pathStatusByLesson.get(lessonId) ?? "not_started";

    return {
      id: lessonId,
      title: lesson.title as string,
      orderIndex: lesson.order_index as number,
      moduleOrderIndex: moduleOrderById.get(lesson.module_id as string) ?? 0,
      conceptIds: conceptIdsByLesson.get(lessonId) ?? [],
      pathStatus,
    };
  });

  const exerciseContexts: ExerciseContext[] = (exercises ?? []).map((exercise) => ({
    id: exercise.id as string,
    conceptId: exercise.concept_id as string,
    difficulty: exercise.difficulty as number,
    lessonIds: lessonIdsByConcept.get(exercise.concept_id as string) ?? [],
  }));

  const prerequisiteContexts: PrerequisiteContext[] = (prerequisites ?? []).map((row) => ({
    conceptId: row.concept_id as string,
    prerequisiteId: row.prerequisite_id as string,
    minMastery: Number(row.min_mastery),
  }));

  const assignments: AssignmentContext[] = [];

  return {
    studentId,
    classroomId: options?.classroomId,
    referenceDate,
    concepts: conceptContexts,
    prerequisites: prerequisiteContexts,
    attempts: attemptContexts,
    attemptsLastHour,
    lessons: lessonContexts,
    exercises: exerciseContexts,
    assignments,
  };
}
