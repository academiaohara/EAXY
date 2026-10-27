import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const equipoDocumentacionVersionesTi2Lesson: InteractiveLesson = {
  slug: "equipo-documentacion-versiones-ti2",
  title: "4. Trabajo en equipo, documentación y control de versiones",
  subtitle: TECTI2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un proyecto lo hace un equipo", [
      { kind: "steps", items: [
        "Un buen equipo es **multidisciplinar**: cada persona aporta un perfil (diseño, cálculo, electrónica, programación, gestión, comunicación).",
        "Se definen **roles** y **responsabilidades** claras, pero se comparte el objetivo.",
        "**Comunicación**: reuniones cortas y regulares, canales acordados, decisiones por escrito.",
        "**Conflictos**: se afrontan pronto, hablando de hechos y de necesidades, no de personas.",
        "Cuantas más personas, más **canales de comunicación**: n·(n − 1)/2. Por eso los equipos pequeños son más ágiles.",
      ] },
    ], undefined, "stack"),
    slide("reparto", "Reparto de tareas", [
      { kind: "text", text: "Reparte las tareas según capacidades y tiempo disponible." },
    ], tool("reparto-tareas-explorador"), "visual-top"),
    slide("doc", "Documentación técnica", [
      { kind: "steps", items: [
        "**Memoria del proyecto**: problema, requisitos, alternativas, decisión justificada, diseño, resultados, costes y conclusiones.",
        "**Planos y esquemas** normalizados, con listas de materiales y componentes.",
        "**Informes de ensayos** con datos, método e incertidumbre.",
        "**Manuales** de uso, montaje y mantenimiento.",
        "Un **cuaderno de laboratorio** o un registro de decisiones permite reconstruir por qué se hizo cada cosa.",
      ] },
    ]),
    slide("memoria", "La memoria", [
      { kind: "text", text: "Ordena los apartados de la memoria de un proyecto de I+D." },
    ], tool("eso2-memoria-explorador"), "visual-top"),
    slide("versiones", "Control de versiones", [
      { kind: "steps", items: [
        "Un **sistema de control de versiones** (Git) guarda cada cambio con su autor, fecha y motivo (**commit**).",
        "Permite **volver atrás**, comparar versiones y trabajar en paralelo en **ramas** que luego se **fusionan**.",
        "Se usa para **código**, pero también para planos, documentos y modelos 3D.",
        "Los **repositorios** compartidos (GitHub, GitLab) facilitan la colaboración y la **difusión abierta** de proyectos.",
        "Convenciones: nombres de archivo claros, mensajes descriptivos, copias de seguridad.",
      ] },
    ]),
    calc("calc-canales", "Canales", "Un equipo de 6 personas, ¿cuántos canales de comunicación posibles hay? (6·5/2)", nums(15), "n(n − 1)/2 = 15.", "Parejas posibles."),
    calc("calc-canales2", "Más personas", "Si el equipo crece a 10 personas, ¿cuántos canales hay? (10·9/2)", nums(45), "10 · 9 / 2 = 45.", "Aplica la misma fórmula."),
    calc("calc-reunion", "Coste de reunirse", "Una reunión de 1 hora con 8 personas, ¿cuántas horas de trabajo consume en total?", nums(8), "8 personas · 1 h = 8 h.", "Personas por duración."),
    sort("clasifica-rol", "¿Rol o documento?", "Clasifica cada elemento de la gestión de un proyecto.",
      [["rol", "Rol del equipo", "cobalt"], ["doc", "Documento", "amber"]],
      [["Responsable de calidad", "rol"], ["Coordinador del proyecto", "rol"], ["Propietario del producto", "rol"], ["Memoria técnica", "doc"], ["Informe de ensayos", "doc"], ["Manual de montaje", "doc"]],
      "Los roles son personas con responsabilidades; los documentos, productos del proyecto.",
    ),
    pick("check-git", "Para qué sirve Git", "¿Cuál es la principal ventaja de un sistema de control de versiones?",
      "Registrar cada cambio y poder volver atrás o trabajar en paralelo sin perder trabajo",
      [["Hacer los archivos más pequeños", "No es su función."], ["Evitar tener que documentar", "No sustituye a la documentación."], ["Impedir que otros lo copien", "Facilita compartirlo."]],
      "Cada versión queda guardada y se puede recuperar.",
    ),
  ],
};
