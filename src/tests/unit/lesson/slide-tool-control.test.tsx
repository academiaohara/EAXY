import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";
import type { SlideToolId } from "@/lib/lesson/types";

const TOOLS: SlideToolId[] = ["lazo-perturbacion-explorador", "segundo-orden-explorador", "bloques-explorador", "routh-explorador", "pid-explorador"];

const text = () => screen.getByTestId("lesson-tool").textContent ?? "";
const press = (name: string | RegExp) => fireEvent.click(screen.getByRole("button", { name }));

describe("herramientas de Tecnología Industrial II, unidad 10: valores extremos", () => {
  it.each(TOOLS)("%s se monta con parámetros absurdos sin fallar", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 9999, b: -9999, n: 500, c: 77 } }} />)).not.toThrow();
  });
  it.each(TOOLS)("%s se monta sin parámetros", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool }} />)).not.toThrow();
  });
  it.each(TOOLS)("%s se monta con parámetros negativos o cero", (tool) => {
    expect(() => render(<SlideTool block={{ kind: "tool", tool, params: { a: 0, b: 0, c: 0, n: 0 } }} />)).not.toThrow();
  });
});

describe("resultados de las herramientas de la unidad 10", () => {
  it("lazo: abierto 30 %, cerrado 46,7 % con r = 50, d = −20, Kp = 10, G = 2", () => {
    render(<SlideTool block={{ kind: "tool", tool: "lazo-perturbacion-explorador", params: { a: 50, b: -20, c: 10 } }} />);
    expect(text()).toContain("30 %");
    expect(text()).toContain("46,7 %");
  });

  it("segundo orden: ζ = 0,35 y ωn = 1,6 dan 30,9 % y tp = 2,1 s", () => {
    render(<SlideTool block={{ kind: "tool", tool: "segundo-orden-explorador", params: { a: 0.35, b: 1.6 } }} />);
    expect(text()).toMatch(/30,\d %/);
    expect(text()).toContain("2,1 s");
  });

  it("bloques: serie 2·3 = 6 y anillo con H = 0,5 de G = 4 da 1,33", () => {
    render(<SlideTool block={{ kind: "tool", tool: "bloques-explorador", params: { a: 2, b: 3, c: 0.5 } }} />);
    expect(text()).toContain("6");
    press("Anillo con H");
    expect(text()).not.toContain("= 6");
    render(<SlideTool block={{ kind: "tool", tool: "bloques-explorador", params: { a: 4, b: 3, c: 0.5 } }} />);
    fireEvent.click(screen.getAllByRole("button", { name: "Anillo con H" })[1]!);
    expect(screen.getAllByTestId("lesson-tool")[1]!.textContent).toContain("1,33");
  });

  it("Routh: con a₄ = 0,5 es estable; con a₄ = 2 hay dos cambios de signo", () => {
    const { unmount } = render(<SlideTool block={{ kind: "tool", tool: "routh-explorador", params: { a: 3, b: 3, c: 2, n: 0.5 } }} />);
    expect(text()).toContain("0 cambios");
    expect(text()).toContain("Estable");
    unmount();
    render(<SlideTool block={{ kind: "tool", tool: "routh-explorador", params: { a: 3, b: 3, c: 2, n: 2 } }} />);
    expect(text()).toContain("2 cambios");
    expect(text()).toContain("Inestable");
  });

  it("PID: con solo P y Kp = 4 queda un error permanente de 0,2", () => {
    render(<SlideTool block={{ kind: "tool", tool: "pid-explorador", params: { a: 4, b: 2, c: 0.5 } }} />);
    expect(text()).toContain("Valor final de la salida0,8");
    expect(text()).toContain("Error permanente0,2");
  });

  it("PID: con integral desaparece el error permanente", () => {
    render(<SlideTool block={{ kind: "tool", tool: "pid-explorador", params: { a: 4, b: 2, c: 0.5 } }} />);
    press("PI");
    expect(text()).toContain("Error permanente0");
    expect(text()).not.toContain("Error permanente0,2");
  });
});
