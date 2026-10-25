import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const tamanoRepresentatividadCcss2Lesson: InteractiveLesson = {
  slug: "tamano-representatividad-ccss2",
  title: "3. Tamaño y representatividad de la muestra",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "representativa",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Aleatoria y de tamaño suficiente"
        }
      ],
      "title": "Aleatoria y de tamaño suficiente",
      "blocks": [
        {
          "kind": "text",
          "text": "Una muestra es **representativa** cuando está elegida al azar y tiene un tamaño suficiente. Una muestra pequeña, aunque esté bien elegida, no da resultados fiables (medir a una sola persona para conocer la estatura media de un país). Una muy grande es fiable, pero cara, y a partir de cierto punto mejora poco."
        },
        {
          "kind": "text",
          "text": "El **error** de una estimación baja con $\\sqrt{n}$: para reducirlo a la mitad hay que **multiplicar por $4$** el tamaño de la muestra."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "intervalo-confianza-explorador",
        "initial": [
          500,
          100,
          1,
          0
        ],
        "hint": "Con p̂ = 0,5 y n = 100 el error al 95 % es 0,098. Sube n a 400: el error se reduce a la mitad."
      }
    },
    {
      "id": "check-e100",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{0{,}25/100} = 0{,}05$."
        }
      ],
      "title": "Error con n = 100",
      "question": "Con $\\hat p = 0{,}5$, $n = 100$ y $z = 1{,}96$, el error máximo es $1{,}96\\sqrt{\\dfrac{0{,}5\\cdot0{,}5}{100}}$. ¿Cuánto vale? (3 decimales)",
      "correctAnswers": [
        "0.098",
        "0,098"
      ],
      "explanation": "$1{,}96\\cdot0{,}05 = 0{,}098$."
    },
    {
      "id": "check-e400",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{0{,}25/400} = 0{,}025$."
        }
      ],
      "title": "Error con n = 400",
      "question": "Con $n = 400$ (cuatro veces más), ¿cuánto vale el error máximo? (3 decimales)",
      "correctAnswers": [
        "0.049",
        "0,049"
      ],
      "explanation": "$1{,}96\\cdot\\sqrt{0{,}25/400} = 1{,}96\\cdot0{,}025 = 0{,}049$: la mitad."
    },
    {
      "id": "check-amigos",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Comprueba las dos condiciones."
        }
      ],
      "title": "¿Es representativa?",
      "question": "Para conocer los gustos musicales de los jóvenes de una ciudad, un alumno pregunta a cinco amigos. La muestra es…",
      "choices": [
        {
          "id": "a",
          "label": "sesgada y demasiado pequeña"
        },
        {
          "id": "b",
          "label": "representativa, porque es aleatoria",
          "incorrectFeedback": "Los amigos no se eligen al azar de la población."
        },
        {
          "id": "c",
          "label": "representativa, porque es pequeña",
          "incorrectFeedback": "Pequeña no significa representativa."
        },
        {
          "id": "d",
          "label": "un censo",
          "incorrectFeedback": "Un censo estudiaría a todos los jóvenes."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "No es aleatoria (sesgo) y son pocos individuos (tamaño insuficiente)."
    },
    {
      "id": "check-mas",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en la relación coste-precisión."
        }
      ],
      "title": "¿Más es siempre mejor?",
      "question": "Aumentar mucho el tamaño de la muestra…",
      "choices": [
        {
          "id": "a",
          "label": "reduce el error, pero aumenta el coste y a partir de cierto tamaño mejora poco"
        },
        {
          "id": "b",
          "label": "elimina todo el error",
          "incorrectFeedback": "Siempre queda cierta incertidumbre."
        },
        {
          "id": "c",
          "label": "no sirve de nada",
          "incorrectFeedback": "El error baja como $1/\\sqrt{n}$."
        },
        {
          "id": "d",
          "label": "hace que la muestra sea más sesgada",
          "incorrectFeedback": "El sesgo depende de cómo se elige, no de cuántos son."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "El error es proporcional a $\\dfrac{1}{\\sqrt n}$."
    }
  ],
};
