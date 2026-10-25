import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const problemasPlCcss2Lesson: InteractiveLesson = {
  slug: "problemas-pl-ccss2",
  title: "12. Resolver un problema completo",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Método completo"
        }
      ],
      "title": "Método completo",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "**Definir** variables y escribir la función objetivo.",
            "**Plantear** las restricciones (con $x, y \\geq 0$).",
            "**Dibujar** la región factible y hallar sus vértices.",
            "**Evaluar** $Z$ en los vértices (o desplazar la recta de nivel).",
            "**Interpretar** el resultado en el contexto: qué valores de $x$ e $y$ y cuánto vale $Z$."
          ]
        },
        {
          "kind": "warning",
          "text": "Errores típicos: evaluar $Z$ en puntos que no son vértices, confundir máximo con mínimo, olvidar una restricción o dar solo $Z$ sin decir los valores de $x$ e $y$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          1,
          16
        ],
        "hint": "Dieta: con Z = 16 la recta toca la región en (0, 8); el mínimo es 14 en (2, 4)."
      }
    },
    {
      "id": "check-max",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Evalúa $Z$ en cada vértice."
        }
      ],
      "title": "Un máximo",
      "question": "Región acotada con vértices $(0,0)$, $(5,0)$, $(3,4)$ y $(0,3)$. ¿Cuál es el máximo de $Z = 2x + 3y$? (solo el número)",
      "correctAnswers": [
        "18"
      ],
      "explanation": "$Z$: $0,\\ 10,\\ 6 + 12 = 18,\\ 9$. El máximo es $18$ en $(3, 4)$."
    },
    {
      "id": "check-min",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Observa el origen."
        }
      ],
      "title": "Un mínimo",
      "question": "En esa misma región, ¿cuál es el mínimo de $Z = 2x + 3y$? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "$Z(0, 0) = 0$."
    },
    {
      "id": "check-error",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda el teorema fundamental."
        }
      ],
      "title": "Detecta el error",
      "question": "Un alumno calcula el máximo de $Z$ evaluándola en el centro de la región. ¿Qué error comete?",
      "choices": [
        {
          "id": "a",
          "label": "El máximo de una función lineal está en un vértice, no en el interior"
        },
        {
          "id": "b",
          "label": "Ninguno, el centro siempre da el máximo",
          "incorrectFeedback": "El centro da un valor intermedio."
        },
        {
          "id": "c",
          "label": "Solo debía usar el eje $X$",
          "incorrectFeedback": "El óptimo puede estar en cualquier vértice."
        },
        {
          "id": "d",
          "label": "Debía restar los valores",
          "incorrectFeedback": "No tiene sentido restar $Z$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Una función lineal es monótona en cada dirección: sus extremos están en los vértices."
    },
    {
      "id": "check-int",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Lee el enunciado: ¿qué se pregunta?"
        }
      ],
      "title": "Interpretar",
      "question": "El óptimo es $(x, y) = (2, 4)$ con $Z = 140$ €. La respuesta correcta al problema es…",
      "choices": [
        {
          "id": "a",
          "label": "fabricar $2$ mesas y $4$ sillas para un beneficio máximo de $140$ €"
        },
        {
          "id": "b",
          "label": "$Z = 140$ y nada más",
          "incorrectFeedback": "Falta indicar qué hay que fabricar."
        },
        {
          "id": "c",
          "label": "$x = 2$, $y = 4$ y nada más",
          "incorrectFeedback": "Falta el valor del beneficio."
        },
        {
          "id": "d",
          "label": "$Z = 6$",
          "incorrectFeedback": "No es la solución del modelo."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Siempre se interpreta en el contexto: valores de las variables y de $Z$."
    }
  ],
};
