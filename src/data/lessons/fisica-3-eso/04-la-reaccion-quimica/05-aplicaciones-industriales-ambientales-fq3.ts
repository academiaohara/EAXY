import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const aplicacionesIndustrialesAmbientalesFq3Lesson: InteractiveLesson = {
  slug: "aplicaciones-industriales-ambientales-fq3",
  title: "5. Aplicaciones industriales y ambientales",
  subtitle: FQ3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "La química en la industria", [
      { kind: "steps", items: [
        "Muchos productos de uso diario salen de **reacciones químicas industriales**: **fertilizantes**, **plásticos**, **medicamentos**, **detergentes**, **cemento**.",
        "El **amoniaco** (N₂ + 3 H₂ → 2 NH₃, proceso Haber-Bosch) se usa para fabricar **fertilizantes** y permite alimentar a miles de millones de personas.",
        "La **cal** (CaO) y el **cemento** se obtienen calentando **caliza** (CaCO₃), reacción que además **emite CO₂**.",
        "Los **catalizadores** y el control de la **temperatura** y la **concentración** permiten obtener más producto, más rápido y con menos gasto.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cuánto CO₂ se emite", [
      { kind: "text", text: "Elige un combustible y una masa. ¿Cuántos kilos de CO₂ se emiten al quemarlo?" },
    ], tool("fq3-emisiones-combustion-explorador"), "visual-top"),
    slide("amb", "Impacto ambiental", [
      { kind: "steps", items: [
        "La combustión de **combustibles fósiles** emite **CO₂**, un gas de **efecto invernadero**: contribuye al **cambio climático**.",
        "Si la combustión es **incompleta** se forma **CO**, un gas **tóxico**, o carbono (hollín).",
        "Los óxidos de **azufre** y de **nitrógeno** causan la **lluvia ácida**.",
        "La **química verde** busca procesos que **ahorren energía**, usen **menos residuos** y materias primas **renovables**.",
      ] },
    ]),
    calc("calc-ch4", "CO₂ del metano", "Al quemar 16 g de metano (CH₄ + 2 O₂ → CO₂ + 2 H₂O) se forman 44 g de CO₂. ¿Cuántos gramos de CO₂ se forman al quemar 160 g de metano?", nums(440), "Es 10 veces más: 440 g.", "Proporcionalidad directa."),
    calc("calc-c", "CO₂ del carbón", "Al quemar 12 g de carbono se forman 44 g de CO₂. ¿Cuántos kg de CO₂ salen al quemar 1 kg de carbono? (redondea a un decimal)", nums(3.7, 3.67), "44 / 12 ≈ 3,67 kg.", "Divide 44 entre 12."),
    calc("calc-mas", "Masa del CO₂", "El CO₂ emitido, ¿pesa más (1) o menos (2) que el combustible quemado? Escribe 1 o 2.", nums(1), "Pesa más porque incorpora el oxígeno del aire.", "Un kilo de metano produce 2,75 kg de CO₂."),
    sort("clasifica", "Beneficio o impacto", "Clasifica cada hecho.",
      [["be", "Aporte de la química", "emerald"], ["im", "Impacto ambiental", "rose"]],
      [["Los fertilizantes aumentan las cosechas", "be"], ["Los medicamentos curan enfermedades", "be"], ["Los catalizadores de los coches reducen gases tóxicos", "be"], ["La quema de fósiles emite CO₂", "im"], ["Algunos gases producen lluvia ácida", "im"], ["Los plásticos mal gestionados se acumulan", "im"]],
      "La química tiene ventajas, pero hay que controlar sus residuos y emisiones.",
    ),
    pick("check", "Más CO₂ que combustible", "¿Por qué al quemar 1 kg de gasolina se emiten más de 3 kg de CO₂?",
      "Porque el carbono se combina con el oxígeno del aire",
      [["Porque se crea masa", "No se crea masa."], ["Porque la gasolina pesa más al arder", "El oxígeno viene del aire."], ["Porque el CO₂ es muy denso", "Es cuestión de masa, no de densidad."]],
      "Conservación de la masa: la masa total de productos incluye el oxígeno.",
    ),
  ],
};
