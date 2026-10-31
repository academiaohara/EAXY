import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ASTROS, D_TIERRA_LUNA, M_LUNA, M_TIERRA, R_TIERRA, cientifica, faseLunar, fuerzaGravitatoria, gravedad, orbita, radioGeoestacionario, velocidadEscape } from "@/components/lesson/slide/tools/Fq4GravitacionTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-gravitacion-explorador", "fq4-gravedad-planetas-explorador", "fq4-orbitas-explorador", "fq4-fases-lunares-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de gravitación (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("gravitación", () => {
    expect(fuerzaGravitatoria(1000, 1000, 1)).toBeCloseTo(6.674e-5, 8);
    const f = fuerzaGravitatoria(M_TIERRA, M_LUNA, D_TIERRA_LUNA);
    expect(f).toBeGreaterThan(1.9e20);
    expect(f).toBeLessThan(2.1e20);
    expect(fuerzaGravitatoria(1, 1, 0)).toBeNaN();
    expect(fuerzaGravitatoria(1, 1, 2) * 4).toBeCloseTo(fuerzaGravitatoria(1, 1, 1));
  });
  it("gravedad y escape", () => {
    expect(gravedad(M_TIERRA, R_TIERRA)).toBeCloseTo(9.81, 1);
    const luna = ASTROS.find((a) => a.id === "luna")!;
    expect(gravedad(luna.M, luna.R)).toBeCloseTo(1.62, 1);
    expect(velocidadEscape(M_TIERRA, R_TIERRA)).toBeCloseTo(11186, -2);
    expect(gravedad(1, 0)).toBeNaN();
  });
  it("órbitas", () => {
    const iss = orbita(M_TIERRA, R_TIERRA + 408e3);
    expect(iss.v / 1000).toBeCloseTo(7.67, 1);
    expect(iss.T / 60).toBeCloseTo(92.6, 0);
    expect(radioGeoestacionario() / 1000 - 6371).toBeCloseTo(35786, -2);
    expect(orbita(0, 1).v).toBeNaN();
  });
  it("fases lunares y formato", () => {
    expect(faseLunar(0).nombre).toBe("Luna nueva");
    expect(faseLunar(180).nombre).toBe("Luna llena");
    expect(faseLunar(90).nombre).toBe("Cuarto creciente");
    expect(faseLunar(270).nombre).toBe("Cuarto menguante");
    expect(faseLunar(180).iluminacion).toBeCloseTo(1);
    expect(faseLunar(0).iluminacion).toBeCloseTo(0);
    expect(faseLunar(-90).nombre).toBe("Cuarto menguante");
    expect(faseLunar(180).marea).toContain("vivas");
    expect(faseLunar(90).marea).toContain("muertas");
    expect(cientifica(1.98e20)).toBe("1,98·10²⁰");
    expect(cientifica(0)).toBe("0");
    expect(cientifica(NaN)).toBe("—");
  });
});
