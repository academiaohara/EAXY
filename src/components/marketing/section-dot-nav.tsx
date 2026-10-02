"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type DotNavSection = {
  id: string;
  label: string;
};

type SectionDotNavProps = {
  sections: readonly DotNavSection[];
};

export function SectionDotNav({ sections }: SectionDotNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    // Una sección cuenta como activa cuando cruza la franja central del viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <nav
      aria-label="Secciones de la página"
      data-testid="section-dot-nav"
      className="fixed right-3 top-1/2 z-20 hidden -translate-y-1/2 md:block lg:right-6"
    >
      <ul className="flex flex-col items-end gap-1 rounded-full border border-border/70 bg-paper-raised/70 px-1.5 py-2 shadow-sm backdrop-blur-md">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => handleClick(event, section.id)}
                aria-current={isActive ? "location" : undefined}
                data-testid={`section-dot-${section.id}`}
                className="group relative flex size-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40"
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute right-full mr-2.5 whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-paper opacity-0 shadow-md transition-all duration-200",
                    "translate-x-1 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                  )}
                >
                  {section.label}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "block rounded-full transition-all duration-200",
                    isActive
                      ? "size-2.5 bg-cobalt shadow-[0_0_0_4px] shadow-cobalt/20"
                      : "size-2 bg-ink-muted/40 group-hover:bg-cobalt/70",
                  )}
                />
                <span className="sr-only">{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
