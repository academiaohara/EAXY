import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, sort } from "@/data/lessons/tec1-helpers";

/** Actividades del final del tema 3 del libro (pp. 32-33), separadas de las lecciones de teoría. */
export const ejerciciosEscalasDt1Lesson: InteractiveLesson = {
  slug: "ejercicios-escalas-dt1",
  title: "6. Ejercicios del tema",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    pick("act-1", "Reducción y ampliación", "¿Cuál es la diferencia entre una escala de reducción y una de ampliación?",
      "En la de reducción el dibujo es menor que la realidad; en la de ampliación, mayor",
      [["En la de reducción se dibuja a tamaño real", "Eso es la escala natural, 1:1."], ["En la de ampliación el dibujo es menor que la realidad", "Es al revés: ampliar es dibujar más grande."]],
      "Reducción: E < 1. Ampliación: E > 1.",
    ),
    pick("act-2", "Escala no normalizada", "¿Cuál de estas escalas no está normalizada: 1:5, 5:1, 1:3, 1:10, 10:1, 1:100?",
      "1:3",
      [["1:5", "Está en la Tabla 1."], ["10:1", "Es una de las tres de ampliación."], ["1:100", "Está en la Tabla 1."]],
      "La Tabla 1 no incluye 1:3.",
    ),
    sort("act-3", "¿Ampliación o reducción?", "Clasifica cada escala.",
      [["amp", "Ampliación", "cobalt"], ["nat", "Tamaño natural", "amber"], ["red", "Reducción", "emerald"]],
      [["2:1", "amp"], ["10:1", "amp"], ["1:1", "nat"], ["1:50", "red"], ["1:100", "red"], ["5:1", "amp"]],
      "El primer número es el dibujo y el segundo, la realidad.",
    ),
    calc("act-4", "Un mapa", "En un mapa a escala 1:50 000 se miden 32 mm. ¿Cuántos kilómetros son en la realidad?", nums(1.6), "32 mm · 50 000 = 1 600 000 mm = 1 600 m = 1,6 km.", "Multiplica por 50 000 y pasa a km (1 km = 1 000 000 mm)."),
    calc("act-5", "Una cota de taller", "Una pieza está dibujada a escala 1:5. ¿A qué medida real (en mm) corresponde una cota que en el plano mide 35 mm?", nums(175), "35 · 5 = 175 mm.", "Multiplica por 5."),
    pick("act-6", "El casillero de escalas", "Si en el casillero de las escalas de un plano se lee «1:1 (2:1)», ¿qué quiere decir?",
      "La escala principal es 1:1 (natural) y hay partes dibujadas a 2:1",
      [["Todo el plano está a 2:1", "La escala entre paréntesis es secundaria."], ["El plano está a escala 1:2", "1:1 y 2:1 no son 1:2."]],
      "Se destaca la principal y se indican entre paréntesis las secundarias, también en la parte del dibujo a que se refieren.",
    ),
    pick("act-7", "Varias escalas en un plano", "Si en un plano hay varias piezas a escalas diferentes, predomina la 1:1 y las otras son 2:1 y 5:1, ¿cómo se indica en el casillero?",
      "1:1 (2:1, 5:1)",
      [["2:1 (1:1, 5:1)", "La principal es la que predomina: 1:1."], ["1:1 2:1 5:1 sin distinguir", "La principal debe destacarse."]],
      "Se destaca la escala principal y las secundarias se indican a continuación.",
    ),
    calc("act-8", "Dibujar a 1:10 (340 mm)", "Se va a dibujar una pieza a escala 1:10. ¿Cuántos mm deberá medir en el plano una medida real de 340 mm?", nums(34), "340/10 = 34 mm.", "Divide entre 10."),
    calc("act-8b", "Dibujar a 1:10 (750 mm)", "A escala 1:10, ¿cuántos mm deberá medir en el plano una medida real de 750 mm?", nums(75), "750/10 = 75 mm.", "Divide entre 10."),
    calc("act-9", "Ampliación 2:1", "Sobre un plano hecho a escala 2:1 se ha medido una longitud de 44 mm. ¿Cuánto mide en la realidad (mm)?", nums(22), "44/2 = 22 mm.", "En una ampliación el dibujo es mayor: divide."),
  ],
};
