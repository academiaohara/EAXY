import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cad2dIniciacionLesson: InteractiveLesson = {
  slug: "cad-2d-iniciacion",
  title: "2. Dibujo asistido por ordenador (CAD) en 2D",
  subtitle: TECESO1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dibujar con precisión en el ordenador", [
      { kind: "definition", text: "El **CAD** (Diseño Asistido por Ordenador) permite dibujar planos y piezas con precisión de milímetros, modificarlos fácilmente y reutilizarlos. Con **CAD 2D** se trabaja en un plano, como en un dibujo técnico." },
      { kind: "steps", items: [
        "**Coordenadas**: cada punto se define con X e Y (por ejemplo, el agujero está en 20, 15).",
        "**Herramientas de dibujo**: línea, rectángulo, círculo, arco, polígono.",
        "**Herramientas de edición**: mover, copiar, girar, simetría, recortar, **matriz** (repetir un elemento en filas y columnas).",
        "**Cotas y escalas**: se acota la pieza y se imprime a escala.",
        "**Capas**: contorno, ejes, cotas y textos en capas distintas, que se muestran u ocultan.",
      ] },
    ], undefined, "stack"),
    slide("placa", "Una placa con una matriz de agujeros", [
      { kind: "text", text: "Cambia las medidas, los agujeros y la matriz. El programa recalcula la posición de cada agujero y comprueba las reglas de taller." },
    ], tool("cad-placa-explorador", { a: 120, b: 70 }), "visual-top"),
    slide("ventajas", "Por qué usar CAD", [
      { kind: "compare",
        left: { title: "Dibujo a mano", text: "Cambiar una medida obliga a **borrar y volver a dibujar**. La precisión depende de la mano.", tone: "warn" },
        right: { title: "CAD", text: "Cambias un valor y todo el dibujo se **actualiza**. Mismo archivo para planos, cálculo y máquinas de corte.", tone: "key" } },
    ]),
    calc("calc-matriz", "Cuántos agujeros", "Una placa lleva una matriz de 5 columnas por 3 filas de agujeros. ¿Cuántos agujeros hay en total?",
      nums(15), "5 × 3 = 15 agujeros.", "Multiplica columnas por filas."),
    sort("clasifica-cad", "¿Qué herramienta es?", "Relaciona cada orden de CAD con su tipo.",
      [["dib", "Dibujo", "cobalt"], ["edi", "Edición", "amber"], ["ano", "Anotación", "emerald"]],
      [["Línea", "dib"], ["Círculo", "dib"], ["Rectángulo", "dib"], ["Mover", "edi"], ["Simetría", "edi"], ["Matriz", "edi"], ["Cota", "ano"], ["Texto", "ano"]],
      "Las órdenes de dibujo crean elementos; las de edición los modifican; las de anotación los describen.",
    ),
    pick("check-cad", "Cambiar una medida", "Descubres que la placa debe medir 10 mm más de largo. ¿Qué ventaja tiene el CAD?",
      "Cambias la cota y el dibujo y la matriz de agujeros se actualizan a la vez",
      [["Tienes que borrar todo y empezar de nuevo", "Esa es la desventaja del dibujo a mano."], ["No se puede modificar un dibujo ya hecho", "Todo lo contrario."], ["El ordenador decide qué medida es la correcta", "Las decisiones de diseño siguen siendo tuyas."]],
      "El CAD relaciona los elementos del dibujo: un cambio se propaga automáticamente.",
    ),
  ],
};
