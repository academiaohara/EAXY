import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { GASES, SOLUTOS, ascensoEbulloscopico, avogadro, boyle, charles, combinada, concentracionFinal, concentraciones, densidadGas, descensoCrioscopico, gayLussac, masaGas, masaMolarDesdeDensidad, mezclaGases, molesGas, presionGas, presionOsmotica, temperaturaGas, volumenAlicuota, volumenFinal, volumenGas } from "@/components/lesson/slide/tools/Fb1GasesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-leyes-gases-explorador", "fb1-gas-ideal-explorador", "fb1-mezcla-gases-explorador", "fb1-concentracion-explorador", "fb1-dilucion-coligativas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de gases y disoluciones (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("leyes de los gases", () => {
  it("Boyle, Charles, Gay-Lussac, Avogadro y combinada", () => {
    expect(boyle(1, 6, 2)).toBe(3);
    expect(boyle(1, 6, 0)).toBeNaN();
    expect(charles(10, 300, 450)).toBe(15);
    expect(charles(10, 0, 450)).toBeNaN();
    expect(gayLussac(2, 300, 600)).toBe(4);
    expect(avogadro(10, 0.4, 0.8)).toBe(20);
    expect(combinada(1, 10, 300, 2, 600)).toBe(10);
    expect(combinada(1, 10, 300, 0, 600)).toBeNaN();
  });
  it("gas ideal", () => {
    expect(volumenGas(1, 273, 1)).toBeCloseTo(22.39, 1);
    expect(molesGas(1, 22.4, 273)).toBeCloseTo(1, 1);
    expect(presionGas(1, 300, 10)).toBeCloseTo(2.46, 2);
    expect(temperaturaGas(1, 22.4, 1)).toBeCloseTo(273.2, 0);
    expect(densidadGas(1, 44, 273)).toBeCloseTo(1.966, 2);
    expect(masaMolarDesdeDensidad(1.25, 273, 1)).toBeCloseTo(28, 0);
    expect(molesGas(1, 1, 0)).toBeNaN();
    expect(presionGas(1, 300, 0)).toBeNaN();
    for (const g of GASES) expect(Number.isFinite(masaGas(g.f)), g.f).toBe(true);
    expect(masaGas("He")).toBe(4);
    expect(masaGas("CO2")).toBe(44);
  });
  it("coherencia: PV = nRT con cualquier despeje", () => {
    const n = 0.7;
    const T = 350;
    const V = 12;
    const P = presionGas(n, T, V);
    expect(volumenGas(n, T, P)).toBeCloseTo(V, 9);
    expect(molesGas(P, V, T)).toBeCloseTo(n, 9);
    expect(temperaturaGas(P, V, n)).toBeCloseTo(T, 9);
  });
});

describe("mezclas", () => {
  it("fracciones molares y presiones parciales (Dalton)", () => {
    const m = mezclaGases([{ f: "N2", n: 3 }, { f: "O2", n: 1 }], 300, 10);
    expect(m.comp[0]!.x).toBe(0.75);
    expect(m.comp.reduce((s, c) => s + c.x, 0)).toBeCloseTo(1, 9);
    expect(m.comp.reduce((s, c) => s + c.P, 0)).toBeCloseTo(m.P, 9);
    expect(m.comp[1]!.P).toBeCloseTo(presionGas(1, 300, 10), 9);
    expect(m.masaT).toBe(3 * 28 + 32);
    expect(m.comp.reduce((s, c) => s + c.pctMasa, 0)).toBeCloseTo(100, 6);
    const vacia = mezclaGases([{ f: "N2", n: 0 }], 300, 10);
    expect(vacia.comp[0]!.x).toBeNaN();
  });
});

describe("disoluciones", () => {
  it("concentraciones", () => {
    const c = concentraciones(20, 40, 0.5, 1);
    expect(c.molaridad).toBe(1);
    expect(c.gPorL).toBe(40);
    expect(c.pctMasa).toBeCloseTo(4, 6);
    expect(c.pctMasaVol).toBe(4);
    expect(c.molalidad).toBeCloseTo(0.5 / 0.48, 6);
    expect(concentraciones(10, 58.5, 0.09, 1.0).pctMasa).toBeCloseTo(11.11, 1);
    expect(concentraciones(1, 1, 0, 1).molaridad).toBeNaN();
    for (const s of SOLUTOS) expect(Number.isFinite(concentraciones(10, 1, 1, 1.1).molaridad), s.f).toBe(true);
  });
  it("dilución", () => {
    expect(volumenAlicuota(0.5, 100, 2)).toBe(25);
    expect(volumenFinal(2, 100, 0.5)).toBe(400);
    expect(concentracionFinal(1, 50, 250)).toBe(0.2);
    expect(concentracionFinal(1, 50, 0)).toBeNaN();
  });
  it("propiedades coligativas", () => {
    expect(descensoCrioscopico(1, 1)).toBeCloseTo(1.86);
    expect(descensoCrioscopico(1, 2)).toBeCloseTo(3.72);
    expect(ascensoEbulloscopico(1, 3)).toBeCloseTo(1.56);
    expect(presionOsmotica(0.1, 300, 1)).toBeCloseTo(2.46, 2);
  });
});
