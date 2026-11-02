import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { benchParte, calc, nums, pick, slide } from "@/data/lessons/tec1-helpers";

export const escalaGraficaContraescalaDt1Lesson: InteractiveLesson = {
  slug: "escala-grafica-contraescala-dt1",
  title: "3. Escala gráfica y contraescala",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "La regla para medir", [
      { kind: "steps", items: [
        "La **escala gráfica** es la representación de la escala numérica: es, en definitiva, **la regla para medir** sobre el dibujo.",
        "Se construye sobre una recta con las unidades a la derecha del cero. A la izquierda se pone la **contraescala**: una unidad dividida en **diez partes**, que sirve para conocer la décima parte de la unidad de medida.",
        "Si el plano se **fotocopia** o se amplía, la escala gráfica cambia **con él** y sigue siendo válida; la numérica ya no lo es.",
      ] },
    ], undefined, "stack"),

    slide("e12", "Escala gráfica de E 1:2", [], benchParte("escala-grafica", 0, [
      { title: "Los datos", text: "**E 1:2.** La escala numérica $1/2$ vale $0{,}5$: un decímetro real equivale a $0{,}5$ dm en el papel, es decir, a **5 cm**.", fact: "1 dm real = 5 cm en el dibujo" },
      { title: "La escala", text: "Sobre una recta se toman **5 cm**, equivalentes en esta escala a **1 dm**, y se repite el segmento.", fact: "Unidad: 5 cm" },
      { title: "La contraescala", text: "La contraescala se pone a la **izquierda del cero** y se divide en diez partes: cada una vale **1 cm** en la realidad.", fact: "10 partes = 1 dm" },
      { title: "Lectura", text: "Para leer una medida se cuentan las **unidades a la derecha del cero** y las **partes de la contraescala**: 1 dm más 3 cm son **13 cm**.", fact: "1 dm + 3 cm = 13 cm" },
    ]), "stack"),

    slide("e1250", "Escala gráfica de E 1:250", [], benchParte("escala-grafica", 4, [
      { title: "Los datos", text: "**E 1:250.** La escala numérica $1/250$ vale $0{,}004$: un decámetro real equivale a $0{,}004$ Dm en el dibujo, que son **4 cm**.", fact: "1 Dm real = 4 cm en el dibujo" },
      { title: "La escala", text: "Se toma un segmento de **4 cm** y en el extremo se pone **1 Dm**; se repite y se obtienen **2 Dm**. La contraescala mide **4 cm**, se divide en diez partes y cada una equivale a **1 m**.", fact: "Contraescala: 4 cm = 10 m" },
      { title: "Lectura", text: "La contraescala sirve para conocer la décima parte de la unidad: **1 Dm + 7 m = 17 m**.", fact: "1 Dm + 7 m = 17 m" },
    ]), "stack"),

    calc("g-1", "Unidad de la escala gráfica", "En una escala gráfica de E 1:50, ¿cuántos cm del dibujo representan 1 m real?", nums(2), "1 m = 100 cm; 100/50 = 2 cm.", "Divide la medida real entre 50."),
    calc("g-2", "Escala 1:250", "A escala 1:250, ¿cuántos cm del dibujo representan 3 Dm (30 m) reales?", nums(12), "3 Dm = 30 m = 3 000 cm; 3 000/250 = 12 cm.", "Pasa a cm y divide entre 250."),
    calc("g-3", "La contraescala", "En la escala gráfica de E 1:2, la contraescala mide 5 cm y se divide en 10 partes. ¿Cuántos mm mide cada parte en el dibujo?", nums(5), "5 cm = 50 mm; 50/10 = 5 mm (equivalen a 1 cm real).", "Divide 50 mm entre 10."),
    calc("g-4", "Leer la escala", "En la escala gráfica de E 1:250 se lee 2 Dm y 4 divisiones de la contraescala (1 m cada una). ¿Cuántos metros son?", nums(24), "2 Dm = 20 m; 20 + 4 = 24 m.", "1 Dm = 10 m."),
    pick("g-5", "Fotocopiar un plano", "Un plano se amplía con la fotocopiadora. ¿Qué sigue siendo válido?",
      "La escala gráfica, porque se amplía junto con el dibujo",
      [["La escala numérica", "Tras ampliar ya no es la misma relación."], ["Ninguna de las dos", "La gráfica cambia con el plano y se sigue leyendo bien."]],
      "La escala gráfica se deforma igual que el dibujo.",
    ),
  ],
};
