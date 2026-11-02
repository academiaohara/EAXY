import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, calc, nums, pick, slide } from "@/data/lessons/tec1-helpers";

export const escalaTransversalesEscalimetroDt1Lesson: InteractiveLesson = {
  slug: "escala-transversales-escalimetro-dt1",
  title: "5. Escala decimal de transversales y escalímetro",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Apreciar las décimas de la contraescala", [
      { kind: "steps", items: [
        "Con la **escala decimal de transversales** se pueden apreciar las **décimas partes de la unidad** tomada en la contraescala (por ejemplo, 1,64 Dm).",
        "Se construye sobre una escala gráfica ya hecha, trazando perpendiculares por los puntos de división y **transversales** inclinadas.",
      ] },
    ], undefined, "stack"),

    slide("construccion", "Construcción de la escala de transversales", [], bench("escala-transversales", [
      { title: "La escala gráfica", text: "**E 1:250.** Se construye la escala gráfica 1 es a 250: la contraescala está dividida en 10 partes iguales y a la derecha del cero se marcan **1 Dm** y **2 Dm**.", fact: "1 Dm = 4 cm" },
      { title: "Perpendiculares y alturas", text: "Por los puntos de división se trazan **perpendiculares** a la escala y se toma una altura arbitraria $h$, que se divide en **10 partes iguales**. Por esas partes se trazan **paralelas** a la escala.", fact: "h en 10 partes" },
      { title: "Las transversales", text: "Se unen las divisiones en la forma que indica la figura: la división $0$ con la $1$, la $1$ con la $2$, etc. Se forman **triángulos rectángulos** cuyas bases crecen una décima de la unidad de la contraescala.", fact: "0 con 1, 1 con 2…" },
      { title: "Lectura: 1,64 Dm", text: "Para tomar **1,64 Dm**: **1** Dm hasta el cero, **6** divisiones de la contraescala y **4** décimas más subiendo hasta la horizontal que pasa por 4. Son $16{,}4$ m.", fact: "1,64 Dm = 16,4 m" },
      { title: "Lectura: 2,38 Dm", text: "**2,38 Dm** (**23,8 m** o 238 dm): 2 Dm, 3 divisiones de la contraescala y 8 décimas más, en la horizontal que pasa por 8.", fact: "2,38 Dm = 23,8 m" },
    ]), "stack"),

    slide("escalimetro", "El escalímetro", [
      { kind: "steps", items: [
        "En la práctica del dibujo se utilizan reglas llamadas **escalímetros**, de **sección triangular**, donde vienen marcadas la escala natural y otras cinco escalas.",
        "También se utilizan los escalímetros **en abanico**: una serie de reglas, cada una con una escala, dispuestas en forma de abanico.",
      ] },
    ], undefined, "stack"),

    calc("t-1", "Pasar a metros", "Una medida de 1,64 Dm, ¿cuántos metros son?", nums(16.4), "1 Dm = 10 m; 1,64 · 10 = 16,4 m.", "Multiplica por 10."),
    calc("t-2", "Pasar a decímetros", "Una medida de 2,38 Dm, ¿cuántos decímetros son?", nums(238), "1 Dm = 100 dm; 2,38 · 100 = 238 dm.", "Multiplica por 100."),
    pick("t-3", "Dónde se lee 1,25 Dm", "En la escala decimal de transversales, 1,25 Dm se lee como 1 Dm más…",
      "2 divisiones de la contraescala y 5 décimas más (horizontal 5)",
      [["5 divisiones de la contraescala", "Eso son 0,5 Dm, no 0,25."], ["12 divisiones y 5 décimas", "La contraescala tiene 10 divisiones."]],
      "0,25 Dm = 2 divisiones (0,2) + 5 décimas de división (0,05).",
    ),
    pick("t-4", "El escalímetro", "¿Qué es un escalímetro?",
      "Una regla de sección triangular con la escala natural y otras escalas marcadas",
      [["Un compás para dibujar arcos", "El compás es otro instrumento."], ["Una escala gráfica fotocopiada", "Es una regla, no una escala dibujada."]],
      "Permite medir directamente a varias escalas.",
    ),
  ],
};
