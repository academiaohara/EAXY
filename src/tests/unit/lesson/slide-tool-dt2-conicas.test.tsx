import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { elipseDatos, excentricidadCorte, hiperbolaDatos, parabolaDatos, ramasConica, tangenteConica, tipoConica } from "@/components/lesson/slide/tools/DtIIConicasTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["dt2-corte-cono-explorador", "dt2-elipse-focos-explorador", "dt2-hiperbola-explorador", "dt2-parabola-explorador", "dt2-tangentes-conicas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de cónicas: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 7 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las cónicas", () => {
  it("tipo y excentricidad de la sección", () => {
    expect(tipoConica(90, 30)).toBe("circunferencia");
    expect(tipoConica(60, 30)).toBe("elipse");
    expect(tipoConica(30, 30)).toBe("parábola");
    expect(tipoConica(10, 30)).toBe("hipérbola");
    expect(excentricidadCorte(90, 30)).toBeCloseTo(0);
    expect(excentricidadCorte(30, 30)).toBeCloseTo(1);
    expect(excentricidadCorte(60, 30)).toBeCloseTo(0.577, 3);
  });
  it("elipse: PF + PF' = 2a", () => {
    for (const t of [0, 40, 130, 275]) expect(elipseDatos(5, 3, t).suma).toBeCloseTo(10);
    expect(elipseDatos(5, 3, 0).c).toBe(4);
    expect(elipseDatos(5, 3, 0).e).toBeCloseTo(0.8);
    expect(elipseDatos(4, 4, 0).c).toBe(0);
  });
  it("hipérbola: |PF − PF'| = 2a", () => {
    for (const u of [-1.5, 0, 0.7, 2]) expect(hiperbolaDatos(3, 4, u).diferencia).toBeCloseTo(6);
    expect(hiperbolaDatos(3, 4, 0).c).toBe(5);
    expect(hiperbolaDatos(3, 4, 0).e).toBeCloseTo(5 / 3);
  });
  it("parábola: distancia al foco = distancia a la directriz", () => {
    for (const s of [-2, -0.5, 0, 1.3]) {
      const d = parabolaDatos(1.5, s);
      expect(d.dFoco).toBeCloseTo(d.dDirectriz);
    }
    expect(parabolaDatos(3, 1).P).toEqual([3, 6]);
  });
  it("la tangente forma ángulos iguales con los radios focales", () => {
    for (const tipo of ["elipse", "hiperbola", "parabola"] as const) {
      for (const t of [20, 45, 70]) {
        const r = tangenteConica(tipo, tipo === "parabola" ? 1.5 : 3, t);
        expect(r.ang1, `${tipo} ${t}`).toBeCloseTo(r.ang2, 6);
      }
    }
  });
  it("ramas de la cónica", () => {
    expect(ramasConica(0.5, 2).length).toBe(1);
    expect(ramasConica(2, 1.6).length).toBe(2);
    const par = ramasConica(1, 2);
    expect(par.length).toBeGreaterThanOrEqual(1);
    for (const r of ramasConica(0.5, 2)) for (const p of r) expect(Math.hypot(p[0], p[1])).toBeLessThanOrEqual(12.0001);
  });
});
