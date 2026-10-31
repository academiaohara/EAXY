import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const muellesHookeFb1Lesson: InteractiveLesson = {
  slug: "muelles-hooke-fb1",
  title: "4. Fuerzas elásticas y dinámica circular",
  subtitle: FB1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("hooke", "Ley de Hooke", [
      { kind: "steps", items: [
        "Un muelle deformado una longitud **x** respecto a su posición natural ejerce una fuerza **F = −k·x** (**ley de Hooke**), siempre hacia la posición de equilibrio.",
        "**k** es la **constante elástica** (N/m): cuanto mayor, más rígido. Se mide con **F/x**; la gráfica F–x es una recta de pendiente k.",
        "Es válida dentro del **límite elástico**; más allá, la deformación es permanente o el muelle se rompe.",
        "**Asociaciones**: en **paralelo** k = k₁ + k₂; en **serie** 1/k = 1/k₁ + 1/k₂.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Muelles en acción", [
      { kind: "text", text: "Cuelga una masa de un muelle, o de dos en serie o en paralelo. Mira el alargamiento, la energía almacenada y el periodo." },
    ], tool("fb1-muelle-explorador"), "visual-top"),
    slide("circ", "Dinámica del movimiento circular", [
      { kind: "steps", items: [
        "Para que un cuerpo describa una circunferencia, la resultante debe apuntar al centro: **fuerza centrípeta F_c = m·aₙ = m·v²/R = m·ω²·R**. No es una fuerza nueva, es la **resultante radial** de las que hay.",
        "**Curva horizontal**: la centrípeta la da el **rozamiento**: μ·m·g ≥ m·v²/R → **v_máx = √(μ·g·R)**.",
        "**Curva peraltada** (sin rozamiento): **tg α = v²/(g·R)**. **Satélite**: la centrípeta es la gravitatoria. **Péndulo cónico**, **vuelta en la noria**, **cuerpo atado a una cuerda**…",
        "En el **punto más bajo** de una trayectoria circular vertical: T − m·g = m·v²/R; en el **más alto**: T + m·g = m·v²/R.",
      ] },
    ], undefined, "stack"),
    slide("eq", "Estática", [
      { kind: "steps", items: [
        "Un cuerpo está en **equilibrio estático** si **ΣF = 0** (y el momento resultante es nulo). Se resuelve igual: componentes en x e y.",
        "**Cuerpo colgado de dos cuerdas**: las componentes horizontales se anulan y las verticales soportan el peso: T₁·sen α₁ + T₂·sen α₂ = m·g.",
        "**Momento de una fuerza** respecto a un punto: **M = F·d** (d = brazo, distancia perpendicular). **Palanca en equilibrio**: **F₁·d₁ = F₂·d₂**.",
      ] },
    ], undefined, "stack"),
    calc("calc-k", "Constante elástica", "Un muelle se alarga 5 cm al colgar una masa de 0,5 kg. ¿Cuál es su k, en N/m? (g = 10 m/s²)", nums(100), "k = 5 N/0,05 m = 100 N/m.", "k = F/x."),
    calc("calc-x", "Alargamiento", "¿Cuántos cm se alarga un muelle de 200 N/m con una fuerza de 10 N?", nums(5), "x = 10/200 = 0,05 m = 5 cm.", "x = F/k."),
    calc("calc-vmax", "Velocidad máxima en curva", "Una curva plana de 40 m de radio tiene μ = 0,4. ¿Cuál es la velocidad máxima sin derrapar, en m/s? (g = 10 m/s²)", nums(12.65, 12.6, 12.7), "v = √(0,4·10·40) = √160 ≈ 12,65 m/s.", "v = √(μ g R)."),
    calc("calc-palanca", "Palanca", "Una fuerza de 50 N a 1,2 m del punto de apoyo equilibra una carga a 0,3 m. ¿Cuánto vale la carga, en N?", nums(200), "50·1,2 = F·0,3 → F = 200 N.", "F₁d₁ = F₂d₂."),
    sort("clasifica", "Serie o paralelo", "¿A qué asociación corresponde cada afirmación?",
      [["ser", "Serie", "cobalt"], ["par", "Paralelo", "emerald"]],
      [["Misma fuerza en cada muelle", "ser"], ["Misma deformación en cada muelle", "par"], ["k equivalente menor que cada k", "ser"], ["k equivalente es la suma", "par"], ["El conjunto es más blando", "ser"], ["El conjunto es más rígido", "par"]],
      "Serie: se suman las flexibilidades; paralelo: se suman las rigideces.",
    ),
    pick("check", "Fuerza centrípeta", "¿Qué es la fuerza centrípeta?",
      "La resultante de las fuerzas dirigidas hacia el centro de la trayectoria",
      [["Una fuerza que se suma a las demás", "No es una interacción nueva."], ["La reacción a la fuerza centrífuga", "La centrífuga es un efecto inercial."], ["Una fuerza tangente a la trayectoria", "Es normal (radial)."]],
      "F_c = m·v²/R es la suma radial de las fuerzas reales.",
    ),
  ],
};
