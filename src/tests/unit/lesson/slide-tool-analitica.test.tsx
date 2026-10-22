import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { SlideTool } from "@/components/lesson/slide/SlideTool";

const slider = (label: RegExp | string) => screen.getByLabelText(label) as HTMLInputElement;

describe("vector-explorador", () => {
  it("A(1,4) B(6,6) → (5, 2)", () => {
    render(<SlideTool block={{ kind: "tool", tool: "vector-explorador", initial: [1, 4, 6, 6] }} />);
    expect(screen.getByTestId("tool-vec-coord")).toHaveTextContent("AB = (5, 2)");
    fireEvent.change(slider("x de B"), { target: { value: "1" } });
    expect(screen.getByTestId("tool-vec-coord")).toHaveTextContent("(0, 2)");
    expect(screen.getByTestId("tool-vec-sentido")).toHaveTextContent("hacia arriba");
  });
});

describe("vectores-operaciones-explorador", () => {
  it("2u + 3v con u(1,3) y v(2,−1) → (8, 3); u + v = (3, 2)", () => {
    render(<SlideTool block={{ kind: "tool", tool: "vectores-operaciones-explorador", initial: [1, 3, 2, -1, 2, 3] }} />);
    expect(screen.getByTestId("tool-vecop-resultado")).toHaveTextContent("(8, 3)");
    expect(screen.getByTestId("tool-vecop-basicas")).toHaveTextContent("u + v = (3, 2)");
    expect(screen.getByTestId("tool-vecop-basicas")).toHaveTextContent("u − v = (−1, 4)");
  });
});

describe("punto-medio-explorador", () => {
  it("A(−2,1), B(4,3): M(1,2) y d = √40", () => {
    render(<SlideTool block={{ kind: "tool", tool: "punto-medio-explorador", initial: [-2, 1, 4, 3] }} />);
    expect(screen.getByTestId("tool-pm-medio")).toHaveTextContent("(1, 2)");
    expect(screen.getByTestId("tool-pm-dist")).toHaveTextContent("6,32");
  });
});

describe("rectas-analitica-explorador", () => {
  it("recta por A(−3,−1) y B(3,3): m = 2/3; paralela y perpendicular por T(1,−3)", () => {
    render(<SlideTool block={{ kind: "tool", tool: "rectas-analitica-explorador", initial: [-3, -1, 3, 3, 1, -3] }} />);
    expect(screen.getByTestId("tool-rectas-r").textContent).toContain("3");
    expect(screen.getByTestId("tool-rectas-par")).toBeInTheDocument();
    expect(screen.getByTestId("tool-rectas-perp")).toBeInTheDocument();
  });
  it("A = B: sin recta", () => {
    render(<SlideTool block={{ kind: "tool", tool: "rectas-analitica-explorador", initial: [1, 1, 1, 1, 0, 0] }} />);
    expect(screen.getByTestId("tool-rectas-r")).toHaveTextContent("coinciden");
  });
});
