import { afterEach, describe, expect, it } from "vitest";
import {
  applyTutorVoiceSettings,
  pickTutorCharacterVoice,
  plainTextForTutorVoice,
  resetTutorVoiceCacheForTests,
  scoreTutorCharacterVoice,
  TUTOR_VOICE_PITCH,
  TUTOR_VOICE_RATE,
} from "@/lib/lesson/tutor-voice";

function mockVoice(
  name: string,
  lang: string,
  options: Partial<SpeechSynthesisVoice> = {},
): SpeechSynthesisVoice {
  return {
    default: false,
    lang,
    localService: true,
    name,
    voiceURI: name,
    ...options,
  } as SpeechSynthesisVoice;
}

afterEach(() => {
  resetTutorVoiceCacheForTests();
});

describe("plainTextForTutorVoice", () => {
  it("quita las negritas", () => {
    expect(plainTextForTutorVoice("Mira la **solución** del sistema.")).toBe(
      "Mira la solución del sistema.",
    );
  });

  it("lee variables y números dentro de fórmulas inline", () => {
    expect(plainTextForTutorVoice("Sustituye $x = 1.5$ en la ecuación.")).toBe(
      "Sustituye equis igual a 1.5 en la ecuación.",
    );
  });

  it("deja el texto normal intacto", () => {
    expect(plainTextForTutorVoice("¡Muy bien! Lo has clavado.")).toBe(
      "¡Muy bien! Lo has clavado.",
    );
  });
});

describe("pickTutorCharacterVoice", () => {
  it("prefiere una voz femenina en español frente a una masculina", () => {
    const voices = [
      mockVoice("Google español", "es-ES"),
      mockVoice("Microsoft Helena Desktop", "es-ES"),
      mockVoice("Microsoft Pablo Desktop", "es-ES"),
    ];

    expect(pickTutorCharacterVoice(voices)?.name).toContain("Helena");
    expect(scoreTutorCharacterVoice(voices[1])).toBeGreaterThan(
      scoreTutorCharacterVoice(voices[2]),
    );
  });

  it("aplica pitch y rate infantiles en todas las locuciones", () => {
    const utterance = { lang: "", rate: 1, pitch: 1, voice: undefined as SpeechSynthesisVoice | undefined };
    applyTutorVoiceSettings(
      utterance as SpeechSynthesisUtterance,
      mockVoice("Microsoft Helena Desktop", "es-ES"),
    );

    expect(utterance.rate).toBe(TUTOR_VOICE_RATE);
    expect(utterance.pitch).toBe(TUTOR_VOICE_PITCH);
    expect(utterance.voice?.name).toContain("Helena");
  });
});
