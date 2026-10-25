import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_11_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadTotal2bachLesson: InteractiveLesson = {
  slug: "probabilidad-total-2bach",
  title: "7. Teorema de la probabilidad total",
  subtitle: TEMA_2BACH_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "total",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Sumar los caminos que llevan al suceso"
        }
      ],
      "title": "Sumar los caminos que llevan al suceso",
      "blocks": [
        {
          "kind": "rule",
          "title": "Probabilidad total",
          "text": "Si $A_1, \\dots, A_n$ son sucesos incompatibles que cubren todo $E$ (un **sistema completo**):",
          "formula": "P(B) = \\sum_{i=1}^n P(A_i)\\,P(B \\mid A_i)"
        },
        {
          "kind": "text",
          "text": "Es la suma de las ramas del árbol que acaban en $B$. Ejemplo: tres cajas con $4$ negras de $10$, $1$ de $6$ y $3$ de $8$; se elige una al azar:"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "P(\\text{negra}) = \\tfrac13\\cdot\\tfrac{4}{10} + \\tfrac13\\cdot\\tfrac16 + \\tfrac13\\cdot\\tfrac38 = \\dfrac{113}{360} \\approx 0{,}314"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "prob-total-explorador",
        "initial": [
          1,
          0
        ],
        "hint": "Tres cajas con distinto número de bolas negras: P(negra) es la suma de las tres ramas. Es 113/360 ≈ 0,314."
      }
    },
    {
      "id": "check-urnas",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma las dos ramas."
        }
      ],
      "title": "Dos urnas",
      "question": "Urna A: $2$ negras de $10$. Urna B: $6$ negras de $10$. Se elige una urna al azar y se saca una bola. ¿Cuánto vale $P(\\text{negra})$? (decimal)",
      "correctAnswers": [
        "0.4",
        "0,4",
        "2/5"
      ],
      "explanation": "$\\tfrac12\\cdot 0{,}2 + \\tfrac12\\cdot 0{,}6 = 0{,}4$."
    },
    {
      "id": "check-sastres",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Multiplica en cada rama y suma."
        }
      ],
      "title": "Tres sastres",
      "question": "A hace el $55\\,\\%$ de los arreglos y falla el $5\\,\\%$; B el $30\\,\\%$ (falla el $8\\,\\%$); C el $15\\,\\%$ (falla el $10\\,\\%$). ¿Qué fracción de arreglos fallan? (decimal)",
      "correctAnswers": [
        "0.0665",
        "0,0665"
      ],
      "explanation": "$0{,}55\\cdot0{,}05 + 0{,}30\\cdot0{,}08 + 0{,}15\\cdot0{,}10 = 0{,}0275 + 0{,}024 + 0{,}015 = 0{,}0665$."
    },
    {
      "id": "check-tornillos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Pesa cada máquina por su fracción."
        }
      ],
      "title": "Tornillos",
      "question": "Una caja de $120$ tornillos: $15$ de A ($1\\,\\%$ defectuosos), $30$ de B ($2\\,\\%$) y $75$ de C ($3\\,\\%$). ¿Probabilidad de que un tornillo elegido sea defectuoso? (decimal)",
      "correctAnswers": [
        "0.025",
        "0,025"
      ],
      "explanation": "$\\tfrac{15}{120}\\cdot0{,}01 + \\tfrac{30}{120}\\cdot0{,}02 + \\tfrac{75}{120}\\cdot0{,}03 = 0{,}00125 + 0{,}005 + 0{,}01875 = 0{,}025$."
    },
    {
      "id": "check-condicion",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda el sistema completo."
        }
      ],
      "title": "¿Cuándo se puede usar?",
      "question": "Para aplicar la probabilidad total, los sucesos $A_i$ deben ser…",
      "choices": [
        {
          "id": "a",
          "label": "incompatibles dos a dos y su unión debe ser todo el espacio muestral"
        },
        {
          "id": "b",
          "label": "independientes entre sí",
          "incorrectFeedback": "No hace falta independencia."
        },
        {
          "id": "c",
          "label": "equiprobables",
          "incorrectFeedback": "No tienen por qué serlo."
        },
        {
          "id": "d",
          "label": "cualquier colección de sucesos",
          "incorrectFeedback": "Si se solapan o no cubren $E$, la suma da un resultado incorrecto."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Forman una partición de $E$."
    }
  ],
};
