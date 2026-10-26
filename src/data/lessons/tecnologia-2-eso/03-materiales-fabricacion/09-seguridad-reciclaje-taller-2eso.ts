import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seguridadReciclajeTaller2esoLesson: InteractiveLesson = {
  slug: "seguridad-reciclaje-taller-2eso",
  title: "9. Seguridad, reciclaje y aprovechamiento de materiales",
  subtitle: TECESO2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("normas", "Normas de seguridad en el taller", [
      { kind: "steps", items: [
        "**Orden y limpieza**: el puesto despejado evita accidentes.",
        "**Protección personal**: gafas, guantes, mascarilla y pelo recogido según la tarea.",
        "**Herramientas**: en buen estado, usadas solo para lo que están hechas y guardadas en su sitio.",
        "**Máquinas**: solo con permiso y supervisión; nunca con prisas.",
        "**Si ocurre un accidente**: avisar enseguida al profesor.",
      ] },
    ], undefined, "stack"),
    slide("peligros", "Detecta los peligros", [
      { kind: "text", text: "Observa un taller y marca todo lo que está mal." },
    ], tool("taller-peligros-explorador"), "visual-top"),
    slide("ciclo", "El ciclo del material", [
      { kind: "text", text: "Los materiales pasan por un ciclo: extracción, fabricación, uso y, al final, reciclaje o residuo." },
    ], anim("ciclo-reciclaje-material"), "text-top"),
    slide("recicla", "Separar para reciclar", [
      { kind: "text", text: "Cada residuo va a su contenedor. Elige dónde va cada objeto." },
    ], tool("contenedores-reciclaje-explorador"), "visual-top"),
    slide("aprovecha", "Aprovechar los materiales", [
      { kind: "steps", items: [
        "**Despiece optimizado**: planificar el corte para desperdiciar menos.",
        "**Reutilizar los retales** para piezas pequeñas.",
        "**Reparar** antes de tirar.",
        "**Elegir materiales reciclables** y que se puedan separar al final de la vida del producto.",
      ] },
    ]),
    calc("calc-desperdicio", "Porcentaje de desperdicio", "De un tablero de 3 m² se aprovechan 2,4 m². ¿Qué porcentaje se desperdicia?", nums(20), "Se desperdician 0,6 m² de 3 m²: 0,6 / 3 = 0,2 = 20 %.", "Desperdicio = lo no aprovechado entre el total."),
    sort("clasifica-resid", "¿Dónde va?", "Clasifica cada residuo del taller.",
      [["amb", "Contenedor amarillo (envases)", "amber"], ["pap", "Contenedor azul (papel)", "cobalt"], ["pun", "Punto limpio", "rose"]],
      [["Envase de cola vacío", "amb"], ["Botella de plástico", "amb"], ["Caja de cartón", "pap"], ["Papel de los planos", "pap"], ["Pila gastada", "pun"], ["Restos de barniz y disolvente", "pun"]],
      "Los residuos peligrosos (pilas, disolventes) nunca van a la basura común: van al punto limpio.",
    ),
    pick("check-seg", "Gafas de protección", "¿Cuándo hay que usar gafas de protección en el taller?",
      "Siempre que se corte, taladre, lije o se trabaje con salpicaduras",
      [["Solo si el profesor lo dice dos veces", "Es una norma fija."], ["Nunca: molestan", "Los ojos no se recuperan."], ["Solo con máquinas grandes", "También con herramientas manuales."]],
      "Una partícula en el ojo puede causar daños graves: la protección es obligatoria.",
    ),
  ],
};
