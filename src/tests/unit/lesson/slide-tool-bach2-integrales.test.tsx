import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de integrales (2.º Bachillerato)", () => {
  it("integral-polinomio-explorador: f y su primitiva", () => {
    const a = show("integral-polinomio-explorador", [3, 0, 1, 0]);
    expect(screen.getByTestId("tool-ip-f")).toHaveTextContent("3x² + 1");
    expect(screen.getByTestId("tool-ip-F")).toHaveTextContent("x³ + x");
    a.unmount();
    show("integral-polinomio-explorador", [1, 2, -3, 4]);
    expect(screen.getByTestId("tool-ip-F")).toHaveTextContent("(1/3)x³ + x² − 3x + 4");
    show("integral-polinomio-explorador", [0, 0, 0, 0]);
    show("integral-polinomio-explorador", [Number.NaN, 99, -99]);
    show("integral-polinomio-explorador");
  });

  it("riemann-explorador: suma frente a la integral exacta", () => {
    const a = show("riemann-explorador", [0, 6, 0]);
    expect(screen.getByTestId("tool-rm-suma")).toHaveTextContent("6,875");
    expect(screen.getByTestId("tool-rm-exacta")).toHaveTextContent("9 ≈ 9");
    a.unmount();
    const b = show("riemann-explorador", [1, 1, 2]);
    expect(screen.getByTestId("tool-rm-suma")).toHaveTextContent("3,1416");
    b.unmount();
    for (let i = 0; i < 4; i++) show("riemann-explorador", [i, 60, 1]).unmount();
    show("riemann-explorador", [Number.NaN, 999, -3]);
    show("riemann-explorador");
  });

  it("barrow-explorador: integral con signo y área geométrica", () => {
    const a = show("barrow-explorador", [-3, 3]);
    expect(screen.getByTestId("tool-bw-integral")).toHaveTextContent("−6");
    expect(screen.getByTestId("tool-bw-area")).toHaveTextContent("15,333");
    a.unmount();
    const b = show("barrow-explorador", [2, 2]);
    expect(screen.getByTestId("tool-bw-integral")).toHaveTextContent("0");
    b.unmount();
    show("barrow-explorador", [3, -3]);
    show("barrow-explorador", [Number.NaN, 99]);
    show("barrow-explorador");
  });

  it("area-curvas-explorador: m³/6", () => {
    const a = show("area-curvas-explorador", [2]);
    expect(screen.getByTestId("tool-ac-area")).toHaveTextContent("4/3");
    a.unmount();
    show("area-curvas-explorador", [3]);
    expect(screen.getByTestId("tool-ac-area")).toHaveTextContent("9/2");
    expect(screen.getByTestId("tool-ac-dec")).toHaveTextContent("4,5");
    show("area-curvas-explorador", [Number.NaN]);
    show("area-curvas-explorador");
  });

  it("volumen-revolucion-explorador: cono, paraboloide y esfera", () => {
    const a = show("volumen-revolucion-explorador", [1, 4]);
    expect(screen.getByTestId("tool-vr-volumen")).toHaveTextContent("8·π");
    expect(screen.getByTestId("tool-vr-dec")).toHaveTextContent("25,13");
    a.unmount();
    const b = show("volumen-revolucion-explorador", [0, 3]);
    expect(screen.getByTestId("tool-vr-volumen")).toHaveTextContent("9·π");
    b.unmount();
    show("volumen-revolucion-explorador", [2, 3]);
    expect(screen.getByTestId("tool-vr-volumen")).toHaveTextContent("36·π");
    show("volumen-revolucion-explorador", [Number.NaN, 99]);
    show("volumen-revolucion-explorador");
  });

  it("integral-metodos-explorador: pasos y comprobación F' = f", () => {
    const a = show("integral-metodos-explorador", [0, 3]);
    expect(screen.getByTestId("tool-im-pasos").children).toHaveLength(3);
    expect(screen.getByTestId("tool-im-F")).toHaveTextContent("x⁶/6 + C");
    expect(screen.getByTestId("tool-im-f")).toHaveTextContent("1");
    expect(screen.getByTestId("tool-im-dF")).toHaveTextContent("1");
    a.unmount();
    const b = show("integral-metodos-explorador", [7, 1]);
    expect(screen.getByTestId("tool-im-pasos").children).toHaveLength(1);
    expect(screen.getByTestId("tool-im-F")).toHaveTextContent("…");
    b.unmount();
    for (let i = 0; i < 9; i++) {
      const c = show("integral-metodos-explorador", [i, 3]);
      expect(screen.getByTestId("tool-im-f").textContent).toBe(screen.getByTestId("tool-im-dF").textContent);
      c.unmount();
    }
    show("integral-metodos-explorador", [Number.NaN, 99]);
    show("integral-metodos-explorador");
  });
});
