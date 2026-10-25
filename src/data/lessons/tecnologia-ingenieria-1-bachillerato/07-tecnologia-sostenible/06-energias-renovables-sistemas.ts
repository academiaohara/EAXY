import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const energiasRenovablesSistemasLesson: InteractiveLesson = {
  slug: "energias-renovables-sistemas",
  title: "6. Energías renovables y sistemas energéticos",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("fuentes", "Fuentes renovables", [
      { kind: "steps", items: [
        "**Solar fotovoltaica**: células que transforman la luz en electricidad. **Solar térmica**: colectores que calientan agua.",
        "**Eólica**: aerogeneradores; la potencia crece con el **cubo** de la velocidad del viento ($P \\propto v^3$).",
        "**Hidráulica**: energía del agua en saltos y embalses; permite almacenar (bombeo).",
        "**Biomasa**: combustión o gasificación de materia orgánica; renovable si se repone lo que se consume.",
        "**Otras**: geotérmica, mareomotriz, undimotriz.",
      ] },
      { kind: "warning", title: "Variabilidad", text: "El sol y el viento no obedecen a la demanda. Esa **variabilidad** es el gran reto de las renovables y obliga a almacenar, interconectar y gestionar la demanda." },
    ], undefined, "stack"),
    slide("parque", "Parque energético virtual", [
      { kind: "text", text: "Fija la potencia solar y eólica y mira cómo la generación no coincide con la demanda del día. Prueba con nubes, poco viento y almacenamiento. ¿Cuánta capacidad hace falta para cubrir el pico de la noche?" },
    ], tool("parque-renovable-explorador", { a: 80, b: 40, c: 0.6 }), "visual-top"),
    slide("red", "Almacenamiento e integración en la red", [
      { kind: "steps", items: [
        "**Baterías**: respuesta rápida, capacidad limitada y coste decreciente.",
        "**Bombeo hidráulico**: se sube agua en las horas de sobra y se turbina cuando falta.",
        "**Interconexiones**: compartir excedentes entre regiones con distinto clima.",
        "**Gestión de la demanda**: mover consumos (cargar el coche eléctrico, lavadoras) a las horas de exceso.",
        "**Centrales de respaldo** (gas, hidráulica) que cubren lo que falta.",
      ] },
    ]),
    slide("calculos", "Cálculos básicos", [
      { kind: "rule", title: "Panel fotovoltaico", formula: "P = I_{\\text{solar}}\\cdot S\\cdot\\eta\\qquad (I_{\\text{solar}}\\approx 1000\\ \\text{W/m}^2)" },
      { kind: "rule", title: "Factor de capacidad", text: "Fracción de la energía máxima teórica que realmente se produce en un año.", formula: "FC = \\dfrac{E_{\\text{anual}}}{P_{\\text{nominal}}\\cdot 8760\\ \\text{h}}" },
    ]),
    calc("calc-panel", "Potencia de unos paneles", "Unos paneles de $40\\ \\text{m}^2$ con rendimiento del $20\\,\\%$ reciben $1\\,000$ W/m². ¿Qué potencia, en kW, entregan?",
      nums(8), "$P = 1000\\cdot 40\\cdot 0{,}20 = 8\\,000$ W $= 8$ kW.", "Irradiancia · superficie · rendimiento."),
    calc("calc-fc", "Factor de capacidad", "Un aerogenerador de $2$ MW produce $5\\,256$ MWh en un año. ¿Cuál es su factor de capacidad, en %?",
      nums(30), "Energía máxima: $2\\cdot 8760 = 17\\,520$ MWh. $FC = 5256/17520 = 0{,}30 = 30\\,\\%$.", "8760 h tiene un año."),
    calc("calc-viento", "El cubo de la velocidad", "Si la velocidad del viento se duplica, ¿cuántas veces aumenta la potencia disponible?",
      nums(8), "$P\\propto v^3$, así que $2^3 = 8$ veces.", "Eleva al cubo."),
    sort("clasifica-ren", "¿Qué fuente es?", "Asocia cada instalación con su fuente de energía.",
      [["sol", "Solar", "amber"], ["eol", "Eólica", "cobalt"], ["hid", "Hidráulica", "emerald"], ["bio", "Biomasa", "violet"]],
      [["Placas en un tejado", "sol"], ["Colector para agua caliente", "sol"], ["Aerogeneradores en una cresta", "eol"], ["Parque marino con turbinas flotantes", "eol"], ["Presa con turbina", "hid"], ["Central de bombeo", "hid"], ["Caldera de pellets de madera", "bio"]],
      "Cada tecnología aprovecha una fuente: radiación solar, viento, agua o materia orgánica.",
    ),
    pick("check-var", "El reto de las renovables", "¿Cuál es la principal dificultad de basar la electricidad solo en sol y viento?",
      "Su producción varía con el clima y la hora, y no coincide siempre con la demanda",
      [["Que son más peligrosas", "No es el problema principal."], ["Que gastan combustible", "No consumen combustible."], ["Que no producen electricidad", "Producen, pero de forma variable."]],
      "Para compensarlo se necesita almacenamiento, interconexión, gestión de la demanda y respaldo.",
    ),
  ],
};
