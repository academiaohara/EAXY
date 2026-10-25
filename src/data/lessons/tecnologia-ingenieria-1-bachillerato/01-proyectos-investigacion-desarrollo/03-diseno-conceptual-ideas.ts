import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const disenoConceptualIdeasLesson: InteractiveLesson = {
  slug: "diseno-conceptual-ideas",
  title: "3. Diseño conceptual y generación de ideas",
  subtitle: TEC1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Primero muchas ideas, después una", [
      { kind: "definition", text: "El **diseño conceptual** es la fase en la que se generan y comparan **conceptos** (ideas de cómo resolver el problema) antes de pasar a los detalles de dimensiones y materiales." },
      { kind: "compare",
        left: { title: "Pensamiento divergente", text: "Abrir: producir cuantas más ideas, mejor, sin juzgarlas. Cantidad y variedad.", tone: "info" },
        right: { title: "Pensamiento convergente", text: "Cerrar: comparar con criterios, combinar lo mejor y elegir.", tone: "key" } },
      { kind: "warning", title: "Error típico", text: "Juzgar mientras se generan ideas las mata. Separa los dos momentos: primero abrir, luego cerrar." },
    ], undefined, "stack"),
    slide("tecnicas", "Técnicas para generar ideas", [
      { kind: "steps", title: "Cuatro herramientas", items: [
        "**Lluvia de ideas**: todas valen, se anotan sin criticar, se combinan después.",
        "**SCAMPER**: sustituir, combinar, adaptar, modificar, otro uso, eliminar, reordenar.",
        "**Analogías**: ¿cómo lo resuelve la naturaleza u otro sector?",
        "**Bocetos rápidos**: dibujar en 5 minutos varias formas distintas del mismo concepto.",
      ] },
      { kind: "text", text: "El **boceto** es una herramienta de pensar, no de presentar: sirve para descubrir problemas de tamaño, forma y uso antes de gastar material." },
    ]),
    slide("usuario", "Diseño centrado en el usuario", [
      { kind: "definition", text: "En el **diseño centrado en el usuario** se parte de quién va a usar el producto, cómo, dónde y con qué dificultades; se prueba con usuarios reales y se corrige." },
      { kind: "steps", items: [
        "Observar o entrevistar a usuarios reales (no suponer).",
        "Definir un perfil: edad, destreza, entorno, límites.",
        "Probar el boceto o maqueta con ellos.",
        "Anotar qué no entienden o qué les incomoda y rediseñar.",
      ] },
      { kind: "text", text: "Ejemplo: un abrebotellas para personas con artritis se evalúa por la **fuerza de agarre** necesaria, no por lo bonito que sea." },
    ]),
    slide("seleccion", "Elegir un concepto con criterio", [
      { kind: "text", text: "Para pasar de cuatro conceptos a uno se evalúan con **criterios** y **pesos** (matriz de decisión). Prueba qué ocurre si la fabricación sencilla pesa mucho o poco." },
    ], tool("matriz-decision-explorador", { n: 1 }), "visual-top"),
    sort("clasifica-fase", "¿Abrir o cerrar?", "Clasifica cada acción según sea divergente (generar) o convergente (elegir).",
      [["div", "Divergente (abrir)", "cobalt"], ["con", "Convergente (cerrar)", "amber"]],
      [["Anotar 20 ideas en 10 minutos sin criticar", "div"], ["Dibujar tres formas distintas del mismo soporte", "div"], ["Preguntarse cómo lo resolvería un insecto", "div"], ["Puntuar los conceptos con una matriz de decisión", "con"], ["Descartar los que superan el presupuesto", "con"], ["Combinar lo mejor de dos conceptos y elegir el resultado", "con"]],
      "Generar, variar y analogar es abrir. Puntuar, descartar y combinar con un criterio es cerrar.",
    ),
    pick("check-matriz", "Leer la matriz", "En una matriz de decisión sube mucho el peso del criterio «coste» y la opción más cara pasa del primer al último puesto. ¿Qué indica?",
      "Que la elección depende de la importancia que se da a cada criterio, y debe justificarse",
      [["Que la matriz está mal hecha", "Una matriz bien hecha es sensible a los pesos: justo eso la hace útil."], ["Que el coste es lo único que importa", "Solo importa más porque se le ha dado más peso; el resto de criterios siguen contando."], ["Que se pueden cambiar los pesos hasta que gane la opción favorita", "Ajustar los pesos para forzar un resultado invalida el método."]],
      "Los pesos son una decisión: se fijan antes de puntuar y se razonan con las necesidades del usuario.",
    ),
    pick("check-usuario", "Probar con usuarios", "Diseñas un mando para personas con poca fuerza en las manos. ¿Cuál es la mejor forma de comprobar tu boceto?",
      "Hacer una maqueta y que lo prueben varias personas del perfil, anotando dónde fallan",
      [["Preguntar a tus compañeros si les gusta el color", "El color no mide si es usable para el perfil objetivo."], ["Calcular el coste de los materiales", "Es necesario, pero no dice si el usuario puede usarlo."], ["Elegir el boceto más original", "La originalidad no garantiza que funcione para quien lo va a usar."]],
      "Probar con usuarios reales de su perfil descubre problemas que no ves tú mismo.",
    ),
  ],
};
