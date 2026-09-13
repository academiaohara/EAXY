import Link from "next/link";
import { requireAuthenticatedUserOrRedirect } from "@/lib/auth/session";
import { getPracticeExerciseForStudent } from "@/lib/practice/queries";
import { PracticeSession } from "@/components/learning/practice-session";
import { Button } from "@/components/ui/button";

type PracticarPageProps = {
  searchParams: Promise<{ ejercicio?: string }>;
};

export default async function PracticarPage({ searchParams }: PracticarPageProps) {
  const studentId = await requireAuthenticatedUserOrRedirect();
  const { ejercicio } = await searchParams;
  const exercise = await getPracticeExerciseForStudent(studentId, ejercicio ?? null);

  if (!exercise) {
    return (
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-8">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Practicar</h1>
        <p className="text-muted-foreground">
          No hay ejercicios disponibles en este momento.
        </p>
        <Button type="button" variant="outline" asChild>
          <Link href="/aprender">Volver a Aprender</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col p-6 md:p-8">
      <PracticeSession exercise={exercise} />
    </main>
  );
}
