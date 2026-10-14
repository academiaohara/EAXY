"use client";

import { useEffect, useState } from "react";
import { buildBracePath, BRACE_DEPTH_PX, braceViewportSize } from "@/components/lesson/stage/build-brace-path";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";

export type BraceOrientation = "horizontal" | "vertical";

export type BraceProps = {
  orientation: BraceOrientation;
  /** Largo útil en px (ancho de fila o alto de tarjeta). */
  length: number;
  color: string;
  label?: string;
  tone?: "amber" | "teal";
  className?: string;
};

function BraceLabel({ tone, children }: { tone: "amber" | "teal"; children: React.ReactNode }) {
  const toneClass =
    tone === "amber"
      ? "bg-[color:var(--amber-bg)] text-[color:var(--amber)]"
      : "bg-[color:var(--teal-bg)] text-[color:var(--teal)]";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full px-2.5 py-0.5 text-[11px] font-bold tabular-nums tracking-tight sm:text-xs",
        toneClass,
      )}
    >
      {children}
    </span>
  );
}

function braceGlowFilter(color: string): string {
  return `drop-shadow(0 0 6px color-mix(in srgb, ${color} 35%, transparent))`;
}

export function Brace({ orientation, length, color, label, tone = "amber", className }: BraceProps) {
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(reduced);
  const span = Math.max(Math.round(length), 24);
  const depth = BRACE_DEPTH_PX;
  const path = buildBracePath(span, depth, orientation);
  const { width: vbW, height: vbH } = braceViewportSize(span, depth);

  useEffect(() => {
    if (reduced) {
      setDrawn(true);
      return;
    }
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  const clipFrom =
    orientation === "horizontal" ? "inset(0 50% 0 50%)" : "inset(50% 0 50% 0)";
  const clipStyle = {
    clipPath: drawn ? "inset(0 0 0 0)" : clipFrom,
    transition: reduced ? undefined : "clip-path 500ms ease-out",
  } as const;

  const labelStyle = {
    opacity: drawn ? 1 : 0,
    transition: reduced ? undefined : "opacity 200ms ease-out 300ms",
  } as const;

  const svgStyle = { filter: braceGlowFilter(color) };

  if (orientation === "horizontal") {
    return (
      <div className={cn("flex flex-col items-center", className)} aria-hidden>
        <div className="overflow-visible" style={{ ...clipStyle, width: vbW, height: vbH }}>
          <svg
            width={vbW}
            height={vbH}
            viewBox={`0 0 ${vbW} ${vbH}`}
            style={svgStyle}
            aria-hidden
          >
            <path d={path} fill={color} />
          </svg>
        </div>
        {label ? (
          <div className="mt-2" style={labelStyle}>
            <BraceLabel tone={tone}>{label}</BraceLabel>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)} aria-hidden>
      {label ? (
        <div className="mr-2 shrink-0" style={labelStyle}>
          <BraceLabel tone={tone}>{label}</BraceLabel>
        </div>
      ) : null}
      <div className="overflow-visible" style={{ ...clipStyle, width: vbH, height: span }}>
        <svg
          width={vbH}
          height={span}
          viewBox={`0 0 ${vbH} ${span}`}
          style={svgStyle}
          aria-hidden
        >
          <g transform={`rotate(-90) translate(${-span}, 0)`}>
            <path d={path} fill={color} />
          </g>
        </svg>
      </div>
    </div>
  );
}
