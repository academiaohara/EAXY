import { notFound } from "next/navigation";
import { getInteractiveLessonAtPath, getInteractiveLessonContext } from "@/content";
import { InteractiveLessonEntryGate } from "@/components/lesson/InteractiveLessonEntryGate";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { interactiveLessons } from "@/data/lessons";

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
  const lesson = interactiveLessons[lessonSlug as keyof typeof interactiveLessons];

  if (!lesson) {
    notFound();
  }

  const context =
    courseSlug && moduleSlug
      ? getInteractiveLessonAtPath(courseSlug, moduleSlug, lessonSlug)
      : getInteractiveLessonContext(lessonSlug);

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
