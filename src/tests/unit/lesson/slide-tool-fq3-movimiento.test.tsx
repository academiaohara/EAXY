import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { aceleracionMedia, alturaMaxima, distanciaParada, perfilVT, posicionMRUA, recorridoEn, tiempoCaida, tiempoParada, tiempoSubida, velocidadEn, velocidadImpacto, velocidadMRUA, velocidadSinTiempo } from "@/components/lesson/slide/tools/Fq3MovimientoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-aceleracion-explorador", "fq3-mrua-explorador", "fq3-grafica-vt-explorador", "fq3-caida-frenada-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas del movimiento (3.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 5, b: 5, c: 5, n: 2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("aceleración y MRUA", () => {
    expect(aceleracionMedia(0, 20, 5)).toBe(4);
    expect(aceleracionMedia(0, 20, 0)).toBeNaN();
    expect(velocidadMRUA(10, 3, 4)).toBe(22);
    expect(velocidadMRUA(10, -5, 10)).toBe(0);
    expect(tiempoParada(25, -5)).toBe(5);
    expect(tiempoParada(25, 1)).toBe(Infinity);
    expect(posicionMRUA(0, 0, 2, 5)).toBe(25);
    expect(posicionMRUA(0, 10, 2, 4)).toBe(56);
    expect(posicionMRUA(0, 10, -5, 10)).toBeCloseTo(10);
    expect(velocidadSinTiempo(0, 2, 25)).toBeCloseTo(10);
    expect(velocidadSinTiempo(0, -2, 25)).toBeNaN();
    expect(posicionMRUA(0, 0, 2, 4)).toBe(4 * posicionMRUA(0, 0, 2, 2));
  });
  it("perfil v-t", () => {
    const p = { a1: 2, t1: 5, t2: 10, a3: -2 };
    const q = perfilVT(p);
    expect(q.v1).toBe(10);
    expect(q.t3).toBe(5);
    expect(q.distancia).toBe(150);
    expect(velocidadEn(p, 2.5)).toBe(5);
    expect(velocidadEn(p, 8)).toBe(10);
    expect(velocidadEn(p, 17.5)).toBeCloseTo(5);
    expect(velocidadEn(p, 100)).toBe(0);
    expect(recorridoEn(p, 5)).toBe(25);
    expect(recorridoEn(p, 100)).toBeCloseTo(150);
    expect(recorridoEn(p, -3)).toBe(0);
    expect(perfilVT({ a1: 0, t1: 0, t2: 0, a3: 0 }).distancia).toBe(0);
  });
  it("caída, lanzamiento y frenada", () => {
    expect(tiempoCaida(20)).toBeCloseTo(2.02, 2);
    expect(velocidadImpacto(20)).toBeCloseTo(19.8, 1);
    expect(tiempoCaida(-1)).toBeNaN();
    expect(tiempoCaida(10, 0)).toBeNaN();
    expect(alturaMaxima(20, 10)).toBe(20);
    expect(tiempoSubida(19.6)).toBeCloseTo(2);
    const d = distanciaParada(72, 1, 5);
    expect(d.reaccion).toBeCloseTo(20);
    expect(d.frenado).toBeCloseTo(40);
    expect(d.total).toBeCloseTo(60);
    expect(distanciaParada(144, 0, 5).frenado).toBeCloseTo(4 * distanciaParada(72, 0, 5).frenado);
    expect(distanciaParada(72, 1, 0).frenado).toBeNaN();
  });
});
