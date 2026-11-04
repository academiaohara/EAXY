import Link from "next/link";
import { AppNav } from "@/components/layout/app-nav";
import { BrandLogo } from "@/components/layout/brand-logo";
import { signOut } from "@/lib/auth/adult-actions";
import { getSessionUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  variant?: "marketing" | "minimal";
};

export async function SiteHeader({ variant = "marketing" }: SiteHeaderProps) {
  const user = await getSessionUser();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-paper-raised/82 backdrop-blur-xl">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:gap-5">
        <BrandLogo className="justify-self-start" />

        {variant === "marketing" ? <AppNav /> : null}

        <div className="flex items-center justify-self-end gap-2">
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
