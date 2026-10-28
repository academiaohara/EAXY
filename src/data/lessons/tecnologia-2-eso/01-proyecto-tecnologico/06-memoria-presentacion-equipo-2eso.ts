import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const memoriaPresentacionEquipo2esoLesson: InteractiveLesson = {
  slug: "memoria-presentacion-equipo-2eso",
  title: "6. Memoria técnica, presentación y trabajo en equipo",
  subtitle: TECESO2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("memoria", "La memoria técnica", [
      { kind: "definition", text: "La **memoria técnica** es el documento que cuenta el proyecto completo: del problema a la solución, con los planos, el presupuesto, las pruebas y las conclusiones." },
      { kind: "text", text: "Activa las secciones que ya has escrito y comprueba qué te falta." },
    ], tool("eso2-memoria-explorador"), "visual-top"),
    slide("presenta", "Presentar el proyecto", [
      { kind: "steps", items: [
        "**Estructura**: problema → solución → demostración → conclusiones.",
        "Una diapositiva por idea, con **pocas palabras** y buen contraste.",
        "Muestra el **prototipo** funcionando o un vídeo corto.",
        "**Ensaya** el tiempo y reparte las partes entre las personas del equipo.",
        "Prepara respuestas a las posibles preguntas.",
      ] },
    ]),
    slide("equipo", "Trabajo en equipo", [
      { kind: "steps", items: [
        "**Roles**: coordinación, documentación, construcción, pruebas… y se pueden rotar.",
        "**Acuerdos** claros: qué se hace, quién y para cuándo.",
        "**Comunicación**: reuniones cortas, un cuaderno de bitácora y escucha activa.",
        "**Resolver conflictos** con respeto: se discuten las ideas, no a las personas.",
      ] },
    ]),
    slide("taller", "Seguridad en el taller", [
      { kind: "text", text: "Un buen equipo cuida la seguridad de todas las personas. Detecta los peligros de un taller." },
    ], tool("taller-peligros-explorador"), "visual-top"),
    calc("calc-tiempo", "Ensayar la presentación", "Tienes 8 minutos y 4 personas se reparten el tiempo a partes iguales. ¿Cuántos minutos habla cada una?", nums(2), "8 / 4 = 2 minutos por persona.", "Divide el tiempo entre las personas."),
    sort("clasifica-rol", "¿Qué rol es?", "Relaciona cada tarea con el rol del equipo.",
      [["coo", "Coordinación", "cobalt"], ["doc", "Documentación", "amber"], ["con", "Construcción", "emerald"]],
      [["Repartir las tareas y vigilar los plazos", "coo"], ["Convocar las reuniones", "coo"], ["Escribir la memoria y hacer fotos", "doc"], ["Anotar las decisiones en el cuaderno", "doc"], ["Cortar y montar las piezas", "con"], ["Preparar los materiales del taller", "con"]],
      "Cada rol cubre una parte del trabajo; entre todos se completa el proyecto.",
    ),
    pick("check-memoria", "Cuándo escribir la memoria", "¿Cuándo es mejor ir escribiendo la memoria técnica?",
      "A lo largo del proyecto, anotando lo que se hace y se decide",
      [["Solo la noche antes de entregarla", "Se olvidan decisiones y datos."], ["Nunca: no hace falta", "Es parte del proyecto."], ["Solo al final, de memoria", "Se pierden detalles importantes."]],
      "Documentar mientras se trabaja produce una memoria más fiel y ahorra tiempo.",
    ),
  ],
};
