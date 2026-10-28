import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { INSTRUMENTOS, MEDIDAS_CM, MUELLE_X, MUELLE_Y, PREFIJOS, superindice, ajusteProporcional, convertirPrefijo, estadisticaMedidas, instrumentoAdecuado, notacionCientifica, redondearCifras, sumaCuadrados, tiempoHervir } from "@/components/lesson/slide/tools/Fq2MedidaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq2-experimento-variables-explorador", "fq2-unidades-prefijos-explorador", "fq2-medidas-error-explorador", "fq2-grafica-proporcional-explorador", "fq2-instrumentos-laboratorio-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de la actividad científica: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 9 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("tiempo para hervir", () => {
    expect(tiempoHervir(200, 200)).toBeCloseTo((200 * 4.18 * 80) / 200 / 60);
    expect(tiempoHervir(400, 200)).toBeCloseTo(2 * tiempoHervir(200, 200));
    expect(tiempoHervir(200, 400)).toBeCloseTo(tiempoHervir(200, 200) / 2);
    expect(tiempoHervir(200, 0)).toBeNaN();
  });
  it("prefijos y notación científica", () => {
    const k = PREFIJOS.find((p) => p.sim === "k")!.exp;
    const m = PREFIJOS.find((p) => p.sim === "m")!.exp;
    expect(convertirPrefijo(2.5, k, 0)).toBeCloseTo(2500);
    expect(convertirPrefijo(0.25, 0, m)).toBeCloseTo(250);
    expect(notacionCientifica(0.00042).exp).toBe(-4);
    expect(notacionCientifica(0.00042).mantisa).toBeCloseTo(4.2);
    expect(notacionCientifica(300000000)).toEqual({ mantisa: 3, exp: 8 });
    expect(notacionCientifica(0).mantisa).toBe(0);
    expect(superindice(-3)).toBe("⁻³");
    expect(superindice(12)).toBe("¹²");
  });
  it("redondeo y errores", () => {
    expect(redondearCifras(3.476, 2)).toBeCloseTo(3.5);
    expect(redondearCifras(0.0042, 1)).toBeCloseTo(0.004);
    expect(redondearCifras(12345, 2)).toBe(12000);
    expect(redondearCifras(0, 3)).toBe(0);
    const e = estadisticaMedidas([20.4], 20);
    expect(e.errAbs).toBeCloseTo(0.4);
    expect(e.errRel).toBeCloseTo(0.02);
    expect(estadisticaMedidas([2.1, 2.3, 2.2]).media).toBeCloseTo(2.2);
    expect(estadisticaMedidas(MEDIDAS_CM, 12).errAbs).toBeLessThan(0.05);
  });
  it("ajuste proporcional", () => {
    const { k } = ajusteProporcional(MUELLE_X, MUELLE_Y);
    expect(k).toBeGreaterThan(0.019);
    expect(k).toBeLessThan(0.021);
    expect(sumaCuadrados(MUELLE_X, MUELLE_Y, k)).toBeLessThan(sumaCuadrados(MUELLE_X, MUELLE_Y, 0.03));
    expect(sumaCuadrados(MUELLE_X, MUELLE_Y, k)).toBeLessThan(sumaCuadrados(MUELLE_X, MUELLE_Y, 0.005));
    expect(ajusteProporcional([0, 0], [1, 2]).k).toBeNaN();
  });
  it("instrumento adecuado", () => {
    expect(instrumentoAdecuado("volumen", 2)?.nombre).toBe("Probeta");
    expect(instrumentoAdecuado("volumen", 0.2)?.nombre).toBe("Pipeta graduada");
    expect(instrumentoAdecuado("volumen", 0.01)).toBeNull();
    expect(instrumentoAdecuado("masa", 0.05)?.nombre).toBe("Balanza de laboratorio");
    for (const m of Object.keys(INSTRUMENTOS) as (keyof typeof INSTRUMENTOS)[]) for (const e of INSTRUMENTOS[m].errores) expect(instrumentoAdecuado(m, e)).not.toBeNull();
  });
});
