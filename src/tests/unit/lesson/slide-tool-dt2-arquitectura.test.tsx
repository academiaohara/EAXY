import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { alturaArcoCatenario, alturaArcoParabola, aperturaMedia, hiperboloide, longitudCatenaria, longitudParabola, parametroCatenaria, radioHiperboloide, radioPanel } from "@/components/lesson/slide/tools/DtIIArquitecturaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt2-catenaria-explorador", "dt2-hiperboloide-explorador", "dt2-fachada-parametrica-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico II, arquitectura: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de arquitectura", () => {
  it("catenaria y parábola", () => {
    const a = parametroCatenaria(20, 5);
    expect(a).toBeCloseTo(10.7432, 3);
    expect(alturaArcoCatenario(10, a, 5)).toBeCloseTo(0, 6);
    expect(alturaArcoCatenario(0, a, 5)).toBeCloseTo(5, 9);
    expect(longitudCatenaria(a, 20)).toBeCloseTo(23.0158, 3);
    expect(longitudParabola(20, 5)).toBeCloseTo(22.9559, 3);
    expect(alturaArcoParabola(5, 20, 5)).toBeCloseTo(3.75, 9);
    expect(alturaArcoParabola(10, 20, 5)).toBeCloseTo(0, 9);
    expect(parametroCatenaria(0, 5)).toBeNaN();
    expect(parametroCatenaria(20, -1)).toBeNaN();
    // con flecha pequeña la catenaria se parece a la parábola
    const a2 = parametroCatenaria(20, 0.5);
    expect(Math.abs(alturaArcoCatenario(5, a2, 0.5) - alturaArcoParabola(5, 20, 0.5))).toBeLessThan(0.005);
    expect(longitudCatenaria(a, 20)).toBeGreaterThan(20);
  });
  it("hiperboloide", () => {
    const h = hiperboloide(4, 10, 60);
    expect(h.garganta).toBeCloseTo(3.4641, 3);
    expect(h.generatriz).toBeCloseTo(10.7703, 3);
    expect(radioHiperboloide(4, 60, 0.5)).toBeCloseTo(3.4641, 3);
    expect(radioHiperboloide(4, 60, 0)).toBeCloseTo(4);
    expect(radioHiperboloide(4, 60, 1)).toBeCloseTo(4);
    expect(radioHiperboloide(4, 0, 0.5)).toBeCloseTo(4);
    expect(hiperboloide(4, 10, 0).generatriz).toBeCloseTo(10);
  });
  it("fachada paramétrica", () => {
    expect(radioPanel(0, 10, 0.1, 0.4)).toBeCloseTo(0.1);
    expect(radioPanel(10, 10, 0.1, 0.4)).toBeCloseTo(0.4);
    expect(radioPanel(20, 10, 0.1, 0.4)).toBeCloseTo(0.4);
    expect(aperturaMedia(8, 0.5, 0.5, 0.3, 0.3)).toBeCloseTo(Math.PI * 0.09, 6);
    expect(aperturaMedia(8, 0.5, 0.5, 0.5, 0.5)).toBeCloseTo(Math.PI / 4, 6);
    expect(aperturaMedia(10, 0.25, 0.6, 0.1, 0.45)).toBeGreaterThan(aperturaMedia(10, 0.25, 0.6, 0.1, 0.1));
  });
});
