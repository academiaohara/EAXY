import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LessonCompleteButton } from "@/components/learning/lesson-complete-button";
import { LessonStartedTracker } from "@/components/learning/lesson-started-tracker";
import { LessonStatusBadge } from "@/components/learning/lesson-status-badge";
import { LessonVideo } from "@/components/learning/lesson-video";
import { getAuthenticatedUserId } from "@/lib/auth/session";
import { getLessonDetail } from "@/lib/content/queries";
import { Button } from "@/components/ui/button";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/entrar");
  }

  const { lessonId } = await params;
  const lesson = await getLessonDetail(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6 sm:p-8">
      <LessonStartedTracker
        lessonId={lesson.id}
        shouldMarkStarted={lesson.progressStatus === "not_started"}
      />

      <header className="space-y-3">
        <Link
          href="/curso"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Volver al curso
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">{lesson.title}</h1>
          <LessonStatusBadge status={lesson.progressStatus} />
        </div>
        <p className="text-sm text-muted-foreground">
          {lesson.courseTitle} · {lesson.moduleTitle}
        </p>
      </header>

      {lesson.videoUrl && <LessonVideo videoUrl={lesson.videoUrl} title={lesson.title} />}

      {lesson.concepts.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-heading text-lg font-medium">Conceptos</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {lesson.concepts.map((concept) => (
              <li key={concept.id}>{concept.title}</li>
            ))}
          </ul>
        </section>
      )}

      {lesson.exercises.length > 0 && (
        <section className="space-y-3 rounded-lg border border-border bg-paper-raised p-4">
          <h2 className="font-heading text-lg font-medium">Ejercicios de práctica</h2>
          <p className="text-sm text-muted-foreground">
            Practica los conceptos de esta lección con ejercicios interactivos.
          </p>
          <Link href={`/practicar?ejercicio=${lesson.exercises[0]?.id}`}>
            <Button data-testid="lesson-practice-link">Ir a practicar</Button>
          </Link>
        </section>
      )}

      {lesson.progressStatus !== "completed" && <LessonCompleteButton lessonId={lesson.id} />}
    </main>
  );
}
