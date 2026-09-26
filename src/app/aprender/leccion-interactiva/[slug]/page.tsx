import { notFound } from "next/navigation";
import { getInteractiveLessonContext } from "@/content";
import { LessonContainer } from "@/components/lesson/LessonContainer";
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

  const context = getInteractiveLessonContext(slug);
  const navigation = context
    ? {
        courseId: context.course.id,
        courseTitle: context.course.title,
        moduleTitle: context.module.title,
      }
    : undefined;

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <LessonContainer lesson={lesson} navigation={navigation} />
    </main>
  );
}
