"use client";

import Link from "next/link";
import type { Presentation } from "@/lib/presentation-schema";

interface IspringPresentationViewerProps {
  presentation: Presentation;
  backHref?: string;
}

export function IspringPresentationViewer({
  presentation,
  backHref = "/rutas",
}: IspringPresentationViewerProps) {
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
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
            {presentation.slideCount} diapositivas
          </div>
          <p className="text-xs text-slate-500">
            Usa los botones inferiores para avanzar o retroceder
          </p>
        </div>
      </header>

      <div
        className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200"
        style={{ aspectRatio: `${presentation.width} / ${presentation.height}` }}
      >
        <iframe
          src={presentation.embedUrl}
          title={presentation.title}
          className="h-full w-full border-0"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
