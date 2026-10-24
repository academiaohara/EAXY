import Link from "next/link";
import { LayersIcon, SchoolIcon } from "lucide-react";
import { subjectBlocksHref } from "@/lib/navigation/learning-trail";
import { SUBJECT_THEME, type Subject } from "@/lib/navigation/subjects";
import { cn } from "@/lib/utils";

export type SubjectView = "cursos" | "contenido";

type SubjectViewTabsProps = {
  subject: Subject;
  active: SubjectView;
};

/** Cambia entre las dos formas de recorrer una asignatura: por curso o por contenido. */
export function SubjectViewTabs({ subject, active }: SubjectViewTabsProps) {
  const theme = SUBJECT_THEME[subject.key];
  const tabs = [
    { view: "cursos" as const, label: "Por curso", href: subject.href, Icon: SchoolIcon },
    {
      view: "contenido" as const,
      label: "Por contenido",
      href: subjectBlocksHref(subject.key),
      Icon: LayersIcon,
    },
  ];

  return (
    <nav
      aria-label={`Cómo recorrer ${subject.label}`}
      className="inline-flex w-fit gap-1 rounded-2xl border border-border bg-paper-raised p-1 shadow-xs"
      data-testid="subject-view-tabs"
    >
      {tabs.map(({ view, label, href, Icon }) => (
        <Link
          key={view}
          href={href}
          aria-current={view === active ? "page" : undefined}
          data-testid={`subject-view-tab-${view}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cobalt/40",
            view === active
              ? cn("bg-gradient-to-br text-white shadow-sm", theme.gradient)
              : "text-ink-muted hover:bg-paper hover:text-ink",
          )}
        >
          <Icon className="size-4" aria-hidden />
          {label}
        </Link>
      ))}
    </nav>
  );
}
