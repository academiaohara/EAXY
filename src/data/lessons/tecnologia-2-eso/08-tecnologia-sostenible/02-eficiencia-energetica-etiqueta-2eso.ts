import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const eficienciaEnergeticaEtiqueta2esoLesson: InteractiveLesson = {
  slug: "eficiencia-energetica-etiqueta-2eso",
  title: "2. Eficiencia energética y etiqueta energética",
  subtitle: TECESO2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Hacer lo mismo con menos energía", [
      { kind: "definition", text: "La **eficiencia energética** es conseguir el mismo resultado (luz, frío, movimiento) gastando **menos energía**. Un aparato eficiente aprovecha mejor la energía y desperdicia menos como calor." },
      { kind: "steps", items: [
        "La **etiqueta energética** de la Unión Europea clasifica los aparatos de la **A (más eficiente) a la G (menos)**.",
        "También indica el **consumo anual** en kWh y otros datos (ruido, capacidad).",
        "**Ahorrar** es consumir menos (apagar), **eficiencia** es consumir mejor (elegir aparatos eficientes).",
      ] },
    ], undefined, "stack"),
    slide("compara", "Compara dos aparatos", [
      { kind: "text", text: "Elige dos aparatos que hacen lo mismo y calcula cuánta energía, dinero y CO₂ ahorras al año." },
    ], tool("eso2-etiqueta-energetica-explorador"), "visual-top"),
    slide("habitos", "Hábitos que ahorran", [
      { kind: "text", text: "Pequeños hábitos suman: comprueba cuánto ahorran en un hogar." },
    ], tool("ahorro-energia-explorador", { n: 0 }), "visual-top"),
    calc("calc-led", "Consumo de una bombilla", "Una bombilla LED de 9 W está encendida 4 horas al día. ¿Cuántos kWh consume al año? (E = P · t; 365 días)", nums(13.14), "9 W · 4 h · 365 / 1 000 = 13,14 kWh.", "Pasa los vatios a kW y multiplica por las horas del año."),
    calc("calc-ahorro", "El ahorro anual", "Una bombilla incandescente de 60 W consume 87,6 kWh al año en las mismas condiciones. Si la cambias por la LED (13,14 kWh), ¿cuántos kWh ahorras al año?", nums(74.46), "87,6 − 13,14 = 74,46 kWh.", "Resta los dos consumos."),
    sort("clasifica-ahorro", "Ahorro o eficiencia", "Clasifica cada medida.",
      [["aho", "Ahorro (consumir menos)", "emerald"], ["efi", "Eficiencia (consumir mejor)", "cobalt"]],
      [["Apagar la luz al salir de la habitación", "aho"], ["Desenchufar el cargador sin usar", "aho"], ["Bajar un grado la calefacción", "aho"], ["Cambiar una bombilla por una LED", "efi"], ["Comprar un frigorífico de clase A", "efi"], ["Aislar mejor las ventanas", "efi"]],
      "Ahorrar es usar menos; eficiencia es hacer lo mismo con menos energía.",
    ),
    pick("check-etiqueta", "Leer la etiqueta", "Entre dos lavadoras del mismo tamaño, una de clase A y otra de clase D, ¿cuál consumirá menos energía?",
      "La de clase A",
      [["La de clase D", "La A es la más eficiente."], ["Las dos igual", "La clase indica diferencias de consumo."], ["No se puede saber", "La etiqueta informa exactamente de eso."]],
      "La letra de la etiqueta resume la eficiencia del aparato.",
    ),
  ],
};
