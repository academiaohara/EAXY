import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { PIEZAS, aniosFuerzaBruta, cesar, clasifica, disponibilidadTotal, ejecutarConsulta, espacioClaves, horasCaidaAnio, metricasClasificador, pasoPerceptron, personasPorCombinacion, precisionLineal, tiempoTransferencia, volumenDatos } from "@/components/lesson/slide/tools/TecTi2InformaticaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["ti2-disponibilidad-explorador", "ti2-sql-explorador", "ti2-volumen-datos-explorador", "ti2-clasificador-explorador", "ti2-confusion-explorador", "ti2-cifrado-explorador", "ti2-privacidad-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología e Ingeniería II, sistemas informáticos: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { n: 1, a: 1 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de sistemas informáticos", () => {
  it("disponibilidad y red", () => {
    expect(disponibilidadTotal(0.99, 2)).toBeCloseTo(0.9999, 6);
    expect(disponibilidadTotal(0.99, 1)).toBeCloseTo(0.99);
    expect(disponibilidadTotal(0.9, 0)).toBe(0);
    expect(horasCaidaAnio(0.9999)).toBeCloseTo(0.876, 3);
    expect(tiempoTransferencia(100, 80, 0)).toBeCloseTo(10);
    expect(tiempoTransferencia(500, 100, 40)).toBeCloseTo(40.04);
    expect(tiempoTransferencia(10, 0, 40)).toBe(Infinity);
  });
  it("consultas SQL", () => {
    const base = { filtro: "ninguno", orden: "id", desc: false, agregado: "ninguno" } as const;
    expect(ejecutarConsulta(PIEZAS, base).rows).toHaveLength(8);
    expect(ejecutarConsulta(PIEZAS, base).sql).toBe("SELECT * FROM piezas ORDER BY id ASC;");
    expect(ejecutarConsulta(PIEZAS, { ...base, filtro: "acero", agregado: "count" }).valor).toBe(3);
    expect(ejecutarConsulta(PIEZAS, { ...base, filtro: "acero", agregado: "count" }).sql).toBe("SELECT COUNT(*) FROM piezas WHERE material = 'acero';");
    expect(ejecutarConsulta(PIEZAS, { ...base, filtro: "plastico", agregado: "sum-masa" }).valor).toBe(130);
    expect(ejecutarConsulta(PIEZAS, { ...base, filtro: "acero", agregado: "avg-precio" }).valor).toBeCloseTo(12.1667, 3);
    expect(ejecutarConsulta(PIEZAS, { ...base, filtro: "masa>100", agregado: "count" }).valor).toBe(4);
    const desc = ejecutarConsulta(PIEZAS, { ...base, orden: "precio", desc: true }).rows;
    expect(desc[0]!.precio).toBe(15);
    expect(desc.at(-1)!.precio).toBe(2);
  });
  it("datos y aprendizaje automático", () => {
    const v = volumenDatos(1000, 1, 50);
    expect(v.diaGB).toBeCloseTo(4.32, 2);
    expect(v.anioTB).toBeCloseTo(1.577, 2);
    expect(volumenDatos(1000, 1, 50, 4).diaGB).toBeCloseTo(1.08, 2);
    expect(precisionLineal(-0.5, -0.5, 3)).toBeLessThan(100);
    expect(precisionLineal(1, 1, -9)).toBe(100);
    expect(clasifica(1, 1, -9, { x: 8, y: 7 })).toBe(1);
    expect(pasoPerceptron({ w1: -0.5, w2: -0.5, b: 3 }, { x: 6, y: 6, c: 1 }).w1).toBeCloseTo(0.1);
    expect(pasoPerceptron({ w1: 1, w2: 1, b: -9 }, { x: 8, y: 7, c: 1 })).toEqual({ w1: 1, w2: 1, b: -9 });
    const entrenamiento = [{ x: 1, y: 2, c: 0 }, { x: 6, y: 6, c: 1 }, { x: 2, y: 1, c: 0 }, { x: 7, y: 5, c: 1 }] as const;
    let w = { w1: -0.5, w2: -0.5, b: 3 };
    for (let i = 0; i < 300; i++) w = pasoPerceptron(w, entrenamiento[i % 4]!);
    expect(precisionLineal(w.w1, w.w2, w.b, entrenamiento)).toBe(100);
    expect(precisionLineal(w.w1, w.w2, w.b)).toBeGreaterThanOrEqual(50);
  });
  it("métricas, cifrado y privacidad", () => {
    const m = metricasClasificador(10000, 0.01, 0.95, 0.95);
    expect(m.tp).toBeCloseTo(95);
    expect(m.fp).toBeCloseTo(495);
    expect(m.precision).toBeCloseTo(0.161, 2);
    expect(m.exactitud).toBeCloseTo(0.95);
    expect(metricasClasificador(0, 0.5, 0.9, 0.9).exactitud).toBe(0);
    expect(cesar("HOLA", 3)).toBe("KRÑD");
    expect(cesar(cesar("Ñandú y camión", 5), -5)).toBe("ÑANDU Y CAMION");
    expect(cesar("abc", 27)).toBe("ABC");
    expect(espacioClaves(10, 4)).toBe(10000);
    expect(aniosFuerzaBruta(10000, 1000)).toBeCloseTo(5 / 31557600, 8);
    expect(aniosFuerzaBruta(1e6, 0)).toBe(Infinity);
    expect(personasPorCombinacion(1_000_000, [500, 90])).toBeCloseTo(22.22, 2);
    expect(personasPorCombinacion(1_000_000, [500, 90, 2])).toBeCloseTo(11.11, 2);
    expect(personasPorCombinacion(1_000_000, [])).toBe(1_000_000);
  });
});
