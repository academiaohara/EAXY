import type { ReactNode } from "react";
import type { StoryboardPhase, VisualTone } from "@/lib/lesson/types";

const TONE_CLASSES: Record<VisualTone, string> = {
  cobalt: "bg-cobalt/15 text-cobalt-light ring-cobalt/25",
  emerald: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/25",
  amber: "bg-amber-400/15 text-amber-300 ring-amber-400/25",
  violet: "bg-violet-400/15 text-violet-300 ring-violet-400/25",
  rose: "bg-rose-400/15 text-rose-300 ring-rose-400/25",
};

function highlightedText(phase: StoryboardPhase): ReactNode[] {
  const highlights = (phase.highlights ?? []).filter(({ text }) => phase.text.includes(text));
  if (highlights.length === 0) {
    return [phase.text];
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const highlight of highlights) {
    const start = phase.text.indexOf(highlight.text, cursor);
    if (start < 0) {
      continue;
    }
    if (start > cursor) {
      nodes.push(phase.text.slice(cursor, start));
    }
    nodes.push(
      <mark
        key={`${start}-${highlight.text}`}
        className={`rounded px-1.5 py-0.5 font-semibold text-inherit ring-1 ${TONE_CLASSES[highlight.tone]}`}
        data-tone={highlight.tone}
      >
        {highlight.text}
      </mark>,
    );
    cursor = start + highlight.text.length;
  }
  nodes.push(phase.text.slice(cursor));
  return nodes;
}

export function StoryboardNarration({ phase }: { phase: StoryboardPhase }) {
  return (
    <div
      className="flex min-h-40 flex-col justify-center px-1 py-5 lg:min-h-full lg:px-6 lg:py-8"
      aria-live="polite"
      data-testid="lesson-storyboard-narration"
    >
      {phase.eyebrow ? (
        <p className="mb-3 text-xs font-bold tracking-[0.18em] text-[color:var(--stage-muted,#94a3b8)] uppercase">
          {phase.eyebrow}
        </p>
      ) : null}
      <p className="text-pretty text-xl leading-relaxed font-medium text-[color:var(--stage-ink,#f8fafc)] lg:text-2xl">
        {highlightedText(phase)}
      </p>
    </div>
  );
}
