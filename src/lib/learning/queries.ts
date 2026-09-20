import {
  curriculum,
  getConceptById,
  getConceptBySlug,
  getExercisesForConcept,
  getLessonForConcept,
  getOrderedConcepts,
} from "@/content";
import { requireAuthenticatedUserId } from "@/lib/classrooms/authorization";
import {
  isE2ELearningMockEnabled,
  mockGetExercise,
  mockGetExercisesForConcept,
  mockGetRecentAttempts,
  mockGetStudentMastery,
} from "@/lib/learning/e2e-mock";
import { createServerSupabaseClient } from "@/lib/supabase";

export type ConceptProgress = {
  conceptId: string;
  conceptSlug: string;
  title: string;
  description: string;
  mastery: number;
  attemptCount: number;
  lastAttemptAt: Date | null;
  exerciseCount: number;
  moduleTitle: string;
  lessonTitle: string;
};

export type CourseOverview = {
  courseTitle: string;
  courseDescription: string;
  concepts: ConceptProgress[];
  practicedCount: number;
  masteredCount: number;
};

export type PracticeConceptData = {
  conceptSlug: string;
  conceptTitle: string;
  conceptDescription: string;
  lessonSummary: string;
  moduleTitle: string;
  lessonTitle: string;
  exercises: {
    id: string;
    type: string;
    difficulty: number;
    content: unknown;
  }[];
};

export async function getCourseOverview(): Promise<CourseOverview> {
  const studentId = await requireAuthenticatedUserId();
  const concepts = getOrderedConcepts(curriculum);

  let masteryRows: Awaited<ReturnType<typeof mockGetStudentMastery>> = [];

  if (isE2ELearningMockEnabled()) {
    masteryRows = mockGetStudentMastery(studentId);
  } else {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("student_concept_mastery")
      .select("concept_id, mastery, updated_at")
      .eq("student_id", studentId);

    if (error) {
      throw new Error(`No se pudo cargar el progreso: ${error.message}`);
    }

    const attemptCounts = new Map<string, number>();
    const { data: attemptRows, error: attemptsError } = await supabase
      .from("exercise_attempts")
      .select("exercise_id, created_at, exercises!inner(concept_id)")
      .eq("student_id", studentId);

    if (attemptsError) {
      throw new Error(`No se pudieron cargar los intentos: ${attemptsError.message}`);
    }

    for (const row of attemptRows ?? []) {
      const exercise = Array.isArray(row.exercises) ? row.exercises[0] : row.exercises;
      const conceptId = exercise?.concept_id as string | undefined;
      if (!conceptId) continue;
      attemptCounts.set(conceptId, (attemptCounts.get(conceptId) ?? 0) + 1);
    }

    masteryRows = concepts.map((concept) => {
      const entry = (data ?? []).find((row) => row.concept_id === concept.id);
      return {
        conceptId: concept.id,
        conceptSlug: concept.slug,
        mastery: entry?.mastery ?? 0,
        attemptCount: attemptCounts.get(concept.id) ?? 0,
        lastAttemptAt: entry?.updated_at ? new Date(entry.updated_at) : null,
      };
    });
  }

  const progress: ConceptProgress[] = concepts.map((concept) => {
    const masteryEntry = masteryRows.find((row) => row.conceptId === concept.id);
    const lessonRef = getLessonForConcept(concept.slug, curriculum);

    return {
      conceptId: concept.id,
      conceptSlug: concept.slug,
      title: concept.title,
      description: concept.description,
      mastery: masteryEntry?.mastery ?? 0,
      attemptCount: masteryEntry?.attemptCount ?? 0,
      lastAttemptAt: masteryEntry?.lastAttemptAt ?? null,
      exerciseCount: getExercisesForConcept(concept.slug, curriculum).length,
      moduleTitle: lessonRef?.module.title ?? "",
      lessonTitle: lessonRef?.lesson.title ?? "",
    };
  });

  const practicedCount = progress.filter((entry) => entry.attemptCount > 0).length;
  const masteredCount = progress.filter((entry) => entry.mastery >= 0.85).length;

  return {
    courseTitle: "Matemáticas ESO y Bachillerato",
    courseDescription:
      "Catálogo de matemáticas desde 1.º ESO hasta 2.º Bachillerato. Practica a tu ritmo con lecciones y ejercicios interactivos.",
    concepts: progress,
    practicedCount,
    masteredCount,
  };
}

export async function getPracticeConceptData(conceptSlug: string): Promise<PracticeConceptData | null> {
  await requireAuthenticatedUserId();

  const concept = getConceptBySlug(conceptSlug, curriculum);
  if (!concept) return null;

  const lessonRef = getLessonForConcept(conceptSlug, curriculum);
  let exercises: PracticeConceptData["exercises"];

  if (isE2ELearningMockEnabled()) {
    exercises = mockGetExercisesForConcept(conceptSlug);
  } else {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("exercises")
      .select("id, type, difficulty, content")
      .eq("concept_id", concept.id)
      .order("difficulty", { ascending: true });

    if (error) {
      throw new Error(`No se pudieron cargar los ejercicios: ${error.message}`);
    }

    exercises = (data ?? []).map((row) => ({
      id: row.id,
      type: row.type,
      difficulty: row.difficulty,
      content: row.content,
    }));
  }

  if (exercises.length === 0) return null;

  return {
    conceptSlug: concept.slug,
    conceptTitle: concept.title,
    conceptDescription: concept.description,
    lessonSummary: lessonRef?.lesson.summary ?? "",
    moduleTitle: lessonRef?.module.title ?? "",
    lessonTitle: lessonRef?.lesson.title ?? "",
    exercises,
  };
}

export async function getExerciseById(exerciseId: string) {
  await requireAuthenticatedUserId();

  if (isE2ELearningMockEnabled()) {
    return mockGetExercise(exerciseId);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exercises")
    .select("id, concept_id, type, difficulty, content")
    .eq("id", exerciseId)
    .maybeSingle();

  if (error) {
    throw new Error(`No se pudo cargar el ejercicio: ${error.message}`);
  }

  if (!data) return null;

  const concept = getConceptById(data.concept_id, curriculum);

  return {
    id: data.id,
    concept_id: data.concept_id,
    concept_slug: concept?.slug ?? "",
    type: data.type,
    difficulty: data.difficulty,
    content: data.content,
  };
}

export async function getRecentAttemptsForStudent(limit = 50) {
  const studentId = await requireAuthenticatedUserId();

  if (isE2ELearningMockEnabled()) {
    return mockGetRecentAttempts(studentId, limit);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("exercise_attempts")
    .select("correct, created_at, exercises!inner(concept_id)")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`No se pudieron cargar los intentos recientes: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const exercise = Array.isArray(row.exercises) ? row.exercises[0] : row.exercises;
    return {
      conceptId: exercise?.concept_id as string,
      correct: row.correct,
      createdAt: new Date(row.created_at),
    };
  });
}
