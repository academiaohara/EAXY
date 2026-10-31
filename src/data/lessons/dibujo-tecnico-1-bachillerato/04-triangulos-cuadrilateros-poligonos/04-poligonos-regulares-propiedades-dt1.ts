import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const poligonosRegularesPropiedadesDt1Lesson: InteractiveLesson = {
  slug: "poligonos-regulares-propiedades-dt1",
  title: "4. Polígonos regulares: propiedades",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Lados y ángulos iguales", [], bench("poligono-elementos", [
      { title: "Lados y vértices", text: "Un **polígono regular** tiene todos sus lados y todos sus ángulos iguales. Siempre se puede **inscribir** en una circunferencia: sus vértices están a la misma distancia de un centro $O$.", fact: "Lado: l = 2R sen(180°/n)" },
      { title: "Radio", text: "El **radio** $R$ une el centro con un vértice. Si se conoce el lado, el radio es $R = \\dfrac{l}{2\\,\\operatorname{sen}(180^\\circ/n)}$.", fact: "R: centro–vértice" },
      { title: "Ángulo central", text: "El **ángulo central** $\\alpha$ es el que forman dos radios consecutivos: $\\alpha = \\dfrac{360^\\circ}{n}$. En el hexágono mide $60^\\circ$.", fact: "α = 360°/n" },
      { title: "Apotema", text: "La **apotema** $a$ es la perpendicular desde el centro al punto medio de un lado: $a = R\\cos\\dfrac{180^\\circ}{n}$. Con ella, el **área** es $A = \\dfrac{P \\cdot a}{2}$, siendo $P = n\\,l$ el perímetro.", fact: "Área = P · a / 2" },
      { title: "Ángulo interior", text: "El **ángulo interior** vale $\\beta = \\dfrac{180^\\circ (n-2)}{n}$. El número de **diagonales** es $\\dfrac{n(n-3)}{2}$.", fact: "β = 180°(n − 2)/n" },
    ]), "stack"),

    slide("casos", "Casos que conviene recordar", [
      { kind: "steps", items: [
        "**Triángulo equilátero**: $l = R\\sqrt{3}$.",
        "**Cuadrado**: $l = R\\sqrt{2}$.",
        "**Hexágono**: $l = R$. Se compone de **6 triángulos equiláteros** y, con ángulo interior de $120^\\circ$, tres hexágonos encajan en $360^\\circ$: por eso **rellena el plano**.",
        "**Pentágono**: $l = 1{,}176\\,R$. **Decágono**: $l = 0{,}618\\,R$ (la sección áurea del radio).",
      ] },
    ], undefined, "stack"),

    benchTask("apotema-construye", "Traza la apotema", "apotema-practica", [
      { title: "Clava la punta en P", text: "La apotema parte del centro y llega al punto medio de un lado: es su **mediatriz**. Toca el extremo $P$ del lado." },
      { title: "Abre más de la mitad de PQ", text: "Arrastra la mina hasta una abertura **mayor que la mitad** de $PQ$ y pulsa «Fijar abertura».", fact: "Radio > PQ / 2" },
      { title: "Arco desde P", text: "Arrastra la mina para trazar el arco **por dentro y por fuera** del lado." },
      { title: "Clava la punta en Q", text: "Toca el otro extremo, $Q$, sin cambiar la abertura." },
      { title: "Arco desde Q", text: "Traza el arco que corta al anterior en **dos puntos**." },
      { title: "Traza la mediatriz", text: "Toca **dos puntos** donde se cortan los arcos: la regla pasa por el centro $O$ y por el punto medio $M$ del lado. El segmento $OM$ es la apotema.", fact: "Apotema ⟂ lado" },
    ], {
      question: "Traza la apotema del hexágono regular: la mediatriz del lado PQ, que pasa por el centro.",
      hint: "Haz la mediatriz de PQ con el compás: arcos del mismo radio desde P y desde Q, y une los dos cortes.",
      explanation: "En un polígono regular el centro equidista de los vértices, así que está en la mediatriz de cada lado. La apotema es el trozo de esa mediatriz entre el centro y el punto medio del lado.",
    }),
  ],
};
