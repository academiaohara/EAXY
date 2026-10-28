import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const seccionesRoturasPerfilesDt2Lesson: InteractiveLesson = {
  slug: "secciones-roturas-perfiles-dt2",
  title: "3. Secciones, roturas y perfiles",
  subtitle: DT2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Sección frente a corte", [
      { kind: "steps", items: [
        "Un **corte** muestra la sección **y todo lo que hay detrás** del plano. Una **sección** muestra solo lo que **corta el plano**.",
        "Es útil para mostrar el **perfil** de una pieza larga (un eje con chavetero, un nervio, un perfil laminado) sin dibujar el resto.",
        "**Sección abatida** (sobre la propia vista): línea **fina** que gira 90° sobre el lugar del corte.",
        "**Sección desplazada**: se dibuja **fuera** de la vista, con el plano de corte indicado con letras.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Perfiles comerciales", [
      { kind: "text", text: "Elige un perfil y cambia sus dimensiones. Observa el área de la sección y la masa por metro." },
    ], tool("dt2-perfiles-seccion-explorador"), "visual-top"),
    slide("roturas", "Roturas", [
      { kind: "steps", items: [
        "Una **rotura** permite **acortar** una pieza larga de sección constante (ejes, perfiles, barras) sin dibujarla entera.",
        "Se dibuja con una línea fina **a mano alzada** o en **zigzag** (en piezas largas), y con formas características en tubos y redondos.",
        "Se **acota** siempre la **longitud real**, no la del dibujo.",
        "También se usan roturas en **cortes parciales** para abrir una zona de la pieza y ver el interior.",
      ] },
    ]),
    calc("calc-area", "Área de un cuadrado", "Un perfil cuadrado macizo de 30 mm de lado. ¿Qué área tiene su sección, en mm²?", nums(900), "30 · 30 = 900 mm².", "Lado al cuadrado."),
    calc("calc-masa", "Masa por metro", "Con esa sección y la densidad del acero, la masa por metro es área × 0,00785 kg/m (con el área en mm²). ¿Cuánto vale? (dos decimales, en kg/m)", nums(7.07, 7.065), "900 · 0,00785 = 7,065 kg/m.", "Multiplica por 0,00785."),
    calc("calc-barra", "Barra de 6 m", "¿Cuánto pesa una barra de 6 m de ese perfil, en kg? (un decimal)", nums(42.4, 42.39), "7,065 · 6 ≈ 42,4 kg.", "Masa por metro por la longitud."),
    sort("clasifica", "Corte o sección", "Clasifica cada característica.",
      [["cor", "Corte", "cobalt"], ["sec", "Sección", "amber"]],
      [["Muestra lo que hay detrás del plano", "cor"], ["Evita las líneas ocultas del interior", "cor"], ["Se usa para ver la forma de una pieza completa en el interior", "cor"], ["Muestra solo lo que corta el plano", "sec"], ["Puede abatirse sobre la vista", "sec"], ["Ideal para el perfil de un eje o un nervio", "sec"]],
      "El corte incluye lo de detrás; la sección, solo lo cortado.",
    ),
    pick("check", "Acotar una rotura", "En una pieza larga dibujada con rotura, ¿qué longitud se acota?",
      "La longitud real de la pieza",
      [["La longitud que se ve en el dibujo", "La rotura lo acorta."], ["Ninguna", "Hay que acotarla."], ["La mitad", "No."]],
      "La cota es siempre la dimensión real, aunque el dibujo esté acortado.",
    ),
  ],
};
