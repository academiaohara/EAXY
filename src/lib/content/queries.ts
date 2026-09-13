import { getAuthenticatedUserId } from "@/lib/auth/session";
import {
  countCompletedLessons,
  resolveLessonProgressStatus,
} from "@/lib/content/progress";
import type {
  CourseOutline,
  LearningPathRecord,
  LessonDetail,
} from "@/lib/content/types";
import {
  isE2EMockClassroomEnabled,
  mockGetCourseOutline,
  mockGetLearningPaths,
  mockGetLessonDetail,
} from "@/lib/classrooms/e2e-mock";
import { createServerSupabaseClient } from "@/lib/supabase";

type LearningPathRow = {
  lesson_id: string;
  status: "started" | "completed";
  completed_at: string | null;
};

type ModuleRow = {
  id: string;
  title: string;
  order_index: number;
  lessons: {
    id: string;
    title: string;
    order_index: number;
  }[];
};

async function getLearningPathsForStudent(studentId: string): Promise<LearningPathRecord[]> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetLearningPaths(studentId);
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("learning_paths")
    .select("lesson_id, status, completed_at")
    .eq("student_id", studentId);

  if (error) {
    throw new Error(`No se pudo cargar el progreso: ${error.message}`);
  }

  return ((data ?? []) as LearningPathRow[]).map((row) => ({
    lessonId: row.lesson_id,
    status: row.status,
    completedAt: row.completed_at,
  }));
}

export async function getDefaultCourseOutline(): Promise<CourseOutline | null> {
  const studentId = await getAuthenticatedUserId();
  if (!studentId) {
    return null;
  }

  if (isE2EMockClassroomEnabled()) {
    const paths = mockGetLearningPaths(studentId);
    return mockGetCourseOutline(paths);
  }

  const supabase = await createServerSupabaseClient();

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title, description")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (courseError) {
    throw new Error(`No se pudo cargar el curso: ${courseError.message}`);
  }

  if (!course) {
    return null;
  }

  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select(
      `
      id,
      title,
      order_index,
      lessons (
        id,
        title,
        order_index
      )
    `,
    )
    .eq("course_id", course.id)
    .order("order_index", { ascending: true });

  if (modulesError) {
    throw new Error(`No se pudieron cargar los módulos: ${modulesError.message}`);
  }

  const paths = await getLearningPathsForStudent(studentId);
  const pathByLesson = new Map(paths.map((path) => [path.lessonId, path]));

  const moduleSummaries = ((modules ?? []) as ModuleRow[]).map((module) => {
    const lessons = [...(module.lessons ?? [])].sort(
      (left, right) => left.order_index - right.order_index,
    );

    return {
      id: module.id,
      title: module.title,
      orderIndex: module.order_index,
      lessons: lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        orderIndex: lesson.order_index,
        progressStatus: resolveLessonProgressStatus(pathByLesson.get(lesson.id)),
      })),
    };
  });

  const allLessonIds = moduleSummaries.flatMap((module) =>
    module.lessons.map((lesson) => lesson.id),
  );

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    modules: moduleSummaries,
    completedLessons: countCompletedLessons(allLessonIds, paths),
    totalLessons: allLessonIds.length,
  };
}

export async function getLessonDetail(lessonId: string): Promise<LessonDetail | null> {
  const studentId = await getAuthenticatedUserId();
  if (!studentId) {
    return null;
  }

  if (isE2EMockClassroomEnabled()) {
    const paths = mockGetLearningPaths(studentId);
    return mockGetLessonDetail(lessonId, paths);
  }

  const supabase = await createServerSupabaseClient();

  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select(
      `
      id,
      title,
      video_url,
      modules (
        title,
        courses (
          title
        )
      ),
      lesson_concepts (
        concepts (
          id,
          title
        )
      )
    `,
    )
    .eq("id", lessonId)
    .maybeSingle();

  if (lessonError) {
    throw new Error(`No se pudo cargar la lección: ${lessonError.message}`);
  }

  if (!lesson) {
    return null;
  }

  type LessonRow = {
    id: string;
    title: string;
    video_url: string | null;
    modules:
      | { title: string; courses: { title: string } | { title: string }[] | null }
      | { title: string; courses: { title: string } | { title: string }[] | null }[]
      | null;
    lesson_concepts: {
      concepts: { id: string; title: string } | { id: string; title: string }[] | null;
    }[];
  };

  const row = lesson as LessonRow;
  const module = Array.isArray(row.modules) ? row.modules[0] : row.modules;
  const course = module?.courses
    ? Array.isArray(module.courses)
      ? module.courses[0]
      : module.courses
    : null;

  const conceptIds = (row.lesson_concepts ?? [])
    .map((link) => {
      const concept = link.concepts;
      if (!concept) {
        return null;
      }
      return Array.isArray(concept) ? concept[0] : concept;
    })
    .filter((concept): concept is { id: string; title: string } => concept !== null);

  let exercises: { id: string; type: string; difficulty: number }[] = [];

  if (conceptIds.length > 0) {
    const { data: exerciseRows, error: exercisesError } = await supabase
      .from("exercises")
      .select("id, type, difficulty")
      .in(
        "concept_id",
        conceptIds.map((concept) => concept.id),
      )
      .order("difficulty", { ascending: true });

    if (exercisesError) {
      throw new Error(`No se pudieron cargar los ejercicios: ${exercisesError.message}`);
    }

    exercises = exerciseRows ?? [];
  }

  const paths = await getLearningPathsForStudent(studentId);
  const path = paths.find((item) => item.lessonId === lessonId);

  return {
    id: row.id,
    title: row.title,
    videoUrl: row.video_url,
    moduleTitle: module?.title ?? "Módulo",
    courseTitle: course?.title ?? "Curso",
    concepts: conceptIds,
    exercises,
    progressStatus: resolveLessonProgressStatus(path),
  };
}
