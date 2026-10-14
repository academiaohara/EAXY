import { describe, expect, it } from "vitest";
import { buildBracePath } from "@/components/lesson/stage/build-brace-path";

describe("buildBracePath", () => {
  it("genera un path cerrado para distintos largos", () => {
    for (const length of [48, 320, 520]) {
      const d = buildBracePath(length, 16, "horizontal");
      expect(d.startsWith("M ")).toBe(true);
      expect(d.endsWith(" Z")).toBe(true);
      const vertical = buildBracePath(length, 16, "vertical");
      expect(vertical).toBe(d);
    }
  });
});
