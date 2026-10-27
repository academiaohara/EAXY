import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const curvasNivelInterpretacionDt1Lesson: InteractiveLesson = {
  slug: "curvas-nivel-interpretacion-dt1",
  title: "4. Topografía: curvas de nivel e interpretación de planos",
  subtitle: DT1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "El relieve en un mapa", [
      { kind: "steps", items: [
        "Una **curva de nivel** une los puntos del terreno de **la misma cota**: es la intersección del terreno con un **plano horizontal**.",
        "La **equidistancia** es la diferencia de cota entre dos curvas consecutivas. Se escribe en la leyenda del plano.",
        "Las curvas **no se cortan** ni se bifurcan; se cierran dentro o fuera del mapa.",
        "Cada cierto número se dibuja una **curva directora** más gruesa con su cota escrita (curva **maestra**).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una colina", [
      { kind: "text", text: "La colina es más larga en x que en y. Observa dónde están más juntas las curvas y qué pendiente tiene el terreno allí." },
    ], tool("dt1-curvas-nivel-explorador"), "visual-top"),
    slide("lectura", "Cómo interpretarlas", [
      { kind: "steps", items: [
        "**Curvas juntas** ⇒ terreno **empinado**; **separadas** ⇒ terreno **suave**.",
        "**Curvas cerradas concéntricas** con cotas crecientes: **colina** o cima. Con cotas decrecientes hacia el centro: **depresión**.",
        "**Curvas en V** apuntando **hacia la cota más alta**: un **valle**; apuntando hacia la más baja: una **loma**.",
        "La **pendiente** entre dos puntos de dos curvas = **equidistancia / distancia horizontal** medida en el plano con la escala.",
      ] },
    ]),
    calc("calc-num", "Número de curvas", "Una colina de 100 m de altura se dibuja con equidistancia de 10 m. ¿Cuántas curvas de nivel hay entre la base (cota 0) y la cima, sin contar ni la base ni la cima?", nums(9), "Cotas 10, 20, …, 90: 9 curvas.", "Cuenta las cotas intermedias."),
    calc("calc-sep", "Separación de curvas", "En una ladera con pendiente del 50 % y equidistancia de 10 m, ¿qué distancia horizontal separa dos curvas consecutivas, en m?", nums(20), "d = 10 / 0,5 = 20 m.", "Equidistancia entre pendiente."),
    calc("calc-pend", "Pendiente de la ladera", "Dos curvas consecutivas con equidistancia de 10 m están a 10 m de distancia horizontal. ¿Qué pendiente tiene el terreno, en %?", nums(100), "10/10 = 1 = 100 % (45°).", "Desnivel entre distancia."),
    sort("clasifica-rel", "¿Qué relieve es?", "Clasifica cada situación en un plano.",
      [["emp", "Terreno empinado", "cobalt"], ["sua", "Terreno suave", "amber"], ["cim", "Cima o depresión", "emerald"]],
      [["Curvas muy juntas", "emp"], ["Curvas casi superpuestas en un acantilado", "emp"], ["Curvas muy separadas", "sua"], ["Llanura con pocas curvas", "sua"], ["Curvas cerradas concéntricas", "cim"], ["Un círculo con una cota más alta en el centro", "cim"]],
      "La separación indica la pendiente; el cierre concéntrico, un máximo o mínimo.",
    ),
    pick("check-v", "Un valle", "Las curvas de nivel forman V con el vértice hacia la cota más alta. ¿Qué relieve es?",
      "Un valle, por el que corre el agua",
      [["Una loma o cresta", "En la loma la V apunta hacia la cota más baja."], ["Una cima", "Sería una curva cerrada."], ["Una meseta", "En una meseta las curvas se separan."]],
      "En el valle las curvas «entran» hacia las cotas altas siguiendo el cauce.",
    ),
  ],
};
