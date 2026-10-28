import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const condensadorCargaRc3esoLesson: InteractiveLesson = {
  slug: "condensador-carga-rc-3eso",
  title: "6. El condensador y su tiempo de carga",
  subtitle: TECESO3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un pequeño depósito de carga", [
      { kind: "definition", text: "Un **condensador** almacena energía eléctrica entre dos placas separadas por un aislante. Su **capacidad** se mide en **faradios**; en la práctica, en µF (microfaradios)." },
      { kind: "steps", items: [
        "Se **carga** hasta la tensión de la pila y la **mantiene** al desconectarlo.",
        "Los **electrolíticos** tienen **polaridad**: conectarlos al revés los puede dañar.",
        "Al combinarlo con una resistencia se forma un **circuito RC**, que retrasa los cambios de tensión.",
      ] },
    ], undefined, "stack"),
    slide("rc", "La curva de carga", [
      { kind: "rule", title: "Constante de tiempo", text: "Con R en kΩ y C en µF, el producto da milisegundos. En un tiempo τ se alcanza el 63 % de la tensión final; en 5τ, más del 99 %.", formula: "τ = R · C" },
      { kind: "text", text: "Cambia R, C y el tiempo y observa la curva." },
    ], tool("eso3-condensador-explorador"), "visual-top"),
    slide("usos", "Para qué se usan", [
      { kind: "steps", items: [
        "**Temporizadores**: una luz de escalera que se apaga sola tras unos segundos.",
        "**Filtros** y alisado de la corriente en las fuentes de alimentación.",
        "**Almacenar energía** brevemente (flash de una cámara).",
        "**Acoplar** señales en circuitos de audio.",
      ] },
    ]),
    calc("calc-tau", "Constante de tiempo", "Un circuito RC tiene R = 10 kΩ y C = 100 µF. ¿Cuántos segundos vale τ? (kΩ · µF = ms)", nums(1), "τ = 10 · 100 = 1 000 ms = 1 s.", "Multiplica y pasa de ms a s."),
    calc("calc-5tau", "Carga completa", "Con ese τ de 1 s, ¿cuántos segundos hacen falta para que el condensador esté casi cargado (5τ)?", nums(5), "5τ = 5 · 1 s = 5 s.", "Multiplica τ por 5."),
    sort("clasifica-cond", "¿Para qué sirve?", "Clasifica cada aplicación.",
      [["tem", "Temporizar", "amber"], ["fil", "Filtrar o alisar", "cobalt"], ["alm", "Almacenar energía", "emerald"]],
      [["Luz que se apaga tras unos segundos", "tem"], ["Retardo al encender un circuito", "tem"], ["Suavizar la tensión de una fuente", "fil"], ["Eliminar ruido de una señal", "fil"], ["Flash de una cámara", "alm"], ["Mantener la tensión un instante", "alm"]],
      "El condensador retrasa, suaviza o guarda energía según el circuito.",
    ),
    pick("check-rc", "Cargar más lento", "¿Cómo se consigue que un condensador tarde más en cargarse?",
      "Aumentando la resistencia o la capacidad",
      [["Disminuyendo la resistencia", "Se cargaría más rápido."], ["Aumentando la tensión de la pila", "No cambia τ."], ["No se puede cambiar", "τ = R · C depende de ambas."]],
      "Cuanto mayor es R · C, más lenta es la carga.",
    ),
  ],
};
