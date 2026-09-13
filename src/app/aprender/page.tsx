import Link from "next/link";
import { requireAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { getConceptMasterySummariesForStudent } from "@/lib/practice/queries";
import { Button } from "@/components/ui/button";

function formatMasteryPercent(mastery: number): string {
  return `${Math.round(mastery * 100)}%`;
}

export default async function AprenderPage() {
  const studentId = await requireAuthenticatedUserOrRedirect();
  const masterySummaries = await getConceptMasterySummariesForStudent(studentId);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Aprender</h1>
        <p className="text-muted-foreground">
          Tu espacio de aprendizaje. Practica ejercicios y sigue tu dominio por concepto.
        </p>
      </header>

      <section className="rounded-xl border border-border bg-paper-raised p-6">
        <h2 className="font-heading text-xl font-semibold">Práctica libre</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Resuelve ejercicios del curso de ecuaciones. Cada intento actualiza tu mastery.
        </p>
        <Button className="mt-4" asChild data-testid="aprender-practice-link">
          <Link href="/aprender/practicar">Empezar a practicar</Link>
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-xl font-semibold">Tu dominio</h2>
        {masterySummaries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no has practicado. Completa tu primer ejercicio para ver tu progreso aquí.
          </p>
        ) : (
          <ul className="grid gap-3" data-testid="mastery-summary-list">
            {masterySummaries.map((summary) => (
              <li
                key={summary.conceptId}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
                data-testid="mastery-summary-item"
              >
                <span className="text-sm text-ink">{summary.conceptTitle}</span>
                <span className="font-mono text-sm text-muted-foreground">
                  {formatMasteryPercent(summary.mastery)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
