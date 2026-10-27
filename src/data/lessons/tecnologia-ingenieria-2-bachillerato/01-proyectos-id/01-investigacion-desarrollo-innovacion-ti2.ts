import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const investigacionDesarrolloInnovacionTi2Lesson: InteractiveLesson = {
  slug: "investigacion-desarrollo-innovacion-ti2",
  title: "1. Investigación, desarrollo e innovación (I+D+i)",
  subtitle: TECTI2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la idea al mercado", [
      { kind: "steps", items: [
        "**Investigación básica**: genera conocimiento nuevo sin una aplicación inmediata. **Investigación aplicada**: busca resolver un problema concreto.",
        "**Desarrollo**: convierte el conocimiento en prototipos, procesos o productos.",
        "**Innovación**: llevar al mercado o al uso real algo nuevo o mejorado. Puede ser de **producto**, de **proceso**, **organizativa** o de **modelo de negocio**.",
        "Los **niveles de madurez tecnológica (TRL, del 1 al 9)** miden en qué punto está una tecnología: TRL 1–3 ideas y pruebas de laboratorio; 4–6 prototipos y validación; 7–9 demostración y producción.",
        "Hay un **«valle de la muerte»** entre el prototipo y el producto: muchas ideas no logran financiación ni mercado para dar el salto.",
      ] },
    ], undefined, "stack"),
    slide("embudo", "El embudo de la I+D", [
      { kind: "text", text: "De muchas ideas, pocas llegan al mercado. Cambia la tasa de éxito de cada fase y mira el coste por producto lanzado." },
    ], tool("ti2-embudo-explorador"), "visual-top"),
    slide("fuentes", "Fuentes de ideas y de financiación", [
      { kind: "steps", items: [
        "**Ideas**: necesidades de usuarios, problemas del entorno, avances científicos, vigilancia tecnológica (patentes, artículos, ferias).",
        "**Financiación**: fondos propios, **ayudas públicas** (Horizonte Europa, programas estatales y autonómicos), capital riesgo, **crowdfunding**.",
        "**Cooperación**: universidades, centros tecnológicos, empresas y administraciones (modelo de **triple hélice**).",
        "**Protección**: patentes, modelos de utilidad, secreto industrial, licencias abiertas.",
      ] },
    ]),
    slide("necesidad", "Traduce las necesidades", [
      { kind: "text", text: "Ponderar lo que quiere el usuario y traducirlo en características técnicas ayuda a decidir dónde invertir el esfuerzo." },
    ], tool("eso4-casa-calidad-explorador"), "visual-top"),
    calc("calc-proto", "Ideas que pasan", "De 100 ideas, el 30 % supera el estudio de viabilidad. ¿Cuántas llegan a la fase de prototipo?", nums(30), "100 · 0,30 = 30.", "Ideas por tasa de éxito."),
    calc("calc-prod", "Productos finales", "Con tasas del 30 %, 50 %, 60 % y 80 % en las cuatro fases, ¿cuántos productos salen de 100 ideas? (100·0,3·0,5·0,6·0,8, un decimal)", nums(7.2), "100 · 0,072 = 7,2 productos.", "Multiplica las cuatro tasas."),
    calc("calc-coste", "Coste por producto", "La I+D gasta en total 2 050 mil € para obtener 7,2 productos. ¿Cuántos miles de € por producto? (redondea a un entero)", nums(285, 284.7), "2 050 / 7,2 ≈ 285 mil €.", "Gasto total entre productos."),
    sort("clasifica-innov", "¿Qué tipo de innovación?", "Relaciona cada caso con el tipo.",
      [["pro", "De producto", "cobalt"], ["pcs", "De proceso", "amber"], ["org", "Organizativa o de modelo de negocio", "emerald"]],
      [["Un nuevo material más ligero para una bicicleta", "pro"], ["Un teléfono con una función inédita", "pro"], ["Una línea de producción con robots que reduce residuos", "pcs"], ["Un método de soldadura más rápido", "pcs"], ["Pasar de vender un producto a alquilarlo por uso", "org"], ["Equipos autónomos que trabajan por proyectos", "org"]],
      "La innovación no es solo tecnología: también cambia procesos y organizaciones.",
    ),
    pick("check-trl", "TRL", "Un prototipo validado en condiciones de laboratorio, pero no probado en un entorno real, ¿en qué nivel TRL está aproximadamente?",
      "En un TRL intermedio (4–5): falta demostrarlo en un entorno relevante",
      [["TRL 1: solo es una idea", "Ya hay un prototipo."], ["TRL 9: listo para el mercado", "Aún no se ha probado en la realidad."], ["No se puede clasificar", "Los TRL sirven para eso."]],
      "Los TRL ordenan la madurez desde la idea hasta el producto operativo.",
    ),
  ],
};
