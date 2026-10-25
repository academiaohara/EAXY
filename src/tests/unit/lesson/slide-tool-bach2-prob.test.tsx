import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de probabilidad (2.º Bachillerato)", () => {
  it("distribucion-discreta-explorador: media y varianza del juego", () => {
    const a = show("distribucion-discreta-explorador", [3, 1, 1]);
    expect(screen.getByTestId("tool-dd-media")).toHaveTextContent("0,5");
    expect(screen.getByTestId("tool-dd-var")).toHaveTextContent("0,75");
    expect(screen.getByTestId("tool-dd-sigma")).toHaveTextContent("0,866");
    a.unmount();
    show("distribucion-discreta-explorador", [2, 2, 3]);
    expect(screen.getByTestId("tool-dd-media")).toHaveTextContent("−1");
    expect(screen.getByTestId("tool-dd-var")).toHaveTextContent("2");
    show("distribucion-discreta-explorador", [Number.NaN, 99, -4]);
    show("distribucion-discreta-explorador");
  });

  it("chebychev-explorador: exacta frente a la cota", () => {
    const a = show("chebychev-explorador", [20]);
    expect(screen.getByTestId("tool-ch-exacta")).toHaveTextContent("0,9586");
    expect(screen.getByTestId("tool-ch-cota")).toHaveTextContent("0,75");
    a.unmount();
    show("chebychev-explorador", [30]);
    expect(screen.getByTestId("tool-ch-exacta")).toHaveTextContent("0,9974");
    expect(screen.getByTestId("tool-ch-cota")).toHaveTextContent("0,8889");
    show("chebychev-explorador", [Number.NaN]);
    show("chebychev-explorador");
  });

  it("densidad-explorador: área bajo f(x) = x/50", () => {
    const a = show("densidad-explorador", [2, 6]);
    expect(screen.getByTestId("tool-de-prob")).toHaveTextContent("0,32");
    expect(screen.getByTestId("tool-de-media")).toHaveTextContent("6,6667");
    a.unmount();
    const b = show("densidad-explorador", [6, 2]);
    expect(screen.getByTestId("tool-de-prob")).toHaveTextContent("0,32");
    b.unmount();
    show("densidad-explorador", [0, 10]);
    expect(screen.getByTestId("tool-de-prob")).toHaveTextContent("1");
    show("densidad-explorador", [Number.NaN, 99]);
    show("densidad-explorador");
  });

  it("intervalo-media-explorador: x̄ ± z·σ/√n", () => {
    const a = show("intervalo-media-explorador", [100, 15, 7, 1]);
    expect(screen.getByTestId("tool-im-error")).toHaveTextContent("2,94");
    expect(screen.getByTestId("tool-im-ic")).toHaveTextContent("(97,06; 102,94)");
    a.unmount();
    for (let z = 0; z < 3; z++) show("intervalo-media-explorador", [0, 30, 0, z]).unmount();
    show("intervalo-media-explorador", [Number.NaN, 99, -1, 7]);
    show("intervalo-media-explorador");
  });
});
