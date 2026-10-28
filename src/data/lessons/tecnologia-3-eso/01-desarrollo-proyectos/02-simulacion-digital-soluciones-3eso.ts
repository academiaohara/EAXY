import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const simulacionDigitalSoluciones3esoLesson: InteractiveLesson = {
  slug: "simulacion-digital-soluciones-3eso",
  title: "2. Simulación digital de soluciones",
  subtitle: TECESO3_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Probar sin construir", [
      { kind: "steps", items: [
        "**Simular** es probar un diseño en el ordenador antes de fabricarlo.",
        "Ahorra **material, tiempo y dinero**: los fallos se descubren cuando corregirlos es gratis.",
        "Ejemplos: **CAD 3D** (encajes y medidas), **cálculo de estructuras**, **circuitos virtuales** (Tinkercad), **simulación de procesos**.",
        "Un modelo es una **simplificación**: sirve para decidir, pero hay que **validarlo** con un prototipo real.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Dónde encaja la simulación", [
      { kind: "text", text: "Observa el flujo completo de un proyecto y en qué momento se simula." },
    ], anim("eso3-flujo-proyecto"), "text-top"),
    slide("viga", "Simula una viga", [
      { kind: "text", text: "Compara materiales y medidas de una viga y mira cuánta carga aguanta y lo que pesa." },
    ], tool("eso3-simulacion-viga-explorador"), "visual-top"),
    slide("circ", "Simular un circuito", [
      { kind: "text", text: "Antes de conectar componentes reales se calcula el circuito. Comprueba la ley de Ohm con un simulador." },
    ], tool("ohm-explorador"), "visual-top"),
    calc("calc-viga", "Carga de una viga", "Una viga de pino (σ = 40 MPa) de 20 × 20 mm y 300 mm entre apoyos, ¿qué carga aguanta en el centro, en N? (F = 2·σ·b·h² / (3·L), redondea a un entero)", nums(711, 711.1), "2 · 40 · 20 · 20² = 640 000; dividido entre 3 · 300 = 900 da ≈ 711 N.", "Sustituye en F = 2·σ·b·h² / (3·L)."),
    sort("clasifica-sim", "Simular o construir", "Decide qué conviene hacer primero.",
      [["sim", "Simular primero", "cobalt"], ["con", "Construir y probar", "amber"]],
      [["Comprobar si un circuito cabe sin quemar el LED", "sim"], ["Ver si las piezas 3D encajan", "sim"], ["Comparar cinco secciones de viga", "sim"], ["Sentir la ergonomía de un mango", "con"], ["Ver cómo suena una caja acústica", "con"], ["Validar el modelo con una pieza real", "con"]],
      "La simulación descarta; el prototipo confirma.",
    ),
    pick("check-sim", "Limitación", "¿Cuál es la limitación principal de una simulación?",
      "Se basa en un modelo simplificado, y por eso hay que validarla con un prototipo",
      [["Siempre es exacta", "Es una aproximación."], ["No sirve para nada", "Es muy útil para decidir."], ["Solo la usan expertos", "Hay herramientas sencillas."]],
      "La realidad tiene más factores que el modelo.",
    ),
  ],
};
