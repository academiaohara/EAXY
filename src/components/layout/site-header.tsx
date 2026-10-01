import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";
import { signOut } from "@/lib/auth/adult-actions";
import { getSessionUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  variant?: "marketing" | "minimal";
};

const MARKETING_LINKS = [
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#cursos", label: "Cursos" },
  { href: "/#preguntas", label: "Preguntas" },
] as const;

export async function SiteHeader({ variant = "marketing" }: SiteHeaderProps) {
  const user = await getSessionUser();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-paper/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <BrandLogo />

        {variant === "marketing" ? (
          <nav className="hidden items-center gap-1 md:flex" aria-label="Secciones de la página">
            {MARKETING_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:bg-paper-raised hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <form action={signOut}>
                <Button type="submit" variant="ghost" size="sm">
                  Salir
                </Button>
              </form>
              <Button size="sm" nativeButton={false} render={<Link href="/aprender" />}>
                Ir a Aprender
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />}>
                Entrar
              </Button>
              <Button size="sm" nativeButton={false} render={<Link href="/aprender" />}>
                Empezar gratis
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
