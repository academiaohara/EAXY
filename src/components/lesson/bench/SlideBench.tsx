"use client";

import type { SlideBlock } from "@/lib/lesson/types";
import { BisectrizCompas, BisectrizPractica, MediatrizCompas, MediatrizPractica, TrasladarAnguloCompas, TrasladarPractica } from "./scenes-compas";
import { CuadraturaCompas, CuadraturaPractica, EquivalenciaTriangulos, SemejanzaRazon } from "./scenes-equivalencia";
import { AureaCompas, AureaPractica, MediaCompas, MediaPractica, ThalesDividir, ThalesPractica } from "./scenes-proporcion";
import { HomoteciaCompas } from "./scenes-homotecia";
import { SimetriaCompas } from "./scenes-simetria";
import { GiroCompas } from "./scenes-giro";
import { TraslacionCompas } from "./scenes-transformaciones";
import { GiroPractica, HomoteciaPractica, SimetriaPractica, TraslacionPractica } from "./scenes-unir";
import { ApotemaPractica, CircuncentroPractica, EstrellaCompas, HexagonoCompas, HexagonoPractica, PentagramaPractica, PoligonoElementos, PuntosNotables, RomboCompas, RomboPractica, TrianguloLllCompas, TrianguloLllPractica } from "./scenes-poligonos";
import { CircTangentePractica, CircunferenciasPosiciones, EnlaceCompas, EnlacePractica, EspiralCompas, EspiralPractica, EvolventeHilo, OvaloCompas, OvaloPractica, TangentesCompas, TangentesPractica } from "./scenes-tangencias";
import { ArcoBisecado, DiferenciaSegmentos, DivisionDos, ElementosGeometricos, LugarGeometrico, OperacionesReglaCompas, PerpendicularCompas, SumaSegmentos } from "./scenes-elementos";
import { AngulosCircunferencia, AngulosTipos, BisectrizSegundoMetodo, ConstruccionAngulos, DiferenciaAngulos, DivisionAngulo, ParaleloCompas, SumaAngulos } from "./scenes-angulos";
import { EquilateroLadoPractica, TrianguloLalPractica, RectanguloCatetosPractica, IsoscelesLadoAnguloPractica, TrianguloAlaPractica, RectanguloCatetoAnguloPractica, IsoscelesDesigualPractica, RectanguloHipotenusaPractica, IsoscelesIgualAnguloPractica, EquilateroAlturaPractica } from "./practicas-triangulos";
import { TrianguloLineasNotables, TrianguloDatos } from "./scenes-triangulos";
import { TrianguloAla, TrianguloLal, EquilateroLado, EquilateroAltura, RectanguloCatetos, RectanguloCatetoAngulo, RectanguloHipotenusa, IsoscelesLadoAngulo, IsoscelesDesigual, IsoscelesIgualAngulo } from "./scenes-construcciones";
import { ComoEstudiar, LugaresInterseccion, MediatrizAplicaciones, RectasParalelas, TriangulosClasificacion, CuadrilaterosFamilias, CuadrilaterosPropiedades, PoligonosLadoRadio, ConstruccionesExactas, PoligonoDadoLado, PoligonosUsos, TangentePropiedades, TangentesSencillas, TangentesComunes, EnlaceLugares, EnlaceCasos, OvaloCurvas, OvoideDescripcion, EspiralesDescripcion } from "./scenes-teoria";
import { EscalaExplorador } from "./scenes-escalas";
import { EscalaClases, EscalaConcepto, EscalaDetalles, EscalaFotocopia, EscalaGrafica, EscalaProporcion, EscalaTransversales, Escalimetro, EscalasNormalizadas, TrianguloUniversal } from "./scenes-escalas";
import { PerpendicularExteriorPractica, PerpendicularExtremoPractica, ConstruyeAngulosPractica, DiferenciaSegmentosPractica, ParaleloCompasPractica, PerpendicularPuntoPractica, SumaSegmentosPractica, TransporteSegmentoPractica } from "./practicas-trazados";
import { PerpendicularEscuadraCartabon, TransportadorMedir } from "./scenes-trazados";
import { ReproProvider } from "./reproduccion";
import { EscuadraCartabonAngulos, InstrumentosCatalogo, RangoCtx, LapicesDureza, ParalelasEscuadraCartabon } from "./scenes";

/** Monta una escena de la «mesa de dibujo» dentro de la diapositiva. */
export function SlideBench({ block }: { block: Extract<SlideBlock, { kind: "bench" }> }) {
  return <RangoCtx.Provider value={block.desde === undefined ? null : { desde: block.desde }}><ReproProvider><Escena block={block} /></ReproProvider></RangoCtx.Provider>;
}

function Escena({ block }: { block: Extract<SlideBlock, { kind: "bench" }> }) {
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
    case "puntos-notables":
      return <PuntosNotables block={block} />;
    case "circuncentro-practica":
      return <CircuncentroPractica block={block} />;
    case "triangulo-lll-compas":
      return <TrianguloLllCompas block={block} />;
    case "triangulo-lll-practica":
      return <TrianguloLllPractica block={block} />;
    case "hexagono-compas":
      return <HexagonoCompas block={block} />;
    case "hexagono-practica":
      return <HexagonoPractica block={block} />;
    case "rombo-compas":
      return <RomboCompas block={block} />;
    case "rombo-practica":
      return <RomboPractica block={block} />;
    case "poligono-elementos":
      return <PoligonoElementos block={block} />;
    case "apotema-practica":
      return <ApotemaPractica block={block} />;
    case "estrella-compas":
      return <EstrellaCompas block={block} />;
    case "pentagrama-practica":
      return <PentagramaPractica block={block} />;
    case "tangentes-compas":
      return <TangentesCompas block={block} />;
    case "tangentes-practica":
      return <TangentesPractica block={block} />;
    case "circunferencias-posiciones":
      return <CircunferenciasPosiciones block={block} />;
    case "circ-tangente-practica":
      return <CircTangentePractica block={block} />;
    case "enlace-compas":
      return <EnlaceCompas block={block} />;
    case "enlace-practica":
      return <EnlacePractica block={block} />;
    case "ovalo-compas":
      return <OvaloCompas block={block} />;
    case "ovalo-practica":
      return <OvaloPractica block={block} />;
    case "espiral-compas":
      return <EspiralCompas block={block} />;
    case "espiral-practica":
      return <EspiralPractica block={block} />;
    case "evolvente-hilo":
      return <EvolventeHilo block={block} />;
    case "elementos-geometricos":
      return <ElementosGeometricos block={block} />;
    case "operaciones-regla-compas":
      return <OperacionesReglaCompas block={block} />;
    case "lugar-geometrico":
      return <LugarGeometrico block={block} />;
    case "suma-segmentos-compas":
      return <SumaSegmentos block={block} />;
    case "diferencia-segmentos-compas":
      return <DiferenciaSegmentos block={block} />;
    case "perpendicular-compas":
      return <PerpendicularCompas block={block} />;
    case "arco-bisecado-tres-puntos":
      return <ArcoBisecado block={block} />;
    case "division-2n":
      return <DivisionDos block={block} />;
    case "angulos-tipos":
      return <AngulosTipos block={block} />;
    case "angulos-circunferencia":
      return <AngulosCircunferencia block={block} />;
    case "suma-angulos-compas":
      return <SumaAngulos block={block} />;
    case "diferencia-angulos-compas":
      return <DiferenciaAngulos block={block} />;
    case "bisectriz-segundo-metodo":
      return <BisectrizSegundoMetodo block={block} />;
    case "division-angulo-2n":
      return <DivisionAngulo block={block} />;
    case "construccion-angulos":
      return <ConstruccionAngulos block={block} />;
    case "paralelo-compas":
      return <ParaleloCompas block={block} />;
    case "transporte-segmento-practica":
      return <TransporteSegmentoPractica block={block} />;
    case "suma-segmentos-practica":
      return <SumaSegmentosPractica block={block} />;
    case "diferencia-segmentos-practica":
      return <DiferenciaSegmentosPractica block={block} />;
    case "paralelo-compas-practica":
      return <ParaleloCompasPractica block={block} />;
    case "dt-como-estudiar":
      return <ComoEstudiar block={block} />;
    case "lugares-interseccion":
      return <LugaresInterseccion block={block} />;
    case "mediatriz-aplicaciones":
      return <MediatrizAplicaciones block={block} />;
    case "rectas-paralelas":
      return <RectasParalelas block={block} />;
    case "triangulos-clasificacion":
      return <TriangulosClasificacion block={block} />;
    case "triangulo-lineas-notables":
      return <TrianguloLineasNotables block={block} />;
    case "triangulo-datos":
      return <TrianguloDatos block={block} />;
    case "triangulo-ala":
      return <TrianguloAla block={block} />;
    case "triangulo-lal":
      return <TrianguloLal block={block} />;
    case "equilatero-lado":
      return <EquilateroLado block={block} />;
    case "equilatero-altura":
      return <EquilateroAltura block={block} />;
    case "rectangulo-catetos":
      return <RectanguloCatetos block={block} />;
    case "rectangulo-cateto-angulo":
      return <RectanguloCatetoAngulo block={block} />;
    case "rectangulo-hipotenusa":
      return <RectanguloHipotenusa block={block} />;
    case "isosceles-lado-angulo":
      return <IsoscelesLadoAngulo block={block} />;
    case "isosceles-desigual":
      return <IsoscelesDesigual block={block} />;
    case "isosceles-igual-angulo":
      return <IsoscelesIgualAngulo block={block} />;
    case "equilatero-lado-practica":
      return <EquilateroLadoPractica block={block} />;
    case "triangulo-lal-practica":
      return <TrianguloLalPractica block={block} />;
    case "rectangulo-catetos-practica":
      return <RectanguloCatetosPractica block={block} />;
    case "isosceles-lado-angulo-practica":
      return <IsoscelesLadoAnguloPractica block={block} />;
    case "triangulo-ala-practica":
      return <TrianguloAlaPractica block={block} />;
    case "rectangulo-cateto-angulo-practica":
      return <RectanguloCatetoAnguloPractica block={block} />;
    case "isosceles-desigual-practica":
      return <IsoscelesDesigualPractica block={block} />;
    case "rectangulo-hipotenusa-practica":
      return <RectanguloHipotenusaPractica block={block} />;
    case "isosceles-igual-angulo-practica":
      return <IsoscelesIgualAnguloPractica block={block} />;
    case "equilatero-altura-practica":
      return <EquilateroAlturaPractica block={block} />;
    case "cuadrilateros-familias":
      return <CuadrilaterosFamilias block={block} />;
    case "cuadrilateros-propiedades":
      return <CuadrilaterosPropiedades block={block} />;
    case "poligonos-lado-radio":
      return <PoligonosLadoRadio block={block} />;
    case "construcciones-exactas":
      return <ConstruccionesExactas block={block} />;
    case "poligono-dado-lado":
      return <PoligonoDadoLado block={block} />;
    case "poligonos-usos":
      return <PoligonosUsos block={block} />;
    case "tangente-propiedades":
      return <TangentePropiedades block={block} />;
    case "tangentes-sencillas":
      return <TangentesSencillas block={block} />;
    case "tangentes-comunes":
      return <TangentesComunes block={block} />;
    case "enlace-lugares":
      return <EnlaceLugares block={block} />;
    case "enlace-casos":
      return <EnlaceCasos block={block} />;
    case "curvas-ovalo-ovoide":
      return <OvaloCurvas block={block} />;
    case "ovoide-descripcion":
      return <OvoideDescripcion block={block} />;
    case "espirales-descripcion":
      return <EspiralesDescripcion block={block} />;
    case "escala-explorador":
      return <EscalaExplorador block={block} />;
    case "escala-proporcion":
      return <EscalaProporcion block={block} />;
    case "escalas-normalizadas":
      return <EscalasNormalizadas block={block} />;
    case "escala-detalles":
      return <EscalaDetalles block={block} />;
    case "escala-fotocopia":
      return <EscalaFotocopia block={block} />;
    case "escalimetro":
      return <Escalimetro block={block} />;
    case "escala-concepto":
      return <EscalaConcepto block={block} />;
    case "escala-clases":
      return <EscalaClases block={block} />;
    case "escala-grafica":
      return <EscalaGrafica block={block} />;
    case "triangulo-universal-escalas":
      return <TrianguloUniversal block={block} />;
    case "escala-transversales":
      return <EscalaTransversales block={block} />;
    case "perpendicular-exterior-practica":
      return <PerpendicularExteriorPractica block={block} />;
    case "perpendicular-extremo-practica":
      return <PerpendicularExtremoPractica block={block} />;
    case "perpendicular-punto-practica":
      return <PerpendicularPuntoPractica block={block} />;
    case "construye-angulos-practica":
      return <ConstruyeAngulosPractica block={block} />;
    default:
      return null;
  }
}
