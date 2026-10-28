import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const mecanismosCotidianosBicicletaLesson: InteractiveLesson = {
  slug: "mecanismos-cotidianos-bicicleta",
  title: "7. Aplicaciones cotidianas de los mecanismos",
  subtitle: TECESO1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("cadena", "Entrada, transmisión y salida", [
      { kind: "text", text: "Casi toda máquina tiene una **entrada** de movimiento, una **transmisión** y una **salida**. Observa la cadena de un limpiaparabrisas." },
    ], anim("transmision-flujo"), "text-top"),
    slide("lista", "Mecanismos de casa", [
      { kind: "steps", items: [
        "**Tijeras, alicates, cascanueces**: palancas.",
        "**Persiana, grúa, pozo**: poleas y tornos.",
        "**Batidora, taladro, reloj**: engranajes.",
        "**Bicicleta, moto**: cadena y piñones, y rueda y eje.",
        "**Abrelatas, grifo, tapón de rosca**: tornillo y rueda con eje.",
        "**Caja de cambios del coche**: trenes de engranajes.",
      ] },
    ]),
    slide("bici", "La bicicleta, una máquina completa", [
      { kind: "text", text: "Los pedales hacen girar el **plato**; la **cadena** transmite el giro al **piñón**, que mueve la **rueda trasera**. Cambia de plato y de piñón y observa cuánto avanzas por cada pedalada." },
    ], tool("bici-marchas-explorador", { n: 1, a: 4 }), "visual-top"),
    slide("marchas", "Elegir marcha", [
      { kind: "rule", title: "Avance por pedalada", formula: "\\text{avance} = \\dfrac{z_{\\text{plato}}}{z_{\\text{piñón}}} \\cdot \\pi \\cdot D_{\\text{rueda}}" },
      { kind: "text", text: "Con **plato grande y piñón pequeño** avanzas mucho por pedalada (marcha dura). Con **plato pequeño y piñón grande** avanzas poco y pedaleas con facilidad (marcha ligera): ideal para subir cuestas." },
    ]),
    calc("calc-bici", "Vueltas de rueda", "Una bicicleta tiene un plato de 48 dientes y un piñón de 12. ¿Cuántas vueltas da la rueda trasera por cada vuelta de pedal?",
      nums(4), "i = 48 ÷ 12 = 4 vueltas de rueda por pedalada.", "Divide los dientes del plato entre los del piñón."),
    sort("clasifica-mec", "¿Qué mecanismo usa?", "Relaciona cada objeto con su mecanismo principal.",
      [["pal", "Palanca", "cobalt"], ["pol", "Polea", "amber"], ["eng", "Engranajes", "emerald"], ["rue", "Rueda y eje", "violet"]],
      [["Cascanueces", "pal"], ["Tijeras", "pal"], ["Persiana enrollable", "pol"], ["Grúa de obra", "pol"], ["Batidora de varillas", "eng"], ["Reloj de agujas", "eng"], ["Grifo de volante", "rue"], ["Volante de un coche", "rue"]],
      "Cada objeto resuelve su necesidad con un mecanismo concreto: palancas para mover cargas con poca fuerza, poleas para elevar, engranajes para transmitir giros y rueda con eje para multiplicar fuerza.",
    ),
    pick("check-subir", "Marcha para una cuesta", "Vas a subir una cuesta empinada en bicicleta. ¿Qué combinación eliges?",
      "Plato pequeño y piñón grande, para pedalear con facilidad",
      [["Plato grande y piñón pequeño", "Es la marcha más dura: te costaría muchísimo."], ["Cualquiera, da igual", "La marcha determina la fuerza que debes hacer."], ["Quitar la cadena", "Sin cadena no avanzarías."]],
      "Una marcha ligera avanza menos por pedalada, pero requiere menos fuerza: lo que necesitas cuesta arriba.",
    ),
  ],
};
