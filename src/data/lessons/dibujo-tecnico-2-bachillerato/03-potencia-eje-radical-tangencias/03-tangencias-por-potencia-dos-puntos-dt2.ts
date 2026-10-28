import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tangenciasPorPotenciaDosPuntosDt2Lesson: InteractiveLesson = {
  slug: "tangencias-por-potencia-dos-puntos-dt2",
  title: "3. Tangencias por potencia: circunferencia por dos puntos",
  subtitle: DT2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "El problema", [
      { kind: "steps", items: [
        "Datos: una **recta r** y dos puntos **A** y **B** al mismo lado de ella.",
        "Se buscan las **circunferencias que pasan por A y B y son tangentes a r**.",
        "Idea: si se prolonga **AB** hasta cortar a r en **P**, la potencia de P respecto de la circunferencia buscada es **PA · PB**.",
        "Y como r es tangente, esa potencia es también **PT²**, donde T es el punto de tangencia.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Dos soluciones", [
      { kind: "text", text: "Mueve A y B y observa los dos puntos de tangencia y las dos circunferencias." },
    ], tool("dt2-circulo-dos-puntos-tangente-explorador"), "visual-top"),
    slide("pasos", "Construcción", [
      { kind: "steps", items: [
        "Se prolonga **AB** hasta cortar a r en **P**.",
        "Se halla la **media proporcional** entre PA y PB: $PT = \\sqrt{PA \\cdot PB}$ (con una semicircunferencia de diámetro PA + PB y una perpendicular).",
        "Se lleva esa longitud sobre r a ambos lados de P y se obtienen **T₁** y **T₂**.",
        "El centro de cada solución es el corte de la **perpendicular a r por T** con la **mediatriz de AB**.",
      ] },
    ]),
    slide("casos", "Casos especiales", [
      { kind: "steps", items: [
        "Si **AB es paralela a r**, no hay punto P: la solución **única** tiene su punto de tangencia en la **mediatriz de AB**.",
        "Si **A está sobre r**, uno de los puntos de tangencia es A y la solución es **única**.",
        "Si A y B están en **lados opuestos** de r, **no hay solución**: una circunferencia tangente a r queda siempre en un solo lado.",
      ] },
    ]),
    calc("calc-pt", "Longitud de la tangente", "Se tiene PA = 2 cm y PB = 8 cm. ¿Cuánto mide PT, en cm?", nums(4), "PT² = PA · PB = 16, así que PT = 4 cm.", "Raíz cuadrada del producto."),
    calc("calc-dist", "Distancia entre los puntos de tangencia", "Con PT = 4 cm, los puntos T₁ y T₂ quedan uno a cada lado de P. ¿Qué distancia hay entre ellos, en cm?", nums(8), "T₁T₂ = 2 · PT = 8 cm.", "Están a PT de P, uno a cada lado."),
    sort("clasifica", "¿Cuántas soluciones?", "Clasifica cada situación según el número de circunferencias que pasan por A y B y son tangentes a r.",
      [["dos", "Dos soluciones", "cobalt"], ["una", "Una solución", "amber"], ["ninguna", "Ninguna", "emerald"]],
      [["A y B al mismo lado, AB corta a r", "dos"], ["A y B a distinta altura sobre r", "dos"], ["AB paralela a r", "una"], ["A está sobre r", "una"], ["A y B en lados opuestos de r", "ninguna"], ["B debajo de r y A encima", "ninguna"]],
      "Dos en el caso general; una si AB ∥ r o A está en r; ninguna si r separa A de B.",
    ),
    pick("check", "¿Por qué sirve la potencia?", "¿Qué propiedad permite hallar los puntos de tangencia?",
      "La potencia de P es PA · PB y también PT²",
      [["Que la tangente es perpendicular al radio", "Es cierta, pero no da la distancia PT."], ["Que A y B equidistan del centro", "Eso da la mediatriz, no el punto T."], ["Que las dos circunferencias son iguales", "No tienen por qué serlo."]],
      "Igualar las dos expresiones de la potencia de P da PT = √(PA·PB).",
    ),
  ],
};
