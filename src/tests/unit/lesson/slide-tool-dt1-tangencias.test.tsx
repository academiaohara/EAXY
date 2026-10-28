import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloTangentes, enlaceDosRectas, evolvente, longitudEspiral, longitudTangente, ovalo, posicionCircunferencias, radioArcoEspiral, tangenteExterior, tangenteInterior } from "@/components/lesson/slide/tools/DtTangenciasTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-tangente-punto-explorador", "dt1-circunferencias-explorador", "dt1-enlace-explorador", "dt1-ovalo-explorador", "dt1-espiral-evolvente-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico I, tangencias: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de tangencias y curvas técnicas", () => {
  it("tangentes desde un punto", () => {
    expect(longitudTangente(3, 5)).toBe(4);
    expect(longitudTangente(5, 13)).toBeCloseTo(12);
    expect(longitudTangente(5, 3)).toBeNaN();
    expect(anguloTangentes(3, 6)).toBeCloseTo(60);
    expect(anguloTangentes(3, 3)).toBeCloseTo(180);
    expect(anguloTangentes(3, 2)).toBeNaN();
  });
  it("posiciones relativas", () => {
    expect(posicionCircunferencias(3, 2, 8)).toEqual({ pos: "exteriores", tangentes: 4 });
    expect(posicionCircunferencias(3, 2, 5)).toEqual({ pos: "tangentes exteriores", tangentes: 3 });
    expect(posicionCircunferencias(3, 2, 4)).toEqual({ pos: "secantes", tangentes: 2 });
    expect(posicionCircunferencias(3, 2, 1)).toEqual({ pos: "tangentes interiores", tangentes: 1 });
    expect(posicionCircunferencias(3, 2, 0.5)).toEqual({ pos: "interiores", tangentes: 0 });
    expect(posicionCircunferencias(3, 2, 0).pos).toBe("concéntricas");
    expect(posicionCircunferencias(3, 3, 0).pos).toBe("coincidentes");
    expect(tangenteExterior(5, 2, 5)).toBeCloseTo(4);
    expect(tangenteInterior(3, 2, 13)).toBeCloseTo(12);
    expect(tangenteInterior(3, 2, 4)).toBeNaN();
  });
  it("enlace entre dos rectas", () => {
    expect(enlaceDosRectas(90, 3).t).toBeCloseTo(3);
    expect(enlaceDosRectas(60, 3).t).toBeCloseTo(5.196, 2);
    expect(enlaceDosRectas(60, 3).d).toBeCloseTo(6);
    expect(enlaceDosRectas(120, 3).d).toBeCloseTo(3.464, 2);
    expect(enlaceDosRectas(0, 3).t).toBeNaN();
    expect(enlaceDosRectas(180, 3).t).toBeNaN();
  });
  it("óvalo", () => {
    const o = ovalo(5, 3, 1.5);
    expect(o.R).toBeCloseTo(6.3333, 3);
    expect(o.x1).toBeCloseTo(3.5);
    expect(o.yc).toBeCloseTo(3.3333, 3);
    // tangencia: la distancia entre centros es R − r
    expect(Math.hypot(o.x1, o.yc)).toBeCloseTo(o.R - 1.5, 6);
    expect(o.perimetro).toBeGreaterThan(o.elipse * 0.95);
    expect(o.perimetro).toBeLessThan(o.elipse * 1.05);
    expect(ovalo(3, 5, 1).R).toBeNaN();
    expect(ovalo(5, 3, 3).R).toBeNaN();
    expect(ovalo(5, 3, 0).R).toBeNaN();
  });
  it("espiral y evolvente", () => {
    expect(radioArcoEspiral(4, 5)).toBe(20);
    expect(longitudEspiral(4, 1)).toBeCloseTo(10 * Math.PI);
    const p = evolvente(1, Math.PI);
    expect(p[0]).toBeCloseTo(-1);
    expect(p[1]).toBeCloseTo(Math.PI);
    expect(evolvente(2, 0)).toEqual([2, 0]);
  });
});
