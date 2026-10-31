import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { COMPUESTOS_CENT, NA, PROBLEMAS_EMP, REACCIONES_EB, SUSTANCIAS_MOL, atomosPorFormula, calculoReaccion, cient, composicionCentesimal, conservaMasa, formulaEmpirica, formulaMolecular, masaMolar, masaParticula, moles, unidades } from "@/components/lesson/slide/tools/Fb1CantidadTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-mol-masa-explorador", "fb1-composicion-centesimal-explorador", "fb1-formula-empirica-explorador", "fb1-estequiometria-pureza-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de cantidad de sustancia (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("mol y masa molar", () => {
  it("masas molares y conversiones", () => {
    expect(masaMolar("H2O")).toBe(18);
    expect(masaMolar("H2SO4")).toBe(98);
    expect(masaMolar("NaCl")).toBe(58.5);
    expect(masaMolar("Al2(SO4)3")).toBe(342);
    expect(masaMolar("Xx")).toBeNaN();
    for (const f of SUSTANCIAS_MOL) expect(Number.isFinite(masaMolar(f)), f).toBe(true);
    expect(moles(36, 18)).toBe(2);
    expect(moles(1, 0)).toBeNaN();
    expect(unidades(2)).toBeCloseTo(1.2044e24, -20);
    expect(masaParticula(18)).toBeCloseTo(18 / NA);
    expect(atomosPorFormula("H2SO4")).toBe(7);
    expect(atomosPorFormula("Al2(SO4)3")).toBe(17);
    expect(cient(6.022e23)).toBe("6,02·10²³");
    expect(cient(3e-23)).toBe("3·10⁻²³");
    expect(cient(0)).toBe("0");
    expect(cient(NaN)).toBe("—");
  });
});

describe("composición centesimal", () => {
  it("porcentajes", () => {
    const agua = composicionCentesimal("H2O")!;
    expect(agua.find((c) => c.el === "O")!.pct).toBeCloseTo(88.89, 1);
    const caco3 = composicionCentesimal("CaCO3")!;
    expect(caco3.map((c) => c.pct)).toEqual([40, 12, 48]);
    expect(composicionCentesimal("Zz")).toBeNull();
    for (const f of COMPUESTOS_CENT) expect(composicionCentesimal(f)!.reduce((s, c) => s + c.pct, 0), f).toBeCloseTo(100, 6);
  });
});

describe("fórmula empírica y molecular", () => {
  it.each([
    ["Glucosa", "CH₂O", "C₆H₁₂O₆"], ["Benceno", "CH", "C₆H₆"], ["Agua oxigenada", "HO", "H₂O₂"], ["Etano", "CH₃", "C₂H₆"],
    ["Ácido acético", "CH₂O", "C₂H₄O₂"], ["Butano", "C₂H₅", "C₄H₁₀"], ["Óxido de hierro", "Fe₂O₃", "Fe₂O₃"], ["Sulfato de cobre", "CuSO₄", "CuSO₄"],
  ])("%s", (nombre, emp, molec) => {
    const p = PROBLEMAS_EMP.find((x) => x.nombre === nombre)!;
    const e = formulaEmpirica(p.datos.map((d) => ({ ...d })))!;
    expect(e.formula).toBe(emp);
    expect(formulaMolecular(e, p.M).formula).toBe(molec);
  });
  it("casos límite", () => {
    expect(formulaEmpirica([{ el: "Xx", pct: 50 }, { el: "O", pct: 50 }])).toBeNull();
    expect(formulaEmpirica([{ el: "C", pct: 0 }, { el: "O", pct: 100 }])).toBeNull();
    const e = formulaEmpirica([{ el: "C", pct: 40 }, { el: "H", pct: 6.7 }, { el: "O", pct: 53.3 }])!;
    expect(formulaMolecular(e, 45).formula).toBeNull();
  });
});

describe("estequiometría", () => {
  it("todas las ecuaciones están ajustadas y conservan la masa", () => {
    for (const r of REACCIONES_EB) expect(conservaMasa(r), r.id).toBe(true);
  });
  it("cálculo con pureza", () => {
    const c = calculoReaccion(REACCIONES_EB[0]!, 0, 200, 80)!;
    expect(c.masaPura).toBe(160);
    expect(c.tabla.find((e) => e.f === "CaO")!.masa).toBeCloseTo(89.6, 6);
    expect(c.tabla.find((e) => e.f === "CO2")!.mol).toBeCloseTo(1.6, 9);
    const nh3 = calculoReaccion(REACCIONES_EB[4]!, 0, 28, 100)!;
    expect(nh3.tabla.find((e) => e.f === "NH3")!.masa).toBeCloseTo(34, 6);
    expect(calculoReaccion(REACCIONES_EB[0]!, 9, 10, 100)).toBeNull();
    expect(calculoReaccion(REACCIONES_EB[0]!, 0, 100, 150)!.masaPura).toBe(100);
  });
});
