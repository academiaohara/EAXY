import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const poligonosDadoLadoEstrelladosDt1Lesson: InteractiveLesson = {
  slug: "poligonos-dado-lado-estrellados-dt1",
  title: "4. Polígonos dado el lado y polígonos estrellados",
  subtitle: DT1_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuando se conoce el lado", [
      { kind: "steps", items: [
        "A menudo el dato es el **lado** $l$ y no el radio. Se puede construir **primero el polígono** en una circunferencia auxiliar y después **ampliarlo** (semejanza) hasta que el lado valga $l$.",
        "O se calcula el radio: $R = \\dfrac{l}{2\\,\\operatorname{sen}(180^\\circ/n)}$ y se inscribe.",
        "El **hexágono** y el **cuadrado** son directos: el lado del hexágono es el radio; el del cuadrado se obtiene con las diagonales.",
        "En general se usa el **método de los ángulos**: se traza el lado y, en cada extremo, el **ángulo interior**, y se cierra con las mediatrices.",
      ] },
    ], undefined, "stack"),

    slide("estrellas", "Polígonos estrellados", [], bench("estrella-compas", [
      { title: "Un polígono y su estrella", text: "Se parte de los $n$ vértices de un polígono regular inscrito. Un **polígono estrellado** $\\{n/k\\}$ une cada vértice con el que está $k$ lugares más allá.", fact: "{n/k}: salto de k vértices" },
      { title: "El pentagrama {5/2}", text: "Con $n = 5$ y $k = 2$ se une cada vértice con el siguiente **saltando uno**. Se cierra tras pasar por los cinco vértices: es una estrella de **un solo trazo**.", fact: "Ángulo de cada punta: 36°" },
      { title: "El hexagrama {6/2}", text: "Con $n = 6$ y $k = 2$ no se pasa por todos los vértices: salen **dos triángulos** superpuestos. Es un compuesto, no una estrella de un trazo.", fact: "mcd(6, 2) = 2" },
      { title: "¿Un trazo o varios?", text: "Es de un solo trazo si $n$ y $k$ **no tienen divisores comunes**. El ángulo de cada punta es $\\dfrac{180^\\circ (n - 2k)}{n}$.", fact: "n y k primos entre sí" },
    ]), "stack"),

    slide("usos", "Aplicaciones", [
      { kind: "steps", items: [
        "**Tuercas y tornillos** (hexágonos), **señales** (octógono de STOP), **baldosas** y **teselados** (triángulo, cuadrado y hexágono rellenan el plano).",
        "**Arquitectura**: rosetones, cúpulas y planos de torres basados en polígonos regulares.",
        "**Pentagrama** y otras estrellas: símbolos, escudos y logotipos.",
        "En CAD, un polígono regular se define con el **número de lados** y el **radio** o el **lado**.",
      ] },
    ], undefined, "stack"),

    benchTask("pentagrama-construye", "Dibuja el pentagrama", "pentagrama-practica", [
      { title: "Une de dos en dos", text: "Pasa la regla por **dos vértices** cada vez, saltando siempre uno: $1$ con $3$, $3$ con $5$… Solo se aceptan vértices que estén dos lugares más allá y no se repite ningún trazo.", fact: "{5/2}: cinco trazos" },
    ], {
      question: "Dibuja el pentagrama {5/2} uniendo cada vértice del pentágono con el que está dos lugares más allá.",
      hint: "Une el vértice 1 con el 3, el 3 con el 5, el 5 con el 2, el 2 con el 4 y el 4 con el 1.",
      explanation: "Como mcd(5, 2) = 1, saltando de dos en dos se pasa por los cinco vértices y la estrella se cierra en un solo trazo.",
    }),
  ],
};
