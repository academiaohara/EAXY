import type { FeedbackStatus, LessonStep } from "@/lib/lesson/types";

export type HelpOption = {
  id: string;
  label: string;
  /** Nodo al que lleva la opción; `null` cierra la ayuda. */
  next: string | null;
};

export type HelpNode = {
  id: string;
  /** Lo que dice el tutor al llegar a este nodo. */
  message: string;
  /** Párrafos de apoyo. */
  detail?: string[];
  /** Bloques de matemáticas en modo display. */
  math?: string[];
  options: HelpOption[];
};

export type HelpRoute = {
  rootId: string;
  nodes: HelpNode[];
};

export const HELP_ROOT_ID = "root";
export const HELP_STUCK_ID = "stuck";

/** Una cosa concreta que el alumno puede no estar entendiendo. */
type HelpTopic = {
  id: string;
  /** Texto del botón que el alumno pulsa en la raíz. */
  label: string;
  message: string;
  detail?: string[];
  math?: string[];
};

function stepQuestion(step: LessonStep): string | undefined {
  return step.type === "multiple_choice" || step.type === "fill_in_blank" ? step.question : undefined;
}

function stepHint(step: LessonStep): string | undefined {
  return step.type === "multiple_choice" || step.type === "fill_in_blank" ? step.hint : undefined;
}

function stepExplanation(step: LessonStep): string | undefined {
  return step.type === "multiple_choice" || step.type === "fill_in_blank"
    ? step.explanation
    : undefined;
}

/**
 * Las opciones se ordenan de menos a más ayuda: al pulsar "sigo sin verlo" el
 * tutor pasa al siguiente tema, de forma que insistir acaba llevando a la
 * solución en lugar de repetir lo mismo.
 */
function helpTopics(step: LessonStep, feedback: FeedbackStatus | null): HelpTopic[] {
  const topics: HelpTopic[] = [];
  const question = stepQuestion(step);
  const hint = stepHint(step);
  const explanation = stepExplanation(step);

  if (question) {
    topics.push({
      id: "restate",
      label: "No entiendo qué me piden",
      message: "Te lo replanteo:",
      detail: [question],
    });
  }

  if (hint) {
    topics.push({
      id: "hint",
      label: "No sé por dónde empezar",
      message: "Empieza por aquí:",
      detail: [hint],
    });
  }

  if (step.content?.length || step.math?.length) {
    topics.push({
      id: "theory",
      label: "Repásame la teoría",
      message: "Esto es lo que necesitas tener a mano:",
      detail: step.content,
      math: step.math,
    });
  }

  if (step.type === "animated_solution") {
    topics.push({
      id: "steps",
      label: "Repásame los pasos",
      message: "Los pasos, uno a uno:",
      detail: step.frames.map((frame) => frame.caption).filter((caption): caption is string =>
        Boolean(caption),
      ),
      math: step.frames.map((frame) => frame.math),
    });
  }

  if (step.warning) {
    topics.push({
      id: "warning",
      label: "¿Dónde se suele fallar?",
      message: "Ojo con esto:",
      detail: [step.warning],
    });
  }

  // La solución sólo después de responder: antes sería saltarse el ejercicio.
  if (explanation && feedback !== null) {
    topics.push({
      id: "why",
      label: feedback === "incorrect" ? "No entiendo por qué está mal" : "¿Por qué es esta?",
      message: "Mira:",
      detail: [explanation],
    });
  }

  return topics;
}

function rootMessage(step: LessonStep, feedback: FeedbackStatus | null): string {
  if (feedback === "incorrect") {
    return "Vamos a verlo juntos. ¿Qué parte no te encaja?";
  }
  if (feedback === "correct") {
    return "¿Quieres que repasemos algo antes de seguir?";
  }
  return stepQuestion(step)
    ? "Dime qué te falta y lo vemos."
    : "Dime qué parte quieres que repasemos.";
}

/**
 * Construye la ruta de ayuda del paso: una raíz con lo que el alumno puede no
 * entender y, en cada explicación, la pregunta de si lo ha entendido ya.
 */
export function buildHelpRoute(step: LessonStep, feedback: FeedbackStatus | null): HelpRoute {
  const topics = helpTopics(step, feedback);

  const root: HelpNode = {
    id: HELP_ROOT_ID,
    message: rootMessage(step, feedback),
    options: [
      ...topics.map((topic) => ({ id: topic.id, label: topic.label, next: topic.id })),
      { id: "clear", label: "Ya lo tengo", next: null },
    ],
  };

  const topicNodes: HelpNode[] = topics.map((topic, index) => ({
    id: topic.id,
    message: topic.message,
    detail: topic.detail,
    math: topic.math,
    options: [
      { id: "got-it", label: "Ahora sí, sigo", next: null },
      {
        id: "more",
        label: "Sigo sin verlo",
        next: topics[index + 1]?.id ?? HELP_STUCK_ID,
      },
    ],
  }));

  const stuck: HelpNode = {
    id: HELP_STUCK_ID,
    message:
      "No pasa nada, esto se entiende mejor a la segunda. Repasa la teoría con calma y vuelve a intentarlo.",
    options: [
      { id: "restart", label: "Empezar la ayuda otra vez", next: HELP_ROOT_ID },
      { id: "close", label: "Seguir con la lección", next: null },
    ],
  };

  return { rootId: HELP_ROOT_ID, nodes: [root, ...topicNodes, stuck] };
}

export function getHelpNode(route: HelpRoute, nodeId: string): HelpNode | undefined {
  return route.nodes.find((node) => node.id === nodeId);
}

/** El paso ofrece algo más que "ya lo tengo". */
export function hasHelpTopics(route: HelpRoute): boolean {
  const root = getHelpNode(route, route.rootId);
  return (root?.options.filter((option) => option.next !== null).length ?? 0) > 0;
}
