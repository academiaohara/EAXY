import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { MANDOS, PRODUCTOS_VIDA, alcanzable, energiaVideo, impactoAnual, kwhAnual, tasaReciclaje } from "@/components/lesson/slide/tools/TecEso2SostenibleTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso2-ciclo-vida-fases-explorador", "eso2-etiqueta-energetica-explorador", "eso2-residuos-hogar-explorador", "eso2-diseno-universal-explorador", "eso2-huella-digital-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 2.º ESO, tema 8: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 8", () => {
  it("ciclo de vida", () => {
    for (const p of PRODUCTOS_VIDA) expect((p.fases as readonly number[]).reduce((a, b) => a + b, 0)).toBe(100);
    expect(impactoAnual(60, 4)).toBe(15);
    expect(impactoAnual(60, 0)).toBe(Infinity);
  });
  it("energía, residuos y alcance", () => {
    expect(kwhAnual(9, 4)).toBeCloseTo(13.14);
    expect(kwhAnual(60, 4)).toBeCloseTo(87.6);
    expect(tasaReciclaje([20], [75]).tasa).toBeCloseTo(75);
    expect(tasaReciclaje([0, 0], [50, 50]).tasa).toBe(0);
    expect(alcanzable(0, 100)).toBe(true);
    expect(alcanzable(0, 150)).toBe(false);
    expect(MANDOS.every((m) => m.min < m.max)).toBe(true);
  });
  it("vídeo en streaming", () => {
    const e = energiaVideo(2, 1, 50);
    expect(e.gb).toBe(180);
    expect(e.kwhRed).toBeCloseTo(9);
    expect(e.kwhDisp).toBeCloseTo(3);
  });
});
