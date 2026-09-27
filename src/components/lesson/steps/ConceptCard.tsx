"use client";

import { AlertTriangleIcon, SparklesIcon } from "lucide-react";
import { useLessonTutor } from "@/components/lesson/LessonTutorContext";
import { MathBlockList, MathRenderer } from "@/components/lesson/MathRenderer";
import { LessonVisualView } from "@/components/lesson/visuals/LessonVisualView";
import { findConceptForTerm } from "@/lib/lesson/concept-glossary";
import { TUTOR_NICKNAME } from "@/lib/tutor/identity";
import { cn } from "@/lib/utils";
import type { LessonStepBase } from "@/lib/lesson/types";

type ConceptCardProps = Pick<LessonStepBase, "title" | "content" | "math" | "warning" | "visuals"> & {
  compact?: boolean;
  showTitle?: boolean;
  /** En pantallas anchas coloca la teoría a un lado y fórmulas y ayudas visuales al otro. */
  split?: boolean;
};

function conceptIdForTerm(term: string): string | undefined {
  return findConceptForTerm(term)?.id;
}

function hasExplainableTerm(paragraphs: string[]): boolean {
  return paragraphs.some((paragraph) =>
    [...paragraph.matchAll(/\*\*([^*]+)\*\*/g)].some((match) => conceptIdForTerm(match[1])),
  );
}

/**
 * Contenedor de la explicación: las ideas entran una tras otra, los términos
 * resaltados se pueden pulsar para que el tutor los explique y las fórmulas y
 * ayudas visuales van en su propia columna.
 */
export function ConceptCard({
  title,
  content,
  math,
  warning,
  visuals,
  compact = false,
  showTitle = true,
  split = false,
}: ConceptCardProps) {
  const tutor = useLessonTutor();
  const paragraphs = content ?? [];
  const hasMath = Boolean(math && math.length > 0);
  const hasVisuals = Boolean(visuals && visuals.length > 0);
  const hasAside = hasMath || hasVisuals;
  const isSplit = split && hasAside && paragraphs.length > 0;
  const numbered = paragraphs.length > 1;
  const lookup = tutor ? conceptIdForTerm : undefined;
  const showTermHint = Boolean(tutor) && hasExplainableTerm([...paragraphs, warning ?? ""]);

  function askFrom(target: EventTarget | null) {
    if (!tutor || !(target instanceof Element)) {
      return false;
    }
    const term = target.closest<HTMLElement>("strong[data-concept]");
    if (!term?.dataset.concept) {
      return false;
    }
    tutor.askAboutConcept(term.dataset.concept, term.textContent ?? "");
    return true;
  }

  return (
    <section
      className={cn(
        "lesson-theory rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 shadow-[0_1px_0_rgba(15,23,42,0.03)]",
        compact ? "p-4 sm:p-6" : "p-6 sm:p-8",
      )}
      onClick={(event) => askFrom(event.target)}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && askFrom(event.target)) {
          event.preventDefault();
        }
      }}
      data-testid="lesson-theory"
    >
      <div
        className={cn(
          isSplit ? "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start lg:gap-10" : "space-y-6",
        )}
      >
        {paragraphs.length > 0 || warning || showTitle ? (
          <div className="min-w-0 space-y-4">
            {showTitle ? (
              <h2 className="font-heading text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {title}
              </h2>
            ) : null}

            {paragraphs.length > 0 ? (
              <ol className={cn("relative", numbered ? "space-y-4" : "space-y-3")}>
                {numbered ? (
                  <span
                    className="absolute bottom-3 left-[0.8125rem] top-3 w-px bg-gradient-to-b from-cobalt/40 via-cobalt/15 to-transparent"
                    aria-hidden
                  />
                ) : null}
                {paragraphs.map((paragraph, index) => (
                  <li
                    key={paragraph}
                    className={cn("lesson-idea-enter relative", numbered && "flex gap-3.5")}
                    style={{ animationDelay: `${120 + index * 140}ms` }}
                    data-testid="lesson-theory-idea"
                  >
                    {numbered ? (
                      <span
                        className="relative z-10 mt-0.5 flex size-[1.625rem] shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-cobalt ring-2 ring-cobalt/25"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                    ) : null}
                    <p
                      className={cn(
                        "min-w-0 text-ink",
                        compact
                          ? "text-[0.9375rem] leading-relaxed sm:text-base xl:text-[1.0625rem]"
                          : "text-base leading-relaxed sm:text-lg",
                      )}
                    >
                      <MathRenderer text={paragraph} conceptLookup={lookup} />
                    </p>
                  </li>
                ))}
              </ol>
            ) : null}

            {warning ? (
              <div
                className="lesson-idea-enter flex gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
                style={{ animationDelay: `${160 + paragraphs.length * 140}ms` }}
                data-testid="lesson-theory-warning"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <AlertTriangleIcon className="size-4" aria-hidden />
                </span>
                <p className="pt-1 leading-relaxed">
                  <MathRenderer text={warning} conceptLookup={lookup} />
                </p>
              </div>
            ) : null}

            {showTermHint ? (
              <p className="flex items-center gap-1.5 text-xs text-ink-muted" data-testid="lesson-theory-term-hint">
                <SparklesIcon className="size-3.5 text-cobalt" aria-hidden />
                Pulsa las palabras resaltadas y {TUTOR_NICKNAME} te las explica.
              </p>
            ) : null}
          </div>
        ) : null}

        {hasAside ? (
          <div className="min-w-0 space-y-4">
            {visuals?.map((visual, index) => (
              <div
                key={`${visual.kind}-${index}`}
                className="lesson-idea-enter rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
                style={{ animationDelay: `${200 + index * 180}ms` }}
              >
                <LessonVisualView visual={visual} />
              </div>
            ))}
            {hasMath ? (
              <div className="lesson-idea-enter" style={{ animationDelay: "240ms" }}>
                <MathBlockList blocks={math ?? []} className="bg-white/80" />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
