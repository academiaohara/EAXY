"use client";

import { useState } from "react";
import type { SlideBlock } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

type SlideFigureProps = {
  block: Extract<SlideBlock, { kind: "figure" }>;
  className?: string;
};

/**
 * Las ilustraciones son dibujos de libro con contorno oscuro y fondo transparente:
 * sobre la pizarra oscura se pierden, así que van sobre una tarjeta de papel claro.
 */
export const FIGURE_CARD_CLASS = "rounded-2xl bg-[#f4efe2] p-3 shadow-[0_6px_24px_rgb(0_0_0/0.3)]";

type IllustrationProps = {
  src: string;
  alt: string;
  maxWidth?: number;
  className?: string;
  /** Qué hacer si el PNG aún no existe: `null` lo omite; `placeholder` deja un hueco en desarrollo. */
  onMissing?: () => void;
};

/** Imagen sobre tarjeta de papel. Avisa si no se puede cargar. */
export function Illustration({ src, alt, maxWidth, className, onMissing }: IllustrationProps) {
  return (
    <div className={cn(FIGURE_CARD_CLASS, "inline-flex", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- PNG estático del temario */}
      <img
        src={src}
        alt={alt}
        onError={onMissing}
        draggable={false}
        className="h-auto max-h-[22rem] w-auto max-w-full object-contain"
        style={maxWidth ? { maxWidth } : undefined}
      />
    </div>
  );
}

/**
 * Ilustración PNG de `public/lesson/…`. Si el fichero aún no existe, en producción
 * no se pinta nada (la diapositiva sigue completa) y en desarrollo se ve un hueco
 * con el nombre del archivo que falta.
 */
export function SlideFigure({ block, className }: SlideFigureProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (process.env.NODE_ENV === "production") {
      return null;
    }
    return (
      <div
        className={cn(
          "flex min-h-[10rem] flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[color:var(--stage-border,#3d4f66)] p-6 text-center text-sm text-[color:var(--stage-muted,#b8c2d0)]",
          className,
        )}
        data-testid="lesson-slide-figure-missing"
      >
        <span className="font-semibold">Ilustración pendiente</span>
        <code className="text-xs">{block.src}</code>
        <span className="text-xs">{block.alt}</span>
      </div>
    );
  }

  return (
    <figure
      className={cn("flex flex-col items-center gap-2", className)}
      data-testid="lesson-slide-figure"
    >
      <Illustration
        src={block.src}
        alt={block.alt}
        maxWidth={block.maxWidth}
        onMissing={() => setFailed(true)}
      />
      {block.caption ? (
        <figcaption className="text-center text-sm text-[color:var(--stage-muted,#b8c2d0)]">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
