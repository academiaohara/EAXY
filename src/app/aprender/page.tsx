import Link from "next/link";
import { redirect } from "next/navigation";
import { MasteryBadge } from "@/components/exercises/mastery-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getStudentConceptMasterySummaries } from "@/lib/exercises/queries";

export default async function AprenderPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (!studentId) {
    redirect("/entrar");
  }

  const masterySummaries = await getStudentConceptMasterySummaries(studentId);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6 sm:p-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Aprender</h1>
        <p className="text-muted-foreground">
          Tu espacio de aprendizaje personal. Practica ejercicios y sigue tu progreso por
          concepto.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Siguiente paso</CardTitle>
          <CardDescription>
            Continúa practicando para reforzar lo que vas aprendiendo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/practicar">
            <Button data-testid="aprender-practicar-link">Ir a practicar</Button>
          </Link>
        </CardContent>
      </Card>

      <section className="space-y-3" data-testid="mastery-overview">
        <h2 className="font-heading text-xl font-semibold tracking-tight">Tu dominio</h2>
        {masterySummaries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no hay conceptos disponibles en el catálogo.
          </p>
        ) : (
          <ul className="space-y-2">
            {masterySummaries.map((summary) => (
              <li
                key={summary.conceptId}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-paper-raised px-4 py-3"
              >
                <span className="text-sm font-medium text-ink">{summary.conceptTitle}</span>
                <MasteryBadge mastery={summary.mastery} hasAttempts={summary.hasAttempts} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
