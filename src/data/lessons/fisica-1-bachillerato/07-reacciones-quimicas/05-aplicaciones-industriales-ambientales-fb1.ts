import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const aplicacionesIndustrialesAmbientalesFb1Lesson: InteractiveLesson = {
  slug: "aplicaciones-industriales-ambientales-fb1",
  title: "5. Aplicaciones industriales y ambientales",
  subtitle: FB1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("industria", "La industria química", [
      { kind: "steps", items: [
        "La **industria química** transforma materias primas en productos de uso diario: **abonos**, plásticos, medicamentos, detergentes, combustibles, materiales de construcción.",
        "**Haber-Bosch**: N₂ + 3 H₂ → 2 NH₃ (≈ 450 °C, 200 atm, catalizador de Fe). Base de los **fertilizantes nitrogenados**, que alimentan a buena parte de la humanidad.",
        "**Siderurgia**: en el **alto horno**, el Fe₂O₃ se reduce con CO procedente del **coque**: Fe₂O₃ + 3 CO → 2 Fe + 3 CO₂. El hierro se convierte en **acero**.",
        "**Cemento y cal**: la **calcinación** de la caliza, CaCO₃ → CaO + CO₂, libera CO₂ (≈ 8 % de las emisiones mundiales de CO₂).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Rendimiento y economía atómica", [
      { kind: "text", text: "Elige un proceso y la cantidad de reactivo. Compara el producto teórico y el real, la economía atómica y el CO₂ emitido." },
    ], tool("fb1-industria-explorador"), "visual-top"),
    slide("ambiente", "Impacto ambiental", [
      { kind: "steps", items: [
        "**Combustión** de combustibles fósiles: C + O₂ → CO₂. Emite **CO₂** (gas de efecto invernadero → **cambio climático**), y en combustiones incompletas **CO** y hollín.",
        "**Lluvia ácida**: el SO₂ (del azufre del carbón y el petróleo) y los NOₓ (de motores) se oxidan y con agua dan H₂SO₄ y HNO₃: daña bosques, suelos, lagos y edificios.",
        "**Capa de ozono**: los CFC liberan Cl que destruye el O₃ estratosférico (Protocolo de Montreal).",
        "**Eutrofización** por exceso de fertilizantes en el agua: crecimiento descontrolado de algas y falta de oxígeno.",
      ] },
    ], undefined, "stack"),
    slide("verde", "Química verde y sostenibilidad", [
      { kind: "steps", items: [
        "**Economía atómica** = (masa del producto deseado / masa de todos los reactivos) · 100: valora cuánto se desaprovecha como residuo.",
        "Principios de la **química verde**: prevenir residuos, usar **catalizadores**, disolventes inocuos, **energía renovable** y materias primas renovables, diseñar productos **biodegradables**.",
        "**Reciclaje**: reutilizar materiales ahorra materias primas y energía (reciclar aluminio ahorra ≈ 95 % de la energía respecto a producirlo de la bauxita).",
        "Los **catalizadores** aceleran una reacción **sin consumirse** y permiten trabajar a menor temperatura (ahorro energético).",
      ] },
    ], undefined, "stack"),
    calc("calc-ae", "Economía atómica", "En CaCO₃ → CaO + CO₂ el producto deseado es CaO (56 g/mol) y el reactivo CaCO₃ (100 g/mol). ¿Cuál es la economía atómica, en %?", nums(56), "56/100 · 100 = 56 %.", "Masa deseada / masa de reactivos."),
    calc("calc-co2", "CO₂ emitido", "Al calcinar 1 mol de CaCO₃ (100 g) se libera 1 mol de CO₂. ¿Cuántos kg de CO₂ se emiten al procesar 1000 kg de caliza pura? (CO₂: 44 g/mol)", nums(440), "10 000 mol · 44 g = 440 kg.", "1 mol de CaCO₃ → 1 mol de CO₂."),
    calc("calc-nh3", "Amoníaco", "En N₂ + 3 H₂ → 2 NH₃, ¿cuántos kg de NH₃ se obtienen a partir de 28 kg de N₂ (rendimiento 100 %)? (N 14; H 1)", nums(34), "1000 mol de N₂ → 2000 mol de NH₃ = 34 kg.", "n = 28000/28 = 1000 mol."),
    calc("calc-rend", "Rendimiento industrial", "Un proceso tiene un rendimiento teórico de 500 kg y se obtienen 425 kg. ¿Qué rendimiento tiene, en %?", nums(85), "425/500 · 100 = 85 %.", "Real/teórico."),
    sort("clasifica", "¿Problema o solución?", "Clasifica cada elemento.",
      [["pro", "Problema ambiental", "rose"], ["sol", "Solución o buena práctica", "emerald"]],
      [["Emisión de CO₂ por combustión", "pro"], ["Lluvia ácida", "pro"], ["Uso de catalizadores", "sol"], ["Reciclaje de aluminio", "sol"], ["Eutrofización por abonos", "pro"], ["Alta economía atómica", "sol"]],
      "Piensa si perjudica al entorno o lo protege.",
    ),
    pick("check", "Catalizador", "¿Qué hace un catalizador?",
      "Acelera la reacción sin consumirse",
      [["Aumenta el rendimiento teórico", "No cambia lo que se puede obtener, sino la velocidad."], ["Es un reactivo que se gasta", "No se consume."], ["Disminuye la masa de los productos", "No altera la estequiometría."]],
      "Reduce la energía de activación.",
    ),
  ],
};
