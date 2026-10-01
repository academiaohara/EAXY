import { notFound } from "next/navigation";
import { LessonDetailWithLocalProgress } from "@/components/learning/lesson-detail-with-local-progress";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getLessonDetail } from "@/lib/curriculum/queries";
import { markLessonStarted } from "@/lib/learning-paths/actions";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const studentId = await getAuthenticatedUserIdOrNull();
  const lesson = await getLessonDetail(lessonId, studentId);

  if (!lesson) {
    notFound();
  }

  if (studentId && lesson.pathStatus === "not_started") {
    try {
      await markLessonStarted(lessonId);
    } catch {
      // No bloquear la vista si falla el registro de inicio
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col p-6 sm:p-8">
      <LessonDetailWithLocalProgress lesson={lesson} mergeLocalProgress={!studentId} />
    </div>
  );
}
