import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const distribucionProporcionMuestralCcss2Lesson: InteractiveLesson = {
  slug: "distribucion-proporcion-muestral-ccss2",
  title: "6. Distribución de la proporción muestral",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "proporcion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Una proporción también es una media"
        }
      ],
      "title": "Una proporción también es una media",
      "blocks": [
        {
          "kind": "text",
          "text": "Si en una población la proporción de individuos con una característica es $p$ ($q = 1 - p$), la proporción $\\hat p$ en muestras de tamaño $n$ (con $np \\geq 5$ y $nq \\geq 5$) sigue aproximadamente"
        },
        {
          "kind": "formula",
          "tex": "\\hat p \\approx N\\!\\left(p,\\ \\sqrt{\\dfrac{p\\,q}{n}}\\right)"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "p = 0{,}2,\\ n = 100 \\Rightarrow \\sqrt{\\dfrac{0{,}2\\cdot0{,}8}{100}} = 0{,}04"
            },
            {
              "math": "P(0{,}16 < \\hat p < 0{,}24) = P(-1 < z < 1) = 0{,}6826"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "proporcion-muestral-explorador",
        "initial": [
          20,
          100,
          16,
          24
        ],
        "hint": "N(0,2; 0,04): entre 16 % y 24 % hay un 68,26 % de probabilidad."
      }
    },
    {
      "id": "check-sd",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{0{,}0025}$."
        }
      ],
      "title": "Desviación típica",
      "question": "Con $p = 0{,}5$ y $n = 100$, ¿cuánto vale $\\sqrt{pq/n}$? (decimal)",
      "correctAnswers": [
        "0.05",
        "0,05"
      ],
      "explanation": "$\\sqrt{0{,}25/100} = 0{,}05$."
    },
    {
      "id": "check-p",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula $z$."
        }
      ],
      "title": "Una cola",
      "question": "Con $p = 0{,}2$ y $n = 100$, ¿cuánto vale $P(\\hat p < 0{,}28)$? (4 decimales, con tabla)",
      "correctAnswers": [
        "0.9772",
        "0,9772"
      ],
      "explanation": "$z = \\dfrac{0{,}28 - 0{,}2}{0{,}04} = 2$ y $P(z < 2) = 0{,}9772$."
    },
    {
      "id": "check-ent",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$z = \\pm 1$."
        }
      ],
      "title": "Dos colas",
      "question": "En esa misma población, ¿cuánto vale $P(0{,}16 < \\hat p < 0{,}24)$? (4 decimales, con tabla)",
      "correctAnswers": [
        "0.6826",
        "0,6826",
        "0.6827",
        "0,6827"
      ],
      "explanation": "$P(-1 < z < 1) = 0{,}6826$."
    },
    {
      "id": "check-cond",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula $np$ y $nq$."
        }
      ],
      "title": "¿Aproximación válida?",
      "question": "Con $p = 0{,}02$ y $n = 100$, ¿se puede aproximar $\\hat p$ por una normal?",
      "choices": [
        {
          "id": "a",
          "label": "No, porque $np = 2 < 5$"
        },
        {
          "id": "b",
          "label": "Sí, porque $n = 100$ es grande",
          "incorrectFeedback": "También se exige $np \\geq 5$ y $nq \\geq 5$."
        },
        {
          "id": "c",
          "label": "Sí, siempre que $p < 0{,}5$",
          "incorrectFeedback": "Eso no basta."
        },
        {
          "id": "d",
          "label": "No, porque $q < p$",
          "incorrectFeedback": "$q$ es mayor que $p$; el problema es $np$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$np = 100\\cdot0{,}02 = 2$."
    }
  ],
};
