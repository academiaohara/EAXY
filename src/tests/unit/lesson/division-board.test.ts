import { describe, expect, it } from "vitest";
import { buildDivisionBoard } from "@/components/lesson/stage/modules/mul-div-naturales/division-board";

describe("buildDivisionBoard", () => {
  it("150 : 6 genera 9 pasos y cociente 25", () => {
    const board = buildDivisionBoard(150, 6)!;
    expect(board.steps).toHaveLength(9);
    const q = board.items.filter((i) => i.kind === "text" && i.id.startsWith("q"));
    expect(q.map((i) => (i as { char: string }).char).join("")).toBe("25");
  });

  it("32 : 6 tiene pasos cuantas, multiplica y resta para la práctica", () => {
    const board = buildDivisionBoard(32, 6)!;
    const phases = board.steps.map((s) => s.phase);
    expect(phases).toContain("cuantas");
    expect(phases).toContain("multiplica");
    expect(phases).toContain("resta");
  });
});
