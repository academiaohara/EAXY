import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const analisisSimulacionMecanismosLesson: InteractiveLesson = {
  slug: "analisis-simulacion-mecanismos",
  title: "10. Representación, simulación y análisis de mecanismos",
  subtitle: TEC1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("esquema", "Esquemas cinemáticos", [
      { kind: "definition", text: "Un **esquema cinemático** representa un mecanismo con símbolos normalizados: solo importan los elementos, cómo se unen y cómo se mueven, no la forma real de las piezas." },
      { kind: "steps", items: [
        "**Barras y bielas**: líneas.",
        "**Ejes y articulaciones**: círculos o puntos; un apoyo fijo se marca con tramado.",
        "**Poleas, ruedas dentadas**: círculos con sus diámetros o dientes anotados.",
        "**Datos**: se anotan z, d, rpm y el sentido de giro con flechas.",
      ] },
      { kind: "text", text: "Una buena práctica es dibujar el esquema, calcular a mano la relación total y después **simular** para comprobar." },
    ], undefined, "stack"),
    slide("editor", "Reto: diseña la transmisión", [
      { kind: "text", text: "Un motor gira a 1 450 rpm y la máquina necesita entre **150 y 250 rpm**. Combina hasta tres etapas (poleas, engranajes, cadena) para cumplir el requisito y maximizar el rendimiento." },
      { kind: "steps", title: "Criterios de éxito", items: [
        "Velocidad de salida entre 150 y 250 rpm.",
        "Rendimiento total superior al 85 %.",
        "Usar el menor número de etapas que sea posible.",
      ] },
    ], tool("transmision-editor-explorador", { a: 1450 }), "visual-top"),
    slide("metodo", "Método de diseño", [
      { kind: "steps", items: [
        "**Calcula la relación total** necesaria: $i = n_{\\text{sal}}/n_{\\text{ent}}$.",
        "**Reparte** la relación entre etapas (a más etapas, menos tamaño por etapa, pero más pérdidas).",
        "**Elige elementos**: la polea absorbe golpes; el engranaje no desliza; la cadena transmite a distancia.",
        "**Comprueba** velocidad, sentido de giro, par y rendimiento.",
        "**Simula** y compara con el requisito.",
      ] },
      { kind: "example", title: "De 1 440 a 120 rpm con dos etapas", lines: [
        { math: "i = 120/1440 = 1/12" },
        { math: "i = \\dfrac13\\cdot\\dfrac14", note: "dos etapas razonables en lugar de una 1:12" },
      ] },
    ]),
    calc("calc-i", "Relación necesaria", "Un motor gira a $1\\,440$ rpm y se necesita una salida a $120$ rpm. ¿Qué reducción $1:N$ hace falta? (da N)",
      nums(12), "$i = 120/1440 = 1/12$, es decir, una reducción $1:12$. Se puede lograr, por ejemplo, con dos etapas $1:3$ y $1:4$.", "N = n_entrada / n_salida."),
    calc("calc-reparto", "Dos etapas iguales", "Quieres una reducción total de $1:16$ con dos etapas iguales. ¿Qué reducción $1:N$ debe tener cada una?",
      nums(4), "$N\\cdot N = 16 \\Rightarrow N = 4$. Cada etapa 1:4.", "El producto de las dos relaciones es 1/16."),
    sort("clasifica-reto", "Criterio de aceptación", "Clasifica cada afirmación del informe de ensayo de la transmisión.",
      [["cum", "Cumple el requisito", "emerald"], ["nocum", "No cumple", "amber"]],
      [["Salida a 180 rpm (intervalo 150–250)", "cum"], ["Rendimiento 90 % (mínimo 85 %)", "cum"], ["Dos etapas (máximo 3)", "cum"], ["Salida a 120 rpm (intervalo 150–250)", "nocum"], ["Rendimiento 82 % (mínimo 85 %)", "nocum"], ["Cuatro etapas (máximo 3)", "nocum"]],
      "Cada requisito se compara con su umbral: 180 rpm, 90 % y dos etapas cumplen; 120 rpm, 82 % y cuatro etapas, no.",
    ),
    pick("check-etapas", "Una etapa o varias", "Para una reducción total de 1:12, ¿qué ventaja principal tiene hacerla en dos etapas en lugar de una?",
      "Los elementos son de tamaño razonable; a cambio, el rendimiento total es algo menor",
      [["El rendimiento total es mayor", "Cada etapa añadida multiplica por un rendimiento menor que 1: baja el total."], ["La reducción total es menor", "La reducción total es la misma, el producto de las etapas."], ["No hace falta lubricar", "Todas las etapas necesitan mantenimiento."]],
      "Dos etapas evitan ruedas enormes (una 1:12 con piñón de 10 dientes tendría una rueda de 120), pero cada etapa añade pérdidas.",
    ),
    slide("proyecto", "Proyecto del tema", [
      { kind: "text", text: "**Proyecto integrador**: diseña la transmisión de una cinta transportadora que debe mover la banda a $0{,}5$ m/s con un rodillo de $0{,}20$ m de diámetro, accionado por un motor de $1\\,450$ rpm y $750$ W." },
      { kind: "steps", title: "Entregable", items: [
        "Velocidad angular necesaria del rodillo ($v = \\omega r$) y su valor en rpm.",
        "Relación de transmisión total y reparto en etapas.",
        "Esquema cinemático con z y d anotados.",
        "Rendimiento previsto y par disponible en el rodillo.",
        "Justificación de elementos elegidos (correa, engranajes, cadena).",
      ] },
      { kind: "text", text: "Pista: $\\omega = v/r = 0{,}5/0{,}10 = 5$ rad/s $\\approx 47{,}7$ rpm, así que la reducción total es aproximadamente $1450/47{,}7 \\approx 30$." },
    ], undefined, "stack"),
  ],
};
