// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SlideBench } from "@/components/lesson/bench/SlideBench";
import { SlideBlockView } from "@/components/lesson/slide/SlideBlocks";

afterEach(cleanup);

describe("mesa de dibujo · escenas", () => {
  it("catálogo: cada instrumento se puede elegir y explica para qué sirve", () => {
    render(<SlideBench block={{ kind: "bench", scene: "instrumentos-catalogo" }} />);
    for (const id of ["regla", "escuadra", "cartabon", "transportador", "compas", "lapiz"]) {
      fireEvent.click(screen.getByTestId(`bench-item-${id}`));
      expect(screen.getByTestId(`bench-item-${id}`).getAttribute("aria-pressed")).toBe("true");
      expect(screen.getByTestId("bench-item-info").textContent?.length).toBeGreaterThan(30);
    }
  });

  it("catálogo: la abertura del compás cambia el radio", () => {
    render(<SlideBench block={{ kind: "bench", scene: "instrumentos-catalogo" }} />);
    const antes = screen.getByTestId("bench-radio").textContent;
    fireEvent.change(screen.getByLabelText("Abertura del compás"), { target: { value: "70" } });
    expect(screen.getByTestId("bench-radio").textContent).not.toBe(antes);
  });

  it("paralelas: no se puede trazar hasta que el borde pasa por P; después sí", () => {
    for (const a of [-10, 0, 12, 30]) {
      render(<SlideBench block={{ kind: "bench", scene: "paralelas-escuadra-cartabon", params: { a, b: 70 } }} />);
      const trazar = screen.getByTestId("bench-trazar") as HTMLButtonElement;
      expect(trazar.disabled).toBe(true);
      fireEvent.change(screen.getByLabelText("Desliza la escuadra"), { target: { value: "99" } });
      expect(trazar.disabled).toBe(false);
      fireEvent.click(trazar);
      expect(screen.getByTestId("bench-trazo")).toBeTruthy();
      cleanup();
    }
  });

  it("paralelas: mover la escuadra después de trazar no deja una paralela falsa", () => {
    render(<SlideBench block={{ kind: "bench", scene: "paralelas-escuadra-cartabon" }} />);
    fireEvent.change(screen.getByLabelText("Desliza la escuadra"), { target: { value: "99" } });
    fireEvent.click(screen.getByTestId("bench-trazar"));
    fireEvent.change(screen.getByLabelText("Desliza la escuadra"), { target: { value: "20" } });
    expect(screen.queryByTestId("bench-trazo")).toBeNull();
  });

  it("se monta desde una diapositiva (SlideBlockView)", () => {
    render(<SlideBlockView block={{ kind: "bench", scene: "instrumentos-catalogo" }} />);
    expect(screen.getByTestId("bench-catalogo")).toBeTruthy();
  });
});
