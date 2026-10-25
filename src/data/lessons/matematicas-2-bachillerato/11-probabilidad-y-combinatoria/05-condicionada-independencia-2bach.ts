import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_11_SUBTITLE } from "@/data/lessons/shared";

export const condicionadaIndependencia2bachLesson: InteractiveLesson = {
  slug: "condicionada-independencia-2bach",
  title: "5. Probabilidad condicionada e independencia",
  subtitle: TEMA_2BACH_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "condicionada",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Información que cambia la probabilidad"
        }
      ],
      "title": "Información que cambia la probabilidad",
      "blocks": [
        {
          "kind": "rule",
          "title": "Condicionada",
          "text": "La probabilidad de $B$ sabiendo que ha ocurrido $A$ (con $P(A)>0$):",
          "formula": "P(B \\mid A) = \\dfrac{P(A \\cap B)}{P(A)}"
        },
        {
          "kind": "text",
          "text": "Despejando se obtiene la **regla del producto**: $P(A \\cap B) = P(A)\\,P(B \\mid A)$."
        },
        {
          "kind": "definition",
          "text": "$A$ y $B$ son **independientes** si saber que ha ocurrido uno no cambia la probabilidad del otro: $P(B \\mid A) = P(B)$, o equivalentemente $P(A \\cap B) = P(A)\\,P(B)$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "P(A)=0{,}4,\\ P(B)=0{,}25,\\ P(A \\cap B)=0{,}1"
            },
            {
              "math": "P(B \\mid A) = \\dfrac{0{,}1}{0{,}4} = 0{,}25 = P(B) \\Rightarrow \\text{independientes}"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "prob-union-explorador",
        "initial": [
          40,
          25,
          10
        ],
        "hint": "Con P(A) = 40 %, P(B) = 25 % y P(A ∩ B) = 10 %: P(A)·P(B) = 10 %, luego son independientes."
      }
    },
    {
      "id": "urnas",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Con y sin reemplazamiento"
        }
      ],
      "title": "Con y sin reemplazamiento",
      "blocks": [
        {
          "kind": "text",
          "text": "Si se extrae **con** reemplazamiento los sucesos son independientes; **sin** reemplazamiento no: las probabilidades de la segunda extracción dependen de la primera."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\text{3 verdes y 2 rojas, sin reemplazamiento: } P(VV) = \\dfrac35\\cdot\\dfrac24 = \\dfrac{3}{10}"
            },
            {
              "math": "P(RR) = \\dfrac25\\cdot\\dfrac14 = \\dfrac1{10}"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "urna-arbol-explorador",
        "initial": [
          3,
          2,
          0
        ],
        "hint": "Con 3 verdes y 2 rojas, sin reemplazamiento: VV = 3/10, VR = 3/10, RV = 3/10, RR = 1/10. Marca «con reemplazamiento» y compara."
      }
    },
    {
      "id": "check-cond",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Divide la intersección entre $P(A)$."
        }
      ],
      "title": "Condicionada",
      "question": "$P(A) = 0{,}5$ y $P(A \\cap B) = 0{,}2$. ¿Cuánto vale $P(B \\mid A)$? (decimal)",
      "correctAnswers": [
        "0.4",
        "0,4",
        "2/5"
      ],
      "explanation": "$\\dfrac{0{,}2}{0{,}5} = 0{,}4$."
    },
    {
      "id": "check-ind",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Multiplica."
        }
      ],
      "title": "Independientes",
      "question": "$A$ y $B$ son independientes con $P(A) = 0{,}3$ y $P(B) = 0{,}6$. ¿Cuánto vale $P(A \\cap B)$? (decimal)",
      "correctAnswers": [
        "0.18",
        "0,18"
      ],
      "explanation": "$0{,}3 \\cdot 0{,}6 = 0{,}18$."
    },
    {
      "id": "check-rr",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "En la segunda quedan $1$ roja y $4$ bolas."
        }
      ],
      "title": "Dos rojas seguidas",
      "question": "En una urna hay $3$ bolas verdes y $2$ rojas. Se sacan dos sin reemplazamiento. ¿Cuánto vale $P(RR)$? (decimal o fracción)",
      "correctAnswers": [
        "1/10",
        "0.1",
        "0,1"
      ],
      "explanation": "$\\dfrac25\\cdot\\dfrac14 = \\dfrac{2}{20} = \\dfrac1{10}$."
    },
    {
      "id": "check-incomp",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara $P(A \\cap B)$ con $P(A)P(B)$."
        }
      ],
      "title": "Incompatibles y dependientes",
      "question": "Si $A$ y $B$ son incompatibles y ambos tienen probabilidad positiva, entonces…",
      "choices": [
        {
          "id": "a",
          "label": "son dependientes"
        },
        {
          "id": "b",
          "label": "son independientes",
          "incorrectFeedback": "$P(A \\cap B) = 0 \\neq P(A)P(B) > 0$."
        },
        {
          "id": "c",
          "label": "son iguales",
          "incorrectFeedback": "Son sucesos distintos."
        },
        {
          "id": "d",
          "label": "$P(A \\cup B) = P(A)P(B)$",
          "incorrectFeedback": "Para incompatibles $P(A \\cup B) = P(A) + P(B)$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Si ocurre uno, el otro no puede ocurrir: la información sí cambia."
    }
  ],
};
