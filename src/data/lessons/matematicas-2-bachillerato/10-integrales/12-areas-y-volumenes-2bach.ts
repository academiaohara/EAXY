import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const areasYVolumenes2bachLesson: InteractiveLesson = {
  slug: "areas-y-volumenes-2bach",
  title: "12. Áreas entre curvas y volúmenes de revolución",
  subtitle: TEMA_2BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "areas",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Área entre dos curvas"
        }
      ],
      "title": "Área entre dos curvas",
      "blocks": [
        {
          "kind": "rule",
          "title": "Área",
          "text": "Si $f(x) \\geq g(x)$ en $[a,b]$:",
          "formula": "\\text{Área} = \\int_a^b \\left[f(x) - g(x)\\right]dx"
        },
        {
          "kind": "text",
          "text": "Primero se hallan los **puntos de corte** (igualando las dos funciones); entre ellos se integra la función de arriba menos la de abajo."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "y = 2x,\\ y = x^2:\\ \\ 2x = x^2 \\Rightarrow x = 0,\\ 2"
            },
            {
              "math": "\\int_0^2 (2x - x^2)\\,dx = \\left[x^2 - \\dfrac{x^3}{3}\\right]_0^2 = \\dfrac43"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "area-entre-curvas"
      }
    },
    {
      "id": "areas-herr",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explora el área"
        }
      ],
      "title": "Explora el área",
      "blocks": [
        {
          "kind": "text",
          "text": "Cambia la pendiente $m$ de la recta $y = mx$ y observa el área que encierra con la parábola $y = x^2$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "area-curvas-explorador",
        "initial": [
          2
        ],
        "hint": "El área vale m³/6: con m = 3 son 9/2."
      }
    },
    {
      "id": "volumen",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Volumen de un sólido de revolución"
        }
      ],
      "title": "Volumen de un sólido de revolución",
      "blocks": [
        {
          "kind": "rule",
          "title": "Volumen",
          "text": "Al girar $y = f(x)$ en $[a,b]$ alrededor del eje $X$:",
          "formula": "V = \\pi \\int_a^b [f(x)]^2\\,dx"
        },
        {
          "kind": "text",
          "text": "Cada sección es un círculo de radio $f(x)$: el sólido es un apilado de discos de volumen $\\pi f(x)^2\\,dx$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "solido-revolucion"
      }
    },
    {
      "id": "volumen-herr",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cono, paraboloide y esfera"
        }
      ],
      "title": "Cono, paraboloide y esfera",
      "blocks": [
        {
          "kind": "text",
          "text": "Elige el perfil y el valor de $b$ y comprueba las fórmulas $\\dfrac{\\pi b^3}{3}$, $\\dfrac{\\pi b^2}{2}$ y $\\dfrac{4\\pi b^3}{3}$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "volumen-revolucion-explorador",
        "initial": [
          1,
          4
        ],
        "hint": "y = √x girando en [0, 4] da 8π."
      }
    },
    {
      "id": "check-area",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Arriba está $y = x$."
        }
      ],
      "title": "Área entre dos curvas",
      "question": "Calcula el área entre $y = x$ e $y = x^2$ en $[0,1]$. (fracción o decimal)",
      "correctAnswers": [
        "1/6",
        "0.1667",
        "0,1667",
        "0.167",
        "0,167"
      ],
      "explanation": "$\\int_0^1 (x - x^2)\\,dx = \\tfrac12 - \\tfrac13 = \\tfrac16$."
    },
    {
      "id": "check-area3",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$m^3 = 27$."
        }
      ],
      "title": "Con m = 3",
      "question": "Área entre $y = 3x$ e $y = x^2$ (fórmula $m^3/6$). (decimal)",
      "correctAnswers": [
        "9/2",
        "4.5",
        "4,5"
      ],
      "explanation": "$27/6 = 9/2$."
    },
    {
      "id": "check-cono",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\int_0^3 x^2\\,dx = 9$."
        }
      ],
      "title": "Volumen de un cono",
      "question": "Girando $y = x$ en $[0,3]$ se obtiene un cono de volumen $k\\pi$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "9"
      ],
      "explanation": "$\\pi\\int_0^3 x^2\\,dx = \\pi\\cdot 9$."
    },
    {
      "id": "check-esfera",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$V = \\tfrac43\\pi r^3$."
        }
      ],
      "title": "Esfera de radio 3",
      "question": "El volumen de una esfera de radio $3$ es $k\\pi$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "36"
      ],
      "explanation": "$\\dfrac43\\pi\\cdot 27 = 36\\pi$."
    },
    {
      "id": "check-restar",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira la franja de la animación."
        }
      ],
      "title": "¿Arriba menos abajo?",
      "question": "Para calcular el área entre dos curvas se integra…",
      "choices": [
        {
          "id": "a",
          "label": "la función de arriba menos la de abajo, entre los puntos de corte"
        },
        {
          "id": "b",
          "label": "la suma de las dos funciones",
          "incorrectFeedback": "Eso no mide el área entre ellas."
        },
        {
          "id": "c",
          "label": "solo la función de arriba",
          "incorrectFeedback": "Incluiría el área bajo la curva de abajo."
        },
        {
          "id": "d",
          "label": "el producto de las dos funciones",
          "incorrectFeedback": "El producto no tiene significado de área."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "La altura de cada franja es $f(x) - g(x)$."
    }
  ],
};
