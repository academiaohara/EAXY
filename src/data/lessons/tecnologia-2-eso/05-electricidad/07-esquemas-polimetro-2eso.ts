import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const esquemasPolimetro2esoLesson: InteractiveLesson = {
  slug: "esquemas-polimetro-2eso",
  title: "7. Esquemas y medidas con el polímetro",
  subtitle: TECESO2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("esquemas", "Leer y dibujar esquemas", [
      { kind: "definition", text: "Un **esquema eléctrico** representa un circuito con **símbolos normalizados** y líneas rectas para los cables, de modo que cualquier persona pueda interpretarlo y montarlo." },
      { kind: "steps", items: [
        "Cada componente tiene un **símbolo** (pila, lámpara, resistencia, interruptor, pulsador, motor…).",
        "Los cables se dibujan con **líneas rectas y ángulos de 90°**.",
        "Un **punto** indica una conexión entre cables; si se cruzan sin punto, no están conectados.",
      ] },
    ], undefined, "stack"),
    slide("simbolos", "Los símbolos", [
      { kind: "text", text: "Repasa los símbolos más habituales y su significado." },
    ], tool("simbolos-electricos-explorador", { n: 0 }), "visual-top"),
    slide("polimetro", "El polímetro", [
      { kind: "text", text: "El **polímetro** mide tensión, intensidad y resistencia, pero cada magnitud exige una **conexión distinta**. Prueba combinaciones, incluidas las erróneas." },
    ], tool("eso2-polimetro-explorador"), "visual-top"),
    slide("reglas", "Reglas de conexión", [
      { kind: "steps", items: [
        "**Voltímetro**: en **paralelo** con el elemento.",
        "**Amperímetro**: en **serie**, intercalado en el cable (hay que abrir el circuito).",
        "**Óhmetro**: con el elemento **desconectado** y sin tensión.",
        "Empieza siempre por la escala **más alta** y baja después.",
      ] },
    ]),
    sort("clasifica-conexion", "¿Cómo se conecta?", "Relaciona cada medida con su conexión.",
      [["par", "En paralelo", "amber"], ["ser", "En serie", "cobalt"], ["des", "Sin alimentación", "rose"]],
      [["Medir la tensión de una lámpara", "par"], ["Medir la tensión de una pila", "par"], ["Medir la corriente que pasa por un motor", "ser"], ["Medir cuánta corriente da la pila", "ser"], ["Medir el valor de una resistencia suelta", "des"], ["Comprobar la continuidad de un cable", "des"]],
      "Tensión en paralelo, intensidad en serie y resistencia con el circuito apagado.",
    ),
    pick("check-ampe", "Amperímetro mal puesto", "Un compañero conecta un amperímetro en paralelo con una lámpara. ¿Qué ocurre?",
      "Se produce un cortocircuito y puede fundirse el fusible",
      [["Mide perfectamente la tensión", "Para medir tensión se usa el voltímetro."], ["No ocurre nada", "El amperímetro tiene muy poca resistencia."], ["La lámpara luce más", "La lámpara queda anulada."]],
      "El amperímetro tiene una resistencia casi nula: en paralelo equivale a un cable que cortocircuita el elemento.",
    ),
  ],
};
