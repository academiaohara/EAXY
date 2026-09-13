import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LessonStatusBadge } from "@/components/curriculum/lesson-status-badge";
import { LessonVideo } from "@/components/curriculum/lesson-video";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getLessonDetail } from "@/lib/curriculum/queries";
import { markLessonStarted, syncLessonProgress } from "@/lib/learning-paths/service";

type LeccionPageProps = {
  params: Promise<{ courseId: string; lessonId: string }>;
};

export default async function LeccionPage({ params }: LeccionPageProps) {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (!studentId) {
    redirect("/entrar");
  }

  const { courseId, lessonId } = await params;

  await markLessonStarted(studentId, lessonId);
  await syncLessonProgress(studentId, lessonId);

  const lesson = await getLessonDetail(studentId, courseId, lessonId);

  if (!lesson) {
    notFound();
  }

  const practiceHref = lesson.practiceExerciseId
    ? `/practicar?ejercicio=${lesson.practiceExerciseId}`
    : "/practicar";

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6 sm:p-8">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">
              {lesson.courseTitle} · {lesson.moduleTitle}
            </p>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">{lesson.title}</h1>
          </div>
          <LessonStatusBadge status={lesson.status} />
        </div>
        <Link href={`/curso/${courseId}`}>
          <Button variant="outline">Volver al curso</Button>
        </Link>
      </header>

      {lesson.videoUrl && <LessonVideo videoUrl={lesson.videoUrl} title={lesson.title} />}

      <Card>
        <CardHeader>
          <CardTitle>Conceptos de esta lección</CardTitle>
          <CardDescription>
            Practica ejercicios de cada concepto para completar la lección.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc space-y-1 pl-5 text-sm text-ink">
            {lesson.conceptTitles.map((conceptTitle) => (
              <li key={conceptTitle}>{conceptTitle}</li>
            ))}
          </ul>
          <Link href={practiceHref}>
            <Button data-testid="lesson-practice-link">Practicar esta lección</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
