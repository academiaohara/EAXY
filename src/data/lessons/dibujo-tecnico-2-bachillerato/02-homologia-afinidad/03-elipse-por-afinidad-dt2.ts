import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const elipsePorAfinidadDt2Lesson: InteractiveLesson = {
  slug: "elipse-por-afinidad-dt2",
  title: "3. La elipse como afín de la circunferencia",
  subtitle: DT2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una circunferencia aplastada", [
      { kind: "steps", items: [
        "Una **circunferencia** de radio $a$ y su **afín ortogonal** con razón $k = b/a$ (eje: un diámetro; dirección perpendicular) es una **elipse** de semiejes $a$ y $b$.",
        "Cada punto de la circunferencia se **sube o baja** perpendicularmente al eje hasta que su distancia al eje se multiplica por $k$.",
        "Por eso se puede **construir** la elipse con **dos circunferencias concéntricas** de diámetros 2a y 2b (método de las dos circunferencias, que es una afinidad).",
        "Así se obtienen sus propiedades: el **área** de la elipse es $k\\,\\pi a^2 = \\pi a b$.",
      ] },
    ], undefined, "stack"),
    slide("explora", "De la circunferencia a la elipse", [
      { kind: "text", text: "Cambia a y b. Observa cómo cada punto de la circunferencia se desplaza en vertical a su homólogo." },
    ], tool("dt2-elipse-afinidad-explorador"), "visual-top"),
    slide("propiedades", "Elementos de la elipse", [
      { kind: "steps", items: [
        "**Ejes**: mayor (2a) y menor (2b). **Centro**: su punto de corte.",
        "**Focos** $F, F'$: están en el eje mayor a una distancia $c = \\sqrt{a^2 - b^2}$ del centro.",
        "Definición: lugar de los puntos cuya **suma de distancias a los focos es constante** e igual a $2a$.",
        "**Excentricidad** $e = c/a$ (entre 0 y 1): mide lo achatada que es; con $e = 0$ es una circunferencia.",
      ] },
    ]),
    calc("calc-k", "Razón de afinidad", "Una elipse tiene semiejes a = 5 y b = 3 cm. ¿Cuánto vale la razón k = b/a? (un decimal)", nums(0.6), "k = 3/5 = 0,6.", "Divide b entre a."),
    calc("calc-area", "Área", "¿Qué área tiene esa elipse, en cm²? (π·a·b, un decimal)", nums(47.1, 47.12), "π · 5 · 3 ≈ 47,1 cm².", "π a b."),
    calc("calc-foco", "Distancia focal", "¿A qué distancia del centro están sus focos, en cm?", nums(4), "c = √(25 − 9) = 4 cm.", "c² = a² − b²."),
    calc("calc-suma", "Suma de distancias", "Para cualquier punto de esa elipse, la suma de las distancias a los dos focos vale 2a. ¿Cuánto es, en cm?", nums(10), "2 · 5 = 10 cm.", "Es el eje mayor."),
    sort("clasifica-el", "¿Qué elemento?", "Asocia cada descripción con el elemento de la elipse.",
      [["a", "Semieje mayor a", "cobalt"], ["b", "Semieje menor b", "amber"], ["c", "Semidistancia focal c", "emerald"]],
      [["Mitad del diámetro mayor", "a"], ["Radio de la circunferencia afín", "a"], ["Mitad del diámetro menor", "b"], ["Es k · a", "b"], ["Distancia del centro a un foco", "c"], ["√(a² − b²)", "c"]],
      "a es el radio de la circunferencia de partida y b = k·a.",
    ),
    pick("check-ex", "Excentricidad", "¿Qué elipse tiene excentricidad 0?",
      "La circunferencia (a = b)",
      [["Una elipse muy alargada", "Esa tiene excentricidad próxima a 1."], ["Una parábola", "Es otra curva."], ["Un segmento", "Es el caso límite e = 1."]],
      "Con c = 0 los focos coinciden en el centro.",
    ),
  ],
};
