import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const problemasMetricos22bachLesson: InteractiveLesson = {
  slug: "problemas-metricos-2-2bach",
  title: "12. Problemas métricos: áreas, volúmenes y proyecciones",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "combinar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Combinar los resultados"
        }
      ],
      "title": "Combinar los resultados",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\text{Área }ABC = \\tfrac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|",
              "label": "triángulo"
            },
            {
              "tex": "V = \\tfrac16\\left|[\\overrightarrow{AB},\\overrightarrow{AC},\\overrightarrow{AD}]\\right|",
              "label": "tetraedro"
            },
            {
              "tex": "h = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{|\\vec{n}|}",
              "label": "altura a un plano"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Por ejemplo, la altura de un tetraedro desde $D$ se obtiene como $h = 3V/\\text{Área}(ABC)$ o como la distancia de $D$ al plano $ABC$: ambos caminos deben coincidir."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "distancias-espacio-explorador",
        "initial": [
          1,
          0,
          0,
          2,
          1,
          0,
          1,
          -1,
          1,
          0
        ],
        "hint": "Distancia desde C(0,0,2) a la recta que pasa por A(1,0,1) con dirección AB = (−1, 1, 0): √(3/2)."
      }
    },
    {
      "id": "check-cuadrado",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma de cuadrados."
        }
      ],
      "title": "Área de un triángulo",
      "question": "Para $A(1,0,1)$, $B(0,1,1)$ y $C(0,0,2)$: $\\overrightarrow{AB}\\times\\overrightarrow{AC} = (1, 1, 1)$. ¿Cuánto vale $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|^2$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$1 + 1 + 1 = 3$; el área del triángulo es $\\dfrac{\\sqrt3}{2}$."
    },
    {
      "id": "check-dist",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$3/2$."
        }
      ],
      "title": "Distancia de C a la recta AB",
      "question": "En el triángulo anterior, la distancia de $C$ a la recta $AB$ cumple $d^2 = \\dfrac{|\\overrightarrow{AC}\\times\\overrightarrow{AB}|^2}{|\\overrightarrow{AB}|^2} = \\dfrac{3}{2}$. ¿Cuánto vale $d^2$ en decimal? (solo el número)",
      "correctAnswers": [
        "1.5",
        "1,5",
        "3/2"
      ],
      "explanation": "$\\dfrac{3}{2} = 1{,}5$, así que $d = \\sqrt{1{,}5} \\approx 1{,}22$."
    },
    {
      "id": "check-altura",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$V = \\tfrac13\\,\\text{Área}\\cdot h$."
        }
      ],
      "title": "Altura de un tetraedro",
      "question": "Un tetraedro de volumen $5$ y base $ABC$ de área $3$ tiene una altura $h = \\dfrac{3V}{\\text{Área}}$. ¿Cuánto vale $h$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$h = \\dfrac{3\\cdot 5}{3} = 5$."
    },
    {
      "id": "check-metodo",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Dos vectores, un producto vectorial."
        }
      ],
      "title": "¿Qué fórmula?",
      "question": "Para calcular la distancia de un punto a una **recta** conviene usar…",
      "choices": [
        {
          "id": "a",
          "label": "el producto vectorial $\\overrightarrow{AP}\\times\\vec{v}$ dividido entre $|\\vec{v}|$"
        },
        {
          "id": "b",
          "label": "la fórmula punto-plano directamente",
          "incorrectFeedback": "Esa solo sirve con planos."
        },
        {
          "id": "c",
          "label": "el producto mixto de tres vectores",
          "incorrectFeedback": "Se usa para volúmenes y para rectas que se cruzan."
        },
        {
          "id": "d",
          "label": "el producto escalar $\\overrightarrow{AP}\\cdot\\vec{v}$",
          "incorrectFeedback": "Eso da la proyección, no la distancia."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Área del paralelogramo entre la base."
    }
  ],
};
