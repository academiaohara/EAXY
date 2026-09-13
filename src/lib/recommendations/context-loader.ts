import { resolveLessonProgressStatus } from "@/lib/content/progress";
import {
  isE2EMockClassroomEnabled,
  mockGetRecommendationContext,
} from "@/lib/classrooms/e2e-mock";
import type {
  AttemptSnapshot,
  ConceptMasterySnapshot,
  ConceptPrerequisite,
  ConceptSummary,
  ExerciseSummary,
  LessonSnapshot,
  PendingAssignment,
  RecommendationContext,
} from "@/lib/recommendations/types";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function loadRecommendationContext(
  studentId: string,
  options?: { classroomId?: string },
): Promise<RecommendationContext> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetRecommendationContext(studentId, options?.classroomId);
  }

  const supabase = await createServerSupabaseClient();
  const now = new Date();

  const [
    conceptsResult,
    masteryResult,
    exercisesResult,
    attemptsResult,
    prerequisitesResult,
    courseResult,
    pathsResult,
  ] = await Promise.all([
    supabase.from("concepts").select("id, title").order("title"),
    supabase
      .from("student_concept_mastery")
      .select("concept_id, mastery, updated_at")
      .eq("student_id", studentId),
    supabase.from("exercises").select("id, concept_id, difficulty"),
    supabase
      .from("exercise_attempts")
      .select("exercise_id, correct, created_at, exercises(concept_id)")
      .eq("student_id", studentId)
      .order("created_at", { ascending: false }),
    supabase.from("concept_prerequisites").select("concept_id, prerequisite_id, min_mastery"),
    supabase
      .from("courses")
      .select(
        `
        id,
        modules (
          order_index,
          lessons (
            id,
            title,
            order_index,
            lesson_concepts (
              concept_id
            )
          )
        )
      `,
      )
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("learning_paths")
      .select("lesson_id, status, completed_at")
      .eq("student_id", studentId),
  ]);

  if (conceptsResult.error) {
    throw new Error(`No se pudieron cargar conceptos: ${conceptsResult.error.message}`);
  }

  if (masteryResult.error) {
    throw new Error(`No se pudo cargar mastery: ${masteryResult.error.message}`);
  }

  if (exercisesResult.error) {
    throw new Error(`No se pudieron cargar ejercicios: ${exercisesResult.error.message}`);
  }

  if (attemptsResult.error) {
    throw new Error(`No se pudieron cargar intentos: ${attemptsResult.error.message}`);
  }

  if (prerequisitesResult.error) {
    throw new Error(`No se pudieron cargar prerrequisitos: ${prerequisitesResult.error.message}`);
  }

  if (courseResult.error) {
    throw new Error(`No se pudo cargar el curso: ${courseResult.error.message}`);
  }

  if (pathsResult.error) {
    throw new Error(`No se pudo cargar el progreso: ${pathsResult.error.message}`);
  }

  const concepts: ConceptSummary[] = (conceptsResult.data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
  }));

  const exercises: ExerciseSummary[] = (exercisesResult.data ?? []).map((row) => ({
    id: row.id,
    conceptId: row.concept_id,
    difficulty: row.difficulty,
  }));

  type AttemptRow = {
    exercise_id: string;
    correct: boolean;
    created_at: string;
    exercises:
      | { concept_id: string }
      | { concept_id: string }[]
      | null;
  };

  const attempts: AttemptSnapshot[] = ((attemptsResult.data ?? []) as AttemptRow[])
    .map((row) => {
      const exercise = Array.isArray(row.exercises) ? row.exercises[0] : row.exercises;
      if (!exercise) {
        return null;
      }

      return {
        exerciseId: row.exercise_id,
        conceptId: exercise.concept_id,
        correct: row.correct,
        createdAt: new Date(row.created_at),
      };
    })
    .filter((attempt): attempt is AttemptSnapshot => attempt !== null);

  const lastAttemptByConcept = new Map<string, Date>();
  for (const attempt of attempts) {
    if (!lastAttemptByConcept.has(attempt.conceptId)) {
      lastAttemptByConcept.set(attempt.conceptId, attempt.createdAt);
    }
  }

  const masteryByConcept = new Map<string, ConceptMasterySnapshot>();

  for (const row of masteryResult.data ?? []) {
    masteryByConcept.set(row.concept_id, {
      conceptId: row.concept_id,
      mastery: Number(row.mastery),
      lastAttemptAt: lastAttemptByConcept.get(row.concept_id) ?? new Date(row.updated_at),
    });
  }

  for (const concept of concepts) {
    if (!masteryByConcept.has(concept.id)) {
      masteryByConcept.set(concept.id, {
        conceptId: concept.id,
        mastery: 0,
        lastAttemptAt: lastAttemptByConcept.get(concept.id) ?? null,
      });
    }
  }

  const prerequisites: ConceptPrerequisite[] = (prerequisitesResult.data ?? []).map((row) => ({
    conceptId: row.concept_id,
    prerequisiteId: row.prerequisite_id,
    minMastery: Number(row.min_mastery),
  }));

  const pathByLesson = new Map(
    (pathsResult.data ?? []).map((row) => [
      row.lesson_id,
      {
        lessonId: row.lesson_id,
        status: row.status as "started" | "completed",
        completedAt: row.completed_at,
      },
    ]),
  );

  type CourseRow = {
    modules:
      | {
          order_index: number;
          lessons: {
            id: string;
            title: string;
            order_index: number;
            lesson_concepts: { concept_id: string }[];
          }[];
        }[]
      | null;
  };

  const lessons: LessonSnapshot[] = [];
  const course = courseResult.data as CourseRow | null;

  for (const module of course?.modules ?? []) {
    for (const lesson of module.lessons ?? []) {
      lessons.push({
        id: lesson.id,
        title: lesson.title,
        moduleOrderIndex: module.order_index,
        orderIndex: lesson.order_index,
        conceptIds: (lesson.lesson_concepts ?? []).map((link) => link.concept_id),
        progressStatus: resolveLessonProgressStatus(pathByLesson.get(lesson.id)),
      });
    }
  }

  const pendingAssignments: PendingAssignment[] = [];

  return {
    now,
    concepts,
    masteryByConcept,
    exercises,
    attempts,
    lessons,
    prerequisites,
    pendingAssignments,
  };
}
