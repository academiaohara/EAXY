import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ELEMENTOS, MODELOS, SUSTANCIAS_FORMULA, capas, contarAtomos, electronesValencia, elemento, masaMolecular, neutronesTipicos, notacion, posicionTabla, sub, sup, tipoParticula } from "@/components/lesson/slide/tools/Fq2AtomoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq2-modelos-atomicos-explorador", "fq2-construir-atomo-explorador", "fq2-iones-isotopos-explorador", "fq2-tabla-periodica-explorador", "fq2-formulas-moleculas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas del átomo: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("elementos", () => {
    expect(ELEMENTOS).toHaveLength(20);
    expect(elemento(6)!.sim).toBe("C");
    expect(elemento(21)).toBeNull();
    expect(neutronesTipicos(6)).toBe(6);
    expect(neutronesTipicos(11)).toBe(12);
    expect(neutronesTipicos(1)).toBe(0);
    for (let z = 1; z <= 20; z++) expect(neutronesTipicos(z)).toBeGreaterThanOrEqual(0);
  });
  it("capas, grupos y periodos", () => {
    expect(capas(11)).toEqual([2, 8, 1]);
    expect(capas(17)).toEqual([2, 8, 7]);
    expect(capas(20)).toEqual([2, 8, 8, 2]);
    expect(capas(0)).toEqual([]);
    expect(electronesValencia(10)).toBe(8);
    expect(posicionTabla(11)).toEqual({ grupo: 1, periodo: 3 });
    expect(posicionTabla(17)).toEqual({ grupo: 17, periodo: 3 });
    expect(posicionTabla(2)).toEqual({ grupo: 18, periodo: 1 });
    expect(posicionTabla(8)).toEqual({ grupo: 16, periodo: 2 });
    expect(posicionTabla(13)).toEqual({ grupo: 13, periodo: 3 });
    expect(posicionTabla(20)).toEqual({ grupo: 2, periodo: 4 });
    expect(posicionTabla(0)).toBeNull();
    // las posiciones son únicas
    const claves = Array.from({ length: 20 }, (_, i) => JSON.stringify(posicionTabla(i + 1)));
    expect(new Set(claves).size).toBe(20);
    // el periodo es el número de capas
    for (let z = 3; z <= 20; z++) expect(posicionTabla(z)!.periodo).toBe(capas(z).length);
  });
  it("notación y tipo", () => {
    expect(notacion(11, 23, 1)).toBe("²³₁₁Na⁺");
    expect(notacion(8, 16, -2)).toBe("¹⁶₈O²⁻");
    expect(notacion(6, 12, 0)).toBe("¹²₆C");
    expect(sup(23)).toBe("²³");
    expect(sub(12)).toBe("₁₂");
    expect(tipoParticula(11, 10)).toContain("catión");
    expect(tipoParticula(17, 18)).toContain("anión");
    expect(tipoParticula(6, 6)).toBe("átomo neutro");
  });
  it("fórmulas", () => {
    expect(contarAtomos("H2O")).toEqual({ H: 2, O: 1 });
    expect(contarAtomos("C6H12O6")).toEqual({ C: 6, H: 12, O: 6 });
    expect(contarAtomos("NaCl")).toEqual({ Na: 1, Cl: 1 });
    expect(contarAtomos("xyz")).toBeNull();
    expect(masaMolecular("H2O")).toBe(18);
    expect(masaMolecular("CO2")).toBe(44);
    expect(masaMolecular("NaCl")).toBe(58.5);
    expect(masaMolecular("Xx2")).toBeNaN();
    for (const s of SUSTANCIAS_FORMULA) expect(Number.isFinite(masaMolecular(s.f))).toBe(true);
    expect(MODELOS).toHaveLength(4);
  });
});
