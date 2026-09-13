import { notFound } from "next/navigation";
import { LessonDetailView } from "@/components/learning/lesson-detail";
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
    <main className="flex flex-1 flex-col p-6 md:p-10">
      <LessonDetailView lesson={lesson} />
    </main>
  );
}
