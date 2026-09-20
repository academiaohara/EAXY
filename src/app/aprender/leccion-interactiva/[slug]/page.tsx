import { notFound } from "next/navigation";
import { LessonContainer } from "@/components/lesson/LessonContainer";
import { interactiveLessons } from "@/data/lessons/sistemas-no-lineales";

type InteractiveLessonPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function InteractiveLessonPage({ params }: InteractiveLessonPageProps) {
  const { slug } = await params;
  const lesson = interactiveLessons[slug as keyof typeof interactiveLessons];

  if (!lesson) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col p-6 sm:p-8">
      <LessonContainer lesson={lesson} />
    </main>
  );
}
