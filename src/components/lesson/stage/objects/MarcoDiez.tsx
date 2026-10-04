import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarcoDiezProps = {
  className?: string;
  label?: string;
  children?: ReactNode;
  slots?: number;
};

export function MarcoDiez({ className, label, children, slots = 10 }: MarcoDiezProps) {
  const rows = slots === 10 ? 2 : 1;
  const cols = slots === 10 ? 5 : 4;
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      {label ? <span className="text-xs font-semibold text-ink-muted">{label}</span> : null}
      <div
        className={objectSize(
          "grid gap-1 rounded-xl border-2 border-cobalt/25 bg-white p-2 sm:p-2.5",
        )}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {children ??
          Array.from({ length: slots }).map((_, index) => (
            <div
              key={index}
              className="h-8 w-8 rounded-md border border-dashed border-slate-200 sm:h-9 sm:w-9"
            />
          ))}
      </div>
    </div>
  );
}
