import Link from "next/link";
import { redirect } from "next/navigation";
import { ExerciseRenderer } from "@/components/exercises/exercise-renderer";
import { RecommendationCard } from "@/components/learning/recommendation-card";
import { getAuthenticatedUserId } from "@/lib/auth/session";
import { getRecommendedPracticeSession } from "@/lib/recommendations/service";
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
  const session = await getRecommendedPracticeSession(ejercicio);

  if (!session) {
    redirect("/entrar");
  }

  const { recommendation, exercise } = session;

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

      {recommendation && <RecommendationCard recommendation={recommendation} />}

      {recommendation?.action === "rest" ? (
        <div
          className="rounded-lg border border-border bg-paper-raised p-6 text-center"
          data-testid="practice-rest-panel"
        >
          <p className="text-muted-foreground">
            Has practicado mucho en la última hora. Descansa un poco antes de continuar.
          </p>
          <Link href="/curso" className="mt-4 inline-block">
            <Button variant="outline">Ver curso</Button>
          </Link>
        </div>
      ) : !exercise ? (
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
