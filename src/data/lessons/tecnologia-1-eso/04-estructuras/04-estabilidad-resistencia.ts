import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const estabilidadResistenciaLesson: InteractiveLesson = {
  slug: "estabilidad-resistencia",
  title: "4. Estabilidad y resistencia",
  subtitle: TECESO1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tres condiciones para una buena estructura", [
      { kind: "steps", items: [
        "**Resistente**: soporta las cargas sin romperse.",
        "**Rígida**: se deforma poco (una viga que se dobla demasiado no es útil, aunque no se rompa).",
        "**Estable**: no vuelca ni se cae por la acción de las cargas.",
      ] },
    ], undefined, "stack"),
    slide("estable", "Estabilidad: el centro de gravedad", [
      { kind: "definition", text: "El **centro de gravedad** es el punto donde se puede considerar aplicado todo el peso del objeto. Un objeto es **estable** mientras la vertical que baja desde ese punto caiga **dentro de su base de apoyo**." },
      { kind: "text", text: "Inclina el objeto y observa cuándo vuelca. Prueba una base más ancha, un objeto más bajo y lastre en la parte inferior." },
    ], tool("estabilidad-explorador", { a: 60, b: 120 }), "split"),
    slide("reglas", "Cómo aumentar la estabilidad", [
      { kind: "steps", items: [
        "**Ampliar la base** de apoyo (trípode, patas abiertas).",
        "**Bajar el centro de gravedad**: poner el peso en la parte inferior (lastre, motores y baterías abajo).",
        "**Acortar la altura** de la estructura.",
        "**Anclar** la estructura al suelo o arriostrarla con tirantes.",
      ] },
    ]),
    slide("resiste", "Resistencia: la viga de canto", [
      { kind: "text", text: "Un mismo listón de madera resiste muy distinto según cómo se coloque. Mide cuánto se dobla con la carga." },
    ], tool("viga-flexion-explorador", { a: 20, b: 1 }), "visual-top"),
    sort("clasifica-estab", "¿Más estable o menos?", "Decide qué cambio aumenta la estabilidad de un objeto y cuál la reduce.",
      [["mas", "Más estable", "emerald"], ["men", "Menos estable", "amber"]],
      [["Ensanchar la base de una lámpara", "mas"], ["Poner un lastre pesado en el fondo de un jarrón", "mas"], ["Bajar la altura de una torre", "mas"], ["Apilar libros en el estante más alto", "men"], ["Estrechar las patas de un taburete", "men"], ["Cargar una furgoneta sobre la baca", "men"]],
      "Una base ancha y un centro de gravedad bajo dan estabilidad; un centro de gravedad alto o una base estrecha la reducen.",
    ),
    pick("check-viga", "Viga de canto", "Para construir un estante, se coloca un listón de 2 × 5 cm. ¿Cómo debe ponerse para que se doble lo menos posible?",
      "De canto: los 5 cm en vertical",
      [["Plano: los 5 cm en horizontal", "Así se dobla unas 6 veces más."], ["Da igual, la sección es la misma", "La misma sección resiste muy distinto según su orientación."], ["Inclinado a 45°", "Una colocación diagonal es peor que una de canto."]],
      "La rigidez a flexión crece con el cubo de la altura de la sección: colocarla de canto es mucho más eficaz.",
    ),
    pick("check-vuelco", "¿Cuándo vuelca?", "Un armario alto y estrecho se tambalea. ¿Qué haces para que no vuelque?",
      "Poner los objetos pesados en el fondo y fijarlo a la pared",
      [["Poner los objetos pesados arriba", "Eso sube el centro de gravedad y empeora la estabilidad."], ["Quitarle las patas", "No cambia el problema de fondo."], ["No hacer nada, los armarios nunca vuelcan", "Los armarios altos son una causa habitual de accidentes en casa."]],
      "Bajar el centro de gravedad y anclar la estructura son las dos soluciones más eficaces.",
    ),
  ],
};
