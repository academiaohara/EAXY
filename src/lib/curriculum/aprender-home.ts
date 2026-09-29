import { isE2EMockClassroomEnabled } from "@/lib/classrooms/e2e-mock";
import { isContentPreviewModeEnabled } from "@/lib/content-preview/mode";
import { findNextLesson } from "@/lib/curriculum/course-progress";
import { resolveLessonHref } from "@/lib/curriculum/lesson-meta";
import { getCourseCatalog, getCourseOutline, getStudentReferenceCourseId } from "@/lib/curriculum/queries";
import type { CourseOutline, LessonSummary } from "@/lib/curriculum/types";
import { createServerSupabaseClient } from "@/lib/supabase";

export type AprenderStudyShortcut = {
  courseId: string;
  courseTitle: string;
  moduleId: string;
  moduleTitle: string;
  moduleNumber: number;
  lessonId: string;
  lessonTitle: string;
  lesson: LessonSummary;
  topicHref: string;
  lessonHref: string;
  actionLabel: "Continuar" | "Empezar" | "Repasar";
  startedAt: Date | null;
};

export type AprenderContinueStudying = {
  primary: AprenderStudyShortcut;
  others: AprenderStudyShortcut[];
};

type LearningPathJoinedRow = {
  started_at: string;
  lesson_id: string;
  lessons: {
    id: string;
    title: string;
    module_id: string;
    modules: {
      id: string;
      title: string;
      order_index: number;
      course_id: string;
      courses: {
        id: string;
        title: string;
      } | null;
    } | null;
  } | null;
};

function cleanLessonTitle(title: string): string {
  return title.replace(/^\d+\.\s*/, "");
}

function actionLabelFor(
  pathStatus: LessonSummary["pathStatus"],
  isReview: boolean,
): AprenderStudyShortcut["actionLabel"] {
  if (isReview) {
    return "Repasar";
  }
  if (pathStatus === "started") {
    return "Continuar";
  }
  return "Empezar";
}

function shortcutFromNext(
  outline: CourseOutline,
  next: NonNullable<ReturnType<typeof findNextLesson>>,
  startedAt: Date | null,
): AprenderStudyShortcut {
  const { module: courseModule, moduleNumber } = next;
  return {
    courseId: outline.course.id,
    courseTitle: outline.course.title,
    moduleId: courseModule.id,
    moduleTitle: courseModule.title,
    moduleNumber,
    lessonId: next.lesson.id,
    lessonTitle: cleanLessonTitle(next.lesson.title),
    lesson: next.lesson,
    topicHref: `/aprender/curso/${outline.course.id}/tema/${courseModule.id}`,
    lessonHref: resolveLessonHref(next.lesson.id),
    actionLabel: actionLabelFor(next.lesson.pathStatus, next.isReview),
    startedAt,
  };
}

function shortcutKey(entry: AprenderStudyShortcut): string {
  return `${entry.courseId}:${entry.lessonId}`;
}

async function getStartedPathsFromDb(studentId: string): Promise<LearningPathJoinedRow[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("learning_paths")
    .select(
      `
      started_at,
      lesson_id,
      lessons (
        id,
        title,
        module_id,
        modules (
          id,
          title,
          order_index,
          course_id,
          courses (
            id,
            title
          )
        )
      )
    `,
    )
    .eq("student_id", studentId)
    .eq("status", "started")
    .order("started_at", { ascending: false })
    .limit(12);

  if (error) {
    throw new Error(`No se pudo cargar tu actividad reciente: ${error.message}`);
  }

  return (data ?? []) as LearningPathJoinedRow[];
}

async function buildShortcutForCourse(
  courseId: string,
  studentId: string,
  startedAt: Date | null,
): Promise<AprenderStudyShortcut | null> {
  const outline = await getCourseOutline(courseId, studentId);
  if (!outline) {
    return null;
  }

  const next = findNextLesson(outline.modules);
  if (!next) {
    return null;
  }

  return shortcutFromNext(outline, next, startedAt);
}

async function getContinueFromReferenceCourse(studentId: string): Promise<AprenderStudyShortcut | null> {
  const courseId = await getStudentReferenceCourseId(studentId);
  return buildShortcutForCourse(courseId, studentId, null);
}

async function getContinueForMockOrPreview(
  studentId: string | null,
): Promise<AprenderContinueStudying | null> {
  const catalog = await getCourseCatalog();
  const withLessons = catalog.filter((course) => course.lessonCount > 0);
  if (withLessons.length === 0) {
    return null;
  }

  const orderedIds = [...withLessons]
    .sort((a, b) => b.lessonCount - a.lessonCount || a.orderIndex - b.orderIndex)
    .map((course) => course.id);

  const shortcuts: AprenderStudyShortcut[] = [];
  for (const courseId of orderedIds) {
    const entry = await buildShortcutForCourse(courseId, studentId, null);
    if (entry) {
      shortcuts.push(entry);
    }
  }

  if (shortcuts.length === 0) {
    return null;
  }

  return { primary: shortcuts[0], others: shortcuts.slice(1, 4) };
}

export async function getAprenderContinueStudying(
  studentId: string | null,
): Promise<AprenderContinueStudying | null> {
  if (isE2EMockClassroomEnabled() || isContentPreviewModeEnabled()) {
    return getContinueForMockOrPreview(studentId);
  }

  if (!studentId) {
    return null;
  }

  const startedRows = await getStartedPathsFromDb(studentId);
  const seenCourses = new Set<string>();
  const shortcuts: AprenderStudyShortcut[] = [];

  for (const row of startedRows) {
    const lesson = row.lessons;
    const courseModule = lesson?.modules;
    const course = courseModule?.courses;
    const courseId = course?.id ?? courseModule?.course_id;
    if (!courseId || !lesson || !courseModule || !course) {
      continue;
    }
    if (seenCourses.has(courseId)) {
      continue;
    }

    const outline = await getCourseOutline(courseId, studentId);
    if (!outline) {
      continue;
    }

    const next = findNextLesson(outline.modules);
    if (!next) {
      continue;
    }

    seenCourses.add(courseId);
    shortcuts.push(
      shortcutFromNext(outline, next, row.started_at ? new Date(row.started_at) : null),
    );
  }

  if (shortcuts.length === 0) {
    const fallback = await getContinueFromReferenceCourse(studentId);
    if (!fallback) {
      return null;
    }
    return { primary: fallback, others: [] };
  }

  return {
    primary: shortcuts[0],
    others: shortcuts.slice(1, 4),
  };
}

export function dedupeAprenderShortcuts(entries: AprenderStudyShortcut[]): AprenderStudyShortcut[] {
  const seen = new Set<string>();
  const result: AprenderStudyShortcut[] = [];

  for (const entry of entries) {
    const key = shortcutKey(entry);
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(entry);
  }

  return result;
}
