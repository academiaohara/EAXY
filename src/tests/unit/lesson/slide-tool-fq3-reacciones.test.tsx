import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { COMBUSTIBLES, REACCIONES_ENTORNO, REACCIONES_MASA, co2Combustion, especies, masaEspecie, productoFormado, tiempoMitad, velocidadRelativa } from "@/components/lesson/slide/tools/Fq3ReaccionesTools";
import { estaAjustada } from "@/components/lesson/slide/tools/Fq2ReaccionesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-estequiometria-masas-explorador", "fq3-velocidad-reaccion-explorador", "fq3-reacciones-entorno-explorador", "fq3-emisiones-combustion-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de reacciones (3.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("las reacciones están ajustadas y conservan la masa", () => {
    for (const r of REACCIONES_MASA) {
      expect(estaAjustada(r, r.coef), r.id).toBe(true);
      const fs = especies(r);
      const nr = r.reactivos.length;
      const masas = fs.map((_, i) => masaEspecie(r, 0, i, 10));
      const antes = masas.slice(0, nr).reduce((a, b) => a + b, 0);
      const despues = masas.slice(nr).reduce((a, b) => a + b, 0);
      expect(antes, r.id).toBeCloseTo(despues, 6);
    }
  });
  it("cálculos de masas", () => {
    const agua = REACCIONES_MASA[0]!;
    expect(masaEspecie(agua, 0, 2, 4)).toBeCloseTo(36);
    expect(masaEspecie(agua, 0, 1, 4)).toBeCloseTo(32);
    const caliza = REACCIONES_MASA[4]!;
    expect(masaEspecie(caliza, 0, 1, 100)).toBeCloseTo(56);
    expect(masaEspecie(caliza, 0, 2, 100)).toBeCloseTo(44);
    expect(masaEspecie(agua, 0, 9, 4)).toBeNaN();
  });
  it("velocidad", () => {
    const ref = { temperatura: 20, concentracion: 1, trozos: 1, catalizador: false };
    expect(velocidadRelativa(ref)).toBe(1);
    expect(velocidadRelativa({ ...ref, temperatura: 40 })).toBe(4);
    expect(velocidadRelativa({ ...ref, concentracion: 2 })).toBe(2);
    expect(velocidadRelativa({ ...ref, trozos: 16 })).toBe(4);
    expect(velocidadRelativa({ ...ref, catalizador: true })).toBe(5);
    expect(productoFormado(0.1, 0)).toBe(0);
    expect(productoFormado(0.1, 1000)).toBeCloseTo(1);
    expect(productoFormado(0, 5)).toBe(0);
    expect(tiempoMitad(Math.LN2)).toBeCloseTo(1);
    expect(tiempoMitad(0)).toBeNaN();
  });
  it("combustión y emisiones", () => {
    expect(co2Combustion("CH4", 16)).toBeCloseTo(44);
    expect(co2Combustion("C", 12)).toBeCloseTo(44);
    expect(co2Combustion("H2O", 1)).toBeNaN();
    for (const c of COMBUSTIBLES) expect(co2Combustion(c.formula, 1), c.formula).toBeGreaterThan(2.5);
    expect(REACCIONES_ENTORNO.filter((r) => r.energia === "endotérmica").length).toBe(2);
  });
});
