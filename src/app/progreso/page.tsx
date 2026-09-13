import { redirect } from "next/navigation";
import { ConceptMasteryMap } from "@/components/learning/concept-mastery-map";
import { StudentShell } from "@/components/learning/student-shell";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getStudentConceptMasterySummaries } from "@/lib/exercises/queries";

export default async function ProgresoPage() {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (!studentId) {
    redirect("/entrar");
  }

  const masterySummaries = await getStudentConceptMasterySummaries(studentId);

  return (
    <StudentShell>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 p-6 sm:p-8">
        <header className="space-y-2">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Progreso</h1>
          <p className="text-muted-foreground">
            Mapa de conceptos y tu dominio actual en cada uno.
          </p>
        </header>

        <ConceptMasteryMap summaries={masterySummaries} />
      </main>
    </StudentShell>
  );
}
