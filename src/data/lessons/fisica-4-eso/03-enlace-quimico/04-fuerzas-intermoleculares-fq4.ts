import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fuerzasIntermolecularesFq4Lesson: InteractiveLesson = {
  slug: "fuerzas-intermoleculares-fq4",
  title: "4. Fuerzas intermoleculares",
  subtitle: FQ4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Entre moléculas", [
      { kind: "steps", items: [
        "Las moléculas de una sustancia covalente se mantienen próximas por **fuerzas intermoleculares**: son **mucho más débiles** que los enlaces covalentes dentro de cada molécula.",
        "Al **fundir** o **hervir** se vencen estas fuerzas, **no se rompen** los enlaces covalentes.",
        "Cuanto **más intensas**, **mayores** son los puntos de fusión y ebullición.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Puntos de ebullición", [
      { kind: "text", text: "Compara sustancias de masas parecidas y distinto tipo de fuerza." },
    ], tool("fq4-fuerzas-intermoleculares-explorador"), "visual-top"),
    slide("tipos", "Tipos de fuerzas", [
      { kind: "steps", items: [
        "**Fuerzas de London (dispersión)**: aparecen en **todas** las moléculas por **dipolos instantáneos**. Son las únicas en las **apolares** (gases nobles, CH₄, H₂) y **crecen con la masa y el tamaño**.",
        "**Dipolo–dipolo**: entre moléculas **polares** (HCl, H₂S): se atraen el extremo δ+ de una y el δ− de otra.",
        "**Enlace de hidrógeno**: el más fuerte; se da cuando un **H unido a F, O o N** interacciona con un **par solitario** de F, O o N de otra molécula. Explica el alto punto de ebullición del **agua**, del **NH₃** y del **HF**.",
      ] },
    ]),
    slide("agua", "El agua, un caso especial", [
      { kind: "steps", items: [
        "Sin enlaces de hidrógeno, el H₂O (masa 18) sería un gas a temperatura ambiente, como el H₂S (masa 34, hierve a −60 °C).",
        "El **hielo flota** porque en el sólido los enlaces de hidrógeno forman una red **abierta**, menos densa que el agua líquida.",
        "El agua es un **buen disolvente** de sustancias polares e iónicas, gracias a su polaridad y a los enlaces de hidrógeno.",
      ] },
    ]),
    calc("calc-masa", "Misma masa, distinta fuerza", "El CH₄ (masa 16) hierve a −162 °C y el H₂O (masa 18), a 100 °C. ¿Cuántos grados más alto es el punto de ebullición del agua?", nums(262), "100 − (−162) = 262 °C.", "Cuidado con el signo negativo."),
    calc("calc-ng", "Gases nobles", "El Ne hierve a −246 °C y el Ar a −186 °C. ¿Cuántos °C sube el punto de ebullición del Ne al Ar?", nums(60), "−186 − (−246) = 60 °C.", "Resta."),
    sort("clasifica", "Fuerza dominante", "Asocia cada sustancia con su fuerza intermolecular principal.",
      [["lo", "London", "cobalt"], ["di", "Dipolo–dipolo", "amber"], ["hi", "Enlace de hidrógeno", "rose"]],
      [["Argón", "lo"], ["Metano", "lo"], ["Cloruro de hidrógeno", "di"], ["Sulfuro de hidrógeno", "di"], ["Agua", "hi"], ["Amoniaco", "hi"]],
      "Depende de la polaridad y de la presencia de H unido a F, O o N.",
    ),
    pick("check", "Hervir el agua", "Al hervir agua, ¿qué se rompe?",
      "Las fuerzas intermoleculares (enlaces de hidrógeno), no los enlaces O–H",
      [["Los enlaces covalentes O–H", "Seguiría habiendo H₂O en el vapor."], ["Los núcleos de los átomos", "No ocurre en un cambio de estado."], ["Nada", "Se vencen las fuerzas entre moléculas."]],
      "El vapor sigue siendo H₂O.",
    ),
  ],
};
