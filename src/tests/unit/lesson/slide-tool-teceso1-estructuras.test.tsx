import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { anguloVuelco, cargaMaxima, deformacionMarco, flechaViga } from "@/components/lesson/slide/tools/TecEso1EstructurasTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["esfuerzos-barra-explorador", "viga-flexion-explorador", "estabilidad-explorador", "triangulacion-explorador", "puentes-tipos-explorador", "ensayo-puente-explorador"];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 1.º ESO, tema 4: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 4", () => {
  it("funciones: flecha de una viga, vuelco, marco y puente", () => {
    // Un listón de 5 × 2 cm con 20 kg en el centro y 1 m de luz: 2 mm de canto, 12 mm plano.
    expect(flechaViga(20, 1, 0.02, 0.05)).toBeCloseTo(1.96, 1);
    expect(flechaViga(20, 1, 0.05, 0.02)).toBeCloseTo(12.25, 1);
    expect(flechaViga(20, 1, 0.05, 0.02) / flechaViga(20, 1, 0.02, 0.05)).toBeCloseTo(6.25, 6);
    expect(anguloVuelco(60, 60)).toBeCloseTo(26.57, 1);
    expect(anguloVuelco(60, 15)).toBeCloseTo(63.43, 1);
    expect(deformacionMarco(0, 50)).toBeGreaterThan(20);
    expect(deformacionMarco(1, 100)).toBeLessThan(6);
    expect(cargaMaxima(0, 20, false)).toBe(200);
    expect(cargaMaxima(2, 20, true)).toBe(3000);
  });

  it("esfuerzos: cada esfuerzo muestra su explicación y el estado cambia con la carga", () => {
    mount("esfuerzos-barra-explorador", { n: 0, a: 50 });
    expect(text()).toContain("Soporta la carga");
    expect(text()).toContain("estiran");
    fireEvent.click(screen.getByRole("button", { name: "Torsión" }));
    expect(text()).toContain("retuercen");
    fireEvent.change(screen.getByRole("slider"), { target: { value: "100" } });
    expect(text()).toContain("Peligro");
  });

  it("viga: de canto se dobla poco; plana, mucho más", () => {
    mount("viga-flexion-explorador", { a: 20, b: 1 });
    expect(text()).toContain("Correcta");
    fireEvent.click(screen.getByRole("button", { name: /Plana/ }));
    expect(text()).toContain("Se dobla demasiado");
  });

  it("estabilidad: una base estrecha y alta vuelca antes que una ancha y baja", () => {
    mount("estabilidad-explorador", { a: 60, b: 120 });
    expect(text()).toContain("27°");
    expect(text()).toContain("Estable");
    fireEvent.click(screen.getByRole("button", { name: "Lastre en la base" }));
    expect(text()).toContain("45°");
  });

  it("triangulación: sin diagonal es deformable y con diagonal, rígido", () => {
    mount("triangulacion-explorador", { n: 0, a: 60 });
    expect(text()).toContain("Deformable");
    fireEvent.click(screen.getByRole("button", { name: "Una diagonal" }));
    expect(text()).toContain("Rígida");
  });

  it("puentes: el atirantado trabaja a tracción en los tirantes", () => {
    mount("puentes-tipos-explorador", { n: 3 });
    expect(text()).toContain("Tracción en los tirantes");
    fireEvent.click(screen.getByRole("button", { name: "Puente colgante" }));
    expect(text()).toContain("cables principales");
  });

  it("ensayo: una hoja plana aguanta 200 g y se rompe con más carga", () => {
    mount("ensayo-puente-explorador", { n: 0, a: 20 });
    expect(text()).toContain("200 g");
    fireEvent.change(screen.getAllByRole("slider")[1]!, { target: { value: "300" } });
    expect(text()).toContain("Se rompe");
  });
});
