import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "cuantizacion-ad-explorador",
  "inductivo-sn-explorador",
  "optica-modos-explorador",
  "galga-deformacion-explorador",
  "encoder-rpm-explorador",
  "captador-presion-temp-explorador",
  "operacional-inversor-explorador",
  "binario-byte-explorador",
  "conversion-decimal-binario-explorador",
  "logica-niveles-explorador",
  "puerta-logica-explorador",
  "puerta-universal-explorador",
  "karnaugh-2-explorador",
  "de-morgan-nand-explorador",
  "mux-decoder-explorador",
  "sumador-binario-explorador",
  "secuencial-memoria-explorador",
  "biestable-rs-explorador",
  "biestable-jk-explorador",
  "cableado-elementos-explorador",
  "grafo-bimodal-explorador",
  "secuencia-reles-explorador",
];

describe("herramientas TI2 unidades 11–13", () => {
  it.each(TOOLS)("%s se monta con parámetros extremos", (tool) => {
    expect(() =>
      render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, c: 77, n: 3 } }} />),
    ).not.toThrow();
  });

  it.each(TOOLS)("%s se monta sin parámetros", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});
