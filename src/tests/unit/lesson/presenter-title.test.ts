import { describe, expect, it } from "vitest";
import { formatLessonStepTitle } from "@/lib/lesson/presenter-title";

describe("formatLessonStepTitle", () => {
  it("acentúa el texto tras « es »", () => {
    expect(formatLessonStepTitle("Multiplicar es repetir grupos")).toBe(
      'Multiplicar es <span class="lesson-step-title-accent">repetir grupos</span>',
    );
  });

  it("deja títulos sin « es » sin cambios", () => {
    expect(formatLessonStepTitle("Propiedad conmutativa")).toBe("Propiedad conmutativa");
  });

  it("no duplica el acento si ya está marcado", () => {
    const already =
      'Multiplicar es <span class="lesson-step-title-accent">repetir grupos</span>';
    expect(formatLessonStepTitle(already)).toBe(already);
  });
});
