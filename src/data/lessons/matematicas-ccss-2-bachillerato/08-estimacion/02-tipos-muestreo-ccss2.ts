import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const tiposMuestreoCcss2Lesson: InteractiveLesson = {
  slug: "tipos-muestreo-ccss2",
  title: "2. Tipos de muestreo aleatorio",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "aleatorio",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Que todos tengan la misma oportunidad"
        }
      ],
      "title": "Que todos tengan la misma oportunidad",
      "blocks": [
        {
          "kind": "text",
          "text": "Un muestreo es **aleatorio** cuando se elige al azar, de modo que todos los individuos pueden entrar en la muestra. Si se elige mal, la muestra es **sesgada**: se producen errores sistemáticos. Por ejemplo, encuestar a la salida de un centro comercial no representa a toda la ciudad."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "tipos-muestreo"
      }
    },
    {
      "id": "tipos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Resumen"
        }
      ],
      "title": "Resumen",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\text{Simple}",
              "label": "todos con la misma probabilidad (sorteo con números aleatorios)"
            },
            {
              "tex": "\\text{Sistemático}",
              "label": "punto de partida al azar y luego uno de cada $k$"
            },
            {
              "tex": "\\text{Estratificado}",
              "label": "grupos homogéneos y una muestra en cada uno; **proporcional** al tamaño del estrato"
            },
            {
              "tex": "\\text{Conglomerados}",
              "label": "se eligen al azar grupos enteros y se estudian por completo"
            }
          ]
        }
      ]
    },
    {
      "id": "check-tipo",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Fíjate en la forma de elegir."
        }
      ],
      "title": "¿Qué muestreo es?",
      "question": "Identifica el tipo de muestreo.",
      "groups": [
        {
          "id": "s",
          "label": "Simple",
          "tone": "cobalt"
        },
        {
          "id": "si",
          "label": "Sistemático",
          "tone": "emerald"
        },
        {
          "id": "e",
          "label": "Estratificado",
          "tone": "amber"
        },
        {
          "id": "c",
          "label": "Conglomerados",
          "tone": "violet"
        },
        {
          "id": "n",
          "label": "No aleatorio",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "Se numeran los alumnos y se sortean $20$ números",
          "group": "s"
        },
        {
          "id": "b",
          "text": "Se toma uno de cada $10$ desde un punto elegido al azar",
          "group": "si"
        },
        {
          "id": "c",
          "text": "Se divide por cursos y se toman alumnos al azar en cada curso",
          "group": "e"
        },
        {
          "id": "d",
          "text": "Se eligen $3$ colegios al azar y se encuesta a todos sus alumnos",
          "group": "c"
        },
        {
          "id": "e",
          "text": "Se pregunta a los primeros que salen de una tienda",
          "group": "n"
        }
      ],
      "hint": "Mira cómo se forma la muestra: sorteo, saltos, grupos con muestra en cada uno, grupos enteros o sin azar."
    },
    {
      "id": "check-estrato",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Cada estrato aporta en proporción a su tamaño."
        }
      ],
      "title": "Estratificado proporcional",
      "question": "Una población de $1\\,200$ estudiantes: $600$ de ESO, $400$ de Bachillerato y $200$ de FP. Con una muestra de $60$ estratificada proporcional, ¿cuántos de ESO se eligen? (solo el número)",
      "correctAnswers": [
        "30"
      ],
      "explanation": "$60\\cdot\\dfrac{600}{1200} = 30$."
    },
    {
      "id": "check-fp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{200}{1200} = \\dfrac16$."
        }
      ],
      "title": "Otro estrato",
      "question": "En esa misma muestra, ¿cuántos estudiantes de FP? (solo el número)",
      "correctAnswers": [
        "10"
      ],
      "explanation": "$60\\cdot\\dfrac{200}{1200} = 10$."
    },
    {
      "id": "check-k",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Divide el tamaño de la población entre el de la muestra."
        }
      ],
      "title": "Salto sistemático",
      "question": "De una población de $1\\,000$ individuos se quiere una muestra sistemática de $50$. ¿De cuánto es el salto $k$? (solo el número)",
      "correctAnswers": [
        "20"
      ],
      "explanation": "$k = \\dfrac{1000}{50} = 20$."
    }
  ],
};
