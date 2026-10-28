import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ANIONES, AVOGADRO, CATIONES, MASAS_MOL, MOLECULAS, SUSTANCIAS, TIPOS_ENLACE, atomosEnMoles, formulaIonica, moles, nombreIonico, paresCompartidos, particulas, proporcionIonica, texSci, valenciasCorrectas } from "@/components/lesson/slide/tools/Fq3CompuestosTools";
import { masaMolecular } from "@/components/lesson/slide/tools/Fq2AtomoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-sustancias-explorador", "fq3-enlace-ionico-explorador", "fq3-enlace-covalente-explorador", "fq3-propiedades-enlace-explorador", "fq3-mol-explorador", "fq3-nomenclatura-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de compuestos (3.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

const cat = (s: string) => CATIONES.find((c) => c.sim === s)!;
const ani = (s: string) => ANIONES.find((c) => c.sim === s)!;

describe("resultados", () => {
  it("compuestos iónicos", () => {
    expect(proporcionIonica(2, -1)).toEqual({ cationes: 1, aniones: 2 });
    expect(proporcionIonica(3, -2)).toEqual({ cationes: 2, aniones: 3 });
    expect(proporcionIonica(2, -2)).toEqual({ cationes: 1, aniones: 1 });
    expect(proporcionIonica(0, -1).cationes).toBeNaN();
    expect(formulaIonica(cat("Na"), ani("Cl"))).toBe("NaCl");
    expect(formulaIonica(cat("Mg"), ani("Cl"))).toBe("MgCl₂");
    expect(formulaIonica(cat("Al"), ani("O"))).toBe("Al₂O₃");
    expect(formulaIonica(cat("Mg"), ani("N"))).toBe("Mg₃N₂");
    expect(nombreIonico(cat("Na"), ani("O"))).toBe("óxido de sodio");
    for (const c of CATIONES) {
      for (const a of ANIONES) {
        const p = proporcionIonica(c.carga, a.carga);
        expect(p.cationes * c.carga + p.aniones * a.carga).toBe(0);
      }
    }
  });
  it("moléculas", () => {
    for (const m of MOLECULAS) expect(valenciasCorrectas(m), m.formula).toBe(true);
    expect(paresCompartidos(MOLECULAS.find((m) => m.formula === "CO2")!)).toBe(4);
    expect(valenciasCorrectas({ formula: "X", nombre: "x", atomos: ["O", "H"], enlaces: [1] })).toBe(false);
  });
  it("sustancias y propiedades", () => {
    expect(SUSTANCIAS.length).toBeGreaterThan(5);
    expect(TIPOS_ENLACE.find((t) => t.id === "ionico")!.fusion).toBeGreaterThan(TIPOS_ENLACE.find((t) => t.id === "molecular")!.fusion);
  });
  it("mol", () => {
    expect(masaMolecular("H2O")).toBe(18);
    expect(masaMolecular("CO2")).toBe(44);
    expect(masaMolecular("NH3")).toBe(17);
    for (const f of MASAS_MOL) expect(masaMolecular(f), f).toBeGreaterThan(0);
    expect(moles(36, 18)).toBe(2);
    expect(moles(36, 0)).toBeNaN();
    expect(particulas(1)).toBe(AVOGADRO);
    expect(atomosEnMoles("H2O", 1)).toBeCloseTo(3 * AVOGADRO, -20);
    expect(atomosEnMoles("xyz", 1)).toBeNaN();
    expect(texSci(6.022e23)).toContain("10²³");
    expect(texSci(0)).toBe("0");
  });
});
