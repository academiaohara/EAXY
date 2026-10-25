import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const rectasNivelCcss2Lesson: InteractiveLesson = {
  slug: "rectas-nivel-ccss2",
  title: "6. Método gráfico: rectas de nivel",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "nivel",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Una familia de rectas paralelas"
        }
      ],
      "title": "Una familia de rectas paralelas",
      "blocks": [
        {
          "kind": "text",
          "text": "Las rectas $ax + by = Z$ para distintos valores de $Z$ son **paralelas** entre sí (todas tienen pendiente $-\\tfrac ab$). Cada una agrupa los puntos con el mismo valor de la función objetivo."
        },
        {
          "kind": "text",
          "text": "Para **maximizar**, se desplaza la recta en el sentido en que $Z$ crece y se toma el **último punto de la región** que toca; para **minimizar**, en sentido contrario. Siempre se detiene en un vértice (o en un lado completo)."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "rectas-nivel"
      }
    },
    {
      "id": "explora",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Mueve la recta de nivel"
        }
      ],
      "title": "Mueve la recta de nivel",
      "blocks": [
        {
          "kind": "text",
          "text": "Aumenta $Z$ poco a poco y observa cuándo la recta deja de tocar la región."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          0,
          60
        ],
        "hint": "Z = 60: la recta corta la región. A partir de Z = 140 deja de tocarla."
      }
    },
    {
      "id": "check-pendiente",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Despeja $y$."
        }
      ],
      "title": "Pendiente",
      "question": "¿Cuál es la pendiente de las rectas de nivel de $Z = 30x + 20y$? (decimal)",
      "correctAnswers": [
        "-1.5",
        "-1,5",
        "−1,5",
        "−1.5",
        "-3/2",
        "−3/2"
      ],
      "explanation": "$y = \\dfrac{Z - 30x}{20}$, pendiente $-\\dfrac{30}{20} = -1{,}5$."
    },
    {
      "id": "check-nivel",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 0$."
        }
      ],
      "title": "Una recta de nivel",
      "question": "La recta de nivel de $Z = 120$ pasa por $(4, 0)$ y por $(0, y_0)$. ¿Cuánto vale $y_0$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$20y_0 = 120 \\Rightarrow y_0 = 6$."
    },
    {
      "id": "check-ultimo",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $y = 4$."
        }
      ],
      "title": "Último contacto",
      "question": "Con $Z = 140$, la recta solo toca la región en el vértice $(a, 4)$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$30a + 80 = 140 \\Rightarrow a = 2$."
    },
    {
      "id": "check-minimizar",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Cambia el sentido."
        }
      ],
      "title": "Minimizar",
      "question": "Para **minimizar** $Z$ con el método gráfico se desplaza la recta de nivel…",
      "choices": [
        {
          "id": "a",
          "label": "en el sentido en que $Z$ decrece, hasta el último contacto"
        },
        {
          "id": "b",
          "label": "en el sentido en que $Z$ crece, hasta el último contacto",
          "incorrectFeedback": "Eso es para maximizar."
        },
        {
          "id": "c",
          "label": "hasta el centro de la región",
          "incorrectFeedback": "El óptimo está en un vértice, no en el centro."
        },
        {
          "id": "d",
          "label": "hasta que sea perpendicular a una restricción",
          "incorrectFeedback": "No hay ninguna condición de perpendicularidad."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Se desplaza hacia donde $Z$ es menor."
    }
  ],
};
