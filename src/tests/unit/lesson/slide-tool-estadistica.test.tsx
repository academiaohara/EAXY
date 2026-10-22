import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("tabla-parametros-explorador", () => {
  it("test: N = 288, x̄ = 2,66, σ = 1,19", () => {
    render(<SlideTool block={{ kind: "tool", tool: "tabla-parametros-explorador", params: { a: 0 } }} />);
    expect(screen.getByTestId("tool-tp-n")).toHaveTextContent("288");
    expect(screen.getByTestId("tool-tp-sumfx")).toHaveTextContent("766");
    expect(screen.getByTestId("tool-tp-media")).toHaveTextContent("2,66");
    expect(screen.getByTestId("tool-tp-sd")).toHaveTextContent("1,19");
    fireEvent.change(slider("Frecuencia de 5"), { target: { value: "0" } });
    expect(screen.getByTestId("tool-tp-n")).toHaveTextContent("269");
  });
});

describe("agrupar-explorador", () => {
  it("6 intervalos de longitud 5; frecuencias del libro", () => {
    render(<SlideTool block={{ kind: "tool", tool: "agrupar-explorador", params: { a: 6 } }} />);
    expect(screen.getByTestId("tool-agr-len")).toHaveTextContent("longitud de cada intervalo = 5");
    expect(screen.getByTestId("tool-agr-freq")).toHaveTextContent("2 · 4 · 11 · 14 · 5 · 4 (total 40)");
    fireEvent.click(screen.getByRole("button", { name: "8 intervalos" }));
    expect(screen.getByTestId("tool-agr-len")).toHaveTextContent("r′ = 32");
  });
});

describe("cuartiles-explorador", () => {
  it("estaturas: Q1 = 160,5, Me = 166, Q3 = 169,5 y el 189 es atípico; con 175 ya no", () => {
    render(<SlideTool block={{ kind: "tool", tool: "cuartiles-explorador", params: { a: 1 } }} />);
    expect(screen.getByTestId("tool-cuart-valores")).toHaveTextContent("Q1 = 160,5 · Me = 166 · Q3 = 169,5");
    expect(screen.getByTestId("tool-cuart-atipicos")).toHaveTextContent("189");
    fireEvent.change(slider("Mayor valor"), { target: { value: "175" } });
    expect(screen.getByTestId("tool-cuart-atipicos")).toHaveTextContent("No hay");
  });
  it("17 datos", () => {
    render(<SlideTool block={{ kind: "tool", tool: "cuartiles-explorador", params: { a: 0 } }} />);
    expect(screen.getByTestId("tool-cuart-valores")).toHaveTextContent("Q1 = 4 · Me = 5 · Q3 = 7");
  });
});

describe("dispersion-explorador", () => {
  it("A: 100 y 12,5 → 12,5 %; B: 15 y 2,5 → 16,7 %", () => {
    render(<SlideTool block={{ kind: "tool", tool: "dispersion-explorador", initial: [100, 25, 15, 5] }} />);
    expect(screen.getByTestId("tool-disp-a")).toHaveTextContent("12,5 %");
    expect(screen.getByTestId("tool-disp-b")).toHaveTextContent("16,7 %");
    expect(screen.getByTestId("tool-disp-mayor")).toHaveTextContent("B");
  });
});
