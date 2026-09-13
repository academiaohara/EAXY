"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenIcon, LineChartIcon, PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/aprender", label: "Aprender", icon: BookOpenIcon },
  { href: "/practicar", label: "Practicar", icon: PlayIcon },
  { href: "/progreso", label: "Progreso", icon: LineChartIcon },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-paper-raised/95 backdrop-blur-sm sm:hidden"
      aria-label="Navegación móvil"
      data-testid="mobile-nav"
    >
      <div className="mx-auto flex max-w-lg">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
                isActive ? "text-cobalt" : "text-ink-muted",
              )}
              data-testid={`mobile-nav-${item.href.slice(1)}`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="size-5" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
