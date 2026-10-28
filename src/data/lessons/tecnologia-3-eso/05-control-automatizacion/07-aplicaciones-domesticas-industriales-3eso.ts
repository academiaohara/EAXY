import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const aplicacionesDomesticasIndustriales3esoLesson: InteractiveLesson = {
  slug: "aplicaciones-domesticas-industriales-3eso",
  title: "7. Automatización doméstica e industrial",
  subtitle: TECESO3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Automatizar para qué", [
      { kind: "steps", items: [
        "**Comodidad**: persianas y luces que se activan solas.",
        "**Seguridad**: alarmas, detectores de humo, sistemas antiincendios.",
        "**Ahorro**: calefacción con termostato, riego por sensor, iluminación por presencia.",
        "**Productividad** en la industria: líneas de montaje, robots, control de calidad.",
        "**Accesibilidad**: domótica que ayuda a personas con movilidad reducida.",
      ] },
    ], undefined, "stack"),
    slide("riego", "Un riego inteligente", [
      { kind: "text", text: "Compara un riego programado por reloj con otro que mide la humedad del suelo." },
    ], tool("eso3-riego-explorador"), "visual-top"),
    slide("industria", "En la industria", [
      { kind: "steps", items: [
        "**Autómatas programables (PLC)**: controlan máquinas y líneas de producción.",
        "**Robots industriales**: sueldan, pintan o mueven piezas con precisión.",
        "**Sensores de calidad**: cámaras que detectan defectos.",
        "**Sistemas SCADA**: pantallas que supervisan toda la fábrica.",
        "Ventajas: más **precisión**, **velocidad** y **seguridad**. Retos: **empleo** y **formación** de las personas.",
      ] },
    ]),
    calc("calc-agua", "Agua del riego", "Una bomba funciona 6 horas a 20 L por hora. ¿Cuántos litros de agua gasta?", nums(120), "6 · 20 = 120 L.", "Horas por litros por hora."),
    calc("calc-ahorro", "Ahorro", "El riego por reloj gasta 60 L y el riego con sensor, 40 L. ¿Cuántos litros se ahorran?", nums(20), "60 − 40 = 20 L.", "Resta los dos consumos."),
    sort("clasifica-aplic", "¿Doméstica o industrial?", "Clasifica cada automatismo.",
      [["dom", "Doméstica", "emerald"], ["ind", "Industrial", "cobalt"]],
      [["Termostato de la casa", "dom"], ["Persiana programable", "dom"], ["Detector de humo", "dom"], ["Brazo robótico de una fábrica de coches", "ind"], ["Línea embotelladora con cámaras", "ind"], ["Control de un horno industrial", "ind"]],
      "Los automatismos domésticos se centran en confort y ahorro; los industriales, en producción y seguridad.",
    ),
    pick("check-rev", "Pros y contras", "¿Qué ventaja y qué reto plantea la automatización industrial?",
      "Más precisión y productividad, pero cambia los puestos de trabajo y exige nueva formación",
      [["No tiene ventajas", "Tiene muchas."], ["No plantea ningún reto", "Afecta al empleo."], ["Solo tiene inconvenientes", "También ofrece mejoras."]],
      "Hay que valorar ventajas e implicaciones sociales de la tecnología.",
    ),
  ],
};
