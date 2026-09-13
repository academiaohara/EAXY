"use client";

import { useState } from "react";
import Link from "next/link";
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
        <Link
          href="/"
          className="inline-block font-display text-lg font-semibold tracking-tight text-ink"
        >
          Eaxy
        </Link>
        <p className="text-sm text-ink-muted">Gestión de alumnos</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          {classroomName}
        </h1>
        <p className="text-ink-muted">
          Alta masiva de alumnos provisionados con usuario y contraseña generados automáticamente.
        </p>
      </header>

      <Tabs defaultValue="alta" className="no-print">
        <TabsList>
          <TabsTrigger value="alta">Alta masiva</TabsTrigger>
          <TabsTrigger value="listado">Listado de alumnos</TabsTrigger>
        </TabsList>

        <TabsContent value="alta" className="space-y-8 pt-4">
          <section className="rounded-lg border border-border bg-paper-raised p-6">
            <h2 className="mb-4 font-display text-lg font-medium text-ink">Nuevos alumnos</h2>
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
          <section className="rounded-lg border border-border bg-paper-raised p-6">
            <h2 className="mb-4 font-display text-lg font-medium text-ink">Alumnos del aula</h2>
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
