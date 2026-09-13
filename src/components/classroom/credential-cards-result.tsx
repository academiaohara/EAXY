"use client";

import { AlertTriangleIcon, DownloadIcon, PrinterIcon } from "lucide-react";
import { StudentCredentialCard } from "@/components/classroom/student-credential-card";
import { Button } from "@/components/ui/button";
import { downloadCredentialsCsv } from "@/lib/classrooms/export-credentials";
import type { ProvisionFailure, ProvisionedStudent } from "@/lib/classrooms/types";

type CredentialCardsResultProps = {
  succeeded: ProvisionedStudent[];
  failed: ProvisionFailure[];
};

export function CredentialCardsResult({ succeeded, failed }: CredentialCardsResultProps) {
  if (succeeded.length === 0 && failed.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6" data-testid="credential-cards-result">
      {succeeded.length > 0 && (
        <div className="space-y-4">
          <div
            className="no-print rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"
            role="alert"
          >
            <div className="flex gap-2">
              <AlertTriangleIcon className="mt-0.5 size-4 shrink-0" />
              <p>
                Guarda o imprime estas tarjetas ahora. Podrás volver a consultar cada
                contraseña individualmente desde el listado de alumnos, pero no se volverán
                a mostrar todas juntas así por seguridad.
              </p>
            </div>
          </div>

          <div className="no-print flex flex-wrap gap-2">
            <Button type="button" onClick={() => window.print()} data-testid="print-cards-button">
              <PrinterIcon data-icon="inline-start" />
              Imprimir tarjetas
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => downloadCredentialsCsv(succeeded)}
              data-testid="export-csv-button"
            >
              <DownloadIcon data-icon="inline-start" />
              Exportar CSV
            </Button>
          </div>

          <div
            className="print-area grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-testid="credential-cards-grid"
          >
            {succeeded.map((student) => (
              <StudentCredentialCard key={`${student.username}-${student.displayName}`} {...student} />
            ))}
          </div>
        </div>
      )}

      {failed.length > 0 && (
        <div className="no-print space-y-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <h3 className="font-medium text-destructive">
            Alumnos que no se pudieron crear ({failed.length})
          </h3>
          <ul className="space-y-2 text-sm" data-testid="provision-failures-list">
            {failed.map((failure) => (
              <li
                key={`${failure.displayName}-${failure.reason}`}
                className="rounded-md border border-destructive/20 bg-background px-3 py-2"
              >
                <span className="font-medium">{failure.displayName}</span>
                <span className="text-muted-foreground"> — {failure.reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
