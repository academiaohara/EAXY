import type { LessonStep, SlideBlock, SlideStep, VisualTone } from "@/lib/lesson/types";

type Visual = Extract<SlideBlock, { kind: "anim" | "figure" | "tool" }>;

/** Diapositiva de teoría (bloques de texto + visual opcional). */
export function slide(
  id: string,
  title: string,
  blocks: SlideBlock[],
  visual?: Visual,
  arrange?: SlideStep["arrange"],
  help?: SlideStep["help"],
): SlideStep {
  return { id, type: "slide", title, blocks, ...(visual ? { visual } : {}), ...(arrange ? { arrange } : {}), ...(help ? { help } : {}) };
}

export const anim = (scene: Extract<SlideBlock, { kind: "anim" }>["scene"], params?: Extract<SlideBlock, { kind: "anim" }>["params"], beatMs?: number): Visual => ({
  kind: "anim",
  scene,
  ...(params ? { params } : {}),
  ...(beatMs ? { beatMs } : {}),
});

export const tool = (
  id: Extract<SlideBlock, { kind: "tool" }>["tool"],
  params?: Extract<SlideBlock, { kind: "tool" }>["params"],
  hint?: string,
): Visual => ({ kind: "tool", tool: id, ...(params ? { params } : {}), ...(hint ? { hint } : {}) });

/** Pregunta de elección: la primera opción es la correcta; el resto, errores típicos con su explicación. */
export function pick(
  id: string,
  title: string,
  question: string,
  ok: string,
  wrong: [label: string, feedback: string][],
  explanation: string,
  hint?: string,
): LessonStep {
  return {
    id,
    type: "predict",
    mode: "choice",
    title,
    question,
    choices: [{ id: "ok", label: ok }, ...wrong.map(([label, incorrectFeedback], i) => ({ id: `w${i}`, label, incorrectFeedback }))],
    correctChoiceId: "ok",
    shuffleChoices: true,
    explanation,
    ...(hint ? { hint } : {}),
  };
}

/** Pregunta numérica (respuestas aceptadas ya escritas con coma y con punto). */
export function calc(id: string, title: string, question: string, correctAnswers: string[], explanation: string, hint?: string): LessonStep {
  return { id, type: "predict", mode: "numeric", calculator: true, title, question, correctAnswers, explanation, ...(hint ? { hint } : {}) };
}

/** Clasificar elementos en grupos. */
export function sort(
  id: string,
  title: string,
  question: string,
  groups: [id: string, label: string, tone?: VisualTone][],
  items: [text: string, group: string][],
  explanation: string,
  hint?: string,
): LessonStep {
  return {
    id,
    type: "classify",
    title,
    question,
    groups: groups.map(([gid, label, tone]) => ({ id: gid, label, ...(tone ? { tone } : {}) })),
    items: items.map(([text, group], i) => ({ id: `i${i}`, text, group })),
    explanation,
    ...(hint ? { hint } : {}),
  };
}

/** Respuestas numéricas aceptadas en ambas notaciones decimales. */
export function nums(...values: (number | string)[]): string[] {
  const out = new Set<string>();
  for (const v of values) {
    const s = String(v);
    out.add(s);
    out.add(s.replace(".", ","));
  }
  return [...out];
}
