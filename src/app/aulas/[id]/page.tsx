import Link from "next/link";
import { notFound } from "next/navigation";
import { MasteryBadge } from "@/components/learning/mastery-badge";
import { getClassroomDashboard } from "@/lib/classrooms/list-actions";
import { AuthorizationError } from "@/lib/classrooms/errors";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AulaDashboardPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AulaDashboardPage({ params }: AulaDashboardPageProps) {
  const { id } = await params;

  let dashboard;
  try {
    dashboard = await getClassroomDashboard(id);
  } catch (error) {
    if (error instanceof AuthorizationError) {
      notFound();
    }
    throw error;
  }

  const conceptColumns = dashboard.students[0]?.concepts ?? [];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <Link href="/aulas" className="text-sm text-ink-muted transition-colors hover:text-cobalt">
            ← Mis aulas
          </Link>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
            {dashboard.classroomName}
          </h1>
          <p className="text-ink-muted">
            Progreso global de tus alumnos por concepto del curso.
          </p>
        </div>
        <Link href={`/aulas/${id}/alumnos`}>
          <Button>Gestionar alumnos</Button>
        </Link>
      </div>

      {dashboard.students.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-10 text-center">
          <p className="text-ink-muted">Todavía no hay alumnos en esta aula.</p>
          <Link href={`/aulas/${id}/alumnos`} className="mt-4 inline-block">
            <Button>Dar de alta alumnos</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-paper-raised">Alumno</TableHead>
                {conceptColumns.slice(0, 6).map((concept) => (
                  <TableHead key={concept.conceptSlug} className="min-w-32 text-xs">
                    {concept.conceptTitle}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboard.students.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell className="sticky left-0 bg-paper-raised font-medium">
                    <div>{student.displayName}</div>
                    <div className="text-xs text-ink-muted">{student.username}</div>
                  </TableCell>
                  {student.concepts.slice(0, 6).map((concept) => (
                    <TableCell key={concept.conceptSlug}>
                      <MasteryBadge
                        mastery={concept.mastery}
                        attemptCount={concept.attemptCount || (concept.mastery > 0 ? 1 : 0)}
                        showPercent
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
