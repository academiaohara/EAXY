import { getCourseById, getTopicExercisesForModule } from "@/content";
import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import {
  getPreviewCourseCatalog,
  getPreviewCourseOutline,
  getPreviewExerciseForPractice,
  getPreviewLessonDetail,
} from "@/lib/content-preview/curriculum-queries";
import { isContentPreviewModeEnabled } from "@/lib/content-preview/mode";
import {
  getE2EMockCourseCatalog,
  getE2EMockCourseOutline,
  getE2EMockExercise,
  getE2EMockLessonDetail,
} from "@/lib/curriculum/e2e-mock";
import { getCurriculumLessonMeta } from "@/lib/curriculum/lesson-meta";
import type {
  CourseCatalogEntry,
  CourseOutline,
  ExerciseSummary,
  LessonDetail,
  LessonSummary,
} from "@/lib/curriculum/types";
import { createServerSupabaseClient } from "@/lib/supabase";

const DEFAULT_COURSE_ID = "a1000000-0000-4000-8000-000000000004";

type LearningPathRow = {
  lesson_id: string;
  status: "started" | "completed";
};

type ExerciseRow = {
  id: string;
  concept_id: string;
  type: string;
  difficulty: number;
  content: { question?: string };
};

type AttemptRow = {
  exercise_id: string;
  correct: boolean;
};

type MasteryRow = {
  concept_id: string;
  mastery: number;
};

function extractQuestionPreview(content: unknown): string {
  if (
    typeof content === "object" &&
    content !== null &&
    "question" in content &&
    typeof content.question === "string"
  ) {
    return content.question;
  }

  return "Ejercicio";
}

function buildPathStatusMap(
  paths: LearningPathRow[],
): Map<string, LessonSummary["pathStatus"]> {
  const map = new Map<string, LessonSummary["pathStatus"]>();

  for (const path of paths) {
    map.set(path.lesson_id, path.status);
  }

  return map;
}

function sortCoursesByCurriculumOrder(courses: CourseCatalogEntry[]): CourseCatalogEntry[] {
  return [...courses].sort((a, b) => {
    const orderA = getCourseById(a.id)?.orderIndex ?? Number.MAX_SAFE_INTEGER;
    const orderB = getCourseById(b.id)?.orderIndex ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.title.localeCompare(b.title, "es");
  });
}

function enrichLessonSummary(
  lesson: {
    id: string;
    title: string;
    orderIndex: number;
    videoUrl: string | null;
    exerciseCount: number;
    pathStatus: LessonSummary["pathStatus"];
    conceptIds: string[];
  },
): LessonSummary {
  const meta = getCurriculumLessonMeta(lesson.id);
  return {
    ...lesson,
    kind: meta?.kind ?? "exercises",
    interactiveSlug: meta?.interactiveSlug,
    stepCount: meta?.stepCount,
  };
}

async function resolveCourseId(studentId: string | null): Promise<string> {
  if (!studentId) {
    return DEFAULT_COURSE_ID;
  }

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

export async function getCourseCatalog(): Promise<CourseCatalogEntry[]> {
  if (isE2EMockClassroomEnabled()) {
    return getE2EMockCourseCatalog();
  }

  if (isContentPreviewModeEnabled()) {
    return getPreviewCourseCatalog();
  }

  const supabase = await createServerSupabaseClient();

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("id, title, description")
    .order("created_at", { ascending: true });

  if (coursesError || !courses) {
    return [];
  }

  const courseIds = courses.map((course) => course.id as string);

  const { data: modules } = await supabase
    .from("modules")
    .select("id, course_id")
    .in("course_id", courseIds.length > 0 ? courseIds : ["00000000-0000-0000-0000-000000000000"]);

  const moduleIds = (modules ?? []).map((module) => module.id as string);

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id")
    .in("module_id", moduleIds.length > 0 ? moduleIds : ["00000000-0000-0000-0000-000000000000"]);

  const moduleCountByCourse = new Map<string, number>();
  const lessonCountByCourse = new Map<string, number>();
  const moduleToCourse = new Map<string, string>();

  for (const courseModule of modules ?? []) {
    const courseId = courseModule.course_id as string;
    moduleToCourse.set(courseModule.id as string, courseId);
    moduleCountByCourse.set(courseId, (moduleCountByCourse.get(courseId) ?? 0) + 1);
  }

  for (const lesson of lessons ?? []) {
    const courseId = moduleToCourse.get(lesson.module_id as string);
    if (!courseId) continue;
    lessonCountByCourse.set(courseId, (lessonCountByCourse.get(courseId) ?? 0) + 1);
  }

  const catalog = courses.map((course) => {
    const id = course.id as string;
    const curriculumCourse = getCourseById(id);
    return {
      id,
      title: course.title as string,
      description: (course.description as string | null) ?? null,
      orderIndex: curriculumCourse?.orderIndex ?? 0,
      moduleCount: moduleCountByCourse.get(id) ?? 0,
      lessonCount: lessonCountByCourse.get(id) ?? 0,
    };
  });

  return sortCoursesByCurriculumOrder(catalog);
}

export async function getCourseOutline(
  courseId: string,
  studentId: string | null,
): Promise<CourseOutline | null> {
  if (isE2EMockClassroomEnabled()) {
    return getE2EMockCourseOutline(courseId);
  }

  if (isContentPreviewModeEnabled()) {
    return getPreviewCourseOutline(courseId);
  }

  const supabase = await createServerSupabaseClient();

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("id, title, description")
    .eq("id", courseId)
    .maybeSingle();

  if (courseError || !course) {
    return null;
  }

  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select("id, title, order_index")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true });

  if (modulesError || !modules) {
    return null;
  }

  const moduleIds = modules.map((module) => module.id as string);

  if (moduleIds.length === 0) {
    const curriculumCourse = getCourseById(courseId);
    return {
      course: {
        id: course.id as string,
        title: course.title as string,
        description: (course.description as string | null) ?? null,
        orderIndex: curriculumCourse?.orderIndex,
      },
      modules: [],
    };
  }

  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("id, module_id, title, order_index, video_url")
    .in("module_id", moduleIds)
    .order("order_index", { ascending: true });

  if (lessonsError || !lessons) {
    return null;
  }

  const lessonIds = lessons.map((lesson) => lesson.id as string);

  const { data: lessonConcepts } = await supabase
    .from("lesson_concepts")
    .select("lesson_id, concept_id")
    .in("lesson_id", lessonIds.length > 0 ? lessonIds : ["00000000-0000-0000-0000-000000000000"]);

  const conceptIdsByLesson = new Map<string, string[]>();
  const allConceptIds = new Set<string>();

  for (const row of lessonConcepts ?? []) {
    const lessonId = row.lesson_id as string;
    const conceptId = row.concept_id as string;
    const existing = conceptIdsByLesson.get(lessonId) ?? [];
    existing.push(conceptId);
    conceptIdsByLesson.set(lessonId, existing);
    allConceptIds.add(conceptId);
  }

  const { data: exercises } = await supabase
    .from("exercises")
    .select("id, concept_id")
    .in("concept_id", [...allConceptIds]);

  const exerciseCountByLesson = new Map<string, number>();
  for (const lessonId of lessonIds) {
    const conceptIds = conceptIdsByLesson.get(lessonId) ?? [];
    const count = (exercises ?? []).filter((exercise) =>
      conceptIds.includes(exercise.concept_id as string),
    ).length;
    exerciseCountByLesson.set(lessonId, count);
  }

  let pathStatusMap = new Map<string, LessonSummary["pathStatus"]>();

  if (studentId && lessonIds.length > 0) {
    const { data: paths } = await supabase
      .from("learning_paths")
      .select("lesson_id, status")
      .eq("student_id", studentId)
      .in("lesson_id", lessonIds);

    pathStatusMap = buildPathStatusMap((paths ?? []) as LearningPathRow[]);
  }

  const lessonsByModule = new Map<string, LessonSummary[]>();

  for (const lesson of lessons) {
    const lessonId = lesson.id as string;
    const summary = enrichLessonSummary({
      id: lessonId,
      title: lesson.title as string,
      orderIndex: lesson.order_index as number,
      videoUrl: (lesson.video_url as string | null) ?? null,
      exerciseCount: exerciseCountByLesson.get(lessonId) ?? 0,
      pathStatus: pathStatusMap.get(lessonId) ?? "not_started",
      conceptIds: conceptIdsByLesson.get(lessonId) ?? [],
    });

    const moduleId = lesson.module_id as string;
    const existing = lessonsByModule.get(moduleId) ?? [];
    existing.push(summary);
    lessonsByModule.set(moduleId, existing);
  }

  const curriculumCourse = getCourseById(courseId);

  return {
    course: {
      id: course.id as string,
      title: course.title as string,
      description: (course.description as string | null) ?? null,
      orderIndex: curriculumCourse?.orderIndex,
    },
    modules: modules.map((module) => {
      const moduleId = module.id as string;
      return {
        id: moduleId,
        title: module.title as string,
        orderIndex: module.order_index as number,
        lessons: lessonsByModule.get(moduleId) ?? [],
        topicExercises: getTopicExercisesForModule(moduleId).map((exercise) => ({
          id: exercise.id,
          title: exercise.title,
          statement: exercise.statement,
          solutionText: exercise.solutionText,
          solutionVideoUrl: exercise.solutionVideoUrl,
        })),
      };
    }),
  };
}

export async function getLessonDetail(
  lessonId: string,
  studentId: string | null,
): Promise<LessonDetail | null> {
  if (isE2EMockClassroomEnabled()) {
    return getE2EMockLessonDetail(lessonId);
  }

  if (isContentPreviewModeEnabled()) {
    return getPreviewLessonDetail(lessonId);
  }

  const supabase = await createServerSupabaseClient();

  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .select("id, module_id, title, order_index, video_url")
    .eq("id", lessonId)
    .maybeSingle();

  if (lessonError || !lesson) {
    return null;
  }

  const { data: module } = await supabase
    .from("modules")
    .select("id, title, course_id")
    .eq("id", lesson.module_id as string)
    .maybeSingle();

  if (!module) {
    return null;
  }

  const { data: course } = await supabase
    .from("courses")
    .select("title")
    .eq("id", module.course_id as string)
    .maybeSingle();

  const meta = getCurriculumLessonMeta(lessonId);

  const { data: lessonConcepts } = await supabase
    .from("lesson_concepts")
    .select("concept_id")
    .eq("lesson_id", lessonId);

  const conceptIds = (lessonConcepts ?? []).map((row) => row.concept_id as string);

  const { data: conceptRows } = await supabase
    .from("concepts")
    .select("id, slug, title")
    .in("id", conceptIds.length > 0 ? conceptIds : ["00000000-0000-0000-0000-000000000000"]);

  let masteryRows: MasteryRow[] = [];
  let attemptRows: AttemptRow[] = [];

  const { data: exercises } = await supabase
    .from("exercises")
    .select("id, concept_id, type, difficulty, content")
    .in("concept_id", conceptIds.length > 0 ? conceptIds : ["00000000-0000-0000-0000-000000000000"])
    .order("difficulty", { ascending: true });

  const exerciseIds = (exercises ?? []).map((row) => row.id as string);

  if (studentId && exerciseIds.length > 0) {
    const { data: attempts } = await supabase
      .from("exercise_attempts")
      .select("exercise_id, correct")
      .eq("student_id", studentId)
      .in("exercise_id", exerciseIds);

    attemptRows = (attempts ?? []) as AttemptRow[];

    const { data: mastery } = await supabase
      .from("student_concept_mastery")
      .select("concept_id, mastery")
      .eq("student_id", studentId)
      .in("concept_id", conceptIds.length > 0 ? conceptIds : ["00000000-0000-0000-0000-000000000000"]);

    masteryRows = (mastery ?? []) as MasteryRow[];
  }

  const attemptsByExercise = new Map<string, { count: number; hasCorrect: boolean }>();

  for (const attempt of attemptRows) {
    const exerciseId = attempt.exercise_id;
    const current = attemptsByExercise.get(exerciseId) ?? { count: 0, hasCorrect: false };
    current.count += 1;
    if (attempt.correct) {
      current.hasCorrect = true;
    }
    attemptsByExercise.set(exerciseId, current);
  }

  const masteryByConcept = new Map<string, number>();
  for (const row of masteryRows) {
    masteryByConcept.set(row.concept_id, Number(row.mastery));
  }

  const attemptCountByConcept = new Map<string, number>();
  for (const exercise of exercises ?? []) {
    const conceptId = exercise.concept_id as string;
    const stats = attemptsByExercise.get(exercise.id as string);
    if (stats) {
      attemptCountByConcept.set(
        conceptId,
        (attemptCountByConcept.get(conceptId) ?? 0) + stats.count,
      );
    }
  }

  let pathStatus: LessonSummary["pathStatus"] = "not_started";

  if (studentId) {
    const { data: path } = await supabase
      .from("learning_paths")
      .select("status")
      .eq("student_id", studentId)
      .eq("lesson_id", lessonId)
      .maybeSingle();

    if (path?.status) {
      pathStatus = path.status as LessonSummary["pathStatus"];
    }
  }

  const exerciseSummaries: ExerciseSummary[] = ((exercises ?? []) as ExerciseRow[]).map(
    (exercise) => {
      const stats = attemptsByExercise.get(exercise.id) ?? { count: 0, hasCorrect: false };
      return {
        id: exercise.id,
        type: exercise.type,
        difficulty: exercise.difficulty,
        conceptId: exercise.concept_id,
        questionPreview: extractQuestionPreview(exercise.content),
        attemptCount: stats.count,
        hasCorrectAttempt: stats.hasCorrect,
      };
    },
  );

  return {
    id: lesson.id as string,
    title: lesson.title as string,
    orderIndex: lesson.order_index as number,
    videoUrl: (lesson.video_url as string | null) ?? null,
    exerciseCount: exerciseSummaries.length,
    pathStatus,
    conceptIds,
    moduleTitle: module.title as string,
    courseTitle: (course?.title as string) ?? "Curso",
    kind: meta?.kind ?? "exercises",
    interactiveSlug: meta?.interactiveSlug,
    stepCount: meta?.stepCount,
    concepts: (conceptRows ?? []).map((concept) => ({
      id: concept.id as string,
      slug: concept.slug as string,
      title: concept.title as string,
      mastery: masteryByConcept.get(concept.id as string) ?? 0,
      attemptCount: attemptCountByConcept.get(concept.id as string) ?? 0,
    })),
    exercises: exerciseSummaries,
  };
}

export async function getExerciseForPractice(exerciseId: string): Promise<{
  id: string;
  conceptId: string;
  type: string;
  content: unknown;
  lessonId: string | null;
  lessonTitle: string | null;
} | null> {
  if (isE2EMockClassroomEnabled()) {
    return getE2EMockExercise(exerciseId);
  }

  if (isContentPreviewModeEnabled()) {
    return getPreviewExerciseForPractice(exerciseId);
  }

  const supabase = await createServerSupabaseClient();

  const { data: exercise, error } = await supabase
    .from("exercises")
    .select("id, concept_id, type, content")
    .eq("id", exerciseId)
    .maybeSingle();

  if (error || !exercise) {
    return null;
  }

  const { data: lessonLink } = await supabase
    .from("lesson_concepts")
    .select("lesson_id, lessons(title)")
    .eq("concept_id", exercise.concept_id as string)
    .limit(1)
    .maybeSingle();

  const lessonData = lessonLink?.lessons as { title?: string } | null | undefined;

  return {
    id: exercise.id as string,
    conceptId: exercise.concept_id as string,
    type: exercise.type as string,
    content: exercise.content,
    lessonId: (lessonLink?.lesson_id as string | undefined) ?? null,
    lessonTitle: lessonData?.title ?? null,
  };
}

/** @deprecated Usar getCourseOutline(courseId, studentId). Mantenido para compatibilidad interna. */
export async function getDefaultCourseOutline(
  studentId: string | null,
): Promise<CourseOutline | null> {
  const courseId = studentId ? await resolveCourseId(studentId) : DEFAULT_COURSE_ID;
  return getCourseOutline(courseId, studentId);
}
