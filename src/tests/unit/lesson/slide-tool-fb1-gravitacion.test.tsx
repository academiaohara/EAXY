import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { CUERPOS, G, MSOL, UA, cambioOrbita, campoG, cient, elipse, energiaOrbital, epGrav, fuerzaGrav, periodoAnios, periodoOrbital, radioElipse, radioParaPeriodo, vEscape, vOrbital, visViva } from "@/components/lesson/slide/tools/Fb1GravitacionTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-kepler-explorador", "fb1-campo-gravitatorio-explorador", "fb1-satelite-explorador", "fb1-energia-orbital-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de gravitación (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("cálculos de gravitación", () => {
  const T = CUERPOS[0]!;
  it("fuerza y campo", () => {
    expect(campoG(T.M, T.R)).toBeCloseTo(9.82, 1);
    expect(campoG(T.M, 2 * T.R)).toBeCloseTo(campoG(T.M, T.R) / 4, 9);
    expect(fuerzaGrav(1000, 1000, 1)).toBeCloseTo(G * 1e6, 12);
    expect(campoG(T.M, 0)).toBeNaN();
    expect(campoG(CUERPOS[1]!.M, CUERPOS[1]!.R)).toBeCloseTo(1.62, 1);
  });
  it("órbitas", () => {
    expect(vOrbital(T.M, T.R)).toBeCloseTo(7905, -1);
    expect(vEscape(T.M, T.R)).toBeCloseTo(11186, -1);
    expect(vEscape(T.M, T.R)).toBeCloseTo(Math.SQRT2 * vOrbital(T.M, T.R), 6);
    expect(periodoOrbital(T.M, T.R + 4e5) / 60).toBeCloseTo(92.4, 0);
    expect(radioParaPeriodo(T.M, 86164) / 1000).toBeCloseTo(42164, -2);
  });
  it("Kepler", () => {
    expect(periodoAnios(4)).toBe(8);
    expect(periodoAnios(1)).toBe(1);
    expect(elipse(10, 0.8).perihelio).toBeCloseTo(2, 9);
    expect(elipse(10, 0.8).afelio).toBeCloseTo(18, 9);
    expect(radioElipse(1, 0.5, 0)).toBeCloseTo(0.5, 9);
    expect(radioElipse(1, 0.5, 180)).toBeCloseTo(1.5, 9);
    const vp = visViva(MSOL, 0.5 * UA, UA);
    const va = visViva(MSOL, 1.5 * UA, UA);
    expect(vp / va).toBeCloseTo(3, 6);
    expect(periodoOrbital(MSOL, UA) / 86400).toBeCloseTo(365.2, 0);
  });
  it("energía", () => {
    expect(epGrav(T.M, 1, T.R)).toBeLessThan(0);
    expect(energiaOrbital(T.M, 1, T.R)).toBeCloseTo(epGrav(T.M, 1, T.R) / 2, 6);
    expect(cambioOrbita(T.M, 1000, T.R * 1.1, T.R * 6.6).dE).toBeGreaterThan(0);
    expect(cambioOrbita(T.M, 1000, T.R * 6.6, T.R * 1.1).dE).toBeLessThan(0);
    expect(cient(6.67e-5, 2)).toBe("6,67·10⁻⁵");
    expect(cient(NaN)).toBe("—");
  });
});
