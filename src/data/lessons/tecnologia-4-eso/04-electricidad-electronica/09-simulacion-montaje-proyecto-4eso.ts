import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const simulacionMontajeProyecto4esoLesson: InteractiveLesson = {
  slug: "simulacion-montaje-proyecto-4eso",
  title: "9. Simulación, montaje y comprobación: mini proyecto",
  subtitle: TECESO4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Del esquema al circuito real", [
      { kind: "steps", items: [
        "**1. Especifica** lo que debe hacer (por ejemplo, un intermitente que se activa con poca luz).",
        "**2. Diseña** el esquema y **calcula** los valores de los componentes.",
        "**3. Simula** en el ordenador (Tinkercad, Falstad) y corrige.",
        "**4. Monta** en protoboard y **mide** con el polímetro.",
        "**5. Comprueba** frente a la especificación y **documenta**.",
      ] },
    ], undefined, "stack"),
    slide("proto", "Protoboard", [
      { kind: "text", text: "Comprueba cómo se conectan los componentes en una protoboard." },
    ], tool("eso3-protoboard-explorador"), "visual-top"),
    slide("luz", "Luz automática", [
      { kind: "text", text: "El proyecto: un circuito con LDR, comparador y transistor que enciende una luz al anochecer." },
    ], tool("eso3-luz-automatica-explorador"), "visual-top"),
    slide("osc", "Intermitente con 555", [
      { kind: "text", text: "Añade un oscilador 555 para que la lámpara parpadee. Elige los componentes." },
    ], tool("eso4-555-explorador"), "visual-top"),
    slide("medidas", "Medir y diagnosticar", [
      { kind: "steps", items: [
        "**Tensión** en paralelo, **corriente** en serie, **resistencia** con el circuito sin alimentar.",
        "Si no funciona: revisa **alimentación**, **tierra común**, **polaridad** de diodos y condensadores, y **pines** del CI.",
        "Cambia **una cosa a la vez** y anota lo que ocurre.",
        "**Seguridad**: no se trabaja con la red de 230 V; los montajes se alimentan con pilas o fuentes de baja tensión.",
      ] },
    ]),
    calc("calc-led", "Resistencia del LED", "Un LED rojo (2 V, 20 mA) a 5 V. ¿Qué resistencia, en Ω? ((5−2)/0,02)", nums(150), "3 / 0,02 = 150 Ω.", "Ley de Ohm en la resistencia."),
    calc("calc-pot", "Potencia en la resistencia", "Esa resistencia de 150 Ω con 20 mA, ¿cuántos mW disipa? (I²·R)", nums(60), "0,02² · 150 = 0,06 W = 60 mW.", "Corriente al cuadrado por R."),
    sort("clasifica-fallo", "Diagnóstico", "Relaciona cada síntoma con su causa más probable.",
      [["pol", "Polaridad o conexión", "rose"], ["val", "Valor de un componente", "amber"], ["alm", "Alimentación", "cobalt"]],
      [["El LED no enciende y está al revés", "pol"], ["El condensador electrolítico se calienta", "pol"], ["El 555 parpadea demasiado rápido", "val"], ["El transistor no se satura", "val"], ["Nada funciona, 0 V en el chip", "alm"], ["La pila está agotada", "alm"]],
      "Medir ayuda a localizar el fallo.",
    ),
    pick("check-seg", "Seguridad", "¿Con qué alimentación se montan los circuitos en clase?",
      "Con pilas o fuentes de baja tensión, nunca con la red de 230 V",
      [["Con el enchufe directamente", "Es peligroso."], ["Con cualquier cable pelado", "Nunca."], ["Con la red si se tiene cuidado", "No se trabaja con 230 V en el aula."]],
      "La baja tensión elimina el riesgo de electrocución.",
    ),
  ],
};
