import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const medidaErrorCifrasFq2Lesson: InteractiveLesson = {
  slug: "medida-error-cifras-fq2",
  title: "3. Medida, error y cifras significativas",
  subtitle: FQ2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ninguna medida es exacta", [
      { kind: "steps", items: [
        "Al medir siempre se comete un **error**: los instrumentos tienen una **resolución** limitada y quien mide puede equivocarse.",
        "El **error absoluto** es la diferencia entre el valor medido y el **valor verdadero**: **E = |medida − verdadero|**.",
        "El **error relativo** compara ese error con el valor medido: **Er = E / valor**, y se da en **%**.",
        "Para reducir los errores **accidentales** se repite la medida varias veces y se calcula la **media**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Muchas medidas, una media", [
      { kind: "text", text: "Aumenta el número de medidas de una longitud y mira cómo se acerca la media al valor verdadero. Cambia también las cifras significativas." },
    ], tool("fq2-medidas-error-explorador"), "visual-top"),
    slide("cifras", "Cifras significativas y redondeo", [
      { kind: "steps", items: [
        "Las **cifras significativas** son las que aportan información fiable: las que se miden con certeza más una dudosa.",
        "En un resultado **no se escriben más cifras** de las que permite el instrumento: con una regla de milímetros, 12,3 cm (no 12,3456).",
        "Los **ceros a la izquierda** no cuentan: 0,0042 tiene **dos** cifras significativas.",
        "**Redondeo**: si la primera cifra que se elimina es **5 o más**, la última que se conserva **sube** una unidad; si es menor que 5, se queda igual.",
      ] },
    ]),
    calc("calc-ea", "Error absoluto", "Una varilla mide en realidad 20,0 cm y tú mides 20,4 cm. ¿Cuál es el error absoluto, en cm?", nums(0.4), "|20,4 − 20,0| = 0,4 cm.", "Resta y quita el signo."),
    calc("calc-er", "Error relativo", "Con esa medida, ¿cuál es el error relativo en %? (E / valor verdadero)", nums(2), "0,4 / 20 = 0,02 → 2 %.", "Divide el error entre el valor y multiplica por 100."),
    calc("calc-media", "La media", "Mides un tiempo tres veces: 2,1 s, 2,3 s y 2,2 s. ¿Cuál es la media, en s?", nums(2.2), "(2,1 + 2,3 + 2,2) / 3 = 2,2 s.", "Suma las tres y divide entre 3."),
    sort("clasifica", "Cifras significativas", "Clasifica cada número según el número de cifras significativas que tiene.",
      [["dos", "Dos cifras", "cobalt"], ["tres", "Tres cifras", "amber"]],
      [["12", "dos"], ["0,0042", "dos"], ["0,50", "dos"], ["12,5", "tres"], ["3,04", "tres"], ["0,0120", "tres"]],
      "Se cuentan desde la primera cifra distinta de cero; los ceros finales decimales sí cuentan.",
    ),
    pick("check", "Redondeo", "¿A qué número se redondea 3,476 con dos cifras significativas?",
      "3,5",
      [["3,4", "La cifra que se elimina (7) es mayor que 5: sube."], ["3,47", "Eso son tres cifras."], ["3,6", "No se redondea de esa forma."]],
      "Se conservan 3 y 4; como la siguiente cifra es 7, el 4 sube a 5.",
    ),
  ],
};
