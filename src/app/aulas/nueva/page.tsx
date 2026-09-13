import Link from "next/link";
import { CreateClassroomForm } from "@/components/classroom/create-classroom-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NuevaAulaPage() {
  return (
    <div className="mx-auto w-full max-w-xl space-y-6 px-4 py-8 sm:px-6">
      <div className="space-y-2">
        <Link href="/aulas" className="text-sm text-ink-muted transition-colors hover:text-cobalt">
          ← Volver a mis aulas
        </Link>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Nueva aula</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Datos del aula</CardTitle>
          <CardDescription>
            Tras crear el aula podrás dar de alta alumnos con usuario y contraseña generados
            automáticamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateClassroomForm />
        </CardContent>
      </Card>
    </div>
  );
}
