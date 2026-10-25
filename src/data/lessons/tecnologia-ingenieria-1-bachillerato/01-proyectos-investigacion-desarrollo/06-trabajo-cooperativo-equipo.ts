import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const trabajoCooperativoEquipoLesson: InteractiveLesson = {
  slug: "trabajo-cooperativo-equipo",
  title: "6. Trabajo cooperativo y organización del equipo",
  subtitle: TEC1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Un equipo no es un grupo", [
      { kind: "definition", text: "Un **equipo** tiene un objetivo común, **roles** definidos y responsabilidad compartida sobre el resultado. Un grupo, en cambio, puede limitarse a sentarse junto." },
      { kind: "steps", title: "Roles habituales en un proyecto técnico", items: [
        "**Coordinación**: mantiene el plan, convoca reuniones y revisa plazos.",
        "**Diseño / ingeniería**: planos, cálculos y decisiones técnicas.",
        "**Construcción o programación**: fabrica y monta el prototipo.",
        "**Calidad / ensayos**: comprueba requisitos y registra resultados.",
        "**Documentación**: memoria, fuentes y registro de decisiones.",
      ] },
      { kind: "text", text: "Un rol no impide ayudar a otros: indica **quién responde** de cada cosa." },
    ], undefined, "stack"),
    slide("reparto", "Repartir carga con sentido", [
      { kind: "text", text: "No todos tardan lo mismo en cada tarea. Asigna las cinco tareas y busca un reparto que **no supere la capacidad** de nadie y quede **equilibrado**. Cada persona tiene un factor distinto por tarea (más bajo = más rápida)." },
    ], tool("roles-equipo-explorador"), "visual-top"),
    slide("comunicacion", "Comunicación y decisiones", [
      { kind: "steps", title: "Hábitos que evitan perder tiempo", items: [
        "**Documentación compartida**: un único lugar con planos, medidas y versión actual.",
        "**Reuniones cortas** con orden del día y acta (qué se decidió, quién lo hace, para cuándo).",
        "**Registro de decisiones**: qué se eligió, por qué y qué alternativas se descartaron.",
        "**Control de versiones**: nombre de archivo con fecha o número; nada de «final_definitivo2».",
      ] },
      { kind: "compare",
        left: { title: "Decidir por votación", text: "Rápido, pero deja perdedores y no garantiza que la opción sea la mejor técnicamente.", tone: "warn" },
        right: { title: "Decidir con criterios", text: "Se acuerdan criterios y pesos antes de puntuar; la decisión se puede explicar y revisar.", tone: "ok" } },
    ]),
    slide("conflictos", "Desacuerdos técnicos", [
      { kind: "text", text: "Un desacuerdo técnico («¿aluminio o acero?») no se gana con insistencia, sino con **datos**." },
      { kind: "steps", items: [
        "Separar a las personas de las opciones: se discute la solución, no a quien la propone.",
        "Pasar de opiniones a **criterios medibles** acordados por todos.",
        "Obtener el dato que falta (ensayo rápido, ficha técnica, cálculo).",
        "Decidir, anotar la decisión y comprometerse con ella. Si surge un dato nuevo, se revisa.",
      ] },
    ]),
    sort("clasifica-conducta", "Conductas del equipo", "Clasifica cada situación como colaboración eficaz o como problema que hay que corregir.",
      [["bien", "Colabora bien", "emerald"], ["mal", "Hay que corregir", "amber"]],
      [["Cada persona actualiza el archivo común antes de irse", "bien"], ["Se anota quién hace qué hasta cuándo", "bien"], ["Se prueba el prototipo antes de discutir cuál es mejor", "bien"], ["Una persona hace todo para «ir más rápido»", "mal"], ["Se decide en el pasillo y nadie lo apunta", "mal"], ["Cada uno trabaja en su copia del plano", "mal"]],
      "Reparto, registro y datos compartidos hacen al equipo eficaz. Concentrar el trabajo, decidir sin dejar rastro o duplicar versiones genera errores.",
    ),
    pick("check-conflicto", "Resolver un desacuerdo", "Dos compañeros discuten si la base del prototipo debe ser de madera o de aluminio. ¿Cuál es la mejor siguiente acción?",
      "Acordar criterios (masa, coste, rigidez) y medir un dato de cada material antes de decidir",
      [["Votar y que gane la mayoría", "La mayoría no garantiza la mejor solución ni explica por qué."], ["Que decida quien más sabe de materiales sin explicarlo", "Decidir sin justificar bloquea el aprendizaje y la revisión."], ["Dejar el tema para más adelante", "Aplazarlo retrasa el camino crítico y el desacuerdo sigue."]],
      "Acordar criterios y conseguir datos convierte una discusión en una decisión justificable.",
    ),
    pick("check-registro", "Para qué sirve el registro", "¿Por qué conviene anotar las decisiones del equipo, incluidas las opciones descartadas?",
      "Para poder explicar y revisar la decisión si cambian los datos o entra alguien nuevo",
      [["Para repartir culpas si algo sale mal", "El registro sirve para aprender y justificar, no para culpar."], ["Porque lo exige siempre la ley", "No es una obligación general; es una buena práctica de ingeniería."], ["Para que el profesor no pregunte", "Su valor es técnico: evita repetir discusiones y errores."]],
      "Un registro de decisiones conserva el porqué, que es lo que más se olvida.",
    ),
  ],
};
