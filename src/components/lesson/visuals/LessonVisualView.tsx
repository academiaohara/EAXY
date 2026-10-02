"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon, CheckIcon, XIcon } from "lucide-react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { FractionFigureVisualBlock } from "@/components/lesson/visuals/FractionFigure";
import { IntegerAddRulesVisualBlock } from "@/components/lesson/visuals/IntegerAddRulesVisual";
import { MiniGraph } from "@/components/lesson/visuals/MiniGraph";
import { NumberLineVisualBlock } from "@/components/lesson/visuals/NumberLineVisual";
import { OppositeScenariosVisualBlock } from "@/components/lesson/visuals/OppositeScenariosVisual";
import { ParenthesisRulesVisualBlock } from "@/components/lesson/visuals/ParenthesisRulesVisual";
import { SignRulesVisualBlock } from "@/components/lesson/visuals/SignRulesVisual";
import { checkLinearPair, formatLinearEquation } from "@/lib/lesson/visual-math";
import type {
  CardsVisual,
  EquationAnatomyVisual,
  GraphGalleryVisual,
  LessonVisual,
  SolutionCheckVisual,
  StackVisual,
  TranslateVisual,
  VisualTone,
} from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

const toneChip: Record<VisualTone, string> = {
  cobalt: "bg-cobalt-tint text-cobalt ring-cobalt/30",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-300",
  amber: "bg-amber-50 text-amber-700 ring-amber-300",
  violet: "bg-violet-50 text-violet-700 ring-violet-300",
  rose: "bg-rose-50 text-rose-700 ring-rose-300",
};

const toneText: Record<VisualTone, string> = {
  cobalt: "text-cobalt",
  emerald: "text-emerald-700",
  amber: "text-amber-700",
  violet: "text-violet-700",
  rose: "text-rose-700",
};

const toneAccent: Record<VisualTone, string> = {
  cobalt: "border-t-cobalt",
  emerald: "border-t-emerald-500",
  amber: "border-t-amber-400",
  violet: "border-t-violet-500",
  rose: "border-t-rose-400",
};

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/** Recorre `length` elementos en bucle hasta que el alumno elige uno a mano. */
function useAutoCycle(length: number, intervalMs: number) {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual || length <= 1 || prefersReducedMotion()) {
      return;
    }
    const timer = window.setInterval(() => setActive((current) => (current + 1) % length), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs, length, manual]);

  return {
    active,
    select: (index: number) => {
      setManual(true);
      setActive(index);
    },
  };
}

function VisualTitle({ title }: { title?: string }) {
  if (!title) {
    return null;
  }
  return (
    <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
      <MathRenderer text={title} />
    </p>
  );
}

function EquationAnatomy({ visual }: { visual: EquationAnatomyVisual }) {
  const labelled = visual.parts
    .map((part, index) => (part.label ? index : -1))
    .filter((index) => index >= 0);
  const { active, select } = useAutoCycle(labelled.length, 1700);
  const activeIndex = labelled[active];

  return (
    <div className="space-y-3">
      <VisualTitle title={visual.title} />
      <div className="flex items-start justify-center gap-1 overflow-x-auto py-2 text-xl sm:text-2xl">
        {visual.parts.map((part, index) => {
          const tone = part.tone ?? "cobalt";
          const isActive = index === activeIndex;
          if (!part.label) {
            return (
              <span key={index} className="px-0.5 pt-1.5 text-ink-muted">
                <MathRenderer text={`$${part.tex}$`} />
              </span>
            );
          }
          return (
            <button
              key={index}
              type="button"
              onMouseEnter={() => select(labelled.indexOf(index))}
              onFocus={() => select(labelled.indexOf(index))}
              onClick={() => select(labelled.indexOf(index))}
              className="lesson-visual-rise flex flex-col items-center gap-1.5"
              style={{ animationDelay: `${index * 90}ms` }}
              aria-label={part.label}
            >
              <span
                className={cn(
                  "rounded-xl px-2.5 py-1 ring-1 transition-all duration-300",
                  isActive ? cn(toneChip[tone], "scale-110 ring-2 shadow-sm") : "bg-white ring-slate-200",
                )}
              >
                <MathRenderer text={`$${part.tex}$`} />
              </span>
              <span
                className={cn(
                  "max-w-[4.5rem] text-center text-[9px] font-semibold uppercase leading-tight tracking-wide transition-opacity duration-300",
                  isActive ? cn("opacity-100", toneText[tone]) : "text-ink-muted opacity-40",
                )}
              >
                {part.label}
              </span>
            </button>
          );
        })}
      </div>
      {visual.caption ? (
        <p className="text-center text-sm text-ink-muted">
          <MathRenderer text={visual.caption} />
        </p>
      ) : null}
    </div>
  );
}

function SolutionCheck({ visual }: { visual: SolutionCheckVisual }) {
  const { active, select } = useAutoCycle(visual.pairs.length, 2600);
  const pair = visual.pairs[active];
  const check = checkLinearPair(visual.a, visual.b, visual.c, pair);

  return (
    <div className="space-y-3">
      <VisualTitle title={visual.title ?? "¿Es solución?"} />
      <div className="text-center text-xl">
        <MathRenderer text={`$${formatLinearEquation(visual.a, visual.b, visual.c)}$`} />
      </div>
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Pares a comprobar">
        {visual.pairs.map(([x, y], index) => (
          <button
            key={`${x}-${y}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => select(index)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm font-medium tabular-nums transition-all",
              index === active
                ? "border-cobalt bg-cobalt text-white shadow-sm"
                : "border-slate-200 bg-white text-ink hover:border-cobalt/40",
            )}
          >
            ({x}, {y})
          </button>
        ))}
      </div>
      <div
        key={active}
        className={cn(
          "lesson-visual-rise flex items-center justify-center gap-3 rounded-xl border px-4 py-3 text-lg",
          check.holds ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50",
        )}
      >
        <MathRenderer text={`$${check.expression} = ${check.value}$`} />
        <span
          className={cn(
            "lesson-point-pop flex size-7 shrink-0 items-center justify-center rounded-full text-white",
            check.holds ? "bg-emerald-500" : "bg-amber-400",
          )}
          style={{ animationDelay: "350ms" }}
          aria-label={check.holds ? "Es solución" : "No es solución"}
        >
          {check.holds ? <CheckIcon className="size-4" strokeWidth={3} /> : <XIcon className="size-4" strokeWidth={3} />}
        </span>
      </div>
      <p className="text-center text-xs text-ink-muted">
        {check.holds
          ? `Da ${visual.c}: el par cumple la igualdad.`
          : `Da ${check.value}, no ${visual.c}: no es solución.`}
      </p>
    </div>
  );
}

function GraphGallery({ visual }: { visual: GraphGalleryVisual }) {
  return (
    <div className="space-y-3">
      <VisualTitle title={visual.title} />
      <div
        className={cn(
          "grid gap-3",
          visual.items.length === 1 && "mx-auto max-w-[15rem] grid-cols-1",
          visual.items.length === 2 && "grid-cols-2",
          visual.items.length >= 3 && "grid-cols-2 sm:grid-cols-3",
        )}
      >
        {visual.items.map((item, index) => (
          <figure
            key={item.caption}
            className="lesson-visual-rise flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm"
            style={{ animationDelay: `${index * 160}ms` }}
          >
            <MiniGraph graph={item.graph} delayMs={index * 350} />
            <figcaption className="space-y-0.5 text-center">
              <p className="text-sm font-semibold text-ink">
                <MathRenderer text={item.caption} />
              </p>
              {item.detail ? (
                <p className="text-xs text-ink-muted">
                  <MathRenderer text={item.detail} />
                </p>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function Cards({ visual }: { visual: CardsVisual }) {
  return (
    <div className="space-y-3">
      <VisualTitle title={visual.title} />
      <div className="grid gap-2.5">
        {visual.items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className={cn(
              "lesson-visual-rise flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl border border-l-4 border-slate-200 bg-white px-4 py-2.5 shadow-sm",
              toneAccent[item.tone ?? "cobalt"],
            )}
            style={{ animationDelay: `${index * 140}ms` }}
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">
                <MathRenderer text={item.title} />
              </p>
              {item.caption ? (
                <p className="text-xs leading-relaxed text-ink-muted">
                  <MathRenderer text={item.caption} />
                </p>
              ) : null}
            </div>
            {item.math ? (
              <span className="shrink-0 text-base">
                <MathRenderer text={`$${item.math}$`} />
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Stack({ visual }: { visual: StackVisual }) {
  const resultDelay = visual.rows.length * 450 + 200;

  return (
    <div className="space-y-3">
      <VisualTitle title={visual.title} />
      <div className="mx-auto flex w-fit min-w-[14rem] flex-col items-stretch rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
        {visual.rows.map((row, index) => (
          <div key={row} className="lesson-visual-rise" style={{ animationDelay: `${index * 450}ms` }}>
            <MathRenderer text={row} display />
          </div>
        ))}
        <div
          className="lesson-visual-rise flex items-center gap-2 py-1 text-ink-muted"
          style={{ animationDelay: `${resultDelay - 150}ms` }}
          aria-hidden
        >
          <MathRenderer text={`$${visual.operator ?? "+"}$`} />
          <span className="h-0.5 flex-1 rounded-full bg-slate-300" />
        </div>
        <div
          className="lesson-point-pop rounded-lg bg-emerald-50 text-emerald-900"
          style={{ animationDelay: `${resultDelay}ms` }}
        >
          <MathRenderer text={visual.result} display />
        </div>
      </div>
      {visual.caption ? (
        <p className="text-center text-sm text-ink-muted">
          <MathRenderer text={visual.caption} />
        </p>
      ) : null}
    </div>
  );
}

function Translate({ visual }: { visual: TranslateVisual }) {
  return (
    <div className="space-y-3">
      <VisualTitle title={visual.title} />
      <ol className="space-y-2">
        {visual.rows.map((row, index) => (
          <li
            key={row.text}
            className="lesson-visual-rise grid grid-cols-[minmax(0,1fr)_auto_minmax(0,auto)] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm"
            style={{ animationDelay: `${index * 420}ms` }}
          >
            <span className="text-sm text-ink">
              <MathRenderer text={row.text} />
            </span>
            <ArrowRightIcon className="size-4 text-cobalt" aria-hidden />
            <span
              className="lesson-point-pop rounded-lg bg-cobalt-tint px-2.5 py-1 text-base text-cobalt"
              style={{ animationDelay: `${index * 420 + 280}ms` }}
            >
              <MathRenderer text={`$${row.math}$`} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

type LessonVisualViewProps = {
  visual: LessonVisual;
  className?: string;
};

/** Ayuda visual de la teoría (o de una explicación del tutor). */
export function LessonVisualView({ visual, className }: LessonVisualViewProps) {
  return (
    <div className={cn("min-w-0", className)} data-testid={`lesson-visual-${visual.kind}`}>
      {visual.kind === "fraction-figure" ? <FractionFigureVisualBlock visual={visual} /> : null}
      {visual.kind === "equation-anatomy" ? <EquationAnatomy visual={visual} /> : null}
      {visual.kind === "solution-check" ? <SolutionCheck visual={visual} /> : null}
      {visual.kind === "graph-gallery" ? <GraphGallery visual={visual} /> : null}
      {visual.kind === "cards" ? <Cards visual={visual} /> : null}
      {visual.kind === "stack" ? <Stack visual={visual} /> : null}
      {visual.kind === "translate" ? <Translate visual={visual} /> : null}
      {visual.kind === "number-line" ? <NumberLineVisualBlock visual={visual} /> : null}
      {visual.kind === "sign-rules" ? <SignRulesVisualBlock visual={visual} /> : null}
      {visual.kind === "opposite-scenarios" ? <OppositeScenariosVisualBlock visual={visual} /> : null}
      {visual.kind === "integer-add-rules" ? <IntegerAddRulesVisualBlock visual={visual} /> : null}
      {visual.kind === "parenthesis-rules" ? <ParenthesisRulesVisualBlock visual={visual} /> : null}
    </div>
  );
}
