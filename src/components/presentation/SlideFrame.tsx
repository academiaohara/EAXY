import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SlideFrameProps {
  header?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SlideFrame({
  header,
  children,
  className,
  contentClassName,
}: SlideFrameProps) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-white shadow-inner ring-1 ring-slate-200/80",
        className,
      )}
    >
      {header && (
        <div className="shrink-0 border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white px-4 py-3 sm:px-6 sm:py-4">
          <p className="text-sm font-bold italic text-sky-900 sm:text-base lg:text-lg">
            {header}
          </p>
        </div>
      )}
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function QuoteBox({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg border-2 border-fuchsia-400/80 px-4 py-3 text-center sm:px-6 sm:py-4">
      <p className="text-sm font-medium leading-relaxed text-slate-800 sm:text-base lg:text-lg">
        {children}
      </p>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-center text-sm font-bold tracking-wide text-sky-600 underline decoration-sky-300 decoration-2 underline-offset-4 sm:text-base">
      {children}
    </h3>
  );
}

export function formatSpanishNumber(value: number): string {
  return value.toLocaleString("es-ES");
}
