"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUBJECT_ICONS } from "@/components/layout/subject-icons";
import { SUBJECTS, getActiveSubject } from "@/lib/navigation/subjects";
import { cn } from "@/lib/utils";

export function AppNav() {
  const active = getActiveSubject(usePathname());

  return (
    <nav
      className="flex items-center gap-1 rounded-full border border-border bg-paper/70 p-1"
      aria-label="Materias"
      data-testid="app-nav"
    >
      {SUBJECTS.map((subject) => {
        const Icon = SUBJECT_ICONS[subject.key];
        const isActive = active === subject.key;
        return (
          <Link
            key={subject.key}
            href={subject.href}
            title={subject.tagline}
            aria-current={isActive ? "page" : undefined}
            data-testid={`app-nav-${subject.key}`}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40",
              isActive
                ? "bg-paper-raised text-cobalt shadow-sm ring-1 ring-border"
                : "text-ink-muted hover:text-ink",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {subject.label}
          </Link>
        );
      })}
    </nav>
  );
}
