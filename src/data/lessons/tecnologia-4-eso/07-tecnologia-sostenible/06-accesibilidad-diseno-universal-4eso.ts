import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const accesibilidadDisenoUniversal4esoLesson: InteractiveLesson = {
  slug: "accesibilidad-diseno-universal-4eso",
  title: "6. Accesibilidad y diseño universal",
  subtitle: TECESO4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tecnología para todas las personas", [
      { kind: "steps", items: [
        "La **accesibilidad** es que productos, entornos y servicios puedan ser usados por **cualquier persona**, también con discapacidad o con limitaciones temporales.",
        "El **diseño universal** (diseño para todos) lo incorpora **desde el principio**, sin adaptaciones posteriores.",
        "Sus principios: **uso equitativo**, **flexible**, **simple e intuitivo**, **información perceptible**, **tolerancia al error**, **poco esfuerzo físico**, **tamaño y espacio adecuados**.",
        "Beneficia a todos: las rampas sirven a sillas de ruedas, carritos y maletas.",
      ] },
    ], undefined, "stack"),
    slide("univ", "Revisa un producto", [
      { kind: "text", text: "Evalúa un producto con los criterios del diseño universal." },
    ], tool("eso2-diseno-universal-explorador"), "visual-top"),
    slide("comp", "Medir la accesibilidad", [
      { kind: "text", text: "La accesibilidad se puede comprobar con números: pendiente de una rampa o contraste de una pantalla." },
    ], tool("eso4-accesibilidad-explorador"), "visual-top"),
    slide("dig", "Accesibilidad digital", [
      { kind: "steps", items: [
        "**Contraste** suficiente entre texto y fondo.",
        "**Texto alternativo** en las imágenes para lectores de pantalla.",
        "Manejo con **teclado** y no solo con ratón; **subtítulos** en los vídeos.",
        "**Lectores de pantalla**, **reconocimiento de voz** y **teclados adaptados** son productos de apoyo.",
      ] },
    ]),
    calc("calc-pend", "Pendiente de una rampa", "Una rampa salva un desnivel de 30 cm en 4 m. ¿Qué pendiente tiene, en %? (30 / 400 · 100, un decimal)", nums(7.5), "0,3 / 4 = 0,075 = 7,5 %.", "Altura entre longitud."),
    calc("calc-long", "Longitud mínima", "Para salvar 45 cm con una pendiente máxima del 6 %, ¿qué longitud mínima, en m? (0,45 / 0,06)", nums(7.5), "0,45 / 0,06 = 7,5 m.", "Altura entre pendiente."),
    sort("clasifica-acc", "¿Accesible o no?", "Clasifica cada solución.",
      [["acc", "Favorece la accesibilidad", "emerald"], ["noa", "Dificulta la accesibilidad", "rose"]],
      [["Rampa con pendiente del 6 %", "acc"], ["Subtítulos en un vídeo", "acc"], ["Puerta automática ancha", "acc"], ["Escalón sin alternativa", "noa"], ["Texto gris claro sobre fondo blanco", "noa"], ["Información solo en sonido", "noa"]],
      "Un buen diseño no deja a nadie fuera.",
    ),
    pick("check-ud", "Diseño universal", "¿Qué distingue al diseño universal de una adaptación posterior?",
      "Que se piensa desde el principio para todas las personas, sin soluciones especiales",
      [["Que es más caro siempre", "Suele ser más barato desde el inicio."], ["Que solo sirve a una persona", "Beneficia a todas."], ["Que no usa tecnología", "Puede usarla."]],
      "Prevenir barreras es mejor que corregirlas.",
    ),
  ],
};
