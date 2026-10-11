import { describe, expect, it } from "vitest";
import { resolveSlideDotVariant } from "@/components/lesson/lesson-slides-sidebar";

describe("resolveSlideDotVariant", () => {
  const visited = [true, false, false, false, false, false, false, true];
  const completed = [true, false, false, false, false, false, false, false];

  it("marca verde solo pasos visitados o completados, no los intermedios al saltar al final", () => {
    expect(resolveSlideDotVariant(0, 7, 7, visited, completed)).toBe("done");
    expect(resolveSlideDotVariant(1, 7, 7, visited, completed)).toBe("pending");
    expect(resolveSlideDotVariant(7, 7, 7, visited, completed)).toBe("current");
  });

  it("al volver al primero conserva verde en pasos ya visitados o completados", () => {
    expect(resolveSlideDotVariant(0, 0, 7, visited, completed)).toBe("current");
    expect(resolveSlideDotVariant(7, 0, 7, visited, completed)).toBe("done");
    expect(resolveSlideDotVariant(3, 0, 7, visited, completed)).toBe("pending");
  });

  it("bloquea pasos más allá del máximo alcanzado", () => {
    expect(resolveSlideDotVariant(4, 0, 2, visited, completed)).toBe("pending-locked");
  });
});
