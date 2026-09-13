"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/aprender", label: "Aprender" },
  { href: "/practicar", label: "Practicar" },
  { href: "/progreso", label: "Progreso" },
] as const;

export function StudentNav() {
  const pathname = usePathname();

  return (
    <nav
      className="border-b border-border bg-paper-raised"
      aria-label="Navegación del estudiante"
      data-testid="student-nav"
    >
      <div className="mx-auto flex w-full max-w-3xl gap-1 px-4 sm:px-6">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b-2 px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-cobalt text-cobalt"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-ink"
              }`}
              data-testid={`student-nav-${item.href.slice(1)}`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
