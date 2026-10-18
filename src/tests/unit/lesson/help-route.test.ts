import { describe, expect, it } from "vitest";
import {
  buildHelpRoute,
  buildMessageHelpRoute,
  conceptNodeId,
  getHelpNode,
  hasHelpTopics,
  HELP_ROOT_ID,
  HELP_STUCK_ID,
} from "@/lib/lesson/help-route";
import { getConcept } from "@/lib/lesson/concept-glossary";
import type { LessonStep } from "@/lib/lesson/types";

const quizStep: LessonStep = {
  id: "q1",
  type: "fill_in_blank",
  title: "Pregunta",
  question: "¿Cuánto es $2+2$?",
  hint: "Suma los números",
  explanation: "Dos más dos son cuatro",
  content: ["Sumar es juntar cantidades."],
  correctAnswers: ["4"],
};

const conceptStep: LessonStep = {
  id: "c1",
  type: "concept",
  title: "Introducción",
  content: ["Una ecuación relaciona dos expresiones."],
  math: ["ax + by = c"],
};

const bareStep: LessonStep = {
  id: "b1",
  type: "interactive_tool",
  title: "Explora",
  tool: "system-graph",
  graph: { lines: [] },
};

function rootOptionIds(step: LessonStep, feedback: Parameters<typeof buildHelpRoute>[1]) {
  const route = buildHelpRoute(step, feedback);
  return getHelpNode(route, HELP_ROOT_ID)!.options.map((option) => option.id);
}

describe("buildHelpRoute", () => {
  it("ofrece una opción por cada cosa que el alumno puede no entender", () => {
    expect(rootOptionIds(quizStep, null)).toEqual(["restate", "hint", "theory", "clear"]);
  });

  it("cierra la ayuda con la opción de haberlo entendido", () => {
    const route = buildHelpRoute(quizStep, null);
    const clear = getHelpNode(route, HELP_ROOT_ID)!.options.at(-1);
    expect(clear).toMatchObject({ id: "clear", next: null });
  });

  it("no enseña la solución antes de responder", () => {
    expect(rootOptionIds(quizStep, null)).not.toContain("why");
  });

  it("explica el fallo sólo después de responder mal", () => {
    expect(rootOptionIds(quizStep, "incorrect")).toContain("why");
    expect(getHelpNode(buildHelpRoute(quizStep, "incorrect"), "why")?.detail).toEqual([
      "Dos más dos son cuatro",
    ]);
  });

  it("adapta la pregunta de la raíz al feedback recibido", () => {
    const withError = getHelpNode(buildHelpRoute(quizStep, "incorrect"), HELP_ROOT_ID)!.message;
    const withoutError = getHelpNode(buildHelpRoute(quizStep, null), HELP_ROOT_ID)!.message;
    expect(withError).not.toBe(withoutError);
  });

  it("lleva la teoría del paso a su propio nodo", () => {
    const theory = getHelpNode(buildHelpRoute(conceptStep, null), "theory");
    expect(theory).toMatchObject({
      detail: ["Una ecuación relaciona dos expresiones."],
      math: ["ax + by = c"],
    });
  });

  it("desglosa los pasos de una solución animada", () => {
    const animated: LessonStep = {
      id: "a1",
      type: "animated_solution",
      title: "Sustitución",
      frames: [
        { math: "x = 2", caption: "Despeja $x$" },
        { math: "y = 1" },
      ],
    };
    expect(getHelpNode(buildHelpRoute(animated, null), "steps")).toMatchObject({
      detail: ["Despeja $x$"],
      math: ["x = 2", "y = 1"],
    });
  });
});

describe("conceptos de la pregunta", () => {
  const conceptQuiz: LessonStep = {
    ...quizStep,
    id: "q2",
    question: "Despeja $x$ y comprueba la solución.",
  };

  it("ofrece explicar los conceptos que salen en la pregunta, tras los temas del paso", () => {
    expect(rootOptionIds(conceptQuiz, null)).toEqual([
      "restate",
      "hint",
      "theory",
      "concept-despejar",
      "concept-comprobar",
      "clear",
    ]);
  });

  it("no ofrece conceptos si la pregunta no los menciona", () => {
    expect(rootOptionIds(quizStep, null).some((id) => id.startsWith("concept-"))).toBe(false);
  });

  it("todas las opciones apuntan a un nodo que existe", () => {
    const route = buildHelpRoute(conceptQuiz, "incorrect");
    for (const node of route.nodes) {
      for (const option of node.options) {
        if (option.next !== null) {
          expect(getHelpNode(route, option.next), `${node.id} -> ${option.next}`).toBeDefined();
        }
      }
    }
  });

  it("el atasco tras fallar anima a volver a la teoría", () => {
    const stuck = getHelpNode(buildHelpRoute(conceptQuiz, "incorrect"), HELP_STUCK_ID)!;
    expect(stuck.message).toContain("equivocarse");
  });
});

describe("encadenado de explicaciones", () => {
  it("cada explicación pregunta si ya se ha entendido", () => {
    const route = buildHelpRoute(quizStep, null);
    expect(getHelpNode(route, "hint")!.options.map((option) => option.id)).toEqual([
      "got-it",
      "more",
    ]);
  });

  it("insistir lleva a la siguiente explicación, no repite la misma", () => {
    const route = buildHelpRoute(quizStep, null);
    const more = getHelpNode(route, "restate")!.options.find((option) => option.id === "more");
    expect(more?.next).toBe("hint");
  });

  it("agotadas las explicaciones, el tutor reconoce el atasco", () => {
    const route = buildHelpRoute(quizStep, null);
    const last = getHelpNode(route, "theory")!.options.find((option) => option.id === "more");
    expect(last?.next).toBe(HELP_STUCK_ID);
  });

  it("desde el atasco se puede volver a empezar la ayuda", () => {
    const route = buildHelpRoute(quizStep, null);
    const restart = getHelpNode(route, HELP_STUCK_ID)!.options.find(
      (option) => option.id === "restart",
    );
    expect(restart?.next).toBe(HELP_ROOT_ID);
  });

  it("todas las opciones apuntan a un nodo que existe", () => {
    const route = buildHelpRoute(quizStep, "incorrect");
    for (const node of route.nodes) {
      for (const option of node.options) {
        if (option.next !== null) {
          expect(getHelpNode(route, option.next), `${node.id} -> ${option.next}`).toBeDefined();
        }
      }
    }
  });
});

describe("hasHelpTopics", () => {
  it("es cierto cuando el paso tiene algo que explicar", () => {
    expect(hasHelpTopics(buildHelpRoute(conceptStep, null))).toBe(true);
  });

  it("es falso cuando el paso no aporta material de ayuda", () => {
    expect(hasHelpTopics(buildHelpRoute(bareStep, null))).toBe(false);
  });
});

describe("buildMessageHelpRoute", () => {
  function messageRootIds(text: string, step: LessonStep = bareStep) {
    const route = buildMessageHelpRoute(step, null, text);
    return getHelpNode(route, HELP_ROOT_ID)!.options.map((option) => option.id);
  }

  it("ofrece explicar los conceptos que salen en el mensaje", () => {
    expect(messageRootIds("Las rectas son paralelas → ninguna solución.")).toEqual([
      "concept-incompatible",
      "clear",
    ]);
  });

  it("añade después lo que el paso tiene para repasar", () => {
    expect(messageRootIds("Una **solución** hace cierta la igualdad.", conceptStep)).toEqual([
      "concept-solucion",
      "theory",
      "clear",
    ]);
  });

  it("limita los conceptos para no abrumar", () => {
    const ids = messageRootIds(
      "Despeja la incógnita, sustituye en el sistema y comprueba la solución.",
    );
    expect(ids.filter((id) => id.startsWith("concept-"))).toHaveLength(3);
  });

  it("cada concepto se puede ampliar con un ejemplo y volver atrás", () => {
    const route = buildMessageHelpRoute(bareStep, null, "Despeja $x$");
    const node = getHelpNode(route, conceptNodeId("despejar"))!;
    expect(node.options.map((option) => option.id)).toEqual(["got-it", "example", "other"]);
    expect(node.options.find((option) => option.id === "other")?.next).toBe(HELP_ROOT_ID);
  });

  it("lleva la ayuda visual del concepto a su nodo", () => {
    const route = buildMessageHelpRoute(bareStep, null, "Son paralelas");
    expect(getHelpNode(route, conceptNodeId("incompatible"))?.visual?.kind).toBe("graph-gallery");
  });

  it("incluye el concepto pulsado aunque no salga en el texto", () => {
    const route = buildMessageHelpRoute(bareStep, null, "hola", [getConcept("recta")!]);
    expect(getHelpNode(route, conceptNodeId("recta"))).toBeDefined();
  });

  it("sin nada que explicar sólo deja cerrar", () => {
    expect(messageRootIds("¡Muy bien!")).toEqual(["clear"]);
  });

  it("todas las opciones apuntan a un nodo que existe", () => {
    const route = buildMessageHelpRoute(
      quizStep,
      "incorrect",
      "Despeja la incógnita y comprueba el punto de corte",
    );
    for (const node of route.nodes) {
      for (const option of node.options) {
        if (option.next !== null) {
          expect(getHelpNode(route, option.next), `${node.id} -> ${option.next}`).toBeDefined();
        }
      }
    }
  });
});

describe("ayuda escrita a mano", () => {
  const authoredStep: LessonStep = {
    ...quizStep,
    id: "q3",
    help: [
      {
        label: "¿Qué operación hago?",
        message: "Piensa en juntar cantidades.",
        branches: [{ label: "¿Cómo lo coloco?", message: "En columna." }],
      },
      { label: "Quiero estimar", message: "Redondea primero." },
    ],
  };

  it("sustituye a repetir enunciado, pista y teoría", () => {
    expect(rootOptionIds(authoredStep, null)).toEqual(["branch-0", "branch-1", "clear"]);
  });

  it("abre ramas más concretas y encadena hermanas hasta el atasco", () => {
    const route = buildHelpRoute(authoredStep, null);
    const first = getHelpNode(route, "help:0")!;
    expect(first.options.map((option) => option.label)).toEqual([
      "¿Cómo lo coloco?",
      "Ahora sí, sigo",
      "Sigo sin verlo",
    ]);
    expect(getHelpNode(route, "help:0.0")!.message).toBe("En columna.");
    expect(first.options.at(-1)!.next).toBe("help:1");
    expect(getHelpNode(route, "help:1")!.options.at(-1)!.next).toBe(HELP_STUCK_ID);
  });

  it("todas las opciones apuntan a un nodo que existe", () => {
    for (const route of [
      buildHelpRoute(authoredStep, "incorrect"),
      buildMessageHelpRoute(authoredStep, null, "algo"),
    ]) {
      for (const node of route.nodes) {
        for (const option of node.options) {
          if (option.next !== null) expect(getHelpNode(route, option.next)).toBeDefined();
        }
      }
    }
  });

  it("sin ayuda propia, separa lo que se da de lo que se pide", () => {
    const step: LessonStep = {
      ...quizStep,
      question: "Compras pan por 1,20 €. ¿Cuánto pagas?",
    };
    const detail = getHelpNode(buildHelpRoute(step, null), "restate")!.detail!;
    expect(detail[0]).toContain("Lo que te dan");
    expect(detail[1]).toContain("Lo que te piden");
  });
});
