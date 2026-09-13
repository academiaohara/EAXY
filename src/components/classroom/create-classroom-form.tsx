"use client";

import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { createClassroom } from "@/lib/classrooms/list-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateClassroomForm() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      const result = await createClassroom(name);
      if (result?.error) {
        setErrorMessage(result.error);
      }
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="classroom-name">Nombre del aula</Label>
        <Input
          id="classroom-name"
          placeholder="p. ej. 2º A Matemáticas"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={isPending}
          required
        />
      </div>

      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2Icon className="animate-spin" data-icon="inline-start" />
            Creando...
          </>
        ) : (
          "Crear aula"
        )}
      </Button>
    </form>
  );
}
