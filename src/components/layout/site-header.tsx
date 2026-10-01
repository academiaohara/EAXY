import Link from "next/link";
import { signOut } from "@/lib/auth/adult-actions";
import { getSessionUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  variant?: "marketing" | "minimal";
};

export async function SiteHeader({ variant = "marketing" }: SiteHeaderProps) {
  const user = await getSessionUser();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Eaxy
        </Link>

        <nav className="flex items-center gap-3 sm:gap-4">
          {variant === "marketing" && (
            <Link
              href="#como-funciona"
              className="hidden text-sm font-medium text-ink-muted transition-colors hover:text-cobalt sm:inline"
            >
              Cómo funciona
            </Link>
          )}

          {user ? (
            <>
              <Link
                href="/aprender"
                className="text-sm font-medium text-ink-muted transition-colors hover:text-cobalt"
              >
                Aprender
              </Link>
              <form action={signOut}>
                <Button type="submit" variant="outline" size="sm">
                  Salir
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/aprender" className="text-sm font-medium text-ink-muted hover:text-cobalt">
                Explorar sin cuenta
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link href="/registro" className="hidden sm:inline-flex">
                <Button size="sm">Crear cuenta</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
