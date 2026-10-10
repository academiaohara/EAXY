import { getInteractiveLessonContext, getLessonById } from "@/content";
import { interactiveLessons } from "@/data/lessons";
import type { LessonKind } from "@/lib/curriculum/types";
import { interactiveLessonHref } from "@/lib/navigation/learning-trail";

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

export function resolveInteractiveLessonHref(
  interactiveSlug: string,
  mode: "continue" | "restart" = "continue",
): string {
  const context = getInteractiveLessonContext(interactiveSlug);
  const base = context
    ? interactiveLessonHref(context.course.slug, context.module.slug, interactiveSlug)
    : `/aprender/leccion-interactiva/${interactiveSlug}`;
  return mode === "restart" ? `${base}?reiniciar=1` : base;
}

export function resolveLessonHref(lessonId: string): string {
  const meta = getCurriculumLessonMeta(lessonId);
  if (meta?.kind === "interactive" && meta.interactiveSlug) {
    return resolveInteractiveLessonHref(meta.interactiveSlug);
  }
  return `/aprender/leccion/${lessonId}`;
}
