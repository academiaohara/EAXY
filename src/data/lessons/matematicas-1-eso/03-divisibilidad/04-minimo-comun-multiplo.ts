import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

export const minimoComunMultiploLesson: InteractiveLesson = {
  slug: "minimo-comun-multiplo",
  title: "4. Mínimo común múltiplo (m.c.m.)",
  subtitle: TEMA_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mcm-idea",
      type: "slide",
      title: "Cuándo vuelven a coincidir",
      blocks: [
        {
          kind: "story",
          text: "Dos líneas de autobús salen a la vez de la misma parada: una cada **4** min y otra cada **6**. ¿Cuándo volverán a salir juntas?",
          src: "/lesson/divisibilidad/autobuses-parada.png",
          alt: "Dos autobuses urbanos en una parada",
        },
        {
          kind: "definition",
          text: "El **mínimo común múltiplo** de varios números es el **menor múltiplo, distinto de $0$**, que tienen en común.",
        },
        {
          kind: "example",
          lines: [
            { math: "M(4) = \\{4, 8, \\mathbf{12}, 16, 20, \\mathbf{24}, \\dots\\}" },
            { math: "M(6) = \\{6, \\mathbf{12}, 18, \\mathbf{24}, \\dots\\}" },
            { math: "\\text{m.c.m.}(4, 6) = 12", note: "coinciden cada $12$ min" },
          ],
        },
        {
          kind: "warning",
          text: "Cualquier múltiplo común hace que coincidan ($24$, $36$…), pero el **mínimo** es el primero. Todos los demás son múltiplos de él.",
        },
      ],
      visual: { kind: "anim", scene: "multiplos-saltos", params: { a: 4, b: 6 } },
    },
    {
      id: "mcm-factores",
      type: "slide",
      title: "Con números grandes: factores primos",
      blocks: [
        {
          kind: "steps",
          items: [
            "Descompón cada número en **factores primos**.",
            "Toma **todos** los primos que aparezcan, sean comunes o no.",
            "Elévalos al **mayor exponente** con el que aparezcan.",
            "**Multiplica** los resultados.",
          ],
        },
        {
          kind: "example",
          title: "m.c.m.(16, 24, 320)",
          lines: [
            { math: "16 = 2^4 \\quad 24 = 2^3 \\cdot 3 \\quad 320 = 2^6 \\cdot 5" },
            { math: "\\text{m.c.m.} = 2^6 \\cdot 3 \\cdot 5 = 960" },
          ],
        },
        {
          kind: "warning",
          text: "Entran también los primos que solo aparecen en un número: el $3$ está únicamente en $24$ y aun así forma parte del m.c.m.",
        },
      ],
      visual: { kind: "anim", scene: "tabla-exponentes", params: { nums: [16, 24, 320], mode: "mcm" } },
    },
    {
      id: "mcm-atajos",
      type: "slide",
      title: "Dos casos que no necesitan cuentas",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Uno es múltiplo del otro",
            text: "El m.c.m. es el **mayor**.",
            math: ["\\text{m.c.m.}(4, 12) = 12"],
            tone: "ok",
          },
          right: {
            title: "No comparten ningún primo",
            text: "El m.c.m. es el **producto**.",
            math: ["\\text{m.c.m.}(5, 7) = 35"],
            tone: "info",
          },
        },
        {
          kind: "rule",
          title: "Comprobación rápida",
          text: "El m.c.m. nunca es menor que el mayor de los números. Si te sale menor, hay un error.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-faros",
      type: "predict",
      title: "Dos faros",
      question:
        "Un faro da un destello cada **12** s y otro cada **18** s. Acaban de coincidir. ¿Cuántos segundos pasan hasta la próxima vez que coinciden?",
      mode: "choice",
      choices: [
        {
          id: "6",
          label: "$6$ s",
          incorrectFeedback: "$6$ es un divisor común (m.c.d.). A los $6$ s ninguno de los dos ha vuelto a destellar.",
        },
        { id: "36", label: "$36$ s" },
        {
          id: "72",
          label: "$72$ s",
          incorrectFeedback: "$72$ es un múltiplo común, pero no el primero: ya coinciden a los $36$ s.",
        },
        {
          id: "216",
          label: "$216$ s",
          incorrectFeedback: "$216 = 12 \\cdot 18$ es múltiplo común, pero el primero llega mucho antes.",
        },
      ],
      correctChoiceId: "36",
      shuffleChoices: true,
      explanation: "$12 = 2^2 \\cdot 3$ y $18 = 2 \\cdot 3^2$. El m.c.m. es $2^2 \\cdot 3^2 = 36$.",
    },
    {
      id: "check-entrenos",
      type: "predict",
      title: "Tres entrenamientos",
      question:
        "Ana entrena cada **3** días, Bea cada **4** y Carla cada **6**. Hoy han coincidido las tres. ¿Dentro de cuántos días volverán a coincidir?",
      mode: "choice",
      choices: [
        {
          id: "6",
          label: "$6$ días",
          incorrectFeedback: "Bea entrena en múltiplos de $4$, y $6$ no lo es.",
        },
        { id: "12", label: "$12$ días" },
        {
          id: "24",
          label: "$24$ días",
          incorrectFeedback: "Es múltiplo común de los tres, pero ya coinciden a los $12$ días.",
        },
        {
          id: "72",
          label: "$72$ días",
          incorrectFeedback: "$72 = 3 \\cdot 4 \\cdot 6$ es un múltiplo común, pero está lejos del mínimo.",
        },
      ],
      correctChoiceId: "12",
      shuffleChoices: true,
      explanation: "$3$, $4 = 2^2$ y $6 = 2 \\cdot 3$: el mayor exponente de $2$ es $2$ y el de $3$ es $1$. $\\text{m.c.m.} = 2^2 \\cdot 3 = 12$.",
    },
  ],
};
