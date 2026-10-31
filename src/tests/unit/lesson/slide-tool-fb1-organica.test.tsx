import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { FAMILIAS_O, ISOMEROS, TIPOS_RX, combustionAlcano, compuesto, ramificado } from "@/components/lesson/slide/tools/Fb1OrganicaTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["fb1-ramificados-explorador", "fb1-grupos-explorador", "fb1-isomeria-explorador", "fb1-reacciones-organicas-explorador"];
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de química orgánica (1.º Bach.): valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999999, b: -9999, c: 500, n: 99 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => mount(tool, { a: -90, b: 90, c: 80, n: -3 })).not.toThrow();
    expect(() => mount(tool, { a: 3, b: 3, c: 3, n: 2 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("hidrocarburos ramificados", () => {
  it.each([
    [4, "alcano", 0, 0, 0, "butano", "C₄H₁₀"],
    [3, "alcano", 0, 1, 2, "2-metilpropano", "C₄H₁₀"],
    [4, "alcano", 0, 1, 2, "2-metilbutano", "C₅H₁₂"],
    [5, "alcano", 0, 1, 4, "2-metilpentano", "C₆H₁₄"],
    [6, "alcano", 0, 2, 3, "3-etilhexano", "C₈H₁₈"],
    [5, "alqueno", 2, 0, 0, "pent-2-eno", "C₅H₁₀"],
    [5, "alqueno", 4, 1, 3, "3-metilpent-1-eno", "C₆H₁₂"],
    [3, "alqueno", 1, 1, 2, "2-metilpropeno", "C₄H₈"],
    [2, "alqueno", 1, 0, 0, "eteno", "C₂H₄"],
    [4, "alquino", 1, 1, 3, "3-metilbut-1-ino", "C₅H₈"],
    [2, "alquino", 1, 0, 0, "etino", "C₂H₂"],
  ] as [number, "alcano" | "alqueno" | "alquino", number, 0 | 1 | 2, number, string, string][])("n=%i %s k=%i tam=%i s=%i", (n, tipo, k, tam, s, nombre, formula) => {
    const r = ramificado(n, tipo, k, tam, s)!;
    expect(r.ok).toBe(true);
    expect(r.nombre).toBe(nombre);
    expect(r.formula).toBe(formula);
  });
  it("casos no válidos", () => {
    expect(ramificado(4, "alcano", 0, 1, 1)!.ok).toBe(false);
    expect(ramificado(5, "alcano", 0, 2, 2)!.ok).toBe(false);
    expect(ramificado(5, "alquino", 1, 1, 2)!.ok).toBe(false);
    expect(ramificado(1, "alqueno", 1, 0, 0)!.ok).toBe(false);
    expect(ramificado(0, "alcano", 0, 0, 0)).toBeNull();
    expect(ramificado(11, "alcano", 0, 0, 0)).toBeNull();
  });
  it("la fórmula semidesarrollada tiene el número correcto de H y C", () => {
    for (let n = 2; n <= 8; n += 1) {
      for (const tipo of ["alcano", "alqueno", "alquino"] as const) {
        for (let k = 1; k < n; k += 1) {
          for (const tam of [0, 1, 2] as const) {
            for (let s = 1; s <= n; s += 1) {
              const r = ramificado(n, tipo, k, tam, s)!;
              if (!r.ok) continue;
              const hs = [...r.semi.matchAll(/H([₀-₉]*)/g)].reduce((t, m) => t + (m[1] ? Number([...m[1]].map((c) => "₀₁₂₃₄₅₆₇₈₉".indexOf(c)).join("")) : 1), 0);
              const cs = [...r.semi.matchAll(/C/g)].length;
              expect(cs, `${r.nombre} C`).toBe(r.carbonos);
              expect(hs, `${r.nombre} H`).toBe(r.h);
            }
          }
        }
      }
    }
  });
  it("la numeración da el localizador menor al enlace múltiple", () => {
    expect(ramificado(5, "alqueno", 4, 0, 0)!.nombre).toBe("pent-1-eno");
    expect(ramificado(6, "alqueno", 3, 0, 0)!.nombre).toBe("hex-3-eno");
    expect(ramificado(6, "alqueno", 5, 1, 2)!.nombre).toBe("5-metilhex-1-eno");
  });
});

describe("grupos funcionales", () => {
  it.each([
    ["alcohol", 4, 2, 1, "butan-2-ol", "CH₃–CH(OH)–CH₂–CH₃"],
    ["alcohol", 3, 3, 1, "propan-1-ol", "CH₃–CH₂–CH₂OH"],
    ["alcohol", 2, 1, 1, "etanol", "CH₃–CH₂OH"],
    ["aldehído", 3, 1, 1, "propanal", "CH₃–CH₂–CHO"],
    ["cetona", 3, 2, 1, "propanona", "CH₃–CO–CH₃"],
    ["cetona", 6, 4, 1, "hexan-3-ona", "CH₃–CH₂–CO–CH₂–CH₂–CH₃"],
    ["ácido carboxílico", 2, 1, 1, "ácido etanoico", "CH₃–COOH"],
    ["éster", 2, 1, 2, "etanoato de etilo", "CH₃–COO–CH₂–CH₃"],
    ["éter", 1, 1, 2, "metoxietano", "CH₃–O–CH₂–CH₃"],
    ["amina", 3, 2, 1, "propan-2-amina", "CH₃–CH(NH₂)–CH₃"],
    ["amida", 2, 1, 1, "etanamida", "CH₃–CONH₂"],
    ["nitrilo", 2, 1, 1, "etanonitrilo", "CH₃–C≡N"],
    ["haluro", 4, 3, 1, "2-clorobutano", "CH₃–CH(Cl)–CH₂–CH₃"],
  ] as const)("%s n=%i p=%i m=%i", (f, n, p, m, nombre, formula) => {
    const c = compuesto(f, n, p, m)!;
    expect(c.nombre).toBe(nombre);
    expect(c.formula).toBe(formula);
  });
  it("errores y límites", () => {
    expect(compuesto("cetona", 2, 1, 1)!.error).toBeTruthy();
    expect(compuesto("nitrilo", 1, 1, 1)!.error).toBeTruthy();
    expect(compuesto("alcohol", 0, 1, 1)).toBeNull();
    expect(compuesto("alcohol", 9, 1, 1)).toBeNull();
    expect(compuesto("éter", 2, 1, 2)!.alt).toBe("dietil éter");
    expect(FAMILIAS_O.map((f) => f.prioridad)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    for (const f of FAMILIAS_O) for (let n = 1; n <= 8; n += 1) expect(() => compuesto(f.id, n, 1, 1)).not.toThrow();
  });
});

describe("isomería y reacciones", () => {
  it("datos de isómeros coherentes", () => {
    for (const g of ISOMEROS) {
      expect(g.isomeros.length).toBeGreaterThanOrEqual(2);
      expect(new Set(g.isomeros.map((i) => i.nombre)).size).toBe(g.isomeros.length);
    }
    expect(ISOMEROS.find((g) => g.formula === "C₅H₁₂")!.isomeros).toHaveLength(3);
    expect(ISOMEROS.find((g) => g.formula === "C₆H₁₄")!.isomeros).toHaveLength(5);
    const pent = ISOMEROS.find((g) => g.formula === "C₅H₁₂")!.isomeros;
    expect(pent[0]!.teb).toBeGreaterThan(pent[1]!.teb);
    expect(pent[1]!.teb).toBeGreaterThan(pent[2]!.teb);
  });
  it("combustión de alcanos", () => {
    expect(combustionAlcano(3)!.ecuacion).toBe("C₃H₈ + 5 O₂ → 3 CO₂ + 4 H₂O");
    expect(combustionAlcano(1)!.ecuacion).toBe("CH₄ + 2 O₂ → CO₂ + 2 H₂O");
    expect(combustionAlcano(4)!.ecuacion).toBe("2 C₄H₁₀ + 13 O₂ → 8 CO₂ + 10 H₂O");
    expect(combustionAlcano(3)!.M).toBe(44);
    expect(combustionAlcano(0)).toBeNull();
    expect(combustionAlcano(9)).toBeNull();
    for (let n = 1; n <= 8; n += 1) {
      const c = combustionAlcano(n)!;
      expect(c.kJg).toBeGreaterThan(47);
      expect(c.kJg).toBeLessThan(56);
    }
    expect(TIPOS_RX.length).toBe(6);
  });
});
