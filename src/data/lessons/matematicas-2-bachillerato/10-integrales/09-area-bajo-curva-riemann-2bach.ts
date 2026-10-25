import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const areaBajoCurvaRiemann2bachLesson: InteractiveLesson = {
  slug: "area-bajo-curva-riemann-2bach",
  title: "9. Área bajo una curva y sumas de Riemann",
  subtitle: TEMA_2BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "riemann",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Aproximar el área con rectángulos"
        }
      ],
      "title": "Aproximar el área con rectángulos",
      "blocks": [
        {
          "kind": "text",
          "text": "Para medir el área bajo $y = f(x)$ en $[a, b]$ se divide el intervalo en $n$ trozos de base $\\Delta x = \\dfrac{b-a}{n}$ y se levantan rectángulos."
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "s = \\sum m_i\\,\\Delta x",
              "label": "suma inferior (altura mínima)"
            },
            {
              "tex": "S = \\sum M_i\\,\\Delta x",
              "label": "suma superior (altura máxima)"
            },
            {
              "tex": "s \\leq \\text{área} \\leq S",
              "label": "el área está atrapada"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Cuando $n \\to \\infty$, $s$ y $S$ coinciden y su valor común es la **integral definida**."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "riemann-sumas"
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
          "text": "Cambia la función, el método (izquierda, derecha, punto medio) y el número de rectángulos, y mira cuánto se acerca la suma a la integral exacta."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "riemann-explorador",
        "initial": [
          0,
          6,
          0
        ],
        "hint": "Compara el error con 6, 12 y 60 rectángulos."
      }
    },
    {
      "id": "check-der",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma las cuatro alturas y multiplica por $0{,}5$."
        }
      ],
      "title": "Suma por la derecha",
      "question": "Para $f(x) = x$ en $[0, 2]$ con $n = 4$ rectángulos (alturas en el extremo derecho), ¿cuánto vale la suma? (decimal)",
      "correctAnswers": [
        "2.5",
        "2,5",
        "5/2"
      ],
      "explanation": "$\\Delta x = 0{,}5$ y alturas $0{,}5,\\ 1,\\ 1{,}5,\\ 2$: $5 \\cdot 0{,}5 = 2{,}5$."
    },
    {
      "id": "check-izq",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma las alturas y multiplica por $0{,}5$."
        }
      ],
      "title": "Suma por la izquierda",
      "question": "Con los mismos datos pero alturas en el extremo izquierdo ($0,\\ 0{,}5,\\ 1,\\ 1{,}5$), ¿cuánto vale la suma? (decimal)",
      "correctAnswers": [
        "1.5",
        "1,5",
        "3/2"
      ],
      "explanation": "$3 \\cdot 0{,}5 = 1{,}5$. El área real es $2$, entre $1{,}5$ y $2{,}5$."
    },
    {
      "id": "check-limite",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira la animación."
        }
      ],
      "title": "Al aumentar n",
      "question": "Si $f$ es continua y aumentamos el número de rectángulos, la suma inferior y la superior…",
      "choices": [
        {
          "id": "a",
          "label": "se acercan cada vez más al mismo valor: el área"
        },
        {
          "id": "b",
          "label": "se separan cada vez más",
          "incorrectFeedback": "Al afinar la partición el error disminuye."
        },
        {
          "id": "c",
          "label": "no cambian",
          "incorrectFeedback": "Cambian al cambiar la base y la altura de los rectángulos."
        },
        {
          "id": "d",
          "label": "se igualan en $n = 3$",
          "incorrectFeedback": "Solo coinciden en el límite $n \\to \\infty$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "El área queda atrapada entre $s$ y $S$, y su diferencia tiende a $0$."
    }
  ],
};
