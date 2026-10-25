import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const contrasteHipotesisMediaCcss2Lesson: InteractiveLesson = {
  slug: "contraste-hipotesis-media-ccss2",
  title: "11. Contraste de hipótesis: la media",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cuatro pasos"
        }
      ],
      "title": "Cuatro pasos",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "**Hipótesis:** $H_0: \\mu = \\mu_0$ (nula) frente a $H_1: \\mu \\neq \\mu_0$ (alternativa).",
            "**Zona de aceptación** al nivel $\\alpha$: $\\left(\\mu_0 - z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n},\\ \\mu_0 + z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt n}\\right)$.",
            "**Verificación:** se toma la muestra y se calcula $\\bar{x}$.",
            "**Decisión:** si $\\bar{x}$ está dentro, no se rechaza $H_0$; si está fuera (zona crítica), se rechaza."
          ]
        },
        {
          "kind": "text",
          "text": "En un contraste **unilateral** ($H_0: \\mu \\geq \\mu_0$ o $\\mu \\leq \\mu_0$) la zona crítica está en una sola cola y el valor crítico es distinto ($1{,}645$ para $\\alpha = 0{,}05$)."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "contraste-region"
      }
    },
    {
      "id": "explora",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Pruébalo"
        }
      ],
      "title": "Pruébalo",
      "blocks": [
        {
          "kind": "text",
          "text": "Se cree que el tiempo de renovación de un móvil es de $2$ años con $\\sigma = 0{,}4$. Una encuesta a $100$ personas da $\\bar{x} = 1{,}8$. Cambia el tipo de contraste y el nivel de significación."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "contraste-media-explorador",
        "initial": [
          0,
          20,
          4,
          100,
          18,
          1
        ],
        "hint": "H₀: μ = 2, σ = 0,4, n = 100, x̄ = 1,8: queda fuera de (1,9216; 2,0784) y se rechaza H₀ al 5 %."
      }
    },
    {
      "id": "check-zona",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sigma/\\sqrt n = 0{,}04$."
        }
      ],
      "title": "Extremo de la zona",
      "question": "Para $H_0: \\mu = 2$, $\\sigma = 0{,}4$, $n = 100$ y $\\alpha = 0{,}05$, ¿cuál es el extremo inferior de la zona de aceptación? (4 decimales)",
      "correctAnswers": [
        "1.9216",
        "1,9216"
      ],
      "explanation": "$2 - 1{,}96\\cdot0{,}04 = 1{,}9216$."
    },
    {
      "id": "check-uni",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$1{,}645\\cdot0{,}04 = 0{,}0658$."
        }
      ],
      "title": "Contraste unilateral",
      "question": "En el contraste unilateral $H_0: \\mu \\geq 2$ al $5\\,\\%$ ($z = 1{,}645$), el valor crítico inferior es $2 - 1{,}645\\cdot0{,}04$. ¿Cuánto vale? (4 decimales)",
      "correctAnswers": [
        "1.9342",
        "1,9342"
      ],
      "explanation": "$2 - 0{,}0658 = 1{,}9342$."
    },
    {
      "id": "check-dec",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara con los extremos."
        }
      ],
      "title": "Decisión",
      "question": "Con $\\bar{x} = 1{,}8$, la zona de aceptación $(1{,}9216;\\ 2{,}0784)$ y $\\alpha = 0{,}05$, se…",
      "choices": [
        {
          "id": "a",
          "label": "rechaza $H_0$: la media muestral cae en la zona crítica"
        },
        {
          "id": "b",
          "label": "acepta $H_0$ porque $1{,}8$ está cerca de $2$",
          "incorrectFeedback": "La zona de aceptación no incluye $1{,}8$."
        },
        {
          "id": "c",
          "label": "acepta $H_0$ porque $\\alpha$ es pequeño",
          "incorrectFeedback": "$\\alpha$ pequeño no cambia la zona."
        },
        {
          "id": "d",
          "label": "no puede decidir",
          "incorrectFeedback": "La muestra está fuera de la zona: se rechaza."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$1{,}8 < 1{,}9216$."
    },
    {
      "id": "check-dentro",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Compara con $(1{,}9216;\\ 2{,}0784)$."
        }
      ],
      "title": "Una media dentro",
      "question": "Si la muestra diera $\\bar{x} = 2{,}05$, ¿estaría dentro de la zona de aceptación? Responde $1$ si sí y $0$ si no. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$1{,}9216 < 2{,}05 < 2{,}0784$: no se rechaza $H_0$."
    }
  ],
};
