import { describe, expect, it } from "vitest";
import { eqText, gauss3 } from "@/components/lesson/anim/gauss";

describe("gauss3", () => {
  it("compatible determinado: x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2", () => {
    const g = gauss3([[1, 1, 1, 6], [2, -1, 1, 3], [1, 2, -1, 2]]);
    expect(g.kind).toBe("determinado");
    expect(g.solution).toEqual([1, 2, 3]);
    expect(g.ops[0]![0]).toBe("E2 → E2 − 2·E1");
    expect(g.ops[0]![1]).toBe("E3 → E3 − E1");
    expect(g.steps[1]![1]![0]).toBe(0);
    expect(g.steps[2]![2]![0]).toBe(0);
    expect(g.steps[2]![2]![1]).toBe(0);
  });

  it("incompatible: las tres ecuaciones no se cortan", () => {
    expect(gauss3([[1, 2, 1, 3], [2, 1, 3, 1], [3, 3, 4, 5]]).kind).toBe("incompatible");
  });

  it("compatible indeterminado: una ecuación sale de las otras", () => {
    expect(gauss3([[1, 2, 3, 4], [1, 3, -1, -2], [2, 5, 2, 2]]).kind).toBe("indeterminado");
  });

  it("intercambia filas si a11 = 0", () => {
    const g = gauss3([[0, 1, 1, 3], [1, 0, 1, 2], [1, 1, 0, 1]]);
    expect(g.kind).toBe("determinado");
    expect(g.solution).toEqual([0, 1, 2]);
  });

  it("escribe las ecuaciones", () => {
    expect(eqText([1, -1, 2, -3])).toBe("x − y + 2z = −3");
    expect(eqText([0, 3, 0, 6])).toBe("3y = 6");
  });
});
