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

export function SubjectHero({ subject, courseCount, lessonCount }: SubjectHeroProps) {
  const theme = SUBJECT_THEME[subject.key];
  const Icon = SUBJECT_ICONS[subject.key];

  return (
    <div className="space-y-5">
      <Breadcrumbs
        items={[{ label: "Aprender", href: APRENDER_HOME_HREF }, { label: subject.label }]}
      />
      <section
        className={cn(
          "relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-lg sm:p-8",
          theme.gradient,
        )}
        data-testid="subject-hero"
      >
        <span
          className="pointer-events-none absolute -bottom-10 right-6 select-none font-mono text-[11rem] leading-none text-white/10"
          aria-hidden
        >
          {subject.glyph}
        </span>
        <div className="relative flex items-start gap-5">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
            <Icon className="size-7" aria-hidden />
          </span>
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">Materia</p>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {subject.label}
            </h1>
            <p className="max-w-xl text-white/85">{subject.description}</p>
            <p className="pt-1 text-sm font-medium text-white/75">
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
