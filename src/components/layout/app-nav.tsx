"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  APP_DESTINATIONS,
  getActiveAppDestination,
} from "@/lib/navigation/app-destinations";
import { cn } from "@/lib/utils";

export function AppNav() {
  const active = getActiveAppDestination(usePathname());

  return (
    <nav
      className="flex items-center gap-0.5 rounded-full border border-border/80 bg-white/55 p-1 shadow-[0_8px_24px_-20px_rgb(25_58_50/0.45)] backdrop-blur"
      aria-label="Navegación principal"
      data-testid="app-nav"
    >
      {APP_DESTINATIONS.map((destination) => {
        const isActive = active === destination.key;
        return (
          <Link
            key={destination.key}
            href={destination.href}
            aria-current={isActive ? "page" : undefined}
            data-testid={`app-nav-${destination.key}`}
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1.5 text-[13px] font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-raised lg:px-3.5 lg:text-sm",
              isActive
                ? "bg-ink text-white shadow-sm"
                : "text-ink-muted hover:bg-white/80 hover:text-ink",
            )}
          >
            {destination.label}
          </Link>
        );
      })}
    </nav>
  );
}
