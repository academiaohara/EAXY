import { describe, expect, it } from "vitest";
import { getStepTutorMessage } from "@/lib/lesson/tutor-message";
import type { LessonStep } from "@/lib/lesson/types";

describe("getStepTutorMessage", () => {
  it("usa la pista en preguntas cuando existe", () => {
    const step: LessonStep = {
      id: "q1",
      type: "multiple_choice",
      title: "Pregunta",
      question: "¿Cuánto es 2+2?",
      hint: "Suma los números",
      options: [],
      correctOptionId: "a",
    };
    expect(getStepTutorMessage(step)).toBe("Suma los números");
  });

  it("usa el título en pasos de concepto", () => {
    const step: LessonStep = {
      id: "c1",
      type: "concept",
      title: "Introducción",
    };
    expect(getStepTutorMessage(step)).toBe("Introducción");
  });
});
