import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de rectas y planos (2.º Bachillerato)", () => {
  it("recta-espacio-explorador: paramétricas y punto", () => {
    show("recta-espacio-explorador", [1, 1, 0, 2, 1, 2, 3]);
    expect(screen.getByTestId("tool-re-punto")).toHaveTextContent("(7, 4, 6)");
    expect(screen.getByTestId("tool-re-param")).toHaveTextContent("x = 1 + 2t");
    show("recta-espacio-explorador", [Number.NaN, 99]);
    show("recta-espacio-explorador");
  });
  it("plano-espacio-explorador: segmentario y puntos alineados", () => {
    show("plano-espacio-explorador", [1, 0, 0, 0, 2, 0, 0, 0, 3]);
    expect(screen.getByTestId("tool-pe-eq")).toHaveTextContent("6x + 3y + 2z − 6 = 0");
    show("plano-espacio-explorador", [0, 0, 0, 1, 1, 1, 2, 2, 2]);
    expect(screen.getAllByTestId("tool-pe-eq").at(-1)).toHaveTextContent("alineados");
    show("plano-espacio-explorador");
  });
  it("posicion-rectas-explorador: secantes con punto y se cruzan", () => {
    show("posicion-rectas-explorador", [0, 0, 1, 1, 1, 0, 2, 0, 1, -1, 1, 0]);
    expect(screen.getByTestId("tool-pr-tipo")).toHaveTextContent("Secantes");
    expect(screen.getByTestId("tool-pr-punto")).toHaveTextContent("(1, 1, 1)");
    fireEvent.change(screen.getByLabelText("Filas P, u, Q, v33"), { target: { value: "3" } });
    expect(screen.getByTestId("tool-pr-tipo")).toHaveTextContent("Se cruzan");
    show("posicion-rectas-explorador");
  });
  it("posicion-recta-plano-explorador: secante, contenida y paralela", () => {
    show("posicion-recta-plano-explorador", [1, 0, 0, 1, 1, 1, 1, 1, 1, -4]);
    expect(screen.getByTestId("tool-rp-tipo")).toHaveTextContent("Se cortan");
    expect(screen.getByTestId("tool-rp-detalle")).toHaveTextContent("(2, 1, 1)");
    show("posicion-recta-plano-explorador", [0, 0, 0, 1, -1, 0, 1, 1, 1, 0]);
    expect(screen.getAllByTestId("tool-rp-tipo").at(-1)).toHaveTextContent("contenida");
    show("posicion-recta-plano-explorador", [1, 0, 0, 1, -1, 0, 1, 1, 1, 0]);
    expect(screen.getAllByTestId("tool-rp-tipo").at(-1)).toHaveTextContent("paralelos");
    show("posicion-recta-plano-explorador");
  });
  it("posicion-planos-explorador: punto, recta y prisma", () => {
    const a = show("posicion-planos-explorador", [1, 0, 0, -1, 0, 1, 0, -2, 0, 0, 1, -3]);
    expect(screen.getByTestId("tool-pp-caso")).toHaveTextContent("un punto");
    a.unmount();
    const b = show("posicion-planos-explorador", [1, 1, 0, 0, 0, 1, 1, 0, 1, 0, -1, 0]);
    expect(screen.getByTestId("tool-pp-caso")).toHaveTextContent("recta");
    b.unmount();
    show("posicion-planos-explorador", [1, 1, 0, 0, 0, 1, 1, 0, 1, 2, 1, 1]);
    expect(screen.getByTestId("tool-pp-caso")).toHaveTextContent("prisma");
    show("posicion-planos-explorador");
  });
});
