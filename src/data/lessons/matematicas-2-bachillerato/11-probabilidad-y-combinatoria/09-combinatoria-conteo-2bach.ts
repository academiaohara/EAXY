import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_11_SUBTITLE } from "@/data/lessons/shared";

export const combinatoriaConteo2bachLesson: InteractiveLesson = {
  slug: "combinatoria-conteo-2bach",
  title: "9. Combinatoria: contar sin listar",
  subtitle: TEMA_2BACH_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "multiplicativo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Principio multiplicativo"
        }
      ],
      "title": "Principio multiplicativo",
      "blocks": [
        {
          "kind": "text",
          "text": "Si una tarea se hace en pasos independientes con $a$, $b$, $c$… opciones, hay $a\\cdot b\\cdot c\\cdots$ resultados. Cuando importa el **orden** y no se repiten los elementos, se obtienen las fórmulas clásicas:"
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "P_n = n!",
              "label": "permutaciones de $n$ elementos"
            },
            {
              "tex": "V_{m,n} = \\dfrac{m!}{(m-n)!}",
              "label": "variaciones sin repetición: $n$ de $m$, importa el orden"
            },
            {
              "tex": "VR_{m,n} = m^n",
              "label": "variaciones con repetición"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "arbol-conteo",
        "params": {
          "a": 3,
          "b": 4,
          "titles": [
            "Camisas",
            "Pantalones"
          ]
        }
      }
    },
    {
      "id": "permutaciones",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Ordenar elementos"
        }
      ],
      "title": "Ordenar elementos",
      "blocks": [
        {
          "kind": "text",
          "text": "Con $A$, $B$, $C$ hay $3\\cdot 2\\cdot 1 = 3! = 6$ ordenaciones. Con $n$ elementos distintos, $n!$ crece muy deprisa: $5! = 120$ y $10! = 3\\,628\\,800$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "permutaciones-arbol"
      }
    },
    {
      "id": "check-p5",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Es $5\\cdot4\\cdot3\\cdot2\\cdot1$."
        }
      ],
      "title": "Permutaciones",
      "question": "¿De cuántas formas se pueden sentar $5$ personas en una fila? (solo el número)",
      "correctAnswers": [
        "120"
      ],
      "explanation": "$5! = 120$."
    },
    {
      "id": "check-vr",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Cada cifra tiene $4$ opciones."
        }
      ],
      "title": "Con repetición",
      "question": "¿Cuántos números de $3$ cifras se pueden formar con los dígitos $1, 2, 3, 4$ si se pueden repetir? (solo el número)",
      "correctAnswers": [
        "64"
      ],
      "explanation": "$4^3 = 64$."
    },
    {
      "id": "check-v",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Importa el orden y no se repiten."
        }
      ],
      "title": "Sin repetición",
      "question": "¿Cuántos podios (oro, plata y bronce) hay entre $6$ corredores? (solo el número)",
      "correctAnswers": [
        "120"
      ],
      "explanation": "$V_{6,3} = 6\\cdot5\\cdot4 = 120$."
    },
    {
      "id": "check-cual",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Hazte las dos preguntas: orden y repetición."
        }
      ],
      "title": "¿Qué fórmula?",
      "question": "Una contraseña de $4$ letras distintas elegidas entre $26$ es un caso de…",
      "choices": [
        {
          "id": "a",
          "label": "variaciones sin repetición"
        },
        {
          "id": "b",
          "label": "permutaciones",
          "incorrectFeedback": "No se usan todos los elementos."
        },
        {
          "id": "c",
          "label": "variaciones con repetición",
          "incorrectFeedback": "Las letras son distintas."
        },
        {
          "id": "d",
          "label": "combinaciones",
          "incorrectFeedback": "El orden de las letras importa."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Importa el orden y no se repiten: $V_{26,4}$."
    }
  ],
};
