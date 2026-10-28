import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const generacionIdeasScamper2esoLesson: InteractiveLesson = {
  slug: "generacion-ideas-scamper-2eso",
  title: "2. Generar ideas: lluvia de ideas y SCAMPER",
  subtitle: TECESO2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("lluvia", "Cantidad antes que calidad", [
      { kind: "steps", items: [
        "**Lluvia de ideas**: en grupo, se anotan todas las ideas posibles sin criticar ninguna.",
        "Cuantas más ideas, más probabilidad de encontrar una buena.",
        "Se admiten ideas **locas**: pueden inspirar otras.",
        "Después se **agrupan** y se **eligen** con criterios.",
        "Otras fuentes de ideas: **la naturaleza** (biomímesis), productos existentes y las personas usuarias.",
      ] },
    ], undefined, "stack"),
    slide("scamper", "SCAMPER: preguntas para inventar", [
      { kind: "text", text: "**SCAMPER** es una lista de siete preguntas para transformar un objeto que ya existe: Sustituir, Combinar, Adaptar, Modificar, Otro uso, Eliminar y Reordenar. Prueba con cada objeto." },
    ], tool("eso2-scamper-explorador"), "visual-top"),
    slide("bocetos", "Del pensamiento al papel", [
      { kind: "steps", items: [
        "Cada idea se anota con un **boceto rápido** y unas palabras clave.",
        "No importa que el dibujo sea perfecto: debe **comunicar** la idea.",
        "Dibuja varias **alternativas**, no solo la primera que se te ocurra.",
      ] },
    ]),
    calc("calc-ideas", "Cuántas ideas", "Un grupo de 4 personas anota 6 ideas cada una en la lluvia de ideas. ¿Cuántas ideas hay en total?", nums(24), "4 · 6 = 24 ideas.", "Personas por ideas de cada una."),
    sort("clasifica-scamper", "¿Qué pregunta SCAMPER es?", "Relaciona cada idea con la técnica.",
      [["sus", "Sustituir", "cobalt"], ["com", "Combinar", "amber"], ["eli", "Eliminar", "rose"]],
      [["Cambiar el plástico por cartón reciclado", "sus"], ["Usar un material biodegradable en lugar de uno tradicional", "sus"], ["Unir un reloj y un cargador", "com"], ["Una mochila con paneles solares", "com"], ["Quitar el cable de una lámpara y usar batería", "eli"], ["Eliminar un tornillo y usar un encaje", "eli"]],
      "Sustituir cambia una parte; combinar une funciones; eliminar quita algo que no hace falta.",
    ),
    pick("check-lluvia", "Una regla de oro", "¿Cuál es una regla básica de la lluvia de ideas?",
      "No criticar ni descartar ideas mientras se generan",
      [["Descartar enseguida las ideas raras", "Una idea extraña puede inspirar otra buena."], ["Hablar solo la persona que lidera", "Todas las personas aportan."], ["Elegir la primera idea que salga", "Se busca cantidad antes de elegir."]],
      "Primero se generan muchas ideas y solo después se evalúan.",
    ),
  ],
};
