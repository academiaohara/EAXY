import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("escala-explorador", () => {
  it("1:10 000: 1 cm son 100 m; 2 cm, 200 m", () => {
    render(<SlideTool block={{ kind: "tool", tool: "escala-explorador", params: { a: 10000, b: 2 } }} />);
    expect(screen.getByTestId("tool-escala-1cm")).toHaveTextContent("100 m");
    expect(screen.getByTestId("tool-escala-real")).toHaveTextContent("200 m");
  });
  it("1:20 000 000: 1 cm son 200 km; razones N² y N³ de 1:200", () => {
    render(<SlideTool block={{ kind: "tool", tool: "escala-explorador", params: { a: 20000000, b: 1 } }} />);
    expect(screen.getByTestId("tool-escala-1cm")).toHaveTextContent("200 km");
    fireEvent.change(slider("Escala 1 : N"), { target: { value: "2" } });
    expect(screen.getByTestId("tool-escala-razones")).toHaveTextContent("40000 8000000");
  });
});

describe("semejanza-razon-explorador", () => {
  it("k = 2: ×2, ×4, ×8", () => {
    render(<SlideTool block={{ kind: "tool", tool: "semejanza-razon-explorador", params: { a: 4, b: 2 } }} />);
    expect(screen.getByTestId("tool-razon-lado")).toHaveTextContent("× 2");
    expect(screen.getByTestId("tool-razon-area")).toHaveTextContent("× 4");
    expect(screen.getByTestId("tool-razon-vol")).toHaveTextContent("× 8");
  });
});

describe("tales-explorador", () => {
  it("AD = 8 de AB = 12: razón 2/3", () => {
    render(<SlideTool block={{ kind: "tool", tool: "tales-explorador", initial: [12, 15, 18, 8] }} />);
    expect(screen.getByTestId("tool-tales-lados")).toHaveTextContent("AE = 10");
    expect(screen.getByTestId("tool-tales-lados")).toHaveTextContent("DE = 12");
  });
  it("sin triángulo posible", () => {
    render(<SlideTool block={{ kind: "tool", tool: "tales-explorador", initial: [6, 6, 20, 3] }} />);
    expect(screen.getByTestId("tool-tales-lados")).toHaveTextContent("no se puede");
  });
});

describe("sombra-explorador", () => {
  it("vara de 1,6 m con sombra de 0,7 m y árbol de 7,2 m de sombra", () => {
    render(<SlideTool block={{ kind: "tool", tool: "sombra-explorador", initial: [16, 7, 72] }} />);
    expect(screen.getByTestId("tool-sombra-altura")).toHaveTextContent("16,46");
  });
});

describe("homotecia-explorador", () => {
  it("k = 2 amplía; k = 0,5 reduce; k negativo gira", () => {
    render(<SlideTool block={{ kind: "tool", tool: "homotecia-explorador", params: { a: 4 } }} />);
    expect(screen.getByTestId("tool-homo-razon")).toHaveTextContent("ampliación");
    fireEvent.change(slider(/Razón/), { target: { value: "0.5" } });
    expect(screen.getByTestId("tool-homo-razon")).toHaveTextContent("reducción");
    fireEvent.change(slider(/Razón/), { target: { value: "-2" } });
    expect(screen.getByTestId("tool-homo-razon")).toHaveTextContent("giro");
  });
});
