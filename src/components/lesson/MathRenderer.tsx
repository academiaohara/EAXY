"use client";

import katex from "katex";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export type LessonTextEmphasis = "strong" | "mark-alternate";

type MathRendererProps = {
  text: string;
  display?: boolean;
  className?: string;
  /**
   * Relaciona cada término en `**negrita**` con un concepto explicable. Los que
   * lo tienen se marcan con `data-concept` para poder pulsarlos.
   */
  conceptLookup?: (term: string) => string | undefined;
  /** `mark-alternate`: resaltados ámbar / turquesa (presentaciones de lección). */
  emphasis?: LessonTextEmphasis;
};

function renderLatex(latex: string, display: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode: display,
      throwOnError: false,
      strict: "ignore",
    });
  } catch {
    return latex;
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const ALLOWED_INLINE_HTML =
  /<mark class="suma">[\s\S]*?<\/mark>|<mark>[\s\S]*?<\/mark>|<span class="lesson-step-title-accent">[\s\S]*?<\/span>/g;

/** Texto legible sin HTML de lección ni marcado **negrita** (p. ej. citas del tutor). */
export function plainLessonText(text: string): string {
  return text.replace(/<\/?[^>]+>/g, "").replace(/\*\*/g, "");
}

function maskAllowedInlineHtml(fragment: string): { masked: string; slots: string[] } {
  const slots: string[] = [];
  const masked = fragment.replace(ALLOWED_INLINE_HTML, (match) => {
    const index = slots.length;
    slots.push(match);
    return `\u0000HTML${index}\u0000`;
  });
  return { masked, slots };
}

function restoreAllowedInlineHtml(text: string, slots: string[]): string {
  return slots.reduce(
    (acc, html, index) => acc.replace(`\u0000HTML${index}\u0000`, html),
    text,
  );
}

function wrapEmphasisTag(
  term: string,
  emphasis: LessonTextEmphasis,
  boldCounter: { n: number },
  conceptId?: string,
): string {
  const interactive = conceptId
    ? ` data-concept="${conceptId}" role="button" tabindex="0"`
    : "";

  if (emphasis === "mark-alternate") {
    const isSecondary = boldCounter.n % 2 === 1;
    boldCounter.n += 1;
    const classAttr = isSecondary ? ' class="suma"' : "";
    return `<mark${classAttr}${interactive}>${term}</mark>`;
  }

  return conceptId
    ? `<strong data-concept="${conceptId}" role="button" tabindex="0">${term}</strong>`
    : `<strong>${term}</strong>`;
}

/** Renderiza texto con LaTeX inline ($...$) y bloques display opcionales. */
export function MathRenderer({
  text,
  display = false,
  className,
  conceptLookup,
  emphasis = "strong",
}: MathRendererProps) {
  const html = useMemo(() => {
    if (display) {
      return renderLatex(text, true);
    }

    const boldCounter = { n: 0 };

    const renderPlain = (fragment: string) =>
      fragment
        .split(/(\$[^$]+\$)/g)
        .map((part) => {
          if (part.length > 2 && part.startsWith("$") && part.endsWith("$")) {
            return renderLatex(part.slice(1, -1), false);
          }
          const { masked, slots } = maskAllowedInlineHtml(part);
          return restoreAllowedInlineHtml(escapeHtml(masked), slots);
        })
        .join("");

    // El negrita se resuelve primero, para que pueda envolver fórmulas ($...$).
    return text
      .split(/(\*\*[^*]+\*\*)/g)
      .map((segment) => {
        const bold = segment.match(/^\*\*([^*]+)\*\*$/);
        if (!bold) return renderPlain(segment);
        const term = bold[1]!;
        const conceptId = conceptLookup?.(term);
        return wrapEmphasisTag(renderPlain(term), emphasis, boldCounter, conceptId);
      })
      .join("");
  }, [text, display, conceptLookup, emphasis]);

  if (display) {
    return (
      <div
        className={cn("scrollbar-subtle overflow-x-auto py-1 text-center", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={cn("leading-relaxed", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

type MathBlockListProps = {
  blocks: string[];
  className?: string;
};

export function MathBlockList({ blocks, className }: MathBlockListProps) {
  return (
    <div
      className={cn(
        "space-y-2 self-start rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4 text-ink",
        "lesson-stage-theme-board:border-[color:var(--stage-border)] lesson-stage-theme-board:bg-black/30 lesson-stage-theme-board:text-[color:var(--stage-ink)]",
        className,
      )}
    >
      {blocks.map((block) => (
        <MathRenderer key={block} text={block} display />
      ))}
    </div>
  );
}
