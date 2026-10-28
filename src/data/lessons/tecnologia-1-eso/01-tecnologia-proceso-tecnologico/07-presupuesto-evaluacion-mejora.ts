import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const presupuestoEvaluacionMejoraLesson: InteractiveLesson = {
  slug: "presupuesto-evaluacion-mejora",
  title: "7. Presupuesto, evaluación y propuestas de mejora",
  subtitle: TECESO1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("presupuesto", "Elaborar un presupuesto sencillo", [
      { kind: "definition", text: "Un **presupuesto** es la estimación del coste de un proyecto: lo que se va a gastar en materiales, herramientas y otros recursos." },
      { kind: "rule", title: "Coste de un material", formula: "\\text{coste} = \\text{cantidad} \\times \\text{precio unitario}" },
      { kind: "text", text: "El total es la **suma de los costes** de todos los materiales. Conviene añadir un pequeño margen (por ejemplo, un 10 %) para imprevistos." },
    ], undefined, "stack"),
    slide("tabla", "Calcula y ajusta un presupuesto", [
      { kind: "text", text: "Cambia las cantidades y mira cuándo te pasas del presupuesto disponible. Activa los imprevistos y observa el efecto." },
    ], tool("presupuesto-explorador", { a: 30 }), "visual-top"),
    calc("calc-coste", "Coste de un material", "Una hoja de tablero cuesta 6,50 € y necesitas 2. ¿Cuántos euros cuestan en total?",
      nums(13), "Coste = cantidad × precio = 2 × 6,50 € = 13 €.", "Multiplica la cantidad por el precio de una unidad."),
    calc("calc-total", "Total del presupuesto", "Tornillos 3,20 € + cola 2,40 € + barniz 5,90 €. ¿Cuánto suman en euros?",
      nums("11.5", "11.50"), "3,20 + 2,40 + 5,90 = 11,50 €.", "Suma los tres precios."),
    slide("evaluar", "Evaluar el resultado", [
      { kind: "text", text: "Al final se comprueba si el producto **cumple los requisitos** iniciales. Para ello se usan criterios medibles." },
      { kind: "steps", items: [
        "**Funcionamiento**: ¿hace lo que se pedía?",
        "**Resistencia y seguridad**: ¿aguanta el uso sin peligro?",
        "**Coste y tiempo**: ¿respetó el presupuesto y el plazo?",
        "**Estética y comodidad**: ¿es agradable de usar?",
      ] },
      { kind: "text", text: "Después se redactan propuestas de mejora concretas: «reforzar la unión con una escuadra», «usar un barniz sin olor»." },
    ]),
    sort("clasifica-mejora", "Dato o propuesta de mejora", "Distingue qué es una observación de la evaluación y qué es una propuesta de mejora.",
      [["obs", "Observación", "cobalt"], ["mej", "Propuesta de mejora", "emerald"]],
      [["El soporte aguantó 4 kg, no 5", "obs"], ["El presupuesto final fue de 22 €", "obs"], ["Una pata se desprendió al empujar", "obs"], ["Añadir una escuadra metálica en las esquinas", "mej"], ["Comprar tornillos más largos", "mej"], ["Lijar mejor para evitar astillas", "mej"]],
      "Las observaciones describen lo que ocurrió; las propuestas dicen qué cambiar para que funcione mejor.",
    ),
    pick("check-eval", "Un buen criterio de evaluación", "¿Qué criterio permite evaluar de forma objetiva un soporte para mochilas?",
      "Comprobar si aguanta 5 kg por gancho durante un minuto",
      [["Decir si «queda bien»", "Es una opinión, no un criterio medible."], ["Contar cuántos alumnos lo miran", "No mide si cumple la función."], ["Comprar uno parecido y compararlo por el precio", "El precio no demuestra que cumpla el requisito."]],
      "Un buen criterio es medible y está relacionado con un requisito del enunciado.",
    ),
  ],
};
