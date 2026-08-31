"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Presentation } from "@/lib/presentation-schema";
import { LessonActionBar } from "@/components/layout";
import { Button } from "@/components/ui/Button";

interface HtmlSlideViewerProps {
  presentation: Presentation;
  backHref?: string;
}

const FONT_FILES = ["fnt0", "fnt1", "fnt2", "fnt3", "fnt4", "fnt5", "fnt6"];

function buildFontFaces(assetBase: string): string {
  return FONT_FILES.map(
    (name) =>
      `@font-face{font-family:${name};src:url("${assetBase}/${name}.woff") format("woff");font-display:swap;}`,
  ).join("");
}

function buildBaseStyles(width: number, height: number): string {
  return `
    .html-slide-stage {
      position: relative;
      width: 100%;
      aspect-ratio: ${width} / ${height};
      overflow: hidden;
      border-radius: 1rem;
      background: #dcdee0;
      box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
    }
    .html-slide-canvas {
      position: absolute;
      inset: 0;
      transform-origin: top left;
    }
    .html-slide-root {
      position: relative;
      width: ${width}px;
      height: ${height}px;
      overflow: hidden;
      background: #ffffff;
    }
    .html-slide-root * {
      position: absolute;
    }
    .html-slide-root .kern.slide {
      position: absolute;
      inset: 0;
    }
    .html-slide-root span.relpos {
      position: relative;
      display: inline;
    }
  `;
}

export function HtmlSlideViewer({
  presentation,
  backHref = "/rutas",
}: HtmlSlideViewerProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const slide = presentation.slides[slideIndex];
  const total = presentation.slides.length;
  const isFirst = slideIndex === 0;
  const isLast = slideIndex === total - 1;

  const updateScale = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const nextScale = Math.min(
      stage.clientWidth / presentation.width,
      stage.clientHeight / presentation.height,
    );
    setScale(nextScale);
  }, [presentation.height, presentation.width]);

  useEffect(() => {
    updateScale();
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(updateScale);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [updateScale]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        setSlideIndex((current) => Math.min(current + 1, total - 1));
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        setSlideIndex((current) => Math.max(current - 1, 0));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  const scopedCss = `
    ${buildFontFaces(presentation.assetBase)}
    ${buildBaseStyles(presentation.width, presentation.height)}
    ${slide.css}
  `;

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
          <p className="mt-1 text-sm text-slate-600">{presentation.description}</p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          Diapositiva {slideIndex + 1} / {total}
        </div>
      </header>

      <div ref={stageRef} className="html-slide-stage mx-auto w-full max-w-5xl">
        <div
          className="html-slide-canvas"
          style={{
            width: presentation.width,
            height: presentation.height,
            transform: `scale(${scale})`,
          }}
        >
          <style>{scopedCss}</style>
          <div
            className="html-slide-root"
            dangerouslySetInnerHTML={{ __html: slide.html }}
          />
        </div>
      </div>

      <LessonActionBar className="mt-4 sm:mt-6">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          disabled={isFirst}
          onClick={() => setSlideIndex((current) => Math.max(current - 1, 0))}
        >
          Anterior
        </Button>
        <Button
          type="button"
          className="flex-1"
          disabled={isLast}
          onClick={() =>
            setSlideIndex((current) => Math.min(current + 1, total - 1))
          }
        >
          Siguiente
        </Button>
      </LessonActionBar>
    </div>
  );
}
