import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planosAcotadosExplanacionesDt2Lesson: InteractiveLesson = {
  slug: "planos-acotados-explanaciones-dt2",
  title: "4. Planos acotados: explanaciones, desmonte y terraplén",
  subtitle: DT2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Preparar el terreno", [
      { kind: "steps", items: [
        "Para construir un edificio, una carretera o una vía férrea se prepara una **plataforma horizontal** (explanación) en el terreno, que casi nunca es llano.",
        "Si la plataforma queda **por debajo** del terreno, se **excava**: **desmonte**. Si queda **por encima**, se **rellena**: **terraplén**.",
        "Los bordes de la plataforma se enlazan con el terreno mediante **taludes**: planos inclinados con una pendiente fija (por ejemplo 1:1 o 3:2).",
        "En el sistema de **planos acotados** el terreno y los taludes se representan por sus **curvas de nivel**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "El talud en perfil", [
      { kind: "text", text: "Cambia la cota de la plataforma, la pendiente del talud y la del terreno. Observa dónde termina el talud." },
    ], tool("dt2-explanacion-explorador"), "visual-top"),
    slide("construccion", "Construcción en planos acotados", [
      { kind: "steps", items: [
        "Se dibujan las **curvas de nivel del terreno** y el **borde** de la plataforma, con su cota.",
        "Desde el borde se trazan las **horizontales del talud**, paralelas al borde, a distancias iguales al **intervalo** del talud (1/pendiente) por cada metro de cota.",
        "El **encuentro** con el terreno se halla uniendo los puntos donde las curvas de nivel del talud y del terreno **de la misma cota** se cortan.",
        "Se obtiene la **línea de intersección**: en ella el talud muere en el terreno (**línea de ceros**).",
      ] },
    ]),
    calc("calc-y", "Desmonte", "Terreno a 10 m de cota con pendiente 0,2. La plataforma está a 7 m y el talud tiene pendiente 1. La distancia horizontal al pie es y = (10 − 7) / (1 − 0,2), en metros. (dos decimales)", nums(3.75), "3 / 0,8 = 3,75 m.", "Diferencia de cotas dividida por (s − pt)."),
    calc("calc-t", "Terraplén", "Terreno a 10 m con pendiente 0,2; plataforma a 13 m; talud de pendiente 1. y = (13 − 10) / (1 + 0,2), en metros:", nums(2.5), "3 / 1,2 = 2,5 m.", "Diferencia de cotas dividida por (s + pt)."),
    calc("calc-ang", "Ángulo del talud", "Un talud de pendiente 1 (1:1), ¿qué ángulo forma con el horizontal, en grados?", nums(45), "atan(1) = 45°.", "Tangente igual a 1."),
    sort("clasifica", "Desmonte o terraplén", "Clasifica cada situación.",
      [["des", "Desmonte", "cobalt"], ["ter", "Terraplén", "amber"]],
      [["Plataforma por debajo del terreno", "des"], ["Se excava y se retira tierra", "des"], ["El talud sube hasta el terreno", "des"], ["Plataforma por encima del terreno", "ter"], ["Se rellena con tierra", "ter"], ["El talud baja hasta el terreno", "ter"]],
      "Debajo del terreno se excava; encima, se rellena.",
    ),
    pick("check", "Pie del talud", "¿Dónde termina un talud?",
      "Donde su cota coincide con la del terreno",
      [["Donde se acaba la plataforma", "Ahí empieza."], ["Siempre a 1 m del borde", "Depende de la pendiente."], ["En la curva de nivel más alta", "No necesariamente."]],
      "El pie del talud está en la intersección con el terreno: la línea de ceros.",
    ),
  ],
};
