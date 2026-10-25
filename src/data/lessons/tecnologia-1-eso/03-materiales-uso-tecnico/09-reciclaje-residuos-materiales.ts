import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const reciclajeResiduosMaterialesLesson: InteractiveLesson = {
  slug: "reciclaje-residuos-materiales",
  title: "9. Reutilización, reciclaje y gestión de residuos",
  subtitle: TECESO1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("tresr", "Reducir, reutilizar y reciclar", [
      { kind: "definition", text: "Los **residuos** son lo que desechamos cuando un producto deja de ser útil. La mejor forma de gestionarlos sigue un orden: **reducir, reutilizar y reciclar**." },
      { kind: "steps", items: [
        "**Reducir**: consumir solo lo necesario y elegir productos con menos envase.",
        "**Reutilizar**: darle otro uso a un objeto (un frasco como vaso) o repararlo.",
        "**Reciclar**: transformar el residuo en materia prima para fabricar productos nuevos.",
      ] },
      { kind: "warning", title: "Ojo", text: "Reciclar es la **última** opción de las tres: aunque ahorra recursos, gasta energía. Lo mejor para el planeta es el residuo que no llega a generarse." },
    ], undefined, "stack"),
    slide("ciclo", "El ciclo del reciclaje", [
      { kind: "text", text: "Sigue el recorrido de un material, desde que lo usamos hasta que se convierte en un producto nuevo." },
    ], anim("ciclo-reciclaje-material"), "split"),
    slide("contenedores", "Cada residuo en su contenedor", [
      { kind: "text", text: "Prueba tus conocimientos: elige el contenedor adecuado para cada residuo." },
    ], tool("contenedores-reciclaje-explorador"), "visual-top"),
    sort("clasifica-contenedor", "Contenedor correcto", "Asigna cada residuo a su contenedor.",
      [["ama", "Amarillo (envases)", "amber"], ["azu", "Azul (papel y cartón)", "cobalt"], ["ver", "Verde (vidrio)", "emerald"], ["pun", "Punto limpio", "violet"]],
      [["Lata de atún", "ama"], ["Botella de detergente", "ama"], ["Caja de cereales", "azu"], ["Revista", "azu"], ["Botella de vino", "ver"], ["Bote de pepinillos", "ver"], ["Pilas", "pun"], ["Móvil roto", "pun"]],
      "Los envases ligeros van al amarillo; papel y cartón al azul; los envases de vidrio al verde; los residuos peligrosos o aparatos, al punto limpio.",
    ),
    pick("check-reducir", "Lo mejor es no generar residuos", "¿Cuál de estas opciones es la que más reduce los residuos?",
      "Llevar una botella reutilizable y rellenarla",
      [["Comprar una botella de plástico nueva cada día y reciclarla", "Se genera un residuo diario aunque se recicle."], ["Tirar la botella al contenedor de resto", "No se aprovecha el material."], ["Comprar botellas más grandes y tirar los tapones", "No evita generar residuos."]],
      "Reducir está por encima de reciclar en la jerarquía: lo que no se desecha no hay que procesarlo.",
    ),
    pick("check-pilas", "Residuos peligrosos", "¿Por qué las pilas no se tiran a la basura normal?",
      "Contienen metales pesados contaminantes y deben llevarse al punto limpio o a un contenedor específico",
      [["Porque pesan mucho", "El problema no es el peso, sino la contaminación."], ["Porque se pueden usar para siempre", "Se agotan y hay que gestionarlas."], ["Porque son de plástico y deben ir al amarillo", "Las pilas tienen un contenedor propio."]],
      "Los metales pesados (mercurio, cadmio, plomo) contaminan suelos y aguas si acaban en vertederos.",
    ),
  ],
};
