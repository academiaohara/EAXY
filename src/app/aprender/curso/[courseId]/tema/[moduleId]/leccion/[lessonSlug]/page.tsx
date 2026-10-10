import { InteractiveLessonPageBody } from "@/components/lesson/interactive-lesson-page";

type NestedInteractiveLessonPageProps = {
  params: Promise<{ courseId: string; moduleId: string; lessonSlug: string }>;
  searchParams: Promise<{ reiniciar?: string }>;
};

export default async function NestedInteractiveLessonPage({
  params,
  searchParams,
}: NestedInteractiveLessonPageProps) {
  const { courseId, moduleId, lessonSlug } = await params;
  const { reiniciar } = await searchParams;
  const restartRequested = reiniciar === "1" || reiniciar === "true";

  return (
    <InteractiveLessonPageBody
      lessonSlug={lessonSlug}
      courseSlug={courseId}
      moduleSlug={moduleId}
      restartRequested={restartRequested}
    />
  );
}
