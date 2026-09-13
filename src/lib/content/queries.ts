import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import {
  mockGetConceptIdsWithCorrectAttempt,
  mockGetMasteryByConcept,
} from "@/lib/classrooms/e2e-mock-practice";
import { mockGetLearningPathMap } from "@/lib/classrooms/e2e-mock-learning-paths";
import { DEFAULT_COURSE_ID } from "@/lib/content/constants";
import {
  buildMockCourseOutline,
  buildMockLessonDetail,
} from "@/lib/content/fixtures";
import type { CourseOutline, LessonDetail } from "@/lib/content/types";
import { canCompleteLesson } from "@/lib/learning-paths/completion";
import {
  getLearningPathMapForStudent,
  getLessonConceptIds,
  getMasteryByConceptForStudent,
  getConceptIdsWithCorrectAttemptForStudent,
} from "@/lib/learning-paths/queries";
import { createServerSupabaseClient } from "@/lib/supabase";

type LessonRow = {
  id: string;
  title: string;
  order_index: number;
  video_url: string | null;
  module_id: string;
  modules: {
    title: string;
    order_index: number;
    course_id: string;
    courses: {
      title: string;
      description: string | null;
    };
  };
};

export async function getDefaultCourseOutline(studentId: string): Promise<CourseOutline> {
  if (isE2EMockClassroomEnabled()) {
    return buildMockCourseOutline(mockGetLearningPathMap(studentId));
  }

  const supabase = await createServerSupabaseClient();

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title, description")
    .eq("id", DEFAULT_COURSE_ID)
    .maybeSingle();

  if (courseError || !course) {
    throw new Error("No se pudo cargar el curso");
  }

  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select("id, title, order_index")
    .eq("course_id", course.id)
    .order("order_index", { ascending: true });

  if (modulesError) {
    throw new Error(`No se pudieron cargar módulos: ${modulesError.message}`);
  }

  const learningPathMap = await getLearningPathMapForStudent(studentId);
  const moduleIds = (modules ?? []).map((module) => module.id);

  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("id, title, order_index, video_url, module_id")
    .in("module_id", moduleIds.length > 0 ? moduleIds : ["00000000-0000-0000-0000-000000000000"])
    .order("order_index", { ascending: true });

  if (lessonsError) {
    throw new Error(`No se pudieron cargar lecciones: ${lessonsError.message}`);
  }

  const lessonIds = (lessons ?? []).map((lesson) => lesson.id);
  const conceptCountByLesson = new Map<string, number>();

  if (lessonIds.length > 0) {
    const { data: lessonConcepts, error: lessonConceptsError } = await supabase
      .from("lesson_concepts")
      .select("lesson_id")
      .in("lesson_id", lessonIds);

    if (lessonConceptsError) {
      throw new Error(
        `No se pudieron cargar conceptos por lección: ${lessonConceptsError.message}`,
      );
    }

    for (const row of lessonConcepts ?? []) {
      conceptCountByLesson.set(
        row.lesson_id,
        (conceptCountByLesson.get(row.lesson_id) ?? 0) + 1,
      );
    }
  }

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    modules: (modules ?? []).map((module) => ({
      id: module.id,
      title: module.title,
      orderIndex: module.order_index,
      lessons: (lessons ?? [])
        .filter((lesson) => lesson.module_id === module.id)
        .map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          orderIndex: lesson.order_index,
          videoUrl: lesson.video_url,
          status: learningPathMap[lesson.id] ?? null,
          conceptCount: conceptCountByLesson.get(lesson.id) ?? 0,
        })),
    })),
  };
}

export async function getLessonDetailForStudent(
  studentId: string,
  lessonId: string,
): Promise<LessonDetail | null> {
  if (isE2EMockClassroomEnabled()) {
    return buildMockLessonDetail(
      lessonId,
      mockGetLearningPathMap(studentId),
      mockGetMasteryByConcept(studentId),
      mockGetConceptIdsWithCorrectAttempt(studentId),
    );
  }

  const supabase = await createServerSupabaseClient();

  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select(
      "id, title, order_index, video_url, module_id, modules(title, order_index, course_id, courses(title, description))",
    )
    .eq("id", lessonId)
    .maybeSingle();

  if (lessonError) {
    throw new Error(`No se pudo cargar la lección: ${lessonError.message}`);
  }

  if (!lesson) {
    return null;
  }

  const typedLesson = lesson as LessonRow;
  const learningPathMap = await getLearningPathMapForStudent(studentId);
  const lessonConceptIds = await getLessonConceptIds(lessonId);
  const masteryByConcept = await getMasteryByConceptForStudent(studentId);
  const conceptIdsWithCorrectAttempt =
    await getConceptIdsWithCorrectAttemptForStudent(studentId);

  const { data: concepts, error: conceptsError } = await supabase
    .from("concepts")
    .select("id, title, description")
    .in("id", lessonConceptIds.length > 0 ? lessonConceptIds : ["00000000-0000-0000-0000-000000000000"]);

  if (conceptsError) {
    throw new Error(`No se pudieron cargar conceptos: ${conceptsError.message}`);
  }

  return {
    id: typedLesson.id,
    title: typedLesson.title,
    orderIndex: typedLesson.order_index,
    videoUrl: typedLesson.video_url,
    moduleTitle: typedLesson.modules.title,
    courseTitle: typedLesson.modules.courses.title,
    status: learningPathMap[lessonId] ?? null,
    concepts: (concepts ?? []).map((concept) => ({
      id: concept.id,
      title: concept.title,
      description: concept.description,
      mastery: masteryByConcept[concept.id] ?? 0,
    })),
    canComplete: canCompleteLesson(lessonConceptIds, conceptIdsWithCorrectAttempt),
  };
}
