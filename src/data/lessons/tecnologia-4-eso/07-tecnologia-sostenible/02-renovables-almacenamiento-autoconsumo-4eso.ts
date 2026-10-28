import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const renovablesAlmacenamientoAutoconsumo4esoLesson: InteractiveLesson = {
  slug: "renovables-almacenamiento-autoconsumo-4eso",
  title: "2. Renovables, almacenamiento y autoconsumo",
  subtitle: TECESO4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "El reto de la intermitencia", [
      { kind: "steps", items: [
        "El sol y el viento no producen **cuando se necesita**: hay que **almacenar** o **gestionar la demanda**.",
        "**Almacenamiento**: baterías de litio, **bombeo hidráulico**, hidrógeno verde, calor en sales fundidas.",
        "**Red inteligente (smart grid)**: sensores y control que equilibran producción y consumo en tiempo real.",
        "**Autoconsumo**: producir y consumir en el mismo lugar; los excedentes se vierten a la red y se compensan.",
        "**Comunidades energéticas**: vecinos que comparten instalación y ahorran juntos.",
      ] },
    ], undefined, "stack"),
    slide("mix", "El mix eléctrico", [
      { kind: "text", text: "Reparte la producción entre fuentes y observa el efecto en las emisiones." },
    ], tool("parque-renovable-explorador"), "visual-top"),
    slide("auto", "Un día con paneles y batería", [
      { kind: "text", text: "Los paneles producen al mediodía; el consumo es mayor por la tarde. Añade una batería y mira cuánta energía solar aprovechas." },
    ], tool("eso4-autoconsumo-explorador"), "visual-top"),
    slide("solar", "Dimensionar la instalación", [
      { kind: "text", text: "Calcula la producción anual y la amortización." },
    ], tool("eso3-solar-explorador"), "visual-top"),
    calc("calc-prod", "Producción diaria", "Una instalación de 3 kWp con 5 horas de sol pico y un rendimiento del 80 %, ¿cuántos kWh produce al día?", nums(12), "3 · 5 · 0,8 = 12 kWh.", "Potencia por horas por rendimiento."),
    calc("calc-aut", "Autoconsumo", "De 12 kWh producidos, se consumen 7,2 kWh en casa. ¿Qué porcentaje se aprovecha?", nums(60), "7,2 / 12 = 0,6 = 60 %.", "Energía aprovechada entre producida."),
    calc("calc-bat", "Capacidad", "Una batería de 5 kWh se carga con el excedente de 4 kWh y se usa por la noche. ¿Cuántos kWh más se aprovechan en casa?", nums(4), "Los 4 kWh de excedente se guardan (caben en 5).", "No puede guardar más de lo que sobra."),
    sort("clasifica-alm", "¿Qué almacena?", "Relaciona cada tecnología con su forma de almacenar energía.",
      [["bat", "Batería", "cobalt"], ["bom", "Bombeo hidráulico", "amber"], ["hid", "Hidrógeno", "emerald"]],
      [["Iones de litio", "bat"], ["Coche eléctrico", "bat"], ["Sube agua a un embalse cuando sobra energía", "bom"], ["Turbina al soltar el agua", "bom"], ["Electrólisis del agua", "hid"], ["Pila de combustible", "hid"]],
      "Cada tecnología se adapta a una escala y a un tiempo de almacenamiento.",
    ),
    pick("check-int", "Por qué almacenar", "¿Por qué se necesita almacenar energía con muchas renovables?",
      "Porque producción y consumo no coinciden en el tiempo",
      [["Porque las renovables contaminan", "Emiten muy poco."], ["Porque la electricidad se acaba", "No se acaba."], ["No se necesita", "Es fundamental para integrar renovables."]],
      "El almacenamiento acerca la oferta a la demanda.",
    ),
  ],
};
