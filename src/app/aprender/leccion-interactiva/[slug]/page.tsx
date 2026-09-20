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
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col p-6 sm:p-8">
      <LessonContainer lesson={lesson} navigation={navigation} />
    </main>
  );
}
