import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { REFERENCIAS_VELOCIDAD, encuentro, idaVuelta, interpretaGrafica, kmhAms, msAkmh, pendiente, posicionMRU, referenciaMasCercana, velocidadMedia } from "@/components/lesson/slide/tools/Fq2MovimientoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq2-referencia-desplazamiento-explorador", "fq2-velocidad-media-explorador", "fq2-mru-explorador", "fq2-grafica-posicion-tiempo-explorador", "fq2-encuentro-moviles-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas del movimiento: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("ida y vuelta", () => {
    const r = idaVuelta(300, 100);
    expect(r.distancia).toBe(400);
    expect(r.desplazamiento).toBe(200);
    expect(idaVuelta(60, 60).desplazamiento).toBe(0);
    const o = idaVuelta(60, 20, 10);
    expect(o.final).toBe(30);
    expect(o.desplazamiento).toBe(40);
    expect(o.distancia).toBe(80);
  });
  it("velocidad media y unidades", () => {
    expect(velocidadMedia(150, 2)).toBe(75);
    expect(velocidadMedia(1, 0)).toBeNaN();
    expect(kmhAms(90)).toBeCloseTo(25);
    expect(msAkmh(10)).toBeCloseTo(36);
    expect(kmhAms(msAkmh(7.3))).toBeCloseTo(7.3);
    expect(referenciaMasCercana(4).nombre).toContain("andando");
    expect(referenciaMasCercana(110).nombre).toContain("autopista");
    expect(REFERENCIAS_VELOCIDAD.length).toBeGreaterThan(4);
  });
  it("MRU y gráficas", () => {
    expect(posicionMRU(0, 5, 12)).toBe(60);
    expect(posicionMRU(100, 20, 5)).toBe(200);
    expect(posicionMRU(80, -10, 5)).toBe(30);
    expect(pendiente(10, 2, 50, 6)).toBe(10);
    expect(pendiente(40, 2, 40, 8)).toBe(0);
    expect(pendiente(1, 2, 3, 2)).toBeNaN();
    expect(interpretaGrafica(0)).toContain("reposo");
    expect(interpretaGrafica(3)).toContain("aleja");
    expect(interpretaGrafica(-3)).toContain("acerca");
  });
  it("encuentro", () => {
    const e = encuentro(0, 20, 300, -10)!;
    expect(e.t).toBeCloseTo(10);
    expect(e.x).toBeCloseTo(200);
    const a = encuentro(0, 30, 100, 20)!;
    expect(a.t).toBeCloseTo(10);
    expect(a.x).toBeCloseTo(300);
    expect(encuentro(0, 20, 100, 20)).toBeNull();
    expect(encuentro(0, 10, 100, 20)).toBeNull();
    // las posiciones coinciden
    expect(posicionMRU(0, 20, e.t)).toBeCloseTo(posicionMRU(300, -10, e.t));
  });
});
