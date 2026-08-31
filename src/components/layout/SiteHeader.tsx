import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { PageContainer } from "./PageContainer";

interface SiteHeaderProps {
  width?: "lesson" | "content" | "wide";
  leading?: ReactNode;
  title?: string;
  subtitle?: string;
  trailing?: ReactNode;
  className?: string;
}

export function SiteHeader({
  width = "content",
  leading,
  title,
  subtitle,
  trailing,
  className,
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80",
        className,
      )}
    >
      <PageContainer
        as="div"
        width={width}
        className="flex items-center gap-3 py-3 sm:gap-4 sm:py-4"
      >
        {leading ?? (
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-xl transition hover:opacity-90"
            aria-label="Eaxy — Inicio"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white sm:h-10 sm:w-10">
              E
            </span>
            <span className="hidden text-xl font-bold text-slate-900 sm:inline">
              Eaxy
            </span>
          </Link>
        )}

        {(title || subtitle) && (
          <div className="min-w-0 flex-1">
            {title && (
              <h1 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="truncate text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
        )}

        {trailing && <div className="shrink-0">{trailing}</div>}
      </PageContainer>
    </header>
  );
}
