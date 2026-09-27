import { describe, expect, it } from "vitest";
import {
  buildHelpRoute,
  getHelpNode,
  hasHelpTopics,
  HELP_ROOT_ID,
  HELP_STUCK_ID,
} from "@/lib/lesson/help-route";
import type { LessonStep } from "@/lib/lesson/types";

const quizStep: LessonStep = {
  id: "q1",
  type: "multiple_choice",
  title: "Pregunta",
  question: "¿Cuánto es $2+2$?",
  hint: "Suma los números",
  explanation: "Dos más dos son cuatro",
  content: ["Sumar es juntar cantidades."],
  options: [],
  correctOptionId: "a",
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
