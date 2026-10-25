import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de determinantes (2.º Bachillerato)", () => {
  it("determinante-area-explorador: área, signo y vectores paralelos", () => {
    show("determinante-area-explorador", [3, 1, 0, 2]);
    expect(screen.getByTestId("tool-da-det")).toHaveTextContent("6");
    expect(screen.getByTestId("tool-da-area")).toHaveTextContent("6");
    fireEvent.change(screen.getByLabelText("Segunda columna, arriba (b)"), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText("Primera columna, abajo (c)"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("Segunda columna, abajo (d)"), { target: { value: "-4" } });
    expect(screen.getByTestId("tool-da-det")).toHaveTextContent("−12");
    expect(screen.getByTestId("tool-da-signo")).toHaveTextContent("horario");
    show("determinante-area-explorador", [Number.NaN, 99, -99, 0]);
    show("determinante-area-explorador");
  });

  it("determinante-propiedades-explorador: cada operación cumple su propiedad", () => {
    for (let op = 0; op <= 4; op++) {
      const view = show("determinante-propiedades-explorador", [op, 2, 2, 3, 4, 1, 3, 2, 5, 1, 6]);
      expect(screen.getByTestId("tool-dp-antes")).toHaveTextContent("−12");
      expect(screen.getByTestId("tool-dp-despues").textContent).toBe(screen.getByTestId("tool-dp-esperado").textContent);
      view.unmount();
    }
    show("determinante-propiedades-explorador", [Number.NaN, 99]);
    show("determinante-propiedades-explorador");
  });

  it("determinante-producto-explorador: |A·B| = |A|·|B| y |kA| = k²|A|", () => {
    show("determinante-producto-explorador", [2, 1, 1, 3, 1, 2, 0, 4, 3]);
    expect(screen.getByTestId("tool-dpr-a")).toHaveTextContent("5");
    expect(screen.getByTestId("tool-dpr-b")).toHaveTextContent("4");
    expect(screen.getByTestId("tool-dpr-ab")).toHaveTextContent("20");
    expect(screen.getByTestId("tool-dpr-ka")).toHaveTextContent("45");
    expect(screen.getByTestId("tool-dpr-inv")).toHaveTextContent("1/5");
    fireEvent.change(screen.getByLabelText("A11"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("A12"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("A21"), { target: { value: "1" } });
    fireEvent.change(screen.getByLabelText("A22"), { target: { value: "1" } });
    expect(screen.getByTestId("tool-dpr-inv")).toHaveTextContent("no existe");
    show("determinante-producto-explorador");
  });

  it("determinante-parametro-explorador: (a − 1)²(a + 2) y su rango", () => {
    const a = show("determinante-parametro-explorador", [0, 3]);
    expect(screen.getByTestId("tool-dpa-det")).toHaveTextContent("20");
    expect(screen.getByTestId("tool-dpa-rango")).toHaveTextContent("3");
    a.unmount();
    const b = show("determinante-parametro-explorador", [0, 1]);
    expect(screen.getAllByTestId("tool-dpa-rango").at(-1)).toHaveTextContent("1");
    b.unmount();
    const c = show("determinante-parametro-explorador", [2, 3]);
    expect(screen.getByTestId("tool-dpa-rango")).toHaveTextContent("2");
    c.unmount();
    show("determinante-parametro-explorador", [Number.NaN, 99]);
    show("determinante-parametro-explorador");
  });

  it("adjunta-explorador: A·Adj(A)ᵗ = |A|·I y la inversa", () => {
    show("adjunta-explorador", [3, 1, 2, 3, -1, 5, 1, 3, 6, -2]);
    expect(screen.getByTestId("tool-ad-det")).toHaveTextContent("−77");
    expect(screen.getByTestId("tool-ad-prod")).toHaveTextContent("−77");
    expect(screen.getByTestId("tool-ad-inv")).toHaveTextContent("16/77");
    fireEvent.click(screen.getByRole("button", { name: "2 × 2" }));
    fireEvent.change(screen.getByLabelText("A22"), { target: { value: "4" } });
    fireEvent.change(screen.getByLabelText("A12"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("A21"), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText("A11"), { target: { value: "1" } });
    expect(screen.getByTestId("tool-ad-inv")).toHaveTextContent("no existe");
    show("adjunta-explorador");
  });

  it("rango-menores-explorador: menores no nulos por orden", () => {
    show("rango-menores-explorador", [1, 3, 1, -2, 1, 4, 3, -1, 2, 3, -4, -7]);
    expect(screen.getByTestId("tool-rm-rango")).toHaveTextContent("2");
    expect(screen.getByTestId("tool-rm-n3")).toHaveTextContent("0");
    fireEvent.change(screen.getByLabelText("A34"), { target: { value: "0" } });
    expect(screen.getByTestId("tool-rm-rango")).toHaveTextContent("3");
    show("rango-menores-explorador", [Number.NaN]);
    show("rango-menores-explorador");
  });
});
