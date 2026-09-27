import { describe, expect, it } from "vitest";
import {
  getFeedbackTutorMessage,
  getStepTutorMessage,
  getTutorMessage,
  getTutorReaction,
  tutorMoodForReaction,
} from "@/lib/lesson/tutor-message";
import type { LessonStep } from "@/lib/lesson/types";
import { tutorMoodForFeedback } from "@/lib/tutor/moods";

const quizStep: LessonStep = {
  id: "q1",
  type: "multiple_choice",
  title: "Pregunta",
  question: "¿Cuánto es 2+2?",
  hint: "Suma los números",
  options: [],
  correctOptionId: "a",
};

const conceptStep: LessonStep = {
  id: "c1",
  type: "concept",
  title: "Introducción",
};

describe("getStepTutorMessage", () => {
  it("usa la pista en preguntas cuando existe", () => {
    expect(getStepTutorMessage(quizStep)).toBe("Suma los números");
  });

  it("usa el título en pasos de concepto", () => {
    expect(getStepTutorMessage(conceptStep)).toBe("Introducción");
  });

  it("anima sin repetir el enunciado cuando la pregunta no tiene pista", () => {
    const message = getStepTutorMessage({ ...quizStep, hint: undefined });
    expect(message).not.toContain("2+2");
    expect(message).toMatch(/opción/i);
  });
});

describe("getFeedbackTutorMessage", () => {
  it("celebra la respuesta correcta", () => {
    expect(getFeedbackTutorMessage("correct")).toMatch(/bien/i);
  });

  it("acompaña sin castigar en la respuesta incorrecta", () => {
    expect(getFeedbackTutorMessage("incorrect")).toMatch(/casi/i);
  });
});

describe("getTutorMessage", () => {
  it("prioriza el feedback sobre el mensaje del paso", () => {
    expect(getTutorMessage(quizStep, "correct")).toBe(getFeedbackTutorMessage("correct"));
  });

  it("cae en el mensaje del paso sin feedback", () => {
    expect(getTutorMessage(quizStep, null)).toBe("Suma los números");
  });
});

describe("getTutorReaction", () => {
  it("reacciona al feedback recibido", () => {
    expect(getTutorReaction(quizStep, "correct")).toBe("correct");
    expect(getTutorReaction(quizStep, "incorrect")).toBe("incorrect");
  });

  it("piensa mientras el alumno responde una pregunta", () => {
    expect(getTutorReaction(quizStep, null)).toBe("thinking");
  });

  it("permanece neutral en pasos de teoría", () => {
    expect(getTutorReaction(conceptStep, null)).toBe("idle");
  });
});

describe("tutorMoodForReaction", () => {
  it("coincide con el ánimo que ya define el feedback", () => {
    expect(tutorMoodForReaction("correct")).toBe(tutorMoodForFeedback("correct"));
    expect(tutorMoodForReaction("incorrect")).toBe(tutorMoodForFeedback("incorrect"));
    expect(tutorMoodForReaction("idle")).toBe(tutorMoodForFeedback(null));
  });

  it("mantiene la mirada pensativa mientras el alumno responde", () => {
    expect(tutorMoodForReaction("thinking")).toBe("thinking");
  });
});
