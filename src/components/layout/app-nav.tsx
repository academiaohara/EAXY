"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SECTION_ICONS } from "@/components/layout/section-icons";
import { APP_SECTIONS, getActiveSection } from "@/lib/navigation/sections";
import { cn } from "@/lib/utils";

export function AppNav() {
  const active = getActiveSection(usePathname());

  return (
    <nav
      className="flex items-center gap-1 rounded-full border border-border bg-paper/70 p-1"
      aria-label="Secciones principales"
      data-testid="app-nav"
    >
      {APP_SECTIONS.map((section) => {
        const Icon = SECTION_ICONS[section.key];
        const isActive = active === section.key;
        return (
          <Link
            key={section.key}
            href={section.href}
            title={section.description}
            aria-current={isActive ? "page" : undefined}
            data-testid={`app-nav-${section.key}`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40",
              isActive
                ? "bg-paper-raised text-cobalt shadow-sm ring-1 ring-border"
                : "text-ink-muted hover:text-ink",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
