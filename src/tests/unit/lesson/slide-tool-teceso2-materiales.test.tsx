import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { MATERIALES_MATRIZ, flota, impresion, lecturaCalibre, masaGr, piezasPorTablero, puntuacion, recomienda, sigma } from "@/components/lesson/slide/tools/TecEso2MaterialesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso2-densidad-explorador", "eso2-curva-traccion-explorador", "eso2-despiece-tablero-explorador", "eso2-matriz-decision-explorador", "eso2-tecnica-taller-explorador", "eso2-calibre-explorador", "eso2-impresion3d-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 2.º ESO, tema 3: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 3", () => {
  it("densidad y flotación", () => {
    expect(masaGr(7.85, 1000)).toBeCloseTo(7850);
    expect(flota(0.5)).toBe(true);
    expect(flota(1.24)).toBe(false);
  });
  it("curva de tracción", () => {
    expect(sigma(0, 0.0005).zona).toBe("elástica");
    expect(sigma(0, 0.0005).s).toBeCloseTo(100);
    expect(sigma(0, 0.05).zona).toBe("plástica");
    expect(sigma(0, 0.05).s).toBeGreaterThan(235);
    expect(sigma(0, 0.25).zona).toBe("rotura");
  });
  it("despiece, matriz y técnicas", () => {
    expect(piezasPorTablero(2440, 1220, 400, 300).total).toBe(24);
    expect(piezasPorTablero(2440, 1220, 3000, 300).total).toBe(0);
    expect(puntuacion([3, 3, 3, 3, 3], MATERIALES_MATRIZ[0]!.s)).toBeCloseTo(4.2);
    expect(puntuacion([0, 0, 0, 0, 0], MATERIALES_MATRIZ[0]!.s)).toBe(0);
    expect(recomienda("madera", "cortar").tecnica).toContain("Serrucho");
    expect(recomienda("metal", "unir").seguridad).toContain("guantes");
  });
  it("calibre e impresión 3D", () => {
    expect(lecturaCalibre(23.4)).toMatchObject({ ent: 23, dec: 4 });
    expect(lecturaCalibre(23.96)).toMatchObject({ ent: 24, dec: 0 });
    const a = impresion(40, 0.2, 20);
    const b = impresion(40, 0.2, 80);
    expect(b.masaG).toBeGreaterThan(a.masaG);
    expect(impresion(40, 0.3, 20).horas).toBeLessThan(a.horas);
  });
});
