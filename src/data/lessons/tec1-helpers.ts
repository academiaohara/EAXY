import type { HelpBranch, LessonStep, SlideBlock, SlideStep, VisualTone } from "@/lib/lesson/types";

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
  return { id, type: "slide", title, blocks, ...(visual ? { visual } : {}), ...(arrange ? { arrange } : {}), help: help ?? ayudaDiapositiva(title, blocks, visual) };
}

/** Primera frase con contenido de la diapositiva (definición, regla o texto), sin marcas de formato. */
function primeraIdea(blocks: SlideBlock[]): string {
  for (const b of blocks) {
    const t = b.kind === "definition" || b.kind === "text" ? b.text : b.kind === "rule" ? (b.text ?? "") : b.kind === "steps" ? (b.items[0] ?? "") : b.kind === "compare" ? `${b.left.title} frente a ${b.right.title}` : "";
    const limpio = t.replace(/\*\*/g, "").replace(/`/g, "").trim();
    if (limpio) {
      const punto = limpio.search(/[.:](\s|$)/);
      return (punto > 20 ? limpio.slice(0, punto + 1) : limpio).slice(0, 220);
    }
  }
  return "";
}

function ayudaDiapositiva(title: string, blocks: SlideBlock[], visual?: Visual): HelpBranch[] {
  const idea = primeraIdea(blocks);
  const out: HelpBranch[] = [{ label: "¿Qué debo retener?", message: `Idea clave de «${title}»: ${idea || "lee los bloques de arriba abajo, empezando por la definición o la regla."}` }];
  if (visual?.kind === "tool") out.push({ label: "¿Qué pruebo en la simulación?", message: "Cambia un solo control cada vez y observa qué resultados se mueven y cuáles no: así descubres la relación entre las magnitudes. Pulsa «Reiniciar» para volver al punto de partida." });
  if (visual?.kind === "anim") out.push({ label: "¿Cómo veo la animación?", message: "Puedes pausarla, avanzar o retroceder paso a paso. Lee el texto de cada paso antes de pasar al siguiente: dice qué cambia en el dibujo." });
  return out;
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
    help: [
      { label: "¿Cómo descarto opciones?", message: hint ?? "Pregúntate qué tendría que ser cierto para que cada opción lo fuera y descarta las que contradigan lo visto en la lección." },
      { label: "No sé por dónde empezar", message: "Vuelve a la diapositiva anterior y localiza la definición o la regla que se relaciona con la pregunta: la respuesta correcta suele ser la que la aplica sin añadir suposiciones." },
    ],
  };
}

/** Pregunta numérica (respuestas aceptadas ya escritas con coma y con punto). */
export function calc(id: string, title: string, question: string, correctAnswers: string[], explanation: string, hint?: string): LessonStep {
  return {
    id,
    type: "predict",
    mode: "numeric",
    calculator: true,
    title,
    question,
    correctAnswers,
    explanation,
    ...(hint ? { hint } : {}),
    help: [
      { label: "¿Qué fórmula uso?", message: hint ?? "Identifica qué datos te dan y qué te piden, y busca en la diapositiva anterior la relación que los une." },
      { label: "Unidades y orden de magnitud", message: "Pasa los datos a unidades coherentes (SI) antes de operar y comprueba al final que el resultado tiene sentido: su unidad y su orden de magnitud." },
    ],
  };
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
    help: [{ label: "¿Cómo clasifico?", message: hint ?? "Piensa qué característica define a cada grupo y comprueba si el elemento la cumple; si dudas con uno, déjalo para el final." }],
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
