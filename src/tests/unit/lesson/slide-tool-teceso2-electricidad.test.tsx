import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { energiaKWh, intensidad, lecturaPolimetro, medidasAveria, ohm, potencia, reqParalelo, reqSerie, resuelve, resuelveMixto } from "@/components/lesson/slide/tools/TecEso2ElectricidadTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso2-analogia-agua-explorador", "eso2-ohm-incognita-explorador", "eso2-factura-explorador", "eso2-serie-paralelo-explorador", "eso2-mixto-explorador", "eso2-polimetro-explorador", "eso2-fallo-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 2.º ESO, tema 5: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 5", () => {
  it("ley de Ohm, potencia y energía", () => {
    expect(intensidad(24, 12)).toBe(2);
    expect(ohm("V", 0.2, 50)).toBeCloseTo(10);
    expect(ohm("I", 24, 12)).toBe(2);
    expect(ohm("R", 230, 0.5)).toBe(460);
    expect(potencia(230, 5)).toBe(1150);
    expect(energiaKWh(2000, 1.5)).toBe(3);
  });
  it("serie, paralelo y mixto", () => {
    expect(reqSerie([10, 20, 30])).toBe(60);
    expect(reqParalelo([10, 10])).toBe(5);
    expect(reqParalelo([4, 12])).toBeCloseTo(3);
    const p = resuelve("paralelo", 12, 6, 12);
    expect(p.iTotal).toBeCloseTo(3);
    const s = resuelve("serie", 12, 4, 8);
    expect(s.iTotal).toBeCloseTo(1);
    expect(s.v1 + s.v2).toBeCloseTo(12);
    const m = resuelveMixto(12, 4, 6, 3);
    expect(m.rp).toBeCloseTo(2);
    expect(m.req).toBeCloseTo(6);
    expect(m.iTotal).toBeCloseTo(2);
    expect(m.i2 + m.i3).toBeCloseTo(m.iTotal);
  });
  it("polímetro y averías", () => {
    expect(lecturaPolimetro("V", "r1", 9, 100, 200).texto).toContain("3");
    expect(lecturaPolimetro("A", "r1", 9, 100, 200).ok).toBe(false);
    expect(lecturaPolimetro("A", "serie", 9, 100, 200).ok).toBe(true);
    expect(medidasAveria("lampara", 6, 12)).toMatchObject({ i: 0, vLampara: 6 });
    expect(medidasAveria("cable", 6, 12).vLampara).toBe(0);
  });
});
