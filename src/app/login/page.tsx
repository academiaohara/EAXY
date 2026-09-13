import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <Link
        href="/"
        className="mb-8 font-display text-2xl font-semibold tracking-tight text-ink"
      >
        Eaxy
      </Link>
      <div className="w-full max-w-sm space-y-6 rounded-lg border border-border bg-paper-raised p-6 text-center">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Acceso docente
        </h1>
        <p className="text-sm text-ink-muted">
          El inicio de sesión con email y Google para adultos estará disponible pronto. Mientras
          tanto, los alumnos pueden entrar con sus credenciales de aula.
        </p>
        <div className="flex flex-col gap-2">
          <Link href="/entrar">
            <Button className="w-full">Entrar como alumno</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
