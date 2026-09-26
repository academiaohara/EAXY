import Link from "next/link";
import { BookOpenIcon, GraduationCapIcon, LineChartIcon, UsersIcon } from "lucide-react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { signOut } from "@/lib/auth/adult-actions";
import { getSessionUser } from "@/lib/auth/session";
import { isContentPreviewModeEnabled } from "@/lib/content-preview/mode";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
  active?: "aprender" | "progreso" | "aulas";
};

const navItems = [
  { href: "/aprender", label: "Aprender", icon: BookOpenIcon, key: "aprender" as const },
  { href: "/progreso", label: "Progreso", icon: LineChartIcon, key: "progreso" as const },
  { href: "/aulas", label: "Aulas", icon: UsersIcon, key: "aulas" as const, teacherOnly: true },
];

export async function AppShell({ children, active = "aprender" }: AppShellProps) {
  const user = await getSessionUser();
  const previewMode = isContentPreviewModeEnabled();

  const appChromeHeight = previewMode ? "7.25rem" : "3.5rem";

  return (
    <div
      className="flex min-h-dvh flex-col [&:has([data-testid=interactive-lesson-layout])]:[--app-chrome-h:0px] [&:has([data-testid=interactive-lesson-layout])_[data-app-chrome]]:hidden"
      style={{ "--app-chrome-h": appChromeHeight } as React.CSSProperties}
    >
      {previewMode ? (
        <div
          className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950"
          data-app-chrome
        >
          Modo previsualización: acceso abierto al catálogo local. El registro se activará más
          adelante.
        </div>
      ) : null}
      <header
        className="border-b border-border bg-paper-raised/80 backdrop-blur-sm"
        data-app-chrome
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-6">
            <Link
              href="/aprender"
              className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink"
            >
              <GraduationCapIcon className="size-5 text-cobalt" aria-hidden />
              Eaxy
            </Link>

            <nav className="hidden items-center gap-1 sm:flex">
              {navItems
                .filter((item) => !item.teacherOnly || user?.isTeacher)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.key;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-cobalt-tint text-cobalt"
                          : "text-ink-muted hover:bg-cobalt-tint/60 hover:text-ink",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                      {item.label}
                    </Link>
                  );
                })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <p className="hidden text-sm text-ink-muted sm:block">
                Hola, <span className="font-medium text-ink">{user.displayName}</span>
              </p>
            )}
            {!previewMode ? (
              <form action={signOut}>
                <Button type="submit" variant="ghost" size="sm">
                  Salir
                </Button>
              </form>
            ) : null}
          </div>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden pb-16 sm:pb-0 [&:has([data-testid=interactive-lesson-layout])]:pb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
