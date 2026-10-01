"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { signInAdult, signInWithGoogle } from "@/lib/auth/adult-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdultLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    startTransition(async () => {
      const result = await signInAdult(email, password);
      if (result?.error) {
        setErrorMessage(result.error);
      }
    });
  }

  function handleGoogle() {
    startGoogleTransition(async () => {
      await signInWithGoogle();
    });
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Iniciar sesión</h1>
        <p className="text-sm text-ink-muted">
          Entra con email o Google para guardar tu progreso en la nube. También puedes{" "}
          <Link href="/aprender" className="font-medium text-cobalt underline-offset-4 hover:underline">
            usar Eaxy sin cuenta
          </Link>
          .
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isPending}
            required
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-paper-raised px-2 text-ink-muted">o</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={isGooglePending}
        onClick={handleGoogle}
      >
        Continuar con Google
      </Button>

      <p className="text-center text-sm text-ink-muted">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-medium text-cobalt underline-offset-4 hover:underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}
