import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LessonActionBarProps {
  children: ReactNode;
  className?: string;
}

export function LessonActionBar({ children, className }: LessonActionBarProps) {
  return (
    <div
      className={cn(
        "lesson-action-bar sticky bottom-0 z-10 border-t border-slate-200 bg-white/95 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/90 md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none",
        className,
      )}
    >
      <div className="flex gap-3">{children}</div>
    </div>
  );
}
