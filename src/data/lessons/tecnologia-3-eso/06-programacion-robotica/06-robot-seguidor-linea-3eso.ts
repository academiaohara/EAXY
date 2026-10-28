import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const robotSeguidorLinea3esoLesson: InteractiveLesson = {
  slug: "robot-seguidor-linea-3eso",
  title: "6. El robot seguidor de línea",
  subtitle: TECESO3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un robot que sigue un camino", [
      { kind: "steps", items: [
        "Un **robot móvil** tiene: **placa de control**, **motores** (con driver), **sensores** y **alimentación**.",
        "Un **seguidor de línea** usa **sensores infrarrojos** que detectan si debajo hay una superficie oscura (línea) o clara.",
        "Con **dos sensores** a los lados de la línea se puede corregir la dirección.",
        "El comportamiento se programa con **condiciones** que combinan las lecturas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Dónde está la línea", [
      { kind: "text", text: "Desplaza el robot respecto a la línea y observa lo que ve cada sensor y lo que decide el programa." },
    ], tool("eso3-seguidor-explorador"), "visual-top"),
    slide("tabla", "La tabla de decisiones", [
      { kind: "example", title: "Programa del seguidor de línea", lines: [
        { math: "izq = 0,\\ der = 0\\ \\rightarrow\\ avanzar" },
        { math: "izq = 1,\\ der = 0\\ \\rightarrow\\ girar\\ a\\ la\\ izquierda" },
        { math: "izq = 0,\\ der = 1\\ \\rightarrow\\ girar\\ a\\ la\\ derecha" },
        { math: "izq = 1,\\ der = 1\\ \\rightarrow\\ parar", note: "Cruce o final de la línea." },
      ] },
    ]),
    calc("calc-comb", "Combinaciones de sensores", "Con dos sensores que pueden estar en 0 o 1, ¿cuántas combinaciones hay? (2²)", nums(4), "2² = 4 combinaciones.", "2 elevado al número de sensores."),
    sort("clasifica-accion", "¿Qué debe hacer?", "Relaciona cada lectura con la acción.",
      [["ava", "Avanzar", "emerald"], ["izq", "Girar a la izquierda", "cobalt"], ["der", "Girar a la derecha", "amber"]],
      [["Ningún sensor ve la línea", "ava"], ["El robot está centrado", "ava"], ["El sensor izquierdo ve la línea", "izq"], ["El robot se ha desviado a la derecha de la línea", "izq"], ["El sensor derecho ve la línea", "der"], ["El robot se ha desviado a la izquierda de la línea", "der"]],
      "Cuando un sensor detecta la línea, el robot gira hacia ese lado para centrarse.",
    ),
    pick("check-ir", "Un sensor infrarrojo", "¿Cómo detecta un sensor infrarrojo una línea negra sobre fondo blanco?",
      "El negro refleja menos luz infrarroja que el blanco",
      [["Por el sonido", "Eso es ultrasonidos."], ["Por el imán", "No hay imanes."], ["Por la temperatura", "No mide calor."]],
      "El sensor emite luz IR y mide cuánta vuelve: menos reflejo indica superficie oscura.",
    ),
  ],
};
