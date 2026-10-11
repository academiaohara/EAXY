import { notFound, permanentRedirect } from "next/navigation";
import { getInteractiveLessonAtPath, getInteractiveLessonContext } from "@/content";
import { InteractiveLessonEntryGate } from "@/components/lesson/InteractiveLessonEntryGate";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { interactiveLessons } from "@/data/lessons";
import { resolveInteractiveLessonSlug } from "@/data/lessons/interactive-lesson-slug-redirects";
import { interactiveLessonHref } from "@/lib/navigation/learning-trail";

type InteractiveLessonPageBodyProps = {
  lessonSlug: string;
  courseSlug?: string;
  moduleSlug?: string;
  restartRequested: boolean;
};

export async function InteractiveLessonPageBody({
  lessonSlug,
  courseSlug,
  moduleSlug,
  restartRequested,
}: InteractiveLessonPageBodyProps) {
  const resolvedSlug = resolveInteractiveLessonSlug(lessonSlug);
  if (resolvedSlug !== lessonSlug) {
    const query = restartRequested ? "?reiniciar=1" : "";
    if (courseSlug && moduleSlug) {
      permanentRedirect(`${interactiveLessonHref(courseSlug, moduleSlug, resolvedSlug)}${query}`);
    }
    permanentRedirect(`/aprender/leccion-interactiva/${resolvedSlug}${query}`);
  }

  const lesson = interactiveLessons[resolvedSlug as keyof typeof interactiveLessons];

  if (!lesson) {
    notFound();
  }

  const context =
    courseSlug && moduleSlug
      ? getInteractiveLessonAtPath(courseSlug, moduleSlug, resolvedSlug)
      : getInteractiveLessonContext(resolvedSlug);

  if (courseSlug && moduleSlug && !context) {
    notFound();
  }

  const studentId = await getAuthenticatedUserIdOrNull();
  const navigation = context
    ? {
        courseSlug: context.course.slug,
        courseTitle: context.course.title,
        moduleSlug: context.module.slug,
        moduleTitle: context.module.title,
      }
    : undefined;

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <InteractiveLessonEntryGate
        lesson={lesson}
        navigation={navigation}
        curriculumLessonId={context?.lesson.id}
        trackLocalProgress={!studentId}
        restartRequested={restartRequested}
      />
    </main>
  );
}
