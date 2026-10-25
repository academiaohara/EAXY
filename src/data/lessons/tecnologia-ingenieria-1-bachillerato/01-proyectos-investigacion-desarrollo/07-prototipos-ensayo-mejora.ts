import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const prototiposEnsayoMejoraLesson: InteractiveLesson = {
  slug: "prototipos-ensayo-mejora",
  title: "7. Construcción, ensayo y mejora de prototipos",
  subtitle: TEC1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Tipos de prototipo", [
      { kind: "definition", text: "Un **prototipo** es una versión de la solución construida para **probar algo concreto** antes de fabricar la definitiva." },
      { kind: "steps", items: [
        "**Maqueta o modelo de forma**: cartón, espuma, impresión rápida; comprueba tamaño y ergonomía.",
        "**Prototipo funcional**: hace lo que debe hacer, aunque no con el material final.",
        "**Modelo digital o simulación**: CAD, cálculo o simulador; permite probar muchas variantes sin gastar material.",
        "**Preserie**: primeras unidades con el proceso final, para validar la fabricación.",
      ] },
      { kind: "text", text: "Se elige el prototipo más barato que responda a la **pregunta** que tienes en ese momento." },
    ], undefined, "stack"),
    slide("verificar", "Validar frente a verificar", [
      { kind: "compare",
        left: { title: "Verificar", text: "¿Hemos construido el producto **correctamente**? Se comprueba cada requisito con una medida: masa ≤ 700 g, flecha ≤ L/300.", tone: "key" },
        right: { title: "Validar", text: "¿Hemos construido el producto **correcto**? Se comprueba con usuarios que resuelve su necesidad en su contexto.", tone: "info" } },
      { kind: "text", text: "Un prototipo puede **verificar** todos sus requisitos y aun así no **validarse** si los requisitos estaban mal planteados." },
      { kind: "steps", title: "Cuidados al ensayar", items: [
        "Un solo cambio por ensayo, para saber qué lo causó.",
        "Anotar condiciones, instrumentos y resultados.",
        "Repetir: una sola medida no es un dato fiable.",
        "Indicar la **tolerancia**: variación admisible de una medida.",
      ] },
    ]),
    slide("simulador", "Ensayo virtual de una estantería", [
      { kind: "text", text: "Una tabla apoyada en sus dos extremos con una carga en el centro. Criterios de aceptación: **flecha ≤ L/300** y **tensión ≤ σ admisible**. Busca configuraciones que cumplan y cuál usa menos material." },
    ], tool("prototipo-ensayo-explorador", { a: 6, b: 12, c: 600, n: 0 }), "visual-top"),
    slide("iterar", "Diseño iterativo", [
      { kind: "text", text: "Cuando un ensayo falla, se localiza la **causa**, se cambia **una cosa** y se vuelve a ensayar. Cada vuelta es una iteración." },
    ], anim("proceso-diseno-ciclo"), "split"),
    calc("calc-flecha", "Margen de la flecha", "Una tabla de $L = 600$ mm tiene como límite de flecha $L/300$. Con la carga de ensayo se mide una flecha de $1{,}2$ mm. ¿Cuántos mm de margen quedan hasta el límite?",
      nums(0.8), "$L/300 = 600/300 = 2$ mm. Margen: $2 - 1{,}2 = 0{,}8$ mm. El prototipo cumple con margen.", "Calcula primero el límite L/300."),
    pick("check-tolerancia", "Tolerancia", "Un taladro debe medir $8\\ \\text{mm} \\pm 0{,}1$ mm. ¿Cuál de estas piezas medidas es aceptable?",
      "7,95 mm",
      [["8,2 mm", "Se pasa de 8,1 mm, el límite superior."], ["7,8 mm", "Queda por debajo de 7,9 mm, el límite inferior."], ["8,15 mm", "Supera el máximo de 8,1 mm."]],
      "La tolerancia define el intervalo admisible: de 7,9 a 8,1 mm. Solo 7,95 mm está dentro.",
    ),
    sort("clasifica-vv", "Verificar o validar", "Decide qué se está comprobando en cada caso.",
      [["ver", "Verificar un requisito", "cobalt"], ["val", "Validar con usuarios", "emerald"]],
      [["Medir con una balanza que la masa es ≤ 700 g", "ver"], ["Comprobar con ensayo que la flecha no supera L/300", "ver"], ["Medir que el consumo es ≤ 5 W", "ver"], ["Pedir a diez usuarios que lo usen una semana y opinen", "val"], ["Observar si personas mayores logran abrirlo sin ayuda", "val"], ["Comprobar si resuelve de verdad el problema del cliente", "val"]],
      "Verificar es comprobar contra un requisito medible; validar es comprobar contra la necesidad real, con usuarios y contexto reales.",
    ),
    pick("check-iteracion", "Qué hacer tras un fallo", "El prototipo se deforma demasiado con la carga. ¿Qué es lo más sensato?",
      "Averiguar la causa (espesor, material, distancia entre apoyos), cambiar una variable y repetir el ensayo",
      [["Cambiar a la vez material, espesor y forma", "Si cambias todo, no sabrás qué mejoró el resultado."], ["Relajar el requisito hasta que cumpla", "Cambiar el requisito para aprobar es validar mal; solo se justifica si la necesidad lo permite."], ["Dar el diseño por válido y seguir", "No cumple su criterio de aceptación."]],
      "Iterar bien es cambiar de una variable en una y medir otra vez.",
    ),
  ],
};
