import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fabricacionReciclajeEconomiaCircular2esoLesson: InteractiveLesson = {
  slug: "fabricacion-reciclaje-economia-circular-2eso",
  title: "3. Fabricación sostenible, reciclaje y economía circular",
  subtitle: TECESO2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("lineal", "Economía lineal y circular", [
      { kind: "text", text: "En la economía lineal los productos se fabrican, se usan y se tiran. En la circular, los materiales vuelven al ciclo." },
    ], anim("economia-lineal-circular"), "text-top"),
    slide("jerarquia", "Reducir, reutilizar, reciclar", [
      { kind: "text", text: "La jerarquía de residuos ordena las acciones de la más a la menos preferible." },
    ], anim("jerarquia-residuos"), "text-top"),
    slide("fabrica", "Fabricar con menos impacto", [
      { kind: "steps", items: [
        "**Ecodiseño**: pensar desde el principio en reparar, desmontar y reciclar.",
        "**Menos material** y menos tipos de material por producto (más fácil de reciclar).",
        "**Aprovechar los recortes** y optimizar el despiece.",
        "**Energías renovables** y menos transporte (productos locales).",
        "**Larga duración** y piezas de repuesto disponibles.",
      ] },
    ]),
    slide("hogar", "Reciclar bien en casa", [
      { kind: "text", text: "Indica qué parte de cada residuo separas correctamente y mira cuánto se gestiona bien." },
    ], tool("eso2-residuos-hogar-explorador"), "visual-top"),
    slide("circular", "Una economía que cierra el círculo", [
      { kind: "text", text: "Compara qué pasa con un material en una economía lineal y en una circular." },
    ], tool("lineal-circular-eso-explorador", { a: 0, b: 0 }), "visual-top"),
    calc("calc-tasa", "Porcentaje bien gestionado", "De 20 kg de envases, 15 kg se depositan en el contenedor correcto. ¿Qué porcentaje está bien gestionado?", nums(75), "15 / 20 = 0,75 = 75 %.", "Parte entre total."),
    sort("clasifica-3r", "Reducir, reutilizar o reciclar", "Clasifica cada acción.",
      [["red", "Reducir", "emerald"], ["reu", "Reutilizar", "cobalt"], ["rec", "Reciclar", "amber"]],
      [["Usar una botella de agua rellenable", "red"], ["Evitar envases de un solo uso", "red"], ["Darle una segunda vida a un mueble", "reu"], ["Reparar un aparato roto", "reu"], ["Llevar el vidrio al contenedor verde", "rec"], ["Separar el papel para fabricar papel nuevo", "rec"]],
      "Reducir evita el residuo, reutilizar alarga la vida y reciclar recupera el material.",
    ),
    pick("check-circular", "Economía circular", "¿Qué caracteriza a la economía circular?",
      "Los productos se diseñan para durar, repararse y reciclarse, y los materiales vuelven al ciclo",
      [["Los productos se tiran al acabar su uso", "Eso es la economía lineal."], ["Solo se recicla al final", "Empieza en el diseño."], ["Se fabrica más y más barato", "El objetivo es reducir el consumo de recursos."]],
      "Cerrar el círculo reduce las materias primas nuevas y los residuos.",
    ),
  ],
};
