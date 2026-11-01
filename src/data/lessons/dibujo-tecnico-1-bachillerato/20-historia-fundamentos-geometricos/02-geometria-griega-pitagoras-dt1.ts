import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { slide } from "@/data/lessons/tec1-helpers";

export const geometriaGriegaPitagorasDt1Lesson: InteractiveLesson = {
  slug: "geometria-griega-pitagoras-dt1",
  title: "2. De medir a demostrar",
  subtitle: DT1_SUBTITLES[20],
  stage: { theme: "board" },
  steps: [
    {
      id: "pregunta-central", type: "storyboard", title: "¿Cómo sabemos que un método siempre funciona?", scene: "dt1-geometria-medida-demostracion",
      phases: [
        { eyebrow: "Resolver un caso", text: "Egipcios y babilonios medían terrenos y aplicaban recetas que funcionaban en problemas concretos.", highlights: [{ text: "medían", tone: "amber" }, { text: "concretos", tone: "amber" }] },
        { eyebrow: "Buscar una regla", text: "Los geómetras griegos compararon casos y formularon propiedades generales.", highlights: [{ text: "propiedades generales", tone: "cobalt" }] },
        { eyebrow: "Dar una razón", text: "Una demostración encadena ideas aceptadas para explicar por qué la propiedad vale siempre.", highlights: [{ text: "demostración", tone: "emerald" }, { text: "siempre", tone: "emerald" }] },
      ],
      help: [{ label: "¿Por qué no bastan muchos ejemplos?", message: "Una lista de casos puede apoyar una conjetura, pero no descarta que el siguiente caso falle; un argumento general sí cubre todos los que cumplen las condiciones." }],
    },
    { id: "taller-1", type: "interactive_tool", tool: "dt1-workshop", scene: "right-angle", title: "Construye una escuadra fiable", transfer: false, help: [{ label: "¿Qué condición compruebo?", message: "Ajusta primero AC. Después observa si BC cumple el dato y si el ángulo A se aproxima a 90°." }] },
    {
      id: "pitagoras-visual", type: "storyboard", title: "Pitágoras: una igualdad de áreas", scene: "dt1-pitagoras-areas",
      phases: [
        { eyebrow: "Construye", text: "Sobre cada lado del triángulo rectángulo dibujamos un cuadrado.", highlights: [{ text: "cuadrado", tone: "cobalt" }] },
        { eyebrow: "Compara", text: "Los cuadrados de los catetos tienen áreas a² y b².", highlights: [{ text: "a²", tone: "violet" }, { text: "b²", tone: "amber" }] },
        { eyebrow: "Concluye", text: "Esas dos áreas juntas equivalen al área c² del cuadrado de la hipotenusa.", highlights: [{ text: "c²", tone: "emerald" }, { text: "equivalen", tone: "emerald" }] },
      ],
      help: [{ label: "¿Qué representan los cuadrados?", message: "No son una decoración algebraica: cada término es el área de una figura construida sobre uno de los tres lados." }],
    },
    { id: "taller-2", type: "interactive_tool", tool: "dt1-workshop", scene: "right-angle", title: "Comprueba otra escuadra", transfer: true, help: [{ label: "¿Qué condición compruebo?", message: "Las áreas de los cuadrados permiten contrastar la relación, pero probar casos no sustituye una demostración general." }] },
    slide("legado", "Cuatro aportaciones a una misma pregunta", [
      { kind: "relations", items: [
        { left: "Tales", relation: "usa proporciones y propiedades angulares para deducir", right: "lo que no puede medirse directamente", tone: "info" },
        { left: "Pitágoras", relation: "relaciona", right: "los lados de todo triángulo rectángulo", tone: "key" },
        { left: "Euclides", relation: "organiza definiciones, postulados y teoremas en", right: "una cadena lógica", tone: "ok" },
        { left: "Hipatia", relation: "explica, comenta y transmite", right: "el razonamiento geométrico", tone: "warn" },
      ] },
      { kind: "text", text: "En la semicircunferencia de Tales, el ángulo que abarca el diámetro es recto. Aquí importa como ejemplo de una propiedad demostrada; la construiremos más adelante." },
    ]),
    slide("cierre-demostracion", "Lo que has comprobado y lo que has demostrado", [{ kind: "compare", left: { title: "Tu escuadra", text: "Has comprobado dos ternas de longitudes y su perpendicularidad. Es evidencia sobre esos casos.", tone: "info" }, right: { title: "La propiedad general", text: "La demostración de Pitágoras relaciona las áreas para cualquier triángulo rectángulo, incluso si sus lados no son enteros.", tone: "ok" } }]),
  ],
};
