"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LessonDetail } from "@/lib/content/types";
import { completeLesson } from "@/lib/learning-paths/actions";

type LessonDetailViewProps = {
  lesson: LessonDetail;
};

function formatMasteryPercent(mastery: number): string {
  return `${Math.round(mastery * 100)}%`;
}

export function LessonDetailView({ lesson }: LessonDetailViewProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleCompleteLesson() {
    setErrorMessage(null);

    startTransition(async () => {
      const result = await completeLesson(lesson.id);

      if (!result.success) {
        setErrorMessage(result.error ?? "No se pudo completar la lección.");
        return;
      }

      router.refresh();
    });
  }

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8" data-testid="lesson-detail">
      <header className="space-y-2">
        <p className="text-sm text-muted-foreground">
          {lesson.courseTitle} · {lesson.moduleTitle}
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{lesson.title}</h1>
        {lesson.status === "completed" && (
          <p className="text-sm font-medium text-emerald-700" data-testid="lesson-completed-badge">
            Lección completada
          </p>
        )}
      </header>

      {lesson.videoUrl ? (
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold">Vídeo</h2>
          <div className="aspect-video overflow-hidden rounded-xl border border-border bg-black">
            <iframe
              src={lesson.videoUrl}
              title={`Vídeo: ${lesson.title}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              data-testid="lesson-video-embed"
            />
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="font-heading text-lg font-semibold">Conceptos de esta lección</h2>
        <ul className="grid gap-3" data-testid="lesson-concepts-list">
          {lesson.concepts.map((concept) => (
            <li
              key={concept.id}
              className="rounded-lg border border-border px-4 py-3"
              data-testid="lesson-concept-item"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-ink">{concept.title}</p>
                  {concept.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{concept.description}</p>
                  )}
                </div>
                <span className="font-mono text-sm text-muted-foreground">
                  {formatMasteryPercent(concept.mastery)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-wrap gap-3">
        <Button asChild data-testid="lesson-practice-link">
          <Link href={`/aprender/practicar?leccion=${lesson.id}`}>Practicar esta lección</Link>
        </Button>

        {lesson.status !== "completed" && (
          <Button
            type="button"
            variant="outline"
            onClick={handleCompleteLesson}
            disabled={!lesson.canComplete || isPending}
            data-testid="lesson-complete-button"
          >
            {isPending ? (
              <>
                <Loader2Icon className="animate-spin" data-icon="inline-start" />
                Guardando...
              </>
            ) : (
              "Marcar lección como completada"
            )}
          </Button>
        )}
      </section>

      {!lesson.canComplete && lesson.status !== "completed" && (
        <p className="text-sm text-muted-foreground" data-testid="lesson-complete-hint">
          Acerta al menos un ejercicio de cada concepto para poder completar la lección.
        </p>
      )}

      {errorMessage && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
    </article>
  );
}
