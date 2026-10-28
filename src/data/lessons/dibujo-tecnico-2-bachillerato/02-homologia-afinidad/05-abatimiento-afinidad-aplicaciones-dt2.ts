import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const abatimientoAfinidadAplicacionesDt2Lesson: InteractiveLesson = {
  slug: "abatimiento-afinidad-aplicaciones-dt2",
  title: "5. Aplicaciones a los sistemas de representación",
  subtitle: DT2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dónde aparecen", [
      { kind: "steps", items: [
        "El **abatimiento** de un plano sobre un plano de proyección es una **afinidad ortogonal**: el eje es la **traza** y la razón depende de la inclinación.",
        "La **proyección** de una figura plana sobre el plano horizontal es la **afín** de su verdadera forma: razón $k = \\cos\\varphi$.",
        "La **perspectiva cónica** de un plano sobre el cuadro es una **homología**: eje = LT (intersección con el geometral); centro = punto de vista abatido.",
        "Las **secciones planas** de cuerpos (prismas, cilindros) se obtienen por **afinidad con la base**, y las de pirámides y conos, por **homología**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "El abatimiento como afinidad", [
      { kind: "text", text: "Inclina el plano y observa cómo la proyección sigue siendo una afín de la forma verdadera." },
    ], tool("dt2-abatimiento-afinidad-explorador"), "visual-top"),
    slide("secciones", "Secciones planas", [
      { kind: "steps", items: [
        "La **sección** de un **prisma** o un **cilindro** con un plano es la **afín de su base**: el eje es la traza del plano de corte con el de la base y la dirección es la de las aristas.",
        "La **sección** de una **pirámide** o un **cono** es la **homóloga de la base**: el centro es el vértice.",
        "De este modo, el **dibujo** de una elipse como sección de un cilindro o un cono se reduce a trazar **puntos homólogos**.",
        "La **verdadera forma** de la sección se obtiene **abatiendo** el plano de corte.",
      ] },
    ]),
    calc("calc-k", "Razón de proyección", "Un plano forma 60° con el plano horizontal. ¿Cuánto vale la razón de afinidad de la proyección (cos 60°)?", nums(0.5), "cos 60° = 0,5.", "Razón = cos φ."),
    calc("calc-area", "Área proyectada", "Una figura de 10 cm² en ese plano se proyecta sobre el PH. ¿Qué área tiene la proyección, en cm²?", nums(5), "10 · 0,5 = 5 cm².", "Área × cos φ."),
    calc("calc-el", "Circunferencia proyectada", "Una circunferencia de radio 4 cm contenida en ese plano se proyecta como una elipse. ¿Cuánto mide su semieje menor, en cm?", nums(2), "4 · 0,5 = 2 cm (el mayor sigue siendo 4).", "b = R cos φ."),
    sort("clasifica-apl", "¿Afinidad u homología?", "Clasifica cada aplicación.",
      [["afi", "Afinidad", "cobalt"], ["hom", "Homología", "amber"]],
      [["Proyección ortogonal de una figura plana inclinada", "afi"], ["Sección plana de un prisma oblicuo", "afi"], ["Abatimiento de un plano sobre el PH", "afi"], ["Perspectiva cónica de una figura plana", "hom"], ["Sección plana de una pirámide", "hom"], ["Sección de un cono con un plano oblicuo", "hom"]],
      "Con vértice o centro propio es homología; con dirección de proyección es afinidad.",
    ),
    pick("check-seccion", "La sección de un cilindro", "El plano de corte inclinado de un cilindro de revolución produce una elipse. ¿Por qué?",
      "Porque la sección es la afín de la base circular (la dirección de afinidad es la de las generatrices)",
      [["Porque la base es una parábola", "La base es una circunferencia."], ["Porque los cilindros son esferas", "No lo son."], ["Porque el plano es horizontal", "Es un plano inclinado."]],
      "Una circunferencia afín es una elipse.",
    ),
  ],
};
