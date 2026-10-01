"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTION_ICONS } from "@/components/layout/section-icons";
import { APP_SECTIONS, getActiveSection } from "@/lib/navigation/sections";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/aprender/leccion-interactiva")) {
    return null;
  }

  const active = getActiveSection(pathname);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-paper-raised/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      aria-label="Navegación móvil"
      data-testid="mobile-nav"
    >
      <div className="mx-auto flex max-w-lg px-2">
        {APP_SECTIONS.map((section) => {
          const Icon = SECTION_ICONS[section.key];
          const isActive = active === section.key;

          return (
            <Link
              key={section.key}
              href={section.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-[11px] font-semibold transition-colors",
                isActive ? "text-cobalt" : "text-ink-muted",
              )}
              data-testid={`mobile-nav-${section.key}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={cn(
                  "flex h-7 w-12 items-center justify-center rounded-full transition-colors",
                  isActive && "bg-cobalt-tint",
                )}
              >
                <Icon className="size-[18px]" aria-hidden />
              </span>
              {section.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
