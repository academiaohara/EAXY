import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const eficienciaEnergeticaCogeneracionTi2Lesson: InteractiveLesson = {
  slug: "eficiencia-energetica-cogeneracion-ti2",
  title: "2. Eficiencia energética y cogeneración",
  subtitle: TECTI2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "La energía más limpia es la que no se gasta", [
      { kind: "steps", items: [
        "**Eficiencia energética**: obtener el mismo servicio (luz, calor, movimiento) con **menos energía**.",
        "Se mejora en tres frentes: **ahorrar** (no usar lo innecesario), **mejorar los equipos** (mayor rendimiento) y **recuperar** la energía que se pierde.",
        "Casi toda la energía que se pierde sale como **calor**. Aprovecharlo es la clave de la eficiencia en industria y edificios.",
        "La eficiencia se mide con el **rendimiento** $\\eta = \\dfrac{\\text{energía útil}}{\\text{energía consumida}}$ y con el **ahorro** frente a una referencia.",
      ] },
    ], undefined, "stack"),
    slide("cogen", "Cogeneración", [
      { kind: "text", text: "Una central eléctrica pierde más de la mitad del combustible en calor. La cogeneración lo aprovecha." },
    ], tool("ti2-cogeneracion-explorador"), "visual-top"),
    slide("medidas", "Dónde se ahorra", [
      { kind: "steps", items: [
        "**Edificios**: aislamiento, ventanas de doble vidrio, bomba de calor, iluminación LED y control inteligente de la climatización.",
        "**Industria**: motores de alta eficiencia con variadores de frecuencia, recuperación del calor de procesos y aire comprimido sin fugas.",
        "**Transporte**: vehículos eléctricos, transporte colectivo y frenada regenerativa.",
        "Antes de invertir, una **auditoría energética** mide dónde está el consumo y qué medidas **se amortizan** antes.",
      ] },
    ]),
    calc("calc-comb", "Combustible necesario", "Una central con rendimiento eléctrico del 40 % debe producir 100 kWh. ¿Cuántos kWh de combustible consume?", nums(250), "100 / 0,40 = 250 kWh.", "Energía útil entre rendimiento."),
    calc("calc-global", "Rendimiento global", "Una planta de cogeneración convierte el 35 % del combustible en electricidad y el 45 % en calor útil. ¿Qué rendimiento global tiene, en %?", nums(80), "35 + 45 = 80 %.", "Suma lo aprovechado."),
    calc("calc-ahorro", "Ahorro de energía primaria", "Con esos datos, producir lo mismo por separado (central al 50 % y caldera al 90 %) exige 0,35/0,50 + 0,45/0,90 = 1,2 de combustible por cada 1 de cogeneración. ¿Qué porcentaje se ahorra? (1 − 1/1,2, un decimal)", nums(16.7, 16.67), "1 − 0,8333 = 0,1667: un 16,7 % menos de combustible.", "Calcula 1/1,2 y réstalo de 1."),
    sort("clasifica-ahorro", "¿Qué tipo de medida es?", "Clasifica cada actuación.",
      [["aho", "Ahorrar", "cobalt"], ["equ", "Mejorar el equipo", "amber"], ["rec", "Recuperar", "emerald"]],
      [["Apagar la iluminación de una nave vacía", "aho"], ["Aislar mejor un edificio", "aho"], ["Cambiar un motor por otro de mayor rendimiento", "equ"], ["Sustituir bombillas por LED", "equ"], ["Usar el calor de los humos para precalentar agua", "rec"], ["Cogeneración con aprovechamiento del calor", "rec"]],
      "Ahorrar reduce la demanda, mejorar equipos aumenta el rendimiento y recuperar reutiliza lo que se perdería.",
    ),
    pick("check-cogen", "Cuándo compensa", "¿Cuándo tiene sentido instalar una planta de cogeneración?",
      "Cuando hay una demanda de calor constante y cercana que aprovechar",
      [["Cuando solo se necesita electricidad", "Entonces no se aprovecha el calor."], ["Cuando el calor no se puede transportar ni usar", "Se desperdicia y no ahorra."], ["Siempre, sea cual sea la demanda", "Sin demanda de calor pierde su ventaja."]],
      "Su ventaja es el calor útil; sin demanda de calor, no compensa.",
    ),
  ],
};
