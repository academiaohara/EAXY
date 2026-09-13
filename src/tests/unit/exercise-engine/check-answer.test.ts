import { describe, expect, it } from "vitest";
import { checkAnswer } from "@/lib/exercise-engine/check-answer";

describe("checkAnswer", () => {
  it("valida multiple_choice correctamente", () => {
    const content = {
      question: "¿Cuál es x?",
      options: [
        { id: "a", text: "2" },
        { id: "b", text: "3" },
      ],
      correctOptionId: "b",
    };

    expect(
      checkAnswer("multiple_choice", content, { selectedOptionId: "b" }),
    ).toEqual({ correct: true, score: 1, correctAnswer: "b" });

    expect(
      checkAnswer("multiple_choice", content, { selectedOptionId: "a" }),
    ).toEqual({ correct: false, score: 0, correctAnswer: "b" });
  });

  it("valida numeric con tolerancia", () => {
    const content = {
      question: "¿Cuánto es pi aproximado?",
      correctAnswer: 3.14,
      tolerance: 0.01,
    };

    expect(checkAnswer("numeric", content, { value: 3.141 })).toEqual({
      correct: true,
      score: 1,
      correctAnswer: 3.14,
    });

    expect(checkAnswer("numeric", content, { value: 3.2 })).toEqual({
      correct: false,
      score: 0,
      correctAnswer: 3.14,
    });
  });

  it("valida numeric exacto sin tolerancia", () => {
    const content = {
      question: "x = ?",
      correctAnswer: 5,
    };

    expect(checkAnswer("numeric", content, { value: 5 })).toMatchObject({
      correct: true,
      score: 1,
    });
  });
});
