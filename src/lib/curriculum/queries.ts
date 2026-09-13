import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import { DEMO_COURSE_ID } from "@/lib/curriculum/constants";
import {
  mockGetCourseOutline,
  mockGetLessonDetail,
  mockListCourses,
} from "@/lib/curriculum/e2e-mock";
import type { CourseOutline, CourseSummary, LessonDetail } from "@/lib/curriculum/types";
import { deriveLessonProgressStatus } from "@/lib/learning-paths/completion";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function listCourses(): Promise<CourseSummary[]> {
  if (isE2EMockClassroomEnabled()) {
    return mockListCourses();
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, description")
    .order("title", { ascending: true });

  if (error) {
    throw new Error(`No se pudieron cargar cursos: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
  }));
}

export async function getDefaultCourseId(): Promise<string | null> {
  const courses = await listCourses();
  return courses[0]?.id ?? DEMO_COURSE_ID;
}

export async function getCourseOutline(
  studentId: string,
  courseId: string,
): Promise<CourseOutline | null> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetCourseOutline(studentId, courseId);
  }

  const supabase = await createServerSupabaseClient();

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title, description")
    .eq("id", courseId)
    .maybeSingle();

  if (courseError) {
    throw new Error(`No se pudo cargar el curso: ${courseError.message}`);
  }

  if (!course) {
    return null;
  }

  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select("id, title, order_index")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true });

  if (modulesError) {
    throw new Error(`No se pudieron cargar módulos: ${modulesError.message}`);
  }

  const { data: learningPaths } = await supabase
    .from("learning_paths")
    .select("lesson_id, status")
    .eq("student_id", studentId);

  const statusByLesson = new Map(
    (learningPaths ?? []).map((row) => [row.lesson_id, row.status as "started" | "completed"]),
  );

  const moduleOutlines = [];

  for (const module of modules ?? []) {
    const { data: lessons, error: lessonsError } = await supabase
      .from("lessons")
      .select("id, title, order_index, video_url")
      .eq("module_id", module.id)
      .order("order_index", { ascending: true });

    if (lessonsError) {
      throw new Error(`No se pudieron cargar lecciones: ${lessonsError.message}`);
    }

    const lessonOutlines = [];

    for (const lesson of lessons ?? []) {
      const { count: conceptCount } = await supabase
        .from("lesson_concepts")
        .select("concept_id", { count: "exact", head: true })
        .eq("lesson_id", lesson.id);

      lessonOutlines.push({
        id: lesson.id,
        title: lesson.title,
        orderIndex: lesson.order_index,
        videoUrl: lesson.video_url,
        conceptCount: conceptCount ?? 0,
        status: deriveLessonProgressStatus(statusByLesson.get(lesson.id) ?? null),
      });
    }

    moduleOutlines.push({
      id: module.id,
      title: module.title,
      orderIndex: module.order_index,
      lessons: lessonOutlines,
    });
  }

  return {
    course: {
      id: course.id,
      title: course.title,
      description: course.description,
    },
    modules: moduleOutlines,
  };
}

export async function getLessonDetail(
  studentId: string,
  courseId: string,
  lessonId: string,
): Promise<LessonDetail | null> {
  if (isE2EMockClassroomEnabled()) {
    return mockGetLessonDetail(studentId, courseId, lessonId);
  }

  const supabase = await createServerSupabaseClient();

  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("id, title, video_url, module_id")
    .eq("id", lessonId)
    .maybeSingle();

  if (lessonError) {
    throw new Error(`No se pudo cargar la lección: ${lessonError.message}`);
  }

  if (!lesson) {
    return null;
  }

  const { data: module, error: moduleError } = await supabase
    .from("modules")
    .select("id, title, course_id")
    .eq("id", lesson.module_id)
    .maybeSingle();

  if (moduleError || !module || module.course_id !== courseId) {
    return null;
  }

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .maybeSingle();

  if (courseError || !course) {
    return null;
  }

  const { data: lessonConceptRows, error: lessonConceptsError } = await supabase
    .from("lesson_concepts")
    .select("concept_id")
    .eq("lesson_id", lessonId);

  if (lessonConceptsError) {
    throw new Error(`No se pudieron cargar conceptos: ${lessonConceptsError.message}`);
  }

  const conceptIds = (lessonConceptRows ?? []).map((row) => row.concept_id);

  const [{ data: concepts }, { data: learningPath }, { data: exercises }] = await Promise.all([
    conceptIds.length > 0
      ? supabase.from("concepts").select("title").in("id", conceptIds)
      : Promise.resolve({ data: [], error: null }),
    supabase
      .from("learning_paths")
      .select("status")
      .eq("student_id", studentId)
      .eq("lesson_id", lessonId)
      .maybeSingle(),
    conceptIds.length > 0
      ? supabase
          .from("exercises")
          .select("id")
          .in("concept_id", conceptIds)
          .order("difficulty", { ascending: true })
          .limit(1)
      : Promise.resolve({ data: [], error: null }),
  ]);

  const conceptTitles = (concepts ?? []).map((row) => row.title);

  return {
    id: lesson.id,
    title: lesson.title,
    videoUrl: lesson.video_url,
    moduleTitle: module.title,
    courseId: course.id,
    courseTitle: course.title,
    conceptTitles,
    status: deriveLessonProgressStatus(
      (learningPath?.status as "started" | "completed" | undefined) ?? null,
    ),
    practiceExerciseId: exercises?.[0]?.id ?? null,
  };
}
