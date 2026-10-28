import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seleccionMaterialesAplicacionLesson: InteractiveLesson = {
  slug: "seleccion-materiales-aplicacion",
  title: "7. Selección de materiales según su aplicación",
  subtitle: TECESO1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("criterios", "Elegir bien el material", [
      { kind: "definition", text: "Elegir un material es **decidir qué propiedades importan más** en un objeto y buscar el que mejor las combine, a un coste razonable." },
      { kind: "steps", items: [
        "**Función**: ¿qué fuerzas, golpes, calor o humedad debe soportar?",
        "**Propiedades**: resistencia, peso, aislamiento, dureza.",
        "**Coste y disponibilidad**: ¿cuánto cuesta y es fácil de conseguir?",
        "**Facilidad de trabajo**: ¿se corta, une o moldea con las herramientas del taller?",
        "**Impacto ambiental**: ¿se puede reciclar o reutilizar?",
        "**Estética**: color, textura, aspecto.",
      ] },
    ], undefined, "stack"),
    slide("tabla", "Prueba con cuatro objetos", [
      { kind: "text", text: "Cada objeto da más importancia a unos criterios que a otros. Cambia los valores y mira cómo cambia el material más adecuado." },
    ], tool("seleccion-material-eso-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-uso", "¿Qué material para qué?", "Asigna a cada objeto el material más adecuado.",
      [["met", "Metal", "amber"], ["pla", "Plástico", "cobalt"], ["mad", "Madera", "emerald"], ["vid", "Vidrio", "violet"]],
      [["Estructura de un puente colgante", "met"], ["Cable (núcleo conductor)", "met"], ["Funda de un cable", "pla"], ["Carcasa de un móvil", "pla"], ["Mesa de comedor de estilo clásico", "mad"], ["Mango de una sartén", "mad"], ["Ventana", "vid"], ["Botella de refresco retornable", "vid"]],
      "Cada material se elige por lo que aporta: el metal por la resistencia y la conducción, el plástico por ser ligero y aislante, la madera por su calidez y aislamiento y el vidrio por su transparencia.",
    ),
    pick("check-sarten", "Mango de una sartén", "¿Qué propiedad es la más importante para el mango de una sartén?",
      "Ser mal conductor del calor, para no quemarse al cogerlo",
      [["Ser buen conductor del calor", "El mango se quemaría al usarlo."], ["Ser transparente", "No aporta nada a la función."], ["Pesar mucho", "Un mango pesado incomoda y no mejora la función."]],
      "El mango debe ser aislante térmico: de madera, plástico termoestable o metal hueco con aislamiento.",
    ),
    pick("check-casco", "Casco de bicicleta", "Un casco de bicicleta debe proteger la cabeza y ser cómodo de llevar. ¿Qué dos propiedades son las más importantes?",
      "Resistencia a los golpes y poco peso",
      [["Brillo y precio muy bajo", "El precio no debe comprometer la seguridad, y el brillo no protege."], ["Conducir bien la electricidad", "No tiene relación con la protección de un golpe."], ["Ser muy pesado y rígido", "Un casco pesado cansa y puede ser peligroso."]],
      "La seguridad exige absorber impactos y la comodidad, poco peso; por eso se usan espumas y plásticos ligeros.",
    ),
    pick("check-ambiente", "Más allá de las propiedades", "Dos materiales cumplen igual de bien la función, pero uno se puede reciclar y el otro no. ¿Cuál conviene?",
      "El reciclable, porque reduce residuos y el consumo de materias primas",
      [["El que no se puede reciclar, para ahorrar tiempo", "Generaría más residuos."], ["El que sea más pesado", "Ese dato no depende de reciclar o no."], ["Da igual cuál", "El impacto ambiental es un criterio importante."]],
      "A igualdad de prestaciones, conviene elegir el material con menor impacto ambiental.",
    ),
  ],
};
