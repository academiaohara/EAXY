import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { aceleracionG, cajaCambios, desplazamientoLeva, fuerzaCable, longitudCadena, potenciaElevacion, potenciaMecanica, rendimientoTotal, sinFin } from "@/components/lesson/slide/tools/TecEso3MecanismosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso3-cadena-pinon-explorador", "eso3-sin-fin-explorador", "eso3-leva-explorador", "eso3-caja-cambios-explorador", "eso3-rendimiento-explorador", "eso3-grua-explorador", "eso3-lavadora-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 3.º ESO, tema 3: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 3", () => {
  it("cadena, sin fin y levas", () => {
    expect(longitudCadena(11, 33, 400) % 2).toBe(0);
    expect(longitudCadena(11, 33, 600)).toBeGreaterThan(longitudCadena(11, 33, 400));
    const r = sinFin(1500, 30, 1, 0.5, 0.4);
    expect(r.i).toBe(30);
    expect(r.nOut).toBe(50);
    expect(r.parOut).toBeCloseTo(6);
    expect(sinFin(1500, 30, 2, 0.5, 0.4).i).toBe(15);
    expect(desplazamientoLeva("corazón", 90, 20)).toBe(10);
    expect(desplazamientoLeva("corazón", 270, 20)).toBe(10);
    expect(desplazamientoLeva("excéntrica", 180, 20)).toBeCloseTo(20);
    expect(desplazamientoLeva("excéntrica", 0, 20)).toBeCloseTo(0);
    expect(desplazamientoLeva("caída brusca", 330, 20)).toBeCloseTo(10);
    expect(desplazamientoLeva("excéntrica", -90, 20)).toBeCloseTo(desplazamientoLeva("excéntrica", 270, 20));
  });
  it("caja de cambios, rendimiento y grúa", () => {
    const c = cajaCambios(3000, 0, 4, 0.31, 150);
    expect(c.iTotal).toBeCloseTo(14.4);
    expect(c.rpmRueda).toBeCloseTo(208.3, 1);
    expect(cajaCambios(3000, 4, 4, 0.31, 150).kmh).toBeGreaterThan(c.kmh);
    expect(potenciaMecanica(2, 3000)).toBeCloseTo(628.3, 1);
    expect(rendimientoTotal([0.9, 0.8, 0.95])).toBeCloseTo(0.684);
    expect(fuerzaCable(200, 2)).toBeCloseTo(980);
    expect(potenciaElevacion(200, 0.2, 0.7)).toBeCloseTo(560);
    expect(potenciaElevacion(200, 0.2, 0)).toBe(Infinity);
  });
  it("lavadora", () => {
    expect(aceleracionG(1500, 0.25)).toBeCloseTo(629.4, 0);
    expect(aceleracionG(0, 0.25)).toBe(0);
  });
});
