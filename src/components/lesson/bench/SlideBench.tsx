"use client";

import type { SlideBlock } from "@/lib/lesson/types";
import { BisectrizCompas, BisectrizPractica, MediatrizCompas, MediatrizPractica, TrasladarAnguloCompas, TrasladarPractica } from "./scenes-compas";
import { CuadraturaCompas, CuadraturaPractica, EquivalenciaTriangulos, SemejanzaRazon } from "./scenes-equivalencia";
import { AureaCompas, AureaPractica, MediaCompas, MediaPractica, ThalesDividir, ThalesParalelas, ThalesPractica } from "./scenes-proporcion";
import { HomoteciaCompas } from "./scenes-homotecia";
import { SimetriaCompas } from "./scenes-simetria";
import { GiroCompas } from "./scenes-giro";
import { TraslacionCompas } from "./scenes-transformaciones";
import { GiroPractica, HomoteciaPractica, SimetriaPractica, TraslacionPractica } from "./scenes-unir";
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
    case "giro-compas":
      return <GiroCompas block={block} />;
    case "giro-practica":
      return <GiroPractica block={block} />;
    case "simetria-compas":
      return <SimetriaCompas block={block} />;
    case "simetria-practica":
      return <SimetriaPractica block={block} />;
    case "homotecia-compas":
      return <HomoteciaCompas block={block} />;
    case "homotecia-practica":
      return <HomoteciaPractica block={block} />;
    case "thales-dividir":
      return <ThalesDividir block={block} />;
    case "thales-practica":
      return <ThalesPractica block={block} />;
    case "thales-paralelas":
      return <ThalesParalelas block={block} />;
    case "media-compas":
      return <MediaCompas block={block} />;
    case "media-practica":
      return <MediaPractica block={block} />;
    case "aurea-compas":
      return <AureaCompas block={block} />;
    case "aurea-practica":
      return <AureaPractica block={block} />;
    case "equivalencia-triangulos":
      return <EquivalenciaTriangulos block={block} />;
    case "cuadratura-compas":
      return <CuadraturaCompas block={block} />;
    case "cuadratura-practica":
      return <CuadraturaPractica block={block} />;
    case "semejanza-razon":
      return <SemejanzaRazon block={block} />;
    default:
      return null;
  }
}
