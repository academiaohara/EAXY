/**
 * El tutor «habla»: en vez de dejar un globo fijo, va soltando frases sueltas y
 * al terminar se queda sólo la bola. Aquí vive el troceado del mensaje y el
 * tiempo que se muestra cada frase.
 */

/** Tiempo mínimo en pantalla de una frase, aunque sea muy corta. */
export const TUTOR_SPEECH_MIN_MS = 1400;
/** Tiempo máximo: las frases largas no bloquean la lección. */
export const TUTOR_SPEECH_MAX_MS = 5200;
/** Ritmo de lectura aproximado (unas 220 palabras por minuto). */
export const TUTOR_SPEECH_MS_PER_CHAR = 52;

const SENTENCE_END = new Set([".", "!", "?", "…"]);
/** Por debajo de esto una frase no se sostiene sola y se junta con su vecina. */
const MIN_LINE_LENGTH = 6;

/**
 * Parte el mensaje en frases. Las matemáticas entre `$...$` nunca se cortan:
 * un punto dentro de una fórmula (como `1.5`) no termina la frase.
 */
export function splitTutorSpeech(message: string): string[] {
  const lines: string[] = [];
  let current = "";
  let inMath = false;

  for (let index = 0; index < message.length; index += 1) {
    const char = message[index];
    current += char;

    if (char === "$") {
      inMath = !inMath;
      continue;
    }

    if (inMath || !SENTENCE_END.has(char)) {
      continue;
    }

    const next = message[index + 1];
    if (next === undefined || next === " " || next === "\n") {
      lines.push(current.trim());
      current = "";
    }
  }

  if (current.trim().length > 0) {
    lines.push(current.trim());
  }

  return mergeShortLines(lines).filter((line) => line.length > 0);
}

/** Une los fragmentos demasiado cortos para que el tutor no tartamudee. */
function mergeShortLines(lines: string[]): string[] {
  const merged: string[] = [];

  for (const line of lines) {
    const previous = merged.at(-1);
    const previousIsShort = previous !== undefined && previous.length < MIN_LINE_LENGTH;

    if (previous !== undefined && (previousIsShort || line.length < MIN_LINE_LENGTH)) {
      merged[merged.length - 1] = `${previous} ${line}`;
      continue;
    }

    merged.push(line);
  }

  return merged;
}

/** Convierte varios mensajes del tutor en la secuencia de frases que se leen. */
export function flattenTutorSpeech(messages: readonly string[]): string[] {
  return messages.flatMap((message) => splitTutorSpeech(message));
}

/** Cuánto tiempo deja el tutor una frase en pantalla. */
export function tutorSpeechDuration(line: string): number {
  const estimated = line.length * TUTOR_SPEECH_MS_PER_CHAR;
  return Math.min(TUTOR_SPEECH_MAX_MS, Math.max(TUTOR_SPEECH_MIN_MS, estimated));
}
