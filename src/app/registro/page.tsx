import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegistroPage() {
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
          Crear cuenta
        </h1>
        <p className="text-sm text-ink-muted">
          El registro público para aprendizaje personal estará disponible pronto. Si eres alumno de
          un aula, entra con el usuario y contraseña que te dio tu profesor.
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
