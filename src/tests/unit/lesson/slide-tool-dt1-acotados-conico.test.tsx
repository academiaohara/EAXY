import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloPendiente, colina, cubierta, intervaloPlano, rectaAcotada } from "@/components/lesson/slide/tools/DtAcotadosTools";
import { cajaGirada, carasVisibles, proyeccionConica, puntoFuga } from "@/components/lesson/slide/tools/DtConicoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-recta-acotada-explorador", "dt1-plano-acotado-explorador", "dt1-cubierta-explorador", "dt1-curvas-nivel-explorador", "dt1-perspectiva-conica-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico I, planos acotados y cónico: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: 5, b: 0, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de los planos acotados", () => {
  it("recta acotada", () => {
    const r = rectaAcotada([0, 0, 2], [8, 6, 5]);
    expect(r.d).toBeCloseTo(10);
    expect(r.porcentaje).toBeCloseTo(30);
    expect(r.intervalo).toBeCloseTo(3.3333, 3);
    expect(r.angulo).toBeCloseTo(16.699, 2);
    expect(r.real).toBeCloseTo(10.4403, 3);
    expect(r.grad.map((g) => g.cota)).toEqual([2, 3, 4, 5]);
    expect(r.grad[1]!.pos).toBeCloseTo(3.3333, 3);
    expect(rectaAcotada([0, 0, 2], [8, 6, 2]).intervalo).toBe(Infinity);
    expect(rectaAcotada([0, 0, 2], [0, 0, 5]).pendiente).toBeNaN();
    // recta descendente
    expect(rectaAcotada([0, 0, 5], [10, 0, 2]).grad.map((g) => g.cota)).toEqual([5, 4, 3, 2]);
  });
  it("plano, cubierta y curvas de nivel", () => {
    expect(intervaloPlano(0.25)).toBe(4);
    expect(intervaloPlano(0)).toBe(Infinity);
    expect(anguloPendiente(1)).toBeCloseTo(45);
    expect(1 / intervaloPlano(1 / 1.5)).toBeCloseTo(0.6667, 3);
    const c = cubierta(10, 6, 0.5);
    expect(c.altura).toBeCloseTo(1.5);
    expect(c.cumbrera).toBe(4);
    expect(c.area).toBeCloseTo(67.082, 2);
    expect(cubierta(6, 10, 0.5).cumbrera).toBe(4);
    const col = colina(100, 200, 100, 10);
    expect(col.cotas).toHaveLength(9);
    expect(col.sepX).toBeCloseTo(20);
    expect(col.sepY).toBeCloseTo(10);
    expect(col.pendX).toBeCloseTo(0.5);
    expect(col.pendY).toBeCloseTo(1);
    expect(colina(100, 200, 100, 0).cotas).toHaveLength(0);
    expect(colina(100, 200, 100, 100).cotas).toHaveLength(0);
  });
});

describe("resultados del sistema cónico", () => {
  it("proyección cónica y puntos de fuga", () => {
    expect(proyeccionConica([6, 10, 0], 10, 2)).toEqual([3, 1]);
    expect(proyeccionConica([6, 0, 0], 10, 2)).toEqual([6, 0]);
    expect(proyeccionConica([1, -10, 0], 10, 2)).toBeNull();
    expect(proyeccionConica([1, -12, 0], 10, 2)).toBeNull();
    // los puntos de la LH no cambian de altura
    expect(proyeccionConica([3, 7, 5], 10, 5)![1]).toBeCloseTo(5);
    expect(puntoFuga(Math.cos(Math.PI / 6), Math.sin(Math.PI / 6), 10)).toBeCloseTo(17.3205, 3);
    expect(puntoFuga(-Math.sin(Math.PI / 6), Math.cos(Math.PI / 6), 10)).toBeCloseTo(-5.7735, 3);
    expect(puntoFuga(Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), 10)).toBeCloseTo(10, 6);
    expect(puntoFuga(1, 0, 10)).toBeNull();
  });
  it("caras visibles de la caja", () => {
    const cuboFrontal = cajaGirada(4, 3, 3, 0);
    const v = carasVisibles(cuboFrontal, 10, 5);
    // observador sobre la caja (h = 5 > 3): se ve la tapa, no la base
    expect(v[1]).toBe(true);
    expect(v[0]).toBe(false);
    // y la cara frontal (y mínima)
    expect(v[2]).toBe(true);
    // observador por debajo: se ve la base
    const bajo = carasVisibles(cuboFrontal, 10, -1);
    expect(bajo[0]).toBe(true);
    expect(bajo[1]).toBe(false);
    // una caja girada 30° muestra dos caras laterales
    const g = carasVisibles(cajaGirada(4, 3, 3, 30, 0), 10, 5);
    expect(g.slice(2).filter(Boolean).length).toBe(2);
  });
});
