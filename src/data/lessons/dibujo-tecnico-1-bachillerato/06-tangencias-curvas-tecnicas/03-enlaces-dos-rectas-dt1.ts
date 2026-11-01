import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const enlacesDosRectasDt1Lesson: InteractiveLesson = {
  slug: "enlaces-dos-rectas-dt1",
  title: "3. Enlaces y problemas de tangencias",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Redondear una esquina", [
      { kind: "steps", items: [
        "Un **enlace** es un arco de circunferencia que **une dos líneas** (rectas o curvas) sin cambio brusco de dirección: **tangente** a ambas.",
        "Todos los problemas de tangencias se resuelven buscando el **centro** del arco como **intersección de lugares geométricos**.",
        "Centro a distancia $r$ de una recta ⇒ está en **dos paralelas** a ella.",
        "Centro a distancia $R \\pm r$ de otro centro ⇒ está en una **circunferencia concéntrica** de radio $R \\pm r$.",
        "Centro equidistante de **dos rectas** ⇒ está en su **bisectriz**.",
      ] },
    ], undefined, "stack"),

    slide("enlace", "Enlace entre dos rectas", [], bench("enlace-compas", [
      { title: "Dos rectas y un radio", text: "Dos rectas se cortan en $V$ formando $60^\\circ$ y se quiere **redondear la esquina** con un arco de radio $r$ tangente a las dos.", fact: "Enlace de radio r" },
      { title: "El centro está en las paralelas", text: "Si el arco es tangente a una recta, su centro está a distancia $r$ de ella. Traza las **paralelas** a cada recta a distancia $r$: se cortan en el centro $C$.", fact: "C a distancia r de las dos" },
      { title: "Puntos de tangencia", text: "Los **puntos de tangencia** $T_1$ y $T_2$ son los pies de las perpendiculares desde $C$ a cada recta: el radio es perpendicular a la tangente.", fact: "CT ⟂ recta" },
      { title: "Traza el arco", text: "Con centro en $C$ y radio $r$, traza el arco de $T_1$ a $T_2$." },
      { title: "El resultado", text: "Los puntos de tangencia están a una distancia $t = \\dfrac{r}{\\tan(\\alpha/2)}$ del vértice. En una esquina de $90^\\circ$, $t = r$.", fact: "t = r / tan(α/2)" },
    ]), "stack"),

    slide("casos", "Casos típicos", [
      { kind: "steps", items: [
        "**Circunferencia de radio r tangente a dos rectas**: centro en la intersección de dos paralelas (a distancia r) o de la bisectriz.",
        "**Circunferencia de radio r tangente a una recta y a una circunferencia**: la paralela a la recta y la concéntrica de radio $R \\pm r$ se cortan en el centro.",
        "**Circunferencia tangente a una recta por un punto de ella**: el centro está en la **perpendicular** por ese punto.",
        "**Enlace de dos circunferencias con un arco de radio r**: el centro está en la intersección de las dos concéntricas de radios $R_1 \\pm r$ y $R_2 \\pm r$.",
      ] },
    ], undefined, "stack"),

    benchTask("enlace-construye", "Redondea la esquina", "enlace-practica", [
      { title: "Toma el radio r", text: "Toca los dos extremos del segmento $r$: el compás queda con el radio del enlace.", fact: "Abertura = r" },
      { title: "Clava la punta en V", text: "Toca el vértice $V$." },
      { title: "Corta las dos rectas", text: "Arrastra la mina para trazar un arco que **corte a las dos rectas**." },
      { title: "Marca T₁", text: "Toca el corte con la recta **horizontal**: es el punto $T_1$, a distancia $r$ de $V$." },
      { title: "Marca T₂", text: "Toca el corte con la recta **vertical**: es $T_2$." },
      { title: "Clava la punta en T₁", text: "Toca $T_1$, sin cambiar la abertura." },
      { title: "Arco desde T₁", text: "Traza un arco **hacia el interior** de la esquina." },
      { title: "Clava la punta en T₂", text: "Toca $T_2$." },
      { title: "Arco desde T₂", text: "Traza el arco que corta al anterior: ahí está el centro del enlace." },
      { title: "Marca el centro C", text: "Toca el punto donde se cortan los dos arcos: es $C$.", fact: "C a distancia r de las dos rectas" },
      { title: "Clava la punta en C", text: "Toca $C$." },
      { title: "Traza el enlace", text: "Arrastra la mina para trazar el arco de $T_1$ a $T_2$: es el enlace tangente a las dos rectas.", fact: "Arco tangente en T₁ y T₂" },
    ], {
      question: "Redondea con un enlace de radio r la esquina de 90° formada por las dos rectas.",
      hint: "Lleva r desde el vértice sobre cada recta, y desde esos puntos traza arcos de radio r: se cortan en el centro del enlace.",
      explanation: "El centro C está a r de las dos rectas (en la intersección de las paralelas), y T₁ y T₂ son los pies de las perpendiculares desde C. Con centro en C y radio r el arco toca las rectas en T₁ y T₂ sin esquina.",
    }),
  ],
};
