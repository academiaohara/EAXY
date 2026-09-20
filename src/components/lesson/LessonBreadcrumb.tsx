import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

type LessonBreadcrumbProps = {
  courseId?: string;
  courseTitle?: string;
  moduleTitle?: string;
};

export function LessonBreadcrumb({ courseId, courseTitle, moduleTitle }: LessonBreadcrumbProps) {
  const items = [
    { href: "/aprender", label: "Aprender" },
    ...(courseId && courseTitle
      ? [{ href: `/aprender/curso/${courseId}`, label: courseTitle }]
      : []),
    ...(moduleTitle ? [{ label: moduleTitle }] : []),
  ];

  return (
    <nav aria-label="Ruta de navegación" className="flex flex-wrap items-center gap-1 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-1">
            {index > 0 ? (
              <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground/60" aria-hidden />
            ) : null}
            {"href" in item && item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-cobalt"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-ink" : "text-muted-foreground"}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
