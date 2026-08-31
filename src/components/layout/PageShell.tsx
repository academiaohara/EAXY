import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className={cn("flex min-h-dvh flex-col", className)}>{children}</div>
  );
}
