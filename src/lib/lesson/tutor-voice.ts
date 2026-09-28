/**
 * Voz de Bolín: locución en español con la Web Speech API. El texto de lección
 * trae negritas y fórmulas `$...$`; aquí se convierte a algo legible por TTS.
 * Suena como un personaje infantil: voz femenina, dulce y algo más aguda.
 */

export const TUTOR_VOICE_LANG = "es-ES";
/** Un poco más rápida, como una niña que explica con entusiasmo. */
export const TUTOR_VOICE_RATE = 1.08;
/** Tono más agudo; la Web Speech API no trae voces «de niño», lo simulamos con pitch. */
export const TUTOR_VOICE_PITCH = 1.32;

const VARIABLE_NAMES: Record<string, string> = {
  x: "equis",
  y: "ye",
  z: "zeta",
  n: "ene",
  a: "a",
  b: "be",
  c: "ce",
};

/** Pistas en el nombre de la voz del sistema para priorizar timbre femenino / infantil. */
const FEMININE_VOICE_HINTS = [
  "helena",
  "sabina",
  "monica",
  "mónica",
  "paulina",
  "laura",
  "isabel",
  "paloma",
  "lucia",
  "lucía",
  "sofia",
  "soledad",
  "elvira",
  "female",
  "mujer",
  "woman",
  "girl",
  "niña",
  "child",
  "infant",
] as const;

const MASCULINE_VOICE_HINTS = [
  "jorge",
  "carlos",
  "pablo",
  "diego",
  "male",
  "hombre",
  "man",
  "boy",
] as const;

let cachedCharacterVoice: SpeechSynthesisVoice | null | undefined;

/** Quita marcado y simplifica matemáticas inline para leerlas en voz alta. */
export function plainTextForTutorVoice(text: string): string {
  const withoutBold = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  const withMath = withoutBold.replace(/\$([^$]+)\$/g, (_match, inner: string) =>
    mathFragmentToSpeech(String(inner).trim()),
  );
  return withMath.replace(/\s+/g, " ").trim();
}

function mathFragmentToSpeech(latex: string): string {
  let spoken = latex
    .replace(/\\cdot/g, " por ")
    .replace(/\\times/g, " por ")
    .replace(/\\div/g, " dividido ")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1 entre $2 ")
    .replace(/\\sqrt\{([^}]+)\}/g, "raíz cuadrada de $1 ")
    .replace(/\^2/g, " al cuadrado")
    .replace(/\^3/g, " al cubo")
    .replace(/=/g, " igual a ")
    .replace(/\+/g, " más ")
    .replace(/-/g, " menos ")
    .replace(/\*/g, " por ");

  for (const [symbol, name] of Object.entries(VARIABLE_NAMES)) {
    const re = new RegExp(`\\b${symbol}\\b`, "gi");
    spoken = spoken.replace(re, name);
  }

  spoken = spoken.replace(/(\d),(\d)/g, "$1 coma $2");
  return spoken.trim();
}

export function isTutorVoiceSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Puntuación para elegir la voz más dulce y femenina disponible en español. */
export function scoreTutorCharacterVoice(voice: SpeechSynthesisVoice): number {
  if (!voice.lang.toLowerCase().startsWith("es")) {
    return -1000;
  }

  const label = `${voice.name} ${voice.voiceURI}`.toLowerCase();
  let score = 0;

  for (const hint of FEMININE_VOICE_HINTS) {
    if (label.includes(hint)) {
      score += 12;
    }
  }
  for (const hint of MASCULINE_VOICE_HINTS) {
    if (label.includes(hint)) {
      score -= 20;
    }
  }
  if (voice.localService) {
    score += 3;
  }
  if (voice.lang.toLowerCase() === TUTOR_VOICE_LANG.toLowerCase()) {
    score += 2;
  }

  return score;
}

/** Elige la voz de Bolín; la misma instancia se reutiliza en todas las frases. */
export function pickTutorCharacterVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined {
  const spanish = voices.filter((voice) => voice.lang.toLowerCase().startsWith("es"));
  if (spanish.length === 0) {
    return undefined;
  }

  return spanish.reduce((best, voice) =>
    scoreTutorCharacterVoice(voice) > scoreTutorCharacterVoice(best) ? voice : best,
  );
}

function voicesReady(): SpeechSynthesisVoice[] {
  if (!isTutorVoiceSupported()) {
    return [];
  }
  return window.speechSynthesis.getVoices();
}

/** Espera a que el navegador publique las voces (Chrome las carga tarde). */
export function whenTutorVoicesReady(): Promise<SpeechSynthesisVoice[]> {
  if (!isTutorVoiceSupported()) {
    return Promise.resolve([]);
  }

  const existing = voicesReady();
  if (existing.length > 0) {
    return Promise.resolve(existing);
  }

  return new Promise((resolve) => {
    const finish = () => {
      window.speechSynthesis.removeEventListener("voiceschanged", finish);
      resolve(voicesReady());
    };
    window.speechSynthesis.addEventListener("voiceschanged", finish);
    window.setTimeout(finish, 250);
  });
}

function resolveCharacterVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  if (cachedCharacterVoice !== undefined) {
    const stillAvailable =
      cachedCharacterVoice &&
      voices.some((voice) => voice.voiceURI === cachedCharacterVoice?.voiceURI);
    if (stillAvailable) {
      return cachedCharacterVoice ?? undefined;
    }
  }

  const picked = pickTutorCharacterVoice(voices);
  cachedCharacterVoice = picked ?? null;
  return picked;
}

/** Aplica la misma voz y tono infantil a cada locución. */
export function applyTutorVoiceSettings(
  utterance: SpeechSynthesisUtterance,
  voice: SpeechSynthesisVoice | undefined,
): void {
  utterance.lang = voice?.lang ?? TUTOR_VOICE_LANG;
  utterance.rate = TUTOR_VOICE_RATE;
  utterance.pitch = TUTOR_VOICE_PITCH;
  if (voice) {
    utterance.voice = voice;
  }
}

/** Arranca el motor de voz tras un gesto del usuario (políticas de autoplay). */
export function primeTutorVoice(): void {
  if (!isTutorVoiceSupported()) {
    return;
  }
  window.speechSynthesis.resume();
  void whenTutorVoicesReady().then((voices) => {
    resolveCharacterVoice(voices);
  });
}

export function stopTutorVoice(): void {
  if (!isTutorVoiceSupported()) {
    return;
  }
  window.speechSynthesis.cancel();
}

/** Lee una frase del tutor. Resuelve al terminar o si no hay soporte / texto. */
export function speakTutorVoice(text: string): Promise<void> {
  if (!isTutorVoiceSupported()) {
    return Promise.resolve();
  }

  const plain = plainTextForTutorVoice(text);
  if (!plain) {
    return Promise.resolve();
  }

  stopTutorVoice();

  return whenTutorVoicesReady().then(
    (voices) =>
      new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(plain);
        applyTutorVoiceSettings(utterance, resolveCharacterVoice(voices));
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      }),
  );
}

/** Solo tests: reinicia la voz en caché entre casos. */
export function resetTutorVoiceCacheForTests(): void {
  cachedCharacterVoice = undefined;
}
