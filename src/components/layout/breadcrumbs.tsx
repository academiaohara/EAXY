import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from "lucide-react";
import type { BreadcrumbItem } from "@/lib/navigation/learning-trail";
import { cn } from "@/lib/utils";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const parent = [...items].reverse().find((item) => item.href);

  return (
    <nav aria-label="Ruta de navegación" className={cn("min-w-0", className)} data-testid="breadcrumbs">
      {parent?.href ? (
        <Link
          href={parent.href}
          className="inline-flex max-w-full items-center gap-1 rounded-full py-1 pr-2 text-sm font-medium text-ink-muted transition-colors hover:text-cobalt sm:hidden"
          data-testid="breadcrumbs-back"
        >
          <ChevronLeftIcon className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{parent.label}</span>
        </Link>
      ) : null}

      <ol className="hidden min-w-0 flex-wrap items-center gap-1 text-sm sm:flex">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isCurrent = !item.href;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-1">
              {!isFirst ? (
                <ChevronRightIcon className="size-3.5 shrink-0 text-ink-muted/50" aria-hidden />
              ) : null}
              {item.href ? (
                <Link
                  href={item.href}
                  className="inline-flex max-w-[16rem] items-center gap-1.5 truncate rounded-md px-1.5 py-0.5 font-medium text-ink-muted transition-colors hover:bg-cobalt-tint hover:text-cobalt"
                >
                  {isFirst ? <HomeIcon className="size-3.5 shrink-0" aria-hidden /> : null}
                  <span className="truncate">{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "max-w-[20rem] truncate px-1.5 py-0.5 font-semibold text-ink",
                    isCurrent && "cursor-default",
                  )}
                  aria-current="page"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
