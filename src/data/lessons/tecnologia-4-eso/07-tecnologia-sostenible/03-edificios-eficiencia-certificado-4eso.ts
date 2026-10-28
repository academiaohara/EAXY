import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const edificiosEficienciaCertificado4esoLesson: InteractiveLesson = {
  slug: "edificios-eficiencia-certificado-4eso",
  title: "3. Ahorro energético en edificios y certificado energético",
  subtitle: TECESO4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un edificio eficiente", [
      { kind: "steps", items: [
        "Una buena parte de la energía se gasta en **climatizar edificios**.",
        "Primero se **reduce la demanda**: aislamiento, ventanas de doble vidrio, orientación y protección solar.",
        "Después se mejora el **sistema**: calderas de condensación, **bombas de calor**, suelo radiante.",
        "Por último se cubre lo que falta con **renovables** (solar, biomasa).",
        "El **certificado energético** califica de **A** (más eficiente) a **G** una vivienda y es obligatorio para vender o alquilar.",
      ] },
    ], undefined, "stack"),
    slide("aisl", "Cuánto calor se escapa", [
      { kind: "text", text: "Añade aislante a un muro y mira cuánto baja la pérdida." },
    ], tool("eso3-aislamiento-explorador"), "visual-top"),
    slide("cert", "La etiqueta energética", [
      { kind: "text", text: "Reduce la demanda con aislamiento, cambia el sistema de calefacción y mira cómo mejora la letra." },
    ], tool("eso4-certificado-explorador"), "visual-top"),
    slide("bomba", "La bomba de calor", [
      { kind: "steps", items: [
        "Una **bomba de calor** mueve calor del exterior al interior con un ciclo de refrigeración.",
        "Su **COP** (coeficiente de rendimiento) mide cuántos kWh de calor da por cada kWh eléctrico: 3–4 es habitual.",
        "Por eso es mucho más eficiente que una resistencia eléctrica (COP = 1) o una caldera (rendimiento ≈ 0,9).",
        "Funciona mejor con **menos diferencia de temperatura** entre exterior e interior.",
      ] },
    ]),
    calc("calc-cons", "Consumo final", "Una vivienda con demanda de 150 kWh/m²·año reduce un 40 % con aislamiento y se calienta con una bomba de calor de COP 3,5. ¿Qué consumo final tiene, en kWh/m²·año? (150·0,6/3,5, redondea a un entero)", nums(26, 25.7), "90 / 3,5 ≈ 25,7 kWh/m²·año.", "Demanda tras aislar entre el rendimiento."),
    calc("calc-cop", "COP", "Una bomba de calor consume 1 kWh eléctrico y entrega 3,5 kWh de calor. ¿Cuánto vale su COP?", nums(3.5), "3,5 / 1 = 3,5.", "Calor entregado entre energía consumida."),
    calc("calc-ah", "Ahorro", "Pasar de 160 a 40 kWh/m²·año en una vivienda de 80 m². ¿Cuántos kWh se ahorran al año? ((160 − 40)·80)", nums(9600), "120 · 80 = 9 600 kWh.", "Diferencia por superficie."),
    sort("clasifica-med", "Reducir demanda o mejorar sistema", "Clasifica cada medida.",
      [["dem", "Reduce la demanda", "emerald"], ["sis", "Mejora el sistema", "cobalt"]],
      [["Aislar las paredes", "dem"], ["Ventanas con doble vidrio", "dem"], ["Toldos y orientación", "dem"], ["Bomba de calor", "sis"], ["Caldera de condensación", "sis"], ["Termostato programable", "sis"]],
      "Se empieza por reducir lo que se necesita.",
    ),
    pick("check-orden", "Por dónde empezar", "Para mejorar una vivienda poco eficiente, ¿por dónde se empieza?",
      "Por reducir la demanda (aislar), antes de cambiar el sistema de calefacción",
      [["Por poner paneles", "Es más rentable aislar primero."], ["Por cambiar el sofá", "No influye."], ["Por subir la calefacción", "Aumenta el consumo."]],
      "Un sistema eficiente en una casa que pierde calor sigue gastando mucho.",
    ),
  ],
};
