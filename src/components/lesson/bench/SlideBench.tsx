"use client";

import type { SlideBlock } from "@/lib/lesson/types";
import { BisectrizCompas, BisectrizPractica, MediatrizCompas, MediatrizPractica, TrasladarAnguloCompas, TrasladarPractica } from "./scenes-compas";
import { PerpendicularEscuadraCartabon, TransportadorMedir } from "./scenes-trazados";
import { EscuadraCartabonAngulos, InstrumentosCatalogo, LapicesDureza, ParalelasEscuadraCartabon } from "./scenes";

/** Monta una escena de la «mesa de dibujo» dentro de la diapositiva. */
export function SlideBench({ block }: { block: Extract<SlideBlock, { kind: "bench" }> }) {
  switch (block.scene) {
    case "instrumentos-catalogo":
      return <InstrumentosCatalogo block={block} />;
    case "escuadra-cartabon-angulos":
      return <EscuadraCartabonAngulos block={block} />;
    case "lapices-dureza":
      return <LapicesDureza block={block} />;
    case "paralelas-escuadra-cartabon":
      return <ParalelasEscuadraCartabon block={block} />;
    case "perpendicular-escuadra-cartabon":
      return <PerpendicularEscuadraCartabon block={block} />;
    case "transportador-medir":
      return <TransportadorMedir block={block} />;
    case "mediatriz-compas":
      return <MediatrizCompas block={block} />;
    case "bisectriz-compas":
      return <BisectrizCompas block={block} />;
    case "mediatriz-practica":
      return <MediatrizPractica block={block} />;
    case "bisectriz-practica":
      return <BisectrizPractica block={block} />;
    case "trasladar-angulo-compas":
      return <TrasladarAnguloCompas block={block} />;
    case "trasladar-practica":
      return <TrasladarPractica block={block} />;
    default:
      return null;
  }
}
