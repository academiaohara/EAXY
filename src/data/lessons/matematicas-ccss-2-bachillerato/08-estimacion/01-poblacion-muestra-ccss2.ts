import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const poblacionMuestraCcss2Lesson: InteractiveLesson = {
  slug: "poblacion-muestra-ccss2",
  title: "1. Población y muestra",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "definiciones",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Estudiar una parte para conocer el todo"
        }
      ],
      "title": "Estudiar una parte para conocer el todo",
      "blocks": [
        {
          "kind": "definition",
          "text": "La **población** es el conjunto de todos los individuos que se quiere estudiar. La **muestra** es un subconjunto representativo de ella, y su **tamaño** $n$ es el número de individuos que contiene. El **muestreo** es el proceso de elegirla; si se estudia a todos, se trata de un **censo**."
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\mu,\\ \\sigma,\\ p",
              "label": "parámetros: valores de la población, casi siempre desconocidos"
            },
            {
              "tex": "\\bar{x},\\ s,\\ \\hat p",
              "label": "estadísticos: valores calculados con la muestra"
            }
          ]
        },
        {
          "kind": "text",
          "text": "La **inferencia estadística** estima parámetros a partir de estadísticos, y lo hace en términos de probabilidad: nunca con certeza total."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "poblacion-muestra"
      }
    },
    {
      "id": "porque",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "¿Por qué no estudiar a todos?"
        }
      ],
      "title": "¿Por qué no estudiar a todos?",
      "blocks": [
        {
          "kind": "text",
          "text": "A veces es demasiado caro o lento. Otras veces, el estudio **destruye** lo que mide: para conocer la duración media de unas bombillas hay que dejarlas encendidas hasta que se fundan, y no se pueden gastar todas."
        }
      ]
    },
    {
      "id": "check-pm",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "¿Se estudia a todos o solo a una parte?"
        }
      ],
      "title": "¿Población o muestra?",
      "question": "Clasifica cada colectivo.",
      "groups": [
        {
          "id": "p",
          "label": "Población",
          "tone": "emerald"
        },
        {
          "id": "m",
          "label": "Muestra",
          "tone": "amber"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "Todas las ovejas de una granja, a las que se cambia el pienso",
          "group": "p"
        },
        {
          "id": "b",
          "text": "100 ovejas elegidas para probar un grano nuevo",
          "group": "m"
        },
        {
          "id": "c",
          "text": "Los 1 000 encuestados en un sondeo electoral",
          "group": "m"
        },
        {
          "id": "d",
          "text": "Todos los habitantes de una ciudad en su censo",
          "group": "p"
        },
        {
          "id": "e",
          "text": "Las notas de una clase usadas para estimar la media de todo el instituto",
          "group": "m"
        }
      ],
      "hint": "Si se estudian todos los individuos de interés, es la población; si solo una parte, una muestra."
    },
    {
      "id": "check-par",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Distingue entre «de la población» y «de la muestra»."
        }
      ],
      "title": "¿Parámetro o estadístico?",
      "question": "Clasifica cada símbolo.",
      "groups": [
        {
          "id": "par",
          "label": "Parámetro (población)",
          "tone": "emerald"
        },
        {
          "id": "est",
          "label": "Estadístico (muestra)",
          "tone": "amber"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$\\mu$",
          "group": "par"
        },
        {
          "id": "b",
          "text": "$\\bar{x}$",
          "group": "est"
        },
        {
          "id": "c",
          "text": "$\\sigma$",
          "group": "par"
        },
        {
          "id": "d",
          "text": "$s$",
          "group": "est"
        },
        {
          "id": "e",
          "text": "$p$ (proporción poblacional)",
          "group": "par"
        },
        {
          "id": "f",
          "text": "$\\hat p$ (proporción muestral)",
          "group": "est"
        }
      ],
      "hint": "Las letras griegas y $p$ designan valores de la población; la barra, la $s$ y el circunflejo, los de la muestra."
    },
    {
      "id": "check-destruct",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en qué ocurre con las bombillas."
        }
      ],
      "title": "Estudio destructivo",
      "question": "Para medir la vida media de bombillas que se funden, conviene…",
      "choices": [
        {
          "id": "a",
          "label": "tomar una muestra, porque el ensayo gasta las bombillas"
        },
        {
          "id": "b",
          "label": "estudiar la población entera",
          "incorrectFeedback": "Nos quedaríamos sin bombillas."
        },
        {
          "id": "c",
          "label": "no estudiar ninguna",
          "incorrectFeedback": "Hay que medir algo para estimar."
        },
        {
          "id": "d",
          "label": "estudiar solo la primera de la caja",
          "incorrectFeedback": "Una muestra de una unidad no es fiable."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "El ensayo es destructivo: hay que muestrear."
    }
  ],
};
