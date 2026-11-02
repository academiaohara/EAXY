import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const escalaTransversalesEscalimetroDt1Lesson: InteractiveLesson = {
  slug: "escala-transversales-escalimetro-dt1",
  title: "5. Escala decimal de transversales y escalímetro",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("construccion", "Construcción de la escala de transversales", [], bench("escala-transversales", [
      { title: "La escala gráfica", text: "La escala decimal de transversales permite apreciar las **décimas partes de la unidad** de la contraescala. **E 1:250.** Se construye la escala gráfica 1 es a 250: la contraescala está dividida en 10 partes iguales y a la derecha del cero se marcan **1 Dm** y **2 Dm**.", fact: "1 Dm = 4 cm" },
      { title: "Perpendiculares y alturas", text: "Por los puntos de división se trazan **perpendiculares** a la escala y se toma una altura arbitraria $h$, que se divide en **10 partes iguales**. Por esas partes se trazan **paralelas** a la escala.", fact: "h en 10 partes" },
      { title: "Las transversales", text: "Se unen las divisiones en la forma que indica la figura: la división $0$ con la $1$, la $1$ con la $2$, etc. Se forman **triángulos rectángulos** cuyas bases crecen una décima de la unidad de la contraescala.", fact: "0 con 1, 1 con 2…" },
      { title: "Lectura: 1,64 Dm", text: "Para tomar **1,64 Dm**: **1** Dm hasta el cero, **6** divisiones de la contraescala y **4** décimas más subiendo hasta la horizontal que pasa por 4. Son $16{,}4$ m.", fact: "1,64 Dm = 16,4 m" },
      { title: "Lectura: 2,38 Dm", text: "**2,38 Dm** (**23,8 m** o 238 dm): 2 Dm, 3 divisiones de la contraescala y 8 décimas más, en la horizontal que pasa por 8.", fact: "2,38 Dm = 23,8 m" },
    ]), "stack"),

    slide("escalimetro", "El escalímetro", [], bench("escalimetro", [
      { title: "De sección triangular", text: "En la práctica se utilizan reglas llamadas **escalímetros**, de **sección triangular**, donde vienen marcadas la escala natural y otras cinco escalas.", fact: "Escala natural + otras cinco" },
      { title: "En abanico", text: "También se utilizan los escalímetros **en abanico**: una serie de reglas, cada una con una escala, dispuestas en forma de abanico.", fact: "Una regla por escala" },
    ]), "stack"),
  ],
};
