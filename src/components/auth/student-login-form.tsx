"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { signInStudent } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function StudentLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      const result = await signInStudent(username, password);

      if (result?.error) {
        setErrorMessage(result.error);
      }
    });
  }

  return (
    <div className="mx-auto w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Entrar</h1>
        <p className="text-sm text-ink-muted">
          Accede con el usuario y la contraseña que te dio tu profesor.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="username">Usuario</Label>
          <Input
            id="username"
            name="username"
            autoComplete="username"
            data-testid="student-login-username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            data-testid="student-login-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isPending}
            required
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-destructive" role="alert" data-testid="student-login-error">
            {errorMessage}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending} data-testid="student-login-submit">
          {isPending ? (
            <>
              <Loader2Icon className="animate-spin" data-icon="inline-start" />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-ink-muted">
        ¿Eres profesor o quieres aprender por tu cuenta?{" "}
        <Link href="/login" className="font-medium text-cobalt underline-offset-4 hover:underline">
          Entra con email o Google
        </Link>
      </p>
    </div>
  );
}
