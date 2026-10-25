import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { EPOCAS, FUENTES, cargas, fiabilidad, totalPresupuesto } from "@/components/lesson/slide/tools/TecEso1ProcesoTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["analisis-objeto-explorador", "linea-tiempo-explorador", "presupuesto-explorador", "reparto-tareas-explorador", "fuente-fiable-explorador"];

const text = () => (screen.getByTestId("lesson-tool").textContent ?? "").replace(/\s/g, " ");
const mount = (tool: SlideToolId, params?: Record<string, number>) => render(<SlideTool block={{ kind: "tool", tool, params }} />);

describe("herramientas de Tecnología 1.º ESO, tema 1: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => mount(tool, { a: 9999, b: -9999, n: 500, c: 77 })).not.toThrow();
    expect(() => mount(tool, { a: 0, b: 0, c: 0, n: 0 })).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 1", () => {
  it("funciones: presupuesto y cargas del equipo", () => {
    expect(totalPresupuesto([1, 1, 1, 1, 2], false).base).toBeCloseTo(19.6, 6);
    expect(totalPresupuesto([1, 1, 1, 1, 2], true).total).toBeCloseTo(21.56, 6);
    expect(cargas([0, 0, 0, 0, 0, 0])).toEqual([18, 0, 0]);
    expect(cargas([0, 1, 2, 0, 1, 2])).toEqual([5, 8, 5]);
    expect(EPOCAS).toHaveLength(7);
  });

  it("fuentes: el manual cumple 5 criterios y el foro anónimo solo 1", () => {
    expect(fiabilidad(FUENTES[0].c)).toBe(5);
    expect(fiabilidad(FUENTES[3].c)).toBe(1);
    mount("fuente-fiable-explorador", { n: 3 });
    expect(text()).toContain("1 de 5");
    expect(text()).toContain("Poco fiable");
  });

  it("línea del tiempo: la primera época es la Prehistoria y el control deslizante cambia de época", () => {
    mount("linea-tiempo-explorador");
    expect(text()).toContain("Prehistoria");
    fireEvent.change(screen.getByRole("slider"), { target: { value: "6" } });
    expect(text()).toContain("Era digital");
  });

  it("análisis de objeto: cambia de capa y cuenta las exploradas", () => {
    mount("analisis-objeto-explorador");
    expect(text()).toContain("1 de 5");
    fireEvent.click(screen.getByRole("button", { name: "Material" }));
    expect(screen.getByTestId("analisis-detalle").textContent).toContain("Acero");
    expect(text()).toContain("2 de 5");
  });

  it("presupuesto: 19,60 € de materiales y avisa si se supera el tope", () => {
    mount("presupuesto-explorador", { a: 10 });
    expect(text()).toContain("19,6 €");
    expect(text()).toContain("Te pasas");
  });

  it("reparto: todo en una persona queda descompensado; al repartir mejora", () => {
    mount("reparto-tareas-explorador");
    expect(text()).toContain("Descompensado");
    expect(text()).toContain("18 h");
    const botones = screen.getAllByRole("button").filter((b) => b.textContent?.includes("Alba"));
    expect(botones.length).toBe(6);
  });
});
