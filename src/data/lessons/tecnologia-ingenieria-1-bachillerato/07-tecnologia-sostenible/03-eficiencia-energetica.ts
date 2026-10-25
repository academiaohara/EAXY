import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const eficienciaEnergeticaLesson: InteractiveLesson = {
  slug: "eficiencia-energetica",
  title: "3. Eficiencia energética",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Energía útil y pérdidas", [
      { kind: "definition", text: "La **eficiencia energética** es lograr el mismo servicio (luz, calor, movimiento) con **menos energía**. Se mide con el rendimiento: energía útil entre energía consumida." },
      { kind: "formula", tex: "\\eta = \\dfrac{E_{\\text{útil}}}{E_{\\text{consumida}}}\\qquad E_{\\text{pérdidas}} = E_{\\text{consumida}} - E_{\\text{útil}}" },
      { kind: "example", title: "Bombillas para dar la misma luz", lines: [
        { math: "\\text{incandescente 60 W: }\\ \\eta \\approx 5\\,\\%\\ \\text{(el resto es calor)}" },
        { math: "\\text{LED 9 W: }\\ \\eta \\approx 30\\,\\%" },
      ] },
    ], undefined, "stack"),
    slide("edificio", "Un edificio virtual", [
      { kind: "text", text: "Cambia el aislamiento, las ventanas, la temperatura de consigna y la iluminación. ¿Qué medida reduce más el consumo? ¿Y cuál es más barata de aplicar?" },
    ], tool("edificio-eficiencia-explorador", { a: 0, b: 1.4, c: 21 }), "visual-top"),
    slide("medidas", "Medidas de ahorro energético", [
      { kind: "steps", items: [
        "**Aislamiento** de muros, cubierta y ventanas: reduce la pérdida de calor $Q = U\\,A\\,\\Delta T$.",
        "**Iluminación LED** y aprovechamiento de la luz natural.",
        "**Motores y electrodomésticos eficientes** (etiqueta A–G), con variadores de velocidad.",
        "**Control**: termostatos programables, sensores de presencia.",
        "**Hábitos**: bajar 1 °C la calefacción reduce el consumo alrededor de un 7 %.",
      ] },
    ]),
    slide("etiqueta", "Etiquetado energético", [
      { kind: "text", text: "La etiqueta energética de electrodomésticos (de A a G) permite comparar la eficiencia. Pero conviene mirar el **consumo anual (kWh)**: un aparato A muy grande puede gastar más que uno B pequeño." },
    ]),
    calc("calc-eta", "Rendimiento", "Una caldera consume $100$ kWh de gas y entrega $90$ kWh de calor. ¿Cuál es su rendimiento, en %?",
      nums(90), "$\\eta = 90/100 = 0{,}90 = 90\\,\\%$. Se pierden 10 kWh por los humos y las paredes.", "Útil entre consumida."),
    calc("calc-led", "Ahorro con LED", "En una casa hay $12$ puntos de luz de halógena de $50$ W que se cambian por LED de $7$ W. Con $4$ h diarias, ¿cuántos kWh se ahorran al año? (redondea a la unidad)",
      nums(753, 753.4, 753.36), "Ahorro por punto: $43$ W. $12\\cdot 43\\ \\text{W}\\cdot 4\\ \\text{h}\\cdot 365/1000 = 753{,}4$ kWh.", "Resta potencias y multiplica por horas."),
    sort("clasifica-medida", "¿Qué reduce las pérdidas?", "Decide qué medidas reducen el consumo y cuáles lo aumentan.",
      [["red", "Reduce el consumo", "emerald"], ["aum", "Aumenta el consumo", "amber"]],
      [["Aislar el desván", "red"], ["Cambiar ventanas de vidrio simple por doble", "red"], ["Programar el termostato por franjas", "red"], ["Dejar ventanas abiertas con la calefacción", "aum"], ["Mantener 24 °C en invierno", "aum"], ["Dejar aparatos en espera todo el día", "aum"]],
      "Menos pérdidas de calor y mejor control reducen el consumo; abrir, sobrecalentar y mantener en espera lo aumentan.",
    ),
    pick("check-prioridad", "Qué hacer primero", "Una vivienda mal aislada quiere ahorrar energía en calefacción. ¿Qué es lo más razonable empezar por hacer?",
      "Reducir las pérdidas (aislar, cerrar rendijas) antes de cambiar el equipo de calefacción",
      [["Comprar una caldera más grande", "Más potencia no soluciona que el calor se escape."], ["Dejar la calefacción encendida siempre", "Gasta más y las pérdidas siguen."], ["Poner más lámparas", "No tiene que ver con la calefacción."]],
      "Primero se reduce la demanda (aislar), luego se mejora el equipo y por último se cubre lo restante con renovables.",
    ),
  ],
};
