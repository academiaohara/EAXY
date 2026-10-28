import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const poligonosDadoLadoEstrelladosDt1Lesson: InteractiveLesson = {
  slug: "poligonos-dado-lado-estrellados-dt1",
  title: "6. Polígonos dado el lado y polígonos estrellados",
  subtitle: DT1_SUBTITLES[3],
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
    slide("estrellas", "Polígonos estrellados", [
      { kind: "text", text: "Une cada vértice con el que está k lugares más allá. Cambia n y k y busca cuándo hay un solo trazo." },
    ], tool("dt1-estrellado-explorador"), "visual-top"),
    slide("usos", "Aplicaciones", [
      { kind: "steps", items: [
        "**Tuercas y tornillos** (hexágonos), **señales** (octógono de STOP), **baldosas** y **teselados** (triángulo, cuadrado y hexágono rellenan el plano).",
        "**Arquitectura**: rosetones, cúpulas y planos de torres basados en polígonos regulares.",
        "**Pentagrama** y otras estrellas: símbolos, escudos y logotipos.",
        "En CAD, un polígono regular se define con el **número de lados** y el **radio** o el **lado**.",
      ] },
    ]),
    calc("calc-r6", "Radio dado el lado", "Un hexágono regular tiene lado 4 cm. ¿Cuánto mide el radio de su circunferencia circunscrita, en cm?", nums(4), "R = l/(2 sen 30°) = 4/(2 · 0,5) = 4 cm.", "En el hexágono, R = l."),
    calc("calc-r8", "Octógono dado el lado", "Un octógono regular de lado 5 cm: R = 5 / (2 sen 22,5°). ¿Cuánto vale R, en cm? (dos decimales)", nums(6.53, 6.5328), "5 / (2 · 0,38268) ≈ 6,53 cm.", "sen 22,5° ≈ 0,38268."),
    calc("calc-punta", "Punta del pentagrama", "El pentagrama es la estrella {5/2}. ¿Cuánto mide el ángulo de cada punta, en grados? (180°(n − 2k)/n)", nums(36), "180 · (5 − 4) / 5 = 36°.", "Sustituye n = 5 y k = 2."),
    sort("clasifica-estrella", "¿Estrella de un trazo?", "Clasifica cada símbolo {n/k}.",
      [["un", "Estrella de un solo trazo", "cobalt"], ["va", "Compuesto de varios polígonos", "amber"]],
      [["{5/2}", "un"], ["{7/2}", "un"], ["{7/3}", "un"], ["{8/3}", "un"], ["{6/2}", "va"], ["{8/2}", "va"], ["{9/3}", "va"]],
      "Es de un solo trazo si n y k son primos entre sí.",
    ),
    pick("check-hexagrama", "El hexagrama", "¿Por qué el hexagrama {6/2} no se dibuja de un solo trazo?",
      "Porque 6 y 2 tienen divisores comunes: son dos triángulos distintos",
      [["Porque tiene demasiadas puntas", "No es el número de puntas."], ["Porque k es impar", "k = 2 es par."], ["Porque n es primo", "6 no es primo."]],
      "Con mcd(6, 2) = 2 se forman dos triángulos superpuestos.",
    ),
  ],
};
