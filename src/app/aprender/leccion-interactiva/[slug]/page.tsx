import { notFound } from "next/navigation";
import { getInteractiveLessonContext } from "@/content";
import { InteractiveLessonEntryGate } from "@/components/lesson/InteractiveLessonEntryGate";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { interactiveLessons } from "@/data/lessons";

type InteractiveLessonPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InteractiveLessonPage({ params }: InteractiveLessonPageProps) {
  const { slug } = await params;
  const lesson = interactiveLessons[slug as keyof typeof interactiveLessons];

  if (!lesson) {
    notFound();
  }

  const studentId = await getAuthenticatedUserIdOrNull();
  const context = getInteractiveLessonContext(slug);
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
      />
    </main>
  );
}
