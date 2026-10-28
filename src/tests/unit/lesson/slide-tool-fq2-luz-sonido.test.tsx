import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloLimite, anguloReflexion, anguloRefraccion, distanciaEco, longitudOnda, nivelADistancia, periodo, riesgoAuditivo, tamanoSombra } from "@/components/lesson/slide/tools/Fq2LuzSonidoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq2-sombras-explorador", "fq2-reflexion-explorador", "fq2-refraccion-explorador", "fq2-onda-sonido-explorador", "fq2-decibelios-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de luz y sonido: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("sombras y reflexión", () => {
    expect(tamanoSombra(10, 50, 100)).toBeCloseTo(30);
    expect(tamanoSombra(10, 0, 100)).toBeNaN();
    expect(tamanoSombra(10, 50, 0)).toBeCloseTo(10);
    expect(anguloReflexion(35)).toBe(35);
  });
  it("refracción", () => {
    expect(anguloRefraccion(1, 1.33, 0)).toBeCloseTo(0);
    expect(anguloRefraccion(1, 1.33, 50)).toBeCloseTo(35.2, 0);
    expect(anguloRefraccion(1, 1.5, 30)).toBeLessThan(30);
    expect(anguloRefraccion(1.5, 1, 30)).toBeGreaterThan(30);
    expect(anguloRefraccion(1.5, 1, 60)).toBeNaN();
    expect(anguloLimite(1.5, 1)).toBeCloseTo(41.8, 0);
    expect(anguloLimite(1, 1.5)).toBeNaN();
  });
  it("sonido", () => {
    expect(longitudOnda(340, 340)).toBe(1);
    expect(longitudOnda(340, 0)).toBeNaN();
    expect(periodo(100)).toBeCloseTo(0.01);
    expect(distanciaEco(340, 2)).toBe(340);
  });
  it("decibelios", () => {
    expect(nivelADistancia(90, 1, 2)).toBeCloseTo(84, 0);
    expect(nivelADistancia(90, 1, 4)).toBeCloseTo(78, 0);
    expect(nivelADistancia(90, 1, 0)).toBeNaN();
    expect(riesgoAuditivo(30)).toBe("sin riesgo");
    expect(riesgoAuditivo(130)).toContain("dolor");
  });
});
