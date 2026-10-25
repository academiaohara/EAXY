import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de matrices (2.º Bachillerato)", () => {
  it("matriz-operaciones-explorador: suma, resta y escalar", () => {
    show("matriz-operaciones-explorador");
    expect(screen.getByTestId("tool-mo-c11")).toHaveTextContent("3");
    fireEvent.click(screen.getByRole("button", { name: "A − B" }));
    expect(screen.getByTestId("tool-mo-c11")).toHaveTextContent("−1");
    fireEvent.click(screen.getByRole("button", { name: "k · A" }));
    expect(screen.getByTestId("tool-mo-c11")).toHaveTextContent("3");
    fireEvent.change(screen.getByLabelText("A11"), { target: { value: "99" } });
    expect(screen.getByTestId("tool-mo-c11")).toHaveTextContent("27");
  });

  it("matriz-producto-explorador: A·B de 2×3 por 3×2 y dimensiones incompatibles", () => {
    show("matriz-producto-explorador", [2, 3, 3, 2, 1, 2, 3, 4, 5, 6, 0, 0, 0, 2, 1, 0, 3, 2, 0, 4, 1, 0]);
    expect(screen.getByTestId("tool-mp-dim")).toHaveTextContent("A·B: 2×2");
    expect(screen.getByTestId("tool-mp-calculo")).toHaveTextContent("c11 = 1·2 + 2·3 + 3·4 = 20");
    fireEvent.change(screen.getByLabelText("Filas de B"), { target: { value: "2" } });
    expect(screen.getByTestId("tool-mp-error")).toBeInTheDocument();
    expect(screen.getByTestId("tool-mp-dim")).toHaveTextContent("A·B no está definido");
  });

  it("matriz-inversa-explorador: regular, singular y 3×3", () => {
    show("matriz-inversa-explorador", [2, 1, 2, 0, 3, 4]);
    expect(screen.getByTestId("tool-mi-det")).toHaveTextContent("−2");
    expect(screen.getByTestId("tool-mi-estado")).toHaveTextContent("Sí");
    expect(screen.getByTestId("tool-mi-inversa")).toHaveTextContent("3/2");
    fireEvent.change(screen.getByLabelText("A22"), { target: { value: "6" } });
    expect(screen.getByTestId("tool-mi-estado")).toHaveTextContent("No");
    expect(screen.getByTestId("tool-mi-singular")).toBeInTheDocument();
    show("matriz-inversa-explorador", [3, -1, 1, 2, 1, 0, 3, 4, 1, 1]);
    expect(screen.getAllByTestId("tool-mi-det").at(-1)).toHaveTextContent("16");
    expect(screen.getAllByTestId("tool-mi-check").at(-1)).toHaveTextContent("✓");
  });

  it("matriz-potencias-explorador: el giro de 90° se repite y la cizalla crece", () => {
    show("matriz-potencias-explorador", [0, 4]);
    expect(screen.getByTestId("tool-mpot-c12")).toHaveTextContent("0");
    const b = show("matriz-potencias-explorador", [1, 9]);
    expect(screen.getAllByTestId("tool-mpot-c12").at(-1)).toHaveTextContent("9");
    b.unmount();
    show("matriz-potencias-explorador", [Number.NaN, -3]);
    show("matriz-potencias-explorador");
  });

  it("grafo-caminos-explorador: A² del grafo del libro y cambio de aristas", () => {
    show("grafo-caminos-explorador", [2, 0, 2]);
    expect(screen.getByTestId("tool-gc-caminos")).toHaveTextContent("1");
    expect(screen.getByTestId("tool-gc-total")).toHaveTextContent("2");
    fireEvent.click(screen.getByRole("button", { name: "Arista C→D: 0" }));
    fireEvent.click(screen.getByRole("button", { name: "Arista B→C: 1" }));
    expect(screen.getByTestId("tool-gc-caminos")).toHaveTextContent("0");
    show("grafo-caminos-explorador", [99, -4, 99]);
    show("grafo-caminos-explorador");
  });

  it("matriz-conmuta-explorador: AB ≠ BA y matrices que conmutan", () => {
    show("matriz-conmuta-explorador", [1, 2, 0, 1, 0, 1, 1, 0]);
    expect(screen.getByTestId("tool-mc-estado")).toHaveTextContent("No");
    fireEvent.change(screen.getByLabelText("B11"), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText("B12"), { target: { value: "5" } });
    fireEvent.change(screen.getByLabelText("B21"), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText("B22"), { target: { value: "3" } });
    expect(screen.getByTestId("tool-mc-estado")).toHaveTextContent("Sí, conmutan");
    show("matriz-conmuta-explorador", [Number.NaN, 99]);
  });

  it("ecuacion-matricial-explorador: X = A⁻¹B, X = BA⁻¹ y A singular", () => {
    show("ecuacion-matricial-explorador", [0, 2, -1, 1, 1, 4, 2, 0, -2]);
    expect(screen.getByTestId("tool-em-x")).toHaveTextContent("4/3");
    expect(screen.getByTestId("tool-em-check")).toHaveTextContent("✓");
    fireEvent.click(screen.getByRole("button", { name: "X · A = B" }));
    expect(screen.getByTestId("tool-em-formula")).toHaveTextContent("B · A⁻¹");
    expect(screen.getByTestId("tool-em-check")).toHaveTextContent("X · A = B ✓");
    fireEvent.change(screen.getByLabelText("A11"), { target: { value: "0" } });
    fireEvent.change(screen.getByLabelText("A12"), { target: { value: "0" } });
    expect(screen.getByTestId("tool-em-singular")).toBeInTheDocument();
    show("ecuacion-matricial-explorador");
  });
});
