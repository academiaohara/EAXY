import { redirect } from "next/navigation";
import { PracticeSession } from "@/components/exercises/practice-session";
import { StudentShell } from "@/components/learning/student-shell";
import { getAuthenticatedUserIdOrNull } from "@/lib/classrooms/authorization";
import { getPracticeExerciseContext } from "@/lib/exercises/queries";

type PracticarPageProps = {
  searchParams: Promise<{ ejercicio?: string }>;
};

export default async function PracticarPage({ searchParams }: PracticarPageProps) {
  const studentId = await getAuthenticatedUserIdOrNull();

  if (!studentId) {
    redirect("/entrar");
  }

  const { ejercicio } = await searchParams;
  const context = await getPracticeExerciseContext(studentId, ejercicio);

  return (
    <StudentShell>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-6 sm:p-8">
        <header>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Practicar</h1>
          <p className="mt-1 text-muted-foreground">
            Resuelve ejercicios y observa cómo evoluciona tu dominio.
          </p>
        </header>

        {context ? (
          <PracticeSession context={context} />
        ) : (
          <p className="text-muted-foreground">No hay ejercicios disponibles todavía.</p>
        )}
      </main>
    </StudentShell>
  );
}
