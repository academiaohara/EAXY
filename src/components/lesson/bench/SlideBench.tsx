"use client";

import type { SlideBlock } from "@/lib/lesson/types";
import { BisectrizCompas, BisectrizPractica, MediatrizCompas, MediatrizPractica, TrasladarAnguloCompas, TrasladarPractica } from "./scenes-compas";
import { SimetriaCompas, SimetriaCuadricula, SimetriaPractica } from "./scenes-simetria";
import { GiroCompas, GiroCuadricula, GiroPractica } from "./scenes-giro";
import { TraslacionCompas, TraslacionCuadricula, TraslacionPractica } from "./scenes-transformaciones";
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
    case "traslacion-compas":
      return <TraslacionCompas block={block} />;
    case "traslacion-practica":
      return <TraslacionPractica block={block} />;
    case "traslacion-cuadricula":
      return <TraslacionCuadricula block={block} />;
    case "giro-compas":
      return <GiroCompas block={block} />;
    case "giro-practica":
      return <GiroPractica block={block} />;
    case "giro-cuadricula":
      return <GiroCuadricula block={block} />;
    case "simetria-compas":
      return <SimetriaCompas block={block} />;
    case "simetria-practica":
      return <SimetriaPractica block={block} />;
    case "simetria-cuadricula":
      return <SimetriaCuadricula block={block} />;
    default:
      return null;
  }
}
