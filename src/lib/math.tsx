"use client";

import "katex/dist/katex.min.css";
import katex from "katex";
import { useMemo } from "react";

const INLINE_MATH = /\$([^$]+)\$/g;

function renderInlineMath(text: string): string {
  return text.replace(INLINE_MATH, (_, expr: string) => {
    try {
      return katex.renderToString(expr.trim(), {
        throwOnError: false,
        displayMode: false,
      });
    } catch {
      return expr;
    }
  });
}

function renderBlockMath(text: string): string {
  const blockPattern = /\$\$([^$]+)\$\$/g;
  return text.replace(blockPattern, (_, expr: string) => {
    try {
      return katex.renderToString(expr.trim(), {
        throwOnError: false,
        displayMode: true,
      });
    } catch {
      return expr;
    }
  });
}

export function MathContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  const html = useMemo(() => {
    const withBlocks = renderBlockMath(content);
    const withInline = renderInlineMath(withBlocks);
    const paragraphs = withInline
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p class="mb-3 last:mb-0 leading-relaxed">${p}</p>`)
      .join("");
    return paragraphs;
  }, [content]);

  return (
    <div
      className={`prose-math text-base text-slate-700 ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
