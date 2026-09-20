import { describe, expect, it } from "vitest";
import { intersectLines } from "@/lib/lesson/graph-math";

describe("intersectLines", () => {
  it("calcula el corte de x + 2y = 4 y x + y = 3 en (2, 1)", () => {
    const point = intersectLines(
      { id: "a", label: "a", form: "standard", a: 1, b: 2, c: 4 },
      { id: "b", label: "b", form: "standard", a: 1, b: 1, c: 3 },
    );
    expect(point).toEqual({ x: 2, y: 1 });
  });

  it("devuelve null para rectas paralelas", () => {
    const point = intersectLines(
      { id: "a", label: "a", form: "standard", a: 1, b: 2, c: 4 },
      { id: "b", label: "b", form: "standard", a: 2, b: 4, c: 2 },
    );
    expect(point).toBeNull();
  });
});
