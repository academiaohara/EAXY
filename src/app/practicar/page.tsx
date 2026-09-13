import Link from "next/link";
import { redirect } from "next/navigation";
import { ExerciseRenderer } from "@/components/exercises/exercise-renderer";
import { getAuthenticatedUserId } from "@/lib/auth/session";
import { getNextPracticeExercise } from "@/lib/exercises/queries";
import { Button } from "@/components/ui/button";

type PracticarPageProps = {
  searchParams: Promise<{ ejercicio?: string }>;
};

export default async function PracticarPage({ searchParams }: PracticarPageProps) {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/entrar");
  }

  const { ejercicio } = await searchParams;
  const exercise = await getNextPracticeExercise(ejercicio);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-6 sm:p-8">
      <header className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Practicar</h1>
          <Link
            href="/aprender"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Volver
          </Link>
        </div>
        {exercise && (
          <p className="text-sm text-muted-foreground">
            Concepto: <span className="text-foreground">{exercise.conceptTitle}</span>
          </p>
        )}
      </header>

      {!exercise ? (
        <div className="rounded-lg border border-border bg-paper-raised p-6 text-center">
          <p className="text-muted-foreground">No hay ejercicios disponibles todavía.</p>
          <Link href="/aprender" className="mt-4 inline-block">
            <Button variant="outline">Volver a Aprender</Button>
          </Link>
        </div>
      ) : (
        <section
          className="rounded-lg border border-border bg-paper-raised p-6"
          data-testid="practice-exercise-panel"
        >
          <ExerciseRenderer
            exerciseId={exercise.id}
            type={exercise.type}
            content={exercise.content}
          />
        </section>
      )}
    </main>
  );
}
