import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { EJEMPLOS_TIPOS, REACCIONES, SERIE_ACTIVIDAD, clasificarReaccion, ecuacionTexto, electronesIntercambiados, especies, estaAjustada, estequiometria, masaMolar, moles, particulas, phMezcla, reaccionaDesplazamiento, reactivoLimitante, rendimientoPct, volumenCN, volumenEquivalencia, volumenGas } from "@/components/lesson/slide/tools/Fq4ReaccionesTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fq4-mol-gases-explorador", "fq4-estequiometria-explorador", "fq4-reactivo-limitante-explorador", "fq4-tipos-reaccion-explorador", "fq4-neutralizacion-explorador", "fq4-redox-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de reacciones (4.º): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados", () => {
  it("mol y gases", () => {
    expect(masaMolar("H2O")).toBe(18);
    expect(masaMolar("CO2")).toBe(44);
    expect(masaMolar("Al2(SO4)3")).toBeCloseTo(342);
    expect(masaMolar("Xx")).toBeNaN();
    expect(moles(36, 18)).toBe(2);
    expect(moles(1, 0)).toBeNaN();
    expect(particulas(1)).toBeCloseTo(6.022e23, -20);
    expect(volumenCN(2)).toBeCloseTo(44.7, 0);
    expect(volumenGas(1, 300, 1)).toBeCloseTo(24.6);
    expect(volumenGas(1, 300, 0)).toBeNaN();
  });
  it("las reacciones están ajustadas y conservan la masa", () => {
    for (const r of REACCIONES) {
      expect(estaAjustada(r), r.id).toBe(true);
      const res = estequiometria(r, 0, 10);
      const nr = r.reactivos.length;
      const antes = res.slice(0, nr).reduce((s, x) => s + x.masa, 0);
      const despues = res.slice(nr).reduce((s, x) => s + x.masa, 0);
      expect(antes, r.id).toBeCloseTo(despues, 6);
    }
    expect(estaAjustada({ id: "x", nombre: "x", reactivos: [{ f: "H2", c: 1 }, { f: "O2", c: 1 }], productos: [{ f: "H2O", c: 1 }] })).toBe(false);
    expect(ecuacionTexto(REACCIONES[0]!)).toBe("2 H₂ + O₂ → 2 H₂O");
    expect(especies(REACCIONES[0]!).length).toBe(3);
  });
  it("estequiometría", () => {
    const agua = estequiometria(REACCIONES[0]!, 0, 4);
    expect(agua[2]!.masa).toBeCloseTo(36);
    const nh3 = estequiometria(REACCIONES[1]!, 0, 28);
    expect(nh3[2]!.masa).toBeCloseTo(34);
    const caliza = estequiometria(REACCIONES[4]!, 0, 100);
    expect(caliza[4]!.volumenCN).toBeCloseTo(22.4, 1);
    const mg = estequiometria(REACCIONES[3]!, 0, 48);
    expect(mg[2]!.masa).toBeCloseTo(80);
    expect(estequiometria(REACCIONES[0]!, 9, 4)[0]!.masa).toBeNaN();
  });
  it("reactivo limitante y rendimiento", () => {
    // 4 g de H2 (2 mol) y 16 g de O2 (0,5 mol)
    const r = reactivoLimitante(REACCIONES[0]!, [4, 16]);
    expect(r.limitante).toBe(1);
    expect(r.productos[0]!.masa).toBeCloseTo(18);
    expect(r.exceso[0]!).toBeCloseTo(2);
    expect(r.exceso[1]!).toBeCloseTo(0);
    const prop = reactivoLimitante(REACCIONES[0]!, [4, 32]);
    expect(prop.limitante).toBe(0);
    expect(rendimientoPct(15, 18)).toBeCloseTo(83.33, 1);
    expect(rendimientoPct(1, 0)).toBeNaN();
  });
  it("clasificación de reacciones", () => {
    const tipos = EJEMPLOS_TIPOS.map((e) => clasificarReaccion(e.r, e.p));
    expect(tipos).toEqual(["síntesis", "descomposición", "sustitución simple", "doble sustitución", "combustión", "neutralización"]);
    expect(clasificarReaccion([], ["H2"])).toBeNull();
  });
  it("neutralización", () => {
    expect(volumenEquivalencia(0.1, 25, 0.1)).toBe(25);
    expect(volumenEquivalencia(0.2, 10, 0.1)).toBe(20);
    expect(volumenEquivalencia(0.1, 25, 0)).toBeNaN();
    expect(phMezcla(0.1, 25, 0.1, 0)).toBeCloseTo(1, 5);
    expect(phMezcla(0.1, 25, 0.1, 25)).toBe(7);
    expect(phMezcla(0.1, 25, 0.1, 10)).toBeCloseTo(1.37, 2);
    expect(phMezcla(0.1, 25, 0.1, 50)).toBeGreaterThan(7);
    expect(phMezcla(0.1, 0, 0.1, 0)).toBeNaN();
    let prev = -Infinity;
    for (let v = 0; v <= 100; v += 1) {
      const p = phMezcla(0.1, 25, 0.1, v);
      expect(p).toBeGreaterThanOrEqual(prev - 1e-9);
      prev = p;
    }
  });
  it("redox", () => {
    expect(reaccionaDesplazamiento("Zn", "Cu")).toBe(true);
    expect(reaccionaDesplazamiento("Cu", "Zn")).toBe(false);
    expect(reaccionaDesplazamiento("Zn", "Zn")).toBe(false);
    expect(reaccionaDesplazamiento("Xx", "Cu")).toBe(false);
    expect(electronesIntercambiados(2, 1)).toBe(2);
    expect(electronesIntercambiados(2, 2)).toBe(2);
    expect(electronesIntercambiados(3, 2)).toBe(6);
    expect(electronesIntercambiados(0, 2)).toBeNaN();
    expect(SERIE_ACTIVIDAD.indexOf("Mg")).toBeLessThan(SERIE_ACTIVIDAD.indexOf("Zn"));
  });
});
