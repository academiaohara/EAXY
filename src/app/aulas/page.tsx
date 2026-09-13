import Link from "next/link";
import { PlusIcon, UsersIcon } from "lucide-react";
import { listMyClassrooms } from "@/lib/classrooms/list-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AulasPage() {
  const classrooms = await listMyClassrooms();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Mis aulas</h1>
          <p className="text-ink-muted">
            Gestiona tus grupos, da de alta alumnos y consulta su progreso por concepto.
          </p>
        </div>
        <Link href="/aulas/nueva">
          <Button>
            <PlusIcon data-icon="inline-start" />
            Nueva aula
          </Button>
        </Link>
      </div>

      {classrooms.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-start gap-4 py-10">
            <UsersIcon className="size-8 text-cobalt" aria-hidden />
            <div>
              <p className="font-medium text-ink">Todavía no tienes aulas</p>
              <p className="mt-1 text-sm text-ink-muted">
                Crea tu primera aula para dar de alta alumnos con credenciales automáticas.
              </p>
            </div>
            <Link href="/aulas/nueva">
              <Button>Crear aula</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {classrooms.map((classroom) => (
            <Card key={classroom.id} className="transition-colors hover:border-cobalt/30">
              <CardHeader>
                <CardTitle className="font-display">{classroom.name}</CardTitle>
                <CardDescription>
                  {classroom.role === "teacher" ? "Como profesor" : "Como alumno"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {classroom.role === "teacher" && (
                  <>
                    <Link href={`/aulas/${classroom.id}`}>
                      <Button variant="outline" size="sm">
                        Ver aula
                      </Button>
                    </Link>
                    <Link href={`/aulas/${classroom.id}/alumnos`}>
                      <Button size="sm">Gestionar alumnos</Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
