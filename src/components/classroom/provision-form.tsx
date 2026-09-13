"use client";

import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { provisionStudents } from "@/lib/classrooms/actions";
import type { ProvisionStudentsResult } from "@/lib/classrooms/types";

type ProvisionFormProps = {
  classroomId: string;
  onProvisioned: (result: ProvisionStudentsResult) => void;
};

export function ProvisionForm({ classroomId, onProvisioned }: ProvisionFormProps) {
  const [namesText, setNamesText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const studentNames = namesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (studentNames.length === 0) {
      setErrorMessage("Introduce al menos un nombre de alumno.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await provisionStudents(classroomId, studentNames);
        onProvisioned(result);
        setNamesText("");
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "No se pudieron generar los accesos.",
        );
      }
    });
  }

  return (
    <form className="no-print space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="student-names">Lista de alumnos</Label>
        <Textarea
          id="student-names"
          data-testid="student-names-input"
          placeholder="Escribe un nombre por línea, por ejemplo:&#10;Ana García&#10;Luis Martínez"
          rows={8}
          value={namesText}
          onChange={(event) => setNamesText(event.target.value)}
          disabled={isPending}
        />
        <p className="text-sm text-muted-foreground">Un nombre por línea.</p>
      </div>

      {errorMessage && (
        <p className="text-sm text-destructive" role="alert">{errorMessage}</p>
      )}

      <Button type="submit" disabled={isPending} data-testid="provision-submit-button">
        {isPending ? (
          <>
            <Loader2Icon className="animate-spin" data-icon="inline-start" />
            Generando accesos...
          </>
        ) : (
          "Generar accesos"
        )}
      </Button>
    </form>
  );
}
