import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tecnicasDigitalesDisenoParametricoDt2Lesson: InteractiveLesson = {
  slug: "tecnicas-digitales-diseno-parametrico-dt2",
  title: "3. Técnicas digitales: diseño paramétrico y fabricación",
  subtitle: DT2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Del lápiz al algoritmo", [
      { kind: "steps", items: [
        "Desde los **años 60** (Sketchpad, de Ivan Sutherland, 1963) el ordenador se usa para dibujar. Hoy el **CAD** y el **BIM** definen **todo** el edificio o máquina en un **modelo** que contiene geometría y datos.",
        "El **diseño paramétrico** describe la forma con **parámetros y reglas**; cambiar un parámetro **recalcula** el modelo completo.",
        "La **simulación** (por ejemplo, el **método de elementos finitos**) comprueba cómo se comporta una estructura antes de construirla; la **optimización topológica** elimina el material que no trabaja.",
        "La **fabricación digital** (corte **CNC**, fresado, **impresión 3D**, robots) convierte el modelo en piezas reales con precisión.",
      ] },
    ], undefined, "stack"),
    slide("fachada", "Una fachada que se adapta", [
      { kind: "text", text: "Mueve el atractor y los tamaños de los huecos: una regla sencilla genera un diseño distinto cada vez." },
    ], tool("dt2-fachada-parametrica-explorador"), "visual-top"),
    slide("impacto", "Nuevas formas posibles", [
      { kind: "steps", items: [
        "Las formas **libres** de **Frank Gehry** (Guggenheim de Bilbao, 1997) se definieron con **software** de diseño y construcción aeronáutico (CATIA), que permitía describir cada panel de titanio.",
        "El **gemelo digital** (modelo vinculado al edificio real mediante sensores) ayuda a **mantener** y **gestionar** el edificio.",
        "La **realidad aumentada** superpone el modelo sobre la obra real para **replantear** y detectar errores.",
        "El reto es mantener la **geometría rigurosa**: un modelo digital sin base geométrica produce formas imposibles de construir.",
      ] },
    ]),
    calc("calc-uni", "Apertura uniforme", "Una fachada tiene paneles de lado 1 con orificios circulares de radio 0,3. ¿Qué porcentaje de superficie está abierto? (π·0,3², un decimal)", nums(28.3, 28.27), "π · 0,09 ≈ 0,283 = 28,3 %.", "Área del círculo entre área del panel."),
    calc("calc-max", "Apertura máxima", "Con orificios de radio 0,5 (tangentes a los lados), ¿qué porcentaje de cada panel queda abierto? (π/4, un decimal)", nums(78.5, 78.54), "π · 0,25 ≈ 0,785 = 78,5 %.", "Círculo inscrito en el cuadrado."),
    calc("calc-pan", "Número de paneles", "Una fachada de 10 × 10 paneles, ¿cuántos paneles distintos hay que cortar si todos son distintos?", nums(100), "10 · 10 = 100.", "Producto."),
    sort("clasifica-tec", "¿Qué tecnología?", "Asocia cada tarea con la técnica digital.",
      [["bim", "CAD / BIM", "cobalt"], ["sim", "Simulación", "amber"], ["fab", "Fabricación digital", "emerald"]],
      [["Un modelo con geometría y datos de todo el edificio", "bim"], ["Planos generados desde el modelo", "bim"], ["Calcular cómo se deforma una viga con carga", "sim"], ["Quitar material que no trabaja", "sim"], ["Cortar paneles con control numérico", "fab"], ["Imprimir una pieza en 3D", "fab"]],
      "Cada técnica ocupa un lugar: diseñar, comprobar y fabricar.",
    ),
    pick("check-param", "Qué es paramétrico", "¿Qué distingue al diseño paramétrico?",
      "La forma depende de parámetros y reglas: al cambiar uno, todo el diseño se recalcula",
      [["Cada pieza se dibuja a mano", "Eso es lo contrario."], ["No usa geometría", "La geometría es su base."], ["Solo vale para fachadas", "Se aplica a casi cualquier diseño."]],
      "Un modelo paramétrico se adapta automáticamente a los cambios.",
    ),
  ],
};
