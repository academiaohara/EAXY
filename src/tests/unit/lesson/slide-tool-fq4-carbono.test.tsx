import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { FRACCIONES, MOLECULAS_C, POLIMEROS, compuestoFuncional, formulaMolecular, fraccionesVaporizadas, masaPolimero, nombreHidrocarburo, semidesarrollada } from "@/components/lesson/slide/tools/Fq4CarbonoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-carbono-enlaces-explorador", "fq4-hidrocarburos-explorador", "fq4-grupos-funcionales-explorador", "fq4-petroleo-explorador", "fq4-polimeros-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de química del carbono (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("fórmulas y nombres de hidrocarburos", () => {
    expect(formulaMolecular(4, "alcano")).toBe("C₄H₁₀");
    expect(formulaMolecular(3, "alqueno")).toBe("C₃H₆");
    expect(formulaMolecular(2, "alquino")).toBe("C₂H₂");
    expect(formulaMolecular(1, "alqueno")).toBeNull();
    expect(formulaMolecular(0, "alcano")).toBeNull();
    expect(semidesarrollada(4, "alqueno", 2)).toBe("CH₃–CH=CH–CH₃");
    expect(semidesarrollada(2, "alquino")).toBe("CH≡CH");
    expect(semidesarrollada(3, "alcano")).toBe("CH₃–CH₂–CH₃");
    expect(nombreHidrocarburo(4, "alqueno", 2)).toBe("but-2-eno");
    expect(nombreHidrocarburo(3, "alqueno")).toBe("propeno");
    expect(nombreHidrocarburo(1, "alcano")).toBe("metano");
    expect(nombreHidrocarburo(11, "alcano")).toBeNull();
  });
  it("grupos funcionales", () => {
    expect(compuestoFuncional("cetona", 3)).toEqual({ nombre: "propanona", formula: "CH₃–CO–CH₃" });
    expect(compuestoFuncional("cetona", 2)).toBeNull();
    expect(compuestoFuncional("ácido carboxílico", 2)?.nombre).toBe("ácido etanoico");
    expect(compuestoFuncional("alcohol", 2)?.nombre).toBe("etanol");
    expect(compuestoFuncional("alcohol", 0)).toBeNull();
  });
  it("petróleo, polímeros y moléculas", () => {
    expect(fraccionesVaporizadas(0).length).toBe(1);
    expect(fraccionesVaporizadas(600).length).toBe(FRACCIONES.length);
    expect(masaPolimero(28, 100)).toBe(2800);
    expect(masaPolimero(28, -4)).toBe(0);
    expect(POLIMEROS.length).toBeGreaterThan(5);
    for (const m of MOLECULAS_C) for (const [a, b] of m.enlaces) expect(m.atomos[a] && m.atomos[b]).toBeTruthy();
  });
});
