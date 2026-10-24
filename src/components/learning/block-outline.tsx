"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowUpRightIcon } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LessonPathNode } from "@/components/learning/lesson-path-node";
import { SubjectViewTabs } from "@/components/learning/subject-view-tabs";
import { TopicExercisesSection } from "@/components/learning/topic-exercises-section";
import type { BlockOutline } from "@/lib/curriculum/blocks";
import { findNextLesson, getCourseProgress } from "@/lib/curriculum/course-progress";
import { applyLocalProgressToModules } from "@/lib/local-progress/storage";
import { useLocalProgress } from "@/lib/local-progress/use-local-progress";
import {
  APRENDER_HOME_HREF,
  courseHref,
  courseShortTitle,
  subjectBlocksHref,
  topicHref,
} from "@/lib/navigation/learning-trail";
import { SUBJECT_THEME, type Subject } from "@/lib/navigation/subjects";
import { cn } from "@/lib/utils";

type BlockOutlineViewProps = {
  subject: Subject;
  outline: BlockOutline;
  /** Si false, no mezcla progreso del navegador (usuario con sesión). */
  mergeLocalProgress?: boolean;
};

export function BlockOutlineView({
  subject,
  outline,
  mergeLocalProgress = true,
}: BlockOutlineViewProps) {
  const theme = SUBJECT_THEME[subject.key];
  const localStore = useLocalProgress();

  const sections = useMemo(
    () =>
      outline.sections.map((section) => ({
        ...section,
        modules: mergeLocalProgress
          ? applyLocalProgressToModules(section.modules, localStore)
          : section.modules,
      })),
    [mergeLocalProgress, localStore, outline.sections],
  );

  const allModules = sections.flatMap((section) => section.modules);
  const { totalLessons, completedLessons, percent } = getCourseProgress(allModules);
  const nextLessonId = findNextLesson(allModules)?.lesson.id;
  const exercises = allModules.flatMap((courseModule) => courseModule.topicExercises);
  const { block } = outline;

  return (
    <div className="flex w-full flex-col gap-8" data-testid="block-outline">
      <div className="space-y-5">
        <Breadcrumbs
          items={[
            { label: "Aprender", href: APRENDER_HOME_HREF },
            { label: subject.label, href: subject.href },
            { label: "Por contenido", href: subjectBlocksHref(subject.key) },
            { label: block.title },
          ]}
        />
        <SubjectViewTabs subject={subject} active="contenido" />
      </div>

      <section
        className={cn(
          "relative overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-lg sm:p-8",
          theme.gradient,
        )}
        data-testid="block-hero"
      >
        <div className="relative space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/75">
            Contenido · {subject.label}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {block.title}
          </h1>
          <p className="max-w-2xl text-white/85">{block.description}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-sm font-medium text-white/80">
            <span>
              {sections.length} {sections.length === 1 ? "curso" : "cursos"} · {totalLessons}{" "}
              {totalLessons === 1 ? "lección" : "lecciones"}
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="h-1.5 w-28 overflow-hidden rounded-full bg-white/25"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Progreso en ${block.title}`}
              >
                <span
                  className="block h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </span>
              <span className="tabular-nums">
                {completedLessons}/{totalLessons}
              </span>
            </span>
          </div>
        </div>
      </section>

      <div className="space-y-10" data-testid="block-courses">
        {sections.map((section) => (
          <section
            key={section.course.id}
            className="grid gap-4 lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:gap-8"
            data-testid={`block-course-${section.course.slug}`}
          >
            <div className="lg:sticky lg:top-6 lg:self-start">
              <Link
                href={courseHref(section.course.slug)}
                className={cn(
                  "group inline-flex items-center gap-1.5 rounded-2xl px-4 py-2 font-display text-lg font-extrabold outline-none ring-1 transition-colors focus-visible:ring-2",
                  theme.badge,
                  theme.ring,
                )}
                title={`Ir al curso: ${section.course.title}`}
              >
                {courseShortTitle(section.course.title)}
                <ArrowUpRightIcon
                  className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
              </Link>
            </div>

            <div className="min-w-0 space-y-6">
              {section.modules.map((courseModule) => (
                <div key={courseModule.id} className="space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-2">
                    <h2 className="font-heading text-lg font-semibold text-ink">
                      {courseModule.title}
                    </h2>
                    <Link
                      href={topicHref(section.course.slug, courseModule.slug)}
                      className="text-xs font-semibold text-cobalt hover:underline"
                    >
                      Ver el tema completo
                    </Link>
                  </div>
                  {courseModule.lessons.length > 0 ? (
                    <ol className="relative min-w-0 space-y-3">
                      {courseModule.lessons.map((lesson, index) => (
                        <LessonPathNode
                          key={lesson.id}
                          lesson={lesson}
                          position={index + 1}
                          isLast={index === courseModule.lessons.length - 1}
                          isNextTarget={lesson.id === nextLessonId}
                        />
                      ))}
                    </ol>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <TopicExercisesSection moduleTitle={block.title} exercises={exercises} layout="full" />
    </div>
  );
}
