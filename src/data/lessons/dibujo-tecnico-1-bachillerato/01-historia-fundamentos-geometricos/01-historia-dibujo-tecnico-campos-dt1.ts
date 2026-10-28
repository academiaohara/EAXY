import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const historiaDibujoTecnicoCamposDt1Lesson: InteractiveLesson = {
  slug: "historia-dibujo-tecnico-campos-dt1",
  title: "1. Historia del dibujo técnico y campos de acción",
  subtitle: DT1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un lenguaje para construir", [
      { kind: "steps", items: [
        "El **dibujo técnico** es el lenguaje gráfico con el que se define con **precisión** un objeto, una máquina o un edificio **antes de construirlo**.",
        "A diferencia del dibujo artístico, no busca expresar una impresión: busca que **cualquier persona entrenada** obtenga de él **las mismas medidas y la misma forma**.",
        "Para ello se apoya en la **geometría**, en **sistemas de representación** (cómo pasar del espacio al plano) y en la **normalización** (reglas comunes).",
        "Hoy se dibuja a mano (croquis, trazados) y con **programas CAD**, pero los fundamentos son los mismos.",
      ] },
    ], undefined, "stack"),
    slide("historia", "Cuatro hitos", [
      { kind: "text", text: "Recorre los hitos que explican por qué dibujamos como dibujamos." },
    ], anim("dt1-linea-tiempo-dibujo"), "visual-top"),
    slide("campos", "Campos de acción", [
      { kind: "steps", items: [
        "**Dibujo arquitectónico**: plantas, alzados y secciones de edificios; se acota en metros y se dibuja a escalas reducidas (1:50, 1:100).",
        "**Dibujo mecánico**: piezas y conjuntos de máquinas, con tolerancias en milímetros o menos.",
        "**Dibujo eléctrico y electrónico**: esquemas con **símbolos normalizados**; importa la conexión, no la forma.",
        "**Dibujo geológico y topográfico**: mapas con **curvas de nivel** y cortes del terreno (sistema de planos acotados).",
        "**Dibujo urbanístico**: planos de ciudades, redes de calles y servicios.",
      ] },
    ]),
    sort("clasifica-campos", "¿A qué campo pertenece?", "Asocia cada documento con su campo de acción.",
      [["arq", "Arquitectónico y urbanístico", "cobalt"], ["mec", "Mecánico", "amber"], ["ele", "Eléctrico y electrónico", "emerald"], ["geo", "Geológico y topográfico", "rose"]],
      [["Planta de una vivienda a escala 1:50", "arq"], ["Plano de las calles de un barrio", "arq"], ["Despiece de un engranaje con tolerancias", "mec"], ["Plano de taller de un eje", "mec"], ["Esquema de un cuadro eléctrico", "ele"], ["Esquema de un circuito con transistores", "ele"], ["Mapa con curvas de nivel", "geo"], ["Corte geológico del terreno", "geo"]],
      "Cada campo tiene sus convenciones, pero todos comparten la geometría y la normalización.",
    ),
    pick("check-monge", "Quién sistematizó el diédrico", "¿Qué aportó Gaspard Monge al dibujo técnico?",
      "La geometría descriptiva: representar objetos del espacio en el plano con el sistema diédrico",
      [["La perspectiva cónica del Renacimiento", "Eso fue anterior: Brunelleschi y Alberti."], ["Las normas UNE", "Las normas son del siglo XX."], ["Los Elementos de geometría", "Es obra de Euclides."]],
      "Monge convirtió el dibujo de proyecciones en un método riguroso para definir objetos.",
    ),
    pick("check-norma", "Por qué normalizar", "¿Por qué se normaliza el dibujo técnico (líneas, escalas, formatos, acotación)?",
      "Para que cualquier técnico interprete el plano de la misma forma, sea quien sea quien lo haya hecho",
      [["Para que los dibujos sean más bonitos", "No es una cuestión estética."], ["Porque los programas CAD lo exigen", "La norma existía antes de los programas."], ["Para que cada empresa tenga su propio estilo", "Justo lo contrario: un lenguaje común."]],
      "Un plano es un documento de comunicación: sin reglas comunes se pueden cometer errores graves.",
    ),
  ],
};
