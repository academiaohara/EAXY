import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { getLessonDetailForStudent } from "@/lib/content/queries";
import { LessonDetailView } from "@/components/learning/lesson-detail-view";
import { startLessonForStudent } from "@/lib/learning-paths/queries";
import { Button } from "@/components/ui/button";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const studentId = await requireAuthenticatedUserOrRedirect();
  const { lessonId } = await params;
  const existingLesson = await getLessonDetailForStudent(studentId, lessonId);

  if (!existingLesson) {
    notFound();
  }

  await startLessonForStudent(studentId, lessonId);
  const lesson = await getLessonDetailForStudent(studentId, lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-8">
      <Button variant="outline" className="w-fit" asChild>
        <Link href="/aprender/curso">Volver al curso</Link>
      </Button>
      <LessonDetailView lesson={lesson} />
    </main>
  );
}
