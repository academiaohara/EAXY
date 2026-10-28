import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { cargaIonTipica, colorVisible, energiaFoton, energiaNivel, ELEMENTOS_ISOTOPOS, longitudOndaNm, masaMedia, masaMediaDos, regionEspectro, serieValores, tendencia } from "@/components/lesson/slide/tools/Fq3AtomoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq3-niveles-bohr-explorador", "fq3-masa-atomica-media-explorador", "fq3-configuracion-electronica-explorador", "fq3-propiedades-periodicas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas del átomo (3.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("Bohr", () => {
    expect(energiaNivel(1)).toBeCloseTo(-13.6);
    expect(energiaNivel(0)).toBeNaN();
    expect(energiaFoton(3, 2)).toBeCloseTo(1.889, 2);
    expect(longitudOndaNm(energiaFoton(3, 2))).toBeCloseTo(656, -1);
    expect(longitudOndaNm(energiaFoton(2, 1))).toBeLessThan(380);
    expect(energiaFoton(2, 3)).toBeLessThan(0);
    expect(longitudOndaNm(-1)).toBeNaN();
    expect(regionEspectro(656)).toBe("visible");
    expect(regionEspectro(121)).toBe("ultravioleta");
    expect(regionEspectro(1000)).toBe("infrarrojo");
    expect(regionEspectro(NaN)).toBe("—");
    expect(colorVisible(400)).not.toBe(colorVisible(700));
  });
  it("masa atómica media", () => {
    expect(masaMediaDos(35, 37, 75)).toBeCloseTo(35.5);
    expect(masaMediaDos(10, 11, 150)).toBe(10);
    expect(masaMedia([{ A: 10, ab: 50 }, { A: 11, ab: 50 }])).toBeCloseTo(10.5);
    expect(masaMedia([])).toBeNaN();
    for (const e of ELEMENTOS_ISOTOPOS) expect(masaMedia(e.isotopos)).toBeCloseTo(e.real, 0);
  });
  it("carga típica", () => {
    expect(cargaIonTipica(11)).toBe(1);
    expect(cargaIonTipica(20)).toBe(2);
    expect(cargaIonTipica(13)).toBe(3);
    expect(cargaIonTipica(8)).toBe(-2);
    expect(cargaIonTipica(17)).toBe(-1);
    expect(cargaIonTipica(7)).toBe(-3);
    expect(cargaIonTipica(10)).toBeNull();
    expect(cargaIonTipica(6)).toBeNull();
    expect(cargaIonTipica(99)).toBeNull();
  });
  it("tendencias periódicas", () => {
    expect(tendencia(serieValores("periodo2", "radio").map((d) => d.valor))).toBe("decrece");
    expect(tendencia(serieValores("periodo3", "radio").map((d) => d.valor))).toBe("decrece");
    expect(tendencia(serieValores("periodo2", "electroneg").map((d) => d.valor))).toBe("crece");
    expect(tendencia(serieValores("periodo3", "electroneg").map((d) => d.valor))).toBe("crece");
    expect(tendencia(serieValores("grupo1", "radio").map((d) => d.valor))).toBe("crece");
    expect(tendencia(serieValores("grupo2", "electroneg").map((d) => d.valor))).toBe("decrece");
    expect(tendencia([1, 3, 2])).toBe("irregular");
  });
});
