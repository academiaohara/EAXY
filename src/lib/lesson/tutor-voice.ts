/**
 * Voz de Bolín: locución en español con la Web Speech API. El texto de lección
 * trae negritas y fórmulas `$...$`; aquí se convierte a algo legible por TTS.
 */

export const TUTOR_VOICE_LANG = "es-ES";
export const TUTOR_VOICE_RATE = 0.96;

const VARIABLE_NAMES: Record<string, string> = {
  x: "equis",
  y: "ye",
  z: "zeta",
  n: "ene",
  a: "a",
  b: "be",
  c: "ce",
};

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

function pickSpanishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const spanish = voices.filter((voice) => voice.lang.toLowerCase().startsWith("es"));
  return (
    spanish.find((voice) => voice.localService) ??
    spanish.find((voice) => voice.lang.toLowerCase() === TUTOR_VOICE_LANG.toLowerCase()) ??
    spanish[0]
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

/** Arranca el motor de voz tras un gesto del usuario (políticas de autoplay). */
export function primeTutorVoice(): void {
  if (!isTutorVoiceSupported()) {
    return;
  }
  window.speechSynthesis.resume();
  void whenTutorVoicesReady();
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
        utterance.lang = TUTOR_VOICE_LANG;
        utterance.rate = TUTOR_VOICE_RATE;
        const voice = pickSpanishVoice(voices);
        if (voice) {
          utterance.voice = voice;
        }
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      }),
  );
}
