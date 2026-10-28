import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const residuosReduccionClasificacionLesson: InteractiveLesson = {
  slug: "residuos-reduccion-clasificacion",
  title: "4. Reducción y clasificación de residuos",
  subtitle: TECESO1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué son los residuos", [
      { kind: "definition", text: "Un **residuo** es cualquier material u objeto que su dueño desecha. Una buena gestión comienza por **generar menos** y por **separar** lo que no se puede evitar." },
      { kind: "steps", items: [
        "**Residuos urbanos**: los de casas y comercios (envases, papel, restos de comida).",
        "**Residuos industriales**: los de las fábricas.",
        "**Residuos peligrosos**: pilas, aceites, pinturas o aparatos electrónicos, que contaminan si no se tratan.",
      ] },
    ], undefined, "stack"),
    slide("jerarquia", "Qué hacer con un residuo", [
      { kind: "text", text: "Las opciones se ordenan de la mejor a la peor. El objetivo es quedarse lo más arriba posible." },
    ], anim("jerarquia-residuos"), "split"),
    slide("tiempo", "Cuánto tarda en desaparecer", [
      { kind: "text", text: "Avanza en el tiempo y comprueba qué residuos ya se han descompuesto. Algunos materiales permanecen siglos." },
    ], tool("tiempo-descomposicion-explorador", { n: 0 }), "visual-top"),
    slide("clasifica", "Cada residuo en su contenedor", [
      { kind: "text", text: "Clasifica diez residuos en los contenedores de reciclaje." },
    ], tool("contenedores-reciclaje-explorador"), "visual-top"),
    sort("clasifica-jerarquia", "¿Qué nivel es?", "Relaciona cada acción con su nivel de la jerarquía.",
      [["red", "Reducir", "emerald"], ["reu", "Reutilizar", "cobalt"], ["rec", "Reciclar", "amber"]],
      [["Llevar el bocadillo en una fiambrera, no en papel de aluminio", "red"], ["Imprimir solo lo necesario", "red"], ["Usar un frasco de cristal como vaso", "reu"], ["Dar la ropa que ya no usas", "reu"], ["Llevar el vidrio al contenedor verde", "rec"], ["Separar el papel y el cartón", "rec"]],
      "Reducir evita el residuo; reutilizar le da otra vida sin transformarlo; reciclar lo convierte en materia prima.",
    ),
    pick("check-primero", "La mejor opción", "¿Cuál es la mejor manera de gestionar los envases de plástico?",
      "Evitar usarlos: reducir su consumo con envases reutilizables",
      [["Reciclarlos, siempre es la mejor opción", "Reciclar está por debajo de reducir y reutilizar."], ["Quemarlos en casa", "Es contaminante y peligroso."], ["Tirarlos al campo", "Es ilegal y contamina."]],
      "La jerarquía dice: primero reducir, luego reutilizar, después reciclar.",
    ),
  ],
};
