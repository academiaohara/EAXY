import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import { planificar, vigaCentral } from "@/components/lesson/slide/tools/Tec1ProyectosTools";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = [
  "objeto-problema-explorador",
  "matriz-decision-explorador",
  "requisitos-verificables-explorador",
  "gantt-explorador",
  "roles-equipo-explorador",
  "prototipo-ensayo-explorador",
  "memoria-tecnica-explorador",
];

const text = () => screen.getByTestId("lesson-tool").textContent ?? "";

describe("herramientas de Tecnología e Ingeniería I, tema 1: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos, nulos o ausentes", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />)).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 0, b: 0, c: 0, n: 0 } }} />)).not.toThrow();
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas del tema 1", () => {
  it("planificar: el camino A-B-D-E dura 15 días y C y F tienen holgura", () => {
    const p = planificar([3, 4, 2, 5, 3, 4]);
    expect(p.fin).toBe(15);
    expect(p.holgura).toMatchObject({ A: 0, B: 0, C: 2, D: 0, E: 0, F: 4 });
  });

  it("Gantt: 15 días, camino crítico y 840 € de mano de obra", () => {
    render(<SlideTool block={{ kind: "tool", tool: "gantt-explorador" }} />);
    expect(text()).toContain("15 días");
    expect(text()).toContain("A → B → D → E");
    expect(text()).toContain("840 €");
  });

  it("matriz de decisión: con los pesos iniciales gana la dinamo y con todos a 0 no hay decisión", () => {
    render(<SlideTool block={{ kind: "tool", tool: "matriz-decision-explorador", params: { n: 0 } }} />);
    expect(text()).toContain("Dinamo de buje");
    for (const slider of screen.getAllByRole("slider")) {
      fireEvent.change(slider, { target: { value: "0" } });
    }
    expect(text()).toContain("Sin criterios");
  });

  it("requisitos: con 850 g, 6 kg y 22 € se cumple 1 de 3", () => {
    render(<SlideTool block={{ kind: "tool", tool: "requisitos-verificables-explorador" }} />);
    expect(text()).toContain("1 de 3");
  });

  it("viga: 3 kg sobre pino de 12 mm da 0,51 mm de flecha", () => {
    expect(vigaCentral(3 * 9.81, 600, 200, 12, 9000).delta).toBeCloseTo(0.511, 2);
    render(<SlideTool block={{ kind: "tool", tool: "prototipo-ensayo-explorador" }} />);
    expect(text()).toContain("0,51 mm");
  });

  it("roles: el reparto inicial deja 4,7 h de desequilibrio", () => {
    render(<SlideTool block={{ kind: "tool", tool: "roles-equipo-explorador" }} />);
    expect(text()).toContain("4,7 h");
  });

  it("explorador de objetos: empieza con 1 de 8 y suma al pulsar otro", () => {
    render(<SlideTool block={{ kind: "tool", tool: "objeto-problema-explorador" }} />);
    expect(text()).toContain("1 de 8");
    fireEvent.click(screen.getByRole("button", { name: "Placa solar" }));
    expect(text()).toContain("2 de 8");
  });

  it("memoria técnica: la lista de materiales suma 15,4 €", () => {
    render(<SlideTool block={{ kind: "tool", tool: "memoria-tecnica-explorador" }} />);
    expect(text()).toContain("15,4 €");
  });
});
