"use client";

import type { SlideBlock } from "@/lib/lesson/types";
import { InstrumentosCatalogo, ParalelasEscuadraCartabon } from "./scenes";

/** Monta una escena de la «mesa de dibujo» dentro de la diapositiva. */
export function SlideBench({ block }: { block: Extract<SlideBlock, { kind: "bench" }> }) {
  switch (block.scene) {
    case "instrumentos-catalogo":
      return <InstrumentosCatalogo block={block} />;
    case "paralelas-escuadra-cartabon":
      return <ParalelasEscuadraCartabon block={block} />;
    default:
      return null;
  }
}
