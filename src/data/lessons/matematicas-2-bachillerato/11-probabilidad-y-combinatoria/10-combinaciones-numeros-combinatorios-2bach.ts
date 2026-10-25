import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_11_SUBTITLE } from "@/data/lessons/shared";

export const combinacionesNumerosCombinatorios2bachLesson: InteractiveLesson = {
  slug: "combinaciones-numeros-combinatorios-2bach",
  title: "10. Combinaciones y números combinatorios",
  subtitle: TEMA_2BACH_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "combinaciones",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cuando el orden no importa"
        }
      ],
      "title": "Cuando el orden no importa",
      "blocks": [
        {
          "kind": "rule",
          "title": "Combinaciones",
          "text": "Elegir $n$ elementos de $m$ sin importar el orden:",
          "formula": "C_{m,n} = \\dbinom{m}{n} = \\dfrac{m!}{n!\\,(m-n)!}"
        },
        {
          "kind": "text",
          "text": "Salen de las variaciones dividiendo por las $n!$ ordenaciones de cada grupo: $C_{m,n} = \\dfrac{V_{m,n}}{n!}$."
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\dbinom{m}{0} = \\dbinom{m}{m} = 1",
              "label": "extremos"
            },
            {
              "tex": "\\dbinom{m}{n} = \\dbinom{m}{m-n}",
              "label": "simetría"
            },
            {
              "tex": "\\dbinom{m}{n} = \\dbinom{m-1}{n-1} + \\dbinom{m-1}{n}",
              "label": "triángulo de Pascal"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "pascal-binomio"
      }
    },
    {
      "id": "explora",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explóralo"
        }
      ],
      "title": "Explóralo",
      "blocks": [
        {
          "kind": "text",
          "text": "Prueba con distintos valores de $m$ y $n$: compara variaciones y combinaciones y comprueba que $C = V/n!$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "combinatoria-explorador",
        "params": {
          "a": 8,
          "b": 3
        },
        "hint": "Con m = 8 y n = 3: V = 336 y C = 56 = 336/6."
      }
    },
    {
      "id": "check-c52",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{5!}{2!\\,3!}$."
        }
      ],
      "title": "Combinaciones",
      "question": "Calcula $\\dbinom{5}{2}$. (solo el número)",
      "correctAnswers": [
        "10"
      ],
      "explanation": "$\\dfrac{5\\cdot4}{2} = 10$."
    },
    {
      "id": "check-c10",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{10\\cdot9\\cdot8}{3!}$."
        }
      ],
      "title": "Un número mayor",
      "question": "Calcula $\\dbinom{10}{3}$. (solo el número)",
      "correctAnswers": [
        "120"
      ],
      "explanation": "$\\dfrac{10\\cdot9\\cdot8}{3\\cdot2\\cdot1} = 120$."
    },
    {
      "id": "check-sim",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Usa la simetría."
        }
      ],
      "title": "Simetría",
      "question": "Si $\\dbinom{8}{3} = 56$, ¿cuánto vale $\\dbinom{8}{5}$? (solo el número)",
      "correctAnswers": [
        "56"
      ],
      "explanation": "$\\dbinom{8}{5} = \\dbinom{8}{8-5} = \\dbinom{8}{3}$."
    },
    {
      "id": "check-comite",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Pregúntate si importa quién está en cada puesto."
        }
      ],
      "title": "Un comité",
      "question": "Elegir un comité de $3$ personas entre $10$ es un caso de…",
      "choices": [
        {
          "id": "a",
          "label": "combinaciones, porque el orden no importa"
        },
        {
          "id": "b",
          "label": "variaciones, porque el orden importa",
          "incorrectFeedback": "En un comité no hay puestos distintos."
        },
        {
          "id": "c",
          "label": "permutaciones",
          "incorrectFeedback": "No se ordenan los $10$."
        },
        {
          "id": "d",
          "label": "variaciones con repetición",
          "incorrectFeedback": "No se repiten personas."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\dbinom{10}{3} = 120$ grupos distintos."
    }
  ],
};
