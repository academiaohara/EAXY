import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloEntrePlanos, distanciaEntrePlanos, distanciaPuntoPlano, interseccionPlanos, planosParalelos, verdaderaMagnitud } from "@/components/lesson/slide/tools/DtDiedrico2Tools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-interseccion-planos-explorador", "dt1-planos-paralelos-explorador", "dt1-perpendicular-explorador", "dt1-distancia-verdadera-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);
const A = { phi1: 135, phi2: 45, m: 0 };

describe("herramientas de Dibujo Técnico I, relaciones en diédrico: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: 90, b: 90 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de relaciones y distancias", () => {
  it("intersección de planos", () => {
    const r = interseccionPlanos(A, { phi1: 45, phi2: 135, m: 4 });
    expect(r.H![0]).toBeCloseTo(2);
    expect(r.H![1]).toBeCloseTo(2);
    expect(r.V![0]).toBeCloseTo(2);
    expect(r.V![1]).toBeCloseTo(2);
    const g = interseccionPlanos(A, { phi1: 60, phi2: 75, m: 4 });
    expect(g.H![0]).toBeCloseTo(2.5359, 3);
    expect(g.V![0]).toBeCloseTo(5.4641, 3);
    // trazas verticales paralelas: la recta no tiene traza vertical
    expect(interseccionPlanos(A, { phi1: 90, phi2: 45, m: 3 }).V).toBeNull();
    expect(interseccionPlanos(A, { phi1: 90, phi2: 45, m: 3 }).H![0]).toBeCloseTo(3);
    expect(interseccionPlanos(A, { phi1: 135, phi2: 90, m: 3 }).H).toBeNull();
    // planos paralelos: no hay trazas
    expect(interseccionPlanos(A, { phi1: 135, phi2: 45, m: 3 })).toEqual({ H: null, V: null });
  });
  it("planos paralelos y ángulos", () => {
    expect(planosParalelos(A, { phi1: 135, phi2: 45, m: 3 })).toBe(true);
    expect(planosParalelos(A, { phi1: 135, phi2: 50, m: 3 })).toBe(false);
    expect(anguloEntrePlanos(A, { phi1: 45, phi2: 135, m: 4 })).toBeCloseTo(70.5288, 3);
    expect(distanciaEntrePlanos(A, { phi1: 135, phi2: 45, m: 3 })).toBeCloseTo(1.7321, 3);
    expect(distanciaEntrePlanos(A, { phi1: 135, phi2: 45, m: -3 })).toBeCloseTo(1.7321, 3);
    expect(distanciaEntrePlanos(A, { phi1: 45, phi2: 135, m: 3 })).toBeNaN();
  });
  it("distancia de un punto a un plano", () => {
    expect(distanciaPuntoPlano(A, [0, 0, 3]).distancia).toBeCloseTo(1.7321, 3);
    expect(distanciaPuntoPlano(A, [0, 0, 3]).pie[2]).toBeCloseTo(2);
    expect(distanciaPuntoPlano(A, [2, 0, 0]).distancia).toBeCloseTo(1.1547, 3);
    expect(distanciaPuntoPlano(A, [3, 3, 0]).distancia).toBeCloseTo(0, 6);
    // el pie pertenece al plano z = x − e
    const f = distanciaPuntoPlano(A, [1, 2, 5]).pie;
    expect(f[2]).toBeCloseTo(f[0] - f[1], 6);
  });
  it("verdadera magnitud", () => {
    expect(verdaderaMagnitud([-2, 1, 1], [2, 4, 5]).real).toBeCloseTo(6.4031, 3);
    expect(verdaderaMagnitud([-2, 1, 1], [1, 1, 5]).real).toBeCloseTo(5);
    expect(verdaderaMagnitud([-2, 1, 1], [1, 1, 5]).inclinacion).toBeCloseTo(53.13, 2);
    expect(verdaderaMagnitud([0, 0, 0], [0, 0, 0]).real).toBe(0);
  });
});
