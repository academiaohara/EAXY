"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Presentation } from "@/lib/presentation-schema";
import { LessonActionBar } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { SlideRenderer } from "./slides/SlideRenderer";

interface PresentationPlayerProps {
  presentation: Presentation;
  backHref?: string;
}

export function PresentationPlayer({
  presentation,
  backHref = "/rutas",
}: PresentationPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = presentation.slides.length;
  const currentSlide = presentation.slides[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slideCount - 1;

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, slideCount - 1)));
    },
    [slideCount],
  );

  const goNext = useCallback(() => {
    if (!isLast) {
      setCurrentIndex((index) => index + 1);
    }
  }, [isLast]);

  const goPrev = useCallback(() => {
    if (!isFirst) {
      setCurrentIndex((index) => index - 1);
    }
  }, [isFirst]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(slideCount - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, goTo, slideCount]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href={backHref}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            ← Volver
          </Link>
          <h1 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
            {presentation.title}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {presentation.description}
          </p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            Diapositiva {currentIndex + 1} de {slideCount}
          </div>
          <p className="text-xs text-slate-500">
            Usa las flechas del teclado o los botones para navegar
          </p>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-5xl min-h-0 flex-1 flex-col">
        <div
          className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-2 shadow-xl ring-1 ring-slate-200 sm:p-3"
          style={{
            aspectRatio: `${presentation.width} / ${presentation.height}`,
            maxHeight: "min(70dvh, 720px)",
          }}
        >
          <button
            type="button"
            className="absolute inset-0 z-0 cursor-default"
            aria-label="Avanzar diapositiva"
            onClick={goNext}
            disabled={isLast}
          />

          <div key={currentSlide.id} className="relative z-10 h-full">
            <SlideRenderer slide={currentSlide} />
          </div>
        </div>

        <div className="mt-4 hidden gap-2 sm:grid sm:grid-cols-6">
          {presentation.slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "touch-target rounded-lg border px-2 py-2 text-xs font-medium transition",
                index === currentIndex
                  ? "border-indigo-300 bg-indigo-50 text-indigo-800"
                  : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-slate-50",
              )}
              aria-label={`Ir a diapositiva ${index + 1}`}
              aria-current={index === currentIndex ? "step" : undefined}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200 sm:mt-4">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / slideCount) * 100}%` }}
          />
        </div>
      </div>

      <LessonActionBar className="mt-4 md:mt-6">
        <Button
          variant="secondary"
          onClick={goPrev}
          disabled={isFirst}
          className="flex-1 sm:flex-none"
        >
          ← Anterior
        </Button>
        <Button
          onClick={goNext}
          disabled={isLast}
          className="flex-1 sm:flex-none"
        >
          Siguiente →
        </Button>
      </LessonActionBar>
    </div>
  );
}
