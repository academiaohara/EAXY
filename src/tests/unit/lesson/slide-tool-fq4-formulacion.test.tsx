import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ANIONES_BINARIOS, COMPUESTOS_NOX, ELEMENTOS_OXIDO, METALES, NOMETALES_OXIDO, OXOACIDOS, OXOANIONES, generarHidroxido, generarHidruroMetalico, generarOxido, generarSal, incognitaNox, ion, parseFormula, prefijo, proporcion, romano } from "@/components/lesson/slide/tools/Fq4FormulacionTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-oxidacion-explorador", "fq4-oxidos-explorador", "fq4-hidruros-explorador", "fq4-sales-binarias-explorador", "fq4-hidroxidos-oxoacidos-explorador", "fq4-oxisales-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);
const el = (s: string) => ELEMENTOS_OXIDO.find((e) => e.s === s)!;
const metal = (s: string) => METALES.find((e) => e.s === s)!;
const an = (s: string) => [...ANIONES_BINARIOS, ...OXOANIONES].find((a) => a.s === s)!;

describe("herramientas de formulación (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 5, b: 5, c: 5, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("motor de formulación", () => {
  it("auxiliares", () => {
    expect(romano(3)).toBe("III");
    expect(romano(7)).toBe("VII");
    expect(prefijo(3)).toBe("tri");
    expect(proporcion(3, 2)).toEqual([2, 3]);
    expect(proporcion(4, 2)).toEqual([1, 2]);
    expect(proporcion(2, 2)).toEqual([1, 1]);
    expect(proporcion(0, 2)[0]).toBeNaN();
    expect(ion("Fe", 3)).toBe("Fe³⁺");
    expect(ion("Cl", -1)).toBe("Cl⁻");
    expect(ion("S", -2)).toBe("S²⁻");
  });
  it("óxidos", () => {
    const fe3 = generarOxido(el("Fe"), 3);
    expect(fe3).toMatchObject({ formula: "Fe₂O₃", sistematica: "trióxido de dihierro", stock: "óxido de hierro(III)" });
    expect(generarOxido(el("Fe"), 2)).toMatchObject({ formula: "FeO", stock: "óxido de hierro(II)" });
    expect(generarOxido(el("C"), 2)).toMatchObject({ formula: "CO", sistematica: "monóxido de carbono", stock: "óxido de carbono(II)" });
    expect(generarOxido(el("C"), 4)).toMatchObject({ formula: "CO₂", sistematica: "dióxido de carbono" });
    expect(generarOxido(el("Ca"), 2)).toMatchObject({ formula: "CaO", stock: "óxido de calcio" });
    expect(generarOxido(el("Na"), 1)).toMatchObject({ formula: "Na₂O", stock: "óxido de sodio", sistematica: "monóxido de disodio" });
    expect(generarOxido(el("Cl"), 7)).toMatchObject({ formula: "Cl₂O₇", sistematica: "heptaóxido de dicloro" });
    expect(generarOxido(el("N"), 4).formula).toBe("NO₂");
    expect(generarOxido(el("N"), 5).formula).toBe("N₂O₅");
    expect(generarOxido(el("Al"), 3).formula).toBe("Al₂O₃");
    // el nº de oxidación se conserva: carga positiva = carga negativa
    for (const e of ELEMENTOS_OXIDO) for (const n of e.nox) {
      const o = generarOxido(e, n);
      expect(o.subE * n).toBe(o.subO * 2);
    }
  });
  it("hidruros e hidróxidos", () => {
    expect(generarHidruroMetalico(metal("Na"), 1)).toMatchObject({ formula: "NaH", stock: "hidruro de sodio", sistematica: "hidruro de sodio" });
    expect(generarHidruroMetalico(metal("Fe"), 3)).toMatchObject({ formula: "FeH₃", stock: "hidruro de hierro(III)", sistematica: "trihidruro de hierro" });
    expect(generarHidroxido(metal("Na"), 1)).toMatchObject({ formula: "NaOH", stock: "hidróxido de sodio" });
    expect(generarHidroxido(metal("Ca"), 2)).toMatchObject({ formula: "Ca(OH)₂", stock: "hidróxido de calcio", sistematica: "dihidróxido de calcio" });
    expect(generarHidroxido(metal("Fe"), 3)).toMatchObject({ formula: "Fe(OH)₃", stock: "hidróxido de hierro(III)", sistematica: "trihidróxido de hierro" });
  });
  it("sales binarias y oxisales", () => {
    expect(generarSal(metal("Na"), 1, an("Cl"))).toMatchObject({ formula: "NaCl", stock: "cloruro de sodio" });
    expect(generarSal(metal("Fe"), 3, an("Cl"))).toMatchObject({ formula: "FeCl₃", stock: "cloruro de hierro(III)", sistematica: "tricloruro de hierro" });
    expect(generarSal(metal("Al"), 3, an("S"))).toMatchObject({ formula: "Al₂S₃", stock: "sulfuro de aluminio", sistematica: "trisulfuro de dialuminio" });
    expect(generarSal(metal("Mg"), 2, an("N")).formula).toBe("Mg₃N₂");
    expect(generarSal(metal("Cu"), 1, an("S")).formula).toBe("Cu₂S");
    expect(generarSal(metal("Fe"), 3, an("SO₄"))).toMatchObject({ formula: "Fe₂(SO₄)₃", stock: "sulfato de hierro(III)" });
    expect(generarSal(metal("Ca"), 2, an("CO₃"))).toMatchObject({ formula: "CaCO₃", stock: "carbonato de calcio" });
    expect(generarSal(metal("Ca"), 2, an("PO₄")).formula).toBe("Ca₃(PO₄)₂");
    expect(generarSal(metal("Na"), 1, an("ClO")).formula).toBe("NaClO");
    expect(generarSal(metal("Ag"), 1, an("NO₃"))).toMatchObject({ formula: "AgNO₃", stock: "nitrato de plata" });
    for (const m of METALES) for (const n of m.nox) for (const a of [...ANIONES_BINARIOS, ...OXOANIONES]) {
      const r = generarSal(m, n, a);
      expect(r.subC * n, `${m.s}${n}${a.s}`).toBe(r.subA * a.carga);
    }
  });
  it("oxoácidos y datos", () => {
    expect(OXOACIDOS.find((o) => o.formula === "H₂SO₄")!.tradicional).toBe("ácido sulfúrico");
    expect(OXOACIDOS.length).toBe(10);
    expect(NOMETALES_OXIDO.length).toBe(5);
  });
  it("números de oxidación", () => {
    expect(parseFormula("H2SO4")).toEqual({ H: 2, S: 1, O: 4 });
    expect(parseFormula("Al2(SO4)3")).toEqual({ Al: 2, S: 3, O: 12 });
    expect(parseFormula("Ca(OH)2")).toEqual({ Ca: 1, O: 2, H: 2 });
    expect(parseFormula("(")).toBeNull();
    expect(parseFormula("a")).toBeNull();
    expect(incognitaNox("H2SO4")).toMatchObject({ elemento: "S", nox: 6 });
    expect(incognitaNox("HNO3")!.nox).toBe(5);
    expect(incognitaNox("KMnO4")!.nox).toBe(7);
    expect(incognitaNox("K2Cr2O7")!.nox).toBe(6);
    expect(incognitaNox("NH3")!.nox).toBe(-3);
    expect(incognitaNox("Al2(SO4)3")!.nox).toBe(6);
    expect(incognitaNox("NaCl")).toMatchObject({ elemento: "Cl", nox: -1 });
    expect(incognitaNox("KMnO4Cl2")).toBeNull();
    expect(incognitaNox("Fe2O3")!.nox).toBe(3);
    for (const f of COMPUESTOS_NOX) expect(incognitaNox(f), f).not.toBeNull();
  });
});
