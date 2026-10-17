import { describe, expect, it } from "vitest";
import { minEgyptianSymbolCount } from "@/components/lesson/tools/naturales-numeracion/EgyptianNumeralIcon";
import { intToRoman, romanToInt } from "@/components/lesson/tools/naturales-numeracion/roman";
import { predictChoiceCardState } from "@/components/lesson/steps/predict-step-ui";
import { sistemasHistoriaChallengeStatus } from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-shared";

describe("sistemasHistoriaChallengeStatus", () => {
  it("distingue acierto, pasarse del objetivo y progreso", () => {
    expect(sistemasHistoriaChallengeStatus(9, 9)).toBe("success");
    expect(sistemasHistoriaChallengeStatus(10, 9)).toBe("over");
    expect(sistemasHistoriaChallengeStatus(4, 9)).toBe("idle");
  });
});

describe("reto de tres sistemas (24)", () => {
  it("la escritura romana canónica usa restas y vuelve al mismo valor", () => {
    expect(intToRoman(24)).toBe("XXIV");
    expect(intToRoman(1994)).toBe("MCMXCIV");
    for (const n of [4, 9, 14, 24, 40, 90, 400, 1280]) {
      expect(romanToInt(intToRoman(n))).toBe(n);
    }
  });

  it("el mínimo de símbolos egipcios para 24 es 6", () => {
    expect(minEgyptianSymbolCount(24)).toBe(6);
    expect(minEgyptianSymbolCount(1435)).toBe(1 + 4 + 3 + 5);
  });
});

describe("predictChoiceCardState", () => {
  it("antes de comprobar solo distingue la seleccionada", () => {
    expect(predictChoiceCardState({ selected: true, checked: false, isCorrectOption: true, answerCorrect: false })).toBe("selected");
    expect(predictChoiceCardState({ selected: false, checked: false, isCorrectOption: false, answerCorrect: false })).toBe("idle");
  });

  it("tras fallar marca la elegida y revela la correcta", () => {
    expect(predictChoiceCardState({ selected: true, checked: true, isCorrectOption: false, answerCorrect: false })).toBe("wrong");
    expect(predictChoiceCardState({ selected: false, checked: true, isCorrectOption: true, answerCorrect: false })).toBe("correct");
    expect(predictChoiceCardState({ selected: false, checked: true, isCorrectOption: false, answerCorrect: false })).toBe("dimmed");
  });

  it("tras acertar solo destaca la elegida", () => {
    expect(predictChoiceCardState({ selected: true, checked: true, isCorrectOption: true, answerCorrect: true })).toBe("correct");
    expect(predictChoiceCardState({ selected: false, checked: true, isCorrectOption: false, answerCorrect: true })).toBe("dimmed");
  });
});
