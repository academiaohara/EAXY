import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("recta-mn-explorador", () => {
  it("clasifica proporcionalidad y constante", () => {
    render(<SlideTool block={{ kind: "tool", tool: "recta-mn-explorador", initial: [4, 1] }} />);
    expect(screen.getByTestId("tool-rm-tipo")).toHaveTextContent("afín");
    expect(screen.getByTestId("tool-rm-ritmo")).toHaveTextContent("sube 2");
    fireEvent.change(slider(/Ordenada/), { target: { value: "0" } });
    expect(screen.getByTestId("tool-rm-tipo")).toHaveTextContent("Proporcionalidad");
    fireEvent.change(slider(/Pendiente/), { target: { value: "0" } });
    expect(screen.getByTestId("tool-rm-tipo")).toHaveTextContent("constante");
  });
});

describe("pendiente-puntos-explorador", () => {
  it("(−2, 1) y (4, 5) → 2/3; vertical sin pendiente", () => {
    render(<SlideTool block={{ kind: "tool", tool: "pendiente-puntos-explorador", initial: [-2, 1, 4, 5] }} />);
    expect(screen.getByTestId("tool-pend-valor")).toHaveTextContent("Pendiente 2/3");
    fireEvent.change(slider("x₂"), { target: { value: "-2" } });
    expect(screen.getByTestId("tool-pend-valor")).toHaveTextContent("vertical");
  });
});

describe("trozos-explorador", () => {
  it("función del libro: tramos y valores", () => {
    render(<SlideTool block={{ kind: "tool", tool: "trozos-explorador", params: { a: 0, b: 3 } }} />);
    expect(screen.getByTestId("tool-trozos-valor")).toHaveTextContent("Tramo 1");
    expect(screen.getByTestId("tool-trozos-valor")).toHaveTextContent("= 7");
    fireEvent.change(slider(/Valor de x/), { target: { value: "4" } });
    expect(screen.getByTestId("tool-trozos-valor")).toHaveTextContent("Tramo 2");
    expect(screen.getByTestId("tool-trozos-corte")).toHaveTextContent("empalman");
    fireEvent.click(screen.getByRole("button", { name: "Función 4" }));
    expect(screen.getByTestId("tool-trozos-corte")).toHaveTextContent("salto de 4");
  });
});
