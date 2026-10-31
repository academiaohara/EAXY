import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ESPECIES_PH, ESQUELETOS, POTENCIALES, PROCESOS, ajusteMinimo, calcularPh, contarAtomos, economiaAtomica, estaAjustada, masaReal, pila, phAcidoDebil, phAcidoFuerte, phBaseFuerte, phValoracion, reactivoLimitante, rendimiento, volumenEquivalencia, xDebil } from "@/components/lesson/slide/tools/Fb1ReaccionesTools";
import { REACCIONES_EB } from "@/components/lesson/slide/tools/Fb1CantidadTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-ajuste-explorador", "fb1-limitante-explorador", "fb1-ph-explorador", "fb1-valoracion-explorador", "fb1-redox-pila-explorador", "fb1-industria-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de reacciones (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("ajuste de ecuaciones", () => {
  it("los coeficientes guardados ajustan y son los mínimos", () => {
    for (const e of ESQUELETOS) {
      expect(estaAjustada(e, e.coef), e.id).toBe(true);
      expect(ajusteMinimo(e, 14), e.id).toEqual(e.coef);
    }
  });
  it("casos erróneos", () => {
    const m = ESQUELETOS.find((e) => e.id === "metano")!;
    expect(estaAjustada(m, [1, 1, 1, 1])).toBe(false);
    expect(estaAjustada(m, [2, 4, 2, 4])).toBe(true);
    expect(estaAjustada(m, [0, 2, 1, 2])).toBe(false);
    expect(contarAtomos(["Ca(OH)2"], [2])).toEqual({ Ca: 2, O: 4, H: 4 });
  });
});

describe("reactivo limitante y rendimiento", () => {
  it("combustión del metano con 32 g de CH4 y 100 g de O2", () => {
    const l = reactivoLimitante(REACCIONES_EB.find((r) => r.id === "ch4")!, [32, 100]);
    expect(l.limitante).toBe("O2");
    expect(l.productos.find((p) => p.f === "CO2")!.masa).toBeCloseTo(68.75, 2);
    expect(l.sobran.find((s) => s.f === "CH4")!.mol).toBeCloseTo(0.4375, 4);
    expect(l.sobran.find((s) => s.f === "O2")!.mol).toBeCloseTo(0, 9);
  });
  it("la masa se conserva con el limitante", () => {
    for (const r of REACCIONES_EB) {
      const reactivos = r.esp.filter((e) => e.lado === "r");
      const l = reactivoLimitante(r, reactivos.map(() => 100));
      const consumida = reactivos.reduce((s, e, i) => s + (100 - l.sobran[i]!.masa), 0);
      expect(consumida, r.id).toBeCloseTo(l.productos.reduce((s, p) => s + p.masa, 0), 6);
    }
  });
  it("rendimiento", () => {
    expect(rendimiento(40, 50)).toBe(80);
    expect(rendimiento(1, 0)).toBeNaN();
    expect(masaReal(200, 75)).toBe(150);
    expect(masaReal(200, 150)).toBe(200);
  });
});

describe("ácidos y bases", () => {
  it("pH", () => {
    expect(phAcidoFuerte(0.001)).toBeCloseTo(3, 6);
    expect(phBaseFuerte(0.01)).toBeCloseTo(12, 6);
    expect(phAcidoFuerte(1e-8)).toBeLessThan(7);
    expect(phAcidoFuerte(1e-8)).toBeGreaterThan(6.9);
    expect(phAcidoDebil(0.1, 1.8e-5)).toBeCloseTo(2.875, 2);
    expect(xDebil(0.1, 1.8e-5)).toBeCloseTo(1.33e-3, 5);
    expect(phAcidoFuerte(0)).toBeNaN();
    for (const e of ESPECIES_PH) {
      const r = calcularPh(e, 0.01);
      expect(r.ph + r.poh).toBeCloseTo(14, 9);
      expect(e.tipo.startsWith("ácido") ? r.ph < 7 : r.ph > 7).toBe(true);
    }
    expect(calcularPh(ESPECIES_PH.find((e) => e.f === "CH3COOH")!, 0.1).alpha).toBeLessThan(5);
  });
  it("valoración ácido fuerte con base fuerte", () => {
    expect(phValoracion(0.1, 0.025, 0.1, 0)).toBeCloseTo(1, 6);
    expect(phValoracion(0.1, 0.025, 0.1, 0.025)).toBe(7);
    expect(phValoracion(0.1, 0.025, 0.1, 0.05)).toBeCloseTo(12.52, 2);
    expect(volumenEquivalencia(0.1, 25, 0.1)).toBe(25);
    expect(volumenEquivalencia(0.1, 25, 0)).toBeNaN();
    expect(phValoracion(0.1, 0, 0.1, 0)).toBeNaN();
    let previo = 0;
    for (let v = 0; v <= 0.05; v += 0.0025) {
      const p = phValoracion(0.1, 0.025, 0.1, v);
      expect(p).toBeGreaterThanOrEqual(previo - 1e-9);
      previo = p;
    }
  });
});

describe("redox y procesos", () => {
  const i = (s: string) => POTENCIALES.findIndex((x) => x.s === s);
  it("pilas", () => {
    const d = pila(i("Zn"), i("Cu"))!;
    expect(d.fem).toBeCloseTo(1.1, 6);
    expect(d.anodo.s).toBe("Zn");
    expect(d.global).toBe("Zn + Cu²⁺ → Zn²⁺ + Cu");
    expect(pila(i("Cu"), i("Zn"))!.fem).toBeCloseTo(1.1, 6);
    expect(pila(i("Al"), i("Ag"))!.global).toBe("Al + 3 Ag⁺ → Al³⁺ + 3 Ag");
    expect(pila(i("Fe"), i("Au"))!.global).toBe("3 Fe + 2 Au³⁺ → 3 Fe²⁺ + 2 Au");
    expect(pila(2, 2)).toBeNull();
    expect(pila(99, 0)).toBeNull();
    for (let a = 0; a < POTENCIALES.length; a += 1) for (let b = a + 1; b < POTENCIALES.length; b += 1) expect(pila(a, b)!.fem).toBeGreaterThan(0);
  });
  it("economía atómica", () => {
    expect(economiaAtomica(PROCESOS.find((p) => p.id === "haber")!)).toBeCloseTo(100, 6);
    expect(economiaAtomica(PROCESOS.find((p) => p.id === "cal")!)).toBeCloseTo(56, 6);
    for (const p of PROCESOS) expect(economiaAtomica(p)).toBeLessThanOrEqual(100 + 1e-9);
  });
});
