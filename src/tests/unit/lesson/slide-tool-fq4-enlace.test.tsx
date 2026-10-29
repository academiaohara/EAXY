import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { COMPUESTOS_IONICOS, EJEMPLOS_PRUEBAS, MOLECULAS, SUSTANCIAS_FUERZAS, clasificarSustancia, diferenciaEN, electronesLewis, electronesTotales, indiceReticular, paresEnlazantes, paresSolitarios, tipoPorEN } from "@/components/lesson/slide/tools/Fq4EnlaceTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-red-ionica-explorador", "fq4-lewis-explorador", "fq4-clasifica-sustancia-explorador", "fq4-fuerzas-intermoleculares-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas del enlace (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("red iónica: el índice reticular ordena igual que el punto de fusión", () => {
    const idx = COMPUESTOS_IONICOS.map((c) => indiceReticular(c.q1, c.q2, c.r1, c.r2));
    for (let i = 1; i < COMPUESTOS_IONICOS.length; i++) {
      expect(idx[i]!).toBeGreaterThan(idx[i - 1]!);
      expect(COMPUESTOS_IONICOS[i]!.fusion).toBeGreaterThan(COMPUESTOS_IONICOS[i - 1]!.fusion);
    }
    expect(indiceReticular(2, 2, 72, 140)).toBeCloseTo(4 / 212);
    expect(indiceReticular(1, 1, 0, 0)).toBeNaN();
  });
  it("Lewis: la cuenta de electrones coincide con los de valencia", () => {
    for (const m of MOLECULAS) {
      expect(electronesLewis(m), m.formula).toBe(electronesTotales(m));
      expect(paresEnlazantes(m) * 2 + paresSolitarios(m) * 2).toBe(electronesTotales(m));
    }
    expect(electronesTotales(MOLECULAS.find((m) => m.formula === "NH3")!)).toBe(8);
    expect(electronesTotales(MOLECULAS.find((m) => m.formula === "CO2")!)).toBe(16);
  });
  it("electronegatividad y polaridad", () => {
    expect(diferenciaEN("H", "Cl")).toBeCloseTo(0.96);
    expect(diferenciaEN("H", "H")).toBe(0);
    expect(diferenciaEN("He", "H")).toBeNull();
    expect(diferenciaEN("Xx", "H")).toBeNull();
    expect(tipoPorEN(0.1)).toBe("covalente apolar");
    expect(tipoPorEN(0.96)).toBe("covalente polar");
    expect(tipoPorEN(3.05)).toBe("iónico");
    expect(tipoPorEN(null)).toBe("no definida");
    expect(tipoPorEN(diferenciaEN("Na", "Cl"))).toBe("iónico");
  });
  it("clasificación de sustancias", () => {
    expect(clasificarSustancia(EJEMPLOS_PRUEBAS[0]!.pruebas)).toBe("iónica");
    expect(clasificarSustancia(EJEMPLOS_PRUEBAS[1]!.pruebas)).toBe("metálica");
    expect(clasificarSustancia(EJEMPLOS_PRUEBAS[2]!.pruebas)).toBe("covalente molecular");
    expect(clasificarSustancia(EJEMPLOS_PRUEBAS[3]!.pruebas)).toBe("covalente reticular");
    expect(clasificarSustancia({ conduceSolido: false, conduceDisuelto: false, fusion: "media", dura: false, soluble: false })).toContain("indeterminada");
  });
  it("fuerzas intermoleculares", () => {
    const he = SUSTANCIAS_FUERZAS.find((s) => s.formula === "He")!;
    const xe = SUSTANCIAS_FUERZAS.find((s) => s.formula === "Xe")!;
    expect(xe.ebullicion).toBeGreaterThan(he.ebullicion);
    const agua = SUSTANCIAS_FUERZAS.find((s) => s.formula === "H₂O")!;
    const h2s = SUSTANCIAS_FUERZAS.find((s) => s.formula === "H₂S")!;
    expect(agua.ebullicion).toBeGreaterThan(h2s.ebullicion);
    for (const tipo of ["London", "dipolo-dipolo", "enlace de hidrógeno"] as const) expect(SUSTANCIAS_FUERZAS.some((s) => s.tipo === tipo)).toBe(true);
  });
});
