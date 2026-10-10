"use client";

import { AlertTriangleIcon, SparklesIcon } from "lucide-react";
import { useLessonTutor } from "@/components/lesson/LessonTutorContext";
import { MathBlockList, MathRenderer } from "@/components/lesson/MathRenderer";
import { LessonVisualView } from "@/components/lesson/visuals/LessonVisualView";
import { findConceptForTerm } from "@/lib/lesson/concept-glossary";
import { TUTOR_NICKNAME } from "@/lib/tutor/identity";
import { cn } from "@/lib/utils";
import type { LessonStepBase } from "@/lib/lesson/types";

type ConceptCardProps = Pick<
  LessonStepBase,
  "title" | "content" | "math" | "warning" | "visuals" | "layout"
> & {
  compact?: boolean;
  showTitle?: boolean;
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
 * ayudas visuales van debajo, encima o al lado según `layout`.
 */
export function ConceptCard({
  title,
  content,
  math,
  warning,
  visuals,
  compact = false,
  showTitle = true,
  layout = "stack",
}: ConceptCardProps) {
  const tutor = useLessonTutor();
  const paragraphs = content ?? [];
  const hasMath = Boolean(math && math.length > 0);
  const hasVisuals = Boolean(visuals && visuals.length > 0);
  const hasAside = hasMath || hasVisuals;
  const isSplit = layout === "split" && hasAside && paragraphs.length > 0;
  const visualFirst = layout === "visual-first" && hasAside;
  const visualCount = visuals?.length ?? 0;
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
      className={cn("lesson-theory", compact ? "space-y-4" : "space-y-6")}
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
          isSplit
            ? "grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start lg:gap-10"
            : "flex flex-col gap-6",
        )}
      >
        {paragraphs.length > 0 || warning || showTitle ? (
          <div className={cn("min-w-0 space-y-4", visualFirst && "order-2")}>
            {showTitle ? (
              <h2 className="font-heading text-xl font-semibold tracking-tight text-[color:var(--stage-ink,#e8edf5)] sm:text-2xl">
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
                        className="relative z-10 mt-0.5 flex size-[1.625rem] shrink-0 items-center justify-center rounded-full bg-[color:var(--stage-accent,#6ee7b7)]/20 text-xs font-bold text-[color:var(--stage-accent,#6ee7b7)] ring-2 ring-[color:var(--stage-accent,#6ee7b7)]/35"
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                    ) : null}
                    <p
                      className={cn(
                        "min-w-0 text-[color:var(--stage-ink,#e8edf5)]",
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
              <p
                className="flex items-center gap-1.5 text-xs text-[color:var(--stage-muted,#94a3b8)]"
                data-testid="lesson-theory-term-hint"
              >
                <SparklesIcon className="size-3.5 text-[color:var(--stage-accent,#6ee7b7)]" aria-hidden />
                Pulsa las palabras resaltadas y {TUTOR_NICKNAME} te las explica.
              </p>
            ) : null}
          </div>
        ) : null}

        {hasAside ? (
          <div
            className={cn(
              "min-w-0",
              isSplit || visualCount < 2 ? "space-y-4" : "grid gap-4 md:grid-cols-2",
              visualFirst && "order-1",
            )}
          >
            {visuals?.map((visual, index) => (
              <div
                key={`${visual.kind}-${index}`}
                className={cn(
                  "lesson-idea-enter rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/20 p-4",
                  visualFirst && "sm:p-6",
                )}
                style={{ animationDelay: `${200 + index * 180}ms` }}
              >
                <LessonVisualView visual={visual} />
              </div>
            ))}
            {hasMath ? (
              <div className="lesson-idea-enter md:col-span-full" style={{ animationDelay: "240ms" }}>
                <MathBlockList blocks={math ?? []} className="bg-black/15" />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
