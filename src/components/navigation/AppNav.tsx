"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { GamificationBar } from "./GamificationBar";

const NAV_ITEMS = [
  { href: "/", label: "Inicio", icon: "🏠" },
  { href: "/rutas", label: "Rutas", icon: "📚" },
] as const;

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="page-container mx-auto flex max-w-wide items-center gap-3 py-3 sm:gap-4 sm:py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-xl transition hover:opacity-90"
          aria-label="Eaxy — Inicio"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white sm:h-10 sm:w-10">
            E
          </span>
          <span className="hidden text-xl font-bold text-slate-900 sm:inline">
            Eaxy
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 sm:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive
                    ? "text-slate-900 underline decoration-2 underline-offset-8"
                    : "text-slate-500 hover:text-slate-700",
                )}
              >
                <span aria-hidden className="text-base">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <GamificationBar />
        </div>
      </div>
    </header>
  );
}
