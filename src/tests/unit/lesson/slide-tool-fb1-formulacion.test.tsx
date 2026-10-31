import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { ACIDOS, ACIDOS_SAL, CATIONES, ENTRENADOR, NEGATIVOS, POSITIVOS, anionTradicional, binario, compatible, noxAcido, nombresAcido, obtencionAcido, opcionesEntrenador, oxisal } from "@/components/lesson/slide/tools/Fb1FormulacionTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-binarios-explorador", "fb1-oxoacidos-explorador", "fb1-oxisales-explorador", "fb1-entrenador-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);
const P = (s: string) => POSITIVOS.find((x) => x.s === s)!;
const N = (s: string) => NEGATIVOS.find((x) => x.id === s)!;
const C = (s: string) => CATIONES.find((x) => x.s === s)!;
const A = (f: string) => ACIDOS.find((a) => a.f === f)!;

describe("herramientas de formulación (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 3 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("compuestos binarios", () => {
  it.each([
    ["Fe", 3, "O", "Fe₂O₃", "trióxido de dihierro", "óxido de hierro(III)"],
    ["N", 5, "O", "N₂O₅", "pentaóxido de dinitrógeno", "óxido de nitrógeno(V)"],
    ["C", 2, "O", "CO", "monóxido de carbono", "óxido de carbono(II)"],
    ["Ca", 2, "O", "CaO", "monóxido de calcio", "óxido de calcio"],
    ["Cu", 1, "S", "Cu₂S", "sulfuro de dicobre", "sulfuro de cobre(I)"],
    ["Al", 3, "Cl", "AlCl₃", "tricloruro de aluminio", "cloruro de aluminio"],
    ["Ca", 2, "H", "CaH₂", "dihidruro de calcio", "hidruro de calcio"],
    ["Na", 1, "O2", "Na₂O₂", "dióxido de disodio", "peróxido de sodio"],
    ["S", 6, "F", "SF₆", "hexafluoruro de azufre", "fluoruro de azufre(VI)"],
    ["Mg", 2, "N", "Mg₃N₂", "dinitruro de trimagnesio", "nitruro de magnesio"],
    ["Cl", 7, "O", "Cl₂O₇", "heptaóxido de dicloro", "óxido de cloro(VII)"],
  ] as [string, number, string, string, string, string][])("%s(%i) + %s", (p, n, g, formula, sis, stock) => {
    expect(compatible(P(p), n, N(g))).toBe(true);
    const r = binario(P(p), n, N(g));
    expect(r.formula).toBe(formula);
    expect(r.sistematica).toBe(sis);
    expect(r.stock).toBe(stock);
  });
  it("compatibilidad", () => {
    expect(compatible(P("Fe"), 4, N("O"))).toBe(false);
    expect(compatible(P("Cl"), 1, N("Cl"))).toBe(false);
    expect(compatible(P("S"), 6, N("H"))).toBe(false);
    expect(compatible(P("Al"), 3, N("O2"))).toBe(false);
    expect(compatible(P("Cl"), 1, N("N"))).toBe(false);
    expect(compatible(P("N"), 3, N("Cl"))).toBe(true);
  });
  it("todas las combinaciones compatibles dan fórmulas neutras", () => {
    for (const p of POSITIVOS) for (const n of p.nox) for (const g of NEGATIVOS) {
      if (!compatible(p, n, g)) continue;
      const r = binario(p, n, g);
      const carga = g.tipo === "peroxido" ? 1 : g.carga;
      const nG = g.tipo === "peroxido" ? r.subN : r.subN;
      expect(r.subP * n - nG * carga, `${p.s}${n} ${g.id}`).toBe(0);
    }
  });
});

describe("oxoácidos", () => {
  it("números de oxidación y obtención", () => {
    expect(noxAcido(A("H₂SO₄"))).toBe(6);
    expect(noxAcido(A("HNO₃"))).toBe(5);
    expect(noxAcido(A("HClO"))).toBe(1);
    expect(noxAcido(A("HClO₄"))).toBe(7);
    expect(noxAcido(A("H₂Cr₂O₇"))).toBe(6);
    expect(noxAcido(A("HMnO₄"))).toBe(7);
    expect(obtencionAcido(A("H₂SO₄")).ecuacion).toBe("SO₃ + H₂O → H₂SO₄");
    expect(obtencionAcido(A("HNO₃")).ecuacion).toBe("N₂O₅ + H₂O → 2 HNO₃");
    expect(obtencionAcido(A("H₃PO₄")).ecuacion).toBe("P₂O₅ + 3 H₂O → 2 H₃PO₄");
    expect(obtencionAcido(A("H₂Cr₂O₇")).ecuacion).toBe("2 CrO₃ + H₂O → H₂Cr₂O₇");
  });
  it("nombres", () => {
    expect(nombresAcido(A("H₂SO₄")).iupac2005).toBe("dihidrogeno(tetraoxidosulfato)");
    expect(nombresAcido(A("H₂SO₄")).clasica).toBe("tetraoxosulfato(VI) de dihidrógeno");
    expect(anionTradicional(A("H₂SO₄"))).toBe("sulfato");
    expect(anionTradicional(A("H₂SO₃"))).toBe("sulfito");
    expect(anionTradicional(A("HClO"))).toBe("hipoclorito");
    expect(anionTradicional(A("HClO₄"))).toBe("perclorato");
    expect(anionTradicional(A("H₃PO₄"))).toBe("fosfato");
    expect(anionTradicional(A("H₂CO₃"))).toBe("carbonato");
    expect(anionTradicional(A("H₃BO₃"))).toBe("borato");
    expect(anionTradicional(A("H₂Cr₂O₇"))).toBe("dicromato");
    expect(anionTradicional(A("HMnO₄"))).toBe("permanganato");
    expect(anionTradicional(A("HNO₂"))).toBe("nitrito");
    expect(anionTradicional(A("H₃AsO₄"))).toBe("arseniato");
  });
  it("todos los oxoácidos tienen nº de oxidación entero y positivo, y una obtención con coeficientes enteros", () => {
    for (const a of ACIDOS) {
      expect(Number.isInteger(noxAcido(a)) && noxAcido(a) > 0, a.f).toBe(true);
      const o = obtencionAcido(a);
      expect(Number.isInteger(o.p) && Number.isInteger(o.q) && Number.isInteger(o.w), a.f).toBe(true);
    }
  });
});

describe("oxisales", () => {
  it.each([
    ["Fe", 3, "H₂SO₄", 2, "Fe₂(SO₄)₃", "sulfato de hierro(III)", "tris(tetraoxidosulfato) de dihierro"],
    ["Ca", 2, "H₂CO₃", 2, "CaCO₃", "carbonato de calcio", "trioxidocarbonato de calcio"],
    ["Ca", 2, "H₂CO₃", 1, "Ca(HCO₃)₂", "hidrogenocarbonato de calcio", "bis[hidrogeno(trioxidocarbonato)] de calcio"],
    ["Na", 1, "H₃PO₄", 2, "Na₂HPO₄", "hidrogenofosfato de sodio", "hidrogeno(tetraoxidofosfato) de disodio"],
    ["NH₄", 1, "H₂SO₄", 2, "(NH₄)₂SO₄", "sulfato de amonio", "tetraoxidosulfato de diamonio"],
    ["K", 1, "HMnO₄", 1, "KMnO₄", "permanganato de potasio", "tetraoxidomanganato de potasio"],
    ["K", 1, "H₂Cr₂O₇", 2, "K₂Cr₂O₇", "dicromato de potasio", "heptaoxidodicromato de dipotasio"],
    ["Ca", 2, "H₃PO₄", 3, "Ca₃(PO₄)₂", "fosfato de calcio", "bis(tetraoxidofosfato) de tricalcio"],
  ] as [string, number, string, number, string, string, string][])("%s(%i) + %s (−%i H)", (c, n, a, r, formula, stock, sis) => {
    const s = oxisal(C(c), n, ACIDOS_SAL.find((x) => x.f === a)!, r)!;
    expect(s.formula).toBe(formula);
    expect(s.stock).toBe(stock);
    expect(s.sistematica).toBe(sis);
  });
  it("valores no válidos", () => {
    expect(oxisal(C("Na"), 1, ACIDOS_SAL.find((x) => x.f === "HNO₃")!, 2)).toBeNull();
    expect(oxisal(C("Na"), 1, ACIDOS_SAL.find((x) => x.f === "HNO₃")!, 0)).toBeNull();
  });
});

describe("entrenador", () => {
  it("cada ejercicio tiene 4 opciones distintas y solo una correcta, en los dos modos", () => {
    for (let i = 0; i < ENTRENADOR.length; i += 1) {
      for (const modo of ["formula", "nombre"] as const) {
        const ops = opcionesEntrenador(i, modo);
        expect(ops.length, `${i} ${modo}`).toBe(4);
        expect(new Set(ops.map((o) => o.texto)).size).toBe(4);
        expect(ops.filter((o) => o.ok)).toHaveLength(1);
        expect(ops.find((o) => o.ok)!.texto).toBe(modo === "formula" ? ENTRENADOR[i]!.f : ENTRENADOR[i]!.stock);
      }
    }
    expect(opcionesEntrenador(-1, "formula").some((o) => o.ok)).toBe(true);
  });
});
