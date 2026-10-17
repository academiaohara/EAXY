import Link from "next/link";
import { LogOutIcon, UserRoundIcon } from "lucide-react";
import { AppNav } from "@/components/layout/app-nav";
import { BrandLogo } from "@/components/layout/brand-logo";
import { GuestProgressBanner } from "@/components/layout/guest-progress-banner";
import { signOut } from "@/lib/auth/adult-actions";
import { getSessionUser } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";

type AppShellProps = {
  children: React.ReactNode;
};

function initials(name: string): string {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

export async function AppShell({ children }: AppShellProps) {
  const user = await getSessionUser();
  const isGuest = !user;

  const appChromeHeight = isGuest ? "6.25rem" : "4rem";

  return (
    <div
      className="flex min-h-dvh flex-col bg-app-glow [&:has([data-testid=interactive-lesson-layout])]:[--app-chrome-h:0px] [&:has([data-testid=interactive-lesson-layout])_[data-app-chrome]]:hidden"
      style={{ "--app-chrome-h": appChromeHeight } as React.CSSProperties}
    >
      <div className="sticky top-0 z-30" data-app-chrome>
        {isGuest ? <GuestProgressBanner /> : null}
        <header className="border-b border-border/80 bg-paper-raised/75 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] gap-4 px-4 sm:px-6">
            <BrandLogo className="justify-self-start" />

            <AppNav />

            <div className="flex items-center justify-self-end gap-2 sm:gap-3">
              {user ? (
                <>
                  <Link
                    href="/perfil"
                    data-testid="app-profile-link"
                    aria-label="Tu perfil y progreso"
                    className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 outline-none transition-colors hover:bg-cobalt-tint focus-visible:ring-2 focus-visible:ring-cobalt/40 lg:pr-3"
                  >
                    <span
                      className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-cobalt-tint to-violet-100 text-xs font-bold text-cobalt ring-1 ring-cobalt/15"
                      aria-hidden
                    >
                      {initials(user.displayName)}
                    </span>
                    <span className="hidden text-sm font-medium text-ink lg:block">{user.displayName}</span>
                  </Link>
                  <form action={signOut}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="text-ink-muted"
                      aria-label="Cerrar sesión"
                    >
                      <LogOutIcon aria-hidden />
                      <span className="hidden sm:inline">Salir</span>
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/perfil"
                    data-testid="app-profile-link"
                    aria-label="Mi progreso"
                    title="Mi progreso"
                    className="flex size-8 items-center justify-center rounded-full text-ink-muted outline-none transition-colors hover:bg-cobalt-tint hover:text-cobalt focus-visible:ring-2 focus-visible:ring-cobalt/40"
                  >
                    <UserRoundIcon className="size-[18px]" aria-hidden />
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    nativeButton={false}
                    render={<Link href="/login" />}
                  >
                    Entrar
                  </Button>
                  <Button
                    size="sm"
                    nativeButton={false}
                    className="hidden sm:inline-flex"
                    render={<Link href="/registro" />}
                  >
                    Crear cuenta
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>
      </div>

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden [&:has([data-testid=interactive-lesson-layout])]:pb-0">
        {children}
      </main>
    </div>
  );
}
