import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const disenoAccesibleUniversal2esoLesson: InteractiveLesson = {
  slug: "diseno-accesible-universal-2eso",
  title: "4. Diseño accesible y diseño universal",
  subtitle: TECESO2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Diseñar para todas las personas", [
      { kind: "definition", text: "El **diseño universal** (o diseño para todas las personas) crea productos y entornos que puedan usar la mayor cantidad de personas posible, **sin adaptaciones** especiales. La **accesibilidad** es la condición que permite ese uso." },
      { kind: "steps", items: [
        "**Uso equitativo**: sirve a personas con capacidades diferentes.",
        "**Flexibilidad**: se adapta a distintas preferencias (diestros y zurdos).",
        "**Uso simple e intuitivo**: fácil de entender.",
        "**Información perceptible**: con texto, sonido, color y tacto.",
        "**Tolerancia al error**: reduce las consecuencias de un fallo.",
        "**Poco esfuerzo físico** y **tamaño y espacio** adecuados para el acceso y el uso.",
      ] },
    ], undefined, "stack"),
    slide("alcance", "Alcance cómodo", [
      { kind: "text", text: "Coloca un mando a distintas alturas y comprueba si lo alcanza cualquier persona." },
    ], tool("eso2-diseno-universal-explorador"), "visual-top"),
    slide("rampa", "Una rampa accesible", [
      { kind: "text", text: "Una rampa debe tener una pendiente suave. Calcula si cumple." },
    ], tool("rampa-accesibilidad-explorador", { a: 30, b: 2 }), "visual-top"),
    slide("ejemplos", "Ejemplos cotidianos", [
      { kind: "steps", items: [
        "**Bordillos rebajados**: útiles para sillas de ruedas, carritos y maletas.",
        "**Subtítulos en vídeos**: ayudan a personas sordas y a quien está en un lugar ruidoso.",
        "**Contraste alto y letra grande** en pantallas y carteles.",
        "**Semáforos con sonido** y **señales en relieve** para personas con discapacidad visual.",
      ] },
    ]),
    calc("calc-pendiente", "Pendiente de una rampa", "Una rampa de 6 m de longitud salva un desnivel de 0,45 m. ¿Qué pendiente tiene, en %? (pendiente = desnivel ÷ longitud · 100)", nums(7.5), "0,45 / 6 · 100 = 7,5 %.", "Desnivel entre longitud por 100."),
    sort("clasifica-diseno", "¿A quién beneficia?", "Relaciona cada elemento con las personas a las que ayuda.",
      [["mov", "Movilidad reducida", "cobalt"], ["vis", "Discapacidad visual o auditiva", "amber"], ["tod", "Beneficia a todas las personas", "emerald"]],
      [["Rampa en una entrada", "mov"], ["Ascensor con espacio amplio", "mov"], ["Señales en braille y relieve", "vis"], ["Subtítulos y lengua de signos", "vis"], ["Interruptores a altura media y fáciles de pulsar", "tod"], ["Mensajes claros y con pictogramas", "tod"]],
      "Muchas soluciones accesibles mejoran el uso para todas las personas.",
    ),
    pick("check-universal", "Un buen ejemplo", "¿Cuál es un buen ejemplo de diseño universal?",
      "Una puerta automática con ancho suficiente para todas las personas",
      [["Una escalera como única entrada", "Excluye a quien no puede subir escalones."], ["Un botón muy pequeño y a gran altura", "Dificulta su uso."], ["Información solo con sonido", "Excluye a las personas sordas."]],
      "Un diseño universal evita barreras desde el principio, en lugar de resolverlas después.",
    ),
  ],
};
