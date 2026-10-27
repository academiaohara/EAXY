import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { carrera, cinta, etapa, omega, planoInclinado, posicionEmbolo, reductora, relacionTransmision, rpmDeOmega } from "@/components/lesson/slide/tools/TecEso4MecanicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["eso4-transmision-explorador", "eso4-reductora-explorador", "eso4-biela-explorador", "eso4-rozamiento-explorador", "eso4-cinta-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 4.º ESO, tema 3: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 3", () => {
  it("transmisión y reductora", () => {
    expect(omega(500)).toBeCloseTo(52.36, 2);
    expect(rpmDeOmega(omega(1234))).toBeCloseTo(1234);
    expect(relacionTransmision(20, 60)).toBe(3);
    expect(relacionTransmision(0, 60)).toBe(0);
    const e = etapa(1500, 0.5, 20, 60, 1);
    expect(e.nSalida).toBeCloseTo(500);
    expect(e.parSalida).toBeCloseTo(1.5);
    expect(e.potSalida).toBeCloseTo(0.5 * omega(1500), 3);
    const r = reductora(3000, 0.1, 4, 2, 0.96);
    expect(r.iTotal).toBe(16);
    expect(r.nOut).toBeCloseTo(187.5);
    expect(r.eta).toBeCloseTo(0.9216);
    expect(r.potSalida).toBeCloseTo(r.potEntrada * r.eta, 3);
  });
  it("biela, rozamiento y cinta", () => {
    expect(carrera(30)).toBe(60);
    expect(posicionEmbolo(30, 100, 0) - posicionEmbolo(30, 100, 180)).toBeCloseTo(60);
    expect(posicionEmbolo(30, 10, 90)).toBeGreaterThanOrEqual(0);
    const h = planoInclinado(10, 0, 0.3);
    expect(h.normal).toBeCloseTo(98.1);
    expect(h.desliza).toBe(false);
    expect(planoInclinado(10, 45, 0.3).desliza).toBe(true);
    expect(planoInclinado(10, 10, 0.3).fuerzaSujetar).toBe(0);
    const c = cinta(1400, 20, 100, 80, 0.7);
    expect(c.nTambor).toBeCloseTo(70);
    expect(c.v).toBeCloseTo(0.366, 2);
    expect(c.potMotor).toBeCloseTo(c.potUtil / 0.7);
    expect(cinta(1400, 0, 100, 80, 0.7).v).toBe(0);
    expect(cinta(1400, 20, 100, 80, 0).potMotor).toBe(Infinity);
  });
});
