import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const variablesLeyesGasesFb1Lesson: InteractiveLesson = {
  slug: "variables-leyes-gases-fb1",
  title: "1. Variables de estado y leyes de los gases",
  subtitle: FB1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("cinetica", "El modelo cinético de los gases", [
      { kind: "steps", items: [
        "Un **gas** son partículas muy separadas, en **movimiento caótico** y continuo, que chocan entre sí y con las paredes. **No tienen forma ni volumen propios**: ocupan todo el recipiente.",
        "La **presión** es consecuencia de los **choques** de las partículas con las paredes (fuerza por unidad de superficie).",
        "La **temperatura** es una medida de la **energía cinética media** de las partículas: a más temperatura, más rápido se mueven.",
        "Se pueden **comprimir** y **expandir** fácilmente porque hay mucho espacio vacío entre partículas.",
      ] },
    ], anim("fb1-gas-particulas"), "visual-top"),
    slide("variables", "Variables de estado", [
      { kind: "steps", items: [
        "**Presión P**: unidades **Pa** (SI), **atm**, **mmHg** (torr), **bar**. 1 atm = 101 325 Pa = 760 mmHg = 1,013 bar.",
        "**Volumen V**: m³, **L**, mL. 1 m³ = 1000 L. **Temperatura T**: en las leyes **siempre en kelvin**: T(K) = t(°C) + 273,15.",
        "**Cantidad de gas n**: moles (n = m/M).",
        "**Condiciones normales (CN)**: 0 °C (273 K) y 1 atm. En ellas, **1 mol de gas ideal ocupa 22,4 L**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Las cuatro leyes", [
      { kind: "text", text: "Elige una ley y cambia la variable. Observa qué le ocurre a la otra. ¿Cuál es la que se mantiene constante?" },
    ], tool("fb1-leyes-gases-explorador"), "visual-top"),
    slide("leyes", "Resumen de leyes", [
      { kind: "steps", items: [
        "**Boyle** (T y n constantes): **P₁·V₁ = P₂·V₂**. Presión y volumen son inversamente proporcionales; la gráfica P–V es una **hipérbola**.",
        "**Charles** (P y n constantes): **V₁/T₁ = V₂/T₂**. El volumen es proporcional a la temperatura en kelvin; recta que pasa por el origen. **Gay-Lussac** (V y n constantes): **P₁/T₁ = P₂/T₂**.",
        "**Avogadro** (P y T constantes): **V₁/n₁ = V₂/n₂**. Volúmenes iguales de gases, en las mismas condiciones, contienen el **mismo número de moléculas**.",
        "**Ley combinada**: **P₁·V₁/T₁ = P₂·V₂/T₂** (n constante).",
      ] },
    ], undefined, "stack"),
    calc("calc-k", "Kelvin", "¿Cuántos kelvin son 27 °C? (K = °C + 273)", nums(300), "27 + 273 = 300 K.", "K = °C + 273."),
    calc("calc-boyle", "Boyle", "Un gas ocupa 6 L a 1 atm. Se comprime a T constante hasta 2 L. ¿Cuánta presión tiene, en atm?", nums(3), "P₂ = P₁V₁/V₂ = 1·6/2 = 3 atm.", "P₁V₁ = P₂V₂."),
    calc("calc-charles", "Charles", "Un gas ocupa 10 L a 300 K. A presión constante se calienta hasta 450 K. ¿Cuánto vale su volumen, en L?", nums(15), "V₂ = V₁·T₂/T₁ = 10·450/300 = 15 L.", "V/T = constante."),
    calc("calc-gay", "Gay-Lussac", "Un gas a 2 atm y 300 K, en un recipiente rígido, se calienta hasta 600 K. ¿Cuál es su nueva presión, en atm?", nums(4), "P₂ = 2·600/300 = 4 atm.", "P/T = constante."),
    calc("calc-comb", "Ley combinada", "Un gas a 1 atm, 10 L y 300 K pasa a 2 atm y 600 K. ¿Cuál es su volumen final, en L?", nums(10), "V₂ = 1·10·600/(300·2) = 10 L.", "P₁V₁/T₁ = P₂V₂/T₂."),
    sort("clasifica", "¿Qué ley es?", "Relaciona cada fenómeno con la ley que lo explica.",
      [["boy", "Boyle", "cobalt"], ["cha", "Charles", "emerald"], ["gay", "Gay-Lussac", "rose"], ["avo", "Avogadro", "amber"]],
      [["Una jeringa tapada se comprime y cuesta más empujar", "boy"], ["Un globo se hincha al acercarlo a una estufa", "cha"], ["Una olla a presión aumenta su presión al calentarse", "gay"], ["Al inflar un balón entra más gas y aumenta su volumen", "avo"], ["Las burbujas crecen al subir a la superficie", "boy"], ["Un neumático se desinfla un poco con el frío", "gay"]],
      "Mira qué variables cambian y cuáles se mantienen.",
    ),
    pick("check", "Temperatura", "¿Por qué hay que usar kelvin en las leyes de los gases?",
      "Porque las leyes relacionan proporcionalmente V o P con T, y eso solo ocurre con la escala absoluta",
      [["Porque los grados Celsius no existen", "Existen, pero no son una escala absoluta."], ["Porque el kelvin es una unidad del SI de presión", "Es de temperatura."], ["Por costumbre, no importa", "Con °C el resultado sería erróneo."]],
      "0 K es el cero absoluto: V y P serían proporcionales a T solo con esa escala.",
    ),
  ],
};
