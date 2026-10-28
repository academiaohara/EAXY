import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { COMPOSICIONES, MATERIALES, SALES, SEPARACIONES, TECNICAS, estadoDisolucion, gramosPorLitro, masaComponentes, porcentajeMasa, rutaClasificacion, solubilidad, tecnicaCorrecta } from "@/components/lesson/slide/tools/Fq2MezclasTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq2-clasificacion-materia-explorador", "fq2-concentracion-disolucion-explorador", "fq2-solubilidad-curva-explorador", "fq2-separacion-mezclas-explorador", "fq2-composicion-mezclas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de mezclas: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("clasificación", () => {
    expect(rutaClasificacion("elemento")).toEqual(["Materia", "Sustancia pura", "Elemento"]);
    expect(rutaClasificacion("heterogenea")[1]).toBe("Mezcla");
    expect(MATERIALES.aire!.clase).toBe("homogenea");
    expect(MATERIALES.agua!.clase).toBe("compuesto");
  });
  it("concentración", () => {
    expect(porcentajeMasa(20, 180)).toBeCloseTo(10);
    expect(gramosPorLitro(15, 0.5)).toBeCloseTo(30);
    expect(porcentajeMasa(0, 0)).toBeNaN();
    expect(gramosPorLitro(5, 0)).toBeNaN();
  });
  it("solubilidad", () => {
    expect(solubilidad("nitrato", 20)).toBe(32);
    expect(solubilidad("nitrato", 30)).toBeCloseTo(48);
    expect(solubilidad("nitrato", -10)).toBe(13);
    expect(solubilidad("nitrato", 500)).toBe(246);
    expect(solubilidad("cloruro", 100)).toBeLessThan(solubilidad("cloruro", 0) + 5);
    for (const s of Object.keys(SALES) as (keyof typeof SALES)[]) for (let T = 0; T < 100; T += 5) expect(solubilidad(s, T + 5)).toBeGreaterThanOrEqual(solubilidad(s, T));
    expect(estadoDisolucion(25, 40)).toBe("insaturada");
    expect(estadoDisolucion(40, 40)).toBe("saturada");
    expect(estadoDisolucion(55, 40)).toContain("sobresaturada");
  });
  it("separación", () => {
    expect(tecnicaCorrecta("arena")).toBe("filtracion");
    expect(tecnicaCorrecta("alcohol")).toBe("destilacion");
    expect(tecnicaCorrecta("nada")).toBeNull();
    for (const k of Object.keys(SEPARACIONES)) expect(TECNICAS).toContain(SEPARACIONES[k]!.tecnica);
  });
  it("composición", () => {
    for (const id of Object.keys(COMPOSICIONES)) expect(COMPOSICIONES[id]!.partes.reduce((s, p) => s + p.pct, 0)).toBeCloseTo(100);
    expect(masaComponentes("bronce", 500)[0]!.masa).toBeCloseTo(440);
    expect(masaComponentes("oro18", 100)[0]!.masa).toBeCloseTo(75);
    expect(masaComponentes("nada", 100)).toEqual([]);
  });
});
