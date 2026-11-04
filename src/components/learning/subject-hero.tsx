import { SUBJECT_ICONS } from "@/components/layout/subject-icons";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { APRENDER_HOME_HREF } from "@/lib/navigation/learning-trail";
import { SUBJECT_THEME, type Subject } from "@/lib/navigation/subjects";
import { cn } from "@/lib/utils";

type SubjectHeroProps = {
  subject: Subject;
  courseCount: number;
  lessonCount: number;
};

export function SubjectHero({
  subject,
  courseCount,
  lessonCount,
}: SubjectHeroProps) {
  const theme = SUBJECT_THEME[subject.key];
  const Icon = SUBJECT_ICONS[subject.key];

  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[
          { label: "Aprender", href: APRENDER_HOME_HREF },
          { label: subject.label },
        ]}
      />
      <section
        className={cn(
          "relative overflow-hidden rounded-[2rem] border border-border bg-paper-raised p-6 shadow-[0_24px_60px_-44px_rgb(25_58_50/0.55)] sm:p-8",
          theme.hoverBorder,
        )}
        data-testid="subject-hero"
      >
        <span
          className={cn(
            "pointer-events-none absolute -bottom-10 right-6 select-none font-mono text-[11rem] leading-none opacity-[0.08]",
            theme.text,
          )}
          aria-hidden
        >
          {subject.glyph}
        </span>
        <div className="relative flex items-start gap-5">
          <span
            className={cn(
              "flex size-14 shrink-0 items-center justify-center rounded-2xl",
              theme.badge,
            )}
          >
            <Icon className="size-7" aria-hidden />
          </span>
          <div className="space-y-2">
            <p
              className={cn(
                "text-xs font-bold uppercase tracking-[0.14em]",
                theme.text,
              )}
            >
              Materia
            </p>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {subject.label}
            </h1>
            <p className="max-w-xl text-ink-muted">{subject.description}</p>
            <p className="pt-1 text-sm font-semibold text-ink-muted">
              {courseCount > 0
                ? `${courseCount} ${courseCount === 1 ? "curso disponible" : "cursos disponibles"} · ${lessonCount} ${lessonCount === 1 ? "lección" : "lecciones"}`
                : "Cursos en preparación"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
