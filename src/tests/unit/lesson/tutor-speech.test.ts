import { describe, expect, it } from "vitest";
import {
  flattenTutorSpeech,
  splitTutorSpeech,
  tutorSpeechDuration,
  TUTOR_SPEECH_MAX_MS,
  TUTOR_SPEECH_MIN_MS,
} from "@/lib/lesson/tutor-speech";

describe("splitTutorSpeech", () => {
  it("dice una frase cada vez", () => {
    expect(splitTutorSpeech("¡Muy bien! Lo has clavado.")).toEqual([
      "¡Muy bien!",
      "Lo has clavado.",
    ]);
  });

  it("no corta las matemáticas aunque lleven puntos", () => {
    expect(splitTutorSpeech("Sustituye $x = 1.5$ en la ecuación.")).toEqual([
      "Sustituye $x = 1.5$ en la ecuación.",
    ]);
  });

  it("mantiene el mensaje entero cuando no hay puntuación final", () => {
    expect(splitTutorSpeech("Elige la opción correcta")).toEqual(["Elige la opción correcta"]);
  });

  it("junta los fragmentos que no se sostienen solos", () => {
    expect(splitTutorSpeech("Vale. Ahora mira la segunda ecuación.")).toEqual([
      "Vale. Ahora mira la segunda ecuación.",
    ]);
  });

  it("ignora los espacios de sobra", () => {
    expect(splitTutorSpeech("  Primero esto.   Después lo otro.  ")).toEqual([
      "Primero esto.",
      "Después lo otro.",
    ]);
  });

  it("no devuelve frases vacías cuando no hay mensaje", () => {
    expect(splitTutorSpeech("")).toEqual([]);
  });
});

describe("flattenTutorSpeech", () => {
  it("encadena las frases de varios bloques del paso", () => {
    expect(flattenTutorSpeech(["Hola.", "Adiós."])).toEqual(["Hola.", "Adiós."]);
  });
});

describe("tutorSpeechDuration", () => {
  it("deja tiempo de lectura a las frases cortas", () => {
    expect(tutorSpeechDuration("Vamos.")).toBe(TUTOR_SPEECH_MIN_MS);
  });

  it("no eterniza las frases largas", () => {
    expect(tutorSpeechDuration("palabra ".repeat(60))).toBe(TUTOR_SPEECH_MAX_MS);
  });

  it("da más tiempo a la frase más larga", () => {
    expect(tutorSpeechDuration("Mira la segunda ecuación del sistema")).toBeGreaterThan(
      tutorSpeechDuration("Mira la segunda"),
    );
  });
});
