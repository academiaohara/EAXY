import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("recta-dos-incognitas-explorador", () => {
  it("x + 2y = 4 es oblicua; con b = 0 es vertical; con a = b = 0 no hay recta", () => {
    render(<SlideTool block={{ kind: "tool", tool: "recta-dos-incognitas-explorador", initial: [1, 2, 4] }} />);
    expect(screen.getByTestId("tool-recta-tipo")).toHaveTextContent("oblicua");
    fireEvent.change(slider("b"), { target: { value: "0" } });
    expect(screen.getByTestId("tool-recta-tipo")).toHaveTextContent("vertical x = 4");
    fireEvent.change(slider("a"), { target: { value: "0" } });
    expect(screen.getByTestId("tool-recta-tipo")).toHaveTextContent("Ningún punto");
  });
});

describe("sistema-grafico-explorador", () => {
  it("x+2y=4, x+y=3 → (2, 1); paralelas; coincidentes", () => {
    render(<SlideTool block={{ kind: "tool", tool: "sistema-grafico-explorador", initial: [1, 2, 4, 1, 1, 3] }} />);
    expect(screen.getByTestId("tool-sistema-tipo")).toHaveTextContent("x = 2");
    fireEvent.change(slider("a₂"), { target: { value: "2" } });
    fireEvent.change(slider("b₂"), { target: { value: "4" } });
    expect(screen.getByTestId("tool-sistema-tipo")).toHaveTextContent("Incompatible");
    fireEvent.change(slider("c₂"), { target: { value: "8" } });
    expect(screen.getByTestId("tool-sistema-tipo")).toHaveTextContent("Indeterminado");
  });
});

describe("reduccion-explorador", () => {
  it("×1 y ×−3 elimina x; los mínimos se calculan solos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "reduccion-explorador", initial: [3, -5, 1, 1, 2, 15] }} />);
    expect(screen.getByTestId("tool-reduccion-estado")).toHaveTextContent("No desaparece");
    fireEvent.change(slider(/2\.ª/), { target: { value: "-3" } });
    expect(screen.getByTestId("tool-reduccion-estado")).toHaveTextContent("Desaparece x");
    expect(screen.getByTestId("tool-reduccion-estado")).toHaveTextContent("4");
    fireEvent.click(screen.getByRole("button", { name: /mínimos/ }));
    expect(slider(/1\.ª/).value).toBe("1");
  });
});

describe("sistema-no-lineal-explorador", () => {
  it("y = x + 1 con el círculo: dos puntos; cambia a parábola tangente", () => {
    render(<SlideTool block={{ kind: "tool", tool: "sistema-no-lineal-explorador", initial: [0, 1, 1] }} />);
    expect(screen.getByTestId("tool-nolineal-puntos")).toHaveTextContent("2 puntos");
    fireEvent.click(screen.getByRole("button", { name: "Parábola" }));
    fireEvent.change(slider(/pendiente/), { target: { value: "2" } });
    fireEvent.change(slider(/ordenada/), { target: { value: "-1" } });
    expect(screen.getByTestId("tool-nolineal-puntos")).toHaveTextContent("1 punto");
    fireEvent.change(slider(/ordenada/), { target: { value: "-3" } });
    expect(screen.getByTestId("tool-nolineal-puntos")).toHaveTextContent("ninguna");
  });
});

describe("capitales-sistema-explorador", () => {
  it("100 000 € al 4 % y 5 % con 4 700 € → 30 000 y 70 000", () => {
    render(<SlideTool block={{ kind: "tool", tool: "capitales-sistema-explorador" }} />);
    expect(screen.getByTestId("tool-capitales").textContent?.replace(/\s/g, "")).toContain("x=30000€");
    fireEvent.change(slider("Ganancia al final del año"), { target: { value: "9000" } });
    expect(screen.getByTestId("tool-capitales")).toHaveTextContent("Sin sentido");
  });
});
