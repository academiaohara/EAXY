import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { cient, configAbreviada, configuracionBach, cuanticosValidos, deBroglie, desapareadosBach, energiaNivel, lambdaRydberg, nombreSubnivel, particulas, textoConfig, transicion, ultimoElectron } from "@/components/lesson/slide/tools/Fb1AtomoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-particulas-isotopos-explorador", "fb1-bohr-espectro-explorador", "fb1-de-broglie-explorador", "fb1-numeros-cuanticos-explorador", "fb1-configuracion-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de estructura atómica (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("partículas", () => {
    expect(particulas(6, 14, 0)).toMatchObject({ p: 6, n: 8, e: 6, valido: true });
    expect(particulas(26, 56, 3).e).toBe(23);
    expect(particulas(8, 16, -2).e).toBe(10);
    expect(particulas(10, 5, 0).valido).toBe(false);
  });
  it("configuraciones", () => {
    expect(textoConfig(configuracionBach(26))).toBe("1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶");
    expect(textoConfig(configuracionBach(26, 3))).toBe("1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁵");
    expect(textoConfig(configuracionBach(24))).toContain("4s¹ 3d⁵");
    expect(textoConfig(configuracionBach(29, 1))).toContain("3d¹⁰");
    expect(textoConfig(configuracionBach(17, -1))).toBe("1s² 2s² 2p⁶ 3s² 3p⁶");
    expect(configAbreviada(11)).toBe("[Ne] 3s¹");
    expect(configAbreviada(47)).toBe("[Kr] 5s¹ 4d¹⁰");
    expect(configuracionBach(0)).toEqual([]);
    expect(configuracionBach(60)).toEqual([]);
    expect(configuracionBach(1, 5)).toEqual([]);
    for (let z = 1; z <= 54; z += 1) expect(configuracionBach(z).reduce((s, x) => s + x.e, 0), `Z=${z}`).toBe(z);
  });
  it("Hund y último electrón", () => {
    expect(desapareadosBach(configuracionBach(7))).toBe(3);
    expect(desapareadosBach(configuracionBach(8))).toBe(2);
    expect(desapareadosBach(configuracionBach(10))).toBe(0);
    expect(desapareadosBach(configuracionBach(26))).toBe(4);
    expect(desapareadosBach(configuracionBach(24))).toBe(6);
    expect(ultimoElectron(configuracionBach(11))).toMatchObject({ n: 3, l: 0, ml: 0, ms: 0.5 });
    expect(ultimoElectron(configuracionBach(8))).toMatchObject({ n: 2, l: 1, ml: -1, ms: -0.5 });
    expect(ultimoElectron([])).toBeNull();
  });
  it("Bohr", () => {
    expect(energiaNivel(1)).toBeCloseTo(-13.6);
    expect(energiaNivel(2)).toBeCloseTo(-3.4);
    const t = transicion(3, 2);
    expect(t.tipo).toBe("emisión");
    expect(t.serie).toBe("Balmer");
    expect(t.region).toBe("visible");
    expect(t.lambda).toBeCloseTo(656, 0);
    expect(lambdaRydberg(3, 2)).toBeCloseTo(656.1, 0);
    expect(transicion(2, 1).region).toBe("ultravioleta");
    expect(transicion(4, 3).region).toBe("infrarrojo");
    expect(transicion(2, 3).tipo).toBe("absorción");
    expect(transicion(2, 2).tipo).toBe("ninguna");
  });
  it("De Broglie y números cuánticos", () => {
    expect(deBroglie(9.109e-31, 1e6)).toBeCloseTo(7.27e-10, 11);
    expect(deBroglie(0.057, 30)).toBeLessThan(1e-33);
    expect(deBroglie(0, 1)).toBeNaN();
    expect(cuanticosValidos(2, 1, 0, 0.5).ok).toBe(true);
    expect(cuanticosValidos(1, 1, 0, 0.5).ok).toBe(false);
    expect(cuanticosValidos(2, 0, 1, 0.5).ok).toBe(false);
    expect(cuanticosValidos(3, 2, -2, 0.7).ok).toBe(false);
    expect(nombreSubnivel(3, 2)).toBe("3d");
    expect(cient(7.27e-10)).toBe("7,27·10⁻¹⁰");
  });
});
