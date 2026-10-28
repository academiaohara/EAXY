import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { MATERIALES, ROSCAS, ajusteTolerancias, huellaMaterial, lineasRayado, listaPiezas, propiedadesPerfil, roscaMetrica } from "@/components/lesson/slide/tools/DtIINormalizacionTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt2-rosca-metrica-explorador", "dt2-cortes-pieza-explorador", "dt2-perfiles-seccion-explorador", "dt2-ajuste-tolerancias-explorador", "dt2-lista-piezas-explorador", "dt2-huella-material-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de normalización y proyecto: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 9 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 3 })).not.toThrow();
    expect(() => mount(tool, { n: 2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("roscas métricas", () => {
    const m10 = ROSCAS.find((r) => r.d === 10)!;
    expect(m10.p).toBe(1.5);
    expect(roscaMetrica(10, 1.5).broca).toBeCloseTo(8.5);
    expect(roscaMetrica(8, 1.25).nucleo).toBeCloseTo(6.466, 3);
    expect(roscaMetrica(10, 1.5).flanco).toBeCloseTo(9.0258, 3);
    for (let i = 1; i < ROSCAS.length; i++) expect(ROSCAS[i]!.d).toBeGreaterThan(ROSCAS[i - 1]!.d);
  });
  it("rayado a 45°", () => {
    const l = lineasRayado(35, 60, 6);
    expect(l.length).toBeGreaterThan(5);
    for (const [a, b] of l) {
      expect(b[0] - a[0]).toBeCloseTo(b[1] - a[1]);
      for (const p of [a, b]) {
        expect(p[0]).toBeGreaterThanOrEqual(-1e-9);
        expect(p[0]).toBeLessThanOrEqual(35 + 1e-9);
        expect(p[1]).toBeGreaterThanOrEqual(-1e-9);
        expect(p[1]).toBeLessThanOrEqual(60 + 1e-9);
      }
    }
    expect(lineasRayado(0, 10, 3)).toEqual([]);
    expect(lineasRayado(10, 10, 0)).toEqual([]);
  });
  it("perfiles", () => {
    expect(propiedadesPerfil("cuadrado", 30, 4).area).toBe(900);
    expect(propiedadesPerfil("cuadrado", 30, 4).masaMetro).toBeCloseTo(7.065);
    expect(propiedadesPerfil("redondo", 20, 4).area).toBeCloseTo(Math.PI * 100);
    expect(propiedadesPerfil("tubo", 40, 4).area).toBeCloseTo((Math.PI / 4) * (1600 - 1024));
    expect(propiedadesPerfil("angulo", 40, 4).area).toBe(4 * 76);
    expect(propiedadesPerfil("tubo", 20, 50).area).toBeGreaterThan(0);
  });
  it("ajustes", () => {
    const a = ajusteTolerancias(21, 0, -7, -20);
    expect(a.juegoMax).toBe(41);
    expect(a.juegoMin).toBe(7);
    expect(a.tipo).toBe("con juego");
    expect(ajusteTolerancias(21, 0, 40, 30).tipo).toBe("con apriete");
    expect(ajusteTolerancias(21, 0, 10, -5).tipo).toBe("indeterminado");
    expect(a.toleranciaAjuste).toBe(34);
  });
  it("lista de piezas", () => {
    const l = listaPiezas(6);
    expect(l.filas.find((f) => f.nombre === "Arandela")!.cant).toBe(12);
    expect(l.piezas).toBe(2 + 1 + 6 + 6 + 12);
    expect(l.masa).toBeCloseTo(2 * 1.2 + 0.02 + 6 * 0.05 + 6 * 0.02 + 12 * 0.005);
  });
  it("huella de material", () => {
    const h = huellaMaterial("acero", 200, 0);
    expect(h.masa).toBeCloseTo(1.57);
    expect(huellaMaterial("aluminio", 200, 0).masa).toBeCloseTo(0.54);
    expect(huellaMaterial("acero", 200, 1).co2).toBeCloseTo(h.co2 * 0.2);
    expect(huellaMaterial("acero", 200, 5).co2).toBeCloseTo(h.co2 * 0.2);
    expect(MATERIALES.aluminio.factor).toBeGreaterThan(MATERIALES.acero.factor);
  });
});
