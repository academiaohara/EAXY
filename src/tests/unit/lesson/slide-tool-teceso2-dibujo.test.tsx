import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { aDibujo, aReal, areaPlaca, areaRealM2, escalaQueCabe, masaGramos, proyecciones, puntuacionLamina, volumenSolido } from "@/components/lesson/slide/tools/TecEso2DibujoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso2-pieza-vistas-explorador", "eso2-escala-conversion-explorador", "eso2-conica-explorador", "eso2-plano-vivienda-explorador", "eso2-cad-comandos-explorador", "eso2-solido-operaciones-explorador", "eso2-lamina-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 2.º ESO, tema 2: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 2", () => {
  it("proyecciones de una pieza", () => {
    const p = proyecciones([2, 1, 1, 2, 1, 1, 1, 1, 1]);
    expect(p.alzado).toEqual([2, 1, 1]);
    expect(p.perfil).toEqual([2, 2, 1]);
    expect(p.cubos).toBe(11);
    expect(p.planta.every(Boolean)).toBe(true);
    expect(proyecciones([0, 0, 0, 0, 3, 0, 0, 0, 0]).alzado).toEqual([0, 3, 0]);
  });
  it("escalas", () => {
    expect(aDibujo(2400, 1 / 50)).toBeCloseTo(48);
    expect(aReal(36, 1 / 20)).toBeCloseTo(720);
    expect(escalaQueCabe(2400)?.txt).toBe("1:10");
    expect(escalaQueCabe(100)?.txt).toBe("1:1");
    expect(areaRealM2(100, 80, 50)).toBe(20);
  });
  it("CAD, sólido y lámina", () => {
    expect(areaPlaca([])).toBe(8400);
    expect(areaPlaca(["agujero"])).toBeCloseTo(8400 - Math.PI * 64);
    expect(volumenSolido(40, 30, 20, 0, 20)).toBe(24000);
    expect(volumenSolido(40, 30, 20, 10, 100)).toBeCloseTo(24000 - Math.PI * 25 * 20);
    expect(masaGramos(10000, 2.7)).toBeCloseTo(27);
    expect(puntuacionLamina([true, false, true, false, false, false, false])).toMatchObject({ n: 2 });
  });
});
