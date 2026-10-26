import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fabricacionDigitalImpresion3d2esoLesson: InteractiveLesson = {
  slug: "fabricacion-digital-impresion-3d-2eso",
  title: "8. Fabricación digital: impresión 3D y corte láser",
  subtitle: TECESO2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Del ordenador a la pieza", [
      { kind: "definition", text: "La **fabricación digital** produce objetos directamente a partir de un archivo del ordenador. Las máquinas leen el diseño (CAD) y lo ejecutan con gran precisión." },
      { kind: "steps", items: [
        "**Aditiva** (impresión 3D): se **añade** material capa a capa.",
        "**Sustractiva** (fresadora CNC, corte láser): se **quita** material de una plancha o de un bloque.",
        "El flujo es: **diseño CAD → archivo → programa de la máquina → fabricación → acabado**.",
      ] },
    ], undefined, "stack"),
    slide("capas", "Capa a capa", [
      { kind: "text", text: "En el programa de laminado se elige la altura de capa y el relleno. Observa cómo afectan al tiempo y al plástico." },
    ], tool("eso2-impresion3d-explorador"), "visual-top"),
    slide("laser", "Corte láser y fresadora CNC", [
      { kind: "steps", items: [
        "El **corte láser** corta o graba láminas (madera, cartón, metacrilato) siguiendo un dibujo **2D** (DXF, SVG).",
        "La **fresadora CNC** talla piezas con una herramienta de corte guiada por ordenador en tres ejes.",
        "Estas máquinas son **peligrosas**: solo se usan con supervisión, protección y los extractores de humo.",
      ] },
    ]),
    calc("calc-capas", "Cuántas capas", "Un cubo de 40 mm de altura se imprime con capas de 0,2 mm. ¿Cuántas capas tiene?", nums(200), "40 / 0,2 = 200 capas.", "Altura entre altura de capa."),
    sort("clasifica-fab", "Aditiva o sustractiva", "Clasifica cada proceso.",
      [["adi", "Aditiva", "emerald"], ["sus", "Sustractiva", "amber"]],
      [["Impresión 3D con filamento", "adi"], ["Impresión 3D con resina", "adi"], ["Construir un objeto capa a capa", "adi"], ["Fresadora CNC", "sus"], ["Corte láser de una plancha", "sus"], ["Tallar un bloque con una herramienta", "sus"]],
      "La aditiva suma material; la sustractiva lo elimina de una pieza mayor.",
    ),
    pick("check-relleno", "Relleno y resistencia", "Quieres una pieza impresa más resistente. ¿Qué cambio es más directo?",
      "Aumentar el relleno y el grosor de las paredes",
      [["Disminuir el relleno al 0 %", "La pieza quedaría hueca y débil."], ["Aumentar la velocidad", "No mejora la resistencia."], ["Cambiar de color", "No afecta a la resistencia."]],
      "El relleno y las paredes aportan resistencia, a costa de más plástico y tiempo.",
    ),
  ],
};
