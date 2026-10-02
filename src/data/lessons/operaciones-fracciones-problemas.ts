import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFraccionesProblemasLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-problemas",
  title: "4. Problemas con fracciones",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  steps: [
    {
      id: "dos-tipos",
      type: "concept",
      title: "Dos situaciones distintas",
      content: [
        "**Suma de fracciones del total**: gasto $\\dfrac{1}{2}$ y $\\dfrac{1}{3}$ de **todo** el dinero → sumo $\\dfrac{1}{2} + \\dfrac{1}{3}$.",
        "**Fracción de lo que queda**: gasto $\\dfrac{1}{2}$ y después $\\dfrac{1}{3}$ **de lo que quedaba** → la segunda parte es $\\dfrac{1}{3} \\cdot \\dfrac{1}{2}$.",
        "Lee bien si la segunda fracción actúa sobre el **total inicial** o sobre el **resto**.",
      ],
    },
    {
      id: "manuel",
      type: "animated_solution",
      title: "Problema 1 — Manuel (suma sobre el total)",
      content: [
        "Manuel gasta la mitad en el cine y un tercio en una hamburguesa. ¿Qué fracción ha gastado? ¿Qué le queda?",
      ],
      frames: [
        { caption: "Gastado:", math: "\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}" },
        { caption: "Queda:", math: "1 - \\frac{5}{6} = \\frac{1}{6}" },
      ],
    },
    {
      id: "marta",
      type: "animated_solution",
      title: "Problema 2 — Marta (fracción del resto)",
      content: [
        "Marta gasta $\\dfrac{1}{2}$ en un concierto y $\\dfrac{1}{3}$ de lo que le quedaba en una revista.",
      ],
      frames: [
        { caption: "Tras el concierto queda:", math: "\\frac{1}{2}" },
        { caption: "Revista: $\\frac{1}{3}$ de $\\frac{1}{2}$", math: "\\frac{1}{3} \\cdot \\frac{1}{2} = \\frac{1}{6}" },
        { caption: "Queda:", math: "\\frac{2}{3} \\cdot \\frac{1}{2} = \\frac{2}{6} = \\frac{1}{3}" },
        { caption: "Total gastado:", math: "\\frac{1}{2} + \\frac{1}{6} = \\frac{4}{6} = \\frac{2}{3}" },
      ],
    },
    {
      id: "queso",
      type: "animated_solution",
      title: "Problema resuelto — queso de Rosa",
      content: ["Rosa compra $\\dfrac{3}{4}$ kg de queso y regala $\\dfrac{1}{2}$ kg a su hija."],
      frames: [
        { caption: "Resta con común denominador $4$:", math: "\\frac{3}{4} - \\frac{1}{2} = \\frac{3}{4} - \\frac{2}{4}" },
        { caption: "Se queda:", math: "\\frac{1}{4}\\ \\text{kg}" },
      ],
    },
    {
      id: "check-tipo",
      type: "classify",
      title: "¿Suma o producto?",
      question:
        "Lee cada situación y decide qué operación hay que hacer para responderla.",
      groups: [
        { id: "suma", label: "Sumar fracciones", tone: "cobalt" },
        { id: "producto", label: "Multiplicar (fracción de una fracción)", tone: "violet" },
      ],
      items: [
        {
          id: "a",
          text: "Iván gasta $\\frac{2}{3}$ del dinero en una camisa y $\\frac{1}{5}$ **de lo que le quedaba** en una corbata. ¿Qué fracción gasta en la corbata?",
          group: "producto",
        },
        {
          id: "b",
          text: "Ana lee $\\frac{1}{4}$ del libro el lunes y $\\frac{1}{3}$ del libro el martes. ¿Qué fracción ha leído?",
          group: "suma",
        },
        {
          id: "c",
          text: "La mitad de la clase va en autobús y, de esos, $\\frac{2}{5}$ son chicas. ¿Qué fracción de la clase son chicas que van en autobús?",
          group: "producto",
        },
        {
          id: "d",
          text: "Pinta $\\frac{2}{7}$ de la valla por la mañana y $\\frac{3}{7}$ por la tarde. ¿Qué fracción lleva pintada?",
          group: "suma",
        },
        {
          id: "e",
          text: "Tiene $\\frac{3}{4}$ de una pizza y se come $\\frac{1}{3}$ **de lo que tiene**. ¿Qué fracción de pizza se come?",
          group: "producto",
        },
        {
          id: "f",
          text: "Un grifo llena $\\frac{1}{2}$ del depósito y otro $\\frac{1}{6}$. ¿Qué fracción del depósito está llena?",
          group: "suma",
        },
      ],
      hint: "Busca la expresión «de lo que…» o «de esos»: si la fracción se aplica a **otra parte**, no al total, se multiplica.",
      explanation:
        "Si las dos partes se refieren al mismo total, se suman. Si una es parte **de otra parte**, se multiplica. Por ejemplo, tras la camisa a Iván le queda $1 - \\frac{2}{3} = \\frac{1}{3}$, y la corbata es $\\frac{1}{5} \\cdot \\frac{1}{3} = \\frac{1}{15}$ del dinero.",
    },
  ],
};
