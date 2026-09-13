"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CredentialCardsResult } from "@/components/classroom/credential-cards-result";
import { ProvisionForm } from "@/components/classroom/provision-form";
import { StudentsTable } from "@/components/classroom/students-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ClassroomStudent, ProvisionStudentsResult } from "@/lib/classrooms/types";

type AlumnosPageProps = {
  classroomId: string;
  classroomName: string;
  initialStudents: ClassroomStudent[];
};

export function AlumnosPage({
  classroomId,
  classroomName,
  initialStudents,
}: AlumnosPageProps) {
  const router = useRouter();
  const [provisionResult, setProvisionResult] = useState<ProvisionStudentsResult | null>(
    null,
  );

  function handleProvisioned(result: ProvisionStudentsResult) {
    setProvisionResult(result);

    if (result.succeeded.length > 0) {
      router.refresh();
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
      <header className="no-print space-y-2">
        <p className="text-sm text-muted-foreground">Gestión de alumnos</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{classroomName}</h1>
        <p className="text-muted-foreground">
          Alta masiva de alumnos provisionados con usuario y contraseña generados automáticamente.
        </p>
      </header>

      <Tabs defaultValue="alta" className="no-print">
        <TabsList>
          <TabsTrigger value="alta">Alta masiva</TabsTrigger>
          <TabsTrigger value="listado">Listado de alumnos</TabsTrigger>
        </TabsList>

        <TabsContent value="alta" className="space-y-8 pt-4">
          <section className="rounded-xl border bg-card p-6">
            <h2 className="mb-4 text-lg font-medium">Nuevos alumnos</h2>
            <ProvisionForm classroomId={classroomId} onProvisioned={handleProvisioned} />
          </section>

          {provisionResult && (
            <CredentialCardsResult
              succeeded={provisionResult.succeeded}
              failed={provisionResult.failed}
            />
          )}
        </TabsContent>

        <TabsContent value="listado" className="pt-4">
          <section className="rounded-xl border bg-card p-6">
            <h2 className="mb-4 text-lg font-medium">Alumnos del aula</h2>
            <StudentsTable
              students={initialStudents}
              onStudentUpdated={() => router.refresh()}
            />
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
