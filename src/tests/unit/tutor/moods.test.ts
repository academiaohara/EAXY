import { describe, expect, it } from "vitest";
import {
  TUTOR_MOODS,
  getTutorExpression,
  tutorExpressions,
  tutorMoodForFeedback,
} from "@/lib/tutor/moods";

describe("tutorExpressions", () => {
  it("define una expresión completa para cada estado", () => {
    expect(Object.keys(tutorExpressions).sort()).toEqual(
      [...TUTOR_MOODS].sort(),
    );

    for (const mood of TUTOR_MOODS) {
      const expression = getTutorExpression(mood);

      expect(expression.label.length).toBeGreaterThan(0);
      expect(expression.eyeScaleY).toBeGreaterThan(0);
      expect(expression.pupilScale).toBeGreaterThan(0);
      expect(expression.browOpacity).toBeGreaterThan(0);
      expect(expression.browOpacity).toBeLessThanOrEqual(1);
    }
  });

  it("mira hacia abajo cuando está animando y hacia arriba al pensar", () => {
    expect(getTutorExpression("sad").pupilOffset.y).toBeGreaterThan(0);
    expect(getTutorExpression("thinking").pupilOffset.y).toBeLessThan(0);
  });

  it("no parpadea cuando está sorprendido", () => {
    expect(getTutorExpression("surprised").blink).toBe(false);
    expect(getTutorExpression("idle").blink).toBe(true);
  });
});

describe("tutorMoodForFeedback", () => {
  it("celebra los aciertos y anima tras los fallos", () => {
    expect(tutorMoodForFeedback("correct")).toBe("celebrate");
    expect(tutorMoodForFeedback("incorrect")).toBe("sad");
  });

  it("vuelve al estado tranquilo sin feedback", () => {
    expect(tutorMoodForFeedback(null)).toBe("idle");
    expect(tutorMoodForFeedback(undefined)).toBe("idle");
  });
});
