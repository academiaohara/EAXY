import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seguridadEtiquetadoProductosFq3Lesson: InteractiveLesson = {
  slug: "seguridad-etiquetado-productos-fq3",
  title: "2. Seguridad y etiquetado de productos químicos",
  subtitle: FQ3_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "Leer la etiqueta", [
      { kind: "steps", items: [
        "Todo producto químico peligroso debe llevar una **etiqueta** con: **nombre**, **fabricante**, **pictogramas** de peligro, una **palabra de advertencia** (**«Peligro»** o **«Atención»**) y **frases** de riesgo y de precaución.",
        "El sistema europeo es el **CLP**: los pictogramas son **rombos con borde rojo** con un dibujo negro sobre fondo blanco.",
        "Antes de usar un producto, hay que **leer la etiqueta** y seguir las instrucciones.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Los pictogramas", [
      { kind: "text", text: "Mira qué significa cada pictograma y qué precaución exige." },
    ], tool("fq3-pictogramas-explorador"), "visual-top"),
    slide("lab", "Seguridad en casa y en el laboratorio", [
      { kind: "steps", items: [
        "Usa **gafas**, **guantes** y **bata** si el producto es corrosivo o irritante.",
        "**No mezcles** productos de limpieza (la lejía con amoníaco o con un ácido libera gases **tóxicos**).",
        "Guarda los productos en su **envase original**, **cerrados** y **fuera del alcance de los niños**; nunca en botellas de agua o refrescos.",
        "**Ventila** el lugar y **no pruebes ni huelas** directamente un producto desconocido.",
        "Los residuos peligrosos (pilas, disolventes, aceites, medicamentos) van al **punto limpio** o a farmacias.",
      ] },
    ]),
    sort("clasifica", "Pictograma y peligro", "Une cada producto con el peligro principal que indicaría su etiqueta.",
      [["inf", "Inflamable", "amber"], ["cor", "Corrosivo", "rose"], ["tox", "Tóxico", "cobalt"], ["amb", "Peligroso para el medio ambiente", "emerald"]],
      [["Acetona", "inf"], ["Alcohol de quemar", "inf"], ["Desatascador de tuberías", "cor"], ["Ácido de limpieza concentrado", "cor"], ["Metanol", "tox"], ["Pesticida que daña los peces", "amb"]],
      "El pictograma advierte del peligro principal.",
    ),
    calc("calc-pict", "Forma del pictograma", "Los pictogramas de peligro CLP tienen forma de rombo. ¿Cuántos lados tiene un rombo?", nums(4), "Un rombo es un cuadrilátero: 4 lados.", "Cuenta los lados."),
    calc("calc-tipos", "Los 9 pictogramas", "El sistema CLP tiene pictogramas de GHS01 a GHS09. ¿Cuántos son en total?", nums(9), "De 01 a 09: 9 pictogramas.", "Cuenta los códigos."),
    pick("check", "Mezclas", "¿Por qué no se debe mezclar lejía con otros productos de limpieza?",
      "Porque pueden reaccionar y liberar gases tóxicos",
      [["Porque se acaba antes", "No es el motivo."], ["Porque se vuelve más barato", "No es el motivo."], ["Porque pierde el color", "El problema es la reacción química."]],
      "Algunas mezclas producen cloro u otros gases peligrosos.",
    ),
    pick("check2", "Envases", "¿Dónde debe guardarse un producto químico?",
      "En su envase original, cerrado y fuera del alcance de los niños",
      [["En una botella de agua vacía", "Se puede confundir y beber."], ["Sin cerrar para que respire", "Debe estar cerrado."], ["Al alcance de cualquiera", "Es peligroso."]],
      "Evita confusiones e intoxicaciones.",
    ),
  ],
};
