import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const eolicaHidraulica3esoLesson: InteractiveLesson = {
  slug: "eolica-hidraulica-3eso",
  title: "3. Energía eólica e hidráulica",
  subtitle: TECESO3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Viento y agua", [
      { kind: "steps", items: [
        "**Eólica**: las palas giran con el viento y mueven un **generador** que produce electricidad.",
        "**Hidráulica**: el agua de un **embalse** cae por una tubería y mueve una **turbina**.",
        "**Minihidráulica** y **mareas**: aprovechan ríos pequeños y el movimiento del mar.",
        "**Bombeo**: se sube agua cuando sobra energía y se turbina cuando falta; es una forma de **almacenar** energía.",
      ] },
    ], undefined, "stack"),
    slide("eolica", "La potencia del viento", [
      { kind: "text", text: "Cambia la velocidad del viento y el tamaño de las palas." },
    ], tool("eso3-eolica-explorador"), "visual-top"),
    slide("hidro", "El salto de agua", [
      { kind: "text", text: "En una central hidráulica la potencia depende del caudal y de la altura del salto. Cambia ambos valores." },
    ], tool("eso3-hidraulica-explorador"), "visual-top"),
    slide("imp", "Impacto ambiental", [
      { kind: "steps", items: [
        "**Eólica**: ruido, impacto visual y riesgo para aves y murciélagos si no se planifica bien.",
        "**Hidráulica**: los embalses alteran el río, inundan terreno y afectan a los peces.",
        "Se reduce con **estudios de impacto**, caudales ecológicos y escalas para peces.",
        "Ninguna fuente es totalmente inocua: se decide **comparando** costes y beneficios.",
      ] },
    ]),
    calc("calc-v3", "El cubo del viento", "Si la velocidad del viento se duplica, ¿cuántas veces aumenta la potencia?", nums(8), "Es proporcional a v³: 2³ = 8.", "La potencia depende de v elevado al cubo."),
    calc("calc-area", "Área barrida", "Un aerogenerador con palas de 40 m barre un círculo. ¿Cuál es su área en m²? (π · 40², redondea a un entero)", nums(5027, 5026.5), "π · 1 600 ≈ 5 027 m².", "Área del círculo."),
    sort("clasifica-eh", "¿Eólica o hidráulica?", "Clasifica cada elemento.",
      [["eol", "Eólica", "cobalt"], ["hid", "Hidráulica", "amber"]],
      [["Palas", "eol"], ["Góndola y torre", "eol"], ["Se instala en zonas ventosas", "eol"], ["Embalse", "hid"], ["Turbina Pelton o Francis", "hid"], ["Salto de agua", "hid"]],
      "Cada tecnología tiene sus propios elementos.",
    ),
    pick("check-viento", "Dónde ponerlo", "¿Por qué los parques eólicos se sitúan en lugares ventosos?",
      "Porque la potencia crece con el cubo de la velocidad del viento",
      [["Porque ahí hay más espacio", "No es la razón principal."], ["Porque el viento es más limpio", "No cambia."], ["Para que se vean mejor", "No es por estética."]],
      "Un poco más de viento da mucha más energía.",
    ),
  ],
};
