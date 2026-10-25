import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const optimizacion2bachLesson: InteractiveLesson = {
  slug: "optimizacion-2bach",
  title: "12. Problemas de optimización",
  subtitle: TEMA_2BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Del enunciado al extremo"
        }
      ],
      "title": "Del enunciado al extremo",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Escribe la función a optimizar y **elimina variables** con la restricción.",
            "Indica el **dominio** de la variable.",
            "Deriva e iguala a $0$; comprueba con $f''$ o con el signo de $f'$.",
            "Compara también con los extremos del dominio y **responde** en el contexto."
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "optimizacion-explorador",
        "initial": [
          1,
          50
        ],
        "hint": "Ventana con 14 m de perfil: la luz es máxima cuando el lado vale 3,5 m."
      }
    },
    {
      "id": "check-rect",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Lados $x$ y $10 - x$."
        }
      ],
      "title": "Rectángulo de perímetro 20",
      "question": "Entre los rectángulos de perímetro $20$ m, ¿cuál es el área máxima, en m²? (solo el número)",
      "correctAnswers": [
        "25"
      ],
      "explanation": "$A(x) = x(10 - x)$, $A'(x) = 10 - 2x = 0 \\Rightarrow x = 5$ y $A = 25$ (un cuadrado)."
    },
    {
      "id": "check-valla",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Los lados que cuestan valla son $x$, $x$ y $100 - 2x$."
        }
      ],
      "title": "Una valla junto a un río",
      "question": "Se dispone de $100$ m de valla para cercar un rectángulo junto a un río (el lado del río no se cierra). ¿Cuál es el área máxima, en m²? (solo el número)",
      "correctAnswers": [
        "1250"
      ],
      "explanation": "$A(x) = x(100 - 2x)$, $A' = 100 - 4x = 0 \\Rightarrow x = 25$; $A = 25\\cdot 50 = 1250$."
    },
    {
      "id": "check-suma",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Misma función que el rectángulo."
        }
      ],
      "title": "Dos números",
      "question": "Dos números suman $10$. ¿Cuál es el máximo valor de su producto? (solo el número)",
      "correctAnswers": [
        "25"
      ],
      "explanation": "$P = x(10 - x)$ es máximo en $x = 5$: $25$."
    },
    {
      "id": "check-dominio",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en las unidades."
        }
      ],
      "title": "El dominio importa",
      "question": "En un problema de optimización, antes de dar la respuesta hay que…",
      "choices": [
        {
          "id": "a",
          "label": "comprobar que el valor obtenido está en el dominio y tiene sentido en el contexto"
        },
        {
          "id": "b",
          "label": "derivar dos veces siempre",
          "incorrectFeedback": "Solo si hace falta clasificar el punto."
        },
        {
          "id": "c",
          "label": "quedarse con el mayor valor de $x$",
          "incorrectFeedback": "No tiene por qué ser el óptimo."
        },
        {
          "id": "d",
          "label": "ignorar los extremos del intervalo",
          "incorrectFeedback": "A veces el óptimo está en un extremo."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Un lado negativo no tiene sentido, por ejemplo."
    }
  ],
};
