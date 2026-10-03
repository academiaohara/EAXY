import type { ReactElement } from "react";
import { cn } from "@/lib/utils";

/** Sustituir por SVG del temario en public/lesson/numeracion/egypt/{id}.svg cuando existan. */
export type EgyptianSymbolId =
  | "stroke-1"
  | "heel-10"
  | "coil-100"
  | "lotus-1000"
  | "finger-10000"
  | "tadpole-100000"
  | "god-1000000";

type EgyptianNumeralIconProps = {
  id: EgyptianSymbolId;
  className?: string;
};

function StrokeOne({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 48" className={className} aria-hidden>
      <path d="M12 4v40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function HeelTen({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M8 26c0-8 4-12 8-12s8 4 8 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M10 26h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function CoilHundred({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path
        d="M28 12a8 8 0 1 0-12 6 8 8 0 1 0 12 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LotusThousand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <ellipse cx="20" cy="22" rx="10" ry="6" fill="currentColor" opacity="0.25" />
      <path
        d="M20 8c-4 6-4 12 0 18 4-6 4-12 0-18zM12 14c6 2 10 6 8 12M28 14c-6 2-10 6-8 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FingerTenThousand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 48" className={className} aria-hidden>
      <path d="M16 42V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 18c-6 0-8-6-4-10 3-3 8-1 8 4" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function Tadpole({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden>
      <ellipse cx="12" cy="12" rx="8" ry="6" fill="currentColor" opacity="0.35" />
      <path d="M20 12h22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function GodMillion({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden>
      <circle cx="20" cy="10" r="6" fill="currentColor" opacity="0.3" />
      <path d="M12 18h16v22a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4V18z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 26h24M14 34h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const ICONS: Record<EgyptianSymbolId, (props: { className?: string }) => ReactElement> = {
  "stroke-1": StrokeOne,
  "heel-10": HeelTen,
  "coil-100": CoilHundred,
  "lotus-1000": LotusThousand,
  "finger-10000": FingerTenThousand,
  "tadpole-100000": Tadpole,
  "god-1000000": GodMillion,
};

export function EgyptianNumeralIcon({ id, className }: EgyptianNumeralIconProps) {
  const Icon = ICONS[id];
  return <Icon className={cn("h-10 w-auto text-amber-900", className)} />;
}
