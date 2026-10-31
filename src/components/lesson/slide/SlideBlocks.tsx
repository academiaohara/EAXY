"use client";

import { AlertTriangleIcon } from "lucide-react";
import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { SlideAnim } from "@/components/lesson/slide/SlideAnim";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import { Illustration, SlideFigure } from "@/components/lesson/slide/SlideFigure";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideBlock, SlideTone } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

const TONE_CLASS: Record<SlideTone, string> = {
  info: "border-[#58c4dd]/50 bg-[#58c4dd]/10",
  key: "border-[#ffd866]/55 bg-[#ffd866]/10",
  ok: "border-[#83c167]/55 bg-[#83c167]/10",
  warn: "border-[#fc6255]/55 bg-[#fc6255]/10",
};

const TONE_TITLE: Record<SlideTone, string> = {
  info: "text-[#58c4dd]",
  key: "text-[#ffd866]",
  ok: "text-[#83c167]",
  warn: "text-[#fc6255]",
};

function Rich({ text, className }: { text: string; className?: string }) {
  return <MathRenderer text={text} emphasis="mark-alternate" className={className} />;
}

function Tag({ children, tone = "info" }: { children: string; tone?: SlideTone }) {
  return (
    <p className={cn("mb-1.5 text-xs font-bold uppercase tracking-[0.14em]", TONE_TITLE[tone])}>
      {children}
    </p>
  );
}

/** Enunciado con dibujo al lado; si el PNG no existe todavía, queda solo el texto. */
function StoryBlock({ block }: { block: Extract<SlideBlock, { kind: "story" }> }) {
  const [missing, setMissing] = useState(false);
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border border-[color:var(--stage-border,#3d4f66)] bg-black/20 px-4 py-3",
        block.side === "left" && "flex-row-reverse",
      )}
      data-slide-block="story"
    >
      <p className="min-w-0 flex-1 text-[1.05rem] leading-[1.7] text-[color:var(--stage-ink,#fff)]">
        <Rich text={block.text} />
      </p>
      {block.src && !missing ? (
        <Illustration
          src={block.src}
          alt={block.alt ?? ""}
          maxWidth={block.maxWidth ?? 170}
          className="shrink-0"
          onMissing={() => setMissing(true)}
        />
      ) : null}
    </div>
  );
}

export function SlideBlockView({ block }: { block: SlideBlock }) {
  switch (block.kind) {
    case "story":
      return <StoryBlock block={block} />;

    case "text":
      return (
        <p className="text-[1.05rem] leading-[1.7] text-[color:var(--stage-ink,#fff)]" data-slide-block="text">
          <Rich text={block.text} />
        </p>
      );

    case "definition":
      return (
        <div
          className="rounded-xl border-2 border-l-[6px] border-[#58c4dd]/50 border-l-[#58c4dd] bg-[#58c4dd]/12 px-5 py-4 text-[1.15rem] leading-[1.7] text-[color:var(--stage-ink,#fff)]"
          data-slide-block="definition"
        >
          <Rich text={block.text} />
        </div>
      );

    case "rule":
      return (
        <div
          className={cn("rounded-xl border-2 px-5 py-4", TONE_CLASS.key)}
          data-slide-block="rule"
        >
          <Tag tone="key">{block.title ?? "Regla"}</Tag>
          {block.text ? (
            <p className="text-[1.05rem] leading-[1.65] text-[color:var(--stage-ink,#fff)]">
              <Rich text={block.text} />
            </p>
          ) : null}
          {block.formula ? (
            <div className="mt-1 text-xl text-[color:var(--stage-ink,#fff)]">
              <MathRenderer text={block.formula} display />
            </div>
          ) : null}
        </div>
      );

    case "example":
      return (
        <div
          className="rounded-xl border border-[color:var(--stage-border,#3d4f66)] bg-black/25 px-5 py-4"
          data-slide-block="example"
        >
          <Tag tone="ok">{block.title ?? "Ejemplo"}</Tag>
          <ul className="space-y-1.5">
            {block.lines.map((line, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-4 gap-y-0.5">
                <span className="text-lg text-[color:var(--stage-ink,#fff)]">
                  <MathRenderer text={`$${line.math}$`} />
                </span>
                {line.note ? (
                  <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
                    <Rich text={line.note} />
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      );

    case "warning":
      return (
        <div
          className={cn("flex gap-3 rounded-xl border-2 px-4 py-3", TONE_CLASS.warn)}
          data-slide-block="warning"
        >
          <AlertTriangleIcon className="mt-1 size-5 shrink-0 text-[#fc6255]" aria-hidden />
          <div className="text-[1.02rem] leading-[1.6] text-[color:var(--stage-ink,#fff)]">
            <p className="mb-0.5 text-xs font-bold uppercase tracking-[0.14em] text-[#fc6255]">
              {block.title ?? "Ojo"}
            </p>
            <Rich text={block.text} />
          </div>
        </div>
      );

    case "compare":
      return (
        <div className="grid grid-cols-2 gap-3" data-slide-block="compare">
          {[block.left, block.right].map((side, i) => {
            const tone: SlideTone = side.tone ?? (i === 0 ? "info" : "ok");
            return (
              <div key={i} className={cn("rounded-xl border-2 px-4 py-3", TONE_CLASS[tone])}>
                <p className={cn("mb-1 text-base font-bold", TONE_TITLE[tone])}>
                  <MathRenderer text={side.title} />
                </p>
                {side.text ? (
                  <p className="text-[0.98rem] leading-[1.55] text-[color:var(--stage-ink,#fff)]">
                    <Rich text={side.text} />
                  </p>
                ) : null}
                {side.math?.map((m) => (
                  <div key={m} className="mt-1 text-[color:var(--stage-ink,#fff)]">
                    <MathRenderer text={m} display />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      );

    case "formula":
      return (
        <div
          className="flex justify-center text-2xl text-[color:var(--stage-ink,#fff)]"
          data-slide-block="formula"
        >
          <span className="rounded-xl border border-[#ffd866]/45 bg-[#ffd866]/10 px-6 py-1.5">
            <MathRenderer text={block.tex} display />
          </span>
        </div>
      );

    case "relations":
      return (
        <ul className="grid grid-cols-2 gap-x-3 gap-y-2" data-slide-block="relations">
          {block.items.map((item, i) => {
            const tone: SlideTone = item.tone ?? "info";
            const chip = cn(
              "inline-flex min-w-9 items-center justify-center rounded-lg border px-2.5 py-0.5 text-lg font-bold tabular-nums",
              TONE_CLASS[tone],
              TONE_TITLE[tone],
            );
            return (
              <li
                key={i}
                className="flex items-center gap-2.5 text-[1.05rem] text-[color:var(--stage-ink,#fff)]"
              >
                <span className={chip}>{item.left}</span>
                <span className="text-[color:var(--stage-muted,#b8c2d0)]">{item.relation}</span>
                <span className={chip}>{item.right}</span>
              </li>
            );
          })}
        </ul>
      );

    case "steps":
      return (
        <div data-slide-block="steps">
          {block.title ? <Tag tone="info">{block.title}</Tag> : null}
          <ol className="space-y-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#58c4dd] text-sm font-bold text-[#1a2332]">
                  {i + 1}
                </span>
                <span className="text-[1.02rem] leading-[1.6] text-[color:var(--stage-ink,#fff)]">
                  <Rich text={item} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      );

    case "facts":
      return (
        <ul className="flex flex-nowrap gap-2" data-slide-block="facts">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex min-w-0 flex-1 flex-col items-center rounded-xl border border-[color:var(--stage-border,#3d4f66)] bg-black/25 px-1 py-2 text-[color:var(--stage-ink,#fff)]"
            >
              <span className="text-xl font-semibold">
                <MathRenderer text={`$${item.tex}$`} />
              </span>
              {item.label ? (
                <span className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">{item.label}</span>
              ) : null}
            </li>
          ))}
        </ul>
      );

    case "figure":
      return <SlideFigure block={block} />;

    case "anim":
      return <SlideAnim block={block} />;

    case "tool":
      return <SlideTool block={block} />;

    case "bench":
      return <SlideBench block={block} />;

    default:
      return null;
  }
}

