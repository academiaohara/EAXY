import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("urna-arbol-explorador", () => {
  it("3 verdes y 2 rojas sin reemplazamiento: VV = 3/10, RR = 1/10, distintas = 3/5", () => {
    render(<SlideTool block={{ kind: "tool", tool: "urna-arbol-explorador", initial: [3, 2, 0] }} />);
    expect(screen.getByTestId("tool-urna-vv")).toHaveTextContent("3/10");
    expect(screen.getByTestId("tool-urna-rr")).toHaveTextContent("1/10");
    expect(screen.getByTestId("tool-urna-distintas")).toHaveTextContent("3/5");
    fireEvent.click(screen.getByRole("button", { name: "Con reemplazamiento" }));
    expect(screen.getByTestId("tool-urna-vv")).toHaveTextContent("9/25");
    expect(screen.getByTestId("tool-urna-distintas")).toHaveTextContent("12/25");
  });
});

describe("dos-dados-explorador", () => {
  it("diferencia > 3: 6/36; menor < 4: 27/36", () => {
    render(<SlideTool block={{ kind: "tool", tool: "dos-dados-explorador", params: { a: 1, b: 3 } }} />);
    expect(screen.getByTestId("tool-dados-p")).toHaveTextContent("6/36");
    fireEvent.click(screen.getByRole("button", { name: "Menor" }));
    fireEvent.click(screen.getByRole("button", { name: "menor que" }));
    fireEvent.change(slider("Valor k"), { target: { value: "4" } });
    expect(screen.getByTestId("tool-dados-p")).toHaveTextContent("27/36");
  });
});

describe("independientes-explorador", () => {
  it("3 monedas: todas 0,125; alguna 0,875", () => {
    render(<SlideTool block={{ kind: "tool", tool: "independientes-explorador", initial: [50, 3] }} />);
    expect(screen.getByTestId("tool-ind-todas")).toHaveTextContent("0,125");
    expect(screen.getByTestId("tool-ind-alguna")).toHaveTextContent("0,875");
  });
});
