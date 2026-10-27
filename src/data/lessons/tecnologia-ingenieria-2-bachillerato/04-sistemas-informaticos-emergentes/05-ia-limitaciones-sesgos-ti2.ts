import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const iaLimitacionesSesgosTi2Lesson: InteractiveLesson = {
  slug: "ia-limitaciones-sesgos-ti2",
  title: "5. Limitaciones y sesgos de la inteligencia artificial",
  subtitle: TECTI2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una IA no es infalible", [
      { kind: "steps", items: [
        "Un modelo solo conoce lo que había en sus **datos de entrenamiento**: fuera de ellos puede fallar sin avisar.",
        "**Sesgo**: si los datos no representan a todos los grupos o reflejan prejuicios, el modelo los **reproduce y los amplifica**.",
        "**Sobreajuste**: el modelo memoriza los ejemplos en lugar de generalizar y falla con casos nuevos.",
        "**Alucinaciones**: los modelos generativos pueden producir texto o imágenes verosímiles pero falsos.",
        "**Opacidad**: en redes profundas es difícil explicar por qué se llega a un resultado (**explicabilidad**).",
      ] },
    ], undefined, "stack"),
    slide("conf", "Cuando el acierto engaña", [
      { kind: "text", text: "Un detector con un 95 % de sensibilidad y de especificidad parece excelente. Cambia la prevalencia y mira cuántas de sus alarmas son reales." },
    ], tool("ti2-confusion-explorador"), "visual-top"),
    slide("met", "Métricas para evaluar", [
      { kind: "steps", items: [
        "**Exactitud**: aciertos totales entre casos totales. Engaña si las clases están desequilibradas.",
        "**Sensibilidad (recall)**: de los casos positivos, cuántos detecta.",
        "**Precisión**: de las alarmas que da, cuántas son reales.",
        "Se evalúa siempre con **datos que el modelo no ha visto** (conjunto de prueba).",
        "Se estudian los errores **por grupos** para detectar discriminación.",
      ] },
    ]),
    calc("calc-fp", "Falsos positivos", "Con 10 000 casos, una prevalencia del 1 % y una especificidad del 95 %, ¿cuántos falsos positivos hay? (9 900·0,05)", nums(495), "Hay 9 900 negativos y se equivoca en el 5 %: 495.", "Negativos por (1 − especificidad)."),
    calc("calc-tp", "Verdaderos positivos", "Con 100 casos positivos y una sensibilidad del 95 %, ¿cuántos detecta?", nums(95), "100 · 0,95 = 95.", "Positivos por sensibilidad."),
    calc("calc-prec", "Precisión", "Con 95 verdaderos positivos y 495 falsos positivos, ¿qué porcentaje de las alarmas son reales? (95/590, redondea a un entero)", nums(16, 16.1), "95 / 590 ≈ 0,16 = 16 %.", "Verdaderos positivos entre todas las alarmas."),
    sort("clasifica-lim", "¿Qué problema es?", "Relaciona cada situación con el problema.",
      [["ses", "Sesgo de los datos", "rose"], ["sob", "Sobreajuste", "amber"], ["alu", "Alucinación", "cobalt"]],
      [["Un sistema de selección funciona peor con un grupo poco representado", "ses"], ["Aprende prejuicios de datos históricos", "ses"], ["Acierta el 100 % con los ejemplos y falla con casos nuevos", "sob"], ["Memoriza en vez de generalizar", "sob"], ["Inventa una cita que no existe con total seguridad", "alu"], ["Describe un hecho falso de forma convincente", "alu"]],
      "Cada problema tiene una causa distinta y requiere una medida distinta.",
    ),
    pick("check-sesgo", "El origen del sesgo", "Un sistema de reconocimiento facial falla más con personas de piel oscura. ¿Cuál es la causa más probable?",
      "Los datos de entrenamiento tenían pocos ejemplos de esas personas",
      [["La IA tiene prejuicios propios", "Aprende de los datos que recibe."], ["La cámara no funciona", "El fallo es sistemático."], ["Es imposible de corregir", "Se corrige con datos más representativos."]],
      "El sesgo suele venir de los datos y de cómo se diseñó el sistema.",
    ),
  ],
};
