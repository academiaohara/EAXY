import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const hiperbolaAsintotasDt2Lesson: InteractiveLesson = {
  slug: "hiperbola-asintotas-dt2",
  title: "3. La hipérbola: ramas y asíntotas",
  subtitle: DT2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Definición", [
      { kind: "steps", items: [
        "La **hipérbola** es el lugar geométrico de los puntos cuya **diferencia de distancias** a dos puntos fijos (los **focos**) es **constante**: **|PF − PF′| = 2a**.",
        "Consta de **dos ramas** abiertas, una alrededor de cada foco.",
        "Tiene dos **asíntotas**: rectas que pasan por el centro y a las que las ramas se acercan indefinidamente sin tocarlas.",
        "Relación fundamental: **c² = a² + b²** y **e = c/a > 1**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Diferencia constante", [
      { kind: "text", text: "Mueve el punto P a lo largo de la rama y cambia a y b. La diferencia de distancias se mantiene." },
    ], tool("dt2-hiperbola-explorador"), "visual-top"),
    slide("trazado", "Elementos y trazado", [
      { kind: "steps", items: [
        "**Ejes**: el **eje real** (2a), que contiene los focos y los vértices, y el **eje imaginario** (2b), que no corta a la curva.",
        "Las **asíntotas** son las diagonales del rectángulo de lados 2a y 2b: tienen pendiente **±b/a**.",
        "Los **focos** se hallan con la **circunferencia circunscrita** a ese rectángulo, que corta al eje real en F y F′.",
        "**Hipérbola equilátera**: a = b. Las asíntotas son perpendiculares y e = √2. Es la curva de las magnitudes inversamente proporcionales (xy = k).",
      ] },
    ]),
    calc("calc-c", "Distancia focal", "Una hipérbola tiene a = 3 cm y b = 4 cm. ¿Cuánto vale c = √(a² + b²), en cm?", nums(5), "c = √(9 + 16) = 5 cm.", "Suma de cuadrados."),
    calc("calc-e", "Excentricidad", "Con esa hipérbola, ¿cuánto vale e = c/a? (dos decimales)", nums(1.67, 1.6667), "5/3 ≈ 1,67; es mayor que 1, como en toda hipérbola.", "Divide c entre a."),
    calc("calc-dif", "Diferencia de distancias", "En una hipérbola con a = 3 cm, un punto P está a 11 cm de un foco. ¿A qué distancia del otro foco puede estar, si es la mayor de las dos? Recuerda |PF − PF′| = 2a. (en cm)", nums(17, 5), "PF′ = 11 ± 6: 17 cm o 5 cm, según la rama; aquí se acepta cualquiera de las dos.", "La diferencia es 6 cm."),
    sort("clasifica", "Elipse o hipérbola", "Asigna cada propiedad a la cónica que corresponda.",
      [["eli", "Elipse", "cobalt"], ["hip", "Hipérbola", "amber"]],
      [["Suma de distancias constante", "eli"], ["a² = b² + c²", "eli"], ["Curva cerrada", "eli"], ["Diferencia de distancias constante", "hip"], ["c² = a² + b²", "hip"], ["Tiene asíntotas", "hip"], ["e > 1", "hip"]],
      "Suma: elipse; diferencia: hipérbola.",
    ),
    pick("check", "Asíntotas", "¿Qué pendientes tienen las asíntotas de x²/a² − y²/b² = 1?",
      "±b/a",
      [["±a/b", "Está invertida."], ["±1 siempre", "Solo si a = b."], ["No tiene asíntotas", "Sí las tiene."]],
      "Las asíntotas son y = ±(b/a)·x.",
    ),
  ],
};
