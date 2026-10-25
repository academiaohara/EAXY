import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const show = (tool: string, initial?: number[]) => render(<SlideTool block={{ kind: "tool", tool: tool as never, initial }} />);

describe("herramientas de análisis (2.º Bachillerato)", () => {
  it("uno-infinito-explorador: (1 + 1/n)^n y e^(a·b)", () => {
    show("uno-infinito-explorador", [1, 1, 6]);
    expect(screen.getByTestId("tool-ui-valor")).toHaveTextContent("2,71828");
    expect(screen.getByTestId("tool-ui-limite")).toHaveTextContent("2,71828");
    show("uno-infinito-explorador", [3, 2, 7]);
    expect(screen.getAllByTestId("tool-ui-limite").at(-1)).toHaveTextContent("403,42879");
    show("uno-infinito-explorador", [Number.NaN, 99, -4]);
    show("uno-infinito-explorador");
  });
});
