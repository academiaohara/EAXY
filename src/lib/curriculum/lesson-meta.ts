import { getLessonById } from "@/content";
import { interactiveLessons } from "@/data/lessons/sistemas-no-lineales";
import type { LessonKind } from "@/lib/curriculum/types";

export type CurriculumLessonMeta = {
  kind: LessonKind;
  interactiveSlug?: string;
  stepCount?: number;
};

export function getCurriculumLessonMeta(lessonId: string): CurriculumLessonMeta | null {
  const lessonRef = getLessonById(lessonId);
  if (!lessonRef) {
    return null;
  }

  const { lesson } = lessonRef;
  const kind: LessonKind =
    lesson.kind === "interactive" || lesson.interactiveSlug ? "interactive" : "exercises";

  if (kind === "interactive" && lesson.interactiveSlug) {
    const interactiveLesson =
      interactiveLessons[lesson.interactiveSlug as keyof typeof interactiveLessons];
    return {
      kind,
      interactiveSlug: lesson.interactiveSlug,
      stepCount: interactiveLesson?.steps.length,
    };
  }

  return { kind };
}

export function resolveLessonHref(lessonId: string): string {
  const meta = getCurriculumLessonMeta(lessonId);
  if (meta?.kind === "interactive" && meta.interactiveSlug) {
    return `/aprender/leccion-interactiva/${meta.interactiveSlug}`;
  }
  return `/aprender/leccion/${lessonId}`;
}
