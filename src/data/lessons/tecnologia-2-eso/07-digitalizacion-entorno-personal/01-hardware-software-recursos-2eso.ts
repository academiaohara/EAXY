import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const hardwareSoftwareRecursos2esoLesson: InteractiveLesson = {
  slug: "hardware-software-recursos-2eso",
  title: "1. Hardware, software y sistema operativo",
  subtitle: TECESO2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("capas", "Capas de un equipo informático", [
      { kind: "text", text: "Un ordenador funciona gracias a capas: el hardware, el sistema operativo y las aplicaciones." },
    ], anim("capas-entorno-digital"), "text-top"),
    slide("hard", "Componentes del hardware", [
      { kind: "text", text: "Explora los componentes de un equipo y para qué sirve cada uno." },
    ], tool("dispositivo-componentes-explorador"), "visual-top"),
    slide("so", "El sistema operativo", [
      { kind: "steps", items: [
        "**Gestiona los recursos**: reparte el procesador y la memoria entre los programas.",
        "**Gestiona los archivos** en el almacenamiento.",
        "**Ofrece la interfaz** (escritorio, ventanas, menús) y maneja los dispositivos (impresora, teclado).",
        "Ejemplos: **Windows, macOS, Linux, Android, iOS, ChromeOS**.",
      ] },
    ]),
    slide("ram", "La memoria RAM y la multitarea", [
      { kind: "text", text: "Abre pestañas y programas, y observa cuándo se llena la memoria RAM." },
    ], tool("eso2-sistema-recursos-explorador"), "visual-top"),
    calc("calc-mb", "De GB a MB", "Un equipo tiene 8 GB de RAM. ¿Cuántos MB son? (1 GB = 1 024 MB)", nums(8192), "8 · 1 024 = 8 192 MB.", "Multiplica por 1 024."),
    calc("calc-pest", "Memoria de las pestañas", "Cada pestaña del navegador ocupa unos 250 MB. ¿Cuántos MB ocupan 12 pestañas?", nums(3000), "12 · 250 = 3 000 MB.", "Pestañas por MB de cada una."),
    sort("clasifica-hw", "Hardware o software", "Clasifica cada elemento.",
      [["hw", "Hardware", "cobalt"], ["sw", "Software", "emerald"]],
      [["Procesador", "hw"], ["Memoria RAM", "hw"], ["Disco duro", "hw"], ["Navegador web", "sw"], ["Sistema operativo", "sw"], ["Procesador de textos", "sw"]],
      "El hardware es lo que se puede tocar; el software son los programas.",
    ),
    pick("check-ram", "RAM frente a disco", "¿Qué diferencia principal hay entre la memoria RAM y el disco de almacenamiento?",
      "La RAM es muy rápida y temporal; el disco es más lento pero guarda los datos al apagar",
      [["La RAM guarda los archivos para siempre", "La RAM se vacía al apagar."], ["El disco es más rápido que la RAM", "Es al revés."], ["Son lo mismo", "Cumplen funciones distintas."]],
      "La RAM guarda lo que se usa ahora; el disco, lo que quieres conservar.",
    ),
  ],
};
