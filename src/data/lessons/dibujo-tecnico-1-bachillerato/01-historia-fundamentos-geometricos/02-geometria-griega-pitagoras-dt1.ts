import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const geometriaGriegaPitagorasDt1Lesson: InteractiveLesson = {
  slug: "geometria-griega-pitagoras-dt1",
  title: "2. De medir a demostrar",
  subtitle: DT1_SUBTITLES[1],
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
    pick("medir-o-demostrar", "¿Medición o demostración?", "Mides tres triángulos rectángulos y en todos se cumple a² + b² ≈ c². ¿Qué puedes afirmar todavía?", "Es una evidencia que sugiere la propiedad, pero no prueba todos los triángulos posibles", [["Ya está demostrado porque hay tres ejemplos", "Siempre podrían existir otros casos no medidos."], ["La propiedad es falsa porque aparece ≈", "La aproximación puede proceder del instrumento."], ["Solo funciona si los lados son enteros", "Los lados pueden tener cualquier longitud positiva."]], "Medir ayuda a descubrir una regularidad. Demostrar cubre infinitos casos mediante un razonamiento."),
    {
      id: "pitagoras-visual", type: "storyboard", title: "Pitágoras: una igualdad de áreas", scene: "dt1-pitagoras-areas",
      phases: [
        { eyebrow: "Construye", text: "Sobre cada lado del triángulo rectángulo dibujamos un cuadrado.", highlights: [{ text: "cuadrado", tone: "cobalt" }] },
        { eyebrow: "Compara", text: "Los cuadrados de los catetos tienen áreas a² y b².", highlights: [{ text: "a²", tone: "violet" }, { text: "b²", tone: "amber" }] },
        { eyebrow: "Concluye", text: "Esas dos áreas juntas equivalen al área c² del cuadrado de la hipotenusa.", highlights: [{ text: "c²", tone: "emerald" }, { text: "equivalen", tone: "emerald" }] },
      ],
      help: [{ label: "¿Qué representan los cuadrados?", message: "No son una decoración algebraica: cada término es el área de una figura construida sobre uno de los tres lados." }],
    },
    sort("razonamiento-o-receta", "Distingue receta y razonamiento", "Clasifica cada acción según el tipo de conocimiento que aporta.", [["rec", "Regla práctica o medición", "amber"], ["raz", "Razonamiento general", "emerald"]], [["Tensar una cuerda 3-4-5 para obtener un ángulo recto", "rec"], ["Comprobar una longitud con una regla", "rec"], ["Partir de postulados y deducir una propiedad", "raz"], ["Explicar la igualdad de Pitágoras comparando áreas", "raz"], ["Repetir una construcción que enseñó un artesano", "rec"], ["Probar que una conclusión vale para cualquier figura que cumpla las condiciones", "raz"]], "Una receta puede ser útil; el razonamiento añade las condiciones y la razón por la que funciona."),
    slide("legado", "Cuatro aportaciones a una misma pregunta", [
      { kind: "relations", items: [
        { left: "Tales", relation: "usa proporciones y propiedades angulares para deducir", right: "lo que no puede medirse directamente", tone: "info" },
        { left: "Pitágoras", relation: "relaciona", right: "los lados de todo triángulo rectángulo", tone: "key" },
        { left: "Euclides", relation: "organiza definiciones, postulados y teoremas en", right: "una cadena lógica", tone: "ok" },
        { left: "Hipatia", relation: "explica, comenta y transmite", right: "el razonamiento geométrico", tone: "warn" },
      ] },
      { kind: "text", text: "En la semicircunferencia de Tales, el ángulo que abarca el diámetro es recto. Aquí importa como ejemplo de una propiedad demostrada; la construiremos más adelante." },
    ]),
    pick("decide-metodo", "Elige un argumento fiable", "Quieres asegurar que una escuadra fabricada en serie forma 90°. ¿Qué comprobación usa la propiedad de Pitágoras?", "Medir 30 mm y 40 mm en los catetos y comprobar que la diagonal mide 50 mm", [["Mirar si el ángulo parece recto", "La apariencia cambia con la posición y no fija una condición geométrica."], ["Comprobar que los dos catetos miden lo mismo", "Eso produciría un triángulo isósceles, pero no garantiza 90°."], ["Medir solo la diagonal", "Hace falta relacionar los tres lados."]], "Como 30² + 40² = 50², el ángulo opuesto al lado de 50 mm debe ser recto."),
  ],
};
