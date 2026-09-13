import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedUserId } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";

export default async function AprenderPage() {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/entrar");
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Aprender</h1>
        <p className="text-muted-foreground">
          Tu espacio de aprendizaje personal. Practica ejercicios adaptados a tu nivel.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/curso">
          <Button size="lg" variant="outline" data-testid="aprender-curso-link">
            Ver curso
          </Button>
        </Link>
        <Link href="/practicar">
          <Button size="lg" data-testid="aprender-practicar-link">
            Empezar a practicar
          </Button>
        </Link>
      </div>
    </main>
  );
}
