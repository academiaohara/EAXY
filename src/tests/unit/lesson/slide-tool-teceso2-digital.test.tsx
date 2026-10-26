import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ARCHIVOS, estadoRam, extension, formatoTiempo, resumenPantalla, rutaRelativa, segundosSubida, tamanoImagenMB, totalesHoja, usoRam } from "@/components/lesson/slide/tools/TecEso2DigitalTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso2-sistema-recursos-explorador", "eso2-rutas-explorador", "eso2-hoja-calculo-explorador", "eso2-formato-imagen-explorador", "eso2-subida-nube-explorador", "eso2-tiempo-pantalla-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 2.º ESO, tema 7: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 7", () => {
  it("memoria RAM", () => {
    expect(usoRam(12, [false, false, false])).toBe(3500 + 3000);
    expect(estadoRam(usoRam(0, [false, false, false]), 8).estado).toBe("Fluido");
    expect(estadoRam(usoRam(40, [true, true, true]), 4).estado).toContain("Saturada");
  });
  it("rutas y extensiones", () => {
    expect(rutaRelativa("Documentos/Tecnologia", "Descargas/instalador.exe")).toBe("../../Descargas/instalador.exe");
    expect(rutaRelativa("Documentos", "Documentos/Tecnologia/memoria.docx")).toBe("Tecnologia/memoria.docx");
    expect(rutaRelativa("Documentos/Tecnologia", "Documentos/Tecnologia/memoria.docx")).toBe("memoria.docx");
    expect(extension("a/b/foto.jpg")).toBe("jpg");
    for (const a of ARCHIVOS) expect(rutaRelativa("Documentos", a.ruta).length).toBeGreaterThan(0);
  });
  it("hoja de cálculo, imágenes y subida", () => {
    const t = totalesHoja([6, 2, 1, 3]);
    expect(t.sub).toBeCloseTo(9 + 6 + 4 + 2.4);
    expect(t.total).toBeCloseTo(t.sub * 1.21);
    expect(tamanoImagenMB(1000, 1000, 0)).toBeCloseTo(3000000 / 1048576);
    expect(tamanoImagenMB(1000, 1000, 2) / tamanoImagenMB(1000, 1000, 0)).toBeCloseTo(0.1);
    expect(segundosSubida(10, 80)).toBe(1000);
    expect(formatoTiempo(1000)).toBe("16,7 min");
    expect(formatoTiempo(Infinity)).toBe("—");
  });
  it("tiempo de pantalla", () => {
    expect(resumenPantalla([2, 0.5, 0.5, 0, 0]).aviso).toBe("Equilibrado");
    expect(resumenPantalla([2, 2, 2, 1, 1]).aviso).toContain("Elevado");
    expect(resumenPantalla([2, 1.5, 1, 1, 1]).ocio).toBe(4.5);
  });
});
