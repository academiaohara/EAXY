import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { cotaEnPlano, cuadrante, inclinacionesPlano, longitudesRecta, perteneceAPlano, proyeccionesPunto, tipoPlano, tipoRecta, trazasRecta } from "@/components/lesson/slide/tools/DtDiedricoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt1-diedrico-punto-explorador", "dt1-recta-diedrico-explorador", "dt1-posiciones-recta-explorador", "dt1-plano-diedrico-explorador", "dt1-pertenencia-plano-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Dibujo Técnico I, sistema diédrico: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 5, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del sistema diédrico", () => {
  it("cuadrantes y proyecciones del punto", () => {
    expect(cuadrante(3, 2).n).toBe(1);
    expect(cuadrante(-2, 3).n).toBe(2);
    expect(cuadrante(-3, -2).n).toBe(3);
    expect(cuadrante(5, -3).n).toBe(4);
    expect(cuadrante(0, 0).nombre).toContain("línea de tierra");
    expect(cuadrante(3, 0).nombre).toContain("PH anterior");
    expect(cuadrante(0, -2).nombre).toContain("PV inferior");
    expect(proyeccionesPunto([1, 3, 4])).toEqual({ horiz: [1, 3], vert: [1, -4] });
  });
  it("trazas y tipos de recta", () => {
    const t = trazasRecta([-3, 1, 4], [3, 4, 1]);
    expect(t.H![0]).toBeCloseTo(5);
    expect(t.H![1]).toBeCloseTo(5);
    expect(t.V![0]).toBeCloseTo(-5);
    expect(t.V![2]).toBeCloseTo(5);
    expect(trazasRecta([0, 1, 2], [3, 4, 2]).H).toBeNull();
    expect(trazasRecta([0, 1, 2], [3, 1, 5]).V).toBeNull();
    expect(tipoRecta([-3, 2, 2], [3, 2, 2])).toBe("paralela a la línea de tierra");
    expect(tipoRecta([-3, 1, 2], [2, 4, 2])).toContain("horizontal");
    expect(tipoRecta([-3, 2, 1], [2, 2, 4])).toContain("frontal");
    expect(tipoRecta([1, 2, 1], [1, 2, 5])).toContain("vertical");
    expect(tipoRecta([1, 1, 2], [1, 5, 2])).toContain("de punta");
    expect(tipoRecta([1, 1, 1], [1, 4, 4])).toBe("de perfil");
    expect(tipoRecta([-3, 1, 1], [3, 4, 5])).toBe("oblicua");
    expect(tipoRecta([1, 1, 1], [1, 1, 1])).toBe("es un punto");
  });
  it("verdadera magnitud", () => {
    expect(longitudesRecta([1, 2, 1], [1, 2, 5]).real).toBeCloseTo(4);
    expect(longitudesRecta([1, 1, 1], [1, 4, 4]).real).toBeCloseTo(4.2426, 3);
    expect(longitudesRecta([-3, 1, 1], [3, 4, 5]).real).toBeCloseTo(7.8102, 3);
    const h = longitudesRecta([-3, 1, 2], [2, 4, 2]);
    expect(h.horiz).toBeCloseTo(h.real);
    const f = longitudesRecta([-3, 2, 1], [2, 2, 4]);
    expect(f.vert).toBeCloseTo(f.real);
  });
  it("planos", () => {
    const i = inclinacionesPlano(135, 45);
    expect(i.conPH).toBeCloseTo(54.7356, 3);
    expect(i.conPV).toBeCloseTo(54.7356, 3);
    expect(inclinacionesPlano(135, 90).conPH).toBeCloseTo(90);
    expect(inclinacionesPlano(90, 45).conPV).toBeCloseTo(90);
    expect(tipoPlano(135, 45)).toBe("oblicuo");
    expect(tipoPlano(135, 90)).toContain("proyectante horizontal");
    expect(tipoPlano(90, 45)).toContain("proyectante vertical");
    expect(tipoPlano(90, 90)).toContain("de perfil");
  });
  it("pertenencia al plano", () => {
    expect(cotaEnPlano(135, 45, 4, 1)).toBeCloseTo(3);
    expect(cotaEnPlano(135, 45, 2, -1)).toBeCloseTo(3);
    expect(cotaEnPlano(135, 45, 3, 3)).toBeCloseTo(0);
    expect(cotaEnPlano(135, 90, 1, 1)).toBeNaN();
    expect(perteneceAPlano(135, 45, [4, 1, 3])).toBe(true);
    expect(perteneceAPlano(135, 45, [4, 1, 2])).toBe(false);
    // la traza vertical (e = 0, z = x) y la horizontal (z = 0, e = x) están en el plano
    expect(perteneceAPlano(135, 45, [2, 0, 2])).toBe(true);
    expect(perteneceAPlano(135, 45, [2, 2, 0])).toBe(true);
  });
});
