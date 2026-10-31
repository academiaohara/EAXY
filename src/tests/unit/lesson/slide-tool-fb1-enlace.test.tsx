import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { COMPUESTOS, MOLECULAS, SERIES_EB, SUSTANCIAS, distribucionElectronica, electronesTotales, fuerzaRelativa, geometriaRPECV, hayAnomalia, indiceCoulomb, paresLewis, polaridadMolecular } from "@/components/lesson/slide/tools/Fb1EnlaceTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-energia-reticular-explorador", "fb1-lewis-explorador", "fb1-geometria-explorador", "fb1-fuerzas-intermoleculares-explorador", "fb1-sustancias-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de enlace (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("energía reticular", () => {
    const nacl = COMPUESTOS.find((c) => c.id === "NaCl")!;
    const mgo = COMPUESTOS.find((c) => c.id === "MgO")!;
    expect(indiceCoulomb(mgo.q1, mgo.q2, mgo.r1, mgo.r2)).toBeGreaterThan(3 * indiceCoulomb(nacl.q1, nacl.q2, nacl.r1, nacl.r2));
    expect(indiceCoulomb(1, 1, 0, 0)).toBeNaN();
    expect(fuerzaRelativa(1, 1, 138)).toBeCloseTo(4, 0);
    expect(fuerzaRelativa(2, 2, 276)).toBe(4);
    // la energía reticular tabulada sigue el orden del índice de Coulomb dentro de los haluros de sodio
    const nx = ["NaF", "NaCl", "NaBr", "NaI"].map((id) => COMPUESTOS.find((c) => c.id === id)!);
    for (let i = 1; i < nx.length; i += 1) {
      expect(nx[i]!.U).toBeLessThan(nx[i - 1]!.U);
      expect(indiceCoulomb(nx[i]!.q1, nx[i]!.q2, nx[i]!.r1, nx[i]!.r2)).toBeLessThan(indiceCoulomb(nx[i - 1]!.q1, nx[i - 1]!.q2, nx[i - 1]!.r1, nx[i - 1]!.r2));
    }
  });
  it("estructuras de Lewis", () => {
    for (const m of MOLECULAS) {
      const { solitarios, enlazantes } = paresLewis(m);
      expect(Number.isInteger(solitarios) && solitarios >= 0, m.formula).toBe(true);
      expect(electronesTotales(m), m.formula).toBe(2 * (enlazantes + solitarios));
    }
    const agua = MOLECULAS.find((m) => m.formula === "H₂O")!;
    expect(electronesTotales(agua)).toBe(8);
    expect(paresLewis(agua)).toEqual({ enlazantes: 2, solitarios: 2 });
    expect(electronesTotales(MOLECULAS.find((m) => m.formula === "NH₄⁺")!)).toBe(8);
    expect(electronesTotales(MOLECULAS.find((m) => m.formula === "SF₆")!)).toBe(48);
  });
  it("RPECV y polaridad", () => {
    expect(geometriaRPECV(4, 0)!.nombre).toBe("tetraédrica");
    expect(geometriaRPECV(3, 1)!.nombre).toBe("piramidal trigonal");
    expect(geometriaRPECV(2, 2)!.nombre).toBe("angular");
    expect(geometriaRPECV(4, 2)!.nombre).toBe("plana cuadrada");
    expect(geometriaRPECV(6, 3)).toBeNull();
    expect(distribucionElectronica(5)).toBe("bipirámide trigonal");
    expect(distribucionElectronica(9)).toBe("—");
    expect(polaridadMolecular(2, 0, true, true)).toBe("apolar");
    expect(polaridadMolecular(2, 0, false, true)).toBe("polar");
    expect(polaridadMolecular(2, 2, true, true)).toBe("polar");
    expect(polaridadMolecular(4, 0, true, false)).toBe("apolar");
    expect(polaridadMolecular(6, 3, true, true)).toBeNull();
  });
  it("series de ebullición y sustancias", () => {
    for (const s of SERIES_EB) expect(s.datos.length).toBeGreaterThan(3);
    expect(hayAnomalia(SERIES_EB.find((s) => s.id === "g16")!.datos)).toBe(true);
    expect(hayAnomalia(SERIES_EB.find((s) => s.id === "g14")!.datos)).toBe(false);
    expect(hayAnomalia(SERIES_EB.find((s) => s.id === "nobles")!.datos)).toBe(false);
    expect(hayAnomalia([])).toBe(false);
    const tipos = new Set(SUSTANCIAS.map((s) => s.tipo));
    expect(tipos.size).toBe(4);
  });
});
