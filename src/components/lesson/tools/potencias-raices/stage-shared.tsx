"use client";

import type { ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";

export function StageLabel({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "highlight" | "muted";
  className?: string;
}) {
  const color =
    tone === "highlight"
      ? "text-[color:var(--stage-highlight,#ffff00)]"
      : tone === "muted"
        ? "text-[color:var(--stage-muted,#94a3b8)]"
        : "text-[color:var(--stage-accent,#58c4dd)]";
  return (
    <span className={cn("text-xs font-bold uppercase tracking-widest", color, className)}>
      {children}
    </span>
  );
}

export function StageEquation({
  latex,
  className,
  visible = true,
}: {
  latex: string;
  className?: string;
  visible?: boolean;
}) {
  return (
    <div
      className={cn(
        "text-center text-lg sm:text-xl transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <MathRenderer text={`$${latex}$`} />
    </div>
  );
}

export function CalcKey({
  label,
  active,
  className,
}: {
  label: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-9 min-w-11 items-center justify-center rounded-lg border-2 px-2.5 py-1 text-sm font-semibold tabular-nums transition-all duration-300",
        active
          ? "scale-105 border-[color:var(--stage-highlight,#ffff00)] bg-[color:var(--stage-highlight)]/20 text-[color:var(--stage-ink,#fff)] shadow-[0_0_12px_rgba(255,255,0,0.35)]"
          : "border-[color:var(--stage-accent,#58c4dd)]/45 bg-[color:var(--stage-accent)]/10 text-[color:var(--stage-ink,#fff)]",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function CalcDisplay({
  value,
  visible,
}: {
  value: string;
  visible: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[4.5rem] items-center justify-end rounded-xl border-2 border-[color:var(--stage-accent,#58c4dd)]/50 bg-black/40 px-3 py-2 font-mono text-lg font-bold tabular-nums text-[color:var(--stage-ink,#fff)] transition-all duration-500",
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2",
      )}
    >
      {value}
    </span>
  );
}

export function StageArrow({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-xl font-bold text-[color:var(--stage-muted,#94a3b8)]",
        className,
      )}
      aria-hidden
    >
      →
    </span>
  );
}

export function AdvanceButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-full border border-[color:var(--stage-accent,#58c4dd)]/40 bg-[color:var(--stage-accent)]/15 px-5 py-2 text-sm font-semibold text-[color:var(--stage-ink,#fff)] transition hover:bg-[color:var(--stage-accent)]/25 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label}
    </button>
  );
}
