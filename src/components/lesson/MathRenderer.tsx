"use client";

import katex from "katex";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

type MathRendererProps = {
  text: string;
  display?: boolean;
  className?: string;
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

/** Renderiza texto con LaTeX inline ($...$) y bloques display opcionales. */
export function MathRenderer({ text, display = false, className }: MathRendererProps) {
  const html = useMemo(() => {
    if (display) {
      return renderLatex(text, true);
    }

    const parts = text.split(/(\$[^$]+\$)/g);
    return parts
      .map((part) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          const latex = part.slice(1, -1);
          return renderLatex(latex, false);
        }
        return part
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      })
      .join("");
  }, [text, display]);

  if (display) {
    return (
      <div
        className={cn("overflow-x-auto py-1 text-center", className)}
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
        "space-y-2 self-start rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4",
        className,
      )}
    >
      {blocks.map((block) => (
        <MathRenderer key={block} text={block} display />
      ))}
    </div>
  );
}
